import * as THREE from 'three';
import type { PhysicsWorld } from '../../engine/Physics';
import { bus } from '../../engine/Events';
import { damp } from '../Rig';

/**
 * RE2-Remake style over-the-shoulder camera: right-shoulder offset, tighter + narrower FOV while
 * aiming, collision pull-in, recoil kicks and screen shake.
 */
export class CameraRig {
  yaw = 0;
  pitch = -0.12;
  aimBlend = 0;
  private dist = 2.6;
  private shakeT = 0;
  private shakeS = 0;
  private bob = 0;
  shoulderSide = 1; // 1 = right shoulder

  constructor(public camera: THREE.PerspectiveCamera, private physics: PhysicsWorld) {
    bus.on('cameraShake', ({ strength, duration }) => {
      this.shakeS = Math.max(this.shakeS, strength);
      this.shakeT = Math.max(this.shakeT, duration);
    });
  }

  forward(out = new THREE.Vector3()): THREE.Vector3 {
    return out.set(Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), Math.cos(this.yaw) * Math.cos(this.pitch));
  }
  flatForward(out = new THREE.Vector3()): THREE.Vector3 { return out.set(Math.sin(this.yaw), 0, Math.cos(this.yaw)); }
  flatRight(out = new THREE.Vector3()): THREE.Vector3 { return out.set(-Math.cos(this.yaw), 0, Math.sin(this.yaw)); }

  addLook(dYaw: number, dPitch: number): void {
    this.yaw -= dYaw;
    this.pitch = THREE.MathUtils.clamp(this.pitch - dPitch, -1.2, 1.0);
  }

  update(dt: number, target: THREE.Vector3, aiming: boolean, speed: number, crouchOffset = 0): void {
    this.aimBlend = damp(this.aimBlend, aiming ? 1 : 0, 12, dt);
    const a = this.aimBlend;
    const wantDist = THREE.MathUtils.lerp(2.5, 1.35, a);
    const shoulder = THREE.MathUtils.lerp(0.5, 0.62, a) * this.shoulderSide;
    const height = THREE.MathUtils.lerp(1.62, 1.58, a) - crouchOffset;
    const fwd = this.forward();
    const right = this.flatRight();
    this.bob += dt * speed * 2.2;
    const bobY = Math.sin(this.bob * 2) * 0.012 * Math.min(1, speed / 3) * (1 - a);

    const head = target.clone().add(new THREE.Vector3(0, height, 0));
    const pivot = head.clone().addScaledVector(right, shoulder);
    // keep the shoulder offset from clipping into walls
    const toPivot = pivot.clone().sub(head);
    const sideHit = this.physics.raycast(head, toPivot.clone().normalize(), toPivot.length() + 0.2);
    if (sideHit) pivot.copy(head).addScaledVector(toPivot.normalize(), Math.max(0, sideHit.distance - 0.2));

    const back = fwd.clone().negate();
    const hit = this.physics.raycast(pivot, back, wantDist + 0.25);
    const allowed = hit ? Math.max(0.25, hit.distance - 0.25) : wantDist;
    this.dist = allowed < this.dist ? allowed : damp(this.dist, allowed, 6, dt);
    const pos = pivot.clone().addScaledVector(back, this.dist);
    pos.y += bobY;

    if (this.shakeT > 0) {
      this.shakeT -= dt;
      const s = this.shakeS * Math.max(0, this.shakeT) * 0.25;
      pos.x += (Math.random() - 0.5) * s; pos.y += (Math.random() - 0.5) * s; pos.z += (Math.random() - 0.5) * s;
      if (this.shakeT <= 0) this.shakeS = 0;
    }
    this.camera.position.copy(pos);
    this.camera.lookAt(pos.clone().add(fwd));
    const fov = THREE.MathUtils.lerp(62, 44, a);
    if (Math.abs(this.camera.fov - fov) > 0.01) { this.camera.fov = fov; this.camera.updateProjectionMatrix(); }
  }
}
