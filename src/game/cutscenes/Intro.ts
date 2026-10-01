import * as THREE from 'three';
import { Cutscene, V, type CutsceneEnv } from './Cutscene';
import { Helicopter } from './Helicopter';
import { GuardActor, HumanActor } from './Actors';
import { LightPool } from '../../engine/LightPool';
import { audio } from '../../engine/AudioEngine';

/** Claire's cell (cell block B, cell 4 from the west): spawn point after the intro */
export const CELL_SPAWN = { pos: V(34, 0, 38.6), yaw: Math.PI };

const LAND = V(-1, 0, 18);
const ease = (k: number) => { k = THREE.MathUtils.clamp(k, 0, 1); return k * k * (3 - 2 * k); };

/**
 * Intro (new game): an Umbrella helicopter flies in over the prison wall through the storm and lands in the
 * courtyard; two masked guards march Claire to the guard house; she is locked into a cell of block B.
 * Hours later an explosion shakes the island, the alarm goes off and the cell doors unlock — gameplay starts.
 */
export class IntroCutscene extends Cutscene {
  readonly duration = 47;
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
    this.focus.set(0, 0, 18);
    this.heliAt(0);

    this.caption(1.2, 6.2, 'ОСТРОВ РОКФОРТ<small>ЮЖНАЯ АТЛАНТИКА · ТЮРЕМНЫЙ КОМПЛЕКС UMBRELLA</small>');
    this.fadeKeys([0, 1], [1.4, 0], [25.2, 0], [26, 1], [26.6, 1], [27.3, 0], [35.4, 0], [36.1, 1], [37.4, 1], [38.4, 0], [46.2, 0], [47, 0]);
    this.at(0.05, () => { this.rotor = audio.heliLoop(this.heli.root.position); });
    for (const lt of [2.4, 9.6, 21.2]) this.at(lt, () => this.lightning());
    // landing → passengers
    this.at(13.6, () => audio.clank(this.heli.doorWorld(), false));
    this.at(14.4, () => this.out(this.g1, V(2.6, 0, 19.3), 'g1'));
    this.at(15.3, () => this.out(this.claire, V(2.0, 0, 18.0), 'claire'));
    this.at(16.2, () => this.out(this.g2, V(1.8, 0, 16.6), 'g2'));
    this.line(16.4, 2.4, 'Охранник', 'Пошла. И без глупостей.');
    this.at(18.6, () => {
      // march to the guard house
      this.g1.walkTo([V(5.6, 0, 16.9), V(10.6, 0, 13.6), V(18.2, 0, 10.4)], 1.4);
      this.claire.walkTo([V(4.8, 0, 15.9), V(9.9, 0, 12.6), V(17.3, 0, 9.4)], 1.4);
      this.g2.walkTo([V(4.1, 0, 14.6), V(9.2, 0, 11.5), V(16.4, 0, 8.3)], 1.4);
    });
    this.line(19.6, 2.6, 'Клэр', 'Куда вы меня ведёте?');
    this.line(22.4, 2.7, 'Охранник', 'Туда, откуда не возвращаются.');
    // cell block: locked up
    this.at(26.2, () => {
      this.focus.set(32, 0, 34);
      this.claire.place(V(34, 0, 33.5), 0.3);
      this.claire.walkTo([V(34, 0, 35.2), V(34, 0, 38.9)], 1.25);
      this.claire.face = V(34, 1.5, 34);
      this.g1.place(V(32.4, 0, 33.2), 0.6); this.g1.walkTo([V(33.1, 0, 34.7)], 1.2); this.g1.face = V(34, 0, 38);
      this.g2.place(V(36.2, 0, 32.8), -0.4); this.g2.walkTo([V(35.4, 0, 34.5)], 1.2); this.g2.face = V(34, 0, 38);
      this.heli.root.visible = false; this.rotor?.stop(); this.rotor = null;
    });
    this.at(30.6, () => { this.w.flags.delete('cellOpen'); });
    this.at(31.4, () => audio.clank(V(34, 1.2, 36)));
    this.line(31.8, 2.6, 'Охранник', 'Добро пожаловать на Рокфорт.');
    this.at(33.4, () => {
      this.g1.face = null; this.g2.face = null;
      this.g1.walkTo([V(30, 0, 34), V(25.6, 0, 33.6), V(26, 0, 26)], 1.4);
      this.g2.walkTo([V(31, 0, 34.6), V(26.6, 0, 34.4), V(26.4, 0, 26)], 1.4);
    });
    this.line(34.2, 1.8, 'Клэр', 'Крис… надеюсь, ты получил моё сообщение.');
    // hours later: the attack
    this.caption(36.6, 39.6, 'НЕСКОЛЬКО ЧАСОВ СПУСТЯ');
    this.at(36.2, () => {
      this.g1.model.root.visible = false; this.g2.model.root.visible = false;
      this.claire.place(V(34.3, 0, 41.6), Math.PI * 0.95); this.claire.face = V(34, 1.5, 34);
    });
    this.at(39.2, () => { audio.explosion(V(10, 6, 30)); this.shake(0.18, 1.4); });
    this.at(39.9, () => this.startAlarm(20));
    this.line(40.3, 2.6, 'Оповещение', 'Внимание! Нарушение периметра. Всему персоналу — общая тревога.');
    this.at(41.4, () => this.claire.walkTo([V(34, 0, 38.8)], 1.1));
    this.line(43.0, 1.6, 'Клэр', 'Что там творится?..');
    this.at(44.2, () => { audio.clank(V(34, 1.2, 36)); this.w.flags.add('cellOpen'); });
    this.line(44.6, 2.4, 'Оповещение', 'Аварийная разблокировка камер блока B.');
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

  /** flight path: over the south wall → flare → touchdown on LAND */
  private heliAt(t: number): void {
    const h = this.heli, r = h.root;
    if (t < 8.5) {
      const k = ease(t / 8.5);
      const p0 = V(-26, 30, -46), p1 = V(-2.5, 15, 12);
      r.position.copy(p0.lerp(p1, 1 - (1 - k) * (1 - k)));
      r.rotation.set(0.12 * (1 - k) + 0.02, 0.45 * (1 - k), -0.18 * (1 - k) * Math.sin(k * Math.PI));
      h.searchlight.target.position.set(Math.sin(t * 0.7) * 5, -12, 12);
    } else if (t < 13.2) {
      const k = ease((t - 8.5) / 4.7);
      r.position.set(-2.5 + 1.5 * k, Math.max(0, 15 - 15 * k) + Math.sin(t * 2.1) * 0.08 * (1 - k), 12 + 6 * ease(Math.min(1, (t - 8.5) / 3)));
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
      // establishing: low in the yard, looking up at the helicopter coming in over the wall
      const look = H.clone().add(V(0, 1.5, 0));
      this.cam(V(-5 + t * 0.25, 1.6 + t * 0.05, 33), look, 50 - t * 1.6);
    } else if (t < 13.6) {
      this.cam(V(-9.5, 1.6, 29.5).lerp(V(-8.6, 1.4, 28.2), (t - 7) / 6.6), H.clone().add(V(0, 1.8, -0.5)), 50);
    } else if (t < 18.6) {
      this.dolly(t, 13.6, 18.6, V(6.6, 1.6, 22.6), V(6.2, 1.55, 21.8), V(0.8, 1.35, 18.2), V(1.6, 1.3, 17.6), 46, 42);
    } else if (t < 26.2) {
      // tracking shot alongside the march
      const c = this.claire.pos;
      const k = (t - 18.6) / 7.6;
      const off = V(-1.6, 1.75, 4.6).lerp(V(3.6, 1.6, 3.8), k);
      this.cam(c.clone().add(off), c.clone().add(V(0.6, 1.25, -1.2)), 48);
      this.focus.copy(c);
    } else if (t < 36.2) {
      this.dolly(t, 26.2, 36.2, V(37.9, 1.75, 32.9), V(37.2, 1.6, 33.6), V(33.6, 1.2, 37.2), V(34, 1.35, 38.4), 46, 40);
    } else {
      // inside the cell, behind Claire's bunk, looking out through the bars
      this.dolly(t, 36.2, 47, V(35.5, 1.45, 43.1), V(35.2, 1.55, 42.5), V(33.8, 1.25, 36.5), V(33.9, 1.4, 36.2), 50, 44);
    }
  }

  protected finish(): void {
    const w = this.w;
    this.heli.dispose();
    this.g1.dispose(); this.g2.dispose();
    this.rotor?.stop();
    w.flags.add('introDone'); w.flags.add('cellOpen');
    if (!this.alarmOn) this.startAlarm(10);
    const m = w.player.models.claire;
    m.root.visible = true;
    w.player.pos.copy(CELL_SPAWN.pos); w.player.yaw = CELL_SPAWN.yaw; w.player.vel.set(0, 0, 0);
    m.root.position.copy(w.player.pos); m.root.rotation.y = w.player.yaw;
    void this.shown;
  }
}
