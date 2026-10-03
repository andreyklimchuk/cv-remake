import { UIRoot } from './ui';
import { Game, type SaveData } from './game';
import { LANG, setLang } from './text';
import { playMovie } from './movie';
import { ASPECT } from './camera';

const ui = new UIRoot();
ui.fit(ASPECT);
let game: Game | null = null;

function title() {
  const el = document.createElement('div'); el.className = 'title';
  const save = localStorage.getItem('cvx.save');
  const items = () => [
    { k: 'new', t: LANG === 'ru' ? 'Новая игра' : 'New game' },
    ...(save ? [{ k: 'load', t: LANG === 'ru' ? 'Продолжить' : 'Continue' }] : []),
    { k: 'movie', t: LANG === 'ru' ? 'Вступительный ролик' : 'Opening movie' },
    { k: 'lang', t: LANG === 'ru' ? 'Язык: русский' : 'Language: English' },
  ];
  let sel = 0;
  const render = () => {
    el.innerHTML = `<h1>RESIDENT EVIL<br>CODE: Veronica X</h1><h3>${LANG === 'ru' ? 'ТЮРЬМА · ОСТРОВ РОКФОРТ' : 'PRISON · ROCKFORT ISLAND'}</h3>
<div class="menu">${items().map((it, i) => `<div data-i="${i}" class="${i === sel ? 'sel' : ''}">${it.t}</div>`).join('')}</div>
<div class="help">${LANG === 'ru'
      ? 'W/S или ↑/↓ — вперёд/назад · A/D или ←/→ — поворот · Shift — бег · C — камера (фиксированная / от плеча: мышь или ←/→ — обзор, A/D — шаг вбок)<br>F / ПКМ — приготовить нож · E / Пробел / Enter / ЛКМ — действие, удар · Tab — предметы · Esc — отмена · F1 — отладка'
      : 'W/S or ↑/↓ — forward/back · A/D or ←/→ — turn · Shift — run · C — camera (fixed / over-the-shoulder: mouse or ←/→ look, A/D strafe)<br>F / RMB — ready knife · E / Space / Enter / LMB — action, attack · Tab — items · Esc — cancel · F1 — debug'}<br>
${LANG === 'ru' ? 'Фанатский порт на основе ресурсов PS3-версии. Не для распространения.' : 'Fan port built from the PS3 version assets. Not for distribution.'}</div>`;
  };
  const choose = async (k: string) => {
    if (k === 'lang') { setLang(LANG === 'ru' ? 'en' : 'ru'); render(); return; }
    removeEventListener('keydown', onKey);
    el.remove();
    if (k === 'new' || k === 'movie') await playMovie(ui.stage, 'mv_000');
    if (k === 'movie') { ui.stage.appendChild(el); addEventListener('keydown', onKey); render(); return; }
    ui.fadeEl.style.transition = 'none'; ui.fadeEl.style.opacity = '1';
    const ld = document.createElement('div'); ld.className = 'loading'; ld.textContent = LANG === 'ru' ? 'ЗАГРУЗКА…' : 'LOADING…';
    ui.stage.appendChild(ld);
    game = new Game(ui);
    const data: SaveData | undefined = k === 'load' && save ? JSON.parse(save) : undefined;
    try { await game.start(data, () => ld.remove()); } catch (e) { ld.textContent = 'Error: ' + (e as Error).message; console.error(e); return; }
  };
  const onKey = (e: KeyboardEvent) => {
    const n = items().length;
    if (e.code === 'ArrowDown' || e.code === 'KeyS') { sel = (sel + 1) % n; render(); }
    else if (e.code === 'ArrowUp' || e.code === 'KeyW') { sel = (sel + n - 1) % n; render(); }
    else if (['Enter', 'Space', 'KeyE'].includes(e.code)) { e.preventDefault(); choose(items()[sel].k); }
  };
  el.addEventListener('click', (e) => { const i = (e.target as HTMLElement).dataset?.i; if (i !== undefined) { sel = +i; choose(items()[sel].k); } });
  addEventListener('keydown', onKey);
  render();
  ui.stage.appendChild(el);
}
title();
addEventListener('resize', () => { if (!game) ui.fit(ASPECT); });
import './enemy';
