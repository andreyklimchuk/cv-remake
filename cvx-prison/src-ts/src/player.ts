import * as THREE from 'three';
import { loadGLTF, toLambert } from './assets';
import type { Input } from './input';
import type { Room } from './room';

// Original motion clips (pl00 motion bank): 0 walk, 4 run, 11 walk back (Fine), 35 idle (Fine), 46/47 turns.
const CLIPS: Record<string, string> = { idle: 'm35', walk: 'm00', run: 'm04', back: 'm11', turnL: 'm46', turnR: 'm47' };
const WALK = 1.05, RUN = 2.6, TURN = 2.6, RADIUS = 0.2;
// Original knife motions (pl00w02 motion bank, 30 fps): k00 ready the knife; per direction (forward / up / down)
// k01/k04/k07 slash (24 frames, blade reaches out on frame 8) and k03/k06/k09 the held stance.
const K_DRAW = 'k00', K_SLASH = ['k01', 'k04', 'k07'], K_STANCE = ['k03', 'k06', 'k09'];
const K_DRAW_T = 9 / 30, K_SLASH_T = 24 / 30, K_HIT_T = 8 / 30;

export class Player {
  root = new THREE.Group();
  model!: THREE.Object3D;
  mixer!: THREE.AnimationMixer;
  actions = new Map<string, THREE.AnimationAction>();
  cur = '';
  heading = 0;
  state = 'idle';
  frozen = false;
  private tail: THREE.Object3D[] = []; private tailRest: THREE.Quaternion[] = [];
  private sway = new THREE.Vector2(); private swayV = new THREE.Vector2();
  private lastPos = new THREE.Vector3(); private lastHead = 0;
  bones: Record<string, THREE.Object3D> = {};
  // lighter held in the right hand
  lighterOn = false;
  /** original weapon hand models (pl00w01_R: hand holding the Zippo, pl00w02_R: hand with the combat knife) */
  private lighter: THREE.Object3D | null = null;
  private knifeHand: THREE.Object3D | null = null;
  private skinHandR: THREE.Object3D[] = [];
  private zippoParts: THREE.Object3D[] = [];
  knifeOn = false;
  /** knife: aiming (ready stance) and slash timer */
  aiming = false; slashT = -1;
  /** knife state machine driven by the original clips */
  private kState: 'none' | 'draw' | 'stance' | 'slash' = 'none'; private kT = 0; private kDir = 0; private kQueued = false;
  onSlash: ((p: THREE.Vector3, dir: THREE.Vector3) => void) | null = null;
  private flame!: THREE.Mesh; flameLight!: THREE.PointLight;
  private flameT = 0; private armBlend = 0;

  async load() {
    const g = await loadGLTF('chars/claire.glb');
    this.model = g.scene; toLambert(this.model);
    this.model.traverse((o) => { if ((o as THREE.Mesh).isMesh) { o.castShadow = false; o.frustumCulled = false; } if (/^b\d\d$|^pt\d$/.test(o.name)) this.bones[o.name] = o; });
    this.root.add(this.model);
    this.mixer = new THREE.AnimationMixer(this.model);
    for (const c of g.animations) this.actions.set(c.name, this.mixer.clipAction(c));
    this.play('idle', 0);
    for (let i = 0; i < 4; i++) { const b = this.bones['pt' + i]; if (b) { this.tail.push(b); this.tailRest.push(b.quaternion.clone()); } }
    await this.loadLighter();
  }
  private async loadHand(file: string) {
    const g = await loadGLTF(file); const m = g.scene.clone(true); toLambert(m);
    // weapon hands are modelled in the wrist bone space (game units = 10 cm)
    m.scale.setScalar(0.1); m.visible = false;
    m.traverse((o) => { if ((o as THREE.Mesh).isMesh) o.frustumCulled = false; });
    this.bones.b09?.add(m); return m;
  }
  private async loadLighter() {
    this.model.traverse((o) => { const mm = (o as THREE.Mesh).material as THREE.Material | undefined; if ((o as THREE.Mesh).isMesh && mm && /handR/.test(mm.name)) this.skinHandR.push(o); });
    try {
      this.lighter = await this.loadHand('chars/hand_zippo.glb');
      // texture 0 of pl00w01_R is the ZIPPO
      this.lighter.traverse((o) => { const mm = (o as THREE.Mesh).material as THREE.Material | undefined; if ((o as THREE.Mesh).isMesh && mm && /_t0$/.test(mm.name)) this.zippoParts.push(o); });
    } catch { this.lighter = null; }
    try { this.knifeHand = await this.loadHand('chars/hand_knife.glb'); } catch { this.knifeHand = null; }
    const fg = new THREE.ConeGeometry(0.009, 0.035, 10, 1, true); fg.translate(0, 0.0175, 0);
    this.flame = new THREE.Mesh(fg, new THREE.MeshBasicMaterial({ color: 0xffb040, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.006, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff0c0, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    core.position.y = 0.006; this.flame.add(core);
    this.flame.visible = false; this.root.add(this.flame);
    this.flameLight = new THREE.PointLight(0xffa850, 0, 6, 1.6); this.root.add(this.flameLight);
  }
  setLighter(on: boolean) { this.lighterOn = on && !!this.lighter; }
  setKnife(on: boolean) { this.knifeOn = on && !!this.knifeHand; if (!this.knifeOn) { this.aiming = false; this.slashT = -1; } }
  /** which hand model is shown in the right hand */
  private updateHands() {
    const zippo = this.armBlend > 0.5, knife = this.knifeOn && !zippo;
    if (this.lighter) this.lighter.visible = zippo;
    if (this.knifeHand) this.knifeHand.visible = knife;
    for (const h of this.skinHandR) h.visible = !zippo && !knife;
  }

  play(name: string, fade = 0.18, speed = 1) { this.playId(CLIPS[name], fade, true, speed); }
  private playId(id: string, fade: number, loop: boolean, speed = 1) {
    const a = this.actions.get(id); if (!a) return;
    a.timeScale = speed; if (this.cur === id) return;
    const prev = this.actions.get(this.cur);
    a.reset(); a.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity); a.clampWhenFinished = !loop; a.play();
    if (prev && fade > 0) a.crossFadeFrom(prev, fade, false); else if (prev) prev.stop();
    this.cur = id;
  }
  get pos() { return this.root.position; }
  forward(v = new THREE.Vector3()) { return v.set(-Math.sin(this.heading), 0, -Math.cos(this.heading)); }
  place(x: number, y: number, z: number, h: number) { this.root.position.set(x, y, z); this.heading = h; this.root.rotation.y = h; this.lastPos.set(x, y, z); this.lastHead = h; }
  /** world position of Claire's head (camera target) */
  headPos(v = new THREE.Vector3()) { const b = this.bones.b05; if (b) return b.getWorldPosition(v); return v.copy(this.root.position).setY(this.root.position.y + 1.5); }

  update(dt: number, inp: Input, room: Room, camYaw: number | null = null) {
    let speed = 0, turn = 0;
    // knife: hold the aim button to ready the knife, attack button to slash (like the original R1 + X)
    const canAim = this.knifeOn && !this.lighterOn && !this.frozen;
    this.aiming = canAim && (inp.aim || this.kState === 'slash');
    if (!this.aiming) this.kState = 'none';
    if (!this.frozen && camYaw !== null) {
      // over-the-shoulder camera: movement relative to the camera, Claire turns towards the direction of travel
      const mx = (inp.strafeR ? 1 : 0) - (inp.strafeL ? 1 : 0), mz = (inp.fwd ? 1 : 0) - (inp.back ? 1 : 0);
      let target: number | null = null;
      if (this.aiming) target = camYaw;
      else if (mx || mz) {
        const cy = Math.cos(camYaw), sy = Math.sin(camYaw);
        const dx = -sy * mz + cy * mx, dz = -cy * mz - sy * mx;
        target = Math.atan2(-dx, -dz); speed = inp.run ? RUN : WALK;
      }
      if (target !== null) {
        let d = target - this.heading; d = Math.atan2(Math.sin(d), Math.cos(d));
        const mxTurn = (this.aiming ? 14 : 9) * dt; this.heading += THREE.MathUtils.clamp(d, -mxTurn, mxTurn);
        if (Math.abs(d) > 1.6 && speed > 0) speed *= 0.35;
        if (!speed && Math.abs(d) > 0.05 && !this.aiming) turn = Math.sign(d);
      }
    } else if (!this.frozen) {
      if (inp.left) turn += 1; if (inp.right) turn -= 1;
      if (inp.fwd) speed = inp.run ? RUN : WALK; else if (inp.back) speed = -0.62;
      if (this.aiming) { speed = 0; }
    }
    this.heading += turn * TURN * dt * (speed > WALK ? 0.8 : 1) * (camYaw !== null ? 0 : 1);
    this.root.rotation.y = this.heading;
    if (this.aiming) this.updateKnife(dt, inp);
    else if (speed > 0) { this.state = speed > WALK ? 'run' : 'walk'; this.play(this.state); }
    else if (speed < 0) { this.state = 'back'; this.play('back'); }
    else if (turn !== 0) { this.state = 'turn'; this.play('walk', 0.15, 0.7); }
    else { this.state = 'idle'; this.play('idle', 0.25); }
    if (speed !== 0) {
      const f = this.forward(); const np = this.root.position.clone().addScaledVector(f, speed * dt);
      room.resolve(np, RADIUS);
      const y = room.floorAt(np.x, np.z, this.root.position.y);
      if (y !== null && Math.abs(y - this.root.position.y) < 0.5) this.root.position.set(np.x, y, np.z);
    } else {
      const y = room.floorAt(this.root.position.x, this.root.position.z, this.root.position.y);
      if (y !== null) this.root.position.y = y;
    }
    this.mixer.update(dt);
    this.updateTail(dt);
    this.updateLighter(dt);
    this.updateHands();
  }
  private slashHit = false;
  /** knife: ready (k00) -> stance (k03/k06/k09); attack plays the slash of the current direction.
   *  W/↑ while holding the knife aims up, S/↓ aims down (as in the original). */
  private updateKnife(dt: number, inp: Input) {
    const dir = inp.fwd ? 1 : inp.back ? 2 : 0;
    this.kT += dt;
    if (this.kState === 'none') { this.kState = 'draw'; this.kT = 0; this.kQueued = false; this.playId(K_DRAW, 0.12, false); }
    if (inp.attack && this.kState !== 'stance') this.kQueued = true;
    if (this.kState === 'draw' && this.kT >= K_DRAW_T) { this.kState = 'stance'; this.kT = 0; }
    if (this.kState === 'slash') {
      if (!this.slashHit && this.kT >= K_HIT_T) {
        this.slashHit = true; this.root.updateMatrixWorld(true);
        const f = this.forward(), w = this.bones.b09 ? this.bones.b09.getWorldPosition(new THREE.Vector3()) : this.headPos();
        this.onSlash?.(w.addScaledVector(f, 0.25), f);
      }
      if (this.kT >= K_SLASH_T) { this.kState = 'stance'; this.kT = 0; }
    }
    if (this.kState === 'stance') {
      if (inp.attack || this.kQueued) { this.kQueued = false; this.kState = 'slash'; this.kT = 0; this.kDir = dir; this.slashHit = false; this.playId(K_SLASH[dir], 0.06, false); }
      else { this.kDir = dir; this.playId(K_STANCE[dir], 0.15, true); }
    }
    this.slashT = this.kState === 'slash' ? this.kT : -1;
    this.state = this.kState === 'slash' ? 'slash' : 'aim';
  }
  /** two-bone IK of the right arm towards world target T */
  private solveArm(T: THREE.Vector3, w: number, poleDir: THREE.Vector3) {
    const S = this.bones.b07, E = this.bones.b08, W = this.bones.b09; if (!S || !E || !W) return;
    const s = S.getWorldPosition(new THREE.Vector3()), e = E.getWorldPosition(new THREE.Vector3()), wv = W.getWorldPosition(new THREE.Vector3());
    const a = s.distanceTo(e), b = e.distanceTo(wv);
    const dTS = T.clone().sub(s); let d = dTS.length(); const maxd = (a + b) * 0.98; if (d > maxd) { dTS.setLength(maxd); d = maxd; T = s.clone().add(dTS); }
    const dir = dTS.clone().normalize();
    const n = poleDir.clone().normalize().addScaledVector(dir, -poleDir.clone().normalize().dot(dir)).normalize();
    const cosA = THREE.MathUtils.clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1), sinA = Math.sqrt(1 - cosA * cosA);
    const e2 = s.clone().addScaledVector(dir, a * cosA).addScaledVector(n, a * sinA);
    this.aimBone(S, e.clone().sub(s), e2.clone().sub(s), w);
    const e3 = E.getWorldPosition(new THREE.Vector3()), w3 = W.getWorldPosition(new THREE.Vector3());
    this.aimBone(E, w3.clone().sub(e3), T.clone().sub(e3), w);
  }

  private updateTail(dt: number) {
    if (!this.tail.length || dt <= 0) return;
    const vel = this.root.position.clone().sub(this.lastPos).divideScalar(dt); this.lastPos.copy(this.root.position);
    let dh = this.heading - this.lastHead; this.lastHead = this.heading; dh = Math.atan2(Math.sin(dh), Math.cos(dh)) / dt;
    const f = this.forward(), fv = vel.x * f.x + vel.z * f.z;
    const target = new THREE.Vector2(THREE.MathUtils.clamp(fv * 0.22, -0.3, 0.6), THREE.MathUtils.clamp(-dh * 0.12, -0.5, 0.5));
    target.x += Math.sin(this.mixer.time * 9) * 0.03 * Math.min(1, Math.abs(fv));
    this.swayV.addScaledVector(target.clone().sub(this.sway), 60 * dt).multiplyScalar(Math.exp(-7 * dt));
    this.sway.addScaledVector(this.swayV, dt);
    // the ponytail (pt0..pt3, physics driven in the game) hangs down behind the head under gravity
    const p0 = this.tail[0]; this.root.updateMatrixWorld(true);
    const side = new THREE.Vector3(-f.z, 0, f.x);
    const D = new THREE.Vector3(0, -1, 0).addScaledVector(f, -0.32 - this.sway.x * 1.1).addScaledVector(side, this.sway.y * 0.9).normalize();
    const X = side.clone().addScaledVector(D, -side.dot(D)).normalize(), Y = new THREE.Vector3().crossVectors(D, X);
    const qw = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, D));
    const pq = p0.parent!.getWorldQuaternion(new THREE.Quaternion());
    p0.quaternion.copy(pq.invert().multiply(qw));
    const q = new THREE.Quaternion();
    for (let i = 1; i < this.tail.length; i++) {
      q.setFromEuler(new THREE.Euler(-this.sway.x * 0.3, this.sway.y * 0.3, 0));
      this.tail[i].quaternion.copy(this.tailRest[i]).multiply(q);
    }
  }

  // ---- lighter: two-bone IK on the right arm (b07 shoulder, b08 elbow, b09 wrist) ----
  private aimBone(bone: THREE.Object3D, from: THREE.Vector3, to: THREE.Vector3, w: number) {
    // rotate `bone` so that world direction `from` becomes `to` (blended by w)
    const q = new THREE.Quaternion().setFromUnitVectors(from.clone().normalize(), to.clone().normalize());
    if (w < 1) q.slerp(new THREE.Quaternion(), 1 - w);
    const wq = bone.getWorldQuaternion(new THREE.Quaternion());
    const pq = bone.parent!.getWorldQuaternion(new THREE.Quaternion());
    bone.quaternion.copy(pq.invert().multiply(q).multiply(wq));
    bone.updateMatrixWorld(true);
  }
  private updateLighter(dt: number) {
    const want = this.lighterOn ? 1 : 0;
    this.armBlend += (want - this.armBlend) * Math.min(1, dt * 6);
    const S = this.bones.b07, E = this.bones.b08, W = this.bones.b09;
    const lit = this.armBlend > 0.02 && !!this.lighter && !!S && !!E && !!W;
    this.flame.visible = lit && this.armBlend > 0.6;
    this.flameLight.intensity = 0;
    if (!lit) return;
    this.root.updateMatrixWorld(true);
    const s = S.getWorldPosition(new THREE.Vector3()), e = E.getWorldPosition(new THREE.Vector3()), w = W.getWorldPosition(new THREE.Vector3());
    const a = s.distanceTo(e), b = e.distanceTo(w);
    const f = this.forward(), up = new THREE.Vector3(0, 1, 0), right = new THREE.Vector3().crossVectors(f, up).normalize();
    // hand held in front of the chest, slightly to the right, a bit below the shoulder
    const T = s.clone().addScaledVector(f, 0.33).addScaledVector(right, -0.06).addScaledVector(up, -0.08);
    const dTS = T.clone().sub(s); let d = dTS.length(); const maxd = (a + b) * 0.98; if (d > maxd) { dTS.setLength(maxd); d = maxd; T.copy(s).add(dTS); }
    const dir = dTS.clone().normalize();
    const pole = up.clone().multiplyScalar(-1).addScaledVector(right, 0.6).normalize();
    const n = pole.clone().addScaledVector(dir, -pole.dot(dir)).normalize();
    const cosA = THREE.MathUtils.clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1), sinA = Math.sqrt(1 - cosA * cosA);
    const e2 = s.clone().addScaledVector(dir, a * cosA).addScaledVector(n, a * sinA);
    this.aimBone(S, e.clone().sub(s), e2.clone().sub(s), this.armBlend);
    const e3 = E.getWorldPosition(new THREE.Vector3()), w3 = W.getWorldPosition(new THREE.Vector3());
    this.aimBone(E, w3.clone().sub(e3), T.clone().sub(e3), this.armBlend);
    // flame on top of the Zippo held in the original hand model
    this.root.updateMatrixWorld(true);
    const box = new THREE.Box3(); for (const z of this.zippoParts) box.expandByObject(z);
    const inv = new THREE.Matrix4().copy(this.root.matrixWorld).invert();
    const zc = box.isEmpty() ? W.getWorldPosition(new THREE.Vector3()) : box.getCenter(new THREE.Vector3());
    const hand = zc.clone(); if (!box.isEmpty()) hand.y = box.max.y - 0.035;
    this.flameT += dt;
    const top = hand.clone().addScaledVector(up, 0.035).applyMatrix4(inv);
    const fl = 1 + Math.sin(this.flameT * 23) * 0.08 + Math.sin(this.flameT * 37.7) * 0.06 + (Math.random() - 0.5) * 0.08;
    this.flame.position.copy(top); this.flame.scale.set(1, fl, 1);
    this.flameLight.position.copy(top).add(new THREE.Vector3(0, 0.05, 0));
    this.flameLight.intensity = this.armBlend > 0.6 ? 2.6 * fl : 0;
  }
}
