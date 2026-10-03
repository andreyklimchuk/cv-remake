const V3=g.cam.cam.position.constructor;
const info=()=>g.chars.map(c=>{ if(!c.m.root.visible) return c.index+':hid'; const ps=[]; c.m.model.traverse(o=>{ if(/^b\d\d$/.test(o.name)){ const v=new V3(); o.getWorldPosition(v); ps.push(v);} });
  const cen=ps.reduce((s,v)=>s.add(v),new V3()).multiplyScalar(1/ps.length); const n=cen.clone().project(g.cam.cam); const ys=ps.map(p=>p.y);
  return c.index+'('+c.m.clips.size+'):y['+Math.min(...ys).toFixed(2)+','+Math.max(...ys).toFixed(2)+'] ndc('+n.x.toFixed(2)+','+n.y.toFixed(2)+','+n.z.toFixed(2)+')'; }).join(' | ');
for (let i=0;i<40;i++){ if(g.msg.active) g.sim(0.2,['KeyE']); else await sim(1); g.renderer.render(g.scene,g.cam.cam); if(i%3==0) snap('t'+i); console.log('T'+i, st(), 'ev', !!g.cam.ev?.active, 'cam', g.cam.cam.position.toArray().map(v=>v.toFixed(1)).join(','), info()); }
return caps;
