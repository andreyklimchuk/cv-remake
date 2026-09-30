import './ui/styles.css';
import { Game } from './game/Game';
import { runViewer } from './viewer';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ui = document.getElementById('ui') as HTMLElement;
if (new URLSearchParams(location.search).has('viewer')) {
  runViewer().catch((e) => { console.error(e); ui.textContent = String(e); });
} else {
  const game = new Game(canvas, ui);
  game.init().catch((e) => {
    console.error(e);
    ui.innerHTML = `<div class="screen"><h2>Не удалось запустить рендер: ${String(e?.message ?? e)}</h2></div>`;
  });
  (window as any).__game = game;
}
