import * as THREE from 'three';
import type { PhysicsWorld } from '../../engine/Physics';
import { ModelLibrary } from '../assets/ModelLibrary';

/**
 * Blender-authored set-dressing props (tools/blender/props.py → prop_<name>.glb).
 * GLB space: origin on the floor, model faces +Z. Repeated props are GPU-instanced.
 */
export function hasProp(name: string): boolean { return ModelLibrary.has('prop_' + name); }

export function propClone(name: string): THREE.Object3D | null {
  const g = ModelLibrary.get('prop_' + name);
  if (!g) return null;
  const o = g.scene.clone(true);
  o.traverse((m) => { if ((m as THREE.Mesh).isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  return o;
}

export interface PropOpts { collide?: boolean; scale?: number | [number, number, number]; shadow?: boolean; pad?: number }

function colliderFor(physics: PhysicsWorld, o: THREE.Object3D, pad = 0): void {
  o.updateMatrixWorld(true);
  const b = new THREE.Box3().setFromObject(o);
  physics.addMinMax(b.min.x - pad, b.min.z - pad, b.max.x + pad, b.max.z + pad, b.min.y, b.max.y, 'prop', true);
}

/** Places one prop; returns it (or null if the GLB is missing so callers can fall back to primitives). */
export function placeProp(parent: THREE.Object3D, physics: PhysicsWorld, name: string, x: number, y: number, z: number, rotY = 0, opts: PropOpts = {}): THREE.Object3D | null {
  const o = propClone(name);
  if (!o) return null;
  o.position.set(x, y, z); o.rotation.y = rotY;
  if (opts.scale !== undefined) { if (typeof opts.scale === 'number') o.scale.setScalar(opts.scale); else o.scale.set(...opts.scale); }
  if (opts.shadow === false) o.traverse((m) => { m.castShadow = false; });
  parent.add(o);
  if (opts.collide !== false) colliderFor(physics, o, opts.pad);
  return o;
}

/** Many copies of one prop as InstancedMeshes (one per GLB sub-mesh/material). */
export function propInstances(parent: THREE.Object3D, physics: PhysicsWorld, name: string, list: [number, number, number, number][], opts: PropOpts = {}): boolean {
  const g = ModelLibrary.get('prop_' + name);
  if (!g || !list.length) return !!g;
  const s = opts.scale === undefined ? new THREE.Vector3(1, 1, 1) : typeof opts.scale === 'number' ? new THREE.Vector3().setScalar(opts.scale) : new THREE.Vector3(...opts.scale);
  const mats = list.map(([x, y, z, r]) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), r), s));
  g.scene.updateMatrixWorld(true);
  g.scene.traverse((m) => {
    const mesh = m as THREE.Mesh;
    if (!mesh.isMesh) return;
    const im = new THREE.InstancedMesh(mesh.geometry, mesh.material, list.length);
    for (let i = 0; i < mats.length; i++) im.setMatrixAt(i, mats[i].clone().multiply(mesh.matrixWorld));
    im.castShadow = opts.shadow !== false; im.receiveShadow = true;
    im.computeBoundingSphere();
    parent.add(im);
  });
  if (opts.collide !== false) {
    const tmp = new THREE.Object3D();
    const src = g.scene.clone(true);
    tmp.add(src);
    for (const [x, y, z, r] of list) { tmp.position.set(x, y, z); tmp.rotation.y = r; tmp.scale.copy(s); colliderFor(physics, tmp, opts.pad); }
  }
  return true;
}
