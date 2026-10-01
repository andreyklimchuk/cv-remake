import * as THREE from 'three';

/**
 * Fixed-size light pool ("clustered-lite").
 * three.js bakes the NUMBER of lights of each type into every shader program, so toggling zone
 * visibility (which hides/shows the zone's lamps) used to trigger a full shader recompile of all
 * materials — a multi-second freeze on every zone transition.
 * Here the level's lamps become *virtual* lights (moved to a layer the camera never renders) and
 * each frame the most relevant visible ones are copied into a constant set of real lights.
 * Light counts never change → shader programs are compiled once at load and reused forever.
 */
const VIRTUAL_LAYER = 31;

interface Slot<T extends THREE.Light> { light: T; src: THREE.Light | null; shadow: boolean }

export class LightPool {
  /** pool of the running world — dynamic emitters (fires, flares) register themselves here */
  static active: LightPool | null = null;
  private points: Slot<THREE.PointLight>[] = [];
  private spots: Slot<THREE.SpotLight>[] = [];
  private virt: (THREE.PointLight | THREE.SpotLight)[] = [];
  private tmp = new THREE.Vector3();

  constructor(scene: THREE.Scene, nPoint: number, nSpot: number, pointShadows: number, spotShadows: number, shadowSize: number) {
    for (let i = 0; i < nPoint; i++) {
      const l = new THREE.PointLight(0xffffff, 0, 10, 2);
      const sh = i < pointShadows;
      l.castShadow = sh;
      if (sh) { l.shadow.mapSize.set(shadowSize / 2, shadowSize / 2); l.shadow.bias = -0.002; l.shadow.normalBias = 0.02; l.shadow.autoUpdate = false; }
      l.name = 'pool:point' + i;
      scene.add(l); this.points.push({ light: l, src: null, shadow: sh });
    }
    for (let i = 0; i < nSpot; i++) {
      const l = new THREE.SpotLight(0xffffff, 0, 20, 0.5, 0.5, 2);
      const sh = i < spotShadows;
      l.castShadow = sh;
      if (sh) { l.shadow.mapSize.set(shadowSize, shadowSize); l.shadow.bias = -0.0015; l.shadow.normalBias = 0.02; l.shadow.autoUpdate = false; }
      l.name = 'pool:spot' + i;
      scene.add(l, l.target); this.spots.push({ light: l, src: null, shadow: sh });
    }
  }

  /** force every shadow slot to render once (warms depth shader variants during loading) */
  warm(on: boolean): void {
    for (const s of [...this.points, ...this.spots]) if (s.shadow) { s.light.shadow.autoUpdate = on; if (on) s.light.intensity = 0.0001; }
  }

  /** Turn every point/spot light below `root` into a virtual light managed by the pool. */
  adopt(root: THREE.Object3D): void {
    root.traverse((o) => {
      const l = o as THREE.PointLight | THREE.SpotLight;
      if (!(l as THREE.PointLight).isPointLight && !(l as THREE.SpotLight).isSpotLight) return;
      if (l.name.startsWith('pool:') || l.userData.virtual) return;
      l.userData.virtual = true;
      l.userData.wantShadow = l.castShadow;
      l.castShadow = false;
      l.layers.set(VIRTUAL_LAYER);
      this.virt.push(l);
    });
  }

  /** 0 = hidden, 1 = visible, -1 = detached from the scene (drop it) */
  private static visibleChain(o: THREE.Object3D): number {
    let p: THREE.Object3D = o;
    for (;;) { if (!p.visible) return 0; if (!p.parent) break; p = p.parent; }
    return (p as THREE.Scene).isScene ? 1 : -1;
  }

  update(cam: THREE.Vector3): void {
    const cands: { l: THREE.PointLight | THREE.SpotLight; s: number }[] = [];
    let dropped = false;
    for (const l of this.virt) {
      const vis = LightPool.visibleChain(l);
      if (vis < 0) { l.userData.dead = true; dropped = true; continue; }
      if (l.intensity <= 0.001 || vis === 0) continue;
      l.getWorldPosition(this.tmp);
      const d = this.tmp.distanceTo(cam);
      const range = l.distance > 0 ? l.distance : 40;
      if (d > range + 6) continue;
      const s = l.intensity * Math.max(0.05, 1 - d / (range + 6)) * ((l as THREE.SpotLight).isSpotLight ? 0.6 : 1) * (l.userData.priority ?? 1);
      cands.push({ l, s });
    }
    if (dropped) this.virt = this.virt.filter((l) => !l.userData.dead);
    cands.sort((a, b) => b.s - a.s);
    const pts = cands.filter((c) => (c.l as THREE.PointLight).isPointLight).map((c) => c.l as THREE.PointLight);
    const sps = cands.filter((c) => (c.l as THREE.SpotLight).isSpotLight).map((c) => c.l as THREE.SpotLight);
    this.assign(this.points, pts);
    this.assign(this.spots, sps);
  }

  private assign<T extends THREE.PointLight | THREE.SpotLight>(slots: Slot<T>[], srcs: T[]): void {
    const chosen = srcs.slice(0, slots.length);
    // keep sources in the slot they already occupy (no popping), shadow-wanting sources to shadow slots
    const free: Slot<T>[] = [];
    const placed = new Set<THREE.Light>();
    for (const s of slots) { if (s.src && chosen.includes(s.src as T)) placed.add(s.src); else { s.src = null; free.push(s); } }
    const rest = chosen.filter((c) => !placed.has(c)).sort((a, b) => Number(!!b.userData.wantShadow) - Number(!!a.userData.wantShadow));
    for (const c of rest) {
      const want = !!c.userData.wantShadow;
      let i = free.findIndex((f) => f.shadow === want);
      if (i < 0) i = free.findIndex((f) => !f.shadow);
      if (i < 0) i = 0;
      const f = free.splice(i, 1)[0]; if (!f) break;
      f.src = c;
    }
    for (const s of slots) {
      const L = s.light, src = s.src as T | null;
      if (!src) { L.intensity = 0; if (s.shadow) L.shadow.autoUpdate = false; continue; }
      src.getWorldPosition(L.position);
      L.color.copy(src.color); L.intensity = src.intensity; L.distance = src.distance; L.decay = src.decay;
      if ((L as THREE.SpotLight).isSpotLight) {
        const sl = L as THREE.SpotLight, ss = src as THREE.SpotLight;
        sl.angle = ss.angle; sl.penumbra = ss.penumbra;
        ss.target.getWorldPosition(sl.target.position); sl.target.updateMatrixWorld();
      }
      if (s.shadow) L.shadow.autoUpdate = !!src.userData.wantShadow;
    }
  }
}

