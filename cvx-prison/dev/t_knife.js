g.loop=()=>{}; const caps=[]; const log=[];
await g.enterRoom('rm_0020', 0, undefined, false);
const P=g.player; P.place(7.6,0,11.5,0); g.sim(0.2);
g.inv.add(8,'Combat Knife',1); const S=g.invScreen; const idx=g.inv.slots.findIndex(s=>s&&s.id===8); log.push('knife slot '+idx);
S.sel=idx; S.cursor=idx; S.cur=()=>g.inv.slots[idx]; S.doUse(); log.push('knifeOn '+P.knifeOn+' eq '+S.equipped);
g.sim(0.5,['KeyF']);
for (let k=0;k<4;k++){ g.sim(1/30,['KeyF','KeyS','KeyE']); const tr=[]; for(let i=0;i<8;i++){ g.sim(0.1,['KeyF','KeyS']); tr.push(P.cur+':'+(P.actions.get(P.cur)?.time.toFixed(2))); } log.push(tr.join(' ')); }
console.log('LOG '+JSON.stringify(log)); return caps;
