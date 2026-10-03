await g.enterRoom('rm_0030', 1, undefined, false); await sim(0.5);
const a=vm.flr[1]; console.log('flr1', a.x, a.z, a.w, a.d, a.flg, a.type, 'chars', g.chars.length);
P.place(a.x+a.w/2, 0, a.z+a.d/2, Math.PI); 
for (let i=0;i<20;i++){ await sim(3); snap('t'+(i*3)+' ev '+g.cam.ev.active+' evc '+g.cam.ev.no+':'+g.cam.ev.key+' chars '+g.chars.map(c=>c.index+(c.m.root.visible?'v':'h')+c.m.cur+'@'+vm.works.get('1:'+c.index)?.frm/65536).join(',')); }
await waitFree(); snap('free');
return caps;
