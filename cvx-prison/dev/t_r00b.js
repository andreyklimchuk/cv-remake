const V3=g.cam.cam.position.constructor;
const info=()=>g.chars.map(c=>{ if(!c.m.root.visible) return c.index+':hid'; const ps=[]; c.m.model.traverse(o=>{ if(/^b\d\d$/.test(o.name)){ const v=new V3(); o.getWorldPosition(v); ps.push(v);} });
  const cen=ps.reduce((s,v)=>s.add(v),new V3()).multiplyScalar(1/ps.length); const n=cen.clone().project(g.cam.cam); const ys=ps.map(p=>p.y);
  return c.index+':'+(c.m.cur||'-')+' y['+Math.min(...ys).toFixed(2)+','+Math.max(...ys).toFixed(2)+'] c('+cen.x.toFixed(1)+','+cen.z.toFixed(1)+') ndc('+n.x.toFixed(2)+','+n.y.toFixed(2)+')'; }).join(' | ');
await waitFree(); console.log('free', st()); const a=vm.flr[2]; console.log('flr2', a.x,a.z,a.w,a.d);
g.setWeapon(1); await sim(1); vm.flr.forEach((f,i)=>console.log('flr',i,f.x.toFixed(2),f.z.toFixed(2),f.w.toFixed(2),f.d.toFixed(2))); P.place(a.x+a.w/2, 0, a.z+a.d+0.4, 0); await sim(1); console.log('out',st(),'wpn',g.weapon(),JSON.stringify(g.inv.slots.filter(Boolean).map(s=>s.id)),'rm',vm.rm?.toString(16),'ev99',JSON.stringify(vm.f?.ev?.slice?.(0,8))); P.place(a.x+a.w/2, 0, a.z+a.d/2, 0); for(let k=0;k<20;k++){ await sim(0.1); console.log('in'+k,st(), info()); }
for (let i=0;i<30;i++){ if(g.msg.active) g.sim(0.3,['KeyE']); else await sim(1.5); g.renderer.render(g.scene,g.cam.cam); if(i%4==0) snap('t'+i); console.log('T'+i, st(), 'ev', g.cam.ev.active, 'cam', g.cam.cam.position.toArray().map(v=>v.toFixed(1)).join(','), 'pl', P.mesh?.visible ?? P.root?.visible, info()); }
return caps;
