import { assetUrl } from './assets';
const SE = ['door_knob', 'door_open', 'door_close', 'step1', 'step2', 'typewriter', 'cursor', 'confirm', 'cancel'];
/** Original sound effects (decoded from the PS3 ATRAC3 banks). No BGM. */
export class Audio {
  ctx: AudioContext | null = null;
  master!: GainNode;
  private stepT = 0; private stepN = 0;
  private buffers = new Map<string, AudioBuffer>();
  init() {
    if (this.ctx) return;
    try { this.ctx = new AudioContext(); } catch { return; }
    this.master = this.ctx.createGain(); this.master.gain.value = 0.8; this.master.connect(this.ctx.destination);
    const resume = () => this.ctx?.state === 'suspended' && this.ctx.resume();
    addEventListener('keydown', resume); addEventListener('pointerdown', resume);
    for (const n of SE) this.load(n);
  }
  private async load(n: string) {
    try { const r = await fetch(assetUrl(`audio/${n}.ogg`)); if (!r.ok) return; this.buffers.set(n, await this.ctx!.decodeAudioData(await r.arrayBuffer())); } catch { /* ignore */ }
  }
  room(_id: string) { /* no BGM in the prison */ }
  play(name: string, vol = 1, rate = 1, delay = 0): number {
    const c = this.ctx, b = this.buffers.get(name); if (!c || !b) return 0;
    const s = c.createBufferSource(); s.buffer = b; s.playbackRate.value = rate;
    const g = c.createGain(); g.gain.value = vol; s.connect(g).connect(this.master); s.start(c.currentTime + delay);
    return b.duration / rate;
  }
  se(name: 'door' | 'doorClose' | 'locked' | 'pickup' | 'menu' | 'cursor' | 'cancel' | 'typewriter' | 'lighter' | 'knife') {
    switch (name) {
      case 'door': { const d = this.play('door_knob'); this.play('door_open', 0.9, 1, Math.max(0.25, d * 0.6)); break; }
      case 'doorClose': this.play('door_close'); break;
      case 'locked': this.play('door_knob'); this.play('door_knob', 1, 1.05, 0.35); break;
      case 'pickup': case 'menu': this.play('confirm'); break;
      case 'cursor': this.play('cursor', 0.7); break;
      case 'cancel': this.play('cancel'); break;
      case 'typewriter': this.play('typewriter'); break;
      case 'lighter': this.play('door_knob', 0.35, 2.2); break; // short metallic click for the lighter lid
      case 'knife': this.swish(); break;
    }
  }
  /** knife swing: band-passed noise sweep */
  swish() {
    const c = this.ctx; if (!c) return;
    const n = Math.floor(c.sampleRate * 0.22), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) { const t = i / n; d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) ** 2; }
    const s = c.createBufferSource(); s.buffer = b;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 2.5;
    f.frequency.setValueAtTime(900, c.currentTime); f.frequency.exponentialRampToValueAtTime(3800, c.currentTime + 0.2);
    const g = c.createGain(); g.gain.value = 0.55;
    s.connect(f).connect(g).connect(this.master); s.start();
  }
  footsteps(state: string, dt: number) {
    if (!this.ctx || (state !== 'walk' && state !== 'run' && state !== 'back')) { this.stepT = 0.25; return; }
    const period = state === 'run' ? 0.31 : state === 'back' ? 0.6 : 0.5;
    this.stepT += dt;
    if (this.stepT >= period) { this.stepT -= period; this.play(this.stepN++ % 2 ? 'step1' : 'step2', state === 'run' ? 0.75 : 0.5, 0.95 + Math.random() * 0.1); }
  }
}
