import * as THREE from 'three';
import { ZombieModel } from '../ai/ZombieModel';
import { makeWeaponModel } from '../player/WeaponModels';
import { twoBoneIK, type ClaireModel } from '../player/ClaireModel';
import { damp } from '../Rig';

const UP = new THREE.Vector3(0, 1, 0);
function turn(cur: number, target: number, rate: number, dt: number): number {
  const d = Math.atan2(Math.sin(target - cur), Math.cos(target - cur));
  return cur + d * (1 - Math.exp(-rate * dt));
}

/** Waypoint walker shared by the cutscene actors. */
class Walker {
  pos = new THREE.Vector3();
  yaw = 0;
  speed = 0;
  path: THREE.Vector3[] = [];
  pace = 1.35;
  /** face this point when standing (null = keep yaw) */
  face: THREE.Vector3 | null = null;
  walkTo(pts: THREE.Vector3[], pace = 1.35): void { this.path = pts.map((p) => p.clone()); this.pace = pace; }
  place(p: THREE.Vector3, yaw: number): void { this.pos.copy(p); this.yaw = yaw; this.path = []; this.speed = 0; }
  get moving(): boolean { return this.path.length > 0; }
  protected step(dt: number): void {
    let want = 0;
    if (this.path.length) {
      const to = this.path[0].clone().sub(this.pos).setY(0);
      const d = to.length();
      if (d < 0.12 && this.path.length > 1) this.path.shift();
      else if (d < 0.05) this.path.shift();
      else {
        want = this.pace * Math.min(1, d / 0.35 + (this.path.length > 1 ? 1 : 0));
        this.yaw = turn(this.yaw, Math.atan2(to.x, to.z), 7, dt);
      }
    } else if (this.face) {
      const to = this.face.clone().sub(this.pos);
      this.yaw = turn(this.yaw, Math.atan2(to.x, to.z), 5, dt);
    }
    this.speed = damp(this.speed, want, 6, dt);
    if (this.speed > 0.01) this.pos.addScaledVector(new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw)), this.speed * dt);
  }
}

/** Claire / Steve driven by script instead of the player controller. */
export class HumanActor extends Walker {
  aim = false;
  aimPoint = new THREE.Vector3();
  look: THREE.Vector3 | null = null;
  shots = 0;
  constructor(public model: ClaireModel, pos?: THREE.Vector3) { super(); if (pos) this.pos.copy(pos); }
  update(dt: number, t: number): void {
    this.step(dt);
    const m = this.model;
    m.root.position.copy(this.pos);
    m.root.rotation.y = this.yaw;
    m.animate(dt, t, {
      speed: this.speed, localMove: new THREE.Vector2(0, 1), running: false, aim: this.aim, aimPitch: 0,
      aimPoint: this.aimPoint, state: 'normal', stateT: 0, dodgeDir: new THREE.Vector2(), hpRatio: 1, reloading: false,
      lookTarget: this.aim ? this.aimPoint : this.look, shots: this.shots, knifeReady: false,
    });
  }
}

const GUARD_UNIFORM = new Map<THREE.Material, THREE.MeshStandardMaterial>();

/** living-guard version of the zombie guard albedo: blood → navy cloth, bare (grey) skin → black gloves / balaclava */
function cleanUniform(src: THREE.Texture | null): THREE.Texture | null {
  const img = src?.image as CanvasImageSource & { width: number; height: number } | undefined;
  if (!src || !img || !img.width) return null;
  const n = Math.min(1024, img.width);
  const c = document.createElement('canvas'); c.width = c.height = n;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.drawImage(img, 0, 0, n, n);
  const d = g.getImageData(0, 0, n, n), a = d.data;
  for (let i = 0; i < a.length; i += 4) {
    const r = a[i], gg = a[i + 1], b = a[i + 2];
    const lum = 0.3 * r + 0.59 * gg + 0.11 * b;
    if (r > gg * 1.25 && r > b * 1.2 && r > 60) { a[i] = 38; a[i + 1] = 44; a[i + 2] = 66; continue; } // blood
    if (r >= b - 4 && lum > 62) { const k = 0.16 + (lum / 255) * 0.08; a[i] = 70 * k + 14; a[i + 1] = 70 * k + 15; a[i + 2] = 70 * k + 18; } // skin → black
  }
  g.putImageData(d, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.flipY = src.flipY; t.colorSpace = src.colorSpace; t.wrapS = src.wrapS; t.wrapT = src.wrapT; t.anisotropy = 4;
  return t;
}

/**
 * Umbrella security guard for cutscenes: the guard body mesh in a clean dark uniform, gas-mask + helmet,
 * tactical vest and an MP5 carried at the low ready (hands IK'd onto the gun), procedural walk cycle.
 */
export class GuardActor extends Walker {
  model: ZombieModel;
  gun: THREE.Group;
  private phase = Math.random() * 6;
  private rest = new Map<THREE.Object3D, THREE.Quaternion>();
  /** 0 = low ready, 1 = shouldered (aiming at `aimAt`) */
  raise = 0;
  aimAt: THREE.Vector3 | null = null;

  constructor(scene: THREE.Object3D, texSize: number, seed: number) {
    super();
    const m = new ZombieModel('guard', texSize, seed);
    this.model = m;
    const r = m.rig;
    if (m.mesh) {
      const src = m.mesh.material as THREE.MeshStandardMaterial;
      let u = GUARD_UNIFORM.get(src);
      if (!u) {
        u = src.clone();
        const clean = cleanUniform(src.map);
        u.map = clean; u.color.setHex(clean ? 0x9298a6 : 0x3b424c); u.roughness = 0.8; u.metalness = 0.05;
        if (u.normalScale) u.normalScale.set(0.6, 0.6);
        GUARD_UNIFORM.set(src, u);
      }
      m.mesh.material = u;
    } else m.root.traverse((o) => { const mm = o as THREE.Mesh; if (mm.isMesh) mm.material = new THREE.MeshStandardMaterial({ color: 0x23272d, roughness: 0.85 }); });
    m.root.scale.setScalar(0.94);
    m.root.updateMatrixWorld(true);
    const gear = new THREE.MeshStandardMaterial({ color: 0x1b1e22, roughness: 0.85, metalness: 0 });
    const rubber = new THREE.MeshStandardMaterial({ color: 0x101112, roughness: 0.55, metalness: 0 });
    const lensM = new THREE.MeshStandardMaterial({ color: 0x1a2a2a, metalness: 0.9, roughness: 0.1, emissive: 0x081010 });
    const head = r.head, hp = head.getWorldPosition(new THREE.Vector3());
    const neckP = r.neck.getWorldPosition(new THREE.Vector3());
    const attach = (bone: THREE.Object3D, mesh: THREE.Object3D, world: THREE.Vector3) => { mesh.position.copy(world); m.root.add(mesh); mesh.updateMatrixWorld(true); bone.attach(mesh); mesh.traverse((o) => { o.castShadow = true; }); };
    // head reference: centre of the skull ~ 9 cm above the head joint
    const hc = hp.clone().add(new THREE.Vector3(0, 0.1, 0.01));
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.135, 18, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), gear);
    helmet.scale.set(1.02, 0.95, 1.12); attach(head, helmet, hc.clone().add(new THREE.Vector3(0, 0.02, -0.005)));
    const mask = new THREE.Group();
    const face = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 12, -Math.PI * 0.55, Math.PI * 1.1, Math.PI * 0.25, Math.PI * 0.55), rubber);
    face.scale.set(0.95, 1.05, 0.95); mask.add(face);
    for (const s of [-1, 1]) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 14), lensM); l.rotation.x = Math.PI / 2; l.position.set(0.042 * s, 0.03, 0.105); mask.add(l); }
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.07, 12), gear); can.rotation.x = Math.PI / 2 - 0.5; can.position.set(0, -0.06, 0.12); mask.add(can);
    attach(head, mask, hc.clone().add(new THREE.Vector3(0, -0.01, 0.0)));
    // vest on the chest
    const chest = neckP.clone().add(new THREE.Vector3(0, -0.24, 0.015));
    const vest = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.25), gear); attach(r.spine, vest, chest);
    for (const s of [-1, 0, 1]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.11, 0.05), rubber); attach(r.spine, p, chest.clone().add(new THREE.Vector3(0.11 * s, -0.1, 0.15))); }
    // MP5 at the low ready across the chest (rides on the spine)
    this.gun = makeWeaponModel('mp5');
    const g0 = chest.clone().add(new THREE.Vector3(0.06, -0.12, 0.3));
    this.gun.position.copy(g0); this.gun.rotation.set(0.55, -0.55, 0, 'YXZ');
    m.root.add(this.gun); this.gun.updateMatrixWorld(true); r.spine.attach(this.gun);
    this.gun.userData.low = { p: this.gun.position.clone(), q: this.gun.quaternion.clone() };
    for (const b of [r.lUpperArm, r.lForearm, r.lHand, r.rUpperArm, r.rForearm, r.rHand, r.spine, r.neck, r.head, r.lThigh, r.rThigh, r.lShin, r.rShin, r.hips]) this.rest.set(b, b.quaternion.clone());
    scene.add(m.root);
  }

  update(dt: number, t: number): void {
    this.step(dt);
    const m = this.model, r = m.rig;
    m.root.position.copy(this.pos);
    m.root.rotation.y = this.yaw;
    for (const [b, q] of this.rest) b.quaternion.copy(q);
    const amp = Math.min(1, this.speed / 1.2);
    this.phase += dt * (this.speed * 5.2);
    const s = Math.sin(this.phase);
    r.hips.position.y = m.hipRest - Math.abs(Math.cos(this.phase)) * 0.035 * amp;
    r.lThigh.rotation.x = -s * 0.5 * amp; r.rThigh.rotation.x = s * 0.5 * amp;
    r.lShin.rotation.x = Math.max(0, s) * 0.75 * amp; r.rShin.rotation.x = Math.max(0, -s) * 0.75 * amp;
    r.spine.rotation.x = 0.06 + Math.sin(t * 1.3) * 0.01; r.spine.rotation.y = s * 0.05 * amp;
    // gun: low ready ⇄ shouldered toward aimAt
    const low = this.gun.userData.low as { p: THREE.Vector3; q: THREE.Quaternion };
    this.gun.position.copy(low.p); this.gun.quaternion.copy(low.q);
    if (this.raise > 0.01 && this.aimAt) {
      m.root.updateMatrixWorld(true);
      const sh = r.rUpperArm.getWorldPosition(new THREE.Vector3());
      const want = sh.clone().add(new THREE.Vector3(-0.12, -0.04, 0).applyAxisAngle(UP, this.yaw)).addScaledVector(this.aimAt.clone().sub(sh).normalize(), 0.42);
      const g = new THREE.Object3D(); g.position.copy(want); g.lookAt(this.aimAt); // +Z (barrel) toward the target
      g.updateMatrixWorld(true);
      const inv = r.spine.matrixWorld.clone().invert();
      const lp = want.clone().applyMatrix4(inv);
      const lq = r.spine.getWorldQuaternion(new THREE.Quaternion()).invert().multiply(g.quaternion);
      this.gun.position.lerp(lp, this.raise); this.gun.quaternion.slerp(lq, this.raise);
    }
    m.root.updateMatrixWorld(true);
    // hands onto the gun: pistol grip (right) and fore-end (left)
    const grip = this.gun.localToWorld(new THREE.Vector3(0, -0.07, -0.02));
    const fore = this.gun.localToWorld(new THREE.Vector3(0, -0.03, 0.2));
    const right = new THREE.Vector3(-Math.cos(this.yaw), 0, Math.sin(this.yaw));
    twoBoneIK(r.rUpperArm, r.rForearm, r.rHand, grip, right.clone().multiplyScalar(1).add(new THREE.Vector3(0, -0.6, -0.2)));
    twoBoneIK(r.lUpperArm, r.lForearm, r.lHand, fore, right.clone().multiplyScalar(-1).add(new THREE.Vector3(0, -0.8, 0)));
  }

  dispose(): void {
    this.model.root.removeFromParent();
  }
}
