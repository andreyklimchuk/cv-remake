export interface InvItem { id: number; name: string; count: number }
const STACK = new Set([12, 31]);
export class Inventory {
  slots: (InvItem | null)[] = new Array(8).fill(null);
  add(id: number, name: string, count = 1): boolean {
    if (STACK.has(id)) { const s = this.slots.find((x) => x?.id === id); if (s) { s.count += count; return true; } }
    const i = this.slots.findIndex((x) => !x);
    if (i < 0) return false;
    this.slots[i] = { id, name, count };
    return true;
  }
  has(id: number) { return this.slots.some((s) => s?.id === id); }
  take(id: number) { const i = this.slots.findIndex((s) => s?.id === id); if (i < 0) return false; const s = this.slots[i]!; s.count--; if (s.count <= 0) this.slots[i] = null; return true; }
  toJSON() { return this.slots; }
}
