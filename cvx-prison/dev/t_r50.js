g.loop=()=>{}; const caps=[]; const cap=()=>{ g.renderer.render(g.scene,g.cam.cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.8)); };
const log=[];
await g.enterRoom('rm_0030', 1, undefined, false); g.sim(0.2);
let t=g.room.triggers.find(t=>t.kind==='door'&&t.room===5); await g.interact(t); g.sim(0.3);
log.push(g.roomId+' dogs '+g.dogs.length+' zombies '+g.zombies.length+' pos '+g.player.pos.toArray().map(v=>v.toFixed(2)));
cap(); g.player.place(-10,0,4,Math.PI/2); g.sim(0.05);
for (let i=0;i<10;i++){ g.sim(0.3); log.push(g.dogs.map(d=>d.state+'@'+d.root.position.x.toFixed(1)+','+d.root.position.z.toFixed(1)).join(' ')+' hp '+g.player.hp+' sync '+g.player.sync); cap(); }
// kill dogs by debug, go back
for (const d of g.dogs) { d.hit(99); } g.sim(1.5); cap();
g.player.place(-4.3+0.35,0,10.45+0.5,Math.PI); g.sim(0.1);
t=g.room.triggers[0]; log.push('t0 '+t.kind+' '+t.room+' '+t.spawn+' find '+(g.findTrigger()?.kind));
await g.interact(t); g.sim(0.3); log.push('back '+g.roomId+' '+g.player.pos.toArray().map(v=>v.toFixed(2))); cap();
console.log('LOG '+JSON.stringify(log)); return caps;
