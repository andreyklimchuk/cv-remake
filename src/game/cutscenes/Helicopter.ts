import * as THREE from 'three';
import { ModelLibrary } from '../assets/ModelLibrary';

/** Umbrella-style decal: red / white octagon "umbrella" segments */
function logoTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const cx = 64, cy = 64, r = 58;
  for (let i = 0; i < 8; i++) {
    const a0 = (i / 8) * Math.PI * 2 - Math.PI / 8, a1 = a0 + Math.PI / 4;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r); g.lineTo(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r); g.closePath();
    g.fillStyle = i % 2 ? '#f2efe8' : '#c4161c'; g.fill();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

/**
 * Procedural transport helicopter for the intro (Bell UH-1 proportions): fuselage, cockpit glass, tail boom,
 * spinning main / tail rotors (+ motion-blur disc), skids, sliding cargo door on the +X side, beacons and a
 * searchlight (pooled SpotLight). Local frame: +Z = nose, origin on the ground under the skids.
 */
export class Helicopter {
  root = new THREE.Group();
  private rotor: THREE.Object3D = new THREE.Group();
  private tailRotor: THREE.Object3D = new THREE.Group();
  private disc!: THREE.Mesh;
  private door!: THREE.Mesh;
  private beacon!: THREE.MeshStandardMaterial;
  searchlight!: THREE.SpotLight;
  rotorSpeed = 1;
  doorOpen = 0;

  /** Bell UH-1 "Huey" (Sketchfab, Duane's Mind, CC-BY 4.0) — vehicle_huey.glb; procedural fallback below */
  private glb = false;
  private glbDoorX = 1.6;

  constructor() {
    if (this.fromGlb()) return;
    const body = new THREE.MeshStandardMaterial({ color: 0x4d545c, metalness: 0.35, roughness: 0.48 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x15171a, metalness: 0.6, roughness: 0.5 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x0b1418, metalness: 0.95, roughness: 0.06, envMapIntensity: 1.5 });
    const blade = new THREE.MeshStandardMaterial({ color: 0x101112, metalness: 0.3, roughness: 0.6 });
    const add = (m: THREE.Mesh, p?: THREE.Object3D) => { m.castShadow = true; m.receiveShadow = true; (p ?? this.root).add(m); return m; };
    const R = this.root;

    const fus = add(new THREE.Mesh(new THREE.CapsuleGeometry(1.05, 3.4, 8, 18), body));
    fus.rotation.x = Math.PI / 2; fus.position.set(0, 1.65, 0.1); fus.scale.set(0.95, 1, 1.05);
    const belly = add(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 3.6), body)); belly.position.set(0, 0.95, 0);
    const nose = add(new THREE.Mesh(new THREE.SphereGeometry(1, 22, 14, 0, Math.PI * 2, 0, Math.PI / 2), glass));
    nose.rotation.x = Math.PI / 2; nose.position.set(0, 1.85, 2.05); nose.scale.set(0.9, 0.95, 0.75);
    const chin = add(new THREE.Mesh(new THREE.SphereGeometry(0.85, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), body));
    chin.rotation.x = Math.PI / 2; chin.position.set(0, 1.15, 2.1); chin.scale.set(0.95, 0.55, 0.6);
    const eng = add(new THREE.Mesh(new THREE.CapsuleGeometry(0.5, 2.0, 6, 12), body)); eng.rotation.x = Math.PI / 2; eng.position.set(0, 2.85, -0.5); eng.scale.set(1.15, 0.9, 1);
    for (const s of [-1, 1]) { const ex = add(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.5, 10), dark)); ex.rotation.x = Math.PI / 2; ex.position.set(0.32 * s, 2.95, -1.95); }
    const boom = add(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.2, 6.4, 14), body)); boom.rotation.x = Math.PI / 2; boom.position.set(0, 2.05, -4.7);
    const fin = add(new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.7, 1.0), body)); fin.position.set(0, 2.75, -7.75); fin.rotation.x = -0.4;
    const stab = add(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.07, 0.55), body)); stab.position.set(0, 2.05, -6.4);
    // rotors
    const mast = add(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.55, 10), dark)); mast.position.set(0, 3.3, 0);
    this.rotor.position.set(0, 3.6, 0); R.add(this.rotor);
    const hub = add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.5), dark), this.rotor); void hub;
    for (const s of [-1, 1]) { const b = add(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.04, 6.9), blade), this.rotor); b.position.z = 3.5 * s; }
    this.disc = new THREE.Mesh(new THREE.CircleGeometry(7, 40), new THREE.MeshBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide }));
    this.disc.rotation.x = -Math.PI / 2; this.disc.position.y = 3.6; R.add(this.disc);
    this.tailRotor.position.set(0.22, 2.95, -7.95); R.add(this.tailRotor);
    for (const s of [-1, 1]) { const b = add(new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.75, 0.16), blade), this.tailRotor); b.position.y = 0.38 * s; }
    // skids
    for (const s of [-1, 1]) {
      const sk = add(new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 4.4, 8), dark)); sk.rotation.x = Math.PI / 2; sk.position.set(1.18 * s, 0.06, 0.1);
      const tip = add(new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.5, 8), dark)); tip.position.set(1.18 * s, 0.2, 2.4); tip.rotation.x = 0.9;
      for (const z of [-1.1, 1.1]) {
        const st = add(new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8), dark));
        st.position.set(0.98 * s, 0.5, z); st.rotation.z = 0.42 * s;
      }
    }
    // cargo door opening (+X) and sliding door
    const hole = add(new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.35, 1.55), new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 1 })));
    hole.position.set(0.985, 1.55, 0.35);
    this.door = add(new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.4, 1.62), body)); this.door.position.set(1.02, 1.55, 0.35);
    for (const s of [-1, 1]) {
      const win = add(new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.42), glass)); win.position.set(1.0 * s + 0.002 * s, 1.95, -0.8); win.rotation.y = (Math.PI / 2) * s;
      const logo = add(new THREE.Mesh(new THREE.CircleGeometry(0.36, 24), new THREE.MeshStandardMaterial({ map: logoTexture(), roughness: 0.5, metalness: 0.2, polygonOffset: true, polygonOffsetFactor: -2 })));
      logo.position.set(0.66 * s, 2.02, -3.0); logo.rotation.y = (Math.PI / 2) * s + (s > 0 ? -0.075 : 0.075);
      logo.castShadow = false;
    }
    // beacons
    this.beacon = new THREE.MeshStandardMaterial({ color: 0x400000, emissive: 0xff2010, emissiveIntensity: 3 });
    for (const p of [[0, 3.08, -0.2], [0, 3.62, -8.1], [0, 0.72, -0.5]] as const) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), this.beacon); b.position.set(p[0], p[1], p[2]); R.add(b);
    }
    for (const s of [-1, 1]) {
      const nav = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), new THREE.MeshStandardMaterial({ color: 0x002000, emissive: s > 0 ? 0x10ff40 : 0xff2020, emissiveIntensity: 2.5 }));
      nav.position.set(1.2 * s, 2.05, -6.4); R.add(nav);
    }
    // searchlight under the nose
    const lamp = add(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.18, 12), dark)); lamp.position.set(0, 0.75, 2.4); lamp.rotation.x = 0.8;
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.1, 12), new THREE.MeshBasicMaterial({ color: 0xfafcff })); lens.position.set(0, 0.69, 2.46); lens.rotation.x = Math.PI / 2 + 0.8; R.add(lens);
    this.searchlight = new THREE.SpotLight(0xf2f5ff, 320, 75, 0.3, 0.45, 1.1);
    this.searchlight.position.set(0, 0.6, 2.5); this.searchlight.castShadow = true; this.searchlight.userData.priority = 30;
    this.searchlight.target.position.set(0, -12, 13);
    R.add(this.searchlight, this.searchlight.target);
    // belly floodlight (lights the landing zone and the passengers) + warm cabin glow through the cargo door
    const bellyL = new THREE.PointLight(0xdfe6ff, 7, 12, 1.6); bellyL.position.set(0, 0.55, 0.6); bellyL.userData.priority = 25; R.add(bellyL);
    const cabin = new THREE.PointLight(0xffc890, 6, 4.5, 1.8); cabin.position.set(0.3, 1.6, 0.35); cabin.userData.priority = 20; R.add(cabin);
  }

  private fromGlb(): boolean {
    const g = ModelLibrary.get('vehicle_huey');
    if (!g) return false;
    const S = 1.45; // model is ~8.2 m nose-to-tail; a real UH-1 fuselage is ~12 m
    const m = g.scene.clone(true);
    m.scale.setScalar(S);
    let top: THREE.Object3D | null = null, back: THREE.Object3D | null = null;
    m.traverse((o) => {
      if (o.name === 'Top_Rotor') top = o;
      if (o.name === 'Back_Rotor') back = o;
      const me = o as THREE.Mesh;
      if (me.isMesh) {
        me.castShadow = true; me.receiveShadow = true;
        const mats = Array.isArray(me.material) ? me.material : [me.material];
        for (const mt of mats as THREE.MeshStandardMaterial[]) {
          if (/glass/i.test(mt.name)) { mt.transparent = true; mt.opacity = 0.35; mt.depthWrite = false; mt.metalness = 0.9; mt.roughness = 0.05; me.castShadow = false; }
          else { mt.envMapIntensity = 0.8; }
        }
      }
    });
    this.root.add(m);
    if (top) { this.rotor = top; }
    if (back) { this.tailRotor = back; }
    this.glb = true;
    this.glbDoorX = 0.95 * S + 0.45;
    // motion-blur disc for the main rotor
    this.disc = new THREE.Mesh(new THREE.CircleGeometry(4.2 * S, 40), new THREE.MeshBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide }));
    this.disc.rotation.x = -Math.PI / 2; this.disc.position.y = 2.6 * S; this.root.add(this.disc);
    this.door = new THREE.Mesh(); // the Huey flies with its cargo doors open
    // Umbrella logos on the tail boom
    for (const s of [-1, 1]) {
      const logo = new THREE.Mesh(new THREE.CircleGeometry(0.34, 24), new THREE.MeshStandardMaterial({ map: logoTexture(), roughness: 0.5, metalness: 0.2, polygonOffset: true, polygonOffsetFactor: -2 }));
      logo.position.set(0.36 * s * S, 1.45 * S, -2.6 * S); logo.rotation.y = (Math.PI / 2) * s; this.root.add(logo);
    }
    this.beacon = new THREE.MeshStandardMaterial({ color: 0x400000, emissive: 0xff2010, emissiveIntensity: 3 });
    for (const p of [[0, 2.15, -0.6], [0, 2.9, -5.9], [0, 0.05, -0.4]] as const) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), this.beacon); b.position.set(p[0], p[1] * S, p[2] * S); this.root.add(b);
    }
    this.searchlight = new THREE.SpotLight(0xf2f5ff, 320, 75, 0.3, 0.45, 1.1);
    this.searchlight.position.set(0, 0.25 * S, 2.3 * S); this.searchlight.castShadow = true; this.searchlight.userData.priority = 30;
    this.searchlight.target.position.set(0, -12, 13);
    this.root.add(this.searchlight, this.searchlight.target);
    const bellyL = new THREE.PointLight(0xdfe6ff, 7, 12, 1.6); bellyL.position.set(0, 0.3, 0.6); bellyL.userData.priority = 25; this.root.add(bellyL);
    const cabin = new THREE.PointLight(0xffc890, 6, 4.5, 1.8); cabin.position.set(0.2, 1.3 * S, 0.2); cabin.userData.priority = 20; this.root.add(cabin);
    return true;
  }

  update(dt: number, t: number): void {
    if (this.glb) {
      const rs = this.rotorSpeed;
      this.rotor.rotation.y += dt * rs * 30;
      this.tailRotor.rotation.x += dt * rs * 70;
      (this.disc.material as THREE.MeshBasicMaterial).opacity = 0.2 * Math.min(1, rs * 1.3);
      this.beacon.emissiveIntensity = (t % 1.1) < 0.12 ? 6 : 0.2;
      return;
    }
    const rs = this.rotorSpeed;
    this.rotor.rotation.y += dt * rs * 30;
    this.tailRotor.rotation.x += dt * rs * 70;
    (this.disc.material as THREE.MeshBasicMaterial).opacity = 0.2 * Math.min(1, rs * 1.3);
    this.door.position.z = 0.35 - this.doorOpen * 1.55;
    this.door.position.x = 1.02 + Math.min(1, this.doorOpen * 4) * 0.05;
    this.beacon.emissiveIntensity = (t % 1.1) < 0.12 ? 6 : 0.2;
  }

  /** world position of the cargo-door sill (where passengers step out) */
  doorWorld(out = new THREE.Vector3()): THREE.Vector3 { return this.root.localToWorld(out.set(this.glb ? this.glbDoorX : 1.6, 0, 0.35)); }

  dispose(): void {
    this.root.removeFromParent();
    this.root.traverse((o) => { const m = o as THREE.Mesh; m.geometry?.dispose?.(); });
  }
}
