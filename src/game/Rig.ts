import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { HitZone } from './combat/HitZones';

/**
 * Procedural humanoid rig built from capsules. Each bone is a pivot Group placed at the joint,
 * with its mesh hanging along −Y. Forward is +Z, character left is +X.
 * Meshes carry userData.zone so the shooting system can resolve hit zones directly.
 */
export interface HumanoidMaterials {
  skin: THREE.Material;
  torso: THREE.Material;
  upperArm: THREE.Material;
  forearm: THREE.Material;
  thigh: THREE.Material;
  shin: THREE.Material;
  foot: THREE.Material;
  hand?: THREE.Material;
}

export interface Humanoid {
  root: THREE.Group;
  hips: THREE.Bone;
  spine: THREE.Bone;
  neck: THREE.Bone;
  head: THREE.Bone;
  lUpperArm: THREE.Bone; lForearm: THREE.Bone; lHand: THREE.Bone;
  rUpperArm: THREE.Bone; rForearm: THREE.Bone; rHand: THREE.Bone;
  lThigh: THREE.Bone; lShin: THREE.Bone;
  rThigh: THREE.Bone; rShin: THREE.Bone;
  bones: THREE.Bone[];
  meshes: THREE.Mesh[];
  zoneMeshes: Map<HitZone, THREE.Mesh[]>;
}

const capsuleCache = new Map<string, THREE.CapsuleGeometry>();
function capsule(r: number, len: number): THREE.CapsuleGeometry {
  const k = r.toFixed(3) + '_' + len.toFixed(3);
  let g = capsuleCache.get(k);
  if (!g) { g = new THREE.CapsuleGeometry(r, len, 4, 10); capsuleCache.set(k, g); }
  return g;
}

export function buildHumanoid(m: HumanoidMaterials, scale = 1, bulk = 1): Humanoid {
  const zoneMeshes = new Map<HitZone, THREE.Mesh[]>();
  const meshes: THREE.Mesh[] = [];
  const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, pos: [number, number, number], zone: HitZone | null, s?: [number, number, number]) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    if (s) mesh.scale.set(...s);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    if (zone) {
      mesh.userData.zone = zone;
      if (!zoneMeshes.has(zone)) zoneMeshes.set(zone, []);
      zoneMeshes.get(zone)!.push(mesh);
    }
    parent.add(mesh);
    meshes.push(mesh);
    return mesh;
  };
  const bones: THREE.Bone[] = [];
  const g = (parent: THREE.Object3D, x: number, y: number, z: number, name: string) => {
    const b = new THREE.Bone(); b.position.set(x, y, z); b.name = name; parent.add(b); bones.push(b); return b;
  };

  const root = new THREE.Group();
  const hips = g(root, 0, 0.95, 0, 'hips');
  add(hips, capsule(0.13 * bulk, 0.12), m.thigh, [0, 0.0, 0], 'torso', [1.25, 1, 0.9]);
  const spine = g(hips, 0, 0.06, 0, 'spine');
  add(spine, capsule(0.14 * bulk, 0.22), m.torso, [0, 0.24, 0], 'torso', [1.25, 1, 0.82]);
  add(spine, capsule(0.12 * bulk, 0.1), m.torso, [0, 0.43, 0], 'torso', [1.55, 0.8, 0.8]); // shoulders
  const neck = g(spine, 0, 0.52, 0, 'neck');
  add(neck, capsule(0.045, 0.06), m.skin, [0, 0.03, 0], 'head');
  const head = g(neck, 0, 0.13, 0, 'head');
  add(head, new THREE.SphereGeometry(0.1, 20, 16), m.skin, [0, 0, 0.005], 'head', [0.9, 1.12, 1]);

  const arm = (side: 1 | -1) => {
    const zone: HitZone = side === 1 ? 'lArm' : 'rArm';
    const up = g(spine, 0.2 * side * bulk, 0.45, 0, side === 1 ? 'lUpperArm' : 'rUpperArm');
    add(up, capsule(0.048 * bulk, 0.2), m.upperArm, [0, -0.14, 0], zone);
    const fo = g(up, 0, -0.28, 0, 'forearm');
    add(fo, capsule(0.04 * bulk, 0.19), m.forearm, [0, -0.13, 0], zone);
    const hand = g(fo, 0, -0.27, 0, 'hand');
    add(hand, new THREE.BoxGeometry(0.06, 0.09, 0.03), m.hand ?? m.skin, [0, -0.02, 0.01], zone);
    return [up, fo, hand] as const;
  };
  const [lUpperArm, lForearm, lHand] = arm(1);
  const [rUpperArm, rForearm, rHand] = arm(-1);

  const leg = (side: 1 | -1) => {
    const zone: HitZone = side === 1 ? 'lLeg' : 'rLeg';
    const th = g(hips, 0.095 * side, -0.02, 0, side === 1 ? 'lThigh' : 'rThigh');
    add(th, capsule(0.068 * bulk, 0.3), m.thigh, [0, -0.21, 0], zone);
    const sh = g(th, 0, -0.44, 0, 'shin');
    add(sh, capsule(0.052 * bulk, 0.32), m.shin, [0, -0.2, 0], zone);
    add(sh, new THREE.BoxGeometry(0.1, 0.08, 0.25), m.foot, [0, -0.44, 0.05], zone);
    return [th, sh] as const;
  };
  const [lThigh, lShin] = leg(1);
  const [rThigh, rShin] = leg(-1);

  root.scale.setScalar(scale);
  return { root, hips, spine, neck, head, lUpperArm, lForearm, lHand, rUpperArm, rForearm, rHand, lThigh, lShin, rThigh, rShin, bones, meshes, zoneMeshes };
}

export const damp = (a: number, b: number, k: number, dt: number) => a + (b - a) * (1 - Math.exp(-k * dt));

/**
 * Bake rigid-attached meshes into one multi-material SkinnedMesh (GPU skinning).
 * Draw calls drop from "one per body part" to "one per material".
 */
export function bakeRigidSkinned(root: THREE.Object3D, bones: THREE.Bone[], meshes: THREE.Mesh[]): THREE.SkinnedMesh {
  const scale = root.scale.clone();
  const pos = root.position.clone();
  const rot = root.rotation.clone();
  root.scale.set(1, 1, 1); root.position.set(0, 0, 0); root.rotation.set(0, 0, 0);
  root.updateMatrixWorld(true);
  const byMat = new Map<THREE.Material, THREE.BufferGeometry[]>();
  for (const m of meshes) {
    const bi = bones.indexOf(m.parent as THREE.Bone);
    if (bi < 0) continue;
    let g = m.geometry.clone();
    if (g.index) g = g.toNonIndexed();
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    g.applyMatrix4(m.matrixWorld);
    const n = g.attributes.position.count;
    const si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) { si[i * 4] = bi; sw[i * 4] = 1; }
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
    g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
    const mat = m.material as THREE.Material;
    if (!byMat.has(mat)) byMat.set(mat, []);
    byMat.get(mat)!.push(g);
    m.removeFromParent();
  }
  const mats = [...byMat.keys()];
  const merged = mergeGeometries(mats.map((mt) => mergeGeometries(byMat.get(mt)!)!), true)!;
  const sk = new THREE.SkinnedMesh(merged, mats);
  sk.castShadow = true;
  sk.receiveShadow = true;
  sk.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0.9, 0), 1.6);
  root.add(sk);
  sk.bind(new THREE.Skeleton(bones));
  root.scale.copy(scale); root.position.copy(pos); root.rotation.copy(rot);
  return sk;
}
