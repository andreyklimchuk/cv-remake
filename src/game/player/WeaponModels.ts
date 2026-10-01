import * as THREE from 'three';
import { ModelLibrary } from '../assets/ModelLibrary';

/** Procedural weapon meshes. Each returns a Group whose +Z is the barrel direction with a 'muzzle' child. */
const metal = new THREE.MeshStandardMaterial({ color: 0x1c1d20, metalness: 0.85, roughness: 0.35 });
const steel = new THREE.MeshStandardMaterial({ color: 0x55585e, metalness: 0.9, roughness: 0.25 });
const polymer = new THREE.MeshStandardMaterial({ color: 0x121212, metalness: 0.1, roughness: 0.7 });
const wood = new THREE.MeshStandardMaterial({ color: 0x4a2a14, metalness: 0, roughness: 0.6 });
const olive = new THREE.MeshStandardMaterial({ color: 0x3b4a2c, metalness: 0.3, roughness: 0.6 });

function box(g: THREE.Group, mat: THREE.Material, w: number, h: number, d: number, x: number, y: number, z: number, rx = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z); m.rotation.x = rx; m.castShadow = true; g.add(m); return m;
}
function cyl(g: THREE.Group, mat: THREE.Material, r: number, len: number, x: number, y: number, z: number): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 10), mat);
  m.rotation.x = Math.PI / 2; m.position.set(x, y, z); m.castShadow = true; g.add(m); return m;
}
function muzzle(g: THREE.Group, z: number, y = 0.02): void {
  const o = new THREE.Object3D(); o.name = 'muzzle'; o.position.set(0, y, z); g.add(o);
}

export function makeWeaponModel(id: string): THREE.Group {
  const g = new THREE.Group();
  const glb = ModelLibrary.get('weapon_' + id);
  if (glb) {
    // Blender-authored hard-surface model (same +Z barrel convention, 'muzzle' empty exported from the .blend)
    const m = glb.scene.clone(true);
    m.traverse((o) => { if ((o as THREE.Mesh).isMesh) { o.castShadow = true; } });
    g.add(m);
    if (!g.getObjectByName('muzzle')) muzzle(g, 0.16, 0.03);
    return g;
  }
  switch (id) {
    case 'knife':
      box(g, polymer, 0.025, 0.03, 0.1, 0, 0, 0);
      box(g, steel, 0.004, 0.028, 0.16, 0, 0.004, 0.13);
      muzzle(g, 0.2);
      break;
    case 'm9f':
      box(g, metal, 0.03, 0.035, 0.2, 0, 0.03, 0.05);
      box(g, polymer, 0.028, 0.11, 0.045, 0, -0.035, -0.02, -0.25);
      box(g, metal, 0.02, 0.012, 0.05, 0, 0.0, 0.03);
      muzzle(g, 0.16, 0.03);
      break;
    case 'bowgun':
      box(g, wood, 0.05, 0.05, 0.5, 0, 0, 0.1);
      box(g, metal, 0.5, 0.015, 0.03, 0, 0.02, 0.3);
      box(g, polymer, 0.03, 0.1, 0.04, 0, -0.06, -0.02, -0.3);
      muzzle(g, 0.36, 0.03);
      break;
    case 'm3':
      cyl(g, metal, 0.018, 0.55, 0, 0.03, 0.35);
      cyl(g, polymer, 0.022, 0.25, 0, -0.005, 0.3);
      box(g, metal, 0.045, 0.06, 0.2, 0, 0.02, 0.02);
      box(g, polymer, 0.04, 0.09, 0.3, 0, -0.03, -0.2, 0.15);
      muzzle(g, 0.63, 0.03);
      break;
    case 'mp5':
      box(g, metal, 0.045, 0.07, 0.32, 0, 0.02, 0.12);
      cyl(g, metal, 0.015, 0.12, 0, 0.03, 0.33);
      box(g, polymer, 0.03, 0.15, 0.04, 0, -0.07, 0.14, 0.2);
      box(g, polymer, 0.035, 0.1, 0.04, 0, -0.05, -0.02, -0.3);
      box(g, metal, 0.03, 0.03, 0.22, 0, 0.0, -0.15);
      muzzle(g, 0.4, 0.03);
      break;
    case 'luger': {
      const gold = new THREE.MeshStandardMaterial({ color: 0xffc860, metalness: 1, roughness: 0.25 });
      const ivory = new THREE.MeshStandardMaterial({ color: 0xe8e2d4, metalness: 0, roughness: 0.4 });
      cyl(g, gold, 0.008, 0.11, 0, 0.024, 0.125);
      box(g, gold, 0.022, 0.035, 0.12, 0, 0.018, 0.01);
      box(g, ivory, 0.03, 0.1, 0.04, 0, -0.045, -0.06, -0.6);
      muzzle(g, 0.18, 0.024);
      break;
    }
    case 'python':
      cyl(g, steel, 0.014, 0.2, 0, 0.035, 0.14);
      cyl(g, steel, 0.026, 0.05, 0, 0.02, 0.02);
      box(g, steel, 0.012, 0.02, 0.2, 0, 0.055, 0.14);
      box(g, wood, 0.03, 0.11, 0.045, 0, -0.04, -0.03, -0.35);
      muzzle(g, 0.25, 0.035);
      break;
    case 'gl':
      cyl(g, olive, 0.035, 0.36, 0, 0.03, 0.2);
      box(g, metal, 0.05, 0.07, 0.15, 0, 0.0, -0.02);
      box(g, polymer, 0.04, 0.1, 0.25, 0, -0.03, -0.2, 0.15);
      muzzle(g, 0.4, 0.03);
      break;
    case 'linear': {
      box(g, new THREE.MeshStandardMaterial({ color: 0xd0d4d8, metalness: 0.6, roughness: 0.3 }), 0.1, 0.12, 0.8, 0, 0.02, 0.2);
      const glow = new THREE.MeshStandardMaterial({ color: 0x224455, emissive: 0x33aaff, emissiveIntensity: 2 });
      box(g, glow, 0.104, 0.02, 0.6, 0, 0.05, 0.2);
      muzzle(g, 0.62, 0.03);
      break;
    }
  }
  return g;
}

export function weaponHold(id: string): 'pistol' | 'rifle' | 'knife' | 'dual' {
  if (id === 'knife') return 'knife';
  if (id === 'gold_lugers') return 'dual';
  return id === 'm9f' || id === 'python' ? 'pistol' : 'rifle';
}
