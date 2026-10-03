import * as THREE from 'three';
import { Room } from './room';
import { Player } from './player';
import { CameraRig, ASPECT } from './camera';
import { Input } from './input';
import { UIRoot, MessageBox } from './ui';
import { Inventory } from './inventory';
import { InventoryScreen } from './invscreen';
import { Audio } from './audio';
import { LANG, UI, pages, hasChoice } from './text';
import { Zombie, Dog } from './enemy';
import { EvtVM, atrFrom, newFlags, type EvtFlags, type EvtHost, type Atr } from './evt';
import { loadJSON } from './assets';
import { ITEM_NAMES, SYSMES } from './sysmes';
import { playMovie } from './movie';

export interface SaveData { hp?: number; room: string; pos?: number; x: number; y: number; z: number; h: number; inv: any[]; eq?: number | null; std?: number | null; evt?: { f: EvtFlags; rcase: number }; t: number }
/** rooms converted from the PS3 data (room file = rm_<stage><room><case>) */
const ROOMS = new Set(['rm_0000', 'rm_0010', 'rm_0020', 'rm_0021', 'rm_0030', 'rm_0031', 'rm_0040', 'rm_0050', 'rm_0060', 'rm_0080']);
/** converted zombie models en01aNN (NN = model variant byte of the enemy record) */
const ZOMBIE_VARIANTS = new Set([0, 1, 2, 9, 10, 32, 33]);
const LIGHTER = 55, KNIFE = 8, HANDGUN = 9, BULLETS = 12, MAG = 15;
/** WeaponSet numbers used by the scripts (ArmsItemCheck / WeaponSet) */
const WPN_NO: Record<number, number> = { [LIGHTER]: 1, [KNIFE]: 2, [HANDGUN]: 4 };
/** handgun damage against zombies (8 hit points) */
const GUN_DMG = 1.5;
/** probe distance in front of the player per trigger type (bhCheckExmAtari) */
const EXM_DIST = [0.45, 0.075, 0.45, 0.6, 0.2];
const pad = (n: number, w: number) => String(n).padStart(w, '0');

export class Game implements EvtHost {
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  cam = new CameraRig();
  input = new Input();
  player = new Player();
  inv = new Inventory();
  msg: MessageBox;
  room: Room | null = null;
  roomId = '';
  busy = false;
  invOpen = false;
  invScreen: InventoryScreen;
  debug = false;
  clock = new THREE.Clock();
  audio = new Audio();
  playTime = 0;
  /** event script interpreter (story flags persist across rooms) */
  vm: EvtVM;
  private evtAcc = 0;
  private wallSig = '';
  private movieOn = false;
  private pendingDoor: { stg: number; room: number; pos: number } | null = null;
  private dialog = false;
  private ambient = new THREE.AmbientLight(0xb8c4d8, 0.95);
  private hemi = new THREE.HemisphereLight(0x9aa6c0, 0x2a2018, 0.5);

  constructor(public ui: UIRoot) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.ui.stage.prepend(this.renderer.domElement);
    this.msg = new MessageBox(this.ui.msg);
    this.vm = new EvtVM(this);
    this.invScreen = new InventoryScreen(this.ui.inv, this.inv, this.input, this.audio, this.player);
    this.invScreen.onEquipChange = () => { this.player.setLighter(this.invScreen.standard === LIGHTER); this.player.setKnife(this.invScreen.equipped === KNIFE); this.player.setGun(this.invScreen.equipped === HANDGUN); };
    this.invScreen.onUseItem = (id) => this.useItem(id);
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
      this.player.hp = save.hp ?? 200;
      this.inv.slots = save.inv.map((s) => (s ? { ...s } : null));
      this.invScreen.equipped = save.eq ?? null;
      this.invScreen.standard = save.std ?? null;
      this.playTime = save.t ?? 0;
      if (save.evt) { this.vm.f = save.evt.f; this.vm.rcase = save.evt.rcase; }
      await this.enterRoom(save.room, save.pos ?? 0, { x: save.x, y: save.y, z: save.z, h: save.h }, false);
    } else {
      // Claire starts with her lighter (rm_0000 scripts check it with PlItemCheck / ArmsItemCheck)
      this.inv.add(LIGHTER, ITEM_NAMES[LIGHTER]);
      await this.enterRoom('rm_0000', 0, undefined, false);
    }
    this.invScreen.onEquipChange!();
    this.renderer.domElement.addEventListener('mousedown', () => { if (this.cam.mode === 'behind' && !this.invOpen && !this.msg.active) this.input.requestLock(this.renderer.domElement); });
    this.loop();
    onReady?.();
    // a new game is faded in by the opening event of rm_0000
    if (save) await this.ui.fade(false, 900);
  }

  // ---------------------------------------------------------------- rooms
  async enterRoom(id: string, pos: number, at?: { x: number; y: number; z: number; h: number }, fade = true, minMs = 0) {
    this.busy = true;
    const t0 = performance.now();
    if (fade) await this.ui.fade(true, 350);
    if (this.room) { this.scene.remove(this.room.group); this.vm.roomChange(); }
    const [r, ev] = await Promise.all([Room.load(id), loadJSON<{ scripts: string[] }>(`evt/${id}.json`).catch(() => ({ scripts: [] as string[] }))]);
    await r.placeItems();
    this.room = r; this.roomId = id;
    for (const z of [...this.zombies, ...this.dogs]) this.scene.remove(z.root);
    for (const n of this.actors) this.scene.remove(n);
    this.zombies = []; this.dogs = []; this.npcs = []; this.actors = []; this.grab = null; this.dogBite = null;
    // player position first (the scripts read it)
    if (at) this.player.place(at.x, at.y, at.z, at.h);
    else { const s = r.data.spawns[Math.max(0, Math.min(pos, r.data.spawns.length - 1))]; this.player.place(s.pos[0], s.pos[1], s.pos[2], s.ang); }
    const y = r.floorAt(this.player.pos.x, this.player.pos.z, this.player.pos.y + 0.3, 0.6); if (y !== null) this.player.pos.y = y;
    // event system: bhInitEvent with the room's ATR records
    const vm = this.vm;
    vm.stg = +id[3]; vm.room = parseInt(id.slice(4, 6), 10); vm.rcase = +id[6]; vm.pos_no = pos;
    vm.etc = r.data.triggers.map(atrFrom); vm.wal = r.data.collision.map(atrFrom); vm.flr = (r.data.areas ?? []).map(atrFrom);
    this.syncPlayerWork();
    this.cam.forced = null; this.wallSig = '';
    vm.init(ev.scripts);
    await this.spawnEnemies(r);
    this.applyWorks();
    this.scene.add(r.group);
    this.cam.setRoom(r);
    this.player.root.updateMatrixWorld(true);
    this.cam.update(this.player.pos, this.player.headPos(), this.player.heading, true);
    this.audio.room(id);
    this.renderer.compile(this.scene, this.cam.cam);
    const wait = minMs - (performance.now() - t0); if (wait > 0) await new Promise((res) => setTimeout(res, wait));
    if (fade) await this.ui.fade(false, 350);
    this.busy = false;
  }
  /** enemies of the room record that the scripts did not remove (InitModelSet / ENESETCK) */
  private async spawnEnemies(r: Room) {
    const ene = r.data.enemies ?? [];
    for (let i = 0; i < ene.length; i++) {
      const e = ene[i]; const w = this.vm.works.get('1:' + i);
      if (w?.gone) continue;
      const ex = e.ex ?? '000000000000', type = parseInt(ex.slice(0, 4), 16), variant = parseInt(ex.slice(6, 8), 16);
      if (e.id === 1) {
        if (!ZOMBIE_VARIANTS.has(variant)) { console.info(`${this.roomId}: zombie ${i} model en01a${pad(variant, 2)} not converted`); continue; }
        // graveyard zombies (behaviour type 0 in rm_002x) lie in the ground and climb out
        const lying = type === 0 && this.roomId.startsWith('rm_002');
        const z = new Zombie(i);
        await z.init(`enemies/en01a${pad(variant, 2)}.glb`, e.pos[0], e.pos[1], e.pos[2], lying ? (e.rot[1] ?? 0) : (e.rot[2] ?? 0), lying);
        this.zombies.push(z); this.scene.add(z.root);
        const vm = this.vm;
        this.npcs.push({ root: z.root, get hittable() { return z.hittable && !vm.works.get('1:' + i)?.scripted; }, hit: () => this.hitZombie(z, 1) });
      } else if (e.id === 4) {
        const z = new Dog(i);
        await z.init('enemies/en04a00.glb', e.pos[0], e.pos[1], e.pos[2], e.rot[2] ?? 0);
        this.dogs.push(z); this.scene.add(z.root);
        this.npcs.push({ root: z.root, get hittable() { return z.hittable; }, hit: () => this.hitZombie(z, 1) });
      } else console.info(`${this.roomId}: character en${pad(e.id, 2)} (enemy ${i}) not converted`);
    }
  }
  actors: THREE.Object3D[] = [];

  // ---------------------------------------------------------------- event system glue
  private syncPlayerWork() {
    const w = this.vm.work(0, 0), P = this.player;
    if (!w.posSet) { w.px = P.pos.x; w.py = P.pos.y; w.pz = P.pos.z; }
    if (!w.angSet) w.ay = P.heading;
  }
  /** script-controlled entity state -> scene */
  private applyWorks() {
    const vm = this.vm, r = this.room!; const P = this.player;
    const w0 = vm.works.get('0:0');
    if (w0) {
      if (w0.posSet) { P.place(w0.px, w0.py, w0.pz, w0.angSet ? w0.ay : P.heading); w0.posSet = false; w0.angSet = false; }
      else if (w0.angSet) { P.place(P.pos.x, P.pos.y, P.pos.z, w0.ay); w0.angSet = false; }
      P.root.visible = !w0.gone && !w0.hidden;
    } else P.root.visible = true;
    for (const [i, o] of r.itemMeshes) {
      const w = vm.works.get('3:' + i); if (!w) { o.visible = true; continue; }
      o.visible = !w.gone && !w.hidden;
      if (w.posSet) { o.position.set(w.px, w.py, w.pz); w.posSet = false; }
      if (w.angSet) { o.rotation.set(w.ax, w.ay, w.az, 'ZYX'); w.angSet = false; }
    }
    for (const [i, o] of r.objMeshes) {
      const w = vm.works.get('2:' + i); if (!w) continue;
      o.visible = !w.gone && !w.hidden;
      if (w.posSet) { o.position.set(w.px, w.py, w.pz); w.posSet = false; }
      if (w.angSet) { o.rotation.set(w.ax, w.ay, w.az, 'ZYX'); w.angSet = false; }
    }
    for (const z of [...this.zombies, ...this.dogs]) {
      const w = vm.works.get('1:' + z.index); if (!w) continue;
      z.root.visible = !w.gone && !w.hidden;
      if (w.posSet) { if (w.px || w.py || w.pz) z.root.position.set(w.px, w.py, w.pz); w.posSet = false; }
      if (w.angSet) { z.heading = w.ay; z.root.rotation.y = w.ay; w.angSet = false; }
      // room motion (rmt, MOTION kind 1): the clip carries the world placement of the root
      if (w.mtnKind === 1 && w.mtn >= 0) {
        const c = `${this.roomId}/r${pad(w.mtn, 2)}`;
        if (z.cur !== c && z.clips.has(c)) { z.play(c, 0, false); z.root.position.set(w.px, w.py, w.pz); z.heading = w.ay; z.root.rotation.y = w.ay; z.update(0); }
      }
    }
    const sig = vm.wal.map((a) => a.flg & 1).join('');
    if (sig !== this.wallSig) { this.wallSig = sig; r.syncWalls((i) => !!(vm.wal[i] && vm.wal[i].flg & 1)); }
  }
  private inBox(a: Atr, x: number, z: number) { return x >= Math.min(a.x, a.x + a.w) && x <= Math.max(a.x, a.x + a.w) && z >= Math.min(a.z, a.z + a.d) && z <= Math.max(a.z, a.z + a.d); }
  /** facing quadrant bit of the ATR attr (0x400 / 0x800 / 0x1000 / 0x2000 exclude a facing direction) */
  private quadBit() {
    const a = (Math.round(this.player.heading / (Math.PI * 2) * 65536) + 8192) & 0xc000;
    return a === 0x8000 ? 0x400 : a === 0x4000 ? 0x800 : a === 0 ? 0x1000 : 0x2000;
  }
  /** bhCheckFloorP: floor areas under / in front of the player */
  private floorCheck() {
    const vm = this.vm, P = this.player, f = P.forward(), q = this.quadBit();
    vm.cb &= ~(0x200 | 0x8000000);
    for (let i = 0; i < vm.flr.length; i++) {
      const a = vm.flr[i]; if (!(a.flg & 1) || a.type !== 0) continue;
      let hit: boolean;
      if (a.attr & 1) hit = this.inBox(a, P.pos.x + f.x * 0.6, P.pos.z + f.z * 0.6) && !(a.attr & q);
      else hit = this.inBox(a, P.pos.x, P.pos.z);
      if (hit) { vm.cb |= 0x200; vm.flr_idx = i; }
    }
  }
  /** bhCheckExmAtari: the action button against the trigger records */
  private examine() {
    const vm = this.vm, P = this.player, f = P.forward(), q = this.quadBit();
    vm.cb &= ~0x100;
    for (let i = 0; i < vm.etc.length; i++) {
      const a = vm.etc[i]; if (!(a.flg & 1)) continue;
      const d = EXM_DIST[a.type] ?? 0.45;
      if (!this.inBox(a, P.pos.x + f.x * d, P.pos.z + f.z * d) || (a.attr & q)) continue;
      vm.cb |= 0x100; vm.etc_idx = i;
      if (a.type === 0) this.door(0, a.prm[0], a.prm[1], a.prm[2]);
      else if (a.type === 3) { if (a.attr & 0x8000) this.showMessage(a.prm[1], true); }
      else if (a.type === 4 && !(a.attr & 2)) {
        const k = a.prm[0], it = this.room!.data.items[k], w = vm.works.get('3:' + k);
        if (it && !w?.gone) { vm.sb_id = it.id; this.itemScreen(); }
      }
      return true;
    }
    return false;
  }
  /** item use from the inventory (ItemUse / Use_05): only inside a floor area that accepts the item */
  private useItem(id: number): boolean {
    const vm = this.vm;
    if (!(vm.cb & 0x200)) return false;
    const a = vm.flr[vm.flr_idx]; if (!a || !a.prm.includes(id)) return false;
    vm.sb_id = id; vm.cb |= 0x400;
    this.toggleInv(false);
    return true;
  }
  private roomMessage(idx: number) { return this.room?.data.messages[idx] ?? ''; }
  /** message box for a room message; the result goes back to the scripts */
  private showMessage(idx: number, fromExamine: boolean) {
    const m = this.roomMessage(idx), pg = pages(m, this.vm.sb_id), ch = hasChoice(m);
    if (!fromExamine) { /* bhSetMessage from a script: the VM already set its flags */ }
    else this.vm.st |= 0x200 | 0x2000;
    if (!pg.length) { queueMicrotask(() => this.vm.messageClosed(-1, fromExamine)); return; }
    this.msg.show(pg, ch ? [UI.yes(), UI.no()] : undefined).then((sel) => this.vm.messageClosed(ch ? sel : -1, fromExamine));
  }
  /** item screen (subscreenmode 8): "Take the X?" -> cb 0x800 */
  private async itemScreen() {
    const vm = this.vm, id = vm.sb_id;
    const auto = !!(vm.cb & 0x4000); vm.cb &= ~(0x10 | 0x4000);
    this.dialog = true;
    try {
      if (!auto) { const c = await this.msg.show(pages(SYSMES[157], id), [UI.yes(), UI.no()]); if (c !== 0) { vm.cb &= ~0x8000; return; } }
      let count = id === BULLETS || id === HANDGUN ? MAG : 1;
      if (vm.cb & 0x8000 && id === HANDGUN) count -= 3;
      if (!this.inv.add(id, ITEM_NAMES[id] ?? '', count)) { vm.cb &= ~0x8000; await this.msg.show(pages(SYSMES[154])); return; }
      vm.cb |= 0x800;
      this.audio.se('pickup');
      if (vm.cb & 0x8000 && id === HANDGUN) { this.invScreen.equipped = HANDGUN; this.invScreen.onEquipChange!(); }
      vm.cb &= ~0x8000;
      await this.msg.show(pages(SYSMES[158], id));
    } finally { this.dialog = false; }
  }
  /** one 30 Hz frame of the event system */
  private evtFrame() {
    const vm = this.vm;
    this.syncPlayerWork();
    this.floorCheck();
    vm.tick();
    this.applyWorks();
    if (vm.cb & 0x10 && !this.dialog) this.itemScreen();
    if (vm.cb & 0x200000) { vm.cb &= ~0x200000; this.saveScreen(); }
    if (!(vm.st & 4)) this.cam.forced = null;
  }
  private get inCine() { const w0 = this.vm.works.get('0:0'); return !!(this.vm.st & 4) || !!w0?.scripted || !!w0?.gone; }

  // ---- EvtHost
  hasItem(id: number) { return this.inv.has(id); }
  loseItem(id: number) { const i = this.inv.slots.findIndex((s) => s?.id === id); if (i >= 0) this.inv.slots[i] = null; if (this.invScreen.equipped === id) this.invScreen.equipped = null; if (this.invScreen.standard === id) this.invScreen.standard = null; this.invScreen.onEquipChange!(); }
  weapon() { const s = this.invScreen.standard; if (s === LIGHTER) return 1; return WPN_NO[this.invScreen.equipped ?? -1] ?? 0; }
  setWeapon(n: number) {
    const id = Object.keys(WPN_NO).map(Number).find((k) => WPN_NO[k] === n);
    if (id === LIGHTER) { if (this.inv.has(LIGHTER)) { this.invScreen.standard = LIGHTER; this.invScreen.equipped = null; } }
    else if (id !== undefined) { if (this.inv.has(id)) { this.invScreen.equipped = id; this.invScreen.standard = null; } }
    else { this.invScreen.equipped = null; this.invScreen.standard = null; }
    this.invScreen.onEquipChange!();
  }
  message(idx: number) { this.showMessage(idx, false); }
  fade(argb: number, speed: number) { this.ui.fade((argb >>> 24) >= 0x80, Math.max(1, speed) * 1000 / 30); }
  cine(mode: number) { if (mode === 1 || mode === 2 || mode === 4) this.cam.forced = null; }
  /** CAMSET kind 0 = event camera (evc data, not converted yet): the room's own cameras stay active; kind 1 = back to the room cameras */
  camSet(_kind: number, _a: number) { this.cam.forced = null; }
  door(_attr: number, stg: number, room: number, pos: number) { this.pendingDoor = { stg, room, pos }; }
  movie(no: number) {
    this.movieOn = true;
    playMovie(this.ui.stage, `mv_${pad(no, 3)}`).finally(() => { this.movieOn = false; });
  }
  moviePlaying() { return this.movieOn; }
  playerHp() { return this.player.hp; }
  log(s: string) { if (this.debug) console.log(s); }

  private async goDoor(d: { stg: number; room: number; pos: number }) {
    const id = `rm_${d.stg}${pad(d.room, 2)}${this.vm.rcase}`;
    this.busy = true;
    try {
      if (!ROOMS.has(id)) {
        // not converted: the scripts stay in this room
        this.vm.sp = 0xffffffff; this.vm.cb &= ~1;
        await this.escaped(id);
        return;
      }
      this.audio.se('door');
      await this.enterRoom(id, d.pos, undefined, true, 1400);
      this.audio.se('doorClose');
    } finally { this.busy = false; }
  }
  /** typewriter (cb 0x200000 from the rm_0010 script): the save screen uses one ink ribbon */
  private async saveScreen() {
    this.busy = true;
    try {
      if (!this.inv.take(31)) return;
      this.audio.se('typewriter');
      this.save();
      await this.msg.raw([UI.saved()]);
    } finally { this.busy = false; }
  }
  save() {
    const p = this.player.pos;
    const s: SaveData = { hp: this.player.hp, room: this.roomId, pos: this.vm.pos_no, x: p.x, y: p.y, z: p.z, h: this.player.heading, inv: this.inv.slots, eq: this.invScreen.equipped, std: this.invScreen.standard, evt: { f: this.vm.f, rcase: this.vm.rcase }, t: this.playTime };
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
    const f = new THREE.Vector2(d.x, d.z).normalize(); let best: Zombie | Dog | null = null, bd = 12;
    for (const z of [...this.zombies, ...this.dogs]) {
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
  dogs: Dog[] = [];
  /** dog bite in progress (Claire d00/d05, fatal d03/d04) */
  dogBite: { z: Dog; t: number; front: boolean; dead: boolean } | null = null;
  /** zombie bite in progress (Claire z00/z01 + zombie m00, then z02/z03 push-off) */
  grab: { z: Zombie; t: number; front: boolean; phase: 'bite' | 'push' | 'dead'; hurt: boolean } | null = null;
  hitZombie(z: Zombie | Dog, dmg: number) {
    z.hit(dmg);
    // the scripts' DieCk turns this into the enemy's ed flag (the enemy stays dead)
    if (!z.alive) this.vm.work(1, z.index).dead = true;
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
  private startDogBite(z: Dog) {
    const P = this.player, p = P.root.position, zp = z.root.position;
    const front = P.forward().dot(new THREE.Vector3(zp.x - p.x, 0, zp.z - p.z)) >= 0;
    P.heading = front ? Math.atan2(-(zp.x - p.x), -(zp.z - p.z)) : Math.atan2(-(p.x - zp.x), -(p.z - zp.z));
    P.root.rotation.y = P.heading;
    this.player.hp -= 30; this.audio.se('bite');
    const dead = this.player.hp <= 0;
    P.playSync(dead ? (front ? 'd03' : 'd04') : (front ? 'd00' : 'd05'));
    z.set(dead ? 'idle' : 'recoil');
    this.dogBite = { z, t: 0, front, dead };
  }
  private updateDogBite(dt: number) {
    const b = this.dogBite!; b.t += dt;
    if (!b.dead && b.t >= 1.0) { this.player.playSync(null); this.dogBite = null; }
    else if (b.dead && b.t >= 2.6) { this.dogBite = null; this.gameOver(); }
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
  /** door to a room that is not converted: the ported part ends here */
  async escaped(id: string) {
    await this.ui.fade(true, 600);
    await this.msg.raw(LANG === 'ru'
      ? [`Дверь ведёт в ${id}.`, 'Эта часть игры\nпока не перенесена.']
      : [`The door leads to ${id}.`, 'This area is\nnot ported yet.']);
    await this.ui.fade(false, 600);
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
    const cine = this.inCine;
    if (this.msg.active) {
      this.msg.update(dt, inp.action, inp.hit('KeyA', 'ArrowLeft'), inp.hit('KeyD', 'ArrowRight'), inp.cancel);
      this.player.frozen = true;
    } else if (this.invOpen) {
      this.player.frozen = true;
      if (!this.invScreen.update(dt)) this.invOpen = false;
    } else if (this.busy || this.dialog) this.player.frozen = true;
    else if (cine) {
      this.player.frozen = true;
      // event skip (START in the original): the scripts check cb bit 0x10000000
      if (this.vm.cb & 4 && inp.hit('Escape', 'Enter', 'Space')) this.vm.cb |= 0x10000000;
    } else {
      this.player.frozen = false;
      if (this.player.sync) { /* grabbed */ }
      else if (inp.inventory) this.toggleInv(true);
      else if (inp.camToggle) this.toggleCamera();
      else if (inp.action && !this.player.aiming) this.examine();
    }
    if (this.room) {
      // event scripts at the original 30 Hz (paused while the inventory is open or a room loads)
      if (!this.invOpen && !this.busy) {
        this.evtAcc = Math.min(this.evtAcc + dt, 0.25);
        while (this.evtAcc >= 1 / 30 && !this.busy) { this.evtAcc -= 1 / 30; this.evtFrame(); }
      }
      if (this.pendingDoor && !this.busy) { const d = this.pendingDoor; this.pendingDoor = null; this.goDoor(d); }
      const sh = this.cam.mode === 'behind';
      if (sh && !this.player.frozen) {
        // mouse (pointer lock) or ←/→ turn the over-the-shoulder camera; the fixed cameras cannot be moved
        const sens = 0.0024 * (this.player.aiming ? 0.6 : 1);
        this.cam.look(inp.mdx * sens + ((inp.camR ? 1 : 0) - (inp.camL ? 1 : 0)) * 2.2 * dt, inp.mdy * sens);
      }
      this.cam.zoom += ((sh && this.player.aiming ? 1 : 0) - this.cam.zoom) * Math.min(1, dt * 10);
      this.player.update(dt, inp, this.room, sh ? this.cam.yaw : null);
      if (!this.msg.active && !this.invOpen && !this.inCine && !(this.busy && !this.grab)) {
        if (this.grab) this.updateGrab(dt);
        if (this.dogBite) this.updateDogBite(dt);
        const free = !this.grab && !this.dogBite && !this.player.sync && this.player.hp > 0;
        for (const z of this.zombies) {
          if (this.vm.works.get('1:' + z.index)?.scripted) { z.update(dt); continue; }
          if (z.state === 'bite' && this.grab?.z !== z) z.set('walk');
          if (z.tick(dt, this.player.root.position, free, this.room) && !this.grab && free) this.startGrab(z);
        }
        for (const z of this.dogs) {
          if (this.vm.works.get('1:' + z.index)?.scripted) { z.update(dt); continue; }
          if (z.tick(dt, this.player.root.position, free && !this.grab && !this.dogBite, this.room) && !this.grab && !this.dogBite && free) this.startDogBite(z);
        }
      }
      this.cam.update(this.player.pos, this.player.headPos(), this.player.heading, false, dt);
      this.audio.footsteps(this.player.state, dt);
    }
    this.ui.hud.style.display = this.debug ? 'block' : 'none';
    if (this.debug && this.room) {
      const p = this.player.pos, vm = this.vm;
      const tasks = vm.tasks.map((t, i) => (t.status ? `${i}:e${t.script - 2}` : '')).filter(Boolean).join(' ');
      this.ui.hud.textContent = `${this.roomId} cam ${this.cam.mode === 'behind' ? 'behind' : this.cam.index + (this.cam.forced !== null ? ' (event ' + this.cam.forced + ')' : this.cam.usingFallback ? ' (fallback)' : '')}\npos ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${p.z.toFixed(2)} h ${(this.player.heading * 180 / Math.PI).toFixed(0)}°\nevt cb ${(vm.cb >>> 0).toString(16)} st ${(vm.st >>> 0).toString(16)} etc ${vm.etc_idx} flr ${vm.cb & 0x200 ? vm.flr_idx : '-'} tasks ${tasks}`;
    }
  }
}
