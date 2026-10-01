import * as THREE from 'three';

/**
 * Seamless level streaming + portal-style culling.
 * Each Zone is built lazily (time-sliced, one per frame) when the player approaches it, so
 * Rockfort Island can grow to many zones without loading screens. Visibility is resolved from
 * the zone the camera is in plus its portal neighbours — a cheap, deterministic occlusion culling.
 */
export interface Zone {
  id: string;
  bounds: THREE.Box3;
  neighbors: string[];
  outdoor: boolean;
  group: THREE.Group;
  built: boolean;
  build: (group: THREE.Group) => void;
  /** optional: portal neighbour only visible when this returns true (e.g. a door is open) */
  portalOpen?: (neighbor: string) => boolean;
}

export class ZoneStreamer {
  zones = new Map<string, Zone>();
  current: Zone | null = null;
  onBuilt?: (z: Zone) => void;

  constructor(private scene: THREE.Scene, private streamDistance = 14) {}

  add(z: Omit<Zone, 'group' | 'built'>): Zone {
    const zone: Zone = { ...z, group: new THREE.Group(), built: false };
    zone.group.name = 'zone:' + z.id;
    this.scene.add(zone.group);
    this.zones.set(z.id, zone);
    return zone;
  }

  buildNow(id: string): void {
    const z = this.zones.get(id);
    if (z && !z.built) { z.build(z.group); z.built = true; this.onBuilt?.(z); }
  }

  zoneAt(p: THREE.Vector3): Zone | null {
    for (const z of this.zones.values()) if (z.bounds.containsPoint(new THREE.Vector3(p.x, 1, p.z))) return z;
    return null;
  }

  update(player: THREE.Vector3, camera: THREE.Vector3): void {
    // 1. progressive streaming — at most one zone per frame
    for (const z of this.zones.values()) {
      if (z.built) continue;
      if (z.bounds.distanceToPoint(new THREE.Vector3(player.x, 1, player.z)) < this.streamDistance) {
        this.buildNow(z.id);
        break;
      }
    }
    // 2. portal culling — from the zone the PLAYER stands in (the follow camera can poke through a wall or
    // a doorway into a neighbour zone; culling from the camera zone alone hid the player's own room as soon
    // as the door between them latched shut), plus the camera zone and their open portals
    const pz = this.zoneAt(player), cz = this.zoneAt(camera);
    const base = pz ?? cz ?? this.current;
    if (base) this.current = base;
    if (!this.current) return;
    const viewers = cz && cz !== this.current ? [this.current, cz] : [this.current];
    const visible = new Set<string>();
    for (const z of viewers) {
      visible.add(z.id);
      for (const n of z.neighbors) if (!z.portalOpen || z.portalOpen(n)) visible.add(n);
    }
    // neighbours behind a CLOSED portal: shared walls / door frames are often built by the neighbour zone, so
    // hiding its whole group punched a hole into the room the moment a door latched. Keep just the pieces of
    // the neighbour that touch the viewing zone ("edge" mode) and hide the rest.
    const edge = new Map<Zone, Zone[]>();
    for (const z of viewers) for (const n of z.neighbors) {
      if (visible.has(n)) continue;
      const nz = this.zones.get(n); if (!nz || !nz.built) continue;
      const list = edge.get(nz) ?? []; list.push(z); edge.set(nz, list);
    }
    this.shown = visible;
    for (const z of this.zones.values()) {
      const vs = edge.get(z);
      if (vs) { z.group.visible = true; this.applyEdge(z, vs); continue; }
      this.restoreEdge(z);
      z.group.visible = visible.has(z.id);
    }
  }

  /** zones rendered in full this frame (edge-mode neighbours are not included) */
  shown = new Set<string>();
  private boxes = new WeakMap<THREE.Object3D, THREE.Box3>();
  private edgeHidden = new Map<Zone, THREE.Object3D[]>();
  private edgeKey = new Map<Zone, string>();

  private applyEdge(z: Zone, viewers: Zone[]): void {
    const key = viewers.map((v) => v.id).join('|') + ':' + z.group.children.length;
    if (this.edgeKey.get(z) === key) return;
    this.restoreEdge(z);
    this.edgeKey.set(z, key);
    const near = viewers.map((v) => v.bounds.clone().expandByScalar(0.35));
    const hidden: THREE.Object3D[] = [];
    for (const c of z.group.children) {
      if (!c.visible) continue;
      let b = this.boxes.get(c);
      if (!b) { b = new THREE.Box3().setFromObject(c); this.boxes.set(c, b); }
      if (b.isEmpty() || near.some((n) => n.intersectsBox(b!))) continue;
      c.visible = false; hidden.push(c);
    }
    this.edgeHidden.set(z, hidden);
  }

  private restoreEdge(z: Zone): void {
    const h = this.edgeHidden.get(z);
    if (!h) return;
    for (const c of h) c.visible = true;
    this.edgeHidden.delete(z); this.edgeKey.delete(z);
  }
}
