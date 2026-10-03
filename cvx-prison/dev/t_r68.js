g.loop=()=>{}; const caps=[]; const cap=()=>{ g.renderer.render(g.scene,g.cam.cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.8)); };
const log=[];
await g.enterRoom('rm_0050', 0, undefined, false); g.sim(0.1);
for (const [i,t] of g.room.triggers.entries()) log.push(i+':'+t.kind+':'+t.arg+(t.room!=null?'>'+t.room+'/'+t.spawn:''));
let t=g.room.triggers.find(t=>t.kind==='door'&&t.room===6); await g.interact(t); g.sim(0.3); cap();
log.push(g.roomId+' items '+[...g.room.itemMeshes.keys()]+' z '+g.zombies.length+' trig '+g.room.triggers.map(t=>t.kind[0]+t.arg).join(','));
// take the map via message 5
const mt=g.room.triggers.find(t=>t.kind==='message'&&t.arg===5); log.push('usable '+g.usable(mt));
g.msg.raw=async(p,c)=>{log.push('MSG '+JSON.stringify(p)+(c?' ?':'')); return 0;}; g.msg.show=async(p)=>{log.push('SHOW '+JSON.stringify(p));};
await g.interact(mt); log.push('after usable '+g.usable(mt)+' taken '+JSON.stringify(g.taken));
t=g.room.triggers.find(t=>t.kind==='door'&&t.room===5); await g.interact(t); g.sim(0.3); log.push('back '+g.roomId+' '+g.player.pos.toArray().map(v=>v.toFixed(2)));
t=g.room.triggers.find(t=>t.kind==='door'&&t.room===8); await g.interact(t); g.sim(0.3); cap();
log.push(g.roomId+' items '+[...g.room.itemMeshes.keys()]+' z '+g.zombies.length+' trig '+g.room.triggers.map(t=>t.kind[0]+t.arg).join(','));
t=g.room.triggers.find(t=>t.kind==='door'&&t.room===9); await g.interact(t);
t=g.room.triggers.find(t=>t.kind==='door'&&t.room===5); await g.interact(t); g.sim(0.3); log.push('back '+g.roomId+' '+g.player.pos.toArray().map(v=>v.toFixed(2))); cap();
console.log('LOG '+JSON.stringify(log)); return caps;
