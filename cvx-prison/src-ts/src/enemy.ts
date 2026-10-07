import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { loadGLTF, toLambert } from './assets';

/** An original enemy model (SKIN + Ninja MDL) with its motion bank (lower/upper body clips merged as mNN). */
export class EnemyModel {
  root = new THREE.Group();
  model!: THREE.Object3D;
  mixer!: THREE.AnimationMixer;
  clips = new Map<string, THREE.AnimationClip>();
  action: THREE.AnimationAction | null = null;
  cur = '';
  /** skeleton nodes bNN (original node numbering) */
  bones: Record<string, THREE.Object3D> = {};
  async load(file: string) {
    const g = await loadGLTF(file);
    this.model = SkeletonUtils.clone(g.scene); toLambert(this.model);
    this.model.traverse((o) => { if ((o as THREE.Mesh).isMesh) o.frustumCulled = false; if (/^b\d\d$/.test(o.name) && !this.bones[o.name]) this.bones[o.name] = o; });
    this.root.add(this.model);
    this.mixer = new THREE.AnimationMixer(this.model);
    for (const c of g.animations) this.clips.set(c.name, c);
    return this;
  }
  play(name: string, fade = 0.2, loop = true, speed = 1) {
    if (this.cur === name) return this.action;
    const c = this.clips.get(name); if (!c) return null;
    const a = this.mixer.clipAction(c);
    a.reset(); a.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity); a.clampWhenFinished = !loop; a.timeScale = speed;
    if (this.action && fade > 0) { a.play(); this.action.crossFadeTo(a, fade, false); } else { this.action?.stop(); a.play(); }
    this.action = a; this.cur = name; return a;
  }
  update(dt: number) { this.mixer.update(dt); }
}
(window as any).__EnemyModel = EnemyModel;

/**
 * Zombie (en01) driven by the original en01ms motion bank:
 * m11 get up from the ground, m00 shamble with arms raised (en01_walk_mtn), m02 stand, m73 lunge,
 * m06 grab/bite (NG00: bites at frames 25 and 60, synchronised with Claire), m14/m15 flinch, m09/m10 collapse.
 */
export type ZState = 'lying' | 'rise' | 'idle' | 'walk' | 'lunge' | 'bite' | 'release' | 'flinch' | 'die' | 'dead';
export const Z_CLIP: Record<string, string> = { rise: 'm11', walk: 'm00', idle: 'm02', lunge: 'm73', bite: 'm06', release: 'm14', flinch: 'm15', flinch2: 'm16', dieF: 'm09', dieB: 'm10', lie: 'm13' };
export class Zombie extends EnemyModel {
  state: ZState = 'idle';
  t = 0; hp = 8; heading = 0; cool = 0;
  /** model variant (en01 mdlver, picks the personal add_atk) */
  mdlver = 0;
  private b00: THREE.Object3D | null = null; private rootRest = new THREE.Vector3();
  constructor(public index: number) { super(); }
  async init(file: string, x: number, y: number, z: number, h: number, lying: boolean) {
    await this.load(file);
    this.model.traverse((o) => { if (o.name === 'b00' && !this.b00) this.b00 = o; });
    if (this.b00) this.rootRest.copy(this.b00.position);
    this.root.position.set(x, y, z); this.heading = h; this.root.rotation.y = h;
    if (lying) { this.state = 'lying'; this.play(Z_CLIP.lie, 0, true); } else this.set('idle');
    this.update(0);
    return this;
  }
  get hittable() { return !['lying', 'die', 'dead', 'rise'].includes(this.state); }
  get alive() { return this.state !== 'die' && this.state !== 'dead'; }
  set(s: ZState) {
    this.state = s; this.t = 0;
    const once = s !== 'walk' && s !== 'idle';
    let c = Z_CLIP[s] ?? Z_CLIP.idle;
    if (s === 'flinch') c = Math.random() < 0.5 ? Z_CLIP.flinch : Z_CLIP.flinch2;
    if (s === 'die') c = Math.random() < 0.5 ? Z_CLIP.dieF : Z_CLIP.dieB;
    this.cur = ''; this.play(c, s === 'bite' ? 0.05 : 0.2, !once, 1);
  }
  get clipLen() { return this.action ? this.action.getClip().duration : 0; }
  forward(v = new THREE.Vector3()) { return v.set(-Math.sin(this.heading), 0, -Math.cos(this.heading)); }
  /** returns true when the zombie starts a bite this frame */
  tick(dt: number, target: THREE.Vector3, targetFree: boolean, room: { resolve: (p: THREE.Vector3, r: number) => void; floorAt: (x: number, z: number, y: number) => number | null }) {
    this.t += dt; this.cool = Math.max(0, this.cool - dt);
    const dx = target.x - this.root.position.x, dz = target.z - this.root.position.z, dist = Math.hypot(dx, dz);
    const want = Math.atan2(-dx, -dz);
    let d = want - this.heading; d = Math.atan2(Math.sin(d), Math.cos(d));
    let bite = false;
    const turn = (rate: number) => { this.heading += THREE.MathUtils.clamp(d, -rate * dt, rate * dt); };
    const move = (sp: number) => {
      const np = this.root.position.clone().addScaledVector(this.forward(), sp * dt); room.resolve(np, 0.25);
      const y = room.floorAt(np.x, np.z, this.root.position.y); if (y !== null && Math.abs(y - this.root.position.y) < 0.5) np.y = y; else np.y = this.root.position.y;
      this.root.position.copy(np);
    };
    switch (this.state) {
      case 'lying': if (dist < 3.2) this.set('rise'); break;
      case 'rise': if (this.t >= this.clipLen) this.set('walk'); break;
      case 'idle': if (dist < 7) this.set('walk'); break;
      case 'walk':
        turn(1.1); move(0.36);
        if (dist < 0.95 && Math.abs(d) < 0.5 && this.cool <= 0 && targetFree) this.set('lunge');
        break;
      case 'lunge':
        turn(1.5); if (this.t < 0.6 && dist > 0.55) move(0.9);
        if (this.t > 0.35 && this.t < 0.9 && dist < 0.7 && targetFree) { this.set('bite'); bite = true; }
        else if (this.t >= Math.min(this.clipLen, 1.3)) { this.cool = 1.2; this.set('walk'); }
        break;
      case 'bite': break; // driven by the game (synchronised with Claire)
      case 'release': if (this.t < 0.5) move(-0.8); if (this.t >= Math.min(this.clipLen, 1.4)) { this.cool = 2.5; this.set('walk'); } break;
      case 'flinch': if (this.t < 0.3) move(-0.5); if (this.t >= Math.min(this.clipLen, 1.0)) this.set('walk'); break;
      case 'die': if (this.t >= this.clipLen) this.state = 'dead'; break;
    }
    this.root.rotation.y = this.heading;
    this.update(dt);
    // the bank's root translation is applied by the game (in place), except the vertical part
    if (this.b00 && this.state !== 'die' && this.state !== 'dead') { this.b00.position.x = this.rootRest.x; this.b00.position.z = this.rootRest.z; }
    return bite;
  }
  hit(dmg: number) {
    if (!this.hittable) return;
    this.hp -= dmg;
    if (this.hp <= 0) this.set('die');
    else if (this.state !== 'bite') this.set('flinch');
  }
}

/**
 * Zombie dog (en04) driven by the original en04ms motion bank:
 * m00 stand, m07 trot, m01 gallop, m04 leap, m20 bite (hanging on), m12 damage reaction, m10 knocked back, m44 collapse.
 * Claire's matching reactions are in the same bank (d00 bitten from the front, d05 from behind,
 * d03/d04 fatal bite).
 */
export type DState = 'idle' | 'trot' | 'run' | 'leap' | 'bite' | 'recoil' | 'flinch' | 'die' | 'dead';
export const D_CLIP: Record<string, string> = { idle: 'm00', trot: 'm07', run: 'm01', leap: 'm04', air: 'm08', bite: 'm20', recoil: 'm12', flinch: 'm10', die: 'm44' };
export class Dog extends EnemyModel {
  state: DState = 'idle';
  t = 0; hp = 6; heading = 0; cool = 0;
  /** seconds left of bursting out of the kennel (its walls are ignored) */
  private burst = 0;
  private b00: THREE.Object3D | null = null; private rootRest = new THREE.Vector3();
  constructor(public index: number) { super(); }
  async init(file: string, x: number, y: number, z: number, h: number) {
    await this.load(file);
    this.model.traverse((o) => { if (o.name === 'b00' && !this.b00) this.b00 = o; });
    if (this.b00) this.rootRest.copy(this.b00.position);
    this.root.position.set(x, y, z); this.heading = h; this.root.rotation.y = h;
    this.set('idle'); this.update(0);
    return this;
  }
  get hittable() { return this.state !== 'die' && this.state !== 'dead'; }
  get alive() { return this.hittable; }
  set(s: DState) {
    this.state = s; this.t = 0;
    const loop = s === 'idle' || s === 'trot' || s === 'run' || s === 'bite';
    this.cur = ''; this.play(D_CLIP[s], 0.15, loop, 1);
  }
  get clipLen() { return this.action ? this.action.getClip().duration : 0; }
  forward(v = new THREE.Vector3()) { return v.set(-Math.sin(this.heading), 0, -Math.cos(this.heading)); }
  /** returns true when the leap reaches Claire this frame */
  tick(dt: number, target: THREE.Vector3, targetFree: boolean, room: { resolve: (p: THREE.Vector3, r: number) => void; floorAt: (x: number, z: number, y: number) => number | null }) {
    this.t += dt; this.cool = Math.max(0, this.cool - dt); this.burst = Math.max(0, this.burst - dt);
    const dx = target.x - this.root.position.x, dz = target.z - this.root.position.z, dist = Math.hypot(dx, dz);
    let d = Math.atan2(-dx, -dz) - this.heading; d = Math.atan2(Math.sin(d), Math.cos(d));
    let bite = false;
    const turn = (rate: number) => { this.heading += THREE.MathUtils.clamp(d, -rate * dt, rate * dt); };
    const move = (sp: number) => {
      const np = this.root.position.clone().addScaledVector(this.forward(), sp * dt); if (this.burst <= 0) room.resolve(np, 0.25);
      const y = room.floorAt(np.x, np.z, this.root.position.y); if (y !== null && Math.abs(y - this.root.position.y) < 0.5) np.y = y; else np.y = this.root.position.y;
      this.root.position.copy(np);
    };
    switch (this.state) {
      case 'idle': if (dist < 6.5) { this.burst = 1.2; this.set('run'); } break;
      case 'trot': turn(2.5); move(1.0); if (this.cool <= 0) this.set('run'); break;
      case 'run':
        turn(3.2); move(3.4);
        if (dist < 1.9 && Math.abs(d) < 0.35 && this.cool <= 0 && targetFree) this.set('leap');
        break;
      case 'leap':
        if (this.t < 0.45) move(3.6);
        if (this.t > 0.15 && this.t < 0.5 && dist < 0.75 && targetFree) { bite = true; this.set('bite'); break; }
        // the leap misses: the dog has to slow down and circle before it may attack again (en04.c MV07)
        if (this.t >= this.clipLen) { this.cool = 1.6; this.set('trot'); }
        break;
      case 'bite': // hanging on the victim (m20, in place); the game runs the damage and ends the hold
        break;
      case 'recoil': if (this.t < 0.4) move(-1.2); if (this.t >= this.clipLen) { this.cool = 2.2; this.set('trot'); } break;
      case 'flinch': if (this.t < 0.3) move(-1.5); if (this.t >= this.clipLen) { this.cool = 1.2; this.set('trot'); } break;
      case 'die': if (this.t >= this.clipLen) this.state = 'dead'; break;
    }
    this.root.rotation.y = this.heading;
    this.update(dt);
    if (this.b00 && this.state !== 'die' && this.state !== 'dead') { this.b00.position.x = this.rootRest.x; this.b00.position.z = this.rootRest.z; }
    return bite;
  }
  hit(dmg: number) {
    if (!this.hittable) return;
    this.hp -= dmg;
    this.set(this.hp <= 0 ? 'die' : 'flinch');
  }
}
