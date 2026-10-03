const V3=g.cam.cam.position.constructor; const sl=[]; const o0=g.snd.bind(g); g.snd=(c,a,w)=>{ sl.push(c+':'+a.join(',')); return o0(c,a,w); };
const handInfo=()=>{ const r=g.room; const out=[]; for (const [k,w] of vm.works){ if(!w.link) continue; const o=(w.kind===2?r.objMeshes:r.itemMeshes).get(w.idx); out.push(k+'>'+w.link.idx+'b'+w.link.bone+(o?(o.visible?'V':'h'):'-')); } return out.join(' '); };
const close=()=>{ const cam=new g.cam.cam.constructor(40,4/3,0.02,50); for (const c of g.chars){ if(!c.m.root.visible) continue; const b=c.m.bones.b14.getWorldPosition(new V3()); const h=c.m.bones.b05.getWorldPosition(new V3()); const m=b.clone().add(h).multiplyScalar(0.5); const f=new V3(0,0,1).applyQuaternion(c.m.root.quaternion); cam.position.copy(m).addScaledVector(f,1.3).add(new V3(0,0.1,0)); cam.lookAt(m); g.renderer.render(g.scene,cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.6)); } };
await g.enterRoom('rm_0030', 1, undefined, false); await sim(0.5);
const a=vm.flr[1]; P.place(a.x+a.w/2, 0, a.z+a.d/2, Math.PI);
for (let i=0;i<14;i++){ await sim(3); snap('t'+i*3); close(); console.log('T'+i, st(), handInfo()); }
console.log('SND', sl.join(' | '));
return caps;
