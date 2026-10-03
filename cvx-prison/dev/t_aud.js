const A=g.audio; const fl=[]; const of=A.foot.bind(A); A.foot=(f,r,p,id,v)=>{ fl.push((r?'R':'W')+f+'@'+(g.player.mixer.time).toFixed(2)); return of(f,r,p,id,v); };
await g.enterRoom('rm_0020', 0, undefined, false); await sim(1); await waitFree(); await sim(1);
console.log('ctx', A.ctx&&A.ctx.state, 'banks', A.rmBank, A.bgBank, A.pcBank, 'slots', [...A.slots.keys()].join(','), 'bgm', A.bgmNo, !!A.bgmV, 'bufs', A.buffers.size);
await sim(2,['KeyW']); await sim(1.5,['KeyW','ShiftLeft']); 
console.log('feet', fl.join(' '));
console.log('slots', [...A.slots.keys()].join(','), 'bgm', A.bgmNo, !!A.bgmV, 'bufs', A.buffers.size);
await g.enterRoom('rm_0040', 0, undefined, false); await sim(1); await waitFree(); await sim(1);
console.log('r40 slots', [...A.slots.keys()].join(','), 'bgm', A.bgmNo, !!A.bgmV, A.pcBank);
return [];
