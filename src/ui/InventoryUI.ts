import { ITEMS, type ItemInstance } from '../game/inventory/Items';
import type { Inventory, ItemBox } from '../game/inventory/Inventory';
import { combine, magSize } from '../game/inventory/Crafting';
import { audio } from '../engine/AudioEngine';
import { iconHTML } from './ItemIcons';

export interface InventoryHost {
  inventory: Inventory;
  itemBox: ItemBox;
  equippedUid(): number | null;
  use(it: ItemInstance): void;
  equip(it: ItemInstance): void;
  status(): { hp: number; label: string; color: string };
  docs(): { title: string; body: string }[];
  onClose(): void;
}

type Focus = { area: 'inv' | 'box'; index: number };

/**
 * RE2-Remake style inventory: condition ECG + equipped weapon on the left, 8 item slots (4×2)
 * on the right, item name/description underneath, context menu per item
 * (Use / Equip / Examine / Combine / Discard, Store in item-box mode).
 * Mouse: click a slot → menu. Keyboard: arrows/WASD — move, Enter/E/Space — menu, Backspace — back.
 */
export class InventoryUI {
  root: HTMLDivElement;
  private focus: Focus = { area: 'inv', index: 0 };
  private menu: { it: ItemInstance; area: 'inv' | 'box'; index: number } | null = null;
  private menuSel = 0;
  private combineSrc: ItemInstance | null = null;
  private examine: ItemInstance | null = null;
  private note = '';
  private boxMode = false;
  private tab: 'items' | 'files' = 'items';
  private fileSel = 0;
  private raf = 0;
  private ecgPhase = 0;
  isOpen = false;

  constructor(parent: HTMLElement, private host: InventoryHost) {
    this.root = document.createElement('div');
    this.root.className = 'inv hidden';
    parent.appendChild(this.root);
    window.addEventListener('keydown', (e) => this.onKey(e), true);
  }

  open(boxMode = false): void {
    this.boxMode = boxMode;
    this.isOpen = true;
    this.menu = null; this.combineSrc = null; this.examine = null; this.note = '';
    this.focus = { area: 'inv', index: 0 };
    this.tab = 'items';
    this.root.classList.remove('hidden');
    this.render();
    const loop = () => { if (!this.isOpen) return; this.drawEcg(); this.raf = requestAnimationFrame(loop); };
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(loop);
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    cancelAnimationFrame(this.raf);
    this.root.classList.add('hidden');
    this.host.onClose();
  }

  // ------------------------------------------------------------------ render
  private renderFiles(): void {
    const docs = this.host.docs();
    this.fileSel = Math.min(this.fileSel, Math.max(0, docs.length - 1));
    const d = docs[this.fileSel];
    this.root.innerHTML = `
      <div class="inv-top"><span class="tab" data-t="items">ПРЕДМЕТЫ</span><span class="tab on" data-t="files">ФАЙЛЫ</span></div>
      <div class="files"><div class="list">${docs.map((x, i) => `<div data-i="${i}" class="${i === this.fileSel ? 'on' : ''}">${x.title}</div>`).join('') || '<i style="color:#666">Пока нет файлов</i>'}</div>
      <div class="page">${d ? `<h3>${d.title}</h3>${d.body}` : ''}</div></div>
      <div class="inv-hint">↑/↓ — выбор файла · Q / E — вкладки · Tab / Esc — закрыть</div>`;
    this.root.querySelectorAll<HTMLDivElement>('.list div[data-i]').forEach((el) => { el.onpointerdown = () => { this.fileSel = +el.dataset.i!; this.renderFiles(); }; });
    this.bindTabs();
  }

  private bindTabs(): void {
    this.root.querySelectorAll<HTMLSpanElement>('.inv-top .tab').forEach((el) => {
      el.onpointerdown = (e) => { e.stopPropagation(); this.tab = el.dataset.t as 'items' | 'files'; this.menu = null; this.combineSrc = null; this.render(); };
    });
  }

  render(): void {
    if (this.tab === 'files') { this.renderFiles(); return; }
    const inv = this.host.inventory;
    const st = this.host.status();
    const eqUid = this.host.equippedUid();
    const eq = eqUid != null ? inv.get(eqUid) : undefined;
    const slots = inv.slots();
    const focused = this.focusedItem();
    const box = this.host.itemBox.items;
    const slotHTML = (it: ItemInstance | null, area: 'inv' | 'box', i: number) => {
      const f = this.focus.area === area && this.focus.index === i;
      if (!it) return `<div class="slot empty${f ? ' focus' : ''}" data-a="${area}" data-i="${i}"></div>`;
      const d = ITEMS[it.defId];
      const qty = d.kind === 'weapon' && d.weaponId !== 'knife' ? `${it.mag ?? 0}` : d.maxStack > 1 ? `${it.qty}` : '';
      const cls = ['slot', f ? 'focus' : '', it.uid === eqUid && area === 'inv' ? 'equipped' : '', this.combineSrc?.uid === it.uid ? 'combine-src' : '', d.kind === 'key' ? 'key' : ''].join(' ');
      return `<div class="${cls}" data-a="${area}" data-i="${i}">${iconHTML(it.defId)}${qty ? `<span class="qty${d.kind === 'weapon' ? ' w' : ''}">${qty}</span>` : ''}</div>`;
    };
    let desc = '';
    if (this.combineSrc) desc = `<h4>Совместить: ${ITEMS[this.combineSrc.defId].name}</h4><p>Выберите предмет для совмещения. Backspace — отмена.</p>`;
    else if (this.note) desc = this.note;
    else if (focused) desc = this.describe(focused);
    this.root.innerHTML = `
      <div class="inv-top"><span class="tab on" data-t="items">ПРЕДМЕТЫ</span><span class="tab" data-t="files">ФАЙЛЫ</span></div>
      <div class="inv-body">
        <div class="inv-left">
          <div class="cond"><div class="cond-h">СОСТОЯНИЕ</div><canvas width="360" height="120"></canvas>
            <div class="cond-l" style="color:${st.color}">${st.label}</div></div>
          <div class="eqp"><div class="cond-h">ЭКИПИРОВАНО</div>
            ${eq ? `<div class="eqp-row">${iconHTML(eq.defId, 'ico big')}<div><b>${ITEMS[eq.defId].name}</b>${ITEMS[eq.defId].weaponId !== 'knife' ? `<span class="am">${eq.mag ?? 0}<small> / ${magSize(eq)}</small></span>` : ''}</div></div>` : '<div class="eqp-row"><i>—</i></div>'}
          </div>
        </div>
        ${this.boxMode ? `<div class="inv-box"><div class="cond-h">СУНДУК · ${box.length}</div><div class="box-grid">${box.map((it, i) => slotHTML(it, 'box', i)).join('') || '<div class="box-empty">пусто</div>'}</div></div>` : ''}
        <div class="inv-right">
          <div class="cond-h">ИНВЕНТАРЬ · ${inv.items.length}/${inv.capacity}</div>
          <div class="slots" style="grid-template-columns:repeat(${inv.cols}, 1fr)">${slots.map((it, i) => slotHTML(it, 'inv', i)).join('')}</div>
          <div class="inv-desc">${desc}</div>
        </div>
      </div>
      <div class="inv-hint">ЛКМ / Enter — действия · ←↑→↓ — выбор · Backspace — назад · Q — файлы · Tab / Esc — закрыть</div>
      ${this.examine ? `<div class="examine"><div class="ex-ico">${iconHTML(this.examine.defId, 'ico huge')}</div><div class="ex-t">${this.describe(this.examine)}</div><div class="ex-h">ЛКМ / Backspace — назад</div></div>` : ''}`;
    this.root.querySelectorAll<HTMLDivElement>('.slot').forEach((el) => {
      const area = el.dataset.a as 'inv' | 'box', i = +el.dataset.i!;
      el.addEventListener('pointerenter', () => { if (this.menu || this.examine) return; this.focus = { area, index: i }; this.refreshDesc(); this.markFocus(); });
      el.addEventListener('pointerdown', (e) => { if (e.button !== 0) return; e.stopPropagation(); this.focus = { area, index: i }; this.activate(el); });
      el.addEventListener('contextmenu', (e) => e.preventDefault());
    });
    this.root.onpointerdown = () => { if (this.examine) { this.examine = null; this.render(); } else if (this.menu) { this.menu = null; this.render(); } };
    if (this.menu) this.renderMenu();
    this.bindTabs();
    this.drawEcg(true);
  }

  private describe(it: ItemInstance): string {
    const d = ITEMS[it.defId];
    let extra = '';
    if (d.kind === 'weapon' && d.weaponId !== 'knife') extra = `<p class="stat">Патроны: ${it.mag ?? 0}/${magSize(it)}${it.loaded ? ' · ' + ITEMS[it.loaded].name : ''}${it.mods?.length ? '<br/>Детали: ' + it.mods.map((m) => ITEMS[m].name).join(', ') : ''}</p>`;
    else if (d.maxStack > 1) extra = `<p class="stat">Количество: ${it.qty}</p>`;
    return `<h4>${d.name}</h4><p>${d.desc}</p>${extra}`;
  }

  private focusedItem(): ItemInstance | null {
    if (this.focus.area === 'box') return this.host.itemBox.items[this.focus.index] ?? null;
    return this.host.inventory.slots()[this.focus.index] ?? null;
  }

  private refreshDesc(): void {
    const el = this.root.querySelector('.inv-desc');
    const it = this.focusedItem();
    if (el && !this.combineSrc) el.innerHTML = this.note || (it ? this.describe(it) : '');
  }

  private markFocus(): void {
    this.root.querySelectorAll<HTMLDivElement>('.slot').forEach((el) => el.classList.toggle('focus', el.dataset.a === this.focus.area && +el.dataset.i! === this.focus.index));
  }

  // ------------------------------------------------------------------ actions
  private actions(it: ItemInstance, area: 'inv' | 'box'): [string, () => void][] {
    const d = ITEMS[it.defId];
    const out: [string, () => void][] = [];
    if (area === 'box') {
      out.push(['Взять', () => { if (!this.host.itemBox.retrieve(this.host.inventory, it.uid)) this.flash('Инвентарь полон.'); else audio.ui(); }]);
      out.push(['Осмотреть', () => { this.examine = it; }]);
      return out;
    }
    if (d.kind === 'herb') out.push(['Использовать', () => { this.host.use(it); audio.ui(); }]);
    if (d.kind === 'weapon') out.push([this.host.equippedUid() === it.uid ? 'Экипировано' : 'Экипировать', () => { this.host.equip(it); audio.ui(); }]);
    out.push(['Осмотреть', () => { this.examine = it; }]);
    out.push(['Совместить', () => { this.combineSrc = it; }]);
    if (this.boxMode) out.push(['В сундук', () => { this.host.itemBox.store(this.host.inventory, it.uid); audio.ui(); }]);
    if (d.kind !== 'key' && d.weaponId !== 'knife') out.push(['Выбросить', () => { this.host.inventory.remove(it.uid); audio.click(); }]);
    return out;
  }

  private activate(el?: HTMLElement): void {
    this.note = '';
    const it = this.focusedItem();
    if (this.combineSrc) {
      if (it && it.uid !== this.combineSrc.uid && this.focus.area === 'inv') {
        const r = combine(this.host.inventory, this.combineSrc, it);
        this.combineSrc = null;
        if (r.ok) audio.pickup(); else audio.click();
        this.note = `<h4>${r.ok ? 'Готово' : 'Нельзя'}</h4><p>${r.text}</p>`;
      } else this.combineSrc = null;
      this.render();
      return;
    }
    if (!it) return;
    this.menu = { it, area: this.focus.area, index: this.focus.index };
    this.menuSel = 0;
    this.render();
    void el;
  }

  private renderMenu(): void {
    const m = this.menu!;
    const slot = this.root.querySelector<HTMLDivElement>(`.slot[data-a="${m.area}"][data-i="${m.index}"]`);
    if (!slot) return;
    const acts = this.actions(m.it, m.area);
    const r = slot.getBoundingClientRect();
    const box = document.createElement('div');
    box.className = 'ctx';
    box.style.left = `${r.right + 6}px`; box.style.top = `${r.top}px`;
    acts.forEach(([label, fn], i) => {
      const b = document.createElement('div');
      b.className = 'ctx-i' + (i === this.menuSel ? ' on' : '');
      b.textContent = label;
      b.onpointerenter = () => { this.menuSel = i; box.querySelectorAll('.ctx-i').forEach((x, j) => x.classList.toggle('on', j === i)); };
      b.onpointerdown = (e) => { e.stopPropagation(); this.runAction(fn); };
      box.appendChild(b);
    });
    this.root.appendChild(box);
    const br = box.getBoundingClientRect();
    if (br.right > window.innerWidth - 8) box.style.left = `${r.left - br.width - 6}px`;
  }

  private runAction(fn: () => void): void {
    this.menu = null;
    fn();
    const n = this.focus.area === 'box' ? this.host.itemBox.items.length : this.host.inventory.capacity;
    if (this.focus.area === 'box' && this.focus.index >= n) this.focus.index = Math.max(0, n - 1);
    this.render();
  }

  private flash(text: string): void { this.note = `<h4>—</h4><p>${text}</p>`; }

  private onKey(e: KeyboardEvent): void {
    if (!this.isOpen) return;
    const k = e.code;
    if (k === 'Tab') e.preventDefault();
    const back = k === 'Backspace' || (k === 'Escape' && (this.menu || this.examine || this.combineSrc));
    if (back) {
      e.preventDefault(); e.stopImmediatePropagation();
      this.menu = null; this.examine = null; this.combineSrc = null; this.render();
      return;
    }
    if (k === 'KeyQ' && !this.menu && !this.examine) { this.tab = this.tab === 'items' ? 'files' : 'items'; this.render(); return; }
    if (this.tab === 'files') {
      const n = this.host.docs().length;
      if (k === 'ArrowDown' || k === 'KeyS') { this.fileSel = Math.min(n - 1, this.fileSel + 1); this.renderFiles(); }
      else if (k === 'ArrowUp' || k === 'KeyW') { this.fileSel = Math.max(0, this.fileSel - 1); this.renderFiles(); }
      else if (k === 'KeyE') { this.tab = 'items'; this.render(); }
      return;
    }
    if (this.examine) { if (k === 'Enter' || k === 'Space' || k === 'KeyE') { this.examine = null; this.render(); } return; }
    if (this.menu) {
      const acts = this.actions(this.menu.it, this.menu.area);
      if (k === 'ArrowDown' || k === 'KeyS') { this.menuSel = (this.menuSel + 1) % acts.length; this.render(); }
      else if (k === 'ArrowUp' || k === 'KeyW') { this.menuSel = (this.menuSel + acts.length - 1) % acts.length; this.render(); }
      else if (k === 'Enter' || k === 'Space' || k === 'KeyE') this.runAction(acts[this.menuSel][1]);
      e.preventDefault();
      return;
    }
    const inv = this.host.inventory;
    const f = this.focus;
    const cols = f.area === 'inv' ? inv.cols : 6;
    const n = f.area === 'inv' ? inv.capacity : this.host.itemBox.items.length;
    let moved = true;
    if (k === 'ArrowRight' || k === 'KeyD') {
      if (f.area === 'box' && (f.index % cols === cols - 1 || f.index === n - 1)) this.focus = { area: 'inv', index: 0 };
      else f.index = Math.min(n - 1, f.index + 1);
    } else if (k === 'ArrowLeft' || k === 'KeyA') {
      if (f.area === 'inv' && f.index % cols === 0 && this.boxMode && this.host.itemBox.items.length) this.focus = { area: 'box', index: 0 };
      else f.index = Math.max(0, f.index - 1);
    } else if (k === 'ArrowDown' || k === 'KeyS') f.index = Math.min(n - 1, f.index + cols);
    else if (k === 'ArrowUp' || k === 'KeyW') f.index = Math.max(0, f.index - cols);
    else if (k === 'Enter' || k === 'Space' || k === 'KeyE') { this.activate(); moved = false; e.preventDefault(); }
    else moved = false;
    if (moved) { this.note = ''; this.markFocus(); this.refreshDesc(); e.preventDefault(); }
  }

  // ------------------------------------------------------------------ ECG
  private drawEcg(reset = false): void {
    const c = this.root.querySelector<HTMLCanvasElement>('.cond canvas');
    if (!c) return;
    const g = c.getContext('2d')!;
    const st = this.host.status();
    const W = c.width, H = c.height;
    if (reset) g.clearRect(0, 0, W, H);
    this.ecgPhase += st.label === 'FINE' ? 0.006 : st.label === 'CAUTION' ? 0.009 : 0.013;
    g.clearRect(0, 0, W, H);
    g.strokeStyle = 'rgba(120,160,200,.12)'; g.lineWidth = 1;
    for (let x = 0; x < W; x += 20) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
    for (let y = 0; y < H; y += 20) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
    const head = (this.ecgPhase % 1) * W;
    const amp = st.label === 'DANGER' ? 0.55 : 1;
    const wave = (x: number) => {
      const ph = ((x / W) * 2.5) % 1;
      let y = H / 2;
      if (ph < 0.06) y -= Math.sin(ph / 0.06 * Math.PI) * 6;
      else if (ph > 0.12 && ph < 0.16) y += 9 * amp;
      else if (ph >= 0.16 && ph < 0.21) y -= 44 * amp * Math.sin((ph - 0.16) / 0.05 * Math.PI);
      else if (ph >= 0.21 && ph < 0.25) y += 13 * amp;
      else if (ph > 0.4 && ph < 0.52) y -= Math.sin((ph - 0.4) / 0.12 * Math.PI) * 9;
      return y;
    };
    g.lineWidth = 3; g.shadowColor = st.color; g.shadowBlur = 10;
    for (let x = 0; x < W; x += 3) {
      const age = (head - x + W) % W;
      const alpha = Math.max(0, 1 - age / W);
      g.strokeStyle = st.color; g.globalAlpha = alpha;
      g.beginPath(); g.moveTo(x, wave(x)); g.lineTo(x + 3, wave(x + 3)); g.stroke();
    }
    g.globalAlpha = 1; g.shadowBlur = 0;
  }
}
