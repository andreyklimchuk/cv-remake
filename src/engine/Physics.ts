import * as THREE from 'three';

/**
 * Lightweight deterministic collision world.
 * Interface mirrors what the game needs from Rapier (character controller slide, raycasts,
 * line of sight). A Rapier3D adapter can implement ICollisionWorld without touching gameplay code.
 */
export interface Collider {
  id: number;
  min: THREE.Vector3;
  max: THREE.Vector3;
  enabled: boolean;
  tag: string;
  /** true = blocks bullets & sight (walls). false = only blocks movement (e.g. low fences, fire) */
  blocksRays: boolean;
}

export interface RayHit {
  distance: number;
  point: THREE.Vector3;
  normal: THREE.Vector3;
  collider: Collider | null; // null = floor
}

export interface ICollisionWorld {
  moveCircle(pos: THREE.Vector3, delta: THREE.Vector3, radius: number): void;
  raycast(origin: THREE.Vector3, dir: THREE.Vector3, maxDist: number): RayHit | null;
  lineOfSight(a: THREE.Vector3, b: THREE.Vector3): boolean;
}

/** Walkable surface: flat platform (y0 === y1) or a ramp/staircase rising along `axis`. */
export interface Floor {
  x1: number; z1: number; x2: number; z2: number;
  y0: number; y1: number;
  /** ramp direction: height goes y0 → y1 from min to max of this axis ('x'|'z'), or reversed with '-x'|'-z' */
  axis: 'x' | 'z' | '-x' | '-z' | null;
  /** solid from the ground up (stair masses) — blocks walking underneath */
  solid: boolean;
  tag?: string;
}

const STEP = 0.45;
let nextId = 1;
const _v = new THREE.Vector3();

export class PhysicsWorld implements ICollisionWorld {
  colliders: Collider[] = [];
  floors: Floor[] = [];
  floorY = 0;

  addFloor(f: Omit<Floor, 'solid'> & { solid?: boolean }): Floor {
    const fl: Floor = { solid: false, ...f, x1: Math.min(f.x1, f.x2), x2: Math.max(f.x1, f.x2), z1: Math.min(f.z1, f.z2), z2: Math.max(f.z1, f.z2) };
    this.floors.push(fl);
    return fl;
  }

  private static floorH(f: Floor, x: number, z: number): number {
    if (!f.axis || f.y0 === f.y1) return f.y0;
    const neg = f.axis[0] === '-';
    const ax = f.axis.endsWith('x');
    let t = ax ? (x - f.x1) / (f.x2 - f.x1) : (z - f.z1) / (f.z2 - f.z1);
    t = Math.max(0, Math.min(1, t));
    if (neg) t = 1 - t;
    return f.y0 + (f.y1 - f.y0) * t;
  }

  /** Highest walkable surface under (x,z) reachable from height refY (can step up STEP). */
  groundAt(x: number, z: number, refY: number): number {
    let h = this.floorY;
    for (const f of this.floors) {
      if (x < f.x1 || x > f.x2 || z < f.z1 || z > f.z2) continue;
      const fh = PhysicsWorld.floorH(f, x, z);
      if (fh <= refY + STEP && fh > h) h = fh;
    }
    return h;
  }

  /** true if a solid stair mass / platform edge blocks a body standing at height y. */
  private blockedAt(x: number, z: number, y: number): boolean {
    for (const f of this.floors) {
      if (x < f.x1 || x > f.x2 || z < f.z1 || z > f.z2) continue;
      const fh = PhysicsWorld.floorH(f, x, z);
      if (fh <= y + STEP) continue;
      // too high to step on: blocks if it's a solid mass, or a thin slab at body height
      if (f.solid || fh - 0.35 < y + 1.6) return true;
    }
    return false;
  }

  addBox(center: THREE.Vector3, size: THREE.Vector3, tag = 'wall', blocksRays = true): Collider {
    const c: Collider = {
      id: nextId++,
      min: center.clone().addScaledVector(size, -0.5),
      max: center.clone().addScaledVector(size, 0.5),
      enabled: true,
      tag,
      blocksRays,
    };
    this.colliders.push(c);
    return c;
  }

  addMinMax(x1: number, z1: number, x2: number, z2: number, y1: number, y2: number, tag = 'wall', blocksRays = true): Collider {
    const c: Collider = {
      id: nextId++,
      min: new THREE.Vector3(Math.min(x1, x2), y1, Math.min(z1, z2)),
      max: new THREE.Vector3(Math.max(x1, x2), y2, Math.max(z1, z2)),
      enabled: true, tag, blocksRays,
    };
    this.colliders.push(c);
    return c;
  }

  remove(c: Collider): void {
    this.colliders = this.colliders.filter((x) => x !== c);
  }

  /** Kinematic character move: circle (XZ) vs AABBs with sliding, sub-stepped to avoid tunnelling. */
  moveCircle(pos: THREE.Vector3, delta: THREE.Vector3, radius: number): void {
    const len = Math.hypot(delta.x, delta.z);
    const steps = Math.max(1, Math.ceil(len / (radius * 0.5)));
    const hasFloors = this.floors.length > 0;
    for (let s = 0; s < steps; s++) {
      const ox = pos.x, oz = pos.z;
      pos.x += delta.x / steps;
      if (hasFloors && this.blockedAt(pos.x, pos.z, pos.y)) pos.x = ox;
      pos.z += delta.z / steps;
      if (hasFloors && this.blockedAt(pos.x, pos.z, pos.y)) pos.z = oz;
      this.resolveCircle(pos, radius);
      if (hasFloors && this.blockedAt(pos.x, pos.z, pos.y)) { pos.x = ox; pos.z = oz; }
    }
    if (hasFloors) pos.y = this.groundAt(pos.x, pos.z, pos.y);
    else pos.y = this.floorY;
  }

  resolveCircle(pos: THREE.Vector3, radius: number): void {
    for (let iter = 0; iter < 3; iter++) {
      let moved = false;
      for (const c of this.colliders) {
        if (!c.enabled || c.max.y < pos.y + 0.3 || c.min.y > pos.y + 1.6) continue;
        const cx = Math.max(c.min.x, Math.min(pos.x, c.max.x));
        const cz = Math.max(c.min.z, Math.min(pos.z, c.max.z));
        let dx = pos.x - cx;
        let dz = pos.z - cz;
        const d2 = dx * dx + dz * dz;
        if (d2 >= radius * radius) continue;
        if (d2 < 1e-8) {
          // centre inside the box: push out along the smallest penetration axis
          const px1 = pos.x - c.min.x, px2 = c.max.x - pos.x, pz1 = pos.z - c.min.z, pz2 = c.max.z - pos.z;
          const m = Math.min(px1, px2, pz1, pz2);
          if (m === px1) pos.x = c.min.x - radius; else if (m === px2) pos.x = c.max.x + radius;
          else if (m === pz1) pos.z = c.min.z - radius; else pos.z = c.max.z + radius;
        } else {
          const d = Math.sqrt(d2);
          dx /= d; dz /= d;
          pos.x = cx + dx * radius;
          pos.z = cz + dz * radius;
        }
        moved = true;
      }
      if (!moved) break;
    }
  }

  /** Slab-method ray vs AABBs + floor plane. */
  raycast(origin: THREE.Vector3, dir: THREE.Vector3, maxDist: number, includeNonBlocking = false): RayHit | null {
    let best: RayHit | null = null;
    let bestT = maxDist;
    // floor
    if (dir.y < -1e-5) {
      const t = (this.floorY - origin.y) / dir.y;
      if (t > 0 && t < bestT) {
        bestT = t;
        best = { distance: t, point: origin.clone().addScaledVector(dir, t), normal: new THREE.Vector3(0, 1, 0), collider: null };
      }
    }
    // raised floors / stairs (plane through the surface, clipped to its rectangle)
    for (const f of this.floors) {
      let nx = 0, ny = 1, nz = 0;
      if (f.axis && f.y0 !== f.y1) {
        const ax = f.axis.endsWith('x'), neg = f.axis[0] === '-';
        const L = ax ? f.x2 - f.x1 : f.z2 - f.z1, dy = (f.y1 - f.y0) * (neg ? -1 : 1);
        const n = new THREE.Vector3(ax ? -dy : 0, L, ax ? 0 : -dy).normalize(); nx = n.x; ny = n.y; nz = n.z;
      }
      const cx = (f.x1 + f.x2) / 2, cz = (f.z1 + f.z2) / 2, cy = PhysicsWorld.floorH(f, cx, cz);
      const den = nx * dir.x + ny * dir.y + nz * dir.z;
      if (den > -1e-5) continue;
      const t = (nx * (cx - origin.x) + ny * (cy - origin.y) + nz * (cz - origin.z)) / den;
      if (t <= 0 || t >= bestT) continue;
      const px = origin.x + dir.x * t, pz = origin.z + dir.z * t;
      if (px < f.x1 || px > f.x2 || pz < f.z1 || pz > f.z2) continue;
      bestT = t;
      best = { distance: t, point: origin.clone().addScaledVector(dir, t), normal: new THREE.Vector3(nx, ny, nz), collider: null };
    }
    for (const c of this.colliders) {
      if (!c.enabled || (!c.blocksRays && !includeNonBlocking)) continue;
      let tmin = 0, tmax = bestT;
      let axisHit = -1, signHit = 0;
      let ok = true;
      for (let a = 0; a < 3; a++) {
        const o = a === 0 ? origin.x : a === 1 ? origin.y : origin.z;
        const d = a === 0 ? dir.x : a === 1 ? dir.y : dir.z;
        const mn = a === 0 ? c.min.x : a === 1 ? c.min.y : c.min.z;
        const mx = a === 0 ? c.max.x : a === 1 ? c.max.y : c.max.z;
        if (Math.abs(d) < 1e-9) {
          if (o < mn || o > mx) { ok = false; break; }
          continue;
        }
        let t1 = (mn - o) / d, t2 = (mx - o) / d;
        let s = -1;
        if (t1 > t2) { const tt = t1; t1 = t2; t2 = tt; s = 1; }
        if (t1 > tmin) { tmin = t1; axisHit = a; signHit = s; }
        if (t2 < tmax) tmax = t2;
        if (tmin > tmax) { ok = false; break; }
      }
      if (!ok || axisHit < 0 || tmin >= bestT) continue;
      bestT = tmin;
      const n = new THREE.Vector3();
      n.setComponent(axisHit, signHit);
      best = { distance: tmin, point: origin.clone().addScaledVector(dir, tmin), normal: n, collider: c };
    }
    return best;
  }

  lineOfSight(a: THREE.Vector3, b: THREE.Vector3): boolean {
    _v.subVectors(b, a);
    const d = _v.length();
    if (d < 1e-4) return true;
    _v.divideScalar(d);
    const hit = this.raycast(a, _v, d - 0.05);
    return !hit;
  }

  /** Clearance-aware walkability test used by the nav graph (three parallel rays at knee height). */
  walkable(a: THREE.Vector3, b: THREE.Vector3, radius: number): boolean {
    const dir = new THREE.Vector3(b.x - a.x, 0, b.z - a.z);
    const d = dir.length();
    if (d < 1e-4) return true;
    dir.divideScalar(d);
    const side = new THREE.Vector3(-dir.z, 0, dir.x).multiplyScalar(radius);
    for (const off of [-1, 0, 1]) {
      const o = new THREE.Vector3(a.x, a.y + 0.6, a.z).addScaledVector(side, off);
      const hit = this.raycast(o, dir, d, true);
      if (hit && hit.collider) return false;
    }
    return true;
  }
}
