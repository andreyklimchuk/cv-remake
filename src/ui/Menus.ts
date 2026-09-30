import { QUALITY, type QualityLevel } from '../engine/Quality';

export interface Settings { quality: QualityLevel; sensitivity: number; aimAssist: number; volume: number; invertY: boolean }

export function loadSettings(): Settings {
  const d: Settings = { quality: 'medium', sensitivity: 1, aimAssist: 0.5, volume: 0.8, invertY: false };
  try { return { ...d, ...JSON.parse(localStorage.getItem('cv.settings') ?? '{}') }; } catch { return d; }
}
export function saveSettings(s: Settings): void { localStorage.setItem('cv.settings', JSON.stringify(s)); }

const CONTROLS = `
<table class="controls-table">
<tr><td>W A S D</td><td>движение</td></tr>
<tr><td>Мышь</td><td>камера</td></tr>
<tr><td>ПКМ (удерж.)</td><td>прицел от плеча</td></tr>
<tr><td>ЛКМ</td><td>выстрел</td></tr>
<tr><td>Shift</td><td>бег</td></tr>
<tr><td>Space</td><td>уворот (i-frames)</td></tr>
<tr><td>R</td><td>перезарядка / смена гранат</td></tr>
<tr><td>F</td><td>нож · добивание лежачих · контратака</td></tr>
<tr><td>Q</td><td>оттолкнуть зомби</td></tr>
<tr><td>E</td><td>взаимодействие</td></tr>
<tr><td>Tab / I</td><td>инвентарь</td></tr>
<tr><td>1–8 / колесо</td><td>смена оружия</td></tr>
<tr><td>Esc</td><td>пауза</td></tr>
<tr><td>F3</td><td>отладка (FPS, draw calls)</td></tr>
<tr><td>Геймпад</td><td>LS/RS · LT прицел · RT огонь · A уворот · B нож · X перезарядка · Y действие · LB толчок</td></tr>
</table>`;

/** Title / pause / settings / death / end screens and confirm dialogs (DOM). */
export class Menus {
  root: HTMLDivElement;
  constructor(parent: HTMLElement) {
    this.root = document.createElement('div');
    parent.appendChild(this.root);
  }
  clear(): void { this.root.innerHTML = ''; }

  private screen(html: string): HTMLDivElement {
    this.root.innerHTML = `<div class="screen">${html}</div>`;
    return this.root.firstElementChild as HTMLDivElement;
  }

  private bind(el: HTMLElement, handlers: Record<string, () => void>): void {
    el.querySelectorAll<HTMLButtonElement>('[data-a]').forEach((b) => { b.onclick = () => handlers[b.dataset.a!]?.(); });
  }

  title(canContinue: boolean, h: { newGame: () => void; cont: () => void; settings: () => void; controls: () => void }): void {
    const el = this.screen(`
      <h1>CODE<span>:</span>VERONICA</h1>
      <h2>WEB REMAKE · ROCKFORT ISLAND — PRISON (TEST BUILD)</h2>
      <div class="menu">
        <button data-a="newGame">НОВАЯ ИГРА</button>
        <button data-a="cont" ${canContinue ? '' : 'disabled'}>ПРОДОЛЖИТЬ</button>
        <button data-a="settings">НАСТРОЙКИ</button>
        <button data-a="controls">УПРАВЛЕНИЕ</button>
      </div>
      <div class="fineprint">Некоммерческий фанатский проект. Все ассеты процедурные и оригинальные. Resident Evil / Code: Veronica © CAPCOM.</div>`);
    this.bind(el, h);
  }

  pause(h: { resume: () => void; settings: () => void; controls: () => void; quit: () => void }): void {
    const el = this.screen(`<h1 style="font-size:40px">ПАУЗА</h1><h2>&nbsp;</h2><div class="menu">
      <button data-a="resume">ПРОДОЛЖИТЬ</button><button data-a="settings">НАСТРОЙКИ</button><button data-a="controls">УПРАВЛЕНИЕ</button><button data-a="quit">В ГЛАВНОЕ МЕНЮ</button></div>`);
    this.bind(el, h);
  }

  controls(back: () => void): void {
    const el = this.screen(`<div class="settings"><h2 style="margin:0 0 16px">УПРАВЛЕНИЕ</h2>${CONTROLS}<div class="menu" style="margin-top:14px"><button data-a="back">НАЗАД</button></div></div>`);
    this.bind(el, { back });
  }

  settings(s: Settings, apply: (s: Settings) => void, back: () => void): void {
    const q = (Object.keys(QUALITY) as QualityLevel[]).map((k) => `<button data-q="${k}" class="${s.quality === k ? 'on' : ''}">${QUALITY[k].label}</button>`).join('');
    const el = this.screen(`<div class="settings"><h2 style="margin:0 0 16px">НАСТРОЙКИ</h2>
      <div class="row"><span>Графика (RE Engine preset)</span><span class="opts">${q}</span></div>
      <div class="row"><span>Чувствительность мыши</span><input type="range" min="0.2" max="3" step="0.05" value="${s.sensitivity}" data-k="sensitivity"></div>
      <div class="row"><span>Помощь в прицеливании</span><input type="range" min="0" max="1" step="0.05" value="${s.aimAssist}" data-k="aimAssist"></div>
      <div class="row"><span>Громкость</span><input type="range" min="0" max="1" step="0.05" value="${s.volume}" data-k="volume"></div>
      <div class="row"><span>Инверсия Y</span><span class="opts"><button data-inv="1" class="${s.invertY ? 'on' : ''}">ВКЛ</button><button data-inv="0" class="${s.invertY ? '' : 'on'}">ВЫКЛ</button></span></div>
      <div class="menu" style="margin-top:14px"><button data-a="back">НАЗАД</button></div></div>`);
    el.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((b) => b.onclick = () => { s.quality = b.dataset.q as QualityLevel; apply(s); this.settings(s, apply, back); });
    el.querySelectorAll<HTMLButtonElement>('[data-inv]').forEach((b) => b.onclick = () => { s.invertY = b.dataset.inv === '1'; apply(s); this.settings(s, apply, back); });
    el.querySelectorAll<HTMLInputElement>('input[data-k]').forEach((i) => i.oninput = () => { (s as any)[i.dataset.k!] = parseFloat(i.value); apply(s); });
    this.bind(el, { back });
  }

  death(h: { load: () => void; retry: () => void }, canLoad: boolean): void {
    const el = this.screen(`<h1 style="color:#8a1010;text-shadow:0 0 40px #f00">YOU ARE DEAD</h1><h2>&nbsp;</h2><div class="menu">
      <button data-a="load" ${canLoad ? '' : 'disabled'}>ЗАГРУЗИТЬ СОХРАНЕНИЕ</button><button data-a="retry">НАЧАТЬ ЗАНОВО</button></div>`);
    this.bind(el, h);
  }

  end(stats: { time: string; kills: number; saves: number; shots: number; acc: number }, back: () => void): void {
    const el = this.screen(`<h1 style="font-size:44px">ТЕСТОВЫЙ УРОВЕНЬ ПРОЙДЕН</h1><h2>КЛЭР ПОКИДАЕТ ТЮРЬМУ РОКФОРТА</h2>
      <div class="settings" style="min-width:360px">
        <div class="row"><span>Время</span><b>${stats.time}</b></div>
        <div class="row"><span>Убито зомби</span><b>${stats.kills}</b></div>
        <div class="row"><span>Выстрелов / точность</span><b>${stats.shots} / ${stats.acc}%</b></div>
        <div class="row"><span>Сохранений</span><b>${stats.saves}</b></div>
      </div><div class="menu" style="margin-top:20px"><button data-a="back">ГЛАВНОЕ МЕНЮ</button></div>`);
    this.bind(el, { back });
  }

  confirm(text: string, yes: () => void, no: () => void): void {
    const el = this.screen(`<div class="dialog">${text}<div class="row"><button class="btn" data-a="yes">ДА</button><button class="btn" data-a="no">НЕТ</button></div></div>`);
    this.bind(el, { yes, no });
  }

  loading(text: string): void { this.screen(`<h2 style="margin:0">${text}</h2>`); }
}
