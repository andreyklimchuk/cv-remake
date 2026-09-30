import * as THREE from 'three';
import { ITEMS } from '../inventory/Items';
import { makeWeaponModel } from '../player/WeaponModels';
import { ModelLibrary } from '../assets/ModelLibrary';

const mat = (c: number, e = 0, metal = 0.1, rough = 0.6) => new THREE.MeshStandardMaterial({ color: c, emissive: e, metalness: metal, roughness: rough });

/** World representation of pickup items. */
export function makeItemMesh(defId: string): THREE.Object3D {
  const def = ITEMS[defId];
  const g = new THREE.Group();
  const glb = def.kind !== 'weapon' ? ModelLibrary.get('item_' + defId) : undefined;
  if (glb) {
    // Blender-authored detailed pickup (origin on the floor, real-world scale)
    const m = glb.scene.clone(true);
    m.rotation.y = (defId.length * 1.7) % (Math.PI * 2);
    g.add(m);
    return g;
  }
  const add = (geo: THREE.BufferGeometry, m: THREE.Material, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) => {
    const mesh = new THREE.Mesh(geo, m); mesh.position.set(x, y, z); mesh.rotation.set(rx, ry, rz); mesh.castShadow = true; g.add(mesh); return mesh;
  };
  if (def.kind === 'weapon') {
    const w = makeWeaponModel(defId);
    w.rotation.set(0, 0, Math.PI / 2);
    w.position.y = 0.03;
    g.add(w);
    return g;
  }
  switch (def.kind) {
    case 'herb': {
      add(new THREE.CylinderGeometry(0.07, 0.055, 0.1, 10), mat(0x5a3a22), 0, 0.05, 0);
      const leafCol = defId.includes('r') && !defId.includes('gr') ? 0xaa2222 : defId === 'herb_b' ? 0x2244aa : 0x2f8a3a;
      for (let i = 0; i < 6; i++) add(new THREE.ConeGeometry(0.03, 0.16, 5), mat(leafCol, 0, 0, 0.5), Math.cos(i) * 0.03, 0.17, Math.sin(i) * 0.03, Math.cos(i * 2) * 0.4, 0, Math.sin(i * 2) * 0.4);
      break;
    }
    case 'ammo': {
      const c = new THREE.Color(def.color).getHex();
      add(new THREE.BoxGeometry(0.14, 0.07, 0.09), mat(c, 0, 0.2), 0, 0.035, 0);
      add(new THREE.BoxGeometry(0.1, 0.071, 0.02), mat(0xdddddd), 0, 0.036, 0.036);
      break;
    }
    case 'gunpowder':
      add(new THREE.CylinderGeometry(0.05, 0.05, 0.12, 12), mat(0x777777, 0, 0.8, 0.3), 0, 0.06, 0);
      add(new THREE.CylinderGeometry(0.051, 0.051, 0.05, 12), mat(defId === 'gp_a' ? 0xaa3333 : defId === 'gp_b' ? 0x3355aa : 0xaaaa33), 0, 0.06, 0);
      break;
    case 'key':
      if (defId === 'keycard') add(new THREE.BoxGeometry(0.09, 0.004, 0.055), mat(0xcccc88, 0x222200), 0, 0.01, 0);
      else if (defId === 'extinguisher') {
        add(new THREE.CylinderGeometry(0.08, 0.08, 0.5, 14), mat(0xaa1111, 0, 0.3, 0.35), 0, 0.25, 0);
        add(new THREE.CylinderGeometry(0.03, 0.03, 0.08, 8), mat(0x222222), 0, 0.54, 0);
        add(new THREE.TorusGeometry(0.06, 0.012, 6, 12, Math.PI), mat(0x111111), 0.05, 0.5, 0, 0, 0, -1);
      } else if (defId === 'emblem') {
        add(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 6), mat(0xb08030, 0x201000, 0.9, 0.3), 0, 0.02, 0);
        add(new THREE.ConeGeometry(0.08, 0.16, 3), mat(0xc09040, 0x201000, 0.9, 0.3), 0, 0.06, 0, Math.PI / 2, 0, 0);
      } else add(new THREE.BoxGeometry(0.12, 0.03, 0.08), mat(new THREE.Color(def.color).getHex()), 0, 0.015, 0);
      break;
    default:
      add(new THREE.BoxGeometry(0.1, 0.05, 0.08), mat(0x444455, 0, 0.7, 0.4), 0, 0.025, 0);
  }
  return g;
}
