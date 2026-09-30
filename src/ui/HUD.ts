import * as THREE from 'three';
import { bus } from '../engine/Events';

/** In-game HUD: RE-style ECG health, ammo, dynamic reticle, prompts, messages, debug overlay. */
export class HUD {
  root: HTMLDivElement;
  private ammo: HTMLDivElement;
  private health: HTMLDivElement;
  private ecg: HTMLCanvasElement;
  private ecgCtx: CanvasRenderingContext2D;
  private statusLabel: HTMLDivElement;
  private stamina: HTMLDivElement;
  private reticle: HTMLCanvasElement;
  private prompt: HTMLDivElement;
  private msgs: HTMLDivElement;
  private struggle: HTMLDivElement;
  private debug: HTMLDivElement;
  private zoneTitle: HTMLDivElement;
  private ecgX = 0;
  private ecgPhase = 0;
  private lastY = 28;
  private healthShowT = 0;

  constructor(parent: HTMLElement) {
    this.root = document.createElement('div');
    this.root.innerHTML = `
      <div class="hud-health"><canvas width="400" height="112"></canvas><div class="label">FINE</div><div class="hud-stamina"><div></div></div></div>
      <div class="hud-ammo"><div class="wname"></div><div class="count"></div><div class="sub"></div></div>
      <canvas class="reticle" width="220" height="220"></canvas>
      <div class="prompt hidden"></div>
      <div class="messages"></div>
      <div class="struggle hidden"></div>
      <div class="zone-title"></div>
      <div class="debug hidden"></div>`;
    parent.appendChild(this.root);
    const q = <T extends Element>(s: string) => this.root.querySelector(s) as unknown as T;
    this.health = q('.hud-health');
    this.ecg = q('.hud-health canvas');
    this.ecgCtx = this.ecg.getContext('2d')!;
    this.statusLabel = q('.hud-health .label');
    this.stamina = q('.hud-stamina > div');
    this.ammo = q('.hud-ammo');
    this.reticle = q('.reticle');
    this.prompt = q('.prompt');
    this.msgs = q('.messages');
    this.struggle = q('.struggle');
    this.debug = q('.debug');
    this.zoneTitle = q('.zone-title');
    bus.on('message', ({ text, duration }) => this.message(text, duration));
    bus.on('playerHurt', () => { this.healthShowT = 4; });
  }

  show(v: boolean): void { this.root.classList.toggle('hidden', !v); }

  message(text: string, duration = 3): void {
    const d = document.createElement('div');
    d.textContent = text;
    this.msgs.appendChild(d);
    while (this.msgs.children.length > 3) this.msgs.firstChild!.remove();
    setTimeout(() => { d.style.opacity = '0'; setTimeout(() => d.remove(), 700); }, duration * 1000);
  }

  zone(title: string, sub: string): void {
    this.zoneTitle.innerHTML = `<small>${sub}</small>${title}`;
    this.zoneTitle.style.opacity = '1';
    setTimeout(() => (this.zoneTitle.style.opacity = '0'), 3500);
  }

  setPrompt(text: string | null): void {
    this.prompt.classList.toggle('hidden', !text);
    if (text) this.prompt.innerHTML = `<kbd>E</kbd>${text}`;
  }

  setStruggle(active: boolean, progress: number, counter: boolean): void {
    this.struggle.classList.toggle('hidden', !active);
    if (active) this.struggle.innerHTML = `ВЫРВИСЬ! — SPACE / F<div class="bar"><div style="width:${Math.min(100, progress * 100)}%"></div></div>${counter ? '<small>F — контратака ножом</small>' : ''}`;
  }

  update(dt: number, s: {
    hpRatio: number; status: 'fine' | 'caution' | 'danger'; poisoned: boolean; stamina: number; aiming: boolean;
    weaponName: string; mag: number; reserve: number; melee: boolean; sub: string; reloading: boolean;
    spreadDeg: number; fov: number; onTarget: boolean;
  }): void {
    // ECG — always drawn, panel fades in when aiming / hurt / low
    this.healthShowT -= dt;
    const visible = s.aiming || this.healthShowT > 0 || s.status !== 'fine';
    this.health.style.opacity = visible ? '1' : '0.25';
    const col = s.poisoned ? '#b05ce8' : s.status === 'fine' ? '#3ddc6a' : s.status === 'caution' ? '#e8c33a' : '#e8412e';
    const bpm = s.status === 'fine' ? 1.1 : s.status === 'caution' ? 1.5 : 2.2;
    const g = this.ecgCtx;
    const W = this.ecg.width, H = this.ecg.height;
    const speed = 160 * dt * 2;
    g.fillStyle = 'rgba(0,0,0,0.18)';
    g.fillRect(this.ecgX, 0, speed + 14, H);
    this.ecgPhase += dt * bpm;
    const ph = this.ecgPhase % 1;
    let y = H / 2;
    const amp = s.status === 'danger' ? 0.6 : 1;
    if (ph < 0.06) y -= Math.sin(ph / 0.06 * Math.PI) * 8;
    else if (ph > 0.12 && ph < 0.16) y += 10 * amp;
    else if (ph >= 0.16 && ph < 0.21) y -= 42 * amp * Math.sin((ph - 0.16) / 0.05 * Math.PI);
    else if (ph >= 0.21 && ph < 0.25) y += 14 * amp;
    else if (ph > 0.4 && ph < 0.52) y -= Math.sin((ph - 0.4) / 0.12 * Math.PI) * 10;
    g.strokeStyle = col; g.lineWidth = 3; g.shadowColor = col; g.shadowBlur = 8;
    g.beginPath(); g.moveTo(this.ecgX, this.lastY); g.lineTo(this.ecgX + speed, y); g.stroke();
    this.lastY = y;
    this.ecgX += speed;
    if (this.ecgX > W) { this.ecgX = 0; g.clearRect(0, 0, 20, H); }
    this.statusLabel.textContent = s.poisoned ? 'POISON' : s.status.toUpperCase();
    this.statusLabel.style.color = col;
    this.stamina.style.width = `${s.stamina}%`;
    this.stamina.style.background = s.stamina < 20 ? '#e8412e' : '#9ab';

    // ammo
    (this.ammo.querySelector('.wname') as HTMLElement).textContent = s.weaponName;
    (this.ammo.querySelector('.count') as HTMLElement).innerHTML = s.melee ? '∞' : `${s.mag}<small> / ${s.reserve}</small>`;
    (this.ammo.querySelector('.sub') as HTMLElement).textContent = s.reloading ? 'RELOADING…' : s.sub;
    (this.ammo.querySelector('.count') as HTMLElement).style.color = !s.melee && s.mag === 0 ? '#e8412e' : '';

    // reticle — radius mirrors the real spread cone
    const r = this.reticle.getContext('2d')!;
    r.clearRect(0, 0, 220, 220);
    if (s.aiming && !s.melee) {
      const px = Math.tan((s.spreadDeg * Math.PI) / 360) / Math.tan((s.fov * Math.PI) / 360) * (window.innerHeight / 2);
      const rad = THREE.MathUtils.clamp(px, 3, 100);
      r.strokeStyle = s.onTarget ? 'rgba(255,80,60,0.95)' : 'rgba(255,255,255,0.85)';
      r.lineWidth = 1.5;
      r.beginPath(); r.arc(110, 110, rad, 0, Math.PI * 2); r.stroke();
      r.fillStyle = r.strokeStyle;
      r.beginPath(); r.arc(110, 110, 1.6, 0, Math.PI * 2); r.fill();
      for (let i = 0; i < 4; i++) {
        const a = (i * Math.PI) / 2;
        r.beginPath(); r.moveTo(110 + Math.cos(a) * (rad + 3), 110 + Math.sin(a) * (rad + 3)); r.lineTo(110 + Math.cos(a) * (rad + 9), 110 + Math.sin(a) * (rad + 9)); r.stroke();
      }
    }
  }

  setDebug(text: string | null): void {
    this.debug.classList.toggle('hidden', text === null);
    if (text !== null) this.debug.textContent = text;
  }
}
