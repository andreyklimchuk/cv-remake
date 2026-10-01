import { LightPool } from './LightPool';
import * as THREE from 'three';
import { RenderCaps } from './Renderer';
import { glowTexture } from './Materials';

/**
 * Volumetric atmosphere kit:
 *  - LightShaft: analytic single-scattering cone (soft edges, distance falloff, view-angle fade)
 *  - DustField: floating motes that catch light
 *  - FireEmitter: GPU-shaded additive flame + smoke + flickering light
 *  - Rain: streaks around the camera for outdoor zones
 * Combined with exponential height-like fog in the scene.
 */
export function createLightShaft(color: number, length: number, radius: number, intensity = 0.25): THREE.Mesh {
  const geo = new THREE.CylinderGeometry(0.05, radius, length, 32, 1, true);
  geo.translate(0, -length / 2, 0); // apex at origin, pointing -Y
  let mat: THREE.Material;
  if (RenderCaps.customShaders) {
    mat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(color) }, uIntensity: { value: intensity }, uLength: { value: length }, uTime: { value: 0 } },
      vertexShader: `varying float vY; varying vec3 vN; varying vec3 vView; varying vec3 vWorld;
        void main(){ vY = position.y; vN = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(position,1.0); vView = normalize(-mv.xyz);
          vWorld = (modelMatrix * vec4(position,1.0)).xyz; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 uColor; uniform float uIntensity, uLength, uTime; varying float vY; varying vec3 vN; varying vec3 vView; varying vec3 vWorld;
        float h(vec3 p){ return fract(sin(dot(p, vec3(12.9,78.2,37.7))) * 43758.5); }
        void main(){
          float along = clamp(-vY / uLength, 0.0, 1.0);
          float edge = pow(abs(dot(vN, vView)), 1.6);
          float dust = 0.85 + 0.15 * sin(vWorld.x * 3.0 + uTime * 0.7) * sin(vWorld.z * 2.0 - uTime * 0.5);
          float a = uIntensity * edge * pow(1.0 - along, 1.8) * dust;
          gl_FragColor = vec4(uColor * a, a);
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    });
  } else {
    mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: intensity * 0.3, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  }
  const m = new THREE.Mesh(geo, mat);
  m.renderOrder = 2;
  m.userData.volumetric = true;
  return m;
}

export class DustField {
  points: THREE.Points;
  private base: Float32Array;
  constructor(scene: THREE.Scene, private center: THREE.Vector3, private size: THREE.Vector3, count: number) {
    this.base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      this.base[i * 3] = center.x + (Math.random() - 0.5) * size.x;
      this.base[i * 3 + 1] = Math.random() * size.y;
      this.base[i * 3 + 2] = center.z + (Math.random() - 0.5) * size.z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.base.slice(), 3));
    this.points = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xbfb7a0, size: 0.025, transparent: true, opacity: 0.5, depthWrite: false, map: glowTexture(), blending: THREE.AdditiveBlending,
    }));
    scene.add(this.points);
  }
  update(t: number): void {
    const a = this.points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = a.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = this.base[i] + Math.sin(t * 0.2 + i) * 0.3;
      arr[i + 1] = this.base[i + 1] + Math.sin(t * 0.13 + i * 0.7) * 0.2;
      arr[i + 2] = this.base[i + 2] + Math.cos(t * 0.17 + i) * 0.3;
    }
    a.needsUpdate = true;
  }
}

export class FireEmitter {
  group = new THREE.Group();
  light: THREE.PointLight;
  private flames: THREE.Points;
  private smoke: THREE.Points;
  private fp: Float32Array; private fv: Float32Array; private fl: Float32Array;
  private sp: Float32Array; private sl: Float32Array;
  private n: number;
  active = true;
  private strength = 1;

  constructor(scene: THREE.Scene, pos: THREE.Vector3, private radius: number, count: number, castShadow = false) {
    this.n = count;
    this.group.position.copy(pos);
    this.fp = new Float32Array(count * 3); this.fv = new Float32Array(count * 3); this.fl = new Float32Array(count);
    const sc = Math.floor(count / 3);
    this.sp = new Float32Array(sc * 3); this.sl = new Float32Array(sc);
    for (let i = 0; i < count; i++) this.respawn(i, Math.random());
    for (let i = 0; i < sc; i++) { this.sl[i] = Math.random(); this.sp[i * 3 + 1] = Math.random() * 4; }

    const fgeo = new THREE.BufferGeometry();
    fgeo.setAttribute('position', new THREE.BufferAttribute(this.fp, 3));
    fgeo.setAttribute('aLife', new THREE.BufferAttribute(this.fl, 1));
    let fmat: THREE.Material;
    if (RenderCaps.customShaders) {
      fmat = new THREE.ShaderMaterial({
        uniforms: { uScale: { value: window.innerHeight * 0.5 } },
        vertexShader: `attribute float aLife; varying float vLife; uniform float uScale;
          void main(){ vLife = aLife; vec4 mv = modelViewMatrix * vec4(position,1.0);
            gl_PointSize = (0.25 + 0.55 * (1.0 - aLife)) * uScale / -mv.z; gl_Position = projectionMatrix * mv; }`,
        fragmentShader: `varying float vLife;
          void main(){ vec2 c = gl_PointCoord - 0.5; float d = length(c); if(d>0.5) discard;
            float a = smoothstep(0.5, 0.0, d) * (1.0 - vLife) * 0.9;
            vec3 col = mix(vec3(1.0,0.85,0.4), vec3(1.0,0.25,0.02), vLife);
            gl_FragColor = vec4(col * a * 2.2, a); }`,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      });
    } else {
      fmat = new THREE.PointsMaterial({ color: 0xff8030, size: 0.5, map: glowTexture(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    }
    this.flames = new THREE.Points(fgeo, fmat);
    this.flames.frustumCulled = false;
    const sgeo = new THREE.BufferGeometry();
    sgeo.setAttribute('position', new THREE.BufferAttribute(this.sp, 3));
    this.smoke = new THREE.Points(sgeo, new THREE.PointsMaterial({ color: 0x1a1612, size: 1.4, map: glowTexture('rgba(255,255,255,0.5)'), transparent: true, opacity: 0.35, depthWrite: false }));
    this.smoke.frustumCulled = false;
    this.light = new THREE.PointLight(0xff7a2a, 60, 18, 1.8);
    this.light.position.set(0, 1, 0);
    this.light.castShadow = castShadow;
    if (castShadow) { this.light.shadow.mapSize.set(512, 512); this.light.shadow.bias = -0.002; }
    this.group.add(this.flames, this.smoke, this.light);
    scene.add(this.group);
    LightPool.active?.adopt(this.group);
  }

  private respawn(i: number, life = 0): void {
    const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * this.radius;
    this.fp[i * 3] = Math.cos(a) * r; this.fp[i * 3 + 1] = Math.random() * 0.2; this.fp[i * 3 + 2] = Math.sin(a) * r;
    this.fv[i * 3] = (Math.random() - 0.5) * 0.3; this.fv[i * 3 + 1] = 1.2 + Math.random() * 1.6; this.fv[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    this.fl[i] = life;
  }

  extinguish(): void { this.active = false; }

  update(dt: number, t: number): void {
    const target = this.active ? 1 : 0;
    this.strength += (target - this.strength) * Math.min(1, dt * 1.5);
    for (let i = 0; i < this.n; i++) {
      this.fl[i] += dt * (0.9 + Math.random() * 0.4);
      if (this.fl[i] >= 1) { if (this.strength > 0.05) this.respawn(i); else { this.fp[i * 3 + 1] = -99; continue; } }
      this.fp[i * 3] += this.fv[i * 3] * dt - this.fp[i * 3] * dt * 0.8;
      this.fp[i * 3 + 1] += this.fv[i * 3 + 1] * dt * this.strength;
      this.fp[i * 3 + 2] += this.fv[i * 3 + 2] * dt - this.fp[i * 3 + 2] * dt * 0.8;
    }
    for (let i = 0; i < this.sl.length; i++) {
      this.sl[i] += dt * 0.25;
      if (this.sl[i] > 1) { this.sl[i] = 0; this.sp[i * 3] = (Math.random() - 0.5) * this.radius; this.sp[i * 3 + 1] = 1.5; this.sp[i * 3 + 2] = (Math.random() - 0.5) * this.radius; }
      this.sp[i * 3 + 1] += dt * 1.1; this.sp[i * 3] += dt * 0.3;
    }
    (this.flames.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (this.flames.geometry.attributes.aLife as THREE.BufferAttribute).needsUpdate = true;
    (this.smoke.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    this.light.intensity = (55 + Math.sin(t * 17) * 9 + Math.sin(t * 31.7) * 7 + Math.random() * 10) * this.strength;
  }
}

export class Rain {
  lines: THREE.LineSegments;
  private pos: Float32Array;
  private floor: Float32Array;
  private n: number;
  constructor(scene: THREE.Scene, count: number, private area = 26) {
    this.n = count;
    this.pos = new Float32Array(count * 6).fill(-1000);
    this.floor = new Float32Array(count).fill(-2000);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
    this.lines = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x8899aa, transparent: true, opacity: 0.35, depthWrite: false }));
    this.lines.frustumCulled = false;
    scene.add(this.lines);
  }
  /**
   * Drops only exist above open-sky areas (union of the outdoor boxes) and die on the ground below them,
   * so nothing falls through roofs of interiors next to a courtyard.
   */
  private reset(i: number, center: THREE.Vector3, boxes: THREE.Box3[], ground?: (x: number, z: number) => number, fresh = false): void {
    const o = i * 6;
    const x = center.x + (Math.random() - 0.5) * this.area, z = center.z + (Math.random() - 0.5) * this.area;
    let inside = false;
    for (const b of boxes) if (x >= b.min.x && x <= b.max.x && z >= b.min.z && z <= b.max.z) { inside = true; break; }
    if (!inside) { this.pos.fill(-1000, o, o + 6); this.floor[i] = -2000; return; }
    const gy = ground ? ground(x, z) : 0;
    const top = Math.max(gy, center.y) + 9 + Math.random() * 4;
    const y = fresh ? gy + Math.random() * (top - gy) : top;
    this.floor[i] = gy;
    this.pos.set([x, y, z, x + 0.03, y + 0.35, z + 0.02], o);
  }
  update(dt: number, center: THREE.Vector3, boxes: THREE.Box3[], ground?: (x: number, z: number) => number): void {
    const fresh = !this.lines.userData.init;
    this.lines.userData.init = true;
    const half = this.area * 0.5;
    for (let i = 0; i < this.n; i++) {
      const o = i * 6;
      if (fresh) { this.reset(i, center, boxes, ground, true); continue; }
      if (this.floor[i] < -1500) { if (Math.random() < 0.08) this.reset(i, center, boxes, ground); continue; }
      this.pos[o + 1] -= 16 * dt; this.pos[o + 4] -= 16 * dt;
      this.pos[o] -= 0.5 * dt; this.pos[o + 3] -= 0.5 * dt;
      const far = Math.abs(this.pos[o] - center.x) > half || Math.abs(this.pos[o + 2] - center.z) > half;
      if (this.pos[o + 1] < this.floor[i] || far) this.reset(i, center, boxes, ground);
    }
    (this.lines.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  }
}
