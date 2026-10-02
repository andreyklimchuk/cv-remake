import * as THREE from 'three';
import type { LevelContext } from './PrisonLevel';
import { LevelBuilder } from '../world/LevelBuilder';
import { Door, ScriptedInteractable } from '../world/Interactables';
import { placeProp, propClone, propInstances } from '../world/Props';
import { makeWeaponModel } from '../player/WeaponModels';
import { ModelLibrary } from '../assets/ModelLibrary';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';

/** Shared helpers handed over by PrisonLevel. */
export interface AnnexHelpers {
  M: Record<string, THREE.Material>;
  item(id: string, defId: string, qty: number, x: number, y: number, z: number, parent: THREE.Object3D): void;
  flicker(l: THREE.PointLight | THREE.SpotLight, base: number, mat?: THREE.MeshStandardMaterial, broken?: boolean): void;
  onUpdate(fn: (dt: number, t: number) => void): void;
}

/** Door leaf built from the Blender metal door (unit 1×1 m, hinge at x=0), or a primitive fallback. */
export function doorLeaf(alongZ: boolean, width: number, height: number, fallback: THREE.Material): THREE.Object3D {
  const p = propClone('door_metal');
  if (p) {
    p.scale.set(width, height, 1);
    if (alongZ) p.rotation.y = -Math.PI / 2;
    return p;
  }
  const leaf = new THREE.Mesh(alongZ ? new THREE.BoxGeometry(0.08, height, width) : new THREE.BoxGeometry(width, height, 0.08), fallback);
  leaf.position.set(alongZ ? 0 : width / 2, height / 2, alongZ ? width / 2 : 0);
  leaf.castShadow = true;
  return leaf;
}

/** Real-world single door size (RE-Engine scale: a 1.7 m character reaches ~80 % of the leaf). */
export const DOOR_W = 0.95, DOOR_H = 2.12;
const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a2c2e, metalness: 0.55, roughness: 0.5 });

/**
 * Single hinged door sized like a real door inside a wider wall opening (`x,z` = start corner of the opening on
 * the wall plane, the opening runs +Z when `alongZ`, else +X). The leaf is centred (so nav paths through the
 * opening centre stay valid); the rest of the opening is filled with wall panels + a steel frame (casing).
 */
export function singleDoor(G: THREE.Object3D, physics: LevelContext['physics'], o: {
  x: number; z: number; y?: number; alongZ: boolean; openW: number; openH: number; thick?: number;
  leafMat: THREE.Material; fillMat: THREE.Material;
}): { pivot: THREE.Group; col: ReturnType<LevelContext['physics']['addMinMax']>; center: THREE.Vector3 } {
  const y = o.y ?? 0, W = Math.min(DOOR_W, o.openW), H = Math.min(DOOR_H, o.openH), side = (o.openW - W) / 2, t = o.thick ?? 0.3;
  const at = (a: number, py: number) => (o.alongZ ? new THREE.Vector3(o.x, py, o.z + a) : new THREE.Vector3(o.x + a, py, o.z));
  const block = (a0: number, a1: number, y0: number, y1: number, th: number, mat: THREE.Material, collide: boolean) => {
    const len = a1 - a0, hgt = y1 - y0; if (len < 0.01 || hgt < 0.01) return;
    const m = new THREE.Mesh(o.alongZ ? new THREE.BoxGeometry(th, hgt, len) : new THREE.BoxGeometry(len, hgt, th), mat);
    m.position.copy(at((a0 + a1) / 2, y + (y0 + y1) / 2)); m.castShadow = true; m.receiveShadow = true; G.add(m);
    if (collide) {
      const c = at(a0, 0), d = at(a1, 0);
      if (o.alongZ) physics.addMinMax(o.x - th / 2, c.z, o.x + th / 2, d.z, y + y0, y + y1, 'wall', true);
      else physics.addMinMax(c.x, o.z - th / 2, d.x, o.z + th / 2, y + y0, y + y1, 'wall', true);
    }
  };
  // wall panels beside / above the door
  block(0, side - 0.04, 0, o.openH, t + 0.01, o.fillMat, true);
  block(side + W + 0.04, o.openW, 0, o.openH, t + 0.01, o.fillMat, true);
  block(side - 0.04, side + W + 0.04, H + 0.05, o.openH, t + 0.01, o.fillMat, false);
  // steel casing (jambs + head), slightly proud of the wall
  block(side - 0.06, side, 0, H + 0.06, t + 0.06, frameMat, true);
  block(side + W, side + W + 0.06, 0, H + 0.06, t + 0.06, frameMat, true);
  block(side - 0.06, side + W + 0.06, H, H + 0.07, t + 0.06, frameMat, false);
  const pivot = new THREE.Group(); pivot.position.copy(at(side, y));
  pivot.add(doorLeaf(o.alongZ, W - 0.01, H - 0.01, o.leafMat)); G.add(pivot);
  const a = at(side, 0), b = at(side + W, 0);
  const col = o.alongZ ? physics.addMinMax(o.x - 0.12, a.z, o.x + 0.12, b.z, y, y + H, 'door', true)
    : physics.addMinMax(a.x, o.z - 0.12, b.x, o.z + 0.12, y, y + H, 'door', true);
  return { pivot, col, center: at(side + W / 2, y) };
}

/** Cheap steam jet (additive points) — WebGL/WebGPU safe (no custom shaders). */
class SteamJet {
  points: THREE.Points;
  private p: Float32Array; private v: Float32Array; private life: Float32Array; private col: Float32Array;
  active = true;
  private k = 1;
  constructor(private origin: THREE.Vector3, private dir: THREE.Vector3, private n = 160) {
    this.p = new Float32Array(n * 3); this.v = new Float32Array(n * 3); this.life = new Float32Array(n); this.col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) this.respawn(i, Math.random());
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.p, 3));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d')!; const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,0.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    const m = new THREE.PointsMaterial({ size: 0.9, map: new THREE.CanvasTexture(c), vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
    this.points = new THREE.Points(g, m);
    this.points.frustumCulled = false;
  }
  private respawn(i: number, age = 0): void {
    const s = 2.5 + Math.random() * 2;
    this.p[i * 3] = this.origin.x; this.p[i * 3 + 1] = this.origin.y; this.p[i * 3 + 2] = this.origin.z;
    this.v[i * 3] = this.dir.x * s + (Math.random() - 0.5) * 0.9;
    this.v[i * 3 + 1] = this.dir.y * s + (Math.random() - 0.5) * 0.9;
    this.v[i * 3 + 2] = this.dir.z * s + (Math.random() - 0.5) * 0.9;
    this.life[i] = age;
  }
  stop(): void { this.active = false; }
  update(dt: number): void {
    this.k = THREE.MathUtils.damp(this.k, this.active ? 1 : 0, 1.5, dt);
    for (let i = 0; i < this.n; i++) {
      this.life[i] += dt * 0.9;
      if (this.life[i] >= 1) { if (this.active) this.respawn(i); else { this.life[i] = 1; } }
      const L = this.life[i];
      this.v[i * 3] *= 1 - 1.8 * dt; this.v[i * 3 + 2] *= 1 - 1.8 * dt; this.v[i * 3 + 1] = this.v[i * 3 + 1] * (1 - 1.8 * dt) + 0.6 * dt;
      this.p[i * 3] += this.v[i * 3] * dt; this.p[i * 3 + 1] += this.v[i * 3 + 1] * dt; this.p[i * 3 + 2] += this.v[i * 3 + 2] * dt;
      const b = Math.sin(Math.min(1, L) * Math.PI) * 0.16 * this.k;
      this.col[i * 3] = this.col[i * 3 + 1] = b; this.col[i * 3 + 2] = b * 1.05;
    }
    (this.points.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.points.geometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    (this.points.material as THREE.PointsMaterial).size = 0.6 + 0.6 * this.k;
  }
}

/**
 * ADMINISTRATION WING (east of the guard house) and TROPHY GALLERY (east of cell block B).
 * Puzzles:
 *  1. Steam valve — Valve Handle (west yard) on the corridor valve → steam stops.
 *  2. Warden's safe — 4-digit dial, code 0419 from the prisoner's note (cell block) → Music Box Plate.
 *  3. Music box — plate into the music box → melody → the warden's portrait rises → Hawk Emblem.
 *  4. Song of three beasts (optional) — press paintings Snake → Wolf → Eagle → display case → Grenade Launcher.
 */
export function buildAnnex(ctx: LevelContext, H: AnnexHelpers) {
  const { physics, streamer, flags, quality: q } = ctx;
  const M = H.M as Record<string, THREE.MeshStandardMaterial>;
  const doors: { admin: Door | null; archive: Door | null; office: Door | null; gallery: Door | null } = { admin: null, archive: null, office: null, gallery: null };
  const adminBounds = new THREE.Box3(new THREE.Vector3(32.3, -1, 2), new THREE.Vector3(50.3, 4, 20.3));
  const galleryBounds = new THREE.Box3(new THREE.Vector3(44.3, -1, 27.7), new THREE.Vector3(56.3, 5.5, 44.3));

  // ===================================================================== ADMINISTRATION WING
  streamer.add({
    id: 'admin', bounds: adminBounds, neighbors: ['guard'], outdoor: false,
    portalOpen: () => !!doors.admin?.open,
    build: (G) => {
      const b = new LevelBuilder(physics);
      // floors: corridor tiles / archive concrete / office parquet
      b.box(41.15, -0.05, 4.6, 17.7, 0.1, 5.2, M.tiles, { collide: false, tile: 2, shadow: false });
      b.box(35.15, -0.05, 13.6, 5.7, 0.1, 12.8, M.concrete, { collide: false, tile: 3, shadow: false });
      b.box(44.2, -0.05, 13.6, 12, 0.1, 12.8, M.wood, { collide: false, tile: 2, shadow: false });
      b.box(41.15, 3.7, 11, 17.7, 0.2, 18.4, M.plaster, { collide: true, tile: 3 });
      // outer walls
      b.box(41.15, 1.8, 1.85, 17.7, 3.6, 0.3, M.brick, { tile: 2 });
      b.box(50.15, 1.8, 11, 0.3, 3.6, 18.6, M.plaster);
      b.box(41.15, 1.8, 20.15, 17.7, 3.6, 0.3, M.plaster);
      // corridor north wall with archive (x 33.6–35.6) and office (x 44–46) doorways
      b.box(32.95, 1.8, 7.15, 1.3, 3.6, 0.3, M.plaster);
      b.box(39.8, 1.8, 7.15, 8.4, 3.6, 0.3, M.plaster);
      b.box(48, 1.8, 7.15, 4, 3.6, 0.3, M.plaster);
      b.box(34.6, 3.05, 7.15, 2, 1.1, 0.3, M.plaster);
      b.box(45, 3.05, 7.15, 2, 1.1, 0.3, M.plaster);
      // archive / office partition (the warden's portrait hangs on its east face)
      b.box(38.15, 1.8, 13.65, 0.3, 3.6, 12.7, M.plaster);
      // wainscot panels in the office
      b.box(49.97, 0.5, 13.6, 0.06, 1, 12.6, M.wood, { collide: false, tile: 1 });
      b.box(44.2, 0.5, 19.97, 11.6, 1, 0.06, M.wood, { collide: false, tile: 1 });
      b.box(38.33, 0.5, 13.65, 0.06, 1, 12.6, M.wood, { collide: false, tile: 1 });
      b.flush(G);
      const rug = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 3), new THREE.MeshStandardMaterial({ color: 0x4a0f10, roughness: 1 }));
      rug.rotation.x = -Math.PI / 2; rug.position.set(44.2, 0.012, 13.2); rug.receiveShadow = true; G.add(rug);

      // --- corridor: pipes, valve, steam
      for (const x of [34.5, 38.5, 42.5, 46.5]) placeProp(G, physics, 'pipe', x, 2.85, 2.15, 0, { collide: false, shadow: false });
      placeProp(G, physics, 'valve_pipe', 37.4, 0, 2.08, 0, { collide: false });
      placeProp(G, physics, 'bench', 47.5, 0, 2.4, 0);
      placeProp(G, physics, 'barrel', 49.4, 0, 6.4, 0.7);
      const handle = ModelLibrary.get('item_valve_handle')?.scene.clone(true) ?? new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.01, 6, 20), M.rust);
      handle.rotation.x = Math.PI / 2; handle.position.set(37.4, 1.2, 2.3);
      const handlePivot = new THREE.Group(); handlePivot.add(handle);
      handle.position.set(0, 0, 0); handlePivot.position.set(37.4, 1.2, 2.3);
      G.add(handlePivot);
      handlePivot.visible = flags.has('valveFitted');
      const steamOn = !flags.has('steamOff');
      const steamCol = physics.addMinMax(40.2, 2, 41.8, 7, 0, 3, 'steam', false);
      steamCol.enabled = steamOn;
      const jets = [new SteamJet(new THREE.Vector3(41, 2.8, 2.3), new THREE.Vector3(0.1, -0.6, 1).normalize(), Math.round(90 + 90 * q.particleBudget / 700)),
        new SteamJet(new THREE.Vector3(40.6, 2.9, 2.25), new THREE.Vector3(-0.2, -0.9, 0.5).normalize(), 70)];
      for (const j of jets) { G.add(j.points); if (!steamOn) { j.stop(); } }
      const hiss = steamOn ? audio.fireLoop(new THREE.Vector3(41, 2.5, 3)) : null;
      const steamLight = new THREE.PointLight(0x9fb8d0, steamOn ? 6 : 0, 6, 2); steamLight.position.set(41, 1.8, 4); G.add(steamLight);
      let turnT = -1;
      H.onUpdate((dt) => {
        for (const j of jets) j.update(dt);
        if (turnT >= 0) { turnT += dt; handlePivot.rotation.z = -turnT * 4; if (turnT > 1.6) turnT = -1; }
        steamLight.intensity = THREE.MathUtils.damp(steamLight.intensity, flags.has('steamOff') ? 0 : 6, 2, dt);
      });
      ctx.addInteractable(new ScriptedInteractable('valve', new THREE.Vector3(37.4, 0, 3.1), 1.5,
        (g) => g.flags.has('steamOff') ? '' : g.inventory.has('valve_handle') ? 'Использовать: Valve Handle' : 'Осмотреть вентиль',
        (g, self) => {
          if (g.flags.has('steamOff')) return;
          if (!g.inventory.has('valve_handle')) { g.message('Запорный вентиль паровой магистрали. Маховик снят — остался только квадратный шток.'); audio.click(); return; }
          const it = g.inventory.firstOf('valve_handle'); if (it) g.inventory.remove(it.uid);
          g.flags.add('valveFitted'); g.flags.add('steamOff'); handlePivot.visible = true; turnT = 0;
          audio.click(true);
          setTimeout(() => { for (const j of jets) j.stop(); steamCol.enabled = false; hiss?.stop(); bus.emit('doorsChanged', null); }, 1200);
          self.enabled = false;
          g.message('Клэр насадила маховик и закрутила вентиль. Шипение стихает — путь по коридору свободен.', 5);
        }));
      ctx.addInteractable(new ScriptedInteractable('steamLook', new THREE.Vector3(39.4, 0, 4.6), 1.3,
        (g) => g.flags.has('steamOff') ? '' : 'Осмотреть пар',
        (g) => g.message('Из лопнувшей трубы бьёт раскалённый пар. Не пройти — нужно перекрыть подачу.')));
      // maintenance memo pinned by the valve
      const memo = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.28), new THREE.MeshStandardMaterial({ color: 0xd8cfb0, roughness: 0.9 }));
      memo.position.set(36.6, 1.45, 2.01); G.add(memo);
      ctx.addInteractable(new ScriptedInteractable('memoMaint', new THREE.Vector3(36.6, 0, 2.9), 1.1, () => 'Прочитать: памятка техника', (g) => g.readDoc('maintenance')));

      // corridor lights
      for (const [x, broken] of [[35, false], [43.5, true], [48.5, false]] as [number, boolean][]) {
        const mat = M.tubeOn.clone();
        placeProp(G, physics, 'fluoro', x, 3.55, 4.6, 0, { collide: false, shadow: false });
        const l = new THREE.PointLight(0xdce6ff, 18, 9, 1.7); l.position.set(x, 3.2, 4.6); G.add(l);
        H.flicker(l, 18, mat, broken);
      }
      // doors
      const mk = (id: string, px: number, pz: number, alongZ: boolean, openAngle: number, req: string | null = null, text = '') => {
        const { pivot, col } = singleDoor(G, physics, { x: px, z: pz, alongZ, openW: 2, openH: 2.5, leafMat: M.steel, fillMat: M.plaster });
        const d = new Door(id, new THREE.Vector3(alongZ ? px - 0.8 : px + 1, 0, alongZ ? pz + 1 : pz - 0.8), pivot, col, req, text, openAngle);
        if (flags.has('open:' + id)) d.openNow();
        ctx.addInteractable(d);
        return d;
      };
      doors.archive = mk('archiveDoor', 33.6, 7.15, false, -Math.PI * 0.55);
      doors.office = mk('officeDoor', 44, 7.15, false, -Math.PI * 0.55);
      // interactive points on the corridor side of the doors are at z≈6.3 (see Door pos)
      doors.archive.pos.set(34.6, 0, 6.3); doors.office.pos.set(45, 0, 6.3);

      // --- archive (x 32.3–38, z 7.3–20)
      propInstances(G, physics, 'cabinet', [[32.7, 0, 9.5, Math.PI / 2], [32.7, 0, 10.05, Math.PI / 2], [32.7, 0, 12.5, Math.PI / 2], [32.7, 0, 13.05, Math.PI / 2], [37.6, 0, 16.5, -Math.PI / 2], [37.6, 0, 17.05, -Math.PI / 2]]);
      placeProp(G, physics, 'bookshelf', 35, 0, 19.75, Math.PI);
      placeProp(G, physics, 'desk', 35.6, 0, 12.2, Math.PI / 2, { scale: [0.75, 1, 1] });
      placeProp(G, physics, 'chair', 36.3, 0, 11.6, -Math.PI / 2 - 0.4);
      placeProp(G, physics, 'crate', 33, 0, 18.6, 0.2);
      placeProp(G, physics, 'crate', 33.4, 0.9, 18.5, 0.9, { scale: 0.8 });
      placeProp(G, physics, 'monitor', 35.5, 0.78, 12.5, Math.PI / 2 + 0.2, { collide: false });
      const aLamp = new THREE.PointLight(0xffd29a, 16, 9, 1.8); aLamp.position.set(35.2, 3.2, 13); G.add(aLamp);
      placeProp(G, physics, 'lamp_cage', 35.2, 3.6, 13, 0, { collide: false, shadow: false, scale: [1, -1, 1] });
      H.flicker(aLamp, 16);
      const memoU = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.28), new THREE.MeshStandardMaterial({ color: 0xe0dccb, roughness: 0.9 }));
      memoU.rotation.x = -Math.PI / 2; memoU.rotation.z = 0.3; memoU.position.set(35.4, 0.785, 11.8); G.add(memoU);
      ctx.addInteractable(new ScriptedInteractable('memoUmb', new THREE.Vector3(36.3, 0, 11.8), 1.2, () => 'Прочитать: служебная записка', (g) => g.readDoc('umbrella_memo')));
      H.item('a_gpa', 'gp_a', 1, 36.6, 0, 18.8, G);
      H.item('a_ammo', 'ammo_hg', 12, 35.3, 0.785, 12.9, G);
      H.item('a_herb', 'herb_g', 1, 33.1, 0, 15.8, G);
      ctx.spawnZombie({ id: 'arch_1', x: 34.8, z: 15.5, yaw: Math.PI, outfit: 'prisoner' }, G);

      // --- warden's office (x 38.3–50, z 7.3–20)
      placeProp(G, physics, 'desk', 44.2, 0, 16.2, Math.PI);
      placeProp(G, physics, 'chair', 44.2, 0, 17.3, Math.PI + 0.2);
      placeProp(G, physics, 'typewriter', 43.4, 0.78, 16.2, Math.PI - 0.15, { collide: false });
      placeProp(G, physics, 'bookshelf', 49.75, 0, 10.4, -Math.PI / 2);
      placeProp(G, physics, 'bookshelf', 49.75, 0, 12.2, -Math.PI / 2);
      placeProp(G, physics, 'cabinet', 38.75, 0, 18.9, Math.PI / 2);
      placeProp(G, physics, 'chair', 40.2, 0, 9.2, 2.2);
      placeProp(G, physics, 'painting_eagle', 44.2, 1.0, 19.98, Math.PI, { collide: false, scale: 0.8 });
      const oLamp = new THREE.PointLight(0xffc98a, 22, 11, 1.7); oLamp.position.set(44.2, 3.2, 13.5); oLamp.castShadow = q.shadowedLights >= 4; G.add(oLamp);
      placeProp(G, physics, 'lamp_cage', 44.2, 3.6, 13.5, 0, { collide: false, shadow: false, scale: [1.3, -1.3, 1.3] });
      const deskLamp = new THREE.PointLight(0xffb060, 5, 3, 2); deskLamp.position.set(45.2, 1.2, 16.1); G.add(deskLamp);
      H.flicker(oLamp, 22);
      // letter on the desk
      const letter = new THREE.Mesh(new THREE.PlaneGeometry(0.21, 0.28), new THREE.MeshStandardMaterial({ color: 0xe6dcc0, roughness: 0.9 }));
      letter.rotation.x = -Math.PI / 2; letter.rotation.z = -0.4; letter.position.set(44.9, 0.785, 16.0); G.add(letter);
      ctx.addInteractable(new ScriptedInteractable('letterWarden', new THREE.Vector3(44.9, 0, 15.2), 1.2, () => 'Прочитать: письмо начальнику', (g) => g.readDoc('warden_letter')));
      H.item('o_python', 'ammo_mag', 6, 43.6, 0.785, 15.9, G);
      ctx.spawnZombie({ id: 'office_1', x: 41.5, z: 12.5, yaw: 0.8, outfit: 'guard' }, G);
      ctx.spawnZombie({ id: 'office_2', x: 47.8, z: 9.2, yaw: -2.2, outfit: 'guard', fakeDead: true }, G);

      // PUZZLE 2 — the safe (code 0419)
      placeProp(G, physics, 'safe', 49.4, 0, 17.8, -Math.PI / 2);
      const safePivot = new THREE.Group(); safePivot.position.set(49.4 - 0.31, 0.06 + 0.4, 17.8 + 0.31);
      const sd = propClone('safe_door');
      if (sd) { sd.rotation.y = -Math.PI / 2; safePivot.add(sd); }
      G.add(safePivot);
      let safeT = flags.has('safeOpen') ? 1 : 0;
      const safeItems = () => {
        H.item('s_plate', 'musicbox', 1, 49.35, 0.52, 17.8, G);
        H.item('s_gpc', 'gp_c', 1, 49.35, 0.1, 17.7, G);
      };
      if (safeT) safeItems();
      H.onUpdate((dt) => { if (flags.has('safeOpen')) safeT = Math.min(1, safeT + dt * 0.8); safePivot.rotation.y = safeT * 1.9; });
      ctx.addInteractable(new ScriptedInteractable('safe', new THREE.Vector3(48.4, 0, 17.8), 1.4,
        (g) => g.flags.has('safeOpen') ? '' : 'Осмотреть сейф',
        (g, self) => {
          if (g.flags.has('safeOpen')) return;
          g.codeLock('СЕЙФ НАЧАЛЬНИКА', 4, (c) => c === '0419', () => {
            g.flags.add('safeOpen'); self.enabled = false; safeItems(); audio.click(true);
            g.message('Тяжёлая дверца сейфа отворилась.');
          });
        }));

      // PUZZLE 3 — music box → portrait rises → Hawk Emblem
      placeProp(G, physics, 'musicbox', 38.75, 1.32, 18.9, Math.PI / 2, { collide: false });
      const lidPivot = new THREE.Group(); lidPivot.position.set(38.75 - 0.12, 1.32 + 0.12, 18.9);
      const lid = propClone('musicbox_lid');
      if (lid) { lid.rotation.y = Math.PI / 2; lidPivot.add(lid); }
      G.add(lidPivot);
      const portrait = placeProp(G, physics, 'painting_warden', 38.32, 0.85, 13.6, Math.PI / 2, { collide: false });
      const niche = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.9, 0.8), new THREE.MeshStandardMaterial({ color: 0x0c0a08, roughness: 1 }));
      niche.position.set(38.31, 1.55, 13.6); G.add(niche);
      const ledge = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.5), M.wood); ledge.position.set(38.42, 1.12, 13.6); G.add(ledge);
      const nicheLight = new THREE.PointLight(0xffc080, 0, 2.5, 2); nicheLight.position.set(38.8, 1.5, 13.6); G.add(nicheLight);
      let played = flags.has('musicPlayed') ? 10 : -1;
      ledge.visible = played >= 0;
      const emblemOut = () => H.item('o_emblem', 'emblem', 1, 38.45, 1.14, 13.6, G);
      if (played >= 0) emblemOut();
      H.onUpdate((dt) => {
        if (played < 0) return;
        played += dt;
        lidPivot.rotation.z = Math.min(1, played * 1.2) * 1.4;
        const k = THREE.MathUtils.clamp((played - 4.5) / 2.5, 0, 1);
        if (portrait) portrait.position.y = 0.85 + k * 1.2;
        nicheLight.intensity = k * 5;
        ledge.visible = k > 0.6;
        if (played > 7 && !flags.has('emblemShown')) { flags.add('emblemShown'); emblemOut(); bus.emit('message', { text: 'Портрет поднялся — за ним тайник с эмблемой.', duration: 4 }); }
      });
      if (played >= 0) flags.add('emblemShown');
      ctx.addInteractable(new ScriptedInteractable('musicBox', new THREE.Vector3(39.6, 0, 18.9), 1.3,
        (g) => g.flags.has('musicPlayed') ? '' : g.inventory.has('musicbox') ? 'Использовать: Music Box Plate' : 'Осмотреть шкатулку',
        (g, self) => {
          if (g.flags.has('musicPlayed')) return;
          if (!g.inventory.has('musicbox')) { g.message('Старинная музыкальная шкатулка. Внутри пустое гнездо для пластинки.'); return; }
          const it = g.inventory.firstOf('musicbox'); if (it) g.inventory.remove(it.uid);
          g.flags.add('musicPlayed'); self.enabled = false; played = 0;
          audio.melody();
          g.message('Клэр вставила пластинку. Шкатулка заиграла печальную мелодию…', 4);
        }));
    },
  });

  // ===================================================================== TROPHY GALLERY
  streamer.add({
    id: 'gallery', bounds: galleryBounds, neighbors: ['cells'], outdoor: false,
    portalOpen: () => !!doors.gallery?.open,
    build: (G) => {
      const b = new LevelBuilder(physics);
      const marble = M.tiles;
      b.box(50.2, -0.05, 36, 11.8, 0.1, 16.3, marble, { collide: false, tile: 1.5, shadow: false });
      b.box(50.2, 4.6, 36, 11.8, 0.2, 16.6, M.plaster, { tile: 3 });
      b.box(50.2, 2.3, 27.85, 11.8, 4.6, 0.3, M.plaster);
      b.box(50.2, 2.3, 44.15, 11.8, 4.6, 0.3, M.plaster);
      b.box(56.15, 2.3, 36, 0.3, 4.6, 16.6, M.plaster);
      b.box(44.15, 4.3, 36, 0.3, 0.6, 16.6, M.plaster);   // above the cell-block wall height
      // dark wood wainscot + red wall fabric
      const fabric = new THREE.MeshStandardMaterial({ color: 0x3a0d0f, roughness: 0.95 });
      b.box(55.97, 2.6, 36, 0.06, 3.4, 16, fabric, { collide: false });
      b.box(50.2, 2.6, 28.03, 11.6, 3.4, 0.06, fabric, { collide: false });
      b.box(50.2, 2.6, 43.97, 11.6, 3.4, 0.06, fabric, { collide: false });
      b.box(55.95, 0.45, 36, 0.1, 0.9, 16, M.wood, { collide: false, tile: 1 });
      b.box(50.2, 0.45, 28.05, 11.6, 0.9, 0.1, M.wood, { collide: false, tile: 1 });
      b.box(50.2, 0.45, 43.95, 11.6, 0.9, 0.1, M.wood, { collide: false, tile: 1 });
      // display case base
      b.box(50, 0.4, 36, 1.8, 0.8, 1, M.wood, { tile: 1 });
      b.flush(G);
      const carpet = new THREE.Mesh(new THREE.PlaneGeometry(9, 2.2), new THREE.MeshStandardMaterial({ color: 0x5a1012, roughness: 1 }));
      carpet.rotation.x = -Math.PI / 2; carpet.position.set(50, 0.012, 34); carpet.receiveShadow = true; G.add(carpet);

      // paintings (east wall), spot-lit
      const P: [string, string, number][] = [['eagle', 'Орёл', 32], ['wolf', 'Волк', 36], ['snake', 'Змея', 40]];
      const frames: Record<string, THREE.Object3D | null> = {};
      for (const [id, , z] of P) {
        frames[id] = placeProp(G, physics, 'painting_' + id, 55.85, 1.0, z, -Math.PI / 2, { collide: false });
        // back of the frame flush with the wall fabric (face at x = 55.94), never sunk into it
        const fr = frames[id]; if (fr) { fr.updateMatrixWorld(true); fr.position.x += 55.935 - new THREE.Box3().setFromObject(fr).max.x; }
        const s = new THREE.SpotLight(0xffd8a8, 40, 7, 0.45, 0.6, 1.6); s.position.set(53.5, 4.2, z); s.target.position.set(55.9, 1.6, z); G.add(s, s.target);
      }
      const chand = new THREE.PointLight(0xffc98a, 20, 14, 1.6); chand.position.set(50, 4, 36); chand.castShadow = q.shadowedLights >= 4; G.add(chand);
      placeProp(G, physics, 'lamp_cage', 50, 4.5, 36, 0, { collide: false, shadow: false, scale: [1.5, -1.5, 1.5] });
      H.flicker(chand, 20);
      // pedestals with busts-like urns, benches
      for (const [x, z] of [[46, 30.2], [46, 41.8], [54, 30.2], [54, 41.8]]) {
        placeProp(G, physics, 'pedestal', x, 0, z, 0);
        const urn = new THREE.Mesh(new THREE.LatheGeometry([new THREE.Vector2(0.05, 0), new THREE.Vector2(0.16, 0.05), new THREE.Vector2(0.2, 0.2), new THREE.Vector2(0.1, 0.38), new THREE.Vector2(0.13, 0.45)], 16), M.bronze);
        urn.position.set(x, 1.0, z); urn.castShadow = true; G.add(urn);
      }
      placeProp(G, physics, 'bench', 50, 0, 40.6, 0);
      // poem plaque on a lectern
      placeProp(G, physics, 'pedestal', 47.2, 0, 34, 0, { scale: [0.8, 1.05, 0.8] });
      const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.3), M.bronze); plaque.position.set(47.2, 1.07, 34); plaque.rotation.z = 0.35; G.add(plaque);
      ctx.addInteractable(new ScriptedInteractable('poem', new THREE.Vector3(46.3, 0, 34), 1.3, () => 'Прочитать: бронзовая табличка', (g) => g.readDoc('three_beasts')));

      // display case: glass lid + grenade launcher visual
      const glass = new THREE.MeshStandardMaterial({ color: 0xaaccdd, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.22, depthWrite: false });
      const lidG = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 0.9), glass); lidG.position.set(50, 1.05, 36); G.add(lidG);
      const velvet = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.02, 0.8), new THREE.MeshStandardMaterial({ color: 0x2a0608, roughness: 1 })); velvet.position.set(50, 0.81, 36); G.add(velvet);
      const glVis = makeWeaponModel('gl'); glVis.rotation.set(0, Math.PI / 2, Math.PI / 2); glVis.position.set(50, 0.86, 36); G.add(glVis);
      const caseLight = new THREE.PointLight(0xfff0d0, 3, 2.5, 2); caseLight.position.set(50, 1.6, 36); G.add(caseLight);
      let lidT = flags.has('galleryDone') ? 1 : 0;
      const reward = () => { glVis.visible = false; H.item('gal_gl', 'gl', 1, 50, 0.83, 36, G); H.item('gal_gren', 'gren_exp', 4, 50.6, 0.83, 36.2, G); };
      if (lidT) reward();
      H.onUpdate((dt) => { if (flags.has('galleryDone')) lidT = Math.min(1, lidT + dt * 0.7); lidG.position.y = 1.05 + lidT * 0.9; });
      ctx.addInteractable(new ScriptedInteractable('case', new THREE.Vector3(50, 0, 34.9), 1.2,
        (g) => g.flags.has('galleryDone') ? '' : 'Осмотреть витрину',
        (g) => g.message('Под стеклом — гранатомёт из коллекции Эшфордов. Витрина заперта хитрым механизмом.')));

      // PUZZLE 4 — press the paintings in the order of the poem
      const ORDER = ['snake', 'wolf', 'eagle'];
      let seq: string[] = [];
      const push: Record<string, number> = {};
      H.onUpdate((dt) => {
        for (const id of Object.keys(push)) {
          push[id] = Math.max(0, push[id] - dt * 2);
          const f = frames[id]; if (f) f.position.x = 55.85 + Math.sin(push[id] * Math.PI) * 0.03;
        }
      });
      for (const [id, ru, z] of P) {
        ctx.addInteractable(new ScriptedInteractable('paint_' + id, new THREE.Vector3(55, 0, z), 1.3,
          (g) => g.flags.has('galleryDone') ? `Картина «${ru}»` : `Нажать на картину «${ru}»`,
          (g) => {
            if (g.flags.has('galleryDone')) { g.message(`Картина «${ru}». Рама больше не поддаётся.`); return; }
            push[id] = 1; audio.click(true);
            seq.push(id);
            const ok = ORDER.slice(0, seq.length).every((v, i) => v === seq[i]);
            if (!ok) { seq = []; setTimeout(() => { audio.click(); g.message('Рамы со скрипом вернулись на место. Порядок неверный.'); }, 350); return; }
            if (seq.length === ORDER.length) {
              g.flags.add('galleryDone');
              setTimeout(() => { audio.explosion(new THREE.Vector3(50, 1, 36)); bus.emit('cameraShake', { strength: 0.06, duration: 0.6 }); reward(); g.message('Где-то щёлкнул механизм — стеклянная крышка витрины поднимается.', 4); }, 500);
            } else g.message(`Картина «${ru}» с щелчком ушла в стену…`, 2);
          }));
      }
      H.item('gal_bolts', 'ammo_bolt', 12, 54.3, 0, 43.2, G);
      H.item('gal_herb', 'herb_g', 1, 45.2, 0, 43.2, G);
      H.item('gal_gpb', 'gp_b', 1, 55.2, 0, 28.8, G);
      ctx.spawnZombie({ id: 'gal_1', x: 52, z: 38.5, yaw: -Math.PI / 2, outfit: 'guard' }, G);
      ctx.spawnZombie({ id: 'gal_2', x: 48, z: 30.5, yaw: 0.4, outfit: 'prisoner' }, G);
      ctx.spawnZombie({ id: 'gal_3', x: 53.5, z: 33, yaw: 2.4, outfit: 'civilian', fakeDead: true }, G);
    },
  });

  const navPts: [number, number][] = [
    // guard ↔ admin door, corridor, archive, office
    [31, 5], [33.3, 5], [35, 4.5], [37.5, 4.5], [39.4, 4.5], [42.8, 4.5], [45, 4.5], [48, 4.5], [34.6, 6], [45, 6],
    [34.6, 8.4], [35, 10], [34.8, 14.5], [36.5, 17.5], [45, 8.4], [40.2, 10.5], [44, 10.5], [47.5, 10], [41, 14.5], [47, 14.5], [40.5, 17.5], [47.5, 17],
    // cells ↔ gallery
    [43.3, 34], [45.2, 34], [47.5, 31], [47.5, 38], [50, 30.8], [50, 33.8], [50, 38.2], [50, 42.4], [53.5, 31], [53.5, 36], [53.5, 41], [54.8, 34], [54.8, 38],
  ];
  return { doors, navPts, adminBounds, galleryBounds };
}
