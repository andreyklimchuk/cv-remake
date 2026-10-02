import * as THREE from 'three';
import type { Inventory } from '../inventory/Inventory';
import type { PlayerController } from '../player/PlayerController';
import type { PhysicsWorld, Collider } from '../../engine/Physics';
import { ITEMS, type ItemInstance } from '../inventory/Items';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';
import { glowTexture } from '../../engine/Materials';

/** What interactables may do to the game (kept narrow on purpose). */
export interface GameAPI {
  inventory: Inventory;
  player: PlayerController;
  physics: PhysicsWorld;
  flags: Set<string>;
  message(text: string, duration?: number): void;
  openSaveDialog(): void;
  openItemBox(): void;
  confirm(text: string, onYes: () => void): void;
  completeLevel(): void;
  /** Show an RE-style file (Docs.ts) and add it to the inventory "Files" tab. */
  readDoc(id: string): void;
  /** RE-style dial lock. `check` returns true when the combination is right. */
  codeLock(title: string, digits: number, check: (code: string) => boolean, onSolved: () => void): void;
  /** RE-style door transition: fade out, move the player (and camera) to `pos` facing `yaw`, fade in. */
  travel(pos: THREE.Vector3, yaw: number, sound?: 'metal' | 'wood'): void;
}

export interface Interactable {
  id: string;
  pos: THREE.Vector3;
  radius: number;
  enabled: boolean;
  prompt(g: GameAPI): string;
  interact(g: GameAPI): void;
  update?(dt: number, t: number): void;
}

const sparkleTex = glowTexture('rgba(255,250,220,1)', 'rgba(255,220,120,0)');

/** Pickup with the classic RE glint. */
export class ItemPickup implements Interactable {
  enabled = true;
  radius = 1.4;
  sparkle: THREE.Sprite;
  constructor(public id: string, public pos: THREE.Vector3, public defId: string, public qty: number, public mesh: THREE.Object3D, parent: THREE.Object3D, public extra?: Partial<ItemInstance>) {
    this.sparkle = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkleTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.5 }));
    this.sparkle.position.copy(pos).add(new THREE.Vector3(0, 0.12, 0));
    this.sparkle.scale.setScalar(0.1);
    mesh.position.copy(pos);
    mesh.traverse((o) => { o.castShadow = false; });
    parent.add(mesh, this.sparkle);
  }
  prompt(): string { return `Взять: ${ITEMS[this.defId].name}${this.qty > 1 ? ' ×' + this.qty : ''}`; }
  interact(g: GameAPI): void {
    if (ITEMS[this.defId].kind === 'pouch') {
      // Side Pack: applied on pickup (RE2R hip pouch), never occupies a slot
      g.inventory.expand(2);
      g.flags.add('pouch:' + this.id);
      audio.pickup();
      g.message(`Получено: ${ITEMS[this.defId].name}. Инвентарь расширен до ${g.inventory.capacity} слотов.`, 4);
      this.enabled = false; g.flags.add('picked:' + this.id);
      this.mesh.removeFromParent(); this.sparkle.removeFromParent();
      return;
    }
    const left = g.inventory.add(this.defId, this.qty, this.extra);
    if (left === this.qty) { g.message('Инвентарь полон. Освободите слот или оставьте предметы в сундуке.'); return; }
    audio.pickup();
    g.message(`Получено: ${ITEMS[this.defId].name}${this.qty - left > 1 ? ' ×' + (this.qty - left) : ''}`);
    if (left > 0) { this.qty = left; return; }
    this.enabled = false;
    g.flags.add('picked:' + this.id);
    this.mesh.removeFromParent();
    this.sparkle.removeFromParent();
  }
  update(_dt: number, t: number): void {
    // subtle RE glint: a small dim point with a short twinkle every ~2.5 s (was a big constantly pulsing flare)
    const ph = (t * 0.4 + this.pos.x * 0.37 + this.pos.z * 0.21) % 1;
    const tw = ph < 0.12 ? Math.sin((ph / 0.12) * Math.PI) : 0;
    this.sparkle.scale.setScalar(0.07 + tw * 0.11);
    this.sparkle.material.opacity = 0.35 + tw * 0.35;
    this.sparkle.material.rotation = t;
  }
}

/** A body that can push doors (player / enemies). `vel` = intended velocity (m/s). */
export interface DoorAgent { pos: THREE.Vector3; vel?: THREE.Vector3; radius: number; player?: boolean }

interface Leaf { pivot: THREE.Object3D; base: number; dir0: THREE.Vector2; width: number; a: number; w: number; y0: number; h: number }

export interface DoorOptions {
  /** called once when the door first opens (by walking into it or by E) */
  onOpen?: (g: GameAPI | null) => void;
  /** max swing either way (rad) */
  maxAngle?: number;
  /** text shown when the door is opened with E */
  openText?: string;
  /** door keeps physical collision with the leaf when open (default true) */
  sound?: 'wood' | 'metal';
}

/**
 * Physical hinged door (one or two leaves), RE-Engine style:
 * - walking into an unlocked door pushes it open, it swings *away* from whoever pushes it, either way;
 * - E still opens it (a firm push away from the player);
 * - once open, every leaf is a rotating segment: agents collide with it and push it with torque, the leaf has
 *   inertia, hinge friction and soft stops at ±maxAngle.
 * The closed-state AABB collider is removed on opening, so AI paths through (`doorsChanged`).
 */
export class Door implements Interactable {
  /** provided by World: everyone who can push doors this frame */
  static agents: () => DoorAgent[] = () => [];
  /** API for messages when a door is opened by walking (set by Game) */
  static api: GameAPI | null = null;
  enabled = true;
  radius = 1.8;
  open = false;
  leaves: Leaf[] = [];
  private pushT = 0;
  private bumpT = 0;
  private maxA: number;
  private creak = 0;
  private idleT = 0;
  private opened = false;
  /** seconds without anyone near before an open door swings shut by itself (door closer) */
  static closeDelay = 3.5;
  constructor(
    public id: string,
    public pos: THREE.Vector3,
    pivots: THREE.Object3D | THREE.Object3D[],
    public collider: Collider,
    public requires: string | null,
    public lockedText: string,
    _legacyOpenAngle = 0,
    private opts: DoorOptions = {},
  ) {
    this.maxA = opts.maxAngle ?? Math.PI * 0.53;
    this.collider.navPass = !requires;
    for (const pv of Array.isArray(pivots) ? pivots : [pivots]) {
      // leaf direction/width from its geometry (pivot = hinge)
      const base = pv.rotation.y;
      pv.updateMatrixWorld(true);
      const bb = new THREE.Box3().setFromObject(pv);
      const hp = new THREE.Vector3(); pv.getWorldPosition(hp);
      const c = bb.getCenter(new THREE.Vector3());
      const d = new THREE.Vector2(c.x - hp.x, c.z - hp.z);
      const width = Math.max(0.4, d.length() * 2);
      // store direction relative to the base rotation (so that dir(a) = rotY(dir0, a))
      this.leaves.push({ pivot: pv, base, dir0: d.normalize(), width, a: 0, w: 0, y0: hp.y, h: Math.max(1.8, bb.max.y - hp.y) });
    }
  }
  get locked(): boolean { return !!this.requires && !Door.flags?.has('unlocked:' + this.id); }
  static flags: Set<string> | null = null;
  prompt(g: GameAPI): string {
    if (this.open) return '';
    if (this.requires && !g.flags.has('unlocked:' + this.id)) return g.inventory.has(this.requires) ? `Использовать: ${ITEMS[this.requires].name}` : 'Осмотреть дверь';
    return 'Открыть дверь';
  }
  interact(g: GameAPI): void {
    if (this.open) return;
    if (this.requires && !g.flags.has('unlocked:' + this.id)) {
      if (!g.inventory.has(this.requires)) { g.message(this.lockedText); audio.click(); return; }
      g.flags.add('unlocked:' + this.id); this.collider.navPass = true;
      g.message(`Использовано: ${ITEMS[this.requires].name}. Замок открыт.`);
      if (this.requires === 'keycard') { const it = g.inventory.firstOf('keycard'); if (it) g.inventory.remove(it.uid); }
    }
    // firm push away from the player
    this.unlatch(g.player.pos, 3.2, g);
    if (this.opts.openText) g.message(this.opts.openText, 3.5);
  }
  /** world-space leaf direction at angle a */
  private dir(l: Leaf, a: number): THREE.Vector2 {
    const c = Math.cos(a), s = Math.sin(a);
    return new THREE.Vector2(l.dir0.x * c + l.dir0.y * s, -l.dir0.x * s + l.dir0.y * c);
  }
  private hinge(l: Leaf): THREE.Vector2 { const p = new THREE.Vector3(); l.pivot.getWorldPosition(p); return new THREE.Vector2(p.x, p.z); }
  /** which way (+1/-1) a leaf must rotate so its free end moves away from `from` */
  private awaySign(l: Leaf, from: THREE.Vector3): number {
    const h = this.hinge(l), d = this.dir(l, l.a);
    const rx = from.x - h.x, rz = from.z - h.y;
    // d/da of the tip direction = (-d.y?) : derivative of rotY(dir, a) = ( -dx sin + dz cos , -dx cos - dz sin ) at a -> perpendicular p = (d.y, -d.x)
    const px = d.y, pz = -d.x;
    return px * rx + pz * rz > 0 ? -1 : 1;
  }
  private unlatch(from: THREE.Vector3, speed: number, g: GameAPI | null): void {
    if (!this.open) {
      this.open = true; this.enabled = false; this.collider.enabled = false;
      (g?.flags ?? Door.flags)?.add('open:' + this.id);
      audio.click(true);
      bus.emit('noise', { pos: this.pos.clone(), radius: 8, kind: 'door' });
      bus.emit('doorsChanged', null);
      if (!this.opened) { this.opened = true; this.opts.onOpen?.(g ?? Door.api); }
    }
    for (const l of this.leaves) l.w += this.awaySign(l, from) * speed;
  }
  /** open instantly (save restore / scripts) */
  openNow(flags?: Set<string>, from?: THREE.Vector3): void {
    this.opened = true; this.idleT = 0;
    this.open = true; this.enabled = false; this.collider.enabled = false;
    flags?.add('open:' + this.id);
    for (const l of this.leaves) {
      const s = from ? this.awaySign(l, from) : 1;
      l.a = s * this.maxA * 0.92; l.w = 0;
    }
    bus.emit('doorsChanged', null);
  }
  update(dt: number): void {
    dt = Math.min(dt, 0.05);
    this.collider.navPass = !this.locked;
    const agents = Door.agents();
    if (!this.open) {
      // walking into the closed door: push it open (RE Engine style), locked doors just rattle
      let pushing: DoorAgent | null = null;
      for (const ag of agents) {
        if (Math.abs(ag.pos.y - this.leaves[0].y0) > 1.2 || !ag.vel) continue;
        for (const l of this.leaves) {
          const h = this.hinge(l), d = this.dir(l, 0);
          const rx = ag.pos.x - h.x, rz = ag.pos.z - h.y;
          const s = rx * d.x + rz * d.y;
          if (s < 0.05 || s > l.width - 0.05) continue;
          const nx = d.y, nz = -d.x; const off = rx * nx + rz * nz;
          if (Math.abs(off) > ag.radius + 0.28) continue;
          const into = -(ag.vel.x * nx + ag.vel.z * nz) * Math.sign(off);
          if (into > (ag.player ? 0.6 : 0.35)) pushing = ag;
        }
      }
      if (pushing) {
        this.pushT += dt;
        if (this.locked || this.opts.onOpen === Door.NEVER) {
          if (pushing.player && this.bumpT <= 0 && this.pushT > 0.25) { audio.click(); this.bumpT = 1.2; if (Door.api && this.lockedText) Door.api.message(this.lockedText, 2.5); }
        } else if (this.pushT > (pushing.player ? 0.12 : 0.6)) {
          const sp = Math.min(3.4, 1.6 + Math.hypot(pushing.vel!.x, pushing.vel!.z) * 0.5);
          this.unlatch(pushing.pos, sp, null);
        }
      } else this.pushT = 0;
      this.bumpT -= dt;
      return;
    }
    // door closer: nobody around for a while → the leaves swing back and the door latches again
    let near = false;
    for (const ag of agents) {
      if (Math.abs(ag.pos.y - this.leaves[0].y0) > 1.6) continue;
      for (const l of this.leaves) { const h = this.hinge(l); if (Math.hypot(ag.pos.x - h.x, ag.pos.z - h.y) < l.width + ag.radius + 0.9) near = true; }
    }
    this.idleT = near ? 0 : this.idleT + dt;
    const closing = this.idleT > Door.closeDelay;
    if (closing) {
      // spring + constant latch push (must beat the Coulomb hinge friction below, or the leaf hangs ajar)
      for (const l of this.leaves) l.w += (-7 * l.a - 0.9 * Math.sign(l.a) - 3.2 * l.w) * dt;
      if (this.leaves.every((l) => Math.abs(l.a) < 0.035 && Math.abs(l.w) < 0.5)) { this.latch(); return; }
    }
    for (const l of this.leaves) {
      const h = this.hinge(l);
      // agents vs rotating leaf (circle vs segment)
      for (const ag of agents) {
        if (Math.abs(ag.pos.y - l.y0) > 1.2) continue;
        const d = this.dir(l, l.a);
        const rx = ag.pos.x - h.x, rz = ag.pos.z - h.y;
        const s = THREE.MathUtils.clamp(rx * d.x + rz * d.y, 0, l.width);
        const cx = h.x + d.x * s, cz = h.y + d.y * s;
        let ox = ag.pos.x - cx, oz = ag.pos.z - cz; let dist = Math.hypot(ox, oz);
        const minD = ag.radius + 0.06;
        if (dist >= minD || s < 0.12) continue;
        if (dist < 1e-4) { ox = d.y; oz = -d.x; dist = 1e-4; }
        const pen = minD - dist; const nx = ox / dist, nz = oz / dist;
        // torque: contact pushes the leaf opposite to n; tangential direction of rotation +a is p = (d.y, -d.x)
        const px = d.y, pz = -d.x;
        const push = -(nx * px + nz * pz); // >0 → leaf rotates toward -a? (see awaySign)
        const mass = ag.player ? 1 : 0.7;
        l.w += push * pen * 900 * mass * (0.6 + s / l.width) * dt;
        // the leaf gives way (kinematic part), the agent takes the rest; at a stop the agent takes it all
        const atStop = Math.abs(l.a) >= this.maxA - 1e-3 && Math.sign(push) === Math.sign(l.a);
        if (!atStop) l.a = THREE.MathUtils.clamp(l.a + push * pen * 0.6 / Math.max(0.3, s), -this.maxA, this.maxA);
        const k = atStop ? 1 : 0.45;
        ag.pos.x += nx * pen * k; ag.pos.z += nz * pen * k;
      }
      // integrate: hinge friction, air drag, soft stops
      l.w *= Math.exp(-2.2 * dt);
      const fr = 0.35 * dt; l.w = Math.abs(l.w) < fr ? 0 : l.w - Math.sign(l.w) * fr;
      l.a += l.w * dt;
      if (Math.abs(l.a) > this.maxA) { l.a = Math.sign(l.a) * this.maxA; if (Math.sign(l.w) === Math.sign(l.a)) { if (Math.abs(l.w) > 1.2) audio.click(); l.w *= -0.25; } }
      l.pivot.rotation.y = l.base + l.a;
      const sp = Math.abs(l.w);
      if (sp > 0.8 && (this.creak -= dt) < 0) { this.creak = 0.9; bus.emit('noise', { pos: this.pos.clone(), radius: 5, kind: 'door' }); }
    }
  }
  /** closed again by the door closer: collider back, AI repaths, save flag cleared */
  private latch(): void {
    for (const l of this.leaves) { l.a = 0; l.w = 0; l.pivot.rotation.y = l.base; }
    this.open = false; this.enabled = true; this.collider.enabled = true; this.pushT = 0; this.idleT = 0;
    this.collider.navPass = !this.locked;
    (Door.api?.flags ?? Door.flags)?.delete('open:' + this.id);
    audio.click(true);
    bus.emit('noise', { pos: this.pos.clone(), radius: 6, kind: 'door' });
    bus.emit('doorsChanged', null);
  }
  /** sentinel for doors that must never open by walking (scripted exits) */
  static readonly NEVER = (): void => void 0;
}

/** Generic scripted interaction (typewriter, item box, puzzles, exits). */
export class ScriptedInteractable implements Interactable {
  enabled = true;
  constructor(
    public id: string,
    public pos: THREE.Vector3,
    public radius: number,
    private promptFn: (g: GameAPI) => string,
    private action: (g: GameAPI, self: ScriptedInteractable) => void,
    public onUpdate?: (dt: number, t: number) => void,
  ) {}
  prompt(g: GameAPI): string { return this.promptFn(g); }
  interact(g: GameAPI): void { this.action(g, this); }
  update(dt: number, t: number): void { this.onUpdate?.(dt, t); }
}
