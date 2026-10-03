g.sim(1); vm.cb|=0x10000000; await waitFree(); g.setWeapon(1); await sim(2); await waitFree();
await act(7); await act(0,'door'); await waitFree(); await act(0,'door10'); await waitFree(); await act(0,'door20'); 
for (let i=0;i<10;i++){ await sim(1); await skipMovie(); if (g.roomId==='rm_0030'&&!g.busy) break; }
snap('in '+g.roomId); listEtc();
console.log('items', JSON.stringify(g.room.data.items.map((it,i)=>[i,it.id,it.name,g.room.itemMeshes.get(i)?.visible])));
for (let i=0;i<3;i++){ await sim(1.5); snap('t'+i); }
await waitFree(); snap('free');
for (const i of vm.etc.keys()) if (vm.etc[i].flg&1 && vm.etc[i].type!==0) { await act(i); await waitFree(); }
inv();
return caps;
