import * as THREE from 'three';
import { buildHumanoid, bakeRigidSkinned, damp, type Humanoid } from '../Rig';
import { pbr, skinMaterial } from '../../engine/Materials';
import { makeWeaponModel, weaponHold } from './WeaponModels';
import { ModelLibrary, jointsOf, skinnedMeshesOf, buildSkeletonFromJoints, reskin } from '../assets/ModelLibrary';

/** Limb bones get a rest orientation aiming their −Y axis at these children (see buildSkeletonFromJoints). */
const CLAIRE_AIM: Record<string, string> = {
  lUpperArm: 'lForearm', lForearm: 'lHand', rUpperArm: 'rForearm', rForearm: 'rHand',
  lThigh: 'lShin', lShin: 'lFoot', rThigh: 'rShin', rShin: 'rFoot',
  pony0: 'pony1', pony1: 'pony2', pony2: 'pony3',
};

export type ClaireState = 'normal' | 'dodge' | 'knife' | 'shove' | 'grabbed' | 'hurt' | 'dead' | 'finisher' | 'counter';

export interface AnimParams {
  speed: number;         // horizontal speed m/s
  localMove: THREE.Vector2; // x = strafe, y = forward in body space
  running: boolean;
  aim: boolean;
  aimPitch: number;      // radians, + up
  aimPoint: THREE.Vector3;
  state: ClaireState;
  stateT: number;        // 0..1 progress of current action
  dodgeDir: THREE.Vector2;
  hpRatio: number;
  reloading: boolean;
  lookTarget: THREE.Vector3 | null;
}

/**
 * Claire Redfield — procedural model (red jacket, jeans, auburn ponytail) with a
 * fully procedural animation layer: locomotion cycle, aim IK-ish pose, dodge, shove,
 * knife slash/finisher, grab struggle, hurt/death, plus "facial capture" style
 * micro-animation (blinks, brow & jaw expression, eye/head look-at, breathing).
 */
export class ClaireModel {
  rig: Humanoid;
  root: THREE.Group;
  private gunHolder = new THREE.Group();
  private gun: THREE.Group | null = null;
  private knifeModel: THREE.Group;
  gunId = 'none';
  private phase = 0;
  private blinkT = 2;
  private eyes: THREE.Mesh[] = [];
  private lids: THREE.Mesh[] = [];
  private brows: THREE.Mesh[] = [];
  private jaw!: THREE.Mesh;
  private pony: THREE.Bone[] = [];
  private ponyVel = 0;
  private ponyAng = 0;
  private lastYaw = 0;
  private aimBlend = 0;
  private breath = 0;
  expressionPain = 0;
  /** true when the Blender-authored GLB character is used */
  readonly detailed: boolean;
  private hipRest = 0.95;
  private ponyRest: THREE.Quaternion[] = [];
  private morphMeshes: THREE.Mesh[] = [];
  private eyeBones: THREE.Bone[] = [];
  private blinkW = 0; private painW = 0; private gripL = 0; private gripR = 0;
  onFootstep?: (foot: 'l' | 'r') => void;
  private lastStepSign = 0;

  constructor(texSize: number) {
    if (ModelLibrary.has('claire')) {
      this.detailed = true;
      this.rig = this.buildDetailed(texSize);
      this.root = this.rig.root;
      this.knifeModel = makeWeaponModel('knife');
      this.knifeModel.visible = false;
      this.rig.lHand.add(this.knifeModel);
      this.knifeModel.rotation.x = Math.PI / 2;
      this.knifeModel.position.set(0.0, -0.08, 0.03);
      this.root.add(this.gunHolder);
      return;
    }
    this.detailed = false;
    const jacket = pbr('jacket', Math.min(texSize, 512), 2, { color: 0xffffff });
    const jeans = pbr('denim', Math.min(texSize, 512), 3);
    const skin = skinMaterial(0xe8b9a0, false);
    const boots = new THREE.MeshStandardMaterial({ color: 0x2a1c14, roughness: 0.55, metalness: 0.05 });
    const shirt = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.8 });
    const glove = new THREE.MeshStandardMaterial({ color: 0x1a1512, roughness: 0.6 });
    this.rig = buildHumanoid({ skin, torso: jacket, upperArm: jacket, forearm: jacket, thigh: jeans, shin: jeans, foot: boots, hand: glove }, 1.0, 0.95);
    this.root = this.rig.root;
    const r = this.rig;

    // jacket details: collar, open front showing black top, belt + holster
    const bake: THREE.Mesh[] = [...this.rig.meshes];
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.025, 8, 16, Math.PI * 1.4), jacket);
    collar.rotation.set(Math.PI / 2, 0, Math.PI * 0.8); collar.position.set(0, 0.5, -0.01);
    r.spine.add(collar); bake.push(collar);
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.26, 0.02), shirt);
    top.position.set(0, 0.3, 0.115); r.spine.add(top); bake.push(top);
    const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.05, 16), new THREE.MeshStandardMaterial({ color: 0x1a1210, roughness: 0.5 }));
    belt.scale.set(1, 1, 0.75); belt.position.y = 0.04; r.hips.add(belt); bake.push(belt);
    const holster = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 0.1), belt.material);
    holster.position.set(-0.19, -0.08, 0); r.hips.add(holster); bake.push(holster);

    // face
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0xf2f2ee, roughness: 0.15 });
    const irisMat = new THREE.MeshStandardMaterial({ color: 0x3a5a78, roughness: 0.1 });
    const lidMat = skin;
    for (const s of [1, -1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 10), eyeMat);
      eye.position.set(0.034 * s, 0.02, 0.083);
      const iris = new THREE.Mesh(new THREE.SphereGeometry(0.009, 10, 8), irisMat);
      iris.position.z = 0.011; eye.add(iris);
      r.head.add(eye); this.eyes.push(eye);
      const lid = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), lidMat);
      lid.position.copy(eye.position); lid.scale.y = 0.2; r.head.add(lid); this.lids.push(lid);
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.006, 0.01), new THREE.MeshStandardMaterial({ color: 0x5a2a18 }));
      brow.position.set(0.034 * s, 0.045, 0.092); r.head.add(brow); this.brows.push(brow);
    }
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.035, 8), skin);
    nose.rotation.x = Math.PI / 2 + 0.3; nose.position.set(0, -0.005, 0.1); r.head.add(nose); bake.push(nose);
    const lips = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.008, 0.01), new THREE.MeshStandardMaterial({ color: 0xa65a50, roughness: 0.4 }));
    lips.position.set(0, -0.045, 0.09); r.head.add(lips); bake.push(lips);
    this.jaw = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.006, 0.01), lips.material);
    this.jaw.position.set(0, -0.052, 0.088); r.head.add(this.jaw);

    // hair: cap + bangs + ponytail chain (spring simulated)
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x5b2412, roughness: 0.55, metalness: 0.05 });
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.108, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.58), hairMat);
    cap.scale.set(0.95, 1.12, 1.05); cap.position.set(0, 0.012, -0.005); cap.castShadow = true; r.head.add(cap); bake.push(cap);
    const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.05, 0.04), hairMat);
    bangs.position.set(0, 0.075, 0.07); bangs.rotation.x = 0.4; r.head.add(bangs); bake.push(bangs);
    let parent: THREE.Object3D = r.head;
    for (let i = 0; i < 4; i++) {
      const seg = new THREE.Bone();
      seg.position.set(0, i === 0 ? 0.05 : -0.07, i === 0 ? -0.1 : 0);
      const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.028 - i * 0.004, 0.05, 3, 8), hairMat);
      m.position.y = -0.035; m.castShadow = true; seg.add(m); bake.push(m);
      parent.add(seg); parent = seg; this.pony.push(seg);
    }

    // weapon holder lives in world space (oriented to the aim point every frame)
    this.knifeModel = makeWeaponModel('knife');
    this.knifeModel.visible = false;
    r.lHand.add(this.knifeModel);
    this.knifeModel.rotation.x = Math.PI / 2;
    this.knifeModel.position.set(0, -0.05, 0.02);
    this.root.add(this.gunHolder);
    // GPU-skinned body: ~9 draw calls instead of ~40 (animated face parts stay separate, no shadows)
    bakeRigidSkinned(this.root, [...r.bones, ...this.pony], bake);
    for (const m of [...this.eyes, ...this.lids, ...this.brows, this.jaw]) m.castShadow = false;
  }


  /** Blender-authored Claire: sculpted body, cloth, hair cards, eyes, shape keys (blink/pain/grip). */
  private buildDetailed(texSize: number): Humanoid {
    const g = ModelLibrary.get('claire')!;
    const root = new THREE.Group();
    const joints = jointsOf(g);
    const bm = buildSkeletonFromJoints(joints, CLAIRE_AIM, root);
    root.updateMatrixWorld(true);
    const bones = [...bm.values()];
    const B = (n: string) => bm.get(n)!;
    this.hipRest = B('hips').position.y;
    const aniso = texSize >= 1024 ? 8 : 4;
    for (const src of skinnedMeshesOf(g)) {
      const mat0 = src.material as THREE.MeshStandardMaterial;
      let mat: THREE.Material = mat0;
      for (const t of [mat0.map, mat0.normalMap, mat0.roughnessMap]) if (t) t.anisotropy = aniso;
      if (src.name.includes('body')) {
        const sk = skinMaterial(0xffffff, false);
        sk.map = mat0.map; sk.normalMap = mat0.normalMap; sk.normalScale.set(1, 1);
        sk.roughnessMap = mat0.roughnessMap; sk.roughness = 1; sk.aoMap = mat0.roughnessMap; sk.aoMapIntensity = 0.6;
        sk.sheen = 0.35; sk.clearcoat = 0.08; sk.clearcoatRoughness = 0.5;
        mat = sk;
      } else if (src.name.includes('hair')) {
        const h = new THREE.MeshStandardMaterial({ map: mat0.map, roughness: 0.42, metalness: 0, side: THREE.DoubleSide,
          alphaTest: 0.35, vertexColors: !!src.geometry.attributes.color, color: 0xffffff });
        h.alphaToCoverage = true;
        mat = h;
      } else if (src.name.includes('eyes')) {
        mat = new THREE.MeshPhysicalMaterial({ map: mat0.map, normalMap: mat0.normalMap, color: 0xd6d2cc, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.03 });
      } else {
        mat0.aoMap = mat0.roughnessMap; mat0.aoMapIntensity = 0.7; mat0.envMapIntensity = 0.55;
      }
      if (src.geometry.attributes.uv1) src.geometry.deleteAttribute('uv1');
      const m = reskin(src, bones, mat);
      if (src.name.includes('eyes')) m.castShadow = false;
      m.frustumCulled = false;
      root.add(m);
      m.bind(new THREE.Skeleton(bones));
      if (m.morphTargetDictionary) this.morphMeshes.push(m);
    }
    // now bones are "identity = modelled pose"; the game's limb animation expects identity = hanging along −Y,
    // which the aimed rest orientation already encodes.
    this.eyeBones = [B('lEye'), B('rEye')].filter(Boolean);
    this.pony = ['pony0', 'pony1', 'pony2', 'pony3'].map((n) => bm.get(n)).filter((b): b is THREE.Bone => !!b);
    this.ponyRest = this.pony.map((b) => b.quaternion.clone());
    return {
      root, hips: B('hips'), spine: B('spine'), neck: B('neck'), head: B('head'),
      lUpperArm: B('lUpperArm'), lForearm: B('lForearm'), lHand: B('lHand'),
      rUpperArm: B('rUpperArm'), rForearm: B('rForearm'), rHand: B('rHand'),
      lThigh: B('lThigh'), lShin: B('lShin'), rThigh: B('rThigh'), rShin: B('rShin'),
      bones, meshes: [], zoneMeshes: new Map(),
    };
  }

  private setMorph(name: string, w: number): void {
    for (const m of this.morphMeshes) {
      const i = m.morphTargetDictionary![name];
      if (i !== undefined) m.morphTargetInfluences![i] = w;
    }
  }

  setWeapon(id: string): void {
    if (id === this.gunId) return;
    this.gunId = id;
    if (this.gun) this.gunHolder.remove(this.gun);
    this.gun = id !== 'knife' && id !== 'none' ? makeWeaponModel(id) : null;
    if (this.gun) this.gunHolder.add(this.gun);
  }

  muzzleWorld(out: THREE.Vector3): THREE.Vector3 {
    const m = this.gun?.getObjectByName('muzzle');
    if (m) return m.getWorldPosition(out);
    return this.rig.rHand.getWorldPosition(out);
  }

  animate(dt: number, t: number, p: AnimParams): void {
    const r = this.rig;
    const hold = weaponHold(this.gunId === 'none' ? 'knife' : this.gunId);
    this.aimBlend = damp(this.aimBlend, p.aim && p.state === 'normal' ? 1 : 0, 14, dt);
    const a = this.aimBlend;

    // ----- locomotion -------------------------------------------------------
    const limp = p.hpRatio < 0.34;
    const stride = p.running ? 1.7 : 1.1;
    this.phase += (p.speed / stride) * Math.PI * dt * (limp ? 0.85 : 1);
    const s = Math.sin(this.phase);
    const amp = Math.min(1, p.speed / 2) * (p.running ? 0.8 : 0.5);
    const back = p.localMove.y < -0.2 && a > 0.5 ? -1 : 1;
    const legAmpL = amp * (limp ? 0.6 : 1), legAmpR = amp;
    let lTh = -s * legAmpL * back, rTh = s * legAmpR * back;
    let lSh = Math.max(0, s) * amp * 1.3, rSh = Math.max(0, -s) * amp * 1.3;
    let hipY = this.hipRest - Math.abs(Math.cos(this.phase)) * 0.035 * amp - (limp ? Math.max(0, s) * 0.03 : 0);
    let spineX = (p.running ? 0.18 : 0.04) * Math.min(1, p.speed / 2) + a * 0.03;
    let hipsRotY = 0, rootLeanZ = 0, rootLeanX = 0, rootY = 0;

    // strafe while aiming: cross-step
    if (a > 0.5 && Math.abs(p.localMove.x) > 0.3) {
      r.lThigh.rotation.z = Math.max(0, s) * 0.25 * Math.sign(p.localMove.x);
      r.rThigh.rotation.z = -Math.max(0, -s) * 0.25 * Math.sign(p.localMove.x);
    } else { r.lThigh.rotation.z = damp(r.lThigh.rotation.z, 0, 10, dt); r.rThigh.rotation.z = damp(r.rThigh.rotation.z, 0, 10, dt); }

    // footstep events at zero crossings
    const sign = Math.sign(s);
    if (p.speed > 0.3 && sign !== this.lastStepSign) { this.onFootstep?.(sign > 0 ? 'l' : 'r'); this.lastStepSign = sign; }

    // ----- arms -------------------------------------------------------------
    const pitch = p.aimPitch;
    let lUx = s * amp * 0.8, lUz = this.detailed ? 0.06 : 0.1, lFx = -0.25 - amp * 0.4, lUy = 0;
    let rUx = -s * amp * 0.8, rUz = this.detailed ? -0.06 : -0.1, rFx = -0.25 - amp * 0.4, rUy = 0;
    if (hold !== 'knife' && a > 0.001) {
      const pist = hold === 'pistol';
      const tRUx = pist ? -Math.PI / 2 - pitch * 0.7 : -1.05 - pitch * 0.7;
      const tRUz = pist ? 0.28 : 0.22;
      const tRFx = pist ? -0.05 : -0.95;
      const tLUx = pist ? -Math.PI / 2 + 0.15 - pitch * 0.7 : -1.35 - pitch * 0.7;
      const tLUz = pist ? -0.45 : -0.55;
      const tLFx = pist ? -0.45 : -0.3;
      rUx = THREE.MathUtils.lerp(rUx, tRUx, a); rUz = THREE.MathUtils.lerp(rUz, tRUz, a); rFx = THREE.MathUtils.lerp(rFx, tRFx, a);
      lUx = THREE.MathUtils.lerp(lUx, tLUx, a); lUz = THREE.MathUtils.lerp(lUz, tLUz, a); lFx = THREE.MathUtils.lerp(lFx, tLFx, a);
      spineX = THREE.MathUtils.lerp(spineX, -pitch * 0.3, a);
    } else if (hold !== 'knife') {
      // low-ready carry
      rUx = THREE.MathUtils.lerp(rUx, -0.5, 0.6); rFx = -0.6;
    }
    if (p.reloading) { lUx = -0.9; lFx = -1.4; lUz = -0.3; rUx = -0.8; rFx = -0.9; rUz = 0.2; }

    // ----- action layers ----------------------------------------------------
    const k = p.stateT;
    switch (p.state) {
      case 'dodge': {
        const e = Math.sin(Math.min(1, k) * Math.PI);
        hipY -= e * 0.28;
        rootLeanZ = -p.dodgeDir.x * e * 0.45;
        rootLeanX = p.dodgeDir.y * e * 0.35;
        lTh = rTh = -e * 0.9; lSh = rSh = e * 1.4;
        lUx = rUx = -e * 1.2;
        break;
      }
      case 'knife': {
        const e = Math.min(1, k * 2.2);
        lUx = THREE.MathUtils.lerp(-2.3, -0.5, e); lUz = THREE.MathUtils.lerp(0.9, -0.7, e); lFx = -0.3;
        hipsRotY = THREE.MathUtils.lerp(0.35, -0.35, e);
        break;
      }
      case 'finisher':
      case 'counter': {
        const e = k < 0.45 ? k / 0.45 : 1;
        lUx = THREE.MathUtils.lerp(-2.6, -0.9, e); lUz = 0.1; lFx = -0.4;
        spineX = 0.6 * Math.sin(Math.min(1, k * 1.5) * Math.PI);
        hipY -= 0.25 * Math.sin(Math.min(1, k) * Math.PI);
        lTh = rTh = -0.6 * Math.sin(Math.min(1, k) * Math.PI); lSh = rSh = 1.0 * Math.sin(Math.min(1, k) * Math.PI);
        break;
      }
      case 'shove': {
        const e = k < 0.35 ? k / 0.35 : Math.max(0, 1 - (k - 0.35) / 0.65);
        lUx = rUx = -1.5 * e - 0.2; lFx = rFx = -0.2; lUz = -0.2; rUz = 0.2;
        spineX = 0.25 * e;
        break;
      }
      case 'grabbed': {
        lUx = -1.7 + Math.sin(t * 22) * 0.2; rUx = -1.6 + Math.cos(t * 19) * 0.2;
        lFx = rFx = -1.2; lUz = -0.3; rUz = 0.3; spineX = -0.25;
        break;
      }
      case 'hurt': spineX = -0.35 * Math.sin(k * Math.PI); break;
      case 'dead': {
        const e = Math.min(1, k);
        rootLeanX = -e * Math.PI / 2 * 0.98;
        rootY = 0;
        hipY = THREE.MathUtils.lerp(hipY, this.hipRest, e);
        lUx = -2.5 * e; rUx = -2.2 * e;
        break;
      }
    }

    r.hips.position.y = damp(r.hips.position.y, hipY, 18, dt);
    r.hips.rotation.y = damp(r.hips.rotation.y, hipsRotY, 14, dt);
    r.spine.rotation.x = damp(r.spine.rotation.x, spineX, 14, dt);
    r.spine.rotation.y = damp(r.spine.rotation.y, -hipsRotY * 0.5, 14, dt);
    r.lThigh.rotation.x = damp(r.lThigh.rotation.x, lTh, 20, dt);
    r.rThigh.rotation.x = damp(r.rThigh.rotation.x, rTh, 20, dt);
    r.lShin.rotation.x = damp(r.lShin.rotation.x, lSh, 20, dt);
    r.rShin.rotation.x = damp(r.rShin.rotation.x, rSh, 20, dt);
    const armK = p.state === 'normal' && a > 0.5 ? 30 : 16;
    r.lUpperArm.rotation.set(damp(r.lUpperArm.rotation.x, lUx, armK, dt), damp(r.lUpperArm.rotation.y, lUy, armK, dt), damp(r.lUpperArm.rotation.z, lUz, armK, dt));
    r.rUpperArm.rotation.set(damp(r.rUpperArm.rotation.x, rUx, armK, dt), damp(r.rUpperArm.rotation.y, rUy, armK, dt), damp(r.rUpperArm.rotation.z, rUz, armK, dt));
    r.lForearm.rotation.x = damp(r.lForearm.rotation.x, lFx, armK, dt);
    r.rForearm.rotation.x = damp(r.rForearm.rotation.x, rFx, armK, dt);
    const dead = p.state === 'dead';
    r.root.children.forEach(() => {});
    r.hips.rotation.z = damp(r.hips.rotation.z, rootLeanZ, 12, dt);
    r.hips.rotation.x = damp(r.hips.rotation.x, rootLeanX, dead ? 4 : 12, dt);
    if (dead) r.hips.position.y = damp(r.hips.position.y, 0.2 + rootY, 3, dt);

    // breathing
    this.breath += dt * (p.running ? 3.2 : limp ? 2.6 : 1.4);
    r.spine.scale.set(1, 1 + Math.sin(this.breath) * 0.01, 1 + Math.sin(this.breath) * 0.02);

    // ----- face & head ("facial capture" layer) -----------------------------
    const worldYaw = this.root.rotation.y;
    let headYaw = 0, headPitch = a * pitch * 0.4;
    if (p.lookTarget && !dead) {
      const hp = r.head.getWorldPosition(new THREE.Vector3());
      const d = p.lookTarget.clone().sub(hp);
      let yaw = Math.atan2(d.x, d.z) - worldYaw;
      yaw = Math.atan2(Math.sin(yaw), Math.cos(yaw));
      if (Math.abs(yaw) < 1.4) { headYaw = THREE.MathUtils.clamp(yaw, -0.9, 0.9); headPitch = Math.atan2(d.y, Math.hypot(d.x, d.z)) * 0.6; }
    }
    r.neck.rotation.y = damp(r.neck.rotation.y, headYaw * (1 - a * 0.7), 8, dt);
    r.neck.rotation.x = damp(r.neck.rotation.x, -headPitch, 8, dt);
    for (const e of this.eyes) { e.rotation.y = damp(e.rotation.y, headYaw * 0.3, 20, dt); }
    for (const e of this.eyeBones) { e.rotation.y = damp(e.rotation.y, headYaw * 0.35, 20, dt); e.rotation.x = damp(e.rotation.x, -headPitch * 0.3, 20, dt); }
    this.blinkT -= dt;
    let lid = 0.2;
    if (this.blinkT < 0) { lid = 1; if (this.blinkT < -0.12) this.blinkT = 2 + Math.random() * 4; }
    if (a > 0.5) lid = Math.max(lid, 0.45); // squint while aiming
    if (dead) lid = 1;
    this.expressionPain = Math.max(0, this.expressionPain - dt * 0.8);
    const pain = Math.max(this.expressionPain, limp ? 0.5 : 0, p.state === 'grabbed' ? 1 : 0);
    if (this.detailed) {
      this.blinkW = damp(this.blinkW, lid <= 0.2 ? 0.2 : Math.max(0.2, lid * 0.95), 40, dt);
      this.painW = damp(this.painW, pain, 10, dt);
      this.setMorph('blink', this.blinkW);
      this.setMorph('pain', this.painW);
    }
    for (const l of this.lids) l.scale.y = damp(l.scale.y, lid, 40, dt);
    this.brows.forEach((b, i) => { b.rotation.z = (i === 0 ? -1 : 1) * pain * 0.35; b.position.y = 0.045 + pain * 0.006; });
    if (this.jaw) this.jaw.position.y = -0.052 - pain * 0.012 - (p.running ? Math.abs(Math.sin(this.breath)) * 0.004 : 0);

    // ponytail spring (driven by body yaw rate + locomotion)
    let yawRate = worldYaw - this.lastYaw; yawRate = Math.atan2(Math.sin(yawRate), Math.cos(yawRate));
    this.lastYaw = worldYaw;
    const targetAng = 0.25 + Math.min(1, p.speed / 4) * 0.5;
    this.ponyVel += ((targetAng - this.ponyAng) * 60 - this.ponyVel * 6) * dt;
    this.ponyAng += this.ponyVel * dt;
    if (this.detailed) {
      const e = new THREE.Euler(); const dq = new THREE.Quaternion();
      this.pony.forEach((seg, i) => {
        const sway = -yawRate * 8 * (i + 1) * 0.5 + Math.sin(this.phase) * amp * 0.1;
        seg.userData.sway = damp(seg.userData.sway ?? 0, sway, 8, dt);
        e.set((this.ponyAng - 0.25) * (i === 0 ? 0.6 : 0.3), 0, seg.userData.sway * 0.6);
        seg.quaternion.copy(this.ponyRest[i]).multiply(dq.setFromEuler(e));
      });
    } else this.pony.forEach((seg, i) => {
      seg.rotation.x = -this.ponyAng * (i === 0 ? 1 : 0.35) - (i === 0 ? 0.5 : 0);
      seg.rotation.z = damp(seg.rotation.z, -yawRate * 8 * (i + 1) * 0.5 + Math.sin(this.phase) * amp * 0.08, 8, dt);
    });

    // ----- weapon placement ------------------------------------------------
    this.knifeModel.visible = p.state === 'knife' || p.state === 'finisher' || p.state === 'counter';
    if (this.detailed) {
      const holding = !!this.gun && this.gun.visible !== false && this.gunId !== 'none';
      this.gripR = damp(this.gripR, holding ? 1 : 0.15, 12, dt);
      this.gripL = damp(this.gripL, this.knifeModel.visible || (holding && a > 0.5) ? 1 : 0.15, 12, dt);
      this.setMorph('grip_R', this.gripR); this.setMorph('grip_L', this.gripL);
    }
    if (this.gun) {
      this.gun.visible = p.state !== 'knife' && p.state !== 'finisher' && p.state !== 'counter';
      this.root.updateMatrixWorld(true);
      const hand = this.detailed ? r.rHand.localToWorld(new THREE.Vector3(0, -0.075, 0.015)) : r.rHand.getWorldPosition(new THREE.Vector3());
      const local = this.root.worldToLocal(hand.clone());
      this.gunHolder.position.copy(local);
      if (a > 0.3 && p.state === 'normal') {
        const target = this.root.worldToLocal(p.aimPoint.clone());
        const m = new THREE.Matrix4().lookAt(target, local, new THREE.Vector3(0, 1, 0));
        const q = new THREE.Quaternion().setFromRotationMatrix(m);
        this.gunHolder.quaternion.slerp(q, 1 - Math.exp(-30 * dt));
      } else {
        const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.9, 0, 0));
        r.rHand.getWorldQuaternion(new THREE.Quaternion());
        this.gunHolder.quaternion.slerp(q, 1 - Math.exp(-12 * dt));
      }
    }
  }
}
