import type { GunSound } from '../../engine/AudioEngine';

/** Complete weapon balance sheet for Claire's arsenal. Angles in degrees, times in seconds. */
export interface WeaponDef {
  id: string;
  name: string;
  type: 'melee' | 'hitscan' | 'grenade' | 'beam';
  ammo: string[];          // accepted ammo item ids (first = default)
  ammoPerShot: number;
  magSize: number;
  damage: number;          // per projectile / pellet
  pellets: number;
  fireRate: number;        // shots per second
  auto: boolean;
  spreadMin: number;       // fully focused reticle
  spreadMax: number;       // freshly raised / after a shot
  moveSpread: number;      // added while walking with aim
  focusTime: number;       // seconds to fully focus
  recoil: { kick: number; pattern: [number, number][]; recovery: number; camShake: number };
  reloadTime: number;
  reloadPerRound?: boolean; // tube-fed: reload time is per shell, interruptible
  penetration: number;     // how many bodies a round passes through
  range: number;
  stagger: number;         // 0..1 flinch / knockdown power
  crit: number;            // chance a headshot bursts the head
  limbMult: number;        // multiplier applied to limb HP (dismemberment power)
  sound: GunSound;
  noise: number;           // AI hearing radius (m)
  muzzle: number;          // flash scale
  shell: boolean;
  laser: boolean;
}

export const WEAPONS: Record<string, WeaponDef> = {
  knife: {
    id: 'knife', name: 'Combat Knife', type: 'melee', ammo: [], ammoPerShot: 0, magSize: 0, damage: 18, pellets: 1,
    fireRate: 2.2, auto: false, spreadMin: 0, spreadMax: 0, moveSpread: 0, focusTime: 0,
    recoil: { kick: 0, pattern: [[0, 0]], recovery: 0, camShake: 0.05 }, reloadTime: 0, penetration: 1, range: 1.7,
    stagger: 0.25, crit: 0, limbMult: 1.2, sound: { thump: 0, crack: 0, tail: 0, pitch: 1 }, noise: 3, muzzle: 0, shell: false, laser: false,
  },
  m9f: {
    id: 'm9f', name: 'M9F Handgun', type: 'hitscan', ammo: ['ammo_hg'], ammoPerShot: 1, magSize: 15, damage: 12, pellets: 1,
    fireRate: 3.2, auto: false, spreadMin: 0.35, spreadMax: 3.2, moveSpread: 2.2, focusTime: 1.1,
    recoil: { kick: 2.6, pattern: [[0.2, 1], [-0.3, 1], [0.4, 1.1], [-0.2, 1.2]], recovery: 14, camShake: 0.12 },
    reloadTime: 1.55, penetration: 1, range: 60, stagger: 0.3, crit: 0.08, limbMult: 1,
    sound: { thump: 0.7, crack: 0.9, tail: 0.5, pitch: 1.1 }, noise: 22, muzzle: 1, shell: true, laser: true,
  },
  bowgun: {
    id: 'bowgun', name: 'Bow Gun', type: 'hitscan', ammo: ['ammo_bolt', 'bolt_exp', 'bolt_fire'], ammoPerShot: 3, magSize: 18, damage: 16, pellets: 3,
    fireRate: 1.3, auto: false, spreadMin: 1.8, spreadMax: 5, moveSpread: 2.5, focusTime: 1.2,
    recoil: { kick: 1.8, pattern: [[0, 1]], recovery: 10, camShake: 0.08 },
    reloadTime: 2.3, penetration: 2, range: 45, stagger: 0.35, crit: 0.04, limbMult: 1.3,
    sound: { thump: 0.3, crack: 0.35, tail: 0.2, pitch: 1.6 }, noise: 8, muzzle: 0, shell: false, laser: true,
  },
  m3: {
    id: 'm3', name: 'M3 Shotgun', type: 'hitscan', ammo: ['ammo_sg'], ammoPerShot: 1, magSize: 5, damage: 11, pellets: 9,
    fireRate: 1.05, auto: false, spreadMin: 4.5, spreadMax: 8, moveSpread: 2, focusTime: 0.9,
    recoil: { kick: 7.5, pattern: [[0.8, 1], [-0.8, 1]], recovery: 9, camShake: 0.35 },
    reloadTime: 0.55, reloadPerRound: true, penetration: 1, range: 22, stagger: 0.85, crit: 0.12, limbMult: 1.6,
    sound: { thump: 1.3, crack: 1.1, tail: 1.0, pitch: 0.75 }, noise: 28, muzzle: 1.8, shell: true, laser: false,
  },
  mp5: {
    id: 'mp5', name: 'MP5 SMG', type: 'hitscan', ammo: ['ammo_smg'], ammoPerShot: 1, magSize: 30, damage: 8, pellets: 1,
    fireRate: 11, auto: true, spreadMin: 1.1, spreadMax: 4.5, moveSpread: 2.5, focusTime: 0.8,
    recoil: { kick: 0.9, pattern: [[0, 1], [0.3, 1], [0.5, 1], [0.2, 1.1], [-0.4, 1.1], [-0.7, 1], [-0.3, 1], [0.4, 1], [0.8, 0.9], [0.3, 0.9]], recovery: 7, camShake: 0.06 },
    reloadTime: 2.2, penetration: 1, range: 50, stagger: 0.18, crit: 0.02, limbMult: 0.9,
    sound: { thump: 0.55, crack: 0.75, tail: 0.35, pitch: 1.2 }, noise: 22, muzzle: 0.9, shell: true, laser: true,
  },
  gold_lugers: {
    id: 'gold_lugers', name: 'Gold Lugers', type: 'hitscan', ammo: ['ammo_hg'], ammoPerShot: 2, magSize: 16, damage: 12, pellets: 2,
    fireRate: 2.8, auto: false, spreadMin: 0.9, spreadMax: 4.2, moveSpread: 2.6, focusTime: 1.0,
    recoil: { kick: 3.4, pattern: [[0.3, 1], [-0.4, 1], [0.5, 1.1], [-0.3, 1.2]], recovery: 12, camShake: 0.16 },
    reloadTime: 2.1, penetration: 1, range: 55, stagger: 0.42, crit: 0.08, limbMult: 1.05,
    sound: { thump: 0.85, crack: 1.0, tail: 0.6, pitch: 1.05 }, noise: 24, muzzle: 1, shell: true, laser: false,
  },
  python: {
    id: 'python', name: 'Python Magnum', type: 'hitscan', ammo: ['ammo_mag'], ammoPerShot: 1, magSize: 6, damage: 95, pellets: 1,
    fireRate: 0.9, auto: false, spreadMin: 0.3, spreadMax: 5, moveSpread: 3.5, focusTime: 1.4,
    recoil: { kick: 11, pattern: [[1.2, 1], [-1, 1]], recovery: 8, camShake: 0.45 },
    reloadTime: 3.0, penetration: 3, range: 80, stagger: 1, crit: 0.35, limbMult: 2,
    sound: { thump: 1.5, crack: 1.3, tail: 1.2, pitch: 0.85 }, noise: 34, muzzle: 2, shell: false, laser: true,
  },
  gl: {
    id: 'gl', name: 'Grenade Launcher', type: 'grenade', ammo: ['gren_exp', 'gren_fire', 'gren_acid'], ammoPerShot: 1, magSize: 1, damage: 150, pellets: 1,
    fireRate: 1, auto: false, spreadMin: 0.5, spreadMax: 3, moveSpread: 2, focusTime: 0.8,
    recoil: { kick: 6, pattern: [[0, 1]], recovery: 7, camShake: 0.3 },
    reloadTime: 1.4, penetration: 1, range: 60, stagger: 1, crit: 0, limbMult: 2,
    sound: { thump: 1.1, crack: 0.4, tail: 0.5, pitch: 0.6 }, noise: 24, muzzle: 1.4, shell: false, laser: false,
  },
  linear: {
    id: 'linear', name: 'Linear Launcher', type: 'beam', ammo: ['ammo_linear'], ammoPerShot: 1, magSize: 1, damage: 2500, pellets: 1,
    fireRate: 0.5, auto: false, spreadMin: 0, spreadMax: 0.5, moveSpread: 1, focusTime: 0.5,
    recoil: { kick: 4, pattern: [[0, 1]], recovery: 5, camShake: 0.6 },
    reloadTime: 2.5, penetration: 99, range: 120, stagger: 1, crit: 1, limbMult: 5,
    sound: { thump: 1.6, crack: 1.4, tail: 1.8, pitch: 0.4 }, noise: 40, muzzle: 3, shell: false, laser: false,
  },
};
