import * as THREE from 'three';
import type { Combatant, HitInfo, HitResult, HitZone } from '../combat/HitZones';
import type { PlayerTarget } from '../player/PlayerController';
import type { ZombieContext, ZombieSpawn } from './Zombie';
import { ModelLibrary, jointsOf, skinnedMeshesOf, buildSkeletonFromJoints, reskin } from '../assets/ModelLibrary';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';
import { damp } from '../Rig';

export type CreatureKind = 'cerberus' | 'bandersnatch';
const UP = new THREE.Vector3(0, 1, 0);

/** Limbs whose local −Y is aimed at the child joint (so swings are clean local-X rotations and the arm can stretch along Y). */
const AIM: Record<CreatureKind, Record<string, string>> = {
  cerberus: {
    lfUpper: 'lfLower', lfLower: 'lfPaw', lfPaw: 'lfToe', rfUpper: 'rfLower', rfLower: 'rfPaw', rfPaw: 'rfToe',
    lhUpper: 'lhLower', lhLower: 'lhFoot', lhFoot: 'lhToe', rhUpper: 'rhLower', rhLower: 'rhFoot', rhFoot: 'rhToe',
  },
  bandersnatch: {
    rUpperArm: 'rForearm', rForearm: 'rHand', rHand: 'rHandTip',
    lThigh: 'lShin', lShin: 'lFoot', rThigh: 'rShin', rShin: 'rFoot',
  },
};
function zoneOfBone(kind: CreatureKind, n: string): HitZone {
  if (n === 'head' || n === 'jaw' || n === 'neck') return 'head';
  if (kind === 'cerberus') {
    if (/^l[fh]/.test(n)) return 'lLeg';
    if (/^r[fh]/.test(n)) return 'rLeg';
    return 'torso';
  }
  if (n.startsWith('rUpper') || n.startsWith('rFore') || n.startsWith('rHand')) return 'rArm';
  if (n.startsWith('lStump')) return 'lArm';
  if (n.startsWith('lThigh') || n.startsWith('lShin') || n.startsWith('lFoot')) return 'lLeg';
  if (n.startsWith('rThigh') || n.startsWith('rShin') || n.startsWith('rFoot')) return 'rLeg';
  return 'torso';
}

/** GLB creature (tools/blender/creature.py) re-skinned onto a game skeleton; poses are deltas on the rest pose. */
export class CreatureModel {
  root = new THREE.Group();
  mesh: THREE.SkinnedMesh;
  bones = new Map<string, THREE.Bone>();
  private rest = new Map<THREE.Bone, THREE.Quaternion>();
  private restPos = new Map<THREE.Bone, THREE.Vector3>();
  private e = new THREE.Euler();
  private q = new THREE.Quaternion();
  readonly ok: boolean;

  constructor(public kind: CreatureKind) {
    const g = ModelLibrary.get('enemy_' + kind);
    if (!g) {
      // fallback: plain capsule so a missing asset never breaks the level
      this.ok = false;
      const m = new THREE.SkinnedMesh(new THREE.CapsuleGeometry(kind === 'cerberus' ? 0.25 : 0.45, kind === 'cerberus' ? 0.5 : 1.4, 4, 8),
        new THREE.MeshStandardMaterial({ color: kind === 'cerberus' ? 0x221a18 : 0xb8b4b0 }));
      const b = new THREE.Bone(); b.name = 'hips'; this.root.add(b); this.bones.set('hips', b);
      const si = new Uint16Array(m.geometry.attributes.position.count * 4), sw = new Float32Array(si.length);
      for (let i = 0; i < sw.length; i += 4) sw[i] = 1;
      m.geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4)); m.geometry.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
      if (kind === 'cerberus') m.geometry.rotateX(Math.PI / 2).translate(0, 0.45, 0); else m.geometry.translate(0, 1.2, 0);
      this.root.add(m); this.root.updateMatrixWorld(true); m.bind(new THREE.Skeleton([b]));
      m.userData.boneZones = ['torso'];
      this.mesh = m;
      return;
    }
    this.ok = true;
    const bm = buildSkeletonFromJoints(jointsOf(g), AIM[kind], this.root);
    this.root.updateMatrixWorld(true);
    const bones = [...bm.values()];
    this.bones = bm;
    for (const b of bones) { this.rest.set(b, b.quaternion.clone()); this.restPos.set(b, b.position.clone()); }
    const src = skinnedMeshesOf(g)[0];
    const m0 = src.material as THREE.MeshStandardMaterial;
    m0.aoMap = m0.roughnessMap; m0.aoMapIntensity = 0.75; m0.envMapIntensity = 0.6;
    for (const t of [m0.map, m0.normalMap, m0.roughnessMap]) if (t) t.anisotropy = 8;
    let mat: THREE.Material = m0;
    if (kind === 'bandersnatch') {
      // ochre wet skin: sheen + clearcoat for the glossy, slimy look
      const p = new THREE.MeshPhysicalMaterial({ map: m0.map, normalMap: m0.normalMap, roughnessMap: m0.roughnessMap, metalnessMap: m0.metalnessMap,
        aoMap: m0.roughnessMap, aoMapIntensity: 0.75, roughness: 1, metalness: 1, sheen: 0.3, sheenRoughness: 0.5, clearcoat: 0.55, clearcoatRoughness: 0.3 });
      mat = p;
    }
    if (src.geometry.attributes.uv1) src.geometry.deleteAttribute('uv1');
    this.mesh = reskin(src, bones, mat);
    this.mesh.frustumCulled = false;
    this.mesh.userData.boneZones = bones.map((b) => zoneOfBone(kind, b.name));
    this.root.add(this.mesh);
    this.mesh.bind(new THREE.Skeleton(bones));
  }

  B(n: string): THREE.Bone | undefined { return this.bones.get(n); }
  /** rotate bone by a local euler delta from its rest pose (damped) */
  rot(n: string, x: number, y = 0, z = 0, rate = 0, dt = 0): void {
    const b = this.bones.get(n); if (!b) return;
    this.q.setFromEuler(this.e.set(x, y, z));
    const target = this.rest.get(b)!.clone().multiply(this.q);
    if (rate > 0) b.quaternion.slerp(target, 1 - Math.exp(-rate * dt)); else b.quaternion.copy(target);
  }
  offset(n: string, dx: number, dy: number, dz: number): void {
    const b = this.bones.get(n); if (!b) return;
    b.position.copy(this.restPos.get(b)!).add(new THREE.Vector3(dx, dy, dz));
  }
  stretch(n: string, s: number): void { const b = this.bones.get(n); if (b) b.scale.set(1, s, 1); }
  world(n: string, out: THREE.Vector3): THREE.Vector3 { const b = this.bones.get(n); return b ? b.getWorldPosition(out) : this.root.getWorldPosition(out); }
}

type CState = 'idle' | 'wander' | 'chase' | 'circle' | 'pounce' | 'bite' | 'swipe' | 'stretch' | 'stagger' | 'down' | 'dead';

/**
 * Non-zombie B.O.W.s sharing the zombie interfaces (Combatant + PlayerTarget) so weapons, knife, shove,
 * grab-struggle and saves work unchanged.
 *  • Cerberus — fast pack hunter: gallops, circles at mid range, leaps and pins Claire (grab struggle).
 *  • Bandersnatch — tall one-armed brute: slow stalk, stretches its arm 3–7.5 m to strike, heavy close swipe.
 */
export class Creature implements Combatant, PlayerTarget {
  model: CreatureModel;
  position = new THREE.Vector3();
  alive = true;
  yaw = 0;
  private hp: number;
  private maxHp: number;
  private state: CState = 'idle';
  private stateT = 0;
  private vel = new THREE.Vector3();
  private phase = Math.random() * 10;
  private attackCd = 1;
  private lastKnown: THREE.Vector3 | null = null;
  private canSee = false;
  private perceiveT = Math.random() * 0.2;
  private path: THREE.Vector3[] = [];
  private pathT = 0;
  private voiceT = 1 + Math.random() * 3;
  private circleDir = Math.random() < 0.5 ? 1 : -1;
  private home: THREE.Vector3;
  private flinch = new THREE.Vector3();
  private burnT = 0;
  private reach = 0;      // bandersnatch arm stretch 1..
  private struck = false;
  private stepSign = 0;
  private unsubs: (() => void)[] = [];
  private lie = 0;

  constructor(public spawn: ZombieSpawn & { kind: CreatureKind }, scene: THREE.Object3D, private ctx: () => ZombieContext) {
    this.model = new CreatureModel(spawn.kind);
    this.model.mesh.userData.owner = this;
    scene.add(this.model.root);
    this.position.set(spawn.x, spawn.y ?? 0, spawn.z);
    this.home = this.position.clone();
    this.yaw = spawn.yaw;
    const dog = spawn.kind === 'cerberus';
    this.maxHp = this.hp = dog ? 55 + Math.random() * 20 : 290 + Math.random() * 40;
    if (spawn.wander) this.setState('wander');
    this.unsubs.push(bus.on('noise', (n) => this.hear(n.pos, n.radius)));
    this.sync(0, 0);
  }

  get dog(): boolean { return this.spawn.kind === 'cerberus'; }
  get hitMeshes(): THREE.Object3D[] { return this.alive ? [this.model.mesh] : []; }
  headWorld(out: THREE.Vector3): THREE.Vector3 { return this.model.world('head', out); }
  isDowned(): boolean { return this.alive && this.state === 'down'; }
  canBeShoved(): boolean { return this.alive && this.dog && ['idle', 'wander', 'chase', 'circle', 'pounce', 'stagger'].includes(this.state); }
  private setState(s: CState): void { this.state = s; this.stateT = 0; this.struck = false; }
  dispose(): void { this.unsubs.forEach((u) => u()); }
  forceDead(): void { this.alive = false; this.state = 'dead'; this.stateT = 5; this.lie = 1; for (let i = 0; i < 10; i++) this.sync(0.5, 0); }

  private voice(kind: 'idle' | 'attack' | 'hurt' | 'die'): void {
    const p = this.headWorld(new THREE.Vector3());
    if (this.dog) audio.dog(p, kind === 'idle' ? 'snarl' : kind === 'attack' ? 'bark' : 'yelp');
    else audio.roar(p, kind !== 'hurt');
    this.voiceT = this.dog ? 1.5 + Math.random() * 2.5 : 4 + Math.random() * 5;
  }

  private hear(pos: THREE.Vector3, radius: number): void {
    if (!this.alive) return;
    if (pos.distanceTo(this.position) > radius * (this.dog ? 1.4 : 1)) return;
    this.lastKnown = pos.clone().setY(this.position.y);
    if (this.state === 'idle' || this.state === 'wander') this.setState('chase');
  }

  private perceive(): void {
    const c = this.ctx(), p = c.player;
    if (p.state === 'dead') { this.canSee = false; return; }
    const eye = this.headWorld(new THREE.Vector3());
    const target = p.chest();
    const to = target.clone().sub(eye);
    const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
    const ang = to.clone().setY(0).normalize().angleTo(fwd);
    const d = to.length();
    const cone = (ang < THREE.MathUtils.degToRad(this.dog ? 75 : 60) && d < (this.dog ? 22 : 18)) || d < 3;
    this.canSee = cone && c.physics.lineOfSight(eye, target);
    if (this.canSee) {
      this.lastKnown = p.pos.clone();
      if (this.state === 'idle' || this.state === 'wander') { this.setState('chase'); this.voice('attack'); }
    }
  }

  // ------------------------------------------------------------- damage
  takeHit(h: HitInfo): HitResult {
    const res: HitResult = { killed: false, severed: null, headBurst: false };
    if (!this.alive) return res;
    this.hp -= h.bodyDamage * (this.dog ? 1 : h.zone === 'head' ? 0.75 : 1);
    this.flinch.copy(h.dir).multiplyScalar(this.dog ? 0.5 : 0.15 + h.stagger * 0.2);
    this.lastKnown = this.ctx().player.pos.clone();
    if (this.hp <= 0) { this.die(); res.killed = true; return res; }
    const p = this.ctx().player;
    if (this.state === 'bite' && (h.stagger > 0.25 || h.zone === 'head')) { this.releaseGrab(false); return res; }
    if (this.dog) {
      if (h.knockdown || (h.stagger > 0.7 && Math.random() < 0.6)) { this.setState('down'); this.vel.copy(h.dir).setY(0).multiplyScalar(3); this.voice('hurt'); }
      else if (Math.random() < h.stagger + 0.2 && this.state !== 'pounce') { this.setState('stagger'); if (Math.random() < 0.5) this.voice('hurt'); }
    } else if ((h.stagger >= 0.85 && Math.random() < 0.4) || (h.zone === 'head' && h.stagger > 0.5 && Math.random() < 0.25)) {
      if (this.state !== 'stretch' || this.stateT > 0.7) { this.setState('stagger'); this.voice('hurt'); }
    }
    if (this.state === 'idle' || this.state === 'wander') this.setState('chase');
    void p;
    return res;
  }

  areaHit(damage: number, from: THREE.Vector3, opts: { knockdown: boolean; acid?: boolean; burn?: number }): void {
    if (!this.alive) return;
    this.hp -= damage * (opts.acid ? 1.3 : 1);
    if (opts.burn) this.burnT = Math.max(this.burnT, opts.burn);
    if (this.hp <= 0) { this.die(); return; }
    if (opts.knockdown && (this.dog || damage > 60)) {
      this.vel.copy(this.position.clone().sub(from).setY(0).normalize()).multiplyScalar(this.dog ? 5 : 1.5);
      this.setState(this.dog ? 'down' : 'stagger');
    }
  }

  private die(): void {
    this.alive = false;
    const p = this.ctx().player;
    if (p.grabbedBy === this) p.grabbedBy = null;
    this.setState('dead');
    this.voice('die');
    const c = this.ctx();
    const at = this.model.world('spine', new THREE.Vector3());
    c.bloodFx.burst(at, UP, 30, 3, 1.5, 1);
    c.blood.add(new THREE.Vector3(at.x, this.position.y + 0.01, at.z), UP, this.dog ? 1.0 : 1.6);
  }

  shove(from: THREE.Vector3): void {
    this.vel.copy(this.position.clone().sub(from).setY(0).normalize().multiplyScalar(4));
    this.setState(Math.random() < 0.5 ? 'down' : 'stagger');
    audio.flesh(this.position.clone().setY(this.position.y + 0.6));
    this.voice('hurt');
  }

  releaseGrab(countered: boolean): void {
    if (!this.alive) return;
    const p = this.ctx().player;
    if (p.grabbedBy === this) p.grabbedBy = null;
    this.vel.copy(this.position.clone().sub(p.pos).setY(0).normalize().multiplyScalar(4));
    if (countered) { this.hp -= 25; if (this.hp <= 0) { this.die(); return; } }
    this.setState(countered ? 'down' : 'stagger');
    this.attackCd = 2.2;
    this.voice('hurt');
  }

  // ------------------------------------------------------------- AI
  update(dt: number): void {
    const c = this.ctx();
    this.stateT += dt;
    this.attackCd -= dt;
    this.flinch.multiplyScalar(Math.exp(-8 * dt));
    if (this.burnT > 0 && this.alive) {
      this.burnT -= dt; this.hp -= 14 * dt;
      if (Math.random() < dt * 20) c.bloodFx.burst(this.position.clone().setY(this.position.y + 0.5 + Math.random()), UP, 1, 0.5, 1, 0.4);
      if (this.hp <= 0) this.die();
    }
    if (this.state === 'dead') { this.vel.multiplyScalar(Math.exp(-4 * dt)); c.physics.moveCircle(this.position, this.vel.clone().multiplyScalar(dt), 0.3); this.sync(dt, 0); return; }
    this.perceiveT -= dt;
    if (this.perceiveT <= 0 && this.state !== 'down') { this.perceiveT = 0.15; this.perceive(); }
    this.voiceT -= dt;
    if (this.voiceT <= 0 && this.state !== 'idle') this.voice('idle');

    const p = c.player;
    const toP = p.pos.clone().sub(this.position).setY(0);
    const dist = toP.length();
    const dirP = dist > 0.001 ? toP.clone().divideScalar(dist) : new THREE.Vector3(0, 0, 1);
    let move = new THREE.Vector3(); let speed = 0; let face: THREE.Vector3 | null = null;
    const dog = this.dog;
    const runS = dog ? 6.2 : 1.35;

    switch (this.state) {
      case 'idle':
        if (this.stateT > 3 + Math.random() * 3) this.setState('wander');
        break;
      case 'wander': {
        if (!this.path.length) {
          const near = c.nav.nodes.filter((v) => v.distanceTo(this.home) < 8);
          const goal = near[Math.floor(Math.random() * near.length)] ?? this.home;
          this.path = c.nav.findPath(this.position, goal) ?? [goal.clone()];
        }
        move = this.follow(); speed = dog ? 1.1 : 0.6;
        if (this.stateT > 10) { this.path = []; this.setState('idle'); }
        break;
      }
      case 'chase': {
        if (this.canSee) { move = dirP.clone(); this.path = []; }
        else if (this.lastKnown) {
          this.pathT -= dt;
          if (this.pathT <= 0 || !this.path.length) { this.path = c.nav.findPath(this.position, this.lastKnown) ?? [this.lastKnown.clone()]; this.pathT = 0.8; }
          move = this.follow();
          if (this.position.distanceTo(this.lastKnown) < 1 && !this.canSee) { this.lastKnown = null; this.home.copy(this.position); this.setState('wander'); }
        } else this.setState('wander');
        speed = runS;
        if (p.state === 'dead') { this.setState('idle'); break; }
        if (dog) {
          if (this.canSee && dist < 4.2 && dist > 1.6 && this.attackCd <= 0 && p.state !== 'grabbed') { this.setState('pounce'); this.voice('attack'); }
          else if (this.canSee && dist < 5 && (this.attackCd > 0 || p.state === 'grabbed')) { this.setState('circle'); }
          else if (this.canSee && dist <= 1.6 && this.attackCd <= 0) { this.setState('pounce'); }
        } else {
          if (this.canSee && dist < 2.4 && this.attackCd <= 0) { this.setState('swipe'); }
          else if (this.canSee && dist > 3 && dist < 7.5 && this.attackCd <= 0 && Math.random() < dt * 1.5) { this.setState('stretch'); this.voice('attack'); }
          if (dist < 1.4) speed = 0;
        }
        break;
      }
      case 'circle': {
        // keep ~4 m, strafe around Claire, then re-engage
        const side = new THREE.Vector3(-dirP.z, 0, dirP.x).multiplyScalar(this.circleDir);
        const radial = dist < 3.6 ? -0.8 : dist > 4.6 ? 0.8 : 0;
        move = side.addScaledVector(dirP, radial).normalize(); speed = 3.2; face = dirP;
        if (this.stateT > 1.1 + Math.random() * 0.8 && p.state !== 'grabbed') { this.setState('chase'); if (Math.random() < 0.4) this.circleDir *= -1; }
        break;
      }
      case 'pounce': {
        // crouch 0.3 s → leap (≈7 m/s) → land
        face = dirP;
        if (this.stateT < 0.3) speed = 0.2, move = dirP;
        else if (this.stateT < 0.75) {
          if (!this.struck) { this.vel.copy(dirP).multiplyScalar(Math.min(8, dist / 0.42 + 1)); this.struck = true; }
          speed = -1;
          if (dist < 1.0 && this.stateT > 0.4 && !this.lie) {
            const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
            if (fwd.dot(dirP) > 0.3 && !p.isInvulnerable()) {
              if (p.grab(this)) { this.setState('bite'); audio.flesh(p.chest(), false); break; }
              p.takeDamage(12, this.position);
            }
            this.lie = 1;
          }
        } else { this.lie = 0; this.attackCd = 1.2 + Math.random(); this.setState('circle'); }
        break;
      }
      case 'bite':
        face = dirP;
        if (p.grabbedBy !== this && p.state !== 'counter') { this.attackCd = 2; this.setState('circle'); break; }
        this.position.lerp(p.pos.clone().addScaledVector(dirP, -0.75), 1 - Math.exp(-10 * dt));
        if (Math.random() < dt * 3) audio.dog(this.headWorld(new THREE.Vector3()), 'snarl');
        break;
      case 'swipe': {
        face = dirP; speed = this.stateT < 0.45 ? 0.4 : 0; move = dirP;
        if (this.stateT > 0.55 && !this.struck) {
          this.struck = true;
          if (dist < 2.6 && !p.isInvulnerable()) {
            const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
            if (fwd.dot(dirP) > 0.4 && p.takeDamage(28 + Math.random() * 8, this.position)) { p.vel.addScaledVector(dirP, 6); audio.flesh(p.chest(), true); bus.emit('cameraShake', { strength: 0.4, duration: 0.25 }); }
          }
        }
        if (this.stateT > 1.25) { this.attackCd = 1.4; this.setState('chase'); }
        break;
      }
      case 'stretch': {
        // wind-up (0.6 s) → arm shoots out to the target (0.3 s) → hold → retract
        face = dirP;
        const L = Math.max(1, Math.min(4.4, (dist - 0.6) / 1.45));
        const t = this.stateT;
        if (t < 0.6) this.reach = damp(this.reach, 0.85, 10, dt);
        else if (t < 0.9) {
          this.reach = damp(this.reach, L, 22, dt);
          if (!this.struck && t > 0.78) {
            this.struck = true;
            const hand = this.model.world('rHand', new THREE.Vector3());
            const fwd = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw));
            const hd = Math.hypot(hand.x - p.pos.x, hand.z - p.pos.z);
            if ((hd < 1.1 || (fwd.dot(dirP) > 0.85 && dist < 7.8)) && !p.isInvulnerable()) {
              if (p.takeDamage(24 + Math.random() * 8, this.position)) { p.vel.addScaledVector(dirP, -4.5); audio.flesh(p.chest(), true); bus.emit('cameraShake', { strength: 0.35, duration: 0.2 }); }
            }
          }
        } else if (t < 1.2) { /* hold */ } else { this.reach = damp(this.reach, 1, 6, dt); }
        if (t > 1.9) { this.reach = 1; this.attackCd = 2.2 + Math.random(); this.setState('chase'); }
        break;
      }
      case 'stagger':
        if (this.stateT > (dog ? 0.5 : 1.0)) this.setState('chase');
        break;
      case 'down':
        if (this.stateT > (dog ? 1.4 : 2.0)) { this.setState(dog ? 'circle' : 'chase'); this.voice('attack'); }
        break;
    }
    if (this.state !== 'stretch') this.reach = damp(this.reach, 1, 6, dt);

    // locomotion
    const turn = dog ? 9 : 3;
    const fdir = face ?? (move.lengthSq() > 0.001 ? move : null);
    if (fdir && this.state !== 'down' && this.state !== 'bite') {
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
      this.vel.x = damp(this.vel.x, want.x, dog ? 7 : 4, dt); this.vel.z = damp(this.vel.z, want.z, dog ? 7 : 4, dt);
    } else if (speed === 0 || this.state === 'down' || this.state === 'stagger') {
      this.vel.x = damp(this.vel.x, 0, 5, dt); this.vel.z = damp(this.vel.z, 0, 5, dt);
    }
    if (this.state !== 'bite') c.physics.moveCircle(this.position, this.vel.clone().multiplyScalar(dt), dog ? 0.3 : 0.45);
    if (this.alive && this.state !== 'bite') {
      const dv = this.position.clone().sub(p.pos).setY(0); const dl = dv.length(); const minD = dog ? 0.6 : 0.8;
      if (dl < minD && dl > 0.001) this.position.addScaledVector(dv.divideScalar(dl), minD - dl);
    }
    this.sync(dt, Math.hypot(this.vel.x, this.vel.z));
  }

  private follow(): THREE.Vector3 {
    while (this.path.length && this.path[0].distanceTo(this.position) < 0.7) this.path.shift();
    const phys = this.ctx().physics;
    if (this.path.length > 1 && phys.walkable(this.position, this.path[1], 0.3)) this.path.shift();
    if (!this.path.length) return new THREE.Vector3();
    return this.path[0].clone().sub(this.position).setY(0).normalize();
  }

  // ------------------------------------------------------------- procedural animation
  private sync(dt: number, speed: number): void {
    const m = this.model, root = m.root;
    root.position.copy(this.position);
    root.rotation.y = this.yaw;
    const local = this.flinch.clone().applyAxisAngle(UP, -this.yaw);
    if (this.dog) this.animDog(dt, speed, local); else this.animBander(dt, speed, local);
  }

  private animDog(dt: number, speed: number, fl: THREE.Vector3): void {
    const m = this.model, t = this.stateT, R = 16;
    const gallop = speed > 2.8;
    this.phase += dt * (gallop ? 2.3 + speed * 0.55 : 1.2 + speed * 2.2) * Math.PI;
    const s = this.phase;
    const amp = Math.min(1, speed / (gallop ? 6 : 1.5));
    // leg swing (+x = back): rotary gallop vs. four-beat walk
    const ph = gallop ? [0, 0.35, Math.PI, Math.PI + 0.4] : [0, Math.PI, Math.PI * 0.5, Math.PI * 1.5];
    const A = gallop ? 0.75 : 0.42;
    let fl_ = [Math.sin(s + ph[0]) * A * amp, Math.sin(s + ph[1]) * A * amp, Math.sin(s + ph[2]) * A * amp, Math.sin(s + ph[3]) * A * amp];
    let bend = (i: number, k: number) => Math.max(0, Math.cos(s + ph[i])) * k * amp;
    let hipsX = gallop ? Math.sin(s * 1 + 1.2) * 0.12 * amp : 0, spineX = gallop ? Math.cos(s) * 0.16 * amp : 0;
    let neckX = -0.15 + (gallop ? Math.sin(s) * 0.12 : Math.sin(s * 2) * 0.03), headX = 0.1, jaw = 0.05 + Math.max(0, Math.sin(this.phase * 0.7)) * 0.05;
    let bodyY = gallop ? Math.abs(Math.sin(s)) * 0.06 * amp : Math.abs(Math.sin(s * 2)) * 0.008 * amp;
    let tail = Math.sin(this.phase * 2.5) * 0.3, lie = 0, crouch = 0;
    switch (this.state) {
      case 'idle': neckX = 0.05 + Math.sin(this.phase * 0.3) * 0.08; headX = 0.25; jaw = 0.25 + Math.sin(t * 9) * 0.05; break;     // snarling, head low
      case 'circle': neckX = 0.15; headX = 0.2; jaw = 0.3 + Math.sin(t * 11) * 0.06; break;
      case 'pounce':
        if (t < 0.3) { crouch = t / 0.3; jaw = 0.5; }
        else if (t < 0.75) { const e = (t - 0.3) / 0.45; bodyY = Math.sin(e * Math.PI) * 0.42; fl_ = [-1.1, -1.0, 0.9, 0.85]; bend = () => 0.2; jaw = 0.9; neckX = -0.35; hipsX = -0.25 * Math.sin(e * Math.PI); }
        break;
      case 'bite': neckX = 0.2 + Math.sin(t * 16) * 0.18; headX = 0.25 + Math.cos(t * 13) * 0.15; jaw = 0.25 + Math.abs(Math.sin(t * 9)) * 0.45; fl_ = [-0.5, -0.4, 0.4, 0.45]; crouch = 0.6; break;
      case 'stagger': hipsX = -0.25 * Math.sin(Math.min(1, t / 0.5) * Math.PI); neckX = -0.4; jaw = 0.6; break;
      case 'down': lie = Math.min(1, t / 0.25) * (t < 1.0 ? 1 : Math.max(0, 1 - (t - 1.0) / 0.4)); jaw = 0.5; break;
      case 'dead': lie = Math.min(1, t / 0.4); jaw = 0.55; tail = 0; fl_ = [0.3, -0.4, 0.5, -0.2]; bend = (i) => 0.4 + i * 0.1; neckX = 0.4; break;
    }
    this.lie = this.state === 'dead' ? Math.max(this.lie, lie) : lie;
    m.rot('lfUpper', fl_[0] + crouch * 0.4, 0, 0, R, dt); m.rot('rfUpper', fl_[1] + crouch * 0.4, 0, 0, R, dt);
    m.rot('lhUpper', fl_[2] - crouch * 0.5, 0, 0, R, dt); m.rot('rhUpper', fl_[3] - crouch * 0.5, 0, 0, R, dt);
    m.rot('lfLower', -bend(0, 0.9) - crouch * 0.7, 0, 0, R, dt); m.rot('rfLower', -bend(1, 0.9) - crouch * 0.7, 0, 0, R, dt);
    m.rot('lhLower', bend(2, 0.8) + crouch * 0.9, 0, 0, R, dt); m.rot('rhLower', bend(3, 0.8) + crouch * 0.9, 0, 0, R, dt);
    m.rot('lfPaw', bend(0, 0.8), 0, 0, R, dt); m.rot('rfPaw', bend(1, 0.8), 0, 0, R, dt);
    m.rot('lhFoot', -bend(2, 0.6) - crouch * 0.4, 0, 0, R, dt); m.rot('rhFoot', -bend(3, 0.6) - crouch * 0.4, 0, 0, R, dt);
    m.rot('hips', hipsX + fl.z * 0.6, 0, -fl.x * 0.6, 12, dt);
    m.rot('spine', spineX, 0, 0, 12, dt);
    m.rot('neck', neckX - fl.z * 0.8, fl.x * 0.6, 0, 12, dt);
    m.rot('head', headX, 0, 0, 12, dt);
    m.rot('jaw', jaw, 0, 0, 20, dt);
    m.rot('tail', 0.3, tail, 0, 10, dt);
    m.offset('hips', 0, bodyY - crouch * 0.12, 0);
    // knockdown / death: roll onto the side
    const root = m.root;
    root.rotation.z = damp(root.rotation.z, this.lie * 1.45, 9, dt);
    root.position.y = this.position.y + Math.sin(root.rotation.z) * 0.12;
    this.footsteps(s, speed);
  }

  private animBander(dt: number, speed: number, fl: THREE.Vector3): void {
    const m = this.model, t = this.stateT, R = 10;
    this.phase += dt * (0.6 + speed * 1.6) * Math.PI;
    const s = Math.sin(this.phase);
    const amp = Math.min(1, speed / 1.2);
    let lTh = -s * 0.42 * amp, rTh = s * 0.42 * amp, lSh = Math.max(0, s) * 0.55 * amp, rSh = Math.max(0, -s) * 0.55 * amp;
    let hipsY = -Math.abs(Math.cos(this.phase)) * 0.04 * amp, hipsZ = s * 0.06 * amp;
    let spineX = 0.18 + Math.sin(this.phase * 0.5) * 0.03, spineY = s * 0.12 * amp, neckX = -0.1, headY = Math.sin(this.phase * 0.31) * 0.2, jaw = 0.15 + Math.max(0, Math.sin(this.phase * 0.4)) * 0.15;
    // the huge arm drags / swings opposite to the right leg
    let uX = s * 0.25 * amp + 0.05, uZ = 0.12, fX = -0.25 - Math.max(0, s) * 0.2, hX = 0.1, stump = Math.sin(this.phase) * 0.2;
    let lie = 0;
    switch (this.state) {
      case 'idle': spineX = 0.3; jaw = 0.25 + Math.sin(t * 2) * 0.1; break;
      case 'stretch': {
        const e = Math.min(1, t / 0.6);
        if (t < 0.6) { uX = THREE.MathUtils.lerp(uX, 0.9, e); fX = -1.3 * e; spineY = 0.45 * e; spineX = 0.1; jaw = 0.6 * e; }
        else { uX = -1.45; uZ = 0.05; fX = 0; hX = -0.2; spineY = -0.35; spineX = 0.05; jaw = 0.9; }
        break;
      }
      case 'swipe': {
        const e = Math.min(1, t / 0.45);
        if (t < 0.45) { uX = -2.0 * e; uZ = 0.5 * e; fX = -0.9 * e; spineY = 0.35 * e; spineX = -0.1; jaw = 0.6; }
        else { const k = Math.min(1, (t - 0.45) / 0.2); uX = THREE.MathUtils.lerp(-2.0, -0.2, k); uZ = THREE.MathUtils.lerp(0.5, -0.6, k); fX = -0.3; spineY = THREE.MathUtils.lerp(0.35, -0.45, k); spineX = 0.35; jaw = 0.9; }
        break;
      }
      case 'stagger': spineX = -0.25 * Math.sin(Math.min(1, t / 0.9) * Math.PI); uX = 0.5; neckX = -0.4; jaw = 0.8; break;
      case 'down': spineX = 0.5; lTh = rTh = -0.8; lSh = rSh = 1.4; hipsY = -0.45; break;
      case 'dead': lie = Math.min(1, t / 0.9); jaw = 0.7; uX = -2.4; break;
    }
    this.lie = lie;
    m.rot('lThigh', lTh, 0, 0, R, dt); m.rot('rThigh', rTh, 0, 0, R, dt);
    m.rot('lShin', lSh, 0, 0, R, dt); m.rot('rShin', rSh, 0, 0, R, dt);
    m.offset('hips', 0, hipsY, 0);
    m.rot('hips', fl.z * 0.3, 0, hipsZ - fl.x * 0.3, R, dt);
    m.rot('spine', spineX + fl.z * 0.5, spineY, -fl.x * 0.4, R, dt);
    m.rot('neck', neckX, headY * 0.5, 0, 6, dt);
    m.rot('head', 0, headY * 0.5, 0, 6, dt);
    m.rot('jaw', jaw, 0, 0, 16, dt);
    m.rot('rUpperArm', uX, 0, uZ, this.state === 'stretch' || this.state === 'swipe' ? 22 : R, dt);
    m.rot('rForearm', fX, 0, 0, this.state === 'stretch' ? 22 : R, dt);
    m.rot('rHand', hX, 0, 0, R, dt);
    m.rot('lStump', stump, 0, 0, R, dt);
    // the stretch: forearm elongates along its axis, the hand keeps its size
    m.stretch('rForearm', this.reach);
    m.stretch('rHand', 1 / Math.max(0.5, this.reach));
    const root = m.root;
    root.rotation.x = damp(root.rotation.x, lie * Math.PI / 2 * 0.96, 3, dt);
    root.position.y = this.position.y;
    this.footsteps(this.phase, speed);
  }

  private footsteps(ph: number, speed: number): void {
    const sg = Math.sign(Math.sin(ph * (this.dog ? 1 : 1)));
    if (speed > 0.4 && sg !== this.stepSign) {
      this.stepSign = sg;
      audio.footstep(this.position, speed > 3, false);
      if (!this.dog) bus.emit('cameraShake', { strength: 0.04 * Math.max(0, 1 - this.position.distanceTo(this.ctx().player.pos) / 10), duration: 0.1 });
    }
  }
}

