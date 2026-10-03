g.loop=()=>{}; const caps=[];
await g.enterRoom('rm_0050', 0, undefined, false); g.sim(0.2);
const E=window.__EnemyModel; const m=await new E().load('enemies/en04a00.glb');
g.scene.add(m.root); const L=new (g.scene.children.find(o=>o.isLight)?.constructor ?? Object)(); g.scene.add(new m.root.constructor()); m.root.traverse(o=>{if(o.material){o.material.emissive?.setRGB(0.05,0.05,0.05);}}); const P=g.player.pos; m.root.position.set(P.x+1.5,P.y,P.z);
const names=[...m.clips.keys()]; const info=names.map(n=>n+':'+m.clips.get(n).duration.toFixed(2));
const cam=g.cam.cam; cam.position.set(P.x+1.5+2.0,P.y+0.6,P.z+0.01); cam.lookAt(P.x+1.5,P.y+0.4,P.z);
const LIST=['m12','m13','m14','m15','m16','m17','m18','m19','m20'];
for (const n of LIST) { for (const fr of [0.1,0.4,0.7,0.99]) { m.cur=''; const a=m.play(n,0,true); a.time=m.clips.get(n).duration*fr; m.mixer.update(0); g.renderer.render(g.scene,cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.7)); } }
console.log('LOG '+info.join(' ')); return caps;
