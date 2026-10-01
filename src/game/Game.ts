import { ModelLibrary } from './assets/ModelLibrary';
import * as THREE from 'three';
import { RenderBackend, RenderCaps } from '../engine/Renderer';
import { Input } from '../engine/Input';
import { audio } from '../engine/AudioEngine';
import { bus } from '../engine/Events';
import { QUALITY } from '../engine/Quality';
import { CameraRig } from './player/CameraRig';
import { World } from './World';
import { HUD } from '../ui/HUD';
import { InventoryUI } from '../ui/InventoryUI';
import { Menus, loadSettings, saveSettings, type Settings } from '../ui/Menus';
import { SaveSystem } from './SaveSystem';
import { ITEMS, newUid, type ItemInstance } from './inventory/Items';
import { DOCS } from './levels/Docs';
import { WEAPONS } from './combat/Weapons';
import type { GameAPI } from './world/Interactables';

type Mode = 'title' | 'playing' | 'inventory' | 'paused' | 'dialog' | 'dead' | 'end';

/**
 * Top-level orchestrator ("Web RE-Engine" runtime): owns renderer, input, UI and the current World,
 * and runs the frame loop: input → player → weapons → AI → FX → streaming → camera → audio → HUD → render.
 */
/** character switch is allowed only in free control (not grabbed, dodging, dead, mid-action) */
function p0ok(w: World): boolean { return w.player.state === 'normal' && !w.weapons.isReloading(); }

export class Game {
  backend!: RenderBackend;
  camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.05, 900);
  input: Input;
  rig!: CameraRig;
  world: World | null = null;
  hud: HUD;
  menus: Menus;
  invUI: InventoryUI;
  settings: Settings = loadSettings();
  mode: Mode = 'title';
  private last = performance.now();
  private fps = 60;
  private debug = false;
  private deadT = 0;
  private rainGround = (x: number, z: number) => this.world!.physics.groundAt(x, z, 60);
  private visitedZones = new Set<string>();
  private lastSway = { yaw: 0, pitch: 0 };
  private api: GameAPI;

  constructor(private canvas: HTMLCanvasElement, private ui: HTMLElement) {
    this.input = new Input(canvas);
    this.hud = new HUD(ui);
    this.hud.show(false);
    this.invUI = new InventoryUI(ui, {
      inventory: null as never, itemBox: null as never,
      equippedUid: () => this.world?.weapons.current?.uid ?? null,
      use: (it) => this.useItem(it),
      equip: (it) => {
        if (ITEMS[it.defId].weaponId === 'gold_lugers' && this.world?.character !== 'steve') { this.invUI.flash('Это пистолеты Стива — Клэр не стреляет с двух рук.'); return; }
        this.world?.equip(it);
      },
      lighterOn: () => !!this.world?.player.models.claire.lighterOn,
      status: () => {
        const p = this.world!.player;
        const st = p.status();
        return { hp: p.hpRatio() * 100, label: p.poisoned ? 'POISON' : st.toUpperCase(), color: p.poisoned ? '#b05ce8' : st === 'fine' ? '#3ddc6a' : st === 'caution' ? '#e8c33a' : '#e8412e' };
      },
      docs: () => Object.keys(DOCS).filter((k) => this.world?.flags.has('doc:' + k)).map((k) => DOCS[k]),
      onClose: () => { if (this.mode === 'inventory') { this.mode = 'playing'; this.input.lockPointer(); } },
    });
    this.menus = new Menus(ui);
    this.api = {
      get inventory() { return (game.world as World).inventory; },
      get player() { return (game.world as World).player; },
      get physics() { return (game.world as World).physics; },
      get flags() { return (game.world as World).flags; },
      message: (t, d) => this.hud.message(t, d),
      openSaveDialog: () => this.saveDialog(),
      openItemBox: () => this.openInventory(true),
      confirm: (t, yes) => this.dialog(t, yes),
      completeLevel: () => this.complete(),
      readDoc: (id) => this.readDoc(id),
      codeLock: (title, digits, check, solved) => this.codeLock(title, digits, check, solved),
    };
    const game = this;
    document.addEventListener('pointerlockchange', () => {
      if (!document.pointerLockElement && this.mode === 'playing' && !this.input.usingGamepad) this.pause();
    });
    canvas.addEventListener('click', () => { if (this.mode === 'playing') this.input.lockPointer(); });
  }

  async init(): Promise<void> {
    this.backend = await RenderBackend.create(this.canvas, this.settings.quality);
    this.applySettings(this.settings, false);
    // idle title backdrop
    const s = new THREE.Scene();
    this.backend.attach(s, this.camera);
    this.menus.loading('Загрузка моделей…');
    await ModelLibrary.preload();
    this.showTitle();
    requestAnimationFrame(() => this.frame());
  }

  // ---------------------------------------------------------------- flow
  private showTitle(): void {
    this.mode = 'title';
    this.hud.show(false);
    this.input.unlockPointer();
    this.menus.title(SaveSystem.has(), {
      newGame: () => this.start(null),
      cont: () => this.start(SaveSystem.load()),
      settings: () => this.menus.settings(this.settings, (s) => this.applySettings(s), () => this.showTitle()),
      controls: () => this.menus.controls(() => this.showTitle()),
    });
  }

  private start(save: ReturnType<typeof SaveSystem.load>): void {
    audio.init();
    audio.setVolume(this.settings.volume);
    this.menus.loading('ROCKFORT ISLAND');
    setTimeout(async () => {
      this.world?.dispose();
      const w = new World(this.camera, this.backend.preset, save);
      this.world = w;
      (this.invUI as any).host.inventory = w.inventory;
      (this.invUI as any).host.itemBox = w.itemBox;
      this.rig = new CameraRig(this.camera, w.physics);
      this.rig.yaw = save?.camYaw ?? w.player.yaw;
      this.backend.attach(w.scene, this.camera);
      this.visitedZones.clear();
      await this.warmup(w);
      audio.startAmbience();
      this.menus.clear();
      this.hud.show(true);
      this.mode = 'playing';
      this.input.lockPointer();
      this.hud.message(save ? 'Игра загружена.' : 'Клэр Рэдфилд. Остров Рокфорт. Тюремный комплекс Umbrella.', 4);
      bus.emit('doorsChanged', null);
    }, 30);
  }

  /** Pre-compile every shader program and upload every texture while the loading screen is up,
   *  so walking into a new area never stalls on GPU work. */
  private async warmup(w: World): Promise<void> {
    const r = this.backend.renderer as unknown as {
      compileAsync?: (s: THREE.Object3D, c: THREE.Camera) => Promise<unknown>; compile?: (s: THREE.Object3D, c: THREE.Camera) => void; initTexture?: (t: THREE.Texture) => void;
    };
    for (const z of w.streamer.zones.values()) z.group.visible = true;
    const models = Object.values(w.player.models);
    const vis = models.map((m) => m.root.visible);
    const lit = w.player.models.claire.lighterOn;
    w.player.models.claire.setLighter(true);
    models.forEach((m) => { m.root.visible = true; });
    const undos = models.map((m) => m.preloadWeapons());
    const undoGuns = () => { undos.forEach((u) => u()); models.forEach((m, i) => { m.root.visible = vis[i]; }); w.player.models.claire.setLighter(lit); };
    try {
      if (r.compileAsync) await r.compileAsync(w.scene, this.camera); else r.compile?.(w.scene, this.camera);
    } catch (e) { console.warn('shader warmup', e); }
    const seen = new Set<THREE.Texture>();
    w.scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined;
      for (const mm of Array.isArray(m) ? m : m ? [m] : []) {
        for (const v of Object.values(mm)) if (v && (v as THREE.Texture).isTexture && !seen.has(v as THREE.Texture)) { seen.add(v as THREE.Texture); r.initTexture?.(v as THREE.Texture); }
      }
    });
    w.lights.warm(true);
    this.rig.update(0, w.player.pos, false, 0);
    this.backend.render(0);
    undoGuns();
    w.lights.warm(false);
    w.streamer.update(w.player.pos, this.camera.position);
    w.lights.update(this.camera.position);
  }

  private pause(): void {
    if (this.mode !== 'playing') return;
    this.mode = 'paused';
    this.input.unlockPointer();
    const back = () => this.pauseMenu();
    this.pauseMenu = () => this.menus.pause({
      resume: () => { this.menus.clear(); this.mode = 'playing'; this.input.lockPointer(); },
      settings: () => this.menus.settings(this.settings, (s) => this.applySettings(s), back),
      controls: () => this.menus.controls(back),
      quit: () => { this.world?.dispose(); this.world = null; this.showTitle(); },
    });
    this.pauseMenu();
  }
  private pauseMenu: () => void = () => {};

  private dialog(text: string, yes: () => void): void {
    const prev = this.mode;
    this.mode = 'dialog';
    this.input.unlockPointer();
    const close = () => { this.menus.clear(); this.mode = prev === 'dialog' ? 'playing' : prev; this.input.lockPointer(); };
    this.menus.confirm(text, () => { close(); yes(); }, close);
  }

  private modal(open: (close: () => void) => void): void {
    const prev = this.mode;
    this.mode = 'dialog';
    this.input.unlockPointer();
    open(() => { this.menus.clear(); this.mode = prev === 'dialog' ? 'playing' : prev; if (this.mode === 'playing') this.input.lockPointer(); });
  }

  private readDoc(id: string): void {
    const d = DOCS[id];
    if (!d || !this.world) return;
    this.world.flags.add('doc:' + id);
    audio.ui();
    this.modal((close) => this.menus.doc(d.title, d.body, close));
  }

  private codeLock(title: string, digits: number, check: (code: string) => boolean, solved: () => void): void {
    this.menus.onTick = () => audio.click();
    this.menus.onFail = () => audio.click(true);
    this.modal((close) => this.menus.codeLock(title, digits, check, solved, close));
  }

  private saveDialog(): void {
    this.dialog('Печатная машинка. Сохранить игру?', () => {
      const w = this.world!;
      w.stats.saves++;
      SaveSystem.save(w.serialize(this.rig.yaw));
      audio.click(true);
      this.hud.message('Игра сохранена.');
    });
  }

  private openInventory(box = false): void {
    if (!this.world) return;
    this.mode = 'inventory';
    this.input.unlockPointer();
    this.invUI.open(box);
  }

  private complete(): void {
    const w = this.world!;
    this.mode = 'end';
    this.input.unlockPointer();
    this.hud.show(false);
    const t = w.stats.time;
    const shots = w.weapons.shots + w.stats.shots, hits = w.weapons.hits + w.stats.hits;
    this.menus.end({ time: `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`, kills: w.stats.kills, saves: w.stats.saves, shots, acc: shots ? Math.round((hits / shots) * 100) : 0 },
      () => { this.world?.dispose(); this.world = null; this.showTitle(); });
  }

  private applySettings(s: Settings, rebuild = true): void {
    const qChanged = this.backend && this.backend.preset !== QUALITY[s.quality];
    this.settings = s;
    saveSettings(s);
    this.input.sensitivity = s.sensitivity;
    this.input.invertY = s.invertY;
    audio.setVolume(s.volume);
    if (qChanged && rebuild) {
      this.backend.applyQuality(s.quality);
      if (this.world) this.hud.message(`Графика: ${QUALITY[s.quality].label} (текстуры/частицы применятся после загрузки)`);
    }
  }

  private useItem(it: ItemInstance): void {
    const w = this.world!;
    const d = ITEMS[it.defId];
    if (it.defId === 'lighter') {
      if (w.character !== 'claire') { this.hud.message('Зажигалка у Клэр.'); return; }
      const on = !w.player.models.claire.lighterOn;
      w.player.models.claire.setLighter(on);
      if (on) w.flags.add('lighterOn'); else w.flags.delete('lighterOn');
      audio.click();
      this.hud.message(on ? 'Клэр зажигает зажигалку.' : 'Зажигалка погашена.', 1.6);
      return;
    }
    if (d.kind !== 'herb') return;
    if (d.heal === undefined && !d.cure) { this.hud.message('Красная трава бесполезна сама по себе. Смешайте с зелёной.'); return; }
    if (w.player.hp >= w.player.maxHp && !(d.cure && w.player.poisoned) && !d.defense) { this.hud.message('Здоровье в норме.'); return; }
    w.player.heal(d.heal ?? 0, d.cure, d.defense);
    w.inventory.remove(it.uid);
    this.hud.message(`Использовано: ${d.name}`);
  }

  private cheat(): void {
    const w = this.world!;
    const inv = w.inventory;
    const give: [string, number, Partial<ItemInstance>][] = [
      ['m3', 1, { mag: 5 }], ['mp5', 1, { mag: 30 }], ['python', 1, { mag: 6 }], ['gl', 1, { mag: 1, loaded: 'gren_exp' }], ['linear', 1, { mag: 1 }], ['bowgun', 1, { mag: 18 }],
      ['ammo_smg', 90, {}], ['ammo_mag', 12, {}], ['gren_fire', 4, {}], ['gren_acid', 4, {}], ['gren_exp', 4, {}], ['ammo_sg', 20, {}], ['ammo_hg', 45, {}],
    ];
    let failed = 0;
    for (const [id, q, ex] of give) {
      if (inv.has(id) && ITEMS[id].kind !== 'ammo') continue;
      if (inv.add(id, q, ex) > 0) { failed++; w.itemBox.items.push({ uid: newUid(), defId: id, qty: q, x: 0, y: 0, rot: false, ...ex }); }
    }
    this.hud.message(failed ? 'DEBUG: часть арсенала отправлена в сундук (8 слотов заняты).' : 'DEBUG: выдан весь арсенал Клэр.');
  }

  // ---------------------------------------------------------------- frame
  private frame(): void {
    requestAnimationFrame(() => this.frame());
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    this.fps = this.fps * 0.95 + (1 / Math.max(dt, 1e-4)) * 0.05;
    this.input.poll();
    const w = this.world;

    // inventory close is handled here (before simulate) so the same key press can't re-open it / trigger pause
    if (w && this.mode === 'inventory' && (this.input.inventory() || this.input.pause())) { this.invUI.close(); this.input.endFrame(); }
    else if (w && this.mode === 'inventory' && !this.invUI.isOpen) this.mode = 'playing';
    if (w && this.mode === 'playing') this.simulate(dt, w);
    else if (w && this.mode === 'dead') {
      w.time += dt;
      w.player.update(dt, w.time, this.input, this.rig, w.physics, w.weapons, w.zombies);
      w.updateZombies(dt);
      this.deadT += dt;
      if (this.deadT > 2.5 && !this.menus.root.innerHTML) {
        this.input.unlockPointer();
        this.menus.death({ load: () => this.start(SaveSystem.load()), retry: () => this.start(null) }, SaveSystem.has());
      }
    } else if (!w) {
      // title backdrop camera drift
      this.camera.position.set(Math.sin(now * 0.0001) * 3, 2, 0);
    }

    if (w) {
      this.rig.update(dt, w.player.pos, w.player.aiming, w.player.speed());
      audio.updateListener(this.camera);
      const p = w.player;
      const hp = p.hpRatio();
      this.backend.setDamage(Math.max(0, 0.55 - hp) * 1.4 + (p.state === 'grabbed' ? 0.3 : 0));
      const wp = w.weapons;
      this.hud.update(dt, {
        hpRatio: hp, status: p.status(), poisoned: p.poisoned, aiming: p.aiming,
        weaponId: wp.current?.defId ?? 'knife', weaponName: wp.def.name, mag: wp.inMag(), reserve: wp.reserve(), melee: wp.def.type === 'melee',
        sub: wp.def.ammo.length > 1 ? ITEMS[wp.ammoType()].name : wp.current?.mods?.length ? wp.current.mods.map((m) => ITEMS[m].name.replace('M9F ', '').replace('M3 ', '')).join(' · ') : '',
        reloading: wp.isReloading(), spreadDeg: wp.spreadDeg({ moveSpeed: p.speed(), hpRatio: hp, staminaRatio: p.stamina / 100 }), fov: this.camera.fov, onTarget: !!wp.aimTarget,
      });
      if (this.debug) {
        const st = this.backend.stats();
        const active = w.zombies.filter((z) => z.alive).length;
        this.hud.setDebug(`FPS ${this.fps.toFixed(0)}  |  ${RenderCaps.backend.toUpperCase()}  |  ${this.backend.preset.label}\ndraw calls ${st.calls}  tris ${(st.triangles / 1000).toFixed(0)}k\nzone ${w.streamer.current?.id ?? '-'}  built ${[...w.streamer.zones.values()].filter((z) => z.built).map((z) => z.id).join(',')}\nzombies alive ${active}/${w.zombies.length}  nav ${w.nav.nodes.length}\npos ${p.pos.x.toFixed(1)}, ${p.pos.z.toFixed(1)}  hp ${p.hp.toFixed(0)}`);
      }
    }
    if (this.input.debugToggle()) { this.debug = !this.debug; if (!this.debug) this.hud.setDebug(null); }
    this.backend.render(dt);
    this.input.endFrame();
  }

  private simulate(dt: number, w: World): void {
    const inp = this.input;
    w.time += dt;
    w.stats.time += dt;
    if (inp.pause()) { this.pause(); return; }
    if (inp.inventory() && w.player.state !== 'grabbed') { this.openInventory(false); return; }
    if (inp.cheat()) this.cheat();

    // camera look (+ tremble + aim assist)
    if (inp.pointerLocked || inp.usingGamepad) {
      const look = inp.lookDelta(dt);
      this.rig.addLook(look.x, look.y);
    }
    const p = w.player;
    const sway = w.weapons.sway(w.time, { hpRatio: p.hpRatio(), staminaRatio: p.stamina / 100 });
    if (p.aiming) this.rig.addLook(sway.yaw - this.lastSway.yaw, sway.pitch - this.lastSway.pitch);
    this.lastSway = p.aiming ? sway : { yaw: 0, pitch: 0 };
    if (p.aiming) {
      const strength = this.settings.aimAssist * (inp.usingGamepad ? 1 : 0.35);
      const a = w.weapons.assist(dt, strength);
      this.rig.addLook(-a.yaw, -a.pitch);
    }

    // weapon switching
    if (inp.switchCharacter() && p0ok(w)) {
      const to = w.switchCharacter();
      (this.invUI as any).host.inventory = w.inventory;
      this.hud.message(to === 'steve' ? 'Стив Бернсайд' : 'Клэр Рэдфилд', 1.8);
      audio.ui();
    }
    const weps = w.inventory.weapons().filter((i) => ITEMS[i.defId].weaponId !== 'knife' && (w.character === 'steve' || ITEMS[i.defId].weaponId !== 'gold_lugers'));
    const slot = inp.weaponSlot();
    const cyc = inp.cycleWeapon();
    if ((slot && weps[slot - 1]) || (cyc && weps.length)) {
      const cur = weps.findIndex((i) => i.uid === w.weapons.current?.uid);
      const next = slot ? weps[slot - 1] : weps[(cur + Math.sign(cyc) + weps.length) % weps.length];
      if (next && next.uid !== w.weapons.current?.uid) { w.equip(next); this.hud.message(ITEMS[next.defId].name, 1.2); }
    }
    if (w.weapons.current && !w.inventory.get(w.weapons.current.uid)) w.equip(null); // stored / discarded

    // player
    p.indoor = !(w.streamer.current?.outdoor ?? true);
    p.update(dt, w.time, inp, this.rig, w.physics, w.weapons, w.zombies);
    if (p.state === 'dead' && this.mode === 'playing') { this.mode = 'dead'; this.deadT = 0; return; }

    // weapons
    const muzzle = p.model.muzzleWorld(new THREE.Vector3());
    const muzzle2 = p.model.muzzleWorldL(new THREE.Vector3());
    const right = new THREE.Vector3(-Math.cos(p.yaw), 0, Math.sin(p.yaw));
    const out = w.weapons.update(dt, w.time, {
      aiming: p.aiming, fire: inp.fire(), firePressed: inp.firePressed(), reload: inp.reload(),
      moveSpeed: p.speed(), hpRatio: p.hpRatio(), staminaRatio: p.stamina / 100, muzzle, muzzle2, right,
      canFire: p.state === 'normal',
    });
    this.rig.addLook(out.kickYaw, -out.kickPitch);
    if (w.weapons.def.type === 'melee' && inp.aim() && WEAPONS.knife) void 0;

    // AI + FX
    w.updateZombies(dt);
    const c = w.combat;
    c.bloodFx.update(dt); c.sparks.update(dt); c.shells.update(dt); c.flash.update(dt); c.debris.update(dt);
    w.level.update(dt, w.time, p.pos);
    for (const i of w.interactables) i.update?.(dt, w.time);
    w.streamer.update(p.pos, this.camera.position);
    w.lights.update(this.camera.position);

    // weather / ambience per zone
    const zone = w.streamer.current;
    const outdoor = zone?.outdoor ?? true;
    w.rain.lines.visible = outdoor || (zone?.neighbors.some((n) => w.streamer.zones.get(n)?.outdoor && w.streamer.zones.get(n)?.group.visible) ?? false);
    if (w.rain.lines.visible) w.rain.update(dt, p.pos, w.level.outdoorBounds, this.rainGround);
    audio.setIndoor(!outdoor);
    audio.saveRoom(w.level.saveRoom.containsPoint(new THREE.Vector3(p.pos.x, 1, p.pos.z)));
    if (zone && !this.visitedZones.has(zone.id)) {
      this.visitedZones.add(zone.id);
      const names: Record<string, [string, string]> = {
        yard: ['ТЮРЕМНЫЙ ДВОР', 'ROCKFORT ISLAND'], guard: ['КАРАУЛЬНОЕ ПОМЕЩЕНИЕ', 'PRISON'], cells: ['БЛОК КАМЕР B', 'PRISON'], west: ['ЗАПАДНЫЙ ДВОР', 'PRISON'],
        gate_out: ['ДОРОГА К МОСТУ', 'ROCKFORT ISLAND'], bridge: ['МОСТ', 'ROCKFORT ISLAND'], plaza: ['ЛЕСТНИЦА', 'ROCKFORT ISLAND'],
        tyard: ['ПЛАЦ', 'MILITARY TRAINING FACILITY'], training: ['УЧЕБНЫЙ КОРПУС', 'MILITARY TRAINING FACILITY'],
        passage: ['ПРОХОД', 'ROCKFORT ISLAND'], pyard: ['ДВОРЦОВАЯ ПЛОЩАДЬ', 'ASHFORD PALACE'], hall: ['ГЛАВНЫЙ ЗАЛ', 'ASHFORD PALACE'],
        barracks: ['КАЗАРМА И ОРУЖЕЙНАЯ', 'MILITARY TRAINING FACILITY'], pcorr: ['ГАЛЕРЕЯ ПОРТРЕТОВ', 'ASHFORD PALACE'], dining: ['ОБЕДЕННЫЙ ЗАЛ', 'ASHFORD PALACE'],
      };
      const n = names[zone.id];
      if (n) this.hud.zone(n[0], n[1]);
    }

    // interaction
    let best: import('./world/Interactables').Interactable | null = null, bd = Infinity;
    for (const i of w.interactables) {
      if (!i.enabled) continue;
      const d = i.pos.distanceTo(new THREE.Vector3(p.pos.x, i.pos.y, p.pos.z));
      const dy = i.pos.y - p.pos.y;
      if (dy < -0.6 || dy > 2.4) continue; // other floor
      if (d < i.radius && d < bd && i.prompt(this.api)) { bd = d; best = i; }
    }
    this.hud.setPrompt(best && p.state === 'normal' && !p.aiming ? best.prompt(this.api) : null);
    if (best && inp.interact() && p.state === 'normal') best.interact(this.api);

    // grab UI
    this.hud.setStruggle(p.state === 'grabbed', (p as any).struggle ?? 0, p.counterCooldown <= 0);
  }
}
