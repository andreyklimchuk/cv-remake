import * as THREE from 'three';
import { Room, type Trigger } from './room';
import { Player } from './player';
import { CameraRig, ASPECT } from './camera';
import { Input } from './input';
import { UIRoot, MessageBox } from './ui';
import { Inventory } from './inventory';
import { InventoryScreen } from './invscreen';
import { Audio } from './audio';
import { LANG, UI, itemName, pages } from './text';
import { Zombie } from './enemy';

export interface SaveData { hp?: number; killed?: Record<string, number[]>; room: string; x: number; y: number; z: number; h: number; inv: any[]; eq?: number | null; std?: number | null; lit?: boolean; taken: Record<string, number[]>; t: number }
/** items that are present in the PS3 data but belong to later story states */
const ROOM_ITEMS: Record<string, number[]> = { rm_0000: [0, 4, 6, 7], rm_0010: [0, 1], rm_0020: [], rm_0030: [0] };
/** items without an item trigger in the PS3 data (picked up next to where they lie) */
const ITEM_TRIG: Record<string, number[]> = { rm_0030: [0] };
/** zombies (enemy id 1) of the first visit; the graveyard ones climb out of the ground */
const ROOM_ZOMBIES: Record<string, { files: string[]; lying: boolean }> = { rm_0020: { files: ['enemies/en01a32.glb', 'enemies/en01a09.glb'], lying: true } };
/** door number 5 leads out of the prison (rm_0050, outside the walls) */
const EXIT_ROOM = 5;
/** extra "check" messages attached to items (prisoner list on the board clip) */
const ITEM_MSG: Record<string, Record<number, number>> = { rm_0000: { 7: 48 } };
const ROOM_BY_NUM: Record<number, string> = { 0: 'rm_0000', 1: 'rm_0010', 2: 'rm_0020', 3: 'rm_0030' };
const LIGHTER = 55, KNIFE = 8, HANDGUN = 9, BULLETS = 12, MAG = 15;
/** handgun damage against zombies (8 hit points) */
const GUN_DMG = 1.5;

export class Game {
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  cam = new CameraRig();
  input = new Input();
  player = new Player();
  inv = new Inventory();
  msg: MessageBox;
  room: Room | null = null;
  roomId = '';
  taken: Record<string, number[]> = {};
  busy = false;
  invOpen = false;
  invScreen: InventoryScreen;
  debug = false;
  clock = new THREE.Clock();
  audio = new Audio();
  playTime = 0;
  private ambient = new THREE.AmbientLight(0xb8c4d8, 0.95);
  private hemi = new THREE.HemisphereLight(0x9aa6c0, 0x2a2018, 0.5);

  constructor(public ui: UIRoot) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.ui.stage.prepend(this.renderer.domElement);
    this.msg = new MessageBox(this.ui.msg);
    this.invScreen = new InventoryScreen(this.ui.inv, this.inv, this.input, this.audio, this.player);
    this.invScreen.onEquipChange = () => { this.player.setLighter(this.invScreen.standard === LIGHTER); this.player.setKnife(this.invScreen.equipped === KNIFE); this.player.setGun(this.invScreen.equipped === HANDGUN); };
    this.scene.background = new THREE.Color(0);
    this.scene.add(this.ambient, this.hemi, this.player.root);
    addEventListener('resize', () => this.resize());
    this.resize();
    const cm = localStorage.getItem('cvx.cam'); if (cm === 'behind') this.cam.mode = 'behind';
    this.player.onSlash = (p) => this.onSlash(p);
    const gun = () => this.inv.slots.find((s) => s?.id === HANDGUN);
    this.player.canFire = () => (gun()?.count ?? 0) > 0;
    this.player.emptyClick = () => this.audio.se('empty');
    this.player.onFire = (p, d, aim) => this.onFire(p, d, aim);
    this.player.needReload = () => {
      const g = gun(), b = this.inv.slots.find((s) => s?.id === BULLETS);
      if (!g || g.count > 0 || !b) return false;
      const n = Math.min(MAG, b.count); g.count += n; b.count -= n;
      if (b.count <= 0) this.inv.slots[this.inv.slots.indexOf(b)] = null;
      this.audio.se('reload'); return true;
    };
    (window as any).__game = this;
  }
  resize() { const { w, h } = this.ui.fit(ASPECT); this.renderer.setSize(w, h, false); this.renderer.domElement.style.width = w + 'px'; this.renderer.domElement.style.height = h + 'px'; }

  async start(save?: SaveData, onReady?: () => void) {
    await this.player.load();
    this.audio.init();
    if (save) {
      this.taken = save.taken ?? {}; this.killed = save.killed ?? {}; this.player.hp = save.hp ?? 200;
      this.inv.slots = save.inv.map((s) => (s ? { ...s } : null));
      this.invScreen.equipped = save.eq ?? null;
      this.invScreen.standard = save.std ?? null;
      this.playTime = save.t ?? 0;
      await this.enterRoom(save.room, -1, { x: save.x, y: save.y, z: save.z, h: save.h }, false);
    } else {
      this.inv.add(LIGHTER, 'Lighter');
      await this.enterRoom('rm_0000', 0, undefined, false);
    }
    this.player.setLighter(this.invScreen.standard === LIGHTER); this.player.setKnife(this.invScreen.equipped === KNIFE); this.player.setGun(this.invScreen.equipped === HANDGUN);
    this.renderer.domElement.addEventListener('mousedown', () => { if (this.cam.mode === 'behind' && !this.invOpen && !this.msg.active) this.input.requestLock(this.renderer.domElement); });
    this.loop();
    onReady?.();
    await this.ui.fade(false, 900);
    if (!save) await this.msg.raw(LANG === 'ru'
      ? ['Остров Рокфорт. Тюремный блок.', 'Охранник Родриго отпер камеру\nи оставил Клэр одну...']
      : ['Rockfort Island. Prison block.', 'The guard Rodrigo unlocked the cell\nand left Claire alone...']);
  }

  async enterRoom(id: string, spawn: number, at?: { x: number; y: number; z: number; h: number }, fade = true, minMs = 0) {
    this.busy = true;
    const t0 = performance.now();
    if (fade) await this.ui.fade(true, 350);
    if (this.room) this.scene.remove(this.room.group);
    const r = await Room.load(id);
    this.room = r; this.roomId = id;
    const taken = new Set(this.taken[id] ?? []); const allow = ROOM_ITEMS[id] ?? [];
    await r.placeItems(taken, (i) => allow.includes(i));
    for (const [k, m] of Object.entries(ITEM_MSG[id] ?? {})) {
      const it = r.data.items[+k];
      r.triggers.push({ kind: 'message', x0: it.pos[0] - 0.3, z0: it.pos[2] - 0.3, x1: it.pos[0] + 0.3, z1: it.pos[2] + 0.3, arg: m, flags: 0, raw: null });
    }
    for (const k of ITEM_TRIG[id] ?? []) {
      const it = r.data.items[k]; if (!r.itemMeshes.has(k)) continue;
      r.triggers.push({ kind: 'item', x0: it.pos[0] - 0.35, z0: it.pos[2] - 0.35, x1: it.pos[0] + 0.35, z1: it.pos[2] + 0.35, arg: k, flags: 0, raw: null });
    }
    if (id === 'rm_0000') this.openCellDoor(r);
    for (const z of this.zombies) this.scene.remove(z.root);
    this.zombies = []; this.npcs = []; this.grab = null;
    const zs = ROOM_ZOMBIES[id];
    if (zs) {
      const ene = ((r.data as any).enemies ?? []) as { id: number; pos: number[]; rot: number[] }[];
      const dead = new Set(this.killed[id] ?? []);
      let n = 0;
      for (let i = 0; i < ene.length; i++) {
        const e = ene[i]; if (e.id !== 1 || dead.has(i)) continue;
        const z = new Zombie(i);
        await z.init(zs.files[n++ % zs.files.length], e.pos[0], e.pos[1], e.pos[2], e.rot[1] ?? 0, zs.lying);
        this.zombies.push(z); this.scene.add(z.root);
        this.npcs.push({ root: z.root, get hittable() { return z.hittable; }, hit: () => this.hitZombie(z, 1) });
      }
    }
    this.scene.add(r.group);
    if (at) this.player.place(at.x, at.y, at.z, at.h);
    else { const s = r.data.spawns[Math.max(0, Math.min(spawn, r.data.spawns.length - 1))]; this.player.place(s.pos[0], s.pos[1], s.pos[2], s.ang); }
    const y = r.floorAt(this.player.pos.x, this.player.pos.z, this.player.pos.y + 0.3, 0.6); if (y !== null) this.player.pos.y = y;
    this.cam.setRoom(r);
    this.player.root.updateMatrixWorld(true);
    this.cam.update(this.player.pos, this.player.headPos(), this.player.heading, true);
    this.audio.room(id);
    this.renderer.compile(this.scene, this.cam.cam);
    const wait = minMs - (performance.now() - t0); if (wait > 0) await new Promise((res) => setTimeout(res, wait));
    if (fade) await this.ui.fade(false, 350);
    this.busy = false;
  }
  /** Rodrigo has already unlocked the cell: swing the barred door open and drop its collider. */
  private openCellDoor(r: Room) {
    const d = r.group.children.find((o) => o.name === 'ob_000'); if (d) d.rotation.y = Math.PI / 2;
    r.shapes = r.shapes.filter((s) => !(s.k === 'box' && Math.abs(s.x0 - 3.5) < 0.02 && Math.abs(s.z0 - 3) < 0.02 && Math.abs(s.z1 - 3.9) < 0.05));
  }

  private inTrig(t: Trigger, x: number, z: number) { return x >= Math.min(t.x0, t.x1) && x <= Math.max(t.x0, t.x1) && z >= Math.min(t.z0, t.z1) && z <= Math.max(t.z0, t.z1); }
  findTrigger(): Trigger | null {
    if (!this.room) return null;
    const p = this.player.pos, f = this.player.forward();
    const probes = [0.45, 0.25, 0].map((d) => [p.x + f.x * d, p.z + f.z * d]);
    let best: Trigger | null = null, bd = Infinity;
    for (const t of this.room.triggers) {
      if (!this.usable(t)) continue;
      for (let i = 0; i < probes.length; i++) {
        if (!this.inTrig(t, probes[i][0], probes[i][1])) continue;
        let cx = (t.x0 + t.x1) / 2, cz = (t.z0 + t.z1) / 2;
        if (t.kind === 'item') { const it = this.room.data.items[t.arg]; cx = it.pos[0]; cz = it.pos[2]; }
        const d = Math.hypot(cx - probes[0][0], cz - probes[0][1]) + i * 0.05;
        if (d < bd) { bd = d; best = t; }
      }
    }
    return best;
  }
  private get lit() { return this.player.lighterOn; }
  usable(t: Trigger) {
    const r = this.room!;
    if (t.kind === 'door') return true;
    if (t.kind === 'item') return r.itemMeshes.has(t.arg);
    if (t.kind === 'message') {
      // 47 "too dark" overlaps the window message 4 in the PS3 data; 4 needs the lighter
      if (this.roomId === 'rm_0000' && t.arg === 47) return false;
      const m = r.data.messages[t.arg];
      return !!m && pages(m).length > 0;
    }
    return false;
  }
  /** message pages for a trigger, taking the lit lighter into account */
  private messageFor(arg: number): string[] {
    const r = this.room!; const m = r.data.messages[arg];
    if (this.roomId === 'rm_0000' && this.lit) {
      if (arg === 4) return [UI.litOutside()];
      if (arg === 47) return [UI.litDark()];
      if (arg === 46) return [UI.litWound()];
    }
    return pages(m);
  }
  async interact(t: Trigger) {
    this.busy = true;
    const r = this.room!;
    try {
      if (t.kind === 'door') {
        if (t.room === EXIT_ROOM) { this.audio.se('door'); await this.escaped(); return; }
        const dest = ROOM_BY_NUM[t.room!];
        if (!dest) { this.audio.se('locked'); await this.msg.show([UI.locked()]); return; }
        this.audio.se('door');
        await this.enterRoom(dest, t.spawn!, undefined, true, 1400);
        this.audio.se('doorClose');
        return;
      }
      if (t.kind === 'item') {
        const it = r.data.items[t.arg];
        const name = itemName(it.name ?? 'item');
        const c = await this.msg.raw([UI.takeQ(name)], [UI.yes(), UI.no()]);
        if (c !== 0) return;
        const count = it.id === BULLETS || it.id === HANDGUN ? MAG : 1;
        if (!this.inv.add(it.id, it.name ?? '', count)) { await this.msg.show([UI.full()]); return; }
        this.audio.se('pickup');
        r.removeItem(t.arg);
        (this.taken[this.roomId] ??= []).push(t.arg);
        await this.msg.show([UI.got(name)]);
        return;
      }
      if (t.kind === 'message') {
        if (this.roomId === 'rm_0010' && t.arg === 0) return await this.typewriter();
        await this.msg.raw(this.messageFor(t.arg));
      }
    } finally { this.busy = false; }
  }
  async typewriter() {
    const r = this.room!;
    if (!this.inv.has(31)) { await this.msg.show(r.data.messages[2]); return; }
    const c = await this.msg.raw([LANG === 'ru' ? 'С её помощью можно\nсохранить прогресс.' : 'You can save your\nprogress with this.', UI.saveQ()], [UI.yes(), UI.no()]);
    if (c !== 0) return;
    this.inv.take(31);
    this.audio.se('typewriter');
    this.save();
    await this.msg.show([UI.saved()]);
  }
  save() {
    const p = this.player.pos;
    const s: SaveData = { hp: this.player.hp, killed: this.killed, room: this.roomId, x: p.x, y: p.y, z: p.z, h: this.player.heading, inv: this.inv.slots, eq: this.invScreen.equipped, std: this.invScreen.standard, taken: this.taken, t: this.playTime };
    localStorage.setItem('cvx.save', JSON.stringify(s));
  }
  async toggleInv(open: boolean) { this.invOpen = open; await this.invScreen.show(open); }
  toggleCamera() {
    this.cam.mode = this.cam.mode === 'fixed' ? 'behind' : 'fixed';
    localStorage.setItem('cvx.cam', this.cam.mode);
    if (this.cam.mode === 'behind') this.cam.resetYaw(this.player.heading); else this.input.releaseLock();
    this.ui.toast(this.cam.mode === 'fixed' ? UI.camFixed() : UI.camBehind());
    this.cam.update(this.player.pos, this.player.headPos(), this.player.heading, true);
  }

  /** knife hit: enemies within reach of the blade */
  onSlash(p: THREE.Vector3) {
    this.audio.se('knife');
    for (const n of this.npcs) if (n.hittable && n.root.position.distanceTo(p.clone().setY(n.root.position.y)) < 0.6) n.hit?.();
  }
  /** handgun shot: the nearest zombie in the line of fire (auto-aim like the original) */
  onFire(p: THREE.Vector3, d: THREE.Vector3, aim: number) {
    const g = this.inv.slots.find((s) => s?.id === HANDGUN); if (!g || g.count <= 0) return false;
    g.count--; this.audio.se('shot');
    const f = new THREE.Vector2(d.x, d.z).normalize(); let best: Zombie | null = null, bd = 12;
    for (const z of this.zombies) {
      if (!z.hittable) continue;
      const v = new THREE.Vector2(z.root.position.x - p.x, z.root.position.z - p.z), dist = v.length();
      if (dist > bd || dist < 0.05) continue;
      const cos = v.dot(f) / dist; if (cos < (aim === 0 ? 0.94 : 0.8)) continue;
      best = z; bd = dist;
    }
    if (best) this.hitZombie(best, GUN_DMG);
    return true;
  }
  npcs: { root: THREE.Object3D; hittable?: boolean; hit?: () => void }[] = [];
  zombies: Zombie[] = [];
  killed: Record<string, number[]> = {};
  /** zombie bite in progress (Claire z00/z01 + zombie m00, then z02/z03 push-off) */
  grab: { z: Zombie; t: number; front: boolean; phase: 'bite' | 'push' | 'dead'; hurt: boolean } | null = null;
  hitZombie(z: Zombie, dmg: number) {
    z.hit(dmg);
    if (!z.alive) (this.killed[this.roomId] ??= []).push(z.index);
  }
  private startGrab(z: Zombie) {
    const P = this.player, p = P.root.position, zp = z.root.position;
    const toZ = new THREE.Vector3(zp.x - p.x, 0, zp.z - p.z);
    const front = P.forward().dot(toZ) >= 0;
    // line Claire up with the zombie like the synchronised original motions
    z.heading = Math.atan2(-(p.x - zp.x), -(p.z - zp.z)); z.root.rotation.y = z.heading;
    const zf = z.forward(); const np = zp.clone().addScaledVector(zf, 0.42); np.y = p.y;
    P.place(np.x, np.y, np.z, front ? z.heading + Math.PI : z.heading);
    P.playSync(front ? 'z00' : 'z01');
    this.grab = { z, t: 0, front, phase: 'bite', hurt: false };
  }
  private updateGrab(dt: number) {
    const g = this.grab!; g.t += dt;
    if (g.phase === 'bite') {
      if (!g.hurt && g.t > 1.0) { g.hurt = true; this.player.hp -= 40; this.audio.se('bite'); }
      if (g.t >= 2.0) {
        g.t = 0;
        if (this.player.hp <= 0) { g.phase = 'dead'; this.player.playSync(g.front ? 'z10' : 'z11'); g.z.set('idle'); }
        else { g.phase = 'push'; this.player.playSync(g.front ? 'z02' : 'z03'); g.z.set('release'); }
      }
    } else if (g.phase === 'push') {
      if (g.t >= 1.6) { this.player.playSync(null); this.grab = null; }
    } else if (g.phase === 'dead' && g.t >= 2.6) { this.grab = null; this.gameOver(); }
  }
  private overShown = false;
  async gameOver() {
    if (this.overShown) return; this.overShown = true; this.busy = true;
    await this.ui.fade(true, 1200);
    await this.msg.raw([LANG === 'ru' ? 'ВЫ ПОГИБЛИ' : 'YOU ARE DEAD']);
    location.reload();
  }
  /** door out of the prison block: the ported part ends here */
  async escaped() {
    this.busy = true;
    await this.ui.fade(true, 900);
    await this.msg.raw(LANG === 'ru'
      ? ['Клэр выбралась за ворота тюрьмы.', 'Конец перенесённой части:\nтюрьма острова Рокфорт.']
      : ['Claire made it out of the prison.', 'End of the ported part:\nRockfort Island prison.']);
    await this.ui.fade(false, 600);
    this.busy = false;
  }
  /** Test hook: advance the simulation synchronously with the given keys held. */
  sim(sec: number, codes: string[] = []) {
    for (const c of codes) { this.input.down.add(c); this.input.pressed.add(c); }
    for (let t = 0; t < sec; t += 1 / 30) { this.step(1 / 30); this.input.pressed.clear(); }
    for (const c of codes) this.input.down.delete(c);
    this.renderer.render(this.scene, this.cam.cam);
  }
  loop = () => {
    requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 1 / 10);
    this.step(dt);
    this.renderer.render(this.scene, this.cam.cam);
    this.input.endFrame();
  };
  step(dt: number) {
    const inp = this.input;
    this.playTime += dt;
    if (inp.hit('F1', 'Backquote')) this.debug = !this.debug;
    if (this.msg.active) {
      this.msg.update(dt, inp.action, inp.hit('KeyA', 'ArrowLeft'), inp.hit('KeyD', 'ArrowRight'), inp.cancel);
      this.player.frozen = true;
    } else if (this.invOpen) {
      this.player.frozen = true;
      if (!this.invScreen.update(dt)) this.invOpen = false;
    } else if (this.busy) this.player.frozen = true;
    else {
      this.player.frozen = false;
      if (this.player.sync) { /* grabbed */ }
      else if (inp.inventory) this.toggleInv(true);
      else if (inp.camToggle) this.toggleCamera();
      else if (inp.action && !this.player.aiming) { const t = this.findTrigger(); if (t) { this.player.frozen = true; this.interact(t); } }
    }
    if (this.room) {
      const sh = this.cam.mode === 'behind';
      if (sh && !this.player.frozen) {
        // mouse (pointer lock) or ←/→ turn the over-the-shoulder camera; the fixed cameras cannot be moved
        const sens = 0.0024 * (this.player.aiming ? 0.6 : 1);
        this.cam.look(inp.mdx * sens + ((inp.camR ? 1 : 0) - (inp.camL ? 1 : 0)) * 2.2 * dt, inp.mdy * sens);
      }
      this.cam.zoom += ((sh && this.player.aiming ? 1 : 0) - this.cam.zoom) * Math.min(1, dt * 10);
      this.player.update(dt, inp, this.room, sh ? this.cam.yaw : null);
      if (!this.msg.active && !this.invOpen && !(this.busy && !this.grab)) {
        if (this.grab) this.updateGrab(dt);
        const free = !this.grab && !this.player.sync && this.player.hp > 0;
        for (const z of this.zombies) {
          if (z.state === 'bite' && this.grab?.z !== z) z.set('walk');
          if (z.tick(dt, this.player.root.position, free, this.room) && !this.grab && free) this.startGrab(z);
        }
      }
      this.cam.update(this.player.pos, this.player.headPos(), this.player.heading, false, dt);
      this.audio.footsteps(this.player.state, dt);
    }
    this.ui.hud.style.display = this.debug ? 'block' : 'none';
    if (this.debug && this.room) {
      const p = this.player.pos; const t = this.findTrigger();
      this.ui.hud.textContent = `${this.roomId} cam ${this.cam.mode === 'behind' ? 'behind' : this.cam.index + (this.cam.usingFallback ? ' (fallback)' : '')}\npos ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${p.z.toFixed(2)} h ${(this.player.heading * 180 / Math.PI).toFixed(0)}°\n${t ? `trigger ${t.kind} ${t.arg}` : ''}`;
    }
  }
}
