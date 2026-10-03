g.inv.add(9,'Handgun',15);
const out=[]; const R=[[-1.15,0,0.25],[1.15,Math.PI,0.25],[-1.15,Math.PI,-0.25],[1.15+Math.PI,0,0.25]];
for(const r of R){ window.__iconRot={9:r}; g.invScreen.icons.clear(); out.push(await g.invScreen.icon(9)); }
return out;
