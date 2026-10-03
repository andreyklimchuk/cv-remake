const V3=g.cam.cam.position.constructor;
await g.enterRoom('rm_0030', 1, undefined, false); await sim(0.5);
const a=vm.flr[1]; P.place(a.x+a.w/2, 0, a.z+a.d/2, Math.PI);
const info=()=>g.chars.filter(c=>c.m.root.visible).map(c=>{ const ys=[],ps=[]; c.m.model.traverse(o=>{ if(o.isBone||/^b\d\d$/.test(o.name)){ const v=new V3(); o.getWorldPosition(v); ys.push(v.y); ps.push(v);} });
  const cen=ps.reduce((s,v)=>s.add(v),new V3()).multiplyScalar(1/ps.length); const n=cen.clone().project(g.cam.cam);
  return c.index+': y['+Math.min(...ys).toFixed(2)+','+Math.max(...ys).toFixed(2)+'] c('+cen.x.toFixed(2)+','+cen.y.toFixed(2)+','+cen.z.toFixed(2)+') ndc('+n.x.toFixed(2)+','+n.y.toFixed(2)+','+n.z.toFixed(2)+')'; }).join(' | ');
for (let i=0;i<14;i++){ await sim(4); g.renderer.render(g.scene,g.cam.cam); console.log('T'+(i*4), 'cam', g.cam.cam.position.toArray().map(v=>v.toFixed(2)).join(','), 'fov', g.cam.cam.fov.toFixed(1), info()); }
return [];
