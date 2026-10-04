import * as THREE from 'three';
import { assetUrl } from './assets';
/** UI / door / weapon sounds already decoded from the PS3 banks (sys, door_000, arms_000). */
const SE = ['door_knob', 'door_open', 'door_close', 'typewriter', 'gun_shot', 'gun_shell', 'gun_empty', 'gun_rl1', 'gun_rl2', 'gun_rl3'];
/** SE banks converted by conv/sound.py (sound/se/**: .spc samples + .srq request lists). */
interface BankSample { f: string; n: number; sr: number; loop?: [number, number] }
interface BankList { s: number; v: number; p?: number; l?: number }
interface Bank { samples: BankSample[]; lists: Record<string, BankList> }
const ROOM_BANKS = new Set(['000', '002', '003', '004', '005', '006', '007', '008', '009']);
const BG_BANKS = new Set(['002', '003', '005', '008', '016']);
const PC_BANKS = ['000_0', '003_0', '003_1', '005_0', '006_0', '007_0', '010_0', '014_0'];
/** ADX / sound-driver volume curve (adxwrap.c AdxVolTbl): volume units 0..-127 -> 0.1 dB */
const VOLTBL = (() => { const t: number[] = []; for (let i = 0; i < 128; i++) t.push(i <= 32 ? -2 * i : i <= 64 ? -64 - 6 * (i - 32) : i <= 96 ? -256 - 8 * (i - 64) : i < 127 ? -512 - 16 * (i - 96) : -999); return t; })();
const unitsDb = (u: number) => VOLTBL[Math.max(0, Math.min(127, Math.round(-u)))] / 10;
const dbGain = (db: number) => (db <= -99 ? 0 : Math.pow(10, db / 20));
/** sdfunc.c Get3DSoundParameter tables: distance (game units, 0.1 m) -> volume, angle -> pan / rear attenuation */
const PAN360 = [0, -2, -4, -6, -8, -10, -12, -14, -16, -18, -20, -22, -24, -26, -28, -30, -32, -32, -30, -28, -26, -24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -4, -2, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 0];
const PAN360VOL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -2, -4, -6, -8, -10, -12, -14, -16, -18, -20, -22, -24, -26, -28, -30, -32, -34, -36, -38, -38, -36, -34, -32, -30, -28, -26, -24, -22, -20, -18, -16, -14, -12, -10, -8, -6, -4, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const vol3d = (d: number) => (d < 30 ? 0 : d < 40 ? -1 : Math.max(-87, -2 - Math.floor((d - 40) / 5)));
/** footstep pitch tables (CallPlayerFootStepSeEx); unit assumed 1/1024 semitone */
const WALK_PITCH = [0, 256, 256, 0], RUN_PITCH = [512, 768, 768, 512];
interface Voice { srcs: AudioBufferSourceNode[]; gain: GainNode; pan: StereoPannerNode; pos?: THREE.Vector3; base: number }
const pad = (n: number, w: number) => String(n).padStart(w, '0');

export class Audio {
  ctx: AudioContext | null = null;
  master!: GainNode; sfx!: GainNode; music!: GainNode;
  private buffers = new Map<string, AudioBuffer>();
  private bufP = new Map<string, Promise<AudioBuffer | null>>();
  private banks = new Map<string, Promise<Bank | null>>();
  private slots = new Map<string, Voice>();
  private rmBank = ''; private bgBank = ''; private pcBank = '';
  private bgmIdx: Promise<Record<string, { f: string; loop?: [number, number] }>> | null = null;
  private bgmNo = -1; private bgmVol = -127; private bgmV: { src: AudioBufferSourceNode; gain: GainNode } | null = null;
  private bgCur: (number | null)[] = [null, null, null];
  private footSw = [0, 0, 0];
  /** listener (camera) used for the 3D volume / pan */
  listener: THREE.Camera | null = null;
  init() {
    if (this.ctx) return;
    try { this.ctx = new AudioContext(); } catch { return; }
    const c = this.ctx;
    this.master = c.createGain(); this.master.gain.value = 0.9; this.master.connect(c.destination);
    this.sfx = c.createGain(); this.sfx.connect(this.master); this.music = c.createGain(); this.music.connect(this.master);
    const resume = () => this.ctx?.state === 'suspended' && this.ctx.resume();
    addEventListener('keydown', resume); addEventListener('pointerdown', resume);
    for (const n of SE) this.buf(`audio/${n}.ogg`);
    this.bank('sys');
  }
  private buf(p: string): Promise<AudioBuffer | null> {
    let pr = this.bufP.get(p);
    if (!pr) {
      pr = (async () => {
        try { const r = await fetch(assetUrl(p)); if (!r.ok) return null; const b = await this.ctx!.decodeAudioData(await r.arrayBuffer()); this.buffers.set(p, b); return b; } catch { return null; }
      })();
      this.bufP.set(p, pr);
    }
    return pr;
  }
  private bank(name: string): Promise<Bank | null> {
    let pr = this.banks.get(name);
    if (!pr) {
      pr = (async () => {
        try {
          const r = await fetch(assetUrl(`audio/se/${name}.json`)); if (!r.ok) return null; const b = (await r.json()) as Bank;
          if (this.ctx) for (const s of b.samples) this.buf(`audio/se/${s.f}.ogg`);
          return b;
        } catch { return null; }
      })();
      this.banks.set(name, pr);
    }
    return pr;
  }
  /** room change: per-room SE banks (bank 2 = sound/se/room/rm_SRR_C + rm_common, bank 3 = sound/se/bg/bg_SRR_C,
   *  footsteps = sound/se/pc/pc_SRR_C). The PS3 room -> pc bank table is in the encrypted EBOOT: the nearest
   *  pc bank with a number <= the room is used (pc_003_1 for case 1 of room 03). */
  room(stg: number, room: number, rcase: number) {
    if (!this.ctx) return;
    const srr = `${stg}${pad(room, 2)}`;
    this.rmBank = ROOM_BANKS.has(srr) ? `rm_${srr}_0` : '';
    const bg = BG_BANKS.has(srr) ? `bg_${srr}_0` : '';
    // the ambience keeps playing into rooms with the same bank 3 samples (bg_002/003/005/008 are identical)
    if (!bg) for (let i = 0; i < 3; i++) this.bgSeOff(i);
    this.bgBank = bg;
    let pc = PC_BANKS[0];
    for (const b of PC_BANKS) if (+b.slice(0, 3) <= +srr && (b.endsWith('_0') || +b[4] === rcase)) pc = b;
    if (PC_BANKS.includes(`${pad(+srr, 3)}_${rcase}`)) pc = `${pad(+srr, 3)}_${rcase}`;
    // the yard rooms 002 / 003 (burning car, cemetery) use the footstep set of the next rooms (pc_005_0: floor 3 = gravel
    // pc_003_0/01), as heard in the original; the PS3 room -> pc table itself is not readable
    if (srr === '002' || srr === '003') pc = '005_0';
    this.pcBank = `pc_${pc}`;
    for (const k of [...this.slots.keys()]) if (!k.startsWith('bg')) this.stop(k);
    for (const b of [this.rmBank, this.bgBank, this.pcBank, 'rm_common']) if (b) this.bank(b);
  }
  /** 3D volume (units) / pan of a world point as seen by the camera (Get3DSoundParameter) */
  private spatial(pos: THREE.Vector3 | undefined): { u: number; pan: number } {
    const cam = this.listener; if (!pos || !cam) return { u: 0, pan: 0 };
    const v = pos.clone().applyMatrix4(cam.matrixWorldInverse);
    const d = v.length() * 10; let deg = (Math.atan2(-v.x, -v.z) * 180) / Math.PI; if (deg < 0) deg += 360;
    const i = Math.min(67, Math.floor(deg / 5));
    return { u: vol3d(d) + PAN360VOL[i], pan: PAN360[i] / 128 };
  }
  /** play request list `list` of a bank (and the list it links to, e.g. the right channel of a stereo ambience) */
  private async playList(bank: string, list: number, key: string | null, o: { u?: number; pos?: THREE.Vector3; pan?: number; cents?: number; loop?: boolean; fade?: [number, number, number] } = {}) {
    const c = this.ctx; if (!c || !bank) return;
    if (bank.startsWith('rm_') && list >= 64) bank = 'rm_common';
    const b = await this.bank(bank); if (!b) return;
    const L = b.lists[list]; if (!L || !b.samples[L.s]) return;
    if (key) this.stop(key);
    const gain = c.createGain(), pan = c.createStereoPanner(); gain.connect(pan).connect(this.sfx);
    const voice: Voice = { srcs: [], gain, pan, pos: o.pos?.clone(), base: o.u ?? 0 };
    const sp = this.spatial(voice.pos);
    pan.pan.value = Math.max(-1, Math.min(1, (o.pan ?? 0) + sp.pan));
    if (o.fade) this.fadeUnits(gain, o.fade[0] + sp.u, o.fade[1] + sp.u, o.fade[2]);
    else gain.gain.value = dbGain(unitsDb(voice.base + sp.u));
    if (key) this.slots.set(key, voice);
    for (let l: BankList | undefined = L, n = 0; l && n < 4; l = l.l !== undefined ? b.lists[l.l] : undefined, n++) {
      const s = b.samples[l.s]; if (!s) continue;
      const buf = this.buffers.get(`audio/se/${s.f}.ogg`) ?? (await this.buf(`audio/se/${s.f}.ogg`)); if (!buf) continue;
      if (key && this.slots.get(key) !== voice) return;   // stopped while loading
      const src = c.createBufferSource(); src.buffer = buf;
      if (o.cents) src.detune.value = o.cents;
      if (s.loop && o.loop !== false) { src.loop = true; src.loopStart = s.loop[0] / s.sr; src.loopEnd = Math.min(buf.duration, s.loop[1] / s.sr); }
      const g = c.createGain(); g.gain.value = dbGain(l.v);
      let out: AudioNode = g;
      if (l.p !== undefined) { const p2 = c.createStereoPanner(); p2.pan.value = l.p < 128 ? (l.p - 64) / 64 : 1; g.connect(p2); out = p2; }
      src.connect(g); out.connect(gain); src.start();
      voice.srcs.push(src);
      src.onended = () => { const i = voice.srcs.indexOf(src); if (i >= 0) voice.srcs.splice(i, 1); if (!voice.srcs.length && key && this.slots.get(key) === voice) this.slots.delete(key); };
    }
  }
  /** volume ramp in driver units (linear in units like RequestSeFadeFunctionEx, one step per 1/30 s) */
  private fadeUnits(g: GainNode, from: number, to: number, frames: number) {
    const c = this.ctx!; const n = Math.max(2, Math.round(frames) + 1);
    if (frames <= 0) { g.gain.value = dbGain(unitsDb(to)); return; }
    const curve = new Float32Array(n); for (let i = 0; i < n; i++) curve[i] = dbGain(unitsDb(from + ((to - from) * i) / (n - 1)));
    g.gain.cancelScheduledValues(c.currentTime); g.gain.setValueCurveAtTime(curve, c.currentTime, frames / 30);
  }
  stop(key: string, fadeFrames = 0) {
    const v = this.slots.get(key); if (!v) return; this.slots.delete(key);
    const c = this.ctx!;
    if (fadeFrames > 0) { v.gain.gain.cancelScheduledValues(c.currentTime); v.gain.gain.setValueAtTime(v.gain.gain.value, c.currentTime); v.gain.gain.linearRampToValueAtTime(0, c.currentTime + fadeFrames / 30); for (const s of v.srcs) s.stop(c.currentTime + fadeFrames / 30); }
    else for (const s of v.srcs) { try { s.stop(); } catch { /* */ } }
  }
  /** event SE (bank 2) on event slot 0-4: CallNativeEventSe; vol = [start, last, frames] in driver units */
  eventSe(slot: number, seNo: number, pos?: THREE.Vector3, vol?: [number, number, number]) {
    const fade = vol && vol[1] !== -1 ? vol : undefined;
    this.playList(this.rmBank, seNo & 0xff, `evt${slot}`, { pos, fade, u: vol ? vol[0] : 0 });
  }
  eventSeOff(slot: number) { this.stop(`evt${slot}`); }
  /** background (ambient) SE, bank 3, slot 0-2: CallBackGroundSeEx / CallBackGroundSe2 (same SeNo keeps playing) */
  bgSe(slot: number, seNo: number, fadeIn = 0) {
    if (this.bgCur[slot] === seNo && this.slots.has(`bg${slot}`)) return;
    this.bgCur[slot] = seNo;
    const bank = ((seNo >> 8) & 0xf) === 3 ? this.bgBank : this.rmBank;
    this.playList(bank, seNo & 0xff, `bg${slot}`, fadeIn ? { fade: [-127, 0, fadeIn * 0.3] } : {});
  }
  bgSeOff(slot: number, fade = 0) { this.bgCur[slot] = null; this.stop(`bg${slot}`, fade); }
  /** object SE (RegistObjectSe): looping positional sound of the room's bank 2 */
  objSe(no: number, pos: THREE.Vector3, seNo: number) { this.playList(this.rmBank, seNo & 0xff, `obj${no}`, { pos }); }
  objSeOff(no: number) { this.stop(`obj${no}`); }
  /** player footstep (CallPlayerFootStepSeEx): pc bank list = floor sound type, random pitch, 2 alternating slots per walker */
  foot(floor: number, run: boolean, pos?: THREE.Vector3, id = 0, vol?: [number, number, number]) {
    const tbl = run ? RUN_PITCH : WALK_PITCH, p = tbl[Math.floor(Math.random() * 4) & 3];
    this.footSw[id] ^= 1;
    this.playList(this.pcBank, Math.max(0, Math.min(4, floor)), `foot${id}_${this.footSw[id]}`, { pos, cents: (p / 1024) * 100, fade: vol && vol[1] !== -1 ? vol : undefined, u: vol ? vol[0] : 0 });
  }
  /** player action SE (CallPlayerActionSe: bank 2 list SeNo of the pc bank) */
  action(seNo: number, pos?: THREE.Vector3) { this.playList(this.pcBank, seNo & 0xff, 'act', { pos }); }
  /** BGM (sound/bgm, bgm_all.stq request numbers). vol in ADX units (default -45), fade in 1/100 s */
  async bgm(no: number, fadeIn = 0, vol = -45) {
    const c = this.ctx; if (!c) return;
    if (no === this.bgmNo && this.bgmV) { if (vol !== this.bgmVol) { this.bgmVol = vol; this.bgmV.gain.gain.setTargetAtTime(dbGain(unitsDb(vol)), c.currentTime, 0.3); } return; }
    this.bgmOff(fadeIn ? fadeIn : 0); this.bgmNo = no; this.bgmVol = vol;
    this.bgmIdx ??= fetch(assetUrl('audio/bgm.json')).then((r) => r.json()).catch(() => ({}));
    const e = (await this.bgmIdx)[no]; if (!e || this.bgmNo !== no) return;
    const buf = await this.buf(`audio/bgm/${e.f}.ogg`); if (!buf || this.bgmNo !== no) return;
    const src = c.createBufferSource(); src.buffer = buf;
    if (e.loop) { src.loop = true; src.loopStart = e.loop[0]; src.loopEnd = Math.min(buf.duration, e.loop[1]); }
    const gain = c.createGain(); src.connect(gain).connect(this.music);
    const target = dbGain(unitsDb(vol));
    if (fadeIn) { gain.gain.setValueAtTime(0, c.currentTime); gain.gain.linearRampToValueAtTime(target, c.currentTime + fadeIn / 100); } else gain.gain.value = target;
    src.start(); this.bgmV = { src, gain };
    src.onended = () => { if (this.bgmV?.src === src) { this.bgmV = null; } };
  }
  /** room BGM (PlayBgm2): same number keeps playing */
  bgm2(no: number) { this.bgm(no, 100); }
  bgmOff(fadeOut = 0) {
    const c = this.ctx, v = this.bgmV; this.bgmNo = -1; this.bgmV = null; if (!c || !v) return;
    const t = c.currentTime + fadeOut / 100;
    v.gain.gain.cancelScheduledValues(c.currentTime); v.gain.gain.setValueAtTime(v.gain.gain.value, c.currentTime);
    if (fadeOut > 0) v.gain.gain.linearRampToValueAtTime(0, t);
    v.src.stop(fadeOut > 0 ? t : 0);
  }
  /** cutscene voice (PlayVoice on ADX slot 1, sound/voice/disc1p.stq request = VoiceNo); mode 1 = centre, volume 0 */
  private voiceIdx: Promise<Record<string, string>> | null = null;
  private voiceV: { src: AudioBufferSourceNode; gain: GainNode; no: number } | null = null;
  private voiceNo = -1;
  async voice(no: number, fadeIn = 0) {
    const c = this.ctx; if (!c) return;
    this.voiceOff(); this.voiceNo = no;
    this.voiceIdx ??= fetch(assetUrl('audio/voice.json')).then((r) => r.json()).catch(() => ({}));
    const nm = (await this.voiceIdx)[no]; if (!nm || this.voiceNo !== no) return;
    const buf = await this.buf(`audio/voice/${nm}.ogg`); if (!buf || this.voiceNo !== no) return;
    const src = c.createBufferSource(); src.buffer = buf;
    const gain = c.createGain(); src.connect(gain).connect(this.sfx);
    if (fadeIn) { gain.gain.setValueAtTime(0, c.currentTime); gain.gain.linearRampToValueAtTime(1, c.currentTime + fadeIn / 100); }
    src.start(); this.voiceV = { src, gain, no };
    src.onended = () => { if (this.voiceV?.src === src) this.voiceV = null; };
  }
  /** preload the voices of a room's scripts */
  preloadVoices(nos: number[]) {
    if (!this.ctx) return;
    this.voiceIdx ??= fetch(assetUrl('audio/voice.json')).then((r) => r.json()).catch(() => ({}));
    this.voiceIdx.then((ix) => { for (const n of nos) if (ix[n]) this.buf(`audio/voice/${ix[n]}.ogg`); });
  }
  voiceOff(fadeOut = 0) {
    const c = this.ctx, v = this.voiceV; this.voiceNo = -1; this.voiceV = null; if (!c || !v) return;
    if (fadeOut > 0) { v.gain.gain.setValueAtTime(v.gain.gain.value, c.currentTime); v.gain.gain.linearRampToValueAtTime(0, c.currentTime + fadeOut / 100); v.src.stop(c.currentTime + fadeOut / 100); }
    else try { v.src.stop(); } catch { /* */ }
  }
  /** keep the 3D volume / pan of looping positional sounds up to date */
  update() {
    for (const [k, v] of this.slots) if (v.pos && k.startsWith('obj')) {
      const sp = this.spatial(v.pos); v.gain.gain.setTargetAtTime(dbGain(unitsDb(v.base + sp.u)), this.ctx!.currentTime, 0.05); v.pan.pan.setTargetAtTime(sp.pan, this.ctx!.currentTime, 0.05);
    }
  }
  play(name: string, vol = 1, rate = 1, delay = 0): number {
    const c = this.ctx, b = this.buffers.get(`audio/${name}.ogg`); if (!c || !b) return 0;
    const s = c.createBufferSource(); s.buffer = b; s.playbackRate.value = rate;
    const g = c.createGain(); g.gain.value = vol; s.connect(g).connect(this.sfx); s.start(c.currentTime + delay);
    return b.duration / rate;
  }
  se(name: 'door' | 'doorClose' | 'locked' | 'pickup' | 'menu' | 'cursor' | 'cancel' | 'error' | 'typewriter' | 'lighter' | 'knife' | 'bite' | 'shot' | 'empty' | 'reload') {
    switch (name) {
      case 'door': { const d = this.play('door_knob'); this.play('door_open', 0.9, 1, Math.max(0.25, d * 0.6)); break; }
      case 'doorClose': this.play('door_close'); break;
      case 'locked': this.play('door_knob'); this.play('door_knob', 1, 1.05, 0.35); break;
      // system bank (sound/se/core/sys, CallSystemSe): 0 cancel, 1 invalid, 2 cursor, 3 decide
      case 'pickup': case 'menu': this.sys(3); break;
      case 'cursor': this.sys(2); break;
      case 'cancel': this.sys(0); break;
      case 'error': this.sys(1); break;
      case 'typewriter': this.play('typewriter'); break;
      case 'lighter': this.play('door_knob', 0.35, 2.2); break; // short metallic click for the lighter lid
      case 'knife': this.swish(); break;
      // handgun bank (sound/se/arms/arms_000): 05 shot, 06 shell casing, 04 empty trigger, 01-03 reload
      case 'shot': this.play('gun_shot'); this.play('gun_shell', 0.6, 1, 0.35); break;
      case 'empty': this.play('gun_empty'); break;
      case 'reload': this.play('gun_rl1', 1, 1, 0.1); this.play('gun_rl2', 1, 1, 0.4); this.play('gun_rl3', 1, 1, 0.75); break;
    }
  }
  private sysSw = 0;
  /** CallSystemSe(no): system bank request list, two alternating voices */
  sys(no: number) { this.sysSw ^= 1; this.playList('sys', no, `sys${this.sysSw}`); }
  /** knife swing: band-passed noise sweep */
  swish() {
    const c = this.ctx; if (!c) return;
    const n = Math.floor(c.sampleRate * 0.22), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) { const t = i / n; d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) ** 2; }
    const s = c.createBufferSource(); s.buffer = b;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 2.5;
    f.frequency.setValueAtTime(900, c.currentTime); f.frequency.exponentialRampToValueAtTime(3800, c.currentTime + 0.2);
    const g = c.createGain(); g.gain.value = 0.55;
    s.connect(f).connect(g).connect(this.sfx); s.start();
  }
}
