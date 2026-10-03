localStorage.setItem('cvx.lang','ru');
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
for(let i=0;i<50&&!document.querySelector('.title .menu div');i++) await sleep(100);
document.querySelector('.title .menu div[data-i="0"]').click();
for(let i=0;i<100;i++){ const v=document.querySelector('video'); if(v){ v.dispatchEvent(new KeyboardEvent('keydown',{code:'Escape',bubbles:true})); dispatchEvent(new KeyboardEvent('keydown',{code:'Escape'})); } if(window.__game&&window.__game.room) break; await sleep(200); }
const g=window.__game; for(let i=0;i<100&&!(g&&g.room);i++) await sleep(200);
await sleep(1500); for(let i=0;i<60;i++){ if(!g.msg.active){ await sleep(100); if(!g.msg.active) break; } g.sim(0.2,['KeyE']); await sleep(30); }
