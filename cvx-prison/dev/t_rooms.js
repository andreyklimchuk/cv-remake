for (const id of ['rm_0021','rm_0031','rm_0040','rm_0050','rm_0060','rm_0080']) {
  try {
    await g.enterRoom(id, 0, undefined, false);
    for (let k=0;k<6;k++){ await sim(1); await sleep(50); closeMsgs(); await skipMovie(); }
    snap('room '+id);
    console.log('R', id, 'zombies', g.zombies.length, 'dogs', g.dogs.length, 'tasks', vm.tasks.filter(t=>t.status).length, 'msg', g.msg.active);
  } catch(e){ console.log('ERR', id, e.message); }
}
return caps;
