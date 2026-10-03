import * as THREE from 'three';
import { loadGLTF, loadJSON, toLambert } from './assets';

export interface CamDef { zone: [number, number, number, number]; pos: [number, number, number]; pitch: number; yaw: number; roll: number; flags: string; lim?: [number, number, number, number]; lens?: number }
export interface RoomData {
  id: string; cameras: CamDef[]; collision: any[]; triggers: any[]; areas?: any[]; enemies?: { id: number; flags: string; pos: [number, number, number]; rot: [number, number, number]; ex?: string }[]; spawns: { pos: [number, number, number]; ang: number }[];
  messages: string[]; items: { id: number; name?: string; pos: [number, number, number]; rot: [number, number, number] }[];
  objects: { id: number; model?: string; flags: string; pos: [number, number, number]; rot: [number, number, number] }[]; lights: any[];
}
export type Shape = { k: 'box'; x0: number; z0: number; x1: number; z1: number } | { k: 'circle'; x: number; z: number; r: number } | { k: 'tri'; a: THREE.Vector2; b: THREE.Vector2; c: THREE.Vector2 };

export class Room {
  group = new THREE.Group();
  shapes: Shape[] = [];
  wallShapes: (Shape | null)[] = [];
  objMeshes = new Map<number, THREE.Object3D>();
  floor!: THREE.Mesh;
  itemMeshes = new Map<number, THREE.Object3D>();
  lights: THREE.PointLight[] = [];
  /** opaque meshes used for camera occlusion tests */
  occluders: THREE.Mesh[] = [];
  constructor(public data: RoomData) {}
  static async load(id: string) { const d = await loadJSON<RoomData>(`rooms/${id}.json`); const r = new Room(d); await r.build(); return r; }
  async build() {
    const d = this.data;
    const scene = (await loadGLTF(`rooms/${d.id}.glb`)).scene.clone(true);
    scene.scale.setScalar(0.1); toLambert(scene); this.group.add(scene); scene.updateMatrixWorld(true);
    this.buildFloor(scene);
    scene.traverse((o) => {
      const m = o as THREE.Mesh; if (!m.isMesh || !m.visible) return;
      const mat = (Array.isArray(m.material) ? m.material[0] : m.material) as THREE.Material & { alphaTest?: number };
      if (mat.transparent || (mat.alphaTest ?? 0) > 0) return;
      this.occluders.push(m);
    });
    const bb = new THREE.Box3().setFromObject(scene);
    for (let i = 0; i < d.objects.length; i++) {
      const ob = d.objects[i];
      if (!ob.model || ob.flags === '00000000') continue;
      const p = new THREE.Vector3(...ob.pos);
      if (p.x < bb.min.x - 0.05 || p.z < bb.min.z - 0.05 || p.x > bb.max.x + 0.05 || p.z > bb.max.z + 0.05) continue;
      const o = (await loadGLTF(`objects/${ob.model}.glb`)).scene.clone(true);
      toLambert(o); o.scale.setScalar(0.1); o.position.copy(p); o.rotation.set(ob.rot[0], ob.rot[2], ob.rot[1], 'ZYX'); o.name = ob.model;
      this.group.add(o); this.objMeshes.set(i, o);
    }
    for (const l of d.lights) this.addLight(l);
    this.wallShapes = d.collision.map((c) => this.colliderShape(c));
    this.shapes = this.wallShapes.filter((x, i) => x && (parseInt(d.collision[i].type, 16) & 1)) as Shape[];
  }
  private buildFloor(root: THREE.Object3D) {
    const out: number[] = []; const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3();
    root.traverse((o) => {
      const m = o as THREE.Mesh; if (!m.isMesh) return;
      const pos = m.geometry.attributes.position, idx = m.geometry.index, cnt = idx ? idx.count : pos.count;
      for (let i = 0; i < cnt; i += 3) {
        const i0 = idx ? idx.getX(i) : i, i1 = idx ? idx.getX(i + 1) : i + 1, i2 = idx ? idx.getX(i + 2) : i + 2;
        a.fromBufferAttribute(pos, i0).applyMatrix4(m.matrixWorld); b.fromBufferAttribute(pos, i1).applyMatrix4(m.matrixWorld); c.fromBufferAttribute(pos, i2).applyMatrix4(m.matrixWorld);
        n.subVectors(b, a).cross(c.clone().sub(a)); const L = n.length();
        if (L < 1e-9 || Math.abs(n.y / L) < 0.55) continue;
        out.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
      }
    });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(out, 3)); g.computeBoundingSphere(); g.computeBoundingBox();
    this.floor = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })); this.floor.visible = false;
  }
  private addLight(l: any) {
    const col = new THREE.Color(l.color[0], l.color[1], l.color[2]); const mx = Math.max(l.color[0], l.color[1], l.color[2]);
    if (mx < 0.03) return;
    col.multiplyScalar(1 / mx);
    const range = l.far > 0.01 ? Math.min(l.far, 30) : 6;
    const pl = new THREE.PointLight(col, Math.min(mx, 3.5) * 2.2, range, 1); pl.position.set(l.pos[0], l.pos[1], l.pos[2]);
    this.group.add(pl); this.lights.push(pl);
  }
  /** collision record -> 2D shape (walls of the floor level only; enabled/disabled by the event scripts) */
  private colliderShape(e: any): Shape | null {
    const t = parseInt(e.type, 16);
    const shape = (t >> 8) & 0xff;
    if (shape === 7 || shape === 6 || shape === 2 || e.y > 0.6) return null;
    if (shape === 4 || shape === 5) return { k: 'tri', a: new THREE.Vector2(e.x, e.z), b: new THREE.Vector2(e.x + e.sx, e.z), c: new THREE.Vector2(e.x, e.z + e.sz) };
    if (shape === 3) return { k: 'circle', x: e.x, z: e.z, r: Math.max(0.08, e.sx * 0.5) };
    return { k: 'box', x0: e.x, z0: e.z, x1: e.x + e.sx, z1: e.z + e.sz };
  }
  /** enable flags of the collision records (ATR flg bit 0, switched by the WALL command) */
  syncWalls(on: (i: number) => boolean) { this.shapes = this.wallShapes.filter((x, i) => x && on(i)) as Shape[]; }
  async placeItems() {
    for (let i = 0; i < this.data.items.length; i++) {
      const it = this.data.items[i];
      try {
        const o = (await loadGLTF(`items/it_${String(it.id).padStart(3, '0')}.glb`)).scene.clone(true);
        toLambert(o); o.scale.setScalar(0.1); o.position.set(...it.pos); o.rotation.set(it.rot[0], it.rot[2], it.rot[1], 'ZYX');
        this.group.add(o); this.itemMeshes.set(i, o);
      } catch { /* missing model */ }
    }
  }
  removeItem(i: number) { const o = this.itemMeshes.get(i); if (o) { o.removeFromParent(); this.itemMeshes.delete(i); } }
  private ray = new THREE.Raycaster();
  floorAt(x: number, z: number, y: number, up = 0.45): number | null {
    this.ray.set(new THREE.Vector3(x, y + up, z), new THREE.Vector3(0, -1, 0)); this.ray.far = up + 2;
    const h = this.ray.intersectObject(this.floor, false);
    return h.length ? h[0].point.y : null;
  }
  /** distance from `from` towards `to` until the first opaque surface (or full length) */
  private occRay = new THREE.Raycaster();
  clearDistance(from: THREE.Vector3, to: THREE.Vector3, skip?: Set<THREE.Object3D>): number {
    const dir = to.clone().sub(from); const L = dir.length(); if (L < 1e-6) return 0;
    this.occRay.set(from, dir.divideScalar(L)); this.occRay.far = L; this.occRay.near = 0;
    const hits = this.occRay.intersectObjects(this.occluders, false);
    // only front faces block the view (the original cameras often sit behind back-face-culled walls)
    const nm = new THREE.Matrix3(), n = new THREE.Vector3();
    for (const h of hits) {
      if (!h.face || (skip && skip.has(h.object))) continue;
      nm.getNormalMatrix(h.object.matrixWorld); n.copy(h.face.normal).applyMatrix3(nm);
      if (n.dot(dir) < 0) return h.distance;
    }
    return L;
  }
  /** push a point (x,z) out of all collision shapes keeping radius r */
  resolve(p: THREE.Vector3, r: number) {
    for (let it = 0; it < 3; it++) for (const s of this.shapes) {
      if (s.k === 'box') {
        const cx = Math.max(s.x0, Math.min(p.x, s.x1)), cz = Math.max(s.z0, Math.min(p.z, s.z1));
        const dx = p.x - cx, dz = p.z - cz, d2 = dx * dx + dz * dz;
        if (d2 >= r * r) continue;
        if (d2 > 1e-10) { const d = Math.sqrt(d2); p.x = cx + (dx / d) * r; p.z = cz + (dz / d) * r; }
        else {
          const l = p.x - s.x0, rr = s.x1 - p.x, t = p.z - s.z0, b = s.z1 - p.z, m = Math.min(l, rr, t, b);
          if (m === l) p.x = s.x0 - r; else if (m === rr) p.x = s.x1 + r; else if (m === t) p.z = s.z0 - r; else p.z = s.z1 + r;
        }
      } else if (s.k === 'circle') {
        const dx = p.x - s.x, dz = p.z - s.z, d = Math.hypot(dx, dz), m = r + s.r;
        if (d < m && d > 1e-6) { p.x = s.x + (dx / d) * m; p.z = s.z + (dz / d) * m; }
      } else {
        const q = new THREE.Vector2(p.x, p.z), inside = inTri(q, s.a, s.b, s.c), c = closestOnTri(q, s.a, s.b, s.c), d = q.distanceTo(c);
        if (inside) { const v = c.clone().sub(q), l = v.length() || 1; p.x = c.x + (v.x / l) * r; p.z = c.y + (v.y / l) * r; }
        else if (d < r) { const v = q.clone().sub(c).divideScalar(d || 1); p.x = c.x + v.x * r; p.z = c.y + v.y * r; }
      }
    }
  }
  bounds() { return this.floor.geometry.boundingBox!.clone(); }
}
function inTri(p: THREE.Vector2, a: THREE.Vector2, b: THREE.Vector2, c: THREE.Vector2) {
  const s = (p1: THREE.Vector2, p2: THREE.Vector2, p3: THREE.Vector2) => (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  const d1 = s(p, a, b), d2 = s(p, b, c), d3 = s(p, c, a);
  const neg = d1 < 0 || d2 < 0 || d3 < 0, pos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(neg && pos);
}
function closestOnSeg(p: THREE.Vector2, a: THREE.Vector2, b: THREE.Vector2) {
  const ab = b.clone().sub(a); const t = Math.max(0, Math.min(1, p.clone().sub(a).dot(ab) / (ab.lengthSq() || 1)));
  return a.clone().addScaledVector(ab, t);
}
function closestOnTri(p: THREE.Vector2, a: THREE.Vector2, b: THREE.Vector2, c: THREE.Vector2) {
  const x = closestOnSeg(p, a, b), y = closestOnSeg(p, b, c), z = closestOnSeg(p, c, a);
  const dx = p.distanceToSquared(x), dy = p.distanceToSquared(y), dz = p.distanceToSquared(z);
  return dx <= dy && dx <= dz ? x : dy <= dz ? y : z;
}
