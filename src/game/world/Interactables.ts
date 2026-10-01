import * as THREE from 'three';
import type { Inventory } from '../inventory/Inventory';
import type { PlayerController } from '../player/PlayerController';
import type { PhysicsWorld, Collider } from '../../engine/Physics';
import { ITEMS } from '../inventory/Items';
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
  constructor(public id: string, public pos: THREE.Vector3, public defId: string, public qty: number, public mesh: THREE.Object3D, parent: THREE.Object3D) {
    this.sparkle = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkleTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    this.sparkle.position.copy(pos).add(new THREE.Vector3(0, 0.15, 0));
    this.sparkle.scale.setScalar(0.25);
    mesh.position.copy(pos);
    mesh.traverse((o) => { o.castShadow = false; });
    parent.add(mesh, this.sparkle);
  }
  prompt(): string { return `Взять: ${ITEMS[this.defId].name}${this.qty > 1 ? ' ×' + this.qty : ''}`; }
  interact(g: GameAPI): void {
    const left = g.inventory.add(this.defId, this.qty);
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
    const s = 0.18 + Math.max(0, Math.sin(t * 3 + this.pos.x)) * 0.2;
    this.sparkle.scale.setScalar(s);
    this.sparkle.material.rotation = t;
  }
}

/** Hinged door; optional key item requirement. Removing the collider lets AI path through. */
export class Door implements Interactable {
  enabled = true;
  radius = 1.8;
  open = false;
  private angle = 0;
  constructor(
    public id: string,
    public pos: THREE.Vector3,
    public pivot: THREE.Object3D,
    public collider: Collider,
    public requires: string | null,
    public lockedText: string,
    private openAngle = -Math.PI * 0.55,
  ) {}
  prompt(g: GameAPI): string {
    if (this.open) return '';
    if (this.requires && !g.flags.has('unlocked:' + this.id)) return g.inventory.has(this.requires) ? `Использовать: ${ITEMS[this.requires].name}` : 'Осмотреть дверь';
    return 'Открыть дверь';
  }
  interact(g: GameAPI): void {
    if (this.open) return;
    if (this.requires && !g.flags.has('unlocked:' + this.id)) {
      if (!g.inventory.has(this.requires)) { g.message(this.lockedText); audio.click(); return; }
      g.flags.add('unlocked:' + this.id);
      g.message(`Использовано: ${ITEMS[this.requires].name}. Замок открыт.`);
      if (this.requires === 'keycard') { const it = g.inventory.firstOf('keycard'); if (it) g.inventory.remove(it.uid); }
    }
    this.openNow(g.flags);
  }
  openNow(flags?: Set<string>): void {
    this.open = true;
    this.enabled = false;
    this.collider.enabled = false;
    flags?.add('open:' + this.id);
    audio.click();
    bus.emit('noise', { pos: this.pos.clone(), radius: 8, kind: 'door' });
    bus.emit('doorsChanged', null);
  }
  update(dt: number): void {
    const target = this.open ? this.openAngle : 0;
    this.angle += (target - this.angle) * (1 - Math.exp(-4 * dt));
    this.pivot.rotation.y = this.angle;
  }
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
