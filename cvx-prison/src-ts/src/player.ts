import * as THREE from 'three';
import { loadGLTF, toLambert } from './assets';
import type { Input } from './input';
import type { Room } from './room';

// Original motion clips (pl00 motion bank): 0 walk, 4 run, 11 walk back (Fine), 35 idle (Fine), 46/47 turns.
const CLIPS: Record<string, string> = { idle: 'm35', walk: 'm00', run: 'm04', back: 'm11', turnL: 'm46', turnR: 'm47' };
const WALK = 1.05, RUN = 2.6, TURN = 2.6, RADIUS = 0.2;

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
  private lighter: THREE.Object3D | null = null;
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
  private async loadLighter() {
    try {
      const g = await loadGLTF('inv/it_055.glb');
      const m = g.scene.clone(true); toLambert(m);
      const box = new THREE.Box3().setFromObject(m), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
      m.position.sub(c);
      const piv = new THREE.Group(); piv.add(m);
      // the zippo model stands along its longest axis: scale it to ~6 cm
      const s = 0.06 / Math.max(size.x, size.y, size.z); piv.scale.setScalar(s);
      // make the long axis vertical
      if (size.x >= size.y && size.x >= size.z) m.rotation.z = Math.PI / 2; else if (size.z >= size.y && size.z >= size.x) m.rotation.x = Math.PI / 2;
      this.lighter = piv; piv.visible = false;
      this.root.add(piv);
    } catch { this.lighter = null; }
    const fg = new THREE.ConeGeometry(0.009, 0.035, 10, 1, true); fg.translate(0, 0.0175, 0);
    this.flame = new THREE.Mesh(fg, new THREE.MeshBasicMaterial({ color: 0xffb040, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.006, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff0c0, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    core.position.y = 0.006; this.flame.add(core);
    this.flame.visible = false; this.root.add(this.flame);
    this.flameLight = new THREE.PointLight(0xffa850, 0, 6, 1.6); this.root.add(this.flameLight);
  }
  setLighter(on: boolean) { this.lighterOn = on && !!this.lighter; }

  play(name: string, fade = 0.18, speed = 1) {
    const id = CLIPS[name]; const a = this.actions.get(id); if (!a) return;
    a.timeScale = speed; if (this.cur === id) return;
    const prev = this.actions.get(this.cur);
    a.reset().setLoop(THREE.LoopRepeat, Infinity).play();
    if (prev && fade > 0) a.crossFadeFrom(prev, fade, false); else if (prev) prev.stop();
    this.cur = id;
  }
  get pos() { return this.root.position; }
  forward(v = new THREE.Vector3()) { return v.set(-Math.sin(this.heading), 0, -Math.cos(this.heading)); }
  place(x: number, y: number, z: number, h: number) { this.root.position.set(x, y, z); this.heading = h; this.root.rotation.y = h; this.lastPos.set(x, y, z); this.lastHead = h; }
  /** world position of Claire's head (camera target) */
  headPos(v = new THREE.Vector3()) { const b = this.bones.b05; if (b) return b.getWorldPosition(v); return v.copy(this.root.position).setY(this.root.position.y + 1.5); }

  update(dt: number, inp: Input, room: Room, camRelative = false) {
    let speed = 0, turn = 0;
    if (!this.frozen) {
      if (inp.left) turn += 1; if (inp.right) turn -= 1;
      if (inp.fwd) speed = inp.run ? RUN : WALK; else if (inp.back) speed = -0.62;
    }
    void camRelative;
    this.heading += turn * TURN * dt * (speed > WALK ? 0.8 : 1);
    this.root.rotation.y = this.heading;
    if (speed > 0) { this.state = speed > WALK ? 'run' : 'walk'; this.play(this.state); }
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
    const q = new THREE.Quaternion();
    for (let i = 0; i < this.tail.length; i++) {
      const k = i === 0 ? 0.6 : 0.35;
      q.setFromEuler(new THREE.Euler(-this.sway.x * k, 0, this.sway.y * k));
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
    if (this.lighter) this.lighter.visible = lit && this.armBlend > 0.5;
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
    // lighter sits in the palm, upright
    const hand = W.getWorldPosition(new THREE.Vector3()).addScaledVector(f, 0.035).addScaledVector(up, 0.01);
    const L = this.lighter!; const inv = new THREE.Matrix4().copy(this.root.matrixWorld).invert();
    L.position.copy(hand.clone().applyMatrix4(inv)); L.quaternion.identity();
    this.flameT += dt;
    const top = hand.clone().addScaledVector(up, 0.035).applyMatrix4(inv);
    const fl = 1 + Math.sin(this.flameT * 23) * 0.08 + Math.sin(this.flameT * 37.7) * 0.06 + (Math.random() - 0.5) * 0.08;
    this.flame.position.copy(top); this.flame.scale.set(1, fl, 1);
    this.flameLight.position.copy(top).add(new THREE.Vector3(0, 0.05, 0));
    this.flameLight.intensity = this.armBlend > 0.6 ? 2.6 * fl : 0;
  }
}
