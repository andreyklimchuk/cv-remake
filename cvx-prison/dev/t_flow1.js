g.sim(1); vm.cb|=0x10000000; await waitFree(); g.setWeapon(1); await sim(2); await waitFree(); snap('free');
await act(7); await act(4); await act(8); inv();
await act(0,'door'); await waitFree(); snap('in '+g.roomId); listEtc();
console.log('items', JSON.stringify(g.room.data.items.map((it,i)=>[i,it.id,it.name,g.room.itemMeshes.get(i)?.visible])));
await act(2); await act(3); inv(); await act(1,'typewriter'); await act(4,'etc4');
await act(0,'door10'); await waitFree(); snap('in '+g.roomId);
return caps;
