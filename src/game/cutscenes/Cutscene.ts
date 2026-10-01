import * as THREE from 'three';
import type { World } from '../World';
import type { Cinema } from '../../ui/Cinema';
import type { Enemy } from '../ai/Zombie';
import { LightPool } from '../../engine/LightPool';

export interface CutsceneEnv { world: World; camera: THREE.PerspectiveCamera; cinema: Cinema }

const ease = (k: number) => k * k * (3 - 2 * k);

/**
 * Scripted real-time cutscene: a timeline of one-shot events, subtitles, captions and fades, plus a per-frame
 * `update` that places the camera and drives the actors. `skip()` jumps straight to the final state (`finish`).
 * While a cutscene runs the player controller and the zombie AI are frozen (Game.cutsceneStep).
 */
export abstract class Cutscene {
  t = 0;
  done = false;
  abstract readonly duration: number;
  /** anchor for streaming / level update / rain (the action's location) */
  focus = new THREE.Vector3();
  /** hide every enemy (intro: the outbreak hasn't happened yet) */
  hideZombies = false;
  /** enemies that keep simulating during the scene (e.g. one being shot) */
  activeZombies: Enemy[] = [];
  private evs: { t: number; fn: () => void; fired: boolean }[] = [];
  private lines: { t0: number; t1: number; who: string | null; text: string }[] = [];
  private caps: { t0: number; t1: number; html: string }[] = [];
  private fades: [number, number][] = [];
  private shakeT = 0;
  private shakeS = 0;

  /** soft "cinematographer's" fill light riding next to the camera (pooled virtual light) */
  private fill = new THREE.PointLight(0xd8e0ff, 4, 9, 1.3);

  constructor(protected env: CutsceneEnv) {
    this.fill.userData.priority = 18;
    env.world.scene.add(this.fill);
    LightPool.active?.adopt(this.fill);
  }

  protected get w(): World { return this.env.world; }
  protected at(t: number, fn: () => void): void { this.evs.push({ t, fn, fired: false }); }
  protected line(t0: number, dur: number, who: string | null, text: string): void { this.lines.push({ t0, t1: t0 + dur, who, text }); }
  protected caption(t0: number, t1: number, html: string): void { this.caps.push({ t0, t1, html }); }
  /** fade-to-black keyframes [time, opacity] (piecewise linear) */
  protected fadeKeys(...k: [number, number][]): void { this.fades = k.sort((a, b) => a[0] - b[0]); }
  protected shake(strength: number, dur: number): void { this.shakeS = strength; this.shakeT = dur; }

  step(dt: number): void {
    if (this.done) return;
    this.t += dt;
    const t = this.t;
    for (const e of this.evs) if (!e.fired && t >= e.t) { e.fired = true; e.fn(); }
    const l = this.lines.find((x) => t >= x.t0 && t < x.t1);
    this.env.cinema.say(l?.who ?? null, l?.text ?? null);
    const c = this.caps.find((x) => t >= x.t0 && t < x.t1);
    this.env.cinema.caption(c?.html ?? null);
    this.env.cinema.fade(this.fadeAt(t));
    this.update(dt, t);
    const cam = this.env.camera;
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(cam.quaternion);
    this.fill.position.copy(cam.position).addScaledVector(right, 0.7).add(new THREE.Vector3(0, 0.8, 0));
    if (this.shakeT > 0) {
      this.shakeT -= dt;
      const s = this.shakeS * Math.max(0, this.shakeT);
      const cam = this.env.camera;
      cam.position.add(new THREE.Vector3((Math.random() - 0.5) * s, (Math.random() - 0.5) * s, (Math.random() - 0.5) * s));
    }
    if (t >= this.duration) this.end();
  }

  skip(): void { if (!this.done) this.end(); }

  private end(): void {
    this.done = true;
    // events with side effects that finish() doesn't cover are fired so the world state stays consistent
    this.finish();
    this.fill.removeFromParent();
    this.env.cinema.say(null, null); this.env.cinema.caption(null); this.env.cinema.fade(0);
  }

  private fadeAt(t: number): number {
    const k = this.fades;
    if (!k.length) return 0;
    if (t <= k[0][0]) return k[0][1];
    for (let i = 1; i < k.length; i++) if (t <= k[i][0]) { const [t0, v0] = k[i - 1], [t1, v1] = k[i]; return v0 + (v1 - v0) * ((t - t0) / Math.max(1e-4, t1 - t0)); }
    return k[k.length - 1][1];
  }

  protected abstract update(dt: number, t: number): void;
  protected abstract finish(): void;

  // ---------------------------------------------------------------- camera helpers
  protected cam(pos: THREE.Vector3, look: THREE.Vector3, fov = 50): void {
    const c = this.env.camera;
    c.position.copy(pos);
    c.lookAt(look);
    if (Math.abs(c.fov - fov) > 0.01) { c.fov = fov; c.updateProjectionMatrix(); }
  }
  /** eased dolly between two framings over [t0, t1] */
  protected dolly(t: number, t0: number, t1: number, p0: THREE.Vector3, p1: THREE.Vector3, l0: THREE.Vector3, l1: THREE.Vector3, fov = 50, fov1 = fov): void {
    const k = ease(THREE.MathUtils.clamp((t - t0) / (t1 - t0), 0, 1));
    this.cam(p0.clone().lerp(p1, k), l0.clone().lerp(l1, k), fov + (fov1 - fov) * k);
  }
}

export const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
