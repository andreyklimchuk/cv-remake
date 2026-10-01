import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { NO_AO } from './RenderFlags';
import { QUALITY, type QualityLevel, type QualityPreset } from './Quality';

/** Capabilities other modules can query (custom GLSL is unavailable on the WebGPU path). */
export const RenderCaps = { backend: 'webgl2' as 'webgl2' | 'webgpu', customShaders: true };

/** Final cinematic pass: vignette, film grain, chromatic aberration, damage tint, RE-style grade. */
const FinalShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uGrain: { value: 0.05 },
    uVignette: { value: 0.9 },
    uDamage: { value: 0 },
    uAberration: { value: 0.0015 },
  },
  vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse; uniform float uTime, uGrain, uVignette, uDamage, uAberration; varying vec2 vUv;
    float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }
    void main(){
      vec2 c = vUv - 0.5;
      float ab = uAberration * (1.0 + uDamage * 4.0) * length(c) * 2.0;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + c * ab).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - c * ab).b;
      // teal shadows / warm highlights grade
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(col, col * vec3(0.92, 1.0, 1.06), 1.0 - smoothstep(0.0, 0.5, l));
      col = mix(col, col * vec3(1.06, 1.0, 0.92), smoothstep(0.5, 1.0, l));
      col = mix(vec3(l), col, 0.88); // slight desaturation
      float vig = smoothstep(0.85, 0.2, length(c) * uVignette * 1.25);
      col *= mix(0.35, 1.0, vig);
      // damage: red pulsing edges
      float edge = smoothstep(0.25, 0.75, length(c));
      col = mix(col, vec3(0.35, 0.0, 0.0), edge * uDamage * (0.7 + 0.3 * sin(uTime * 6.0)));
      col += (rand(vUv * 1000.0 + uTime) - 0.5) * uGrain;
      gl_FragColor = vec4(col, 1.0);
    }`,
};

export class RenderBackend {
  renderer!: THREE.WebGLRenderer;
  composer: EffectComposer | null = null;
  final: ShaderPass | null = null;
  bloom: UnrealBloomPass | null = null;
  preset!: QualityPreset;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private time = 0;

  static async create(canvas: HTMLCanvasElement, quality: QualityLevel): Promise<RenderBackend> {
    const be = new RenderBackend();
    be.preset = QUALITY[quality];
    const wantGPU = new URLSearchParams(location.search).get('renderer') === 'webgpu';
    const hasWebGL2 = !!document.createElement('canvas').getContext('webgl2');
    if ((wantGPU || !hasWebGL2) && 'gpu' in navigator) {
      try {
        // WebGPU path (experimental). Dynamic import keeps it out of the WebGL2 hot path.
        const mod: any = await import('three/webgpu');
        const r = new mod.WebGPURenderer({ canvas, antialias: be.preset.antialias });
        await r.init();
        be.renderer = r as unknown as THREE.WebGLRenderer;
        RenderCaps.backend = 'webgpu';
        RenderCaps.customShaders = false;
      } catch (e) {
        console.warn('WebGPU init failed, falling back to WebGL2', e);
      }
    }
    if (!be.renderer) {
      be.renderer = new THREE.WebGLRenderer({ canvas, antialias: be.preset.antialias, powerPreference: 'high-performance', stencil: false });
    }
    const r = be.renderer;
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.5;
    r.shadowMap.enabled = be.preset.shadows;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.setPixelRatio(be.preset.pixelRatio);
    r.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => be.resize());
    return be;
  }

  attach(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    this.scene = scene;
    this.camera = camera;
    this.buildComposer();
  }

  private buildComposer(): void {
    this.composer?.dispose();
    this.composer = null; this.final = null; this.bloom = null;
    if (RenderCaps.backend !== 'webgl2') return;
    const p = this.preset;
    const w = window.innerWidth, h = window.innerHeight;
    const composer = new EffectComposer(this.renderer);
    composer.setPixelRatio(p.pixelRatio);
    composer.setSize(w, h);
    composer.addPass(new RenderPass(this.scene, this.camera));
    if (p.ambientOcclusion) {
      const ao = new GTAOPass(this.scene, this.camera, w, h);
      ao.blendIntensity = 0.8;
      const aoRender = ao.render.bind(ao);
      ao.render = (...args: Parameters<GTAOPass['render']>) => {
        const hid: THREE.Object3D[] = [];
        for (const o of NO_AO) if (o.visible) { o.visible = false; hid.push(o); }
        try { aoRender(...args); } finally { for (const o of hid) o.visible = true; }
      };
      composer.addPass(ao);
    }
    if (p.bloom) {
      this.bloom = new UnrealBloomPass(new THREE.Vector2(w / 2, h / 2), 0.55, 0.6, 0.82);
      composer.addPass(this.bloom);
    }
    composer.addPass(new OutputPass());
    this.final = new ShaderPass(FinalShader);
    this.final.uniforms.uGrain.value = p.filmGrain;
    composer.addPass(this.final);
    this.composer = composer;
  }

  applyQuality(q: QualityLevel): void {
    this.preset = QUALITY[q];
    this.renderer.setPixelRatio(this.preset.pixelRatio);
    this.renderer.shadowMap.enabled = this.preset.shadows;
    this.scene?.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined;
      if (m) m.needsUpdate = true;
    });
    if (this.scene) this.buildComposer();
  }

  setDamage(v: number): void { if (this.final) this.final.uniforms.uDamage.value = v; }

  resize(): void {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.composer?.setSize(w, h);
    if (this.camera) { this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); }
  }

  render(dt: number): void {
    this.time += dt;
    const info = (this.renderer as any).info;
    if (info) { info.autoReset = false; info.reset(); }
    if (this.composer && this.final) {
      this.final.uniforms.uTime.value = this.time;
      this.composer.render(dt);
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  stats(): { calls: number; triangles: number } {
    const info = (this.renderer as any).info;
    return { calls: info?.render?.calls ?? 0, triangles: info?.render?.triangles ?? 0 };
  }
}
