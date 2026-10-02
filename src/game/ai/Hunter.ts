import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { HitInfo, HitResult, HitZone } from '../combat/HitZones';
import type { ZombieContext, ZombieSpawn } from './Zombie';
import { ModelLibrary } from '../assets/ModelLibrary';
import { Monster, UP } from './Monster';
import { audio } from '../../engine/AudioEngine';

/** bone index (boneN_…) → hit zone. Rig (tools/import/hunter.py): 0 root, 1 spine, 2 chest, 3 neck, 4 head, 5 jaw,
 *  6-12 right arm + claws, 13-19 left arm + claws, 20 pelvis, 21-24 right leg, 25-28 left leg. */
function hunterZone(name: string): HitZone {
  const m = /^bone(\d+)_/.exec(name); const i = m ? +m[1] : -1;
  if (i >= 3 && i <= 5) return 'head';
  if (i >= 6 && i <= 12) return 'rArm';
  if (i >= 13 && i <= 19) return 'lArm';
  if (i >= 21 && i <= 24) return 'rLeg';
  if (i >= 25 && i <= 28) return 'lLeg';
  return 'torso';
}

/** Hunter (MA-121) model: the source skeleton + its own animation clips through an AnimationMixer. */
export class HunterModel {
  root = new THREE.Group();
  meshes: THREE.SkinnedMesh[] = [];
  mixer: THREE.AnimationMixer;
  private actions = new Map<string, THREE.AnimationAction>();
  current: THREE.AnimationAction | null = null;
  currentName = '';
  private head?: THREE.Object3D;
  private chest?: THREE.Object3D;
  readonly ok: boolean;

  constructor() {
    const g = ModelLibrary.get('enemy_hunter');
    const flip = new THREE.Group();
    flip.rotation.x = Math.PI;   // source is authored upside-down (bone255 + Sketchfab axis fix)
    flip.scale.setScalar(0.8);
    this.root.add(flip);
    if (!g) {
      this.ok = false;
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 1.0, 4, 8), new THREE.MeshStandardMaterial({ color: 0x4a5a3a }));
      m.position.y = 0.9; this.root.add(m);
      this.mixer = new THREE.AnimationMixer(this.root);
      return;
    }
    this.ok = true;
    const sc = cloneSkinned(g.scene);
    flip.add(sc);
    sc.traverse((o) => {
      const sm = o as THREE.SkinnedMesh;
      if (sm.isSkinnedMesh) {
        sm.frustumCulled = false; sm.castShadow = true; sm.receiveShadow = true;
        const mat = (sm.material as THREE.MeshStandardMaterial).clone();
        mat.envMapIntensity = 0.5; mat.side = THREE.FrontSide;
        sm.material = mat;
        sm.userData.boneZones = sm.skeleton.bones.map((b) => hunterZone(b.name));
        this.meshes.push(sm);
      }
      if (/^bone4_/.test(o.name)) this.head = o;
      if (/^bone2_/.test(o.name)) this.chest = o;
    });
    this.mixer = new THREE.AnimationMixer(sc);
    for (const a of g.animations) this.actions.set(a.name, this.mixer.clipAction(a));
  }

  /** cross-fade to a clip; once=true clamps on the last frame */
  play(name: string, fade = 0.15, once = false, timeScale = 1, from = 0): THREE.AnimationAction | null {
    const a = this.actions.get(name); if (!a) return null;
    a.timeScale = timeScale;
    if (this.current === a && !once && from === 0) return a;
    a.reset(); a.time = from;
    a.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); a.clampWhenFinished = once;
    a.enabled = true; a.setEffectiveWeight(1); a.play();
    if (this.current && this.current !== a) this.current.crossFadeTo(a, fade, false);
    this.current = a; this.currentName = name;
    return a;
  }
  update(dt: number): void { this.mixer.update(dt); }
  world(which: 'head' | 'chest', out: THREE.Vector3): THREE.Vector3 {
    const o = which === 'head' ? this.head : this.chest;
    return o ? o.getWorldPosition(out) : this.root.getWorldPosition(out).setY(this.root.position.y + (which === 'head' ? 1.5 : 1.1));
  }
}

/**
 * Hunter — fast reptilian B.O.W.: sprints on all fours, leaps over the gap (and low obstacles) straight at Claire,
 * slashes with its claws on landing; close range claw swipes. Sees in a wide cone, hears gunfire.
 */
export class Hunter extends Monster {
  readonly kind = 'hunter';
  model: HunterModel;
  protected sense = { cone: 70, range: 20, near: 3, blind: false, hearMult: 1.2 };
  protected radius = 0.45;
  private voiceT = 2 + Math.random() * 3;
  private airDur = 0.6;
  private air = 0;
  private stepT = 0;

  constructor(spawn: ZombieSpawn, scene: THREE.Object3D, ctx: () => ZombieContext) {
    super(spawn, ctx, 190 + Math.random() * 40);
    this.model = new HunterModel();
    for (const m of this.model.meshes) m.userData.owner = this;
    scene.add(this.model.root);
    this.model.play('idle', 0);
    if (spawn.wander) this.setState('wander');
    this.sync(0);
  }

  get hitMeshes(): THREE.Object3D[] { return this.alive ? this.model.meshes : []; }
  headWorld(out: THREE.Vector3): THREE.Vector3 { return this.model.world('head', out); }
  forceDead(): void { this.alive = false; this.setState('dead'); this.model.play('dead', 0); this.model.update(0.1); this.sync(0); }
  protected onAlert(): void { this.voice('screech'); }
  private voice(k: 'croak' | 'screech' | 'die'): void { audio.hunter(this.headWorld(new THREE.Vector3()), k); this.voiceT = 3 + Math.random() * 4; }

  takeHit(h: HitInfo): HitResult {
    const res: HitResult = { killed: false, severed: null, headBurst: false };
    if (!this.alive) return res;
    if (!this.damage(h.bodyDamage * (h.zone === 'head' ? 0.5 : 1), h.dir, 0.15)) { res.killed = true; return res; }
    if (this.state === 'leap' && this.stateT > 0.3) return res;     // airborne: no flinch
    if (h.knockdown && Math.random() < 0.5) { this.setState('down'); this.model.play('hurtBig', 0.08, true); this.voice('screech'); }
    else if (Math.random() < h.stagger * 0.55) { this.setState('stagger'); this.model.play(Math.random() < 0.5 ? 'hurt' : 'hurt2', 0.06, true); }
    else if (this.state === 'idle' || this.state === 'wander') this.setState('chase');
    return res;
  }

  protected die(): void {
    this.alive = false;
    this.setState('dead');
    this.model.play(Math.random() < 0.5 ? 'die' : 'die2', 0.1, true);
    this.voice('die');
    const c = this.ctx();
    const at = this.model.world('chest', new THREE.Vector3());
    c.bloodFx.burst(at, UP, 30, 3, 1.5, 1);
    c.blood.add(new THREE.Vector3(at.x, this.position.y + 0.01, at.z), UP, 1.5);
  }

  update(dt: number): void {
    const c = this.ctx();
    this.tickCommon(dt);
    if (!this.alive) { this.vel.multiplyScalar(Math.exp(-4 * dt)); c.physics.moveCircle(this.position, this.vel.clone().multiplyScalar(dt), 0.3); this.model.update(dt); this.sync(dt); return; }
    this.voiceT -= dt;
    if (this.voiceT <= 0 && this.state !== 'idle') this.voice('croak');
    const p = c.player;
    const toP = p.pos.clone().sub(this.position).setY(0);
    const dist = toP.length();
    const dirP = dist > 0.001 ? toP.clone().divideScalar(dist) : new THREE.Vector3(0, 0, 1);
    let move = new THREE.Vector3(); let speed = 0; let face: THREE.Vector3 | null = null; let turn = 7;
    const M = this.model, t = this.stateT;
    switch (this.state) {
      case 'idle': M.play(t % 9 < 6 ? 'idle' : 'idle2', 0.4); if (t > 5 + Math.random() * 4) this.setState('wander'); break;
      case 'wander': move = this.wanderMove(); speed = 1.1; if (t > 10) { this.path = []; this.setState('idle'); } break;
      case 'chase': {
        if (p.state === 'dead') { this.setState('idle'); break; }
        move = this.pursue(dt, dirP);
        speed = dist > 3.2 ? 5.4 : 1.6;
        if (this.canSee && this.attackCd <= 0) {
          const ahead = this.fwd.dot(dirP) > 0.75;
          if (dist < 1.9) { this.setState('swipe'); M.play(Math.random() < 0.5 ? 'swipe' : 'swipe2', 0.08, true, 1.1); this.voice('screech'); }
          else if (dist > 3.4 && dist < 9 && ahead && Math.random() < dt * 2.6) { this.setState('leap'); M.play('land', 0.1, true, 0.6); this.voice('screech'); }
        }
        if (dist < 1.4) speed = 0;
        break;
      }
      case 'leap': {
        // crouch → airborne arc toward Claire (clears low cover) → landing slash
        if (t < 0.28) { face = dirP; turn = 14; speed = 0; break; }
        if (this.air === 0) {
          this.airDur = THREE.MathUtils.clamp(dist / 9, 0.38, 0.8);
          this.vel.copy(dirP).multiplyScalar(Math.max(0, dist - 1.1) / this.airDur);
          this.air = 1e-3;
          M.play('leap', 0.08, true, 0.45 / this.airDur, 1.05);
        }
        this.air = Math.min(1, (t - 0.28) / this.airDur);
        speed = -1; turn = 0;
        if (this.air >= 1) {
          if (!this.struck) {
            this.struck = true; this.vel.multiplyScalar(0.2);
            M.play('slash', 0.06, true, 1.2);
            if (this.strike(2.0, 0.3, 30 + Math.random() * 10, 5, 0.55)) audio.flesh(p.chest(), true);
          }
          speed = 0;
          if (t > 0.28 + this.airDur + 0.55) { this.air = 0; this.attackCd = 1.4 + Math.random(); this.setState('chase'); }
        }
        break;
      }
      case 'swipe': {
        face = dirP; turn = 9; speed = t < 0.2 ? 1.2 : 0; move = dirP;
        if (t > 0.3 && !this.struck) { this.struck = true; if (this.strike(2.2, 0.4, 24 + Math.random() * 8, 4)) audio.flesh(p.chest(), true); }
        if (t > 0.7) { this.attackCd = 0.8 + Math.random() * 0.6; this.setState('chase'); }
        break;
      }
      case 'stagger': if (t > 0.5) this.setState('chase'); break;
      case 'down': if (t > 1.1) { this.setState('chase'); this.voice('croak'); } break;
    }
    if (this.state !== 'leap') this.air = 0;
    this.locomote(dt, move, speed, face, this.state === 'down' || this.state === 'stagger' ? 0 : turn, 7);
    // locomotion clips follow the actual ground speed
    const v = Math.hypot(this.vel.x, this.vel.z);
    if (this.state === 'wander' || this.state === 'chase' || this.state === 'idle') {
      if (v > 3) M.play('run', 0.2, false, THREE.MathUtils.clamp(v / 5.4, 0.6, 1.4));
      else if (v > 0.3) M.play('walk', 0.25, false, THREE.MathUtils.clamp(v / 1.4, 0.6, 1.6));
      else if (this.state !== 'idle') M.play('idle', 0.3);
      this.stepT -= dt * v;
      if (v > 0.3 && this.stepT <= 0) { this.stepT = v > 3 ? 1.3 : 0.75; audio.footstep(this.position, v > 3, false); }
    }
    M.update(dt);
    this.sync(dt);
  }

  private sync(_dt: number): void {
    const r = this.model.root;
    r.position.copy(this.position);
    // airborne arc on top of the clip
    if (this.state === 'leap' && this.air > 0 && this.air < 1) r.position.y += Math.sin(this.air * Math.PI) * Math.min(1.3, 0.5 + this.airDur);
    r.rotation.y = this.yaw;
    const fl = this.flinch.clone().applyAxisAngle(UP, -this.yaw);
    r.rotation.x = fl.z * 0.3; r.rotation.z = -fl.x * 0.3;
  }
}
