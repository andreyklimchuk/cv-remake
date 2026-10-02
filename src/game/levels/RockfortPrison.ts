import * as THREE from 'three';
import { pbr } from '../../engine/Materials';
import { DustField } from '../../engine/VolumetricFX';
import { LevelBuilder } from '../world/LevelBuilder';
import { ItemPickup, Door, ScriptedInteractable } from '../world/Interactables';
import { makeItemMesh } from '../world/ItemMeshes';
import type { ItemInstance } from '../inventory/Items';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';
import { singleDoor, doorLeaf } from './PrisonAnnex';
import { placeProp } from '../world/Props';
import { ModelLibrary } from '../assets/ModelLibrary';
import type { LevelContext, Level } from './PrisonLevel';

/**
 * ROCKFORT ISLAND — PRISON (iteration 6.14). Two Sketchfab locations by DPLDS (CC-BY 4.0) joined by doors:
 *  • cv_prison.glb ("Resident Evil Code Veronica — Prison") at the origin: guard room + Claire's cell, corridor,
 *    long staircase up to an exit door (y 7.65);
 *  • cv_yard.glb ("Resident Evil Code Veronica 2.0") shifted by OX: walled prison yard with the commandant's
 *    house (playable interior built here from the GLB's own materials), the east cell block (door → prison stairs),
 *    a helipad outside the south gate (intro) and the west gate (end of the demo, needs the keycard).
 * Every collider is hand-placed from the GLB bounding boxes (see docs/AI_CONTEXT.md §6.14).
 */
export const OX = 100;

/** named spots (admin panel teleports, tests, intro) — [x, y, z, yaw] */
export const SPOTS: Record<string, [number, number, number, number, string]> = {
  cell: [4.2, 0, 4.6, -Math.PI / 2, 'Камера Клэр'],
  guard: [-1.6, 0, 2.6, Math.PI / 2, 'Караульная (сохранение)'],
  corridor: [1.3, 0, 14, 0, 'Коридор'],
  stairs: [-21.2, 7.36, 25.5, Math.PI / 2, 'Верх лестницы'],
  yard: [OX + 7.2, 0, -8.6, Math.PI, 'Двор: дверь тюремного блока'],
  yardC: [OX + 0, 0, 2, -Math.PI / 2, 'Центр двора'],
  porch: [OX - 2.3, 0.83, 1.2, -Math.PI / 2, 'Веранда дома'],
  house: [OX - 5, 0.83, 1.2, -Math.PI / 2, 'Дом: прихожая'],
  save: [OX - 10.5, 0.83, 1.2, -Math.PI / 2, 'Дом: комната сохранения'],
  study: [OX - 8, 0.83, 6.5, 0, 'Дом: кабинет (карта)'],
  storage: [OX - 8, 0.83, -4.4, Math.PI, 'Дом: склад (дробовик)'],
  west: [OX - 9.5, 0, -8.4, -Math.PI / 2, 'Западные ворота (выход)'],
  helipad: [OX + 1.3, 0, -20, Math.PI, 'Вертолётная площадка'],
};

export function buildRockfortPrison(ctx: LevelContext): Level {
  const { scene, physics, nav, streamer, quality: q, flags } = ctx;
  const tex = q.textureSize;
  const lightsForUpdate: ((dt: number, t: number) => void)[] = [];
  const steel = new THREE.MeshStandardMaterial({ color: 0x3a3d42, metalness: 0.85, roughness: 0.45 });
  const red = new THREE.MeshStandardMaterial({ color: 0x440000, emissive: 0xff1010, emissiveIntensity: 2 });
  const green = new THREE.MeshStandardMaterial({ color: 0x0a3010, emissive: 0x20ff40, emissiveIntensity: 1.6 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x0c1420, emissive: 0x24324a, emissiveIntensity: 0.6, metalness: 0.2, roughness: 0.1 });

  // ---------------------------------------------------------------- sky + global lighting (as in the old prison level)
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
  sky.position.x = OX;
  scene.add(sky);
  scene.fog = new THREE.FogExp2(0x10141b, q.fogDensity * 0.4);
  scene.background = new THREE.Color(0x07090c);
  const hemi = new THREE.HemisphereLight(0x5a6c8c, 0x1a140e, 1.5); hemi.name = 'hemi'; scene.add(hemi);
  const moon = new THREE.DirectionalLight(0x9ab0d8, 1.5);
  moon.name = 'moon';
  moon.position.set(OX - 30, 50, 20); moon.target.position.set(OX, 0, 0);
  moon.castShadow = q.shadows;
  moon.shadow.mapSize.set(q.shadowMapSize, q.shadowMapSize);
  Object.assign(moon.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 1, far: 140 });
  moon.shadow.bias = -0.0008; moon.shadow.normalBias = 0.03;
  scene.add(moon, moon.target);

  // ---------------------------------------------------------------- helpers
  const item = (id: string, defId: string, qty: number, x: number, y: number, z: number, parent: THREE.Object3D, extra?: Partial<ItemInstance>) => {
    if (flags.has('picked:' + id)) return;
    ctx.addInteractable(new ItemPickup(id, new THREE.Vector3(x, y, z), defId, qty, makeItemMesh(defId), parent, extra));
  };
  /** AABB collider (x1,z1)-(x2,z2), y1..y2 */
  const col = (x1: number, z1: number, x2: number, z2: number, y1 = 0, y2 = 4.2, rays = true, tag = 'wall') => physics.addMinMax(Math.min(x1, x2), Math.min(z1, z2), Math.max(x1, x2), Math.max(z1, z2), y1, y2, tag, rays);
  const lamp = (G: THREE.Object3D, color: number, power: number, dist: number, x: number, y: number, z: number, flicker = 0) => {
    const l = new THREE.PointLight(color, power, dist, 1.7); l.position.set(x, y, z); G.add(l);
    if (flicker) lightsForUpdate.push((_d, t) => {
      const n = Math.sin(t * 13.1 + x) * Math.sin(t * 7.3) * Math.sin(t * 2.1 + z);
      l.intensity = power * (n > 1 - flicker ? 0.12 : 0.94 + Math.sin(t * 50) * 0.03);
    });
    return l;
  };
  /** clone a GLB into world space (offset dx) and return its meshes by node name (GLB names; GLTFLoader strips
   *  '.', ':', '/', '[]' and turns spaces into '_' — the map applies the same rule to lookups) */
  const loadGlb = (key: string, dx: number) => {
    const g = ModelLibrary.get(key);
    const meshes = new NodeMap();
    if (!g) { console.warn('[level] missing', key); return meshes; }
    const root = g.scene.clone(true);
    root.position.x += dx;
    root.updateMatrixWorld(true);
    const list: THREE.Mesh[] = [];
    root.traverse((o) => { if ((o as THREE.Mesh).isMesh) list.push(o as THREE.Mesh); });
    const holder = new THREE.Group(); holder.updateMatrixWorld(true);
    for (const m of list) {
      holder.attach(m);
      m.castShadow = true; m.receiveShadow = true;
      meshes.set(m.name, m);
    }
    return meshes;
  };
  const centerOf = (m: THREE.Object3D) => new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3());
  const matsOf = (meshes: Map<string, THREE.Mesh>) => {
    const out = new Map<string, THREE.MeshStandardMaterial>();
    for (const m of meshes.values()) { const mm = m.material as THREE.MeshStandardMaterial; if (!out.has(mm.name)) out.set(mm.name, mm); }
    return out;
  };
  /** copies of a few GLB meshes (by node-name prefix) moved by (dx,dy,dz) — reuse of the location's own set dressing */
  const copyParts = (meshes: NodeMap, prefixes: string[], dx: number, dy: number, dz: number, G: THREE.Object3D, collide = false) => {
    const box = new THREE.Box3();
    for (const [n, m] of meshes) {
      if (!prefixes.some((p) => n.startsWith(sanitize(p)))) continue;
      const c = m.clone(); c.position.x += dx; c.position.y += dy; c.position.z += dz; c.updateMatrixWorld(true);
      G.add(c); box.expandByObject(c);
    }
    if (collide && !box.isEmpty()) col(box.min.x, box.min.z, box.max.x, box.max.z, box.min.y, box.max.y, true, 'prop');
    return box;
  };
  const emissive = (meshes: Map<string, THREE.Mesh>, matNames: string[], color: number, k: number) => {
    for (const m of meshes.values()) {
      const mm = m.material as THREE.MeshStandardMaterial;
      if (matNames.includes(mm.name) && !mm.userData.lit) { mm.userData.lit = true; mm.emissive = new THREE.Color(color); mm.emissiveIntensity = k; }
    }
  };

  // =====================================================================
  // PRISON (origin) — zones 'p_room' (guard room + cell) and 'p_corr' (corridor + staircase)
  // =====================================================================
  let cellDoorCol: ReturnType<typeof col> | null = null;
  let corrGate: Door | null = null;
  const roomZ = streamer.add({
    id: 'p_room', bounds: new THREE.Box3(new THREE.Vector3(-5.4, -1, -2.7), new THREE.Vector3(5.6, 5, 8.15)), neighbors: ['p_corr'], outdoor: false,
    portalOpen: () => !!corrGate?.open, build: () => {},
  });
  const corrZ = streamer.add({
    id: 'p_corr', bounds: new THREE.Box3(new THREE.Vector3(-22.5, -1, 8.15), new THREE.Vector3(3.2, 12, 27.3)), neighbors: ['p_room'], outdoor: false,
    portalOpen: () => !!corrGate?.open, build: () => {},
  });
  {
    const P = loadGlb('cv_prison', 0);
    const R = roomZ.group, C = corrZ.group;
    for (const m of P.values()) (centerOf(m).z < 8.1 && centerOf(m).x > -5.5 ? R : C).add(m);
    const PM = matsOf(P);
    const concrete = PM.get('Concrete') ?? pbr('concrete', tex);
    emissive(P, ['Emit', 'Circle.004__0'], 0xfff0d0, 3);
    const b = new LevelBuilder(physics);
    // missing ceilings: over the cell (no roof in the GLB) and over the staircase
    b.box(4.18, 4.22, 2.76, 2.4, 0.1, 10.6, concrete, { collide: false, tile: 3 });
    b.box(-15.63, 11.7, 25.48, 13.2, 0.12, 2.1, concrete, { collide: false, tile: 3 });
    b.flush(R);

    // walls — guard room / cell
    col(-5.6, -2.6, -5.16, 8.1); col(-5.6, -2.9, 3.3, -2.48); col(3.0, -2.6, 3.3, 1.0); col(3.0, 0.85, 5.6, 1.0);
    col(5.35, 0.8, 5.7, 8.1); col(-5.6, 8.0, -0.27, 8.35); col(2.84, 8.0, 5.7, 8.35);
    col(2.97, 2.76, 3.09, 8.0, 0, 2.6, false, 'bars'); col(2.97, 0.95, 3.09, 1.3, 0, 2.6, false, 'bars');
    col(-0.25, -2.48, 0, 1.0, 0, 3.3);
    col(0.43, -2.52, 3.0, -1.28, 0, 1.24, true, 'prop'); col(-0.02, -1.73, 0.56, -1.01, 0, 0.96, true, 'prop');
    col(0.61, -0.63, 1.37, 0.12, 0, 1.28, true, 'prop'); col(1.86, -0.61, 2.99, 0.49, 0, 0.54, true, 'prop');
    col(-2.6, 4.46, -0.27, 8.0, 0, 1.1, true, 'prop'); col(-5.16, 7.51, -3.05, 8.0, 0, 2.54, true, 'prop'); col(-5.16, 1.6, -4.95, 2.19, 0, 0.96, true, 'prop');
    // walls — corridor + stairs
    col(-0.6, 8.0, -0.27, 24.0); col(2.84, 8.0, 3.2, 27.3, 0, 12); col(-22.5, 26.98, 3.2, 27.3, 0, 12); col(-9.06, 23.7, -0.27, 24.0);
    col(-22.5, 23.9, -9.06, 24.47, 0, 12); col(-22.5, 26.5, -9.06, 27.3, 0, 12); col(-22.6, 24, -22.21, 27, 0, 12);
    col(-0.27, 8.2, 0.7, 10.56, 0, 1.14, true, 'prop'); col(1.28, 26.34, 2.26, 26.98, 0, 1.1, true, 'prop');
    physics.addFloor({ x1: -21.68, x2: -9.06, z1: 24.47, z2: 26.5, y0: 0, y1: 7.65, axis: '-x', solid: true, tag: 'stairs' });
    physics.addFloor({ x1: -22.21, x2: -21.68, z1: 24.47, z2: 26.5, y0: 7.65, y1: 7.65, axis: null, solid: true, tag: 'stairs' });

    // Claire's cell door (GLB 'Gate.001' is modelled open; hinge at (3.03, 1.29); closed = −90°)
    const gate = P.get('Gate.001_Metal.001_0');
    const cellPivot = new THREE.Group(); cellPivot.position.set(3.03, 0, 1.29); R.add(cellPivot); cellPivot.updateMatrixWorld(true);
    if (gate) cellPivot.attach(gate);
    cellDoorCol = col(2.97, 1.29, 3.09, 2.76, 0, 2.6, false, 'door');
    let k = flags.has('cellOpen') ? 1 : 0;
    const applyCell = () => { cellPivot.rotation.y = -Math.PI / 2 * (1 - k); };
    applyCell();
    lightsForUpdate.push((dt) => {
      const want = flags.has('cellOpen') ? 1 : 0;
      if (k !== want) { k = want > k ? Math.min(1, k + dt * 0.9) : Math.max(0, k - dt * 1.4); applyCell(); }
      const en = k < 0.5;
      if (cellDoorCol && cellDoorCol.enabled !== en) { cellDoorCol.enabled = en; bus.emit('doorsChanged', null); }
    });
    // bunk + lighter
    placeProp(R, physics, 'bed', 4.75, 0, 6.4, 0);
    placeProp(R, physics, 'toilet', 5.0, 0, 1.55, Math.PI);
    item('cell_lighter', 'lighter', 1, 4.75, 0.56, 6.9, R);

    // corridor gate (GLB 'Gate'): a heavy barred leaf hinged at x = −0.27
    const cg = P.get('Gate_Gate_0');
    const cgPivot = new THREE.Group(); cgPivot.position.set(-0.27, 0, 8.12); C.add(cgPivot); cgPivot.updateMatrixWorld(true);
    if (cg) cgPivot.attach(cg);
    corrGate = new Door('corrGate', new THREE.Vector3(1.3, 0, 7.6), cgPivot, col(-0.27, 7.95, 2.84, 8.3, 0, 2.6, false, 'door'), null, '', 0, { sound: 'metal', maxAngle: Math.PI * 0.5 });
    if (flags.has('open:corrGate')) corrGate.openNow();
    ctx.addInteractable(corrGate);

    // guard room: dead guard with the M9F, knife on the crates, typewriter on the desk, item box
    flags.add('dead:p_guardBody');
    ctx.spawnZombie({ id: 'p_guardBody', x: -2.8, z: 2.6, yaw: 2.4, outfit: 'guard' }, R);
    item('p_m9f', 'm9f', 1, -2.1, 0.02, 3.3, R, { mag: 15 });
    item('p_knife', 'knife', 1, 2.4, 0.56, -0.05, R);
    item('p_ammo', 'ammo_hg', 15, -1.0, 1.12, 5.0, R);
    item('p_herb', 'herb_g', 1, -4.6, 0, -1.9, R);
    placeProp(R, physics, 'typewriter', -0.75, 1.1, 6.0, Math.PI / 2, { collide: false });
    placeProp(R, physics, 'chair', 0.25, 0, 6.6, -Math.PI / 2);
    ctx.addInteractable(new ScriptedInteractable('p_typewriter', new THREE.Vector3(-0.1, 0, 6.0), 1.3, () => 'Печатная машинка — сохранить игру', (g) => g.openSaveDialog()));
    placeProp(R, physics, 'itembox', -4.75, 0, 3.8, Math.PI / 2);
    ctx.addInteractable(new ScriptedInteractable('p_itembox', new THREE.Vector3(-4.0, 0, 3.8), 1.3, () => 'Сундук для предметов', (g) => g.openItemBox()));
    ctx.addInteractable(new ScriptedInteractable('p_note', new THREE.Vector3(0.0, 0, 7.4), 1.2, () => 'Прочитать: журнал охраны', (g) => g.readDoc('guard_log')));
    ctx.addInteractable(new ScriptedInteractable('p_board', new THREE.Vector3(-4.5, 0, 6.2), 1.2, () => 'Осмотреть доску с записками', (g) => g.readDoc('yard_memo')));
    // lights
    lamp(R, 0xfff0d8, 26, 11, 1.43, 3.55, -1.25);
    lamp(R, 0xfff0d8, 26, 11, -3.0, 3.55, 4.9);
    lamp(R, 0xc8d6ff, 9, 7, 4.3, 3.6, 4.6, 0.25);
    // alarm beacon over the cell door
    const alarmL = new THREE.SpotLight(0xff1a10, 60, 12, 0.6, 0.5, 1.5); alarmL.position.set(2.6, 3.4, 1.7); R.add(alarmL, alarmL.target);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 6), red); bulb.position.copy(alarmL.position); R.add(bulb);
    lightsForUpdate.push((_d, t) => {
      const on = flags.has('introDone') || flags.has('alarm');
      alarmL.intensity = on ? 60 : 0;
      alarmL.target.position.set(2.6 + Math.cos(t * 3) * 4, 0, 1.7 + Math.sin(t * 3) * 4);
    });
    if (q.volumetrics) { const dust = new DustField(scene, new THREE.Vector3(0, 0, 2.8), new THREE.Vector3(10, 4, 10), 160); R.add(dust.points); lightsForUpdate.push((_d, t) => dust.update(t)); }

    // corridor: items, zombies, lights
    item('c_ammo', 'ammo_hg', 10, 0.2, 1.15, 9.6, C);
    item('c_herbR', 'herb_r', 1, 1.0, 0, 26.4, C);
    lamp(C, 0xfff0d8, 22, 11, 1.43, 2.65, 13.9, 0.2);
    lamp(C, 0xd8e4ff, 14, 10, 1.3, 3.6, 20.5);
    lamp(C, 0xfff0d8, 22, 12, -7.07, 3.2, 25.6);
    lamp(C, 0xc8d6ff, 16, 12, -15.5, 8.5, 25.5, 0.3);
    lamp(C, 0xffd0a0, 12, 8, -21.2, 10.4, 25.5);
    ctx.spawnZombie({ id: 'c_hit1', x: 1.4, z: 17, yaw: Math.PI, outfit: 'hitman' }, C);
    ctx.spawnZombie({ id: 'c_fem1', x: 0.8, z: 22.6, yaw: Math.PI, outfit: 'female', wander: true }, C);
    ctx.spawnZombie({ id: 'c_pris', x: -4.5, z: 25.6, yaw: 1.2, outfit: 'prisoner', fakeDead: true }, C);
    ctx.spawnZombie({ id: 'c_hit2', x: -14, y: 7.65 * (14 - 9.06) / 12.62, z: 25.4, yaw: Math.PI / 2, outfit: 'hitman' }, C);
    // exit door at the top of the stairs → yard (east cell block)
    const pv = new THREE.Group(); pv.position.set(-22.14, 7.65, 25.0); pv.add(doorLeaf(true, 1.0, 2.15, steel)); C.add(pv);
    const fr = new LevelBuilder(physics);
    fr.box(-22.15, 7.65 + 1.11, 24.95, 0.12, 2.22, 0.1, steel, { collide: false }); fr.box(-22.15, 7.65 + 1.11, 26.05, 0.12, 2.22, 0.1, steel, { collide: false });
    fr.box(-22.15, 7.65 + 2.2, 25.5, 0.12, 0.1, 1.2, steel, { collide: false });
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.025, 6, 4), green); led.position.set(-22.08, 7.65 + 1.25, 26.2); C.add(led);
    fr.flush(C);
    ctx.addInteractable(new ScriptedInteractable('door_stairs', new THREE.Vector3(-21.8, 7.65, 25.5), 1.3, () => 'Открыть дверь — тюремный двор',
      (g) => g.travel(new THREE.Vector3(SPOTS.yard[0], 0, SPOTS.yard[2]), SPOTS.yard[3], 'metal')));
  }

  // =====================================================================
  // YARD (OX) — zones 'house' (interior, listed first: zoneAt takes the first match) and 'yard' (outdoor + helipad)
  // =====================================================================
  let houseDoor: Door | null = null;
  const houseZ = streamer.add({
    id: 'house', bounds: new THREE.Box3(new THREE.Vector3(OX - 13.75, -1, -6.98), new THREE.Vector3(OX - 3.31, 6, 9.07)), neighbors: ['yard'], outdoor: false,
    portalOpen: () => !!houseDoor?.open, build: () => {},
  });
  const yardZ = streamer.add({
    id: 'yard', bounds: new THREE.Box3(new THREE.Vector3(OX - 60, -1, -60), new THREE.Vector3(OX + 60, 30, 60)), neighbors: ['house'], outdoor: true,
    portalOpen: () => !!houseDoor?.open, build: () => {},
  });
  let heliGateK = 0;
  {
    const Y = loadGlb('cv_yard', OX);
    const G = yardZ.group, H = houseZ.group;
    Y.get('Cube.001_Concrete_0')?.removeFromParent(); // solid block-out box of the house (the walls are separate meshes)
    Y.delete('Cube.001_Concrete_0');
    for (const m of Y.values()) G.add(m);
    const YM = matsOf(Y);
    emissive(Y, ['Light'], 0xeef4ff, 2.5);
    const ground = pbr('wetGround', tex, 1, { envMapIntensity: 1 });
    const b = new LevelBuilder(physics);
    // the island around the walls + helipad outside the south gate
    const gg = new THREE.PlaneGeometry(220, 220).rotateX(-Math.PI / 2).translate(OX, -0.02, 0).toNonIndexed();
    LevelBuilder.worldUV(gg, 6); b.add(gg, ground, false);
    const padM = PMstd(0x2a2c2e, 0.9);
    b.box(OX + 1.3, 0.01, -24, 16, 0.04, 16, padM, { collide: false, tile: 4 });
    const markM = new THREE.MeshStandardMaterial({ color: 0xd8c040, roughness: 0.7, emissive: 0x302800, emissiveIntensity: 0.3 });
    b.box(OX + 1.3 - 2, 0.035, -24, 0.5, 0.02, 6, markM, { collide: false }); b.box(OX + 1.3 + 2, 0.035, -24, 0.5, 0.02, 6, markM, { collide: false });
    b.box(OX + 1.3, 0.035, -24, 4, 0.02, 0.5, markM, { collide: false });
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; b.box(OX + 1.3 + Math.cos(a) * 7.4, 0.04, -24 + Math.sin(a) * 7.4, 0.3, 0.06, 0.3, red, { collide: false, shadow: false }); }
    // cliff wall far south (keeps the camera from seeing the world edge)
    b.box(OX, 6, -46, 120, 12, 2, pbr('concrete', tex, 1, { color: 0x50555c }), { collide: false, tile: 6 });
    b.flush(G);

    // ---- yard colliders (y 0..7)
    const Wc = (x1: number, z1: number, x2: number, z2: number, y2 = 7.2) => col(OX + x1, z1, OX + x2, z2, 0, y2);
    Wc(-18.09, -10.64, -11.68, -9.64); Wc(-7.29, -10.64, -0.89, -9.64); Wc(3.5, -10.64, 9.91, -9.64); // south wall between the gates
    Wc(9.16, -9.64, 9.66, -6.98); Wc(-18.1, -10.64, -17.09, 13); Wc(-17.09, 12.0, 4.83, 13); // east alcove wall, west, north
    Wc(4.28, -7.23, 15.42, 13, 10); // east cell block (+ pipes)
    Wc(-14.29, -6.71, -14.0, 8.76, 5.8); Wc(-3.31, 8.63, -2.77, 8.76, 5.8); // pipes along the house
    col(OX - 10.27, -9.5, OX - 8.72, -9.25, 0, 1.75, true, 'prop'); // generator box by the west gate
    // fence + gate (Plane.032/037/Cube.030) between the yard and the west passage
    col(OX - 6.85, -9.64, OX - 6.62, -8.97, 0, 3.3, false); col(OX - 6.85, -7.76, OX - 6.62, -7.08, 0, 3.3, false);
    // barricade in the west passage (the only way west is through the gate)
    for (const [x, z, r, p] of [[-16.4, 8.2, 0.2, 'crate'], [-15.4, 8.0, -0.3, 'crate'], [-14.7, 8.3, 0.1, 'barrel'], [-16.0, 8.2, 0.4, 'crate']] as [number, number, number, string][])
      placeProp(G, physics, p, OX + x, p === 'crate' && x === -16.0 ? 0.9 : 0, z, r, { collide: false });
    placeProp(G, physics, 'sandbags', OX - 15.6, 0, 8.9, 0, { collide: false });
    col(OX - 17.09, 7.5, OX - 14.29, 9.2, 0, 2.2, true, 'prop');
    // porch: floor (y 0.83), steps down to the yard, railing
    physics.addFloor({ x1: OX - 3.31, x2: OX - 1.29, z1: -6.73, z2: 3.46, y0: 0.83, y1: 0.83, axis: null, solid: true });
    physics.addFloor({ x1: OX - 3.31, x2: OX - 1.43, z1: 3.46, z2: 4.64, y0: 0.83, y1: 0, axis: 'z', solid: true });
    col(OX - 1.54, -6.73, OX - 1.29, 4.68, 0, 2.0, false, 'prop'); col(OX - 3.31, -6.95, OX - 1.29, -6.73, 0, 2.0, false, 'prop');
    // house shell (outer walls; the GLB's exterior meshes are one-sided)
    const Hs = (x1: number, z1: number, x2: number, z2: number) => col(OX + x1, z1, OX + x2, z2, 0, 6.5);
    Hs(-14.0, -7.23, -13.55, 9.32); Hs(-14.0, -7.23, -3.06, -6.78); Hs(-14.0, 8.87, -3.06, 9.32);
    Hs(-3.56, -7.23, -3.06, 0.51); Hs(-3.56, 1.87, -3.06, 9.32);

    // ---- doors / gates
    // house front door (GLB 'Plane.027_Door'), hinge on its south edge
    const dm = Y.get('Plane.027_Door_0');
    const hp = new THREE.Group(); hp.position.set(OX - 3.42, 0.83, 0.53); G.add(hp); hp.updateMatrixWorld(true);
    if (dm) hp.attach(dm);
    houseDoor = new Door('houseDoor', new THREE.Vector3(OX - 3.0, 0.83, 1.2), hp, col(OX - 3.52, 0.51, OX - 3.3, 1.87, 0.83, 3.68, true, 'door'), null, '', 0, { sound: 'wood' });
    if (flags.has('open:houseDoor')) houseDoor.openNow();
    ctx.addInteractable(houseDoor);
    // fence gate to the west passage — electronic lock (keycard from the commandant's study)
    const leafNames = ['Plane.035_Grid_0', 'Plane.035_Metal.001_0', 'Circle_Silver_0', 'Cube.024_Gold_0'];
    const gp = new THREE.Group(); gp.position.set(OX - 6.74, 0, -7.77); G.add(gp); gp.updateMatrixWorld(true);
    for (const n of leafNames) { const m = Y.get(n); if (m) gp.attach(m); }
    const gateDoor = new Door('fenceGate', new THREE.Vector3(OX - 6.0, 0, -8.37), gp, col(OX - 6.85, -8.97, OX - 6.62, -7.77, 0, 2.6, false, 'door'), 'keycard',
      'Калитка на электронном замке. Нужна карта охраны.', 0, { sound: 'metal' });
    if (flags.has('open:fenceGate')) gateDoor.openNow();
    ctx.addInteractable(gateDoor);
    const reader = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.2, 0.13), steel); reader.position.set(OX - 6.6, 1.35, -7.3); G.add(reader);
    const rled = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 4), red); rled.position.set(OX - 6.56, 1.42, -7.3); G.add(rled);
    lightsForUpdate.push(() => { rled.material = flags.has('unlocked:fenceGate') ? green : red; });
    // south gate to the helipad (GLB 'Plane.024'): slides east during the intro, locked afterwards
    const hg = Y.get('Plane.024_Metal_0');
    const hgCol = col(OX - 0.89, -10.1, OX + 3.5, -9.8, 0, 3.4);
    heliGateK = flags.has('heliGate') ? 1 : 0;
    lightsForUpdate.push((dt) => {
      const want = flags.has('heliGate') ? 1 : 0;
      if (heliGateK !== want) {
        heliGateK = want > heliGateK ? Math.min(1, heliGateK + dt * 0.5) : Math.max(0, heliGateK - dt * 0.5);
        if (hg) hg.position.x = (hg.userData.x0 ??= hg.position.x) + 4.3 * heliGateK;
        hgCol.enabled = heliGateK < 0.6;
      }
    });
    ctx.addInteractable(new ScriptedInteractable('heliGate', new THREE.Vector3(OX + 1.3, 0, -9.2), 1.6, (g) => g.flags.has('heliGate') ? '' : 'Осмотреть ворота',
      (g) => { audio.click(); g.message('Ворота к вертолётной площадке заперты снаружи. Обратно пути нет.'); }));
    // west gate (GLB 'Plane.038') — end of the demo
    ctx.addInteractable(new ScriptedInteractable('westGate', new THREE.Vector3(OX - 9.5, 0, -9.3), 1.7, () => 'Открыть западные ворота',
      (g) => { audio.clank(new THREE.Vector3(OX - 9.5, 1.5, -10), true); g.message('Ворота поддались. Дальше — остров Рокфорт…', 3); setTimeout(() => g.completeLevel(), 1800); }));
    // door into the east cell block → top of the prison stairs
    const yp = new THREE.Group(); yp.position.set(OX + 6.7, 0, -7.29); yp.add(doorLeaf(false, 1.0, 2.15, steel)); G.add(yp);
    const fb = new LevelBuilder(physics);
    fb.box(OX + 6.65, 1.11, -7.3, 0.1, 2.22, 0.14, steel, { collide: false }); fb.box(OX + 7.75, 1.11, -7.3, 0.1, 2.22, 0.14, steel, { collide: false });
    fb.box(OX + 7.2, 2.24, -7.3, 1.2, 0.1, 0.14, steel, { collide: false });
    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 0.02), new THREE.MeshStandardMaterial({ color: 0x8a1a10, roughness: 0.6 })); sign.position.set(OX + 7.2, 2.55, -7.33); G.add(sign);
    fb.flush(G);
    ctx.addInteractable(new ScriptedInteractable('door_block', new THREE.Vector3(OX + 7.2, 0, -7.9), 1.3, () => 'Открыть дверь — тюремный блок',
      (g) => g.travel(new THREE.Vector3(SPOTS.stairs[0], SPOTS.stairs[1], SPOTS.stairs[2]), SPOTS.stairs[3], 'metal')));

    // ---- yard dressing, lights, items, enemies
    for (const [x, z] of [[-3.26, -3.0], [-3.26, 6.25], [-5.9, 9.12], [-11.0, 9.12], [-13.8, 5.9], [-13.8, -3.4], [-11.6, -7.02], [-6.4, -7.02]] as [number, number][]) {
      const dx = x < -13 ? -0.6 : x > -4 ? 0.6 : 0, dz = z > 9 ? 0.6 : z < -7 ? -0.6 : 0;
      lamp(G, 0xe8f0ff, 18, 10, OX + x + dx, 4.1, z + dz, x === -11.6 ? 0.3 : 0);
    }
    lamp(G, 0xffb070, 14, 8, OX + 7.2, 2.9, -7.9);
    const flood = new THREE.SpotLight(0xffe6c0, 260, 40, 0.5, 0.6, 1.3); flood.position.set(OX + 4.0, 6.8, -9.4); flood.target.position.set(OX + 1, 0, -22); G.add(flood, flood.target);
    placeProp(G, physics, 'crate', OX + 2.6, 0, 10.6, 0.2); placeProp(G, physics, 'crate', OX + 3.4, 0, 11.3, -0.3); placeProp(G, physics, 'barrel', OX + 1.5, 0, 11.4, 0);
    placeProp(G, physics, 'barrel', OX + 8.4, 0, -9.1, 0); placeProp(G, physics, 'sandbags', OX - 4.6, 0, -9.3, 0);
    item('y_ammo', 'ammo_hg', 15, OX + 2.0, 0.92, 10.6, G);
    item('y_herb', 'herb_g', 1, OX + 8.4, 0, -8.3, G);
    item('y_herbR', 'herb_r', 1, OX - 16.2, 0, -8.6, G);
    ctx.spawnZombie({ id: 'y_hit1', x: OX - 5, z: 6.2, yaw: 2.6, outfit: 'hitman' }, G);
    ctx.spawnZombie({ id: 'y_fem1', x: OX + 2, z: -3, yaw: 0.6, outfit: 'female', wander: true }, G);
    ctx.spawnZombie({ id: 'y_fem2', x: OX - 10.5, z: 10.6, yaw: Math.PI / 2, outfit: 'female' }, G);
    ctx.spawnZombie({ id: 'y_hit2', x: OX + 3, z: 7.4, yaw: -1, outfit: 'hitman', fakeDead: true }, G);
    ctx.spawnZombie({ id: 'y_guard', x: OX - 1, z: -7.6, yaw: 0.3, outfit: 'guard' }, G);
    ctx.spawnZombie({ id: 'y_dog', x: OX - 15.5, z: -2, yaw: Math.PI, kind: 'cerberus' }, G);
    ctx.spawnZombie({ id: 'y_fem3', x: OX - 13, z: -8.4, yaw: Math.PI / 2, outfit: 'female' }, G);

    // =================================================================== HOUSE INTERIOR (y 0.83 … 4.4)
    const FL = 0.83, CE = 4.4, HY = (FL + CE) / 2, HH = CE - FL;
    const wallM = YM.get('Concrete') ?? pbr('plaster', tex);
    const woodM = YM.get('Wood') ?? pbr('wood', Math.min(tex, 512));
    const brickM = YM.get('Wall_Bricks') ?? pbr('brick', tex);
    const hb = new LevelBuilder(physics);
    physics.addFloor({ x1: OX - 13.55, x2: OX - 3.56, z1: -6.78, z2: 8.87, y0: FL, y1: FL, axis: null, solid: true });
    physics.addFloor({ x1: OX - 3.62, x2: OX - 3.25, z1: 0.45, z2: 1.93, y0: FL, y1: FL, axis: null, solid: true }); // threshold
    hb.box(OX - 8.555, FL - 0.05, 1.045, 10, 0.1, 15.65, woodM, { collide: false, tile: 2 });
    hb.box(OX - 8.555, CE + 0.05, 1.045, 10, 0.1, 15.65, wallM, { collide: false, tile: 3 });
    // inner faces of the outer walls (brick above a concrete dado)
    const face = (cx: number, cz: number, w: number, d: number, gaps: [number, number][] = [], alongZ = false) => {
      // splits the face around door/window gaps given along its length
      const a0 = alongZ ? cz - d / 2 : cx - w / 2, a1 = alongZ ? cz + d / 2 : cx + w / 2;
      let a = a0;
      for (const [g0, g1] of [...gaps, [a1, a1] as [number, number]]) {
        if (g0 > a) {
          const m = (a + g0) / 2, L = g0 - a;
          if (alongZ) { hb.box(cx, FL + 0.7, m, w, 1.4, L, wallM, { collide: false, tile: 2 }); hb.box(cx, FL + 1.4 + (HH - 1.4) / 2, m, w, HH - 1.4, L, brickM, { collide: false, tile: 2.5 }); }
          else { hb.box(m, FL + 0.7, cz, L, 1.4, d, wallM, { collide: false, tile: 2 }); hb.box(m, FL + 1.4 + (HH - 1.4) / 2, cz, L, HH - 1.4, d, brickM, { collide: false, tile: 2.5 }); }
        }
        if (g1 > a && g0 < a1) {
          // lintel over the gap
          const m = (g0 + g1) / 2, L = g1 - g0, top = FL + 2.85;
          if (alongZ) hb.box(cx, (top + CE) / 2, m, w, CE - top, L, brickM, { collide: false, tile: 2.5 });
          else hb.box(m, (top + CE) / 2, cz, L, CE - top, d, brickM, { collide: false, tile: 2.5 });
        }
        a = Math.max(a, g1);
      }
    };
    face(OX - 13.6, 1.045, 0.1, 15.65, [], true);
    face(OX - 3.5, 1.045, 0.1, 15.65, [[0.51, 1.87]], true);
    face(OX - 8.555, -6.83, 10, 0.1);
    face(OX - 8.555, 8.92, 10, 0.1);
    // fake moonlit windows on the inner faces (the GLB windows sit in the outer shell)
    const win = (x: number, y: number, z: number, alongZ: boolean) => {
      hb.box(x, y, z, alongZ ? 0.04 : 1.0, 1.0, alongZ ? 1.0 : 0.04, glass, { collide: false, shadow: false });
      hb.box(x, y, z, alongZ ? 0.06 : 1.08, 0.06, alongZ ? 1.08 : 0.06, woodM, { collide: false });
      hb.box(x, y, z, alongZ ? 0.06 : 0.06, 1.08, alongZ ? 0.06 : 0.06, woodM, { collide: false });
    };
    win(OX - 3.54, 3.01, 4.1, true); win(OX - 3.54, 3.01, -5.09, true); win(OX - 5.61, 3.01, 8.86, false);
    // partitions (with door frames from singleDoor)
    const T2 = 0.16;
    const part = (x1: number, x2: number, z: number) => { hb.box((x1 + x2) / 2, HY, z, x2 - x1, HH, T2, wallM, { tile: 2 }); };
    const partZ = (z1: number, z2: number, x: number) => { hb.box(x, HY, (z1 + z2) / 2, T2, HH, z2 - z1, wallM, { tile: 2 }); };
    part(OX - 13.55, OX - 6.5, -2); part(OX - 4.9, OX - 3.56, -2);
    part(OX - 13.55, OX - 6.5, 4.5); part(OX - 4.9, OX - 3.56, 4.5);
    partZ(-1.92, 0.4, OX - 8.5); partZ(2.0, 4.42, OX - 8.5);
    hb.flush(H);
    const doorWood = YM.get('Door') ?? woodM;
    const d1 = singleDoor(H, physics, { x: OX - 6.5, z: -2, y: FL, alongZ: false, openW: 1.6, openH: HH, thick: T2, leafMat: doorWood, fillMat: wallM });
    const d2 = singleDoor(H, physics, { x: OX - 6.5, z: 4.5, y: FL, alongZ: false, openW: 1.6, openH: HH, thick: T2, leafMat: doorWood, fillMat: wallM });
    const d3 = singleDoor(H, physics, { x: OX - 8.5, z: 0.4, y: FL, alongZ: true, openW: 1.6, openH: HH, thick: T2, leafMat: doorWood, fillMat: wallM });
    for (const [id, d, p] of [['hStorage', d1, [OX - 5.7, FL, -2.6]], ['hStudy', d2, [OX - 5.7, FL, 5.1]], ['hSave', d3, [OX - 7.9, FL, 1.2]]] as [string, typeof d1, number[]][]) {
      const door = new Door(id, new THREE.Vector3(p[0], p[1], p[2]), d.pivot, d.col, null, '', 0, { sound: 'wood' });
      if (flags.has('open:' + id)) door.openNow();
      ctx.addInteractable(door);
    }
    // hall: notice board (copied from the prison GLB), bench, cabinet
    const P2 = loadGlb('cv_prison', 0);
    copyParts(P2, ['Plane.008_', 'Plane.020_'], (OX - 8.42) - (-5.16), FL, 3.0 - 6.2, H);
    ctx.addInteractable(new ScriptedInteractable('h_memo', new THREE.Vector3(OX - 7.8, FL, 3.0), 1.2, () => 'Прочитать: записка коменданта', (g) => g.readDoc('yard_memo')));
    placeProp(H, physics, 'cabinet', OX - 3.85, FL, -1.2, -Math.PI / 2);
    placeProp(H, physics, 'bench', OX - 3.95, FL, 3.2, -Math.PI / 2);
    placeProp(H, physics, 'fluoro', OX - 6, CE - 0.47, 1.2, Math.PI / 2, { collide: false });
    lamp(H, 0xffe2b8, 18, 9, OX - 6, 3.8, 1.2, 0.15);
    ctx.spawnZombie({ id: 'h_fem1', x: OX - 7.2, y: FL, z: -1.0, yaw: Math.PI / 2, outfit: 'female' }, H);
    // save room
    placeProp(H, physics, 'desk', OX - 12.95, FL, 1.2, Math.PI / 2, { scale: [0.8, 1, 0.85] });
    placeProp(H, physics, 'typewriter', OX - 12.95, FL + 0.78, 1.2, Math.PI / 2, { collide: false });
    placeProp(H, physics, 'chair', OX - 12.1, FL, 1.4, -Math.PI / 2);
    placeProp(H, physics, 'itembox', OX - 11.2, FL, -1.5, 0);
    placeProp(H, physics, 'bookshelf', OX - 10.9, FL, 4.2, Math.PI);
    placeProp(H, physics, 'lamp_cage', OX - 12.95, FL + 0.78, 0.55, 0, { collide: false });
    ctx.addInteractable(new ScriptedInteractable('h_typewriter', new THREE.Vector3(OX - 12.1, FL, 0.6), 1.3, () => 'Печатная машинка — сохранить игру', (g) => g.openSaveDialog()));
    ctx.addInteractable(new ScriptedInteractable('h_itembox', new THREE.Vector3(OX - 11.2, FL, -0.8), 1.3, () => 'Сундук для предметов', (g) => g.openItemBox()));
    lamp(H, 0xffc27a, 22, 8, OX - 11, 3.6, 1.2);
    item('h_ammo1', 'ammo_hg', 15, OX - 10.4, FL, 3.7, H);
    item('h_herb1', 'herb_g', 1, OX - 13.1, FL, -1.6, H);
    // storage: cement bags + crates copied from the prison GLB, shotgun
    copyParts(P2, ['Cube.002_Cement', 'Cube.003_Cement', 'Cube.004_Cement', 'Cube.005_Cement', 'Cube.006_Cement', 'Cube.007_Cement', 'Cube.008_Cement', 'Cube.009_Cement', 'Cube.010_Cement', 'Cube.011_Cement', 'Cube.012_Cement'],
      OX - 13.4 - 0.43, FL, -6.7 + 2.52, H, true);
    copyParts(P2, ['Cube.033_'], OX - 11.0 - 0.61, FL, -6.65 + 0.63, H, true);
    copyParts(P2, ['Cube.034_'], OX - 9.6 - 1.86, FL, -6.65 + 0.61, H, true);
    placeProp(H, physics, 'crate', OX - 4.2, FL, -6.2, 0.1); placeProp(H, physics, 'crate', OX - 4.3, FL + 0.9, -6.2, -0.2, { scale: 0.8 });
    placeProp(H, physics, 'barrel', OX - 5.3, FL, -6.3, 0); placeProp(H, physics, 'locker', OX - 13.2, FL, -3.0, Math.PI / 2);
    placeProp(H, physics, 'locker', OX - 13.2, FL, -3.65, Math.PI / 2);
    item('h_m3', 'm3', 1, OX - 4.2, FL + 0.91, -6.1, H, { mag: 5 });
    item('h_sg', 'ammo_sg', 7, OX - 5.3, FL + 0.89, -6.3, H);
    lamp(H, 0xd8e4ff, 14, 9, OX - 8.5, 3.9, -4.4, 0.35);
    ctx.spawnZombie({ id: 'h_hit1', x: OX - 10.5, y: FL, z: -4.2, yaw: 0, outfit: 'hitman' }, H);
    ctx.spawnZombie({ id: 'h_fem2', x: OX - 6.5, y: FL, z: -5.6, yaw: 2.2, outfit: 'female', fakeDead: true }, H);
    // study: closet + binders (prison GLB), desk with the keycard
    copyParts(P2, ['Plane.009_', 'Plane.015_', 'Plane.014_', 'Plane.004_', 'Plane.025_', 'Plane.010_', 'Cube.024_', 'Cube.025_', 'Cube.023_'], (OX - 13.45) - (-5.16), FL, 8.86 - 8.0, H, true);
    placeProp(H, physics, 'desk', OX - 8.0, FL, 7.9, Math.PI);
    placeProp(H, physics, 'chair', OX - 8.0, FL, 7.1, Math.PI);
    placeProp(H, physics, 'bookshelf', OX - 3.8, FL, 7.0, -Math.PI / 2);
    placeProp(H, physics, 'monitor', OX - 8.6, FL + 0.78, 8.05, Math.PI, { collide: false });
    copyParts(P2, ['Cube.035_', 'Cube.021_'], (OX - 7.6) - (-0.7), FL + 0.78 - 1.1, 7.85 - 5.4, H);
    item('h_keycard', 'keycard', 1, OX - 7.5, FL + 0.79, 7.75, H);
    lamp(H, 0xffd8a8, 16, 9, OX - 8.5, 3.8, 6.7, 0.1);
    ctx.spawnZombie({ id: 'h_hit2', x: OX - 11, y: FL, z: 6.6, yaw: Math.PI / 2, outfit: 'hitman' }, H);
    ctx.spawnZombie({ id: 'h_fem3', x: OX - 5.0, y: FL, z: 7.6, yaw: -2, outfit: 'female', wander: true }, H);
  }

  // ---------------------------------------------------------------- navigation
  const N = (x: number, z: number, y = 0) => nav.add(x, z, y);
  const inside = (x: number, z: number, y: number) => physics.colliders.some((c) => c.enabled && c.tag !== 'door' && x > c.min.x - 0.3 && x < c.max.x + 0.3 && z > c.min.z - 0.3 && z < c.max.z + 0.3 && c.max.y > y + 0.3 && c.min.y < y + 1.5);
  const grid = (x1: number, x2: number, z1: number, z2: number, step: number, y = 0) => {
    for (let x = x1; x <= x2 + 1e-6; x += step) for (let z = z1; z <= z2 + 1e-6; z += step) if (!inside(x, z, y)) N(x, z, y);
  };
  grid(-4.4, 2.4, -0.6, 7.2, 1.7); grid(3.7, 4.7, 2, 6.5, 2.2); N(2.4, 1.9); N(3.6, 1.9);
  for (let z = 9; z <= 23; z += 2.8) N(1.3, z); N(1.3, 25.5); N(-2, 25.5); N(-5.5, 25.5); N(-8.6, 25.5);
  { // stairs (manual links: different heights never auto-link)
    let prev = nav.nodes.length - 1;
    for (const x of [-11, -13.5, -16, -18.5, -21.2]) { const i = N(x, 25.5, 7.65 * (-9.06 - x) / 12.62); nav.link(prev, i); prev = i; }
  }
  grid(OX - 16, OX + 3.8, -8.4, 11, 2.6); grid(OX + 5.5, OX + 8.5, -9, -7.8, 1.5);
  grid(OX - 13, OX - 4.1, -6.2, 8.3, 1.75, 0.83);
  { // porch steps link (yard 0 ↔ porch 0.83) and porch → hall
    const a = N(OX - 2.4, 5.2), b2 = N(OX - 2.4, 3.0, 0.83), c = N(OX - 2.3, -2, 0.83), d = N(OX - 2.4, 1.2, 0.83);
    nav.link(a, b2); void c; void d;
  }

  // ---------------------------------------------------------------- outdoor rain boxes (yard minus the house / cell block)
  const B = (x1: number, z1: number, x2: number, z2: number) => new THREE.Box3(new THREE.Vector3(OX + x1, -1, z1), new THREE.Vector3(OX + x2, 30, z2));
  const outdoorBounds = [B(-17.1, -9.64, -14, 12), B(-3.06, -9.64, 4.28, 12), B(-14, -9.64, -3.06, -7.23), B(-14, 9.32, -3.06, 12), B(-40, -45, 40, -10.64)];
  const saveRoom = new THREE.Box3(new THREE.Vector3(OX - 13.55, -1, -1.92), new THREE.Vector3(OX - 8.58, 6, 4.42));

  let wasIndoor: boolean | null = null;
  return {
    name: 'Rockfort Island — Prison',
    spawn: { pos: new THREE.Vector3(SPOTS.cell[0], 0, SPOTS.cell[2]), yaw: SPOTS.cell[3] },
    outdoorBounds,
    saveRoom,
    update: (dt, t, player) => {
      for (const f of lightsForUpdate) f(dt, t);
      const z = streamer.zoneAt(player);
      const indoor = !!z && !z.outdoor;
      if (indoor !== wasIndoor) {
        wasIndoor = indoor;
        // no moonlight indoors (the GLB shells have no roofs over every room); intensity only → constant light count
        moon.intensity = indoor ? 0 : (moon.userData.base ?? 1.5);
        hemi.intensity = indoor ? 0.75 : (hemi.userData.base ?? 1.5);
      }
      const sx = Math.round(player.x / 4) * 4, sz = Math.round(player.z / 4) * 4;
      if (moon.target.position.x !== sx || moon.target.position.z !== sz) {
        moon.target.position.set(sx, 0, sz); moon.position.set(sx - 30, 50, sz);
        moon.target.updateMatrixWorld();
      }
    },
  };
}

const sanitize = (n: string) => n.replace(/\s/g, '_').replace(/[[\].:/]/g, '');
class NodeMap extends Map<string, THREE.Mesh> {
  override get(k: string) { return super.get(sanitize(k)); }
  override delete(k: string) { return super.delete(sanitize(k)); }
}

function PMstd(color: number, roughness: number): THREE.MeshStandardMaterial { return new THREE.MeshStandardMaterial({ color, roughness }); }
