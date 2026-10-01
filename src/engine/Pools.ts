import * as THREE from 'three';
import { bloodSplatTexture, glowTexture } from './Materials';

/**
 * Object pools — everything spawned during combat is pre-allocated and instanced,
 * so a firefight costs a constant number of draw calls (1 per pool) and zero GC.
 */
const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _z = new THREE.Vector3(0, 0, 1);

export class DecalPool {
  mesh: THREE.InstancedMesh;
  private i = 0;
  constructor(scene: THREE.Scene, count: number, texture = bloodSplatTexture(), color = 0xffffff, private defaultScale = 0.5) {
    const mat = new THREE.MeshStandardMaterial({
      map: texture, transparent: true, depthWrite: false, roughness: 0.25, metalness: 0, color,
      polygonOffset: true, polygonOffsetFactor: -4,
    });
    this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), mat, count);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1;
    _m.makeScale(0, 0, 0);
    for (let k = 0; k < count; k++) this.mesh.setMatrixAt(k, _m);
    scene.add(this.mesh);
  }
  add(pos: THREE.Vector3, normal: THREE.Vector3, scale = this.defaultScale): void {
    _q.setFromUnitVectors(_z, normal);
    const spin = new THREE.Quaternion().setFromAxisAngle(_z, Math.random() * Math.PI * 2);
    _q.multiply(spin);
    _s.set(scale, scale, scale);
    _m.compose(pos.clone().addScaledVector(normal, 0.012), _q, _s);
    this.mesh.setMatrixAt(this.i, _m);
    this.mesh.instanceMatrix.needsUpdate = true;
    this.i = (this.i + 1) % this.mesh.count;
  }
}

export class ShellPool {
  mesh: THREE.InstancedMesh;
  private pos: THREE.Vector3[] = [];
  private vel: THREE.Vector3[] = [];
  private rot: THREE.Euler[] = [];
  private spin: THREE.Vector3[] = [];
  private life: number[] = [];
  private i = 0;
  constructor(scene: THREE.Scene, count = 48) {
    const geo = new THREE.CylinderGeometry(0.006, 0.006, 0.022, 6);
    const mat = new THREE.MeshStandardMaterial({ color: 0xc8a040, metalness: 1, roughness: 0.3 });
    this.mesh = new THREE.InstancedMesh(geo, mat, count);
    this.mesh.frustumCulled = false;
    for (let k = 0; k < count; k++) {
      this.pos.push(new THREE.Vector3(0, -10, 0)); this.vel.push(new THREE.Vector3()); this.rot.push(new THREE.Euler());
      this.spin.push(new THREE.Vector3()); this.life.push(0);
    }
    scene.add(this.mesh);
  }
  eject(from: THREE.Vector3, right: THREE.Vector3, color?: number): void {
    const k = this.i; this.i = (this.i + 1) % this.pos.length;
    this.pos[k].copy(from);
    this.vel[k].copy(right).multiplyScalar(1.5 + Math.random()).add(new THREE.Vector3(0, 1.8 + Math.random(), 0));
    this.spin[k].set(Math.random() * 20, Math.random() * 20, Math.random() * 20);
    this.life[k] = 6;
    if (color !== undefined) this.mesh.setColorAt(k, new THREE.Color(color));
  }
  update(dt: number): void {
    for (let k = 0; k < this.pos.length; k++) {
      if (this.life[k] <= 0) continue;
      this.life[k] -= dt;
      const p = this.pos[k], v = this.vel[k];
      if (p.y > 0.008 || v.y > 0) {
        v.y -= 9.8 * dt;
        p.addScaledVector(v, dt);
        this.rot[k].x += this.spin[k].x * dt; this.rot[k].y += this.spin[k].y * dt; this.rot[k].z += this.spin[k].z * dt;
        if (p.y < 0.008) {
          p.y = 0.008; v.y *= -0.35; v.x *= 0.5; v.z *= 0.5; this.spin[k].multiplyScalar(0.4);
          if (Math.abs(v.y) < 0.3) { v.set(0, 0, 0); this.rot[k].x = Math.PI / 2; }
        }
      }
      _m.compose(p, _q.setFromEuler(this.rot[k]), _s.set(1, 1, 1));
      this.mesh.setMatrixAt(k, _m);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}

/** CPU particle system rendered as a single THREE.Points (blood spray, sparks, dust puffs). */
export class ParticlePool {
  points: THREE.Points;
  private p: Float32Array;
  private v: Float32Array;
  private life: Float32Array;
  private n: number;
  private i = 0;
  onGround?: (pos: THREE.Vector3) => void;
  constructor(scene: THREE.Scene, count: number, color: number, size: number, additive = false, private gravity = 9.8) {
    this.n = count;
    this.p = new Float32Array(count * 3).fill(-999);
    this.v = new Float32Array(count * 3);
    this.life = new Float32Array(count);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.p, 3));
    const mat = new THREE.PointsMaterial({
      color, size, map: glowTexture(), transparent: true, depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, sizeAttenuation: true,
    });
    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }
  burst(pos: THREE.Vector3, dir: THREE.Vector3, count: number, speed: number, spread: number, life = 1): void {
    for (let c = 0; c < count; c++) {
      const k = this.i; this.i = (this.i + 1) % this.n;
      this.p[k * 3] = pos.x; this.p[k * 3 + 1] = pos.y; this.p[k * 3 + 2] = pos.z;
      const s = speed * (0.4 + Math.random() * 0.8);
      this.v[k * 3] = (dir.x + (Math.random() - 0.5) * spread) * s;
      this.v[k * 3 + 1] = (dir.y + (Math.random() - 0.3) * spread) * s;
      this.v[k * 3 + 2] = (dir.z + (Math.random() - 0.5) * spread) * s;
      this.life[k] = life * (0.5 + Math.random() * 0.5);
    }
  }
  update(dt: number): void {
    for (let k = 0; k < this.n; k++) {
      if (this.life[k] <= 0) continue;
      this.life[k] -= dt;
      this.v[k * 3 + 1] -= this.gravity * dt;
      this.p[k * 3] += this.v[k * 3] * dt;
      this.p[k * 3 + 1] += this.v[k * 3 + 1] * dt;
      this.p[k * 3 + 2] += this.v[k * 3 + 2] * dt;
      if (this.p[k * 3 + 1] < 0.01) {
        this.p[k * 3 + 1] = 0.01;
        if (this.onGround && Math.random() < 0.05) this.onGround(new THREE.Vector3(this.p[k * 3], 0, this.p[k * 3 + 2]));
        this.life[k] = 0;
      }
      if (this.life[k] <= 0) this.p[k * 3 + 1] = -999;
    }
    (this.points.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  }
}

/** Severed limbs / gibs: simple rigid-body tumbling until they rest on the floor. */
export class DebrisPool {
  private items: { obj: THREE.Object3D; vel: THREE.Vector3; spin: THREE.Vector3; life: number }[] = [];
  constructor(private scene: THREE.Scene, private max = 24) {}
  add(obj: THREE.Object3D, vel: THREE.Vector3): void {
    this.scene.attach(obj);
    this.items.push({ obj, vel, spin: new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12), life: 40 });
    if (this.items.length > this.max) {
      const old = this.items.shift()!;
      old.obj.removeFromParent();
    }
  }
  update(dt: number): void {
    for (const it of this.items) {
      it.life -= dt;
      if (it.vel.lengthSq() === 0) continue;
      it.vel.y -= 9.8 * dt;
      it.obj.position.addScaledVector(it.vel, dt);
      it.obj.rotation.x += it.spin.x * dt; it.obj.rotation.y += it.spin.y * dt; it.obj.rotation.z += it.spin.z * dt;
      if (it.obj.position.y < 0.06) {
        it.obj.position.y = 0.06;
        it.vel.y *= -0.25; it.vel.x *= 0.5; it.vel.z *= 0.5; it.spin.multiplyScalar(0.4);
        if (Math.abs(it.vel.y) < 0.4) it.vel.set(0, 0, 0);
      }
    }
  }
}

export class MuzzleFlash {
  light: THREE.PointLight;
  sprite: THREE.Sprite;
  sprite2: THREE.Sprite;
  private t = 0;
  constructor(scene: THREE.Scene) {
    this.light = new THREE.PointLight(0xffb060, 0, 9, 2);
    this.sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTexture('rgba(255,230,160,1)', 'rgba(255,120,20,0)'), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
    }));
    this.sprite.scale.setScalar(0.35);
    this.sprite.visible = false;
    this.sprite2 = new THREE.Sprite(this.sprite.material.clone());
    this.sprite2.visible = false;
    scene.add(this.light, this.sprite, this.sprite2);
  }
  /** pos2: second muzzle of a dual-wield weapon (one shared light at the midpoint) */
  fire(pos: THREE.Vector3, scale = 1, pos2?: THREE.Vector3 | null): void {
    this.t = 0.05;
    this.light.position.copy(pos);
    if (pos2) this.light.position.lerp(pos2, 0.5);
    this.sprite.position.copy(pos);
    this.sprite.scale.setScalar(0.25 * scale + Math.random() * 0.15);
    this.sprite.material.rotation = Math.random() * Math.PI;
    this.light.intensity = 25 * scale * (pos2 ? 1.5 : 1);
    this.sprite.visible = true;
    if (pos2) {
      this.sprite2.position.copy(pos2);
      this.sprite2.scale.setScalar(0.25 * scale + Math.random() * 0.15);
      this.sprite2.material.rotation = Math.random() * Math.PI;
      this.sprite2.visible = true;
    }
  }
  update(dt: number): void {
    this.t -= dt;
    if (this.t <= 0) { this.light.intensity = 0; this.sprite.visible = false; this.sprite2.visible = false; }
  }
}
