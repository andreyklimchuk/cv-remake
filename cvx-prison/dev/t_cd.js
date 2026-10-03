g.loop=()=>{}; const caps=[];
await g.enterRoom('rm_0050', 0, undefined, false); g.sim(0.2);
const P=g.player; const p=P.root.position; const cam=g.cam.cam;
P.place(-6,0,8,Math.PI/2); g.sim(0.3);
for (const n of ['z00','d00','d01','d02','d03','d04','d05','d06','d05']) { const a=P.actions.get(n); const c=a.getClip();
  for (const fr of [0.1,0.4,0.7,0.99]) { P.playSync(n,false,0); P.mixer.setTime(0); a.time=c.duration*fr; P.mixer.update(0); g.renderer.render(g.scene,cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.7)); } }
return caps;
