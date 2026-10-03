g.loop=()=>{}; const caps=[]; const vm=g.vm; g.debug=true;
const snap=(t)=>{ g.renderer.render(g.scene,g.cam.cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.6)); console.log(t, 'cb',(vm.cb>>>0).toString(16),'st',(vm.st>>>0).toString(16),'tasks',vm.tasks.map((t,i)=>t.status?i+':e'+(t.script-2):'').filter(Boolean).join(' '),'cam',g.cam.index,g.cam.forced,'msg',g.msg.active, g.msg.active?JSON.stringify(g.ui.msg.textContent):'','movie',g.movieOn,'plvis',g.player.root.visible,'frozen',g.player.frozen,'fade',g.ui.fadeEl.style.opacity,'ev99',vm.flag(1,99)); };
g.sim(1); vm.cb|=0x10000000; // skip intro
for (let i=0;i<10;i++){ g.sim(1); const v=document.querySelector('video'); if(v){ dispatchEvent(new KeyboardEvent('keydown',{code:'Escape'})); await sleep(300);} }
snap('wake');
for (let i=0;i<5&&g.msg.active;i++){ g.sim(0.5,['KeyE']); }
g.sim(1); snap('free');
g.setWeapon(1); g.sim(1); snap('lighter');
for (let i=0;i<6;i++){ g.sim(3); snap('rod'+i); }
g.sim(0.2,['Escape']); for (let i=0;i<6;i++){ g.sim(1); if(g.msg.active) g.sim(0.3,['KeyE']); } snap('skipped');
const w=vm.works; console.log('works', [...w.entries()].map(([k,x])=>k+(x.gone?'G':'')+(x.hidden?'H':'')+(x.scripted?'S':'')).join(' '));
console.log('wal17', vm.wal[17].flg, 'inv', JSON.stringify(g.inv.slots.filter(Boolean)), 'door rot', g.room.objMeshes.get(4)?.rotation.y);
for (let i=0;i<5;i++){ g.sim(2); if(g.msg.active) g.sim(0.3,['KeyE']); snap('post'+i);} 
return caps;
