const V3=g.cam.cam.position.constructor;
const info=()=>g.chars.map(c=>{ if(!c.m.root.visible) return c.index+':hid'; const ps=[]; c.m.model.traverse(o=>{ if(/^b\d\d$/.test(o.name)){ const v=new V3(); o.getWorldPosition(v); ps.push(v);} });
  const inn=ps.filter(p=>{const q=p.clone().project(g.cam.cam); return Math.abs(q.x)<1&&Math.abs(q.y)<1&&q.z<1;}).length; const cen=ps.reduce((s,v)=>s.add(v),new V3()).multiplyScalar(1/ps.length); const n=cen.clone().project(g.cam.cam); const ys=ps.map(p=>p.y);
  return c.index+':'+(c.m.cur||'-')+' y['+Math.min(...ys).toFixed(2)+','+Math.max(...ys).toFixed(2)+'] c('+cen.x.toFixed(1)+','+cen.z.toFixed(1)+') in '+inn+'/'+ps.length+' ndc('+n.x.toFixed(2)+','+n.y.toFixed(2)+')'; }).join(' | ');
for (let i=0;i<30&&(g.inCine||g.msg.active||P.frozen);i++){ if(g.msg.active) g.sim(0.2,['KeyE']); else await sim(1); }
console.log('free', st()); g.setWeapon(1); await sim(0.5);
const a=vm.flr[2]; P.place(a.x+a.w/2, 0, a.z+a.d+0.4, 0); await sim(1); P.place(a.x+a.w/2, 0, a.z+a.d/2, 0);
for (let i=0;i<70;i++){ if(g.msg.active) g.sim(0.3,['KeyE']); else await sim(1); g.renderer.render(g.scene,g.cam.cam); if(i%3==0) snap('t'+i); console.log('T'+i, st(), 'ev', g.cam.ev.active, 'evc', g.cam.ev.no, 'cam', g.cam.cam.position.toArray().map(v=>v.toFixed(1)).join(','), 'pl', P.root?.visible ?? P.mesh?.visible, info()); }
return caps;
