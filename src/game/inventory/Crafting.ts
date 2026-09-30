import { ITEMS, type ItemInstance } from './Items';
import type { Inventory } from './Inventory';
import { WEAPONS } from '../combat/Weapons';

/** Order-independent combination recipes. */
interface Recipe { a: string; b: string; out: string; qty: number }

export const RECIPES: Recipe[] = [
  // gunpowder
  { a: 'gp_a', b: 'gp_a', out: 'ammo_hg', qty: 15 },
  { a: 'gp_a', b: 'gp_b', out: 'ammo_sg', qty: 6 },
  { a: 'gp_b', b: 'gp_b', out: 'gp_c', qty: 1 },
  { a: 'gp_a', b: 'gp_c', out: 'ammo_bolt', qty: 12 },
  { a: 'gp_b', b: 'gp_c', out: 'ammo_mag', qty: 6 },
  { a: 'gp_c', b: 'gp_c', out: 'gren_exp', qty: 3 },
  // herbs
  { a: 'herb_g', b: 'herb_g', out: 'herb_gg', qty: 1 },
  { a: 'herb_gg', b: 'herb_g', out: 'herb_ggg', qty: 1 },
  { a: 'herb_g', b: 'herb_r', out: 'herb_gr', qty: 1 },
  { a: 'herb_g', b: 'herb_b', out: 'herb_gb', qty: 1 },
  { a: 'herb_gr', b: 'herb_b', out: 'herb_grb', qty: 1 },
  { a: 'herb_gb', b: 'herb_r', out: 'herb_grb', qty: 1 },
];

const PART_TARGET: Record<string, string> = { part_mag: 'm9f', part_brake: 'm9f', part_stock: 'm3' };

export type CombineResult = { ok: true; text: string } | { ok: false; text: string };

export function combine(inv: Inventory, a: ItemInstance, b: ItemInstance): CombineResult {
  if (a.uid === b.uid) return { ok: false, text: '' };
  // 1) weapon parts → weapon customisation
  for (const [p, w] of [[a, b], [b, a]] as const) {
    if (PART_TARGET[p.defId] && w.defId === PART_TARGET[p.defId]) {
      w.mods = [...(w.mods ?? []), p.defId];
      inv.remove(p.uid);
      return { ok: true, text: `${ITEMS[p.defId].name} установлен на ${ITEMS[w.defId].name}.` };
    }
  }
  // 2) ammo → weapon (manual reload from the case)
  for (const [am, w] of [[a, b], [b, a]] as const) {
    const wd = ITEMS[w.defId].weaponId ? WEAPONS[ITEMS[w.defId].weaponId!] : undefined;
    if (!wd || !wd.ammo.includes(am.defId)) continue;
    if (w.defId === 'gl' && w.loaded !== am.defId) {
      // swap grenade type: unload current into inventory
      if (w.mag && w.loaded) inv.add(w.loaded, w.mag);
      w.mag = 0; w.loaded = am.defId;
    }
    const cap = magSize(w) - (w.mag ?? 0);
    const n = Math.min(cap, am.qty);
    if (n <= 0) return { ok: false, text: 'Оружие уже заряжено.' };
    w.mag = (w.mag ?? 0) + n;
    inv.consume(am.defId, n);
    return { ok: true, text: `${ITEMS[w.defId].name}: заряжено ${n}.` };
  }
  // 3) recipes
  const r = RECIPES.find((x) => (x.a === a.defId && x.b === b.defId) || (x.a === b.defId && x.b === a.defId));
  if (!r) return { ok: false, text: 'Эти предметы нельзя совместить.' };
  const keepX = b.x, keepY = b.y;
  inv.remove(a.uid);
  inv.remove(b.uid);
  // try to place result where the target item was
  const left = inv.add(r.out, r.qty);
  const created = inv.items[inv.items.length - 1];
  if (created && created.defId === r.out) inv.move(created.uid, keepX, keepY, false);
  const extra = left > 0 ? ` (${left} не поместилось)` : '';
  return { ok: true, text: `Создано: ${ITEMS[r.out].name} ×${r.qty}${extra}` };
}

export function magSize(w: ItemInstance): number {
  const def = WEAPONS[ITEMS[w.defId].weaponId!];
  let m = def.magSize;
  if (w.mods?.includes('part_mag')) m += 8;
  return m;
}
