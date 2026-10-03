g.inv.add(9,'Handgun',15); g.inv.add(8,'Combat Knife',1); g.inv.add(12,'Handgun Bullets',15);
await g.toggleInv(true); await new Promise(r=>setTimeout(r,2500));
const c=document.createElement('canvas'); 
console.log('LOG '+JSON.stringify([...document.querySelectorAll('.inv img')].map(i=>i.src.length)));
return [...document.querySelectorAll('.inv img')].filter(i=>i.src.startsWith('data:')).map(i=>i.src);
