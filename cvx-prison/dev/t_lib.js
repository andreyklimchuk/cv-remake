g.loop=()=>{}; const caps=[]; const vm=g.vm; g.debug=true; const P=g.player;
const st=()=>`${g.roomId} cb ${(vm.cb>>>0).toString(16)} st ${(vm.st>>>0).toString(16)} tasks ${vm.tasks.map((t,i)=>t.status?i+':e'+(t.script-2):'').filter(Boolean).join(' ')} msg ${g.msg.active?JSON.stringify(g.ui.msg.textContent.slice(0,60)):'-'} frozen ${g.player.frozen} pos ${P.pos.x.toFixed(2)},${P.pos.z.toFixed(2)}`;
const snap=(t)=>{ g.renderer.render(g.scene,g.cam.cam); caps.push(g.renderer.domElement.toDataURL('image/jpeg',0.6)); console.log(t, st()); };
const sim=async(s,k)=>{ g.sim(s,k); await sleep(5); };
const closeMsgs=async()=>{ for (let i=0;i<20&&(g.msg.active||g.dialog||g.busy);i++) { if (g.busy && !g.msg.active) { await sleep(200); continue; } g.sim(0.4,['KeyE']); await sleep(10); } };
const skipMovie=async()=>{ const v=document.querySelector('video'); if(v){ dispatchEvent(new KeyboardEvent('keydown',{code:'Escape'})); await sleep(300);} };
const waitFree=async(max=60)=>{ for (let i=0;i<max;i++){ await skipMovie(); if (g.msg.active||g.dialog) { await closeMsgs(); continue; } if (g.busy) { await sleep(200); continue; } if (!g.inCine) return true; if (vm.cb&4) await sim(0.1,['Escape']); await sim(1); } return false; };
const act=async(i,label)=>{ const a=vm.etc[i]; const cx=a.x+a.w/2, cz=a.z+a.d/2; const d=[0.45,0.075,0.45,0.6,0.2][a.type]??0.45;
  for (const h of [0,Math.PI/2,Math.PI,-Math.PI/2]) { const f=[-Math.sin(h),-Math.cos(h)]; P.place(cx-f[0]*d,P.pos.y,cz-f[1]*d,h); await sim(0.05); g.sim(0.05,['KeyE']); await sleep(10); await sim(0.1);
    if (g.msg.active||g.dialog||g.busy||g.pendingDoor) { snap((label||'etc'+i)); await closeMsgs(); return true; } }
  console.log('no reaction etc'+i); return false; };
const listEtc=()=>vm.etc.forEach((a,i)=>console.log('etc',i,'flg',a.flg,'type',a.type,'attr',a.attr.toString(16),'prm',a.prm.join(','),'c',(a.x+a.w/2).toFixed(2),(a.z+a.d/2).toFixed(2)));
const inv=()=>console.log('inv',JSON.stringify(g.inv.slots.filter(Boolean).map(s=>s.id+':'+s.count)));
