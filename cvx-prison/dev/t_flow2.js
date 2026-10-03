g.sim(1); vm.cb|=0x10000000; await waitFree(); g.setWeapon(1); await sim(2); await waitFree();
await act(7); await act(0,'door'); await waitFree(); await act(0,'door10'); await waitFree(); snap('in '+g.roomId); listEtc();
console.log('ene', g.zombies.map(z=>z.index+':'+z.state+':'+(vm.works.get('1:'+z.index)?.scripted?'S':'')).join(' '));
for (let i=0;i<4;i++){ await sim(1.5); snap('t'+i); }
const toR=(r)=>vm.etc.findIndex(a=>a.flg&1&&a.type===0&&a.prm[1]===r);
console.log('door to 3:', toR(3));
return caps;
