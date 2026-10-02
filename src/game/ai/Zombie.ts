import * as THREE from 'three';
import { ZombieModel, type ZombieOutfit } from './ZombieModel';
import type { Combatant, HitInfo, HitResult, HitZone } from '../combat/HitZones';
import type { PlayerTarget, PlayerController } from '../player/PlayerController';
import type { PhysicsWorld } from '../../engine/Physics';
import type { NavGraph } from '../../engine/Nav';
import type { DebrisPool, ParticlePool, DecalPool } from '../../engine/Pools';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';
import { damp } from '../Rig';
import type { Creature, CreatureKind } from './Creature';
import type { Licker } from './Licker';
import type { Hunter } from './Hunter';

/** everything that lives in World.zombies (zombies + B.O.W. creatures) */
export type Enemy = Zombie | Creature | Licker | Hunter;

export type ZState =
  | 'idle' | 'wander' | 'investigate' | 'chase' | 'lunge' | 'grab' | 'bite'
  | 'stagger' | 'shoved' | 'knockdown' | 'getup' | 'crawl'
  | 'fakeDead' | 'rising' | 'down' | 'dead';

export interface ZombieContext {
  physics: PhysicsWorld;
  nav: NavGraph;
  player: PlayerController;
  zombies: Enemy[];
  debris: DebrisPool;
  bloodFx: ParticlePool;
  blood: DecalPool;
  time: number;
}

export interface ZombieSpawn {
  id: string;
  x: number; z: number; yaw: number;
  /** ground height of the spawn point (upper levels) */
  y?: number;
  outfit?: ZombieOutfit;
  fakeDead?: boolean;
  wander?: boolean;
  /** non-zombie B.O.W. (Cerberus / Bandersnatch) */
  kind?: CreatureKind;
}

const UP = new THREE.Vector3(0, 1, 0);

/**
 * Zombie AI — finite state machine with perception:
 *  • Vision cone (120°, 16 m, LOS raycast, reduced in darkness/behind)
 *  • Hearing: gunshots / running / doors propagate via the noise bus
 *  • Memory: last known position → investigate/search → give up → wander
 *  • Navigation: direct pursuit with LOS, otherwise A* over the nav graph (goes around walls)
 *  • Combat: lunge → grab (needs ≥1 arm) → bite; armless zombies bite-lunge; crawlers ankle-bite
 *  • Damage model: random hidden HP, hit zones, dismemberment, knockdown, fake death & revive
 */
export class Zombie implements Combatant, PlayerTarget {
  model: ZombieModel;
  position = new THREE.Vector3();
  yaw = 0;
  state: ZState = 'idle';
  stateT = 0;
  alive = true;
  hp: number;
  readonly maxHp: number;
  private headDmg = 0;
  private limbHP: Record<'lArm' | 'rArm' | 'lLeg' | 'rLeg', number>;
  private vel = new THREE.Vector3();
  private lastKnown: THREE.Vector3 | null = null;
  private lastSeenT = -99;
  private canSee = false;
  private perceiveT = Math.random() * 0.2;
  private path: THREE.Vector3[] = [];
  private pathT = 0;
  private groanT = 2 + Math.random() * 6;
  private attackCd = 0;
  private reviveT = -1;
  private noRevive = false;
  private burnT = 0;
  private walkPhase = Math.random() * 10;
  private chaseSpeed: number;
  private flinch = new THREE.Vector3();
  private searchT = 0;
  private home: THREE.Vector3;
  private voicePitch: number;
  private unsubs: (() => void)[] = [];
  private hitMeshList: THREE.Object3D[];

  constructor(public spawn: ZombieSpawn, scene: THREE.Object3D, texSize: number, private ctx: () => ZombieContext) {
    const seed = Math.abs([...spawn.id].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)) % 1000;
    this.model = new ZombieModel(spawn.outfit ?? 'prisoner', texSize, seed);
    this.model.mesh.userData.owner = this;
    this.hitMeshList = [this.model.mesh];
    scene.add(this.model.root);
    this.position.set(spawn.x, spawn.y ?? 0, spawn.z);
    this.home = this.position.clone();
    this.yaw = spawn.yaw;
    this.maxHp = this.hp = 110 + Math.random() * 90; // hidden randomised HP (RE2R)
    this.limbHP = { lArm: 35 + Math.random() * 15, rArm: 35 + Math.random() * 15, lLeg: 50 + Math.random() * 20, rLeg: 50 + Math.random() * 20 };
    this.chaseSpeed = 0.85 + Math.random() * 0.45;
    this.voicePitch = 0.8 + Math.random() * 0.4;
    if (spawn.fakeDead) this.setState('fakeDead');
    else if (spawn.wander) this.setState('wander');
    this.unsubs.push(bus.on('noise', (n) => this.hear(n.pos, n.radius, n.kind)));
    this.syncModel(0, 0);
  }

  get hitMeshes(): THREE.Object3D[] { return this.alive ? this.hitMeshList : []; }
  headWorld(out: THREE.Vector3): THREE.Vector3 { return this.model.rig.head.getWorldPosition(out); }
  hasArms(): boolean { return !(this.model.severed.has('lArm') && this.model.severed.has('rArm')); }
  hasLegs(): boolean { return !this.model.severed.has('lLeg') && !this.model.severed.has('rLeg'); }
  isDowned(): boolean { return this.alive && ['down', 'fakeDead', 'knockdown', 'crawl'].includes(this.state); }
  canBeShoved(): boolean { return this.alive && ['idle', 'wander', 'investigate', 'chase', 'lunge', 'stagger'].includes(this.state); }

  private setState(s: ZState): void { this.state = s; this.stateT = 0; }

  dispose(): void { this.unsubs.forEach((u) => u()); }

  /** Restore a permanently killed zombie from a save as a corpse. */
  forceDead(): void {
    this.alive = false; this.noRevive = true; this.state = 'dead'; this.stateT = 5;
    for (let i = 0; i < 10; i++) this.syncModel(0.5, 0);
  }

  // ---------------------------------------------------------------- perception
  private hear(pos: THREE.Vector3, radius: number, kind: string): void {
    if (!this.alive || this.state === 'dead') return;
    const d = pos.distanceTo(this.position);
    // walls muffle sound: halve effective radius without line of sight
    const eff = this.ctx().physics.lineOfSight(pos.clone().setY(pos.y + 1.2), this.position.clone().setY(this.position.y + 1.5)) ? radius : radius * 0.5;
    if (d > eff) return;
    if (this.state === 'fakeDead' && d < eff * 0.5 && kind !== 'walk') { this.setState('rising'); return; }
    if (['idle', 'wander', 'investigate'].includes(this.state)) {
      this.lastKnown = pos.clone().setY(0);
      this.setState('investigate');
      this.path = [];
      this.pathT = 0;
      if (Math.random() < 0.5) this.groan();
    } else if (this.state === 'chase' && !this.canSee) {
      this.lastKnown = pos.clone().setY(0);
    }
  }

  private perceive(): void {
    const c = this.ctx();
    const p = c.player;
    if (p.state === 'dead') { this.canSee = false; return; }
    const eye = this.headWorld(new THREE.Vector3());
    const target = p.chest();
    const to = target.clone().sub(eye);
    const dist = to.length();
    const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    const angle = to.clone().setY(0).normalize().angleTo(fwd);
    const inCone = angle < THREE.MathUtils.degToRad(60) && dist < 16;
    const sensed = dist < 2.2; // proximity sense ignores cone
    this.canSee = (inCone || sensed) && c.physics.lineOfSight(eye, target);
    if (this.canSee) {
      this.lastKnown = p.pos.clone();
      this.lastSeenT = c.time;
      if (['idle', 'wander', 'investigate'].includes(this.state)) { this.setState('chase'); this.groan(true); }
    }
  }

  private groan(long = false): void {
    audio.groan(this.headWorld(new THREE.Vector3()), this.voicePitch, long);
    this.groanT = 3 + Math.random() * 6;
  }

  // ---------------------------------------------------------------- damage
  takeHit(h: HitInfo): HitResult {
    const res: HitResult = { killed: false, severed: null, headBurst: false };
    if (!this.alive) return res;
    const c = this.ctx();
    this.hp -= h.bodyDamage;
    this.flinch.copy(h.dir).multiplyScalar(0.25 + h.stagger * 0.4);

    if (h.zone === 'head') {
      this.headDmg += h.bodyDamage;
      if (h.crit || this.headDmg > this.maxHp * 1.05 || (this.isDowned() && this.hp < -40)) {
        this.burstHead(h.dir);
        res.headBurst = true; res.killed = true;
        return res;
      }
    } else if (h.zone !== 'torso') {
      const z = h.zone as keyof typeof this.limbHP;
      this.limbHP[z] -= h.limbDamage;
      if (this.limbHP[z] <= 0 && !this.model.severed.has(z)) {
        this.severLimb(z, h.dir);
        res.severed = z;
      }
    }

    if (this.state === 'fakeDead') { this.setState('rising'); return res; }
    if (this.state === 'down') {
      if (this.hp < -60) { this.noRevive = true; this.die(false); res.killed = true; }
      return res;
    }
    if (this.hp <= 0) {
      this.goDown();
      res.killed = true;
      return res;
    }
    if (this.state === 'grab' || this.state === 'bite') {
      if (h.stagger > 0.6 || h.zone === 'head') this.releaseGrab(false);
      return res;
    }
    if (!this.hasLegs() && this.state !== 'crawl') { this.setState('knockdown'); return res; }
    if (h.knockdown && ['idle', 'wander', 'investigate', 'chase', 'lunge', 'stagger'].includes(this.state)) {
      this.setState('knockdown');
    } else if (Math.random() < h.stagger && ['idle', 'wander', 'investigate', 'chase', 'lunge'].includes(this.state)) {
      this.setState('stagger');
    }
    // being shot reveals the shooter
    this.lastKnown = c.player.pos.clone();
    if (['idle', 'wander', 'investigate'].includes(this.state)) this.setState('chase');
    return res;
  }

  areaHit(damage: number, from: THREE.Vector3, opts: { knockdown: boolean; acid?: boolean; burn?: number }): void {
    if (!this.alive) return;
    this.hp -= damage;
    if (opts.acid) this.noRevive = true;
    if (opts.burn) this.burnT = Math.max(this.burnT, opts.burn);
    const dir = this.position.clone().sub(from).setY(0).normalize();
    if (damage > 70) {
      const limbs: HitZone[] = ['lArm', 'rArm', 'lLeg', 'rLeg'];
      const l = limbs[Math.floor(Math.random() * 4)];
      if (Math.random() < 0.5) this.severLimb(l, dir);
    }
    if (this.hp <= 0) {
      if (this.state === 'down' || this.state === 'fakeDead' || this.hp < -80 || opts.acid) this.die(false);
      else this.goDown();
      return;
    }
    if (opts.knockdown && !['down', 'knockdown', 'crawl'].includes(this.state)) {
      this.vel.copy(dir).multiplyScalar(4);
      this.setState('knockdown');
    }
  }

  private severLimb(z: HitZone, dir: THREE.Vector3): void {
    const piece = this.model.sever(z);
    if (!piece) return;
    const c = this.ctx();
    const p = piece.position.clone();
    c.debris.add(piece, dir.clone().multiplyScalar(2.5).add(new THREE.Vector3((Math.random() - 0.5) * 2, 2.5, (Math.random() - 0.5) * 2)));
    c.bloodFx.burst(p, UP, 30, 3, 1.6, 1);
    c.blood.add(new THREE.Vector3(p.x, 0.01, p.z), UP, 0.9);
    this.hp -= 15;
    if (z === 'lLeg' || z === 'rLeg') { if (this.hp > 0) this.setState('knockdown'); }
  }

  private burstHead(dir: THREE.Vector3): void {
    const c = this.ctx();
    const p = this.headWorld(new THREE.Vector3());
    const piece = this.model.sever('head');
    if (piece) c.debris.add(piece, dir.clone().multiplyScalar(3).add(new THREE.Vector3(0, 2, 0)));
    c.bloodFx.burst(p, dir, 60, 4, 2, 1.2);
    c.bloodFx.burst(p, UP, 30, 3, 2, 1);
    c.blood.add(new THREE.Vector3(p.x, 0.01, p.z).addScaledVector(dir, 1), UP, 1.4);
    const wall = c.physics.raycast(p, dir, 4);
    if (wall) c.blood.add(wall.point, wall.normal, 1.2);
    audio.flesh(p, true);
    this.noRevive = true;
    this.die(true);
  }

  private goDown(): void {
    this.setState('down');
    this.vel.set(0, 0, 0);
    // RE2R: zombies that still have a head may get back up later
    if (!this.noRevive && !this.model.headGone && Math.random() < 0.6) this.reviveT = 8 + Math.random() * 14;
    else { this.die(false); }
  }

  private die(instant: boolean): void {
    this.alive = false;
    if (this.state !== 'down' || instant) this.setState('down');
    this.state = 'dead';
    if (this.ctx().player.grabbedBy === this) this.ctx().player.grabbedBy = null;
  }

  shove(from: THREE.Vector3): void {
    this.vel.copy(this.position.clone().sub(from).setY(0).normalize().multiplyScalar(3.2));
    this.setState(Math.random() < 0.3 ? 'knockdown' : 'shoved');
    audio.flesh(this.position.clone().setY(this.position.y + 1.3));
  }

  releaseGrab(countered: boolean): void {
    if (!this.alive) return;
    const p = this.ctx().player;
    if (p.grabbedBy === this) p.grabbedBy = null;
    this.vel.copy(this.position.clone().sub(p.pos).setY(0).normalize().multiplyScalar(2.5));
    if (countered) { this.hp -= 30; this.setState('knockdown'); }
    else this.setState('shoved');
    this.attackCd = 2.5;
  }

  // ---------------------------------------------------------------- update
  update(dt: number): void {
    const c = this.ctx();
    this.stateT += dt;
    this.attackCd -= dt;
    this.flinch.multiplyScalar(Math.exp(-8 * dt));
    if (this.burnT > 0 && this.alive) {
      this.burnT -= dt;
      this.hp -= 12 * dt;
      if (Math.random() < dt * 20) c.bloodFx.burst(this.position.clone().setY(this.position.y + 1 + Math.random()), UP, 1, 0.5, 1, 0.4);
      if (this.hp <= 0 && this.state !== 'down') this.goDown();
    }
    if (this.state === 'dead') { this.syncModel(dt, 0); return; }

    this.perceiveT -= dt;
    if (this.perceiveT <= 0 && !['fakeDead', 'down', 'knockdown', 'getup', 'rising'].includes(this.state)) {
      this.perceiveT = 0.2;
      this.perceive();
    }
    this.groanT -= dt;
    if (this.groanT <= 0 && this.alive && this.state !== 'fakeDead' && this.state !== 'down') this.groan();

    const p = c.player;
    const toP = p.pos.clone().sub(this.position).setY(0);
    const distP = toP.length();
    let move = new THREE.Vector3();
    let speed = 0;

    switch (this.state) {
      case 'idle':
        if (this.stateT > 4 + Math.random() * 4) this.setState('wander');
        break;
      case 'wander': {
        if (!this.path.length) {
          const n = c.nav.nodes;
          const near = n.filter((v) => v.distanceTo(this.home) < 10);
          const goal = near[Math.floor(Math.random() * near.length)] ?? this.home;
          this.path = c.nav.findPath(this.position, goal) ?? [goal.clone()];
        }
        speed = 0.45;
        move = this.followPath();
        if (this.stateT > 12) { this.path = []; this.setState('idle'); }
        break;
      }
      case 'investigate': {
        if (!this.lastKnown) { this.setState('wander'); break; }
        this.pathT -= dt;
        if (this.pathT <= 0) { this.path = c.nav.findPath(this.position, this.lastKnown) ?? [this.lastKnown.clone()]; this.pathT = 1.5; }
        speed = 0.6;
        move = this.followPath();
        if (this.position.distanceTo(this.lastKnown) < 1) {
          // search: look around
          this.searchT += dt;
          this.yaw += Math.sin(c.time * 1.3) * dt * 1.5;
          move.set(0, 0, 0);
          if (this.searchT > 4) { this.searchT = 0; this.lastKnown = null; this.home.copy(this.position); this.setState('wander'); }
        }
        break;
      }
      case 'chase': {
        const recentlySeen = c.time - this.lastSeenT < 0.6;
        if (recentlySeen && this.canSee) {
          move = toP.clone().normalize();
          this.path = [];
        } else if (this.lastKnown) {
          this.pathT -= dt;
          if (this.pathT <= 0 || !this.path.length) { this.path = c.nav.findPath(this.position, this.lastKnown) ?? [this.lastKnown.clone()]; this.pathT = 1; }
          move = this.followPath();
          if (this.position.distanceTo(this.lastKnown) < 0.8 && !this.canSee) { this.setState('investigate'); this.searchT = 0; }
        }
        speed = this.chaseSpeed;
        if (distP < 1.3 && this.canSee && this.attackCd <= 0 && p.state !== 'dead' && p.state !== 'grabbed') this.setState('lunge');
        break;
      }
      case 'lunge': {
        // wind-up then reach; forward lurch
        move = toP.clone().normalize();
        speed = this.stateT > 0.35 ? 1.6 : 0.2;
        if (this.stateT > 0.65) {
          const inFront = toP.clone().normalize().dot(new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw))) > 0.5;
          if (distP < 1.25 && inFront && !p.isInvulnerable()) {
            if (this.hasArms()) {
              if (p.grab(this)) { this.setState('grab'); audio.groan(this.headWorld(new THREE.Vector3()), this.voicePitch * 1.2, true); break; }
            } else {
              p.takeDamage(14, this.position);
            }
          }
          this.attackCd = 1.4;
          this.setState('stagger');
        }
        break;
      }
      case 'grab':
        // hold position facing Claire; player controller resolves bite / escape / counter
        move.set(0, 0, 0);
        if (p.grabbedBy !== this && p.state !== 'counter') { this.setState('stagger'); this.attackCd = 2; }
        this.position.lerp(p.pos.clone().addScaledVector(toP.clone().normalize(), -0.7), 1 - Math.exp(-10 * dt));
        break;
      case 'stagger':
        if (this.stateT > 0.8) this.setState('chase');
        break;
      case 'shoved':
        if (this.stateT > 1.1) this.setState(this.hasLegs() ? 'chase' : 'crawl');
        break;
      case 'knockdown':
        if (this.stateT > 2.2 + Math.random() * 0.02) this.setState(this.hasLegs() ? 'getup' : 'crawl');
        break;
      case 'getup':
        if (this.stateT > 1.6) this.setState('chase');
        break;
      case 'crawl': {
        this.lastKnown = p.pos.clone();
        move = toP.clone().normalize();
        speed = 0.35;
        if (distP < 0.9 && this.attackCd <= 0 && !p.isInvulnerable()) { p.takeDamage(9, this.position); this.attackCd = 2; }
        break;
      }
      case 'fakeDead':
        if (distP < 2.6 && this.stateT > 1) this.setState('rising');
        break;
      case 'rising':
        if (this.stateT > 2.2) { this.lastKnown = p.pos.clone(); this.setState(this.hasLegs() ? 'chase' : 'crawl'); this.groan(true); }
        break;
      case 'down':
        this.reviveT -= dt;
        if (this.reviveT <= 0 && this.reviveT > -50 && !this.noRevive) {
          this.hp = this.maxHp * 0.5;
          this.setState('rising');
          this.reviveT = -99;
        }
        break;
    }

    // ------- locomotion -------------------------------------------------
    if (move.lengthSq() > 0.001 && speed > 0) {
      const targetYaw = Math.atan2(move.x, move.z);
      let d = targetYaw - this.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
      this.yaw += d * (1 - Math.exp(-4 * dt));
      // separation from other zombies
      const sep = new THREE.Vector3();
      for (const o of c.zombies) {
        if (o === this || !o.alive) continue;
        const dv = this.position.clone().sub(o.position).setY(0);
        const dl = dv.length();
        if (dl < 0.8 && dl > 0.001) sep.addScaledVector(dv.divideScalar(dl), (0.8 - dl) * 2);
      }
      const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
      const desired = fwd.multiplyScalar(speed * Math.max(0, fwd.dot(move.clone().normalize()) * 0.7 + 0.3)).add(sep);
      this.vel.x = damp(this.vel.x, desired.x, 6, dt);
      this.vel.z = damp(this.vel.z, desired.z, 6, dt);
    } else {
      this.vel.x = damp(this.vel.x, 0, 5, dt);
      this.vel.z = damp(this.vel.z, 0, 5, dt);
    }
    if (this.state !== 'grab') c.physics.moveCircle(this.position, this.vel.clone().multiplyScalar(dt), 0.3);
    // don't overlap Claire
    if (this.alive && !['down', 'fakeDead', 'knockdown', 'crawl', 'grab'].includes(this.state)) {
      const dv = this.position.clone().sub(p.pos).setY(0);
      const dl = dv.length();
      if (dl < 0.55 && dl > 0.001) this.position.addScaledVector(dv.divideScalar(dl), 0.55 - dl);
    }
    this.syncModel(dt, Math.hypot(this.vel.x, this.vel.z));
  }

  private followPath(): THREE.Vector3 {
    while (this.path.length && this.path[0].distanceTo(this.position) < 0.6) this.path.shift();
    // skip ahead when a later waypoint is directly reachable (path smoothing)
    const phys = this.ctx().physics;
    if (this.path.length > 1 && phys.walkable(this.position, this.path[1], 0.25)) this.path.shift();
    if (!this.path.length) return new THREE.Vector3();
    return this.path[0].clone().sub(this.position).setY(0).normalize();
  }

  // ---------------------------------------------------------------- procedural animation
  private syncModel(dt: number, speed: number): void {
    const r = this.model.rig;
    const root = this.model.root;
    root.position.copy(this.position);
    root.rotation.y = this.yaw;
    this.walkPhase += dt * (0.8 + speed * 3.2);
    const s = Math.sin(this.walkPhase);
    const amp = Math.min(1, speed / 0.9);
    const t = this.stateT;
    const k = (v: number, target: number, rate = 10) => damp(v, target, rate, dt);

    // defaults: shambling stance
    let lying = 0, lyingFace = 0, lift = 0;
    let spineX = 0.25 + Math.sin(this.walkPhase * 0.5) * 0.05, spineZ = Math.sin(this.walkPhase * 0.5) * 0.08;
    let neckX = 0.2, neckZ = 0.25 * Math.sin(this.walkPhase * 0.3);
    let lUx = -0.2 + s * 0.2 * amp, rUx = -0.1 - s * 0.2 * amp, lFx = -0.4, rFx = -0.3, lUz = 0.12, rUz = -0.12;
    let lTh = -s * 0.45 * amp, rTh = s * 0.4 * amp, lSh = Math.max(0, s) * 0.6 * amp, rSh = Math.max(0, -s) * 0.5 * amp;
    let hipY = this.model.hipRest - 0.02 - Math.abs(Math.cos(this.walkPhase)) * 0.03 * amp;

    switch (this.state) {
      case 'chase':
      case 'investigate':
        lUx = -1.35 + Math.sin(this.walkPhase * 0.7) * 0.15; rUx = -1.25 + Math.cos(this.walkPhase * 0.6) * 0.15;
        lFx = -0.2; rFx = -0.25; lUz = -0.1; rUz = 0.1;
        break;
      case 'lunge': {
        const e = Math.min(1, t / 0.5);
        lUx = rUx = -1.6 * e - 0.2; lFx = rFx = -0.05; spineX = 0.1 + 0.4 * e; neckX = -0.2;
        break;
      }
      case 'grab':
      case 'bite':
        lUx = -1.4; rUx = -1.3; lFx = rFx = -0.9; lUz = -0.5; rUz = 0.5; spineX = 0.45; neckX = 0.35 + Math.sin(this.ctx().time * 9) * 0.15;
        break;
      case 'stagger':
      case 'shoved':
        spineX = -0.35 * Math.sin(Math.min(1, t) * Math.PI); lUx = 0.3; rUx = -0.6; lUz = 0.6; rUz = -0.8;
        lTh = -0.3; rTh = 0.2;
        break;
      case 'knockdown':
        lying = Math.min(1, t / 0.45);
        break;
      case 'getup':
      case 'rising':
        lying = 1 - THREE.MathUtils.smoothstep(t, 0.3, this.state === 'getup' ? 1.5 : 2.1);
        lUx = -1.2 * lying; rUx = -1.0 * lying;
        break;
      case 'fakeDead':
      case 'down':
      case 'dead':
        lying = Math.min(1, t / 0.5 + (this.state === 'fakeDead' ? 1 : 0));
        lUx = -0.4; rUx = -2.6; lUz = 0.7; rUz = -0.4; lTh = 0.1; rTh = -0.25; neckZ = 0.5;
        break;
      case 'crawl':
        lyingFace = 1;
        lUx = -2.6 + Math.sin(this.walkPhase * 1.2) * 0.5; rUx = -2.6 - Math.sin(this.walkPhase * 1.2) * 0.5;
        lFx = rFx = -0.3; neckX = -0.9; lTh = rTh = 0; lSh = rSh = 0.1;
        break;
    }
    if (lying > 0 && this.state !== 'rising' && this.state !== 'getup') { spineX = 0; neckX = 0.1; }

    // root orientation: back-lying for knockdown/down, face-down for crawl
    const targetRX = -Math.PI / 2 * lying + Math.PI / 2 * lyingFace;
    root.rotation.x = k(root.rotation.x, targetRX, lying === 1 || lyingFace ? 8 : 12);
    lift = Math.abs(Math.sin(root.rotation.x)) * 0.14;
    root.position.y = this.position.y + lift;

    const fl = this.flinch;
    const localFl = fl.clone().applyAxisAngle(UP, -this.yaw);
    r.hips.position.y = k(r.hips.position.y, hipY, 12);
    r.spine.rotation.x = k(r.spine.rotation.x, spineX + localFl.z * 1.2, 12);
    r.spine.rotation.z = k(r.spine.rotation.z, spineZ - localFl.x * 1.2, 12);
    r.neck.rotation.x = k(r.neck.rotation.x, neckX + localFl.z * 1.5, 10);
    r.neck.rotation.z = k(r.neck.rotation.z, neckZ, 6);
    r.lUpperArm.rotation.x = k(r.lUpperArm.rotation.x, lUx, 8);
    r.rUpperArm.rotation.x = k(r.rUpperArm.rotation.x, rUx, 8);
    r.lUpperArm.rotation.z = k(r.lUpperArm.rotation.z, lUz, 8);
    r.rUpperArm.rotation.z = k(r.rUpperArm.rotation.z, rUz, 8);
    r.lForearm.rotation.x = k(r.lForearm.rotation.x, lFx, 8);
    r.rForearm.rotation.x = k(r.rForearm.rotation.x, rFx, 8);
    r.lThigh.rotation.x = k(r.lThigh.rotation.x, lTh, 12);
    r.rThigh.rotation.x = k(r.rThigh.rotation.x, rTh, 12);
    r.lShin.rotation.x = k(r.lShin.rotation.x, lSh, 12);
    r.rShin.rotation.x = k(r.rShin.rotation.x, rSh, 12);
  }
}

