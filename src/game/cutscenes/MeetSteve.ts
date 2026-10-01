import * as THREE from 'three';
import { Cutscene, V, type CutsceneEnv } from './Cutscene';
import { HumanActor } from './Actors';
import { audio } from '../../engine/AudioEngine';
import { WEAPONS } from '../combat/Weapons';
import { buildHit } from '../combat/HitZones';
import type { Enemy } from '../ai/Zombie';

/** where Steve takes over after the meeting */
export const STEVE_START = { pos: V(-1.3, 0, 48.2), yaw: 0.15 }; // facing the bridge

/**
 * Past the main gate Claire runs into Steve Burnside: he guns down the guard zombie on the road, they talk,
 * Claire hands him everything except her M9F and heads for the bridge — from here the player is Steve.
 */
export class MeetSteveCutscene extends Cutscene {
  readonly duration = 37;
  private claire: HumanActor;
  private steve: HumanActor;
  private target: Enemy | null = null;
  private onDone: () => void;

  constructor(env: CutsceneEnv, onDone: () => void) {
    super(env);
    this.onDone = onDone;
    const w = this.w, p = w.player;
    this.focus.set(0, 0, 48);
    this.claire = new HumanActor(p.models.claire);
    this.claire.pos = p.pos;
    this.claire.yaw = p.yaw;
    this.claire.walkTo([V(THREE.MathUtils.clamp(p.pos.x, -1.5, 1.5) * 0.5, 0, Math.max(p.pos.z + 0.8, 44.6)), V(0.4, 0, 45.6)], 1.3);
    if (w.player.models.claire.lighterOn) w.player.models.claire.setLighter(false);
    const sm = p.models.steve;
    sm.hasLugers = true;
    sm.setWeapon('gold_lugers');
    sm.root.visible = true;
    this.steve = new HumanActor(sm, V(-5.4, 0, 53.4));
    this.steve.yaw = Math.PI * 0.8;
    // the guard zombie on the road (if Claire left it standing) is the first thing Steve shoots
    const z = w.zombies.find((e) => e.spawn.id === 'go_1' && e.alive && !e.isDowned());
    if (z) {
      this.target = z;
      z.position.set(2.6, 0, 49.6);
      z.model.root.position.copy(z.position);
    }
    this.fadeKeys([0, 0], [35.4, 0], [36.4, 1], [37, 1]);

    const aimAt = (v: THREE.Vector3) => { this.steve.aim = true; this.steve.aimPoint.copy(v); };
    this.at(0.9, () => aimAt(this.target ? this.target.position.clone().add(V(0, 1.6, 0)) : this.claire.pos.clone().add(V(0, 1.3, 0))));
    if (this.target) {
      this.at(1.9, () => this.fire(true));
      this.at(2.35, () => this.fire(true));
    }
    this.at(3.2, () => { aimAt(this.claire.pos.clone().add(V(0, 1.35, 0))); this.claire.face = this.steve.pos; this.claire.look = this.steve.pos.clone().add(V(0, 1.6, 0)); });
    this.line(3.4, 1.8, 'Стив', 'Эй! Не двигайся!');
    this.at(4.0, () => this.steve.walkTo([V(-3.6, 0, 51.4), V(-1.4, 0, 48.3)], 1.1));
    this.line(5.4, 2.0, 'Стив', '…Ты ведь не из этих? Не зомби?');
    this.at(7.4, () => { this.steve.aim = false; this.steve.look = this.claire.pos.clone().add(V(0, 1.55, 0)); this.steve.face = this.claire.pos; });
    this.line(7.6, 2.8, 'Клэр', 'Спокойно, я человек. Меня зовут Клэр Рэдфилд.');
    this.line(10.6, 2.0, 'Стив', 'Стив. Стив Бернсайд.');
    this.line(12.8, 3.2, 'Клэр', 'Ты тоже заключённый? Меня привезли сюда из Парижа — люди Umbrella.');
    this.line(16.2, 3.4, 'Стив', 'Охраны больше нет. Остров атаковали, все вокруг превратились в… это. Я сам по себе.');
    this.line(19.8, 2.0, 'Клэр', 'Тогда держи.');
    this.line(21.9, 3.2, 'Клэр', 'Патроны, нож, зажигалка — всё, что я нашла. Себе оставлю только пистолет.');
    this.line(25.3, 2.6, 'Стив', '…Спасибо. Наверное. Хотя мои красавицы и так не промахиваются.');
    this.line(28.1, 2.8, 'Клэр', 'Мне нужно связаться с братом. Будь осторожен, Стив.');
    this.at(30.6, () => { this.claire.face = null; this.claire.look = null; this.claire.walkTo([V(0.6, 0, 50.5), V(0.2, 0, 56.5), V(0, 0, 62)], 1.45); });
    this.line(31.0, 1.6, 'Стив', 'Эй, подожди!..');
    this.line(33.2, 2.2, 'Стив', '…Ну и ладно. Сам справлюсь.');
  }

  private fire(lethal: boolean): void {
    const s = this.steve, w = this.w;
    s.shots++;
    const m = s.model;
    const mz = m.muzzleWorld(new THREE.Vector3()), mz2 = m.muzzleWorldL(new THREE.Vector3());
    w.combat.flash.fire(mz, WEAPONS.gold_lugers.muzzle, mz2);
    audio.gunshot(WEAPONS.gold_lugers.sound, mz);
    const z = this.target;
    if (z && lethal && z.alive) {
      const head = z.position.clone().add(V(0, 1.6, 0));
      const dir = head.clone().sub(mz).normalize();
      const hit = buildHit(WEAPONS.gold_lugers, 'head', s.shots > 1 ? 999 : 30, head, dir);
      z.takeHit(hit);
      audio.flesh(head, true);
      if (!this.activeZombies.includes(z)) this.activeZombies.push(z);
      if (!z.alive) w.flags.add('dead:' + z.spawn.id);
    }
  }

  protected update(dt: number, t: number): void {
    this.claire.update(dt, t);
    this.steve.update(dt, t);
    this.w.player.yaw = this.claire.yaw;
    const C = this.claire.pos, S = this.steve.pos;
    if (t < 3.2) {
      // over Claire's shoulder as she steps through the gate
      this.cam(C.clone().add(V(-0.75, 1.65, -2.3)), C.clone().add(V(0.6, 1.3, 4)), 50);
    } else if (t < 7.4) {
      // Steve, low angle, guns up
      this.cam(S.clone().add(V(2.3, 1.3, -1.9)), S.clone().add(V(0, 1.4, 0)), 40);
    } else if (t < 19.8) {
      // two-shot from the side
      const mid = C.clone().lerp(S, 0.5);
      const ax = S.clone().sub(C).setY(0).normalize();
      const side = V(ax.z, 0, -ax.x);
      if (side.x < 0) side.negate();
      const k = (t - 7.4) / 12.4;
      this.cam(mid.clone().addScaledVector(side, 3.6 - k * 0.5).add(V(0, 1.55, 0)), mid.clone().add(V(0, 1.35, 0)), 42);
    } else if (t < 25.3) {
      // over Steve's shoulder onto Claire
      const d = C.clone().sub(S).setY(0).normalize();
      const r = V(-d.z, 0, d.x);
      this.cam(S.clone().addScaledVector(d, -0.9).addScaledVector(r, -0.45).add(V(0, 1.68, 0)), C.clone().add(V(0, 1.45, 0)), 36);
    } else if (t < 30.6) {
      // over Claire's shoulder onto Steve
      const d = S.clone().sub(C).setY(0).normalize();
      const r = V(-d.z, 0, d.x);
      this.cam(C.clone().addScaledVector(d, -0.9).addScaledVector(r, 0.45).add(V(0, 1.62, 0)), S.clone().add(V(0, 1.5, 0)), 36);
    } else {
      // behind Steve, watching her go
      this.cam(S.clone().add(V(-0.9, 1.75, -1.9)), C.clone().add(V(0, 1.2, 0)), 46);
    }
  }

  protected finish(): void {
    const w = this.w, p = w.player;
    w.flags.add('steveMet');
    if (this.target && this.target.alive) { this.target.forceDead(); w.flags.add('dead:' + this.target.spawn.id); }
    w.handOverToSteve();
    p.pos.copy(STEVE_START.pos); p.yaw = STEVE_START.yaw; p.vel.set(0, 0, 0);
    p.models.claire.root.visible = false;
    if (p.character !== 'steve') w.switchCharacter();
    p.models.claire.root.visible = false;
    this.onDone();
  }
}
