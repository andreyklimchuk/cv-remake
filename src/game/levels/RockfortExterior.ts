import * as THREE from 'three';
import type { LevelContext } from './PrisonLevel';
import type { AnnexHelpers } from './PrisonAnnex';
import { doorLeaf } from './PrisonAnnex';
import { LevelBuilder, instanced, T } from '../world/LevelBuilder';
import { Door, ScriptedInteractable } from '../world/Interactables';
import { placeProp, propClone, propInstances } from '../world/Props';
import { pbr } from '../../engine/Materials';
import { FireEmitter } from '../../engine/VolumetricFX';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';

/**
 * ROCKFORT ISLAND — outside the prison (after the Hawk-Emblem gate), modelled on the original CV route:
 *   gate_out (road, guard booth) → bridge over the chasm → plaza with a wide staircase going up →
 *   to the RIGHT the Military Training Facility (yard + lobby), STRAIGHT ahead a rock passage →
 *   Ashford Palace forecourt → Palace main hall (imperial double staircase, gallery with arches,
 *   rosette windows, chandeliers). The door under the gallery ends the demo.
 * Elevations: everything past the staircase is at y = 3.6, the palace gallery at y = 7.6
 * (PhysicsWorld floors/ramps; nav nodes carry their height, stairs are linked explicitly).
 */
export function buildExterior(ctx: LevelContext, H: AnnexHelpers) {
  const { physics, streamer, flags, quality: q, scene, nav } = ctx;
  const M = H.M as Record<string, THREE.MeshStandardMaterial>;
  const tex = q.textureSize;
  const X = {
    stone: pbr('concrete', tex, 1, { color: 0xa39a8c }),
    rock: pbr('concrete', tex, 1, { color: 0x4a4842 }),
    paving: pbr('tiles', tex, 1, { color: 0x8c877c }),
    marble: pbr('tiles', tex, 1, { color: 0xd9d2c4, roughness: 0.35 }),
    darkWood: pbr('wood', Math.min(tex, 512), 1, { color: 0x6a3a22 }),
    wallpaper: pbr('plaster', tex, 1, { color: 0x6e3b30 }),
    cream: pbr('plaster', tex, 1, { color: 0xcfc4ae }),
    carpet: new THREE.MeshStandardMaterial({ color: 0x3e0608, roughness: 1 }),
    gold: new THREE.MeshStandardMaterial({ color: 0xb08a3a, metalness: 0.9, roughness: 0.35 }),
    asphalt: pbr('wetGround', tex, 1, { color: 0x55585c }),
    milConcrete: pbr('concrete', tex, 1, { color: 0x8e9286 }),
    glowWarm: new THREE.MeshStandardMaterial({ color: 0x302010, emissive: 0xffa040, emissiveIntensity: 1.4 }),
    abyss: new THREE.MeshBasicMaterial({ color: 0x020304 }),
  };
  const navIdx: Record<string, number> = {};
  const N = (key: string | null, x: number, z: number, y = 0) => { const i = nav.add(x, z, y); if (key) navIdx[key] = i; return i; };
  const gateOut = new THREE.Box3(new THREE.Vector3(-14, -1, 40.6), new THREE.Vector3(14, 20, 56));
  const bridgeB = new THREE.Box3(new THREE.Vector3(-10, -60, 56), new THREE.Vector3(10, 20, 86));
  const plazaB = new THREE.Box3(new THREE.Vector3(-10, -1, 86), new THREE.Vector3(12, 20, 118));
  const tyardB = new THREE.Box3(new THREE.Vector3(-40, -1, 98), new THREE.Vector3(-10, 20, 118));
  const trainB = new THREE.Box3(new THREE.Vector3(-38, -1, 118), new THREE.Vector3(-16, 20, 130.3));
  const passB = new THREE.Box3(new THREE.Vector3(-6, -1, 118), new THREE.Vector3(6, 20, 142));
  const pyardB = new THREE.Box3(new THREE.Vector3(-16, -1, 142), new THREE.Vector3(16, 25, 160));
  const hallB = new THREE.Box3(new THREE.Vector3(-14.3, -1, 160), new THREE.Vector3(14.3, 25, 190.5));
  const barrB = new THREE.Box3(new THREE.Vector3(-38.2, -1, 130.3), new THREE.Vector3(-16.1, 20, 145));
  const pcorrB = new THREE.Box3(new THREE.Vector3(-2.3, -1, 190.5), new THREE.Vector3(2.3, 20, 206));
  const dinB = new THREE.Box3(new THREE.Vector3(-10.3, -1, 206), new THREE.Vector3(10.3, 20, 224.5));
  const U = 3.6;   // upper ground level
  const G2 = 7.6;  // palace gallery level

  let trainDoor: Door | null = null;
  let barrDoor: Door | null = null;
  let hallDoorOpen = flags.has('open:hallEnd');
  let fireLit = flags.has('dining:fire');
  let palaceOpen = flags.has('open:palaceDoor');

  // ------------------------------------------------------------------ helpers
  /** place a prop so that its bounding box rests on yBase */
  const placeAt = (G: THREE.Object3D, name: string, x: number, yBase: number, z: number, rot = 0, scale?: number | [number, number, number], collide = false) => {
    const o = placeProp(G, physics, name, x, yBase, z, rot, { collide: false, scale });
    if (!o) return null;
    o.updateMatrixWorld(true);
    const bb = new THREE.Box3().setFromObject(o);
    o.position.y += yBase - bb.min.y;
    if (collide) { o.updateMatrixWorld(true); const b2 = new THREE.Box3().setFromObject(o); physics.addMinMax(b2.min.x, b2.min.z, b2.max.x, b2.max.z, b2.min.y, b2.max.y, 'prop', true); }
    return o;
  };
  const lamp = (G: THREE.Object3D, x: number, y: number, z: number, color = 0xffd9a0, I = 26, dist = 14) => {
    placeProp(G, physics, 'lamp_post', x, y, z, 0, { pad: -0.05 });
    const l = new THREE.PointLight(color, I, dist, 1.6); l.position.set(x, y + 4.0, z); G.add(l);
    H.flicker(l, I);
    return l;
  };
  /** visual steps + solid ramp floor (rising along +z or -z) */
  const stairs = (b: LevelBuilder, x1: number, x2: number, z1: number, z2: number, y0: number, y1: number, mat: THREE.Material, runner?: number) => {
    const n = Math.round((y1 - y0) / 0.2), d = (z2 - z1) / n, w = x2 - x1, cx = (x1 + x2) / 2;
    for (let i = 0; i < n; i++) {
      const top = y0 + (y1 - y0) * (i + 1) / n, zc = z1 + (i + 0.5) * d;
      b.box(cx, (top + y0) / 2 - 0.0, zc, w, top - y0, Math.abs(d) + 0.01, mat, { collide: false, tile: 1 });
      if (runner) b.box(cx, top + 0.01, zc - d * 0.04, runner, 0.03, Math.abs(d) * 1.02, X.carpet, { collide: false, shadow: false });
    }
    physics.addFloor({ x1, z1, x2, z2, y0, y1, axis: z2 > z1 ? 'z' : '-z', solid: true });
  };
  /** sloped primitive balustrade (instanced balusters + rail) from (x,z1,y1) to (x,z2,y2) */
  const slopeRail = (G: THREE.Object3D, b: LevelBuilder, x: number, z1: number, y1: number, z2: number, y2: number) => {
    const n = Math.round(Math.abs(z2 - z1) / 0.28);
    const tr: THREE.Matrix4[] = [];
    for (let i = 0; i <= n; i++) { const k = i / n; tr.push(T(x, y1 + (y2 - y1) * k + 0.45, z1 + (z2 - z1) * k)); }
    G.add(instanced(new THREE.CylinderGeometry(0.045, 0.06, 0.9, 6), X.darkWood, tr));
    const len = Math.hypot(z2 - z1, y2 - y1);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, len), X.darkWood);
    rail.position.set(x, (y1 + y2) / 2 + 0.95, (z1 + z2) / 2); rail.rotation.x = -Math.atan2(y2 - y1, z2 - z1);
    b.addMesh(rail);
    physics.addMinMax(x - 0.15, Math.min(z1, z2), x + 0.15, Math.max(z1, z2), Math.min(y1, y2), Math.max(y1, y2) + 1, 'rail', false);
  };
  /** straight balustrade from Blender 1 m sections along x or z */
  const railRun = (G: THREE.Object3D, x1: number, z1: number, x2: number, z2: number, y: number) => {
    const len = Math.hypot(x2 - x1, z2 - z1), n = Math.max(1, Math.round(len));
    const rot = Math.abs(x2 - x1) > Math.abs(z2 - z1) ? 0 : Math.PI / 2;
    const list: [number, number, number, number][] = [];
    for (let i = 0; i < n; i++) { const k = (i + 0.5) / n; list.push([x1 + (x2 - x1) * k, y, z1 + (z2 - z1) * k, rot]); }
    propInstances(G, physics, 'baluster_rail', list, { collide: false, scale: [len / n, 1, 1] });
    physics.addMinMax(Math.min(x1, x2) - 0.12, Math.min(z1, z2) - 0.12, Math.max(x1, x2) + 0.12, Math.max(z1, z2) + 0.12, y, y + 1.05, 'rail', false);
  };
  const ground = (b: LevelBuilder, x1: number, z1: number, x2: number, z2: number, y: number, mat: THREE.Material, tile = 4) => {
    const g = new THREE.PlaneGeometry(x2 - x1, z2 - z1); g.rotateX(-Math.PI / 2); g.translate((x1 + x2) / 2, y, (z1 + z2) / 2);
    const gg = g.toNonIndexed(); LevelBuilder.worldUV(gg, tile); b.add(gg, mat, false);
  };
  const paper = (G: THREE.Object3D, x: number, y: number, z: number, rz = 0) => {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.28), new THREE.MeshStandardMaterial({ color: 0xe0d8c0, roughness: 0.9 }));
    p.rotation.x = -Math.PI / 2; p.rotation.z = rz; p.position.set(x, y + 0.005, z); G.add(p);
  };
  // upper-level floors (one solid mass per area; the passage/palace share one rect)
  physics.addFloor({ x1: -10, z1: 98, x2: -4, z2: 118, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: 4, z1: 98, x2: 10, z2: 118, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: -4, z1: 106, x2: 4, z2: 118, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: -38, z1: 100, x2: -10, z2: 118, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: -38, z1: 118, x2: -16, z2: 130, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: -4, z1: 118, x2: 4, z2: 142, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: -16, z1: 142, x2: 16, z2: 190.5, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: -38, z1: 130, x2: -16, z2: 145, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: -2, z1: 190.5, x2: 2, z2: 206, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: -10, z1: 206, x2: 10, z2: 224.5, y0: U, y1: U, axis: null, solid: true });
  physics.addFloor({ x1: -14, z1: 180, x2: 14, z2: 190, y0: G2, y1: G2, axis: null });  // palace gallery (walk underneath)

  // =================================================================== GATE OUT
  streamer.add({
    id: 'gate_out', bounds: gateOut, neighbors: ['yard', 'bridge'], outdoor: true,
    portalOpen: (n) => n !== 'yard' || flags.has('gateOpen'),
    build: (G) => {
      const b = new LevelBuilder(physics);
      ground(b, -14, 40.6, 14, 56, 0, M.ground, 6);
      b.box(0, 0.005, 48.3, 6, 0.02, 15.4, X.asphalt, { collide: false, shadow: false, tile: 4 });
      // cliffs both sides
      b.box(-13, 6, 48.3, 2, 12, 15.4, X.rock, { tile: 5 }); b.box(13, 6, 48.3, 2, 12, 15.4, X.rock, { tile: 5 });
      b.box(-10.5, 2, 44, 3, 4, 6, X.rock, { tile: 4, rotY: 0.2 }); b.box(11, 1.5, 53, 3, 3, 4, X.rock, { tile: 4, rotY: -0.3 });
      // guard booth (x 6.5–9.5, z 44.5–47.5, opening towards the road)
      b.box(9.4, 1.3, 46, 0.2, 2.6, 3, M.concrete); b.box(8, 1.3, 44.6, 3, 2.6, 0.2, M.concrete); b.box(8, 1.3, 47.4, 3, 2.6, 0.2, M.concrete);
      b.box(6.6, 1.3, 44.95, 0.2, 2.6, 0.7, M.concrete); b.box(6.6, 1.3, 47.05, 0.2, 2.6, 0.7, M.concrete); b.box(6.6, 2.35, 46, 0.2, 0.5, 1.4, M.concrete, { collide: false });
      b.box(8, 2.7, 46, 3.4, 0.2, 3.4, M.rust);
      // bridge-head pillars
      for (const x of [-3.2, 3.2]) { b.box(x, 2, 55.4, 1, 4, 1, X.stone, { tile: 2 }); b.box(x, 4.15, 55.4, 1.2, 0.3, 1.2, X.stone, { collide: false }); }
      b.box(-8.4, 0.6, 55.6, 10, 1.2, 0.5, X.stone); b.box(8.4, 0.6, 55.6, 10, 1.2, 0.5, X.stone);
      b.flush(G);
      placeProp(G, physics, 'desk', 8.6, 0, 46, -Math.PI / 2, { scale: [0.6, 1, 0.8] });
      placeProp(G, physics, 'chair', 7.6, 0, 46.4, Math.PI / 2 + 0.5);
      const boothL = new THREE.PointLight(0xffe2b0, 7, 5, 1.8); boothL.position.set(8, 2.3, 46); G.add(boothL); H.flicker(boothL, 7, undefined, true);
      H.item('x_pack1', 'side_pack', 1, 8.6, 0.78, 45.7, G);
      propInstances(G, physics, 'sandbags', [[-6, 0, 50, 0.1], [-6.6, 0, 47.6, Math.PI / 2], [5.5, 0, 52.5, -0.2]]);
      propInstances(G, physics, 'barrel', [[-9, 0, 42.5, 0], [-8.4, 0, 43.2, 1]]);
      placeProp(G, physics, 'crate', 10.5, 0, 50, 0.4);
      H.item('x_gpb', 'gp_b', 1, 10.5, 0.9, 50, G);
      lamp(G, -4.2, 0, 44); lamp(G, 4.2, 0, 52.5);
      ctx.spawnZombie({ id: 'go_1', x: 4, z: 49, yaw: Math.PI, outfit: 'guard' }, G);
      ctx.spawnZombie({ id: 'go_2', x: -7.5, z: 52.5, yaw: 0.6, outfit: 'prisoner', fakeDead: true }, G);
    },
  });
  for (const x of [-9, -4.5, 0, 4.5]) for (const z of [43, 48.5, 54]) N(null, x, z);

  // =================================================================== BRIDGE
  streamer.add({
    id: 'bridge', bounds: bridgeB, neighbors: ['gate_out', 'plaza'], outdoor: true,
    build: (G) => {
      const b = new LevelBuilder(physics);
      b.box(0, -0.3, 71, 5, 0.6, 30, X.stone, { collide: false, tile: 3 });
      b.box(0, 0.003, 71, 3, 0.02, 30, X.asphalt, { collide: false, shadow: false, tile: 4 });
      b.box(-2.3, -1.3, 71, 0.4, 1.6, 30, M.rust, { collide: false }); b.box(2.3, -1.3, 71, 0.4, 1.6, 30, M.rust, { collide: false });
      for (const z of [64, 78]) { b.box(0, -26, z, 4.4, 50, 3, X.rock, { collide: false, tile: 6 }); b.box(0, -1.6, z, 6, 1.2, 3.6, X.stone, { collide: false }); }
      // chasm walls & distant cliffs
      b.box(0, -26, 55.6, 60, 52, 1, X.rock, { collide: false, tile: 8 }); b.box(0, -26, 86.4, 60, 52, 1, X.rock, { collide: false, tile: 8 });
      b.box(-32, -14, 71, 8, 60, 34, X.rock, { collide: false, tile: 8 }); b.box(34, -10, 71, 8, 64, 34, X.rock, { collide: false, tile: 8 });
      b.box(-22, -20, 60, 10, 30, 6, X.rock, { collide: false, tile: 6, rotY: 0.5 }); b.box(24, -18, 83, 10, 34, 6, X.rock, { collide: false, tile: 6, rotY: -0.4 });
      b.flush(G);
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 40), X.abyss); floor.rotation.x = -Math.PI / 2; floor.position.set(0, -50, 71); G.add(floor);
      // mist layers in the chasm
      const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d')!;
      const gr = x.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, 'rgba(160,170,185,0.55)'); gr.addColorStop(1, 'rgba(160,170,185,0)');
      x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
      const mistMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, opacity: 0.6 });
      const mists: THREE.Mesh[] = [];
      for (let i = 0; i < 7; i++) {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(40, 26), mistMat); m.rotation.x = -Math.PI / 2;
        m.position.set((i % 3 - 1) * 16, -6 - i * 3.5, 60 + (i * 7) % 24); m.renderOrder = 2; G.add(m); mists.push(m);
      }
      H.onUpdate((dt) => { for (let i = 0; i < mists.length; i++) { mists[i].position.x += dt * (0.4 + i * 0.07); if (mists[i].position.x > 26) mists[i].position.x = -26; } });
      const rl: [number, number, number, number][] = [];
      for (let z = 57; z < 86; z += 2) { rl.push([-2.45, 0, z, Math.PI / 2]); rl.push([2.45, 0, z, Math.PI / 2]); }
      propInstances(G, physics, 'bridge_rail', rl, { collide: false });
      physics.addMinMax(-2.75, 56, -2.35, 86, 0, 1.3, 'rail', false); physics.addMinMax(2.35, 56, 2.75, 86, 0, 1.3, 'rail', false);
      lamp(G, -2.2, 0, 62, 0xcfe0ff, 20); lamp(G, 2.2, 0, 72, 0xcfe0ff, 20); lamp(G, -2.2, 0, 82, 0xcfe0ff, 20);
      ctx.spawnZombie({ id: 'br_1', x: 0.6, z: 74, yaw: Math.PI, outfit: 'guard', wander: true }, G);
    },
  });
  for (let z = 58; z <= 84; z += 4.5) N(null, 0, z);

  // =================================================================== PLAZA + STAIRCASE + TERRACE
  streamer.add({
    id: 'plaza', bounds: plazaB, neighbors: ['bridge', 'tyard', 'passage'], outdoor: true,
    build: (G) => {
      const b = new LevelBuilder(physics);
      ground(b, -10, 86, 10, 98, 0, X.paving, 3);
      b.box(-11, 6, 92, 2, 12, 12, X.rock, { tile: 5 }); b.box(11, 6, 92, 2, 12, 12, X.rock, { tile: 5 });
      b.box(11, 9, 108, 2, 18, 20, X.rock, { tile: 5 });
      b.box(-10.5, 1.2, 87, 1.5, 2.4, 2, X.rock, { tile: 3, rotY: 0.4 });
      // terrace masses + facing
      b.box(-7, U / 2, 102, 6, U, 8, X.stone, { tile: 3 }); b.box(7, U / 2, 102, 6, U, 8, X.stone, { tile: 3 });
      b.box(0, U / 2, 112, 20, U, 12, X.stone, { collide: false, tile: 3 });
      ground(b, -10, 98, -4, 118, U + 0.002, X.paving, 3); ground(b, 4, 98, 10, 118, U + 0.002, X.paving, 3); ground(b, -4, 106, 4, 118, U + 0.002, X.paving, 3);
      // staircase (x -4..4, z 98..106) with cheek walls
      stairs(b, -4, 4, 98, 106, 0, U, X.stone);
      for (const sx of [-4.25, 4.25]) for (let i = 0; i < 9; i++) b.box(sx, (0.4 * (i + 1)) / 2, 98.45 + i * 0.89, 0.5, 0.4 * (i + 1), 0.9, X.stone, { collide: false, tile: 1 });
      // urns on pedestals by the stair top
      b.flush(G);
      slopeRail(G, b, -4.25, 98, 0.4, 106, U); slopeRail(G, b, 4.25, 98, 0.4, 106, U); b.flush(G);
      railRun(G, -10, 98.2, -4.5, 98.2, U); railRun(G, 4.5, 98.2, 10, 98.2, U);
      // edges: chasm side of the bridge head, terrace north walls
      const e = new LevelBuilder(physics);
      e.box(-6.35, 0.6, 86.2, 7.3, 1.2, 0.4, X.stone); e.box(6.35, 0.6, 86.2, 7.3, 1.2, 0.4, X.stone);
      e.box(-10, U + 4, 118.6, 12, 8, 1.2, X.rock, { tile: 5 }); e.box(7.5, U + 4, 118.6, 5, 8, 1.2, X.rock, { tile: 5 });
      e.box(-10.2, U + 0.5, 99.1, 0.4, 1, 2.2, X.stone);
      e.flush(G);
      placeAt(G, 'urn', -4.6, U, 106.8, 0, 1, true); placeAt(G, 'urn', 4.6, U, 106.8, 0, 1, true);
      lamp(G, -8, 0, 89); lamp(G, 8, 0, 95.5); lamp(G, -8.5, U, 116); lamp(G, 8.5, U, 109);
      placeProp(G, physics, 'crate', 8.6, 0, 88, 0.3);
      H.item('x_herb1', 'herb_g', 1, 8.6, 0.9, 88, G);
      propInstances(G, physics, 'barrel', [[-8.8, 0, 96.5, 0], [-8.1, 0, 97.2, 2]]);
      ctx.spawnZombie({ id: 'pl_1', x: 3, z: 92, yaw: Math.PI, outfit: 'prisoner' }, G);
      ctx.spawnZombie({ id: 'pl_2', x: -6, z: 95, yaw: 0.4, outfit: 'guard', fakeDead: true }, G);
      ctx.spawnZombie({ id: 'pl_3', x: 2, y: U, z: 113, yaw: Math.PI, outfit: 'civilian' }, G);
    },
  });
  for (const x of [-8, -4, 0, 4, 8]) for (const z of [88, 92, 96]) N(x === 0 && z === 96 ? 'stairLow' : null, x, z);
  N('stairBottom', 0, 97.4); N('stairTop', 0, 106.6, U); nav.link(navIdx.stairBottom, navIdx.stairTop);
  for (const x of [-8, -4, 0, 4, 8]) for (const z of [109, 113, 116.5]) N(null, x, z, U);
  N(null, -7, 101, U); N(null, 7, 101, U);

  // =================================================================== TRAINING YARD (Military Training Facility, outside)
  streamer.add({
    id: 'tyard', bounds: tyardB, neighbors: ['plaza', 'training'], outdoor: true,
    portalOpen: (n) => n !== 'training' || !!trainDoor?.open,
    build: (G) => {
      const b = new LevelBuilder(physics);
      b.box(-24, U / 2, 109, 28, U, 18, X.milConcrete, { collide: false, tile: 4 });
      b.box(-24, U / 2, 99, 28, U, 2, X.rock, { collide: false, tile: 4 });
      ground(b, -38, 100, -10, 118, U + 0.002, X.milConcrete, 4);
      b.box(-24, U + 0.5, 100.2, 28, 1, 0.4, X.milConcrete);          // parapet
      b.box(-38.3, U + 4, 109, 0.6, 8, 18, X.milConcrete, { tile: 4 });
      // building shell (x -38..-16, z 118..130, two storeys)
      const H8 = 8;
      b.box(-33, U + H8 / 2, 118, 10, H8, 0.4, X.milConcrete, { tile: 4 }); b.box(-21, U + H8 / 2, 118, 10, H8, 0.4, X.milConcrete, { tile: 4 });
      b.box(-27, U + 2.6 + (H8 - 2.6) / 2, 118, 2, H8 - 2.6, 0.4, X.milConcrete, { tile: 4 });
      b.box(-27, U + H8 + 0.15, 124, 22.6, 0.3, 12.6, M.concrete, { collide: false });
      b.box(-27, U + 2.75, 117.6, 3, 0.25, 1, M.concrete, { collide: false }); // canopy
      b.box(-27, U + 3.95, 117.7, 22.4, 0.3, 0.3, M.concrete, { collide: false }); // floor band
      // flagpole
      b.cyl(-13, U + 4, 103, 0.06, 8, M.steel, true, 6);
      b.flush(G);
      placeAt(G, 'sign_umbrella', -27, U + 4.4, 117.75, Math.PI, 1.1);
      const wins: [number, number, number, number][] = [];
      for (const x of [-35, -31, -23, -19]) for (const y of [U + 0.9, U + 4.7]) wins.push([x, y, 117.78, Math.PI]);
      propInstances(G, physics, 'window_frame', wins, { collide: false });
      // flag (Umbrella logo)
      const c = document.createElement('canvas'); c.width = 256; c.height = 160; const x = c.getContext('2d')!;
      x.fillStyle = '#d8d4cc'; x.fillRect(0, 0, 256, 160);
      for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#f2f0ea' : '#c4161c'; x.beginPath(); x.moveTo(128, 80); x.arc(128, 80, 60, i * Math.PI / 4 - Math.PI / 8, (i + 1) * Math.PI / 4 - Math.PI / 8); x.fill(); }
      const flagT = new THREE.CanvasTexture(c); flagT.colorSpace = THREE.SRGBColorSpace;
      const fg = new THREE.PlaneGeometry(2.4, 1.5, 12, 1); fg.translate(1.2, 0, 0);
      const flag = new THREE.Mesh(fg, new THREE.MeshStandardMaterial({ map: flagT, side: THREE.DoubleSide, roughness: 0.9 }));
      flag.position.set(-13, U + 7, 103); G.add(flag);
      const fp = fg.attributes.position as THREE.BufferAttribute; const base = Float32Array.from(fp.array as Float32Array);
      H.onUpdate((_dt, t) => { for (let i = 0; i < fp.count; i++) { const u = base[i * 3]; fp.setZ(i, Math.sin(u * 2.4 - t * 4) * 0.12 * u); } fp.needsUpdate = true; });
      propInstances(G, physics, 'sandbags', [[-20, U, 108, 0.2], [-21.5, U, 109.5, Math.PI / 2 + 0.2], [-31, U, 106, -0.1], [-15, U, 114, 1.2]]);
      propInstances(G, physics, 'barrel', [[-36.8, U, 102, 0], [-36.2, U, 102.8, 1.3], [-36.9, U, 103.6, 2]]);
      placeProp(G, physics, 'crate', -36.6, U, 115.6, 0.1); placeProp(G, physics, 'crate', -35.6, U, 116.2, 0.5, { scale: 0.85 });
      H.item('x_gpc', 'gp_c', 1, -36.6, U + 0.9, 115.6, G);
      // floodlight + door lamp
      b.cyl(-12, U + 5, 116.5, 0.12, 10, M.steel, true, 8); b.box(-12, U + 10.1, 116.2, 1.2, 0.45, 0.4, M.steel, { collide: false }); b.flush(G);
      const flood = new THREE.SpotLight(0xe8f0ff, 120, 40, 0.75, 0.5, 1.4); flood.position.set(-12, U + 9.8, 116); flood.target.position.set(-26, U, 108);
      flood.castShadow = q.shadows; G.add(flood, flood.target);
      const dl = new THREE.PointLight(0xffd090, 10, 7, 1.8); dl.position.set(-27, U + 2.5, 117.2); G.add(dl); H.flicker(dl, 10);
      ctx.spawnZombie({ id: 'ty_1', x: -20, y: U, z: 112, yaw: Math.PI / 2, outfit: 'guard' }, G);
      ctx.spawnZombie({ id: 'ty_2', x: -31, y: U, z: 110, yaw: 2.2, outfit: 'guard', wander: true }, G);
    },
  });
  for (const x of [-35, -31, -27, -23, -19, -15, -11.5]) for (const z of [102.5, 106, 110, 114, 116.8]) N(x === -27 && z === 116.8 ? 'trainOut' : null, x, z, U);

  // =================================================================== TRAINING FACILITY LOBBY (interior)
  streamer.add({
    id: 'training', bounds: trainB, neighbors: ['tyard', 'barracks'], outdoor: false,
    portalOpen: (n) => n === 'barracks' ? !!barrDoor?.open : !!trainDoor?.open,
    build: (G) => {
      const b = new LevelBuilder(physics);
      b.box(-27, U / 2, 124, 22, U, 12, X.milConcrete, { collide: false, tile: 4 });
      b.box(-27, U + 0.003, 124, 21.6, 0.01, 11.6, M.tiles, { collide: false, shadow: false, tile: 2 });
      b.box(-27, U + 3.7, 124, 22, 0.2, 12, M.plaster, { collide: false, tile: 3 });
      // back wall with the doorway to the barracks (x -35..-33.4)
      b.box(-36.6, U + 4, 130, 3.2, 8, 0.4, X.milConcrete, { tile: 4 }); b.box(-24.6, U + 4, 130, 17.6, 8, 0.4, X.milConcrete, { tile: 4 });
      b.box(-34.2, U + 5.2, 130, 1.6, 5.6, 0.4, X.milConcrete, { tile: 4 });
      b.box(-38, U + 4, 124, 0.4, 8, 12.4, X.milConcrete, { tile: 4 }); b.box(-16, U + 4, 124, 0.4, 8, 12.4, X.milConcrete, { tile: 4 });
      for (const [cx, cz, w, d] of [[-36.4, 129.75, 2.7, 0.06], [-24.8, 129.75, 17.1, 0.06], [-37.75, 124, 0.06, 11.5], [-16.25, 124, 0.06, 11.5]] as [number, number, number, number][]) b.box(cx, U + 0.6, cz, w, 1.2, d, M.wood, { collide: false, tile: 1 });
      b.box(-27, U + 0.6, 118.25, 21.5, 1.2, 0.06, M.wood, { collide: false, tile: 1 });
      // counter
      b.box(-20.5, U + 0.55, 121.5, 0.6, 1.1, 4, M.wood, { tile: 1 });
      b.flush(G);
      const lockers: [number, number, number, number][] = [];
      for (let i = 0; i < 8; i++) lockers.push([-37.55, U, 120 + i * 0.6, Math.PI / 2]);
      propInstances(G, physics, 'locker', lockers);
      placeProp(G, physics, 'bench', -33.5, U, 122.5, Math.PI / 2); placeProp(G, physics, 'bench', -33.5, U, 126, Math.PI / 2);
      placeProp(G, physics, 'desk', -21, U, 127.5, Math.PI); placeProp(G, physics, 'chair', -21, U, 128.5, Math.PI + 0.3);
      placeProp(G, physics, 'typewriter', -21.5, U + 0.78, 127.4, Math.PI - 0.2, { collide: false });
      placeProp(G, physics, 'bookshelf', -27, U, 129.7, Math.PI); placeProp(G, physics, 'cabinet', -24.5, U, 129.6, Math.PI);
      propInstances(G, physics, 'crate', [[-29.5, U, 128.9, 0.1], [-30.4, U, 129.1, 0.6]]);
      // upper-floor door (blocked)
      const ud = doorLeaf(false, 1.4, 2.4, M.steel); ud.position.set(-17.4, U, 129.78); ud.rotation.y += Math.PI; G.add(ud);
      ctx.addInteractable(new ScriptedInteractable('trainUpper', new THREE.Vector3(-18.1, U, 129), 1.2, () => 'Осмотреть дверь',
        (g) => { g.message('Дверь на лестницу второго этажа завалена с той стороны. Не открыть.'); audio.click(); }));
      for (const fx of [-33, -27, -21]) {
        placeProp(G, physics, 'fluoro', fx, U + 3.55, 124, 0, { collide: false, shadow: false });
        const l = new THREE.PointLight(0xdce6ff, 16, 10, 1.7); l.position.set(fx, U + 3.2, 124); G.add(l);
        H.flicker(l, 16, undefined, fx === -27);
      }
      // notice + items
      const memo = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.4), new THREE.MeshStandardMaterial({ color: 0xdcd6c2, roughness: 0.9 }));
      memo.position.set(-27, U + 1.6, 129.78); memo.rotation.y = Math.PI; G.add(memo);
      ctx.addInteractable(new ScriptedInteractable('memoTrain', new THREE.Vector3(-27, U, 128.9), 1.1, () => 'Прочитать: приказ по корпусу', (g) => g.readDoc('training_memo')));
      paper(G, -20.6, U + 0.78, 127.2, 0.4);
      ctx.addInteractable(new ScriptedInteractable('memoReload', new THREE.Vector3(-20.6, U, 126.5), 1.1, () => 'Прочитать: инструкция к станку', (g) => g.readDoc('reload_manual')));
      H.item('x_reload', 'reload_tool', 1, -20.5, U + 1.1, 121, G);
      H.item('x_bowpow', 'bow_powder', 1, -20.5, U + 1.1, 122.6, G);
      H.item('x_pack2', 'side_pack', 1, -33.5, U + 0.45, 126.3, G);
      H.item('x_bolts', 'ammo_bolt', 12, -29.5, U + 0.9, 128.9, G);
      H.item('x_gpa', 'gp_a', 1, -36.9, U, 128.8, G);
      ctx.spawnZombie({ id: 'tr_1', x: -23, y: U, z: 124.5, yaw: -Math.PI / 2, outfit: 'guard' }, G);
      ctx.spawnZombie({ id: 'tr_2', x: -34.6, y: U, z: 120.4, yaw: 0.6, outfit: 'guard', fakeDead: true }, G);
      // entrance door (hinge x -28)
      const pivot = new THREE.Group(); pivot.position.set(-28, U, 118);
      pivot.add(doorLeaf(false, 2, 2.5, M.steel)); G.add(pivot);
      const col = physics.addMinMax(-28, 117.85, -26, 118.15, U, U + 2.5, 'door', true);
      trainDoor = new Door('trainDoor', new THREE.Vector3(-27, U, 117.2), pivot, col, null, '', Math.PI * 0.55);
      if (flags.has('open:trainDoor')) trainDoor.openNow();
      ctx.addInteractable(trainDoor);
    },
  });
  N('trainIn', -27, 119.6, U); nav.link(navIdx.trainOut, navIdx.trainIn);
  for (const x of [-35.5, -31, -27, -23, -18.5]) for (const z of [120, 124.2, 128]) N(null, x, z, U);

  // =================================================================== BARRACKS + ARMORY (behind the training lobby) — Cerberus pack
  streamer.add({
    id: 'barracks', bounds: barrB, neighbors: ['training'], outdoor: false,
    portalOpen: () => !!barrDoor?.open,
    build: (G) => {
      const b = new LevelBuilder(physics);
      const CH = 3.6;
      b.box(-27, U + 0.003, 137.5, 21.6, 0.01, 14.4, X.milConcrete, { collide: false, shadow: false, tile: 3 });
      b.box(-27, U + CH + 0.1, 137.5, 22.4, 0.2, 15, M.plaster, { collide: false, tile: 3 });
      b.box(-27, U + 4, 144.8, 22.4, 8, 0.4, X.milConcrete, { tile: 4 });
      b.box(-38, U + 4, 137.5, 0.4, 8, 15, X.milConcrete, { tile: 4 }); b.box(-16, U + 4, 137.5, 0.4, 8, 15, X.milConcrete, { tile: 4 });
      // partition barracks | armory (doorway z 136..137.6)
      b.box(-25, U + CH / 2, 133.1, 0.3, CH, 5.8, X.milConcrete, { tile: 3 });
      b.box(-25, U + CH / 2, 141.1, 0.3, CH, 7, X.milConcrete, { tile: 3 });
      b.box(-25, U + 3, 136.8, 0.3, 1.2, 1.6, X.milConcrete, { tile: 3 });
      // olive wainscot
      const olive = new THREE.MeshStandardMaterial({ color: 0x4a5236, roughness: 0.85 });
      b.box(-27, U + 0.6, 144.55, 21.5, 1.2, 0.06, olive, { collide: false });
      b.box(-37.75, U + 0.6, 137.5, 0.06, 1.2, 14.4, olive, { collide: false }); b.box(-16.25, U + 0.6, 137.5, 0.06, 1.2, 14.4, olive, { collide: false });
      // bunk beds (two tiers) along the west wall and the partition
      const lower: [number, number, number, number][] = [], upper: [number, number, number, number][] = [];
      for (const z of [132.4, 135.4, 138.6, 141.8]) {
        lower.push([-36.9, U, z, 0]); upper.push([-36.9, U + 1.15, z, 0]);
        if (z > 137) { lower.push([-26.1, U, z, 0]); upper.push([-26.1, U + 1.15, z, 0]); }
      }
      propInstances(G, physics, 'bed', lower);
      propInstances(G, physics, 'bed', upper, { collide: false });
      for (const [bx, bz] of [...lower.map((l) => [l[0], l[2]])]) for (const dx of [-0.4, 0.4]) for (const dz of [-1, 1]) b.box(bx + dx, U + 1.05, bz + dz, 0.05, 2.1, 0.05, M.steel, { collide: false, shadow: false });
      // overturned footlockers, blood trail, kennel cage
      propInstances(G, physics, 'crate', [[-31.5, U, 133.2, 0.4], [-33.2, U, 140.8, 1.1]], { scale: [0.8, 0.5, 0.5] });
      placeProp(G, physics, 'bench', -31.5, U, 137.5, 0);
      const blood = new THREE.MeshStandardMaterial({ color: 0x3a0404, roughness: 0.3, transparent: true, opacity: 0.85, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
      for (const [x, z, r] of [[-33, 134, 0.9], [-31, 136.5, 0.5], [-29.6, 138.8, 0.7], [-34.8, 142.6, 1.1]] as [number, number, number][]) {
        const d = new THREE.Mesh(new THREE.CircleGeometry(r, 14), blood); d.rotation.x = -Math.PI / 2; d.scale.y = 0.6; d.position.set(x, U + 0.012, z); G.add(d);
      }
      // dog kennel (bent bars) in the corner of the barracks
      for (let i = 0; i < 9; i++) b.box(-33.6 + i * 0.4, U + 0.8, 143.4, 0.04, 1.6, 0.04, M.steel, { collide: false, shadow: false });
      b.box(-32, U + 1.6, 143.4, 3.6, 0.06, 0.06, M.steel, { collide: false });
      // armory: weapon racks, cabinets, crates
      for (const z of [131.5, 133.5]) { b.box(-16.6, U + 1, z, 0.5, 2, 1.6, M.steel, { tile: 1 }); for (let k = 0; k < 4; k++) b.box(-16.9, U + 1.2, z - 0.6 + k * 0.4, 0.1, 1.1, 0.06, M.wood, { collide: false, shadow: false }); }
      placeProp(G, physics, 'cabinet', -16.6, U, 140.5, -Math.PI / 2); placeProp(G, physics, 'cabinet', -16.6, U, 141.4, -Math.PI / 2);
      propInstances(G, physics, 'crate', [[-23.8, U, 143.6, 0.2], [-22.6, U, 143.8, -0.3], [-23.4, U + 0.9, 143.7, 0.6]]);
      placeProp(G, physics, 'desk', -20.5, U, 143.9, Math.PI); placeProp(G, physics, 'sandbags', -19, U, 135.5, Math.PI / 2);
      placeProp(G, physics, 'monitor', -20.5, U + 0.78, 143.9, Math.PI, { collide: false });
      // lights (one dead, one flickering)
      for (const [fx, fz, dead] of [[-31.5, 134, false], [-31.5, 141, true], [-20.5, 137.5, false]] as [number, number, boolean][]) {
        placeProp(G, physics, 'fluoro', fx, U + 3.55, fz, Math.PI / 2, { collide: false, shadow: false });
        if (dead) continue;
        const l = new THREE.PointLight(0xd8e4ff, 20, 12, 1.6); l.position.set(fx, U + 3.2, fz); G.add(l);
        H.flicker(l, 20, undefined, fx < -30);
      }
      const red = new THREE.PointLight(0xff3020, 3, 6, 1.8); red.position.set(-32, U + 2.6, 144); G.add(red);
      b.flush(G);
      paper(G, -20.4, U + 0.78, 143.6, 0.3);
      ctx.addInteractable(new ScriptedInteractable('docKennel', new THREE.Vector3(-20.5, U, 143), 1.1, () => 'Прочитать: журнал кинолога', (g) => g.readDoc('kennel_log')));
      H.item('b_hg', 'ammo_hg', 20, -16.9, U + 0.78, 137.4, G);
      H.item('b_sg', 'ammo_sg', 7, -22.6, U + 0.9, 143.8, G);
      H.item('b_herb', 'herb_g', 1, -36.9, U + 0.55, 135.4, G);
      H.item('b_herb2', 'herb_r', 1, -26.1, U + 0.55, 141.8, G);
      H.item('b_gren', 'gren_exp', 4, -16.9, U + 0.78, 139.6, G);
      ctx.spawnZombie({ id: 'cb_1', x: -31, y: U, z: 141, yaw: Math.PI, kind: 'cerberus' }, G);
      ctx.spawnZombie({ id: 'cb_2', x: -34, y: U, z: 137.5, yaw: 2.6, kind: 'cerberus' }, G);
      ctx.spawnZombie({ id: 'cb_3', x: -20, y: U, z: 140, yaw: -2.4, kind: 'cerberus' }, G);
      ctx.spawnZombie({ id: 'cb_z', x: -22, y: U, z: 132, yaw: 0.5, outfit: 'guard', fakeDead: true }, G);
      // steel door in the training-lobby back wall (hinge x -35)
      const pivot = new THREE.Group(); pivot.position.set(-35, U, 130);
      pivot.add(doorLeaf(false, 1.6, 2.4, M.steel)); G.add(pivot);
      const col = physics.addMinMax(-35, 129.85, -33.4, 130.15, U, U + 2.4, 'door', true);
      barrDoor = new Door('barrDoor', new THREE.Vector3(-34.2, U, 129.2), pivot, col, null, '', -Math.PI * 0.55);
      if (flags.has('open:barrDoor')) barrDoor.openNow();
      ctx.addInteractable(barrDoor);
    },
  });
  N('barrOut', -34.2, 128.6, U); N('barrIn', -34.2, 131.4, U); nav.link(navIdx.barrOut, navIdx.barrIn);
  for (const x of [-34.5, -31.5, -28.5]) for (const z of [133.5, 136.8, 140, 143]) N(null, x, z, U);
  N(null, -25, 136.8, U);
  for (const x of [-22.5, -19.5]) for (const z of [131.5, 134.5, 137.5, 140.5]) N(null, x, z, U);


  // =================================================================== PASSAGE (rock canyon with arches)
  streamer.add({
    id: 'passage', bounds: passB, neighbors: ['plaza', 'pyard'], outdoor: true,
    build: (G) => {
      const b = new LevelBuilder(physics);
      b.box(0, U / 2, 130, 8, U, 24, X.rock, { collide: false });
      ground(b, -4, 118, 4, 142, U + 0.002, X.paving, 3);
      for (const s of [-1, 1]) {
        b.box(s * 5, U + 6, 130, 2, 12, 24, X.rock, { tile: 5 });
        for (let i = 0; i < 6; i++) b.box(s * (4.2 + (i % 2) * 0.3), U + 1.5 + (i % 3), 120 + i * 4, 0.8, 3 + (i % 3) * 2, 2.6, X.rock, { tile: 3, rotY: (i % 2 ? 0.2 : -0.15) * s });
      }
      for (const z of [123, 130, 137]) {
        b.box(-3.5, U + 2.4, z, 0.8, 4.8, 0.9, X.stone, { tile: 2 }); b.box(3.5, U + 2.4, z, 0.8, 4.8, 0.9, X.stone, { tile: 2 });
        b.box(0, U + 5.2, z, 8, 0.8, 1, X.stone, { collide: false, tile: 2 });
      }
      b.flush(G);
      // open iron gate at the end
      for (const s of [-1, 1]) {
        const g = propClone('gate_iron');
        if (g) { g.scale.set(3.4, 3.2, 1); g.position.set(s * 3.4, U, 141.6); g.rotation.y = s < 0 ? -1.2 : Math.PI + 1.2; G.add(g); }
        b.box(s * 3.75, U + 1.8, 141.6, 0.5, 3.6, 0.5, X.stone);
      }
      b.flush(G);
      const torch = (x: number, z: number) => {
        placeAt(G, 'sconce', x, U + 2.2, z, x < 0 ? Math.PI / 2 : -Math.PI / 2);
        const l = new THREE.PointLight(0xffa850, 9, 9, 1.8); l.position.set(x + (x < 0 ? 0.4 : -0.4), U + 2.7, z); G.add(l); H.flicker(l, 9);
      };
      torch(-3.95, 126.5); torch(3.95, 133.5);
      H.item('x_bexp', 'bolt_exp', 6, -2.6, U, 128, G);
      ctx.spawnZombie({ id: 'ps_1', x: 1, y: U, z: 132, yaw: Math.PI, outfit: 'civilian' }, G);
    },
  });
  for (let z = 120; z <= 141; z += 3.5) N(null, 0, z, U);

  // =================================================================== PALACE FORECOURT
  const leaves: THREE.Object3D[] = [];
  let palaceCol: ReturnType<typeof physics.addMinMax> | null = null;
  streamer.add({
    id: 'pyard', bounds: pyardB, neighbors: ['passage', 'hall'], outdoor: true,
    portalOpen: (n) => n !== 'hall' || palaceOpen,
    build: (G) => {
      const b = new LevelBuilder(physics);
      b.box(0, U / 2, 151, 32, U, 18, X.rock, { collide: false });
      ground(b, -16, 142, 16, 160, U + 0.002, X.paving, 2.5);
      b.box(0, U + 0.004, 151, 3, 0.01, 18, X.stone, { collide: false, shadow: false, tile: 2 });
      // side walls with balustrade tops
      for (const s of [-1, 1]) { b.box(s * 16.3, U + 2.5, 151, 0.6, 5, 18, X.stone, { tile: 3 }); b.box(s * 10, U + 2.5, 142.3, 12, 5, 0.6, X.stone, { tile: 3 }); }
      // facade (z 160) with entrance x -1.5..1.5
      b.box(-8.75, U + 7, 160, 14.5, 14, 0.6, X.cream, { tile: 3 }); b.box(8.75, U + 7, 160, 14.5, 14, 0.6, X.cream, { tile: 3 });
      b.box(0, U + 9, 160, 3, 10, 0.6, X.cream, { tile: 3 });
      b.box(0, U + 7.4, 159.4, 30, 0.8, 0.8, X.stone, { collide: false });      // entablature
      b.box(0, U + 14.2, 159.6, 32.5, 0.5, 1, X.stone, { collide: false });    // cornice
      const ped = new THREE.Shape(); ped.moveTo(-9, 0); ped.lineTo(9, 0); ped.lineTo(0, 3.2); ped.lineTo(-9, 0);
      const pg = new THREE.ExtrudeGeometry(ped, { depth: 0.8, bevelEnabled: false }); pg.translate(0, U + 7.8, 159);
      LevelBuilder.worldUV(pg, 2); b.add(pg, X.stone);
      b.box(0, U + 4.1, 159.65, 3.6, 0.4, 0.3, X.stone, { collide: false });   // door lintel
      // steps up to the doors
      b.box(0, U + 0.1, 158.9, 6, 0.2, 1.6, X.stone, { collide: false }); b.box(0, U + 0.2, 159.4, 5, 0.2, 0.6, X.stone, { collide: false });
      b.flush(G);
      propInstances(G, physics, 'column', [[-3, U, 159.2, 0], [3, U, 159.2, 0], [-7, U, 159.2, 0], [7, U, 159.2, 0], [-11.5, U, 159.2, 0], [11.5, U, 159.2, 0]], { scale: [1.1, 0.76, 1.1] });
      const wl: [number, number, number, number][] = [];
      for (const x of [-9.2, -5, 5, 9.2]) { wl.push([x, U + 1.2, 159.68, Math.PI]); wl.push([x, U + 9.2, 159.68, Math.PI]); }
      propInstances(G, physics, 'window_frame', wl, { collide: false });
      for (const [x, y] of wl.map((w) => [w[0], w[1]])) { const gl = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.3), X.glowWarm); gl.position.set(x, y + 0.7, 159.69); gl.rotation.y = Math.PI; G.add(gl); }
      placeAt(G, 'statue_hawk', 0, U, 150, Math.PI, 1.5, true);
      for (const [x, z] of [[-6, 146], [6, 146], [-6, 156], [6, 156]]) placeAt(G, 'urn', x, U, z, 0, 1, true);
      lamp(G, -3.6, U, 145); lamp(G, 3.6, U, 145); lamp(G, -12.5, U, 154); lamp(G, 12.5, U, 154);
      // braziers by the entrance
      for (const s of [-1, 1]) {
        b.cyl(s * 2.3, U + 0.5, 157.8, 0.18, 1, M.bronze, true, 8); b.cyl(s * 2.3, U + 1.05, 157.8, 0.3, 0.2, M.bronze, false, 10, 0.42);
        const f = new FireEmitter(scene, new THREE.Vector3(s * 2.3, U + 1.2, 157.8), 0.28, Math.round(50 * q.particleBudget / 700), false);
        H.onUpdate((dt, t) => f.update(dt, t));
      }
      b.flush(G);
      // double door (hinges at x ±1.5; opens inward +z)
      for (const s of [-1, 1]) {
        const p = new THREE.Group(); p.position.set(s * 1.5, U, 160);
        const leaf = propClone('door_wood') ?? new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.08), X.darkWood);
        leaf.scale.set(1.5, 4, 1); p.add(leaf);
        p.rotation.y = s < 0 ? 0 : Math.PI; p.userData.base = p.rotation.y; G.add(p); leaves.push(p);
      }
      palaceCol = physics.addMinMax(-1.5, 159.8, 1.5, 160.2, U, U + 4, 'door', true);
      if (palaceOpen) { palaceCol.enabled = false; leaves[0].rotation.y = -Math.PI / 2; leaves[1].rotation.y = Math.PI * 1.5; }
      H.onUpdate((dt) => {
        if (!palaceOpen) return;
        leaves[0].rotation.y = THREE.MathUtils.damp(leaves[0].rotation.y, -Math.PI / 2, 2.5, dt);
        leaves[1].rotation.y = THREE.MathUtils.damp(leaves[1].rotation.y, Math.PI * 1.5, 2.5, dt);
      });
      ctx.addInteractable(new ScriptedInteractable('palaceDoor', new THREE.Vector3(0, U, 158.9), 1.8,
        () => palaceOpen ? '' : 'Открыть двери дворца',
        (g, self) => {
          if (palaceOpen) return;
          palaceOpen = true; g.flags.add('open:palaceDoor'); if (palaceCol) palaceCol.enabled = false; self.enabled = false;
          audio.click(true); bus.emit('doorsChanged', null);
          g.message('Тяжёлые резные двери медленно расходятся. Дворец Эшфордов.', 4);
        }));
      if (palaceOpen) { /* nothing */ }
      H.item('x_herb2', 'herb_r', 1, 13.8, U, 145, G);
      ctx.spawnZombie({ id: 'py_1', x: 5, y: U, z: 151, yaw: -Math.PI / 2, outfit: 'guard' }, G);
      ctx.spawnZombie({ id: 'py_2', x: -9, y: U, z: 148, yaw: 1, outfit: 'civilian', wander: true }, G);
    },
  });
  for (const x of [-12, -6, 0, 6, 12]) for (const z of [144.5, 148, 153, 157.5]) N(x === 0 && z === 157.5 ? 'palOut' : null, x, z, U);

  // =================================================================== PALACE MAIN HALL
  streamer.add({
    id: 'hall', bounds: hallB, neighbors: ['pyard', 'pcorr'], outdoor: false,
    portalOpen: (n) => n === 'pcorr' ? hallDoorOpen : palaceOpen,
    build: (G) => {
      const b = new LevelBuilder(physics);
      const C = 16.6; // ceiling height
      ground(b, -14, 160.3, 14, 190, U + 0.002, X.marble, 1.6);
      const cg = new THREE.PlaneGeometry(2.6, 29.7); cg.rotateX(-Math.PI / 2); cg.translate(0, U + 0.012, 175.15); b.add(cg, X.carpet, false);
      // walls
      b.box(-14.15, (U + C) / 2, 175, 0.3, C - U, 30.4, X.wallpaper, { tile: 3 }); b.box(14.15, (U + C) / 2, 175, 0.3, C - U, 30.4, X.wallpaper, { tile: 3 });
      b.box(-7.8, (U + C) / 2, 190.15, 13, C - U, 0.3, X.wallpaper, { tile: 3 }); b.box(7.8, (U + C) / 2, 190.15, 13, C - U, 0.3, X.wallpaper, { tile: 3 });
      b.box(0, (U + 3.4 + C) / 2, 190.15, 2.6, C - U - 3.4, 0.3, X.wallpaper, { tile: 3 });
      b.box(-7.75, (U + C) / 2, 160.45, 12.5, C - U, 0.3, X.wallpaper, { tile: 3 }); b.box(7.75, (U + C) / 2, 160.45, 12.5, C - U, 0.3, X.wallpaper, { tile: 3 });
      b.box(0, (U + 4 + C) / 2, 160.45, 3, C - U - 4, 0.3, X.wallpaper, { collide: false, tile: 3 });
      // dark wood panelling (lower walls + gallery level)
      for (const y0 of [U, G2]) {
        b.box(-13.97, y0 + 1.2, 175, 0.06, 2.4, 29.4, X.darkWood, { collide: false, tile: 1 }); b.box(13.97, y0 + 1.2, 175, 0.06, 2.4, 29.4, X.darkWood, { collide: false, tile: 1 });
        if (y0 === U) { b.box(-7.65, y0 + 1.2, 189.97, 12.7, 2.4, 0.06, X.darkWood, { collide: false, tile: 1 }); b.box(7.65, y0 + 1.2, 189.97, 12.7, 2.4, 0.06, X.darkWood, { collide: false, tile: 1 }); }
        else b.box(0, y0 + 1.2, 189.97, 27.8, 2.4, 0.06, X.darkWood, { collide: false, tile: 1 });
        b.box(-13.9, y0 + 2.45, 175, 0.14, 0.12, 29.4, X.gold, { collide: false }); b.box(13.9, y0 + 2.45, 175, 0.14, 0.12, 29.4, X.gold, { collide: false });
      }
      b.box(-7.75, U + 1.2, 160.62, 12.4, 2.4, 0.06, X.darkWood, { collide: false, tile: 1 }); b.box(7.75, U + 1.2, 160.62, 12.4, 2.4, 0.06, X.darkWood, { collide: false, tile: 1 });
      // coffered ceiling
      b.box(0, C + 0.15, 175, 28.6, 0.3, 30.4, X.darkWood, { collide: false, tile: 2 });
      for (let x = -12; x <= 12; x += 4) b.box(x, C - 0.25, 175, 0.35, 0.5, 29.6, X.darkWood, { collide: false, shadow: false });
      for (let z = 162; z <= 188; z += 4) b.box(0, C - 0.25, z, 27.8, 0.5, 0.35, X.darkWood, { collide: false, shadow: false });
      b.box(0, C - 0.8, 175, 28, 0.4, 0.4, X.gold, { collide: false, shadow: false });
      // imperial double staircase → gallery
      stairs(b, -13.7, -9.7, 170, 180, U, G2, X.marble, 2.2);
      stairs(b, 9.7, 13.7, 170, 180, U, G2, X.marble, 2.2);
      b.box(0, G2 - 0.2, 185, 27.7, 0.4, 10, X.marble, { collide: false, tile: 1.6 });
      b.box(0, G2 - 0.55, 180.05, 27.7, 0.3, 0.3, X.gold, { collide: false });
      const gc = new THREE.PlaneGeometry(2.6, 9.5); gc.rotateX(-Math.PI / 2); gc.translate(0, G2 + 0.012, 185.2); b.add(gc, X.carpet, false);
      const gc2 = new THREE.PlaneGeometry(27, 2.2); gc2.rotateX(-Math.PI / 2); gc2.translate(0, G2 + 0.013, 182); b.add(gc2, X.carpet, false);
      // upper arches on the gallery back wall
      const arch = (cx: number, r: number) => { const g = new THREE.TorusGeometry(r, 0.28, 6, 18, Math.PI); g.translate(cx, G2 + 5, 189.35); b.add(g.toNonIndexed(), X.cream); };
      arch(-10, 2); arch(-6, 2); arch(6, 2); arch(10, 2); arch(0, 4);
      b.box(0, G2 + 7.6, 189.6, 28, 0.6, 0.8, X.cream, { collide: false });
      // under-gallery door frame
      for (const sx of [-1, 1]) b.box(sx * 1.45, U + 1.85, 189.95, 0.3, 3.7, 0.36, X.darkWood, { collide: false });
      b.box(0, U + 3.55, 189.95, 3.2, 0.3, 0.36, X.darkWood, { collide: false });
      // side balconies (decorative, above the stairs)
      for (const s of [-1, 1]) b.box(s * 13.1, G2 + 2.6, 165, 1.8, 0.25, 6, X.marble, { collide: false });
      b.flush(G);
      slopeRail(G, b, -9.6, 170, U, 180, G2); slopeRail(G, b, 9.6, 170, U, 180, G2); b.flush(G);
      railRun(G, -9.6, 180.1, 9.6, 180.1, G2);
      for (const s of [-1, 1]) {
        railRun(G, s * 12.2, 162, s * 12.2, 168, G2 + 2.72);
        railRun(G, s * 13.6, 161.95, s * 12.2, 161.95, G2 + 2.72);
        railRun(G, s * 13.6, 168.05, s * 12.2, 168.05, G2 + 2.72);
      }
      placeProp(G, physics, 'newel_post', -9.6, U, 169.7, 0); placeProp(G, physics, 'newel_post', 9.6, U, 169.7, 0);
      placeProp(G, physics, 'newel_post', -9.6, G2, 180.1, 0, { collide: false }); placeProp(G, physics, 'newel_post', 9.6, G2, 180.1, 0, { collide: false });
      // columns under the gallery and upper colonnade
      propInstances(G, physics, 'column', [[-6, U, 180.6, 0], [-2.2, U, 180.6, 0], [2.2, U, 180.6, 0], [6, U, 180.6, 0]], { scale: [0.75, (G2 - 0.4 - U) / 5, 0.75] });
      propInstances(G, physics, 'column', [[-12, G2, 189.35, 0], [-8, G2, 189.35, 0], [-4, G2, 189.35, 0], [4, G2, 189.35, 0], [8, G2, 189.35, 0], [12, G2, 189.35, 0]], { collide: false });
      placeAt(G, 'painting_alexia', 0, G2 + 1.4, 189.9, Math.PI, 1.6);
      for (const x of [-10, 10]) placeAt(G, 'banner', x, G2 + 1.2, 189.9, Math.PI, 1);
      for (const s of [-1, 1]) placeAt(G, 'banner', s * 13.9, U + 3.4, 164, s < 0 ? Math.PI / 2 : -Math.PI / 2, 1.1);
      // rosette windows
      for (const s of [-1, 1]) for (const z of [166, 176]) placeAt(G, 'rosette_window', s * 13.95, G2 + 3.2, z, s < 0 ? Math.PI / 2 : -Math.PI / 2, 1.2);
      placeAt(G, 'rosette_window', 0, U + 6.5, 160.3, 0, 1.7);
      const moonL = new THREE.SpotLight(0x8aa4d8, 60, 30, 0.5, 0.6, 1.2); moonL.position.set(-13.5, G2 + 4.4, 166); moonL.target.position.set(-2, U, 170); G.add(moonL, moonL.target);
      // chandeliers
      for (const z of [166.5, 175.5]) {
        placeAt(G, 'chandelier', 0, C - 3.4, z, 0, 1.3);
        b.cyl(0, C - 0.7, z, 0.03, 1.4, X.gold, false, 4);
        const l = new THREE.PointLight(0xffc27a, 70, 24, 1.5); l.position.set(0, C - 3.2, z); l.castShadow = q.shadows && z < 170; G.add(l);
        H.flicker(l, 70);
      }
      b.flush(G);
      // sconces
      for (const s of [-1, 1]) for (const z of [163, 168.5, 184, 188]) {
        const y = z > 180 ? U + 2.4 : U + 2.6;
        placeAt(G, 'sconce', s * 13.95, y, z, s < 0 ? Math.PI / 2 : -Math.PI / 2);
        if (z === 168.5 || z === 184) { const l = new THREE.PointLight(0xffb060, 6, 7, 1.8); l.position.set(s * 13.4, y + 0.6, z); G.add(l); H.flicker(l, 6); }
      }
      for (const s of [-1, 1]) { const l = new THREE.PointLight(0xffb060, 5, 6, 1.8); l.position.set(s * 9.6, U + 1.9, 169.7); G.add(l); }
      placeProp(G, physics, 'pedestal', -6, U, 162.3, 0);
      paper(G, -6, U + 1.0, 162.3, 0.3);
      ctx.addInteractable(new ScriptedInteractable('noteAshford', new THREE.Vector3(-6, U, 163.2), 1.2, () => 'Прочитать: записка дворецкого', (g) => g.readDoc('butler_note')));
      ctx.addInteractable(new ScriptedInteractable('portraitAlexia', new THREE.Vector3(0, G2, 188.4), 1.5, () => 'Осмотреть портрет',
        (g) => g.message('Портрет светловолосой девочки в золочёной раме. Табличка: «Alexia Ashford, 1971». Взгляд у неё недетский.', 5)));
      // double door under the gallery → portrait corridor (hinges at x ±1.3, opens into the corridor)
      const hl: THREE.Object3D[] = [];
      for (const sx of [-1, 1]) {
        const p = new THREE.Group(); p.position.set(sx * 1.3, U, 189.85);
        const leaf = propClone('door_wood') ?? new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.08), X.darkWood);
        leaf.scale.set(1.3, 3.4, 1); p.add(leaf); p.rotation.y = sx < 0 ? 0 : Math.PI; G.add(p); hl.push(p);
      }
      const hallCol = physics.addMinMax(-1.3, 189.7, 1.3, 190.3, U, U + 3.4, 'door', true);
      const openHall = (now: boolean) => { hallCol.enabled = false; if (now) { hl[0].rotation.y = -Math.PI / 2; hl[1].rotation.y = Math.PI / 2; } };
      if (hallDoorOpen) openHall(true);
      H.onUpdate((dt) => {
        if (!hallDoorOpen) return;
        hl[0].rotation.y = THREE.MathUtils.damp(hl[0].rotation.y, -Math.PI / 2, 3, dt);
        hl[1].rotation.y = THREE.MathUtils.damp(hl[1].rotation.y, Math.PI / 2, 3, dt);
      });
      ctx.addInteractable(new ScriptedInteractable('hallEnd', new THREE.Vector3(0, U, 188.9), 1.6, () => hallDoorOpen ? '' : 'Открыть дверь',
        (g, self) => {
          if (hallDoorOpen) return;
          hallDoorOpen = true; g.flags.add('open:hallEnd'); openHall(false); self.enabled = false;
          audio.click(true); bus.emit('doorsChanged', null);
          g.message('Двери под галереей открываются в длинный тёмный коридор.', 3);
        }));
      H.item('x_pack3', 'side_pack', 1, 12.6, G2, 186.5, G);
      H.item('x_bfire', 'bolt_fire', 6, -12.8, U, 162, G);
      H.item('x_hg2', 'ammo_hg', 15, -12.6, G2, 187.5, G);
      ctx.spawnZombie({ id: 'ph_1', x: -5, y: G2, z: 185.5, yaw: Math.PI, outfit: 'civilian' }, G);
      ctx.spawnZombie({ id: 'ph_2', x: 6, y: U, z: 167, yaw: -2.4, outfit: 'guard', fakeDead: true }, G);
      ctx.spawnZombie({ id: 'ph_3', x: 11.5, y: G2, z: 184, yaw: -Math.PI / 2, outfit: 'prisoner' }, G);
    },
  });
  N('palIn', 0, 161.8, U); nav.link(navIdx.palOut, navIdx.palIn);
  for (const x of [-8, -4, 0, 4, 8]) for (const z of [164, 168, 172, 176]) N(null, x, z, U);
  for (const x of [-4, 0, 4]) for (const z of [183.5, 187.5]) N(null, x, z, U);
  for (const s of [-1, 1]) {
    const a = N(null, s * 11.7, 168.8, U), m = N(null, s * 11.7, 175, U + (G2 - U) / 2), t = N(null, s * 11.7, 181.2, G2);
    nav.link(a, m); nav.link(m, t);
  }
  for (const x of [-12, -8, -4, 0, 4, 8, 12]) for (const z of [182.5, 187]) N(null, x, z, G2);

  // =================================================================== PORTRAIT CORRIDOR + DINING HALL (Bandersnatch, fireplace puzzle)
  const CC = 4.6;
  streamer.add({
    id: 'pcorr', bounds: pcorrB, neighbors: ['hall', 'dining'], outdoor: false,
    portalOpen: (n) => n === 'hall' ? hallDoorOpen : true,
    build: (G) => {
      const b = new LevelBuilder(physics);
      ground(b, -2, 190.3, 2, 206, U + 0.002, X.marble, 1.6);
      const rg = new THREE.PlaneGeometry(1.6, 15.4); rg.rotateX(-Math.PI / 2); rg.translate(0, U + 0.012, 198.2); b.add(rg, X.carpet, false);
      b.box(-2.15, U + CC / 2, 198.2, 0.3, CC, 16, X.wallpaper, { tile: 3 }); b.box(2.15, U + CC / 2, 198.2, 0.3, CC, 16, X.wallpaper, { tile: 3 });
      b.box(0, U + CC + 0.1, 198.2, 4.6, 0.2, 16, X.darkWood, { collide: false, tile: 2 });
      for (const sx of [-1, 1]) {
        b.box(sx * 1.97, U + 1.1, 198.2, 0.06, 2.2, 15.6, X.darkWood, { collide: false, tile: 1 });
        b.box(sx * 1.92, U + 2.25, 198.2, 0.1, 0.1, 15.6, X.gold, { collide: false });
      }
      for (let z = 192; z <= 205; z += 2.6) b.box(0, U + CC - 0.15, z, 4.2, 0.3, 0.25, X.darkWood, { collide: false, shadow: false });
      // arch into the dining hall
      for (const sx of [-1, 1]) b.box(sx * 1.85, U + CC / 2, 205.9, 0.4, CC, 0.3, X.cream, { collide: false });
      b.box(0, U + CC - 0.3, 205.9, 4, 0.6, 0.3, X.cream, { collide: false });
      b.flush(G);
      const pics = ['painting_eagle', 'painting_wolf', 'painting_snake', 'painting_warden'];
      for (let i = 0; i < 4; i++) {
        const z = 193.2 + i * 3.4, sx = i % 2 ? 1 : -1;
        placeAt(G, pics[i], sx * 1.98, U + 1.3, z, sx < 0 ? Math.PI / 2 : -Math.PI / 2, 0.9);
        placeAt(G, 'sconce', -sx * 1.98, U + 2.4, z, -sx < 0 ? Math.PI / 2 : -Math.PI / 2);
        if (i % 2 === 0) { const l = new THREE.PointLight(0xffb060, 5, 7, 1.8); l.position.set(-sx * 1.5, U + 3, z); G.add(l); H.flicker(l, 5, undefined, i === 2); }
      }
      placeAt(G, 'urn', -1.6, U, 191.2, 0, 0.8, true); placeAt(G, 'urn', 1.6, U, 204.6, 0, 0.8, true);
      H.item('c_hg', 'ammo_hg', 15, 1.6, U, 191.3, G);
      ctx.spawnZombie({ id: 'pc_1', x: 0.6, y: U, z: 201, yaw: Math.PI, outfit: 'civilian' }, G);
    },
  });
  for (const z of [191.5, 195, 198.5, 202, 205]) N(z === 191.5 ? 'pcIn' : null, 0, z, U);
  N('hallDoorIn', 0, 188.6, U); nav.link(navIdx.hallDoorIn, navIdx.pcIn);

  streamer.add({
    id: 'dining', bounds: dinB, neighbors: ['pcorr'], outdoor: false,
    build: (G) => {
      const b = new LevelBuilder(physics);
      const DH = 6.4;
      ground(b, -10, 206, 10, 224.3, U + 0.002, X.marble, 1.6);
      const rug = new THREE.PlaneGeometry(5, 13); rug.rotateX(-Math.PI / 2); rug.translate(0, U + 0.012, 215); b.add(rug, X.carpet, false);
      // walls (front wall has the 3.6 m arch opening)
      b.box(-6.05, U + DH / 2, 206.15, 8.1, DH, 0.3, X.wallpaper, { tile: 3 }); b.box(6.05, U + DH / 2, 206.15, 8.1, DH, 0.3, X.wallpaper, { tile: 3 });
      b.box(0, U + CC + (DH - CC) / 2, 206.15, 4, DH - CC, 0.3, X.wallpaper, { tile: 3 });
      b.box(-10.15, U + DH / 2, 215.2, 0.3, DH, 18.6, X.wallpaper, { tile: 3 }); b.box(10.15, U + DH / 2, 215.2, 0.3, DH, 18.6, X.wallpaper, { tile: 3 });
      b.box(0, U + DH / 2, 224.4, 20.6, DH, 0.3, X.wallpaper, { tile: 3 });
      b.box(0, U + DH + 0.15, 215.2, 20.6, 0.3, 18.6, X.darkWood, { collide: false, tile: 2 });
      for (let x = -8; x <= 8; x += 4) b.box(x, U + DH - 0.2, 215.2, 0.3, 0.4, 18, X.darkWood, { collide: false, shadow: false });
      // panelling
      b.box(-9.97, U + 1.2, 215.2, 0.06, 2.4, 18, X.darkWood, { collide: false, tile: 1 }); b.box(9.97, U + 1.2, 215.2, 0.06, 2.4, 18, X.darkWood, { collide: false, tile: 1 });
      b.box(-6, U + 1.2, 206.32, 7.8, 2.4, 0.06, X.darkWood, { collide: false, tile: 1 }); b.box(6, U + 1.2, 206.32, 7.8, 2.4, 0.06, X.darkWood, { collide: false, tile: 1 });
      b.box(0, U + 1.2, 224.22, 19.8, 2.4, 0.06, X.darkWood, { collide: false, tile: 1 });
      for (const sx of [-1, 1]) b.box(sx * 9.9, U + 2.45, 215.2, 0.14, 0.12, 18, X.gold, { collide: false });
      // long banquet table + chairs + candelabras
      const cloth = new THREE.MeshStandardMaterial({ color: 0xe8e0cc, roughness: 0.85 });
      b.box(0, U + 0.76, 215, 1.9, 0.08, 10.4, X.darkWood, { tile: 1 });
      b.box(0, U + 0.81, 215, 1.6, 0.02, 10.2, cloth, { collide: false, shadow: false });
      for (const sx of [-1, 1]) for (const z of [210.3, 219.7]) b.box(sx * 0.8, U + 0.36, z, 0.12, 0.72, 0.12, X.darkWood, { collide: false });
      physics.addMinMax(-0.95, 209.8, 0.95, 220.2, U, U + 0.8, 'prop', true);
      const chairs: [number, number, number, number][] = [];
      for (const z of [211, 213, 215, 217, 219]) { chairs.push([-1.35, U, z, Math.PI / 2 + (z === 215 ? 0.5 : 0)]); chairs.push([1.35, U, z, -Math.PI / 2]); }
      chairs.push([0, U, 221, Math.PI]);
      propInstances(G, physics, 'chair', chairs);
      const wax = new THREE.MeshStandardMaterial({ color: 0xf0e6d0, roughness: 0.6 });
      for (const z of [211.5, 215, 218.5]) {
        b.cyl(0, U + 1.0, z, 0.05, 0.36, X.gold, false, 8);
        for (const dx of [-0.18, 0, 0.18]) b.cyl(dx, U + 1.28, z, 0.022, 0.2, wax, false, 6);
        const fl = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 4), X.glowWarm); fl.position.set(0, U + 1.42, z); fl.scale.y = 1.8; G.add(fl);
        const l = new THREE.PointLight(0xffb060, 3, 5, 1.8); l.position.set(0, U + 1.6, z); G.add(l); H.flicker(l, 3);
      }
      // plates
      const plate = new THREE.MeshStandardMaterial({ color: 0xf4f2ee, roughness: 0.3 });
      for (const z of [211, 213, 215, 217, 219]) for (const sx of [-1, 1]) b.cyl(sx * 0.55, U + 0.83, z, 0.13, 0.015, plate, false, 12);
      // fireplace on the west wall (marble surround, dark firebox, hawk crest)
      b.box(-9.45, U + 0.75, 213.75, 1.1, 1.5, 0.45, X.marble); b.box(-9.45, U + 0.75, 216.25, 1.1, 1.5, 0.45, X.marble);
      b.box(-9.4, U + 1.65, 215, 1.25, 0.3, 3.1, X.marble);
      b.box(-9.75, U + 0.7, 215, 0.3, 1.4, 2.1, X.abyss, { collide: false });
      b.box(-9.3, U + 0.04, 215, 1.4, 0.08, 3.2, X.marble, { collide: false });
      b.box(-9.85, U + 3.5, 215, 0.3, 3.4, 2.6, X.darkWood, { collide: false, tile: 1 });
      physics.addMinMax(-10, 213.5, -8.9, 216.5, U, U + 1.8, 'prop', true);
      for (const dz of [-0.35, 0, 0.35]) { const log = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.9, 7), M.wood); log.rotation.x = Math.PI / 2; log.rotation.y = dz; log.position.set(-9.55 + Math.abs(dz) * 0.3, U + 0.12, 215 + dz); G.add(log); }
      placeAt(G, 'painting_alexia', -9.66, U + 2.3, 215, Math.PI / 2, 1.0);
      // sideboards, candles along walls, chandelier
      placeProp(G, physics, 'cabinet', 9.6, U, 210, -Math.PI / 2); placeProp(G, physics, 'cabinet', 9.6, U, 220, -Math.PI / 2);
      placeAt(G, 'urn', 9.3, U, 223.3, 0, 1, true); placeAt(G, 'urn', -9.3, U, 223.3, 0, 1, true);
      placeAt(G, 'chandelier', 0, U + DH - 3, 215, 0, 1.1);
      const ch = new THREE.PointLight(0xffc27a, 20, 18, 1.6); ch.position.set(0, U + DH - 2.8, 215); ch.castShadow = q.shadows; G.add(ch); H.flicker(ch, 20);
      for (const sx of [-1, 1]) for (const z of [209, 221]) placeAt(G, 'sconce', sx * 9.97, U + 2.6, z, sx < 0 ? Math.PI / 2 : -Math.PI / 2);
      for (const sx of [-1, 1]) { const l = new THREE.PointLight(0xffb060, 5, 8, 1.8); l.position.set(sx * 9.4, U + 3.1, 221); G.add(l); }
      placeAt(G, 'rosette_window', 9.98, U + 3.6, 215, -Math.PI / 2, 1.2);
      const moon = new THREE.SpotLight(0x8aa4d8, 30, 20, 0.5, 0.6, 1.2); moon.position.set(9.6, U + 4, 215); moon.target.position.set(0, U, 213); G.add(moon, moon.target);
      // end-of-demo double door (north wall)
      for (const sx of [-1, 1]) {
        const d = propClone('door_wood'); if (!d) continue;
        d.scale.set(1.2, 3, 1); d.position.set(sx * 1.2, U, 224.2); d.rotation.y = sx < 0 ? 0 : Math.PI; G.add(d);
      }
      for (const sx of [-1, 1]) b.box(sx * 1.35, U + 1.6, 224.15, 0.3, 3.2, 0.3, X.darkWood, { collide: false });
      b.box(0, U + 3.15, 224.15, 3, 0.3, 0.3, X.darkWood, { collide: false });
      b.box(0, U + 3.6, 224.18, 0.7, 0.5, 0.08, X.gold, { collide: false });
      b.flush(G);
      // fireplace fire (lit with Claire's lighter)
      const fireL = new THREE.PointLight(0xff8a30, 0, 10, 1.6); fireL.position.set(-9, U + 0.8, 215); G.add(fireL);
      let fire: FireEmitter | null = null;
      const light = () => {
        if (fire) return;
        fire = new FireEmitter(scene, new THREE.Vector3(-9.5, U + 0.15, 215), 0.45, Math.round(70 * q.particleBudget / 700), false);
        const f = fire; H.onUpdate((dt, t) => { if (!G.visible) return; f.update(dt, t); fireL.intensity = 14 + Math.sin(t * 13) * 2 + Math.sin(t * 31) * 1.5; });
      };
      if (fireLit) light();
      ctx.addInteractable(new ScriptedInteractable('fireplace', new THREE.Vector3(-8.4, U, 215), 1.5,
        () => fireLit ? 'Осмотреть камин' : 'Осмотреть камин',
        (g) => {
          if (fireLit) { g.message('Огонь гудит в камине. Медный герб над ним повёрнут — механизм сработал.', 3); return; }
          if (!g.inventory.has('lighter')) {
            g.message(g.player.character === 'steve' ? 'Камин холодный, дрова сложены. Нужен огонь — зажигалка есть у Клэр. [C] — сменить персонажа.' : 'Камин холодный, дрова сложены. Нечем поджечь.', 4);
            audio.click(); return;
          }
          g.confirm('Поджечь дрова зажигалкой?', () => {
            fireLit = true; g.flags.add('dining:fire'); light(); audio.click(true);
            g.message('Сухие поленья вспыхивают. От жара над камином со скрежетом поворачивается медный герб — где-то в стене щёлкнул замок.', 5);
          });
        }));
      ctx.addInteractable(new ScriptedInteractable('docDining', new THREE.Vector3(1.2, U, 221.6), 1.1, () => 'Прочитать: письмо на столе', (g) => g.readDoc('dining_letter')));
      paper(G, 0.4, U + 0.83, 220, 0.4);
      ctx.addInteractable(new ScriptedInteractable('diningEnd', new THREE.Vector3(0, U, 223.2), 1.6, () => 'Открыть дверь',
        (g) => {
          if (!fireLit) { audio.click(); g.message('Дверь заперта. Замок соединён тягами с чем-то в стене... со стороны камина.', 4); return; }
          audio.click(true); g.message('Замок поддаётся. Дальше — личные покои Эшфордов... (продолжение следует)', 3); setTimeout(() => g.completeLevel(), 1800);
        }));
      H.item('d_herb', 'herb_g', 1, 9.3, U + 1.32, 210, G);
      H.item('d_mag', 'ammo_mag', 6, 9.3, U + 1.32, 220, G);
      ctx.spawnZombie({ id: 'bs_1', x: 5.5, y: U, z: 221.5, yaw: Math.PI, kind: 'bandersnatch' }, G);
      ctx.spawnZombie({ id: 'dn_1', x: -4.5, y: U, z: 212, yaw: 2.4, outfit: 'civilian', fakeDead: true }, G);
    },
  });
  for (const x of [-7.5, -4.5, -2.4, 2.4, 4.5, 7.5]) for (const z of [208, 211.5, 215, 218.5, 222]) N(null, x, z, U);
  for (const z of [208, 222.5]) N(null, 0, z, U);


  return {
    outdoorBounds: [gateOut, bridgeB, plazaB, tyardB, passB, pyardB],
  };
}
