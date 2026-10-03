g.loop=()=>{}; const caps=[]; const vm=g.vm; g.debug=true;
const snap=(t)=>{ g.renderer.render(g.scene,g.cam.cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.6)); console.log(t, 'cb',(vm.cb>>>0).toString(16),'st',(vm.st>>>0).toString(16),'tasks',vm.tasks.map((t,i)=>t.status?i+':e'+(t.script-2):'').filter(Boolean).join(' '),'msg',g.msg.active, g.msg.active?JSON.stringify(g.ui.msg.textContent):'','frozen',g.player.frozen,'pos',g.player.pos.x.toFixed(2),g.player.pos.z.toFixed(2)); };
const closeMsgs=async()=>{ for (let i=0;i<12&&(g.msg.active||g.dialog);i++) { g.sim(0.4,['KeyE']); await sleep(10); } };
g.sim(1); vm.cb|=0x10000000;
for (let i=0;i<10;i++){ g.sim(1); const v=document.querySelector('video'); if(v){ dispatchEvent(new KeyboardEvent('keydown',{code:'Escape'})); await sleep(300);} }
await closeMsgs(); g.sim(1); g.setWeapon(1); g.sim(2); g.sim(0.2,['Escape']); for (let i=0;i<4;i++){ g.sim(1); await closeMsgs(); }
snap('free');
// examine spots: walk to each etc trigger and face it
const P=g.player;
const tryAt=async(x,z,h,label)=>{ P.place(x,0,z,h); g.sim(0.1); g.sim(0.1,['KeyE']); g.sim(0.2); snap(label+' etc'+vm.etc_idx); await closeMsgs(); };
for (const [i,a] of vm.etc.entries()) { const cx=a.x+a.w/2, cz=a.z+a.d/2; console.log('etc',i,a.flg,a.type,a.attr.toString(16),a.prm.join(','),cx.toFixed(2),cz.toFixed(2)); }
// knife on the desk (etc7 type4 item0), bullets etc4, hemostatic?
for (const i of [7,4,8,6,5,3]) { const a=vm.etc[i]; const cx=a.x+a.w/2, cz=a.z+a.d/2; for (const h of [0,Math.PI/2,Math.PI,-Math.PI/2]) { const f=[-Math.sin(h),-Math.cos(h)]; const d=[0.45,0.075,0.45,0.6,0.2][a.type]; P.place(cx-f[0]*d,0,cz-f[1]*d,h); g.sim(0.05); g.sim(0.05,['KeyE']); await sleep(10); g.sim(0.1); if (g.msg.active||g.dialog) { snap('etc'+i+' h'+h.toFixed(1)); await closeMsgs(); break; } } }
console.log('inv', JSON.stringify(g.inv.slots.filter(Boolean)));
console.log('it flags', vm.f.it.slice(0,5).map(x=>(x>>>0).toString(16)).join(' '));
return caps;
