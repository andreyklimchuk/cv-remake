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
import { Zombie, Dog, EnemyModel } from './enemy';
import { Face } from './face';
import type { Evc } from './evcam';
import { EvtVM, atrFrom, newFlags, type EvtFlags, type EvtHost, type Atr } from './evt';
import { loadJSON, loadGLTF, toLambert } from './assets';
import { ITEM_NAMES, SYSMES } from './sysmes';
import { playMovie } from './movie';
import { Effects } from './effects';
import { RoomLights, patchLightShader } from './light';
patchLightShader();
// colours are used as stored (gamma space, like the console) - no sRGB <-> linear conversions
THREE.ColorManagement.enabled = false;

export interface SaveData { hp?: number; room: string; pos?: number; x: number; y: number; z: number; h: number; inv: any[]; eq?: number | null; std?: number | null; evt?: { f: EvtFlags; rcase: number }; t: number }
/** rooms converted from the PS3 data (room file = rm_<stage><room><case>) */
const ROOMS = new Set(['rm_0000', 'rm_0010', 'rm_0020', 'rm_0021', 'rm_0030', 'rm_0031', 'rm_0040', 'rm_0050', 'rm_0060', 'rm_0070', 'rm_0080', 'rm_0090', 'rm_0160']);
/** converted zombie models en01aNN (NN = model variant byte of the enemy record) */
const NPC_MODELS = new Set(['en91a00', 'en93a00', 'en98a00']);
const ZOMBIE_VARIANTS = new Set([0, 1, 2, 9, 10, 32, 33]);
/** en01_PersonalType add_atk per model variant */
const EN01_ADD_ATK: Record<number, number> = { 0: 0, 1: 5, 2: 5, 9: 0, 10: 0, 32: 5, 33: 8 };
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
  fx = new Effects();
  /** light.c: room / event light tables and ambient */
  lights = new RoomLights();
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
    // the original lights in the stored texture space (no sRGB decode / encode), see assets.toLambert
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.ui.stage.prepend(this.renderer.domElement);
    // effect 2D layer (bhEff2D / cinema bars) above the 3D view, below messages and the fade
    this.fx.layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:4;overflow:hidden'; this.fx.lang = LANG;
    this.renderer.domElement.after(this.fx.layer);
    this.msg = new MessageBox(this.ui.msg);
    this.msg.onCursor = () => this.audio.se('cursor');
    this.vm = new EvtVM(this);
    this.invScreen = new InventoryScreen(this.ui.inv, this.inv, this.input, this.audio, this.player);
    this.invScreen.onEquipChange = () => { this.player.setLighter(this.invScreen.standard === LIGHTER); this.player.setKnife(this.invScreen.equipped === KNIFE); this.player.setGun(this.invScreen.equipped === HANDGUN); };
    this.invScreen.onUseItem = (id) => this.useItem(id);
    this.scene.background = new THREE.Color(0);
    this.scene.add(this.lights.group, this.player.root, this.fx.group);
    this.lights.lockFn = (f, n, l, o) => this.lockPos(f, n, l, o);
    addEventListener('resize', () => this.resize());
    this.resize();
    const cm = localStorage.getItem('cvx.cam'); if (cm === 'behind') this.cam.mode = 'behind';
    this.player.onSlash = (p) => this.onSlash(p);
    const gun = () => this.inv.slots.find((s) => s?.id === HANDGUN);
    this.player.canFire = () => (gun()?.count ?? 0) > 0;
    this.player.emptyClick = () => this.audio.se('empty');
    this.player.onStep = (foot, type) => { const p = foot ? this.bonePos(0, 0, foot === this.player.bones.b17 ? 17 : 21) : this.player.pos.clone(); this.audio.foot(this.floorSound(p), type === 1, p, 0); };
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
      this.player.hp = save.hp ?? 160;
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
    const [r, ev] = await Promise.all([Room.load(id), loadJSON<{ scripts: string[]; evc?: Evc[] }>(`evt/${id}.json`).catch(() => ({ scripts: [] as string[] }))]);
    await r.placeItems();
    this.room = r; this.roomId = id;
    for (const z of [...this.zombies, ...this.dogs]) this.scene.remove(z.root);
    for (const n of this.actors) this.scene.remove(n);
    for (const c of this.chars) this.scene.remove(c.m.root);
    this.chars = [];
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
    this.audio.room(vm.stg, vm.room, vm.rcase); this.audio.listener = this.cam.cam;
    this.fx.floors = vm.flr; await this.fx.load(id);
    this.lights.setRoom(r.data.lgt, r.data.evl, r.data.amb);
    vm.init(ev.scripts);
    await this.spawnEnemies(r);
    this.applyWorks();
    this.scene.add(r.group);
    this.cam.setRoom(r); this.cam.ev.setRoom((ev as { evc?: Evc[] }).evc ?? []); this.cam.lockFn = (f, n, o, l) => this.lockPos(f, n, l, o);
    this.player.root.updateMatrixWorld(true);
    this.cam.update(this.player.pos, this.player.headPos(), this.player.heading, true);
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
      const ex = e.ex ?? '000000000000', type = parseInt(ex.slice(0, 4), 16), variant = parseInt(ex.slice(6, 8), 16);
      if (e.id === 1) {
        if (!ZOMBIE_VARIANTS.has(variant)) { console.info(`${this.roomId}: zombie ${i} model en01a${pad(variant, 2)} not converted`); continue; }
        // graveyard zombies (behaviour type 0 in rm_002x) lie in the ground and climb out
        const lying = type === 0 && this.roomId.startsWith('rm_002');
        const z = new Zombie(i); z.mdlver = variant;
        await z.init(`enemies/en01a${pad(variant, 2)}.glb`, e.pos[0], e.pos[1], e.pos[2], lying ? (e.rot[1] ?? 0) : (e.rot[2] ?? 0), lying);
        this.zombies.push(z); this.scene.add(z.root);
        const vm = this.vm;
        this.npcs.push({ root: z.root, get hittable() { return z.root.visible && z.hittable && !vm.works.get('1:' + i)?.scripted; }, hit: () => this.hitZombie(z, 1) });
      } else if (e.id === 4) {
        const z = new Dog(i);
        await z.init('enemies/en04a00.glb', e.pos[0], e.pos[1], e.pos[2], e.rot[2] ?? 0);
        this.dogs.push(z); this.scene.add(z.root);
        this.npcs.push({ root: z.root, get hittable() { return z.root.visible && z.hittable; }, hit: () => this.hitZombie(z, 1) });
      } else if (NPC_MODELS.has(`en${pad(e.id, 2)}a${pad(variant, 2)}`)) {
        // cutscene characters (Rodrigo, Steve, ...): original model, driven by the room motions of the scripts
        const m = new EnemyModel(); await m.load(`npc/en${pad(e.id, 2)}a${pad(variant, 2)}.glb`);
        m.root.position.set(e.pos[0], e.pos[1], e.pos[2]); m.root.rotation.y = e.rot[1] ?? 0;
        { const w = this.vm.works.get('1:' + i); m.root.visible = !(w && (w.gone || w.hidden)); }
        const face = new Face(m.bones, 'b');
        this.chars.push({ index: i, m, face }); this.scene.add(m.root);
      } else if (e.id === 67) {
        // en67: cockroaches (10 sprites of the original non-skinned model at their stored offsets). Their own movement
        // routine (en67) is not in the decompilation, so they stay at the stored positions.
        const w = this.vm.works.get('1:' + i); if (w && (w.gone || w.hidden)) continue;
        const g = await loadGLTF('npc/en67a00.glb').catch(() => null); if (!g) continue;
        const o = g.scene.clone(true); toLambert(o, 'chr'); o.position.set(e.pos[0], e.pos[1], e.pos[2]); o.rotation.y = e.rot[1] ?? 0;
        this.actors.push(o); this.scene.add(o);
      } else console.info(`${this.roomId}: character en${pad(e.id, 2)} (enemy ${i}) not converted`);
    }
  }
  actors: THREE.Object3D[] = [];
  /** cutscene characters of the room record (index = enemy record index) */
  chars: { index: number; m: EnemyModel; face?: Face }[] = [];

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
      // room motion of the item model (MOTION kind 3): the clip carries the world placement relative to the work position
      if (w.mtnKind === 3 && w.mtn >= 0) this.nodeMotion(o, r.itemClips.get(i), w);
    }
    for (const [i, o] of r.objMeshes) {
      const w = vm.works.get('2:' + i); if (!w) continue;
      // objitm.c bhDrawObject: a linked object (flg 0x80) takes the model-hidden flag (stflg 0x1000000) of its parent
      const pw = w.link ? vm.works.get(`${w.link.kind}:${w.link.kind === 0 ? 0 : w.link.idx}`) : undefined;
      const gone = w.link ? !!pw?.gone : w.gone;
      o.visible = !gone && !w.hidden && (!r.outside.has(i) || !!w.link);
      if (w.posSet) { o.position.set(w.px, w.py, w.pz); w.posSet = false; }
      if (w.angSet) { o.rotation.set(w.ax, w.ay, w.az, 'ZYX'); w.angSet = false; }
    }
    // WORK 4 n: effect works moved by the script (metres here, game units = 0.1 m in O_WRK)
    for (const [k, w] of vm.works) if (w.kind === 4 && w.posSet) { this.fx.setPos(w.idx, w.px * 10, w.py * 10, w.pz * 10); w.posSet = false; }
    for (const c of this.chars) {
      const w = vm.works.get('1:' + c.index), m = c.m; if (!w) continue;
      m.root.visible = !w.gone && !w.hidden;
      if (w.posSet) { m.root.position.set(w.px, w.py, w.pz); w.posSet = false; }
      if (w.angSet) { m.root.rotation.set(w.ax, w.ay, w.az, 'ZYX'); w.angSet = false; }
      if (w.mtnKind === 1 && w.mtn >= 0) this.roomMotion(m, w);
    }
    for (const z of [...this.zombies, ...this.dogs]) {
      const w = vm.works.get('1:' + z.index); if (!w) continue;
      z.root.visible = !w.gone && !w.hidden;
      if (w.posSet) { if (w.px || w.py || w.pz) z.root.position.set(w.px, w.py, w.pz); w.posSet = false; }
      if (w.angSet) { z.heading = w.ay; z.root.rotation.y = w.ay; w.angSet = false; }
      // room motion (rmt, MOTION kind 1): the clip carries the world placement of the root
      if (w.mtnKind === 1 && w.mtn >= 0) {
        const c = `${this.roomId}/r${pad(w.mtn, 2)}`;
        if (z.cur !== c && z.clips.has(c)) { z.root.position.set(w.px, w.py, w.pz); z.heading = w.ay; z.root.rotation.y = w.ay; }
        this.roomMotion(z, w);
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
    // player.c: while an item is used the transient stflg bit 8 (the "acting" state) is set; the room
    // scripts gate their item reactions on it (e.g. bhUseItemCheck(82) for the extinguisher)
    vm.st |= 8; this.useT = 0.9;
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
  /** item screen (subscreenmode 8, GetItem): the status screen opens in "get" mode with the item model,
   * "Take the X?" in its message box -> cb 0x800 */
  private async itemScreen() {
    const vm = this.vm, id = vm.sb_id, S = this.invScreen;
    const auto = !!(vm.cb & 0x4000); vm.cb &= ~(0x10 | 0x4000);
    this.dialog = true; this.invOpen = true;
    try {
      await S.show(true, id);
      if (!auto) { const c = await S.say(pages(SYSMES[157], id), [UI.yes(), UI.no()]); if (c !== 0) { vm.cb &= ~0x8000; return; } }
      let count = id === BULLETS || id === HANDGUN ? MAG : 1;
      if (vm.cb & 0x8000 && id === HANDGUN) count -= 3;
      if (!this.inv.canAdd(id)) {
        vm.cb &= ~0x8000;
        // recovery items can be used on the spot (message 153), anything else: 154
        if (id === 20 || id === 21 || id === 23) {
          const c = await S.say(pages(SYSMES[153]), [UI.yes(), UI.no()]);
          if (c === 0) { S.heal(id); vm.cb |= 0x800; S.refresh(); }
        } else await S.say(pages(SYSMES[154]));
        return;
      }
      this.inv.add(id, ITEM_NAMES[id] ?? '', count);
      vm.cb |= 0x800;
      if (vm.cb & 0x8000 && id === HANDGUN) { S.equipped = HANDGUN; S.standard = null; S.onEquipChange!(); } // one weapon slot: the lighter is put away
      vm.cb &= ~0x8000;
      S.refresh();
      await S.say(pages(SYSMES[158], id));
    } finally { await S.show(false); this.invOpen = false; this.dialog = false; }
  }
  /** bhGetEvtCamLockPosition: point of a character / object (local offset l) the event camera looks at */
  private lockPos(f: number, n: number, l: [number, number, number], ono = 0): THREE.Vector3 | null {
    const r = this.room!; let o: THREE.Object3D | undefined;
    if (f === 6) { const s = r.data.spawns[n] ?? r.data.spawns[0]; return s ? new THREE.Vector3(s.pos[0] + l[0], s.pos[1] + l[1], s.pos[2] + l[2]) : null; }
    if (f === 1) o = this.player.root;
    else if (f === 2) o = this.chars.find((c) => c.index === n)?.m.root ?? [...this.zombies, ...this.dogs].find((z) => z.index === n)?.root;
    else if (f === 3) o = r.objMeshes.get(n);
    else if (f === 4) { o = r.itemMeshes.get(n); o = o?.getObjectByName('n000') ?? o; }
    if (!o) return null;
    // lkono > 0: offset in the space of that bone (njCalcPoint(owP[lkono].mtx, l)); bone numbering as boneObj
    if (ono > 0 && f <= 4) { const b = this.boneObj(f - 1, n, ono); if (b && b !== o) o = b; }
    o.updateWorldMatrix(true, false);
    const m = o.matrixWorld.clone(), sc = new THREE.Vector3().setFromMatrixScale(m);
    m.multiply(new THREE.Matrix4().makeScale(1 / sc.x, 1 / sc.y, 1 / sc.z));
    return new THREE.Vector3(l[0], l[1], l[2]).applyMatrix4(m);
  }
  /** room motion (rmt) of a scripted character: clip time = the work's frame counter (frm_no, 16.16) */
  private roomMotion(m: EnemyModel, w: { mtn: number; frm: number }) {
    const c = `${this.roomId}/r${pad(w.mtn, 2)}`;
    if (!m.clips.has(c)) return;
    if (m.cur !== c) { const a = m.play(c, 0, false); if (a) a.paused = true; }
    const a = m.action; if (!a) return;
    a.time = Math.min(w.frm / 65536 / 30, a.getClip().duration); m.mixer.update(0);
  }
  private mixers = new WeakMap<THREE.Object3D, { mixer: THREE.AnimationMixer; cur: string; action: THREE.AnimationAction | null }>();
  /** rmt clip on a plain node hierarchy (items): time = frm_no (16.16) */
  private nodeMotion(o: THREE.Object3D, clips: THREE.AnimationClip[] | undefined, w: { mtn: number; frm: number }) {
    const name = `${this.roomId}/r${pad(w.mtn, 2)}`, clip = clips?.find((c) => c.name === name); if (!clip) return;
    let m = this.mixers.get(o); if (!m) { m = { mixer: new THREE.AnimationMixer(o), cur: '', action: null }; this.mixers.set(o, m); }
    if (m.cur !== name) { m.mixer.stopAllAction(); m.action = m.mixer.clipAction(clip); m.action.setLoop(THREE.LoopOnce, 1); m.action.clampWhenFinished = true; m.action.play(); m.action.paused = true; m.cur = name; }
    m.action!.time = Math.min(w.frm / 65536 / 30, clip.duration); m.mixer.update(0);
  }
  /** one 30 Hz frame of the event system */
  private evtFrame() {
    const vm = this.vm;
    this.faces(1 / 30);
    this.syncPlayerWork();
    this.floorCheck();
    vm.tick();
    this.fx.update(this.cam.cam);
    this.cam.ev.step();
    this.applyWorks();
    this.lightFrame();
    if (vm.cb & 0x10 && !this.dialog) this.itemScreen();
    if (vm.cb & 0x200000) { vm.cb &= ~0x200000; this.saveScreen(); }
  }
  /** facial animation: the mouth follows the running voice line, the eyes blink (bhLipSet) */
  private faces(dt: number) {
    const v = this.audio.voiceLevel();
    this.player.talk = v;
    this.player.pain = this.grab ? 1 : this.dogBite ? 1 : Math.max(0, this.player.pain - dt);
    for (const c of this.chars) c.face?.update(dt, v);
  }
  /** bhControlLight (30 Hz): event light table while the event camera runs; player.c lights lgtp[1] while the lighter is equipped */
  private lightFrame() {
    this.lights.event = this.cam.ev.active;
    this.lights.lighter(this.weapon() === 1 && this.player.root.visible);
    this.player.root.updateMatrixWorld(true);
    this.hideFrame();
    this.lights.frame();
  }
  /** hide masks of the current camera (cut.c bhSetHideObjLgt / bhSetEventHideObjLgt): room objects and lights */
  private hidSig = '';
  private hideFrame() {
    const r = this.room; if (!r) return;
    const ev = this.cam.ev; let k: { hid?: number[]; hidl?: number[] } | undefined;
    if (ev.active) k = ev.evc[ev.no]?.keys[Math.min(ev.key, (ev.evc[ev.no]?.keys.length ?? 1) - 1)];
    else if (this.cam.shown >= 0) k = r.data.cameras[this.cam.shown];
    const sig = `${r.data.id}|${ev.active}|${k?.hid?.join(',')}|${k?.hidl?.join(',')}`; if (sig === this.hidSig) return; this.hidSig = sig;
    r.setHidden(k?.hid ?? []); this.lights.hide(ev.active, k?.hidl ?? []);
  }
  /** light commands of the scripts (bhLightSet / bhLightTypeSet / bhLightParameterSet / bhEffAmbSet) */
  light(cmd: string, a: number[]) {
    const L = this.lights;
    if (cmd === 'set') L.set(a[0], a[1], a[2]);
    else if (cmd === 'type') L.type(a[0], a[1], a[2]);
    else if (cmd === 'param') L.param(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
    else if (cmd === 'amb') L.setAmb(a[0], a[1], a[2], a[3]);
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
  camSet(kind: number, a: number, b: number) { if (kind === 0) this.cam.ev.start(a, b); else this.cam.ev.stop(); }
  camFix(kind: number, a: number) { this.cam.forced = kind === 0 ? a : null; }
  camPause(on: boolean) { this.cam.ev.paused = on; }
  camInit() { this.cam.ev.stop(); this.cam.forced = null; }
  door(_attr: number, stg: number, room: number, pos: number) { this.pendingDoor = { stg, room, pos }; }
  movie(no: number) {
    this.movieOn = true;
    // PlayStartMovieEx: StopBgm(0); StopVoice(0)
    this.audio.bgmOff(0); this.audio.voiceOff(0);
    playMovie(this.ui.stage, `mv_${pad(no, 3)}`).finally(() => { this.movieOn = false; });
  }
  moviePlaying() { return this.movieOn; }
  eff(cmd: 'disp' | 'mode' | 'yure', a: number, v: number) { if (cmd === 'disp') this.fx.disp(a, v); else if (cmd === 'mode') this.fx.mode(a, v); else this.fx.yure(a, v); }
  /** script bone number -> node: the player model uses the original numbering; the cutscene NPC models (27 nodes)
   *  lack the face parts 6..14 (-> head 5) so their bones >= 15 are node - 4 (18 / 22 = wrists) */
  private boneObj(kind: number, idx: number, bone: number): THREE.Object3D | undefined {
    if (kind === 0) return this.player.bones['b' + pad(bone, 2)] ?? this.player.root;
    if (kind === 1) {
      const c = this.chars.find((q) => q.index === idx);
      if (c) { const n = bone <= 5 ? bone : bone < 15 ? 5 : bone - 4; return c.m.bones['b' + pad(n, 2)] ?? c.m.root; }
      const z = [...this.zombies, ...this.dogs].find((q) => q.index === idx);
      return z ? z.bones['b' + pad(bone, 2)] ?? z.root : undefined;
    }
    if (kind === 2) return this.room?.objMeshes.get(idx);
    if (kind === 3) return this.room?.itemMeshes.get(idx);
    return undefined;
  }
  private bonePos(kind: number, idx: number, bone: number): THREE.Vector3 | undefined {
    const o = this.boneObj(kind, idx, bone); if (!o) return undefined;
    o.updateWorldMatrix(true, false); return new THREE.Vector3().setFromMatrixPosition(o.matrixWorld);
  }
  /** bhCheckFloorSound: FLR records (flg 1, type 1) give the floor sound type (prm0) under a point */
  floorSound(p?: THREE.Vector3) {
    if (!p) return 0; let sno = 0;
    for (const a of this.vm.flr) if (a.flg & 1 && a.type === 1 && !(a.attr & 1) && this.inBox(a, p.x, p.z) && a.prm[0] <= 4) sno = a.prm[0]; // FootDef has 5 entries (rm_0020 uses 82 near the car)
    return sno;
  }
  /** ObjLinkSet* / PlyItem: linked objects and items follow their bone (MdlPut.c: bone matrix * T(lo) * R(object)) */
  private linkM = new THREE.Matrix4(); private linkT = new THREE.Matrix4(); private linkR = new THREE.Matrix4();
  private linkBase = new Map<THREE.Object3D, { pos: THREE.Vector3; rot: THREE.Euler; scale: THREE.Vector3 }>();
  private updateLinks() {
    const r = this.room; if (!r) return;
    for (const [k, w] of this.vm.works) {
      if (w.kind !== 2 && w.kind !== 3) continue;
      const o = (w.kind === 2 ? r.objMeshes : r.itemMeshes).get(w.idx); if (!o) continue;
      if (!w.link) { const bs = this.linkBase.get(o); if (bs) { o.position.copy(bs.pos); o.rotation.copy(bs.rot); o.scale.copy(bs.scale); this.linkBase.delete(o); } continue; }
      const b = this.boneObj(w.link.kind, w.link.idx, w.link.bone); if (!b || b === o) continue;
      let base = this.linkBase.get(o); if (!base) { base = { pos: o.position.clone(), rot: o.rotation.clone(), scale: o.scale.clone() }; this.linkBase.set(o, base); }
      b.updateWorldMatrix(true, false);
      this.linkT.makeTranslation(w.link.lo[0], w.link.lo[1], w.link.lo[2]);
      this.linkR.makeRotationFromEuler(base.rot).scale(base.scale);
      this.linkM.copy(b.matrixWorld).multiply(this.linkT).multiply(this.linkR);
      // undo the bone's own scale (models are in metres, the object keeps its 0.1 game-unit scale)
      const bs = new THREE.Vector3().setFromMatrixScale(b.matrixWorld);
      this.linkM.multiply(new THREE.Matrix4().makeScale(1 / bs.x, 1 / bs.y, 1 / bs.z));
      if (o.parent) { o.parent.updateWorldMatrix(true, false); this.linkM.premultiply(new THREE.Matrix4().copy(o.parent.matrixWorld).invert()); }
      this.linkM.decompose(o.position, o.quaternion, o.scale);
      void k;
    }
  }
  /** sound commands of the event scripts */
  snd(cmd: string, a: number[], w?: { kind: number; idx: number } | null) {
    const A = this.audio;
    switch (cmd) {
      case 'bgm': A.bgm(a[0], a[1], a[2]); break;
      case 'bgm2': A.bgm(a[0], 100, a[1]); break;
      case 'bgmOff': A.bgmOff(a[0]); break;
      case 'voice': A.voice(a[0], a[1] === 1 ? a[2] : 0); break;
      case 'voiceOff': A.voiceOff(a[0]); break;
      case 'se': A.eventSe(a[0], a[3], a[4] === 0 ? this.bonePos(a[1], a[2], 0) : undefined); break;
      case 'seOff': A.eventSeOff(a[0]); break;
      case 'bgSe': A.bgSe(a[0], a[1], a[2]); break;
      case 'bgSeOff': A.bgSeOff(a[0], a[1] * 0.3); break;
      case 'objSe': A.objSe(a[0], new THREE.Vector3(a[1], a[2], a[3]), a[4]); break;
      case 'objSeOff': A.objSeOff(a[0]); break;
      case 'foot': { // bhFootSeCall: [flag (0 = on), id, type, bone] of the task's character
        if (!w || a[0] !== 0) break;
        const p = this.bonePos(w.kind, w.idx, a[3]); A.foot(this.floorSound(p), a[2] === 1, p, Math.min(2, a[1])); break;
      }
      case 'easy': { // bhEasySESet
        const [type, slot, sv, lv, , , frame, floor, kind, idx, bone, seType, seNo] = a;
        const vol: [number, number, number] = [sv, lv, frame];
        const p = this.bonePos(kind, idx, bone);
        if (type === 7) A.eventSe(slot, seNo, undefined, vol);
        else if (type === 1) A.foot(floor, seType === 1, lv !== -1 ? undefined : p, Math.min(2, slot), vol);
        else if (type === 2) A.action(seNo, p);
        else if (type === 6) A.bgSe(slot, seNo);
        break;
      }
    }
  }
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
  async toggleInv(open: boolean) {
    if (open) { this.invOpen = true; await this.invScreen.show(true); }
    else if (this.invScreen.open) { await this.invScreen.show(false); this.invOpen = false; }
    else this.invOpen = false;
  }
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
  dogBite: { z: Dog; t: number; front: boolean; dead: boolean; hurt: boolean } | null = null;
  /** zombie bite in progress (Claire z00/z01 + zombie m00, then z02/z03 push-off) */
  grab: { z: Zombie; t: number; front: boolean; phase: 'hold' | 'bite' | 'push' | 'dead'; hurt: boolean; hurt2: boolean } | null = null;
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
    // en01.c bhEne01_PlyDG00: case 1 holds Claire (offset+6/+7 = z04/z05), case 2 is the bite
    // (offset+10/+11 = z08/z09), case 4 the push-off (offset+8/+9 = z06/z07), +12/+13 the fatal one.
    P.playSync(front ? 'z04' : 'z05');
    z.set('bite');
    this.grab = { z, t: 0, front, phase: 'hold', hurt: false, hurt2: false };
  }
  private startDogBite(z: Dog) {
    const P = this.player, p = P.root.position, zp = z.root.position;
    const front = P.forward().dot(new THREE.Vector3(zp.x - p.x, 0, zp.z - p.z)) >= 0;
    P.heading = front ? Math.atan2(-(zp.x - p.x), -(zp.z - p.z)) : Math.atan2(-(p.x - zp.x), -(p.z - zp.z));
    P.root.rotation.y = P.heading;
    // en04.c bhEne04_PlyDG00: case 0 holds Claire (offset+0/+5 = d00/d05), case 1 the bite (offset+1/+6),
    // case 3 the release (offset+2/+7); PlyDG01 (+3/+4 = d03/d04) is the fatal bite.
    P.playSync(front ? 'd00' : 'd05');
    z.set('bite'); // the dog hangs on (m20)
    this.dogBite = { z, t: 0, front, dead: false, hurt: false };
  }
  private updateDogBite(dt: number) {
    const b = this.dogBite!; b.t += dt;
    if (!b.hurt && b.t >= 0.4) {
      // the bite lands (en04.c: motion +1 sprays blood on frame 12)
      b.hurt = true; this.player.hp -= 12; this.audio.se('bite');
      if (this.player.hp <= 0) { b.dead = true; this.player.playSync(b.front ? 'd03' : 'd04'); }
      else this.player.playSync(b.front ? 'd01' : 'd06');
    }
    if (!b.dead && b.t >= 1.7) { this.player.playSync(null); b.z.set('recoil'); this.dogBite = null; }
    else if (b.dead && b.t >= 2.6) { this.dogBite = null; this.gameOver(); }
  }
  private updateGrab(dt: number) {
    const g = this.grab!; g.t += dt;
    if (g.phase === 'hold') {
      // the zombie's grab motion (m06) reaches out at frame 1: Claire is pulled in, then bitten
      if (g.t >= 0.35) { g.phase = 'bite'; g.t = 0; this.player.playSync(g.front ? 'z08' : 'z09', true); }
    } else if (g.phase === 'bite') {
      // en01.c bhEne01_NG00 case 2: the grab motion bites at frames 25 and 60 (10 + the variant's add_atk each)
      const dmg = 10 + (EN01_ADD_ATK[g.z.mdlver] ?? 0);
      if (!g.hurt && g.t * 30 >= 25) { g.hurt = true; this.player.hp -= dmg; this.audio.se('bite'); }
      if (!g.hurt2 && g.t * 30 >= 60) { g.hurt2 = true; this.player.hp -= dmg; this.audio.se('bite'); }
      if (g.t >= this.grabBiteLen) {
        g.t = 0;
        if (this.player.hp <= 0) { g.phase = 'dead'; this.player.playSync(g.front ? 'z10' : 'z11'); g.z.set('release'); }
        else { g.phase = 'push'; this.player.playSync(g.front ? 'z06' : 'z07'); g.z.set('release'); }
      }
    } else if (g.phase === 'push') {
      if (g.t >= 1.4) { this.player.playSync(null); this.grab = null; }
    } else if (g.phase === 'dead' && g.t >= 2.6) { this.grab = null; this.gameOver(); }
  }
  /** length of the zombie's grab motion m06 (68 frames, the second bite is at frame 60) */
  private grabBiteLen = 2.3;
  /** remaining time of the "using an item" state (stflg bit 8) */
  private useT = 0;
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
    this.render();
  }
  loop = () => {
    requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 1 / 10);
    this.step(dt);
    this.render();
    this.input.endFrame();
  };
  /** scene + effects; bhCamYureSet offsets the camera position (cam.ofx..ofz) */
  render() {
    const c = this.cam.cam, of = this.fx.of;
    c.position.x += of[0] * 0.1; c.position.y += of[1] * 0.1; c.position.z += of[2] * 0.1; c.updateMatrixWorld();
    this.fx.draw(c); this.fx.draw2D();
    this.renderer.render(this.scene, c);
    c.position.x -= of[0] * 0.1; c.position.y -= of[1] * 0.1; c.position.z -= of[2] * 0.1; c.updateMatrixWorld();
  }
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
      if (!this.invScreen.update(dt)) this.toggleInv(false);
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
        this.cam.evSub = this.evtAcc * 30;
      }
      if (this.useT > 0) { this.useT -= dt; if (this.useT <= 0) this.vm.st &= ~8; }
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
          const zw = this.vm.works.get('1:' + z.index);
          if (zw?.gone || zw?.hidden) continue;
          if (zw?.scripted) { z.update(dt); continue; }
          if (z.state === 'bite' && this.grab?.z !== z) z.set('walk');
          if (z.tick(dt, this.player.root.position, free, this.room) && !this.grab && free) this.startGrab(z);
        }
        for (const z of this.dogs) {
          const zw = this.vm.works.get('1:' + z.index);
          if (zw?.gone || zw?.hidden) continue;
          if (zw?.scripted) { z.update(dt); continue; }
          if (z.tick(dt, this.player.root.position, free && !this.grab && !this.dogBite, this.room) && !this.grab && !this.dogBite && free) this.startDogBite(z);
        }
      }
      this.cam.update(this.player.pos, this.player.headPos(), this.player.heading, false, dt);
      this.updateLinks();
      this.audio.update();
    }
    this.ui.hud.style.display = this.debug ? 'block' : 'none';
    if (this.debug && this.room) {
      const p = this.player.pos, vm = this.vm;
      const tasks = vm.tasks.map((t, i) => (t.status ? `${i}:e${t.script - 2}` : '')).filter(Boolean).join(' ');
      this.ui.hud.textContent = `${this.roomId} cam ${this.cam.mode === 'behind' ? 'behind' : this.cam.index + (this.cam.forced !== null ? ' (event ' + this.cam.forced + ')' : this.cam.usingFallback ? ' (fallback)' : '')}\npos ${p.x.toFixed(2)} ${p.y.toFixed(2)} ${p.z.toFixed(2)} h ${(this.player.heading * 180 / Math.PI).toFixed(0)}°\nevt cb ${(vm.cb >>> 0).toString(16)} st ${(vm.st >>> 0).toString(16)} etc ${vm.etc_idx} flr ${vm.cb & 0x200 ? vm.flr_idx : '-'} tasks ${tasks}`;
    }
  }
}
