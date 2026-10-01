import * as THREE from 'three';
import { WEAPONS, type WeaponDef } from './Weapons';
import { buildHit, zoneOfHit, type Combatant } from './HitZones';
import type { CombatContext } from './CombatContext';
import { Projectiles } from './Projectiles';
import { audio } from '../../engine/AudioEngine';
import { bus } from '../../engine/Events';
import { ITEMS, type ItemInstance } from '../inventory/Items';
import type { Inventory } from '../inventory/Inventory';
import { magSize } from '../inventory/Crafting';
import { glowTexture } from '../../engine/Materials';

export interface WeaponInput {
  aiming: boolean;
  fire: boolean;
  firePressed: boolean;
  reload: boolean;
  moveSpeed: number;     // m/s
  hpRatio: number;
  staminaRatio: number;
  muzzle: THREE.Vector3; // world position of barrel tip
  muzzle2?: THREE.Vector3 | null; // left-hand barrel tip of a dual-wield weapon
  right: THREE.Vector3;  // character right vector (shell ejection)
  canFire: boolean;      // false during dodge / stagger / grabbed
}

export interface WeaponOutput { kickPitch: number; kickYaw: number; fired: boolean }

const DEG = Math.PI / 180;

/**
 * Shooting model:
 *  • Reticle "focus" grows while aiming steadily (RE2R) → spread lerps spreadMax → spreadMin.
 *  • Moving, low HP (danger) and low stamina widen the cone and add hand tremble.
 *  • Each shot applies the weapon's recoil pattern (per-shot yaw/pitch) and resets focus.
 *  • Rays come from the camera through the reticle; bodies are resolved per hit zone,
 *    penetrating up to `penetration` targets before walls stop the round.
 */
export class WeaponSystem {
  current: ItemInstance | null = null;
  def: WeaponDef = WEAPONS.knife;
  focus = 0;
  reloadT = 0;
  private cooldown = 0;
  private patternIdx = 0;
  private sinceShot = 10;
  private recoilPitch = 0;
  private recoilYaw = 0;
  private laserLine: THREE.Line;
  private laserDot: THREE.Sprite;
  private beam: THREE.Mesh;
  private beamT = 0;
  private bolts: THREE.Mesh[] = [];
  private boltIdx = 0;
  projectiles: Projectiles;
  aimPoint = new THREE.Vector3();
  aimTarget: Combatant | null = null;
  private ray = new THREE.Raycaster();
  shots = 0;
  hits = 0;

  constructor(private ctx: CombatContext, public inv: Inventory) {
    this.projectiles = new Projectiles(ctx);
    const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, 1)]);
    this.laserLine = new THREE.Line(lg, new THREE.LineBasicMaterial({ color: 0xff1010, transparent: true, opacity: 0.25, depthWrite: false }));
    this.laserLine.frustumCulled = false;
    this.laserDot = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture('rgba(255,40,40,1)', 'rgba(255,0,0,0)'), blending: THREE.AdditiveBlending, depthTest: false, transparent: true }));
    this.laserDot.scale.setScalar(0.05);
    this.laserDot.renderOrder = 10;
    const bm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1, 8, 1, true), new THREE.MeshBasicMaterial({ color: 0x66ccff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    bm.geometry.rotateX(Math.PI / 2); bm.geometry.translate(0, 0, 0.5);
    this.beam = bm; this.beam.visible = false;
    ctx.scene.add(this.laserLine, this.laserDot, this.beam);
    const boltGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.32, 5); boltGeo.rotateX(Math.PI / 2);
    const boltMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.9, roughness: 0.3 });
    for (let i = 0; i < 24; i++) { const b = new THREE.Mesh(boltGeo, boltMat); b.visible = false; ctx.scene.add(b); this.bolts.push(b); }
  }

  equip(inst: ItemInstance | null): void {
    this.current = inst;
    this.def = inst ? WEAPONS[ITEMS[inst.defId].weaponId!] : WEAPONS.knife;
    if (inst && inst.mag === undefined) inst.mag = 0;
    if (inst && this.def.ammo.length > 1 && !inst.loaded) inst.loaded = this.def.ammo[0];
    this.focus = 0; this.reloadT = 0; this.patternIdx = 0;
  }

  ammoType(): string { return this.current?.loaded ?? this.def.ammo[0]; }
  reserve(): number { return this.def.type === 'melee' ? 0 : this.inv.count(this.ammoType()); }
  inMag(): number { return this.current?.mag ?? 0; }
  isReloading(): boolean { return this.reloadT > 0; }

  spreadDeg(input: Pick<WeaponInput, 'moveSpeed' | 'hpRatio' | 'staminaRatio'>): number {
    const d = this.def;
    const f = 1 - Math.pow(1 - this.focus, 2);
    let s = THREE.MathUtils.lerp(d.spreadMax, d.spreadMin, f);
    s += Math.min(1, input.moveSpeed / 1.2) * d.moveSpread;
    if (input.hpRatio < 0.34) s += 1.2;
    if (input.staminaRatio < 0.2) s += 0.8;
    if (this.current?.mods?.includes('part_stock')) s *= 0.7;
    return s;
  }

  /** Hand tremble applied to the camera (low HP / exhausted / unfocused). */
  sway(t: number, input: Pick<WeaponInput, 'hpRatio' | 'staminaRatio'>): { yaw: number; pitch: number } {
    let amp = 0.0015 * (1 - this.focus);
    if (input.hpRatio < 0.34) amp += 0.006;
    if (input.staminaRatio < 0.2) amp += 0.004;
    return { yaw: (Math.sin(t * 1.7) + Math.sin(t * 3.1) * 0.5) * amp, pitch: (Math.sin(t * 2.3) + Math.cos(t * 4.2) * 0.4) * amp };
  }

  startReload(): void {
    if (!this.current || this.def.type === 'melee' || this.reloadT > 0) return;
    if (this.inMag() >= magSize(this.current) || this.reserve() <= 0) {
      // Grenade launcher: cycle round type when full/empty of current type
      if (this.def.ammo.length > 1) this.cycleGrenade();
      return;
    }
    this.reloadT = this.def.reloadTime;
    audio.reload(this.def.reloadTime);
  }

  cycleGrenade(): void {
    if (!this.current || this.def.ammo.length < 2) return;
    const types = this.def.ammo;
    const cur = types.indexOf(this.ammoType());
    for (let k = 1; k <= types.length; k++) {
      const t = types[(cur + k) % types.length];
      if (this.inv.count(t) > 0) {
        if (this.current.mag && this.current.loaded) this.inv.add(this.current.loaded, this.current.mag);
        this.current.mag = 0; this.current.loaded = t;
        bus.emit('message', { text: `${this.def.id === 'gl' ? 'Снаряд' : 'Болты'}: ${ITEMS[t].name}` });
        this.reloadT = this.def.reloadTime; audio.reload(this.def.reloadTime);
        return;
      }
    }
  }

  private finishReload(): void {
    if (!this.current) return;
    const cap = magSize(this.current);
    const need = this.def.reloadPerRound ? 1 : cap - this.inMag();
    const got = this.inv.consume(this.ammoType(), need);
    this.current.mag = this.inMag() + got;
    if (this.def.reloadPerRound && this.inMag() < cap && this.reserve() > 0) {
      this.reloadT = this.def.reloadTime; audio.click();
    }
  }

  update(dt: number, t: number, input: WeaponInput): WeaponOutput {
    const out: WeaponOutput = { kickPitch: 0, kickYaw: 0, fired: false };
    const d = this.def;
    this.cooldown -= dt;
    this.sinceShot += dt;
    if (this.sinceShot > 0.4) this.patternIdx = 0;

    if (this.reloadT > 0) {
      // tube-fed guns can interrupt reload by firing
      if (d.reloadPerRound && input.firePressed && this.inMag() > 0) this.reloadT = 0;
      else {
        this.reloadT -= dt;
        if (this.reloadT <= 0) this.finishReload();
      }
    }

    // focus (reticle shrink)
    if (input.aiming && this.reloadT <= 0) {
      const moveFactor = input.moveSpeed > 0.2 ? 0.35 : 1;
      this.focus = Math.min(1, this.focus + (dt / Math.max(0.1, d.focusTime)) * moveFactor);
    } else this.focus = Math.max(0, this.focus - dt * 3);

    // recoil recovery (the muzzle settles back)
    const rec = d.recoil.recovery * DEG * dt;
    const pBefore = this.recoilPitch, yBefore = this.recoilYaw;
    this.recoilPitch = Math.sign(this.recoilPitch) * Math.max(0, Math.abs(this.recoilPitch) - rec);
    this.recoilYaw = Math.sign(this.recoilYaw) * Math.max(0, Math.abs(this.recoilYaw) - rec * 0.7);
    out.kickPitch += this.recoilPitch - pBefore;
    out.kickYaw += this.recoilYaw - yBefore;

    if (input.reload) this.startReload();

    this.updateAimPoint(input);
    const laserOn = input.aiming && d.laser && this.reloadT <= 0;
    this.laserLine.visible = this.laserDot.visible = laserOn;
    if (laserOn) {
      const pos = this.laserLine.geometry.attributes.position as THREE.BufferAttribute;
      pos.setXYZ(0, input.muzzle.x, input.muzzle.y, input.muzzle.z);
      pos.setXYZ(1, this.aimPoint.x, this.aimPoint.y, this.aimPoint.z);
      pos.needsUpdate = true;
      this.laserDot.position.copy(this.aimPoint);
    }
    if (this.beamT > 0) { this.beamT -= dt; (this.beam.material as THREE.MeshBasicMaterial).opacity = this.beamT * 2; if (this.beamT <= 0) this.beam.visible = false; }

    const trigger = d.auto ? input.fire : input.firePressed;
    if (input.aiming && trigger && input.canFire && this.cooldown <= 0 && this.reloadT <= 0 && d.type !== 'melee') {
      if (this.inMag() < d.ammoPerShot) {
        if (input.firePressed) { audio.click(true); if (this.reserve() > 0) this.startReload(); }
      } else {
        const k = this.shoot(input);
        out.kickPitch += k.pitch; out.kickYaw += k.yaw; out.fired = true;
      }
    }
    this.projectiles.update(dt);
    return out;
  }

  /** camera-centre ray, starting just past the character so walls behind the camera are ignored */
  private aimRay(spreadDeg: number): { origin: THREE.Vector3; dir: THREE.Vector3 } {
    const cam = this.ctx.camera;
    const dir = new THREE.Vector3();
    cam.getWorldDirection(dir);
    if (spreadDeg > 0) {
      // uniform sample in cone
      const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * spreadDeg * 0.5 * DEG;
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3().crossVectors(dir, up).normalize();
      const u = new THREE.Vector3().crossVectors(right, dir).normalize();
      dir.addScaledVector(right, Math.cos(a) * Math.tan(r)).addScaledVector(u, Math.sin(a) * Math.tan(r)).normalize();
    }
    const origin = cam.position.clone().addScaledVector(dir, 1.6);
    return { origin, dir };
  }

  private updateAimPoint(input: WeaponInput): void {
    const { origin, dir } = this.aimRay(0);
    const wall = this.ctx.physics.raycast(origin, dir, 60);
    const far = wall ? wall.distance : 60;
    this.ray.set(origin, dir); this.ray.far = far;
    const hits = this.ray.intersectObjects(this.ctx.enemies().filter((e) => e.alive).flatMap((e) => e.hitMeshes), false);
    if (hits.length) { this.aimPoint.copy(hits[0].point); this.aimTarget = zoneOfHit(hits[0])?.owner ?? null; }
    else { this.aimPoint.copy(origin).addScaledVector(dir, far - 0.02); this.aimTarget = null; }
    void input;
  }

  private shoot(input: WeaponInput): { pitch: number; yaw: number } {
    const d = this.def;
    this.cooldown = 1 / d.fireRate;
    this.shots++;
    this.current!.mag = this.inMag() - d.ammoPerShot;
    const spread = this.spreadDeg(input);

    if (d.muzzle > 0) this.ctx.flash.fire(input.muzzle, d.muzzle, input.muzzle2);
    if (d.shell) this.ctx.shells.eject(input.muzzle.clone().addScaledVector(input.right, -0.05), input.right, d.id === 'm3' ? 0xaa2222 : undefined);
    if (d.shell && input.muzzle2) this.ctx.shells.eject(input.muzzle2.clone().addScaledVector(input.right, 0.05), input.right.clone().negate());
    audio.gunshot(d.sound);
    bus.emit('noise', { pos: input.muzzle.clone(), radius: d.noise, kind: 'gunshot' });
    bus.emit('cameraShake', { strength: d.recoil.camShake, duration: 0.12 });

    if (d.type === 'grenade') {
      const { dir } = this.aimRay(spread);
      this.projectiles.launch(input.muzzle.clone(), dir, this.ammoType());
    } else if (d.type === 'beam') {
      this.fireBeam(input);
    } else {
      const bolt = d.id === 'bowgun' ? this.ammoType() : '';
      for (let p = 0; p < d.pellets; p++) this.fireRound(spread, !!bolt, bolt, p === 0);
    }

    // recoil pattern
    const pat = d.recoil.pattern[Math.min(this.patternIdx, d.recoil.pattern.length - 1)];
    this.patternIdx++;
    this.sinceShot = 0;
    const brake = this.current?.mods?.includes('part_brake') ? 0.6 : 1;
    const kp = d.recoil.kick * pat[1] * DEG * brake * (0.9 + Math.random() * 0.2);
    const ky = d.recoil.kick * pat[0] * 0.5 * DEG * brake;
    this.recoilPitch += kp; this.recoilYaw += ky;
    this.focus *= d.auto ? 0.8 : 0.25;
    return { pitch: kp, yaw: ky };
  }

  private fireRound(spread: number, isBolt: boolean, boltType = '', lead = false): void {
    const d = this.def;
    const { origin, dir } = this.aimRay(spread);
    const wall = this.ctx.physics.raycast(origin, dir, d.range);
    const far = wall ? wall.distance : d.range;
    this.ray.set(origin, dir); this.ray.far = far;
    const hits = this.ray.intersectObjects(this.ctx.enemies().filter((e) => e.alive).flatMap((e) => e.hitMeshes), false);
    const struck = new Set<Combatant>();
    let damage = d.damage;
    for (const h of hits) {
      const z = zoneOfHit(h);
      if (!z || struck.has(z.owner)) continue;
      struck.add(z.owner);
      if (struck.size === 1) this.hits++;
      const info = buildHit(d, z.zone, damage, h.point.clone(), dir.clone(), z.owner.isDowned() ? 1.2 : 1);
      const res = z.owner.takeHit(info);
      this.bloodFx(h.point, dir, res.headBurst || res.severed ? 3 : 1);
      audio.flesh(h.point, res.headBurst || !!res.severed);
      if (isBolt) this.stickBolt(h.point, dir, h.object);
      if (boltType === 'bolt_exp') { this.projectiles.boltBlast(h.point.clone(), lead); return; }
      if (boltType === 'bolt_fire') z.owner.areaHit?.(6, h.point, { knockdown: false, burn: 4 });
      // exit wound decal on nearby wall
      const behind = this.ctx.physics.raycast(h.point, dir, 3);
      if (behind) this.ctx.blood.add(behind.point, behind.normal, 0.4 + Math.random() * 0.5);
      damage *= 0.7; // energy loss through bodies
      if (struck.size >= d.penetration) return;
    }
    if (wall) {
      if (boltType === 'bolt_exp') { this.projectiles.boltBlast(wall.point.clone().addScaledVector(wall.normal, 0.1), lead); return; }
      if (isBolt) this.stickBolt(wall.point, dir);
      else {
        this.ctx.holes.add(wall.point, wall.normal, 0.06);
        this.ctx.sparks.burst(wall.point, wall.normal, Math.round(8 * this.ctx.particleScale), 2.5, 1.2, 0.35);
        audio.ricochet(wall.point);
      }
    }
  }

  private fireBeam(input: WeaponInput): void {
    const { origin, dir } = this.aimRay(0);
    const wall = this.ctx.physics.raycast(origin, dir, this.def.range);
    const far = wall ? wall.distance : this.def.range;
    this.ray.set(origin, dir); this.ray.far = far;
    const hits = this.ray.intersectObjects(this.ctx.enemies().filter((e) => e.alive).flatMap((e) => e.hitMeshes), false);
    const struck = new Set<Combatant>();
    for (const h of hits) {
      const z = zoneOfHit(h);
      if (!z || struck.has(z.owner)) continue;
      struck.add(z.owner);
      z.owner.takeHit(buildHit(this.def, z.zone, this.def.damage, h.point.clone(), dir.clone()));
      this.bloodFx(h.point, dir, 4);
    }
    const end = origin.clone().addScaledVector(dir, far);
    this.beam.position.copy(input.muzzle);
    this.beam.lookAt(end);
    this.beam.scale.set(1, 1, input.muzzle.distanceTo(end));
    this.beam.visible = true; this.beamT = 0.5;
    if (wall) this.ctx.scorch.add(wall.point, wall.normal, 1.2);
  }

  private bloodFx(p: THREE.Vector3, dir: THREE.Vector3, mult: number): void {
    const back = dir.clone().multiplyScalar(-0.4).add(new THREE.Vector3(0, 0.3, 0));
    this.ctx.bloodFx.burst(p, back, Math.round(10 * mult * this.ctx.particleScale), 2.2, 1.4, 0.8);
    this.ctx.bloodFx.burst(p, dir, Math.round(8 * mult * this.ctx.particleScale), 3.5, 0.8, 0.8);
  }

  private stickBolt(p: THREE.Vector3, dir: THREE.Vector3, attachTo?: THREE.Object3D): void {
    const b = this.bolts[this.boltIdx]; this.boltIdx = (this.boltIdx + 1) % this.bolts.length;
    this.ctx.scene.attach(b);
    b.visible = true;
    b.position.copy(p).addScaledVector(dir, -0.1);
    b.lookAt(p.clone().add(dir));
    if (attachTo) attachTo.attach(b);
  }

  /** Knife: short fan of rays in front of Claire. Returns true if something was hit. */
  /** knife strike: quick slash (wide arc), `heavy` = stance thrust (narrow, longer reach, ~2.2× damage) */
  knifeAttack(origin: THREE.Vector3, forward: THREE.Vector3, finisher = false, heavy = false): boolean {
    const d = WEAPONS.knife;
    audio.knife(origin);
    bus.emit('noise', { pos: origin.clone(), radius: d.noise, kind: 'melee' });
    const meshes = this.ctx.enemies().filter((e) => e.alive).flatMap((e) => e.hitMeshes);
    const struck = new Set<Combatant>();
    const heights = finisher ? [-1.2, -0.9, -0.6] : heavy ? [0.15, -0.1, -0.35] : [0.1, -0.2, -0.5];
    for (const hOff of heights) for (const a of heavy ? [-0.14, 0, 0.14] : [-0.5, -0.25, 0, 0.25, 0.5]) {
      const dir = forward.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), a);
      dir.y = finisher ? -0.55 : 0; dir.normalize();
      const o = origin.clone(); o.y += hOff * (finisher ? 0.3 : 1);
      this.ray.set(o, dir); this.ray.far = finisher ? 2.2 : d.range + (heavy ? 0.45 : 0);
      const hits = this.ray.intersectObjects(meshes, false);
      for (const h of hits) {
        const z = zoneOfHit(h);
        if (!z || struck.has(z.owner)) continue;
        struck.add(z.owner);
        const zone = finisher && z.owner.isDowned() ? 'head' : z.zone;
        const res = z.owner.takeHit(buildHit(d, zone, finisher ? 55 : heavy ? d.damage * 2.2 : d.damage, h.point.clone(), dir));
        this.bloodFx(h.point, dir, finisher || heavy ? 2 : 1);
        audio.flesh(h.point, finisher || !!res.severed);
        break;
      }
    }
    return struck.size > 0;
  }

  /** Aim assist: gentle magnetism toward the nearest head inside a small cone (browser/gamepad help). */
  assist(dt: number, strength: number): { yaw: number; pitch: number } {
    if (strength <= 0) return { yaw: 0, pitch: 0 };
    const cam = this.ctx.camera;
    const fwd = cam.getWorldDirection(new THREE.Vector3());
    let best: THREE.Vector3 | null = null, bestA = 7 * DEG;
    const head = new THREE.Vector3();
    for (const e of this.ctx.enemies()) {
      if (!e.alive || e.isDowned()) continue;
      e.headWorld(head);
      const to = head.clone().sub(cam.position);
      const dist = to.length();
      if (dist > 25) continue;
      const a = to.normalize().angleTo(fwd);
      if (a < bestA && this.ctx.physics.lineOfSight(cam.position, head)) { bestA = a; best = to.clone(); }
    }
    if (!best) return { yaw: 0, pitch: 0 };
    const yawT = Math.atan2(-best.x, -best.z), yawC = Math.atan2(-fwd.x, -fwd.z);
    let dy = yawT - yawC; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    const dp = Math.asin(best.y) - Math.asin(fwd.y);
    const k = Math.min(1, dt * 4 * strength);
    return { yaw: dy * k, pitch: dp * k };
  }
}

