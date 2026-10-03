const V3=g.cam.cam.position.constructor;
await g.enterRoom('rm_0030', 1, undefined, false); await sim(0.5);
const a=vm.flr[1]; P.place(a.x+a.w/2, 0, a.z+a.d/2, Math.PI);
await sim(6);
const c=g.chars.find(c=>c.index===1); const out=[];
c.m.model.traverse(o=>{ if(/^b\d\d$/.test(o.name)){ const v=new V3(); o.getWorldPosition(v); out.push(o.name+':'+v.toArray().map(x=>x.toFixed(2)).join(',')); } });
console.log('BONES', out.join(' '));
console.log('floor', g.room.floorAt(1.9, 9.9, 1, 3), g.room.floorAt(1.0,9.35,1,3));
return [];
