import { pages, UI, itemName } from './text';

const css = `
html,body{margin:0;height:100%;background:#000;overflow:hidden;font-family:"Times New Roman",Georgia,serif;color:#e8e2d0}
#app{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}
#stage{position:relative;background:#000;overflow:hidden}
#stage>canvas{display:block;width:100%;height:100%}
.msg{position:absolute;left:6%;right:6%;bottom:5%;min-height:16%;background:rgba(0,0,0,.72);border-top:1px solid rgba(200,190,160,.25);
 padding:2.2% 4%;font-size:clamp(14px,2.4vh,26px);line-height:1.45;white-space:pre-wrap;letter-spacing:.02em;display:none;text-shadow:0 0 3px #000;z-index:2}
.msg .more{position:absolute;right:3%;bottom:6%;font-size:.7em;opacity:.7;animation:blink 1s infinite}
@keyframes blink{50%{opacity:.15}}
.choice{margin-top:.4em}
.choice span{margin-right:2.5em;padding:0 .3em}
.choice span.sel{color:#fff;text-decoration:underline}
.fade{position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;transition:opacity .45s;z-index:5}
.hud{position:absolute;left:1%;top:1%;font:12px/1.3 monospace;color:#9a9;opacity:.75;white-space:pre;z-index:3}
.toast{position:absolute;right:2%;top:2%;font:clamp(11px,1.8vh,16px) sans-serif;color:#cdc;background:rgba(0,0,0,.55);padding:.3em .8em;opacity:0;transition:opacity .3s;z-index:3;pointer-events:none}
.title{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(#200 0%,#000 70%);text-align:center;z-index:6}
.title h1{font-weight:normal;letter-spacing:.25em;font-size:clamp(20px,5vh,54px);margin:0;color:#d9cfae}
.title h3{font-weight:normal;letter-spacing:.4em;color:#a33;margin:.6em 0 2.2em;font-size:clamp(12px,2.2vh,22px)}
.title .menu div{font-size:clamp(14px,2.6vh,26px);margin:.5em;opacity:.65;cursor:pointer}
.title .menu div.sel{opacity:1;color:#fff}
.title .help{position:absolute;bottom:4%;font-size:clamp(11px,1.7vh,16px);opacity:.6;line-height:1.6}
.loading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:20px;letter-spacing:.3em;color:#888;z-index:6}
`;

export class UIRoot {
  stage = document.createElement('div');
  msg = document.createElement('div');
  fadeEl = document.createElement('div');
  hud = document.createElement('div');
  inv = document.createElement('div');
  toastEl = document.createElement('div');
  private toastT = 0;
  constructor() {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    this.stage.id = 'stage';
    document.getElementById('app')!.appendChild(this.stage);
    this.msg.className = 'msg'; this.fadeEl.className = 'fade'; this.hud.className = 'hud'; this.inv.className = 'inv'; this.toastEl.className = 'toast';
    this.stage.append(this.msg, this.inv, this.hud, this.toastEl, this.fadeEl);
  }
  fit(aspect: number) {
    const w = innerWidth, h = innerHeight;
    let cw = w, ch = w / aspect; if (ch > h) { ch = h; cw = h * aspect; }
    this.stage.style.width = cw + 'px'; this.stage.style.height = ch + 'px';
    return { w: Math.round(cw), h: Math.round(ch) };
  }
  fade(on: boolean, ms = 450): Promise<void> {
    this.fadeEl.style.transition = `opacity ${ms}ms`;
    this.fadeEl.style.opacity = on ? '1' : '0';
    return new Promise((r) => setTimeout(r, ms + 20));
  }
  toast(t: string) {
    this.toastEl.textContent = t; this.toastEl.style.opacity = '1';
    clearTimeout(this.toastT); this.toastT = window.setTimeout(() => (this.toastEl.style.opacity = '0'), 1600);
  }
}

/** A queue-based message box. show() resolves when the player dismissed all pages. */
export class MessageBox {
  private queue: string[] = [];
  private full = ''; private shown = 0;
  private resolve?: (v: number) => void;
  private choices: string[] | null = null; private sel = 0;
  active = false;
  constructor(private el: HTMLElement) {}
  show(text: string | string[], choices?: string[]): Promise<number> {
    this.queue = Array.isArray(text) ? [...text] : pages(text);
    if (!this.queue.length) this.queue = [''];
    this.choices = choices ?? null; this.sel = 0;
    this.active = true; this.next();
    this.el.style.display = 'block';
    return new Promise((r) => (this.resolve = r));
  }
  raw(lines: string[], choices?: string[]) { return this.show(lines, choices); }
  private next() { this.full = this.queue.shift() ?? ''; this.shown = 0; this.render(); }
  private render() {
    const done = this.shown >= this.full.length;
    let h = escapeHtml(this.full.slice(0, Math.floor(this.shown)));
    if (done && this.queue.length === 0 && this.choices) h += `<div class="choice">${this.choices.map((c, i) => `<span class="${i === this.sel ? 'sel' : ''}">${escapeHtml(c)}</span>`).join('')}</div>`;
    if (done && (this.queue.length || !this.choices)) h += `<span class="more">▼</span>`;
    this.el.innerHTML = h;
  }
  update(dt: number, action: boolean, left: boolean, right: boolean, cancel: boolean) {
    if (!this.active) return;
    if (this.shown < this.full.length) {
      this.shown = Math.min(this.full.length, this.shown + dt * 60);
      if (action) this.shown = this.full.length;
      this.render(); return;
    }
    if (this.queue.length === 0 && this.choices) {
      if (left || right) { this.sel = (this.sel + (right ? 1 : this.choices.length - 1)) % this.choices.length; this.render(); }
      if (action) return this.close(this.sel);
      if (cancel) return this.close(this.choices.length - 1);
      return;
    }
    if (action || cancel) { if (this.queue.length) this.next(); else this.close(0); }
  }
  private close(v: number) { this.active = false; this.el.style.display = 'none'; const r = this.resolve; this.resolve = undefined; r?.(v); }
}
export function escapeHtml(s: string) { return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!)); }
export { UI, itemName };
