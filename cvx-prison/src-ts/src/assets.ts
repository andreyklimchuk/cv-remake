import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AMB_U, type AmbCat } from './light';

declare global { interface Window { __ASSETS?: Record<string, string> } }

export function assetUrl(p: string): string {
  const packed = window.__ASSETS?.[p];
  return packed ?? `assets/${p}`;
}

const loader = new GLTFLoader();
const gltfCache = new Map<string, Promise<GLTF>>();
export function loadGLTF(p: string): Promise<GLTF> {
  let pr = gltfCache.get(p);
  if (!pr) {
    pr = window.__ASSETS && !window.__ASSETS[p] ? Promise.reject(new Error('missing asset ' + p)) : loader.loadAsync(assetUrl(p));
    gltfCache.set(p, pr);
  }
  return pr;
}
export async function loadJSON<T = any>(p: string): Promise<T> {
  const r = await fetch(assetUrl(p));
  return r.json() as Promise<T>;
}

/** Convert glTF PBR materials into Lambert ones lit like the original (Ninja chunk easy multi light):
 * textures stay in their stored (gamma) space and the renderer outputs without conversion, so the lighting math runs on
 * the same values as on the console; the ambient term is the room's ambient entry of the model category (light.ts). */
const AMB_CHUNK = THREE.ShaderChunk.lights_fragment_begin.replace('getAmbientLightIrradiance( ambientLightColor )', 'uAmb');
export function toLambert(root: THREE.Object3D, cat: AmbCat = 'chr') {
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    const conv = (src: THREE.Material) => {
      const s = src as THREE.MeshStandardMaterial;
      const ext = (s.userData?.gltfExtensions ?? {}) as any;
      const unlit = !!ext.KHR_materials_unlit || (s as any).isMeshBasicMaterial;
      const p: THREE.MeshLambertMaterialParameters = {
        map: s.map ?? null, color: s.color?.clone() ?? new THREE.Color(1, 1, 1),
        transparent: s.transparent, alphaTest: s.alphaTest, side: s.side, depthWrite: s.depthWrite,
        opacity: s.opacity,
      };
      const out = unlit ? new THREE.MeshBasicMaterial(p as any) : new THREE.MeshLambertMaterial(p);
      out.name = s.name; out.userData = { ...s.userData, amb: cat };
      if (out.map) { out.map.anisotropy = 4; if (out.map.colorSpace !== THREE.NoColorSpace) { out.map.colorSpace = THREE.NoColorSpace; out.map.needsUpdate = true; } }
      if (!unlit) {
        // Ninja chunk material (DA, 0xb2b2b2): diffuse = ambient reflectance 0.7 on the room / character / object models
        if (cat !== 'inv') out.color.multiplyScalar(0xb2 / 255);
        const u = AMB_U[cat];
        out.onBeforeCompile = (sh) => {
          sh.uniforms.uAmb = u;
          sh.fragmentShader = 'uniform vec3 uAmb;\n' + sh.fragmentShader.replace('#include <lights_fragment_begin>', AMB_CHUNK);
        };
      }
      return out;
    };
    m.material = Array.isArray(m.material) ? m.material.map(conv) : conv(m.material);
  });
}
