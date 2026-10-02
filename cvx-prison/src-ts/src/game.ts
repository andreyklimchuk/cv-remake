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

export interface SaveData { room: string; x: number; y: number; z: number; h: number; inv: any[]; eq?: number | null; std?: number | null; lit?: boolean; taken: Record<string, number[]>; t: number }
/** items that are present in the PS3 data but belong to later story states */
const ROOM_ITEMS: Record<string, number[]> = { rm_0000: [0, 4, 6, 7], rm_0010: [0, 1] };
/** extra "check" messages attached to items (prisoner list on the board clip) */
const ITEM_MSG: Record<string, Record<number, number>> = { rm_0000: { 7: 48 } };
const ROOM_BY_NUM: Record<number, string> = { 0: 'rm_0000', 1: 'rm_0010' };
const LIGHTER = 55;

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
    this.invScreen.onEquipChange = () => this.player.setLighter(this.invScreen.standard === LIGHTER);
    this.scene.background = new THREE.Color(0);
    this.scene.add(this.ambient, this.hemi, this.player.root);
    addEventListener('resize', () => this.resize());
    this.resize();
    const cm = localStorage.getItem('cvx.cam'); if (cm === 'behind') this.cam.mode = 'behind';
    (window as any).__game = this;
  }
  resize() { const { w, h } = this.ui.fit(ASPECT); this.renderer.setSize(w, h, false); this.renderer.domElement.style.width = w + 'px'; this.renderer.domElement.style.height = h + 'px'; }

  async start(save?: SaveData, onReady?: () => void) {
    await this.player.load();
    this.audio.init();
    if (save) {
      this.taken = save.taken ?? {};
      this.inv.slots = save.inv.map((s) => (s ? { ...s } : null));
      this.invScreen.equipped = save.eq ?? null;
      this.invScreen.standard = save.std ?? null;
      this.playTime = save.t ?? 0;
      await this.enterRoom(save.room, -1, { x: save.x, y: save.y, z: save.z, h: save.h }, false);
    } else {
      this.inv.add(LIGHTER, 'Lighter');
      await this.enterRoom('rm_0000', 0, undefined, false);
    }
    this.player.setLighter(this.invScreen.standard === LIGHTER);
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
    if (id === 'rm_0000') this.openCellDoor(r);
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
        const count = it.id === 12 ? 15 : 1;
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
    const s: SaveData = { room: this.roomId, x: p.x, y: p.y, z: p.z, h: this.player.heading, inv: this.inv.slots, eq: this.invScreen.equipped, std: this.invScreen.standard, taken: this.taken, t: this.playTime };
    localStorage.setItem('cvx.save', JSON.stringify(s));
  }
  async toggleInv(open: boolean) { this.invOpen = open; await this.invScreen.show(open); }
  toggleCamera() {
    this.cam.mode = this.cam.mode === 'fixed' ? 'behind' : 'fixed';
    localStorage.setItem('cvx.cam', this.cam.mode);
    this.ui.toast(this.cam.mode === 'fixed' ? UI.camFixed() : UI.camBehind());
    this.cam.update(this.player.pos, this.player.headPos(), this.player.heading, true);
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
      if (inp.inventory) this.toggleInv(true);
      else if (inp.camToggle) this.toggleCamera();
      else if (inp.action) { const t = this.findTrigger(); if (t) { this.player.frozen = true; this.interact(t); } }
    }
    if (this.room) {
      this.player.update(dt, inp, this.room);
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
