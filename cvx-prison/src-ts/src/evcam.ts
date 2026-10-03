import * as THREE from 'three';

/** event camera records exported from data/evc (conv/evc_export.py) */
export interface EvcKey { flg: number; frame: number; pos: [number, number, number]; ang: [number, number, number]; pers: number; lk: [number, number, number]; l: [number, number, number] }
export interface Evc { flg: number; type: number; nxt: number; keys: EvcKey[] }
/** world position of a lock target (lkflg 1 player, 2 enemy, 3 object, 4 item, 6 position table) + local offset */
export type LockFn = (flg: number, no: number, ono: number, l: [number, number, number]) => THREE.Vector3 | null;

const A2D = 360 / 65536, D2R = Math.PI / 180;
const s16 = (v: number) => ((v + 32768) & 0xffff) - 32768;
/** njOverhauserSpline: Catmull-Rom between p1 and p2 */
function spline(p0: number[], p1: number[], p2: number[], p3: number[], t: number) {
  const t2 = t * t, t3 = t2 * t, o: number[] = [];
  for (let i = 0; i < p1.length; i++) o.push(0.5 * (2 * p1[i] + (-p0[i] + p2[i]) * t + (2 * p0[i] - 5 * p1[i] + 4 * p2[i] - p3[i]) * t2 + (-p0[i] + 3 * p1[i] - 3 * p2[i] + p3[i]) * t3));
  return o;
}

/**
 * Event camera (cut.c bhSetEventCamera / bhInitEventCamera / bhControlEventCamera / bhCheckEvtCamLockPosition):
 * key frames of an EVC record are followed with an Overhauser spline, `frame` = frames (30 fps) of a segment,
 * nxt_no chains to another record, lkflg makes the camera look at a character / object.
 */
export class EventCam {
  active = false;
  evc: Evc[] = [];
  no = 0; key = 0; ct0 = 0; mode = 0; paused = false;
  private P: number[][] = []; private F: number[][] = [];
  constructor(private lock: LockFn) {}
  setRoom(evc: Evc[]) { this.evc = evc ?? []; this.active = false; }
  start(no: number, key: number) {
    if (!this.evc[no] || !this.evc[no].keys.length) { this.active = false; return; }
    this.no = no; this.key = Math.min(key, this.evc[no].keys.length - 1); this.ct0 = 0; this.mode = 0; this.active = true; this.paused = false;
  }
  stop() { this.active = false; }
  private lockAng(k: EvcKey, base: number[]): number[] {
    if (!k.lk[0]) return base;
    const p = this.lock(k.lk[0], k.lk[1], k.lk[2], k.l); if (!p) return base;
    const dx = p.x - k.pos[0], dy = p.y - k.pos[1], dz = p.z - k.pos[2];
    // ax = -atan2(dy, horizontal), ay = -atan2(dx, dz) + 0x8000 (Ninja angles)
    return [s16(-Math.round(10430.381 * Math.atan2(dy, Math.hypot(dx, dz)))), s16(-Math.round(10430.381 * Math.atan2(dx, dz)) + 32768), k.ang[2]];
  }
  /** bhInitEventCamera + bhCheckEvtCamLockPosition: the 20 interpolation points */
  private build() {
    const ecp = this.evc[this.no]; const loop = this.no === ecp.nxt - 1;
    const jecp = ecp.nxt ? this.evc[ecp.nxt - 1] : null;
    let kfp = loop ? jecp!.keys[jecp!.keys.length - 1] : ecp.keys[0];
    const P: number[][] = [], F: number[][] = [];
    let a1 = this.lockAng(kfp, kfp.ang), fa = a1.map((v) => v * A2D);
    P.push([...kfp.pos, ...fa]); F.push([kfp.pers * A2D]);
    if (ecp.nxt) { kfp = ecp.keys[0]; a1 = this.lockAng(kfp, kfp.ang); fa = a1.map((v) => v * A2D); }
    let j = 0;
    for (let i = 1; i < 20; i++) {
      P.push([...kfp.pos, ...fa]); F.push([kfp.pers * A2D]);
      let nk: EvcKey | null = null;
      if (i < ecp.keys.length) nk = ecp.keys[i];
      else if (jecp && j < jecp.keys.length) { nk = jecp.keys[j]; j++; }
      if (nk) { const a0 = a1; kfp = nk; a1 = this.lockAng(kfp, kfp.ang); fa = fa.map((v, q) => v + s16(a1[q] - a0[q]) * A2D); }
    }
    this.P = P; this.F = F;
  }
  /** one 30 fps step (bhControlEventCamera) */
  step() {
    if (!this.active) return;
    if (this.mode === 0) { this.mode = 1; this.ct0 = 0; }
    if (this.mode !== 1 || this.paused) return;
    const ecp = this.evc[this.no], kfp = ecp.keys[this.key];
    this.ct0++;
    if (kfp.frame <= this.ct0) {
      this.ct0 = 0; this.key++;
      if (this.key >= ecp.keys.length - 1) {
        if (ecp.nxt === 0) { if (this.key >= ecp.keys.length) this.key = ecp.keys.length - 1; this.mode = 2; }
        else if (this.key >= ecp.keys.length) { this.no = ecp.nxt - 1; this.key = 0; }
      }
    }
  }
  /** camera placement; `sub` = fraction of the current 30 fps frame (smooth rendering between steps) */
  apply(cam: THREE.PerspectiveCamera, sub = 0) {
    this.build();
    const ecp = this.evc[this.no], kfp = ecp.keys[this.key];
    const t = this.mode === 1 && kfp.frame ? Math.min(1, (this.ct0 + (this.paused ? 0 : sub)) / kfp.frame) : 0;
    const k = this.key, P = this.P, F = this.F, g = (a: number[][], i: number) => a[Math.min(i, a.length - 1)];
    const v = spline(g(P, k), g(P, k + 1), g(P, k + 2), g(P, k + 3), t);
    const pers = spline(g(F, k), g(F, k + 1), g(F, k + 2), g(F, k + 3), t)[0];
    cam.position.set(v[0], v[1], v[2]);
    // same convention as the room cameras: rotation (-pitch, yaw, roll) 'YXZ', yaw = -ay
    cam.rotation.set(-v[3] * D2R, -v[4] * D2R, v[5] * D2R, 'YXZ');
    // njSetPerspective: horizontal angle -> vertical fov for 4:3
    const fov = 2 * Math.atan(Math.tan((pers * D2R) / 2) * 0.75) / D2R;
    if (Math.abs(cam.fov - fov) > 1e-3) { cam.fov = fov; cam.updateProjectionMatrix(); }
    cam.updateMatrixWorld(true);
  }
}
