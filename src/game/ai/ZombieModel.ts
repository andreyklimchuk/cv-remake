import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { buildHumanoid, type Humanoid } from '../Rig';
import type { HitZone } from '../combat/HitZones';
import { fbm, surface } from '../../engine/Materials';
import { ModelLibrary, jointsOf, skinnedMeshesOf, buildSkeletonFromJoints, reskin, type BoneRest } from '../assets/ModelLibrary';

const Z_AIM: Record<string, string> = {
  lUpperArm: 'lForearm', lForearm: 'lHand', rUpperArm: 'rForearm', rForearm: 'rHand',
  lThigh: 'lShin', lShin: 'lFoot', rThigh: 'rShin', rShin: 'rFoot',
};
const SEVER_BONES = ['lForearm', 'rForearm', 'lShin', 'rShin', 'head'];
function zoneOfBone(n: string): HitZone {
  if (n === 'head' || n === 'neck') return 'head';
  if (/^l(UpperArm|Forearm|Hand)$/.test(n)) return 'lArm';
  if (/^r(UpperArm|Forearm|Hand)$/.test(n)) return 'rArm';
  if (/^l(Thigh|Shin|Foot)$/.test(n)) return 'lLeg';
  if (/^r(Thigh|Shin|Foot)$/.test(n)) return 'rLeg';
  return 'torso';
}
interface ZTemplate {
  geo: THREE.BufferGeometry; mats: THREE.MeshStandardMaterial[]; joints: Map<string, BoneRest>;
  boneZones: HitZone[]; debris: Map<string, THREE.BufferGeometry>; hipRest: number;
}
const zTemplates = new Map<string, ZTemplate | null>();
/** Blender-authored zombie (GLB): skin weights re-ordered dominant-first so hit zones resolve per triangle. */
function zombieTemplate(outfit: ZombieOutfit): ZTemplate | null {
  const key = 'zombie_' + (outfit === 'civilian' ? 'guard' : outfit);
  if (zTemplates.has(key)) return zTemplates.get(key)!;
  const g = ModelLibrary.get(key);
  if (!g) { zTemplates.set(key, null); return null; }
  const joints = jointsOf(g);
  const tmp = new THREE.Group();
  const bm = buildSkeletonFromJoints(joints, Z_AIM, tmp);
  tmp.updateMatrixWorld(true);
  const bones = [...bm.values()];
  const src = skinnedMeshesOf(g)[0];
  const geo = reskin(src, bones).geometry;
  for (const k of Object.keys(geo.attributes)) if (!['position', 'normal', 'uv', 'tangent', 'skinIndex', 'skinWeight'].includes(k)) geo.deleteAttribute(k);
  const si = geo.attributes.skinIndex, sw = geo.attributes.skinWeight;
  const dom = new Uint16Array(si.count);
  for (let i = 0; i < si.count; i++) {
    const e = [0, 1, 2, 3].map((c) => [si.getComponent(i, c), sw.getComponent(i, c)]).sort((a, b) => b[1] - a[1]);
    e.forEach(([bi, w], c) => { si.setComponent(i, c, bi); sw.setComponent(i, c, w); });
    dom[i] = e[0][0];
  }
  const boneZones = bones.map((b) => zoneOfBone(b.name));
  // debris: triangles whose vertices are all dominated by the severed bone's subtree, in bone-local space
  const debris = new Map<string, THREE.BufferGeometry>();
  const idx = geo.index!;
  const pos = geo.attributes.position, nrm = geo.attributes.normal, uv = geo.attributes.uv;
  for (const name of SEVER_BONES) {
    const b = bm.get(name); if (!b) continue;
    const sub = new Set<number>(); b.traverse((c) => { const k = bones.indexOf(c as THREE.Bone); if (k >= 0) sub.add(k); });
    const inv = b.matrixWorld.clone().invert();
    const nm = new THREE.Matrix3().getNormalMatrix(inv);
    const P: number[] = [], N: number[] = [], T: number[] = [];
    const v = new THREE.Vector3();
    for (let t = 0; t < idx.count; t += 3) {
      const a = idx.getX(t), bb = idx.getX(t + 1), c = idx.getX(t + 2);
      if (!(sub.has(dom[a]) && sub.has(dom[bb]) && sub.has(dom[c]))) continue;
      for (const k of [a, bb, c]) {
        v.fromBufferAttribute(pos, k).applyMatrix4(inv); P.push(v.x, v.y, v.z);
        v.fromBufferAttribute(nrm, k).applyMatrix3(nm).normalize(); N.push(v.x, v.y, v.z);
        T.push(uv.getX(k), uv.getY(k));
      }
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    dg.setAttribute('normal', new THREE.Float32BufferAttribute(N, 3));
    dg.setAttribute('uv', new THREE.Float32BufferAttribute(T, 2));
    debris.set(name, dg);
  }
  const m0 = src.material as THREE.MeshStandardMaterial;
  m0.side = THREE.DoubleSide;
  // Blender zombies pack AO into the ORM red channel; the atlas-baked user zombies carry roughness only
  if (outfit === 'prisoner' || outfit === 'guard' || outfit === 'civilian') { m0.aoMap = m0.roughnessMap; m0.aoMapIntensity = 0.8; }
  if (m0.alphaTest > 0) { m0.alphaTest = 0.5; m0.transparent = false; m0.depthWrite = true; }
  for (const t of [m0.map, m0.normalMap, m0.roughnessMap]) if (t) t.anisotropy = 4;
  const mats = [m0, m0.clone(), m0.clone()];
  mats[1].color.setRGB(0.93, 0.97, 0.9); mats[2].color.setRGB(1.05, 0.95, 0.95);
  const tpl: ZTemplate = { geo, mats, joints, boneZones, debris, hipRest: bm.get('hips')!.position.y };
  zTemplates.set(key, tpl);
  return tpl;
}

/** prisoner / guard: Blender zombies; hitman / female: user models (tools/import/zombie_bpy.py, atlas-baked) */
export type ZombieOutfit = 'prisoner' | 'guard' | 'civilian' | 'hitman' | 'female';

const OUTFIT: Record<ZombieOutfit, { torso: number; legs: number; feet: number }> = {
  prisoner: { torso: 0x9a4a18, legs: 0x9a4a18, feet: 0x222222 },
  hitman: { torso: 0xa8a49a, legs: 0x3a5a6a, feet: 0x222222 },
  female: { torso: 0x4a3a30, legs: 0x2a2224, feet: 0x1a1a1a },
  guard: { torso: 0x2c3646, legs: 0x252c38, feet: 0x111111 },
  civilian: { torso: 0x6a6a5a, legs: 0x2a3550, feet: 0x3a2a1a },
};

let sharedMat: THREE.MeshStandardMaterial | null = null;
function zombieMaterial(texSize: number): THREE.MeshStandardMaterial {
  if (!sharedMat) {
    const s = surface('zombieSkin', Math.min(texSize, 512));
    sharedMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.78, metalness: 0, normalMap: s.normalMap, normalScale: new THREE.Vector2(0.8, 0.8) });
  }
  return sharedMat;
}

/**
 * Zombie body: procedural humanoid baked into ONE rigidly-skinned SkinnedMesh
 * (1 draw call per zombie, GPU skinning). Hit zones are resolved per-triangle through the
 * skinIndex attribute. Limbs are severed by collapsing bones and spawning a debris copy.
 */
export class ZombieModel {
  rig!: Humanoid;
  root!: THREE.Group;
  mesh!: THREE.SkinnedMesh;
  boneZones: HitZone[] = [];
  private templates = new Map<THREE.Bone, THREE.Group>();
  severed = new Set<HitZone>();
  headGone = false;
  /** rest height of the hips bone (animation offsets are relative to it) */
  hipRest = 0.95;
  readonly detailed: boolean;
  private debrisMat: THREE.Material | null = null;

  constructor(outfit: ZombieOutfit, texSize: number, seed: number) {
    const tpl = zombieTemplate(outfit);
    if (tpl) {
      this.detailed = true;
      this.root = new THREE.Group();
      const bm = buildSkeletonFromJoints(tpl.joints, Z_AIM, this.root);
      const bones = [...bm.values()];
      const B = (n: string) => bm.get(n)!;
      this.rig = {
        root: this.root, hips: B('hips'), spine: B('spine'), neck: B('neck'), head: B('head'),
        lUpperArm: B('lUpperArm'), lForearm: B('lForearm'), lHand: B('lHand'), rUpperArm: B('rUpperArm'), rForearm: B('rForearm'), rHand: B('rHand'),
        lThigh: B('lThigh'), lShin: B('lShin'), rThigh: B('rThigh'), rShin: B('rShin'), bones, meshes: [], zoneMeshes: new Map(),
      };
      this.hipRest = tpl.hipRest;
      this.boneZones = tpl.boneZones;
      const mat = tpl.mats[seed % tpl.mats.length];
      this.debrisMat = mat;
      this.mesh = new THREE.SkinnedMesh(tpl.geo, mat);
      this.mesh.castShadow = true; this.mesh.receiveShadow = true;
      this.mesh.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.4, 0), 2.2);
      this.mesh.userData.boneZones = this.boneZones;
      this.root.add(this.mesh);
      this.root.updateMatrixWorld(true);
      this.mesh.bind(new THREE.Skeleton(bones));
      for (const n of SEVER_BONES) {
        const dg = tpl.debris.get(n); if (!dg) continue;
        const grp = new THREE.Group(); const dm = new THREE.Mesh(dg, mat); dm.castShadow = true; grp.add(dm);
        this.templates.set(B(n), grp);
      }
      this.root.scale.setScalar(0.95 + (seed % 9) * 0.012);
      return;
    }
    this.detailed = false;
    const skinCol = new THREE.Color().setHSL(0.18 + (seed % 5) * 0.01, 0.12, 0.5);
    const o = OUTFIT[outfit];
    const mk = (c: number | THREE.Color) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 });
    const skin = mk(skinCol), torso = mk(o.torso), legs = mk(o.legs), feet = mk(o.feet);
    const bulk = 0.95 + (seed % 7) * 0.02;
    this.rig = buildHumanoid({ skin, torso, upperArm: outfit === 'prisoner' ? skin : torso, forearm: skin, thigh: legs, shin: legs, foot: feet, hand: skin }, 1, bulk);
    this.root = this.rig.root;
    const r = this.rig;

    // gore / face details attached before baking
    const dark = mk(0x1a0505), blood = mk(0x4a0808);
    for (const s of [1, -1]) {
      const sock = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 6), dark);
      sock.position.set(0.034 * s, 0.02, 0.082); r.head.add(sock); r.meshes.push(sock); sock.userData.zone = 'head';
    }
    const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.04), blood);
    jaw.position.set(0, -0.06, 0.07); r.head.add(jaw); r.meshes.push(jaw); jaw.userData.zone = 'head';
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.104, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.4), mk(0x1a1814));
    hair.position.y = 0.02; r.head.add(hair); r.meshes.push(hair); hair.userData.zone = 'head';

    // --- bake -----------------------------------------------------------
    this.root.updateMatrixWorld(true);
    const bones = r.bones;
    this.boneZones = bones.map(() => 'torso' as HitZone);
    const geos: THREE.BufferGeometry[] = [];
    const bloodCol = new THREE.Color(0x3a0404);
    for (const m of r.meshes) {
      const bone = m.parent as THREE.Bone;
      const bi = bones.indexOf(bone);
      if (m.userData.zone) this.boneZones[bi] = m.userData.zone;
      let g = m.geometry.clone();
      if (g.index) g = g.toNonIndexed();
      g.applyMatrix4(m.matrixWorld);
      const n = g.attributes.position.count;
      const col = new Float32Array(n * 3), si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
      const base = (m.material as THREE.MeshStandardMaterial).color;
      const p = g.attributes.position;
      for (let i = 0; i < n; i++) {
        const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const nz = fbm(x * 1.7 + seed * 0.37, y * 1.3 + z * 1.1, 1, 3);
        const c = base.clone().multiplyScalar(0.8 + nz * 0.4);
        if (nz > 0.6) c.lerp(bloodCol, Math.min(1, (nz - 0.6) * 5));
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        si[i * 4] = bi; sw[i * 4] = 1;
      }
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
      g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
      geos.push(g);
    }
    // bones inherit zone from parents where they carry no meshes
    bones.forEach((b, i) => { if (b.name === 'hand') this.boneZones[i] = this.boneZones[bones.indexOf(b.parent as THREE.Bone)]; });

    // debris templates for severable bones (forearms, shins, head)
    for (const b of [r.lForearm, r.rForearm, r.lShin, r.rShin, r.head]) {
      const tpl = new THREE.Group();
      const inv = b.matrixWorld.clone().invert();
      b.traverse((c) => {
        if ((c as THREE.Mesh).isMesh) {
          const cm = (c as THREE.Mesh).clone();
          cm.matrixAutoUpdate = true;
          new THREE.Matrix4().multiplyMatrices(inv, c.matrixWorld).decompose(cm.position, cm.quaternion, cm.scale);
          cm.castShadow = true;
          tpl.add(cm);
        }
      });
      this.templates.set(b, tpl);
    }

    const merged = mergeGeometries(geos)!;
    this.mesh = new THREE.SkinnedMesh(merged, zombieMaterial(texSize));
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.4, 0), 2.2);
    this.mesh.userData.boneZones = this.boneZones;
    for (const m of [...r.meshes]) m.removeFromParent();
    this.root.add(this.mesh);
    this.mesh.bind(new THREE.Skeleton(bones));
    this.root.scale.setScalar(0.96 + (seed % 9) * 0.012);
  }

  /** Collapse a limb and return a free-flying debris copy of it. */
  sever(zone: HitZone): THREE.Group | null {
    if (this.severed.has(zone)) return null;
    const r = this.rig;
    const bone = zone === 'lArm' ? r.lForearm : zone === 'rArm' ? r.rForearm : zone === 'lLeg' ? r.lShin : zone === 'rLeg' ? r.rShin : zone === 'head' ? r.head : null;
    if (!bone) return null;
    this.severed.add(zone);
    if (zone === 'head') this.headGone = true;
    this.root.updateMatrixWorld(true);
    const piece = this.templates.get(bone)!.clone();
    bone.matrixWorld.decompose(piece.position, piece.quaternion, piece.scale);
    bone.scale.setScalar(0.0001);
    return piece;
  }
}
