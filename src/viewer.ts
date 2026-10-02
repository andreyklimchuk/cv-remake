import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ModelLibrary } from './game/assets/ModelLibrary';
import { ClaireModel, type AnimParams } from './game/player/ClaireModel';
import { ZombieModel, type ZombieOutfit } from './game/ai/ZombieModel';
import { CreatureModel } from './game/ai/Creature';
import { Licker } from './game/ai/Licker';
import { HunterModel } from './game/ai/Hunter';

/** Model viewer: play.html?viewer=claire&pose=idle|aim|run|pain&yaw=0&shot=full|face|torso|feet */
export async function runViewer(): Promise<void> {
  const q = new URLSearchParams(location.search);
  document.getElementById('ui')!.innerHTML = '';
  const canvas = document.getElementById('game') as HTMLCanvasElement;
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  r.setPixelRatio(1); r.setSize(innerWidth, innerHeight);
  r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.0;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x202328);
  const pm = new THREE.PMREMGenerator(r);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.45;
  const key = new THREE.DirectionalLight(0xfff1e0, 2.6); key.position.set(1.5, 3, 2.5); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.camera.left = -1.5; key.shadow.camera.right = 1.5; key.shadow.camera.top = 2.2; key.shadow.camera.bottom = -0.2;
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fc0ff, 1.6); rim.position.set(-2, 2.5, -2.5); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffd0b0, 0.5); fill.position.set(-2, 1, 2); scene.add(fill);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(3, 48), new THREE.MeshStandardMaterial({ color: 0x3a3b3e, roughness: 0.8 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

  await ModelLibrary.preload();
  const which = q.get('viewer') || 'claire';
  const pose = q.get('pose') || 'idle';
  const claire = new ClaireModel(2048, which === 'steve' ? 'steve' : which === 'hunk' ? 'hunk' : 'claire');
  let zombie: ZombieModel | null = null;
  let creature: CreatureModel | null = null;
  let posedEnemy = false;
  if (which === 'licker') {
    // pose=idle|walk|lash|swipe|pounce|down|dead, t=<state time>, speed=<m/s>
    const L = new Licker({ id: 'v', x: 0, z: 0, yaw: 0 }, scene, () => ({}) as any) as any;
    L.state = pose; const T = Number(q.get('t') || 0.5); const sp = Number(q.get('speed') || (pose === 'walk' ? 2.6 : 0));
    for (let i = 0; i < (q.get('raw') ? 0 : 40); i++) { L.stateT = Math.max(0, T - (40 - i) * 0.02); if (pose === 'lash') L.tongue = Number(q.get('tongue') || 0.5); L.anim(0.02, sp); }
    if (q.get('raw') === '2') { L.model.stretch('tongue', 1); L.model.offset('hips', 0, 0, 0); }
    (window as any).__lk = L;
    posedEnemy = true;
  } else if (which === 'hunter') {
    // pose=<clip name>, t=<clip time>
    const H = new HunterModel(); scene.add(H.root);
    H.play(pose === 'idle' ? 'idle' : pose, 0, true); H.mixer.setTime(Number(q.get('t') || 0));
    posedEnemy = true;
  } else if (which === 'cerberus' || which === 'bandersnatch') {
    creature = new CreatureModel(which);
    scene.add(creature.root);
    const c = creature;
    if (which === 'cerberus') {
      if (pose === 'run') { c.rot('lfUpper', -0.7); c.rot('rfUpper', -0.5); c.rot('lhUpper', 0.6); c.rot('rhUpper', 0.75); c.rot('lfLower', -0.6); c.rot('lhLower', 0.5); c.rot('jaw', 0.5); }
      else if (pose === 'attack') { c.rot('lfUpper', -1.1); c.rot('rfUpper', -1.0); c.rot('lhUpper', 0.9); c.rot('rhUpper', 0.85); c.rot('jaw', 0.9); c.rot('neck', -0.35); c.offset('hips', 0, 0.3, 0); }
      else { c.rot('jaw', 0.3); c.rot('neck', 0.05); c.rot('head', 0.2); }
    } else {
      if (pose === 'attack') { c.rot('rUpperArm', -1.45, 0, 0.05); c.rot('rForearm', 0); c.stretch('rForearm', 2.2); c.stretch('rHand', 1 / 2.2); c.rot('jaw', 0.9); c.rot('spine', 0.05, -0.35, 0); }
      else { c.rot('spine', 0.18); c.rot('rForearm', -0.25); c.rot('jaw', 0.3); c.rot('rUpperArm', 0.05, 0, 0.12); }
    }
  } else if (which.startsWith('zombie')) {
    zombie = new ZombieModel(which.replace('zombie_', '') as ZombieOutfit, 2048, Number(q.get('seed') || 0));
    zombie.root.scale.setScalar(1);
    scene.add(zombie.root);
    const r = zombie.rig;
    if (pose === 'chase') {
      r.lUpperArm.rotation.set(-1.35, 0, -0.1); r.rUpperArm.rotation.set(-1.25, 0, 0.1); r.lForearm.rotation.x = -0.2; r.rForearm.rotation.x = -0.25;
      r.spine.rotation.x = 0.25; r.neck.rotation.set(0.2, 0, 0.2); r.lThigh.rotation.x = -0.3; r.rThigh.rotation.x = 0.25; r.lShin.rotation.x = 0.3;
    } else { r.lUpperArm.rotation.z = 0.08; r.rUpperArm.rotation.z = -0.08; r.spine.rotation.x = 0.12; r.neck.rotation.z = 0.25; }
    r.hips.position.y = zombie.hipRest - 0.02;
    if (q.get('sever')) { const piece = zombie.sever(q.get('sever') as any); if (piece) { piece.position.set(0.5, 0.1, 0.3); piece.rotation.z = 1.4; scene.add(piece); } }
  } else if (!creature && !posedEnemy) scene.add(claire.root);
  if (pose === 'aim' || pose === 'gun' || pose === 'knife' || pose === 'stab' || q.get('weapon')) claire.setWeapon(q.get('weapon') || 'm9f');
  // holster=<t>: freeze the Lugers holster animation at t seconds (put → weapon=knife) / draw=<t>
  if (q.get('holster') || q.get('draw')) {
    const put = !!q.get('holster');
    claire.setWeapon(put ? 'knife' : 'gold_lugers');
    const ha = (claire as any).holsterAnim; if (ha) { ha.t = Number(q.get('holster') || q.get('draw')); ha.freeze = true; }
  }
  if (q.get('lighter')) claire.setLighter(true);
  const hide = q.get('hide');
  if (hide) scene.traverse((o) => { if ((o as THREE.Mesh).isMesh && o.name.includes(hide)) o.visible = false; });
  (window as any).__scene = scene;
  (window as any).__meshes = () => { const out: string[] = []; scene.traverse((o) => { if ((o as THREE.Mesh).isMesh) out.push(o.name + ':' + (o as THREE.Mesh).geometry.attributes.position.count); }); return out; };
  const yaw = (Number(q.get('yaw') || 0) * Math.PI) / 180;
  const cam = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.05, 50);
  const shots: Record<string, [number, number, number]> = { full: [0.95, 4.2, 0], torso: [1.2, 1.9, 0], face: [1.58, 0.62, 0], feet: [0.2, 1.4, 0], hands: [0.95, 1.4, 0], dog: [0.45, 2.4, 0], doghead: [0.8, 0.95, 0], big: [1.3, 5.6, 0], gun: [1.3, 1.0, 0] };
  const [ty, dist] = shots[q.get('shot') || 'full'] ?? shots.full;
  const cx = Number(q.get('cx') || 0), cz = Number(q.get('cz') || 0), cy = Number(q.get('cy') || ty);
  cam.position.set(cx + Math.sin(yaw) * dist, cy + 0.05, cz + Math.cos(yaw) * dist); cam.lookAt(cx, cy, cz);
  const p: AnimParams = {
    speed: q.get('speed') ? Number(q.get('speed')) : pose === 'run' ? 4 : pose === 'walk' ? 2.2 : 0, localMove: new THREE.Vector2(0, pose === 'run' || pose === 'walk' ? 1 : 0), running: pose === 'run', aim: pose === 'aim',
    aimPitch: 0, aimPoint: new THREE.Vector3(0, 1.4, 10), state: 'normal', stateT: 0, dodgeDir: new THREE.Vector2(),
    hpRatio: 1, reloading: false, lookTarget: new THREE.Vector3(0, 1.55, 5),
    knifeReady: pose === 'knife',
  };
  if (pose === 'stab' || pose === 'slash') { p.state = pose === 'stab' ? 'stab' : 'knife'; p.stateT = Number(q.get('k') || 0.45); }
  if (pose === 'pain') claire.expressionPain = 5;
  const t0 = performance.now();
  let frames = 0;
  const tick = () => {
    const t = (performance.now() - t0) / 1000;
    if (!zombie && !creature) { if (q.get('phase')) (claire as any).phase = Number(q.get('phase')); if (q.get('fireT')) (claire as any).fireT = Number(q.get('fireT')) - 1 / 60; { const ha = (claire as any).holsterAnim; if (ha?.freeze) ha.t -= 1 / 60; } claire.animate(1 / 60, t, p); }
    r.render(scene, cam);
    frames++;
    (window as any).__frames = frames; (window as any).__viewerReady = frames > 4 && (!!ModelLibrary.has(which) || !!ModelLibrary.has('enemy_' + which));
    requestAnimationFrame(tick);
  };
  tick();
  (window as any).__viewerInfo = () => ({ calls: r.info.render.calls, tris: r.info.render.triangles, detailed: zombie ? zombie.detailed : claire.detailed });
}

