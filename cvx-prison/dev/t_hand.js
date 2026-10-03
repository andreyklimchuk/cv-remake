g.loop=()=>{}; const caps=[];
await g.enterRoom('rm_0020', 0, undefined, false);
const P=g.player; P.place(7.6,0,11.5,0); g.sim(0.2);
g.inv.add(9,'Handgun',15);
const S=g.invScreen; const idx=g.inv.slots.findIndex(s=>s&&s.id===9); S.sel=idx; S.cursor=idx; 
S.equipped=null; // emulate menu "Equip"
S.cur=()=>g.inv.slots[idx]; S.doUse();
const log=[P.gunOn, S.equipped];
g.sim(0.6,['KeyF']); log.push(P.state,P.cur,P.lighterOn,P.frozen,g.msg.active,g.msg.el.textContent);
const cam=new g.cam.cam.constructor(30,4/3,0.05,50); const b=P.bones.b09.getWorldPosition(new P.pos.constructor());
for (const [dx,dz] of [[0.5,0.15],[-0.5,0.1]]) { cam.position.set(b.x+dx,b.y+0.2,b.z+dz); cam.lookAt(b); g.renderer.render(g.scene,cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.8)); }
console.log('LOG '+JSON.stringify(log)); return caps;
