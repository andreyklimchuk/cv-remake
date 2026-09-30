import { ITEMS } from '../game/inventory/Items';

/**
 * Item icons rendered in Blender (Cycles) from the same GLB models used in the world,
 * on a RE-style dark navy tile (tools/blender/icons.py → src/assets/icons/<id>.jpg).
 */
const FILES = import.meta.glob('../assets/icons/*.{png,jpg}', { query: '?url', import: 'default', eager: true }) as Record<string, string>;
const ICONS: Record<string, string> = {};
for (const [p, u] of Object.entries(FILES)) ICONS[p.split('/').pop()!.replace(/\.(png|jpg)$/, '')] = u;

export function iconUrl(defId: string): string | undefined { return ICONS[defId]; }

/** <img> for the icon, or a glyph fallback tile when no render exists. */
export function iconHTML(defId: string, cls = 'ico'): string {
  const u = ICONS[defId];
  if (u) return `<img class="${cls}" src="${u}" alt="" draggable="false"/>`;
  const d = ITEMS[defId];
  return `<span class="${cls} glyph" style="background:radial-gradient(circle at 50% 40%, ${d?.color ?? '#345'}, #0a1020 75%)">${d?.glyph ?? '?'}</span>`;
}
