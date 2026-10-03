g.loop=()=>{}; const caps=[]; const vm=g.vm; g.debug=true;
const snap=(t)=>{ g.renderer.render(g.scene,g.cam.cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.6)); console.log(t, 'cb',(vm.cb>>>0).toString(16),'st',(vm.st>>>0).toString(16),'tasks',vm.tasks.map((t,i)=>t.status?i+':e'+(t.script-2):'').filter(Boolean).join(' '),'cam',g.cam.index,g.cam.forced,'msg',g.msg.active,'movie',g.movieOn,'plvis',g.player.root.visible,'fade',g.ui.fadeEl.style.opacity); };
snap('start');
for (let i=0;i<8;i++){ g.sim(2); snap('t'+(i*2+2)); }
for(let i=0;i<30;i++){ const v=document.querySelector('video'); if(v){ dispatchEvent(new KeyboardEvent('keydown',{code:'Escape'})); break;} await sleep(100); }
await sleep(300);
for (let i=0;i<4;i++){ g.sim(2); snap('after'+i); }
// equip lighter and walk to the cell door area
console.log('weapon',g.weapon());
g.setWeapon(1); console.log('weapon',g.weapon(), 'flr', JSON.stringify(vm.flr.map(a=>[a.flg,a.type,a.attr.toString(16),a.x,a.z,a.w,a.d])));
return caps;
