// Status / item screen recreated after the original CODE: Veronica X layout
// (top menu, equipment + standard boxes, status panel with portrait / info / emblem / ECG, item list, message box).
// Layout is authored in a 930x650 design space and scaled to the stage.
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { assetUrl, loadGLTF, toLambert } from './assets';
import { itemName, LANG, pages, UI } from './text';
import { ITEM_NAMES, SYSMES } from './sysmes';
import { escapeHtml } from './ui';
import type { Inventory, InvItem } from './inventory';
import type { Input } from './input';
import type { Audio } from './audio';
import type { Player } from './player';

/** Original item descriptions (sysmes.msb, table 1, index = item id + 1) and Russian translations. */
const DESC: Record<number, { en: string; ru: string }> = {
  8: { en: "This weapon is a\nveteran survivor's\nfirst choice.", ru: 'Это оружие —\nпервый выбор\nбывалого выживальщика.' },
  9: { en: 'M93R\fAn Italian handgun\nwhich uses\n9mm × 19 rounds.', ru: 'M93R\fИтальянский пистолет\nпод патрон\n9 × 19 мм.' },
  59: { en: 'An emblem carved\nwith a\nhawk symbol.\fIt appears to be\nmade of pure gold.', ru: 'Эмблема\nс изображением\nястреба.\fПохоже, она из\nчистого золота.' },
  83: { en: 'A case made of\nmetal.\fThe case seems to\nbe closed.\fMaybe if you\nexamine it\nclosely...', ru: 'Металлический\nкейс.\fКейс, похоже,\nзакрыт.\fМожет, если\nосмотреть его\nповнимательнее...' },
  86: { en: "A picture of a\nhawk is carved on\nit.\fIt's made of\nnewly-developed\nalloy TG-01.", ru: 'На ней вырезано\nизображение\nястреба.\fСделана из\nновейшего\nсплава TG-01.' },
  12: { en: '9mm × 19 Rounds\fThese can be used\nwith the M93R\nand Glock 17.', ru: 'Патроны 9 × 19 мм\fПодходят для\nM93R и Glock 17.' },
  21: { en: 'This was made by\nbreeding the herb\nfrom Raccoon city.', ru: 'Выведена из травы,\nпривезённой из\nРаккун-Сити.' },
  31: { en: 'Use this with a\ntypewriter to save\nyour progress.', ru: 'Используйте её\nс пишущей машинкой,\nчтобы сохраниться.' },
  50: { en: 'Lockpick.\fA simple lock can\nbe opened with\nthis.', ru: 'Отмычка.\fЕю можно открыть\nпростой замок.' },
  55: { en: 'An oil lighter.\nYou can use it to\nlight a dark area.', ru: 'Бензиновая зажигалка.\nЕю можно осветить\nтёмное место.' },
  95: { en: 'Medicine that is\nused to stop\nbleeding.\fIt should be used\non someone who\nis wounded.', ru: 'Лекарство,\nостанавливающее\nкровотечение.\fЕго нужно применить\nк раненому.' },
  104: { en: 'Medicine that is\nused to stop\nbleeding.\fIt should be used\non someone who\nis wounded.', ru: 'Лекарство,\nостанавливающее\nкровотечение.\fЕго нужно применить\nк раненому.' },
  133: { en: 'A board clip holding\nsome papers.', ru: 'Планшет-зажим\nс бумагами.' },
};
const WEAPONS = new Set([8, 9]);
/** icon orientation overrides for models lying in another pose in item1/ */
const ICON_ROT: Record<number, [number, number, number]> = { 9: [-1.15, 0, 0.25] };
const STANDARD = new Set([55]); // tools held in the "standard" slot (the lighter)
const ru = () => LANG === 'ru';
const T = {
  menu: () => (ru() ? ['ВЫХОД', 'ФАЙЛЫ', 'КАРТА', 'ПРЕДМЕТЫ'] : ['EXIT', 'FILE', 'MAP', 'ITEM']),
  equip: () => (ru() ? 'ЭКИПИРОВКА' : 'EQUIP'), standard: () => (ru() ? 'СТАНДАРТ' : 'STANDARD'),
  status: () => (ru() ? 'СТАТУС' : 'STATUS'), info: () => (ru() ? 'ИНФО' : 'INFO'),
  name: () => (ru() ? 'КЛЭР' : 'CLAIRE'), full: () => (ru() ? 'КЛЭР РЕДФИЛД' : 'CLAIRE REDFIELD'),
  height: () => (ru() ? 'РОСТ' : 'HEIGHT'), weight: () => (ru() ? 'ВЕС' : 'WEIGHT'), blood: () => (ru() ? 'ГР.КРОВИ' : 'BLOOD TYPE'),
  cm: () => (ru() ? 'см' : 'cm'), kg: () => (ru() ? 'кг' : 'kg'), btype: () => (ru() ? '0' : 'O'),
  cond: () => (ru() ? 'СОСТОЯНИЕ' : 'CONDITION'), fine: () => (ru() ? 'Норма' : 'Fine'), caution: () => (ru() ? 'Осторожно' : 'Caution'), danger: () => (ru() ? 'Опасно' : 'Danger'), list: () => (ru() ? 'СПИСОК' : 'LIST'),
  use: () => (ru() ? 'Использовать' : 'Use'), equipA: () => (ru() ? 'Экипировать' : 'Equip'), unequip: () => (ru() ? 'Снять' : 'Unequip'),
  hold: () => (ru() ? 'Взять в руку' : 'Hold'), putAway: () => (ru() ? 'Убрать' : 'Put away'),
  check: () => (ru() ? 'Осмотреть' : 'Check'), combine: () => (ru() ? 'Комбинировать' : 'Combine'),
  noData: () => (ru() ? 'Нет данных.' : 'No data.'),
  equipped: (n: string) => (ru() ? `${n}: экипировано.` : `Equipped the ${n}.`),
  lit: () => (ru() ? 'Клэр зажгла зажигалку.' : 'Claire lit the lighter.'),
  unlit: () => (ru() ? 'Клэр убрала зажигалку.' : 'Claire put the lighter away.'),
  rot: () => (ru() ? 'Стрелки — вращать · Enter — далее · Esc — назад' : 'Arrows — rotate · Enter — next · Esc — back'),
};
export function itemDesc(id: number): string[] { const d = DESC[id]; return d ? (ru() ? d.ru : d.en).split('\f') : ['']; }

const W = 930, H = 650;
const css = `
.inv{position:absolute;inset:0;display:none;background:#000;overflow:hidden;z-index:4}
.inv .scr{position:absolute;left:0;top:0;width:${W}px;height:${H}px;transform-origin:0 0;font-family:"Arial Black",Arial,sans-serif;color:#d8d8d0}
.inv .scr *{box-sizing:border-box}
.inv .bgc{position:absolute;inset:0}
.inv .abs{position:absolute}
.inv .olive{background:linear-gradient(180deg,#b3b08a 0%,#8f8c66 18%,#6f6d4c 60%,#5a583c 100%);border:2px solid;border-color:#d6d3b0 #4b4930 #3e3c27 #cfcca8;box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.inv .stripes{background:repeating-linear-gradient(90deg,#8d8a64 0 2px,#6b694a 2px 4px,#7c7a58 4px 6px);border:2px solid;border-color:#cfcca8 #3e3c27 #3e3c27 #cfcca8}
.inv .hstripes{background:repeating-linear-gradient(0deg,#8d8a64 0 2px,#6b694a 2px 4px,#7c7a58 4px 6px)}
.inv .blue{background:linear-gradient(180deg,#0b0b56 0%,#1b1b8c 45%,#12127a 70%,#0a0a58 100%);border:2px solid;border-color:#05052a #7a7ac8 #9a9ae0 #05052a}
.inv .bar{display:flex;align-items:center;justify-content:center;font-size:13px;letter-spacing:.12em;color:#2a2a22;background:linear-gradient(180deg,#f0eedc 0%,#c9c6a8 35%,#8f8c70 70%,#bdb99a 100%);border:1px solid #3b3a2a}
.inv .btn{display:flex;align-items:center;justify-content:center;font-size:17px;letter-spacing:.02em;color:#cfcfc4;background:linear-gradient(180deg,#5a5338 0%,#3a3424 50%,#2b2618 100%);border:3px solid;border-color:#e2dcb0 #6b6440 #5a5434 #d8d2a6;box-shadow:0 0 0 2px #2a2718,inset 0 0 0 1px #000;text-shadow:1px 1px 0 #000}
.inv .btn.on{color:#ff8a2e}
.inv .btn.sel{box-shadow:0 0 0 2px #ff8a2e,inset 0 0 0 1px #000}
.inv .black{background:#000;border:3px solid;border-color:#cbbf7a #6e663c #6e663c #cbbf7a;box-shadow:0 0 0 2px #2d2a1a}
.inv .tab{display:flex;align-items:center;padding-left:10px;font-size:17px;letter-spacing:.06em;color:#fff;background:linear-gradient(180deg,#2a2aa8,#121270);border:2px solid #e8e8ff;box-shadow:0 0 0 2px #000}
.inv .tab:after{content:'';position:absolute;right:4px;top:50%;margin-top:-7px;border:7px solid transparent;border-left:9px solid #a0a0c0;border-right:0}
.inv .teal{border:3px solid #1d9f98;box-shadow:inset 0 0 0 1px #0b3c3a,0 0 0 1px #052}
.inv .head{position:absolute;left:0;right:0;top:0;height:13px;font:bold 10px Arial,sans-serif;letter-spacing:.15em;color:#bfe;padding-left:6px;line-height:13px;background:repeating-linear-gradient(0deg,#126 0 1px,#0a0a3c 1px 3px)}
.inv .infotx{position:absolute;left:8px;right:8px;font:bold 14px Arial,sans-serif;letter-spacing:.08em;color:#e8e8f0;display:flex;justify-content:space-between;text-shadow:1px 1px 0 #000}
.inv .plate{display:flex;align-items:center;justify-content:center;font-size:18px;letter-spacing:.08em;color:#fff;background:linear-gradient(180deg,#26265e,#0c0c34);border:2px solid #f2f2f2;box-shadow:0 0 0 2px #000}
.inv .slot{position:absolute;width:100px;height:65px;display:flex;align-items:center;justify-content:center}
.inv .slot img{max-width:94px;max-height:58px}
.inv .slot .cnt{position:absolute;left:4px;bottom:1px;font:bold 17px Arial,sans-serif;color:#dfe6ff;text-shadow:1px 1px 0 #000}
.inv .slot .eq{position:absolute;right:4px;top:2px;font:bold 11px Arial,sans-serif;color:#ffd060;text-shadow:1px 1px 0 #000}
.inv .slot.sel{outline:3px solid #c81e1e;outline-offset:-3px;box-shadow:inset 0 0 8px rgba(255,40,40,.35)}
.inv .msgtx{position:absolute;left:14px;top:12px;right:14px;bottom:10px;font:24px/1.35 "Courier New",monospace;font-weight:bold;letter-spacing:.06em;color:#ececec;white-space:pre-wrap;text-shadow:1px 1px 0 #333}
.inv .sub{position:absolute;display:none;padding:6px 0;min-width:170px;z-index:3}
.inv .sub div{font:bold 15px Arial,sans-serif;letter-spacing:.05em;padding:5px 16px;color:#cfcfc4}
.inv .sub div.sel{color:#ff8a2e;background:rgba(0,0,0,.35)}
.inv .chk{position:absolute;display:none;left:75px;top:162px;width:538px;height:278px;z-index:2;background:radial-gradient(ellipse at 50% 45%,#1a1a70,#03031c 75%);border:3px solid;border-color:#cbbf7a #6e663c #6e663c #cbbf7a}
.inv .chk canvas{position:absolute;left:0;top:0;width:100%;height:100%}
.inv .grp{position:absolute;left:0;top:0;width:${W}px;height:${H}px;pointer-events:none}
.inv .grp>*{pointer-events:auto}
.inv .slot.cmb{outline:3px dashed #ffb030;outline-offset:-3px}
.inv .ich{display:inline-block;margin:0 1.2em}
.inv .ich.sel{color:#ff8a2e}
.inv.get .stc{visibility:hidden}
.inv .chk .hint{position:absolute;bottom:4px;width:100%;text-align:center;font:11px Arial,sans-serif;color:#8a8ab8}
`;

type Mode = 'list' | 'menu' | 'sub' | 'check' | 'comb' | 'get';
/** curedata (item 20..29): low nibble = recovery level (Use_00), 0x10 = cures poison */
const CUREDATA = [4, 1, 0, 16, 2, 4, 17, 18, 3, 20];
const HP_MAX = 160;
/** combidata: item -> [partner, result, type] (0/1 ammo into weapon, 2 ammo merge, 6 herbs) */
const COMBI: Record<number, [number, number, number][]> = {
  9: [[19, 10, 0], [12, 9, 0]], 12: [[5, 5, 1], [9, 9, 1], [10, 10, 1], [12, 12, 2], [131, 131, 1]],
  21: [[21, 24, 6], [22, 25, 6], [23, 26, 6], [24, 28, 6], [26, 27, 6]], 22: [[21, 25, 6], [26, 29, 6]],
  23: [[21, 26, 6], [24, 27, 6], [25, 29, 6]], 24: [[21, 28, 6], [23, 27, 6]], 25: [[23, 29, 6]], 26: [[21, 27, 6], [22, 29, 6]],
};
const AMMO = new Set([12]);
const BULLET_MAX: Record<number, number> = { 9: 15, 10: 15, 12: 15 };
/** panel groups slide in from these offsets (640x480 units): 1 top menu, 2 status, 3 equipment, 5 item list, 6 message */
const CEN_OFF: Record<number, [number, number]> = { 1: [0, -120], 2: [-448, 0], 3: [288, 0], 5: [208, 0], 6: [0, 152] };
export class InventoryScreen {
  open = false;
  equipped: number | null = null;   // weapon box
  standard: number | null = null;   // standard box (lighter)
  onEquipChange?: () => void;
  /** use of a key item (returns true when the game took over: inventory closes) */
  onUseItem?: (id: number) => boolean;
  private anim: { dir: 1 | -1; f: number; wait: number; se7: boolean; lock: number; done?: () => void } | null = null;
  private ask: { pages: string[]; page: number; choices: string[] | null; sel: number; res: (v: number) => void } | null = null;
  private cmbA = -1; private getId = -1; private acc = 0;
  private mode: Mode = 'list'; private sel = 0; private menuSel = 3; private subSel = 0;
  private subOpts: { t: string; k: string }[] = [];
  private text = ''; private pages: string[] = []; private page = 0;
  private r3: THREE.WebGLRenderer | null = null;
  private icons = new Map<number, string>();
  private portrait: string | null = null;
  private ecgT = 0;
  private chk: { scene: THREE.Scene; cam: THREE.PerspectiveCamera; obj: THREE.Object3D; rx: number; ry: number } | null = null;
  private q = <E extends HTMLElement = HTMLElement>(s: string) => this.root.querySelector(s) as E;
  constructor(private root: HTMLElement, private inv: Inventory, private input: Input, private audio: Audio, private player?: Player) {
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    root.innerHTML = `<div class="scr">
<canvas class="bgc" width="${W}" height="${H}"></canvas>
<!-- top menu -->
<div class="grp" data-c="1">
<div class="abs olive" style="left:40px;top:55px;width:428px;height:72px"></div>
<div class="abs olive" style="left:300px;top:118px;width:168px;height:28px;border-top:0"></div>
<div class="abs menu"></div>
</div>
<!-- equipment / standard -->
<div class="grp" data-c="3">
<div class="abs olive" style="left:484px;top:55px;width:442px;height:100px"></div>
<div class="abs stripes" style="left:868px;top:58px;width:56px;height:76px"></div>
<div class="abs blue eqbox" style="left:515px;top:62px;width:203px;height:68px"></div>
<div class="abs blue stbox" style="left:765px;top:62px;width:103px;height:68px"></div>
<div class="abs bar l-eq" style="left:482px;top:133px;width:246px;height:20px"></div>
<div class="abs bar l-st" style="left:730px;top:133px;width:196px;height:20px"></div>
</div>
<!-- status panel -->
<div class="grp" data-c="2">
<div class="abs olive" style="left:0;top:135px;width:617px;height:312px"></div>
<div class="abs stripes" style="left:2px;top:138px;width:72px;height:305px"></div>
<div class="abs black" style="left:75px;top:162px;width:538px;height:278px"></div>
<div class="abs tab l-status stc" style="left:83px;top:148px;width:139px;height:24px"></div>
<canvas class="abs portrait stc" width="126" height="120" style="left:105px;top:189px;width:126px;height:120px;border:2px solid #0a0a40;background:linear-gradient(180deg,#1a1a6a,#08082c)"></canvas>
<div class="abs plate l-name stc" style="left:104px;top:314px;width:127px;height:26px"></div>
<canvas class="abs redemb stc" width="118" height="66" style="left:108px;top:350px;width:118px;height:66px"></canvas>
<div class="abs teal info stc" style="left:245px;top:189px;width:202px;height:97px;background:#08083a"><div class="head l-info"></div>
 <div class="infotx" style="top:18px"><span class="i-full"></span></div>
 <div class="infotx" style="top:37px"><span class="i-h"></span><span>169<small class="i-cm"></small></span></div>
 <div class="infotx" style="top:56px"><span class="i-w"></span><span>52.4<small class="i-kg"></small></span></div>
 <div class="infotx" style="top:75px"><span class="i-b"></span><span class="i-bt"></span></div></div>
<canvas class="abs emblem stc" width="116" height="97" style="left:465px;top:189px;width:116px;height:97px;border:2px solid #23238a"></canvas>
<div class="abs teal stc" style="left:245px;top:299px;width:336px;height:117px;background:#000"><div class="head l-cond"></div>
 <canvas class="ecg" width="330" height="98" style="position:absolute;left:0;top:13px;width:330px;height:98px"></canvas>
 <div class="fine" style="position:absolute;right:10px;bottom:4px;font:bold 22px Arial,sans-serif;color:#28c828;letter-spacing:.04em"></div></div>
<div class="abs pegs stc"></div>
<div class="abs chk"><canvas width="538" height="278"></canvas><div class="hint"></div></div>
</div>
<!-- item list -->
<div class="grp" data-c="5">
<div class="abs olive" style="left:658px;top:162px;width:214px;height:300px"></div>
<div class="abs blue list" style="left:667px;top:170px;width:200px;height:263px;padding:0"></div>
<div class="abs bar l-list" style="left:667px;top:437px;width:200px;height:20px"></div>
<div class="abs stripes" style="left:872px;top:155px;width:54px;height:440px"></div>
</div>
<!-- message box -->
<div class="grp" data-c="6">
<div class="abs olive" style="left:40px;top:450px;width:578px;height:146px"></div>
<div class="abs black" style="left:58px;top:459px;width:541px;height:127px"><div class="msgtx"></div></div>
</div>
<div class="abs olive sub"></div>
</div>`;
    this.drawBackground(); this.drawRed(); this.drawEmblem();
    const pegs = this.q('.pegs');
    for (const y of [223, 353]) {
      const p = document.createElement('div'); p.className = 'abs';
      p.style.cssText = `left:615px;top:${y}px;width:44px;height:22px;border-radius:0 11px 11px 0;background:linear-gradient(180deg,#e8e8e0,#8a8a80 45%,#3a3a34 100%);border:1px solid #222`;
      pegs.appendChild(p);
    }
    addEventListener('resize', () => this.layout());
  }
  private layout() {
    const r = this.root.getBoundingClientRect(); if (!r.width) return;
    const k = Math.min(r.width / W, r.height / H);
    const s = this.q('.scr'); s.style.transform = `translate(${(r.width - W * k) / 2}px,${(r.height - H * k) / 2}px) scale(${k})`;
  }
  // ---------- procedural art ----------
  private drawBackground() {
    const c = this.q<HTMLCanvasElement>('.bgc'), g = c.getContext('2d')!;
    g.fillStyle = '#121212'; g.fillRect(0, 0, W, H);
    // noise
    const im = g.getImageData(0, 0, W, H);
    for (let i = 0; i < im.data.length; i += 4) { const v = 14 + Math.random() * 16; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 255; }
    g.putImageData(im, 0, 0);
    // X-braced girders
    const beam = (x0: number, y0: number, x1: number, y1: number, w: number) => {
      const gr = g.createLinearGradient(x0 - w, y0, x0 + w, y0 + w);
      gr.addColorStop(0, '#2a2a2a'); gr.addColorStop(0.5, '#6c6c68'); gr.addColorStop(1, '#262626');
      g.strokeStyle = gr; g.lineWidth = w; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
      g.strokeStyle = 'rgba(160,160,150,.25)'; g.lineWidth = 1; g.beginPath(); g.moveTo(x0, y0 - w / 3); g.lineTo(x1, y1 - w / 3); g.stroke();
    };
    const S = 190;
    for (let x = -H; x < W + H; x += S) { beam(x, 0, x + H, H, 16); beam(x + H, 0, x, H, 16); }
    for (const y of [8, H - 10]) { const gr = g.createLinearGradient(0, y - 10, 0, y + 10); gr.addColorStop(0, '#222'); gr.addColorStop(0.5, '#5e5e5a'); gr.addColorStop(1, '#1c1c1c'); g.fillStyle = gr; g.fillRect(0, y - 10, W, 20); }
    for (let x = 0; x < W; x += S / 2) { g.fillStyle = '#7a7a72'; g.beginPath(); g.arc(x, 8, 2.5, 0, 7); g.fill(); g.beginPath(); g.arc(x, H - 10, 2.5, 0, 7); g.fill(); }
  }
  private drawRed() {
    const c = this.q<HTMLCanvasElement>('.redemb'), g = c.getContext('2d')!, w = c.width, h = c.height;
    const gr = g.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w * 0.7); gr.addColorStop(0, '#5a0000'); gr.addColorStop(0.5, '#a00808'); gr.addColorStop(1, '#3a0000');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(0,0,0,.55)'; g.beginPath(); g.ellipse(w / 2, h / 2 - 4, 30, 18, 0, 0, 7); g.fill();
    g.fillStyle = 'rgba(255,90,90,.5)'; g.beginPath(); g.ellipse(w / 2 - 12, h / 2 - 7, 7, 4, 0, 0, 7); g.ellipse(w / 2 + 12, h / 2 - 7, 7, 4, 0, 0, 7); g.fill();
    g.fillStyle = 'rgba(255,200,200,.75)'; g.font = '6px Arial';
    for (let i = 0; i < 3; i++) g.fillText('LET ME LIVE · MADE IN HEAVEN · ROCKFORT', 10, h - 18 + i * 6);
    g.strokeStyle = 'rgba(255,220,220,.8)'; g.lineWidth = 1;
    for (const [x, y, dx, dy] of [[3, 3, 1, 1], [w - 3, 3, -1, 1], [3, h - 3, 1, -1], [w - 3, h - 3, -1, -1]]) { g.beginPath(); g.moveTo(x, y + dy * 8); g.lineTo(x, y); g.lineTo(x + dx * 8, y); g.stroke(); }
  }
  private drawEmblem() {
    const c = this.q<HTMLCanvasElement>('.emblem'), g = c.getContext('2d')!, w = c.width, h = c.height;
    g.fillStyle = '#0c0c66'; g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(90,110,255,.7)'; g.lineWidth = 1;
    for (let x = 0; x <= w; x += 9) { g.beginPath(); g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, h); g.stroke(); }
    for (let y = 0; y <= h; y += 9) { g.beginPath(); g.moveTo(0, y + 0.5); g.lineTo(w, y + 0.5); g.stroke(); }
    // flames
    const flame = (x: number, y: number, s: number, a: number) => {
      g.save(); g.translate(x, y); g.rotate(a); const gr = g.createLinearGradient(0, 0, 0, -s); gr.addColorStop(0, '#ff4a00'); gr.addColorStop(0.6, '#ffb000'); gr.addColorStop(1, '#fff4a0');
      g.fillStyle = gr; g.beginPath(); g.moveTo(-s * 0.25, 0); g.quadraticCurveTo(-s * 0.35, -s * 0.5, 0, -s); g.quadraticCurveTo(s * 0.1, -s * 0.55, s * 0.3, 0); g.closePath(); g.fill(); g.restore();
    };
    for (let i = 0; i < 9; i++) flame(w / 2 + (i - 4) * 10, h * 0.72 - Math.abs(i - 4) * 3, 34 - Math.abs(i - 4) * 4, (i - 4) * 0.22);
    // angel wings
    g.fillStyle = '#e8e8f8';
    for (const sgn of [-1, 1]) { g.beginPath(); g.moveTo(w / 2, h * 0.45); g.quadraticCurveTo(w / 2 + sgn * 30, h * 0.18, w / 2 + sgn * 44, h * 0.3); g.quadraticCurveTo(w / 2 + sgn * 24, h * 0.38, w / 2 + sgn * 6, h * 0.55); g.fill(); }
    // figure
    g.fillStyle = '#1a1010'; g.beginPath(); g.arc(w / 2, h * 0.36, 6, 0, 7); g.fill();
    g.beginPath(); g.moveTo(w / 2 - 7, h * 0.44); g.lineTo(w / 2 + 7, h * 0.44); g.lineTo(w / 2 + 10, h * 0.78); g.lineTo(w / 2 - 10, h * 0.78); g.closePath(); g.fill();
    g.fillStyle = '#f6f0d0'; g.font = 'bold 8px Arial'; g.textAlign = 'center'; g.fillText('MADE IN HEAVEN', w / 2, h - 5);
  }
  /** condition level (4 steps like the original status screen): Fine, Caution (yellow), Caution (orange), Danger */
  private lvl() { const hp = this.player?.hp ?? HP_MAX; return hp >= 120 ? 0 : hp >= 60 ? 1 : hp >= 30 ? 2 : 3; }
  private cond() { return [0, 1, 1, 2][this.lvl()]; }
  private condRgb(a = 1) { return ['rgba(40,200,40,', 'rgba(230,200,30,', 'rgba(240,120,20,', 'rgba(220,40,30,'][this.lvl()] + a + ')'; }
  private drawEcg(dt: number) {
    const c = this.q<HTMLCanvasElement>('.ecg'), g = c.getContext('2d')!; this.ecgT += dt;
    const w = c.width, h = c.height; g.fillStyle = '#000'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#4a4a4a'; g.lineWidth = 1;
    for (let y = 6; y < h; y += 9) { g.beginPath(); g.moveTo(8, y + 0.5); g.lineTo(w - 8, y + 0.5); g.stroke(); }
    // damped-oscillation trace like the original "Fine" wave, sweeping left to right
    const period = [1.9, 1.3, 0.9][this.cond()], ph = (this.ecgT % period) / period, x0 = 40, span = w - 80, head = x0 + ph * span, y0 = h * 0.52;
    const yy = (x: number) => { const t = (x - x0) / span; if (t <= 0.18) return 0; const u = (t - 0.18) * 14; return Math.sin(u * 1.6) * Math.exp(-u * 0.32) * 0.95; };
    g.lineWidth = 2;
    for (let x = x0; x < head; x += 2) {
      const age = (head - x) / span;
      g.strokeStyle = this.condRgb(+Math.max(0, 1 - age * 1.6).toFixed(3));
      g.beginPath(); g.moveTo(x, y0 - yy(x) * h * 0.45); g.lineTo(x + 2, y0 - yy(x + 2) * h * 0.45); g.stroke();
    }
  }
  // ---------- 3D ----------
  private renderer() {
    if (!this.r3) {
      const cv = this.q<HTMLCanvasElement>('.chk canvas');
      this.r3 = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true });
      this.r3.outputColorSpace = THREE.LinearSRGBColorSpace;
    }
    return this.r3;
  }
  private async model(id: number): Promise<THREE.Object3D | null> {
    const n = `it_${String(id).padStart(3, '0')}.glb`;
    let g; try { g = await loadGLTF('inv/' + n); } catch { try { g = await loadGLTF('items/' + n); } catch { return null; } }
    const o = g.scene.clone(true); toLambert(o, 'inv');
    const box = new THREE.Box3().setFromObject(o); const c = box.getCenter(new THREE.Vector3()); const s = box.getSize(new THREE.Vector3()).length() || 1;
    o.position.sub(c); const piv = new THREE.Group(); piv.add(o); piv.scale.setScalar(2 / s);
    return piv;
  }
  private stageFor(obj: THREE.Object3D) {
    const scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0xffffff, 1.3)); const dl = new THREE.DirectionalLight(0xffffff, 2.4); dl.position.set(1, 2, 2.5); scene.add(dl);
    const dl2 = new THREE.DirectionalLight(0x9fd0ff, 0.8); dl2.position.set(-2, -1, -1); scene.add(dl2);
    scene.add(obj);
    const cam = new THREE.PerspectiveCamera(28, 1, 0.1, 50); cam.position.set(0, 0, 4.4); cam.lookAt(0, 0, 0);
    return { scene, cam };
  }
  async icon(id: number): Promise<string | null> {
    if (this.icons.has(id)) return this.icons.get(id)!;
    const obj = await this.model(id); if (!obj) return null;
    const s0 = new THREE.Box3().setFromObject(obj).getSize(new THREE.Vector3());
    const ov = (window as any).__iconRot?.[id] ?? ICON_ROT[id];
    if (ov) obj.rotation.set(ov[0], ov[1], ov[2]);
    else if (s0.y <= s0.x && s0.y <= s0.z) obj.rotation.set(1.15, 0, -0.25);
    else if (s0.x <= s0.y && s0.x <= s0.z) obj.rotation.set(0.3, -1.2, 0);
    else obj.rotation.set(0.3, -0.45, 0);
    const { scene, cam } = this.stageFor(obj); cam.aspect = 1.5; cam.updateProjectionMatrix();
    obj.updateMatrixWorld(true);
    const bb = new THREE.Box3().setFromObject(obj), sz = bb.getSize(new THREE.Vector3()), ct = bb.getCenter(new THREE.Vector3());
    const tn = Math.tan((cam.fov * Math.PI) / 360);
    const dist = (Math.max(sz.y, sz.x / cam.aspect) / (2 * tn)) * 1.08 + sz.z / 2;
    cam.position.set(ct.x, ct.y, ct.z + dist); cam.lookAt(ct);
    const r = this.renderer(); r.setSize(192, 128, false); r.setClearColor(0, 0); r.render(scene, cam);
    const url = r.domElement.toDataURL(); this.icons.set(id, url); return url;
  }
  /** status portrait: Claire's CG portrait (as in the original item screen) */
  private async renderPortrait() {
    if (this.portrait) return;
    this.portrait = assetUrl('inv/portrait.jpg');
    const img = new Image(); img.src = this.portrait; await img.decode().catch(() => {});
    const pc = this.q<HTMLCanvasElement>('.portrait'); pc.width = 252; pc.height = 240;
    pc.getContext('2d')!.drawImage(img, 0, 0, 252, 240);
  }
  // ---------- state ----------
  /** open / close with the original panel animation (8 frames slide, SE 7 when in place, SE 9 on close) */
  show(open: boolean, get = -1): Promise<void> {
    if (open) {
      this.open = true; this.root.style.display = 'block';
      this.layout(); this.mode = get >= 0 ? 'get' : 'list'; this.menuSel = 3; this.getId = get; this.cmbA = -1; this.ask = null;
      this.root.classList.toggle('get', get >= 0);
      this.setText(get >= 0 ? '' : this.curName());
      this.audio.se('menu');
      return new Promise((res) => {
        this.anim = { dir: 1, f: 0, wait: 0, se7: false, lock: get >= 0 ? 8 : 14, done: res };
        this.applyAnim();
        this.renderPortrait().then(() => this.render());
        if (get >= 0) this.showGetModel(get);
      });
    }
    if (!this.open) return Promise.resolve();
    this.anim?.done?.();
    this.ask?.res(this.ask.choices ? this.ask.choices.length - 1 : 0); this.ask = null;
    this.audio.sys(9);
    return new Promise((res) => {
      this.anim = { dir: -1, f: 8, wait: 6, se7: true, lock: 0, done: () => {
        this.open = false; this.root.style.display = 'none'; this.closeCheck(); this.mode = 'list';
        this.root.classList.remove('get'); this.getId = -1; res();
      } };
    });
  }
  /** one 30 Hz frame of the open / close animation */
  private stepAnim() {
    const a = this.anim!;
    if (a.dir > 0) {
      if (a.f < 8) { a.f++; if (a.f === 8 && !a.se7) { a.se7 = true; this.audio.sys(7); } }
      else if (--a.lock <= 0) { this.anim = null; a.done?.(); }
    } else if (a.wait > 0) a.wait--;
    else if (a.f > 0) a.f--;
    else { this.anim = null; a.done?.(); }
    this.applyAnim();
  }
  private applyAnim() {
    const f = this.anim ? this.anim.f : 8, k = 1 - f / 8;
    this.root.querySelectorAll<HTMLElement>('.grp').forEach((g) => {
      const o = CEN_OFF[+g.dataset.c!] ?? [0, 0];
      g.style.transform = k ? `translate(${(o[0] * k * W) / 640}px,${(o[1] * k * H) / 480}px)` : '';
    });
    const op = Math.min(1, f * 0.0571 * 2.2);
    this.root.style.background = `rgba(0,0,0,${op})`; this.q<HTMLElement>('.bgc').style.opacity = String(Math.min(1, f * 0.0571));
  }
  /** message box question / pages inside the status screen; resolves with the chosen index (0 without choices) */
  say(pg: string[], choices?: string[]): Promise<number> {
    this.ask?.res(-1);
    return new Promise((res) => { this.ask = { pages: pg.length ? pg : [''], page: 0, choices: choices ?? null, sel: 0, res }; this.renderAsk(); });
  }
  private renderAsk() {
    const a = this.ask!, last = a.page === a.pages.length - 1, el = this.q('.msgtx');
    el.innerHTML = escapeHtml(a.pages[a.page]) + (last && a.choices ? '\n' + a.choices.map((c, i) => `<span class="ich ${i === a.sel ? 'sel' : ''}">${escapeHtml(c)}</span>`).join('') : '');
  }
  private updateAsk() {
    const a = this.ask!, inp = this.input, last = a.page === a.pages.length - 1;
    const end = (v: number) => { this.ask = null; this.q('.msgtx').textContent = this.text; a.res(v); };
    if (last && a.choices) {
      if (inp.hit('KeyA', 'ArrowLeft') || inp.hit('KeyD', 'ArrowRight')) { a.sel = (a.sel + 1) % a.choices.length; this.audio.se('cursor'); this.renderAsk(); }
      else if (inp.action) { this.audio.se(a.sel === a.choices.length - 1 ? 'cancel' : 'menu'); end(a.sel); }
      else if (inp.cancel) { this.audio.se('cancel'); end(a.choices.length - 1); }
    } else if (inp.action || inp.cancel) { if (last) end(0); else { a.page++; this.renderAsk(); } }
  }
  /** GetItem: the picked-up item turns in the check window */
  private async showGetModel(id: number) {
    const obj = await this.model(id); if (this.getId !== id) return;
    const box = this.q('.chk'); box.style.display = 'block'; this.q('.chk .hint').textContent = '';
    const r = this.renderer(); r.setSize(538, 278, false);
    const grp = new THREE.Group(); if (obj) { grp.add(obj); const ov = ICON_ROT[id]; if (ov) obj.rotation.set(ov[0], ov[1], ov[2]); }
    const { scene, cam } = this.stageFor(grp); cam.aspect = 538 / 278; cam.position.z = 3.4; cam.updateProjectionMatrix();
    this.chk = { scene, cam, obj: grp, rx: 0.35, ry: 0 };
  }
  /** redraw after the game changed the inventory */
  refresh() { this.render(); }
  /** Use_00: recovery items (curedata) */
  heal(id: number) {
    const c = CUREDATA[id - 20] ?? 0, h = c & 15, P = this.player; if (!P) return;
    if (h === 1) P.hp += 50; else if (h === 2) P.hp += 100; else if (h >= 3) P.hp = HP_MAX;
    P.hp = Math.min(HP_MAX, P.hp);
  }
  private cur(): InvItem | null { return this.inv.slots[this.sel] ?? null; }
  private curName() { const s = this.cur(); return s ? itemName(s.name) : ''; }
  private setText(t: string | string[]) { this.pages = Array.isArray(t) ? t : t.split('\f'); this.page = 0; this.text = this.pages[0] ?? ''; const el = this.q('.msgtx'); if (el) el.textContent = this.text; }
  private slotHtml(it: InvItem | null | undefined, icon: string | null, extra = '') {
    if (!it) return '';
    return `${icon ? `<img src="${icon}">` : `<span style="font:bold 12px Arial">${escapeHtml(itemName(it.name))}</span>`}${it.count > 1 || it.id === 12 || it.id === 9 ? `<span class="cnt">${it.count}</span>` : ''}${extra}`;
  }
  async render() {
    const q = this.q;
    q('.menu').innerHTML = T.menu().map((t, i) => `<div class="btn ${i === 3 && this.mode !== 'menu' ? 'on' : ''} ${this.mode === 'menu' && i === this.menuSel ? 'on sel' : ''}" style="position:absolute;left:${[18, 116, 216, 314][i]}px;top:18px;width:90px;height:38px">${t}</div>`).join('');
    (q('.menu') as HTMLElement).style.cssText = 'left:40px;top:55px;width:0;height:0';
    q('.l-eq').textContent = T.equip(); q('.l-st').textContent = T.standard(); q('.l-status').textContent = T.status();
    q('.l-name').textContent = T.name(); q('.l-info').textContent = T.info(); q('.l-cond').textContent = T.cond(); q('.l-list').textContent = T.list();
    q('.i-full').textContent = T.full(); q('.i-h').textContent = T.height(); q('.i-w').textContent = T.weight(); q('.i-b').textContent = T.blood();
    q('.i-cm').textContent = T.cm(); q('.i-kg').textContent = T.kg(); q('.i-bt').textContent = T.btype(); { const st = this.cond(), el = q('.fine') as HTMLElement; el.textContent = st === 2 ? T.danger() : st === 1 ? T.caution() : T.fine(); el.style.color = this.condRgb(); }
    const find = (id: number | null) => (id == null ? null : this.inv.slots.find((s) => s?.id === id) ?? null);
    const eq = find(this.equipped), st = find(this.standard);
    if (!eq && this.equipped != null) { this.equipped = null; this.onEquipChange?.(); } if (!st && this.standard != null) { this.standard = null; this.onEquipChange?.(); }
    q('.eqbox').innerHTML = eq ? `<div class="slot" style="left:50px;top:0">${this.slotHtml(eq, await this.icon(eq.id))}</div>` : '';
    q('.stbox').innerHTML = st ? `<div class="slot" style="left:0;top:0">${this.slotHtml(st, await this.icon(st.id))}</div>` : '';
    const html: string[] = [];
    for (let i = 0; i < 8; i++) {
      const s = this.inv.slots[i]; const ic = s ? await this.icon(s.id) : null;
      const mark = s && (s.id === this.equipped || s.id === this.standard) ? '<span class="eq">E</span>' : '';
      html.push(`<div class="slot ${i === this.sel && this.mode !== 'menu' && this.mode !== 'get' ? 'sel' : ''} ${this.mode === 'comb' && i === this.cmbA ? 'cmb' : ''}" style="left:${(i % 2) * 100}px;top:${Math.floor(i / 2) * 65.5}px">${this.slotHtml(s, ic, mark)}</div>`);
    }
    q('.list').innerHTML = html.join('');
    const sub = q('.sub');
    if (this.mode === 'sub') {
      sub.innerHTML = this.subOpts.map((o, i) => `<div class="${i === this.subSel ? 'sel' : ''}">${o.t}</div>`).join('');
      sub.style.left = '478px'; sub.style.top = Math.min(330, 175 + Math.floor(this.sel / 2) * 65) + 'px'; sub.style.display = 'block';
    } else sub.style.display = 'none';
    if (this.ask) this.renderAsk(); else q('.msgtx').textContent = this.text;
  }
  private openSub() {
    const s = this.cur(); if (!s) return;
    const first = WEAPONS.has(s.id) ? { t: this.equipped === s.id ? T.unequip() : T.equipA(), k: 'use' }
      : STANDARD.has(s.id) ? { t: this.standard === s.id ? T.putAway() : T.hold(), k: 'use' } : { t: T.use(), k: 'use' };
    this.subOpts = [first, { t: T.check(), k: 'check' }, { t: T.combine(), k: 'combine' }];
    this.subSel = 0; this.mode = 'sub'; this.audio.se('menu');
  }
  private doUse() {
    const s = this.cur(); if (!s) return;
    if (WEAPONS.has(s.id)) {
      // a weapon and the lighter share Claire's hands: equipping one puts the other away
      this.equipped = this.equipped === s.id ? null : s.id; if (this.equipped) this.standard = null;
      this.onEquipChange?.(); this.setText(this.equipped ? T.equipped(itemName(s.name)) : this.curName());
    } else if (STANDARD.has(s.id)) {
      this.standard = this.standard === s.id ? null : s.id; if (this.standard) this.equipped = null; this.onEquipChange?.();
      this.setText(this.standard ? T.lit() : T.unlit());
    } else if (s.id >= 20 && s.id <= 29) {
      if (CUREDATA[s.id - 20] === 0) { this.setText(pages(SYSMES[161])); return; } // red herb alone
      this.heal(s.id); this.inv.take(s.id); this.setText(this.curName());
    } else if (this.onUseItem?.(s.id)) return;
    else this.setText(pages(SYSMES[AMMO.has(s.id) ? 160 : 161]));
  }
  /** Combi_00 / herb mixing: item in slot a is combined into slot b */
  private async combine(a: number, b: number) {
    const A = this.inv.slots[a], B = this.inv.slots[b];
    const e = A && B && a !== b ? COMBI[B.id]?.find((x) => x[0] === A.id) : undefined;
    if (!A || !B || !e) { this.audio.se('error'); return; }
    const [, res, type] = e;
    if (type === 0 || type === 1) {
      const [W_, M] = AMMO.has(A.id) ? [B, A] : [A, B];
      if (!AMMO.has(M.id)) { this.inv.slots[a] = null; B.id = res; B.name = ITEM_NAMES[res] ?? B.name; this.audio.se('menu'); return; }
      const max = BULLET_MAX[W_.id] ?? 15, n = Math.min(max - W_.count, M.count);
      if (n <= 0) { this.audio.se('cancel'); this.setText(pages(SYSMES[156])); return; }
      W_.count += n; M.count -= n; if (M.count <= 0) this.inv.slots[this.inv.slots.indexOf(M)] = null;
      this.audio.se('menu');
    } else if (type === 2) {
      B.count += A.count; this.inv.slots[a] = null; this.audio.se('menu');
    } else if (type === 6) {
      this.audio.se('menu');
      const c = await this.say(pages(SYSMES[155]), [UI.yes(), UI.no()]);
      if (c !== 0) return;
      this.inv.slots[a] = null; this.inv.slots[b] = { id: res, name: ITEM_NAMES[res] ?? '', count: 1 };
      this.sel = b;
    } else { this.audio.se('error'); return; }
    this.setText(this.curName());
  }
  private async openCheck() {
    const s = this.cur(); if (!s) return;
    const obj = await this.model(s.id);
    const box = this.q('.chk'); box.style.display = 'block'; this.q('.chk .hint').textContent = T.rot();
    const r = this.renderer(); r.setSize(538, 278, false);
    const grp = new THREE.Group(); if (obj) { grp.add(obj); const ov = ICON_ROT[s.id]; if (ov) obj.rotation.set(ov[0], ov[1], ov[2]); }
    const { scene, cam } = this.stageFor(grp); cam.aspect = 538 / 278; cam.position.z = 3.4; cam.updateProjectionMatrix();
    this.chk = { scene, cam, obj: grp, rx: 0.35, ry: 0 };
    this.setText(itemDesc(s.id));
    this.mode = 'check';
  }
  private closeCheck() { this.chk = null; const b = this.q('.chk'); if (b) b.style.display = 'none'; if (this.mode === 'check') this.mode = 'list'; }
  private spinGet(dt: number) {
    if (this.mode !== 'get' || !this.chk) return;
    const c = this.chk; c.ry += dt * 0.6; c.obj.rotation.set(c.rx, c.ry, 0);
    this.r3!.setClearColor(0, 0); this.r3!.render(c.scene, c.cam);
  }
  /** Per-frame update while the screen is open. Returns false when the screen was closed. */
  update(dt: number): boolean {
    if (!this.open) return false;
    const inp = this.input;
    this.acc += dt;
    if (this.anim) {
      while (this.acc >= 1 / 30 && this.anim) { this.acc -= 1 / 30; this.stepAnim(); }
      this.drawEcg(dt); this.spinGet(dt);
      return true;
    }
    this.acc = 0;
    if (this.mode === 'get') { this.drawEcg(dt); this.spinGet(dt); if (this.ask) this.updateAsk(); return true; }
    if (this.ask) { this.drawEcg(dt); this.updateAsk(); return true; }
    const L = inp.hit('KeyA', 'ArrowLeft'), R = inp.hit('KeyD', 'ArrowRight'), U = inp.hit('KeyW', 'ArrowUp'), D = inp.hit('KeyS', 'ArrowDown');
    this.drawEcg(dt);
    if (this.mode === 'check' && this.chk) {
      const c = this.chk;
      if (inp.has('KeyA', 'ArrowLeft')) c.ry -= dt * 2.2; else if (inp.has('KeyD', 'ArrowRight')) c.ry += dt * 2.2; else c.ry += dt * 0.6;
      if (inp.has('KeyW', 'ArrowUp')) c.rx -= dt * 2.2; if (inp.has('KeyS', 'ArrowDown')) c.rx += dt * 2.2;
      c.obj.rotation.set(c.rx, c.ry, 0);
      this.r3!.setClearColor(0, 0); this.r3!.render(c.scene, c.cam);
      if (inp.action) {
        if (this.page + 1 < this.pages.length) { this.page++; this.text = this.pages[this.page]; this.q('.msgtx').textContent = this.text; this.audio.se('cursor'); }
        else { this.audio.se('cancel'); this.closeCheck(); this.setText(this.curName()); this.render(); }
      } else if (inp.cancel || inp.inventory) { this.audio.se('cancel'); this.closeCheck(); this.setText(this.curName()); this.render(); }
      return true;
    }
    if (this.mode === 'sub') {
      if (U || D) { this.subSel = (this.subSel + (D ? 1 : this.subOpts.length - 1)) % this.subOpts.length; this.audio.se('cursor'); this.render(); }
      else if (inp.action) {
        const k = this.subOpts[this.subSel].k; this.mode = 'list';
        if (k === 'use') { this.audio.se('menu'); this.doUse(); this.render(); }
        else if (k === 'check') { this.audio.se('menu'); this.openCheck().then(() => this.render()); }
        else { this.audio.se('menu'); this.cmbA = this.sel; this.mode = 'comb'; this.render(); }
      } else if (inp.cancel) { this.mode = 'list'; this.audio.se('cancel'); this.render(); }
      return true;
    }
    if (this.mode === 'menu') {
      if (L || R) { this.menuSel = (this.menuSel + (R ? 1 : 3)) % 4; this.audio.se('cursor'); this.setText(''); this.render(); }
      else if (D) { this.mode = 'list'; this.menuSel = 3; this.audio.se('cursor'); this.setText(this.curName()); this.render(); }
      else if (inp.action) {
        if (this.menuSel === 3) { this.mode = 'list'; this.audio.se('menu'); this.setText(this.curName()); this.render(); }
        else if (this.menuSel === 0) { this.audio.se('cancel'); return false; }
        else { this.audio.se('menu'); this.setText(T.noData()); }
      } else if (inp.cancel || inp.inventory) { this.audio.se('cancel'); return false; }
      return true;
    }
    if (this.mode === 'comb') {
      let d = 0;
      if (L && this.sel % 2 === 1) d = -1; if (R && this.sel % 2 === 0) d = 1; if (D && this.sel < 6) d = 2; if (U && this.sel >= 2) d = -2;
      if (d) { this.sel += d; this.audio.se('cursor'); this.setText(this.curName()); this.render(); }
      else if (inp.action) { const a = this.cmbA; this.mode = 'list'; this.cmbA = -1; this.combine(a, this.sel).then(() => this.render()); this.render(); }
      else if (inp.cancel) { this.mode = 'list'; this.cmbA = -1; this.audio.se('cancel'); this.render(); }
      return true;
    }
    // item list (2 columns x 4 rows)
    let d = 0;
    if (L && this.sel % 2 === 1) d = -1; if (R && this.sel % 2 === 0) d = 1;
    if (D && this.sel < 6) d = 2;
    if (U) { if (this.sel >= 2) d = -2; else { this.mode = 'menu'; this.menuSel = 3; this.audio.se('cursor'); this.render(); return true; } }
    if (d) { this.sel += d; this.audio.se('cursor'); this.setText(this.curName()); this.render(); }
    else if (inp.action) { if (this.cur()) { this.openSub(); this.render(); } }
    else if (inp.cancel || inp.inventory) { this.audio.se('cancel'); return false; }
    return true;
  }
}
