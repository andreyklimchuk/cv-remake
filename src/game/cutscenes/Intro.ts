import * as THREE from 'three';
import { Cutscene, V, type CutsceneEnv } from './Cutscene';
import { Helicopter } from './Helicopter';
import { GuardActor, HumanActor } from './Actors';
import { LightPool } from '../../engine/LightPool';
import { audio } from '../../engine/AudioEngine';
import { OX } from '../levels/RockfortPrison';

/** Claire's cell in the prison block (cv_prison.glb): spawn point after the intro */
export const CELL_SPAWN = { pos: V(3.8, 0, 3.0), yaw: -Math.PI / 2 };

const LAND = V(OX - 1.5, 0, -20);
const ease = (k: number) => { k = THREE.MathUtils.clamp(k, 0, 1); return k * k * (3 - 2 * k); };

/**
 * Intro (new game): an Umbrella Bell UH-1 "Huey" flies in through the storm and lands on the pad outside the
 * prison yard's south gate; two masked guards march Claire through the gate to the cell-block door. Inside, she
 * is locked into a cell. Hours later an explosion shakes the island, the alarm goes off and the cell door
 * unlocks — gameplay starts in the cell.
 */
export class IntroCutscene extends Cutscene {
  readonly duration = 49;
  private heli = new Helicopter();
  private g1: GuardActor;
  private g2: GuardActor;
  private claire: HumanActor;
  private rotor: ReturnType<typeof audio.heliLoop> | null = null;
  private alarmOn = false;
  private shown = { claire: false, g1: false, g2: false };

  constructor(env: CutsceneEnv) {
    super(env);
    const w = this.w;
    this.hideZombies = true;
    w.scene.add(this.heli.root);
    LightPool.active?.adopt(this.heli.root);
    const tex = w.q.textureSize;
    this.g1 = new GuardActor(w.scene, tex, 3);
    this.g2 = new GuardActor(w.scene, tex, 7);
    this.claire = new HumanActor(w.player.models.claire);
    this.claire.pos = w.player.pos; // footsteps follow the actor
    for (const a of [this.g1.model.root, this.g2.model.root, this.claire.model.root]) a.visible = false;
    w.flags.add('cellOpen');
    this.focus.copy(LAND);
    this.heliAt(0);

    this.caption(1.2, 6.2, 'ОСТРОВ РОКФОРТ<small>ЮЖНАЯ АТЛАНТИКА · ТЮРЕМНЫЙ КОМПЛЕКС UMBRELLA</small>');
    this.fadeKeys([0, 1], [1.4, 0], [27.4, 0], [28.2, 1], [28.7, 1], [29.4, 0], [37.4, 0], [38.1, 1], [39.4, 1], [40.4, 0], [48.2, 0], [49, 0]);
    this.at(0.05, () => { this.rotor = audio.heliLoop(this.heli.root.position); });
    for (const lt of [2.4, 9.6, 21.2]) this.at(lt, () => this.lightning());
    // landing → passengers
    this.at(13.6, () => audio.clank(this.heli.doorWorld(), false));
    this.at(14.4, () => this.out(this.g1, V(OX + 1.6, 0, -18.4), 'g1'));
    this.at(15.3, () => this.out(this.claire, V(OX + 1.0, 0, -19.0), 'claire'));
    this.at(16.2, () => this.out(this.g2, V(OX + 0.6, 0, -20.4), 'g2'));
    this.line(16.4, 2.4, 'Охранник', 'Пошла. И без глупостей.');
    this.at(17.0, () => { this.w.flags.add('heliGate'); audio.clank(V(OX + 1.3, 1.5, -10), true); });
    this.at(18.6, () => {
      // march through the south gate to the cell-block door
      this.g1.walkTo([V(OX + 1.6, 0, -10.6), V(OX + 1.7, 0, -8.9), V(OX + 4.8, 0, -8.4), V(OX + 6.4, 0, -8.1)], 1.7);
      this.claire.walkTo([V(OX + 1.0, 0, -11.2), V(OX + 1.0, 0, -9.6), V(OX + 4.2, 0, -9.0), V(OX + 7.0, 0, -8.5)], 1.6);
      this.g2.walkTo([V(OX + 0.6, 0, -12.2), V(OX + 0.6, 0, -10.4), V(OX + 3.4, 0, -9.4), V(OX + 5.6, 0, -9.1)], 1.6);
    });
    this.line(20.0, 2.6, 'Клэр', 'Куда вы меня ведёте?');
    this.line(23.0, 2.7, 'Охранник', 'Туда, откуда не возвращаются.');
    // prison block: locked up
    this.at(28.2, () => {
      this.focus.set(2, 0, 3);
      this.claire.place(V(1.4, 0, 4.6), Math.PI);
      this.claire.walkTo([V(2.2, 0, 2.1), V(3.6, 0, 2.0), V(4.3, 0, 3.8)], 1.25);
      this.claire.face = null;
      this.g1.place(V(0.9, 0, 3.6), 2.6); this.g1.walkTo([V(2.1, 0, 2.7)], 1.2); this.g1.face = V(4, 0, 3);
      this.g2.place(V(1.0, 0, 5.8), 2.8); this.g2.walkTo([V(2.3, 0, 4.0)], 1.2); this.g2.face = V(4, 0, 3);
      this.heli.root.visible = false; this.rotor?.stop(); this.rotor = null;
      this.w.flags.delete('heliGate');
    });
    this.at(32.4, () => { this.claire.face = V(2.5, 1.5, 2.6); });
    this.at(32.6, () => { this.w.flags.delete('cellOpen'); });
    this.at(33.4, () => audio.clank(V(3, 1.2, 2), true));
    this.line(33.8, 2.6, 'Охранник', 'Добро пожаловать на Рокфорт.');
    this.at(35.4, () => {
      this.g1.face = null; this.g2.face = null;
      this.g1.walkTo([V(1.3, 0, 6.4), V(1.3, 0, 7.6)], 1.4);
      this.g2.walkTo([V(0.6, 0, 6.2), V(0.9, 0, 7.5)], 1.4);
    });
    this.line(36.2, 1.8, 'Клэр', 'Крис… надеюсь, ты получил моё сообщение.');
    // hours later: the attack
    this.caption(38.6, 41.6, 'НЕСКОЛЬКО ЧАСОВ СПУСТЯ');
    this.at(38.2, () => {
      this.g1.model.root.visible = false; this.g2.model.root.visible = false;
      this.claire.place(V(4.4, 0, 5.9), -Math.PI * 0.6); this.claire.face = V(3, 1.5, 3);
    });
    this.at(41.2, () => { audio.explosion(V(-10, 6, 20)); this.shake(0.18, 1.4); });
    this.at(41.9, () => { this.startAlarm(20); this.w.flags.add('alarm'); });
    this.line(42.3, 2.6, 'Оповещение', 'Внимание! Нарушение периметра. Всему персоналу — общая тревога.');
    this.at(43.4, () => this.claire.walkTo([V(3.8, 0, 3.0)], 1.1));
    this.line(45.0, 1.6, 'Клэр', 'Что там творится?..');
    this.at(46.2, () => { audio.clank(V(3, 1.2, 2)); this.w.flags.add('cellOpen'); });
    this.line(46.6, 2.4, 'Оповещение', 'Аварийная разблокировка камер.');
  }

  private out(a: GuardActor | HumanActor, to: THREE.Vector3, key: keyof IntroCutscene['shown']): void {
    const door = this.heli.doorWorld();
    a.place(door.clone().setX(door.x - 0.4), Math.PI / 2);
    a.walkTo([door, to], 1.2);
    a.model.root.visible = true;
    this.shown[key] = true;
  }

  private lightning(): void {
    const moon = this.w.scene.getObjectByName('moon') as THREE.DirectionalLight | undefined;
    const hemi = this.w.scene.getObjectByName('hemi') as THREE.HemisphereLight | undefined;
    if (!moon || !hemi) return;
    const m0 = moon.userData.base ?? (moon.userData.base = moon.intensity), h0 = hemi.userData.base ?? (hemi.userData.base = hemi.intensity);
    const set = (k: number) => { moon.intensity = m0 * (1 + k * 5); hemi.intensity = h0 * (1 + k * 2.2); };
    set(1); setTimeout(() => set(0.15), 70); setTimeout(() => set(0.8), 140); setTimeout(() => set(0), 260);
    audio.thunder(0.5);
  }

  private startAlarm(dur: number): void {
    if (this.alarmOn) return;
    this.alarmOn = true;
    audio.alarm(dur);
  }

  /** flight path: in from the sea over the cliffs → flare → touchdown on the pad (nose north, towards the gate) */
  private heliAt(t: number): void {
    const h = this.heli, r = h.root;
    if (t < 8.5) {
      const k = ease(t / 8.5);
      const p0 = V(OX - 34, 34, -110), p1 = V(OX - 4, 16, -34);
      r.position.copy(p0.lerp(p1, 1 - (1 - k) * (1 - k)));
      r.rotation.set(0.12 * (1 - k) + 0.02, -0.45 * (1 - k), -0.18 * (1 - k) * Math.sin(k * Math.PI));
      h.searchlight.target.position.set(Math.sin(t * 0.7) * 5, -12, 12);
    } else if (t < 13.2) {
      const k = ease((t - 8.5) / 4.7);
      r.position.set(LAND.x - 2.5 * (1 - k), Math.max(0, 16 - 16 * k) + Math.sin(t * 2.1) * 0.08 * (1 - k), -34 + 14 * ease(Math.min(1, (t - 8.5) / 3)));
      r.rotation.set(-0.12 * Math.sin(k * Math.PI), 0, Math.sin(t * 1.3) * 0.02 * (1 - k));
      h.searchlight.target.position.set(0, -12, 7 - 4 * k);
    } else {
      r.position.copy(LAND); r.rotation.set(0, 0, 0);
      h.rotorSpeed = Math.max(0.55, 1 - (t - 13.2) * 0.12);
      h.searchlight.intensity = 320 * Math.max(0, 1 - (t - 13.2) / 1.2); // pilot kills the searchlight after touchdown
      h.doorOpen = ease((t - 13.6) / 0.8);
    }
  }

  protected update(dt: number, t: number): void {
    const w = this.w;
    this.heliAt(t);
    this.heli.update(dt, t);
    this.rotor?.setPos(this.heli.root.position.clone().add(V(0, 2.5, 0)));
    this.rotor?.setLevel(t < 13.2 ? 1 : this.heli.rotorSpeed);
    this.g1.update(dt, t); this.g2.update(dt, t);
    this.claire.update(dt, t);
    if (!this.claire.model.root.visible) this.claire.model.root.position.y = -50;
    w.player.yaw = this.claire.yaw;
    const H = this.heli.root.position;
    if (t < 7) {
      // establishing: inside the yard, looking up over the south wall at the helicopter coming in
      const look = H.clone().add(V(0, 1.5, 0));
      this.cam(V(OX + 3 - t * 0.2, 1.6 + t * 0.05, -2.5), look, 52 - t * 1.6);
    } else if (t < 13.6) {
      this.cam(V(OX + 9.5, 1.6, -13.5).lerp(V(OX + 8.6, 1.4, -14.6), (t - 7) / 6.6), H.clone().add(V(0, 1.8, 0.5)), 50);
    } else if (t < 18.6) {
      this.dolly(t, 13.6, 18.6, V(OX + 5.4, 1.6, -16.2), V(OX + 5.0, 1.55, -16.9), V(OX + 0.4, 1.35, -19.6), V(OX + 1.0, 1.3, -19.0), 46, 42);
    } else if (t < 28.2) {
      // tracking shot alongside the march
      const c = this.claire.pos;
      const k = (t - 18.6) / 9.6;
      const off = V(2.6, 1.75, -3.2).lerp(V(-2.2, 1.7, -3.4), k);
      this.cam(c.clone().add(off), c.clone().add(V(0.2, 1.25, 1.2)), 48);
      this.focus.copy(c);
    } else if (t < 38.2) {
      this.dolly(t, 28.2, 38.2, V(0.2, 1.75, 1.2), V(0.6, 1.6, 1.7), V(3.4, 1.2, 2.6), V(4.1, 1.35, 3.6), 48, 42);
    } else {
      // inside the cell, behind Claire's bunk, looking out through the bars
      this.dolly(t, 38.2, 49, V(5.0, 1.5, 7.4), V(4.9, 1.55, 7.0), V(3.2, 1.25, 2.6), V(3.3, 1.4, 2.4), 50, 44);
    }
  }

  protected finish(): void {
    const w = this.w;
    this.heli.dispose();
    this.g1.dispose(); this.g2.dispose();
    this.rotor?.stop();
    w.flags.add('introDone'); w.flags.add('cellOpen'); w.flags.add('alarm'); w.flags.delete('heliGate');
    if (!this.alarmOn) this.startAlarm(10);
    const m = w.player.models.claire;
    m.root.visible = true;
    w.player.pos.copy(CELL_SPAWN.pos); w.player.yaw = CELL_SPAWN.yaw; w.player.vel.set(0, 0, 0);
    m.root.position.copy(w.player.pos); m.root.rotation.y = w.player.yaw;
    void this.shown;
  }
}
