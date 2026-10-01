import * as THREE from 'three';
import { ClaireModel, type ClaireState } from './ClaireModel';
import type { CameraRig } from './CameraRig';
import type { Input } from '../../engine/Input';
import type { PhysicsWorld } from '../../engine/Physics';
import type { WeaponSystem } from '../combat/WeaponSystem';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';
import { damp } from '../Rig';

/** Minimal view of an enemy the player needs (shove / finisher / grab). */
export interface PlayerTarget {
  alive: boolean;
  position: THREE.Vector3;
  isDowned(): boolean;
  canBeShoved(): boolean;
  shove(from: THREE.Vector3): void;
  releaseGrab(countered: boolean): void;
}

const ACTION_TIME: Partial<Record<ClaireState, number>> = {
  dodge: 0.5, knife: 0.42, shove: 0.55, hurt: 0.45, finisher: 0.95, counter: 0.8, dead: 1.2,
};

/**
 * Claire's third-person controller.
 * Walk / Run(Shift) / Aim-walk strafe / Shove(Q) / Knife(F) /
 * Knife finisher on downed enemies / Grab struggle + knife counter / limp at Danger.
 */
export class PlayerController {
  model: ClaireModel;
  pos = new THREE.Vector3();
  vel = new THREE.Vector3();
  yaw = 0;
  hp = 100;
  maxHp = 100;
  /** Stamina removed from design; kept constant for weapon-sway API compatibility. */
  readonly stamina = 100;
  poisoned = false;
  defenseT = 0;
  state: ClaireState = 'normal';
  stateTime = 0;
  aiming = false;
  radius = 0.3;
  grabbedBy: PlayerTarget | null = null;
  private struggle = 0;
  private biteT = 0;
  counterCooldown = 0;
  private actionDone = false;
  private dodgeDir = new THREE.Vector2();
  private dodgeWorld = new THREE.Vector3();
  private heartbeatT = 0;
  private actionTarget: PlayerTarget | null = null;
  indoor = false;
  onDeath?: () => void;

  /** both playable characters are built up-front (shaders warmed at load); only one is visible */
  readonly models: Record<'claire' | 'steve', ClaireModel>;
  character: 'claire' | 'steve' = 'claire';
  /** health of the character that is not being controlled */
  hpBy: Partial<Record<'claire' | 'steve', { hp: number; poisoned: boolean }>> = {};

  constructor(texSize: number, scene: THREE.Scene) {
    const step = () => {
      const run = this.speed() > 3;
      audio.footstep(this.pos, run, !this.indoor);
      if (this.speed() > 0.5) bus.emit('noise', { pos: this.pos.clone(), radius: run ? 8 : 2.5, kind: run ? 'run' : 'walk' });
    };
    const claire = new ClaireModel(texSize, 'claire');
    const steve = new ClaireModel(texSize, 'steve');
    this.models = { claire, steve };
    for (const m of [claire, steve]) { scene.add(m.root); m.onFootstep = step; }
    steve.root.visible = false;
    this.model = claire;
  }

  /** swap the controlled character in place (Claire ⇄ Steve) */
  setCharacter(c: 'claire' | 'steve'): void {
    if (c === this.character) return;
    const old = this.model;
    this.hpBy[this.character] = { hp: this.hp, poisoned: this.poisoned };
    const st = this.hpBy[c] ?? { hp: this.maxHp, poisoned: false };
    this.hp = st.hp; this.poisoned = st.poisoned;
    this.character = c;
    this.model = this.models[c];
    old.root.visible = false;
    this.model.root.visible = true;
    this.model.root.position.copy(this.pos);
    this.model.root.rotation.y = this.yaw;
  }

  speed(): number { return Math.hypot(this.vel.x, this.vel.z); }
  hpRatio(): number { return this.hp / this.maxHp; }
  status(): 'fine' | 'caution' | 'danger' { const r = this.hpRatio(); return r > 0.66 ? 'fine' : r > 0.33 ? 'caution' : 'danger'; }
  isInvulnerable(): boolean { return this.state === 'dodge' && this.stateTime < 0.32 || this.state === 'dead' || this.state === 'counter' || this.state === 'finisher'; }
  forward(): THREE.Vector3 { return new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw)); }
  chest(): THREE.Vector3 { return this.pos.clone().add(new THREE.Vector3(0, 1.3, 0)); }

  private setState(s: ClaireState): void { this.state = s; this.stateTime = 0; this.actionDone = false; }

  takeDamage(amount: number, from?: THREE.Vector3): boolean {
    if (this.isInvulnerable() || this.hp <= 0) return false;
    const dmg = amount * (this.defenseT > 0 ? 0.5 : 1);
    this.hp = Math.max(0, this.hp - dmg);
    this.model.expressionPain = 1;
    bus.emit('playerHurt', { amount: dmg });
    bus.emit('cameraShake', { strength: 0.4, duration: 0.25 });
    if (from) { const push = this.pos.clone().sub(from).setY(0).normalize().multiplyScalar(2.5); this.vel.add(push); }
    if (this.hp <= 0) { this.die(); return true; }
    if (this.state !== 'grabbed') this.setState('hurt');
    return true;
  }

  die(): void {
    this.grabbedBy = null;
    this.setState('dead');
    this.onDeath?.();
  }

  heal(amount: number, cure = false, defense = false): void {
    this.hp = Math.min(this.maxHp, this.hp + amount);
    if (cure) this.poisoned = false;
    if (defense) this.defenseT = 90;
  }

  /** Called by a zombie that successfully grabs Claire. */
  grab(by: PlayerTarget): boolean {
    if (this.isInvulnerable() || this.state === 'grabbed' || this.hp <= 0) return false;
    this.grabbedBy = by;
    this.struggle = 0;
    this.biteT = 1.7;
    this.aiming = false;
    this.setState('grabbed');
    return true;
  }

  update(dt: number, t: number, input: Input, rig: CameraRig, physics: PhysicsWorld, weapons: WeaponSystem, targets: PlayerTarget[]): void {
    this.stateTime += dt;
    this.counterCooldown = Math.max(0, this.counterCooldown - dt);
    this.defenseT = Math.max(0, this.defenseT - dt);
    const dur = ACTION_TIME[this.state];
    const k = dur ? Math.min(1, this.stateTime / dur) : 0;

    // ----- input → desired movement ---------------------------------------
    let mx = input.moveX(), my = input.moveY();
    const ml = Math.hypot(mx, my);
    if (ml > 1) { mx /= ml; my /= ml; }
    const fwd = rig.flatForward(), right = rig.flatRight();
    const wish = new THREE.Vector3().addScaledVector(fwd, my).addScaledVector(right, mx);
    const wishLen = Math.min(1, wish.length());
    if (wishLen > 0.01) wish.normalize();

    const danger = this.status() === 'danger';
    let targetSpeed = 0;
    const running = input.run() && wishLen > 0.1;

    if (this.state === 'normal') {
      this.aiming = input.aim() && weapons.def.type !== 'melee';
      if (this.aiming) {
        this.yaw = this.turnToward(this.yaw, rig.yaw, 18, dt);
        targetSpeed = (danger ? 0.8 : 1.15) * wishLen;
      } else {
        if (wishLen > 0.1) this.yaw = this.turnToward(this.yaw, Math.atan2(wish.x, wish.z), running ? 8 : 10, dt);
        targetSpeed = (running ? (danger ? 2.9 : 4.3) : (danger ? 1.5 : 2.2)) * wishLen;
      }
      // actions
      if (input.knife()) this.startKnife(targets);
      else if (input.shove()) this.startShove(targets);
    } else {
      this.aiming = false;
    }


    // ----- state machines --------------------------------------------------
    const desired = wish.clone().multiplyScalar(targetSpeed);
    switch (this.state) {
      case 'knife':
        desired.set(0, 0, 0);
        if (!this.actionDone && this.stateTime > 0.14) {
          this.actionDone = true;
          weapons.knifeAttack(this.pos.clone().add(new THREE.Vector3(0, 1.25, 0)), this.forward());
        }
        break;
      case 'finisher':
      case 'counter':
        desired.set(0, 0, 0);
        if (!this.actionDone && this.stateTime > 0.42) {
          this.actionDone = true;
          weapons.knifeAttack(this.pos.clone().add(new THREE.Vector3(0, 1.1, 0)), this.forward(), this.state === 'finisher');
          if (this.state === 'counter' && this.actionTarget) this.actionTarget.releaseGrab(true);
        }
        break;
      case 'shove':
        desired.set(0, 0, 0);
        if (!this.actionDone && this.stateTime > 0.15) {
          this.actionDone = true;
          for (const z of targets) {
            if (!z.alive || !z.canBeShoved()) continue;
            const to = z.position.clone().sub(this.pos).setY(0);
            if (to.length() < 1.9 && to.normalize().dot(this.forward()) > 0.45) z.shove(this.pos);
          }
        }
        break;
      case 'grabbed':
        desired.set(0, 0, 0);
        this.vel.set(0, 0, 0);
        if (this.grabbedBy) {
          const to = this.grabbedBy.position.clone().sub(this.pos);
          this.yaw = this.turnToward(this.yaw, Math.atan2(to.x, to.z), 12, dt);
        }
        if (input.knife() && this.counterCooldown <= 0 && this.stateTime < 1.3) {
          // knife counter (sub-weapon defence)
          this.actionTarget = this.grabbedBy;
          this.grabbedBy = null;
          this.counterCooldown = 20;
          this.setState('counter');
          bus.emit('message', { text: 'Контратака ножом!' });
          break;
        }
        if (input.struggle()) this.struggle += 0.2;
        this.struggle = Math.max(0, this.struggle - dt * 0.25);
        this.biteT -= dt;
        if (this.struggle >= 1) {
          this.grabbedBy?.releaseGrab(false);
          this.grabbedBy = null;
          this.setState('normal');
        } else if (this.biteT <= 0) {
          const by = this.grabbedBy;
          this.grabbedBy = null;
          this.setState('normal');
          by?.releaseGrab(false);
          this.takeDamage(22 + Math.random() * 8, by?.position);
          audio.flesh(this.chest(), true);
        }
        break;
      case 'hurt':
        desired.multiplyScalar(0.3);
        break;
      case 'dead':
        desired.set(0, 0, 0);
        break;
    }
    if (dur && this.stateTime >= dur && this.state !== 'dead') this.setState('normal');

    // ----- integrate ------------------------------------------------------
    if (this.state !== 'dodge') {
      const accel = desired.lengthSq() > this.vel.lengthSq() ? 12 : 14;
      this.vel.x = damp(this.vel.x, desired.x, accel, dt);
      this.vel.z = damp(this.vel.z, desired.z, accel, dt);
    }
    physics.moveCircle(this.pos, this.vel.clone().multiplyScalar(dt), this.radius);
    this.model.root.position.copy(this.pos);
    this.model.root.rotation.y = this.yaw;

    // heartbeat at danger
    if (danger && this.state !== 'dead') {
      this.heartbeatT -= dt;
      if (this.heartbeatT <= 0) { audio.heartbeat(0.6); this.heartbeatT = 0.9; }
    }

    // animation
    const inv = new THREE.Vector3(Math.sin(-this.yaw), 0, Math.cos(-this.yaw));
    void inv;
    const localV = this.vel.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -this.yaw);
    const sp = this.speed();
    this.model.animate(dt, t, {
      speed: sp,
      localMove: new THREE.Vector2(localV.x / Math.max(0.01, sp), localV.z / Math.max(0.01, sp)),
      running: sp > 3,
      aim: this.aiming,
      aimPitch: rig.pitch,
      aimPoint: weapons.aimPoint,
      state: this.state,
      stateT: dur ? k : 0,
      dodgeDir: this.dodgeDir,
      hpRatio: this.hpRatio(),
      reloading: weapons.isReloading(),
      lookTarget: this.aiming ? weapons.aimPoint : this.nearestThreat(targets),
    });
  }

  private nearestThreat(targets: PlayerTarget[]): THREE.Vector3 | null {
    let best: PlayerTarget | null = null, bd = 8;
    for (const z of targets) {
      if (!z.alive) continue;
      const d = z.position.distanceTo(this.pos);
      if (d < bd) { bd = d; best = z; }
    }
    return best ? best.position.clone().add(new THREE.Vector3(0, 1.5, 0)) : null;
  }


  private startKnife(targets: PlayerTarget[]): void {
    for (const z of targets) {
      if (!z.alive || !z.isDowned()) continue;
      const to = z.position.clone().sub(this.pos).setY(0);
      if (to.length() < 1.8) {
        this.yaw = Math.atan2(to.x, to.z);
        this.setState('finisher');
        return;
      }
    }
    this.setState('knife');
  }

  private startShove(targets: PlayerTarget[]): void {
    let best: PlayerTarget | null = null, bd = 2.2;
    for (const z of targets) {
      if (!z.alive) continue;
      const d = z.position.distanceTo(this.pos);
      if (d < bd) { bd = d; best = z; }
    }
    if (best) { const to = best.position.clone().sub(this.pos); this.yaw = Math.atan2(to.x, to.z); }
    this.setState('shove');
  }

  private turnToward(cur: number, target: number, rate: number, dt: number): number {
    let d = target - cur;
    d = Math.atan2(Math.sin(d), Math.cos(d));
    return cur + d * (1 - Math.exp(-rate * dt));
  }
}
