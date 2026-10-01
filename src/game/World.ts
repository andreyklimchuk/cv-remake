import * as THREE from 'three';
import { PhysicsWorld } from '../engine/Physics';
import { NavGraph } from '../engine/Nav';
import { ZoneStreamer } from '../engine/Streaming';
import { DecalPool, ShellPool, ParticlePool, DebrisPool, MuzzleFlash } from '../engine/Pools';
import { Rain } from '../engine/VolumetricFX';
import { LightPool } from '../engine/LightPool';
import { glowTexture } from '../engine/Materials';
import type { QualityPreset } from '../engine/Quality';
import { bus } from '../engine/Events';
import { audio } from '../engine/AudioEngine';
import { Inventory, ItemBox } from './inventory/Inventory';
import { PlayerController } from './player/PlayerController';
import { WeaponSystem } from './combat/WeaponSystem';
import type { CombatContext } from './combat/CombatContext';
import { Zombie, type ZombieContext } from './ai/Zombie';
import type { Interactable } from './world/Interactables';
import { buildPrisonLevel, type Level } from './levels/PrisonLevel';
import type { SaveData } from './SaveSystem';

/** One play session's simulation state. Recreated on New Game / Load. */
export class World {
  scene = new THREE.Scene();
  physics = new PhysicsWorld();
  nav: NavGraph;
  streamer: ZoneStreamer;
  inventory = new Inventory(4, 2);
  itemBox = new ItemBox();
  flags: Set<string>;
  player: PlayerController;
  weapons: WeaponSystem;
  zombies: Zombie[] = [];
  interactables: Interactable[] = [];
  level: Level;
  combat: CombatContext;
  rain: Rain;
  lights: LightPool;
  time = 0;
  stats = { time: 0, kills: 0, saves: 0, shots: 0, hits: 0 };
  private zctx: ZombieContext;
  private unsubs: (() => void)[] = [];

  constructor(public camera: THREE.PerspectiveCamera, public q: QualityPreset, save: SaveData | null) {
    this.flags = new Set(save?.flags ?? []);
    this.nav = new NavGraph(this.physics);
    this.streamer = new ZoneStreamer(this.scene, 16);
    const s = this.scene;
    const ps = q.particleBudget / 700;
    const holeTex = glowTexture('rgba(10,8,6,1)', 'rgba(30,25,20,0)', 32);
    const scorchTex = glowTexture('rgba(0,0,0,0.9)', 'rgba(0,0,0,0)', 64);
    const blood = new DecalPool(s, q.decalBudget);
    const bloodFx = new ParticlePool(s, Math.round(600 * ps), 0x5a0000, 0.05);
    bloodFx.onGround = (p) => blood.add(p.setY(0.005), new THREE.Vector3(0, 1, 0), 0.15 + Math.random() * 0.25);
    this.combat = {
      scene: s, physics: this.physics, camera,
      enemies: () => this.zombies,
      blood, holes: new DecalPool(s, 64, holeTex, 0xffffff, 0.06), scorch: new DecalPool(s, 16, scorchTex),
      bloodFx, sparks: new ParticlePool(s, Math.round(300 * ps), 0xffc070, 0.035, true, 6),
      shells: new ShellPool(s, 48), flash: new MuzzleFlash(s), debris: new DebrisPool(s, 24), particleScale: ps,
    };
    this.player = new PlayerController(q.textureSize, s);
    this.weapons = new WeaponSystem(this.combat, this.inventory);
    this.zctx = {
      physics: this.physics, nav: this.nav, player: this.player, zombies: this.zombies,
      debris: this.combat.debris, bloodFx, blood, time: 0,
    };

    this.level = buildPrisonLevel({
      scene: s, physics: this.physics, nav: this.nav, streamer: this.streamer, quality: q, flags: this.flags,
      spawnZombie: (spawn, parent) => {
        const z = new Zombie(spawn, parent, q.textureSize, () => this.zctx);
        if (this.flags.has('dead:' + spawn.id)) z.forceDead();
        this.zombies.push(z);
      },
      addInteractable: (i) => this.interactables.push(i),
    });
    // build every zone up-front (behind the loading screen) — no construction hitches while playing
    for (const z of this.streamer.zones.values()) this.streamer.buildNow(z.id);
    this.streamer.onBuilt = () => this.nav.rebuild();
    this.unsubs.push(bus.on('doorsChanged', () => this.nav.rebuild()));

    this.rain = new Rain(s, q.rainDrops, 30);
    // constant light set: zone lamps become virtual lights streamed into a fixed pool
    const sh = q.shadows ? q.shadowedLights : 0;
    const big = q.shadowedLights >= 3, small = !q.shadows;
    this.lights = new LightPool(s, big ? 8 : small ? 4 : 6, big ? 3 : 2, Math.max(0, sh - 1), Math.min(1, sh), q.shadowMapSize);
    this.lights.adopt(s);
    LightPool.active = this.lights;

    // player start / restore
    if (save) {
      this.player.pos.set(save.player.x, save.player.y ?? 0, save.player.z);
      this.player.yaw = save.player.yaw;
      this.player.hp = save.player.hp;
      this.player.poisoned = save.player.poisoned;
      const pouches = [...this.flags].filter((f) => f.startsWith('pouch:')).length;
      if (pouches) this.inventory.expand(pouches * 2);
      const overflow = this.inventory.load(save.inventory);
      this.itemBox.items = [...save.box.map((i) => ({ ...i })), ...overflow];
      this.stats = { ...save.stats };
    } else {
      this.player.pos.copy(this.level.spawn.pos);
      this.player.yaw = this.level.spawn.yaw;
      this.inventory.add('m9f', 1, { mag: 15 });
      this.inventory.add('knife');
      this.inventory.add('ammo_hg', 15);
      this.inventory.add('herb_g');
      this.inventory.add('lighter');
    }
    this.nav.rebuild();
    const eq = save?.equipped != null ? this.inventory.get(save.equipped) : this.inventory.firstOf('m9f');
    this.equip(eq ?? null);
  }

  equip(it: import('./inventory/Items').ItemInstance | null): void {
    this.weapons.equip(it);
    this.player.model.setWeapon(this.weapons.def.id);
  }

  serialize(camYaw: number): SaveData {
    return {
      version: 1, savedAt: Date.now(), level: 'prison',
      player: { x: this.player.pos.x, y: this.player.pos.y, z: this.player.pos.z, yaw: this.player.yaw, hp: this.player.hp, poisoned: this.player.poisoned },
      camYaw,
      inventory: this.inventory.serialize(),
      box: JSON.parse(JSON.stringify(this.itemBox.items)),
      equipped: this.weapons.current?.uid ?? null,
      flags: [...this.flags],
      stats: { ...this.stats, shots: this.weapons.shots + this.stats.shots, hits: this.weapons.hits + this.stats.hits },
    };
  }

  updateZombies(dt: number): void {
    this.zctx.time = this.time;
    for (const z of this.zombies) {
      const wasAlive = z.alive;
      // distance-based AI LOD: far zombies think at half rate
      const far = z.position.distanceToSquared(this.player.pos) > 45 * 45;
      if (!far || Math.floor(this.time * 30) % 2 === 0) z.update(far ? dt * 2 : dt);
      if (wasAlive && !z.alive) { this.stats.kills++; this.flags.add('dead:' + z.spawn.id); }
    }
  }

  dispose(): void {
    this.zombies.forEach((z) => z.dispose());
    this.unsubs.forEach((u) => u());
    audio.stopAllLoops();
    audio.saveRoom(false);
    if (LightPool.active === this.lights) LightPool.active = null;
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
    });
  }
}
