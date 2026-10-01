import * as THREE from 'three';
import type { PhysicsWorld } from '../../engine/Physics';
import type { NavGraph } from '../../engine/Nav';
import type { ZoneStreamer } from '../../engine/Streaming';
import type { QualityPreset } from '../../engine/Quality';
import { pbr, chainLinkTexture } from '../../engine/Materials';
import { createLightShaft, DustField, FireEmitter } from '../../engine/VolumetricFX';
import { LevelBuilder, instanced, T } from '../world/LevelBuilder';
import { ItemPickup, Door, ScriptedInteractable, type Interactable } from '../world/Interactables';
import { makeItemMesh } from '../world/ItemMeshes';
import type { ZombieSpawn } from '../ai/Zombie';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';
import { buildAnnex, singleDoor } from './PrisonAnnex';
import { buildExterior } from './RockfortExterior';
import { placeProp, propInstances } from '../world/Props';

export interface LevelContext {
  scene: THREE.Scene;
  physics: PhysicsWorld;
  nav: NavGraph;
  streamer: ZoneStreamer;
  quality: QualityPreset;
  flags: Set<string>;
  spawnZombie(s: ZombieSpawn, parent: THREE.Object3D): void;
  addInteractable(i: Interactable): void;
}

export interface Level {
  name: string;
  spawn: { pos: THREE.Vector3; yaw: number };
  outdoorBounds: THREE.Box3[];
  saveRoom: THREE.Box3;
  update(dt: number, t: number, player: THREE.Vector3): void;
}

/**
 * TEST LEVEL — "Rockfort Island: Prison Compound" (Claire's opening area).
 * Zones (streamed): Courtyard (outdoor, burning truck, watchtower) → Guard House (save room,
 * keycard) → Cell Block (extinguisher, bow gun) and West Yard (behind fire: shotgun, Hawk Emblem).
 * + Administration wing (steam valve, warden's safe, music box, hidden emblem) and Trophy Gallery
 *   (optional "Song of three beasts" painting puzzle) — see PrisonAnnex.ts.
 * Puzzle chain: Keycard → Cell Block (prisoner's note: safe code) → Extinguisher → put out fire →
 * West Yard: Valve Handle → close steam valve → Warden's office: safe 0419 → Music Box Plate →
 * music box → portrait rises → Hawk Emblem → Main Gate.
 */
export function buildPrisonLevel(ctx: LevelContext): Level {
  const { scene, physics, nav, streamer, quality: q, flags } = ctx;
  const tex = q.textureSize;
  const M = {
    ground: pbr('wetGround', tex, 1, { envMapIntensity: 1 }),
    concrete: pbr('concrete', tex),
    wallDark: pbr('concrete', tex, 1, { color: 0x8a8f96 }),
    brick: pbr('brick', tex),
    rust: pbr('rustMetal', tex),
    tiles: pbr('tiles', tex),
    plaster: pbr('plaster', tex),
    wood: pbr('wood', Math.min(tex, 512)),
    steel: new THREE.MeshStandardMaterial({ color: 0x3a3d42, metalness: 0.85, roughness: 0.45 }),
    dark: new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.9 }),
    tarp: new THREE.MeshStandardMaterial({ color: 0x3a4a2a, roughness: 0.95 }),
    sandbag: new THREE.MeshStandardMaterial({ color: 0x6a5a40, roughness: 1 }),
    white: new THREE.MeshStandardMaterial({ color: 0xb8b8b0, roughness: 0.3 }),
    lampOn: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff2d0, emissiveIntensity: 3 }),
    tubeOn: new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xdfeaff, emissiveIntensity: 2.5 }),
    screen: new THREE.MeshStandardMaterial({ color: 0x0a1a10, emissive: 0x2a8a4a, emissiveIntensity: 1.2 }),
    red: new THREE.MeshStandardMaterial({ color: 0x440000, emissive: 0xff1010, emissiveIntensity: 2 }),
    bronze: new THREE.MeshStandardMaterial({ color: 0x8a6a3a, metalness: 0.9, roughness: 0.4 }),
    fence: new THREE.MeshStandardMaterial({ map: chainLinkTexture(), alphaTest: 0.5, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.5 }),
    corpse: new THREE.MeshStandardMaterial({ color: 0x3a2a20, roughness: 0.9 }),
    bars: new THREE.MeshStandardMaterial({ color: 0x2a2c30, metalness: 0.9, roughness: 0.35 }),
  };
  const lightsForUpdate: { update: (dt: number, t: number) => void }[] = [];
  let shadowBudget = q.shadowedLights;
  const shadowed = () => (q.shadows && shadowBudget-- > 0);

  // ---------------------------------------------------------------- sky + global lighting
  const skyTex = (() => {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 512;
    const g = c.getContext('2d')!;
    const grd = g.createLinearGradient(0, 0, 0, 512);
    grd.addColorStop(0, '#05070b'); grd.addColorStop(0.45, '#1a222c'); grd.addColorStop(0.55, '#2a3038'); grd.addColorStop(1, '#0a0c0f');
    g.fillStyle = grd; g.fillRect(0, 0, 1024, 512);
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * 1024, y = 60 + Math.random() * 220, r = 30 + Math.random() * 90;
      const cg = g.createRadialGradient(x, y, 0, x, y, r);
      const l = 40 + Math.random() * 50;
      cg.addColorStop(0, `rgba(${l},${l + 6},${l + 14},0.25)`); cg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = cg; g.beginPath(); g.ellipse(x, y, r * 1.8, r * 0.6, 0, 0, Math.PI * 2); g.fill();
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 16), new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false }));
  scene.add(sky);
  scene.fog = new THREE.FogExp2(0x10141b, q.fogDensity * 0.4);
  scene.background = new THREE.Color(0x07090c);
  scene.add(new THREE.HemisphereLight(0x5a6c8c, 0x1a140e, 1.5));
  const moon = new THREE.DirectionalLight(0x9ab0d8, 1.5);
  moon.position.set(-30, 50, 20);
  moon.target.position.set(0, 0, 20);
  moon.castShadow = q.shadows;
  moon.shadow.mapSize.set(q.shadowMapSize, q.shadowMapSize);
  Object.assign(moon.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 1, far: 140 });
  moon.shadow.bias = -0.0008;
  moon.shadow.normalBias = 0.03;
  scene.add(moon, moon.target);

  // ---------------------------------------------------------------- helpers
  const item = (id: string, defId: string, qty: number, x: number, y: number, z: number, parent: THREE.Object3D) => {
    if (flags.has('picked:' + id)) return;
    ctx.addInteractable(new ItemPickup(id, new THREE.Vector3(x, y, z), defId, qty, makeItemMesh(defId), parent));
  };
  const barbed = (x1: number, z1: number, x2: number, z2: number, y: number): THREE.Matrix4[] => {
    const out: THREE.Matrix4[] = [];
    const len = Math.hypot(x2 - x1, z2 - z1), n = Math.floor(len / 0.35);
    const ang = Math.atan2(x2 - x1, z2 - z1);
    for (let i = 0; i < n; i++) { const k = i / n; out.push(T(x1 + (x2 - x1) * k, y, z1 + (z2 - z1) * k, 0, ang, 0.2)); }
    return out;
  };
  const wireGeo = new THREE.TorusGeometry(0.25, 0.012, 4, 10);
  const flickerLight = (l: THREE.PointLight | THREE.SpotLight, base: number, emissiveMat?: THREE.MeshStandardMaterial, broken = false) => {
    lightsForUpdate.push({
      update: (_dt, t) => {
        let f = 1;
        if (broken) { const n = Math.sin(t * 13.1) * Math.sin(t * 7.3) * Math.sin(t * 2.1); f = n > 0.35 ? 0.1 : 1; }
        else f = 0.93 + Math.sin(t * 50) * 0.02 + (Math.random() < 0.01 ? -0.5 : 0);
        l.intensity = base * f;
        if (emissiveMat) emissiveMat.emissiveIntensity = 2.5 * f;
      },
    });
  };

  const helpers = {
    M: M as unknown as Record<string, THREE.Material>, item,
    flicker: (l: THREE.PointLight | THREE.SpotLight, base: number, mat?: THREE.MeshStandardMaterial, broken?: boolean) => flickerLight(l, base, mat, broken),
    onUpdate: (fn: (dt: number, t: number) => void) => lightsForUpdate.push({ update: fn }),
  };
  const annex = buildAnnex(ctx, helpers);
  const exterior = buildExterior(ctx, helpers);

  // =====================================================================
  // ZONE 1 — COURTYARD (outdoor)
  // =====================================================================
  const yardBounds = new THREE.Box3(new THREE.Vector3(-20, -1, 0), new THREE.Vector3(20, 14, 40.6));
  const westBounds = new THREE.Box3(new THREE.Vector3(-36, -1, 4), new THREE.Vector3(-20, 14, 28));
  const guardBounds = new THREE.Box3(new THREE.Vector3(20.6, -1, 2), new THREE.Vector3(32, 4, 20));
  const cellsBounds = new THREE.Box3(new THREE.Vector3(20.6, -1, 20), new THREE.Vector3(44, 5, 44));
  const saveRoom = new THREE.Box3(new THREE.Vector3(20.6, -1, 2), new THREE.Vector3(26, 4, 7));

  let guardDoor: Door | null = null;
  let cellDoor: Door | null = null;

  streamer.add({
    id: 'yard', bounds: yardBounds, neighbors: ['west', 'guard', 'gate_out'], outdoor: true,
    portalOpen: (n) => n === 'west' || (n === 'gate_out' ? flags.has('gateOpen') : !!guardDoor?.open),
    build: (G) => {
      const b = new LevelBuilder(physics);
      // ground
      const ground = new THREE.PlaneGeometry(40, 41, 1, 1); ground.rotateX(-Math.PI / 2); ground.translate(0, 0, 20.3);
      const gg = ground.toNonIndexed(); LevelBuilder.worldUV(gg, 6); b.add(gg, M.ground, false);
      // perimeter walls (h = 10)
      b.box(0, 5, -0.3, 41.2, 10, 0.6, M.wallDark, { tile: 4 });
      b.box(-11.5, 5, 40.3, 17, 10, 0.6, M.wallDark, { tile: 4 });
      b.box(11.5, 5, 40.3, 17, 10, 0.6, M.wallDark, { tile: 4 });
      b.box(0, 7.5, 40.3, 6, 5, 0.6, M.wallDark, { tile: 4 });
      b.box(-20.3, 5, 6, 0.6, 10, 12, M.brick, { tile: 3 });
      b.box(-20.3, 5, 28, 0.6, 10, 24, M.brick, { tile: 3 });
      b.box(-20.3, 7, 14, 0.6, 6, 4, M.brick, { tile: 3 });
      b.box(20.3, 5, 4, 0.6, 10, 8, M.concrete, { tile: 4 });
      b.box(20.3, 5, 25, 0.6, 10, 30, M.concrete, { tile: 4 });
      b.box(20.3, 6.25, 9, 0.6, 7.5, 2, M.concrete, { tile: 4 });
      // buttresses on north wall (like the reference fortress facade)
      for (const x of [-16, -9, 9, 16]) b.box(x, 6, 39.6, 1.6, 12, 1.2, M.concrete, { tile: 4 });
      // gate frame + crest
      b.box(-3.4, 5, 39.8, 0.8, 10, 1, M.concrete); b.box(3.4, 5, 39.8, 0.8, 10, 1, M.concrete);
      b.cyl(0, 7.2, 39.95, 0.9, 0.2, M.bronze, false, 6);
      // guard-house door frame
      b.box(20, 1.3, 7.85, 0.8, 2.6, 0.15, M.steel, { collide: false }); b.box(20, 1.3, 10.15, 0.8, 2.6, 0.15, M.steel, { collide: false });

      // burning truck
      b.box(-12, 1.1, 4.8, 2.3, 1.6, 1.9, M.rust); b.box(-12, 1.9, 4.7, 2.1, 0.7, 1.4, M.dark, { collide: false });
      b.box(-12, 0.95, 8.2, 2.4, 0.5, 4.6, M.rust); b.box(-12, 1.55, 8.4, 2.2, 0.9, 3.8, M.tarp, { collide: false });
      for (const [wx, wz] of [[-13.2, 4.8], [-10.8, 4.8], [-13.2, 9.3], [-10.8, 9.3]]) {
        const w = new THREE.CylinderGeometry(0.45, 0.45, 0.3, 14); w.rotateZ(Math.PI / 2); w.translate(wx, 0.45, wz); b.add(w, M.dark);
      }
      // watchtower
      for (const [lx, lz] of [[-15.2, 31.8], [-12.8, 31.8], [-15.2, 34.2], [-12.8, 34.2]]) b.box(lx, 3.6, lz, 0.22, 7.2, 0.22, M.steel, { tile: 1 });
      for (const y of [2.4, 4.8]) { b.box(-14, y, 31.8, 2.6, 0.1, 0.1, M.steel, { collide: false }); b.box(-14, y, 34.2, 2.6, 0.1, 0.1, M.steel, { collide: false }); }
      b.box(-14, 7.3, 33, 3.4, 0.2, 3.4, M.rust, { collide: false });
      b.box(-14, 8.6, 33, 2.4, 2.4, 2.4, M.concrete, { collide: false });
      b.box(-14, 10, 33, 3, 0.3, 3, M.rust, { collide: false });
      // floodlight pole
      b.cyl(14, 6, 36.5, 0.14, 12, M.steel, true, 8);
      b.box(14, 12.1, 36.3, 1.4, 0.5, 0.4, M.steel, { collide: false });
      // crates, barrels, debris, body bags
      if (!placeProp(G, physics, 'crate', 8.5, 0, 5, 0)) b.box(8.5, 0.45, 5, 0.9, 0.9, 0.9, M.wood, { tile: 1 });
      if (!placeProp(G, physics, 'crate', 9.5, 0, 5.6, 0.3, { scale: 0.89 })) b.box(9.5, 0.4, 5.6, 0.8, 0.8, 0.8, M.wood, { tile: 1, rotY: 0.3 });
      if (!placeProp(G, physics, 'crate', 8.9, 0.9, 5.2, 0.6, { scale: 0.78 })) b.box(8.9, 1.25, 5.2, 0.7, 0.7, 0.7, M.wood, { tile: 1, rotY: 0.6 });
      const yb: [number, number, number, number][] = [[15, 0, 15, 0], [15.8, 0, 16.1, 1], [16.6, 0, 15.2, 2], [-4, 0, 36.8, 3]];
      if (!propInstances(G, physics, 'barrel', yb)) for (const [bx, , bz] of yb) b.cyl(bx, 0.45, bz, 0.3, 0.9, M.rust, true, 12);
      b.box(-6, 0.15, 20, 1.8, 0.3, 0.6, M.corpse, { collide: false, rotY: 0.7 });
      b.box(5, 0.15, 26, 1.8, 0.3, 0.6, M.corpse, { collide: false, rotY: -1.1 });
      b.box(-1.5, 0.3, 30, 3, 0.6, 0.3, M.concrete, { rotY: 0.2 }); // fallen slab
      // pipes on east wall
      for (const pz of [14, 14.4, 28]) b.cyl(19.85, 5, pz, 0.12, 10, M.rust, false, 8);
      b.flush(G);

      // chain-link fence (bullets pass through)
      const fenceGeo = new THREE.PlaneGeometry(12, 3.2);
      const fence = new THREE.Mesh(fenceGeo, M.fence);
      const ftex = (M.fence.map as THREE.Texture); ftex.repeat.set(12, 3.2);
      fence.position.set(8, 1.6, 24); fence.rotation.y = Math.PI / 2; fence.castShadow = true;
      G.add(fence);
      physics.addMinMax(7.95, 18, 8.05, 30, 0, 3.2, 'fence', false);
      const b2 = new LevelBuilder(physics);
      for (const fz of [18, 22, 26, 30]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.4, 6), M.steel); post.position.set(8, 1.7, fz); b2.addMesh(post, false); }
      // gate (animated) + fire at truck
      const gate = new THREE.Mesh(new THREE.BoxGeometry(6, 5, 0.3), M.rust);
      gate.position.set(0, 2.5, 40.1); gate.castShadow = true; G.add(gate);
      const gateBars = instanced(new THREE.BoxGeometry(0.08, 4.8, 0.08), M.bars, Array.from({ length: 16 }, (_, i) => T(-2.8 + i * 0.37, 2.5, 39.9)));
      G.add(gateBars);
      const gateCol = physics.addMinMax(-3, 39.9, 3, 40.4, 0, 5, 'gate', true);
      let gateOpen = flags.has('gateOpen');
      if (gateOpen) { gate.position.y = 7; gateBars.position.y = 4.5; gateCol.enabled = false; }
      lightsForUpdate.push({ update: (dt) => {
        if (flags.has('gateOpen') && !gateOpen) { gateOpen = true; gateCol.enabled = false; bus.emit('doorsChanged', null); }
        if (gateOpen) { gate.position.y += (7 - gate.position.y) * dt * 0.8; gateBars.position.y = gate.position.y - 2.5; }
      } });

      // barbed wire along the wall tops (instanced, one draw call)
      const wires = [
        ...barbed(-20, 0, 20, 0, 10.2), ...barbed(-20, 40, 20, 40, 10.2), ...barbed(-20, 0, -20, 40, 10.2), ...barbed(20, 0, 20, 40, 10.2),
      ];
      G.add(instanced(wireGeo, M.steel, wires, false));
      // sandbags by the gate
      const sb = new THREE.CapsuleGeometry(0.18, 0.4, 3, 6); sb.rotateZ(Math.PI / 2);
      const sandT: THREE.Matrix4[] = [];
      for (let row = 0; row < 3; row++) for (let i = 0; i < 6; i++) sandT.push(T(-8 + i * 0.62 + (row % 2) * 0.3, 0.18 + row * 0.32, 36.5, 0, 0.05 * Math.sin(i * 3), 0));
      G.add(instanced(sb, M.sandbag, sandT));
      physics.addMinMax(-8.3, 36.25, -4.3, 36.75, 0, 1, 'sandbag', false);

      // lights & volumetrics
      const truckFire = new FireEmitter(scene, new THREE.Vector3(-12, 1.2, 8), 1.2, Math.round(160 * q.particleBudget / 700), q.shadowedLights >= 3);
      G.add(truckFire.group);
      const truckFire2 = new FireEmitter(scene, new THREE.Vector3(-12.4, 0.05, 11), 0.8, Math.round(80 * q.particleBudget / 700));
      G.add(truckFire2.group);
      audio.fireLoop(new THREE.Vector3(-12, 1, 8));
      lightsForUpdate.push({ update: (dt, t) => { truckFire.update(dt, t); truckFire2.update(dt, t); } });

      const tower = new THREE.SpotLight(0xdde6ff, 700, 50, 0.28, 0.5, 1.6);
      tower.position.set(-14, 9.8, 33);
      tower.castShadow = shadowed();
      tower.shadow.mapSize.set(1024, 1024);
      G.add(tower, tower.target);
      const towerLamp = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 0.5, 12), M.lampOn); towerLamp.position.copy(tower.position); G.add(towerLamp);
      const shaft = q.volumetrics ? createLightShaft(0xc8d4ff, 16, 4.2, 0.18) : null;
      if (shaft) { shaft.position.copy(tower.position); G.add(shaft); }
      lightsForUpdate.push({ update: (_dt, t) => {
        const a = Math.sin(t * 0.35) * 1.1 - 0.4;
        tower.target.position.set(-14 + Math.sin(a) * 18, 0, 33 - Math.cos(a) * 18 * 0.9);
        towerLamp.lookAt(tower.target.position);
        towerLamp.rotateX(Math.PI / 2);
        if (shaft) { const dir = tower.target.position.clone().sub(tower.position).normalize(); shaft.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir); }
        if (shaft && (shaft.material as THREE.ShaderMaterial).uniforms) (shaft.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
      } });

      const flood = new THREE.SpotLight(0xffe2b8, 500, 45, 0.6, 0.6, 1.5);
      flood.position.set(14, 12, 36.1); flood.target.position.set(6, 0, 26);
      G.add(flood, flood.target);
      const floodLamp = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.3, 0.1), M.lampOn); floodLamp.position.set(14, 12, 36.05); b2.addMesh(floodLamp, false);
      if (q.volumetrics) { const s2 = createLightShaft(0xffe0b0, 17, 6, 0.1); s2.position.copy(flood.position); s2.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), flood.target.position.clone().sub(flood.position).normalize()); G.add(s2); }
      const doorLamp = new THREE.PointLight(0xffb070, 22, 12, 2); doorLamp.position.set(19.3, 3, 9); G.add(doorLamp);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), M.lampOn); bulb.position.copy(doorLamp.position); b2.addMesh(bulb, false);
      flickerLight(doorLamp, 22);

      // items
      item('y_ammo1', 'ammo_hg', 10, 8.9, 1.61, 5.2, G);
      item('y_herb1', 'herb_g', 1, 4.5, 0, 37.5, G);
      item('y_gpa1', 'gp_a', 1, 16.2, 0, 14.2, G);

      // puzzle: fire barrier at the west opening
      const fireOut = flags.has('fireOut');
      const barrier = new FireEmitter(scene, new THREE.Vector3(-20.3, 0, 14), 1.5, Math.round(140 * q.particleBudget / 700));
      G.add(barrier.group);
      const debris = new THREE.Group();
      for (let i = 0; i < 7; i++) {
        const plank = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 2.2), M.dark);
        plank.position.set(-20.3 + (Math.random() - 0.5) * 1.2, 0.1 + i * 0.08, 14 + (Math.random() - 0.5) * 2); plank.rotation.y = Math.random() * 3;
        b2.addMesh(plank);
      }
      void debris;
      const barrierCol = physics.addMinMax(-21.4, 12, -19.2, 16, 0, 3, 'fire', false);
      let barrierSound: { stop: () => void } | null = null;
      if (fireOut) { barrier.extinguish(); barrierCol.enabled = false; }
      else barrierSound = audio.fireLoop(new THREE.Vector3(-20.3, 1, 14));
      lightsForUpdate.push({ update: (dt, t) => barrier.update(dt, t) });
      ctx.addInteractable(new ScriptedInteractable('fire', new THREE.Vector3(-18.8, 0, 14), 2.4,
        (g) => g.flags.has('fireOut') ? '' : g.inventory.has('extinguisher') ? 'Использовать: Extinguisher' : 'Осмотреть огонь',
        (g, self) => {
          if (g.flags.has('fireOut')) return;
          if (!g.inventory.has('extinguisher')) { g.message('Проход завален горящими обломками. Нужно чем-то потушить огонь.'); return; }
          const it = g.inventory.firstOf('extinguisher'); if (it) g.inventory.remove(it.uid);
          g.flags.add('fireOut'); barrier.extinguish(); barrierCol.enabled = false; barrierSound?.stop();
          self.enabled = false;
          g.message('Огонь потушен. Проход на западный двор свободен.');
          bus.emit('doorsChanged', null);
        }));

      // puzzle: emblem slot by the gate
      ctx.addInteractable(new ScriptedInteractable('emblemSlot', new THREE.Vector3(2.6, 0, 38.6), 2.2,
        (g) => g.flags.has('gateOpen') ? '' : g.inventory.has('emblem') ? 'Вставить: Hawk Emblem' : 'Осмотреть механизм ворот',
        (g, self) => {
          if (g.flags.has('gateOpen')) return;
          if (!g.inventory.has('emblem')) { g.message('На панели ворот углубление в форме эмблемы с ястребом. Над воротами — такой же герб.'); return; }
          const it = g.inventory.firstOf('emblem'); if (it) g.inventory.remove(it.uid);
          g.flags.add('gateOpen'); self.enabled = false;
          audio.explosion(new THREE.Vector3(0, 2, 40));
          bus.emit('cameraShake', { strength: 0.2, duration: 1.5 });
          g.message('Эмблема встала на место. Главные ворота поднимаются — путь к мосту открыт.', 4);
        }));
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.15), M.steel); panel.position.set(4.3, 1.3, 39.7); b2.addMesh(panel);
      const panelLight = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), M.red); panelLight.position.set(4.3, 1.7, 39.6); b2.addMesh(panelLight, false);
      b2.flush(G);

      // zombies
      ctx.spawnZombie({ id: 'yard_1', x: -5, z: 13, yaw: Math.PI, outfit: 'prisoner' }, G);
      ctx.spawnZombie({ id: 'yard_2', x: 2, z: 33, yaw: 0.4, outfit: 'guard', wander: true }, G);
      ctx.spawnZombie({ id: 'yard_3', x: 17, z: 12.5, yaw: -1.2, outfit: 'prisoner', fakeDead: true }, G);

      // guard-house door (hinged at z = 8, swings inward)
      const { pivot, col: dcol } = singleDoor(G, physics, { x: 20.3, z: 8, alongZ: true, openW: 2, openH: 2.5, thick: 0.6, leafMat: M.rust, fillMat: M.concrete });
      guardDoor = new Door('guardDoor', new THREE.Vector3(19.4, 0, 9), pivot, dcol, null, '', -Math.PI * 0.55);
      if (flags.has('open:guardDoor')) guardDoor.openNow();
      ctx.addInteractable(guardDoor);
    },
  });

  // =====================================================================
  // ZONE 2 — GUARD HOUSE (save room + keycard)
  // =====================================================================
  streamer.add({
    id: 'guard', bounds: guardBounds, neighbors: ['yard', 'cells', 'admin'], outdoor: false,
    portalOpen: (n) => (n === 'yard' ? !!guardDoor?.open : n === 'admin' ? !!annex.doors.admin?.open : !!cellDoor?.open),
    build: (G) => {
      const b = new LevelBuilder(physics);
      b.box(26.3, -0.05, 11, 11.4, 0.1, 18, M.tiles, { collide: false, tile: 2, shadow: false });
      b.box(26, 1.8, 1.85, 12.6, 3.6, 0.3, M.plaster);
      // east wall with the doorway to the administration wing (z 4–6)
      b.box(32.15, 1.8, 2.85, 0.3, 3.6, 2.3, M.plaster);
      b.box(32.15, 1.8, 13.15, 0.3, 3.6, 14.3, M.plaster);
      b.box(32.15, 3.05, 5, 0.3, 1.1, 2, M.plaster);
      b.box(22.8, 1.8, 20, 4.4, 3.6, 0.3, M.plaster);
      b.box(29.5, 1.8, 20, 5, 3.6, 0.3, M.plaster);
      b.box(26, 3.05, 20, 2, 1.1, 0.3, M.plaster);
      b.box(26.3, 3.7, 11, 11.4, 0.2, 18.4, M.plaster, { collide: true, tile: 3 });
      // save room partition
      b.box(21.8, 1.8, 7, 2.4, 3.6, 0.2, M.plaster);
      b.box(25.25, 1.8, 7, 1.5, 3.6, 0.2, M.plaster);
      b.box(26, 1.8, 4.5, 0.2, 3.6, 5, M.plaster);
      // save room props: typewriter desk, item box, bench
      if (placeProp(G, physics, 'desk', 21.65, 0, 2.55, 0, { scale: [0.8, 1, 0.85] })) placeProp(G, physics, 'typewriter', 21.6, 0.78, 2.55, 0, { collide: false });
      else { b.box(21.6, 0.4, 3, 1.4, 0.8, 0.7, M.wood, { tile: 1 }); b.box(21.6, 0.9, 3, 0.45, 0.2, 0.35, M.dark, { collide: false }); }
      if (!placeProp(G, physics, 'itembox', 25, 0, 2.55, 0)) b.box(25, 0.4, 2.6, 1.3, 0.8, 0.7, M.rust, { tile: 1 });
      // bench along the west wall (keeps the doorway at x 23–24.5 clear)
      if (!placeProp(G, physics, 'bench', 21.0, 0, 5.0, Math.PI / 2)) b.box(21.0, 0.25, 5.0, 0.45, 0.5, 1.6, M.wood, { tile: 1 });
      // main room: desk with monitors, lockers, cabinet, chair
      const propsOk = !!placeProp(G, physics, 'desk', 29.5, 0, 17.3, Math.PI);
      if (propsOk) {
        placeProp(G, physics, 'monitor', 29.15, 0.78, 17.55, Math.PI + 0.1, { collide: false });
        placeProp(G, physics, 'monitor', 29.9, 0.78, 17.55, Math.PI - 0.15, { collide: false });
        propInstances(G, physics, 'locker', [0, 1, 2, 3, 4].map((i) => [31.72, 0, 9 + i * 0.62, -Math.PI / 2] as [number, number, number, number]));
        placeProp(G, physics, 'cabinet', 20.95, 0, 18.8, Math.PI / 2);
        placeProp(G, physics, 'chair', 28.2, 0, 15.4, 0.6 + Math.PI);
        placeProp(G, physics, 'fluoro', 28.5, 3.52, 12, Math.PI / 2, { collide: false, shadow: false });
      } else {
        b.box(29.5, 0.4, 17.2, 2, 0.8, 0.9, M.wood, { tile: 1 });
        b.box(29.2, 1.05, 17.5, 0.5, 0.4, 0.3, M.dark, { collide: false }); b.box(29.9, 1.05, 17.5, 0.5, 0.4, 0.3, M.dark, { collide: false });
        for (let i = 0; i < 5; i++) b.box(31.7, 1, 9 + i * 0.75, 0.6, 2, 0.7, M.rust, { tile: 1 });
        b.box(21.2, 0.7, 18.8, 0.8, 1.4, 0.6, M.steel, { tile: 1 });
        b.box(28.2, 0.3, 15.4, 0.5, 0.6, 0.5, M.dark, { rotY: 0.6 });
      }
      b.box(27, 0.15, 12, 1.8, 0.3, 0.6, M.corpse, { collide: false, rotY: 1.9 });
      b.flush(G);
      // monitors glow
      const b2 = new LevelBuilder(physics);
      if (!propsOk) for (const x of [29.2, 29.9]) { const s = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.3), M.screen); s.position.set(x, 1.05, 17.34); s.rotation.y = Math.PI; b2.addMesh(s, false); }
      // lights
      const warm = new THREE.PointLight(0xffc27a, 30, 10, 1.8); warm.position.set(23.3, 3.2, 4.5); warm.castShadow = q.shadowedLights >= 3; G.add(warm);
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), M.lampOn); lamp.position.copy(warm.position); b2.addMesh(lamp, false);
      const tubeMat = M.tubeOn.clone();
      const fl = new THREE.PointLight(0xdce6ff, 35, 16, 1.6); fl.position.set(28.5, 3.3, 12); G.add(fl);
      const tube = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.06, 1.4), tubeMat); tube.position.set(28.5, 3.55, 12); G.add(tube);
      flickerLight(fl, 35, tubeMat, true);
      const mon = new THREE.PointLight(0x40ff80, 2, 3, 2); mon.position.set(29.5, 1.1, 17); G.add(mon);
      if (q.volumetrics) { const dust = new DustField(scene, new THREE.Vector3(26, 0, 11), new THREE.Vector3(11, 3.5, 17), 250); G.add(dust.points); lightsForUpdate.push({ update: (_d, t) => dust.update(t) }); }

      // typewriter + item box
      ctx.addInteractable(new ScriptedInteractable('typewriter', new THREE.Vector3(21.6, 0, 3.6), 1.4, () => 'Печатная машинка — сохранить игру', (g) => g.openSaveDialog()));
      ctx.addInteractable(new ScriptedInteractable('itembox', new THREE.Vector3(25, 0, 3.2), 1.4, () => 'Сундук для предметов', (g) => g.openItemBox()));
      // items
      item('g_key', 'keycard', 1, 29.6, 0.81, 16.95, G);
      item('g_mag', 'part_mag', 1, 28.9, 0.81, 16.9, G);
      item('g_herbR', 'herb_r', 1, 30.5, 0, 3.4, G);
      item('g_ammo', 'ammo_hg', 15, 31.2, 0, 8.3, G);
      item('g_herbG', 'herb_g', 1, 21.0, propsOk ? 0.47 : 0.51, 5.2, G);
      item('g_brake', 'part_brake', 1, propsOk ? 20.95 : 21.2, propsOk ? 1.33 : 1.41, 18.8, G);
      // file / lore note
      ctx.addInteractable(new ScriptedInteractable('note1', new THREE.Vector3(29.9, 0, 16.6), 1.2, () => 'Прочитать: журнал охраны', (g) => g.readDoc('guard_log')));
      // zombie
      ctx.spawnZombie({ id: 'guard_1', x: 28.8, z: 12.5, yaw: -Math.PI / 2, outfit: 'guard' }, G);

      // cell-block door (keycard)
      const { pivot, col: dcol } = singleDoor(G, physics, { x: 25, z: 20, alongZ: false, openW: 2, openH: 2.5, leafMat: M.steel, fillMat: M.plaster });
      const reader = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.22, 0.05), M.dark); reader.position.set(27.35, 1.3, 19.8); b2.addMesh(reader, false);
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 4), M.red); led.position.set(27.35, 1.4, 19.77); b2.addMesh(led, false);
      b2.flush(G);
      cellDoor = new Door('cellDoor', new THREE.Vector3(26, 0, 19.2), pivot, dcol, 'keycard', 'Электронный замок. Нужна ключ-карта охраны.', Math.PI * 0.55);
      if (flags.has('open:cellDoor')) cellDoor.openNow();
      ctx.addInteractable(cellDoor);

      // door to the administration wing (east wall, z 4–6)
      const { pivot: apv, col: acol } = singleDoor(G, physics, { x: 32.15, z: 4, alongZ: true, openW: 2, openH: 2.5, leafMat: M.steel, fillMat: M.plaster });
      annex.doors.admin = new Door('adminDoor', new THREE.Vector3(31.2, 0, 5), apv, acol, null, '', Math.PI * 0.55);
      if (flags.has('open:adminDoor')) annex.doors.admin.openNow();
      ctx.addInteractable(annex.doors.admin);
    },
  });

  // =====================================================================
  // ZONE 3 — CELL BLOCK B
  // =====================================================================
  streamer.add({
    id: 'cells', bounds: cellsBounds, neighbors: ['guard', 'gallery'], outdoor: false,
    portalOpen: (n) => n === 'gallery' ? !!annex.doors.gallery?.open : !!cellDoor?.open,
    build: (G) => {
      const b = new LevelBuilder(physics);
      b.box(32.3, -0.05, 32, 23.4, 0.1, 24, M.concrete, { collide: false, tile: 3, shadow: false });
      b.box(38, 2, 20, 12, 4, 0.3, M.plaster);
      // east wall with the doorway to the trophy gallery (z 33–35)
      b.box(44.15, 2, 26.43, 0.3, 4, 13.15, M.plaster);
      b.box(44.15, 2, 39.58, 0.3, 4, 9.15, M.plaster);
      b.box(44.15, 3.25, 34, 0.3, 1.5, 2, M.plaster);
      b.box(32, 2, 44.15, 24.3, 4, 0.3, M.plaster);
      b.box(20.3, 2, 42, 0.6, 4, 4, M.plaster);
      b.box(22.3, 2, 26, 3.4, 4, 12, M.tiles, { tile: 2 });
      b.box(36, 2, 26, 16, 4, 12, M.tiles, { tile: 2 });
      b.box(22.3, 2, 20.4, 3.4, 4, 0.4, M.plaster, { collide: false });
      b.box(32.3, 4.1, 32, 23.4, 0.2, 24, M.concrete, { tile: 3 });
      // cell dividers + beds + toilets
      for (const x of [24, 28, 32, 36, 40]) b.box(x, 2, 40, 0.2, 4, 8, M.plaster);
      const beds: [number, number, number, number][] = [], toilets: [number, number, number, number][] = [];
      for (let c = 0; c < 6; c++) {
        const x0 = 20.6 + c * 4 - (c === 0 ? 0.6 : 0);
        beds.push([x0 + 0.9, 0, 42.9, Math.PI]); toilets.push([x0 + 3.1, 0, 43.62, Math.PI]);
      }
      const bedsOk = propInstances(G, physics, 'bed', beds) && propInstances(G, physics, 'toilet', toilets);
      if (!bedsOk) for (let c = 0; c < 6; c++) {
        const x0 = 20.6 + c * 4 - (c === 0 ? 0.6 : 0);
        b.box(x0 + 0.9, 0.35, 42.5, 1.2, 0.7, 2.2, M.steel, { tile: 1 });
        b.box(x0 + 3.1, 0.3, 43.4, 0.5, 0.6, 0.6, M.white, { tile: 1 });
      }
      b.flush(G);
      // bars (instanced) with open doors in cells 1, 4, 5
      const barT: THREE.Matrix4[] = [];
      const open = new Set([1, 4, 5]);
      for (let c = 0; c < 6; c++) {
        const x0 = 20 + c * 4;
        for (let x = x0 + 0.15; x < x0 + 3.95; x += 0.16) {
          if (open.has(c) && x > x0 + 1.4 && x < x0 + 2.6) continue;
          barT.push(T(x, 1.5, 36));
        }
        barT.push(T(x0 + 2, 3, 36, 0, 0, Math.PI / 2)); // top rail
        if (open.has(c)) {
          physics.addMinMax(x0, 35.95, x0 + 1.4, 36.05, 0, 3, 'bars', false);
          physics.addMinMax(x0 + 2.6, 35.95, x0 + 4, 36.05, 0, 3, 'bars', false);
          for (let k = 0; k < 7; k++) barT.push(T(x0 + 1.4 + Math.cos(1.0) * 0.17 * k, 1.5, 36 + Math.sin(1.0) * 0.17 * k));
        } else physics.addMinMax(x0, 35.95, x0 + 4, 36.05, 0, 3, 'bars', false);
      }
      const barGeo = new THREE.CylinderGeometry(0.018, 0.018, 3, 6);
      G.add(instanced(barGeo, M.bars, barT));
      // fluorescent lights (one broken)
      const lights: [number, number, boolean][] = [[24, 34, false], [33, 34, true], [41, 34, false], [26, 26, false]];
      for (const [lx, lz, broken] of lights) {
        const mat = M.tubeOn.clone();
        const l = new THREE.PointLight(0xd8e4ff, broken ? 26 : 20, 12, 1.7); l.position.set(lx, 3.7, lz); G.add(l);
        if (!broken && lx === 24) l.castShadow = q.shadowedLights >= 3;
        const t = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.14), mat); t.position.set(lx, 3.95, lz); G.add(t);
        flickerLight(l, broken ? 26 : 20, mat, broken);
      }
      // rotating red alarm light
      const alarm = new THREE.SpotLight(0xff1a10, 120, 16, 0.5, 0.5, 1.5); alarm.position.set(43.6, 3.5, 32.5); G.add(alarm, alarm.target);
      const alarmBulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), M.red); alarmBulb.position.copy(alarm.position); G.add(alarmBulb);
      lightsForUpdate.push({ update: (_d, t) => alarm.target.position.set(43.6 + Math.cos(t * 3) * 6, 1, 34 + Math.sin(t * 3) * 6) });
      if (q.volumetrics) {
        const dust = new DustField(scene, new THREE.Vector3(32, 0, 34), new THREE.Vector3(23, 4, 8), 300); G.add(dust.points);
        lightsForUpdate.push({ update: (_d, t) => dust.update(t) });
        // moonlight through a high barred window in cell 6
        const win = createLightShaft(0x9ab0ff, 5, 1.2, 0.35); win.position.set(42, 3.9, 43.9); win.rotation.x = -0.5; G.add(win);
      }
      // items
      item('c_ext', 'extinguisher', 1, 43.4, 0, 41.2, G);
      item('c_bow', 'bowgun', 1, 25.5, bedsOk ? 0.6 : 0.71, 42.6, G);
      item('c_bolts', 'ammo_bolt', 18, 25.5, bedsOk ? 0.6 : 0.71, 43.3, G);
      // prisoner's note (safe code) on the bed in cell 5
      const note = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.28), new THREE.MeshStandardMaterial({ color: 0xd9d0b4, roughness: 0.9 }));
      note.rotation.x = -Math.PI / 2; note.rotation.z = 0.5; note.position.set(37.5, bedsOk ? 0.585 : 0.71, 42.4); G.add(note);
      ctx.addInteractable(new ScriptedInteractable('notePrisoner', new THREE.Vector3(37.5, 0, 41.2), 1.3, () => 'Прочитать: записка заключённого', (g) => g.readDoc('prisoner_note')));
      // door to the trophy gallery
      const { pivot: gpv, col: gcol } = singleDoor(G, physics, { x: 44.15, z: 33, alongZ: true, openW: 2, openH: 2.5, leafMat: M.steel, fillMat: M.plaster });
      annex.doors.gallery = new Door('galleryDoor', new THREE.Vector3(43.3, 0, 34), gpv, gcol, null, '', Math.PI * 0.55);
      if (flags.has('open:galleryDoor')) annex.doors.gallery.openNow();
      ctx.addInteractable(annex.doors.gallery);
      item('c_gpb', 'gp_b', 1, 27.2, 0, 38.2, G);
      item('c_herbB', 'herb_b', 1, 37.2, 0, 38, G);
      item('c_herbG', 'herb_g', 1, 21.5, 0, 34.5, G);
      item('c_gpa', 'gp_a', 1, 43.2, 0, 33, G);
      // zombies
      ctx.spawnZombie({ id: 'cells_1', x: 31, z: 34, yaw: -Math.PI / 2, outfit: 'prisoner' }, G);
      ctx.spawnZombie({ id: 'cells_2', x: 26, z: 29.5, yaw: Math.PI, outfit: 'prisoner' }, G);
      ctx.spawnZombie({ id: 'cells_3', x: 38, z: 40.5, yaw: 0, outfit: 'prisoner', fakeDead: true }, G);
      ctx.spawnZombie({ id: 'cells_4', x: 30, z: 38, yaw: Math.PI, outfit: 'prisoner' }, G); // locked in cell 3, reaching through bars
    },
  });

  // =====================================================================
  // ZONE 4 — WEST YARD (behind the fire)
  // =====================================================================
  streamer.add({
    id: 'west', bounds: westBounds, neighbors: ['yard'], outdoor: true,
    build: (G) => {
      const b = new LevelBuilder(physics);
      const ground = new THREE.PlaneGeometry(16, 24); ground.rotateX(-Math.PI / 2); ground.translate(-28, 0, 16);
      const gg = ground.toNonIndexed(); LevelBuilder.worldUV(gg, 6); b.add(gg, M.ground, false);
      b.box(-36.3, 4, 16, 0.6, 8, 24.6, M.brick, { tile: 3 });
      b.box(-28, 4, 3.7, 16.6, 8, 0.6, M.brick, { tile: 3 });
      b.box(-28, 4, 28.3, 16.6, 8, 0.6, M.brick, { tile: 3 });
      b.box(-32, 1.6, 22, 5, 3.2, 5, M.wood, { tile: 2 });
      b.box(-32, 3.35, 22, 5.6, 0.3, 5.6, M.rust, { collide: false });
      if (!placeProp(G, physics, 'pedestal', -33, 0, 8, 0)) b.box(-33, 0.5, 8, 0.8, 1, 0.8, M.concrete, { tile: 1 });
      if (!placeProp(G, physics, 'crate', -24, 0, 25, 0, { scale: [1.5, 1, 1] })) b.box(-24, 0.45, 25, 1.4, 0.9, 0.9, M.wood, { tile: 1 });
      if (!placeProp(G, physics, 'crate', -26.5, 0, 25.2, 0.4)) b.box(-26.5, 0.45, 25.2, 0.9, 0.9, 0.9, M.wood, { tile: 1, rotY: 0.4 });
      const wb: [number, number, number, number][] = [[-35, 0, 5.5, 0.3], [-34.4, 0, 6.4, 1.2], [-22, 0, 6, 2.2]];
      if (!propInstances(G, physics, 'barrel', wb)) for (const [bx, , bz] of wb) b.cyl(bx, 0.45, bz, 0.3, 0.9, M.rust, true);
      b.box(-29, 0.15, 10, 1.8, 0.3, 0.6, M.corpse, { collide: false, rotY: 0.3 });
      b.flush(G);
      G.add(instanced(wireGeo, M.steel, [...barbed(-36, 4, -36, 28, 8.2), ...barbed(-36, 4, -20, 4, 8.2), ...barbed(-36, 28, -20, 28, 8.2)], false));
      const lamp = new THREE.PointLight(0xffd7a0, 35, 16, 1.8); lamp.position.set(-31.5, 3.2, 19.3); G.add(lamp);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 6), M.lampOn); bulb.position.copy(lamp.position); bulb.updateMatrix(); bulb.castShadow = false; G.add(bulb);
      flickerLight(lamp, 35);
      const emblemLight = new THREE.PointLight(0xffc080, 8, 5, 2); emblemLight.position.set(-33, 1.8, 8); G.add(emblemLight);
      item('w_valve', 'valve_handle', 1, -33, 1.0, 8, G);
      item('w_m3', 'm3', 1, -24, 0.91, 25, G);
      item('w_shells', 'ammo_sg', 8, -26.5, 0.91, 25.2, G);
      item('w_gpb', 'gp_b', 1, -30, 0, 12.5, G);
      item('w_herb', 'herb_g', 1, -35, 0, 26.5, G);
      ctx.spawnZombie({ id: 'west_1', x: -27, z: 17, yaw: Math.PI / 2, outfit: 'guard' }, G);
      ctx.spawnZombie({ id: 'west_2', x: -33, z: 12, yaw: 0.3, outfit: 'prisoner' }, G);
      ctx.spawnZombie({ id: 'west_3', x: -24, z: 9, yaw: 2, outfit: 'civilian', fakeDead: true }, G);
    },
  });

  // ---------------------------------------------------------------- navigation graph
  const navPts: [number, number][] = [];
  for (const x of [-17, -12, -7, -2, 3, 8, 13, 17.5]) for (const z of [2.5, 8, 13, 18, 23, 28, 33, 38]) navPts.push([x, z]);
  navPts.push([-18.6, 14], [-22, 14], [18.8, 9], [21.6, 9], [21.8, 11], [23.7, 5], [23.7, 8.2], [24.5, 11], [28, 11], [24, 15], [28, 15], [30, 5], [26, 18.8], [26, 21.2]);
  for (const x of [-34, -30, -26, -22]) for (const z of [6, 10, 14, 18, 22, 26]) navPts.push([x, z]);
  navPts.push(...annex.navPts);
  navPts.push([26, 24], [26, 27.5], [26, 31], [22, 34], [26, 34], [30, 34], [34, 34], [38, 34], [42, 34], [26, 37.5], [26, 40], [38, 37.5], [38, 40], [42, 37.5], [42, 40], [0, 41.5]);
  const blockedStatic: THREE.Box3[] = [
    new THREE.Box3(new THREE.Vector3(-13.6, 0, 3.4), new THREE.Vector3(-10.4, 3, 10.9)),
    new THREE.Box3(new THREE.Vector3(-34.9, 0, 19.1), new THREE.Vector3(-29.1, 3, 24.9)),
  ];
  for (const [x, z] of navPts) {
    const p = new THREE.Vector3(x, 0.5, z);
    if (blockedStatic.some((bx) => bx.containsPoint(p))) continue;
    nav.add(x, z);
  }

  const outdoorBounds = [yardBounds, westBounds, ...exterior.outdoorBounds];
  return {
    name: 'Rockfort Island — Prison',
    spawn: { pos: new THREE.Vector3(0, 0, 3), yaw: 0 },
    outdoorBounds,
    saveRoom,
    update: (dt, t, player) => {
      for (const l of lightsForUpdate) l.update(dt, t);
      // moon shadow frustum follows the player (snapped to 4 m to avoid shimmering)
      const sx = Math.round(player.x / 4) * 4, sz = Math.round(player.z / 4) * 4;
      if (moon.target.position.x !== sx || moon.target.position.z !== sz) {
        moon.target.position.set(sx, 0, sz); moon.position.set(sx - 30, 50, sz);
        moon.target.updateMatrixWorld();
      }
    },
  };
}
