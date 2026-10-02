import * as THREE from 'three';
import type { Combatant, HitInfo, HitResult } from '../combat/HitZones';
import type { PlayerTarget } from '../player/PlayerController';
import type { ZombieContext, ZombieSpawn } from './Zombie';
import { bus } from '../../engine/Events';
import { damp } from '../Rig';

export const UP = new THREE.Vector3(0, 1, 0);

/**
 * Shared base of the newer B.O.W.s (Licker, Hunter): perception (vision cone or hearing), memory + A* pursuit,
 * HP / damage bookkeeping, separation + collision. Subclasses own the model, the state machine and animation.
 */
export abstract class Monster implements Combatant, PlayerTarget {
  position = new THREE.Vector3();
  yaw = 0;
  alive = true;
  abstract model: { root: THREE.Object3D };
  protected hp: number;
  protected state = 'idle';
  protected stateT = 0;
  protected vel = new THREE.Vector3();
  protected attackCd = 1;
  protected lastKnown: THREE.Vector3 | null = null;
  protected canSee = false;
  protected perceiveT = Math.random() * 0.2;
  protected path: THREE.Vector3[] = [];
  protected pathT = 0;
  protected home: THREE.Vector3;
  protected struck = false;
  protected flinch = new THREE.Vector3();
  protected burnT = 0;
  protected unsubs: (() => void)[] = [];
  /** perception: blind hunters (Licker) rely on hearing + touch range */
  protected abstract sense: { cone: number; range: number; near: number; blind: boolean; hearMult: number };
  protected abstract radius: number;

  constructor(public spawn: ZombieSpawn, protected ctx: () => ZombieContext, hp: number) {
    this.position.set(spawn.x, spawn.y ?? 0, spawn.z);
    this.home = this.position.clone();
    this.yaw = spawn.yaw;
    this.hp = hp;
    this.unsubs.push(bus.on('noise', (n) => this.hear(n.pos, n.radius)));
  }

  abstract get hitMeshes(): THREE.Object3D[];
  abstract headWorld(out: THREE.Vector3): THREE.Vector3;
  abstract takeHit(h: HitInfo): HitResult;
  abstract update(dt: number): void;
  abstract forceDead(): void;
  protected abstract onAlert(): void;
  protected abstract die(): void;

  isDowned(): boolean { return this.alive && this.state === 'down'; }
  canBeShoved(): boolean { return false; }
  shove(_from: THREE.Vector3): void { /* too strong to shove */ }
  releaseGrab(_countered: boolean): void { /* never grabs */ }
  dispose(): void { this.unsubs.forEach((u) => u()); }
  protected setState(s: string): void { this.state = s; this.stateT = 0; this.struck = false; }
  protected get fwd(): THREE.Vector3 { return new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw)); }

  protected hear(pos: THREE.Vector3, radius: number): void {
    if (!this.alive) return;
    if (pos.distanceTo(this.position) > radius * this.sense.hearMult) return;
    this.lastKnown = pos.clone().setY(this.position.y);
    if (this.state === 'idle' || this.state === 'wander') { this.setState('chase'); this.onAlert(); }
  }

  protected perceive(): void {
    const c = this.ctx(), p = c.player;
    if (p.state === 'dead') { this.canSee = false; return; }
    const eye = this.headWorld(new THREE.Vector3());
    const target = p.chest();
    const to = target.clone().sub(eye);
    const d = to.length();
    let ok: boolean;
    if (this.sense.blind) {
      // hears footsteps: running Claire is audible far, walking only close by
      const sp = Math.hypot(p.vel.x, p.vel.z);
      ok = d < this.sense.near || (sp > 2.6 && d < this.sense.range) || (sp > 0.8 && d < this.sense.range * 0.45);
    } else {
      const ang = to.clone().setY(0).normalize().angleTo(this.fwd);
      ok = (ang < THREE.MathUtils.degToRad(this.sense.cone) && d < this.sense.range) || d < this.sense.near;
    }
    this.canSee = ok && c.physics.lineOfSight(eye, target);
    if (this.canSee) {
      this.lastKnown = p.pos.clone();
      if (this.state === 'idle' || this.state === 'wander') { this.setState('chase'); this.onAlert(); }
    }
  }

  /** common damage bookkeeping; returns false when the hit killed it */
  protected damage(amount: number, dir?: THREE.Vector3, flinch = 0.2): boolean {
    this.hp -= amount;
    if (dir) this.flinch.copy(dir).multiplyScalar(flinch);
    this.lastKnown = this.ctx().player.pos.clone();
    if (this.hp <= 0) { this.die(); return false; }
    return true;
  }

  areaHit(damage: number, from: THREE.Vector3, opts: { knockdown: boolean; acid?: boolean; burn?: number }): void {
    if (!this.alive) return;
    if (opts.burn) this.burnT = Math.max(this.burnT, opts.burn);
    if (!this.damage(damage * (opts.acid ? 1.3 : 1))) return;
    if (opts.knockdown) { this.vel.copy(this.position.clone().sub(from).setY(0).normalize()).multiplyScalar(4); this.setState('down'); }
    else if (this.state === 'idle' || this.state === 'wander') this.setState('chase');
  }

  protected tickCommon(dt: number): void {
    const c = this.ctx();
    this.stateT += dt;
    this.attackCd -= dt;
    this.flinch.multiplyScalar(Math.exp(-8 * dt));
    if (this.burnT > 0 && this.alive) {
      this.burnT -= dt; this.hp -= 14 * dt;
      if (Math.random() < dt * 20) c.bloodFx.burst(this.position.clone().setY(this.position.y + 0.4 + Math.random() * 0.6), UP, 1, 0.5, 1, 0.4);
      if (this.hp <= 0) this.die();
    }
    if (!this.alive) return;
    this.perceiveT -= dt;
    if (this.perceiveT <= 0 && this.state !== 'down') { this.perceiveT = 0.15; this.perceive(); }
  }

  /** chase helper: direct when perceived, else A* to the last known position */
  protected pursue(dt: number, dirP: THREE.Vector3): THREE.Vector3 {
    const c = this.ctx();
    if (this.canSee) { this.path = []; return dirP.clone(); }
    if (this.lastKnown) {
      this.pathT -= dt;
      if (this.pathT <= 0 || !this.path.length) { this.path = c.nav.findPath(this.position, this.lastKnown) ?? [this.lastKnown.clone()]; this.pathT = 0.8; }
      const m = this.follow();
      if (this.position.distanceTo(this.lastKnown) < 1) { this.lastKnown = null; this.home.copy(this.position); this.setState('wander'); }
      return m;
    }
    this.setState('wander');
    return new THREE.Vector3();
  }

  protected wanderMove(): THREE.Vector3 {
    const c = this.ctx();
    if (!this.path.length) {
      const near = c.nav.nodes.filter((v) => v.distanceTo(this.home) < 8);
      const goal = near[Math.floor(Math.random() * near.length)] ?? this.home;
      this.path = c.nav.findPath(this.position, goal) ?? [goal.clone()];
    }
    return this.follow();
  }

  protected follow(): THREE.Vector3 {
    while (this.path.length && this.path[0].distanceTo(this.position) < 0.7) this.path.shift();
    const phys = this.ctx().physics;
    if (this.path.length > 1 && phys.walkable(this.position, this.path[1], 0.3)) this.path.shift();
    if (!this.path.length) return new THREE.Vector3();
    return this.path[0].clone().sub(this.position).setY(0).normalize();
  }

  /** turn toward fdir, accelerate toward move*speed (speed<0: keep current velocity), collide */
  protected locomote(dt: number, move: THREE.Vector3, speed: number, face: THREE.Vector3 | null, turn: number, accel: number): void {
    const c = this.ctx(), p = c.player;
    const fdir = face ?? (move.lengthSq() > 0.001 ? move : null);
    if (fdir && turn > 0) {
      let d = Math.atan2(fdir.x, fdir.z) - this.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      this.yaw += d * (1 - Math.exp(-turn * dt));
    }
    if (speed > 0 && move.lengthSq() > 0.001) {
      const sep = new THREE.Vector3();
      for (const o of c.zombies) {
        if ((o as unknown) === this || !o.alive) continue;
        const dv = this.position.clone().sub(o.position).setY(0); const dl = dv.length();
        if (dl < 1.0 && dl > 0.001) sep.addScaledVector(dv.divideScalar(dl), (1.0 - dl) * 3);
      }
      const want = move.clone().normalize().multiplyScalar(speed).add(sep);
      this.vel.x = damp(this.vel.x, want.x, accel, dt); this.vel.z = damp(this.vel.z, want.z, accel, dt);
    } else if (speed === 0) {
      this.vel.x = damp(this.vel.x, 0, 6, dt); this.vel.z = damp(this.vel.z, 0, 6, dt);
    }
    c.physics.moveCircle(this.position, this.vel.clone().multiplyScalar(dt), this.radius);
    if (this.alive) {
      const dv = this.position.clone().sub(p.pos).setY(0); const dl = dv.length(); const minD = this.radius + 0.35;
      if (dl < minD && dl > 0.001) this.position.addScaledVector(dv.divideScalar(dl), minD - dl);
    }
  }

  /** melee strike test: in range, roughly in front, Claire not dodging */
  protected strike(range: number, cone: number, dmg: number, push: number, shake = 0.35): boolean {
    const p = this.ctx().player;
    const to = p.pos.clone().sub(this.position).setY(0); const d = to.length();
    if (d > range || p.isInvulnerable()) return false;
    if (d > 0.3 && this.fwd.dot(to.divideScalar(d)) < cone) return false;
    if (!p.takeDamage(dmg, this.position)) return false;
    p.vel.addScaledVector(p.pos.clone().sub(this.position).setY(0).normalize(), push);
    bus.emit('cameraShake', { strength: shake, duration: 0.25 });
    return true;
  }
}
