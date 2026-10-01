import * as THREE from 'three';
import type { CombatContext } from './CombatContext';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';
import { FireEmitter } from '../../engine/VolumetricFX';
import { zoneOfHit } from './HitZones';

/** Ballistic projectiles: 40mm grenades (explosive / flame / acid). */
interface Grenade { mesh: THREE.Mesh; vel: THREE.Vector3; type: string; life: number }
interface TempFire { fx: FireEmitter; life: number; pos: THREE.Vector3; stopSound: () => void }

export class Projectiles {
  private grenades: Grenade[] = [];
  private fires: TempFire[] = [];
  private flashLight = new THREE.PointLight(0xffaa55, 0, 18, 2);
  private flashT = 0;
  private geo = new THREE.SphereGeometry(0.04, 8, 6);
  private mats: Record<string, THREE.Material> = {
    gren_exp: new THREE.MeshStandardMaterial({ color: 0x556633, metalness: 0.6, roughness: 0.4 }),
    gren_fire: new THREE.MeshStandardMaterial({ color: 0xaa4411, emissive: 0x331100, metalness: 0.5 }),
    gren_acid: new THREE.MeshStandardMaterial({ color: 0x44aa44, emissive: 0x113311, metalness: 0.5 }),
  };
  private time = 0;
  constructor(private ctx: CombatContext) { ctx.scene.add(this.flashLight); }

  /** Explosive bolt: small blast at the impact point (lead bolt of a volley knocks down). */
  boltBlast(p: THREE.Vector3, lead: boolean): void {
    this.flashLight.position.copy(p).add(new THREE.Vector3(0, 0.3, 0));
    this.flashT = Math.max(this.flashT, 0.14);
    if (lead) { audio.explosion(p); bus.emit('noise', { pos: p.clone(), radius: 25, kind: 'explosion' }); bus.emit('cameraShake', { strength: 0.15, duration: 0.25 }); }
    const up = new THREE.Vector3(0, 1, 0);
    this.ctx.sparks.burst(p, up, Math.round(22 * this.ctx.particleScale), 6, 1.6, 0.6);
    if (p.y < 0.4) this.ctx.scorch.add(new THREE.Vector3(p.x, 0.01, p.z), up, 1.1);
    for (const e of this.ctx.enemies()) {
      if (!e.alive) continue;
      const d = e.position.distanceTo(new THREE.Vector3(p.x, e.position.y, p.z));
      if (d < 1.8) e.areaHit(18 + 30 * (1 - d / 1.8), p, { knockdown: lead && d < 1.2 });
    }
  }

  launch(origin: THREE.Vector3, dir: THREE.Vector3, type: string): void {
    const mesh = new THREE.Mesh(this.geo, this.mats[type] ?? this.mats.gren_exp);
    mesh.position.copy(origin);
    this.ctx.scene.add(mesh);
    this.grenades.push({ mesh, vel: dir.clone().multiplyScalar(26).add(new THREE.Vector3(0, 1.2, 0)), type, life: 5 });
  }

  update(dt: number): void {
    this.time += dt;
    const ray = new THREE.Raycaster();
    for (const g of [...this.grenades]) {
      g.life -= dt;
      g.vel.y -= 9.8 * 0.55 * dt;
      const step = g.vel.clone().multiplyScalar(dt);
      const len = step.length();
      const dir = step.clone().divideScalar(len);
      const wall = this.ctx.physics.raycast(g.mesh.position, dir, len);
      ray.set(g.mesh.position, dir); ray.far = len;
      const meshes = this.ctx.enemies().filter((e) => e.alive).flatMap((e) => e.hitMeshes);
      const hits = ray.intersectObjects(meshes, false);
      if (hits.length && (!wall || hits[0].distance < wall.distance)) {
        const z = zoneOfHit(hits[0]);
        this.detonate(g, hits[0].point, z?.owner, new THREE.Vector3(0, 1, 0));
        continue;
      }
      if (wall) { this.detonate(g, wall.point.clone().addScaledVector(wall.normal, 0.05), undefined, wall.normal); continue; }
      g.mesh.position.add(step);
      if (g.life <= 0) this.detonate(g, g.mesh.position.clone(), undefined, new THREE.Vector3(0, 1, 0));
    }
    for (const f of [...this.fires]) {
      f.life -= dt;
      f.fx.update(dt, this.time);
      if (f.life < 1.5 && f.fx.active) { f.fx.extinguish(); f.stopSound(); }
      if (f.fx.active) for (const e of this.ctx.enemies()) {
        if (e.alive && e.position.distanceTo(f.pos) < 2.4) e.areaHit(22 * dt, f.pos, { knockdown: false, burn: 2 });
      }
      if (f.life <= 0) { f.fx.group.removeFromParent(); this.fires = this.fires.filter((x) => x !== f); }
    }
    if (this.flashT > 0) { this.flashT -= dt; this.flashLight.intensity = Math.max(0, this.flashT) * 250; }
  }

  private detonate(g: Grenade, p: THREE.Vector3, direct: import('./HitZones').Combatant | undefined, normal: THREE.Vector3): void {
    g.mesh.removeFromParent();
    this.grenades = this.grenades.filter((x) => x !== g);
    this.flashLight.position.copy(p).add(new THREE.Vector3(0, 0.5, 0));
    this.flashT = 0.25;
    audio.explosion(p);
    bus.emit('noise', { pos: p.clone(), radius: 35, kind: 'explosion' });
    const dist = p.distanceTo(this.ctx.camera.position);
    bus.emit('cameraShake', { strength: Math.max(0, 0.6 - dist * 0.03), duration: 0.5 });
    const up = new THREE.Vector3(0, 1, 0);
    if (g.type === 'gren_exp') {
      this.ctx.sparks.burst(p, up, Math.round(60 * this.ctx.particleScale), 8, 2.2, 0.8);
      this.ctx.scorch.add(new THREE.Vector3(p.x, 0.01, p.z), up, 3);
      for (const e of this.ctx.enemies()) {
        if (!e.alive) continue;
        const d = e.position.distanceTo(p);
        if (d < 4.5) e.areaHit(150 * (1 - d / 4.5) + (e === direct ? 60 : 0), p, { knockdown: true });
      }
    } else if (g.type === 'gren_fire') {
      const fx = new FireEmitter(this.ctx.scene, new THREE.Vector3(p.x, 0, p.z), 1.8, Math.round(120 * this.ctx.particleScale));
      const snd = audio.fireLoop(p);
      this.fires.push({ fx, life: 6, pos: new THREE.Vector3(p.x, 0, p.z), stopSound: snd.stop });
      this.ctx.scorch.add(new THREE.Vector3(p.x, 0.01, p.z), up, 3.5);
      for (const e of this.ctx.enemies()) if (e.alive && e.position.distanceTo(p) < 3) e.areaHit(40, p, { knockdown: false, burn: 5 });
    } else {
      this.ctx.bloodFx.burst(p, normal, Math.round(40 * this.ctx.particleScale), 4, 2, 0.8);
      for (const e of this.ctx.enemies()) {
        if (!e.alive) continue;
        const d = e.position.distanceTo(p);
        if (e === direct) e.areaHit(260, p, { knockdown: true, acid: true });
        else if (d < 2.2) e.areaHit(60, p, { knockdown: false, acid: true });
      }
    }
  }
}
