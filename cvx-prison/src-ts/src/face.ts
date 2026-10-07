import * as THREE from 'three';

/**
 * Facial animation. The original models keep the face as separate rigid parts: nodes 6/7/9 are the
 * mouth (driven by the voice data, bhLipSet) and 8/10 the eyes (blinking). The player model
 * (claire.glb) has no such nodes in the converted data, so tools/face_joints.py restores them as
 * f06..f10; the cutscene characters (en91/en93/en98) already carry them as b06..b10.
 */
export class Face {
  private mouth: THREE.Object3D[] = [];
  private eyes: THREE.Object3D[] = [];
  private blinkT = 1.5 + Math.random() * 3;
  private blink = 0;
  private pain = 0;
  /** current mouth opening 0..1 (set from the voice level each frame) */
  open = 0;
  constructor(bones: Record<string, THREE.Object3D>, private prefix = 'b') {
    for (const n of [prefix + '06', prefix + '07', prefix + '09']) { const b = bones[n]; if (b) this.mouth.push(b); }
    for (const n of [prefix + '08', prefix + '10']) { const b = bones[n]; if (b) this.eyes.push(b); }
  }
  get ok() { return this.mouth.length > 0 || this.eyes.length > 0; }
  /** pain expression 0..1 (bitten, hurt): the mouth is pulled open and the eyes squeeze shut */
  setPain(v: number) { this.pain = v; }
  update(dt: number, open: number) {
    this.open = open;
    // blink: a short close, then open again (the original blinks every couple of seconds)
    this.blinkT -= dt;
    if (this.blinkT <= 0) { this.blinkT = 2.2 + Math.random() * 3.5; this.blink = 1; }
    this.blink = Math.max(0, this.blink - dt * 9);
    const closed = Math.max(this.blink, this.pain * 0.85);
    for (const e of this.eyes) e.scale.set(1, Math.max(0.06, 1 - 0.95 * closed), 1);
    const m = Math.max(open * 0.32, this.pain * 0.22);
    for (const b of this.mouth) b.rotation.x = -m;
  }
}
