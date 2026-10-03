g.loop=()=>{}; const caps=[]; const cap=()=>{ g.renderer.render(g.scene,g.cam.cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.8)); };
await g.enterRoom('rm_0020', 0, undefined, false);
const P=g.player; P.place(7.6,0,11.5,0); g.sim(0.2); cap();
console.log('LOG '+JSON.stringify([g.roomId])); return caps;
