import * as THREE from 'three';
import type { HitInfo, HitResult } from '../combat/HitZones';
import type { ZombieContext, ZombieSpawn } from './Zombie';
import { CreatureModel } from './Creature';
import { Monster, UP } from './Monster';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';
import { damp } from '../Rig';

/** tongue scale along its bone: 1 = the sculpted full length (~4.4 m) */
const TONGUE_IN = 0.012;
const TONGUE_LEN = 4.4;

/**
 * Licker — blind, skinless crawler. Hunts by sound: running / gunfire draw it in, a slow walk close by gives
 * Claire away only within ~3 m. Attacks: tongue lash (2–4.2 m), claw swipe (close), leaping pounce (3.5–6 m).
 * Procedural quadruped animation on the RE6 em3000 mesh (tools/import/licker.py).
 */
export class Licker extends Monster {
  readonly kind = 'licker';
  model: CreatureModel;
  protected sense = { cone: 0, range: 14, near: 3.2, blind: true, hearMult: 1.25 };
  protected radius = 0.42;
  private phase = Math.random() * 10;
  private tongue = TONGUE_IN;
  private clickT = 1 + Math.random() * 2;
  private stepSign = 0;
  private lie = 0;
  private air = 0;
  private side = 1;

  constructor(spawn: ZombieSpawn, scene: THREE.Object3D, ctx: () => ZombieContext) {
    super(spawn, ctx, 140 + Math.random() * 30);
    this.model = new CreatureModel('licker');
    for (const m of this.model.meshes) m.userData.owner = this;
    scene.add(this.model.root);
    if (spawn.wander) this.setState('wander');
    this.anim(0, 0);
  }

  get hitMeshes(): THREE.Object3D[] { return this.alive ? this.model.meshes : []; }
  headWorld(out: THREE.Vector3): THREE.Vector3 { return this.model.world('head', out); }
  forceDead(): void { this.alive = false; this.setState('dead'); this.stateT = 5; for (let i = 0; i < 10; i++) this.anim(0.5, 0); }
  protected onAlert(): void { audio.licker(this.headWorld(new THREE.Vector3()), 'shriek'); }

  takeHit(h: HitInfo): HitResult {
    const res: HitResult = { killed: false, severed: null, headBurst: false };
    if (!this.alive) return res;
    if (!this.damage(h.bodyDamage * (h.zone === 'head' ? 0.6 : 1), h.dir, 0.25 + h.stagger * 0.3)) { res.killed = true; return res; }
    if (h.knockdown || (h.stagger > 0.8 && Math.random() < 0.35)) { this.setState('down'); this.vel.copy(h.dir).setY(0).multiplyScalar(2.5); audio.licker(this.position, 'shriek'); }
    else if (Math.random() < h.stagger * 0.7 && this.state !== 'pounce') { this.setState('stagger'); if (Math.random() < 0.5) audio.licker(this.position, 'shriek'); }
    else if (this.state === 'idle' || this.state === 'wander') this.setState('chase');
    return res;
  }

  protected die(): void {
    this.alive = false;
    this.setState('dead');
    audio.licker(this.headWorld(new THREE.Vector3()), 'shriek');
    const c = this.ctx();
    const at = this.model.world('chest', new THREE.Vector3());
    c.bloodFx.burst(at, UP, 30, 3, 1.5, 1);
    c.blood.add(new THREE.Vector3(at.x, this.position.y + 0.01, at.z), UP, 1.4);
  }

  update(dt: number): void {
    const c = this.ctx();
    this.tickCommon(dt);
    if (!this.alive) { this.vel.multiplyScalar(Math.exp(-4 * dt)); c.physics.moveCircle(this.position, this.vel.clone().multiplyScalar(dt), 0.3); this.anim(dt, 0); return; }
    this.clickT -= dt;
    if (this.clickT <= 0) { audio.licker(this.headWorld(new THREE.Vector3()), Math.random() < 0.25 ? 'hiss' : 'click'); this.clickT = (this.state === 'idle' ? 2.5 : 1.4) + Math.random() * 2; }
    const p = c.player;
    const toP = p.pos.clone().sub(this.position).setY(0);
    const dist = toP.length();
    const dirP = dist > 0.001 ? toP.clone().divideScalar(dist) : new THREE.Vector3(0, 0, 1);
    let move = new THREE.Vector3(); let speed = 0; let face: THREE.Vector3 | null = null; let turn = 6;
    const t = this.stateT;
    switch (this.state) {
      case 'idle': if (t > 4 + Math.random() * 3) this.setState('wander'); break;
      case 'wander': move = this.wanderMove(); speed = 0.7; if (t > 10) { this.path = []; this.setState('idle'); } break;
      case 'chase': {
        if (p.state === 'dead') { this.setState('idle'); break; }
        move = this.pursue(dt, dirP); speed = 2.9;
        if (this.canSee && this.attackCd <= 0) {
          const ahead = this.fwd.dot(dirP) > 0.8;
          if (dist < 1.7) this.setState('swipe');
          else if (dist > 3.6 && dist < 6 && ahead && Math.random() < dt * 1.2 && c.physics.lineOfSight(this.position.clone().setY(this.position.y + 0.5), p.pos.clone().setY(p.pos.y + 0.5))) { this.setState('pounce'); audio.licker(this.position, 'shriek'); }
          else if (dist > 2 && dist < 4.2 && ahead && Math.random() < dt * 4) this.setState('lash');
        }
        if (dist < 1.3) speed = 0;
        break;
      }
      case 'lash': {
        // wind-up (head back, jaw open) → tongue shoots out to Claire → whips back
        face = dirP; turn = 10;
        const L = THREE.MathUtils.clamp((dist + 0.3) / TONGUE_LEN, 0.15, 1);
        if (t < 0.38) this.tongue = damp(this.tongue, 0.03, 8, dt);
        else if (t < 0.52) {
          this.tongue = damp(this.tongue, L, 30, dt);
          if (!this.struck && t > 0.46) {
            this.struck = true; audio.licker(this.headWorld(new THREE.Vector3()), 'lash');
            if (dist < 4.4 && this.strike(4.5, 0.85, 14 + Math.random() * 6, 2.5, 0.25)) audio.flesh(p.chest(), false);
          }
        } else if (t < 0.62) { /* hold */ } else this.tongue = damp(this.tongue, TONGUE_IN, 9, dt);
        if (t > 1.15) { this.attackCd = 1.2 + Math.random(); this.setState('chase'); }
        break;
      }
      case 'swipe': {
        face = dirP; turn = 8; speed = t < 0.25 ? 0.6 : 0; move = dirP;
        if (t > 0.32 && !this.struck) {
          this.struck = true;
          if (this.strike(2.0, 0.4, 20 + Math.random() * 6, 4.5)) audio.flesh(p.chest(), true);
        }
        if (t > 0.85) { this.attackCd = 0.9 + Math.random() * 0.6; this.side = -this.side; this.setState('chase'); }
        break;
      }
      case 'pounce': {
        face = t < 0.3 ? dirP : null; turn = 12;
        if (t < 0.3) speed = 0;
        else if (t < 0.85) {
          if (this.air === 0) { this.vel.copy(dirP).multiplyScalar(Math.min(10, dist / 0.5)); this.air = 1e-3; }
          this.air = (t - 0.3) / 0.55;
          speed = -1;
          if (!this.struck && dist < 1.3) {
            this.struck = true;
            if (this.strike(1.6, 0.2, 24 + Math.random() * 6, 6, 0.5)) audio.flesh(p.chest(), true);
          }
        } else { this.air = 0; speed = 0; if (t > 1.15) { this.attackCd = 1.5 + Math.random(); this.setState('chase'); } }
        break;
      }
      case 'stagger': if (t > 0.6) this.setState('chase'); break;
      case 'down': if (t > 1.7) { this.setState('chase'); audio.licker(this.position, 'hiss'); } break;
    }
    if (this.state !== 'lash') this.tongue = damp(this.tongue, TONGUE_IN, 9, dt);
    if (this.state !== 'pounce') this.air = 0;
    this.locomote(dt, move, speed, face, this.state === 'down' || this.state === 'stagger' ? 0 : turn, 6);
    this.anim(dt, Math.hypot(this.vel.x, this.vel.z));
  }

  // ------------------------------------------------------------- procedural quadruped animation
  private anim(dt: number, speed: number): void {
    const m = this.model, root = m.root, t = this.stateT, R = 16;
    root.position.copy(this.position);
    root.rotation.y = this.yaw;
    const fl = this.flinch.clone().applyAxisAngle(UP, -this.yaw);
    this.phase += dt * (1.1 + speed * 2.0) * Math.PI;
    const s = this.phase;
    const amp = Math.min(1, speed / 2.4);
    // diagonal gait: lF+rH / rF+lH
    const A = 0.5 * amp;
    const ph = [0, Math.PI, Math.PI, 0]; // lF rF lH rH
    let sw = ph.map((o) => Math.sin(s + o) * A);
    let lift = ph.map((o) => Math.max(0, Math.cos(s + o)) * amp);
    let spineY = Math.sin(s) * 0.12 * amp, spineX = 0, chestX = 0, neckX = 0, headX = 0, headY = Math.sin(this.phase * 0.23) * 0.25, jaw = 0.08 + Math.max(0, Math.sin(this.phase * 0.9)) * 0.06;
    let bodyY = Math.abs(Math.sin(s)) * 0.03 * amp, crouch = 0, lie = 0, rArm = 0, rArmZ = 0, lArm = 0, lArmZ = 0, flick = 0;
    switch (this.state) {
      case 'idle': headY = Math.sin(t * 1.3) * 0.35; neckX = -0.15 + Math.sin(t * 0.7) * 0.08; jaw = 0.15 + Math.abs(Math.sin(t * 7)) * 0.08; flick = Math.max(0, Math.sin(t * 5)) * 0.04; break;
      case 'chase': neckX = -0.1; headY *= 0.4; break;
      case 'lash': {
        headY = 0;
        if (t < 0.38) { const e = t / 0.38; neckX = -0.45 * e; headX = -0.2 * e; jaw = 0.7 * e; crouch = 0.4 * e; }
        else if (t < 0.62) { neckX = 0.15; headX = 0.1; jaw = 0.95; crouch = 0.2; }
        else { const e = Math.min(1, (t - 0.62) / 0.4); neckX = 0.15 * (1 - e); jaw = 0.95 * (1 - e) + 0.15 * e; }
        break;
      }
      case 'swipe': {
        const e = Math.min(1, t / 0.28), k = t < 0.28 ? 0 : Math.min(1, (t - 0.28) / 0.14);
        chestX = -0.35 * e * (1 - k * 0.4); spineX = -0.15 * e; jaw = 0.8;
        const a = THREE.MathUtils.lerp(-1.3, 0.6, k) * e, z = THREE.MathUtils.lerp(0.7, -0.4, k) * e;
        if (this.side > 0) { rArm = a; rArmZ = -z; } else { lArm = a; lArmZ = z; }
        break;
      }
      case 'pounce': {
        if (t < 0.3) { crouch = t / 0.3; jaw = 0.6; neckX = -0.2; }
        else if (t < 0.85) { const e = (t - 0.3) / 0.55; bodyY = Math.sin(e * Math.PI) * 0.75; sw = [-1.0, -1.0, 0.8, 0.8]; lift = [0.2, 0.2, 0.1, 0.1]; jaw = 1; neckX = -0.3; chestX = -0.25 * Math.sin(e * Math.PI); }
        else crouch = Math.max(0, 1 - (t - 0.85) / 0.3) * 0.7;
        break;
      }
      case 'stagger': chestX = -0.3 * Math.sin(Math.min(1, t / 0.6) * Math.PI); neckX = -0.4; jaw = 0.8; break;
      case 'down': lie = Math.min(1, t / 0.25) * (t < 1.3 ? 1 : Math.max(0, 1 - (t - 1.3) / 0.4)); jaw = 0.6; sw = [0.6, -0.4, 0.5, -0.3]; break;
      case 'dead': lie = Math.min(1, t / 0.5); jaw = 0.7; sw = [0.8, -0.5, 0.6, -0.4]; lift = [0.6, 0.5, 0.4, 0.5]; neckX = 0.3; break;
    }
    this.lie = this.state === 'dead' ? Math.max(this.lie, lie) : lie;
    // forelimbs (upper arm swing fore/aft, elbow lift), hind limbs (thigh swing, knee/ankle fold)
    m.rot('lUpperArm', sw[0] + crouch * 0.3 + lArm, 0, lArmZ, R, dt); m.rot('rUpperArm', sw[1] + crouch * 0.3 + rArm, 0, rArmZ, R, dt);
    m.rot('lForearm', -lift[0] * 0.7 - crouch * 0.4, 0, 0, R, dt); m.rot('rForearm', -lift[1] * 0.7 - crouch * 0.4, 0, 0, R, dt);
    m.rot('lThigh', sw[2] - crouch * 0.4, 0, 0, R, dt); m.rot('rThigh', sw[3] - crouch * 0.4, 0, 0, R, dt);
    m.rot('lShin', lift[2] * 0.8 + crouch * 0.6, 0, 0, R, dt); m.rot('rShin', lift[3] * 0.8 + crouch * 0.6, 0, 0, R, dt);
    m.rot('lFoot', -lift[2] * 0.5 - crouch * 0.3, 0, 0, R, dt); m.rot('rFoot', -lift[3] * 0.5 - crouch * 0.3, 0, 0, R, dt);
    m.rot('hips', fl.z * 0.4, 0, -fl.x * 0.4, 12, dt);
    m.rot('spine', spineX, spineY, 0, 12, dt);
    m.rot('chest', chestX + fl.z * 0.5, -spineY, -fl.x * 0.3, 12, dt);
    m.rot('neck', neckX, headY * 0.5, 0, 10, dt);
    m.rot('head', headX, headY * 0.5, 0, 10, dt);
    m.rot('jaw', jaw, 0, 0, 22, dt);
    m.stretch('tongue', this.tongue + flick);
    m.offset('hips', 0, bodyY - crouch * 0.12, 0);
    root.rotation.z = damp(root.rotation.z, this.lie * 2.6, 7, dt);
    root.position.y = this.position.y + Math.sin(Math.min(Math.PI / 2, root.rotation.z)) * 0.25;
    // footsteps (wet slaps)
    const sg = Math.sign(Math.sin(s));
    if (speed > 0.5 && sg !== this.stepSign) { this.stepSign = sg; audio.footstep(this.position, speed > 2, true); }
    void bus;
  }
}
