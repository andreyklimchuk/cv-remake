import * as THREE from 'three';
import { buildHumanoid, bakeRigidSkinned, damp, type Humanoid } from '../Rig';
import { pbr, skinMaterial } from '../../engine/Materials';
import { makeWeaponModel, weaponHold } from './WeaponModels';
import { LightPool } from '../../engine/LightPool';
import { glowTexture } from '../../engine/Materials';
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
  /** second (left-hand) gun for dual-wield weapons (Steve's Lugers) */
  private gunHolderL = new THREE.Group();
  private gunL: THREE.Group | null = null;
  /** Claire's lighter: model + flame + warm point light, held in the left hand */
  private lighter: THREE.Group | null = null;
  private lighterLight: THREE.PointLight | null = null;
  private flame: THREE.Sprite | null = null;
  lighterOn = false;
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
  private lastStep = '';
  private idleT = 0;
  private lastFwdSpeed = 0;
  private accLean = 0;
  private bank = 0;
  private lastYawG = 0;
  private hipRestX = 0;
  private feet: (THREE.Bone | undefined)[] = [];

  /** which GLB character this is ('claire' | 'steve') */
  readonly key: string;
  constructor(texSize: number, key = 'claire') {
    this.key = key;
    if (ModelLibrary.has(key)) {
      this.detailed = true;
      this.rig = this.buildDetailed(texSize);
      this.root = this.rig.root;
      this.knifeModel = makeWeaponModel('knife');
      this.knifeModel.visible = false;
      this.rig.lHand.add(this.knifeModel);
      this.knifeModel.rotation.x = Math.PI / 2;
      this.knifeModel.position.set(0.0, -0.08, 0.03);
      this.root.add(this.gunHolder, this.gunHolderL);
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
    this.root.add(this.gunHolder, this.gunHolderL);
    // GPU-skinned body: ~9 draw calls instead of ~40 (animated face parts stay separate, no shadows)
    bakeRigidSkinned(this.root, [...r.bones, ...this.pony], bake);
    for (const m of [...this.eyes, ...this.lids, ...this.brows, this.jaw]) m.castShadow = false;
  }


  /** Blender-authored Claire: sculpted body, cloth, hair cards, eyes, shape keys (blink/pain/grip). */
  private buildDetailed(texSize: number): Humanoid {
    const g = ModelLibrary.get(this.key)!;
    const root = new THREE.Group();
    const joints = jointsOf(g);
    const bm = buildSkeletonFromJoints(joints, CLAIRE_AIM, root);
    root.updateMatrixWorld(true);
    const bones = [...bm.values()];
    const B = (n: string) => bm.get(n)!;
    this.hipRest = B('hips').position.y; this.hipRestX = B('hips').position.x;
    this.feet = [bm.get('lFoot'), bm.get('rFoot')];
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

  /** attach every gun model once so their materials compile during loading; returns the undo */
  preloadWeapons(): () => void {
    const g = new THREE.Group();
    for (const id of ['m9f', 'm3', 'mp5', 'python', 'gl', 'bowgun', 'linear', 'luger']) { try { g.add(makeWeaponModel(id)); } catch { /* optional */ } }
    this.gunHolder.add(g);
    return () => { this.gunHolder.remove(g); };
  }

  setWeapon(id: string): void {
    if (id === this.gunId) return;
    this.gunId = id;
    if (this.gun) this.gunHolder.remove(this.gun);
    if (this.gunL) { this.gunHolderL.remove(this.gunL); this.gunL = null; }
    const dual = weaponHold(id) === 'dual';
    this.gun = id !== 'knife' && id !== 'none' ? makeWeaponModel(dual ? 'luger' : id) : null;
    if (this.gun) this.gunHolder.add(this.gun);
    if (dual) { this.gunL = makeWeaponModel('luger'); this.gunHolderL.add(this.gunL); }
  }

  muzzleWorld(out: THREE.Vector3): THREE.Vector3 {
    const m = this.gun?.getObjectByName('muzzle');
    if (m) return m.getWorldPosition(out);
    return this.rig.rHand.getWorldPosition(out);
  }

  /** left-hand muzzle of a dual-wield weapon, or null */
  muzzleWorldL(out: THREE.Vector3): THREE.Vector3 | null {
    const m = this.gunL?.getObjectByName('muzzle');
    return m ? m.getWorldPosition(out) : null;
  }

  /** light / extinguish the lighter (built lazily; its light joins the pooled light set) */
  setLighter(on: boolean): void {
    this.lighterOn = on;
    if (on && !this.lighter) {
      const g = new THREE.Group();
      const glb = ModelLibrary.get('item_lighter');
      if (glb) {
        const m = glb.scene.clone(true);
        const bb = new THREE.Box3().setFromObject(m); const sz = bb.getSize(new THREE.Vector3());
        const k = 0.058 / Math.max(0.001, Math.max(sz.x, sz.y, sz.z));
        m.scale.setScalar(k);
        const c = bb.getCenter(new THREE.Vector3()).multiplyScalar(k);
        m.position.set(-c.x, -bb.min.y * k - 0.058, -c.z);
        if (sz.y < Math.max(sz.x, sz.z)) { m.rotation.x = -Math.PI / 2; m.position.set(-c.x, -0.058, 0); }
        m.traverse((o) => { if ((o as THREE.Mesh).isMesh) o.castShadow = false; });
        g.add(m);
      } else {
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.05, 0.012), new THREE.MeshStandardMaterial({ color: 0xb8bcc2, metalness: 1, roughness: 0.3 }));
        body.position.y = -0.03; g.add(body);
      }
      this.flame = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,236,170,1)', 'rgba(255,110,20,0)'), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
      this.flame.scale.set(0.035, 0.07, 1); this.flame.position.y = 0.03; g.add(this.flame);
      this.lighterLight = new THREE.PointLight(0xffa24a, 3.2, 7.5, 2);
      this.lighterLight.position.y = 0.06;
      this.lighterLight.userData.priority = 12; // the player's own light always wins a pooled slot
      g.add(this.lighterLight);
      this.lighter = g;
      this.root.add(g);
      LightPool.active?.adopt(g);
    }
    if (this.lighter) this.lighter.visible = on;
  }

  animate(dt: number, t: number, p: AnimParams): void {
    const r = this.rig;
    const hold = weaponHold(this.gunId === 'none' ? 'knife' : this.gunId);
    this.aimBlend = damp(this.aimBlend, p.aim && p.state === 'normal' ? 1 : 0, 14, dt);
    const a = this.aimBlend;

    // ----- locomotion (biomechanical gait curves, see Gait below) -----------
    const limp = p.hpRatio < 0.34;
    const sp = p.speed;
    const g = THREE.MathUtils.smoothstep(sp, 0.05, 0.6);                 // gait weight (0 = idle)
    const rb = THREE.MathUtils.smoothstep(sp, 2.5, 3.9);                 // walk → run blend
    const L = THREE.MathUtils.lerp(0.9 + 0.85 * Math.min(1, sp / 2.2), 2.9, rb); // stride length (m per cycle)
    const back = p.localMove.y < -0.25 ? -1 : 1;
    const fwdK = Math.abs(p.localMove.y), sideK = p.localMove.x;
    this.phase = (this.phase + back * (sp / L) * dt * (limp ? 0.88 : 1) + 1) % 1;
    const uL = this.phase, uR = (this.phase + 0.5) % 1;
    const legL = Gait.leg(uL, rb), legR = Gait.leg(uR, rb);
    const limpK = limp ? 0.6 : 1;
    const amp = g * (0.75 + 0.25 * Math.min(1, sp / 2.2));
    const sag = amp * Math.max(0.35, fwdK);
    let lTh = -legL.hip * sag * limpK, rTh = -legR.hip * sag;
    let lSh = legL.knee * amp * (limp ? 0.75 : 1) + 0.06, rSh = legR.knee * amp + 0.06;
    let lFt = -legL.ankle * amp, rFt = -legR.ankle * amp;
    const TAU = Math.PI * 2;
    // pelvis: vertical bob (walk: lowest at heel strike; run: lowest at mid-stance), yaw with the swing leg,
    // obliquity (swing side drops), lateral shift over the stance foot
    const bobW = -0.022 * (Math.cos(2 * TAU * uL) + 1) / 2, bobR = -0.045 * (Math.cos(2 * TAU * (uL - 0.15)) + 1) / 2 - 0.035;
    let hipY = this.hipRest + THREE.MathUtils.lerp(bobW, bobR, rb) * amp - (limp ? Math.max(0, Math.sin(TAU * uL)) * 0.035 * g : 0);
    let gYaw = -THREE.MathUtils.lerp(0.09, 0.14, rb) * Math.cos(TAU * uL) * amp * back;
    let gRoll = THREE.MathUtils.lerp(0.06, 0.035, rb) * Math.sin(TAU * uL) * amp * (limp ? 1.6 : 1);
    let gSway = THREE.MathUtils.lerp(0.022, 0.01, rb) * Math.sin(TAU * uL) * amp;
    // idle: slow weight shift & micro-sway
    this.idleT += dt;
    const idle = 1 - g;
    const ws = Math.sin(this.idleT * 0.55) * 0.6 + Math.sin(this.idleT * 0.23) * 0.4;
    gSway += ws * 0.014 * idle; gRoll += ws * 0.025 * idle;
    lSh += Math.max(0, -ws) * 0.12 * idle; rSh += Math.max(0, ws) * 0.12 * idle;
    lTh -= Math.max(0, -ws) * 0.06 * idle; rTh -= Math.max(0, ws) * 0.06 * idle;
    lFt += Math.max(0, -ws) * 0.06 * idle; rFt += Math.max(0, ws) * 0.06 * idle;
    // acceleration / braking lean and banking into turns
    const fwdSpeed = sp * p.localMove.y;
    const acc = (fwdSpeed - this.lastFwdSpeed) / Math.max(1e-3, dt); this.lastFwdSpeed = fwdSpeed;
    this.accLean = damp(this.accLean, THREE.MathUtils.clamp(acc * 0.028, -0.16, 0.22), 5, dt);
    let yawRate0 = this.root.rotation.y - this.lastYawG; yawRate0 = Math.atan2(Math.sin(yawRate0), Math.cos(yawRate0)); this.lastYawG = this.root.rotation.y;
    this.bank = damp(this.bank, THREE.MathUtils.clamp(-yawRate0 / Math.max(1e-3, dt) * sp * 0.018, -0.18, 0.18), 6, dt);
    let spineX = THREE.MathUtils.lerp(0.035, 0.2, rb) * g + this.accLean + a * 0.03 + (limp ? 0.08 : 0);
    let spineY = -gYaw * 1.25, spineZ = -gRoll * 0.6;
    let hipsRotY = 0, rootLeanZ = this.bank * (1 - a), rootLeanX = 0, rootY = 0;

    // strafe while aiming / side steps: abduct the leading leg on its swing, cross-step otherwise
    const side = Math.abs(sideK) > 0.3 ? Math.sign(sideK) : 0;
    const lAbd = side ? Math.max(0, Math.sin(TAU * uL)) * 0.22 * side * g : 0;
    const rAbd = side ? -Math.max(0, Math.sin(TAU * uR)) * 0.22 * side * g : 0;
    r.lThigh.rotation.z = damp(r.lThigh.rotation.z, lAbd, 14, dt);
    r.rThigh.rotation.z = damp(r.rThigh.rotation.z, rAbd, 14, dt);

    // footstep events at heel strike
    const stepNow = uL < 0.5 ? 'l' : 'r';
    if (sp > 0.3 && stepNow !== this.lastStep) { this.onFootstep?.(stepNow); this.lastStep = stepNow; }

    // ----- arms -------------------------------------------------------------
    const pitch = p.aimPitch;
    const armA = THREE.MathUtils.lerp(0.32, 0.75, rb) * amp, cl = Math.cos(TAU * uL);
    const elb = THREE.MathUtils.lerp(0.22, 1.35, rb) * g + 0.18 * idle;
    let lUx = cl * armA + 0.04, lUz = (this.detailed ? 0.07 : 0.1) - rb * 0.05 * g, lFx = -elb - Math.max(0, -cl) * armA * 0.6, lUy = rb * 0.12 * g;
    let rUx = -cl * armA + 0.04, rUz = (this.detailed ? -0.07 : -0.1) + rb * 0.05 * g, rFx = -elb - Math.max(0, cl) * armA * 0.6, rUy = -rb * 0.12 * g;
    // relaxed idle arms breathe/sway slightly
    lUx += Math.sin(this.idleT * 0.9) * 0.015 * idle; rUx += Math.sin(this.idleT * 0.9 + 1) * 0.015 * idle;
    const lit = this.lighterOn && hold !== 'dual' && p.state === 'normal' && !p.reloading;
    if (hold === 'dual' && a > 0.001) {
      // Steve: both arms extended, one Luger in each hand
      rUx = THREE.MathUtils.lerp(rUx, -Math.PI / 2 - pitch * 0.85, a); rUz = THREE.MathUtils.lerp(rUz, 0.12, a); rFx = THREE.MathUtils.lerp(rFx, -0.04, a);
      lUx = THREE.MathUtils.lerp(lUx, -Math.PI / 2 - pitch * 0.85, a); lUz = THREE.MathUtils.lerp(lUz, -0.12, a); lFx = THREE.MathUtils.lerp(lFx, -0.04, a);
      spineX = THREE.MathUtils.lerp(spineX, -pitch * 0.3, a);
    } else if (hold === 'dual') {
      rUx = THREE.MathUtils.lerp(rUx, -0.45, 0.6); rFx = -0.65; lUx = THREE.MathUtils.lerp(lUx, -0.45, 0.6); lFx = -0.65;
    } else if (hold !== 'knife' && a > 0.001) {
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
    if (lit && !(a > 0.5 && hold !== 'pistol')) {
      // lighter raised in front of the chest (one-handed pistol aim keeps it lit beside the gun)
      const e = a > 0.5 ? 0.35 : 1;
      lUx = THREE.MathUtils.lerp(lUx, -0.85, e); lFx = THREE.MathUtils.lerp(lFx, -1.15, e); lUz = THREE.MathUtils.lerp(lUz, -0.22, e);
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

    const free = p.state === 'normal' || p.state === 'hurt' ? 1 : 0.25;
    if (p.state === 'dead') { gYaw = gRoll = gSway = spineY = spineZ = 0; }
    r.hips.position.y = damp(r.hips.position.y, hipY, 18, dt);
    r.hips.position.x = damp(r.hips.position.x, this.hipRestX + gSway * free, 10, dt);
    r.hips.rotation.y = damp(r.hips.rotation.y, hipsRotY + gYaw * free * (1 - a * 0.6), 14, dt);
    r.spine.rotation.x = damp(r.spine.rotation.x, spineX, 12, dt);
    r.spine.rotation.y = damp(r.spine.rotation.y, -hipsRotY * 0.5 + spineY * free * (1 - a * 0.8), 12, dt);
    r.spine.rotation.z = damp(r.spine.rotation.z, spineZ * free * (1 - a * 0.7), 12, dt);
    r.lThigh.rotation.x = damp(r.lThigh.rotation.x, lTh, 30, dt);
    r.rThigh.rotation.x = damp(r.rThigh.rotation.x, rTh, 30, dt);
    r.lShin.rotation.x = damp(r.lShin.rotation.x, lSh, 30, dt);
    r.rShin.rotation.x = damp(r.rShin.rotation.x, rSh, 30, dt);
    if (this.feet[0]) this.feet[0].rotation.x = damp(this.feet[0].rotation.x, lFt, 30, dt);
    if (this.feet[1]) this.feet[1].rotation.x = damp(this.feet[1].rotation.x, rFt, 30, dt);
    const armK = p.state === 'normal' && a > 0.5 ? 30 : 16;
    r.lUpperArm.rotation.set(damp(r.lUpperArm.rotation.x, lUx, armK, dt), damp(r.lUpperArm.rotation.y, lUy, armK, dt), damp(r.lUpperArm.rotation.z, lUz, armK, dt));
    r.rUpperArm.rotation.set(damp(r.rUpperArm.rotation.x, rUx, armK, dt), damp(r.rUpperArm.rotation.y, rUy, armK, dt), damp(r.rUpperArm.rotation.z, rUz, armK, dt));
    r.lForearm.rotation.x = damp(r.lForearm.rotation.x, lFx, armK, dt);
    r.rForearm.rotation.x = damp(r.rForearm.rotation.x, rFx, armK, dt);
    const dead = p.state === 'dead';
    r.root.children.forEach(() => {});
    r.hips.rotation.z = damp(r.hips.rotation.z, rootLeanZ + gRoll * free, 12, dt);
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
    const stab = -(r.hips.rotation.y + r.spine.rotation.y) * 0.85;
    r.neck.rotation.y = damp(r.neck.rotation.y, headYaw * (1 - a * 0.7) + stab, 8, dt);
    r.neck.rotation.z = damp(r.neck.rotation.z, -(r.hips.rotation.z + r.spine.rotation.z) * 0.7, 8, dt);
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
        const sway = -yawRate * 8 * (i + 1) * 0.5 + Math.sin(this.phase * TAU * 2) * amp * 0.1;
        seg.userData.sway = damp(seg.userData.sway ?? 0, sway, 8, dt);
        e.set((this.ponyAng - 0.25) * (i === 0 ? 0.6 : 0.3), 0, seg.userData.sway * 0.6);
        seg.quaternion.copy(this.ponyRest[i]).multiply(dq.setFromEuler(e));
      });
    } else this.pony.forEach((seg, i) => {
      seg.rotation.x = -this.ponyAng * (i === 0 ? 1 : 0.35) - (i === 0 ? 0.5 : 0);
      seg.rotation.z = damp(seg.rotation.z, -yawRate * 8 * (i + 1) * 0.5 + Math.sin(this.phase * TAU * 2) * amp * 0.08, 8, dt);
    });

    // ----- weapon placement ------------------------------------------------
    this.knifeModel.visible = p.state === 'knife' || p.state === 'finisher' || p.state === 'counter';
    if (this.detailed) {
      const holding = !!this.gun && this.gun.visible !== false && this.gunId !== 'none';
      this.gripR = damp(this.gripR, holding ? 1 : 0.15, 12, dt);
      this.gripL = damp(this.gripL, this.knifeModel.visible || !!this.gunL || this.lighterOn || (holding && a > 0.5) ? 1 : 0.15, 12, dt);
      this.setMorph('grip_R', this.gripR); this.setMorph('grip_L', this.gripL);
    }
    if (this.lighter) {
      const show = this.lighterOn && hold !== 'dual' && !this.knifeModel.visible && p.state !== 'dead' && !p.reloading;
      this.lighter.visible = show;
      if (show) {
        this.root.updateMatrixWorld(true);
        const hp = this.detailed ? r.lHand.localToWorld(new THREE.Vector3(0, -0.06, 0.03)).add(new THREE.Vector3(0, 0.035, 0)) : r.lHand.getWorldPosition(new THREE.Vector3());
        this.lighter.position.copy(this.root.worldToLocal(hp));
        const f = 0.85 + Math.sin(t * 31) * 0.06 + Math.sin(t * 13.7) * 0.05 + (Math.random() - 0.5) * 0.06;
        if (this.flame) this.flame.scale.set(0.03 * f, 0.065 * f, 1);
        if (this.lighterLight) this.lighterLight.intensity = 3.2 * f;
      }
    }
    if (this.gunL) {
      this.gunL.visible = p.state !== 'knife' && p.state !== 'finisher' && p.state !== 'counter';
      this.root.updateMatrixWorld(true);
      const hand = this.detailed ? r.lHand.localToWorld(new THREE.Vector3(0, -0.075, 0.015)) : r.lHand.getWorldPosition(new THREE.Vector3());
      const local = this.root.worldToLocal(hand.clone());
      this.gunHolderL.position.copy(local);
      if (a > 0.3 && p.state === 'normal') {
        const target = this.root.worldToLocal(p.aimPoint.clone());
        const m = new THREE.Matrix4().lookAt(target, local, new THREE.Vector3(0, 1, 0));
        this.gunHolderL.quaternion.slerp(new THREE.Quaternion().setFromRotationMatrix(m), 1 - Math.exp(-30 * dt));
      } else this.gunHolderL.quaternion.slerp(new THREE.Quaternion().setFromEuler(new THREE.Euler(0.9, 0, 0)), 1 - Math.exp(-12 * dt));
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


/**
 * Sagittal joint angles over one gait cycle (u = 0 → heel strike of that leg), radians.
 * Walk: adapted from normative clinical gait data (Winter); run: typical jogging kinematics.
 * hip: + flexion, knee: + flexion, ankle: + dorsiflexion. Periodic Catmull-Rom over 10 samples.
 */
export const Gait = (() => {
  const D = Math.PI / 180;
  const W = { hip: [25, 22, 14, 5, -4, -10, -5, 12, 24, 28], knee: [3, 16, 14, 8, 5, 12, 38, 60, 45, 12], ankle: [0, -6, 3, 8, 10, 4, -16, -6, 0, 1] };
  const R = { hip: [35, 28, 14, 0, -8, -4, 15, 38, 48, 44], knee: [20, 40, 35, 22, 30, 70, 100, 105, 75, 35], ankle: [5, 15, 12, -5, -25, -15, 0, 8, 8, 5] };
  const cr = (k: number[], u: number) => {
    const n = k.length, x = (((u % 1) + 1) % 1) * n, i = Math.floor(x), t = x - i;
    const p0 = k[(i - 1 + n) % n], p1 = k[i % n], p2 = k[(i + 1) % n], p3 = k[(i + 2) % n];
    return 0.5 * ((2 * p1) + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t) * D;
  };
  return {
    leg(u: number, run: number) {
      const l = (a: number, b: number) => a + (b - a) * run;
      return { hip: l(cr(W.hip, u), cr(R.hip, u)), knee: Math.max(0, l(cr(W.knee, u), cr(R.knee, u))), ankle: l(cr(W.ankle, u), cr(R.ankle, u)) };
    },
  };
})();
