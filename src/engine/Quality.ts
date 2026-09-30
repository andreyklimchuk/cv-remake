/** Graphics presets modelled after RE Engine's option tiers. */
export type QualityLevel = 'low' | 'medium' | 'ultra';

export interface QualityPreset {
  label: string;
  pixelRatio: number;
  antialias: boolean;
  shadows: boolean;
  shadowMapSize: number;
  shadowedLights: number;   // max shadow-casting local lights
  textureSize: number;      // procedural texture resolution (stand-in for KTX2 mip bias)
  bloom: boolean;
  ambientOcclusion: boolean;
  volumetrics: boolean;     // light shafts + dust
  fogDensity: number;
  particleBudget: number;
  decalBudget: number;
  rainDrops: number;
  lodBias: number;          // multiplies LOD switch distances
  filmGrain: number;
}

export const QUALITY: Record<QualityLevel, QualityPreset> = {
  low: {
    label: 'Low', pixelRatio: 0.75, antialias: false, shadows: false, shadowMapSize: 512, shadowedLights: 0,
    textureSize: 256, bloom: false, ambientOcclusion: false, volumetrics: false, fogDensity: 0.05,
    particleBudget: 300, decalBudget: 48, rainDrops: 600, lodBias: 0.6, filmGrain: 0.0,
  },
  medium: {
    label: 'Medium', pixelRatio: 1, antialias: true, shadows: true, shadowMapSize: 1024, shadowedLights: 1,
    textureSize: 512, bloom: true, ambientOcclusion: false, volumetrics: true, fogDensity: 0.045,
    particleBudget: 700, decalBudget: 96, rainDrops: 1800, lodBias: 1, filmGrain: 0.05,
  },
  ultra: {
    label: 'Ultra', pixelRatio: Math.min(window.devicePixelRatio, 2), antialias: true, shadows: true, shadowMapSize: 2048,
    shadowedLights: 3, textureSize: 1024, bloom: true, ambientOcclusion: true, volumetrics: true, fogDensity: 0.04,
    particleBudget: 1500, decalBudget: 192, rainDrops: 4000, lodBias: 1.6, filmGrain: 0.07,
  },
};

export function loadQuality(): QualityLevel {
  const q = localStorage.getItem('cv.quality') as QualityLevel | null;
  return q && q in QUALITY ? q : 'medium';
}
export function saveQuality(q: QualityLevel): void {
  localStorage.setItem('cv.quality', q);
}
