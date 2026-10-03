// Interpreter of the original event scripts (data/evt/rm_XXXX of the PS3 version).
// Semantics follow the PS2 decompilation of CODE:Veronica (fmil95/recvx-decomp, prog/event.c, hitchk.c, sub1.c, message.c):
// scd0 runs once at room entry, scd1 every frame, events (scripts 2..) run as 16 cooperative tasks (bhEtask).
// PS3 byte order: 16-bit operands are big-endian; flag operands see HANDOFF.md ("Скрипты событий").
import { OPLEN, SUBLEN } from './evtops';

/** collision / trigger / floor record (ATR_WORK) */
export interface Atr { flg: number; type: number; id: number; flr: number; attr: number; x: number; y: number; z: number; w: number; h: number; d: number; prm: number[] }
/** entity work (player, enemy, object, item) as seen by the scripts */
export class Work {
  px = 0; py = 0; pz = 0; ax = 0; ay = 0; az = 0; // metres / radians
  posSet = false; angSet = false;
  /** motion frame counter (16.16 like frm_no) and step per tick (mtn_add) */
  frm = 0; add = 0x10000; mtn = -1; mtnKind = -1;
  /** stflg 0x1000000: not present; mdflg 0x1: not drawn */
  gone = false; hidden = false;
  /** script took control (LoadWork) / released to normal control (Sub/Player_controll 0x80) */
  scripted = false;
  parts = new Map<number, { ang?: number[]; pos?: number[] }>();
  dead = false; hp = 0;
  constructor(public kind: number, public idx: number) {}
}
interface Task { status: number; p: number; script: number; loop: number; cnt: number[]; cnt2: number; cnt3: number; lstack: number[]; lcond: number[]; data: number; work: Work | null; cno: number; bp: number[]; ba: number[]; addp: number[]; adda: number[]; ips: number[][]; ian: number[][] }
export interface EvtHost {
  hasItem(id: number): boolean;
  loseItem(id: number): void;
  weapon(): number;
  setWeapon(w: number): void;
  message(idx: number): void;
  fade(argb: number, speed: number): void;
  cine(mode: number): void;
  camSet(kind: number, a: number, b: number): void;
  door(attr: number, stg: number, room: number, pos: number, type: number): void;
  movie(no: number): void;
  moviePlaying(): boolean;
  playerHp(): number;
  log?(s: string): void;
}
const ARR = new Set([1, 2, 3, 7, 8, 9, 12, 13, 14, 15, 16, 11]);
const MTN_ADD: Record<number, number> = { 1: 0x10000, 2: 0x10000, 0: 0x8000, 3: 0x8000, 8: 0x8000, 4: 0x5555, 5: 0x4000, 9: 0x4000, 6: 0x3333, 7: 0x2aaa, 10: 0x2aaa, 11: 0x2000, 12: 0x1999, 13: 0x1555, 14: 0x2492, 15: 0x2000, 16: 0x1c71, 17: 0x1999, 18: 0x1745, 19: 0x1555, 20: 0x1249, 21: 0x1000, 22: 0xe38, 23: 0xccc, 24: 0xba2, 25: 0xaaa };
const D2R = Math.PI / 180;

/** persistent story flags (saved with the game) */
export interface EvtFlags { ev: number[]; ky: number[]; ed: number[]; it: number[]; mp: number[]; ic: number[]; ts: number[]; gm: number }
export function newFlags(): EvtFlags { const z = () => new Array(32).fill(0); return { ev: z(), ky: z(), ed: z(), it: z(), mp: z(), ic: z(), ts: z(), gm: 0 }; }

export class EvtVM {
  s: Uint8Array[] = [];
  f: EvtFlags;
  rm = 0; st = 0; sp = -1 >>> 0; cb = 0;
  pl = [0, 0, 0, 0]; // plp->flg / stflg / flg2 / ssd (types 13..16)
  etc: Atr[] = []; flr: Atr[] = []; wal: Atr[] = [];
  etc_idx = 0; flr_idx = 0; sb_id = 0; mes_sel = 0; rcase = 0; pos_no = 0; stg = 0; room = 0; wpnl = 0;
  works = new Map<string, Work>();
  tasks: Task[] = [];
  private p = 0; private cur = 0; private ifel = 0; private gsp: number[] = []; private ct: Task | null = null;
  trace = false;
  constructor(public host: EvtHost, flags?: EvtFlags) { this.f = flags ?? newFlags(); for (let i = 0; i < 16; i++) this.tasks.push(this.newTask()); }
  private newTask(): Task { return { status: 0, p: 0, script: 0, loop: -1, cnt: [], cnt2: 0, cnt3: 0, lstack: [], lcond: [], data: 0, work: null, cno: 0, bp: [0, 0, 0], ba: [0, 0, 0], addp: [0, 0, 0], adda: [0, 0, 0], ips: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], ian: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]] }; }
  work(kind: number, idx: number) { const k = kind + ':' + idx; let w = this.works.get(k); if (!w) { w = new Work(kind, idx); this.works.set(k, w); } return w; }

  /** bhInitEvent: room entry (after bhFinishRoom set sp_flg = -1) */
  init(scripts: string[]) {
    this.s = scripts.map((h) => { const u = new Uint8Array(h.length / 2); for (let i = 0; i < u.length; i++) u[i] = parseInt(h.substr(i * 2, 2), 16); return u; });
    for (const t of this.tasks) { t.status = 0; }
    this.wpnl = 0;
    this.sp = 0xffffffff;
    this.check(0);
    this.sp |= 0x10; this.scheduler(); this.sp &= ~0x10;
  }
  /** bhControlEvent: once per frame (30 fps) */
  tick() {
    if (!this.s.length) return;
    this.check(1);
    this.scheduler();
    for (const w of this.works.values()) w.frm += w.add;
  }
  /** room change (system.c): per-room flags reset */
  roomChange() { this.st = 0; this.rm = 0; this.cb &= 0xaf8000bb; this.f.gm &= 0x9b8c00cb; this.works.clear(); }

  // ---- flags
  private word(type: number, b2: number, b3: number): { arr: number[] | null; set: (v: number) => void; get: () => number; bit: number } {
    const self = this;
    if (!ARR.has(type)) {
      const bit = b2 & 31;
      const names: Record<number, 'rm' | 'st' | 'sp' | 'cb'> = { 4: 'rm', 5: 'st', 6: 'sp', 10: 'cb' };
      const n = names[type];
      return { arr: null, bit, get: () => (n ? self[n] : 0) >>> 0, set: (v) => { if (n) self[n] = v >>> 0; } };
    }
    const idx = (b2 << 8) | b3;
    if (type >= 13) { const i = type - 13; return { arr: null, bit: idx & 31, get: () => self.pl[i] >>> 0, set: (v) => { self.pl[i] = v >>> 0; } }; }
    if (type === 11) return { arr: null, bit: idx & 31, get: () => self.f.gm >>> 0, set: (v) => { self.f.gm = v >>> 0; } };
    const arr = ({ 1: this.f.ev, 2: this.f.ky, 3: this.f.ed, 7: this.f.it, 8: this.f.mp, 9: this.f.ic, 12: this.f.ts } as Record<number, number[]>)[type];
    const wi = (idx & 0x3ff) >> 5;
    return { arr, bit: idx & 31, get: () => arr[wi] >>> 0, set: (v) => { arr[wi] = v >>> 0; } };
  }
  flag(type: number, idx: number) { const w = this.word(type, idx >> 8, idx & 0xff); return ((w.get() >>> (31 - w.bit)) & 1) === 1; }
  setFlag(type: number, idx: number, on: boolean) { const w = this.word(type, idx >> 8, idx & 0xff); const m = (0x80000000 >>> w.bit); w.set(on ? w.get() | m : w.get() & ~m); }
  /** word flags by bit number (cb[23] etc.) */
  cbBit(n: number) { return 0x80000000 >>> n; }

  // ---- interpreter core
  private check(n: number) {
    const s = this.s[n]; if (!s) return;
    this.cur = n; this.p = 0; this.ifel = 0; this.gsp = []; this.ct = this.tasks[0];
    this.runLoop();
  }
  private runLoop() {
    let guard = 0;
    for (;;) {
      while (this.exec() !== 0) { if (++guard > 100000) { this.host.log?.('evt: runaway script ' + this.cur); return; } }
      if (this.ifel <= 0) break;
      this.p = this.gsp.pop() ?? this.p; this.ifel--;
    }
  }
  private scheduler() {
    if (!(this.sp & 0x10)) return;
    for (let i = 0; i < 16; i++) {
      const t = this.tasks[i]; this.ct = t;
      if (!t.status) continue;
      this.cur = t.script; this.p = t.p; this.ifel = 0; this.gsp = [];
      this.runLoop();
      t.p = this.p;
    }
  }
  evtOn(task: number, evt: number) {
    if (task >= 16) { task = 0; while (this.tasks[task].status !== 0 && task !== 15) task++; }
    const t = this.tasks[task]; const keepWork = t.work;
    Object.assign(t, this.newTask()); t.work = keepWork;
    t.status = 1; t.script = evt + 2; t.p = 0;
  }
  private b(o: number) { return this.s[this.cur][this.p + o] ?? 0; }
  private u16(o: number) { return (this.b(o) << 8) | this.b(o + 1); }
  private len(op: number) { if (op === 0x64 || op === 0x66 || op === 0x67 || op === 0x69) return SUBLEN[op]?.[this.b(1)] || 2; return OPLEN[op] || 2; }

  /** execute one command; returns the handler's value (0 = stop / false) */
  private exec(): number {
    const s = this.s[this.cur];
    if (this.p >= s.length) { this.ifel = 0; return 0; }
    const op = s[this.p]; const t = this.ct!;
    const b = (o: number) => this.b(o), u16 = (o: number) => this.u16(o);
    const L = this.len(op);
    const adv = (r = 1) => { this.p += L; return r; };
    if (this.trace) this.host.log?.(`evt s${this.cur} @${this.p.toString(16)} op ${op.toString(16)}`);
    switch (op) {
      case 0x00: this.ifel = 0; return 0;
      case 0x01: this.gsp.push(this.p + 2 + b(1)); this.ifel++; this.p += 2; return 1;
      case 0x02: this.gsp.pop(); this.ifel--; this.p += b(1); return 1;
      case 0x03: this.gsp.pop(); this.ifel--; this.p += 2; return 1;
      case 0x04: {
        const type = b(1);
        if (type === 10) {
          if (b(2) === 23 && this.etc_idx !== b(4)) return adv(0);
          if (b(2) === 22 && this.flr_idx !== b(4)) return adv(0);
        }
        const w = this.word(type, b(2), b(3)); const bit = (w.get() >>> (31 - w.bit)) & 1;
        return adv((b(5) & 1) ^ bit);
      }
      case 0x05: {
        const w = this.word(b(1), b(2), b(3)); const m = 0x80000000 >>> w.bit, mm = 0xffffffff >>> w.bit, v = w.get();
        switch (b(5)) { case 0: w.set(v | m); break; case 1: w.set(v & ~m); break; case 2: w.set(v ^ m); break; case 3: w.set(v | mm); break; case 4: w.set(v & ~mm); break; case 5: w.set(v ^ mm); break; }
        return adv(1);
      }
      case 0x06: {
        const vars: Record<number, number> = { 0: this.stg, 1: this.room, 15: this.pos_no, 8: this.sb_id, 17: this.wpnl, 21: this.rcase, 23: 0, 24: 0, 25: 0 };
        return adv(cmp(vars[b(1)] ?? 0, b(2), b(3)));
      }
      case 0x07: {
        const v = b(2) === 5 ? this.host.playerHp() : b(2) === 7 ? this.mes_sel : b(2) === 10 ? this.work(1, b(1)).hp : 0;
        return adv(cmp(v, b(3), u16(4)));
      }
      case 0x08: {
        const v = b(2);
        switch (b(1)) { case 0: this.stg = v; break; case 1: this.room = v; break; case 8: this.sb_id = v; break; case 15: this.pos_no = v; break; case 18: this.host.setWeapon(v); break; case 20: this.etc_idx = v; break; case 21: this.rcase = v; break; }
        return adv(1);
      }
      case 0x0a: { const a = this.wal[b(1)]; if (a) a.flg = b(2) ? a.flg & ~1 : a.flg | 1; return adv(1); }
      case 0x0b: { const a = this.etc[b(1)]; if (a) a.flg = b(2) ? a.flg & ~1 : a.flg | 1; return adv(1); }
      case 0x0c: { const a = this.flr[b(1)]; if (a) a.flg = b(2) ? a.flg & ~1 : a.flg | 1; return adv(1); }
      case 0x0d: { const fl = u16(2); if (!this.flag(3, fl) && this.work(1, b(1)).dead) this.setFlag(3, fl, true); return adv(1); }
      case 0x0e: {
        const fl = u16(2), e = b(4), keep = b(5);
        if (this.etc_idx !== e) return adv(1);
        if (this.cb & 0x800) {
          if (!this.flag(7, fl)) { const a = this.etc[e]; if (a) { if (!keep) a.flg &= ~1; this.work(3, a.prm[0]).gone = true; } this.setFlag(7, fl, true); this.setFlag(9, fl, false); }
        } else if (!this.flag(7, fl)) this.setFlag(9, fl, true);
        this.cb &= ~0x800;
        return adv(1);
      }
      case 0x0f: this.cb &= ~0x400; return adv(0);
      case 0x10: return adv(this.cb & 0x400 ? +(this.sb_id === b(1)) : 0);
      case 0x11: return adv(+this.host.hasItem(b(1)));
      case 0x12: {
        const v = b(1);
        if (v === 0 || v === 5) { this.cb &= ~0x40; this.cb |= 4; this.st |= 4; }
        else if (v === 1 || v === 4) { if (v === 4) this.cb &= ~0x40; this.cb &= ~4; this.st &= ~4; this.sp = 0xffffffff; }
        else if (v === 2) { this.cb &= ~4; this.st &= ~4; }
        else if (v === 3) { this.cb |= 0x44; this.st |= 4; }
        this.host.cine(v); return adv(1);
      }
      case 0x13: this.host.camSet(b(1), b(2), b(3)); return adv(1);
      case 0x14: this.evtOn(b(2), b(3)); return adv(1);
      case 0x1f: {
        if (b(1) === 0) { if (b(3) === 0) this.sp &= ~7; this.openMessage(b(2)); } else this.sp |= 7;
        return adv(1);
      }
      case 0x20: { const w = this.ent(b(2), b(1)); if (w) w.hidden = b(3) === 0; return adv(1); }
      case 0x22: { if (this.flag(3, u16(2))) this.work(1, b(1)).gone = true; return adv(1); }
      case 0x23: {
        const a = this.etc[b(4)];
        if (this.flag(7, u16(2))) { if (a && !b(5)) a.flg &= ~1; this.work(3, b(1)).gone = true; } else if (a) a.flg |= 1;
        return adv(1);
      }
      case 0x24: { const w = this.ent(b(1), b(2)); if (w) w.gone = b(3) === 0; return adv(1); }
      case 0x25: { const a = this.etc[b(1)]; if (a) { a.attr = u16(2); a.prm = [b(4), b(5), b(6), b(7)]; a.type = b(8); } return adv(1); }
      case 0x26: return adv(+(this.host.weapon() === b(1)));
      case 0x27: this.host.setWeapon(b(1)); return adv(1);
      case 0x31: this.host.loseItem(b(1)); return adv(1);
      case 0x33: this.host.door(u16(2), b(4), b(5), b(6), b(7)); this.sp = 0x48; this.cb |= 1; return adv(1);
      case 0x36: this.host.fade(((b(1) << 24) | (b(2) << 16) | (b(3) << 8) | b(4)) >>> 0, b(5)); return adv(1);
      case 0x37: this.rcase = b(1); return adv(1);
      case 0x38: {
        const N = (u16(4) << 16) + (b(3) ? 0x8000 : 0);
        const w = b(1) === 0 ? this.work(0, 0) : b(1) === 1 ? this.work(1, b(2)) : this.work(2, b(2));
        return adv(w.frm >= N ? 0 : 1);
      }
      case 0x5e: this.host.movie(b(1)); return adv(1);
      case 0x63: this.wpnl = Math.floor(Math.random() * 100) % Math.max(1, b(1)); return adv(1);
      case 0x65: {
        const k = b(1);
        t.work = this.work(k, k === 0 ? 0 : b(2)); t.work.scripted = true; t.cno = k === 1 || k === 2 ? b(3) : 0;
        if (k === 0) { t.work!.mtn = 42; t.work!.frm = 0; }
        return adv(1);
      }
      case 0x64: if ((b(1) === 0x80 || b(1) === 0x8b) && t.work) t.work.scripted = false; return adv(1);
      case 0x67: if ((b(1) === 0x80 || b(1) === 0x8f || b(1) === 0x8b) && t.work) t.work.scripted = false; return adv(1);
      case 0x69: this.common(t); return adv(1);
      case 0x81: { const busy = !!(this.st & 0x40000) || !!(this.st & 8); return adv(busy ? (b(1) ? 0 : 1) : (b(1) ? 1 : 0)); }
      case 0x9b: return adv(this.host.moviePlaying() ? 0 : 1);
      case 0xbc: { const k = this.tasks[b(1)]; if (k) k.status = 0; return adv(1); }
      // ---- flow control
      case 0xf3: case 0xfd: {
        t.data = this.p; const cp = t.lcond[t.loop];
        this.p = cp; const r = this.exec();
        if (r !== 0) { this.p = t.lstack[t.loop]; return 1; }
        this.p = t.data + 1; t.loop--; return op === 0xf3 ? 1 : 0;
      }
      case 0xf4: this.p += 1; return 1;
      case 0xf8: t.loop++; t.cnt[t.loop] = u16(2); this.p += 1; if (--t.cnt[t.loop] <= 0) { this.p += 3; t.loop--; } return 0;
      case 0xf9: if (--t.cnt[t.loop] <= 0) { this.p += 3; t.loop--; } return 0;
      case 0xfa: t.loop++; t.cnt3 = t.cnt2 = t.cnt[t.loop] = ((u16(2) << 16) >> 16); this.p += 4; t.lstack[t.loop] = this.p; return 1;
      case 0xfb: if (--t.cnt[t.loop] !== 0) { t.cnt2 = t.cnt[t.loop]; this.p = t.lstack[t.loop]; } else { this.p += 2; t.loop--; } return 1;
      case 0xfc: t.loop++; t.lcond[t.loop] = this.p + 2; this.p = this.p + b(1); t.lstack[t.loop] = this.p; return 1;
      case 0xfe: this.p += 1; return 0;
      case 0xff: t.status = 0; this.p += 2; return 0;
      default: return adv(1);
    }
  }
  private ent(kind: number, idx: number): Work | null { return kind <= 3 ? this.work(kind, kind === 0 ? 0 : idx) : null; }
  /** bhSetMessage + the message-closing flags of bhControlMessage */
  pendingMsg: number | null = null;
  openMessage(idx: number) {
    this.mes_sel = 0; this.st |= 0x200; this.st &= ~(0x80000 | 0x8000 | 0x4000 | 0x1000 | 0x400 | 0x800); this.cb &= ~(0x20000000 | 0x2000 | 0x1000);
    this.pendingMsg = idx; this.host.message(idx);
  }
  /** message closed by the player (sel = chosen answer or -1 when there was no question) */
  messageClosed(sel: number, fromExamine: boolean) {
    this.st &= ~0x200;
    if (sel >= 0) { this.mes_sel = sel; this.cb |= 0x1000; this.st |= 0x4000; }
    this.cb |= 0x2000;
    if (fromExamine) { this.cb |= 0x20000000; this.sp = 0xffffffff; this.st &= ~0x2204; }
    this.pendingMsg = null;
  }

  private common(t: Task) {
    const b = (o: number) => this.b(o), u16 = (o: number) => this.u16(o), w = t.work;
    const sub = b(1);
    if (!w) return;
    const part = () => { let q = w.parts.get(t.cno); if (!q) { q = {}; w.parts.set(t.cno, q); } return q; };
    const sgn = (v: number, neg: number) => (neg ? -v : v);
    switch (sub) {
      case 0x02: w.px += sgn(t.addp[0], t.bp[0]); w.py += sgn(t.addp[1], t.bp[1]); w.pz += sgn(t.addp[2], t.bp[2]); w.posSet = true; break;
      case 0x03: w.ax += sgn(t.adda[0], t.ba[0]); w.ay += sgn(t.adda[1], t.ba[1]); w.az += sgn(t.adda[2], t.ba[2]); w.angSet = true; break;
      case 0x05: t.addp = [b(2) * 0.01, b(3) * 0.01, b(4) * 0.01]; break;
      case 0x06: t.adda = [b(2) * D2R / 2, b(3) * D2R / 2, b(4) * D2R / 2]; break;
      case 0x07: w.px = sgn(u16(2) / 1000, t.bp[0]); w.py = sgn(u16(4) / 1000, t.bp[1]); w.pz = sgn(u16(6) / 1000, t.bp[2]); w.posSet = true; break;
      case 0x08: part().pos = [sgn(u16(2) / 1000, t.bp[0]), sgn(u16(4) / 1000, t.bp[1]), sgn(u16(6) / 1000, t.bp[2])]; break;
      case 0x09: part().ang = [sgn(b(2), t.ba[0]) * D2R, sgn(b(3), t.ba[1]) * D2R, sgn(b(4), t.ba[2]) * D2R]; break;
      case 0x0b: case 0x0f: w.ax = sgn(b(2), t.ba[0]) * D2R; w.ay = sgn(b(3), t.ba[1]) * D2R; w.az = sgn(b(4), t.ba[2]) * D2R; w.angSet = true; break;
      case 0x0c: t.bp = [b(2), b(3), b(4)]; break;
      case 0x0d: t.ba = [b(2), b(3), b(4)]; break;
      case 0x11: { const q = part(); const p = q.pos ?? [0, 0, 0]; q.pos = [p[0] + sgn(t.addp[0], t.bp[0]), p[1] + sgn(t.addp[1], t.bp[1]), p[2] + sgn(t.addp[2], t.bp[2])]; break; }
      case 0x12: { const q = part(); const a = q.ang ?? [0, 0, 0]; q.ang = [a[0] + sgn(t.adda[0], t.ba[0]), a[1] + sgn(t.adda[1], t.ba[1]), a[2] + sgn(t.adda[2], t.ba[2])]; break; }
      case 0x18: case 0x22: case 0x19: case 0x23: {
        w.add = MTN_ADD[b(2)] ?? 0x10000;
        if (sub === 0x18 || sub === 0x22) { w.mtnKind = b(3); w.mtn = b(4); w.frm = 0; if (sub === 0x22 && b(3) >= 2) w.frm = u16(8) << 16; }
        break;
      }
      case 0x1a: t.ips[b(2)] = [sgn(u16(4) / 1000, b(3) & 1), sgn(u16(6) / 1000, b(3) & 2), sgn(u16(8) / 1000, b(3) & 4)]; break;
      case 0x1b: t.ian[b(2)] = [sgn(b(4), b(3) & 1), sgn(b(5), b(3) & 2), sgn(b(6), b(3) & 4)]; break;
      case 0x1e: case 0x1f: case 0x1c: case 0x2b: case 0x2c: case 0x2d: {
        const fr = t.cnt3 ? t.cnt2 / t.cnt3 : 1, lin = b(2) !== 0;
        const k = lin ? fr : 0.5 * fr + 1.5 * fr * fr - fr * fr * fr;
        const mix = (A: number[], B: number[]) => [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k, A[2] + (B[2] - A[2]) * k];
        const doPos = sub === 0x1e || sub === 0x1c || sub === 0x2b || sub === 0x2c, doAng = sub === 0x1f || sub === 0x1c || sub === 0x2b || sub === 0x2d;
        const pm = sub === 0x2b || sub === 0x2c ? b(3) : 7, am = sub === 0x2b ? b(4) : sub === 0x2d ? b(3) : 7;
        if (doPos) { const P = mix(t.ips[1], t.ips[0]); if (t.cno === 0) { if (pm & 1) w.px = P[0]; if (pm & 2) w.py = P[1]; if (pm & 4) w.pz = P[2]; w.posSet = true; } else { const q = part(); const o = q.pos ?? [0, 0, 0]; q.pos = [pm & 1 ? P[0] : o[0], pm & 2 ? P[1] : o[1], pm & 4 ? P[2] : o[2]]; } }
        if (doAng) { const A = mix(t.ian[1], t.ian[0]).map((v) => v * D2R); if (t.cno === 0) { if (am & 1) w.ax = A[0]; if (am & 2) w.ay = A[1]; if (am & 4) w.az = A[2]; w.angSet = true; } else { const q = part(); const o = q.ang ?? [0, 0, 0]; q.ang = [am & 1 ? A[0] : o[0], am & 2 ? A[1] : o[1], am & 4 ? A[2] : o[2]]; } }
        break;
      }
      case 0x28: w.frm = u16(2) << 16; break;
      case 0x30: t.ips[b(2)] = t.cno === 0 ? [w.px, w.py, w.pz] : [...(part().pos ?? [0, 0, 0])]; break;
      case 0x31: t.ian[b(2)] = [w.ax / D2R, w.ay / D2R, w.az / D2R]; break;
    }
  }
}
function cmp(v0: number, op: number, v1: number) {
  switch (op) { case 0: return +(v0 === v1); case 1: return +(v0 > v1); case 2: return +(v0 >= v1); case 3: return +(v0 < v1); case 4: return +(v0 <= v1); case 5: return +(v0 !== v1); }
  return 0;
}
/** ATR record from the room JSON (type/flags strings as exported by conv/room.py) */
export function atrFrom(e: { type: string; flags: string; x: number; y: number; z: number; sx: number; sy: number; sz: number; extra: number }): Atr {
  const t = parseInt(e.type, 16) >>> 0, f = parseInt(e.flags, 16) >>> 0, x = e.extra >>> 0;
  const attr = (((f & 0xff) << 24) | ((f & 0xff00) << 8) | ((f >>> 8) & 0xff00) | (f >>> 24)) >>> 0;
  return { flg: t & 0xff, type: (t >> 8) & 0xff, id: (t >> 16) & 0xff, flr: t >>> 24, attr, x: e.x, y: e.y, z: e.z, w: e.sx, h: e.sy, d: e.sz, prm: [x & 0xff, (x >> 8) & 0xff, (x >> 16) & 0xff, x >>> 24] };
}
