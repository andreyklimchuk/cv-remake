import { ITEMS, footprint, newUid, bumpUid, type ItemInstance } from './Items';

/** RE4-style "attaché case" Tetris inventory (default 8×6). */
export class Inventory {
  items: ItemInstance[] = [];
  onChange?: () => void;

  constructor(public cols = 8, public rows = 6) {}

  private occupied(ignoreUid = -1): (number | null)[][] {
    const g: (number | null)[][] = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    for (const it of this.items) {
      if (it.uid === ignoreUid) continue;
      const { w, h } = footprint(it);
      for (let y = it.y; y < it.y + h; y++) for (let x = it.x; x < it.x + w; x++) if (g[y]) g[y][x] = it.uid;
    }
    return g;
  }

  canPlace(defId: string, x: number, y: number, rot: boolean, ignoreUid = -1): boolean {
    const { w, h } = footprint({ defId, rot });
    if (x < 0 || y < 0 || x + w > this.cols || y + h > this.rows) return false;
    const g = this.occupied(ignoreUid);
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) if (g[yy][xx] !== null) return false;
    return true;
  }

  findSpot(defId: string, ignoreUid = -1): { x: number; y: number; rot: boolean } | null {
    for (const rot of [false, true]) {
      for (let y = 0; y < this.rows; y++) for (let x = 0; x < this.cols; x++) {
        if (this.canPlace(defId, x, y, rot, ignoreUid)) return { x, y, rot };
      }
    }
    return null;
  }

  itemAt(x: number, y: number): ItemInstance | null {
    for (const it of this.items) {
      const { w, h } = footprint(it);
      if (x >= it.x && x < it.x + w && y >= it.y && y < it.y + h) return it;
    }
    return null;
  }

  /** Adds qty of an item, stacking first. Returns the quantity that did NOT fit. */
  add(defId: string, qty = 1, extra: Partial<ItemInstance> = {}): number {
    const def = ITEMS[defId];
    if (!def) return qty;
    let left = qty;
    if (def.maxStack > 1) {
      for (const it of this.items) {
        if (it.defId !== defId || it.qty >= def.maxStack) continue;
        const n = Math.min(left, def.maxStack - it.qty);
        it.qty += n; left -= n;
        if (!left) break;
      }
    }
    while (left > 0) {
      const spot = this.findSpot(defId);
      if (!spot) break;
      const n = Math.min(left, def.maxStack);
      this.items.push({ uid: newUid(), defId, qty: n, ...spot, ...extra });
      left -= n;
    }
    this.onChange?.();
    return left;
  }

  hasRoomFor(defId: string, qty = 1): boolean {
    const def = ITEMS[defId];
    let room = 0;
    for (const it of this.items) if (it.defId === defId) room += def.maxStack - it.qty;
    return room >= qty || this.findSpot(defId) !== null;
  }

  move(uid: number, x: number, y: number, rot: boolean): boolean {
    const it = this.get(uid);
    if (!it || !this.canPlace(it.defId, x, y, rot, uid)) return false;
    it.x = x; it.y = y; it.rot = rot;
    this.onChange?.();
    return true;
  }

  get(uid: number): ItemInstance | undefined { return this.items.find((i) => i.uid === uid); }
  remove(uid: number): void { this.items = this.items.filter((i) => i.uid !== uid); this.onChange?.(); }
  count(defId: string): number { return this.items.filter((i) => i.defId === defId).reduce((s, i) => s + i.qty, 0); }
  has(defId: string): boolean { return this.items.some((i) => i.defId === defId); }
  firstOf(defId: string): ItemInstance | undefined { return this.items.find((i) => i.defId === defId); }

  /** Remove up to qty across stacks (smallest first). Returns amount removed. */
  consume(defId: string, qty: number): number {
    let need = qty;
    const stacks = this.items.filter((i) => i.defId === defId).sort((a, b) => a.qty - b.qty);
    for (const s of stacks) {
      const n = Math.min(need, s.qty);
      s.qty -= n; need -= n;
      if (s.qty <= 0) this.items = this.items.filter((i) => i !== s);
      if (!need) break;
    }
    this.onChange?.();
    return qty - need;
  }

  weapons(): ItemInstance[] {
    return this.items.filter((i) => ITEMS[i.defId].kind === 'weapon').sort((a, b) => a.y - b.y || a.x - b.x);
  }

  serialize(): ItemInstance[] { return JSON.parse(JSON.stringify(this.items)); }
  load(items: ItemInstance[]): void {
    this.items = items.map((i) => ({ ...i }));
    bumpUid(Math.max(0, ...this.items.map((i) => i.uid)));
    this.onChange?.();
  }
}

/** Item box shared across save rooms (unlimited list storage). */
export class ItemBox {
  items: ItemInstance[] = [];
  store(inv: Inventory, uid: number): void {
    const it = inv.get(uid);
    if (!it) return;
    inv.remove(uid);
    this.items.push(it);
  }
  retrieve(inv: Inventory, uid: number): boolean {
    const it = this.items.find((i) => i.uid === uid);
    if (!it) return false;
    const spot = inv.findSpot(it.defId);
    if (!spot) return false;
    this.items = this.items.filter((i) => i !== it);
    inv.items.push({ ...it, ...spot });
    inv.onChange?.();
    return true;
  }
}
