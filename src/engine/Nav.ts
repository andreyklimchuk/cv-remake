import * as THREE from 'three';
import type { PhysicsWorld } from './Physics';

/**
 * Waypoint navigation graph with A*. Links are auto-generated from clearance raycasts and
 * rebuilt whenever doors/obstacles change (bus 'doorsChanged'). Used for AI "обход" (going around).
 */
export class NavGraph {
  nodes: THREE.Vector3[] = [];
  links: number[][] = [];

  constructor(private physics: PhysicsWorld, private clearance = 0.35, private maxLink = 14) {}

  add(x: number, z: number): number {
    this.nodes.push(new THREE.Vector3(x, 0, z));
    return this.nodes.length - 1;
  }

  rebuild(): void {
    this.links = this.nodes.map(() => []);
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i], b = this.nodes[j];
        if (a.distanceTo(b) > this.maxLink) continue;
        if (this.physics.walkable(a, b, this.clearance)) {
          this.links[i].push(j);
          this.links[j].push(i);
        }
      }
    }
  }

  nearest(pos: THREE.Vector3, requireWalkable = true): number {
    let best = -1, bestD = Infinity;
    for (let i = 0; i < this.nodes.length; i++) {
      const d = this.nodes[i].distanceToSquared(pos);
      if (d < bestD && (!requireWalkable || this.physics.walkable(pos, this.nodes[i], 0.2))) { bestD = d; best = i; }
    }
    return best;
  }

  findPath(from: THREE.Vector3, to: THREE.Vector3): THREE.Vector3[] | null {
    const s = this.nearest(from), g = this.nearest(to);
    if (s < 0 || g < 0) return null;
    const open = new Set<number>([s]);
    const came = new Map<number, number>();
    const gScore = new Map<number, number>([[s, 0]]);
    const f = new Map<number, number>([[s, this.nodes[s].distanceTo(this.nodes[g])]]);
    while (open.size) {
      let cur = -1, bf = Infinity;
      for (const n of open) { const v = f.get(n) ?? Infinity; if (v < bf) { bf = v; cur = n; } }
      if (cur === g) {
        const path: THREE.Vector3[] = [to.clone()];
        let c: number | undefined = g;
        while (c !== undefined) { path.unshift(this.nodes[c].clone()); c = came.get(c); }
        return path;
      }
      open.delete(cur);
      for (const nb of this.links[cur]) {
        const t = (gScore.get(cur) ?? Infinity) + this.nodes[cur].distanceTo(this.nodes[nb]);
        if (t < (gScore.get(nb) ?? Infinity)) {
          came.set(nb, cur);
          gScore.set(nb, t);
          f.set(nb, t + this.nodes[nb].distanceTo(this.nodes[g]));
          open.add(nb);
        }
      }
    }
    return null;
  }
}
