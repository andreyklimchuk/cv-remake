/** Item database. Sizes are in inventory grid cells (the attaché case is 8×6). */
export type ItemKind = 'weapon' | 'ammo' | 'herb' | 'gunpowder' | 'key' | 'part' | 'misc';

export interface ItemDef {
  id: string;
  name: string;
  kind: ItemKind;
  w: number;
  h: number;
  maxStack: number;
  color: string;     // UI tile tint
  glyph: string;     // UI icon glyph
  desc: string;
  weaponId?: string; // for kind === 'weapon'
  heal?: number;     // herbs
  cure?: boolean;
  defense?: boolean;
}

export const ITEMS: Record<string, ItemDef> = {
  // --- weapons -----------------------------------------------------------
  knife: { id: 'knife', name: 'Combat Knife', kind: 'weapon', w: 2, h: 1, maxStack: 1, color: '#556', glyph: '🔪', weaponId: 'knife', desc: 'Боевой нож. F — удар, добивание лежачих, контратака при захвате.' },
  m9f: { id: 'm9f', name: 'M9F Handgun', kind: 'weapon', w: 2, h: 2, maxStack: 1, color: '#445', glyph: '🔫', weaponId: 'm9f', desc: '9-мм пистолет. Надёжный, быстрый. Поддерживает кастомные детали.' },
  bowgun: { id: 'bowgun', name: 'Bow Gun', kind: 'weapon', w: 4, h: 2, maxStack: 1, color: '#543', glyph: '🏹', weaponId: 'bowgun', desc: 'Арбалет: залп из трёх болтов, болты пробивают цель.' },
  m3: { id: 'm3', name: 'M3 Shotgun', kind: 'weapon', w: 5, h: 1, maxStack: 1, color: '#433', glyph: '🔫', weaponId: 'm3', desc: 'Помповый дробовик. Сбивает с ног, отрывает конечности.' },
  mp5: { id: 'mp5', name: 'MP5 SMG', kind: 'weapon', w: 4, h: 2, maxStack: 1, color: '#345', glyph: '🔫', weaponId: 'mp5', desc: 'Пистолет-пулемёт. Автоматический огонь, сильная отдача вверх.' },
  python: { id: 'python', name: 'Python Magnum', kind: 'weapon', w: 3, h: 2, maxStack: 1, color: '#553', glyph: '🔫', weaponId: 'python', desc: '.357 Magnum. Пробивает несколько целей насквозь.' },
  gl: { id: 'gl', name: 'Grenade Launcher', kind: 'weapon', w: 5, h: 2, maxStack: 1, color: '#353', glyph: '💣', weaponId: 'gl', desc: 'Гранатомёт. Три типа снарядов: фугас, зажигательный, кислотный. Смена — R при пустом стволе / через инвентарь.' },
  linear: { id: 'linear', name: 'Linear Launcher', kind: 'weapon', w: 7, h: 2, maxStack: 1, color: '#246', glyph: '⚡', weaponId: 'linear', desc: 'Экспериментальный рельсовый излучатель. Последняя надежда.' },
  // --- ammo --------------------------------------------------------------
  ammo_hg: { id: 'ammo_hg', name: 'Handgun Ammo', kind: 'ammo', w: 1, h: 1, maxStack: 60, color: '#664', glyph: '▮', desc: 'Патроны 9 мм.' },
  ammo_sg: { id: 'ammo_sg', name: 'Shotgun Shells', kind: 'ammo', w: 1, h: 1, maxStack: 30, color: '#733', glyph: '▮', desc: 'Патроны 12 калибра.' },
  ammo_bolt: { id: 'ammo_bolt', name: 'Bow Gun Bolts', kind: 'ammo', w: 1, h: 1, maxStack: 60, color: '#654', glyph: '➶', desc: 'Стальные болты.' },
  ammo_smg: { id: 'ammo_smg', name: 'SMG Ammo', kind: 'ammo', w: 1, h: 1, maxStack: 150, color: '#456', glyph: '▮', desc: 'Магазинные патроны 9 мм.' },
  ammo_mag: { id: 'ammo_mag', name: 'Magnum Rounds', kind: 'ammo', w: 1, h: 1, maxStack: 18, color: '#765', glyph: '▮', desc: '.357 Magnum.' },
  gren_exp: { id: 'gren_exp', name: 'Explosive Rounds', kind: 'ammo', w: 1, h: 1, maxStack: 10, color: '#552', glyph: '●', desc: 'Фугасные 40-мм гранаты.' },
  gren_fire: { id: 'gren_fire', name: 'Flame Rounds', kind: 'ammo', w: 1, h: 1, maxStack: 10, color: '#842', glyph: '●', desc: 'Зажигательные гранаты. Поджигают группу врагов.' },
  gren_acid: { id: 'gren_acid', name: 'Acid Rounds', kind: 'ammo', w: 1, h: 1, maxStack: 10, color: '#484', glyph: '●', desc: 'Кислотные гранаты. Разъедают плоть, окончательно убивают.' },
  ammo_linear: { id: 'ammo_linear', name: 'Linear Cell', kind: 'ammo', w: 1, h: 1, maxStack: 10, color: '#29c', glyph: '◆', desc: 'Энергоячейка Linear Launcher.' },
  // --- crafting ----------------------------------------------------------
  gp_a: { id: 'gp_a', name: 'Gunpowder A', kind: 'gunpowder', w: 1, h: 1, maxStack: 1, color: '#555', glyph: 'A', desc: 'Порох A. A+A = патроны к пистолету.' },
  gp_b: { id: 'gp_b', name: 'Gunpowder B', kind: 'gunpowder', w: 1, h: 1, maxStack: 1, color: '#555', glyph: 'B', desc: 'Порох B. A+B = дробь. B+B = порох C.' },
  gp_c: { id: 'gp_c', name: 'Gunpowder C', kind: 'gunpowder', w: 1, h: 1, maxStack: 1, color: '#555', glyph: 'C', desc: 'Порох C. A+C = болты, B+C = магнум, C+C = гранаты.' },
  herb_g: { id: 'herb_g', name: 'Green Herb', kind: 'herb', w: 1, h: 1, maxStack: 1, color: '#2a5', glyph: '✿', heal: 25, desc: 'Зелёная трава. Восстанавливает немного здоровья.' },
  herb_r: { id: 'herb_r', name: 'Red Herb', kind: 'herb', w: 1, h: 1, maxStack: 1, color: '#a22', glyph: '✿', desc: 'Красная трава. Сама по себе бесполезна — усиливает зелёную.' },
  herb_b: { id: 'herb_b', name: 'Blue Herb', kind: 'herb', w: 1, h: 1, maxStack: 1, color: '#25a', glyph: '✿', heal: 0, cure: true, desc: 'Синяя трава. Нейтрализует яд.' },
  herb_gg: { id: 'herb_gg', name: 'Mixed Herb (G+G)', kind: 'herb', w: 1, h: 1, maxStack: 1, color: '#2a5', glyph: '✿✿', heal: 55, desc: 'Смесь G+G.' },
  herb_ggg: { id: 'herb_ggg', name: 'Mixed Herb (G+G+G)', kind: 'herb', w: 1, h: 1, maxStack: 1, color: '#2a5', glyph: '✿3', heal: 100, desc: 'Смесь G+G+G. Полное лечение.' },
  herb_gr: { id: 'herb_gr', name: 'Mixed Herb (G+R)', kind: 'herb', w: 1, h: 1, maxStack: 1, color: '#a52', glyph: '✿R', heal: 100, desc: 'Смесь G+R. Полное лечение.' },
  herb_gb: { id: 'herb_gb', name: 'Mixed Herb (G+B)', kind: 'herb', w: 1, h: 1, maxStack: 1, color: '#2aa', glyph: '✿B', heal: 25, cure: true, desc: 'Смесь G+B. Лечение и противоядие.' },
  herb_grb: { id: 'herb_grb', name: 'Mixed Herb (G+R+B)', kind: 'herb', w: 1, h: 1, maxStack: 1, color: '#a5a', glyph: '✿✦', heal: 100, cure: true, defense: true, desc: 'Смесь G+R+B. Полное лечение, противоядие и временная защита.' },
  // --- weapon parts ------------------------------------------------------
  part_mag: { id: 'part_mag', name: 'M9F Extended Magazine', kind: 'part', w: 1, h: 1, maxStack: 1, color: '#446', glyph: '⚙', desc: 'Магазин увеличенной ёмкости для M9F (+8).' },
  part_brake: { id: 'part_brake', name: 'M9F Muzzle Brake', kind: 'part', w: 1, h: 1, maxStack: 1, color: '#446', glyph: '⚙', desc: 'Дульный тормоз для M9F. Отдача −40%.' },
  part_stock: { id: 'part_stock', name: 'M3 Tactical Stock', kind: 'part', w: 2, h: 1, maxStack: 1, color: '#443', glyph: '⚙', desc: 'Приклад для M3. Разброс −30%.' },
  // --- key items / puzzle ------------------------------------------------
  keycard: { id: 'keycard', name: 'Security Keycard', kind: 'key', w: 1, h: 1, maxStack: 1, color: '#886', glyph: '▭', desc: 'Карта охраны тюрьмы Рокфорта. Открывает блок камер.' },
  extinguisher: { id: 'extinguisher', name: 'Extinguisher', kind: 'key', w: 1, h: 2, maxStack: 1, color: '#a11', glyph: '🧯', desc: 'Огнетушитель. Может потушить пожар.' },
  emblem: { id: 'emblem', name: 'Hawk Emblem', kind: 'key', w: 2, h: 2, maxStack: 1, color: '#a83', glyph: '🦅', desc: 'Тяжёлая бронзовая эмблема с ястребом. Похожа на герб над главными воротами.' },
  musicbox: { id: 'musicbox', name: 'Music Box Plate', kind: 'key', w: 2, h: 1, maxStack: 1, color: '#759', glyph: '♪', desc: 'Пластинка музыкальной шкатулки. (Используется на следующих уровнях.)' },
  lighter: { id: 'lighter', name: 'Lighter', kind: 'key', w: 1, h: 1, maxStack: 1, color: '#888', glyph: '🔥', desc: 'Зажигалка Клэр. Подарок Криса.' },
};

export interface ItemInstance {
  uid: number;
  defId: string;
  qty: number;
  x: number;
  y: number;
  rot: boolean;          // rotated 90°
  mag?: number;          // rounds loaded (weapons)
  loaded?: string;       // ammo item id currently loaded (grenade launcher)
  mods?: string[];       // installed part ids
}

let uidCounter = 1;
export function newUid(): number { return uidCounter++; }
export function bumpUid(min: number): void { uidCounter = Math.max(uidCounter, min + 1); }

export function footprint(inst: { defId: string; rot: boolean }): { w: number; h: number } {
  const d = ITEMS[inst.defId];
  return inst.rot ? { w: d.h, h: d.w } : { w: d.w, h: d.h };
}
