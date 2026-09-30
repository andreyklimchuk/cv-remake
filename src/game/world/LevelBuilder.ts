import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { PhysicsWorld, Collider } from '../../engine/Physics';

/**
 * Static-geometry builder with automatic batching: every primitive added for a zone is
 * merged per material at flush() — a whole zone costs roughly one draw call per material.
 * UVs are generated in world space (tri-planar style) so tiling textures never stretch.
 */
export interface BoxOpts { collide?: boolean; rays?: boolean; tag?: string; tile?: number; rotY?: number; shadow?: boolean }

export class LevelBuilder {
  private batches = new Map<THREE.Material, { geos: THREE.BufferGeometry[]; shadow: boolean }>();
  colliders: Collider[] = [];

  constructor(public physics: PhysicsWorld) {}

  static worldUV(geo: THREE.BufferGeometry, tile: number): void {
    const p = geo.attributes.position, n = geo.attributes.normal;
    const uv = new Float32Array(p.count * 2);
    for (let i = 0; i < p.count; i++) {
      const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
      let u: number, v: number;
      if (ay >= ax && ay >= az) { u = p.getX(i); v = p.getZ(i); }
      else if (ax >= az) { u = p.getZ(i); v = p.getY(i); }
      else { u = p.getX(i); v = p.getY(i); }
      uv[i * 2] = u / tile; uv[i * 2 + 1] = v / tile;
    }
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  }

  add(geo: THREE.BufferGeometry, mat: THREE.Material, shadow = true): void {
    let g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.attributes.uv) LevelBuilder.worldUV(g, 2);
    // mergeGeometries needs identical attribute sets
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    if (!this.batches.has(mat)) this.batches.set(mat, { geos: [], shadow });
    const b = this.batches.get(mat)!;
    b.shadow = b.shadow && shadow;
    b.geos.push(g);
    g = g as THREE.BufferGeometry;
  }

  /** Bake an already-positioned static mesh into the batches. */
  addMesh(mesh: THREE.Mesh, shadow = true): void {
    mesh.updateMatrix();
    const g = mesh.geometry.clone();
    g.applyMatrix4(mesh.matrix);
    this.add(g, mesh.material as THREE.Material, shadow);
  }

  box(cx: number, cy: number, cz: number, w: number, h: number, d: number, mat: THREE.Material, o: BoxOpts = {}): Collider | null {
    const geo = new THREE.BoxGeometry(w, h, d);
    if (o.rotY) geo.rotateY(o.rotY);
    geo.translate(cx, cy, cz);
    const g2 = geo.toNonIndexed();
    LevelBuilder.worldUV(g2, o.tile ?? 2);
    this.add(g2, mat, o.shadow ?? true);
    if (o.collide === false) return null;
    let hw = w / 2, hd = d / 2;
    if (o.rotY) {
      const c = Math.abs(Math.cos(o.rotY)), s = Math.abs(Math.sin(o.rotY));
      [hw, hd] = [hw * c + hd * s, hw * s + hd * c];
    }
    const col = this.physics.addMinMax(cx - hw, cz - hd, cx + hw, cz + hd, cy - h / 2, cy + h / 2, o.tag ?? 'wall', o.rays ?? true);
    this.colliders.push(col);
    return col;
  }

  cyl(x: number, y: number, z: number, r: number, h: number, mat: THREE.Material, collide = true, seg = 12, rTop?: number): void {
    const geo = new THREE.CylinderGeometry(rTop ?? r, r, h, seg);
    geo.translate(x, y, z);
    const g2 = geo.toNonIndexed();
    LevelBuilder.worldUV(g2, 1);
    this.add(g2, mat);
    if (collide) this.colliders.push(this.physics.addMinMax(x - r, z - r, x + r, z + r, y - h / 2, y + h / 2, 'prop', true));
  }

  /** Merge everything queued so far into the given group (one mesh per material). */
  flush(group: THREE.Object3D): void {
    for (const [mat, b] of this.batches) {
      const merged = mergeGeometries(b.geos, false);
      if (!merged) continue;
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, mat);
      mesh.castShadow = b.shadow;
      mesh.receiveShadow = true;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      group.add(mesh);
    }
    this.batches.clear();
  }
}

/** Instanced helper for repeated props (prison bars, barbed wire, sandbags...). */
export function instanced(geo: THREE.BufferGeometry, mat: THREE.Material, transforms: THREE.Matrix4[], shadow = true): THREE.InstancedMesh {
  const m = new THREE.InstancedMesh(geo, mat, transforms.length);
  transforms.forEach((t, i) => m.setMatrixAt(i, t));
  m.castShadow = shadow;
  m.receiveShadow = true;
  m.computeBoundingSphere();
  return m;
}

export const T = (x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, s = 1): THREE.Matrix4 =>
  new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(s, s, s));
