const S=g.invScreen, A=g.audio; const se=[]; const o=A.sys.bind(A); A.sys=(n)=>{se.push(n);o(n);};
const k=async(c)=>{ await sim(1/30,[c]); await sim(0.1); };
const slots=()=>JSON.stringify(g.inv.slots.map(s=>s?s.id+':'+s.count:'-'));
g.inv.slots=[null,null,null,null,null,null,null,null];
g.inv.add(9,'Handgun',3); g.inv.add(12,'Handgun Bullets',15); g.inv.add(21,'Green Herb',1); g.inv.add(22,'Red Herb',1); g.inv.add(55,'Lighter',1);
g.toggleInv(true); await sim(0.2); console.log('anim mid', S.anim&&S.anim.f, document.querySelector('.grp[data-c="2"]').style.transform);
await sim(0.6); console.log('open', S.open, 'anim', !!S.anim, 'se', se.join(','));
// reload: sel bullets(slot1) -> sub -> combine -> handgun(slot0)
await k('ArrowRight'); await k('KeyE'); await k('ArrowDown'); await k('ArrowDown'); await k('KeyE'); console.log('mode', S.mode, 'cmbA', S.cmbA);
await k('ArrowLeft'); await k('KeyE'); console.log('reload', slots(), 'se', se.join(','));
// herbs: slot2 green, slot3 red
await k('ArrowDown'); console.log('sel', S.sel); await k('KeyE'); await k('ArrowDown'); await k('ArrowDown'); await k('KeyE'); await k('ArrowRight'); await k('KeyE');
console.log('ask', JSON.stringify(document.querySelector('.msgtx').innerHTML));
await k('KeyE'); console.log('mixed', slots(), 'sel', S.sel);
// use mixed herb
P.hp=50; await k('KeyE'); await k('KeyE'); console.log('hp', P.hp, slots(), S.text);
// equip handgun then lighter
await k('ArrowUp'); await k('ArrowLeft'); console.log('sel',S.sel); await k('KeyE'); await k('KeyE'); console.log('eq', S.equipped, S.standard);
await k('ArrowDown'); await k('ArrowDown'); console.log('sel',S.sel); await k('KeyE'); await k('KeyE'); console.log('eq2', S.equipped, S.standard); await k('ArrowUp'); await k('ArrowUp'); console.log('sel',S.sel); await k('KeyE'); await k('KeyE'); console.log('eq2', S.equipped, S.standard);
await k('Escape'); await sim(0.7); console.log('closed', S.open, g.invOpen, 'se', se.join(','));
// pickup
se.length=0; vm.sb_id=23; g.itemScreen(); await sim(0.7); console.log('get', S.mode, S.ask&&S.ask.pages.join('|'), document.querySelector('.inv').className, !!S.chk);
await k('KeyE'); console.log('after yes', S.ask&&S.ask.pages.join('|'), slots(), (vm.cb&0x800)?'cb800':'');
await k('KeyE'); await sim(0.7); console.log('done', S.open, g.invOpen, g.dialog, 'se', se.join(','));
// full inventory pickup
for(let i=0;i<8;i++) if(!g.inv.slots[i]) g.inv.slots[i]={id:31,name:'Ink Ribbon',count:1};
vm.cb&=~0x800; vm.sb_id=21; P.hp=40; g.itemScreen(); await sim(0.7); await k('KeyE'); console.log('full', S.ask&&S.ask.pages.join('|')); await k('KeyE'); console.log('p2', S.ask&&S.ask.pages.join('|')); await k('KeyE'); await sim(0.7); console.log('hp',P.hp,(vm.cb&0x800)?'cb800':'', S.open);
