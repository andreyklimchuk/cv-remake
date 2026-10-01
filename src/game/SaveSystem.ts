import type { ItemInstance } from './inventory/Items';

/** Typewriter saves (localStorage). Everything needed to rebuild the world deterministically. */
export interface SaveData {
  version: 1;
  savedAt: number;
  level: string;
  player: { x: number; y?: number; z: number; yaw: number; hp: number; poisoned: boolean };
  camYaw: number;
  inventory: ItemInstance[];
  box: ItemInstance[];
  equipped: number | null;
  /** active character; `inventory`/`equipped`/`cap` belong to it, `other` holds the other character's kit */
  character?: 'claire' | 'steve';
  cap?: number;
  other?: { inventory: ItemInstance[]; equipped: number | null; cap: number; hp?: number; poisoned?: boolean };
  flags: string[];
  stats: { time: number; kills: number; saves: number; shots: number; hits: number };
}

const KEY = 'cv.save.slot1';

export const SaveSystem = {
  has(): boolean { return !!localStorage.getItem(KEY); },
  load(): SaveData | null {
    try { const d = JSON.parse(localStorage.getItem(KEY) ?? 'null'); return d?.version === 1 ? d : null; } catch { return null; }
  },
  save(d: SaveData): void { localStorage.setItem(KEY, JSON.stringify(d)); },
};
