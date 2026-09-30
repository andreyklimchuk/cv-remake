import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import claireUrl from '../../assets/models/claire.glb?url';

/**
 * Preloads the Blender-authored character assets (exported as GLB from the .blend sources in
 * /assets/blender). Everything is inlined into the build, so this also works from file://.
 * If loading fails the game falls back to the procedural capsule characters.
 */
const URLS: Record<string, string> = { claire: claireUrl };
const zombieUrls = import.meta.glob('../../assets/models/zombie_*.glb', { query: '?url', import: 'default', eager: true }) as Record<string, string>;
for (const [p, u] of Object.entries(zombieUrls)) URLS[p.split('/').pop()!.replace('.glb', '')] = u;
const WEAPON_URLS = import.meta.glob('../../assets/models/weapon_*.glb', { query: '?url', import: 'default', eager: true }) as Record<string, string>;
for (const [p, u] of Object.entries(WEAPON_URLS)) URLS[p.split('/').pop()!.replace('.glb', '')] = u;
// detailed pickup items and level props (tools/blender/items.py, props.py)
const PROP_URLS = import.meta.glob(['../../assets/models/item_*.glb', '../../assets/models/prop_*.glb'], { query: '?url', import: 'default', eager: true }) as Record<string, string>;
for (const [p, u] of Object.entries(PROP_URLS)) URLS[p.split('/').pop()!.replace('.glb', '')] = u;

const cache = new Map<string, GLTF>();

export const ModelLibrary = {
  async preload(onProgress?: (k: string) => void): Promise<void> {
    const loader = new GLTFLoader();
    await Promise.all(Object.entries(URLS).map(async ([k, url]) => {
      try {
        const g = await loader.loadAsync(url);
        g.scene.updateMatrixWorld(true);
        cache.set(k, g);
        onProgress?.(k);
      } catch (e) { console.warn('[models] failed to load', k, e); }
    }));
  },
  get(k: string): GLTF | undefined { return cache.get(k); },
  has(k: string): boolean { return cache.has(k); },
  keys(): string[] { return [...cache.keys()]; },
};

export interface BoneRest { name: string; parent: string | null; pos: THREE.Vector3 }

/** Rest-pose joint positions (world space of the GLB) of every bone in the first skinned mesh. */
export function jointsOf(g: GLTF): Map<string, BoneRest> {
  const out = new Map<string, BoneRest>();
  g.scene.traverse((o) => {
    if ((o as THREE.Bone).isBone) {
      const p = o.parent && (o.parent as THREE.Bone).isBone ? o.parent.name : null;
      out.set(o.name, { name: o.name, parent: p, pos: o.getWorldPosition(new THREE.Vector3()) });
    }
  });
  return out;
}

export function skinnedMeshesOf(g: GLTF): THREE.SkinnedMesh[] {
  const out: THREE.SkinnedMesh[] = [];
  g.scene.traverse((o) => { if ((o as THREE.SkinnedMesh).isSkinnedMesh) out.push(o as THREE.SkinnedMesh); });
  return out;
}

/**
 * Builds a game skeleton from GLB joints. Every bone gets a rest orientation whose local −Y axis points
 * at its "aim" child (so the game's procedural animation, written for limbs hanging along −Y with identity
 * rest rotations, drives the sculpted mesh correctly). Returns bones keyed by name, bound meshes re-skinned.
 */
export function buildSkeletonFromJoints(joints: Map<string, BoneRest>, aim: Record<string, string>, root: THREE.Object3D): Map<string, THREE.Bone> {
  const bones = new Map<string, THREE.Bone>();
  const worldQ = new Map<string, THREE.Quaternion>();
  const down = new THREE.Vector3(0, -1, 0);
  for (const [name, j] of joints) {
    const t = aim[name] ? joints.get(aim[name]) : undefined;
    let q = new THREE.Quaternion();
    if (t) q.setFromUnitVectors(down, t.pos.clone().sub(j.pos).normalize());
    else if (j.parent && worldQ.has(j.parent)) q = worldQ.get(j.parent)!.clone();
    worldQ.set(name, q);
  }
  // bones are listed parent-first by the traversal
  for (const [name, j] of joints) {
    const b = new THREE.Bone(); b.name = name;
    const parent = j.parent ? bones.get(j.parent)! : null;
    const q = worldQ.get(name)!;
    if (parent) {
      const pj = joints.get(j.parent!)!; const pq = worldQ.get(j.parent!)!;
      const inv = pq.clone().invert();
      b.position.copy(j.pos.clone().sub(pj.pos).applyQuaternion(inv));
      b.quaternion.copy(inv.multiply(q));
      parent.add(b);
    } else {
      b.position.copy(j.pos); b.quaternion.copy(q); root.add(b);
    }
    bones.set(name, b);
  }
  return bones;
}

/** Re-skin a GLB SkinnedMesh onto the given bones (by name). The skeleton must be in its rest pose. */
export function reskin(src: THREE.SkinnedMesh, bones: THREE.Bone[], material?: THREE.Material | THREE.Material[]): THREE.SkinnedMesh {
  const geo = src.geometry.clone();
  const srcBones = src.skeleton.bones;
  const idx = srcBones.map((b) => Math.max(0, bones.findIndex((x) => x.name === b.name)));
  const si = geo.attributes.skinIndex;
  for (let i = 0; i < si.count; i++) for (let c = 0; c < 4; c++) si.setComponent(i, c, idx[si.getComponent(i, c)]);
  src.updateMatrixWorld(true);
  geo.applyMatrix4(src.matrixWorld);
  const m = new THREE.SkinnedMesh(geo, material ?? src.material);
  m.name = src.name;
  m.castShadow = true; m.receiveShadow = true;
  m.updateMorphTargets();
  if (src.morphTargetDictionary) { m.morphTargetDictionary = { ...src.morphTargetDictionary }; m.morphTargetInfluences = new Array(Object.keys(src.morphTargetDictionary).length).fill(0); }
  return m;
}
