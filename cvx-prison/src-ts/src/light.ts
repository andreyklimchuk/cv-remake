import * as THREE from 'three';
/**
 * Port of light.c (bhControlLight / bhSetLightTab) and the room ambient of ROM_WORK (amb_rom / amb_chr / amb_obj / amb_itm).
 * Rooms carry their LGT_WORK tables (lgt: lgtp[0..3] system lights + room lights, evl: event lights used while the
 * event camera runs, cam.flg & 2). Every 30 Hz frame up to three point lights (lsrc 4, slots 2..4 of the Ninja multi
 * light) and one directional light (lsrc 2) of the records with flg & 3 == 3 are handed to the renderer.
 * Lighting is computed like the Ninja chunk "easy multi light": colour = texture * (ambient + sum light * N.L * range),
 * range = 1 below nr, linear to 0 at fr (the scene renders in the original gamma space, see assets.toLambert).
 */
export interface LgtRec { flg: number; type: number; aspd: number; lkflg: number; lkno: number; lkono: number; lsrc: number; p: number[]; l: number[]; v: number[]; spc: number; dif: number; amb: number; c: number[]; nr: number; fr: number; ang: number[] }
interface LW extends LgtRec { mode: number; ct0: number; px: number; py: number; pz: number; way: number }
export interface AmbRec { idx: number[]; r: number[]; g: number[]; b: number[] }
export type AmbCat = 'rom' | 'chr' | 'obj' | 'itm' | 'inv';
/** ambient colour per model category (uniforms shared by the materials, see assets.toLambert) */
export const AMB_U: Record<AmbCat, { value: THREE.Color }> = {
  rom: { value: new THREE.Color(1, 1, 1) }, chr: { value: new THREE.Color(1, 1, 1) }, obj: { value: new THREE.Color(1, 1, 1) },
  itm: { value: new THREE.Color(1, 1, 1) }, inv: { value: new THREE.Color(0.55, 0.55, 0.55).multiplyScalar(Math.PI) },
};
/** light.c lgttab[1]: the lighter flame (type 4 flicker, linked to the right wrist b09) */
const LIGHTER_TAB: LgtRec = { flg: 1, type: 4, aspd: 30, lkflg: 1, lkno: 0, lkono: 9, lsrc: 4, p: [0, 0, 0], l: [0.3, 0, -1.5], v: [0, 1, 0], spc: 0, dif: 0, amb: 0, c: [3.16, 2.06, 0.7], nr: 0.8, fr: 40, ang: [0, 0, 0, 0, 0] };
const sin = (a: number) => Math.sin((a * 2 * Math.PI) / 65536);
const cos = (a: number) => Math.cos((a * 2 * Math.PI) / 65536);
const mk = (r: LgtRec): LW => ({ ...JSON.parse(JSON.stringify(r)), mode: 0, ct0: 0, px: r.p[0], py: r.p[1], pz: r.p[2], way: r.ang[3] ?? 0 });

export class RoomLights {
  group = new THREE.Group();
  private pts: THREE.PointLight[] = [];
  private dir = new THREE.DirectionalLight(0xffffff, 0);
  lgt: LW[] = []; evl: LW[] = [];
  amb: AmbRec = { idx: [0, 1, 0, 2], r: [1, 1, 1, 0], g: [1, 1, 1, 0], b: [1, 1, 1, 0] };
  /** event camera active (cam.flg & 2): lights 4.. come from the event light table */
  event = false;
  /** world position of a link target: lkflg (1 player, 2 enemy, 3 object, 4 item), number, local offset (m), bone */
  lockFn: ((f: number, n: number, l: [number, number, number], ono: number) => THREE.Vector3 | null) | null = null;
  constructor() {
    for (let i = 0; i < 3; i++) { const p = new THREE.PointLight(0xffffff, 0, 1, 0); this.pts.push(p); this.group.add(p); }
    this.group.add(this.dir, this.dir.target);
  }
  setRoom(lgt: LgtRec[] | undefined, evl: LgtRec[] | undefined, amb: AmbRec | undefined) {
    this.lgt = (lgt ?? []).map(mk); this.evl = (evl ?? []).map(mk);
    while (this.lgt.length < 4) this.lgt.push(mk({ ...LIGHTER_TAB, flg: 1, type: 0, lkflg: 0, c: [0, 0, 0] }));
    // bhInitLight: the system lights start inactive
    for (let i = 0; i < 4; i++) this.lgt[i].flg &= ~2;
    if (amb) this.amb = JSON.parse(JSON.stringify(amb));
    this.event = false;
    this.applyAmb();
  }
  /** camera hidlgt mask: room lights 4.. (normal cameras) or the event light table (event camera keys); bit set = light off */
  hide(evt: boolean, mask: number[]) {
    const t = evt ? this.evl : this.lgt;
    for (let i = evt ? 0 : 4; i < t.length; i++) { if ((mask[i >> 5] ?? 0) & (0x80000000 >>> (i & 31))) t[i].flg &= ~2; else t[i].flg |= 2; }
  }
  /** bhLightSet (0x35): v2 0 = on / 1 = off, v1 light number, v0 0 = room table / 1 = event table */
  set(v2: number, v1: number, v0: number) { const lp = (v0 === 0 ? this.lgt : this.evl)[v1]; if (lp) { if (v2 === 0) lp.flg |= 1; else lp.flg &= ~1; } }
  /** bhLightTypeSet (0x4b) */
  type(no: number, type: number, aspd: number) { const lp = this.lgt[no]; if (lp) { lp.type = type; lp.aspd = aspd; } }
  /** bhLightParameterSet (0x78): colour / range in 1/100 */
  param(no: number, ev: number, r: number, g: number, b: number, nr: number, fr: number) {
    const lp = (ev === 0 ? this.lgt : this.evl)[no]; if (!lp) return;
    lp.c = [r / 100, g / 100, b / 100]; lp.nr = (nr / 100) * 0.1; lp.fr = (fr / 100) * 0.1;
  }
  /** bhEffAmbSet (0x44): ambient table entry v3 = v0..v2 / 10 */
  setAmb(r: number, g: number, b: number, i: number) { this.amb.r[i] = r * 0.1; this.amb.g[i] = g * 0.1; this.amb.b[i] = b * 0.1; this.applyAmb(); }
  private applyAmb() {
    const a = this.amb, set = (c: AmbCat, i: number) => AMB_U[c].value.setRGB(a.r[i] ?? 0, a.g[i] ?? 0, a.b[i] ?? 0).multiplyScalar(Math.PI);
    set('rom', a.idx[0]); set('chr', a.idx[1]); set('obj', a.idx[2]); set('itm', a.idx[3]);
  }
  /** player.c: lighter equipped (wpnr_no 1) -> lgtp[1] = lgttab[1] linked to the right wrist, active */
  lighter(on: boolean) {
    const lp = this.lgt[1]; if (!lp) return;
    if (on) { if (!(lp.flg & 2)) { const n = mk(LIGHTER_TAB); n.flg |= 2; this.lgt[1] = n; } }
    else lp.flg &= ~2;
  }
  /** bhControlLight: one 30 Hz frame */
  frame() {
    const list: LW[] = this.event ? [...this.lgt.slice(0, 4), ...this.evl] : this.lgt;
    let lct = 0, dirf = false;
    for (const lp of list) {
      if (!(lp.flg & 1) || !(lp.flg & 2)) continue;
      let [r, g, b] = lp.c; let [vx, vy, vz] = lp.v; let fl: number;
      const rnd = () => Math.random();
      switch (lp.type) {
        case 1: fl = sin(lp.ct0) * 0.25; r = fl * r + r * 0.75; g = fl * g + g * 0.75; b = fl * b + b * 0.75; lp.ct0 = (lp.ct0 + (lp.aspd << 8)) & 0x7fff; break;
        case 2: fl = sin(lp.ct0) * 0.5; r = fl * r + r * 0.5; g = fl * g + g * 0.5; b = fl * b + b * 0.5; lp.ct0 = (lp.ct0 + (lp.aspd << 8)) & 0x7fff; break;
        case 3: fl = sin(lp.ct0); r *= fl; g *= fl; b *= fl; lp.ct0 = (lp.ct0 + (lp.aspd << 8)) & 0x7fff; break;
        case 4: fl = sin(lp.ct0) * 0.25; r = fl * r + r * 0.75; g = fl * g + g * 0.75; b = fl * b + b * 0.75; lp.ct0 = (lp.ct0 + Math.floor((lp.aspd << 8) * rnd())) & 0x7fff; break;
        case 5: fl = sin(lp.ct0) * 0.5; r = fl * r + r * 0.5; g = fl * g + g * 0.5; b = fl * b + b * 0.5; lp.ct0 = (lp.ct0 + Math.floor((lp.aspd << 8) * rnd())) & 0x7fff; break;
        case 6: fl = sin(lp.ct0); r *= fl; g *= fl; b *= fl; lp.ct0 = (lp.ct0 + Math.floor((lp.aspd << 8) * rnd())) & 0x7fff; break;
        case 8: case 9: {
          lp.way = (lp.way + (lp.type === 8 ? -1 : 1) * (Math.floor(182.04445 * 0.5 * lp.aspd) & 0xffff)) & 0xffff;
          const v = lightVector(lp.ang[2], lp.way, lp.ang[4]); vx = v.x; vy = v.y; vz = v.z; break;
        }
        case 12:
          if (lp.mode === 0) { if (--lp.ct0 <= 0) { lp.ct0 = Math.floor(lp.aspd * rnd()) + 1; lp.mode = 1; } }
          else { r *= 0.5; g *= 0.5; b *= 0.5; if (--lp.ct0 <= 0) { lp.ct0 = Math.floor(lp.aspd * rnd()) + 1; lp.mode = 0; } }
          break;
        case 13: fl = cos(lp.ct0); r *= fl; g *= fl; b *= fl; lp.ct0 += lp.aspd << 8; if (lp.ct0 > 16383) lp.flg &= ~1; break;
        case 100: if (lp.mode === 0) lp.mode++; else lp.flg &= ~2; break;
        case 101: fl = cos(lp.ct0); r *= fl; g *= fl; b *= fl; lp.ct0 += lp.aspd << 8; if (lp.ct0 > 16383) lp.flg &= ~2; break;
      }
      let px = lp.px, py = lp.py, pz = lp.pz;
      if (lp.lkflg >= 1 && lp.lkflg <= 4) {
        const q = this.lockFn?.(lp.lkflg, lp.lkno, [lp.l[0] * 0.1, lp.l[1] * 0.1, lp.l[2] * 0.1], lp.lkono);
        if (!q) { lp.flg &= ~3; continue; }
        px = lp.px = q.x; py = lp.py = q.y; pz = lp.pz = q.z;
      }
      if (lp.lsrc === 2 && !dirf) {
        dirf = true; this.dir.color.setRGB(r, g, b); this.dir.intensity = Math.PI;
        this.dir.position.set(-vx, -vy, -vz); this.dir.target.position.set(0, 0, 0);
      } else if (lp.lsrc === 4 && lct < 3) {
        const p = this.pts[lct++];
        p.position.set(px, py, pz); p.color.setRGB(Math.max(0, r), Math.max(0, g), Math.max(0, b)); p.intensity = Math.PI;
        // range: decay < 0 marks the original linear near / far falloff (patched getDistanceAttenuation)
        p.distance = Math.max(lp.fr, 1e-3); p.decay = -(Math.max(0, lp.nr) + 1e-4);
      }
    }
    if (!dirf) this.dir.intensity = 0;
    for (let i = lct; i < 3; i++) this.pts[i].intensity = 0;
  }
}
/** bhGetLightVector: (0,0,-1) through njRotateZ, njRotateY, njRotateX (16-bit angles) */
function lightVector(xr: number, yr: number, zr: number) {
  const k = (2 * Math.PI) / 65536;
  return new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(xr * k, yr * k, zr * k, 'ZYX'));
}
/** Ninja point light range: patch three's distance attenuation (decay < 0 -> linear between -decay and cutoff) */
export function patchLightShader() {
  const ch = THREE.ShaderChunk as unknown as Record<string, string>;
  const key = 'float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {';
  if (!ch.lights_pars_begin.includes(key) || ch.lights_pars_begin.includes('NINJA_RANGE')) return;
  ch.lights_pars_begin = ch.lights_pars_begin.replace(key, key + `
	// NINJA_RANGE
	if ( decayExponent < 0.0 ) { float nr = - decayExponent; return clamp( ( cutoffDistance - lightDistance ) / max( cutoffDistance - nr, 1e-4 ), 0.0, 1.0 ); }`);
}
