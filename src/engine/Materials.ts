import * as THREE from 'three';

/**
 * Procedural "photogrammetry-style" PBR material factory.
 * All textures are generated at runtime (tileable fBm noise → albedo / normal / roughness),
 * so the project ships zero copyrighted assets. Production assets would be KTX2/Basis
 * compressed and streamed via AssetStreamer — the material interface stays identical.
 */

// ---------- tileable value noise -----------------------------------------
const PERM = new Uint8Array(512);
{
  let seed = 1337;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) PERM[i] = p[i & 255];
}
const hash = (x: number, y: number) => PERM[(PERM[x & 255] + y) & 511] / 255;
const fade = (t: number) => t * t * (3 - 2 * t);

function valueNoise(x: number, y: number, period: number): number {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const x0 = ((xi % period) + period) % period, y0 = ((yi % period) + period) % period;
  const x1 = (x0 + 1) % period, y1 = (y0 + 1) % period;
  const u = fade(xf), v = fade(yf);
  const a = hash(x0, y0), b = hash(x1, y0), c = hash(x0, y1), d = hash(x1, y1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export function fbm(u: number, v: number, baseFreq: number, octaves: number, gain = 0.5): number {
  let sum = 0, amp = 0.5, freq = baseFreq, norm = 0;
  for (let o = 0; o < octaves; o++) {
    sum += valueNoise(u * freq, v * freq, freq) * amp;
    norm += amp; amp *= gain; freq *= 2;
  }
  return sum / norm;
}

// ---------- texture synthesis --------------------------------------------
type Pixel = (u: number, v: number) => { h: number; r: number; g: number; b: number; rough: number };

export interface PBRSet { map: THREE.Texture; normalMap: THREE.Texture; roughnessMap: THREE.Texture }

function synth(size: number, fn: Pixel, normalStrength = 2): PBRSet {
  const n = size * size;
  const H = new Float32Array(n);
  const albedo = new Uint8ClampedArray(n * 4);
  const rough = new Uint8ClampedArray(n * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = y * size + x;
    const p = fn(x / size, y / size);
    H[i] = p.h;
    albedo[i * 4] = p.r * 255; albedo[i * 4 + 1] = p.g * 255; albedo[i * 4 + 2] = p.b * 255; albedo[i * 4 + 3] = 255;
    const r = Math.max(0, Math.min(1, p.rough)) * 255;
    rough[i * 4] = r; rough[i * 4 + 1] = r; rough[i * 4 + 2] = r; rough[i * 4 + 3] = 255;
  }
  const normal = new Uint8ClampedArray(n * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = y * size + x;
    const l = H[y * size + ((x - 1 + size) % size)], r = H[y * size + ((x + 1) % size)];
    const t = H[((y - 1 + size) % size) * size + x], b = H[((y + 1) % size) * size + x];
    const dx = (r - l) * normalStrength * size / 64, dy = (b - t) * normalStrength * size / 64;
    const len = Math.hypot(dx, dy, 1);
    normal[i * 4] = (-dx / len * 0.5 + 0.5) * 255;
    normal[i * 4 + 1] = (dy / len * 0.5 + 0.5) * 255;
    normal[i * 4 + 2] = (1 / len * 0.5 + 0.5) * 255;
    normal[i * 4 + 3] = 255;
  }
  const mk = (data: Uint8ClampedArray<ArrayBuffer>, srgb: boolean) => {
    const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.magFilter = THREE.LinearFilter;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.generateMipmaps = true;
    t.anisotropy = 4;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.needsUpdate = true;
    return t;
  };
  return { map: mk(albedo, true), normalMap: mk(normal, false), roughnessMap: mk(rough, false) };
}

export type SurfaceKind = 'concrete' | 'wetGround' | 'brick' | 'rustMetal' | 'tiles' | 'wood' | 'denim' | 'jacket' | 'prisonCloth' | 'guardCloth' | 'zombieSkin' | 'plaster';

const cache = new Map<string, PBRSet>();

export function surface(kind: SurfaceKind, size: number): PBRSet {
  const key = kind + size;
  const hit = cache.get(key);
  if (hit) return hit;
  let set: PBRSet;
  switch (kind) {
    case 'concrete':
      set = synth(size, (u, v) => {
        const n = fbm(u, v, 4, 6), s = fbm(u + 3.1, v + 1.7, 16, 3);
        const stain = Math.pow(fbm(u, v * 0.5 + 0.2, 2, 4), 2);
        const c = 0.28 + n * 0.22 - stain * 0.18;
        return { h: n * 0.6 + s * 0.4, r: c, g: c * 0.98, b: c * 0.95, rough: 0.8 + s * 0.2 - stain * 0.2 };
      }, 3);
      break;
    case 'plaster':
      set = synth(size, (u, v) => {
        const n = fbm(u, v, 3, 5), peel = fbm(u + 7, v + 2, 6, 4) > 0.62 ? 1 : 0;
        const c = peel ? 0.25 + n * 0.1 : 0.45 + n * 0.15;
        return { h: n * 0.3 + peel * 0.5, r: c * 1.02, g: c, b: c * 0.9, rough: 0.9 };
      }, 3);
      break;
    case 'wetGround':
      set = synth(size, (u, v) => {
        const n = fbm(u, v, 5, 6), puddle = fbm(u * 0.7 + 0.3, v * 0.7, 2, 4);
        const wet = THREE.MathUtils.smoothstep(puddle, 0.5, 0.6);
        const c = 0.16 + n * 0.14;
        return { h: n * (1 - wet), r: c * 0.95, g: c * 0.9, b: c * 0.85, rough: 0.85 - wet * 0.8 };
      }, 3);
      break;
    case 'brick':
      set = synth(size, (u, v) => {
        const rows = 16, cols = 8;
        const row = Math.floor(v * rows);
        const uu = u * cols + (row % 2) * 0.5;
        const fu = uu - Math.floor(uu), fv = v * rows - row;
        const mortar = fu < 0.05 || fv < 0.1 ? 1 : 0;
        const n = fbm(u, v, 8, 5), id = hash(Math.floor(uu), row);
        const base = mortar ? 0.32 : 0.28 + id * 0.12;
        return { h: mortar ? 0 : 0.6 + n * 0.4, r: base * (mortar ? 1 : 1.35), g: base * (mortar ? 1 : 0.62), b: base * (mortar ? 0.95 : 0.5), rough: mortar ? 0.95 : 0.8 };
      }, 4);
      break;
    case 'rustMetal':
      set = synth(size, (u, v) => {
        const n = fbm(u, v, 6, 6), rust = THREE.MathUtils.smoothstep(fbm(u + 5, v, 3, 5), 0.45, 0.65);
        const streak = fbm(u * 8, v * 0.5, 4, 3) * 0.2;
        return {
          h: n * 0.4 + rust * 0.5,
          r: THREE.MathUtils.lerp(0.32, 0.42, rust) + streak * 0.2,
          g: THREE.MathUtils.lerp(0.33, 0.2, rust),
          b: THREE.MathUtils.lerp(0.35, 0.1, rust),
          rough: THREE.MathUtils.lerp(0.45, 0.95, rust),
        };
      }, 2);
      break;
    case 'tiles':
      set = synth(size, (u, v) => {
        const t = 8, fu = (u * t) % 1, fv = (v * t) % 1;
        const grout = fu < 0.04 || fv < 0.04;
        const n = fbm(u, v, 6, 5), dirt = fbm(u, v, 2, 4);
        const c = grout ? 0.12 : 0.38 + n * 0.1 - dirt * 0.2;
        return { h: grout ? 0 : 0.7, r: c * 0.9, g: c, b: c * 0.95, rough: grout ? 0.95 : 0.35 + dirt * 0.4 };
      }, 3);
      break;
    case 'wood':
      set = synth(size, (u, v) => {
        const g = Math.sin((u * 30 + fbm(u, v, 4, 4) * 6) * Math.PI) * 0.5 + 0.5;
        const c = 0.18 + g * 0.1;
        return { h: g * 0.3, r: c * 1.5, g: c * 1.0, b: c * 0.6, rough: 0.7 };
      }, 1.5);
      break;
    case 'denim':
      set = synth(size, (u, v) => {
        const weave = (Math.sin((u + v) * size * 1.2) * 0.5 + 0.5) * 0.5 + fbm(u, v, 32, 2) * 0.5;
        const fade = fbm(u, v, 3, 4);
        return { h: weave, r: 0.12 + fade * 0.08, g: 0.17 + fade * 0.1, b: 0.3 + fade * 0.14, rough: 0.9 };
      }, 1.2);
      break;
    case 'jacket':
      set = synth(size, (u, v) => {
        const n = fbm(u, v, 24, 3), wr = fbm(u, v, 4, 4);
        return { h: n * 0.5 + wr * 0.5, r: 0.5 + wr * 0.12, g: 0.05 + n * 0.03, b: 0.05 + n * 0.02, rough: 0.55 + n * 0.2 };
      }, 1.5);
      break;
    case 'prisonCloth':
      set = synth(size, (u, v) => {
        const n = fbm(u, v, 20, 3), dirt = fbm(u, v, 3, 5), blood = THREE.MathUtils.smoothstep(fbm(u + 9, v, 3, 5), 0.62, 0.7);
        return { h: n, r: THREE.MathUtils.lerp(0.55 - dirt * 0.25, 0.25, blood), g: THREE.MathUtils.lerp(0.28 - dirt * 0.15, 0.02, blood), b: THREE.MathUtils.lerp(0.1, 0.02, blood), rough: 0.9 };
      }, 1.5);
      break;
    case 'guardCloth':
      set = synth(size, (u, v) => {
        const n = fbm(u, v, 20, 3), dirt = fbm(u, v, 3, 5), blood = THREE.MathUtils.smoothstep(fbm(u + 4, v + 2, 3, 5), 0.62, 0.7);
        return { h: n, r: THREE.MathUtils.lerp(0.2 - dirt * 0.08, 0.25, blood), g: THREE.MathUtils.lerp(0.24 - dirt * 0.08, 0.02, blood), b: THREE.MathUtils.lerp(0.3 - dirt * 0.1, 0.02, blood), rough: 0.85 };
      }, 1.5);
      break;
    case 'zombieSkin':
      set = synth(size, (u, v) => {
        const n = fbm(u, v, 8, 5), vein = Math.abs(fbm(u, v, 5, 4) - 0.5) < 0.02 ? 1 : 0, rot = fbm(u + 2, v, 4, 4);
        return { h: n * 0.5 + rot * 0.3, r: 0.42 + n * 0.1 - vein * 0.1, g: 0.42 + n * 0.08 - rot * 0.12, b: 0.36 + vein * 0.05, rough: 0.55 };
      }, 2);
      break;
  }
  cache.set(key, set!);
  return set!;
}

export function pbr(kind: SurfaceKind, size: number, repeat = 1, extra: THREE.MeshStandardMaterialParameters = {}): THREE.MeshStandardMaterial {
  const s = surface(kind, size);
  const clone = (t: THREE.Texture) => { const c = t.clone(); c.repeat.set(repeat, repeat); c.needsUpdate = true; return c; };
  return new THREE.MeshStandardMaterial({
    map: repeat === 1 ? s.map : clone(s.map),
    normalMap: repeat === 1 ? s.normalMap : clone(s.normalMap),
    roughnessMap: repeat === 1 ? s.roughnessMap : clone(s.roughnessMap),
    roughness: 1,
    metalness: kind === 'rustMetal' ? 0.6 : 0,
    ...extra,
  });
}

/**
 * Skin with a Subsurface-Scattering approximation: physical sheen for the red forward-scatter
 * rim plus wrap-diffuse lighting injected into the lighting chunk (light bleeding past the terminator).
 */
export function skinMaterial(color: number, zombie = false, size = 256): THREE.MeshPhysicalMaterial {
  const m = new THREE.MeshPhysicalMaterial({
    color,
    roughness: zombie ? 0.6 : 0.48,
    sheen: zombie ? 0.3 : 0.8,
    sheenColor: new THREE.Color(zombie ? 0x553322 : 0xff5a40),
    sheenRoughness: 0.45,
    clearcoat: zombie ? 0.25 : 0.06,
    clearcoatRoughness: 0.6,
  });
  if (zombie) { const s = surface('zombieSkin', size); m.map = s.map; m.normalMap = s.normalMap; }
  m.onBeforeCompile = (shader) => {
    // Wrap lighting: N·L remapped to (N·L + w)/(1 + w) with a warm scatter tint near the terminator.
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <lights_physical_pars_fragment>',
      `#include <lights_physical_pars_fragment>
       vec3 sssWrap(vec3 N, vec3 L, vec3 lightCol){
         float ndl = dot(N, L);
         float w = 0.45;
         float wrap = max(0.0, (ndl + w) / (1.0 + w));
         float scatter = smoothstep(0.0, w, wrap) * smoothstep(w * 2.0, 0.0, wrap);
         return lightCol * (vec3(1.0, 0.35, 0.25) * scatter * 0.35);
       }`
    ).replace(
      '#include <lights_fragment_begin>',
      THREE.ShaderChunk.lights_fragment_begin.split(
        'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );'
      ).join(
        `RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
         reflectedLight.directDiffuse += sssWrap(geometryNormal, directLight.direction, directLight.color) * material.diffuseColor;`
      )
    );
  };
  return m;
}

/** Radial blood-splat texture used by decal pool and gore. */
export function bloodSplatTexture(size = 128): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.fillStyle = 'rgba(0,0,0,0)';
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < 26; i++) {
    const a = Math.random() * Math.PI * 2, r = Math.random() * size * 0.35;
    const x = size / 2 + Math.cos(a) * r, y = size / 2 + Math.sin(a) * r;
    const rad = (1 - r / (size * 0.4)) * size * 0.14 + 2;
    const grd = g.createRadialGradient(x, y, 0, x, y, rad);
    grd.addColorStop(0, 'rgba(70,0,0,0.95)');
    grd.addColorStop(0.7, 'rgba(50,0,0,0.85)');
    grd.addColorStop(1, 'rgba(30,0,0,0)');
    g.fillStyle = grd;
    g.beginPath(); g.arc(x, y, rad, 0, Math.PI * 2); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function glowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)', size = 64): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, inner);
  grd.addColorStop(1, outer);
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function chainLinkTexture(size = 128): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  g.strokeStyle = '#8a8f94';
  g.lineWidth = size / 40;
  const s = size / 4;
  for (let i = -4; i < 8; i++) {
    g.beginPath(); g.moveTo(i * s, 0); g.lineTo(i * s + size, size); g.stroke();
    g.beginPath(); g.moveTo(i * s + size, 0); g.lineTo(i * s, size); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
