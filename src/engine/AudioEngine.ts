import * as THREE from 'three';

/**
 * Procedural WebAudio engine: every sound is synthesised (no sample files).
 * 3D sounds use HRTF PannerNodes; the listener follows the camera.
 */
export interface GunSound { thump: number; crack: number; tail: number; pitch: number; }

export class AudioEngine {
  ctx: AudioContext | null = null;
  private master!: GainNode;
  private sfx!: GainNode;
  private music!: GainNode;
  private amb!: GainNode;
  private noise!: AudioBuffer;
  private saveMusic: { stop: () => void } | null = null;
  volume = 0.8;
  private loops: { stop: () => void }[] = [];

  setVolume(v: number): void { this.volume = v; if (this.master) this.master.gain.value = v; }
  stopAllLoops(): void { this.loops.forEach((l) => l.stop()); this.loops = []; }

  init(): void {
    if (this.ctx) { this.ctx.resume(); return; }
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain(); this.master.gain.value = this.volume; this.master.connect(ctx.destination);
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
    comp.connect(this.master);
    this.sfx = ctx.createGain(); this.sfx.connect(comp);
    this.music = ctx.createGain(); this.music.gain.value = 0.35; this.music.connect(comp);
    this.amb = ctx.createGain(); this.amb.gain.value = 0.5; this.amb.connect(comp);
    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }

  updateListener(cam: THREE.Camera): void {
    if (!this.ctx) return;
    const l = this.ctx.listener;
    const p = cam.getWorldPosition(new THREE.Vector3());
    const f = cam.getWorldDirection(new THREE.Vector3());
    const t = this.ctx.currentTime;
    if (l.positionX) {
      l.positionX.setTargetAtTime(p.x, t, 0.02); l.positionY.setTargetAtTime(p.y, t, 0.02); l.positionZ.setTargetAtTime(p.z, t, 0.02);
      l.forwardX.setTargetAtTime(f.x, t, 0.02); l.forwardY.setTargetAtTime(f.y, t, 0.02); l.forwardZ.setTargetAtTime(f.z, t, 0.02);
      l.upX.value = 0; l.upY.value = 1; l.upZ.value = 0;
    } else {
      (l as any).setPosition(p.x, p.y, p.z);
      (l as any).setOrientation(f.x, f.y, f.z, 0, 1, 0);
    }
  }

  private out(pos?: THREE.Vector3, bus?: GainNode): AudioNode {
    const ctx = this.ctx!;
    if (!pos) return bus ?? this.sfx;
    const p = ctx.createPanner();
    p.panningModel = 'HRTF';
    p.distanceModel = 'inverse';
    p.refDistance = 1.5;
    p.maxDistance = 60;
    p.rolloffFactor = 1.2;
    p.positionX.value = pos.x; p.positionY.value = pos.y; p.positionZ.value = pos.z;
    p.connect(bus ?? this.sfx);
    return p;
  }

  private noiseBurst(dest: AudioNode, t0: number, dur: number, type: BiquadFilterType, freq: number, q: number, gain: number, freqEnd?: number): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = 0.8 + Math.random() * 0.4;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(freq, t0); f.Q.value = q;
    if (freqEnd) f.frequency.exponentialRampToValueAtTime(freqEnd, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    src.connect(f).connect(g).connect(dest);
    src.start(t0, Math.random());
    src.stop(t0 + dur + 0.05);
  }

  private tone(dest: AudioNode, t0: number, dur: number, type: OscillatorType, f0: number, f1: number, gain: number): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t0);
    o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    o.connect(g).connect(dest);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  gunshot(s: GunSound, pos?: THREE.Vector3): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, d = this.out(pos);
    this.tone(d, t, 0.18 * s.pitch, 'sine', 140 / s.pitch, 38, s.thump);
    this.noiseBurst(d, t, 0.08, 'highpass', 2200 * s.pitch, 0.7, s.crack);
    this.noiseBurst(d, t, s.tail, 'lowpass', 1800, 0.5, s.crack * 0.45, 200);
    // concrete slapback
    this.noiseBurst(d, t + 0.09, s.tail * 0.8, 'bandpass', 700, 0.6, s.crack * 0.12, 250);
  }

  explosion(pos: THREE.Vector3): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, d = this.out(pos);
    this.tone(d, t, 1.2, 'sine', 90, 20, 1.2);
    this.noiseBurst(d, t, 1.6, 'lowpass', 2500, 0.5, 1.1, 90);
  }

  click(high = false): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.noiseBurst(this.sfx, t, 0.03, 'bandpass', high ? 4200 : 2600, 4, 0.35);
  }

  reload(duration: number): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.noiseBurst(this.sfx, t + 0.05, 0.05, 'bandpass', 1800, 3, 0.4);
    this.noiseBurst(this.sfx, t + duration * 0.55, 0.05, 'bandpass', 2400, 3, 0.4);
    this.noiseBurst(this.sfx, t + duration * 0.9, 0.06, 'bandpass', 3200, 5, 0.5);
  }

  knife(pos?: THREE.Vector3): void {
    if (!this.ctx) return;
    this.noiseBurst(this.out(pos), this.ctx.currentTime, 0.16, 'bandpass', 3000, 1.5, 0.3, 7000);
  }

  flesh(pos: THREE.Vector3, heavy = false): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, d = this.out(pos);
    this.noiseBurst(d, t, heavy ? 0.3 : 0.12, 'lowpass', heavy ? 900 : 1400, 1, heavy ? 0.9 : 0.5, 120);
    this.tone(d, t, 0.1, 'sine', heavy ? 90 : 160, 50, 0.4);
  }

  ricochet(pos: THREE.Vector3): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, d = this.out(pos);
    this.noiseBurst(d, t, 0.06, 'highpass', 3000, 1, 0.25);
    if (Math.random() < 0.3) this.tone(d, t, 0.25, 'sine', 3000 + Math.random() * 2000, 1200, 0.05);
  }

  footstep(pos: THREE.Vector3, run: boolean, wet: boolean): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, d = this.out(pos);
    this.noiseBurst(d, t, run ? 0.09 : 0.07, 'lowpass', wet ? 2500 : 900, 1, run ? 0.4 : 0.22);
    if (wet) this.noiseBurst(d, t + 0.02, 0.12, 'bandpass', 3500, 2, 0.08);
  }

  groan(pos: THREE.Vector3, pitch = 1, long = false): void {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime, d = this.out(pos);
    const dur = long ? 1.8 : 0.9 + Math.random() * 0.6;
    const o = ctx.createOscillator(); o.type = 'sawtooth';
    const base = (70 + Math.random() * 30) * pitch;
    o.frequency.setValueAtTime(base, t);
    o.frequency.linearRampToValueAtTime(base * (0.7 + Math.random() * 0.2), t + dur);
    const lfo = ctx.createOscillator(); lfo.frequency.value = 5 + Math.random() * 6;
    const lg = ctx.createGain(); lg.gain.value = base * 0.08; lfo.connect(lg).connect(o.frequency);
    const f1 = ctx.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 500 + Math.random() * 300; f1.Q.value = 4;
    const f2 = ctx.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.value = 1100 + Math.random() * 400; f2.Q.value = 6;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.35, t + 0.15); g.gain.linearRampToValueAtTime(0.0001, t + dur);
    o.connect(f1).connect(g); o.connect(f2).connect(g); g.connect(d);
    this.noiseBurst(d, t, dur, 'bandpass', 800, 1, 0.08);
    o.start(t); lfo.start(t); o.stop(t + dur); lfo.stop(t + dur);
  }

  pickup(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.tone(this.sfx, t, 0.15, 'triangle', 660, 660, 0.15);
    this.tone(this.sfx, t + 0.09, 0.25, 'triangle', 990, 990, 0.12);
  }

  /** Music-box melody (plucked comb tones) — plays ~5 s. */
  melody(): void {
    if (!this.ctx) return;
    const t0 = this.ctx.currentTime + 0.1;
    const notes = [76, 79, 83, 81, 79, 76, 74, 76, 79, 78, 74, 71, 72, 76, 79, 83];
    notes.forEach((n, i) => {
      const f = 440 * Math.pow(2, (n - 69) / 12);
      this.tone(this.sfx, t0 + i * 0.3, 0.9, 'sine', f, f, 0.1);
      this.tone(this.sfx, t0 + i * 0.3, 0.4, 'triangle', f * 2, f * 2, 0.025);
    });
  }

  ui(): void {
    if (!this.ctx) return;
    this.tone(this.sfx, this.ctx.currentTime, 0.06, 'square', 1200, 900, 0.05);
  }

  /** Ambience: wind + low drone + distant thunder. */
  startAmbience(): void {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const src = ctx.createBufferSource(); src.buffer = this.noise; src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 420;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.08; const lg = ctx.createGain(); lg.gain.value = 220;
    lfo.connect(lg).connect(f.frequency);
    const g = ctx.createGain(); g.gain.value = 0.25;
    src.connect(f).connect(g).connect(this.amb);
    src.start(); lfo.start();
    const drone = ctx.createOscillator(); drone.type = 'sine'; drone.frequency.value = 43;
    const dg = ctx.createGain(); dg.gain.value = 0.12; drone.connect(dg).connect(this.amb); drone.start();
    const thunder = () => {
      if (!this.ctx) return;
      const t = ctx.currentTime;
      this.noiseBurst(this.amb, t, 3.5, 'lowpass', 300, 0.7, 0.6, 60);
      setTimeout(thunder, 18000 + Math.random() * 30000);
    };
    setTimeout(thunder, 9000);
  }

  setIndoor(indoor: boolean): void {
    if (!this.ctx) return;
    this.amb.gain.setTargetAtTime(indoor ? 0.18 : 0.5, this.ctx.currentTime, 0.8);
  }

  /** Looping crackle for a fire; returns stop(). */
  fireLoop(pos: THREE.Vector3): { stop: () => void } {
    if (!this.ctx) return { stop: () => {} };
    const ctx = this.ctx, d = this.out(pos);
    const src = ctx.createBufferSource(); src.buffer = this.noise; src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 700;
    const g = ctx.createGain(); g.gain.value = 0.35;
    src.connect(f).connect(g).connect(d); src.start();
    let alive = true;
    const crackle = () => {
      if (!alive || !this.ctx) return;
      this.noiseBurst(d, ctx.currentTime, 0.03, 'highpass', 2500, 1, 0.3 * Math.random());
      setTimeout(crackle, 40 + Math.random() * 180);
    };
    crackle();
    const h = { stop: () => { if (!alive) return; alive = false; g.gain.setTargetAtTime(0, ctx.currentTime, 0.3); src.stop(ctx.currentTime + 1.5); } };
    this.loops.push(h);
    return h;
  }

  /** Calm save-room theme (soft pad chords). */
  saveRoom(on: boolean): void {
    if (!this.ctx) return;
    if (!on) { this.saveMusic?.stop(); this.saveMusic = null; return; }
    if (this.saveMusic) return;
    const ctx = this.ctx;
    const g = ctx.createGain(); g.gain.value = 0; g.connect(this.music);
    g.gain.setTargetAtTime(0.5, ctx.currentTime, 1.5);
    const chords = [[220, 261.6, 329.6], [196, 246.9, 293.7], [174.6, 220, 261.6], [196, 246.9, 329.6]];
    const oscs: OscillatorNode[] = [];
    for (let i = 0; i < 3; i++) {
      const o = ctx.createOscillator(); o.type = 'sine';
      const og = ctx.createGain(); og.gain.value = 0.18;
      o.connect(og).connect(g); o.start(); oscs.push(o);
    }
    let idx = 0;
    const step = () => {
      chords[idx % 4].forEach((f, i) => oscs[i].frequency.setTargetAtTime(f, ctx.currentTime, 0.4));
      idx++;
    };
    step();
    const iv = setInterval(step, 3200);
    this.saveMusic = { stop: () => { clearInterval(iv); g.gain.setTargetAtTime(0, ctx.currentTime, 0.8); oscs.forEach((o) => o.stop(ctx.currentTime + 3)); } };
  }

  heartbeat(rate: number): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.tone(this.sfx, t, 0.12, 'sine', 55, 40, 0.5 * rate);
    this.tone(this.sfx, t + 0.18, 0.12, 'sine', 50, 38, 0.35 * rate);
  }
}

export const audio = new AudioEngine();
