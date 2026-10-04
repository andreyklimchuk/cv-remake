import * as THREE from 'three';
import type { CamDef, Room } from './room';
import { EventCam, type LockFn } from './evcam';

export const ASPECT = 4 / 3;
const FOV = 46;
export type CamMode = 'fixed' | 'behind';

/**
 * Original fixed cameras (zones from the room's camera table, optional tracking limits),
 * plus: visibility check (if Claire is out of frame / behind a wall another original camera is used,
 * or the follow camera as the last resort) and a third-person camera from behind.
 */
export class CameraRig {
  cam = new THREE.PerspectiveCamera(FOV, ASPECT, 0.05, 200);
  index = -1;
  /** camera chosen by the event scripts (CAMSET) while a cinematic runs; null = automatic */
  forced: number | null = null;
  /** event camera (CAMSET kind 0) */
  lockFn: LockFn | null = null;
  ev = new EventCam((f, n, o, l) => this.lockFn?.(f, n, o, l) ?? null);
  /** fraction of the current 30 fps event frame, for smooth event cameras */
  evSub = 0;
  mode: CamMode = 'fixed';
  usingFallback = false;
  private cams: CamDef[] = [];
  private room: Room | null = null;
  private trackYaw: number | null = null; private trackPitch: number | null = null;
  private visT = 0; private override = -2; // -2 = none, -1 = follow camera, >=0 camera index
  private follow = { pos: new THREE.Vector3(), look: new THREE.Vector3(), init: false };
  /** per camera: walls/ceiling slabs the camera is pressed against (the original culls them) */
  private cut: Set<THREE.Object3D>[] = [];
  private cutOn: Set<THREE.Object3D> | null = null;
  /** per camera: room objects hidden by its original hidobj mask (cut.c bhSetHideObjLgt), ignored by the visibility checks */
  private computeCuts() {
    this.cut = []; const R = this.room; if (!R) return;
    for (const c of this.cams) this.cut.push(R.hiddenMeshes(c.hid));
  }
  /** the hiding itself is done by Game.hideFrame from `shown` (room camera on screen, -1 = event / follow camera) */
  private applyCut(s: Set<THREE.Object3D> | null) { this.cutOn = s; }
  shown = -1;
  setRoom(room: Room) { this.cutOn = null; this.room = room; this.ev.stop(); this.forced = null; this.cams = room.data.cameras; this.computeCuts(); this.cams = room.data.cameras; this.index = -1; this.override = -2; this.follow.init = false; this.trackYaw = null; }
  private inside(c: CamDef, x: number, z: number, m = 0) {
    const [x0, z0, x1, z1] = c.zone;
    return x >= Math.min(x0, x1) - m && x <= Math.max(x0, x1) + m && z >= Math.min(z0, z1) - m && z <= Math.max(z0, z1) + m;
  }
  private zoneCam(p: THREE.Vector3): number {
    const cur = this.cams[this.index];
    if (cur && this.inside(cur, p.x, p.z, 0.05)) return this.index;
    let best = -1, bd = Infinity;
    for (let i = 0; i < this.cams.length; i++) {
      const c = this.cams[i];
      if (this.inside(c, p.x, p.z)) return i;
      const cx = THREE.MathUtils.clamp(p.x, Math.min(c.zone[0], c.zone[2]), Math.max(c.zone[0], c.zone[2]));
      const cz = THREE.MathUtils.clamp(p.z, Math.min(c.zone[1], c.zone[3]), Math.max(c.zone[1], c.zone[3]));
      const d = Math.hypot(cx - p.x, cz - p.z); if (d < bd) { bd = d; best = i; }
    }
    return cur ? this.index : best;
  }
  /** target yaw/pitch for camera c looking at the player (tracking cameras turn within their limits) */
  private aim(c: CamDef, p: THREE.Vector3) {
    const lim = c.lim ?? [0, 0, 0, 0]; const ly = Math.max(lim[0], lim[1]), lp = Math.max(lim[2], lim[3]);
    if (ly <= 0 && lp <= 0) return { yaw: c.yaw, pitch: c.pitch, track: false };
    const dx = p.x - c.pos[0], dy = p.y + 1 - c.pos[1], dz = p.z - c.pos[2];
    const yaw = Math.atan2(-dx, -dz), pitch = Math.atan2(-dy, Math.hypot(dx, dz));
    let d = yaw - c.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
    return { yaw: c.yaw + THREE.MathUtils.clamp(d, -ly, ly), pitch: THREE.MathUtils.clamp(pitch, c.pitch - lp, c.pitch + lp), track: true };
  }
  private tmpCam = new THREE.PerspectiveCamera(FOV, ASPECT, 0.05, 200);
  /** is Claire (chest and head) inside the frame of camera c and not hidden behind walls? */
  visible(c: CamDef, p: THREE.Vector3, head: THREE.Vector3): boolean {
    const a = this.aim(c, p); const t = this.tmpCam;
    t.position.set(c.pos[0], c.pos[1], c.pos[2]); t.rotation.set(-a.pitch, a.yaw, c.roll, 'YXZ'); t.updateMatrixWorld(true);
    const pts = [p.clone().setY(p.y + 0.9), head.clone(), p.clone().setY(p.y + 0.3)];
    let inFrame = 0, seen = 0;
    for (const q of pts) {
      const n = q.clone().project(t);
      if (n.z < 1 && Math.abs(n.x) < 0.97 && Math.abs(n.y) < 0.97) inFrame++; else continue;
      if (!this.room) { seen++; continue; }
      const L = t.position.distanceTo(q); const free = this.room.clearDistance(t.position, q, this.cut[this.cams.indexOf(c)]);
      if (free >= L - 0.25) seen++;
    }
    return inFrame >= 2 && seen >= 1;
  }
  update(p: THREE.Vector3, head: THREE.Vector3, heading: number, snap = false, dt = 1 / 60): boolean {
    const prevIdx = this.index, prevOv = this.override;
    this.shown = -1;
    if (this.ev.active) { this.applyCut(null); this.ev.apply(this.cam, this.evSub); this.follow.init = false; this.index = -1; return false; }
    if (this.mode === 'behind') { this.applyCut(null); this.updateShoulder(p, head, snap, dt); return false; }
    const forced = this.forced !== null && this.cams[this.forced] ? this.forced : null;
    let idx = forced ?? this.zoneCam(p);
    this.index = idx;
    // visibility check a few times per second
    this.visT -= dt;
    if (forced !== null) this.override = -2;
    else if (snap || this.visT <= 0 || idx !== prevIdx) {
      this.visT = 0.2;
      const zc = this.cams[idx];
      if (zc && this.visible(zc, p, head)) this.override = -2;
      else if (this.override >= 0 && this.cams[this.override] && this.visible(this.cams[this.override], p, head)) { /* keep current fallback */ }
      else {
        let best = -1, bd = Infinity;
        for (let i = 0; i < this.cams.length; i++) {
          if (i === idx || !this.visible(this.cams[i], p, head)) continue;
          const c = this.cams[i]; const d = Math.hypot(c.pos[0] - p.x, c.pos[2] - p.z);
          if (d < bd) { bd = d; best = i; }
        }
        this.override = best >= 0 ? best : -1;
      }
    }
    this.usingFallback = this.override !== -2;
    if (this.override === -1) { this.applyCut(null); this.updateFollow(p, head, heading, snap || prevOv !== -1, dt); return prevOv !== -1; }
    const ci = this.override >= 0 ? this.override : idx;
    const c = this.cams[ci]; if (!c) return false;
    this.shown = ci;
    this.applyCut(this.cut[ci]?.size ? this.cut[ci] : null);
    const changed = ci !== (prevOv >= 0 ? prevOv : prevIdx) || prevOv === -1;
    this.cam.fov = FOV; this.cam.updateProjectionMatrix();
    this.cam.position.set(c.pos[0], c.pos[1], c.pos[2]);
    const a = this.aim(c, p);
    if (a.track) {
      if (changed || snap || this.trackYaw === null) { this.trackYaw = a.yaw; this.trackPitch = a.pitch; }
      else { const k = 1 - Math.exp(-4 * dt); this.trackYaw += (a.yaw - this.trackYaw) * k; this.trackPitch! += (a.pitch - this.trackPitch!) * k; }
      this.cam.rotation.set(-this.trackPitch!, this.trackYaw, c.roll, 'YXZ');
    } else { this.trackYaw = null; this.cam.rotation.set(-a.pitch, a.yaw, c.roll, 'YXZ'); }
    this.cam.updateMatrixWorld(true);
    this.follow.init = false;
    return changed;
  }
  /** over-the-shoulder camera (RE2 remake style): yaw/pitch controlled by the player */
  yaw = 0; pitch = 0.08; zoom = 0;
  look(dx: number, dy: number) {
    this.yaw -= dx; this.pitch = THREE.MathUtils.clamp(this.pitch + dy, -0.65, 0.75);
  }
  resetYaw(h: number) { this.yaw = h; this.pitch = 0.08; }
  private updateShoulder(p: THREE.Vector3, head: THREE.Vector3, snap: boolean, dt: number) {
    const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw);
    const f = new THREE.Vector3(-sy, 0, -cy), r = new THREE.Vector3(cy, 0, -sy);
    const z = this.zoom; // 0 = normal, 1 = aiming (closer)
    const pivot = new THREE.Vector3(p.x, Math.max(head.y - 0.02, p.y + 1.15), p.z);
    // look direction with pitch
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const dir = new THREE.Vector3(f.x * cp, -sp, f.z * cp);
    const side = 0.36 - 0.04 * z, back = 1.15 - 0.45 * z, up = 0.06;
    const shoulder = pivot.clone().addScaledVector(r, side);
    // keep the shoulder point inside the room
    if (this.room) { const L = pivot.distanceTo(shoulder); const free = this.room.clearDistance(pivot, shoulder); if (free < L) shoulder.copy(pivot).add(shoulder.clone().sub(pivot).setLength(Math.max(0.05, free - 0.12))); }
    let want = shoulder.clone().addScaledVector(dir, -back).add(new THREE.Vector3(0, up, 0));
    if (this.room) {
      const L = shoulder.distanceTo(want); const free = this.room.clearDistance(shoulder, want);
      if (free < L) want = shoulder.clone().add(want.clone().sub(shoulder).setLength(Math.max(0.12, free - 0.15)));
    }
    const look = want.clone().addScaledVector(dir, 6);
    const F = this.follow;
    if (!F.init || snap) { F.pos.copy(want); F.look.copy(look); F.init = true; }
    else {
      F.pos.lerp(want, 1 - Math.exp(-18 * dt)); F.look.copy(look);
      if (this.room) { const L = shoulder.distanceTo(F.pos); const free = this.room.clearDistance(shoulder, F.pos); if (free < L) F.pos.copy(shoulder).add(F.pos.clone().sub(shoulder).setLength(Math.max(0.12, free - 0.15))); }
    }
    this.cam.fov = 58 - 10 * z; this.cam.near = 0.05; this.cam.updateProjectionMatrix();
    this.cam.position.copy(F.pos); this.cam.lookAt(F.look); this.cam.updateMatrixWorld(true);
  }
  /** third-person fallback camera behind Claire's back (fixed mode, when no original camera sees her), pulled in front of walls */
  private updateFollow(p: THREE.Vector3, head: THREE.Vector3, heading: number, snap: boolean, dt: number) {
    const f = new THREE.Vector3(-Math.sin(heading), 0, -Math.cos(heading));
    const pivot = new THREE.Vector3(p.x, Math.max(head.y, p.y + 1.2) + 0.12, p.z);
    let want = pivot.clone().addScaledVector(f, -1.9).add(new THREE.Vector3(0, 0.35, 0));
    if (this.room) {
      const L = pivot.distanceTo(want); const free = this.room.clearDistance(pivot, want);
      if (free < L) want = pivot.clone().add(want.clone().sub(pivot).setLength(Math.max(0.25, free - 0.18)));
    }
    const look = pivot.clone().addScaledVector(f, 1.2).add(new THREE.Vector3(0, -0.25, 0));
    const F = this.follow;
    if (!F.init || snap) { F.pos.copy(want); F.look.copy(look); F.init = true; }
    else {
      const k = 1 - Math.exp(-8 * dt); F.pos.lerp(want, k); F.look.lerp(look, 1 - Math.exp(-10 * dt));
      // never let smoothing drag the camera through a wall
      if (this.room) { const L = pivot.distanceTo(F.pos); const free = this.room.clearDistance(pivot, F.pos); if (free < L) F.pos.copy(pivot).add(F.pos.clone().sub(pivot).setLength(Math.max(0.25, free - 0.18))); }
    }
    this.cam.fov = 60; this.cam.updateProjectionMatrix();
    this.cam.position.copy(F.pos); this.cam.lookAt(F.look); this.cam.updateMatrixWorld(true);
  }
}
