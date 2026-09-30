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
    // 2. portal culling
    const cz = this.zoneAt(camera) ?? this.zoneAt(player) ?? this.current;
    if (cz) this.current = cz;
    if (!this.current) return;
    const visible = new Set<string>([this.current.id]);
    for (const n of this.current.neighbors) {
      if (!this.current.portalOpen || this.current.portalOpen(n)) visible.add(n);
    }
    for (const z of this.zones.values()) z.group.visible = visible.has(z.id);
  }
}
