import * as THREE from 'three';
import { assetUrl, loadJSON } from './assets';

/**
 * Room effects (effect.c / effsub0.c / effsub1.c / effsub5.c of the PS2 decompilation).
 * The original O_WRK pool (512 slots, first free slot reused by bhSetEffectTb) is kept so emitters and the
 * sprites they spawn run in the same order. Simulation in game units (1 = 0.1 m) at 30 Hz like bhControlEffect;
 * sprites are camera-facing quads (flg 0x100000) drawn after the scene (bhDrawTrsEffect3D).
 */
interface UV { u: number; v: number; w: number; h: number }
interface TV { x: number; y: number; u: number; v: number; col: number }
interface ER { px: number; py: number; pz: number; ax: number; ay: number }
interface O {
  flg: number; stflg: number; id: number; type: number; mode0: number; mode1: number; mdlver: number; flr: number;
  ct0: number; ct1: number; ct2: number; ct3: number;
  px: number; py: number; pz: number; sx: number; sy: number; sz: number; sxb: number; syb: number; szb: number;
  ax: number; ay: number; az: number; xn: number; yn: number; zn: number; spd: number;
  aox: number; aoy: number; aoz: number; axp: number; ayp: number; azp: number; gpx: number; gpy: number; gpz: number;
  tex: number; ani: number; bls: number; bld: number; tv: TV[]; exp: UV[] | null; er: ER[] | null; func: 0 | 21 | 106 | 107; lkono: number;
}
export interface EftRec { flg: number; id: number; type: number; flr: number; mdlver: number; p: number[]; s: number[]; ax: number; ay: number; lk?: string }

const rnd = Math.random;
const ANG = Math.PI * 2 / 65536;
const nsin = (a: number) => Math.sin(a * ANG), ncos = (a: number) => Math.cos(a * ANG);
const uvs = (a: number[][]): UV[] => a.map(([u, v, w, h]) => ({ u, v, w, h }));
const END = [-1, 0, 0, 0];

// ---- UV tables (static data of the original functions)
const HIBANA = [
  uvs([[0, 0, .1875, .1875], [.1875, 0, .1875, .1875], [.375, 0, .1875, .1875], [.5625, 0, .1875, .1875], [.75, 0, .1875, .1875], [0, .1875, .1875, .1875], [.1875, .1875, .1875, .1875], END]),
  uvs([[.375, .1875, .1875, .1875], [.5625, .1875, .1875, .1875], [.75, .1875, .1875, .1875], [0, .375, .1875, .1875], [.1875, .375, .1875, .1875], [.375, .375, .1875, .1875], [.5625, .375, .1875, .1875], END]),
  uvs([[.75, .375, .1875, .1875], [0, .5625, .1875, .1875], [.1875, .5625, .1875, .1875], [.375, .5625, .1875, .1875], [.5625, .5625, .1875, .1875], [.75, .5625, .1875, .1875], [0, .75, .1875, .1875], END]),
];
const EXP_HEAD = [[.09375, .15625, .0625, .0625], [0, .125, .09375, .09375], [0, 0, .125, .125], [.125, 0, .15625, .15625], [.28125, 0, .15625, .15625], [.4375, 0, .1875, .1875], [.625, 0, .1875, .1875], [.8125, 0, .1875, .1875], [0, .21875, .1875, .1875], [.1875, .1875, .21875, .21875], [.40625, .1875, .21875, .21875], [.625, .1875, .21875, .21875], [0, .40625, .25, .25], [.25, .40625, .25, .25]];
const EXP0 = uvs([...EXP_HEAD, [.5, .40625, .25, .25], [.75, .40625, .25, .25], [0, .65625, .25, .25], [.25, .65625, .25, .25], [.5, .65625, .25, .25], [.75, .65625, .25, .25], [0, .75, .25, .25], [.25, .75, .25, .25], [.5, .75, .25, .25], [.75, .75, .25, .25], END]);
const EXP1 = uvs([...EXP_HEAD, [0, 0, .25, .25], [.25, 0, .25, .25], [.5, 0, .25, .25], [.75, 0, .25, .25], [0, .25, .25, .25], [.25, .25, .25, .25], [.5, .25, .25, .25], [.75, .25, .25, .25], [0, .5, .25, .25], [.25, .5, .25, .25], [.5, .5, .25, .25], [.75, .5, .25, .25], END]);
const EXP_BANK0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 3, 3, 3];
const EXP_BANK1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
const grid = (u0: number, v0: number, n: number, cols: number, s: number) => { const r: number[][] = []; for (let i = 0; i < n; i++) r.push([u0 + (i % cols) * s, v0 + Math.floor(i / cols) * s, s, s]); return r; };
const HIBA2 = [uvs([...grid(0, 0, 6, 6, .15625), ...grid(0, .15625, 4, 4, .15625), END]), uvs([...grid(0, .3125, 6, 6, .15625), ...grid(0, .46875, 4, 4, .15625), END])];
const S5 = .15625, S6 = .1875, S7 = .21875;
const KEMU: UV[][] = [
  uvs([[0, 0, .09375, .09375], [.09375, 0, .09375, .09375], [.1875, 0, .09375, .09375], [.28125, 0, .09375, .09375], [.375, 0, .09375, .09375], [.46875, 0, .125, .125], [.59375, 0, .125, .125], [.71875, 0, .125, .125], [.84375, 0, .125, .125], [0, .09375, .125, .125], [.125, .09375, S5, S5], [.28125, .09375, S5, S5], [.4375, .125, S5, S5], [.59375, .125, S5, S5], [.75, .125, S5, S5], [0, .25, S5, S5], [S5, .25, S5, S5], [.3125, .28125, S5, .125], [.46875, .28125, S5, .125], [.625, .28125, .125, .125], END]),
  uvs([[0, .40625, .125, .125], [.125, .40625, S5, S5], [.28125, .40625, S5, S5], [.4375, .40625, S5, S5], [.59375, .40625, S5, S5], [.75, .40625, S5, S5], ...grid(0, .5625, 6, 6, S5), ...grid(0, .71875, 6, 6, S5), [0, .875, S5, .125], [S5, .875, S5, .125], [.3125, .875, .125, .125], [.4375, .875, .125, .125], END]),
  uvs([...grid(0, 0, 25, 5, S6).slice(0, 24), END]),
  uvs([...grid(0, 0, 25, 5, S6).slice(0, 24), END]),
  uvs([...grid(0, 0, 16, 4, S7), END]),
  uvs([[0, 0, .125, .125], [0, .125, .125, .125], [0, .25, .125, .125], [0, .375, .125, .125], [.125, 0, S6, S6], [.125, S6, S6, S6], [.125, .375, S6, S6], [.125, .5625, S6, S6], [.3125, 0, S7, S7], [.3125, S7, S7, S7], [.3125, .4375, S7, S7], [.3125, .65625, S7, S7], [.53125, 0, S7, S7], [.53125, S7, S7, S7], [.53125, .4375, S7, S7], [.53125, .65625, S7, S7], [.75, 0, S7, S7], [.75, S7, S7, S7], [.75, .4375, S7, S7], [.75, .65625, S7, S7], END]),
  uvs([[0, 0, S5, S5], [S5, 0, S5, S5], [.3125, 0, S5, S5], [.46875, 0, S6, S6], [.65625, 0, S6, S6], [0, S5, S7, S7], [S7, S5, S7, S7], [.4375, S6, S7, S7], [.65625, S6, S7, S7], [0, .375, S7, S7], [S7, .375, S7, S7], [.4375, .40625, S7, S7], [.65625, .40625, S7, S7], [0, .59375, S7, S7], [S7, .59375, S7, S7], [.4375, .625, S7, S7], [.65625, .625, S7, S7], END]),
  uvs([[0, 0, S5, S5], [S5, 0, S5, S5], [.3125, 0, S5, S5], [.46875, 0, S6, S6], [.65625, 0, S6, S6], [0, S5, S7, S7], [S7, S5, S7, S7], [.4375, S6, S7, S7], [.65625, S6, S7, S7], [0, .375, .25, .25], [.25, .40625, .25, .25], [.5, .40625, .25, .25], [0, .625, .25, .25], [.25, .65625, .25, .25], [.5, .65625, .25, .25], [.75, .40625, S7, S7], END]),
  uvs([...grid(0, 0, 5, 5, S6), [0, S6, S7, S7], [S7, S6, S7, S7], [.4375, S6, S7, S7], [.65625, S6, S7, S7], [0, .40625, S7, S7], [S7, .40625, S7, S7], [.4375, .40625, S7, S7], [.65625, .40625, S7, S7], [0, .625, S7, S7], [S7, .625, S7, S7], [.4375, .625, S7, S7], [.65625, .625, S7, S7], END]),
];
KEMU.push(KEMU[0]);
const KEMU_TEX = [400, 400, 401, 402, 403, 404, 405, 406, 407, 400];
const KCOL = [
  [0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF, 0xFFFFFFFF], [0xD0201010, 0x70302A2A, 0xD0201010, 0x70302A2A], [0xFFE0E0E0, 0xFFA0A0A0, 0xFF808080, 0xFF404040],
  [0xFFC01000, 0xFF900000, 0xFF900000, 0xFF600000], [0xFFA0C090, 0xFF80A070, 0xFF609060, 0xFF506040], [0xFFF0F040, 0xFFD0C030, 0xFFC0B020, 0xFFA09010],
  [0xFF806040, 0xFF706040, 0xFF605030, 0xFF504030], [0xFFC0E0FF, 0xFFB0C0E0, 0xFFA0B0D0, 0xFF80A0B0], [0xD0201010, 0x70302A2A, 0xD0201010, 0x70302A2A],
  [0xFF404040, 0xFF808080, 0xFFA0A0A0, 0xFFE0E0E0],
];
const P0_119 = uvs([[0, 0, .0625, .0625], [0, .0625, .0625, .0625], [.0625, 0, .09375, .09375], [.15625, 0, .125, .125], [.28125, 0, .125, .125], [.40625, 0, S6, S6], [.59375, 0, S6, S6], [.78125, 0, S6, S6], [0, .125, S7, S7], [0, .34375, .25, .25], [.25, .34375, .25, .25], [.5, .34375, .25, .25], [.75, .34375, .25, .25], [0, .59375, .25, .25], [.25, .59375, .25, .25], END]);
const T0_15 = uvs([...grid(0, 0, 10, 4, .25), END]);
const T1_15 = uvs([[.5, .5, .25, .125], [.75, .5, .25, .125], [.5, .625, .25, .125], [.75, .625, .25, .125], END]);
const T2_15 = uvs([[.09375, .90625, .125, .09375], [.21875, .84375, .125, S5], [.34375, .8125, .125, S6], [.46875, .6875, .125, .3125], [.59375, .625, S6, .375], [.78125, .5625, S7, .4375], [0, .53125, S6, .375], [S6, .53125, S5, .28125], [.34375, .53125, .125, .25], [.46875, .53125, .125, S5], [.59375, .53125, .125, .09375], END]);
const OIL = uvs([[.375, .375, S6, S6], [.5625, .375, S6, S6], [0, .5625, S6, S6], [S6, .5625, S6, S6], [.375, .5625, S6, S6], [.5625, .5625, S6, S6], [0, .75, S6, S6], [S6, .75, S6, S6], END]);
const OILH = uvs([[.375, .75, S6, .09375], [.5625, .75, S6, .09375], [.375, .84375, S6, .09375], [.5625, .84375, S6, .09375], END]);
const SPLASH = uvs([[0, 0, .109375, .09375], [.109375, 0, .109375, .09375], [.21875, 0, .109375, .09375], [.328125, 0, .109375, .09375], [.4375, 0, .109375, .09375], END]);
// bhEff218 (Eff218: cell table, count, texture, w, h) and bhEff201 (4x4 64-pixel cells)
const cells = (a: number[]) => { const r: [number, number][] = []; for (let i = 0; i < a.length; i += 2) r.push([a[i], a[i + 1]]); return r; };
const row = (u0: number, v: number, step: number, n: number) => { const r: number[] = []; for (let i = 0; i < n; i++) r.push(u0 + i * step, v); return r; };
const F13 = cells([...row(0, 0, 40, 6), ...row(0, 40, 40, 4)]), F16 = cells([...row(0, 80, 40, 6), ...row(0, 120, 40, 6)]), F14 = cells([...row(0, 160, 40, 6), ...row(0, 200, 40, 6)]);
const F02 = cells([...row(0, 0, 56, 4), ...row(0, 56, 56, 4)]), F04 = cells(row(0, 112, 24, 10)), F07 = cells([...row(0, 136, 48, 5), ...row(0, 184, 48, 5)]);
const F06 = cells([...row(0, 112, 48, 5), ...row(0, 168, 48, 5)]), F08 = cells([...row(0, 0, 48, 5), ...row(0, 48, 48, 5)]), F05 = cells([...row(0, 96, 48, 5), ...row(0, 144, 48, 5)]);
const F09 = cells([...row(0, 0, 56, 4), ...row(0, 56, 56, 4), ...row(0, 112, 56, 2)]), F11 = cells([...row(0, 0, 56, 4), ...row(0, 56, 56, 4), ...row(0, 112, 56, 4)]);
const F12 = cells([...row(0, 0, 32, 7), ...row(0, 32, 32, 7)]), F00 = cells([...row(0, 64, 56, 4), ...row(0, 120, 56, 4)]), F15 = cells([...row(0, 0, 40, 6), ...row(0, 40, 40, 6)]);
const EFF218: [number, [number, number][], number, number][] = [
  [70, F13, 40, 40], [70, F16, 40, 40], [70, F14, 40, 40], [71, F02, 56, 56], [71, F04, 24, 24], [71, F07, 48, 48], [72, F02, 56, 56], [72, F06, 48, 56],
  [73, F08, 48, 48], [73, F05, 48, 48], [74, F09, 56, 56], [75, F13, 40, 40], [76, F08, 48, 48], [77, F11, 56, 56], [78, F12, 32, 32], [78, F00, 56, 56], [79, F15, 40, 40],
];

function newO(): O {
  return {
    flg: 0, stflg: 0, id: 0, type: 0, mode0: 0, mode1: 0, mdlver: 0, flr: 0, ct0: 0, ct1: 0, ct2: 0, ct3: 0,
    px: 0, py: 0, pz: 0, sx: 0, sy: 0, sz: 0, sxb: 0, syb: 0, szb: 0, ax: 0, ay: 0, az: 0, xn: 0, yn: 0, zn: 0, spd: 0,
    aox: 0, aoy: 0, aoz: 0, axp: 0, ayp: 0, azp: 0, gpx: 0, gpy: 0, gpz: 0, tex: -1, ani: 0, bls: 8, bld: 6,
    tv: [{ x: -1, y: -1, u: 0, v: 0, col: 0 }, { x: 1, y: -1, u: 1, v: 0, col: 0 }, { x: -1, y: 1, u: 0, v: 1, col: 0 }, { x: 1, y: 1, u: 1, v: 1, col: 0 }],
    exp: null, er: null, func: 0, lkono: 0,
  };
}
interface Src { flg: number; id: number; type: number; flr?: number; mdlver?: number; px: number; py: number; pz: number; sx: number; sy: number; sz: number; ax: number; ay: number }

export class Effects {
  eff: O[] = Array.from({ length: 512 }, newO);
  private trs: O[] = [];
  private fnc: O[] = [];
  /** bhEff102 wind (sys->windr / sys->winds) */
  windr = 0; winds = 0;
  /** camera shake offset (cam.ofx..ofz, game units) */
  of = [0, 0, 0];
  group = new THREE.Group();
  /** room floor ATR list (bhCheckFloorEffect) in metres */
  floors: { flg: number; type: number; flr: number; prm: number[]; x: number; z: number; w: number; d: number }[] = [];
  private camPos = new THREE.Vector3(); private camDir = new THREE.Vector3();
  private tex = new Map<string, THREE.Texture | null>();
  private loader = new THREE.TextureLoader();
  private batches = new Map<string, { mesh: THREE.Mesh; geo: THREE.BufferGeometry; n: number }>();
  private rain: THREE.LineSegments;
  unknown = new Set<number>();

  constructor() {
    this.group.renderOrder = 10;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(77 * 2 * 3), 3));
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(77 * 2 * 4), 4));
    this.rain = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.rain.frustumCulled = false; this.rain.renderOrder = 2000; this.rain.visible = false;
    this.group.add(this.rain);
  }

  /** bhClearEffect + the room's EF table (bhSetEffectTb for every record; efid[i] = slot i) */
  async load(roomId: string) {
    for (const o of this.eff) o.flg = 0;
    this.of = [0, 0, 0]; this.windr = this.winds = 0;
    const recs = await loadJSON<EftRec[]>(`eft/${roomId}.json`).catch(() => [] as EftRec[]);
    for (const r of recs) {
      const i = this.setTb({ flg: r.flg, id: r.id, type: r.type, flr: r.flr, mdlver: r.mdlver, px: r.p[0], py: r.p[1], pz: r.p[2], sx: r.s[0], sy: r.s[1], sz: r.s[2], ax: r.ax, ay: r.ay });
      // EF record link block: lkono (3rd word) selects e.g. the page of a bhEff2D texture set
      if (i >= 0 && r.lk && r.lk.length >= 24) this.eff[i].lkono = parseInt(r.lk.slice(16, 24), 16) | 0;
    }
    // textures used by this room's effects
    if (!this.index) this.index = await loadJSON<Record<string, number>>('effects/index.json').catch(() => ({}));
    const ids = new Set<number>();
    for (const r of recs) if (r.id < 100 || r.id >= 400) ids.add(r.id === 20 ? r.type : r.id);
    await Promise.all([...ids].flatMap((id) => Array.from({ length: this.index![id] ?? 0 }, (_, k) => this.texture(id, k))));
  }
  private index: Record<string, number> | null = null;
  private texture(id: number, k: number): Promise<THREE.Texture | null> | THREE.Texture | null {
    const key = `ef_${String(id).padStart(3, '0')}_${k}`;
    if (this.tex.has(key)) return this.tex.get(key)!;
    if (k >= (this.index?.[id] ?? 0)) { this.tex.set(key, null); return null; }
    const p = `effects/${key}.png`;
    if (window.__ASSETS && !window.__ASSETS[p]) { this.tex.set(key, null); return null; }
    return this.loader.loadAsync(assetUrl(p)).then((t) => { t.flipY = false; t.colorSpace = THREE.NoColorSpace; t.magFilter = THREE.LinearFilter; this.tex.set(key, t); return t; }, () => { this.tex.set(key, null); return null; });
  }
  /** screen-space layer (640x480 of the original) for bhEff2D sprites and the bhDraw021 cinema bars */
  layer = document.createElement('div');
  private l2d = new Map<number, HTMLDivElement>();
  private bars: HTMLDivElement | null = null;
  lang: 'ru' | 'en' = 'ru';
  /** WORK 4 n + POS / bhCommonCtr: the event script moves an effect work (game units) */
  setPos(i: number, x: number, y: number, z: number) { const o = this.eff[i]; o.px = x; o.py = y; o.pz = z; }
  disp(i: number, on: number) { const o = this.eff[i]; if (on === 0) o.stflg |= 0x1000000; else o.stflg &= ~0x1000000; }
  mode(i: number, v: number) { this.eff[i].mode1 = v; }
  yure(kind: number, v: number) { if (kind === 0) this.of = [0.01 * v * rnd(), 0.01 * v * rnd(), 0.01 * v * rnd()]; else this.of = [0, 0, 0]; }

  private setTb(e: Src): number {
    for (let i = 0; i < 512; i++) {
      const o = this.eff[i]; if (o.flg & 3) continue;
      Object.assign(o, newO());
      o.flg = e.flg; o.id = e.id; o.type = e.type; o.tex = -1; o.mdlver = e.mdlver ?? 0; o.flr = e.flr ?? 0;
      o.px = e.px; o.py = e.py; o.pz = e.pz; o.sx = o.sxb = e.sx; o.sy = o.syb = e.sy; o.sz = o.szb = e.sz; o.ax = e.ax; o.ay = e.ay; o.az = 0;
      return i;
    }
    return -1;
  }
  private setentry(id: number, type: number, op: O) {
    return this.setTb({ flg: 0x04100001, id, type, px: op.px, py: op.py, pz: op.pz, sx: op.sx, sy: op.sy, sz: op.sz, ax: op.ax, ay: op.ay });
  }
  private effinit(op: O) {
    op.flg |= 0x04100000;
    const t = op.tv; t[0].x = -1; t[0].y = -1; t[1].x = 1; t[1].y = -1; t[2].x = -1; t[2].y = 1; t[3].x = 1; t[3].y = 1;
    for (const v of t) v.col = 0xFFFFFFFF;
    op.bls = 8; op.bld = 6; op.ani = 0; op.ct1 = 0; op.ct0 = 0; op.sxb = op.sx; op.syb = op.sy; op.spd = 0; op.xn = op.yn = op.zn = 0;
  }
  private effset(op: O, uv: UV, num: number) {
    op.sx = 4 * op.sxb * uv.w; op.sy = 4 * op.syb * uv.h;
    const c = KCOL[num], t = op.tv;
    for (let i = 0; i < 4; i++) t[i].col = c[i];
    this.uv4(op, uv.u, uv.v, uv.u + uv.w, uv.v + uv.h);
  }
  private uv4(op: O, u0: number, v0: number, u1: number, v1: number) { const t = op.tv; t[0].u = t[2].u = u0; t[1].u = t[3].u = u1; t[0].v = t[1].v = v0; t[2].v = t[3].v = v1; }
  /** njUnitMatrix; njRotateXYZ(ax, ay, 0); njCalcVector((0,0,z)) */
  private dir(ax: number, ay: number, z: number) {
    const v = new THREE.Vector3(0, 0, z).applyEuler(new THREE.Euler(ax * ANG, ay * ANG, 0, 'ZYX')); return v;
  }

  /** bhEff2D: screen-space textured quad, texture set `type`, page lkono; size (sx/4)*512 x (sy/4)*512 at (px, py) */
  private e2D(op: O) {
    if (op.mode0 === 0) { op.flg |= 0x1000000; op.tex = op.type; op.ani = op.lkono; op.px = op.py = op.pz = 0; this.uv4(op, 0, 0, 1, 1); for (const t of op.tv) t.col = 0xFFE0E0E0; op.bls = 8; op.bld = 6; op.mode0 = 1; return; }
    if (op.mode1 === 0) { op.flg |= 0x1000000; return; }
    op.flg &= ~0x1000000; this.trs2d.push(op);
  }
  /** bhEff021: cinema bars (sys->cb_flg 0x40) while mode1 != 0 */
  private e021(op: O) { if (op.mode1 !== 0) { op.func = 21; this.fnc.push(op); } else op.flg |= 0x1000000; }
  private trs2d: O[] = [];
  /** draw the 2D layer (DOM, 640x480 coordinates scaled to the stage) */
  draw2D() {
    const seen = new Set<number>();
    for (const op of this.trs2d) {
      if (op.stflg & 0x1000000) continue;
      const i = this.eff.indexOf(op); seen.add(i);
      let el = this.l2d.get(i);
      const key = `ef_${String(op.tex).padStart(3, '0')}_${op.ani}`, src = this.lang === 'ru' ? `effects/${key}_ru.png` : `effects/${key}.png`;
      if (!el) { el = document.createElement('div'); el.style.cssText = 'position:absolute;background-size:100% 100%;image-rendering:auto'; this.layer.appendChild(el); this.l2d.set(i, el); }
      if (el.dataset.src !== src) { el.dataset.src = src; const ok = !window.__ASSETS || window.__ASSETS[src]; el.style.backgroundImage = `url(${assetUrl(ok ? src : `effects/${key}.png`)})`; }
      const w = (op.sx / 4) * 512 * (op.tv[1].u - op.tv[0].u), h = (op.sy / 4) * 512 * (op.tv[2].v - op.tv[0].v);
      // vertex colour 0xFFE0E0E0 modulates the texture (same 8-bit scale as the 3D sprites: 0xE0 -> 0.88)
      el.style.left = `${(op.px / 640) * 100}%`; el.style.top = `${(op.py / 480) * 100}%`; el.style.width = `${(w / 640) * 100}%`; el.style.height = `${(h / 480) * 100}%`;
      el.style.display = 'block'; el.style.filter = 'brightness(0.88)';
    }
    for (const [i, el] of this.l2d) if (!seen.has(i)) el.style.display = 'none';
    const barsOn = this.fnc.some((o) => o.func === 21);
    if (barsOn && !this.bars) {
      this.bars = document.createElement('div');
      this.bars.style.cssText = 'position:absolute;inset:0;pointer-events:none;background:linear-gradient(to bottom,#000 0,#000 8.333%,transparent 21.667%,transparent 78.333%,#000 91.667%,#000 100%)';
      this.layer.appendChild(this.bars);
    }
    if (this.bars) this.bars.style.display = barsOn ? 'block' : 'none';
  }
  /** bhControlEffect: one 30 Hz frame */
  update(camera: THREE.Camera) {
    camera.getWorldPosition(this.camPos).multiplyScalar(10); camera.getWorldDirection(this.camDir);
    for (const op of this.fnc) if (op.func === 107) for (const e of op.er!) e.ay++;
    this.trs.length = 0; this.fnc.length = 0; this.trs2d.length = 0;
    for (let i = 0; i < 512; i++) {
      const op = this.eff[i];
      if (!(op.flg & 1) || op.stflg & 0x1000000) continue;
      if (op.id >= 400) { op.flg = 0; continue; }
      this.run(op);
    }
  }
  private run(op: O) {
    switch (op.id) {
      case 15: return this.e015(op);
      case 20: return this.e2D(op);
      case 21: return this.e021(op);
      case 32: case 36: case 39: case 52: case 54: case 59: case 70: case 71: case 72: case 73: case 74: case 75: case 76: case 77: case 78: case 79:
      case 31: case 33: case 34: case 35: case 41: case 45: op.flg = 0; return; // bhEffDmy (texture holders)
      case 100: return this.e100(op);
      case 101: return this.e101(op);
      case 102: return this.e102(op);
      case 103: return this.e103(op);
      case 106: op.flg = 0; return;
      case 107: return this.e107(op);
      case 116: return this.e116(op);
      case 119: return this.e119(op);
      case 154: return this.e154(op);
      case 155: return this.e155(op);
      case 158: return this.e158(op);
      case 159: return this.e159(op);
      case 164: return this.e164(op);
      case 165: return this.e165(op);
      case 179: return this.e179(op);
      case 180: return this.e180(op);
      case 181: return this.e181(op);
      case 182: return this.e182(op);
      case 201: return this.e201(op);
      case 218: return this.e218(op);
    }
    // not ported (e.g. camera filters 90..99, other rooms' effects): left alive but not drawn
    if (!this.unknown.has(op.id)) { this.unknown.add(op.id); console.info('effect id', op.id, 'not ported'); }
    op.flg |= 0x1000000;
  }

  // ---- rain / wind (effsub1.c)
  private e100(op: O) {
    op.flg |= 0x1000000;
    if (op.stflg & 0x1000000) { op.flg = 0; return; }
    if (op.mode0 === 0) {
      op.func = 106; op.er = [];
      for (let i = 0; i < 77; i++) op.er.push({ px: this.camPos.x + 30 * this.camDir.x + (80 * rnd() - 40), py: 80 * rnd(), pz: this.camPos.z + 30 * this.camDir.z + (80 * rnd() - 40), ax: 0, ay: 0 });
      op.mode0 = 1; return;
    }
    // bhEff106 (drawn from ef_fnc); the drops move in the draw function while the game runs
    for (const e of op.er!) {
      e.ax = 182.04445 * (25 * this.winds);
      e.px -= this.winds * nsin(e.ay); e.pz -= this.winds * ncos(e.ay); e.py -= 5;
      if (e.py < 0) { e.ay = this.windr; e.px = this.camPos.x + 30 * this.camDir.x + (80 * rnd() - 40); e.py = 80; e.pz = this.camPos.z + 30 * this.camDir.z + (80 * rnd() - 40); }
    }
    this.fnc.push(op);
  }
  private e101(op: O) {
    op.flg |= 0x1000000;
    if (op.stflg & 0x1000000) { op.flg = 0; return; }
    this.setTb({ flg: 1, id: 107, type: 0, px: 0, py: 0, pz: 0, sx: op.sx, sy: op.sy, sz: op.sz, ax: 0, ay: 0 });
  }
  private e102(op: O) {
    op.flg |= 0x1000000;
    if (op.lkono !== 0) this.windr = (this.windr + (Math.trunc(182.04445 * (op.sz * rnd() - 0.5 * op.sz)) & 0xffff));
    else this.windr = op.ay + (Math.trunc(182.04445 * (20 * nsin(op.ct0))) & 0xffff);
    this.winds = op.sx + op.sy * nsin(op.ct0);
    op.ct0 = (op.ct0 + op.type * 256) & 0xffff;
  }
  private e107(op: O) {
    if (op.mode0 === 0) {
      op.func = 107; op.er = [];
      for (let i = 0; i < 8; i++) {
        const px = this.camPos.x + 40 * this.camDir.x + (80 * rnd() - 40), pz = this.camPos.z + 40 * this.camDir.z + (80 * rnd() - 40);
        const hp = this.floors.find((f) => f.flg & 1 && f.type === 3 && f.flr === 0 && f.x * 10 <= px && (f.x + f.w) * 10 >= px && f.z * 10 <= pz && (f.z + f.d) * 10 >= pz);
        op.er.push({ px, py: 0.1, pz, ax: hp && hp.prm[0] === 0 ? 0 : 1, ay: 0 });
      }
      op.mode0 = 1; op.ct0 = 0; return;
    }
    if (++op.ct0 > 4) { op.flg = 0; return; }
    this.fnc.push(op);
  }
  private e103(op: O) {
    op.flg |= 0x1000000;
    switch (op.type) {
      case 0:
        if (rnd() < 0.3) this.setTb({ flg: 0x100001, id: 10, type: 1, px: op.px + 3 * rnd() - 1.5, py: op.py + 3 * rnd() - 1.5, pz: op.pz + 3 * rnd() - 1.5, sx: op.sx, sy: op.sy, sz: op.sz, ax: 0, ay: 0 });
        break;
      case 1:
        op.ct0 = (op.ct0 + 1) & 3;
        if (op.ct0 === 0) { this.setTb({ flg: 0x4100001, id: 119, type: 0, px: op.px, py: op.py, pz: op.pz, sx: op.sx, sy: op.sy, sz: op.sz, ax: 0, ay: op.ay + Math.trunc(2048 * nsin(op.ct1)) }); op.ct1 += 2048; }
        break;
      case 2:
        op.ct0 = (op.ct0 + 1) & 1;
        if (op.ct0 === 0) this.setTb({ flg: 0x4100001, id: 119, type: 1, px: op.px, py: op.py, pz: op.pz, sx: op.sx, sy: op.sy, sz: op.sz, ax: 0, ay: 0 });
        break;
    }
  }
  private e116(op: O) {
    op.flg |= 0x1000000;
    op.ct3 = (op.ct3 + 1) & 3; if (op.ct3 !== 0) return;
    if (op.type === 0) this.setTb({ flg: 0x4100001, id: 15, type: 5, mdlver: op.ct3 & 7, px: op.px, py: op.py, pz: op.pz, sx: op.sx, sy: op.sy, sz: op.sz, ax: 0, ay: op.ay });
  }
  private e015(op: O) {
    const t = op.tv;
    if (op.mode0 === 0) {
      op.flg = 0x4100001; op.tex = 33; for (const v of t) v.col = 0xA0FFFFFF; op.bls = 8; op.bld = 6; op.ani = 0;
      switch (op.type) {
        case 0: op.xn = 0.7; op.yn = 0.2; op.exp = T0_15; break;
        case 1: op.exp = T1_15; break;
        case 2: op.tex = 34; op.bls = 8; op.bld = 10; t[0].x = -1; t[0].y = -2; t[1].x = 1; t[1].y = -2; t[2].x = -1; t[2].y = 0; t[3].x = 1; t[3].y = 0; op.exp = T2_15; break;
        case 3: op.tex = 31; op.xn = 0.4; op.yn = 0.3; op.exp = T0_15; break;
        case 4: op.tex = 31; op.exp = T1_15; break;
        case 5: op.tex = 36; op.gpx = op.px; op.gpy = op.py; op.gpz = op.pz; op.xn = op.sz; op.yn = op.sy; op.sxb = op.sx; op.sy = op.syb = op.sx; op.sz = op.szb = op.sx; op.ct1 = op.mdlver; op.exp = OIL; break;
        case 6: op.tex = 36; op.exp = OILH; break;
      }
      op.ct0 = 0; op.mode0 = 1;
    }
    if (op.type === 2) { if (op.flr > 0) { op.flg |= 0x1000000; op.flr--; return; } op.flg &= ~0x1000000; }
    let uv = op.exp![op.ct0];
    if (uv.u === -1) {
      if (op.type === 5) { op.ct0 = 0; uv = op.exp![0]; }
      else {
        op.flg = 0;
        if (op.type === 0 || op.type === 3) this.setTb({ flg: 0x4100001, id: 15, type: op.type + 1, mdlver: 0, sx: 2, sy: 2, sz: 2, px: op.px + 2 * rnd() - 1, py: op.py, pz: op.pz + 2 * rnd() - 1, ax: 0, ay: 0 });
        return;
      }
    }
    if (op.type === 2) { op.sx = 8 * op.sxb * uv.w; op.sy = 8 * op.syb * uv.h; }
    this.uv4(op, uv.u, uv.v, uv.u + uv.w, uv.v + uv.h);
    switch (op.type) {
      case 0: case 3:
        op.sx += 0.1; op.sy += 0.1; op.px -= op.xn * nsin(op.ay); op.pz -= op.xn * ncos(op.ay); op.py += op.yn; op.xn -= 0.07 * op.xn; op.yn -= 0.15; break;
      case 5: {
        const xn = op.xn * -nsin(op.ct1);
        op.px = op.gpx + xn * nsin(op.ay); op.pz = op.gpz + xn * ncos(op.ay); op.py = op.gpy + op.yn * ncos(op.ct1);
        op.sx += 0.001; op.ct1 += 512;
        if (op.ct1 >= 16384) {
          op.flg = 0;
          this.setTb({ flg: 0x4100001, id: 15, type: op.type + 1, mdlver: 0, sx: 1.2 * op.sx, sy: 1.2 * op.sy, sz: 1.2 * op.sz, px: op.px + rnd() - 0.5, py: op.py, pz: op.pz + rnd() - 0.5, ax: 0, ay: 0 });
          return;
        }
        break;
      }
    }
    op.ct0++;
    this.trs.push(op);
  }
  private e119(op: O) {
    const t = op.tv;
    if (op.mode0 === 0) {
      op.tex = 39; op.flg |= 0x4100000; for (const v of t) v.col = 0xFFFFFFFF; op.bls = 11; op.bld = 3; op.gpy = op.py; op.ani = 0; op.ct0 = 0;
      op.xn = 0.4 * rnd() - 0.2; op.zn = 0.4 * rnd() - 0.2;
      if (op.type === 0) { for (const v of t) v.col = 0xC0FFFFFF; op.ct2 = 192; op.exp = P0_119; op.spd = 0.1 * op.sz; }
      else if (op.type === 1) op.exp = P0_119.slice(5);
      op.mode0 = 1;
    }
    const uv = op.exp![op.ct0];
    if (uv.u === -1) { op.flg = 0; return; }
    if (op.type === 0) {
      for (const v of t) v.col = ((op.ct2 << 24) | 0xFFFFFF) >>> 0;
      op.spd *= 0.9; op.px -= op.spd * nsin(op.ay); op.pz -= op.spd * ncos(op.ay); op.py += 0.5; op.ct2 -= 8;
    } else if (op.type === 1) {
      op.px += op.xn; op.pz += op.zn; op.py = op.gpy + op.sz * nsin(op.ct0 * 1024);
      op.sx = 8 * op.sxb * uv.w; op.sy = 8 * op.syb * uv.h;
    }
    this.uv4(op, uv.u, uv.v, uv.u + uv.w, uv.v + uv.h);
    op.ct0++;
    this.trs.push(op);
  }

  // ---- sparks / explosion / smoke (effsub0.c)
  private e154(op: O) {
    op.flg |= 0x1000000;
    if (op.type === 0 && op.mode1 !== 0) op.type = op.mode1;
    if (op.type !== 0) {
      if (op.ct1 < 1 || op.ct1 > 7) {
        op.ct0 = op.ct0 === 1 ? (rnd() >= 0.5 ? 2 : 0) : op.ct0 === 2 ? (rnd() >= 0.5 ? 1 : 0) : (rnd() >= 0.5 ? 2 : 1);
        this.setentry(155, op.ct0, op); op.mode1 = 0; op.ct1 = 7;
      }
      op.ct1--;
    }
  }
  private e155(op: O) {
    if (op.mode0 === 0) { op.tex = 52; this.effinit(op); op.exp = HIBANA[op.type === 1 ? 1 : op.type === 2 ? 2 : 0]; op.mode0 = 1; }
    this.seq(op, 0);
  }
  /** common tail: next UV cell, effset, draw list (or end of the animation) */
  private seq(op: O, num: number) {
    const uv = op.exp![op.ct0];
    if (uv.u === -1) { op.flg = 0; return; }
    this.effset(op, uv, num); op.ct0++; this.trs.push(op);
  }
  private e158(op: O) {
    op.flg |= 0x1000000;
    if (op.type === 0 && op.mode1 !== 0) op.type = op.mode1;
    if (op.type !== 0) { this.setentry(159, op.type === 2 ? 1 : 0, op); op.mode1 = 0; op.type = 0; }
  }
  private e159(op: O) {
    if (op.mode0 === 0) {
      op.tex = 54; this.effinit(op);
      if (op.type === 1) op.exp = EXP1;
      else if (op.type === 2) { op.exp = EXP0; op.type -= 2; op.xn = op.sz * (rnd() - 0.5) / 8; op.yn = op.sz * (rnd() - 0.5) / 8; op.zn = op.sz * (rnd() - 0.5) / 8; }
      else { op.exp = EXP0; op.type = 0; }
      op.mode0 = 1;
    }
    const uv = op.exp![op.ct0];
    if (uv.u === -1) { op.flg = 0; return; }
    op.ani = (op.type === 1 ? EXP_BANK1 : EXP_BANK0)[op.ct0] ?? 0;
    op.px += op.xn; op.py += op.yn; op.pz += op.zn;
    this.effset(op, uv, 0); op.ct0++; this.trs.push(op);
  }
  private e164(op: O) {
    op.flg |= 0x1000000;
    if (op.type === 0 && op.mode1 !== 0) { op.type = op.mode1; op.mode1 = 0; }
    if (op.type !== 0 && op.ct0 === 0) op.ct0 = op.type & 0xffff;
    if (op.ct0 !== 0) { this.setentry(159, 2, op); op.ct0 -= 1; if (op.ct0 === 0) op.type = 0; }
  }
  private e165(op: O) {
    op.flg |= 0x1000000;
    if (op.type === 0 && op.mode1 !== 0) { op.type = op.mode1 & 0xff; op.mode1 = 0; }
    if (op.type !== 0 && op.ct0 === 0) {
      op.ct0 = op.type * 2;
      const v = this.dir(op.ax, op.ay, op.sz); op.xn = v.x; op.yn = v.y; op.zn = v.z; op.spd = 0;
      op.aox = op.px; op.aoy = op.py; op.aoz = op.pz; op.axp = op.ax; op.ayp = op.ay; op.azp = op.az;
    }
    if (op.ct0 !== 0) {
      if (!(op.ct0 & 1)) this.setentry(159, 1, op);
      op.px += op.xn; op.py += op.yn; op.pz += op.zn; op.py += op.spd; op.spd -= 0.05;
      // bhCheckWallRefAngle (wall reflection) is not ported
      const v = this.dir(op.ax, op.ay, op.sz); op.xn = v.x; op.yn = v.y; op.zn = v.z;
      const gy = 0; // bhGetGroundPosition: flat ground at y = 0
      if (gy >= op.py) { if (op.yn < 0) { op.spd = 2 * -op.yn; op.yn = 0; } else { op.yn = -(op.yn + op.spd); op.spd = 0; } }
      op.ct0--;
      if (op.ct0 === 0) { op.type = 0; op.px = op.aox; op.py = op.aoy; op.pz = op.aoz; op.ax = op.axp; op.ay = op.ayp; op.az = op.azp; }
    }
  }
  private e179(op: O) {
    op.flg |= 0x1000000;
    if (op.type === 0 && op.mode1 !== 0) op.type = op.mode1;
    if (op.type !== 0) {
      if (!op.sz) { this.setentry(180, op.type - 1, op); op.mode1 = 0; op.type = 0; return; }
      if (op.ct1 <= 0) { this.setentry(180, op.type - 1, op); op.ct1 = Math.trunc(op.sz); }
      op.ct1 -= 1;
    }
  }
  private e180(op: O) {
    if (op.mode0 === 0) { op.tex = 408; this.effinit(op); if (op.type === 1) { op.exp = HIBA2[1]; op.ani = 1; } else op.exp = HIBA2[0]; op.mode0 = 1; }
    this.seq(op, 0);
  }
  private e181(op: O) {
    op.flg |= 0x1000000;
    if (op.type === 0 && op.mode1 !== 0) op.type = op.mode1;
    if (op.type !== 0) {
      const typ = op.type - 1;
      if (!Math.floor(op.sz)) { this.setentry(182, typ, op); op.mode1 = 0; op.type = 0; return; }
      if (op.ct1 < 1) { this.setentry(182, typ, op); op.ct1 = Math.floor(op.sz); }
      op.ct1--;
    }
  }
  private e182(op: O) {
    const kcolor = op.type % 10, ktype = Math.floor(op.type / 10);
    if (op.mode0 === 0) { op.tex = KEMU_TEX[kcolor]; this.effinit(op); op.exp = KEMU[kcolor]; op.mode0 = 1; }
    const v = this.dir(op.ax, op.ay, op.sz - Math.trunc(op.sz));
    op.px += v.x; op.py += v.y; op.pz += v.z;
    const uv = op.exp![op.ct0];
    if (uv.u === -1) { op.flg = 0; return; }
    this.effset(op, uv, ktype); op.ct0++; this.trs.push(op);
  }

  // ---- looping flame flipbooks (effsub5.c)
  private e201(op: O) {
    if (op.type === 0 && op.mode1 !== 0) op.type = op.mode1;
    if (op.type === 0) { op.flg |= 0x1000000; return; }
    op.flg &= ~0x1000000;
    if (op.mode0 === 0) { op.flg |= 0x4180000; op.tex = 59; op.ani = 0; op.bls = 8; op.bld = 3; op.ct0 = Math.trunc(16 * rnd()); for (const v of op.tv) v.col = 0xFFFFFFFF; op.mode0 = 1; }
    else if (++op.ct0 >= 16) op.ct0 = 0;
    const u = (op.ct0 % 4) * 64, w = Math.floor(op.ct0 / 4) * 64;
    this.uv4(op, u / 256, w / 256, (u + 63) / 256, (w + 63) / 256);
    this.trs.push(op);
  }
  private e218(op: O) {
    if (op.type === 0 && op.mode1 !== 0) op.type = op.mode1;
    if (op.type === 0) { op.flg |= 0x1000000; return; }
    op.flg &= ~0x1000000;
    const T = EFF218[(op.type - 1) % 17], t = op.tv;
    if (op.mode0 === 0) {
      op.flg |= 0x4180000; op.bls = 8; op.bld = 3;
      t[0].x = t[2].x = -1; t[1].x = t[3].x = 1; t[0].y = t[1].y = -2; t[2].y = t[3].y = 0;
      for (const v of t) v.col = 0xFFFFFFFF;
      op.ct0 = Math.trunc(T[1].length * rnd()); op.mode0 = 1;
    } else if (++op.ct0 >= T[1].length) op.ct0 = 0;
    op.tex = T[0]; op.ani = 0;
    const [cu, cv] = T[1][op.ct0];
    this.uv4(op, cu / 256, (cv ? cv + 1 : cv) / 256, (cu + T[2] - 1) / 256, (cv + T[3]) / 256);
    this.trs.push(op);
  }

  // ---------------------------------------------------------------- drawing (bhDrawEffect)
  private mat(key: string, map: THREE.Texture, bls: number, bld: number) {
    let b = this.batches.get(key);
    if (!b) {
      const geo = new THREE.BufferGeometry(), N = 512;
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 4 * 3), 3).setUsage(THREE.DynamicDrawUsage));
      geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(N * 4 * 2), 2).setUsage(THREE.DynamicDrawUsage));
      geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(N * 4 * 4), 4).setUsage(THREE.DynamicDrawUsage));
      const idx = new Uint16Array(N * 6); for (let i = 0; i < N; i++) idx.set([i * 4, i * 4 + 2, i * 4 + 1, i * 4 + 1, i * 4 + 2, i * 4 + 3], i * 6);
      geo.setIndex(new THREE.BufferAttribute(idx, 1));
      const m = new THREE.MeshBasicMaterial({ map, vertexColors: true, transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: true });
      // GS alpha (njColorBlendingMode -> alpha_tbl): 8/6, 8/3 = (Cs-Cd)As+Cd; 8/10 = Cs*As+Cd; 11/3 = Cd(1-As)
      if (bld === 10) m.blending = THREE.AdditiveBlending;
      else if (bls === 11) { m.blending = THREE.CustomBlending; m.blendSrc = THREE.ZeroFactor; m.blendDst = THREE.OneMinusSrcAlphaFactor; m.blendEquation = THREE.AddEquation; }
      const mesh = new THREE.Mesh(geo, m); mesh.frustumCulled = false;
      b = { mesh, geo, n: 0 }; this.batches.set(key, b); this.group.add(mesh);
    }
    return b;
  }
  /** rebuild the sprite geometry for the current camera (called every rendered frame) */
  draw(camera: THREE.Camera) {
    for (const b of this.batches.values()) b.n = 0;
    camera.updateMatrixWorld();
    const e = camera.matrixWorld.elements, R = [e[0], e[1], e[2]], U = [e[4], e[5], e[6]];
    let order = 0;
    for (const op of this.trs) {
      if (op.flg & 0x1000000 || op.stflg & 0x1000000 || op.tex < 0 || !(op.flg & 1)) continue;
      const map = this.tex.get(`ef_${String(op.tex).padStart(3, '0')}_${op.ani}`);
      if (!map) { if (!this.tex.has(`ef_${String(op.tex).padStart(3, '0')}_${op.ani}`)) this.texture(op.tex, op.ani); continue; }
      const key = `${op.tex}_${op.ani}_${op.bls}_${op.bld}`;
      const b = this.mat(key, map, op.bls, op.bld);
      if (b.n === 0) b.mesh.renderOrder = 1000 + order++;
      if (b.n >= 512) continue;
      const P = b.geo.attributes.position.array as Float32Array, UVa = b.geo.attributes.uv.array as Float32Array, C = b.geo.attributes.color.array as Float32Array;
      const ca = Math.cos(op.az * ANG), sa = Math.sin(op.az * ANG);
      for (let k = 0; k < 4; k++) {
        const t = op.tv[k], i = b.n * 4 + k;
        // view space of the original: x right, y down; scale then rotate about z
        const x0 = t.x * op.sx, y0 = t.y * op.sy, x = x0 * ca - y0 * sa, y = -(x0 * sa + y0 * ca);
        P[i * 3] = (op.px + R[0] * x + U[0] * y) * 0.1; P[i * 3 + 1] = (op.py + R[1] * x + U[1] * y) * 0.1; P[i * 3 + 2] = (op.pz + R[2] * x + U[2] * y) * 0.1;
        UVa[i * 2] = t.u; UVa[i * 2 + 1] = t.v;
        const c = t.col >>> 0;
        C[i * 4] = (((c >>> 16) & 255) + 1 >> 1) / 128; C[i * 4 + 1] = (((c >>> 8) & 255) + 1 >> 1) / 128; C[i * 4 + 2] = ((c & 255) + 1 >> 1) / 128; C[i * 4 + 3] = Math.min(1, ((c >>> 24) + 1 >> 1) / 128);
      }
      b.n++;
    }
    // ef_fnc: rain lines (bhEff106) and splashes (bhDraw107)
    let rainOn = false;
    for (const op of this.fnc) {
      if (op.func === 106) { rainOn = true; this.drawRain(op); }
      else if (op.func === 107) this.drawSplash(op, R, U);
    }
    this.rain.visible = rainOn;
    for (const b of this.batches.values()) {
      b.geo.setDrawRange(0, b.n * 6); b.mesh.visible = b.n > 0;
      if (b.n) { b.geo.attributes.position.needsUpdate = true; b.geo.attributes.uv.needsUpdate = true; b.geo.attributes.color.needsUpdate = true; }
    }
  }
  private drawRain(op: O) {
    const g = this.rain.geometry, P = g.attributes.position.array as Float32Array, C = g.attributes.color.array as Float32Array;
    const top = new THREE.Vector3(), bot = new THREE.Vector3(), eu = new THREE.Euler();
    // col 0x10101010 (+7) / 0x40303030 (-7), additive (8/10)
    const c0 = [8 / 128, 8 / 128, 8 / 128, 8 / 128], c1 = [24 / 128, 24 / 128, 24 / 128, 32 / 128];
    op.er!.forEach((e, i) => {
      eu.set(e.ax * ANG, e.ay * ANG, 0, 'ZYX');
      top.set(0, 7, 0).applyEuler(eu); bot.set(0, -7, 0).applyEuler(eu);
      P.set([(e.px + top.x) * 0.1, (e.py + top.y) * 0.1, (e.pz + top.z) * 0.1, (e.px + bot.x) * 0.1, (e.py + bot.y) * 0.1, (e.pz + bot.z) * 0.1], i * 6);
      C.set([...c0, ...c1], i * 8);
    });
    g.attributes.position.needsUpdate = true; g.attributes.color.needsUpdate = true;
  }
  private drawSplash(op: O, R: number[], U: number[]) {
    const map = this.tex.get('ef_032_0'); if (!map) return;
    const b = this.mat('32_0_8_10', map, 8, 10);
    if (b.n === 0) b.mesh.renderOrder = 1900;
    const P = b.geo.attributes.position.array as Float32Array, UVa = b.geo.attributes.uv.array as Float32Array, C = b.geo.attributes.color.array as Float32Array;
    const tv = [[-0.7, -1.4], [0.7, -1.4], [-0.7, 0], [0.7, 0]];
    for (const e of op.er!) {
      const uv = SPLASH[Math.min(e.ay, 5)];
      // the frame advances in the draw function (once per 30 Hz frame here)
      if (e.ay < 5 && e.ax !== 0 && b.n < 512) {
        const us = [uv.u, uv.u + uv.w, uv.u, uv.u + uv.w], vs = [uv.v, uv.v, uv.v + uv.h, uv.v + uv.h];
        for (let k = 0; k < 4; k++) {
          const i = b.n * 4 + k, x = tv[k][0], y = -tv[k][1];
          P[i * 3] = (e.px + R[0] * x + U[0] * y) * 0.1; P[i * 3 + 1] = (e.py + R[1] * x + U[1] * y) * 0.1; P[i * 3 + 2] = (e.pz + R[2] * x + U[2] * y) * 0.1;
          UVa[i * 2] = us[k]; UVa[i * 2 + 1] = vs[k]; C.set([0.5, 0.5, 0.5, 0.5], i * 4);
        }
        b.n++;
      }
    }
  }
}
