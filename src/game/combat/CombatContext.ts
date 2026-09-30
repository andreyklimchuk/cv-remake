import type * as THREE from 'three';
import type { PhysicsWorld } from '../../engine/Physics';
import type { DecalPool, ShellPool, ParticlePool, DebrisPool, MuzzleFlash } from '../../engine/Pools';
import type { Combatant } from './HitZones';

export interface CombatContext {
  scene: THREE.Scene;
  physics: PhysicsWorld;
  camera: THREE.PerspectiveCamera;
  enemies: () => Combatant[];
  blood: DecalPool;
  holes: DecalPool;
  scorch: DecalPool;
  bloodFx: ParticlePool;
  sparks: ParticlePool;
  shells: ShellPool;
  flash: MuzzleFlash;
  debris: DebrisPool;
  particleScale: number;
}
