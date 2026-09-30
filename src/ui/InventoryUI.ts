import { ITEMS, footprint, type ItemInstance } from '../game/inventory/Items';
import type { Inventory, ItemBox } from '../game/inventory/Inventory';
import { combine, magSize } from '../game/inventory/Crafting';
import { audio } from '../engine/AudioEngine';

export interface InventoryHost {
  inventory: Inventory;
  itemBox: ItemBox;
  equippedUid(): number | null;
  use(it: ItemInstance): void;
  equip(it: ItemInstance): void;
  status(): { hp: number; label: string; color: string };
  onClose(): void;
}

const CELL = 58;

/**
 * Attaché-case inventory (8×6 Tetris grid).
 * Drag & drop to move, R while dragging to rotate, drop an item onto another to combine,
 * side panel actions: Use / Equip / Combine / Examine / Discard / Store in box.
 */
export class InventoryUI {
  root: HTMLDivElement;
  private grid!: HTMLDivElement;
  private side!: HTMLDivElement;
  private boxPanel!: HTMLDivElement;
  private selected: ItemInstance | null = null;
  private combineSrc: ItemInstance | null = null;
  private drag: { it: ItemInstance; el: HTMLDivElement; rot: boolean; offX: number; offY: number; ghost: HTMLDivElement } | null = null;
  private boxMode = false;
  isOpen = false;

  constructor(parent: HTMLElement, private host: InventoryHost) {
    this.root = document.createElement('div');
    this.root.className = 'inv hidden';
    parent.appendChild(this.root);
    window.addEventListener('pointermove', (e) => this.onMove(e));
    window.addEventListener('pointerup', (e) => this.onUp(e));
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      if (e.code === 'KeyR' && this.drag) { this.drag.rot = !this.drag.rot; this.layoutDrag(e as unknown as PointerEvent); }
      if (e.code === 'Tab') e.preventDefault(); // closing is handled by the game loop (Tab / I / Esc)
    });
  }

  open(boxMode = false): void {
    this.boxMode = boxMode;
    this.isOpen = true;
    this.selected = null; this.combineSrc = null;
    this.root.classList.remove('hidden');
    this.render();
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.root.classList.add('hidden');
    this.host.onClose();
  }

  render(): void {
    const inv = this.host.inventory;
    const st = this.host.status();
    this.root.innerHTML = `
      <div class="inv-case"><h3>ATTACHÉ CASE — ${inv.cols}×${inv.rows}</h3>
        <div class="inv-grid" style="width:${inv.cols * CELL}px;height:${inv.rows * CELL}px;background-size:${CELL}px ${CELL}px"></div></div>
      <div class="inv-side">
        <h3>CLAIRE REDFIELD</h3>
        <div style="font-family:Georgia,serif;font-size:22px;letter-spacing:4px;color:${st.color};margin-bottom:14px">${st.label} <small style="font-size:13px;color:#888">${Math.ceil(st.hp)}%</small></div>
        <div class="desc"></div>
        <div class="actions" style="margin-top:10px;display:flex;flex-wrap:wrap;gap:4px"></div>
        <div class="box-panel ${this.boxMode ? '' : 'hidden'}" style="margin-top:16px"><h3>СУНДУК</h3><div class="box-list"></div></div>
        <div class="inv-hint">ЛКМ — выбрать · перетаскивание — переместить · R — повернуть<br/>Перетащите предмет на другой — совместить · Tab/Esc — закрыть</div>
      </div>`;
    this.grid = this.root.querySelector('.inv-grid')!;
    this.side = this.root.querySelector('.inv-side')!;
    this.boxPanel = this.root.querySelector('.box-list')!;
    const eq = this.host.equippedUid();
    for (const it of inv.items) {
      const el = this.tile(it, eq === it.uid);
      el.style.left = `${it.x * CELL}px`;
      el.style.top = `${it.y * CELL}px`;
      el.addEventListener('pointerdown', (e) => this.onDown(e, it, el));
      el.addEventListener('dblclick', () => this.primary(it));
      this.grid.appendChild(el);
    }
    this.renderSide();
    if (this.boxMode) this.renderBox();
  }

  private tile(it: ItemInstance, equipped: boolean): HTMLDivElement {
    const d = ITEMS[it.defId];
    const { w, h } = footprint(it);
    const el = document.createElement('div');
    el.className = 'inv-item' + (equipped ? ' equipped' : '') + (this.combineSrc?.uid === it.uid ? ' combine-src' : '');
    el.style.width = `${w * CELL - 2}px`;
    el.style.height = `${h * CELL - 2}px`;
    el.style.background = `linear-gradient(135deg, ${d.color}cc, #111c)`;
    const qty = d.kind === 'weapon' && d.weaponId !== 'knife' ? `${it.mag ?? 0}` : d.maxStack > 1 ? `${it.qty}` : '';
    el.innerHTML = `<span style="transform:${it.rot ? 'rotate(90deg)' : 'none'}">${d.glyph}</span><span class="nm">${d.name}</span><span class="qty">${qty}</span>`;
    if (this.selected?.uid === it.uid) el.style.boxShadow = '0 0 0 2px #fff inset';
    return el;
  }

  private renderSide(): void {
    const desc = this.side.querySelector('.desc') as HTMLDivElement;
    const actions = this.side.querySelector('.actions') as HTMLDivElement;
    actions.innerHTML = '';
    const it = this.selected;
    if (this.combineSrc) { desc.innerHTML = `<b>Совместить:</b> ${ITEMS[this.combineSrc.defId].name}<br/>Выберите второй предмет.`; }
    else if (!it) { desc.innerHTML = '<b>—</b><br/>Выберите предмет.'; return; }
    else {
      const d = ITEMS[it.defId];
      let extra = '';
      if (d.kind === 'weapon' && d.weaponId !== 'knife') extra = `<br/><span style="color:#9cc">Магазин: ${it.mag ?? 0}/${magSize(it)}${it.loaded ? ' · ' + ITEMS[it.loaded].name : ''}${it.mods?.length ? ' · Детали: ' + it.mods.map((m) => ITEMS[m].name).join(', ') : ''}</span>`;
      desc.innerHTML = `<b>${d.name}</b><br/>${d.desc}${extra}`;
    }
    if (!it || this.combineSrc) {
      if (this.combineSrc) this.btn(actions, 'Отмена', () => { this.combineSrc = null; this.render(); });
      return;
    }
    const d = ITEMS[it.defId];
    if (d.kind === 'herb' && d.heal !== undefined || d.cure) this.btn(actions, 'Использовать', () => this.primary(it));
    if (d.kind === 'weapon') this.btn(actions, 'Экипировать', () => this.primary(it));
    this.btn(actions, 'Совместить', () => { this.combineSrc = it; this.render(); });
    if (this.boxMode) this.btn(actions, 'В сундук', () => { this.host.itemBox.store(this.host.inventory, it.uid); this.selected = null; audio.ui(); this.render(); });
    if (d.kind !== 'key' && d.weaponId !== 'knife') this.btn(actions, 'Выбросить', () => { this.host.inventory.remove(it.uid); this.selected = null; this.render(); });
  }

  private renderBox(): void {
    this.boxPanel.innerHTML = '';
    if (!this.host.itemBox.items.length) this.boxPanel.innerHTML = '<div style="color:#666;cursor:default">пусто</div>';
    for (const it of this.host.itemBox.items) {
      const row = document.createElement('div');
      const d = ITEMS[it.defId];
      row.textContent = `${d.glyph}  ${d.name}${d.maxStack > 1 ? ' ×' + it.qty : ''}`;
      row.onclick = () => {
        if (!this.host.itemBox.retrieve(this.host.inventory, it.uid)) row.style.color = '#e8412e';
        else { audio.ui(); this.render(); }
      };
      this.boxPanel.appendChild(row);
    }
  }

  private btn(parent: HTMLElement, label: string, fn: () => void): void {
    const b = document.createElement('button');
    b.className = 'btn'; b.style.fontSize = '13px'; b.style.padding = '6px 12px'; b.style.border = '1px solid #333';
    b.textContent = label;
    b.onclick = (e) => { e.stopPropagation(); fn(); };
    parent.appendChild(b);
  }

  private primary(it: ItemInstance): void {
    const d = ITEMS[it.defId];
    if (d.kind === 'weapon') this.host.equip(it);
    else if (d.kind === 'herb') this.host.use(it);
    if (!this.host.inventory.get(it.uid)) this.selected = null;
    audio.ui();
    this.render();
  }

  private tryCombine(a: ItemInstance, b: ItemInstance): void {
    const r = combine(this.host.inventory, a, b);
    const desc = this.side.querySelector('.desc') as HTMLDivElement;
    this.combineSrc = null;
    this.selected = r.ok ? null : this.selected;
    if (r.ok) audio.pickup(); else audio.click();
    this.render();
    (this.side.querySelector('.desc') as HTMLDivElement).innerHTML = `<b>${r.ok ? 'Готово' : 'Нельзя'}</b><br/>${r.text}`;
    void desc;
  }

  // ---------------------------------------------------------------- drag & drop
  private onDown(e: PointerEvent, it: ItemInstance, el: HTMLDivElement): void {
    if (e.button !== 0) return;
    e.preventDefault();
    if (this.combineSrc) { this.tryCombine(this.combineSrc, it); return; }
    this.selected = it;
    const rect = el.getBoundingClientRect();
    const ghost = document.createElement('div');
    ghost.className = 'inv-ghost';
    this.grid.appendChild(ghost);
    this.drag = { it, el, rot: it.rot, offX: e.clientX - rect.left, offY: e.clientY - rect.top, ghost };
    el.classList.add('dragging');
    this.renderSide();
  }

  private cellUnder(e: PointerEvent, d = this.drag!): { x: number; y: number } {
    const g = this.grid.getBoundingClientRect();
    return { x: Math.round((e.clientX - d.offX - g.left) / CELL), y: Math.round((e.clientY - d.offY - g.top) / CELL) };
  }

  private layoutDrag(e: PointerEvent): void {
    if (!this.drag || e.clientX === undefined) return;
    const d = this.drag;
    const g = this.grid.getBoundingClientRect();
    const { w, h } = footprint({ defId: d.it.defId, rot: d.rot });
    d.el.style.width = `${w * CELL - 2}px`; d.el.style.height = `${h * CELL - 2}px`;
    d.el.style.left = `${e.clientX - d.offX - g.left}px`;
    d.el.style.top = `${e.clientY - d.offY - g.top}px`;
    const c = this.cellUnder(e);
    const ok = this.host.inventory.canPlace(d.it.defId, c.x, c.y, d.rot, d.it.uid);
    Object.assign(d.ghost.style, { left: `${c.x * CELL}px`, top: `${c.y * CELL}px`, width: `${w * CELL}px`, height: `${h * CELL}px`, borderColor: ok ? '#3ddc6a' : '#e8412e' });
  }

  private onMove(e: PointerEvent): void { if (this.drag) this.layoutDrag(e); }

  private onUp(e: PointerEvent): void {
    if (!this.drag) return;
    const d = this.drag;
    this.drag = null;
    const c = this.cellUnder(e, d);
    const inv = this.host.inventory;
    const moved = c.x !== d.it.x || c.y !== d.it.y || d.rot !== d.it.rot;
    if (moved && !inv.move(d.it.uid, c.x, c.y, d.rot)) {
      // dropped on another item → combine
      const g = this.grid.getBoundingClientRect();
      const cx = Math.floor((e.clientX - g.left) / CELL), cy = Math.floor((e.clientY - g.top) / CELL);
      const target = inv.itemAt(cx, cy);
      if (target && target.uid !== d.it.uid) { this.tryCombine(d.it, target); return; }
    }
    this.render();
  }
}
