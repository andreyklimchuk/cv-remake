/** Cutscene overlay: letterbox bars, subtitles (speaker + line), location caption, fade-to-black, skip hint. */
export class Cinema {
  root: HTMLDivElement;
  private sub: HTMLDivElement;
  private cap: HTMLDivElement;
  private fadeEl: HTMLDivElement;
  private lastSub = '';
  private lastCap = '';

  constructor(parent: HTMLElement) {
    this.root = document.createElement('div');
    this.root.className = 'cinema hidden';
    this.root.innerHTML = `<div class="cb top"></div><div class="cb bot"></div><div class="csub"></div><div class="ccap"></div>
      <div class="cskip">Enter / Esc — пропустить</div><div class="cfade"></div>`;
    parent.appendChild(this.root);
    this.sub = this.root.querySelector('.csub')!;
    this.cap = this.root.querySelector('.ccap')!;
    this.fadeEl = this.root.querySelector('.cfade')!;
  }

  show(on: boolean): void {
    this.root.classList.toggle('hidden', !on);
    if (!on) { this.say(null, null); this.caption(null); this.fade(0); }
  }

  say(who: string | null, text: string | null): void {
    const key = (who ?? '') + '|' + (text ?? '');
    if (key === this.lastSub) return;
    this.lastSub = key;
    this.sub.innerHTML = text ? (who ? `<b>${who}</b>` : '') + `<span>${text}</span>` : '';
    this.sub.classList.toggle('on', !!text);
  }

  caption(text: string | null): void {
    if ((text ?? '') === this.lastCap) return;
    this.lastCap = text ?? '';
    if (text) this.cap.innerHTML = text;
    this.cap.classList.toggle('on', !!text);
  }

  fade(v: number): void { this.fadeEl.style.opacity = String(Math.max(0, Math.min(1, v))); }
}
