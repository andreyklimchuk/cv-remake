import type { Vector3 } from 'three';

type Handler<T> = (payload: T) => void;

export class EventBus<M extends Record<string, unknown>> {
  private handlers = new Map<keyof M, Set<Handler<any>>>();
  on<K extends keyof M>(key: K, fn: Handler<M[K]>): () => void {
    if (!this.handlers.has(key)) this.handlers.set(key, new Set());
    this.handlers.get(key)!.add(fn);
    return () => this.handlers.get(key)?.delete(fn);
  }
  emit<K extends keyof M>(key: K, payload: M[K]): void {
    this.handlers.get(key)?.forEach((fn) => fn(payload));
  }
}

export type NoiseKind = 'gunshot' | 'run' | 'walk' | 'door' | 'explosion' | 'melee';

export type GameEvents = {
  noise: { pos: Vector3; radius: number; kind: NoiseKind };
  message: { text: string; duration?: number };
  doorsChanged: null;
  playerHurt: { amount: number };
  cameraShake: { strength: number; duration: number };
};

/** Global game-wide bus (noise propagation for AI hearing, UI messages, etc.) */
export const bus = new EventBus<GameEvents>();
