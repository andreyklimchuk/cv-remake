import * as THREE from 'three';
import type { WeaponDef } from './Weapons';

/**
 * Hit-zone model (RE2 Remake style).
 *  head  ×4 damage, weapon-specific crit chance to burst the skull (kills permanently)
 *  arms  reduced body damage, full limb damage → severed arm = disarmed (cannot grab)
 *  legs  reduced body damage, high flinch/knockdown chance, severed leg = crawler
 *  torso ×1, strongest stagger resistance
 */
export type HitZone = 'head' | 'torso' | 'lArm' | 'rArm' | 'lLeg' | 'rLeg';

export const ZONE_BODY_MULT: Record<HitZone, number> = { head: 4, torso: 1, lArm: 0.5, rArm: 0.5, lLeg: 0.6, rLeg: 0.6 };
export const ZONE_KNOCKDOWN: Record<HitZone, number> = { head: 0.15, torso: 0.1, lArm: 0.05, rArm: 0.05, lLeg: 0.45, rLeg: 0.45 };

export interface HitInfo {
  zone: HitZone;
  bodyDamage: number;
  limbDamage: number;
  crit: boolean;
  stagger: number;       // 0..1
  knockdown: boolean;
  point: THREE.Vector3;
  dir: THREE.Vector3;
  weapon: WeaponDef;
}

export interface HitResult {
  killed: boolean;
  severed: HitZone | null;
  headBurst: boolean;
}

/** Anything that bullets, knives and explosions can hurt. */
export interface Combatant {
  alive: boolean;
  position: THREE.Vector3;
  hitMeshes: THREE.Object3D[];
  headWorld(out: THREE.Vector3): THREE.Vector3;
  takeHit(h: HitInfo): HitResult;
  areaHit(damage: number, from: THREE.Vector3, opts: { knockdown: boolean; acid?: boolean; burn?: number }): void;
  isDowned(): boolean;
}

export function buildHit(weapon: WeaponDef, zone: HitZone, base: number, point: THREE.Vector3, dir: THREE.Vector3, stateMult = 1): HitInfo {
  // ±15 % damage variance like RE's hidden rolls
  const roll = base * (0.85 + Math.random() * 0.3) * stateMult;
  const crit = zone === 'head' && Math.random() < weapon.crit;
  const stagger = Math.min(1, weapon.stagger * (zone === 'head' ? 1.4 : zone === 'torso' ? 0.8 : 1));
  const knockdown = Math.random() < ZONE_KNOCKDOWN[zone] * weapon.stagger * 2.2;
  return {
    zone,
    bodyDamage: roll * ZONE_BODY_MULT[zone],
    limbDamage: roll * weapon.limbMult,
    crit,
    stagger,
    knockdown,
    point,
    dir,
    weapon,
  };
}

/** Resolve the zone of a raycast intersection from mesh userData (set by the character model). */
export function zoneOf(obj: THREE.Object3D): { zone: HitZone; owner: Combatant } | null {
  let o: THREE.Object3D | null = obj;
  while (o) {
    if (o.userData.zone && o.userData.owner) return { zone: o.userData.zone as HitZone, owner: o.userData.owner as Combatant };
    o = o.parent;
  }
  return null;
}

/** Zone lookup for a raycast hit — supports rigid-skinned meshes (zone per bone via skinIndex). */
export function zoneOfHit(h: THREE.Intersection): { zone: HitZone; owner: Combatant } | null {
  const o = h.object as THREE.Mesh;
  const zones = o.userData.boneZones as HitZone[] | undefined;
  if (zones && h.face && o.userData.owner) {
    const si = o.geometry.getAttribute('skinIndex');
    return { zone: zones[si.getX(h.face.a)] ?? 'torso', owner: o.userData.owner as Combatant };
  }
  return zoneOf(o);
}
