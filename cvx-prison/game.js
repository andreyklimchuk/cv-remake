var fu=Object.defineProperty;var pu=(r,t,e)=>t in r?fu(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var S=(r,t,e)=>pu(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();const ks={0:"Not usable",1:"Rocket Launcher",2:"Assault Rifle",3:"Sniper Rifle",4:"Shotgun",5:"Handgun",6:"Grenade Launcher",7:"Bow Gun",8:"Combat Knife",9:"Handgun",10:"Custom Handgun",11:"Linear Launcher",12:"Handgun Bullets",13:"Magnum Bullets",14:"Shotgun Shells",15:"Grenade Rounds",16:"Acid Rounds",17:"Flame Rounds",18:"Bow Gun Arrows",19:"M93R Part",20:"F. Aid Spray",21:"Green Herb",22:"Red Herb",23:"Blue Herb",24:"Mixed Herb",25:"Mixed Herb",26:"Mixed Herb",27:"Mixed Herb",28:"Mixed Herb",29:"Mixed Herb",30:"Magnum Bullets",31:"Ink Ribbon",32:"Magnum",33:"Gold Lugers",34:"Sub Machine Gun",35:"Bow Gun Powder",36:"Gun Powder Arrow",37:"BOW Gas Rounds",38:"M.Gun Bullets",39:"Gas Mask",40:"Rifle Bullets",41:"Duralumin Case",42:"A.Rifle Bullets",43:"Alexander's Pierce",44:"Alexander's Jewel",45:"Alfred's Ring",46:"Alfred's Jewel",47:"Prisoner's Diary",48:"Director's Memo",49:"Instructions",50:"Lockpick",51:"Glass Eye",52:"Piano Roll",53:"Steering Wheel",54:"Crane Key",55:"Lighter",56:"Eagle Plate",57:"Side Pack",58:"Map",59:"Hawk Emblem",60:"Queen Ant Object",61:"King Ant Object",62:"Biohazard Card",63:"Duralumin Case",64:"Detonator",65:"Control Lever",66:"Gold Dragonfly",67:"Silver Key",68:"Gold Key",69:"Army Proof",70:"Navy Proof",71:"Air Force Proof",72:"Key with Tag",73:"ID Card",74:"Map",75:"Airport Key",76:"Emblem Card",77:"Skeleton Picture",78:"Music Box Plate",79:"Dragonfly Object",80:"Album",81:"Halberd",82:"Extinguisher",83:"Briefcase",84:"Padlock Key",85:"TG{0d}01",86:"Sp. Alloy Emblem",87:"Valve Handle",88:"Octa Valve Handle",89:"Machine Room Key",90:"Mining Room Key",91:"Bar Code Sticker",92:"Sterile Room Key",93:"Door Knob",94:"Battery Pack",95:"Hemostatic",96:"Turn Table Key",97:"Chem.Storage Key",98:"Clement {5b}",99:"Clement {5c}",100:"Tank Object",101:"Sp. Alloy Emblem",102:"Alfred's Memo",103:"Rusted Sword",104:"Hemostatic",105:"Security Card",106:"Security File",107:"Alexia's Choker",108:"Alexia's Jewel",109:"Queen Ant Relief",110:"King Ant Relief",111:"Red Jewel",112:"Blue Jewel",113:"Socket",114:"Sq. Valve Handle",115:"Serum",116:"Earthenware Vase",117:"Paper Weight",118:"Silver Dragonfly",119:"Silver Dragonfly",120:"Wing Object",121:"Crystal",122:"Gold Dragonfly",123:"Gold Dragonfly",124:"Gold Dragonfly",125:"File",126:"Plant Pot",127:"Picture B",128:"Duralumin Case",129:"Duralumin Case",130:"Bow Gun Powder",131:"Enhanced Handgun",132:"Memo",133:"Board Clip",134:"Card",135:"Newspaper Clip",136:"Luger Replica",137:"Queen Ant Relief",138:"Family Picture",139:"File",140:"Remote Controller",141:"?",142:"M{0d}100P",143:"Calico Bullets",144:"Clement Mixture",145:"Playing Manual",146:"?",147:"?",148:"?",149:"Empty Extinguisher",150:"Square Socket",151:"?",152:"Crest Key S",153:"Crest Key G",154:"Uses{0f}Checks Items.",155:"",156:"",157:"Returns to thegame screen.",158:"Storage Key",159:"Playing Manual",160:"Facility Ent. Fax",161:"TG{0d}01 Product Des.",162:"Users' Manual",163:"Pass Number Memo",164:"Memo to New Master",165:"Security File",166:"Alloy Report",167:"Prisoner's Diary",168:"Anatomist's Note",169:"Secretary's Note",170:"D.I.J. Diary",171:"Newspaper Clip",172:"Message Card",173:"Hunk's Report",174:"Worker's Diary",175:"Alexander's Memo",176:"Butler's Letter",177:"Confession Letter",178:"Passage Memo",179:"Veronica Report",180:"Alfred's Diary",181:"Queen Ant Report",182:"Virus Report"},ai={155:`Mix the herbs?
        {4:39}es  {4:2e}o`,156:"It's fully loaded.",160:`The ammos cannot
be used alone.`,153:`You can't take any
more items.\f<0>Use it now?
        {4:39}es  {4:2e}o`,154:`You can't take any
more items.`,157:`Take the
{3:ffff}?
        {4:39}es  {4:2e}o`,158:`You've taken the
{3:ffff}.`,161:`There's no need to
use it now.`},yc={"There are hairs scattered here.":"Здесь разбросаны волосы.","A hemostatic capsule\nis on the floor.":`На полу лежит
кровоостанавливающая капсула.`,"It's empty.":"Она пуста.","Old prisoner's uniforms\nare piled up here.":`Здесь свалены старые
тюремные робы.`,"He seems to be in great pain.":"Похоже, ему очень больно.","I shouldn't talk to him.":"Не стоит с ним заговаривать.","If I were equipped with a \nlighter, I could see outside...":`Будь у меня зажигалка,
я бы разглядела, что снаружи...`,"His eyes are closed.":"Его глаза закрыты.","He's bleeding.\nI'll need hemostatic medicine...":`У него кровотечение.
Нужно кровоостанавливающее...`,"A disorganized pile of\nvarious documents.":`Беспорядочная груда
разных документов.`,"This area is completely\nvoid of light.":`Здесь совершенно
нет света.`,"I don't think I can\ntreat his wound properly.":`Вряд ли я смогу
как следует обработать его рану.`,"It's too dark to\nmake out anything.":`Слишком темно,
ничего не разглядеть.`,"It's a list of prisoners.\nMy name is at the end.":`Это список заключённых.
Моё имя — в самом конце.`,"The escort's name is at\nthe end of the document.":`Имя конвоира указано
в конце документа.`,"An old typewriter.":"Старая пишущая машинка.","I could save my progress\nif I had an ink ribbon.":`Я могла бы сохраниться,
будь у меня красящая лента.`,"You can save your\nprogress with this.":`С её помощью можно
сохранить прогресс.`,"A truck used for transport.":"Грузовик для перевозок.","Oil is leaking from the\ncrashed wreck.":`Из разбитой машины
вытекает масло.`,"A dead body and a\nbriefcase can be seen inside.":`Внутри видны труп
и кейс.`,"It looks like it\ncrashed into the wall.":`Похоже, он врезался
в стену.`,"He is not breathing.":"Он не дышит.","This is the central gate\nof the prison.":`Это центральные ворота
тюрьмы.`,"It's locked.":"Заперто.","A hawk's picture is\ncarved into the hollow.":`В углублении вырезано
изображение ястреба.`,"It's been completely\nnailed down.":`Всё наглухо
заколочено.`,"It's impossible to open it.":"Открыть невозможно.","Apparently, a dust box.":"Похоже, мусорный ящик.","Abandoned materials\nare piled up here.":`Здесь свалены
брошенные материалы.`,"Nothing useful.":"Ничего полезного.","It's been locked with a padlock.":"Заперто на висячий замок.","It's been locked from\nthe other side with a padlock.":`Заперто на висячий замок
с другой стороны.`,"It can't be opened\nfrom this side.":`С этой стороны
не открыть.`,"There is a big hole in\nthe wire netting...":`В проволочной сетке
большая дыра...`,"There is a bloodstain\nunder the eaves.":`Под навесом
пятно крови.`,"You no longer need to use\nthis key.":`Этот ключ больше
не понадобится.`,"It seems that someone\ndidn't finish their soup.":`Похоже, кто-то
не доел свой суп.`,"It's still a bit warm...":"Он ещё немного тёплый...","Nothing useful here.":"Здесь ничего полезного.","Shabby magazines are\npiled up here.":`Здесь свалены
потрёпанные журналы.`,"This toilet has some\nrather disgusting stains.":`На этом унитазе
отвратительные пятна.`,"A horrible smell lingers...":"Стоит ужасный запах...","Half-eaten food items are\nscattered in this area.":`Здесь разбросаны
недоеденные продукты.`,"Take the prison map?":"Взять карту тюрьмы?","Take the\n{N}?":`Взять
{N}?`,"You've taken the\n{N}.":`Вы взяли
{N}.`,"You can't take any\nmore items.":`Больше нельзя
взять предметов.`,"Use it now?":"Использовать сейчас?","Mix the herbs?":"Смешать травы?","It's fully loaded.":"Полностью заряжено.","The ammos cannot\nbe used alone.":`Патроны нельзя
использовать отдельно.`,"There's no need to\nuse it now.":`Сейчас в этом
нет необходимости.`,"Use an ink ribbon?":"Использовать красящую ленту?","You've taken the prison map.":"Вы взяли карту тюрьмы.","There is an indentation\non the indigo blue plate.":`На тёмно-синей пластине
есть углубление.`,"It appears to be locked.":"Похоже, заперто.","I must release the lock first.":`Сначала нужно
снять блокировку.`,"This switch controls\nthe outdoor shutters.":`Этот переключатель управляет
наружными ставнями.`,"Push the switch?":"Нажать переключатель?","A guillotine, covered in blood.":"Гильотина, вся в крови.","It seems that there is\nsome fresh blood on it.":`Похоже, на ней
свежая кровь.`,"Something seems to have\nbeen tied up here...":`Похоже, здесь кого-то
держали связанным...`,"Fresh blood is stuck\nto the wall...":`На стене
свежая кровь...`,"A person might have been\ntied to the pillar...":`Возможно, к столбу
был привязан человек...`,"It's completely nailed down.":"Всё наглухо заколочено.","The outdoor shutter is locked.":"Наружная ставня заперта.","I must release the lock.":"Нужно снять блокировку.","The outdoor shutter\nis already open.":`Наружная ставня
уже открыта.`,"The lock has already\nbeen released.":`Блокировка
уже снята.`,"Perhaps I can open it\nwith the switch on the left...":`Может, её можно открыть
переключателем слева...`,"An outdoor shutter.":"Наружная ставня."},mu={"Combat Knife":"Боевой нож",Map:"Карта",Extinguisher:"Огнетушитель","Eagle Plate":"Пластина с орлом","Handgun Bullets":"Патроны для пистолета","Green Herb":"Зелёная трава","Ink Ribbon":"Красящая лента","Board Clip":"Планшет с бумагами",Hemostatic:"Кровоостанавливающее",Lighter:"Зажигалка",Briefcase:"Кейс","Hawk Emblem":"Эмблема ястреба","Sp. Alloy Emblem":"Эмблема из спецсплава",Memo:"Записка",Lockpick:"Отмычка",Handgun:"Пистолет","F. Aid Spray":"Аптечка-спрей","Red Herb":"Красная трава","Blue Herb":"Синяя трава","Mixed Herb":"Смесь трав"};let ye=localStorage.getItem("cvx.lang")||"ru";function gu(r){ye=r,localStorage.setItem("cvx.lang",r)}function _u(r){return/\{4:39\}es/.test(r)}function En(r,t){const e=[],i=r.replace(/\{3:([0-9a-f]+)\}/g,(a,o)=>{const c=o==="ffff"?t??0:parseInt(o,16);return e.push(ks[c]??""),""}).replace(/<0>|<1>/g,"").replace(/\n\s*\{4:39\}es\s+\{4:2e\}o/g,"").replace(/\{0d\}/g,"-").split("\f").map(a=>a.replace(/^\n+/,"").replace(/\{[0-9a-f]+:[0-9a-f]+\}/g,"").trimEnd()).filter(a=>a.trim().length);let s=0;return i.map(a=>{const o=a.replace(/\u0001/g,"{N}");return(ye==="en"?o:yc[o]??yc[o.trim()]??o).replace(/\{N\}/g,()=>Tr(e[s++]??""))})}function Tr(r){return ye==="ru"?mu[r]??r:r}const bn=()=>ye==="ru",dn={take:()=>bn()?"Взять":"Take",takeQ:r=>bn()?`Взять: ${r}?`:`Will you take the ${r}?`,yes:()=>bn()?"Да":"Yes",no:()=>bn()?"Нет":"No",got:r=>bn()?`Получено: ${r}.`:`Picked up the ${r}.`,full:()=>bn()?"Нет места в инвентаре.":"You cannot carry any more items.",saved:()=>bn()?"Игра сохранена.":"Game saved.",locked:()=>bn()?`Эта часть игры
пока не перенесена.`:`This area is
not ported yet.`,camFixed:()=>bn()?"Камера: фиксированная":"Camera: fixed",camBehind:()=>bn()?"Камера: от плеча (мышь — обзор)":"Camera: over the shoulder (mouse to look)"},xu=`
html,body{margin:0;height:100%;background:#000;overflow:hidden;font-family:"Times New Roman",Georgia,serif;color:#e8e2d0}
#app{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}
#stage{position:relative;background:#000;overflow:hidden}
#stage>canvas{display:block;width:100%;height:100%}
.msg{position:absolute;left:6%;right:6%;bottom:5%;min-height:16%;background:rgba(0,0,0,.72);border-top:1px solid rgba(200,190,160,.25);
 padding:2.2% 4%;font-size:clamp(14px,2.4vh,26px);line-height:1.45;white-space:pre-wrap;letter-spacing:.02em;display:none;text-shadow:0 0 3px #000;z-index:2}
.msg .more{position:absolute;right:3%;bottom:6%;font-size:.7em;opacity:.7;animation:blink 1s infinite}
@keyframes blink{50%{opacity:.15}}
.choice{margin-top:.4em}
.choice span{margin-right:2.5em;padding:0 .3em}
.choice span.sel{color:#fff;text-decoration:underline}
.fade{position:absolute;inset:0;background:#000;opacity:0;pointer-events:none;transition:opacity .45s;z-index:5}
.hud{position:absolute;left:1%;top:1%;font:12px/1.3 monospace;color:#9a9;opacity:.75;white-space:pre;z-index:3}
.toast{position:absolute;right:2%;top:2%;font:clamp(11px,1.8vh,16px) sans-serif;color:#cdc;background:rgba(0,0,0,.55);padding:.3em .8em;opacity:0;transition:opacity .3s;z-index:3;pointer-events:none}
.title{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(#200 0%,#000 70%);text-align:center;z-index:6}
.title h1{font-weight:normal;letter-spacing:.25em;font-size:clamp(20px,5vh,54px);margin:0;color:#d9cfae}
.title h3{font-weight:normal;letter-spacing:.4em;color:#a33;margin:.6em 0 2.2em;font-size:clamp(12px,2.2vh,22px)}
.title .menu div{font-size:clamp(14px,2.6vh,26px);margin:.5em;opacity:.65;cursor:pointer}
.title .menu div.sel{opacity:1;color:#fff}
.title .help{position:absolute;bottom:4%;font-size:clamp(11px,1.7vh,16px);opacity:.6;line-height:1.6}
.loading{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:20px;letter-spacing:.3em;color:#888;z-index:6}
`;class vu{constructor(){S(this,"stage",document.createElement("div"));S(this,"msg",document.createElement("div"));S(this,"fadeEl",document.createElement("div"));S(this,"hud",document.createElement("div"));S(this,"inv",document.createElement("div"));S(this,"toastEl",document.createElement("div"));S(this,"toastT",0);const t=document.createElement("style");t.textContent=xu,document.head.appendChild(t),this.stage.id="stage",document.getElementById("app").appendChild(this.stage),this.msg.className="msg",this.fadeEl.className="fade",this.hud.className="hud",this.inv.className="inv",this.toastEl.className="toast",this.stage.append(this.msg,this.inv,this.hud,this.toastEl,this.fadeEl)}fit(t){const e=innerWidth,n=innerHeight;let i=e,s=e/t;return s>n&&(s=n,i=n*t),this.stage.style.width=i+"px",this.stage.style.height=s+"px",{w:Math.round(i),h:Math.round(s)}}fade(t,e=450){return this.fadeEl.style.transition=`opacity ${e}ms`,this.fadeEl.style.opacity=t?"1":"0",new Promise(n=>setTimeout(n,e+20))}toast(t){this.toastEl.textContent=t,this.toastEl.style.opacity="1",clearTimeout(this.toastT),this.toastT=window.setTimeout(()=>this.toastEl.style.opacity="0",1600)}}class yu{constructor(t){S(this,"queue",[]);S(this,"full","");S(this,"shown",0);S(this,"resolve");S(this,"choices",null);S(this,"sel",0);S(this,"active",!1);S(this,"onCursor");this.el=t}show(t,e){return this.queue=Array.isArray(t)?[...t]:En(t),this.queue.length||(this.queue=[""]),this.choices=e??null,this.sel=0,this.active=!0,this.next(),this.el.style.display="block",new Promise(n=>this.resolve=n)}raw(t,e){return this.show(t,e)}next(){this.full=this.queue.shift()??"",this.shown=0,this.render()}render(){const t=this.shown>=this.full.length;let e=Ds(this.full.slice(0,Math.floor(this.shown)));t&&this.queue.length===0&&this.choices&&(e+=`<div class="choice">${this.choices.map((n,i)=>`<span class="${i===this.sel?"sel":""}">${Ds(n)}</span>`).join("")}</div>`),t&&(this.queue.length||!this.choices)&&(e+='<span class="more">▼</span>'),this.el.innerHTML=e}update(t,e,n,i,s){var a;if(this.active){if(this.shown<this.full.length){this.shown=Math.min(this.full.length,this.shown+t*60),e&&(this.shown=this.full.length),this.render();return}if(this.queue.length===0&&this.choices)return(n||i)&&((a=this.onCursor)==null||a.call(this),this.sel=(this.sel+(i?1:this.choices.length-1))%this.choices.length,this.render()),e?this.close(this.sel):s?this.close(this.choices.length-1):void 0;(e||s)&&(this.queue.length?this.next():this.close(0))}}close(t){this.active=!1,this.el.style.display="none";const e=this.resolve;this.resolve=void 0,e==null||e(t)}}function Ds(r){return r.replace(/[&<>]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[t])}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fo="170",Mu=0,Mc=1,bu=2,ph=1,Su=2,On=3,Xn=0,qe=1,sn=2,li=0,$i=1,ts=2,bc=3,Sc=4,mh=5,ri=100,Eu=101,Tu=102,wu=103,Au=104,gh=200,Ru=201,Cu=202,Iu=203,Va=204,Dr=205,Pu=206,Lu=207,Du=208,Nu=209,Uu=210,Fu=211,ku=212,Ou=213,Bu=214,Ga=0,Wa=1,Xa=2,es=3,qa=4,ja=5,Ka=6,Ya=7,ko=0,zu=1,Hu=2,hi=0,Vu=1,Gu=2,Wu=3,Xu=4,qu=5,ju=6,Ku=7,Ec="attached",Yu="detached",_h=300,ns=301,is=302,$a=303,Za=304,Hr=306,ss=1e3,oi=1001,Nr=1002,He=1003,xh=1004,Is=1005,Xe=1006,wr=1007,Hn=1008,qn=1009,vh=1010,yh=1011,Os=1012,Oo=1013,wi=1014,xn=1015,Gs=1016,Bo=1017,zo=1018,rs=1020,Mh=35902,bh=1021,Sh=1022,rn=1023,Eh=1024,Th=1025,Zi=1026,as=1027,Ho=1028,Vo=1029,wh=1030,Go=1031,Wo=1033,Ar=33776,Rr=33777,Cr=33778,Ir=33779,Ja=35840,Qa=35841,to=35842,eo=35843,no=36196,io=37492,so=37496,ro=37808,ao=37809,oo=37810,co=37811,lo=37812,ho=37813,uo=37814,fo=37815,po=37816,mo=37817,go=37818,_o=37819,xo=37820,vo=37821,Pr=36492,yo=36494,Mo=36495,Ah=36283,bo=36284,So=36285,Eo=36286,Vr=2200,Xo=2201,$u=2202,Bs=2300,zs=2301,Yr=2302,ji=2400,Ki=2401,Ur=2402,qo=2500,Zu=2501,Ju=0,Rh=1,To=2,Qu=3200,td=3201,jo=0,ed=1,mn="",we="srgb",Ce="srgb-linear",Gr="linear",ce="srgb",Ii=7680,Tc=519,nd=512,id=513,sd=514,Ch=515,rd=516,ad=517,od=518,cd=519,wo=35044,$r=35048,wc="300 es",Vn=2e3,Fr=2001;class Ri{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}}const Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ac=1234567;const Ns=Math.PI/180,os=180/Math.PI;function vn(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[r&255]+Pe[r>>8&255]+Pe[r>>16&255]+Pe[r>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function Ne(r,t,e){return Math.max(t,Math.min(e,r))}function Ko(r,t){return(r%t+t)%t}function ld(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function hd(r,t,e){return r!==t?(e-r)/(t-r):0}function Us(r,t,e){return(1-e)*r+e*t}function ud(r,t,e,n){return Us(r,t,1-Math.exp(-e*n))}function dd(r,t=1){return t-Math.abs(Ko(r,t*2)-t)}function fd(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function pd(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function md(r,t){return r+Math.floor(Math.random()*(t-r+1))}function gd(r,t){return r+Math.random()*(t-r)}function _d(r){return r*(.5-Math.random())}function xd(r){r!==void 0&&(Ac=r);let t=Ac+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vd(r){return r*Ns}function yd(r){return r*os}function Md(r){return(r&r-1)===0&&r!==0}function bd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Sd(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Ed(r,t,e,n,i){const s=Math.cos,a=Math.sin,o=s(e/2),c=a(e/2),l=s((t+n)/2),h=a((t+n)/2),u=s((t-n)/2),d=a((t-n)/2),p=s((n-t)/2),g=a((n-t)/2);switch(i){case"XYX":r.set(o*h,c*u,c*d,o*l);break;case"YZY":r.set(c*d,o*h,c*u,o*l);break;case"ZXZ":r.set(c*u,c*d,o*h,o*l);break;case"XZX":r.set(o*h,c*g,c*p,o*l);break;case"YXY":r.set(c*p,o*h,c*g,o*l);break;case"ZYZ":r.set(c*g,c*p,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function gn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function re(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Qe={DEG2RAD:Ns,RAD2DEG:os,generateUUID:vn,clamp:Ne,euclideanModulo:Ko,mapLinear:ld,inverseLerp:hd,lerp:Us,damp:ud,pingpong:dd,smoothstep:fd,smootherstep:pd,randInt:md,randFloat:gd,randFloatSpread:_d,seededRandom:xd,degToRad:vd,radToDeg:yd,isPowerOfTwo:Md,ceilPowerOfTwo:bd,floorPowerOfTwo:Sd,setQuaternionFromProperEuler:Ed,normalize:re,denormalize:gn};class Ut{constructor(t=0,e=0){Ut.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,n,i,s,a,o,c,l){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,c,l)}set(t,e,n,i,s,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],b=i[1],T=i[4],x=i[7],L=i[2],C=i[5],R=i[8];return s[0]=a*_+o*b+c*L,s[3]=a*m+o*T+c*C,s[6]=a*f+o*x+c*R,s[1]=l*_+h*b+u*L,s[4]=l*m+h*T+u*C,s[7]=l*f+h*x+u*R,s[2]=d*_+p*b+g*L,s[5]=d*m+p*T+g*C,s[8]=d*f+p*x+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,d=o*c-h*s,p=l*s-a*c,g=e*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*l-h*n)*_,t[2]=(o*n-i*a)*_,t[3]=d*_,t[4]=(h*e-i*c)*_,t[5]=(i*s-o*e)*_,t[6]=p*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Zr.makeScale(t,e)),this}rotate(t){return this.premultiply(Zr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Zr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Zr=new Ot;function Ih(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Hs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Td(){const r=Hs("canvas");return r.style.display="block",r}const Rc={};function Ps(r){r in Rc||(Rc[r]=!0,console.warn(r))}function wd(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Ad(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Rd(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Kt={enabled:!0,workingColorSpace:Ce,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(r.r=Gn(r.r),r.g=Gn(r.g),r.b=Gn(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(r.r=Ji(r.r),r.g=Ji(r.g),r.b=Ji(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===mn?Gr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Gn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ji(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Cc=[.64,.33,.3,.6,.15,.06],Ic=[.2126,.7152,.0722],Pc=[.3127,.329],Lc=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dc=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Kt.define({[Ce]:{primaries:Cc,whitePoint:Pc,transfer:Gr,toXYZ:Lc,fromXYZ:Dc,luminanceCoefficients:Ic,workingColorSpaceConfig:{unpackColorSpace:we},outputColorSpaceConfig:{drawingBufferColorSpace:we}},[we]:{primaries:Cc,whitePoint:Pc,transfer:ce,toXYZ:Lc,fromXYZ:Dc,luminanceCoefficients:Ic,outputColorSpaceConfig:{drawingBufferColorSpace:we}}});let Pi;class Cd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Pi===void 0&&(Pi=Hs("canvas")),Pi.width=t.width,Pi.height=t.height;const n=Pi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Pi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Hs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Gn(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Gn(e[n]/255)*255):e[n]=Gn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Id=0;class Ph{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Id++}),this.uuid=vn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Jr(i[a].image)):s.push(Jr(i[a]))}else s=Jr(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function Jr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Cd.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Pd=0;class Te extends Ri{constructor(t=Te.DEFAULT_IMAGE,e=Te.DEFAULT_MAPPING,n=oi,i=oi,s=Xe,a=Hn,o=rn,c=qn,l=Te.DEFAULT_ANISOTROPY,h=mn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=vn(),this.name="",this.source=new Ph(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_h)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ss:t.x=t.x-Math.floor(t.x);break;case oi:t.x=t.x<0?0:1;break;case Nr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ss:t.y=t.y-Math.floor(t.y);break;case oi:t.y=t.y<0?0:1;break;case Nr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Te.DEFAULT_IMAGE=null;Te.DEFAULT_MAPPING=_h;Te.DEFAULT_ANISOTROPY=1;class Zt{constructor(t=0,e=0,n=0,i=1){Zt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(l+1)/2,x=(p+1)/2,L=(f+1)/2,C=(h+d)/4,R=(u+_)/4,D=(g+m)/4;return T>x&&T>L?T<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(T),i=C/n,s=R/n):x>L?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=C/i,s=D/i):L<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(L),n=R/s,i=D/s),this.set(n,i,s,e),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ld extends Ri{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Zt(0,0,t,e),this.scissorTest=!1,this.viewport=new Zt(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Te(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ph(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ai extends Ld{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Lh extends Te{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=He,this.minFilter=He,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dd extends Te{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=He,this.minFilter=He,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ee{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[a+0],p=s[a+1],g=s[a+2],_=s[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==p||h!==g){let m=1-o;const f=c*d+l*p+h*g+u*_,b=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){const L=Math.sqrt(T),C=Math.atan2(L,f*b);m=Math.sin(m*C)/L,o=Math.sin(o*C)/L}const x=o*b;if(c=c*m+d*x,l=l*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-o){const L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],p=s[a+2],g=s[a+3];return t[e]=o*g+h*u+c*p-l*d,t[e+1]=c*g+h*d+l*u-o*p,t[e+2]=l*g+h*p+o*d-c*u,t[e+3]=h*g-o*u-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),p=c(i/2),g=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(a-i)*p}else if(n>o&&n>u){const p=2*Math.sqrt(1+n-o-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+l)/p}else if(o>u){const p=2*Math.sqrt(1+o-n-u);this._w=(s-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Nc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*i-o*n),h=2*(o*e-s*i),u=2*(s*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Qr.copy(this).projectOnVector(t),this.sub(Qr)}reflect(t){return this.sub(Qr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new A,Nc=new Ee;class je{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ln):ln.fromBufferAttribute(s,a),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(t.matrixWorld),this.union($s)}const i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(xs),Zs.subVectors(this.max,xs),Li.subVectors(t.a,xs),Di.subVectors(t.b,xs),Ni.subVectors(t.c,xs),Yn.subVectors(Di,Li),$n.subVectors(Ni,Di),pi.subVectors(Li,Ni);let e=[0,-Yn.z,Yn.y,0,-$n.z,$n.y,0,-pi.z,pi.y,Yn.z,0,-Yn.x,$n.z,0,-$n.x,pi.z,0,-pi.x,-Yn.y,Yn.x,0,-$n.y,$n.x,0,-pi.y,pi.x,0];return!ta(e,Li,Di,Ni,Zs)||(e=[1,0,0,0,1,0,0,0,1],!ta(e,Li,Di,Ni,Zs))?!1:(Js.crossVectors(Yn,$n),e=[Js.x,Js.y,Js.z],ta(e,Li,Di,Ni,Zs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Pn=[new A,new A,new A,new A,new A,new A,new A,new A],ln=new A,$s=new je,Li=new A,Di=new A,Ni=new A,Yn=new A,$n=new A,pi=new A,xs=new A,Zs=new A,Js=new A,mi=new A;function ta(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){mi.fromArray(r,s);const o=i.x*Math.abs(mi.x)+i.y*Math.abs(mi.y)+i.z*Math.abs(mi.z),c=t.dot(mi),l=e.dot(mi),h=n.dot(mi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Nd=new je,vs=new A,ea=new A;class wn{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Nd.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;vs.subVectors(t,this.center);const e=vs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(vs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(vs.copy(t.center).add(ea)),this.expandByPoint(vs.copy(t.center).sub(ea))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ln=new A,na=new A,Qs=new A,Zn=new A,ia=new A,tr=new A,sa=new A;class Ws{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ln)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ln.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ln.copy(this.origin).addScaledVector(this.direction,e),Ln.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){na.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(na);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Qs),o=Zn.dot(this.direction),c=-Zn.dot(Qs),l=Zn.lengthSq(),h=Math.abs(1-a*a);let u,d,p,g;if(h>0)if(u=a*c-o,d=a*o-c,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(na).addScaledVector(Qs,d),p}intersectSphere(t,e){Ln.subVectors(t.center,this.origin);const n=Ln.dot(this.direction),i=Ln.dot(Ln)-n*n,s=t.radius*t.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ln)!==null}intersectTriangle(t,e,n,i,s){ia.subVectors(e,t),tr.subVectors(n,t),sa.crossVectors(ia,tr);let a=this.direction.dot(sa),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zn.subVectors(this.origin,t);const c=o*this.direction.dot(tr.crossVectors(Zn,tr));if(c<0)return null;const l=o*this.direction.dot(ia.cross(Zn));if(l<0||c+l>a)return null;const h=-o*Zn.dot(sa);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pt{constructor(t,e,n,i,s,a,o,c,l,h,u,d,p,g,_,m){Pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,c,l,h,u,d,p,g,_,m)}set(t,e,n,i,s,a,o,c,l,h,u,d,p,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ui.setFromMatrixColumn(t,0).length(),s=1/Ui.setFromMatrixColumn(t,1).length(),a=1/Ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=a*h,p=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+g*l,e[5]=d-_*l,e[9]=-o*c,e[2]=_-d*l,e[6]=g+p*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*h,p=c*u,g=l*h,_=l*u;e[0]=d+_*o,e[4]=g*o-p,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=_+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*h,p=c*u,g=l*h,_=l*u;e[0]=d-_*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*h,p=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=g*l-p,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=p*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,p=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=p*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=a*c,p=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ud,t,Fd)}lookAt(t,e,n){const i=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),Jn.crossVectors(n,$e),Jn.lengthSq()===0&&(Math.abs(n.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),Jn.crossVectors(n,$e)),Jn.normalize(),er.crossVectors($e,Jn),i[0]=Jn.x,i[4]=er.x,i[8]=$e.x,i[1]=Jn.y,i[5]=er.y,i[9]=$e.y,i[2]=Jn.z,i[6]=er.z,i[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],b=n[3],T=n[7],x=n[11],L=n[15],C=i[0],R=i[4],D=i[8],E=i[12],M=i[1],I=i[5],V=i[9],B=i[13],q=i[2],Y=i[6],X=i[10],J=i[14],G=i[3],rt=i[7],ft=i[11],St=i[15];return s[0]=a*C+o*M+c*q+l*G,s[4]=a*R+o*I+c*Y+l*rt,s[8]=a*D+o*V+c*X+l*ft,s[12]=a*E+o*B+c*J+l*St,s[1]=h*C+u*M+d*q+p*G,s[5]=h*R+u*I+d*Y+p*rt,s[9]=h*D+u*V+d*X+p*ft,s[13]=h*E+u*B+d*J+p*St,s[2]=g*C+_*M+m*q+f*G,s[6]=g*R+_*I+m*Y+f*rt,s[10]=g*D+_*V+m*X+f*ft,s[14]=g*E+_*B+m*J+f*St,s[3]=b*C+T*M+x*q+L*G,s[7]=b*R+T*I+x*Y+L*rt,s[11]=b*D+T*V+x*X+L*ft,s[15]=b*E+T*B+x*J+L*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*p-n*c*p)+_*(+e*c*p-e*l*d+s*a*d-i*a*p+i*l*h-s*c*h)+m*(+e*l*u-e*o*p-s*a*u+n*a*p+s*o*h-n*l*h)+f*(-i*o*h-e*c*u+e*o*d+i*a*u-n*a*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],b=u*m*l-_*d*l+_*c*p-o*m*p-u*c*f+o*d*f,T=g*d*l-h*m*l-g*c*p+a*m*p+h*c*f-a*d*f,x=h*_*l-g*u*l+g*o*p-a*_*p-h*o*f+a*u*f,L=g*u*c-h*_*c-g*o*d+a*_*d+h*o*m-a*u*m,C=e*b+n*T+i*x+s*L;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return t[0]=b*R,t[1]=(_*d*s-u*m*s-_*i*p+n*m*p+u*i*f-n*d*f)*R,t[2]=(o*m*s-_*c*s+_*i*l-n*m*l-o*i*f+n*c*f)*R,t[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*p-n*c*p)*R,t[4]=T*R,t[5]=(h*m*s-g*d*s+g*i*p-e*m*p-h*i*f+e*d*f)*R,t[6]=(g*c*s-a*m*s-g*i*l+e*m*l+a*i*f-e*c*f)*R,t[7]=(a*d*s-h*c*s+h*i*l-e*d*l-a*i*p+e*c*p)*R,t[8]=x*R,t[9]=(g*u*s-h*_*s-g*n*p+e*_*p+h*n*f-e*u*f)*R,t[10]=(a*_*s-g*o*s+g*n*l-e*_*l-a*n*f+e*o*f)*R,t[11]=(h*o*s-a*u*s-h*n*l+e*u*l+a*n*p-e*o*p)*R,t[12]=L*R,t[13]=(h*_*i-g*u*i+g*n*d-e*_*d-h*n*m+e*u*m)*R,t[14]=(g*o*i-a*_*i-g*n*c+e*_*c+a*n*m-e*o*m)*R,t[15]=(a*u*i-h*o*i+h*n*c-e*u*c-a*n*d+e*o*d)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,c=t.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,a=e._y,o=e._z,c=e._w,l=s+s,h=a+a,u=o+o,d=s*l,p=s*h,g=s*u,_=a*h,m=a*u,f=o*u,b=c*l,T=c*h,x=c*u,L=n.x,C=n.y,R=n.z;return i[0]=(1-(_+f))*L,i[1]=(p+x)*L,i[2]=(g-T)*L,i[3]=0,i[4]=(p-x)*C,i[5]=(1-(d+f))*C,i[6]=(m+b)*C,i[7]=0,i[8]=(g+T)*R,i[9]=(m-b)*R,i[10]=(1-(d+_))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Ui.set(i[0],i[1],i[2]).length();const a=Ui.set(i[4],i[5],i[6]).length(),o=Ui.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],hn.copy(this);const l=1/s,h=1/a,u=1/o;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,e.setFromRotationMatrix(hn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,a,o=Vn){const c=this.elements,l=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let p,g;if(o===Vn)p=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Fr)p=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=Vn){const c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(a-s),d=(e+t)*l,p=(n+i)*h;let g,_;if(o===Vn)g=(a+s)*u,_=-2*u;else if(o===Fr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ui=new A,hn=new Pt,Ud=new A(0,0,0),Fd=new A(1,1,1),Jn=new A,er=new A,$e=new A,Uc=new Pt,Fc=new Ee;class Ve{constructor(t=0,e=0,n=0,i=Ve.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ne(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Uc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Uc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fc.setFromEuler(this),this.setFromQuaternion(Fc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ve.DEFAULT_ORDER="XYZ";class Yo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let kd=0;const kc=new A,Fi=new Ee,Dn=new Pt,nr=new A,ys=new A,Od=new A,Bd=new Ee,Oc=new A(1,0,0),Bc=new A(0,1,0),zc=new A(0,0,1),Hc={type:"added"},zd={type:"removed"},ki={type:"childadded",child:null},ra={type:"childremoved",child:null};class pe extends Ri{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kd++}),this.uuid=vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pe.DEFAULT_UP.clone();const t=new A,e=new Ve,n=new Ee,i=new A(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pt},normalMatrix:{value:new Ot}}),this.matrix=new Pt,this.matrixWorld=new Pt,this.matrixAutoUpdate=pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.premultiply(Fi),this}rotateX(t){return this.rotateOnAxis(Oc,t)}rotateY(t){return this.rotateOnAxis(Bc,t)}rotateZ(t){return this.rotateOnAxis(zc,t)}translateOnAxis(t,e){return kc.copy(t).applyQuaternion(this.quaternion),this.position.add(kc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Oc,t)}translateY(t){return this.translateOnAxis(Bc,t)}translateZ(t){return this.translateOnAxis(zc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?nr.copy(t):nr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(ys,nr,this.up):Dn.lookAt(nr,ys,this.up),this.quaternion.setFromRotationMatrix(Dn),i&&(Dn.extractRotation(i.matrixWorld),Fi.setFromRotationMatrix(Dn),this.quaternion.premultiply(Fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Hc),ki.child=t,this.dispatchEvent(ki),ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(zd),ra.child=t,this.dispatchEvent(ra),ra.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Dn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Hc),ki.child=t,this.dispatchEvent(ki),ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,t,Od),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,Bd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(s(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}pe.DEFAULT_UP=new A(0,1,0);pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new A,Nn=new A,aa=new A,Un=new A,Oi=new A,Bi=new A,Vc=new A,oa=new A,ca=new A,la=new A,ha=new Zt,ua=new Zt,da=new Zt;class _n{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),un.subVectors(t,e),i.cross(un);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){un.subVectors(i,e),Nn.subVectors(n,e),aa.subVectors(t,e);const a=un.dot(un),o=un.dot(Nn),c=un.dot(aa),l=Nn.dot(Nn),h=Nn.dot(aa),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,p=(l*c-o*h)*d,g=(a*h-o*c)*d;return s.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,n,i,s,a,o,c){return this.getBarycoord(t,e,n,i,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Un.x),c.addScaledVector(a,Un.y),c.addScaledVector(o,Un.z),c)}static getInterpolatedAttribute(t,e,n,i,s,a){return ha.setScalar(0),ua.setScalar(0),da.setScalar(0),ha.fromBufferAttribute(t,e),ua.fromBufferAttribute(t,n),da.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(ha,s.x),a.addScaledVector(ua,s.y),a.addScaledVector(da,s.z),a}static isFrontFacing(t,e,n,i){return un.subVectors(n,e),Nn.subVectors(t,e),un.cross(Nn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),un.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return _n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return _n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return _n.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return _n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return _n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let a,o;Oi.subVectors(i,n),Bi.subVectors(s,n),oa.subVectors(t,n);const c=Oi.dot(oa),l=Bi.dot(oa);if(c<=0&&l<=0)return e.copy(n);ca.subVectors(t,i);const h=Oi.dot(ca),u=Bi.dot(ca);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Oi,a);la.subVectors(t,s);const p=Oi.dot(la),g=Bi.dot(la);if(g>=0&&p<=g)return e.copy(s);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Bi,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Vc.subVectors(s,i),o=(u-h)/(u-h+(p-g)),e.copy(i).addScaledVector(Vc,o);const f=1/(m+_+d);return a=_*f,o=d*f,e.copy(n).addScaledVector(Oi,a).addScaledVector(Bi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Dh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},ir={h:0,s:0,l:0};function fa(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Tt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Kt.workingColorSpace){if(t=Ko(t,1),e=Ne(e,0,1),n=Ne(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=fa(a,s,t+1/3),this.g=fa(a,s,t),this.b=fa(a,s,t-1/3)}return Kt.toWorkingColorSpace(this,i),this}setStyle(t,e=we){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){const n=Dh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gn(t.r),this.g=Gn(t.g),this.b=Gn(t.b),this}copyLinearToSRGB(t){return this.r=Ji(t.r),this.g=Ji(t.g),this.b=Ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return Kt.fromWorkingColorSpace(Le.copy(this),t),Math.round(Ne(Le.r*255,0,255))*65536+Math.round(Ne(Le.g*255,0,255))*256+Math.round(Ne(Le.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Le.copy(this),e);const n=Le.r,i=Le.g,s=Le.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=we){Kt.fromWorkingColorSpace(Le.copy(this),t);const e=Le.r,n=Le.g,i=Le.b;return t!==we?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Qn),this.setHSL(Qn.h+t,Qn.s+e,Qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Qn),t.getHSL(ir);const n=Us(Qn.h,ir.h,e),i=Us(Qn.s,ir.s,e),s=Us(Qn.l,ir.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Le=new Tt;Tt.NAMES=Dh;let Hd=0;class yn extends Ri{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=vn(),this.name="",this.blending=$i,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Va,this.blendDst=Dr,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ii,this.stencilZFail=Ii,this.stencilZPass=Ii,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Va&&(n.blendSrc=this.blendSrc),this.blendDst!==Dr&&(n.blendDst=this.blendDst),this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ii&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ii&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ii&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(e){const s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class an extends yn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ve,this.combine=ko,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new A,sr=new Ut;class xe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=wo,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)sr.fromBufferAttribute(this,e),sr.applyMatrix3(t),this.setXY(e,sr.x,sr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==wo&&(t.usage=this.usage),t}}class Nh extends xe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Uh extends xe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ue extends xe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Vd=0;const en=new Pt,pa=new pe,zi=new A,Ze=new je,Ms=new je,Se=new A;class Ge extends Ri{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ih(t)?Uh:Nh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ot().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return pa.lookAt(t),pa.updateMatrix(),this.applyMatrix4(pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ue(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new je);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Ze.setFromBufferAttribute(s),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];Ms.setFromBufferAttribute(o),this.morphTargetsRelative?(Se.addVectors(Ze.min,Ms.min),Ze.expandByPoint(Se),Se.addVectors(Ze.max,Ms.max),Ze.expandByPoint(Se)):(Ze.expandByPoint(Ms.min),Ze.expandByPoint(Ms.max))}Ze.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)Se.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Se));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Se.fromBufferAttribute(o,l),c&&(zi.fromBufferAttribute(t,l),Se.add(zi)),i=Math.max(i,n.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let D=0;D<n.count;D++)o[D]=new A,c[D]=new A;const l=new A,h=new A,u=new A,d=new Ut,p=new Ut,g=new Ut,_=new A,m=new A;function f(D,E,M){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,D),p.fromBufferAttribute(s,E),g.fromBufferAttribute(s,M),h.sub(l),u.sub(l),p.sub(d),g.sub(d);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(I),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(I),o[D].add(_),o[E].add(_),o[M].add(_),c[D].add(m),c[E].add(m),c[M].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let D=0,E=b.length;D<E;++D){const M=b[D],I=M.start,V=M.count;for(let B=I,q=I+V;B<q;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const T=new A,x=new A,L=new A,C=new A;function R(D){L.fromBufferAttribute(i,D),C.copy(L);const E=o[D];T.copy(E),T.sub(L.multiplyScalar(L.dot(E))).normalize(),x.crossVectors(C,E);const I=x.dot(c[D])<0?-1:1;a.setXYZW(D,T.x,T.y,T.z,I)}for(let D=0,E=b.length;D<E;++D){const M=b[D],I=M.start,V=M.count;for(let B=I,q=I+V;B<q;B+=3)R(t.getX(B+0)),R(t.getX(B+1)),R(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new A,s=new A,a=new A,o=new A,c=new A,l=new A,h=new A,u=new A;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new xe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ge,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=t(c,n);e.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],p=t(d,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Gc=new Pt,gi=new Ws,rr=new wn,Wc=new A,ar=new A,or=new A,cr=new A,ma=new A,lr=new A,Xc=new A,hr=new A;class Re extends pe{constructor(t=new Ge,e=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(s&&o){lr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],u=s[c];h!==0&&(ma.fromBufferAttribute(u,t),a?lr.addScaledVector(ma,h):lr.addScaledVector(ma.sub(e),h))}e.add(lr)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(s),gi.copy(t.ray).recast(t.near),!(rr.containsPoint(gi.origin)===!1&&(gi.intersectSphere(rr,Wc)===null||gi.origin.distanceToSquared(Wc)>(t.far-t.near)**2))&&(Gc.copy(s).invert(),gi.copy(t.ray).applyMatrix4(Gc),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,gi)))}_computeIntersections(t,e,n){let i;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=a[m.materialIndex],b=Math.max(m.start,p.start),T=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=b,L=T;x<L;x+=3){const C=o.getX(x),R=o.getX(x+1),D=o.getX(x+2);i=ur(this,f,t,n,l,h,u,C,R,D),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const b=o.getX(m),T=o.getX(m+1),x=o.getX(m+2);i=ur(this,a,t,n,l,h,u,b,T,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=a[m.materialIndex],b=Math.max(m.start,p.start),T=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=b,L=T;x<L;x+=3){const C=x,R=x+1,D=x+2;i=ur(this,f,t,n,l,h,u,C,R,D),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const b=m,T=m+1,x=m+2;i=ur(this,a,t,n,l,h,u,b,T,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Gd(r,t,e,n,i,s,a,o){let c;if(t.side===qe?c=n.intersectTriangle(a,s,i,!0,o):c=n.intersectTriangle(i,s,a,t.side===Xn,o),c===null)return null;hr.copy(o),hr.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(hr);return l<e.near||l>e.far?null:{distance:l,point:hr.clone(),object:r}}function ur(r,t,e,n,i,s,a,o,c,l){r.getVertexPosition(o,ar),r.getVertexPosition(c,or),r.getVertexPosition(l,cr);const h=Gd(r,t,e,n,ar,or,cr,Xc);if(h){const u=new A;_n.getBarycoord(Xc,ar,or,cr,u),i&&(h.uv=_n.getInterpolatedAttribute(i,o,c,l,u,new Ut)),s&&(h.uv1=_n.getInterpolatedAttribute(s,o,c,l,u,new Ut)),a&&(h.normal=_n.getInterpolatedAttribute(a,o,c,l,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new A,materialIndex:0};_n.getNormal(ar,or,cr,d.normal),h.face=d,h.barycoord=u}return h}class Xs extends Ge{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,a,s,0),g("z","y","x",1,-1,n,e,-t,a,s,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Ue(l,3)),this.setAttribute("normal",new Ue(h,3)),this.setAttribute("uv",new Ue(u,2));function g(_,m,f,b,T,x,L,C,R,D,E){const M=x/R,I=L/D,V=x/2,B=L/2,q=C/2,Y=R+1,X=D+1;let J=0,G=0;const rt=new A;for(let ft=0;ft<X;ft++){const St=ft*I-B;for(let Ht=0;Ht<Y;Ht++){const Jt=Ht*M-V;rt[_]=Jt*b,rt[m]=St*T,rt[f]=q,l.push(rt.x,rt.y,rt.z),rt[_]=0,rt[m]=0,rt[f]=C>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(Ht/R),u.push(1-ft/D),J+=1}}for(let ft=0;ft<D;ft++)for(let St=0;St<R;St++){const Ht=d+St+Y*ft,Jt=d+St+Y*(ft+1),K=d+(St+1)+Y*(ft+1),nt=d+(St+1)+Y*ft;c.push(Ht,Jt,nt),c.push(Jt,K,nt),G+=6}o.addGroup(p,G,E),p+=G,d+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function cs(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Be(r){const t={};for(let e=0;e<r.length;e++){const n=cs(r[e]);for(const i in n)t[i]=n[i]}return t}function Wd(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Fh(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const Xd={clone:cs,merge:Be};var qd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class di extends yn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qd,this.fragmentShader=jd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=cs(t.uniforms),this.uniformsGroups=Wd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class kh extends pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pt,this.projectionMatrix=new Pt,this.projectionMatrixInverse=new Pt,this.coordinateSystem=Vn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ti=new A,qc=new Ut,jc=new Ut;class Ae extends kh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=os*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return os*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ti.x,ti.y).multiplyScalar(-t/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ti.x,ti.y).multiplyScalar(-t/ti.z)}getViewSize(t,e){return this.getViewBounds(t,qc,jc),e.subVectors(jc,qc)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Hi=-90,Vi=1;class Kd extends pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ae(Hi,Vi,t,e);i.layers=this.layers,this.add(i);const s=new Ae(Hi,Vi,t,e);s.layers=this.layers,this.add(s);const a=new Ae(Hi,Vi,t,e);a.layers=this.layers,this.add(a);const o=new Ae(Hi,Vi,t,e);o.layers=this.layers,this.add(o);const c=new Ae(Hi,Vi,t,e);c.layers=this.layers,this.add(c);const l=new Ae(Hi,Vi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,c]=e;for(const l of e)this.remove(l);if(t===Vn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Fr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Oh extends Te{constructor(t,e,n,i,s,a,o,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:ns,super(t,e,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Yd extends Ai{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Oh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Xe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Xs(5,5,5),s=new di({name:"CubemapFromEquirect",uniforms:cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qe,blending:li});s.uniforms.tEquirect.value=e;const a=new Re(i,s),o=e.minFilter;return e.minFilter===Hn&&(e.minFilter=Xe),new Kd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}}const ga=new A,$d=new A,Zd=new Ot;class Si{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=ga.subVectors(n,e).cross($d.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ga),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Zd.getNormalMatrix(t),i=this.coplanarPoint(ga).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new wn,dr=new A;class $o{constructor(t=new Si,e=new Si,n=new Si,i=new Si,s=new Si,a=new Si){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Vn){const n=this.planes,i=t.elements,s=i[0],a=i[1],o=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],p=i[8],g=i[9],_=i[10],m=i[11],f=i[12],b=i[13],T=i[14],x=i[15];if(n[0].setComponents(c-s,d-l,m-p,x-f).normalize(),n[1].setComponents(c+s,d+l,m+p,x+f).normalize(),n[2].setComponents(c+a,d+h,m+g,x+b).normalize(),n[3].setComponents(c-a,d-h,m-g,x-b).normalize(),n[4].setComponents(c-o,d-u,m-_,x-T).normalize(),e===Vn)n[5].setComponents(c+o,d+u,m+_,x+T).normalize();else if(e===Fr)n[5].setComponents(o,u,_,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(t){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(t.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(dr.x=i.normal.x>0?t.max.x:t.min.x,dr.y=i.normal.y>0?t.max.y:t.min.y,dr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Bh(){let r=null,t=!1,e=null,n=null;function i(s,a){e(s,a),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Jd(r){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=r.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=r.SHORT;else if(l instanceof Uint32Array)p=r.UNSIGNED_INT;else if(l instanceof Int32Array)p=r.INT;else if(l instanceof Int8Array)p=r.BYTE;else if(l instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(r.bindBuffer(l,o),u.length===0)r.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];r.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(r.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:a}}class Wr extends Ge{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=t/o,d=e/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const b=f*d-a;for(let T=0;T<l;T++){const x=T*u-s;g.push(x,-b,0),_.push(0,0,1),m.push(T/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let b=0;b<o;b++){const T=b+l*f,x=b+l*(f+1),L=b+1+l*(f+1),C=b+1+l*f;p.push(T,x,C),p.push(x,L,C)}this.setIndex(p),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wr(t.width,t.height,t.widthSegments,t.heightSegments)}}var Qd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,af=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,of=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,lf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,df=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ff=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Sf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ef=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,wf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Af=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,If="gl_FragColor = linearToOutputTexel( gl_FragColor );",Pf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Df=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Uf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ff=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,kf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Of=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Vf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,qf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$f=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Jf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Qf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ep=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,np=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ip=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ap=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,op=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,up=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,gp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ep=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ap=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ip=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Up=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Fp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Op=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Kp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Jp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,am=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,om=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,lm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,um=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,pm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_m=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ym=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Mm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Em=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Am=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Rm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Im=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Pm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Lm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:Qd,alphahash_pars_fragment:tf,alphamap_fragment:ef,alphamap_pars_fragment:nf,alphatest_fragment:sf,alphatest_pars_fragment:rf,aomap_fragment:af,aomap_pars_fragment:of,batching_pars_vertex:cf,batching_vertex:lf,begin_vertex:hf,beginnormal_vertex:uf,bsdfs:df,iridescence_fragment:ff,bumpmap_pars_fragment:pf,clipping_planes_fragment:mf,clipping_planes_pars_fragment:gf,clipping_planes_pars_vertex:_f,clipping_planes_vertex:xf,color_fragment:vf,color_pars_fragment:yf,color_pars_vertex:Mf,color_vertex:bf,common:Sf,cube_uv_reflection_fragment:Ef,defaultnormal_vertex:Tf,displacementmap_pars_vertex:wf,displacementmap_vertex:Af,emissivemap_fragment:Rf,emissivemap_pars_fragment:Cf,colorspace_fragment:If,colorspace_pars_fragment:Pf,envmap_fragment:Lf,envmap_common_pars_fragment:Df,envmap_pars_fragment:Nf,envmap_pars_vertex:Uf,envmap_physical_pars_fragment:qf,envmap_vertex:Ff,fog_vertex:kf,fog_pars_vertex:Of,fog_fragment:Bf,fog_pars_fragment:zf,gradientmap_pars_fragment:Hf,lightmap_pars_fragment:Vf,lights_lambert_fragment:Gf,lights_lambert_pars_fragment:Wf,lights_pars_begin:Xf,lights_toon_fragment:jf,lights_toon_pars_fragment:Kf,lights_phong_fragment:Yf,lights_phong_pars_fragment:$f,lights_physical_fragment:Zf,lights_physical_pars_fragment:Jf,lights_fragment_begin:Qf,lights_fragment_maps:tp,lights_fragment_end:ep,logdepthbuf_fragment:np,logdepthbuf_pars_fragment:ip,logdepthbuf_pars_vertex:sp,logdepthbuf_vertex:rp,map_fragment:ap,map_pars_fragment:op,map_particle_fragment:cp,map_particle_pars_fragment:lp,metalnessmap_fragment:hp,metalnessmap_pars_fragment:up,morphinstance_vertex:dp,morphcolor_vertex:fp,morphnormal_vertex:pp,morphtarget_pars_vertex:mp,morphtarget_vertex:gp,normal_fragment_begin:_p,normal_fragment_maps:xp,normal_pars_fragment:vp,normal_pars_vertex:yp,normal_vertex:Mp,normalmap_pars_fragment:bp,clearcoat_normal_fragment_begin:Sp,clearcoat_normal_fragment_maps:Ep,clearcoat_pars_fragment:Tp,iridescence_pars_fragment:wp,opaque_fragment:Ap,packing:Rp,premultiplied_alpha_fragment:Cp,project_vertex:Ip,dithering_fragment:Pp,dithering_pars_fragment:Lp,roughnessmap_fragment:Dp,roughnessmap_pars_fragment:Np,shadowmap_pars_fragment:Up,shadowmap_pars_vertex:Fp,shadowmap_vertex:kp,shadowmask_pars_fragment:Op,skinbase_vertex:Bp,skinning_pars_vertex:zp,skinning_vertex:Hp,skinnormal_vertex:Vp,specularmap_fragment:Gp,specularmap_pars_fragment:Wp,tonemapping_fragment:Xp,tonemapping_pars_fragment:qp,transmission_fragment:jp,transmission_pars_fragment:Kp,uv_pars_fragment:Yp,uv_pars_vertex:$p,uv_vertex:Zp,worldpos_vertex:Jp,background_vert:Qp,background_frag:tm,backgroundCube_vert:em,backgroundCube_frag:nm,cube_vert:im,cube_frag:sm,depth_vert:rm,depth_frag:am,distanceRGBA_vert:om,distanceRGBA_frag:cm,equirect_vert:lm,equirect_frag:hm,linedashed_vert:um,linedashed_frag:dm,meshbasic_vert:fm,meshbasic_frag:pm,meshlambert_vert:mm,meshlambert_frag:gm,meshmatcap_vert:_m,meshmatcap_frag:xm,meshnormal_vert:vm,meshnormal_frag:ym,meshphong_vert:Mm,meshphong_frag:bm,meshphysical_vert:Sm,meshphysical_frag:Em,meshtoon_vert:Tm,meshtoon_frag:wm,points_vert:Am,points_frag:Rm,shadow_vert:Cm,shadow_frag:Im,sprite_vert:Pm,sprite_frag:Lm},st={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Sn={basic:{uniforms:Be([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:Be([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Tt(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:Be([st.common,st.specularmap,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.fog,st.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:Be([st.common,st.envmap,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.roughnessmap,st.metalnessmap,st.fog,st.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:Be([st.common,st.aomap,st.lightmap,st.emissivemap,st.bumpmap,st.normalmap,st.displacementmap,st.gradientmap,st.fog,st.lights,{emissive:{value:new Tt(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:Be([st.common,st.bumpmap,st.normalmap,st.displacementmap,st.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:Be([st.points,st.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:Be([st.common,st.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:Be([st.common,st.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:Be([st.common,st.bumpmap,st.normalmap,st.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:Be([st.sprite,st.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:Be([st.common,st.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:Be([st.lights,st.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};Sn.physical={uniforms:Be([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const fr={r:0,b:0,g:0},xi=new Ve,Dm=new Pt;function Nm(r,t,e,n,i,s,a){const o=new Tt(0);let c=s===!0?0:1,l,h,u=null,d=0,p=null;function g(b){let T=b.isScene===!0?b.background:null;return T&&T.isTexture&&(T=(b.backgroundBlurriness>0?e:t).get(T)),T}function _(b){let T=!1;const x=g(b);x===null?f(o,c):x&&x.isColor&&(f(x,1),T=!0);const L=r.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(b,T){const x=g(T);x&&(x.isCubeTexture||x.mapping===Hr)?(h===void 0&&(h=new Re(new Xs(1,1,1),new di({name:"BackgroundCubeMaterial",uniforms:cs(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),xi.copy(T.backgroundRotation),xi.x*=-1,xi.y*=-1,xi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Dm.makeRotationFromEuler(xi)),h.material.toneMapped=Kt.getTransfer(x.colorSpace)!==ce,(u!==x||d!==x.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=r.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Re(new Wr(2,2),new di({name:"BackgroundMaterial",uniforms:cs(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Kt.getTransfer(x.colorSpace)!==ce,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==r.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,p=r.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function f(b,T){b.getRGB(fr,Fh(r)),n.buffers.color.setClear(fr.r,fr.g,fr.b,T,a)}return{getClearColor:function(){return o},setClearColor:function(b,T=1){o.set(b),c=T,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,f(o,c)},render:_,addToRenderList:m}}function Um(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(M,I,V,B,q){let Y=!1;const X=u(B,V,I);s!==X&&(s=X,l(s.object)),Y=p(M,B,V,q),Y&&g(M,B,V,q),q!==null&&t.update(q,r.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,x(M,I,V,B),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function c(){return r.createVertexArray()}function l(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,I,V){const B=V.wireframe===!0;let q=n[M.id];q===void 0&&(q={},n[M.id]=q);let Y=q[I.id];Y===void 0&&(Y={},q[I.id]=Y);let X=Y[B];return X===void 0&&(X=d(c()),Y[B]=X),X}function d(M){const I=[],V=[],B=[];for(let q=0;q<e;q++)I[q]=0,V[q]=0,B[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:B,object:M,attributes:{},index:null}}function p(M,I,V,B){const q=s.attributes,Y=I.attributes;let X=0;const J=V.getAttributes();for(const G in J)if(J[G].location>=0){const ft=q[G];let St=Y[G];if(St===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(St=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(St=M.instanceColor)),ft===void 0||ft.attribute!==St||St&&ft.data!==St.data)return!0;X++}return s.attributesNum!==X||s.index!==B}function g(M,I,V,B){const q={},Y=I.attributes;let X=0;const J=V.getAttributes();for(const G in J)if(J[G].location>=0){let ft=Y[G];ft===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(ft=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(ft=M.instanceColor));const St={};St.attribute=ft,ft&&ft.data&&(St.data=ft.data),q[G]=St,X++}s.attributes=q,s.attributesNum=X,s.index=B}function _(){const M=s.newAttributes;for(let I=0,V=M.length;I<V;I++)M[I]=0}function m(M){f(M,0)}function f(M,I){const V=s.newAttributes,B=s.enabledAttributes,q=s.attributeDivisors;V[M]=1,B[M]===0&&(r.enableVertexAttribArray(M),B[M]=1),q[M]!==I&&(r.vertexAttribDivisor(M,I),q[M]=I)}function b(){const M=s.newAttributes,I=s.enabledAttributes;for(let V=0,B=I.length;V<B;V++)I[V]!==M[V]&&(r.disableVertexAttribArray(V),I[V]=0)}function T(M,I,V,B,q,Y,X){X===!0?r.vertexAttribIPointer(M,I,V,q,Y):r.vertexAttribPointer(M,I,V,B,q,Y)}function x(M,I,V,B){_();const q=B.attributes,Y=V.getAttributes(),X=I.defaultAttributeValues;for(const J in Y){const G=Y[J];if(G.location>=0){let rt=q[J];if(rt===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(rt=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(rt=M.instanceColor)),rt!==void 0){const ft=rt.normalized,St=rt.itemSize,Ht=t.get(rt);if(Ht===void 0)continue;const Jt=Ht.buffer,K=Ht.type,nt=Ht.bytesPerElement,_t=K===r.INT||K===r.UNSIGNED_INT||rt.gpuType===Oo;if(rt.isInterleavedBufferAttribute){const at=rt.data,It=at.stride,Nt=rt.offset;if(at.isInstancedInterleavedBuffer){for(let Vt=0;Vt<G.locationSize;Vt++)f(G.location+Vt,at.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Vt=0;Vt<G.locationSize;Vt++)m(G.location+Vt);r.bindBuffer(r.ARRAY_BUFFER,Jt);for(let Vt=0;Vt<G.locationSize;Vt++)T(G.location+Vt,St/G.locationSize,K,ft,It*nt,(Nt+St/G.locationSize*Vt)*nt,_t)}else{if(rt.isInstancedBufferAttribute){for(let at=0;at<G.locationSize;at++)f(G.location+at,rt.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let at=0;at<G.locationSize;at++)m(G.location+at);r.bindBuffer(r.ARRAY_BUFFER,Jt);for(let at=0;at<G.locationSize;at++)T(G.location+at,St/G.locationSize,K,ft,St*nt,St/G.locationSize*at*nt,_t)}}else if(X!==void 0){const ft=X[J];if(ft!==void 0)switch(ft.length){case 2:r.vertexAttrib2fv(G.location,ft);break;case 3:r.vertexAttrib3fv(G.location,ft);break;case 4:r.vertexAttrib4fv(G.location,ft);break;default:r.vertexAttrib1fv(G.location,ft)}}}}b()}function L(){D();for(const M in n){const I=n[M];for(const V in I){const B=I[V];for(const q in B)h(B[q].object),delete B[q];delete I[V]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const V in I){const B=I[V];for(const q in B)h(B[q].object),delete B[q];delete I[V]}delete n[M.id]}function R(M){for(const I in n){const V=n[I];if(V[M.id]===void 0)continue;const B=V[M.id];for(const q in B)h(B[q].object),delete B[q];delete V[M.id]}}function D(){E(),a=!0,s!==i&&(s=i,l(s.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:D,resetDefaultState:E,dispose:L,releaseStatesOfGeometry:C,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function Fm(r,t,e){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function c(l,h,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function km(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==rn&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const D=R===Gs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==qn&&n.convert(R)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==xn&&!D)}function c(R){if(R==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),f=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),T=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),L=g>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:x,vertexTextures:L,maxSamples:C}}function Om(r){const t=this;let e=null,n=0,i=!1,s=!1;const a=new Si,o=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):l();else{const b=s?0:n,T=b*4;let x=f.clippingState||null;c.value=x,x=h(g,d,T,p);for(let L=0;L!==T;++L)x[L]=e[L];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let T=0,x=p;T!==_;++T,x+=4)a.copy(u[T]).applyMatrix4(b,o),a.normal.toArray(m,x),m[x+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Bm(r){let t=new WeakMap;function e(a,o){return o===$a?a.mapping=ns:o===Za&&(a.mapping=is),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===$a||o===Za)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Yd(c.height);return l.fromEquirectangularTexture(r,a),t.set(a,l),a.addEventListener("dispose",i),e(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Zo extends kh{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Yi=4,Kc=[.125,.215,.35,.446,.526,.582],Ti=20,_a=new Zo,Yc=new Tt;let xa=null,va=0,ya=0,Ma=!1;const Ei=(1+Math.sqrt(5))/2,Gi=1/Ei,$c=[new A(-Ei,Gi,0),new A(Ei,Gi,0),new A(-Gi,0,Ei),new A(Gi,0,Ei),new A(0,Ei,-Gi),new A(0,Ei,Gi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class Zc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(xa,va,ya),this._renderer.xr.enabled=Ma,t.scissorTest=!1,pr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ns||t.mapping===is?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xa=this._renderer.getRenderTarget(),va=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Ma=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:Gs,format:rn,colorSpace:Ce,depthBuffer:!1},i=Jc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jc(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zm(s)),this._blurMaterial=Hm(s,t,e)}return i}_compileMaterial(t){const e=new Re(this._lodPlanes[0],t);this._renderer.compile(e,_a)}_sceneToCubeUV(t,e,n,i){const o=new Ae(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Yc),h.toneMapping=hi,h.autoClear=!1;const p=new an({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),g=new Re(new Xs,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Yc),_=!0);for(let f=0;f<6;f++){const b=f%3;b===0?(o.up.set(0,c[f],0),o.lookAt(l[f],0,0)):b===1?(o.up.set(0,0,c[f]),o.lookAt(0,l[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,l[f]));const T=this._cubeSize;pr(i,b*T,f>2?T:0,T,T),h.setRenderTarget(i),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ns||t.mapping===is;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qc());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new Re(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;pr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,_a)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=$c[(i-s-1)%$c.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",s),this._halfBlur(a,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Re(this._lodPlanes[i],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ti-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):Ti;m>Ti&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ti}`);const f=[];let b=0;for(let R=0;R<Ti;++R){const D=R/_,E=Math.exp(-D*D/2);f.push(E),R===0?b+=E:R<m&&(b+=2*E)}for(let R=0;R<f.length;R++)f[R]=f[R]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:T}=this;d.dTheta.value=g,d.mipInt.value=T-n;const x=this._sizeLods[i],L=3*x*(i>T-Yi?i-T+Yi:0),C=4*(this._cubeSize-x);pr(e,L,C,3*x,2*x),c.setRenderTarget(e),c.render(u,_a)}}function zm(r){const t=[],e=[],n=[];let i=r;const s=r-Yi+1+Kc.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);e.push(o);let c=1/o;a>r-Yi?c=Kc[a-r+Yi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,b=new Float32Array(_*g*p),T=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let C=0;C<p;C++){const R=C%3*2/3-1,D=C>2?0:-1,E=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];b.set(E,_*g*C),T.set(d,m*g*C);const M=[C,C,C,C,C,C];x.set(M,f*g*C)}const L=new Ge;L.setAttribute("position",new xe(b,_)),L.setAttribute("uv",new xe(T,m)),L.setAttribute("faceIndex",new xe(x,f)),t.push(L),i>Yi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Jc(r,t,e){const n=new Ai(r,t,e);return n.texture.mapping=Hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Hm(r,t,e){const n=new Float32Array(Ti),i=new A(0,1,0);return new di({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Qc(){return new di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function tl(){return new di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Jo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Vm(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===$a||c===Za,h=c===ns||c===is;if(l||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Zc(r)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return l&&p&&p.height>0||h&&p&&i(p)?(e===null&&(e=new Zc(r)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Gm(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Ps("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Wm(r,t,e,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)t.remove(_[m])}d.removeEventListener("dispose",a),delete i[d.id];const p=s.get(d);p&&(t.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],r.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)t.update(_[m],r.ARRAY_BUFFER)}}function l(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let T=0,x=b.length;T<x;T+=3){const L=b[T+0],C=b[T+1],R=b[T+2];d.push(L,C,C,R,R,L)}}else if(g!==void 0){const b=g.array;_=g.version;for(let T=0,x=b.length/3-1;T<x;T+=3){const L=T+0,C=T+1,R=T+2;d.push(L,C,C,R,R,L)}}else return;const m=new(Ih(d)?Uh:Nh)(d,1);m.version=_;const f=s.get(u);f&&t.remove(f),s.set(u,m)}function h(u){const d=s.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return s.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Xm(r,t,e){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,p){r.drawElements(n,p,s,d*a),e.update(p,n,1)}function l(d,p,g){g!==0&&(r.drawElementsInstanced(n,p,s,d*a,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/a,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,d,0,_,0,g);let f=0;for(let b=0;b<g;b++)f+=p[b]*_[b];e.update(f,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function qm(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function jm(r,t,e){const n=new WeakMap,i=new Zt;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let M=function(){D.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var p=M;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let L=o.attributes.position.count*x,C=1;L>t.maxTextureSize&&(C=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const R=new Float32Array(L*C*4*u),D=new Lh(R,L,C,u);D.type=xn,D.needsUpdate=!0;const E=x*4;for(let I=0;I<u;I++){const V=f[I],B=b[I],q=T[I],Y=L*C*4*I;for(let X=0;X<V.count;X++){const J=X*E;g===!0&&(i.fromBufferAttribute(V,X),R[Y+J+0]=i.x,R[Y+J+1]=i.y,R[Y+J+2]=i.z,R[Y+J+3]=0),_===!0&&(i.fromBufferAttribute(B,X),R[Y+J+4]=i.x,R[Y+J+5]=i.y,R[Y+J+6]=i.z,R[Y+J+7]=0),m===!0&&(i.fromBufferAttribute(q,X),R[Y+J+8]=i.x,R[Y+J+9]=i.y,R[Y+J+10]=i.z,R[Y+J+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:D,size:new Ut(L,C)},n.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(r,"morphTargetBaseInfluence",_),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Km(r,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:a}}class zh extends Te{constructor(t,e,n,i,s,a,o,c,l,h=Zi){if(h!==Zi&&h!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Zi&&(n=wi),n===void 0&&h===as&&(n=rs),super(null,i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:He,this.minFilter=c!==void 0?c:He,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Hh=new Te,el=new zh(1,1),Vh=new Lh,Gh=new Dd,Wh=new Oh,nl=[],il=[],sl=new Float32Array(16),rl=new Float32Array(9),al=new Float32Array(4);function ds(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=nl[i];if(s===void 0&&(s=new Float32Array(i),nl[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function Me(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function be(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Xr(r,t){let e=il[t];e===void 0&&(e=new Int32Array(t),il[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Ym(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function $m(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;r.uniform2fv(this.addr,t),be(e,t)}}function Zm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;r.uniform3fv(this.addr,t),be(e,t)}}function Jm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;r.uniform4fv(this.addr,t),be(e,t)}}function Qm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Me(e,n))return;al.set(n),r.uniformMatrix2fv(this.addr,!1,al),be(e,n)}}function t0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Me(e,n))return;rl.set(n),r.uniformMatrix3fv(this.addr,!1,rl),be(e,n)}}function e0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Me(e,n))return;sl.set(n),r.uniformMatrix4fv(this.addr,!1,sl),be(e,n)}}function n0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function i0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;r.uniform2iv(this.addr,t),be(e,t)}}function s0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;r.uniform3iv(this.addr,t),be(e,t)}}function r0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;r.uniform4iv(this.addr,t),be(e,t)}}function a0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function o0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;r.uniform2uiv(this.addr,t),be(e,t)}}function c0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;r.uniform3uiv(this.addr,t),be(e,t)}}function l0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;r.uniform4uiv(this.addr,t),be(e,t)}}function h0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(el.compareFunction=Ch,s=el):s=Hh,e.setTexture2D(t||s,i)}function u0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Gh,i)}function d0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Wh,i)}function f0(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Vh,i)}function p0(r){switch(r){case 5126:return Ym;case 35664:return $m;case 35665:return Zm;case 35666:return Jm;case 35674:return Qm;case 35675:return t0;case 35676:return e0;case 5124:case 35670:return n0;case 35667:case 35671:return i0;case 35668:case 35672:return s0;case 35669:case 35673:return r0;case 5125:return a0;case 36294:return o0;case 36295:return c0;case 36296:return l0;case 35678:case 36198:case 36298:case 36306:case 35682:return h0;case 35679:case 36299:case 36307:return u0;case 35680:case 36300:case 36308:case 36293:return d0;case 36289:case 36303:case 36311:case 36292:return f0}}function m0(r,t){r.uniform1fv(this.addr,t)}function g0(r,t){const e=ds(t,this.size,2);r.uniform2fv(this.addr,e)}function _0(r,t){const e=ds(t,this.size,3);r.uniform3fv(this.addr,e)}function x0(r,t){const e=ds(t,this.size,4);r.uniform4fv(this.addr,e)}function v0(r,t){const e=ds(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function y0(r,t){const e=ds(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function M0(r,t){const e=ds(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function b0(r,t){r.uniform1iv(this.addr,t)}function S0(r,t){r.uniform2iv(this.addr,t)}function E0(r,t){r.uniform3iv(this.addr,t)}function T0(r,t){r.uniform4iv(this.addr,t)}function w0(r,t){r.uniform1uiv(this.addr,t)}function A0(r,t){r.uniform2uiv(this.addr,t)}function R0(r,t){r.uniform3uiv(this.addr,t)}function C0(r,t){r.uniform4uiv(this.addr,t)}function I0(r,t,e){const n=this.cache,i=t.length,s=Xr(e,i);Me(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Hh,s[a])}function P0(r,t,e){const n=this.cache,i=t.length,s=Xr(e,i);Me(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Gh,s[a])}function L0(r,t,e){const n=this.cache,i=t.length,s=Xr(e,i);Me(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Wh,s[a])}function D0(r,t,e){const n=this.cache,i=t.length,s=Xr(e,i);Me(n,s)||(r.uniform1iv(this.addr,s),be(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Vh,s[a])}function N0(r){switch(r){case 5126:return m0;case 35664:return g0;case 35665:return _0;case 35666:return x0;case 35674:return v0;case 35675:return y0;case 35676:return M0;case 5124:case 35670:return b0;case 35667:case 35671:return S0;case 35668:case 35672:return E0;case 35669:case 35673:return T0;case 5125:return w0;case 36294:return A0;case 36295:return R0;case 36296:return C0;case 35678:case 36198:case 36298:case 36306:case 35682:return I0;case 35679:case 36299:case 36307:return P0;case 35680:case 36300:case 36308:case 36293:return L0;case 36289:case 36303:case 36311:case 36292:return D0}}class U0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=p0(e.type)}}class F0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=N0(e.type)}}class k0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(t,e[o.id],n)}}}const ba=/(\w+)(\])?(\[|\.)?/g;function ol(r,t){r.seq.push(t),r.map[t.id]=t}function O0(r,t,e){const n=r.name,i=n.length;for(ba.lastIndex=0;;){const s=ba.exec(n),a=ba.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){ol(e,l===void 0?new U0(o,r,t):new F0(o,r,t));break}else{let u=e.map[o];u===void 0&&(u=new k0(o),ol(e,u)),e=u}}}class Lr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),a=t.getUniformLocation(e,s.name);O0(s,a,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){const o=e[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function cl(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const B0=37297;let z0=0;function H0(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const ll=new Ot;function V0(r){Kt._getMatrix(ll,Kt.workingColorSpace,r);const t=`mat3( ${ll.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(r)){case Gr:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function hl(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+H0(r.getShaderSource(t),a)}else return i}function G0(r,t){const e=V0(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function W0(r,t){let e;switch(t){case Vu:e="Linear";break;case Gu:e="Reinhard";break;case Wu:e="Cineon";break;case Xu:e="ACESFilmic";break;case ju:e="AgX";break;case Ku:e="Neutral";break;case qu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const mr=new A;function X0(){Kt.getLuminanceCoefficients(mr);const r=mr.x.toFixed(4),t=mr.y.toFixed(4),e=mr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function q0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ls).join(`
`)}function j0(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function K0(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function Ls(r){return r!==""}function ul(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dl(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Y0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ao(r){return r.replace(Y0,Z0)}const $0=new Map;function Z0(r,t){let e=kt[t];if(e===void 0){const n=$0.get(t);if(n!==void 0)e=kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ao(e)}const J0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fl(r){return r.replace(J0,Q0)}function Q0(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function pl(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function tg(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===ph?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Su?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function eg(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ns:case is:t="ENVMAP_TYPE_CUBE";break;case Hr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ng(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case is:t="ENVMAP_MODE_REFRACTION";break}return t}function ig(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case ko:t="ENVMAP_BLENDING_MULTIPLY";break;case zu:t="ENVMAP_BLENDING_MIX";break;case Hu:t="ENVMAP_BLENDING_ADD";break}return t}function sg(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function rg(r,t,e,n){const i=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=tg(e),l=eg(e),h=ng(e),u=ig(e),d=sg(e),p=q0(e),g=j0(s),_=i.createProgram();let m,f,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ls).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ls).join(`
`),f.length>0&&(f+=`
`)):(m=[pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ls).join(`
`),f=[pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hi?"#define TONE_MAPPING":"",e.toneMapping!==hi?kt.tonemapping_pars_fragment:"",e.toneMapping!==hi?W0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,G0("linearToOutputTexel",e.outputColorSpace),X0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ls).join(`
`)),a=Ao(a),a=ul(a,e),a=dl(a,e),o=Ao(o),o=ul(o,e),o=dl(o,e),a=fl(a),o=fl(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=b+m+a,x=b+f+o,L=cl(i,i.VERTEX_SHADER,T),C=cl(i,i.FRAGMENT_SHADER,x);i.attachShader(_,L),i.attachShader(_,C),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function R(I){if(r.debug.checkShaderErrors){const V=i.getProgramInfoLog(_).trim(),B=i.getShaderInfoLog(L).trim(),q=i.getShaderInfoLog(C).trim();let Y=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,L,C);else{const J=hl(i,L,"vertex"),G=hl(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+V+`
`+J+`
`+G)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(B===""||q==="")&&(X=!1);X&&(I.diagnostics={runnable:Y,programLog:V,vertexShader:{log:B,prefix:m},fragmentShader:{log:q,prefix:f}})}i.deleteShader(L),i.deleteShader(C),D=new Lr(i,_),E=K0(i,_)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,B0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=z0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=L,this.fragmentShader=C,this}let ag=0;class og{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new cg(t),e.set(t,n)),n}}class cg{constructor(t){this.id=ag++,this.code=t,this.usedTimes=0}}function lg(r,t,e,n,i,s,a){const o=new Yo,c=new og,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,M,I,V,B){const q=V.fog,Y=B.geometry,X=E.isMeshStandardMaterial?V.environment:null,J=(E.isMeshStandardMaterial?e:t).get(E.envMap||X),G=J&&J.mapping===Hr?J.image.height:null,rt=g[E.type];E.precision!==null&&(p=i.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const ft=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,St=ft!==void 0?ft.length:0;let Ht=0;Y.morphAttributes.position!==void 0&&(Ht=1),Y.morphAttributes.normal!==void 0&&(Ht=2),Y.morphAttributes.color!==void 0&&(Ht=3);let Jt,K,nt,_t;if(rt){const ie=Sn[rt];Jt=ie.vertexShader,K=ie.fragmentShader}else Jt=E.vertexShader,K=E.fragmentShader,c.update(E),nt=c.getVertexShaderID(E),_t=c.getFragmentShaderID(E);const at=r.getRenderTarget(),It=r.state.buffers.depth.getReversed(),Nt=B.isInstancedMesh===!0,Vt=B.isBatchedMesh===!0,le=!!E.map,qt=!!E.matcap,fe=!!J,U=!!E.aoMap,Fe=!!E.lightMap,Gt=!!E.bumpMap,Wt=!!E.normalMap,Rt=!!E.displacementMap,oe=!!E.emissiveMap,wt=!!E.metalnessMap,w=!!E.roughnessMap,v=E.anisotropy>0,O=E.clearcoat>0,$=E.dispersion>0,Q=E.iridescence>0,j=E.sheen>0,vt=E.transmission>0,ot=v&&!!E.anisotropyMap,pt=O&&!!E.clearcoatMap,jt=O&&!!E.clearcoatNormalMap,et=O&&!!E.clearcoatRoughnessMap,mt=Q&&!!E.iridescenceMap,Ct=Q&&!!E.iridescenceThicknessMap,Lt=j&&!!E.sheenColorMap,gt=j&&!!E.sheenRoughnessMap,k=!!E.specularMap,lt=!!E.specularColorMap,Dt=!!E.specularIntensityMap,P=vt&&!!E.transmissionMap,ct=vt&&!!E.thicknessMap,W=!!E.gradientMap,Z=!!E.alphaMap,dt=E.alphaTest>0,ht=!!E.alphaHash,Bt=!!E.extensions;let _e=hi;E.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(_e=r.toneMapping);const Ie={shaderID:rt,shaderType:E.type,shaderName:E.name,vertexShader:Jt,fragmentShader:K,defines:E.defines,customVertexShaderID:nt,customFragmentShaderID:_t,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Vt,batchingColor:Vt&&B._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&B.instanceColor!==null,instancingMorph:Nt&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?r.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Ce,alphaToCoverage:!!E.alphaToCoverage,map:le,matcap:qt,envMap:fe,envMapMode:fe&&J.mapping,envMapCubeUVHeight:G,aoMap:U,lightMap:Fe,bumpMap:Gt,normalMap:Wt,displacementMap:d&&Rt,emissiveMap:oe,normalMapObjectSpace:Wt&&E.normalMapType===ed,normalMapTangentSpace:Wt&&E.normalMapType===jo,metalnessMap:wt,roughnessMap:w,anisotropy:v,anisotropyMap:ot,clearcoat:O,clearcoatMap:pt,clearcoatNormalMap:jt,clearcoatRoughnessMap:et,dispersion:$,iridescence:Q,iridescenceMap:mt,iridescenceThicknessMap:Ct,sheen:j,sheenColorMap:Lt,sheenRoughnessMap:gt,specularMap:k,specularColorMap:lt,specularIntensityMap:Dt,transmission:vt,transmissionMap:P,thicknessMap:ct,gradientMap:W,opaque:E.transparent===!1&&E.blending===$i&&E.alphaToCoverage===!1,alphaMap:Z,alphaTest:dt,alphaHash:ht,combine:E.combine,mapUv:le&&_(E.map.channel),aoMapUv:U&&_(E.aoMap.channel),lightMapUv:Fe&&_(E.lightMap.channel),bumpMapUv:Gt&&_(E.bumpMap.channel),normalMapUv:Wt&&_(E.normalMap.channel),displacementMapUv:Rt&&_(E.displacementMap.channel),emissiveMapUv:oe&&_(E.emissiveMap.channel),metalnessMapUv:wt&&_(E.metalnessMap.channel),roughnessMapUv:w&&_(E.roughnessMap.channel),anisotropyMapUv:ot&&_(E.anisotropyMap.channel),clearcoatMapUv:pt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:jt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Lt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:gt&&_(E.sheenRoughnessMap.channel),specularMapUv:k&&_(E.specularMap.channel),specularColorMapUv:lt&&_(E.specularColorMap.channel),specularIntensityMapUv:Dt&&_(E.specularIntensityMap.channel),transmissionMapUv:P&&_(E.transmissionMap.channel),thicknessMapUv:ct&&_(E.thicknessMap.channel),alphaMapUv:Z&&_(E.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Wt||v),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Y.attributes.uv&&(le||Z),fog:!!q,useFog:E.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:It,skinning:B.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Ht,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:_e,decodeVideoTexture:le&&E.map.isVideoTexture===!0&&Kt.getTransfer(E.map.colorSpace)===ce,decodeVideoTextureEmissive:oe&&E.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(E.emissiveMap.colorSpace)===ce,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===sn,flipSided:E.side===qe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Bt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&E.extensions.multiDraw===!0||Vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ie.vertexUv1s=l.has(1),Ie.vertexUv2s=l.has(2),Ie.vertexUv3s=l.has(3),l.clear(),Ie}function f(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const I in E.defines)M.push(I),M.push(E.defines[I]);return E.isRawShaderMaterial===!1&&(b(M,E),T(M,E),M.push(r.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function b(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function T(E,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),E.push(o.mask)}function x(E){const M=g[E.type];let I;if(M){const V=Sn[M];I=Xd.clone(V.uniforms)}else I=E.uniforms;return I}function L(E,M){let I;for(let V=0,B=h.length;V<B;V++){const q=h[V];if(q.cacheKey===M){I=q,++I.usedTimes;break}}return I===void 0&&(I=new rg(r,M,E,s),h.push(I)),I}function C(E){if(--E.usedTimes===0){const M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function R(E){c.remove(E)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:L,releaseProgram:C,releaseShaderCache:R,programs:h,dispose:D}}function hg(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,c){r.get(a)[o]=c}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function ug(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function ml(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function gl(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,p,g,_,m){let f=r[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},r[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),t++,f}function o(u,d,p,g,_,m){const f=a(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):e.push(f)}function c(u,d,p,g,_,m){const f=a(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):e.unshift(f)}function l(u,d){e.length>1&&e.sort(u||ug),n.length>1&&n.sort(d||ml),i.length>1&&i.sort(d||ml)}function h(){for(let u=t,d=r.length;u<d;u++){const p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:o,unshift:c,finish:h,sort:l}}function dg(){let r=new WeakMap;function t(n,i){const s=r.get(n);let a;return s===void 0?(a=new gl,r.set(n,[a])):i>=s.length?(a=new gl,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function fg(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new Tt};break;case"SpotLight":e={position:new A,direction:new A,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":e={color:new Tt,position:new A,halfWidth:new A,halfHeight:new A};break}return r[t.id]=e,e}}}function pg(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let mg=0;function gg(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function _g(r){const t=new fg,e=pg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new A);const i=new A,s=new Pt,a=new Pt;function o(l){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,b=0,T=0,x=0,L=0,C=0,R=0;l.sort(gg);for(let E=0,M=l.length;E<M;E++){const I=l[E],V=I.color,B=I.intensity,q=I.distance,Y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=V.r*B,u+=V.g*B,d+=V.b*B;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],B);R++}else if(I.isDirectionalLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const J=I.shadow,G=e.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.directionalShadow[p]=G,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=I.shadow.matrix,b++}n.directional[p]=X,p++}else if(I.isSpotLight){const X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(V).multiplyScalar(B),X.distance=q,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[_]=X;const J=I.shadow;if(I.map&&(n.spotLightMap[L]=I.map,L++,J.updateMatrices(I),I.castShadow&&C++),n.spotLightMatrix[_]=J.matrix,I.castShadow){const G=e.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=Y,x++}_++}else if(I.isRectAreaLight){const X=t.get(I);X.color.copy(V).multiplyScalar(B),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=X,m++}else if(I.isPointLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){const J=I.shadow,G=e.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,G.shadowCameraNear=J.camera.near,G.shadowCameraFar=J.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=I.shadow.matrix,T++}n.point[g]=X,g++}else if(I.isHemisphereLight){const X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(B),X.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[f]=X,f++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=st.LTC_FLOAT_1,n.rectAreaLTC2=st.LTC_FLOAT_2):(n.rectAreaLTC1=st.LTC_HALF_1,n.rectAreaLTC2=st.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==p||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==b||D.numPointShadows!==T||D.numSpotShadows!==x||D.numSpotMaps!==L||D.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=x+L-C,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,D.directionalLength=p,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=b,D.numPointShadows=T,D.numSpotShadows=x,D.numSpotMaps=L,D.numLightProbes=R,n.version=mg++)}function c(l,h){let u=0,d=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,b=l.length;f<b;f++){const T=l[f];if(T.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(T.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(T.matrixWorld),i.setFromMatrixPosition(T.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),p++}else if(T.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),a.identity(),s.copy(T.matrixWorld),s.premultiply(m),a.extractRotation(s),x.halfWidth.set(T.width*.5,0,0),x.halfHeight.set(0,T.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(T.matrixWorld),x.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(T.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function _l(r){const t=new _g(r),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function xg(r){let t=new WeakMap;function e(i,s=0){const a=t.get(i);let o;return a===void 0?(o=new _l(r),t.set(i,[o])):s>=a.length?(o=new _l(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class vg extends yn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Qu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class yg extends yn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Mg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Sg(r,t,e){let n=new $o;const i=new Ut,s=new Ut,a=new Zt,o=new vg({depthPacking:td}),c=new yg,l={},h=e.maxTextureSize,u={[Xn]:qe,[qe]:Xn,[sn]:sn},d=new di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:Mg,fragmentShader:bg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ge;g.setAttribute("position",new xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Re(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ph;let f=this.type;this.render=function(C,R,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const E=r.getRenderTarget(),M=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),V=r.state;V.setBlending(li),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const B=f!==On&&this.type===On,q=f===On&&this.type!==On;for(let Y=0,X=C.length;Y<X;Y++){const J=C[Y],G=J.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const rt=G.getFrameExtents();if(i.multiply(rt),s.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/rt.x),i.x=s.x*rt.x,G.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/rt.y),i.y=s.y*rt.y,G.mapSize.y=s.y)),G.map===null||B===!0||q===!0){const St=this.type!==On?{minFilter:He,magFilter:He}:{};G.map!==null&&G.map.dispose(),G.map=new Ai(i.x,i.y,St),G.map.texture.name=J.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const ft=G.getViewportCount();for(let St=0;St<ft;St++){const Ht=G.getViewport(St);a.set(s.x*Ht.x,s.y*Ht.y,s.x*Ht.z,s.y*Ht.w),V.viewport(a),G.updateMatrices(J,St),n=G.getFrustum(),x(R,D,G.camera,J,this.type)}G.isPointLightShadow!==!0&&this.type===On&&b(G,D),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(E,M,I)};function b(C,R){const D=t.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Ai(i.x,i.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(R,null,D,d,_,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(R,null,D,p,_,null)}function T(C,R,D,E){let M=null;const I=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)M=I;else if(M=D.isPointLight===!0?c:o,r.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const V=M.uuid,B=R.uuid;let q=l[V];q===void 0&&(q={},l[V]=q);let Y=q[B];Y===void 0&&(Y=M.clone(),q[B]=Y,R.addEventListener("dispose",L)),M=Y}if(M.visible=R.visible,M.wireframe=R.wireframe,E===On?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=r.properties.get(M);V.light=D}return M}function x(C,R,D,E,M){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===On)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const B=t.update(C),q=C.material;if(Array.isArray(q)){const Y=B.groups;for(let X=0,J=Y.length;X<J;X++){const G=Y[X],rt=q[G.materialIndex];if(rt&&rt.visible){const ft=T(C,rt,E,M);C.onBeforeShadow(r,C,R,D,B,ft,G),r.renderBufferDirect(D,null,B,ft,C,G),C.onAfterShadow(r,C,R,D,B,ft,G)}}}else if(q.visible){const Y=T(C,q,E,M);C.onBeforeShadow(r,C,R,D,B,Y,null),r.renderBufferDirect(D,null,B,Y,C,null),C.onAfterShadow(r,C,R,D,B,Y,null)}}const V=C.children;for(let B=0,q=V.length;B<q;B++)x(V[B],R,D,E,M)}function L(C){C.target.removeEventListener("dispose",L);for(const D in l){const E=l[D],M=C.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}const Eg={[Ga]:Wa,[Xa]:Ka,[qa]:Ya,[es]:ja,[Wa]:Ga,[Ka]:Xa,[Ya]:qa,[ja]:es};function Tg(r,t){function e(){let P=!1;const ct=new Zt;let W=null;const Z=new Zt(0,0,0,0);return{setMask:function(dt){W!==dt&&!P&&(r.colorMask(dt,dt,dt,dt),W=dt)},setLocked:function(dt){P=dt},setClear:function(dt,ht,Bt,_e,Ie){Ie===!0&&(dt*=_e,ht*=_e,Bt*=_e),ct.set(dt,ht,Bt,_e),Z.equals(ct)===!1&&(r.clearColor(dt,ht,Bt,_e),Z.copy(ct))},reset:function(){P=!1,W=null,Z.set(-1,0,0,0)}}}function n(){let P=!1,ct=!1,W=null,Z=null,dt=null;return{setReversed:function(ht){if(ct!==ht){const Bt=t.get("EXT_clip_control");ct?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT);const _e=dt;dt=null,this.setClear(_e)}ct=ht},getReversed:function(){return ct},setTest:function(ht){ht?at(r.DEPTH_TEST):It(r.DEPTH_TEST)},setMask:function(ht){W!==ht&&!P&&(r.depthMask(ht),W=ht)},setFunc:function(ht){if(ct&&(ht=Eg[ht]),Z!==ht){switch(ht){case Ga:r.depthFunc(r.NEVER);break;case Wa:r.depthFunc(r.ALWAYS);break;case Xa:r.depthFunc(r.LESS);break;case es:r.depthFunc(r.LEQUAL);break;case qa:r.depthFunc(r.EQUAL);break;case ja:r.depthFunc(r.GEQUAL);break;case Ka:r.depthFunc(r.GREATER);break;case Ya:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Z=ht}},setLocked:function(ht){P=ht},setClear:function(ht){dt!==ht&&(ct&&(ht=1-ht),r.clearDepth(ht),dt=ht)},reset:function(){P=!1,W=null,Z=null,dt=null,ct=!1}}}function i(){let P=!1,ct=null,W=null,Z=null,dt=null,ht=null,Bt=null,_e=null,Ie=null;return{setTest:function(ie){P||(ie?at(r.STENCIL_TEST):It(r.STENCIL_TEST))},setMask:function(ie){ct!==ie&&!P&&(r.stencilMask(ie),ct=ie)},setFunc:function(ie,on,Cn){(W!==ie||Z!==on||dt!==Cn)&&(r.stencilFunc(ie,on,Cn),W=ie,Z=on,dt=Cn)},setOp:function(ie,on,Cn){(ht!==ie||Bt!==on||_e!==Cn)&&(r.stencilOp(ie,on,Cn),ht=ie,Bt=on,_e=Cn)},setLocked:function(ie){P=ie},setClear:function(ie){Ie!==ie&&(r.clearStencil(ie),Ie=ie)},reset:function(){P=!1,ct=null,W=null,Z=null,dt=null,ht=null,Bt=null,_e=null,Ie=null}}}const s=new e,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,b=null,T=null,x=null,L=null,C=null,R=new Tt(0,0,0),D=0,E=!1,M=null,I=null,V=null,B=null,q=null;const Y=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,J=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=J>=1):G.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=J>=2);let rt=null,ft={};const St=r.getParameter(r.SCISSOR_BOX),Ht=r.getParameter(r.VIEWPORT),Jt=new Zt().fromArray(St),K=new Zt().fromArray(Ht);function nt(P,ct,W,Z){const dt=new Uint8Array(4),ht=r.createTexture();r.bindTexture(P,ht),r.texParameteri(P,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(P,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Bt=0;Bt<W;Bt++)P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY?r.texImage3D(ct,0,r.RGBA,1,1,Z,0,r.RGBA,r.UNSIGNED_BYTE,dt):r.texImage2D(ct+Bt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,dt);return ht}const _t={};_t[r.TEXTURE_2D]=nt(r.TEXTURE_2D,r.TEXTURE_2D,1),_t[r.TEXTURE_CUBE_MAP]=nt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[r.TEXTURE_2D_ARRAY]=nt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),_t[r.TEXTURE_3D]=nt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),at(r.DEPTH_TEST),a.setFunc(es),Gt(!1),Wt(Mc),at(r.CULL_FACE),U(li);function at(P){h[P]!==!0&&(r.enable(P),h[P]=!0)}function It(P){h[P]!==!1&&(r.disable(P),h[P]=!1)}function Nt(P,ct){return u[P]!==ct?(r.bindFramebuffer(P,ct),u[P]=ct,P===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ct),P===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ct),!0):!1}function Vt(P,ct){let W=p,Z=!1;if(P){W=d.get(ct),W===void 0&&(W=[],d.set(ct,W));const dt=P.textures;if(W.length!==dt.length||W[0]!==r.COLOR_ATTACHMENT0){for(let ht=0,Bt=dt.length;ht<Bt;ht++)W[ht]=r.COLOR_ATTACHMENT0+ht;W.length=dt.length,Z=!0}}else W[0]!==r.BACK&&(W[0]=r.BACK,Z=!0);Z&&r.drawBuffers(W)}function le(P){return g!==P?(r.useProgram(P),g=P,!0):!1}const qt={[ri]:r.FUNC_ADD,[Eu]:r.FUNC_SUBTRACT,[Tu]:r.FUNC_REVERSE_SUBTRACT};qt[wu]=r.MIN,qt[Au]=r.MAX;const fe={[gh]:r.ZERO,[Ru]:r.ONE,[Cu]:r.SRC_COLOR,[Va]:r.SRC_ALPHA,[Uu]:r.SRC_ALPHA_SATURATE,[Du]:r.DST_COLOR,[Pu]:r.DST_ALPHA,[Iu]:r.ONE_MINUS_SRC_COLOR,[Dr]:r.ONE_MINUS_SRC_ALPHA,[Nu]:r.ONE_MINUS_DST_COLOR,[Lu]:r.ONE_MINUS_DST_ALPHA,[Fu]:r.CONSTANT_COLOR,[ku]:r.ONE_MINUS_CONSTANT_COLOR,[Ou]:r.CONSTANT_ALPHA,[Bu]:r.ONE_MINUS_CONSTANT_ALPHA};function U(P,ct,W,Z,dt,ht,Bt,_e,Ie,ie){if(P===li){_===!0&&(It(r.BLEND),_=!1);return}if(_===!1&&(at(r.BLEND),_=!0),P!==mh){if(P!==m||ie!==E){if((f!==ri||x!==ri)&&(r.blendEquation(r.FUNC_ADD),f=ri,x=ri),ie)switch(P){case $i:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ts:r.blendFunc(r.ONE,r.ONE);break;case bc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Sc:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case $i:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ts:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case bc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Sc:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}b=null,T=null,L=null,C=null,R.set(0,0,0),D=0,m=P,E=ie}return}dt=dt||ct,ht=ht||W,Bt=Bt||Z,(ct!==f||dt!==x)&&(r.blendEquationSeparate(qt[ct],qt[dt]),f=ct,x=dt),(W!==b||Z!==T||ht!==L||Bt!==C)&&(r.blendFuncSeparate(fe[W],fe[Z],fe[ht],fe[Bt]),b=W,T=Z,L=ht,C=Bt),(_e.equals(R)===!1||Ie!==D)&&(r.blendColor(_e.r,_e.g,_e.b,Ie),R.copy(_e),D=Ie),m=P,E=!1}function Fe(P,ct){P.side===sn?It(r.CULL_FACE):at(r.CULL_FACE);let W=P.side===qe;ct&&(W=!W),Gt(W),P.blending===$i&&P.transparent===!1?U(li):U(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),s.setMask(P.colorWrite);const Z=P.stencilWrite;o.setTest(Z),Z&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),oe(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?at(r.SAMPLE_ALPHA_TO_COVERAGE):It(r.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(P){M!==P&&(P?r.frontFace(r.CW):r.frontFace(r.CCW),M=P)}function Wt(P){P!==Mu?(at(r.CULL_FACE),P!==I&&(P===Mc?r.cullFace(r.BACK):P===bu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):It(r.CULL_FACE),I=P}function Rt(P){P!==V&&(X&&r.lineWidth(P),V=P)}function oe(P,ct,W){P?(at(r.POLYGON_OFFSET_FILL),(B!==ct||q!==W)&&(r.polygonOffset(ct,W),B=ct,q=W)):It(r.POLYGON_OFFSET_FILL)}function wt(P){P?at(r.SCISSOR_TEST):It(r.SCISSOR_TEST)}function w(P){P===void 0&&(P=r.TEXTURE0+Y-1),rt!==P&&(r.activeTexture(P),rt=P)}function v(P,ct,W){W===void 0&&(rt===null?W=r.TEXTURE0+Y-1:W=rt);let Z=ft[W];Z===void 0&&(Z={type:void 0,texture:void 0},ft[W]=Z),(Z.type!==P||Z.texture!==ct)&&(rt!==W&&(r.activeTexture(W),rt=W),r.bindTexture(P,ct||_t[P]),Z.type=P,Z.texture=ct)}function O(){const P=ft[rt];P!==void 0&&P.type!==void 0&&(r.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function $(){try{r.compressedTexImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function vt(){try{r.texSubImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ot(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function pt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function jt(){try{r.texStorage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function et(){try{r.texStorage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function mt(){try{r.texImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ct(){try{r.texImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Lt(P){Jt.equals(P)===!1&&(r.scissor(P.x,P.y,P.z,P.w),Jt.copy(P))}function gt(P){K.equals(P)===!1&&(r.viewport(P.x,P.y,P.z,P.w),K.copy(P))}function k(P,ct){let W=l.get(ct);W===void 0&&(W=new WeakMap,l.set(ct,W));let Z=W.get(P);Z===void 0&&(Z=r.getUniformBlockIndex(ct,P.name),W.set(P,Z))}function lt(P,ct){const Z=l.get(ct).get(P);c.get(ct)!==Z&&(r.uniformBlockBinding(ct,Z,P.__bindingPointIndex),c.set(ct,Z))}function Dt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},rt=null,ft={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,b=null,T=null,x=null,L=null,C=null,R=new Tt(0,0,0),D=0,E=!1,M=null,I=null,V=null,B=null,q=null,Jt.set(0,0,r.canvas.width,r.canvas.height),K.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:at,disable:It,bindFramebuffer:Nt,drawBuffers:Vt,useProgram:le,setBlending:U,setMaterial:Fe,setFlipSided:Gt,setCullFace:Wt,setLineWidth:Rt,setPolygonOffset:oe,setScissorTest:wt,activeTexture:w,bindTexture:v,unbindTexture:O,compressedTexImage2D:$,compressedTexImage3D:Q,texImage2D:mt,texImage3D:Ct,updateUBOMapping:k,uniformBlockBinding:lt,texStorage2D:jt,texStorage3D:et,texSubImage2D:j,texSubImage3D:vt,compressedTexSubImage2D:ot,compressedTexSubImage3D:pt,scissor:Lt,viewport:gt,reset:Dt}}function xl(r,t,e,n){const i=wg(n);switch(e){case bh:return r*t;case Eh:return r*t;case Th:return r*t*2;case Ho:return r*t/i.components*i.byteLength;case Vo:return r*t/i.components*i.byteLength;case wh:return r*t*2/i.components*i.byteLength;case Go:return r*t*2/i.components*i.byteLength;case Sh:return r*t*3/i.components*i.byteLength;case rn:return r*t*4/i.components*i.byteLength;case Wo:return r*t*4/i.components*i.byteLength;case Ar:case Rr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Cr:case Ir:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Qa:case eo:return Math.max(r,16)*Math.max(t,8)/4;case Ja:case to:return Math.max(r,8)*Math.max(t,8)/2;case no:case io:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case so:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ro:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ao:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case oo:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case co:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case lo:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ho:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case uo:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case fo:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case po:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case mo:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case go:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case _o:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case xo:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case vo:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Pr:case yo:case Mo:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Ah:case bo:return Math.ceil(r/4)*Math.ceil(t/4)*8;case So:case Eo:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wg(r){switch(r){case qn:case vh:return{byteLength:1,components:1};case Os:case yh:case Gs:return{byteLength:2,components:1};case Bo:case zo:return{byteLength:2,components:4};case wi:case Oo:case xn:return{byteLength:4,components:1};case Mh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function Ag(r,t,e,n,i,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ut,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,v){return p?new OffscreenCanvas(w,v):Hs("canvas")}function _(w,v,O){let $=1;const Q=wt(w);if((Q.width>O||Q.height>O)&&($=O/Math.max(Q.width,Q.height)),$<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const j=Math.floor($*Q.width),vt=Math.floor($*Q.height);u===void 0&&(u=g(j,vt));const ot=v?g(j,vt):u;return ot.width=j,ot.height=vt,ot.getContext("2d").drawImage(w,0,0,j,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+vt+")."),ot}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function m(w){return w.generateMipmaps}function f(w){r.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?r.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function T(w,v,O,$,Q=!1){if(w!==null){if(r[w]!==void 0)return r[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let j=v;if(v===r.RED&&(O===r.FLOAT&&(j=r.R32F),O===r.HALF_FLOAT&&(j=r.R16F),O===r.UNSIGNED_BYTE&&(j=r.R8)),v===r.RED_INTEGER&&(O===r.UNSIGNED_BYTE&&(j=r.R8UI),O===r.UNSIGNED_SHORT&&(j=r.R16UI),O===r.UNSIGNED_INT&&(j=r.R32UI),O===r.BYTE&&(j=r.R8I),O===r.SHORT&&(j=r.R16I),O===r.INT&&(j=r.R32I)),v===r.RG&&(O===r.FLOAT&&(j=r.RG32F),O===r.HALF_FLOAT&&(j=r.RG16F),O===r.UNSIGNED_BYTE&&(j=r.RG8)),v===r.RG_INTEGER&&(O===r.UNSIGNED_BYTE&&(j=r.RG8UI),O===r.UNSIGNED_SHORT&&(j=r.RG16UI),O===r.UNSIGNED_INT&&(j=r.RG32UI),O===r.BYTE&&(j=r.RG8I),O===r.SHORT&&(j=r.RG16I),O===r.INT&&(j=r.RG32I)),v===r.RGB_INTEGER&&(O===r.UNSIGNED_BYTE&&(j=r.RGB8UI),O===r.UNSIGNED_SHORT&&(j=r.RGB16UI),O===r.UNSIGNED_INT&&(j=r.RGB32UI),O===r.BYTE&&(j=r.RGB8I),O===r.SHORT&&(j=r.RGB16I),O===r.INT&&(j=r.RGB32I)),v===r.RGBA_INTEGER&&(O===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),O===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),O===r.UNSIGNED_INT&&(j=r.RGBA32UI),O===r.BYTE&&(j=r.RGBA8I),O===r.SHORT&&(j=r.RGBA16I),O===r.INT&&(j=r.RGBA32I)),v===r.RGB&&O===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),v===r.RGBA){const vt=Q?Gr:Kt.getTransfer($);O===r.FLOAT&&(j=r.RGBA32F),O===r.HALF_FLOAT&&(j=r.RGBA16F),O===r.UNSIGNED_BYTE&&(j=vt===ce?r.SRGB8_ALPHA8:r.RGBA8),O===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),O===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(w,v){let O;return w?v===null||v===wi||v===rs?O=r.DEPTH24_STENCIL8:v===xn?O=r.DEPTH32F_STENCIL8:v===Os&&(O=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===wi||v===rs?O=r.DEPTH_COMPONENT24:v===xn?O=r.DEPTH_COMPONENT32F:v===Os&&(O=r.DEPTH_COMPONENT16),O}function L(w,v){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==He&&w.minFilter!==Xe?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function C(w){const v=w.target;v.removeEventListener("dispose",C),D(v),v.isVideoTexture&&h.delete(v)}function R(w){const v=w.target;v.removeEventListener("dispose",R),M(v)}function D(w){const v=n.get(w);if(v.__webglInit===void 0)return;const O=w.source,$=d.get(O);if($){const Q=$[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&E(w),Object.keys($).length===0&&d.delete(O)}n.remove(w)}function E(w){const v=n.get(w);r.deleteTexture(v.__webglTexture);const O=w.source,$=d.get(O);delete $[v.__cacheKey],a.memory.textures--}function M(w){const v=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(v.__webglFramebuffer[$]))for(let Q=0;Q<v.__webglFramebuffer[$].length;Q++)r.deleteFramebuffer(v.__webglFramebuffer[$][Q]);else r.deleteFramebuffer(v.__webglFramebuffer[$]);v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer[$])}else{if(Array.isArray(v.__webglFramebuffer))for(let $=0;$<v.__webglFramebuffer.length;$++)r.deleteFramebuffer(v.__webglFramebuffer[$]);else r.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&r.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let $=0;$<v.__webglColorRenderbuffer.length;$++)v.__webglColorRenderbuffer[$]&&r.deleteRenderbuffer(v.__webglColorRenderbuffer[$]);v.__webglDepthRenderbuffer&&r.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=w.textures;for(let $=0,Q=O.length;$<Q;$++){const j=n.get(O[$]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(O[$])}n.remove(w)}let I=0;function V(){I=0}function B(){const w=I;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),I+=1,w}function q(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function Y(w,v){const O=n.get(w);if(w.isVideoTexture&&Rt(w),w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){const $=w.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(O,w,v);return}}e.bindTexture(r.TEXTURE_2D,O.__webglTexture,r.TEXTURE0+v)}function X(w,v){const O=n.get(w);if(w.version>0&&O.__version!==w.version){K(O,w,v);return}e.bindTexture(r.TEXTURE_2D_ARRAY,O.__webglTexture,r.TEXTURE0+v)}function J(w,v){const O=n.get(w);if(w.version>0&&O.__version!==w.version){K(O,w,v);return}e.bindTexture(r.TEXTURE_3D,O.__webglTexture,r.TEXTURE0+v)}function G(w,v){const O=n.get(w);if(w.version>0&&O.__version!==w.version){nt(O,w,v);return}e.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+v)}const rt={[ss]:r.REPEAT,[oi]:r.CLAMP_TO_EDGE,[Nr]:r.MIRRORED_REPEAT},ft={[He]:r.NEAREST,[xh]:r.NEAREST_MIPMAP_NEAREST,[Is]:r.NEAREST_MIPMAP_LINEAR,[Xe]:r.LINEAR,[wr]:r.LINEAR_MIPMAP_NEAREST,[Hn]:r.LINEAR_MIPMAP_LINEAR},St={[nd]:r.NEVER,[cd]:r.ALWAYS,[id]:r.LESS,[Ch]:r.LEQUAL,[sd]:r.EQUAL,[od]:r.GEQUAL,[rd]:r.GREATER,[ad]:r.NOTEQUAL};function Ht(w,v){if(v.type===xn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Xe||v.magFilter===wr||v.magFilter===Is||v.magFilter===Hn||v.minFilter===Xe||v.minFilter===wr||v.minFilter===Is||v.minFilter===Hn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(w,r.TEXTURE_WRAP_S,rt[v.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,rt[v.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,rt[v.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,ft[v.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,ft[v.minFilter]),v.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,St[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===He||v.minFilter!==Is&&v.minFilter!==Hn||v.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");r.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Jt(w,v){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",C));const $=v.source;let Q=d.get($);Q===void 0&&(Q={},d.set($,Q));const j=q(v);if(j!==w.__cacheKey){Q[j]===void 0&&(Q[j]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Q[j].usedTimes++;const vt=Q[w.__cacheKey];vt!==void 0&&(Q[w.__cacheKey].usedTimes--,vt.usedTimes===0&&E(v)),w.__cacheKey=j,w.__webglTexture=Q[j].texture}return O}function K(w,v,O){let $=r.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&($=r.TEXTURE_2D_ARRAY),v.isData3DTexture&&($=r.TEXTURE_3D);const Q=Jt(w,v),j=v.source;e.bindTexture($,w.__webglTexture,r.TEXTURE0+O);const vt=n.get(j);if(j.version!==vt.__version||Q===!0){e.activeTexture(r.TEXTURE0+O);const ot=Kt.getPrimaries(Kt.workingColorSpace),pt=v.colorSpace===mn?null:Kt.getPrimaries(v.colorSpace),jt=v.colorSpace===mn||ot===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let et=_(v.image,!1,i.maxTextureSize);et=oe(v,et);const mt=s.convert(v.format,v.colorSpace),Ct=s.convert(v.type);let Lt=T(v.internalFormat,mt,Ct,v.colorSpace,v.isVideoTexture);Ht($,v);let gt;const k=v.mipmaps,lt=v.isVideoTexture!==!0,Dt=vt.__version===void 0||Q===!0,P=j.dataReady,ct=L(v,et);if(v.isDepthTexture)Lt=x(v.format===as,v.type),Dt&&(lt?e.texStorage2D(r.TEXTURE_2D,1,Lt,et.width,et.height):e.texImage2D(r.TEXTURE_2D,0,Lt,et.width,et.height,0,mt,Ct,null));else if(v.isDataTexture)if(k.length>0){lt&&Dt&&e.texStorage2D(r.TEXTURE_2D,ct,Lt,k[0].width,k[0].height);for(let W=0,Z=k.length;W<Z;W++)gt=k[W],lt?P&&e.texSubImage2D(r.TEXTURE_2D,W,0,0,gt.width,gt.height,mt,Ct,gt.data):e.texImage2D(r.TEXTURE_2D,W,Lt,gt.width,gt.height,0,mt,Ct,gt.data);v.generateMipmaps=!1}else lt?(Dt&&e.texStorage2D(r.TEXTURE_2D,ct,Lt,et.width,et.height),P&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,et.width,et.height,mt,Ct,et.data)):e.texImage2D(r.TEXTURE_2D,0,Lt,et.width,et.height,0,mt,Ct,et.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){lt&&Dt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ct,Lt,k[0].width,k[0].height,et.depth);for(let W=0,Z=k.length;W<Z;W++)if(gt=k[W],v.format!==rn)if(mt!==null)if(lt){if(P)if(v.layerUpdates.size>0){const dt=xl(gt.width,gt.height,v.format,v.type);for(const ht of v.layerUpdates){const Bt=gt.data.subarray(ht*dt/gt.data.BYTES_PER_ELEMENT,(ht+1)*dt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,ht,gt.width,gt.height,1,mt,Bt)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,gt.width,gt.height,et.depth,mt,gt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,W,Lt,gt.width,gt.height,et.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else lt?P&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,gt.width,gt.height,et.depth,mt,Ct,gt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,W,Lt,gt.width,gt.height,et.depth,0,mt,Ct,gt.data)}else{lt&&Dt&&e.texStorage2D(r.TEXTURE_2D,ct,Lt,k[0].width,k[0].height);for(let W=0,Z=k.length;W<Z;W++)gt=k[W],v.format!==rn?mt!==null?lt?P&&e.compressedTexSubImage2D(r.TEXTURE_2D,W,0,0,gt.width,gt.height,mt,gt.data):e.compressedTexImage2D(r.TEXTURE_2D,W,Lt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):lt?P&&e.texSubImage2D(r.TEXTURE_2D,W,0,0,gt.width,gt.height,mt,Ct,gt.data):e.texImage2D(r.TEXTURE_2D,W,Lt,gt.width,gt.height,0,mt,Ct,gt.data)}else if(v.isDataArrayTexture)if(lt){if(Dt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ct,Lt,et.width,et.height,et.depth),P)if(v.layerUpdates.size>0){const W=xl(et.width,et.height,v.format,v.type);for(const Z of v.layerUpdates){const dt=et.data.subarray(Z*W/et.data.BYTES_PER_ELEMENT,(Z+1)*W/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Z,et.width,et.height,1,mt,Ct,dt)}v.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,mt,Ct,et.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Lt,et.width,et.height,et.depth,0,mt,Ct,et.data);else if(v.isData3DTexture)lt?(Dt&&e.texStorage3D(r.TEXTURE_3D,ct,Lt,et.width,et.height,et.depth),P&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,mt,Ct,et.data)):e.texImage3D(r.TEXTURE_3D,0,Lt,et.width,et.height,et.depth,0,mt,Ct,et.data);else if(v.isFramebufferTexture){if(Dt)if(lt)e.texStorage2D(r.TEXTURE_2D,ct,Lt,et.width,et.height);else{let W=et.width,Z=et.height;for(let dt=0;dt<ct;dt++)e.texImage2D(r.TEXTURE_2D,dt,Lt,W,Z,0,mt,Ct,null),W>>=1,Z>>=1}}else if(k.length>0){if(lt&&Dt){const W=wt(k[0]);e.texStorage2D(r.TEXTURE_2D,ct,Lt,W.width,W.height)}for(let W=0,Z=k.length;W<Z;W++)gt=k[W],lt?P&&e.texSubImage2D(r.TEXTURE_2D,W,0,0,mt,Ct,gt):e.texImage2D(r.TEXTURE_2D,W,Lt,mt,Ct,gt);v.generateMipmaps=!1}else if(lt){if(Dt){const W=wt(et);e.texStorage2D(r.TEXTURE_2D,ct,Lt,W.width,W.height)}P&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,mt,Ct,et)}else e.texImage2D(r.TEXTURE_2D,0,Lt,mt,Ct,et);m(v)&&f($),vt.__version=j.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function nt(w,v,O){if(v.image.length!==6)return;const $=Jt(w,v),Q=v.source;e.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+O);const j=n.get(Q);if(Q.version!==j.__version||$===!0){e.activeTexture(r.TEXTURE0+O);const vt=Kt.getPrimaries(Kt.workingColorSpace),ot=v.colorSpace===mn?null:Kt.getPrimaries(v.colorSpace),pt=v.colorSpace===mn||vt===ot?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const jt=v.isCompressedTexture||v.image[0].isCompressedTexture,et=v.image[0]&&v.image[0].isDataTexture,mt=[];for(let Z=0;Z<6;Z++)!jt&&!et?mt[Z]=_(v.image[Z],!0,i.maxCubemapSize):mt[Z]=et?v.image[Z].image:v.image[Z],mt[Z]=oe(v,mt[Z]);const Ct=mt[0],Lt=s.convert(v.format,v.colorSpace),gt=s.convert(v.type),k=T(v.internalFormat,Lt,gt,v.colorSpace),lt=v.isVideoTexture!==!0,Dt=j.__version===void 0||$===!0,P=Q.dataReady;let ct=L(v,Ct);Ht(r.TEXTURE_CUBE_MAP,v);let W;if(jt){lt&&Dt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ct,k,Ct.width,Ct.height);for(let Z=0;Z<6;Z++){W=mt[Z].mipmaps;for(let dt=0;dt<W.length;dt++){const ht=W[dt];v.format!==rn?Lt!==null?lt?P&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,0,0,ht.width,ht.height,Lt,ht.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,k,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):lt?P&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,0,0,ht.width,ht.height,Lt,gt,ht.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt,k,ht.width,ht.height,0,Lt,gt,ht.data)}}}else{if(W=v.mipmaps,lt&&Dt){W.length>0&&ct++;const Z=wt(mt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ct,k,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(et){lt?P&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,mt[Z].width,mt[Z].height,Lt,gt,mt[Z].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,k,mt[Z].width,mt[Z].height,0,Lt,gt,mt[Z].data);for(let dt=0;dt<W.length;dt++){const Bt=W[dt].image[Z].image;lt?P&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,0,0,Bt.width,Bt.height,Lt,gt,Bt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,k,Bt.width,Bt.height,0,Lt,gt,Bt.data)}}else{lt?P&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Lt,gt,mt[Z]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,k,Lt,gt,mt[Z]);for(let dt=0;dt<W.length;dt++){const ht=W[dt];lt?P&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,0,0,Lt,gt,ht.image[Z]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,dt+1,k,Lt,gt,ht.image[Z])}}}m(v)&&f(r.TEXTURE_CUBE_MAP),j.__version=Q.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function _t(w,v,O,$,Q,j){const vt=s.convert(O.format,O.colorSpace),ot=s.convert(O.type),pt=T(O.internalFormat,vt,ot,O.colorSpace),jt=n.get(v),et=n.get(O);if(et.__renderTarget=v,!jt.__hasExternalTextures){const mt=Math.max(1,v.width>>j),Ct=Math.max(1,v.height>>j);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?e.texImage3D(Q,j,pt,mt,Ct,v.depth,0,vt,ot,null):e.texImage2D(Q,j,pt,mt,Ct,0,vt,ot,null)}e.bindFramebuffer(r.FRAMEBUFFER,w),Wt(v)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,$,Q,et.__webglTexture,0,Gt(v)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,$,Q,et.__webglTexture,j),e.bindFramebuffer(r.FRAMEBUFFER,null)}function at(w,v,O){if(r.bindRenderbuffer(r.RENDERBUFFER,w),v.depthBuffer){const $=v.depthTexture,Q=$&&$.isDepthTexture?$.type:null,j=x(v.stencilBuffer,Q),vt=v.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ot=Gt(v);Wt(v)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ot,j,v.width,v.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,ot,j,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,j,v.width,v.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,w)}else{const $=v.textures;for(let Q=0;Q<$.length;Q++){const j=$[Q],vt=s.convert(j.format,j.colorSpace),ot=s.convert(j.type),pt=T(j.internalFormat,vt,ot,j.colorSpace),jt=Gt(v);O&&Wt(v)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,jt,pt,v.width,v.height):Wt(v)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,jt,pt,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,pt,v.width,v.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function It(w,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(v.depthTexture);$.__renderTarget=v,(!$.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),Y(v.depthTexture,0);const Q=$.__webglTexture,j=Gt(v);if(v.depthTexture.format===Zi)Wt(v)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(v.depthTexture.format===as)Wt(v)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Nt(w){const v=n.get(w),O=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const $=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),$){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,$.removeEventListener("dispose",Q)};$.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=$}if(w.depthTexture&&!v.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");It(v.__webglFramebuffer,w)}else if(O){v.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer[$]),v.__webglDepthbuffer[$]===void 0)v.__webglDepthbuffer[$]=r.createRenderbuffer(),at(v.__webglDepthbuffer[$],w,!1);else{const Q=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer[$];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,j)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=r.createRenderbuffer(),at(v.__webglDepthbuffer,w,!1);else{const $=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=v.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,Q)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Vt(w,v,O){const $=n.get(w);v!==void 0&&_t($.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),O!==void 0&&Nt(w)}function le(w){const v=w.texture,O=n.get(w),$=n.get(v);w.addEventListener("dispose",R);const Q=w.textures,j=w.isWebGLCubeRenderTarget===!0,vt=Q.length>1;if(vt||($.__webglTexture===void 0&&($.__webglTexture=r.createTexture()),$.__version=v.version,a.memory.textures++),j){O.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[ot]=[];for(let pt=0;pt<v.mipmaps.length;pt++)O.__webglFramebuffer[ot][pt]=r.createFramebuffer()}else O.__webglFramebuffer[ot]=r.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let ot=0;ot<v.mipmaps.length;ot++)O.__webglFramebuffer[ot]=r.createFramebuffer()}else O.__webglFramebuffer=r.createFramebuffer();if(vt)for(let ot=0,pt=Q.length;ot<pt;ot++){const jt=n.get(Q[ot]);jt.__webglTexture===void 0&&(jt.__webglTexture=r.createTexture(),a.memory.textures++)}if(w.samples>0&&Wt(w)===!1){O.__webglMultisampledFramebuffer=r.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ot=0;ot<Q.length;ot++){const pt=Q[ot];O.__webglColorRenderbuffer[ot]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,O.__webglColorRenderbuffer[ot]);const jt=s.convert(pt.format,pt.colorSpace),et=s.convert(pt.type),mt=T(pt.internalFormat,jt,et,pt.colorSpace,w.isXRRenderTarget===!0),Ct=Gt(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ct,mt,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ot,r.RENDERBUFFER,O.__webglColorRenderbuffer[ot])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=r.createRenderbuffer(),at(O.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){e.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture),Ht(r.TEXTURE_CUBE_MAP,v);for(let ot=0;ot<6;ot++)if(v.mipmaps&&v.mipmaps.length>0)for(let pt=0;pt<v.mipmaps.length;pt++)_t(O.__webglFramebuffer[ot][pt],w,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,pt);else _t(O.__webglFramebuffer[ot],w,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(v)&&f(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let ot=0,pt=Q.length;ot<pt;ot++){const jt=Q[ot],et=n.get(jt);e.bindTexture(r.TEXTURE_2D,et.__webglTexture),Ht(r.TEXTURE_2D,jt),_t(O.__webglFramebuffer,w,jt,r.COLOR_ATTACHMENT0+ot,r.TEXTURE_2D,0),m(jt)&&f(r.TEXTURE_2D)}e.unbindTexture()}else{let ot=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ot=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ot,$.__webglTexture),Ht(ot,v),v.mipmaps&&v.mipmaps.length>0)for(let pt=0;pt<v.mipmaps.length;pt++)_t(O.__webglFramebuffer[pt],w,v,r.COLOR_ATTACHMENT0,ot,pt);else _t(O.__webglFramebuffer,w,v,r.COLOR_ATTACHMENT0,ot,0);m(v)&&f(ot),e.unbindTexture()}w.depthBuffer&&Nt(w)}function qt(w){const v=w.textures;for(let O=0,$=v.length;O<$;O++){const Q=v[O];if(m(Q)){const j=b(w),vt=n.get(Q).__webglTexture;e.bindTexture(j,vt),f(j),e.unbindTexture()}}}const fe=[],U=[];function Fe(w){if(w.samples>0){if(Wt(w)===!1){const v=w.textures,O=w.width,$=w.height;let Q=r.COLOR_BUFFER_BIT;const j=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,vt=n.get(w),ot=v.length>1;if(ot)for(let pt=0;pt<v.length;pt++)e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let pt=0;pt<v.length;pt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),ot){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,vt.__webglColorRenderbuffer[pt]);const jt=n.get(v[pt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,jt,0)}r.blitFramebuffer(0,0,O,$,0,0,O,$,Q,r.NEAREST),c===!0&&(fe.length=0,U.length=0,fe.push(r.COLOR_ATTACHMENT0+pt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(fe.push(j),U.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,U)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ot)for(let pt=0;pt<v.length;pt++){e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.RENDERBUFFER,vt.__webglColorRenderbuffer[pt]);const jt=n.get(v[pt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+pt,r.TEXTURE_2D,jt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const v=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[v])}}}function Gt(w){return Math.min(i.maxSamples,w.samples)}function Wt(w){const v=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Rt(w){const v=a.render.frame;h.get(w)!==v&&(h.set(w,v),w.update())}function oe(w,v){const O=w.colorSpace,$=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==Ce&&O!==mn&&(Kt.getTransfer(O)===ce?($!==rn||Q!==qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),v}function wt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=V,this.setTexture2D=Y,this.setTexture2DArray=X,this.setTexture3D=J,this.setTextureCube=G,this.rebindTextures=Vt,this.setupRenderTarget=le,this.updateRenderTargetMipmap=qt,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Wt}function Rg(r,t){function e(n,i=mn){let s;const a=Kt.getTransfer(i);if(n===qn)return r.UNSIGNED_BYTE;if(n===Bo)return r.UNSIGNED_SHORT_4_4_4_4;if(n===zo)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Mh)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===vh)return r.BYTE;if(n===yh)return r.SHORT;if(n===Os)return r.UNSIGNED_SHORT;if(n===Oo)return r.INT;if(n===wi)return r.UNSIGNED_INT;if(n===xn)return r.FLOAT;if(n===Gs)return r.HALF_FLOAT;if(n===bh)return r.ALPHA;if(n===Sh)return r.RGB;if(n===rn)return r.RGBA;if(n===Eh)return r.LUMINANCE;if(n===Th)return r.LUMINANCE_ALPHA;if(n===Zi)return r.DEPTH_COMPONENT;if(n===as)return r.DEPTH_STENCIL;if(n===Ho)return r.RED;if(n===Vo)return r.RED_INTEGER;if(n===wh)return r.RG;if(n===Go)return r.RG_INTEGER;if(n===Wo)return r.RGBA_INTEGER;if(n===Ar||n===Rr||n===Cr||n===Ir)if(a===ce)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ar)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Cr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ir)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ar)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Cr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ir)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ja||n===Qa||n===to||n===eo)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ja)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===eo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===no||n===io||n===so)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===no||n===io)return a===ce?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===so)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ro||n===ao||n===oo||n===co||n===lo||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===_o||n===xo||n===vo)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ro)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ao)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oo)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===co)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===lo)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ho)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uo)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fo)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===po)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mo)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===go)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_o)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xo)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vo)return a===ce?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Pr||n===yo||n===Mo)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Pr)return a===ce?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Mo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ah||n===bo||n===So||n===Eo)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Pr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===bo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===So)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Eo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class Cg extends Ae{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ze extends pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ig={type:"move"};class Sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ig)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Pg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Dg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Te,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new di({vertexShader:Pg,fragmentShader:Lg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Re(new Wr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ng extends Ri{constructor(t,e){super();const n=this;let i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null;const _=new Dg,m=e.getContextAttributes();let f=null,b=null;const T=[],x=[],L=new Ut;let C=null;const R=new Ae;R.viewport=new Zt;const D=new Ae;D.viewport=new Zt;const E=[R,D],M=new Cg;let I=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let nt=T[K];return nt===void 0&&(nt=new Sa,T[K]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(K){let nt=T[K];return nt===void 0&&(nt=new Sa,T[K]=nt),nt.getGripSpace()},this.getHand=function(K){let nt=T[K];return nt===void 0&&(nt=new Sa,T[K]=nt),nt.getHandSpace()};function B(K){const nt=x.indexOf(K.inputSource);if(nt===-1)return;const _t=T[nt];_t!==void 0&&(_t.update(K.inputSource,K.frame,l||a),_t.dispatchEvent({type:K.type,data:K.inputSource}))}function q(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",Y);for(let K=0;K<T.length;K++){const nt=x[K];nt!==null&&(x[K]=null,T[K].disconnect(nt))}I=null,V=null,_.reset(),t.setRenderTarget(f),p=null,d=null,u=null,i=null,b=null,Jt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(K){l=K},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(f=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",q),i.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(L),i.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,e,nt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Ai(p.framebufferWidth,p.framebufferHeight,{format:rn,type:qn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,_t=null,at=null;m.depth&&(at=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?as:Zi,_t=m.stencil?rs:wi);const It={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(It),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new Ai(d.textureWidth,d.textureHeight,{format:rn,type:qn,depthTexture:new zh(d.textureWidth,d.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Jt.setContext(i),Jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Y(K){for(let nt=0;nt<K.removed.length;nt++){const _t=K.removed[nt],at=x.indexOf(_t);at>=0&&(x[at]=null,T[at].disconnect(_t))}for(let nt=0;nt<K.added.length;nt++){const _t=K.added[nt];let at=x.indexOf(_t);if(at===-1){for(let Nt=0;Nt<T.length;Nt++)if(Nt>=x.length){x.push(_t),at=Nt;break}else if(x[Nt]===null){x[Nt]=_t,at=Nt;break}if(at===-1)break}const It=T[at];It&&It.connect(_t)}}const X=new A,J=new A;function G(K,nt,_t){X.setFromMatrixPosition(nt.matrixWorld),J.setFromMatrixPosition(_t.matrixWorld);const at=X.distanceTo(J),It=nt.projectionMatrix.elements,Nt=_t.projectionMatrix.elements,Vt=It[14]/(It[10]-1),le=It[14]/(It[10]+1),qt=(It[9]+1)/It[5],fe=(It[9]-1)/It[5],U=(It[8]-1)/It[0],Fe=(Nt[8]+1)/Nt[0],Gt=Vt*U,Wt=Vt*Fe,Rt=at/(-U+Fe),oe=Rt*-U;if(nt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(oe),K.translateZ(Rt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),It[10]===-1)K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const wt=Vt+Rt,w=le+Rt,v=Gt-oe,O=Wt+(at-oe),$=qt*le/w*wt,Q=fe*le/w*wt;K.projectionMatrix.makePerspective(v,O,$,Q,wt,w),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function rt(K,nt){nt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(nt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;let nt=K.near,_t=K.far;_.texture!==null&&(_.depthNear>0&&(nt=_.depthNear),_.depthFar>0&&(_t=_.depthFar)),M.near=D.near=R.near=nt,M.far=D.far=R.far=_t,(I!==M.near||V!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,V=M.far),R.layers.mask=K.layers.mask|2,D.layers.mask=K.layers.mask|4,M.layers.mask=R.layers.mask|D.layers.mask;const at=K.parent,It=M.cameras;rt(M,at);for(let Nt=0;Nt<It.length;Nt++)rt(It[Nt],at);It.length===2?G(M,R,D):M.projectionMatrix.copy(R.projectionMatrix),ft(K,M,at)};function ft(K,nt,_t){_t===null?K.matrix.copy(nt.matrixWorld):(K.matrix.copy(_t.matrixWorld),K.matrix.invert(),K.matrix.multiply(nt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(nt.projectionMatrix),K.projectionMatrixInverse.copy(nt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=os*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(K){c=K,d!==null&&(d.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let St=null;function Ht(K,nt){if(h=nt.getViewerPose(l||a),g=nt,h!==null){const _t=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let at=!1;_t.length!==M.cameras.length&&(M.cameras.length=0,at=!0);for(let Nt=0;Nt<_t.length;Nt++){const Vt=_t[Nt];let le=null;if(p!==null)le=p.getViewport(Vt);else{const fe=u.getViewSubImage(d,Vt);le=fe.viewport,Nt===0&&(t.setRenderTargetTextures(b,fe.colorTexture,d.ignoreDepthValues?void 0:fe.depthStencilTexture),t.setRenderTarget(b))}let qt=E[Nt];qt===void 0&&(qt=new Ae,qt.layers.enable(Nt),qt.viewport=new Zt,E[Nt]=qt),qt.matrix.fromArray(Vt.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(Vt.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(le.x,le.y,le.width,le.height),Nt===0&&(M.matrix.copy(qt.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),at===!0&&M.cameras.push(qt)}const It=i.enabledFeatures;if(It&&It.includes("depth-sensing")){const Nt=u.getDepthInformation(_t[0]);Nt&&Nt.isValid&&Nt.texture&&_.init(t,Nt,i.renderState)}}for(let _t=0;_t<T.length;_t++){const at=x[_t],It=T[_t];at!==null&&It!==void 0&&It.update(at,nt,l||a)}St&&St(K,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const Jt=new Bh;Jt.setAnimationLoop(Ht),this.setAnimationLoop=function(K){St=K},this.dispose=function(){}}}const vi=new Ve,Ug=new Pt;function Fg(r,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Fh(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,b,T,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,b,T):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===qe&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===qe&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const b=t.get(f),T=b.envMap,x=b.envMapRotation;T&&(m.envMap.value=T,vi.copy(x),vi.x*=-1,vi.y*=-1,vi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),m.envMapRotation.value.setFromMatrix4(Ug.makeRotationFromEuler(vi)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,b,T){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=T*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===qe&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const b=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function kg(r,t,e,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,T){const x=T.program;n.uniformBlockBinding(b,x)}function l(b,T){let x=i[b.id];x===void 0&&(g(b),x=h(b),i[b.id]=x,b.addEventListener("dispose",m));const L=T.program;n.updateUBOMapping(b,L);const C=t.render.frame;s[b.id]!==C&&(d(b),s[b.id]=C)}function h(b){const T=u();b.__bindingPointIndex=T;const x=r.createBuffer(),L=b.__size,C=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,L,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,T,x),x}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const T=i[b.id],x=b.uniforms,L=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,T);for(let C=0,R=x.length;C<R;C++){const D=Array.isArray(x[C])?x[C]:[x[C]];for(let E=0,M=D.length;E<M;E++){const I=D[E];if(p(I,C,E,L)===!0){const V=I.__offset,B=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let Y=0;Y<B.length;Y++){const X=B[Y],J=_(X);typeof X=="number"||typeof X=="boolean"?(I.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,V+q,I.__data)):X.isMatrix3?(I.__data[0]=X.elements[0],I.__data[1]=X.elements[1],I.__data[2]=X.elements[2],I.__data[3]=0,I.__data[4]=X.elements[3],I.__data[5]=X.elements[4],I.__data[6]=X.elements[5],I.__data[7]=0,I.__data[8]=X.elements[6],I.__data[9]=X.elements[7],I.__data[10]=X.elements[8],I.__data[11]=0):(X.toArray(I.__data,q),q+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,V,I.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(b,T,x,L){const C=b.value,R=T+"_"+x;if(L[R]===void 0)return typeof C=="number"||typeof C=="boolean"?L[R]=C:L[R]=C.clone(),!0;{const D=L[R];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return L[R]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function g(b){const T=b.uniforms;let x=0;const L=16;for(let R=0,D=T.length;R<D;R++){const E=Array.isArray(T[R])?T[R]:[T[R]];for(let M=0,I=E.length;M<I;M++){const V=E[M],B=Array.isArray(V.value)?V.value:[V.value];for(let q=0,Y=B.length;q<Y;q++){const X=B[q],J=_(X),G=x%L,rt=G%J.boundary,ft=G+rt;x+=rt,ft!==0&&L-ft<J.storage&&(x+=L-ft),V.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=x,x+=J.storage}}}const C=x%L;return C>0&&(x+=L-C),b.__size=x,b.__cache={},this}function _(b){const T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),T}function m(b){const T=b.target;T.removeEventListener("dispose",m);const x=a.indexOf(T.__bindingPointIndex);a.splice(x,1),r.deleteBuffer(i[T.id]),delete i[T.id],delete s[T.id]}function f(){for(const b in i)r.deleteBuffer(i[b]);a=[],i={},s={}}return{bind:c,update:l,dispose:f}}class Xh{constructor(t={}){const{canvas:e=Td(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const b=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=we,this.toneMapping=hi,this.toneMappingExposure=1;const x=this;let L=!1,C=0,R=0,D=null,E=-1,M=null;const I=new Zt,V=new Zt;let B=null;const q=new Tt(0);let Y=0,X=e.width,J=e.height,G=1,rt=null,ft=null;const St=new Zt(0,0,X,J),Ht=new Zt(0,0,X,J);let Jt=!1;const K=new $o;let nt=!1,_t=!1;const at=new Pt,It=new Pt,Nt=new A,Vt=new Zt,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qt=!1;function fe(){return D===null?G:1}let U=n;function Fe(y,N){return e.getContext(y,N)}try{const y={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Fo}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),U===null){const N="webgl2";if(U=Fe(N,y),U===null)throw Fe(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Gt,Wt,Rt,oe,wt,w,v,O,$,Q,j,vt,ot,pt,jt,et,mt,Ct,Lt,gt,k,lt,Dt,P;function ct(){Gt=new Gm(U),Gt.init(),lt=new Rg(U,Gt),Wt=new km(U,Gt,t,lt),Rt=new Tg(U,Gt),Wt.reverseDepthBuffer&&d&&Rt.buffers.depth.setReversed(!0),oe=new qm(U),wt=new hg,w=new Ag(U,Gt,Rt,wt,Wt,lt,oe),v=new Bm(x),O=new Vm(x),$=new Jd(U),Dt=new Um(U,$),Q=new Wm(U,$,oe,Dt),j=new Km(U,Q,$,oe),Lt=new jm(U,Wt,w),et=new Om(wt),vt=new lg(x,v,O,Gt,Wt,Dt,et),ot=new Fg(x,wt),pt=new dg,jt=new xg(Gt),Ct=new Nm(x,v,O,Rt,j,p,c),mt=new Sg(x,j,Wt),P=new kg(U,oe,Wt,Rt),gt=new Fm(U,Gt,oe),k=new Xm(U,Gt,oe),oe.programs=vt.programs,x.capabilities=Wt,x.extensions=Gt,x.properties=wt,x.renderLists=pt,x.shadowMap=mt,x.state=Rt,x.info=oe}ct();const W=new Ng(x,U);this.xr=W,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const y=Gt.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Gt.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(y){y!==void 0&&(G=y,this.setSize(X,J,!1))},this.getSize=function(y){return y.set(X,J)},this.setSize=function(y,N,z=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,J=N,e.width=Math.floor(y*G),e.height=Math.floor(N*G),z===!0&&(e.style.width=y+"px",e.style.height=N+"px"),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(X*G,J*G).floor()},this.setDrawingBufferSize=function(y,N,z){X=y,J=N,G=z,e.width=Math.floor(y*z),e.height=Math.floor(N*z),this.setViewport(0,0,y,N)},this.getCurrentViewport=function(y){return y.copy(I)},this.getViewport=function(y){return y.copy(St)},this.setViewport=function(y,N,z,H){y.isVector4?St.set(y.x,y.y,y.z,y.w):St.set(y,N,z,H),Rt.viewport(I.copy(St).multiplyScalar(G).round())},this.getScissor=function(y){return y.copy(Ht)},this.setScissor=function(y,N,z,H){y.isVector4?Ht.set(y.x,y.y,y.z,y.w):Ht.set(y,N,z,H),Rt.scissor(V.copy(Ht).multiplyScalar(G).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(y){Rt.setScissorTest(Jt=y)},this.setOpaqueSort=function(y){rt=y},this.setTransparentSort=function(y){ft=y},this.getClearColor=function(y){return y.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor.apply(Ct,arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha.apply(Ct,arguments)},this.clear=function(y=!0,N=!0,z=!0){let H=0;if(y){let F=!1;if(D!==null){const it=D.texture.format;F=it===Wo||it===Go||it===Vo}if(F){const it=D.texture.type,ut=it===qn||it===wi||it===Os||it===rs||it===Bo||it===zo,yt=Ct.getClearColor(),Mt=Ct.getClearAlpha(),Ft=yt.r,zt=yt.g,bt=yt.b;ut?(g[0]=Ft,g[1]=zt,g[2]=bt,g[3]=Mt,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=Ft,_[1]=zt,_[2]=bt,_[3]=Mt,U.clearBufferiv(U.COLOR,0,_))}else H|=U.COLOR_BUFFER_BIT}N&&(H|=U.DEPTH_BUFFER_BIT),z&&(H|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),pt.dispose(),jt.dispose(),wt.dispose(),v.dispose(),O.dispose(),j.dispose(),Dt.dispose(),P.dispose(),vt.dispose(),W.dispose(),W.removeEventListener("sessionstart",dc),W.removeEventListener("sessionend",fc),fi.stop()};function Z(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const y=oe.autoReset,N=mt.enabled,z=mt.autoUpdate,H=mt.needsUpdate,F=mt.type;ct(),oe.autoReset=y,mt.enabled=N,mt.autoUpdate=z,mt.needsUpdate=H,mt.type=F}function ht(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Bt(y){const N=y.target;N.removeEventListener("dispose",Bt),_e(N)}function _e(y){Ie(y),wt.remove(y)}function Ie(y){const N=wt.get(y).programs;N!==void 0&&(N.forEach(function(z){vt.releaseProgram(z)}),y.isShaderMaterial&&vt.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,z,H,F,it){N===null&&(N=le);const ut=F.isMesh&&F.matrixWorld.determinant()<0,yt=hu(y,N,z,H,F);Rt.setMaterial(H,ut);let Mt=z.index,Ft=1;if(H.wireframe===!0){if(Mt=Q.getWireframeAttribute(z),Mt===void 0)return;Ft=2}const zt=z.drawRange,bt=z.attributes.position;let Yt=zt.start*Ft,he=(zt.start+zt.count)*Ft;it!==null&&(Yt=Math.max(Yt,it.start*Ft),he=Math.min(he,(it.start+it.count)*Ft)),Mt!==null?(Yt=Math.max(Yt,0),he=Math.min(he,Mt.count)):bt!=null&&(Yt=Math.max(Yt,0),he=Math.min(he,bt.count));const ue=he-Yt;if(ue<0||ue===1/0)return;Dt.setup(F,H,yt,z,Mt);let We,Qt=gt;if(Mt!==null&&(We=$.get(Mt),Qt=k,Qt.setIndex(We)),F.isMesh)H.wireframe===!0?(Rt.setLineWidth(H.wireframeLinewidth*fe()),Qt.setMode(U.LINES)):Qt.setMode(U.TRIANGLES);else if(F.isLine){let Et=H.linewidth;Et===void 0&&(Et=1),Rt.setLineWidth(Et*fe()),F.isLineSegments?Qt.setMode(U.LINES):F.isLineLoop?Qt.setMode(U.LINE_LOOP):Qt.setMode(U.LINE_STRIP)}else F.isPoints?Qt.setMode(U.POINTS):F.isSprite&&Qt.setMode(U.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Qt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Gt.get("WEBGL_multi_draw"))Qt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Et=F._multiDrawStarts,In=F._multiDrawCounts,te=F._multiDrawCount,cn=Mt?$.get(Mt).bytesPerElement:1,Ci=wt.get(H).currentProgram.getUniforms();for(let Ye=0;Ye<te;Ye++)Ci.setValue(U,"_gl_DrawID",Ye),Qt.render(Et[Ye]/cn,In[Ye])}else if(F.isInstancedMesh)Qt.renderInstances(Yt,ue,F.count);else if(z.isInstancedBufferGeometry){const Et=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,In=Math.min(z.instanceCount,Et);Qt.renderInstances(Yt,ue,In)}else Qt.render(Yt,ue)};function ie(y,N,z){y.transparent===!0&&y.side===sn&&y.forceSinglePass===!1?(y.side=qe,y.needsUpdate=!0,Ys(y,N,z),y.side=Xn,y.needsUpdate=!0,Ys(y,N,z),y.side=sn):Ys(y,N,z)}this.compile=function(y,N,z=null){z===null&&(z=y),f=jt.get(z),f.init(N),T.push(f),z.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),y!==z&&y.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();const H=new Set;return y.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const it=F.material;if(it)if(Array.isArray(it))for(let ut=0;ut<it.length;ut++){const yt=it[ut];ie(yt,z,F),H.add(yt)}else ie(it,z,F),H.add(it)}),T.pop(),f=null,H},this.compileAsync=function(y,N,z=null){const H=this.compile(y,N,z);return new Promise(F=>{function it(){if(H.forEach(function(ut){wt.get(ut).currentProgram.isReady()&&H.delete(ut)}),H.size===0){F(y);return}setTimeout(it,10)}Gt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let on=null;function Cn(y){on&&on(y)}function dc(){fi.stop()}function fc(){fi.start()}const fi=new Bh;fi.setAnimationLoop(Cn),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(y){on=y,W.setAnimationLoop(y),y===null?fi.stop():fi.start()},W.addEventListener("sessionstart",dc),W.addEventListener("sessionend",fc),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(N),N=W.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,N,D),f=jt.get(y,T.length),f.init(N),T.push(f),It.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),K.setFromProjectionMatrix(It),_t=this.localClippingEnabled,nt=et.init(this.clippingPlanes,_t),m=pt.get(y,b.length),m.init(),b.push(m),W.enabled===!0&&W.isPresenting===!0){const it=x.xr.getDepthSensingMesh();it!==null&&Kr(it,N,-1/0,x.sortObjects)}Kr(y,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(rt,ft),qt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,qt&&Ct.addToRenderList(m,y),this.info.render.frame++,nt===!0&&et.beginShadows();const z=f.state.shadowsArray;mt.render(z,y,N),nt===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,F=m.transmissive;if(f.setupLights(),N.isArrayCamera){const it=N.cameras;if(F.length>0)for(let ut=0,yt=it.length;ut<yt;ut++){const Mt=it[ut];mc(H,F,y,Mt)}qt&&Ct.render(y);for(let ut=0,yt=it.length;ut<yt;ut++){const Mt=it[ut];pc(m,y,Mt,Mt.viewport)}}else F.length>0&&mc(H,F,y,N),qt&&Ct.render(y),pc(m,y,N);D!==null&&(w.updateMultisampleRenderTarget(D),w.updateRenderTargetMipmap(D)),y.isScene===!0&&y.onAfterRender(x,y,N),Dt.resetDefaultState(),E=-1,M=null,T.pop(),T.length>0?(f=T[T.length-1],nt===!0&&et.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Kr(y,N,z,H){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)z=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||K.intersectsSprite(y)){H&&Vt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(It);const ut=j.update(y),yt=y.material;yt.visible&&m.push(y,ut,yt,z,Vt.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||K.intersectsObject(y))){const ut=j.update(y),yt=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Vt.copy(y.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Vt.copy(ut.boundingSphere.center)),Vt.applyMatrix4(y.matrixWorld).applyMatrix4(It)),Array.isArray(yt)){const Mt=ut.groups;for(let Ft=0,zt=Mt.length;Ft<zt;Ft++){const bt=Mt[Ft],Yt=yt[bt.materialIndex];Yt&&Yt.visible&&m.push(y,ut,Yt,z,Vt.z,bt)}}else yt.visible&&m.push(y,ut,yt,z,Vt.z,null)}}const it=y.children;for(let ut=0,yt=it.length;ut<yt;ut++)Kr(it[ut],N,z,H)}function pc(y,N,z,H){const F=y.opaque,it=y.transmissive,ut=y.transparent;f.setupLightsView(z),nt===!0&&et.setGlobalState(x.clippingPlanes,z),H&&Rt.viewport(I.copy(H)),F.length>0&&Ks(F,N,z),it.length>0&&Ks(it,N,z),ut.length>0&&Ks(ut,N,z),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function mc(y,N,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new Ai(1,1,{generateMipmaps:!0,type:Gt.has("EXT_color_buffer_half_float")||Gt.has("EXT_color_buffer_float")?Gs:qn,minFilter:Hn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const it=f.state.transmissionRenderTarget[H.id],ut=H.viewport||I;it.setSize(ut.z,ut.w);const yt=x.getRenderTarget();x.setRenderTarget(it),x.getClearColor(q),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),qt&&Ct.render(z);const Mt=x.toneMapping;x.toneMapping=hi;const Ft=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),nt===!0&&et.setGlobalState(x.clippingPlanes,H),Ks(y,z,H),w.updateMultisampleRenderTarget(it),w.updateRenderTargetMipmap(it),Gt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let bt=0,Yt=N.length;bt<Yt;bt++){const he=N[bt],ue=he.object,We=he.geometry,Qt=he.material,Et=he.group;if(Qt.side===sn&&ue.layers.test(H.layers)){const In=Qt.side;Qt.side=qe,Qt.needsUpdate=!0,gc(ue,z,H,We,Qt,Et),Qt.side=In,Qt.needsUpdate=!0,zt=!0}}zt===!0&&(w.updateMultisampleRenderTarget(it),w.updateRenderTargetMipmap(it))}x.setRenderTarget(yt),x.setClearColor(q,Y),Ft!==void 0&&(H.viewport=Ft),x.toneMapping=Mt}function Ks(y,N,z){const H=N.isScene===!0?N.overrideMaterial:null;for(let F=0,it=y.length;F<it;F++){const ut=y[F],yt=ut.object,Mt=ut.geometry,Ft=H===null?ut.material:H,zt=ut.group;yt.layers.test(z.layers)&&gc(yt,N,z,Mt,Ft,zt)}}function gc(y,N,z,H,F,it){y.onBeforeRender(x,N,z,H,F,it),y.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),F.onBeforeRender(x,N,z,H,y,it),F.transparent===!0&&F.side===sn&&F.forceSinglePass===!1?(F.side=qe,F.needsUpdate=!0,x.renderBufferDirect(z,N,H,F,y,it),F.side=Xn,F.needsUpdate=!0,x.renderBufferDirect(z,N,H,F,y,it),F.side=sn):x.renderBufferDirect(z,N,H,F,y,it),y.onAfterRender(x,N,z,H,F,it)}function Ys(y,N,z){N.isScene!==!0&&(N=le);const H=wt.get(y),F=f.state.lights,it=f.state.shadowsArray,ut=F.state.version,yt=vt.getParameters(y,F.state,it,N,z),Mt=vt.getProgramCacheKey(yt);let Ft=H.programs;H.environment=y.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(y.isMeshStandardMaterial?O:v).get(y.envMap||H.environment),H.envMapRotation=H.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Ft===void 0&&(y.addEventListener("dispose",Bt),Ft=new Map,H.programs=Ft);let zt=Ft.get(Mt);if(zt!==void 0){if(H.currentProgram===zt&&H.lightsStateVersion===ut)return xc(y,yt),zt}else yt.uniforms=vt.getUniforms(y),y.onBeforeCompile(yt,x),zt=vt.acquireProgram(yt,Mt),Ft.set(Mt,zt),H.uniforms=yt.uniforms;const bt=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(bt.clippingPlanes=et.uniform),xc(y,yt),H.needsLights=du(y),H.lightsStateVersion=ut,H.needsLights&&(bt.ambientLightColor.value=F.state.ambient,bt.lightProbe.value=F.state.probe,bt.directionalLights.value=F.state.directional,bt.directionalLightShadows.value=F.state.directionalShadow,bt.spotLights.value=F.state.spot,bt.spotLightShadows.value=F.state.spotShadow,bt.rectAreaLights.value=F.state.rectArea,bt.ltc_1.value=F.state.rectAreaLTC1,bt.ltc_2.value=F.state.rectAreaLTC2,bt.pointLights.value=F.state.point,bt.pointLightShadows.value=F.state.pointShadow,bt.hemisphereLights.value=F.state.hemi,bt.directionalShadowMap.value=F.state.directionalShadowMap,bt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,bt.spotShadowMap.value=F.state.spotShadowMap,bt.spotLightMatrix.value=F.state.spotLightMatrix,bt.spotLightMap.value=F.state.spotLightMap,bt.pointShadowMap.value=F.state.pointShadowMap,bt.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=zt,H.uniformsList=null,zt}function _c(y){if(y.uniformsList===null){const N=y.currentProgram.getUniforms();y.uniformsList=Lr.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function xc(y,N){const z=wt.get(y);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function hu(y,N,z,H,F){N.isScene!==!0&&(N=le),w.resetTextureUnits();const it=N.fog,ut=H.isMeshStandardMaterial?N.environment:null,yt=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Ce,Mt=(H.isMeshStandardMaterial?O:v).get(H.envMap||ut),Ft=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,zt=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),bt=!!z.morphAttributes.position,Yt=!!z.morphAttributes.normal,he=!!z.morphAttributes.color;let ue=hi;H.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ue=x.toneMapping);const We=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Qt=We!==void 0?We.length:0,Et=wt.get(H),In=f.state.lights;if(nt===!0&&(_t===!0||y!==M)){const tn=y===M&&H.id===E;et.setState(H,y,tn)}let te=!1;H.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==In.state.version||Et.outputColorSpace!==yt||F.isBatchedMesh&&Et.batching===!1||!F.isBatchedMesh&&Et.batching===!0||F.isBatchedMesh&&Et.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Et.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Et.instancing===!1||!F.isInstancedMesh&&Et.instancing===!0||F.isSkinnedMesh&&Et.skinning===!1||!F.isSkinnedMesh&&Et.skinning===!0||F.isInstancedMesh&&Et.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Et.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Et.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Et.instancingMorph===!1&&F.morphTexture!==null||Et.envMap!==Mt||H.fog===!0&&Et.fog!==it||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==et.numPlanes||Et.numIntersection!==et.numIntersection)||Et.vertexAlphas!==Ft||Et.vertexTangents!==zt||Et.morphTargets!==bt||Et.morphNormals!==Yt||Et.morphColors!==he||Et.toneMapping!==ue||Et.morphTargetsCount!==Qt)&&(te=!0):(te=!0,Et.__version=H.version);let cn=Et.currentProgram;te===!0&&(cn=Ys(H,N,F));let Ci=!1,Ye=!1,gs=!1;const de=cn.getUniforms(),Mn=Et.uniforms;if(Rt.useProgram(cn.program)&&(Ci=!0,Ye=!0,gs=!0),H.id!==E&&(E=H.id,Ye=!0),Ci||M!==y){Rt.buffers.depth.getReversed()?(at.copy(y.projectionMatrix),Ad(at),Rd(at),de.setValue(U,"projectionMatrix",at)):de.setValue(U,"projectionMatrix",y.projectionMatrix),de.setValue(U,"viewMatrix",y.matrixWorldInverse);const jn=de.map.cameraPosition;jn!==void 0&&jn.setValue(U,Nt.setFromMatrixPosition(y.matrixWorld)),Wt.logarithmicDepthBuffer&&de.setValue(U,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&de.setValue(U,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,Ye=!0,gs=!0)}if(F.isSkinnedMesh){de.setOptional(U,F,"bindMatrix"),de.setOptional(U,F,"bindMatrixInverse");const tn=F.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),de.setValue(U,"boneTexture",tn.boneTexture,w))}F.isBatchedMesh&&(de.setOptional(U,F,"batchingTexture"),de.setValue(U,"batchingTexture",F._matricesTexture,w),de.setOptional(U,F,"batchingIdTexture"),de.setValue(U,"batchingIdTexture",F._indirectTexture,w),de.setOptional(U,F,"batchingColorTexture"),F._colorsTexture!==null&&de.setValue(U,"batchingColorTexture",F._colorsTexture,w));const _s=z.morphAttributes;if((_s.position!==void 0||_s.normal!==void 0||_s.color!==void 0)&&Lt.update(F,z,cn),(Ye||Et.receiveShadow!==F.receiveShadow)&&(Et.receiveShadow=F.receiveShadow,de.setValue(U,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Mn.envMap.value=Mt,Mn.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(Mn.envMapIntensity.value=N.environmentIntensity),Ye&&(de.setValue(U,"toneMappingExposure",x.toneMappingExposure),Et.needsLights&&uu(Mn,gs),it&&H.fog===!0&&ot.refreshFogUniforms(Mn,it),ot.refreshMaterialUniforms(Mn,H,G,J,f.state.transmissionRenderTarget[y.id]),Lr.upload(U,_c(Et),Mn,w)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Lr.upload(U,_c(Et),Mn,w),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&de.setValue(U,"center",F.center),de.setValue(U,"modelViewMatrix",F.modelViewMatrix),de.setValue(U,"normalMatrix",F.normalMatrix),de.setValue(U,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const tn=H.uniformsGroups;for(let jn=0,Kn=tn.length;jn<Kn;jn++){const vc=tn[jn];P.update(vc,cn),P.bind(vc,cn)}}return cn}function uu(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function du(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(y,N,z){wt.get(y.texture).__webglTexture=N,wt.get(y.depthTexture).__webglTexture=z;const H=wt.get(y);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||Gt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,N){const z=wt.get(y);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(y,N=0,z=0){D=y,C=N,R=z;let H=!0,F=null,it=!1,ut=!1;if(y){const Mt=wt.get(y);if(Mt.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(U.FRAMEBUFFER,null),H=!1;else if(Mt.__webglFramebuffer===void 0)w.setupRenderTarget(y);else if(Mt.__hasExternalTextures)w.rebindTextures(y,wt.get(y.texture).__webglTexture,wt.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const bt=y.depthTexture;if(Mt.__boundDepthTexture!==bt){if(bt!==null&&wt.has(bt)&&(y.width!==bt.image.width||y.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(y)}}const Ft=y.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(ut=!0);const zt=wt.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(zt[N])?F=zt[N][z]:F=zt[N],it=!0):y.samples>0&&w.useMultisampledRTT(y)===!1?F=wt.get(y).__webglMultisampledFramebuffer:Array.isArray(zt)?F=zt[z]:F=zt,I.copy(y.viewport),V.copy(y.scissor),B=y.scissorTest}else I.copy(St).multiplyScalar(G).floor(),V.copy(Ht).multiplyScalar(G).floor(),B=Jt;if(Rt.bindFramebuffer(U.FRAMEBUFFER,F)&&H&&Rt.drawBuffers(y,F),Rt.viewport(I),Rt.scissor(V),Rt.setScissorTest(B),it){const Mt=wt.get(y.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,Mt.__webglTexture,z)}else if(ut){const Mt=wt.get(y.texture),Ft=N||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Mt.__webglTexture,z||0,Ft)}E=-1},this.readRenderTargetPixels=function(y,N,z,H,F,it,ut){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=wt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ut!==void 0&&(yt=yt[ut]),yt){Rt.bindFramebuffer(U.FRAMEBUFFER,yt);try{const Mt=y.texture,Ft=Mt.format,zt=Mt.type;if(!Wt.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Wt.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-H&&z>=0&&z<=y.height-F&&U.readPixels(N,z,H,F,lt.convert(Ft),lt.convert(zt),it)}finally{const Mt=D!==null?wt.get(D).__webglFramebuffer:null;Rt.bindFramebuffer(U.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(y,N,z,H,F,it,ut){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=wt.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ut!==void 0&&(yt=yt[ut]),yt){const Mt=y.texture,Ft=Mt.format,zt=Mt.type;if(!Wt.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Wt.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=y.width-H&&z>=0&&z<=y.height-F){Rt.bindFramebuffer(U.FRAMEBUFFER,yt);const bt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,bt),U.bufferData(U.PIXEL_PACK_BUFFER,it.byteLength,U.STREAM_READ),U.readPixels(N,z,H,F,lt.convert(Ft),lt.convert(zt),0);const Yt=D!==null?wt.get(D).__webglFramebuffer:null;Rt.bindFramebuffer(U.FRAMEBUFFER,Yt);const he=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await wd(U,he,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,bt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,it),U.deleteBuffer(bt),U.deleteSync(he),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,N=null,z=0){y.isTexture!==!0&&(Ps("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,y=arguments[1]);const H=Math.pow(2,-z),F=Math.floor(y.image.width*H),it=Math.floor(y.image.height*H),ut=N!==null?N.x:0,yt=N!==null?N.y:0;w.setTexture2D(y,0),U.copyTexSubImage2D(U.TEXTURE_2D,z,0,0,ut,yt,F,it),Rt.unbindTexture()},this.copyTextureToTexture=function(y,N,z=null,H=null,F=0){y.isTexture!==!0&&(Ps("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,y=arguments[1],N=arguments[2],F=arguments[3]||0,z=null);let it,ut,yt,Mt,Ft,zt,bt,Yt,he;const ue=y.isCompressedTexture?y.mipmaps[F]:y.image;z!==null?(it=z.max.x-z.min.x,ut=z.max.y-z.min.y,yt=z.isBox3?z.max.z-z.min.z:1,Mt=z.min.x,Ft=z.min.y,zt=z.isBox3?z.min.z:0):(it=ue.width,ut=ue.height,yt=ue.depth||1,Mt=0,Ft=0,zt=0),H!==null?(bt=H.x,Yt=H.y,he=H.z):(bt=0,Yt=0,he=0);const We=lt.convert(N.format),Qt=lt.convert(N.type);let Et;N.isData3DTexture?(w.setTexture3D(N,0),Et=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(w.setTexture2DArray(N,0),Et=U.TEXTURE_2D_ARRAY):(w.setTexture2D(N,0),Et=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const In=U.getParameter(U.UNPACK_ROW_LENGTH),te=U.getParameter(U.UNPACK_IMAGE_HEIGHT),cn=U.getParameter(U.UNPACK_SKIP_PIXELS),Ci=U.getParameter(U.UNPACK_SKIP_ROWS),Ye=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ue.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ue.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Mt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ft),U.pixelStorei(U.UNPACK_SKIP_IMAGES,zt);const gs=y.isDataArrayTexture||y.isData3DTexture,de=N.isDataArrayTexture||N.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const Mn=wt.get(y),_s=wt.get(N),tn=wt.get(Mn.__renderTarget),jn=wt.get(_s.__renderTarget);Rt.bindFramebuffer(U.READ_FRAMEBUFFER,tn.__webglFramebuffer),Rt.bindFramebuffer(U.DRAW_FRAMEBUFFER,jn.__webglFramebuffer);for(let Kn=0;Kn<yt;Kn++)gs&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,wt.get(y).__webglTexture,F,zt+Kn),y.isDepthTexture?(de&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,wt.get(N).__webglTexture,F,he+Kn),U.blitFramebuffer(Mt,Ft,it,ut,bt,Yt,it,ut,U.DEPTH_BUFFER_BIT,U.NEAREST)):de?U.copyTexSubImage3D(Et,F,bt,Yt,he+Kn,Mt,Ft,it,ut):U.copyTexSubImage2D(Et,F,bt,Yt,he+Kn,Mt,Ft,it,ut);Rt.bindFramebuffer(U.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else de?y.isDataTexture||y.isData3DTexture?U.texSubImage3D(Et,F,bt,Yt,he,it,ut,yt,We,Qt,ue.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(Et,F,bt,Yt,he,it,ut,yt,We,ue.data):U.texSubImage3D(Et,F,bt,Yt,he,it,ut,yt,We,Qt,ue):y.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,F,bt,Yt,it,ut,We,Qt,ue.data):y.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,F,bt,Yt,ue.width,ue.height,We,ue.data):U.texSubImage2D(U.TEXTURE_2D,F,bt,Yt,it,ut,We,Qt,ue);U.pixelStorei(U.UNPACK_ROW_LENGTH,In),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,te),U.pixelStorei(U.UNPACK_SKIP_PIXELS,cn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ci),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ye),F===0&&N.generateMipmaps&&U.generateMipmap(Et),Rt.unbindTexture()},this.copyTextureToTexture3D=function(y,N,z=null,H=null,F=0){return y.isTexture!==!0&&(Ps("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,y=arguments[2],N=arguments[3],F=arguments[4]||0),Ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,N,z,H,F)},this.initRenderTarget=function(y){wt.get(y).__webglFramebuffer===void 0&&w.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?w.setTextureCube(y,0):y.isData3DTexture?w.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?w.setTexture2DArray(y,0):w.setTexture2D(y,0),Rt.unbindTexture()},this.resetState=function(){C=0,R=0,D=null,Rt.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Vn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class qh extends pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ve,this.environmentIntensity=1,this.environmentRotation=new Ve,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Og{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=wo,this.updateRanges=[],this.version=0,this.uuid=vn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ke=new A;class Qo{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new xe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Qo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const vl=new A,yl=new Zt,Ml=new Zt,Bg=new A,bl=new Pt,gr=new A,Ea=new wn,Sl=new Pt,Ta=new Ws;class zg extends Re{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ec,this.bindMatrix=new Pt,this.bindMatrixInverse=new Pt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new je),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,gr),this.boundingBox.expandByPoint(gr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new wn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,gr),this.boundingSphere.expandByPoint(gr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ea.copy(this.boundingSphere),Ea.applyMatrix4(i),t.ray.intersectsSphere(Ea)!==!1&&(Sl.copy(i).invert(),Ta.copy(t.ray).applyMatrix4(Sl),!(this.boundingBox!==null&&Ta.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Ta)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Zt,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Ec?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Yu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;yl.fromBufferAttribute(i.attributes.skinIndex,t),Ml.fromBufferAttribute(i.attributes.skinWeight,t),vl.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const a=Ml.getComponent(s);if(a!==0){const o=yl.getComponent(s);bl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(Bg.copy(vl).applyMatrix4(bl),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class jh extends pe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Kh extends Te{constructor(t=null,e=1,n=1,i,s,a,o,c,l=He,h=He,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const El=new Pt,Hg=new Pt;class tc{constructor(t=[],e=[]){this.uuid=vn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Pt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Pt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=t.length;s<a;s++){const o=t[s]?t[s].matrixWorld:Hg;El.multiplyMatrices(o,e[s]),El.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new tc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Kh(e,t,t,rn,xn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let a=e[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new jh),this.bones.push(a),this.boneInverses.push(new Pt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const a=e[i];t.bones.push(a.uuid);const o=n[i];t.boneInverses.push(o.toArray())}return t}}class Ro extends xe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Wi=new Pt,Tl=new Pt,_r=[],wl=new je,Vg=new Pt,bs=new Re,Ss=new wn;class Gg extends Re{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ro(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Vg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new je),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Wi),wl.copy(t.boundingBox).applyMatrix4(Wi),this.boundingBox.union(wl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new wn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Wi),Ss.copy(t.boundingSphere).applyMatrix4(Wi),this.boundingSphere.union(Ss)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(bs.geometry=this.geometry,bs.material=this.material,bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ss.copy(this.boundingSphere),Ss.applyMatrix4(n),t.ray.intersectsSphere(Ss)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Wi),Tl.multiplyMatrices(n,Wi),bs.matrixWorld=Tl,bs.raycast(t,_r);for(let a=0,o=_r.length;a<o;a++){const c=_r[a];c.instanceId=s,c.object=this,e.push(c)}_r.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ro(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Kh(new Float32Array(i*this.count),i,this.count,Ho,xn));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*t;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ec extends yn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const kr=new A,Or=new A,Al=new Pt,Es=new Ws,xr=new wn,wa=new A,Rl=new A;class nc extends pe{constructor(t=new Ge,e=new ec){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)kr.fromBufferAttribute(e,i-1),Or.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=kr.distanceTo(Or);t.setAttribute("lineDistance",new Ue(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(i),xr.radius+=s,t.ray.intersectsSphere(xr)===!1)return;Al.copy(i).invert(),Es.copy(t.ray).applyMatrix4(Al);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=l){const f=h.getX(_),b=h.getX(_+1),T=vr(this,t,Es,c,f,b);T&&e.push(T)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),f=vr(this,t,Es,c,_,m);f&&e.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=p,m=g-1;_<m;_+=l){const f=vr(this,t,Es,c,_,_+1);f&&e.push(f)}if(this.isLineLoop){const _=vr(this,t,Es,c,g-1,p);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function vr(r,t,e,n,i,s){const a=r.geometry.attributes.position;if(kr.fromBufferAttribute(a,i),Or.fromBufferAttribute(a,s),e.distanceSqToSegment(kr,Or,wa,Rl)>n)return;wa.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(wa);if(!(c<t.near||c>t.far))return{distance:c,point:Rl.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const Cl=new A,Il=new A;class Yh extends nc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Cl.fromBufferAttribute(e,i),Il.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Cl.distanceTo(Il);t.setAttribute("lineDistance",new Ue(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Wg extends nc{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class $h extends yn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Pl=new Pt,Co=new Ws,yr=new wn,Mr=new A;class Xg extends pe{constructor(t=new Ge,e=new $h){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),yr.copy(n.boundingSphere),yr.applyMatrix4(i),yr.radius+=s,t.ray.intersectsSphere(yr)===!1)return;Pl.copy(i).invert(),Co.copy(t.ray).applyMatrix4(Pl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=d,_=p;g<_;g++){const m=l.getX(g);Mr.fromBufferAttribute(u,m),Ll(Mr,m,c,i,t,e,this)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,_=p;g<_;g++)Mr.fromBufferAttribute(u,g),Ll(Mr,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ll(r,t,e,n,i,s,a){const o=Co.distanceSqToPoint(r);if(o<e){const c=new A;Co.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class ic extends Ge{constructor(t=1,e=1,n=1,i=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=n/2;let f=0;b(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Ue(u,3)),this.setAttribute("normal",new Ue(d,3)),this.setAttribute("uv",new Ue(p,2));function b(){const x=new A,L=new A;let C=0;const R=(e-t)/n;for(let D=0;D<=s;D++){const E=[],M=D/s,I=M*(e-t)+t;for(let V=0;V<=i;V++){const B=V/i,q=B*c+o,Y=Math.sin(q),X=Math.cos(q);L.x=I*Y,L.y=-M*n+m,L.z=I*X,u.push(L.x,L.y,L.z),x.set(Y,R,X).normalize(),d.push(x.x,x.y,x.z),p.push(B,1-M),E.push(g++)}_.push(E)}for(let D=0;D<i;D++)for(let E=0;E<s;E++){const M=_[E][D],I=_[E+1][D],V=_[E+1][D+1],B=_[E][D+1];(t>0||E!==0)&&(h.push(M,I,B),C+=3),(e>0||E!==s-1)&&(h.push(I,V,B),C+=3)}l.addGroup(f,C,0),f+=C}function T(x){const L=g,C=new Ut,R=new A;let D=0;const E=x===!0?t:e,M=x===!0?1:-1;for(let V=1;V<=i;V++)u.push(0,m*M,0),d.push(0,M,0),p.push(.5,.5),g++;const I=g;for(let V=0;V<=i;V++){const q=V/i*c+o,Y=Math.cos(q),X=Math.sin(q);R.x=E*X,R.y=m*M,R.z=E*Y,u.push(R.x,R.y,R.z),d.push(0,M,0),C.x=Y*.5+.5,C.y=X*.5*M+.5,p.push(C.x,C.y),g++}for(let V=0;V<i;V++){const B=L+V,q=I+V;x===!0?h.push(q,q+1,B):h.push(q+1,q,B),D+=3}l.addGroup(f,D,x===!0?1:2),f+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ic(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class sc extends ic{constructor(t=1,e=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new sc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class rc extends Ge{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new A,d=new A,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const b=[],T=f/n;let x=0;f===0&&a===0?x=.5/e:f===n&&c===Math.PI&&(x=-.5/e);for(let L=0;L<=e;L++){const C=L/e;u.x=-t*Math.cos(i+C*s)*Math.sin(a+T*o),u.y=t*Math.cos(a+T*o),u.z=t*Math.sin(i+C*s)*Math.sin(a+T*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(C+x,1-T),b.push(l++)}h.push(b)}for(let f=0;f<n;f++)for(let b=0;b<e;b++){const T=h[f][b+1],x=h[f][b],L=h[f+1][b],C=h[f+1][b+1];(f!==0||a>0)&&p.push(T,x,C),(f!==n-1||c<Math.PI)&&p.push(x,L,C)}this.setIndex(p),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ac extends yn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jo,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ve,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class An extends ac{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ut(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ne(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Tt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Tt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Tt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class qg extends yn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jo,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ve,this.combine=ko,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function br(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function jg(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Kg(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Dl(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=e[s]*t;for(let c=0;c!==t;++c)i[a++]=r[o+c]}return i}function Zh(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(t.push(s.time),e.push.apply(e,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(t.push(s.time),a.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(t.push(s.time),e.push(a)),s=r[i++];while(s!==void 0)}class qs{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let a;n:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break e}a=e.length;break n}if(!(t>=s)){const o=e[1];t<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=e[--n-1],t>=s)break e}a=n,n=0;break n}break t}for(;n<a;){const o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let a=0;a!==i;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Yg extends qs{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ji,endingEnd:ji}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,a=t+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ki:s=t,o=2*e-n;break;case Ur:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ki:a=t,c=2*n-e;break;case Ur:a=1,c=n+i[1]-i[0];break;default:a=t-1,c=e}const l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-e)/(i-e),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,b=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,T=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let L=0;L!==o;++L)s[L]=f*a[h+L]+b*a[l+L]+T*a[c+L]+x*a[u+L];return s}}class Jh extends qs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}}class $g extends qs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Rn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=br(e,this.TimeBufferType),this.values=br(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:br(t.times,Array),values:br(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new $g(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Jh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Yg(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Bs:e=this.InterpolantFactoryMethodDiscrete;break;case zs:e=this.InterpolantFactoryMethodLinear;break;case Yr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Bs;case this.InterpolantFactoryMethodLinear:return zs;case this.InterpolantFactoryMethodSmooth:return Yr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(i!==void 0&&jg(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Yr,s=t.length-1;let a=1;for(let o=1;o<s;++o){let c=!1;const l=t[o],h=t[o+1];if(l!==h&&(o!==1||l!==t[0]))if(i)c=!0;else{const u=o*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){const _=e[u+g];if(_!==e[d+g]||_!==e[p+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];const u=o*n,d=a*n;for(let p=0;p!==n;++p)e[d+p]=e[u+p]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Rn.prototype.TimeBufferType=Float32Array;Rn.prototype.ValueBufferType=Float32Array;Rn.prototype.DefaultInterpolation=zs;class fs extends Rn{constructor(t,e,n){super(t,e,n)}}fs.prototype.ValueTypeName="bool";fs.prototype.ValueBufferType=Array;fs.prototype.DefaultInterpolation=Bs;fs.prototype.InterpolantFactoryMethodLinear=void 0;fs.prototype.InterpolantFactoryMethodSmooth=void 0;class Qh extends Rn{}Qh.prototype.ValueTypeName="color";class ls extends Rn{}ls.prototype.ValueTypeName="number";class Zg extends qs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(i-e);let l=t*o;for(let h=l+o;l!==h;l+=4)Ee.slerpFlat(s,0,a,l-o,a,l,c);return s}}class hs extends Rn{InterpolantFactoryMethodLinear(t){return new Zg(this.times,this.values,this.getValueSize(),t)}}hs.prototype.ValueTypeName="quaternion";hs.prototype.InterpolantFactoryMethodSmooth=void 0;class ps extends Rn{constructor(t,e,n){super(t,e,n)}}ps.prototype.ValueTypeName="string";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=Bs;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;class us extends Rn{}us.prototype.ValueTypeName="vector";class Io{constructor(t="",e=-1,n=[],i=qo){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=vn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let a=0,o=n.length;a!==o;++a)e.push(Qg(n[a]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,a=n.length;s!==a;++s)e.push(Rn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);const h=Kg(c);c=Dl(c,1,h),l=Dl(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new ls(".morphTargetInfluences["+e[o].name+"]",c,l).scale(1/n))}return new this(t,-1,a)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=t.length;o<c;o++){const l=t[o],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],e,n));return a}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,g,_){if(p.length!==0){const m=[],f=[];Zh(p,m,f,g),m.length!==0&&_.push(new u(d,m,f))}},i=[],s=t.name||"default",a=t.fps||30,o=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(const _ in p){const m=[],f=[];for(let b=0;b!==d[g].morphTargets.length;++b){const T=d[g];m.push(T.time),f.push(T.morphTarget===_?1:0)}i.push(new ls(".morphTargetInfluence["+_+"]",m,f))}c=p.length*a}else{const p=".bones["+e[u].name+"]";n(us,p+".position",d,"pos",i),n(hs,p+".quaternion",d,"rot",i),n(us,p+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,o)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Jg(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ls;case"vector":case"vector2":case"vector3":case"vector4":return us;case"color":return Qh;case"quaternion":return hs;case"bool":case"boolean":return fs;case"string":return ps}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Qg(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=Jg(r.type);if(r.times===void 0){const e=[],n=[];Zh(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const ci={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class t_{constructor(t,e,n){const i=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const e_=new t_;class ms{constructor(t){this.manager=t!==void 0?t:e_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}ms.DEFAULT_MATERIAL_NAME="__DEFAULT";const Fn={};class n_ extends Error{constructor(t,e){super(t),this.response=e}}class tu extends ms{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=ci.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(Fn[t]!==void 0){Fn[t].push({onLoad:e,onProgress:n,onError:i});return}Fn[t]=[],Fn[t].push({onLoad:e,onProgress:n,onError:i});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Fn[t],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0;let _=0;const m=new ReadableStream({start(f){b();function b(){u.read().then(({done:T,value:x})=>{if(T)f.close();else{_+=x.byteLength;const L=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let C=0,R=h.length;C<R;C++){const D=h[C];D.onProgress&&D.onProgress(L)}f.enqueue(x),b()}},T=>{f.error(T)})}}});return new Response(m)}else throw new n_(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{ci.add(t,l);const h=Fn[t];delete Fn[t];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=Fn[t];if(h===void 0)throw this.manager.itemError(t),l;delete Fn[t];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onError&&p.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class i_ extends ms{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=ci.get(t);if(a!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a;const o=Hs("img");function c(){h(),ci.add(t,this),e&&e(this),s.manager.itemEnd(t)}function l(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(t),o.src=t,o}}class eu extends ms{constructor(t){super(t)}load(t,e,n,i){const s=new Te,a=new i_(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(t,function(o){s.image=o,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class js extends pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Tt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class s_ extends js{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Tt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Aa=new Pt,Nl=new A,Ul=new A;class oc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.map=null,this.mapPass=null,this.matrix=new Pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $o,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Nl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nl),Ul.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ul),e.updateMatrixWorld(),Aa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Aa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Aa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class r_ extends oc{constructor(){super(new Ae(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=os*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class a_ extends js{constructor(t,e,n=0,i=Math.PI/3,s=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new r_}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Fl=new Pt,Ts=new A,Ra=new A;class o_ extends oc{constructor(){super(new Ae(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ut(4,2),this._viewportCount=6,this._viewports=[new Zt(2,1,1,1),new Zt(0,1,1,1),new Zt(3,1,1,1),new Zt(1,1,1,1),new Zt(3,0,1,1),new Zt(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ts.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ts),Ra.copy(n.position),Ra.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ra),n.updateMatrixWorld(),i.makeTranslation(-Ts.x,-Ts.y,-Ts.z),Fl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fl)}}class qr extends js{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new o_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class c_ extends oc{constructor(){super(new Zo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Br extends js{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pe.DEFAULT_UP),this.updateMatrix(),this.target=new pe,this.shadow=new c_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class nu extends js{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Fs{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class l_ extends ms{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,a=ci.get(t);if(a!==void 0){if(s.manager.itemStart(t),a.then){a.then(l=>{e&&e(l),s.manager.itemEnd(t)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){e&&e(a),s.manager.itemEnd(t)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(t,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return ci.add(t,l),e&&e(l),s.manager.itemEnd(t),l}).catch(function(l){i&&i(l),ci.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});ci.add(t,c),s.manager.itemStart(t)}}class h_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=kl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=kl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function kl(){return performance.now()}class u_{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,a;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=e}else{a+=e;const o=e/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=e*this._origIndex;this._mixBufferRegion(n,i,c,1-s,e)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let c=e,l=e+e;c!==l;++c)if(n[c]!==n[c+e]){o.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,a=i;s!==a;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)t[e+a]=t[n+a]}_slerp(t,e,n,i){Ee.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const a=this._workIndex*s;Ee.multiplyQuaternionsFlat(t,a,t,e,t,n),Ee.slerpFlat(t,e,t,e,t,a,i)}_lerp(t,e,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const c=e+o;t[c]=t[c]*a+t[n+o]*i}}_lerpAdditive(t,e,n,i,s){for(let a=0;a!==s;++a){const o=e+a;t[o]=t[o]+t[n+a]*i}}}const cc="\\[\\]\\.:\\/",d_=new RegExp("["+cc+"]","g"),lc="[^"+cc+"]",f_="[^"+cc.replace("\\.","")+"]",p_=/((?:WC+[\/:])*)/.source.replace("WC",lc),m_=/(WCOD+)?/.source.replace("WCOD",f_),g_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lc),__=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lc),x_=new RegExp("^"+p_+m_+g_+__+"$"),v_=["material","materials","bones","map"];class y_{constructor(t,e,n){const i=n||ne.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ne{constructor(t,e,n){this.path=e,this.parsedPath=n||ne.parseTrackName(e),this.node=ne.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ne.Composite(t,e,n):new ne(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(d_,"")}static parseTrackName(t){const e=x_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);v_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===e||o.uuid===e)return o;const c=n(o.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=ne.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const a=t[i];if(a===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ne.Composite=y_;ne.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ne.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ne.prototype.GetterByBindingType=[ne.prototype._getValue_direct,ne.prototype._getValue_array,ne.prototype._getValue_arrayElement,ne.prototype._getValue_toArray];ne.prototype.SetterByBindingTypeAndVersioning=[[ne.prototype._setValue_direct,ne.prototype._setValue_direct_setNeedsUpdate,ne.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ne.prototype._setValue_array,ne.prototype._setValue_array_setNeedsUpdate,ne.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ne.prototype._setValue_arrayElement,ne.prototype._setValue_arrayElement_setNeedsUpdate,ne.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ne.prototype._setValue_fromArray,ne.prototype._setValue_fromArray_setNeedsUpdate,ne.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class M_{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,a=s.length,o=new Array(a),c={endingStart:ji,endingEnd:ji};for(let l=0;l!==a;++l){const h=s[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Xo,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,s=t._clip.duration,a=s/i,o=i/s;t.warp(1,a,e),this.warp(o,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=s,c[1]=s+n,l[0]=t/a,l[1]=e/a,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const c=(t-s)*n;c<0||n===0?e=0:(this._startTime=null,e=n*c)}e*=this._updateTimeScale(t);const a=this._updateTime(e),o=this._updateWeight(t);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Zu:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case qo:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulate(i,o)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const a=n===$u;if(t===0)return s===-1?i:a&&(s&1)===1?e-i:i;if(n===Vr){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=e||i<0){const o=Math.floor(i/e);i-=e*o,s+=Math.abs(o);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=Ki,i.endingEnd=Ki):(t?i.endingStart=this.zeroSlopeAtStart?Ki:ji:i.endingStart=Ur,e?i.endingEnd=this.zeroSlopeAtEnd?Ki:ji:i.endingEnd=Ur)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=s,c[0]=e,o[1]=s+t,c[1]=n,this}}const b_=new Float32Array(1);class hc extends Ri{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,a=t._propertyBindings,o=t._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==s;++u){const d=i[u],p=d.name;let g=h[p];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}const _=e&&e._propertyBindings[u].binding.parsedPath;g=new u_(ne.create(n,p,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let a=s[e];if(a===void 0)a={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=a;else{const o=a.knownActions;t._byClipCacheIndex=o.length,o.push(t)}t._cacheIndex=i.length,i.push(t),a.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,a=this._actionsByClip,o=a[s],c=o.knownActions,l=c[c.length-1],h=t._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),t._byClipCacheIndex=null;const u=o.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],c.length===0&&delete a[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[e];a===void 0&&(a={},i[e]=a),a[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],c=e[e.length-1],l=t._cacheIndex;c._cacheIndex=l,e[l]=c,e.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new Jh(new Float32Array(2),new Float32Array(2),1,b_),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let a=typeof t=="string"?Io.findByName(i,t):t;const o=a!==null?a.uuid:t,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=qo),c!==void 0){const u=c.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const h=new M_(this,a,e,n);return this._bindAction(h,l),this._addInactiveAction(h,o,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?Io.findByName(n,t):t,a=s?s.uuid:t,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),a=this._accuIndex^=1;for(let l=0;l!==n;++l)e[l]._update(i,t,s,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const h=l._cacheIndex,u=e[e.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[e];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const Ol=new Pt;class Bl{constructor(t,e,n=0,i=1/0){this.ray=new Ws(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Yo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ol.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ol),this}intersectObject(t,e=!0,n=[]){return Po(t,this,n,e),n.sort(zl),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)Po(t[i],this,n,e);return n.sort(zl),n}}function zl(r,t){return r.distance-t.distance}function Po(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)Po(s[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fo);function Hl(r,t){if(t===Ju)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(t===To||t===Rh){let e=r.getIndex();if(e===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);r.setIndex(a),e=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=e.count-2,i=[];if(t===To)for(let a=1;a<=n;a++)i.push(e.getX(0)),i.push(e.getX(a)),i.push(e.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(e.getX(a)),i.push(e.getX(a+1)),i.push(e.getX(a+2))):(i.push(e.getX(a+2)),i.push(e.getX(a+1)),i.push(e.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),r}class S_ extends ms{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new R_(e)}),this.register(function(e){return new C_(e)}),this.register(function(e){return new O_(e)}),this.register(function(e){return new B_(e)}),this.register(function(e){return new z_(e)}),this.register(function(e){return new P_(e)}),this.register(function(e){return new L_(e)}),this.register(function(e){return new D_(e)}),this.register(function(e){return new N_(e)}),this.register(function(e){return new A_(e)}),this.register(function(e){return new U_(e)}),this.register(function(e){return new I_(e)}),this.register(function(e){return new k_(e)}),this.register(function(e){return new F_(e)}),this.register(function(e){return new T_(e)}),this.register(function(e){return new H_(e)}),this.register(function(e){return new V_(e)})}load(t,e,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Fs.extractUrlBase(t);a=Fs.resolveURL(l,this.path)}else a=Fs.extractUrlBase(t);this.manager.itemStart(t);const o=function(l){i?i(l):console.error(l),s.manager.itemError(t),s.manager.itemEnd(t)},c=new tu(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{s.parse(l,a,function(h){e(h),s.manager.itemEnd(t)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,i){let s;const a={},o={},c=new TextDecoder;if(typeof t=="string")s=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===iu){try{a[Xt.KHR_BINARY_GLTF]=new G_(t)}catch(u){i&&i(u);return}s=JSON.parse(a[Xt.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(t));else s=t;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new nx(s,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Xt.KHR_MATERIALS_UNLIT:a[u]=new w_;break;case Xt.KHR_DRACO_MESH_COMPRESSION:a[u]=new W_(s,this.dracoLoader);break;case Xt.KHR_TEXTURE_TRANSFORM:a[u]=new X_;break;case Xt.KHR_MESH_QUANTIZATION:a[u]=new q_;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(t,e){const n=this;return new Promise(function(i,s){n.parse(t,e,i,s)})}}function E_(){let r={};return{get:function(t){return r[t]},add:function(t,e){r[t]=e},remove:function(t){delete r[t]},removeAll:function(){r={}}}}const Xt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class T_{constructor(t){this.parser=t,this.name=Xt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){const s=e[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let i=e.cache.get(n);if(i)return i;const s=e.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[t];let l;const h=new Tt(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Ce);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Br(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new qr(h),l.distance=u;break;case"spot":l=new a_(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Bn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),i=Promise.resolve(l),e.cache.add(n,i),i}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,s=n.json.nodes[t],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(e.cache,o,c)})}}class w_{constructor(){this.name=Xt.KHR_MATERIALS_UNLIT}getMaterialType(){return an}extendParams(t,e,n){const i=[];t.color=new Tt(1,1,1),t.opacity=1;const s=e.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;t.color.setRGB(a[0],a[1],a[2],Ce),t.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(t,"map",s.baseColorTexture,we))}return Promise.all(i)}}class A_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(e.emissiveIntensity=s),Promise.resolve()}}class R_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(e.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(e,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new Ut(o,o)}return Promise.all(s)}}class C_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class I_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(e.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(e.iridescenceIOR=a.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class P_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];e.sheenColor=new Tt(0,0,0),e.sheenRoughness=0,e.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;e.sheenColor.setRGB(o[0],o[1],o[2],Ce)}return a.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(e,"sheenColorMap",a.sheenColorTexture,we)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class L_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(e.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(e,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class D_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];e.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(e,"thicknessMap",a.thicknessTexture)),e.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return e.attenuationColor=new Tt().setRGB(o[0],o[1],o[2],Ce),Promise.all(s)}}class N_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class U_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];e.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(e,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return e.specularColor=new Tt().setRGB(o[0],o[1],o[2],Ce),a.specularColorTexture!==void 0&&s.push(n.assignTexture(e,"specularColorMap",a.specularColorTexture,we)),Promise.all(s)}}class F_{constructor(t){this.parser=t,this.name=Xt.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return e.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(e,"bumpMap",a.bumpTexture)),Promise.all(s)}}class k_{constructor(t){this.parser=t,this.name=Xt.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:An}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(e.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(e.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(e,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class O_{constructor(t){this.parser=t,this.name=Xt.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=e.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,s.source,a)}}class B_{constructor(t){this.parser=t,this.name=Xt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const a=s.extensions[e],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class z_{constructor(t){this.parser=t,this.name=Xt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const a=s.extensions[e],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class H_{constructor(t){this.name=Xt.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):a.ready.then(function(){const p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}}class V_{constructor(t){this.name=Xt.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=e.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==nn.TRIANGLES&&l.mode!==nn.TRIANGLE_STRIP&&l.mode!==nn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(t)),Promise.all(o).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(const g of u){const _=new Pt,m=new A,f=new Ee,b=new A(1,1,1),T=new Gg(g.geometry,g.material,d);for(let x=0;x<d;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,x),c.SCALE&&b.fromBufferAttribute(c.SCALE,x),T.setMatrixAt(x,_.compose(m,f,b));for(const x in c)if(x==="_COLOR_0"){const L=c[x];T.instanceColor=new Ro(L.array,L.itemSize,L.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);pe.prototype.copy.call(T,g),this.parser.assignFinalMaterial(T),p.push(T)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const iu="glTF",ws=12,Vl={JSON:1313821514,BIN:5130562};class G_{constructor(t){this.name=Xt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,ws),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==iu)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ws,s=new DataView(t,ws);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const c=s.getUint32(a,!0);if(a+=4,c===Vl.JSON){const l=new Uint8Array(t,ws+a,o);this.content=n.decode(l)}else if(c===Vl.BIN){const l=ws+a;this.body=t.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class W_{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Xt.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,i=this.dracoLoader,s=t.extensions[this.name].bufferView,a=t.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const u=Lo[h]||h.toLowerCase();o[u]=a[h]}for(const h in t.attributes){const u=Lo[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[t.attributes[h]],p=Qi[d.componentType];l[u]=p.name,c[u]=d.normalized===!0}}return e.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(const g in p.attributes){const _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(p)},o,l,Ce,d)})})}}class X_{constructor(){this.name=Xt.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class q_{constructor(){this.name=Xt.KHR_MESH_QUANTIZATION}}class su extends qs{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i*3+i;for(let a=0;a!==i;a++)e[a]=n[s+a];return e}interpolate_(t,e,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-e,u=(n-e)/h,d=u*u,p=d*u,g=t*l,_=g-l,m=-2*p+3*d,f=p-d,b=1-m,T=f-d+u;for(let x=0;x!==o;x++){const L=a[_+x+o],C=a[_+x+c]*h,R=a[g+x+o],D=a[g+x]*h;s[x]=b*L+T*C+m*R+f*D}return s}}const j_=new Ee;class K_ extends su{interpolate_(t,e,n,i){const s=super.interpolate_(t,e,n,i);return j_.fromArray(s).normalize().toArray(s),s}}const nn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Qi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Gl={9728:He,9729:Xe,9984:xh,9985:wr,9986:Is,9987:Hn},Wl={33071:oi,33648:Nr,10497:ss},Ca={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Lo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ei={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Y_={CUBICSPLINE:void 0,LINEAR:zs,STEP:Bs},Ia={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function $_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new ac({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Xn})),r.DefaultMaterial}function yi(r,t,e){for(const n in e.extensions)r[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function Bn(r,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(r.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function Z_(r,t,e){let n=!1,i=!1,s=!1;for(let l=0,h=t.length;l<h;l++){const u=t[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],c=[];for(let l=0,h=t.length;l<h;l++){const u=t[l];if(n){const d=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function J_(r,t){if(r.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)r.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(r.morphTargetInfluences.length===e.length){r.morphTargetDictionary={};for(let n=0,i=e.length;n<i;n++)r.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Q_(r){let t;const e=r.extensions&&r.extensions[Xt.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Pa(e.attributes):t=r.indices+":"+Pa(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)t+=":"+Pa(r.targets[n]);return t}function Pa(r){let t="";const e=Object.keys(r).sort();for(let n=0,i=e.length;n<i;n++)t+=e[n]+":"+r[e[n]]+";";return t}function Do(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function tx(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const ex=new Pt;class nx{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new E_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new eu(this.options.manager):this.textureLoader=new l_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new tu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return yi(s,o,i),Bn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();t(o)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=e.length;i<s;i++){const a=e[i].joints;for(let o=0,c=a.length;o<c;o++)t[a[o]].isBone=!0}for(let i=0,s=t.length;i<s;i++){const a=t[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const i=n.clone(),s=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())s(h,o.children[l])};return s(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const i=t(e[n]);if(i)return i}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let i=0;i<e.length;i++){const s=t(e[i]);s&&n.push(s)}return n}getDependency(t,e){const n=t+":"+e;let i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(e)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(t,e)}),!i)throw new Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(s,a){return n.getDependency(t,a)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[Xt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(Fs.resolveURL(e.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const i=e.byteLength||0,s=e.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(t){const e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){const a=Ca[i.type],o=Qi[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new xe(l,a,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],c=Ca[i.type],l=Qi[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(p&&p!==u){const f=Math.floor(d/p),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count;let T=e.cache.get(b);T||(_=new l(o,f*p,i.count*p/h),T=new Og(_,p/h),e.cache.add(b,T)),m=new Qo(T,c,d%p/h,g)}else o===null?_=new l(i.count*c):_=new l(o,d,i.count*c),m=new xe(_,c,g);if(i.sparse!==void 0){const f=Ca.SCALAR,b=Qi[i.sparse.indices.componentType],T=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,L=new b(a[1],T,i.sparse.count*f),C=new l(a[2],x,i.sparse.count*c);o!==null&&(m=new xe(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,D=L.length;R<D;R++){const E=L[R];if(m.setX(E,C[R*c]),c>=2&&m.setY(E,C[R*c+1]),c>=3&&m.setZ(E,C[R*c+2]),c>=4&&m.setW(E,C[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(t){const e=this.json,n=this.options,s=e.textures[t].source,a=e.images[s];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(t,s,o)}loadTextureImage(t,e,n){const i=this,s=this.json,a=s.textures[t],o=s.images[e],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=Gl[d.magFilter]||Xe,h.minFilter=Gl[d.minFilter]||Hn,h.wrapS=Wl[d.wrapS]||ss,h.wrapT=Wl[d.wrapT]||ss,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==He&&h.minFilter!==Xe,i.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const n=this,i=this.json,s=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const a=i.images[t],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let g=d;e.isImageBitmapLoader===!0&&(g=function(_){const m=new Te(_);m.needsUpdate=!0,d(m)}),e.load(Fs.resolveURL(u,s.path),g,void 0,p)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),Bn(u,a),u.userData.mimeType=a.mimeType||tx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Xt.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Xt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=s.associations.get(a);a=s.extensions[Xt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),t[e]=a,a})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const i=e.attributes.tangent===void 0,s=e.attributes.color!==void 0,a=e.attributes.normal===void 0;if(t.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new $h,yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(t.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new ec,yn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return ac}loadMaterial(t){const e=this,n=this.json,i=this.extensions,s=n.materials[t];let a;const o={},c=s.extensions||{},l=[];if(c[Xt.KHR_MATERIALS_UNLIT]){const u=i[Xt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,s,e))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new Tt(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Ce),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(e.assignTexture(o,"map",u.baseColorTexture,we)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(e.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,o)})))}s.doubleSided===!0&&(o.side=sn);const h=s.alphaMode||Ia.OPAQUE;if(h===Ia.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Ia.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==an&&(l.push(e.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new Ut(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==an&&(l.push(e.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==an){const u=s.emissiveFactor;o.emissive=new Tt().setRGB(u[0],u[1],u[2],Ce)}return s.emissiveTexture!==void 0&&a!==an&&l.push(e.assignTexture(o,"emissiveMap",s.emissiveTexture,we)),Promise.all(l).then(function(){const u=new a(o);return s.name&&(u.name=s.name),Bn(u,s),e.associations.set(u,{materials:t}),s.extensions&&yi(i,u,s),u})}createUniqueName(t){const e=ne.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Xt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,e).then(function(c){return Xl(c,o,e)})}const a=[];for(let o=0,c=t.length;o<c;o++){const l=t[o],h=Q_(l),u=i[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[Xt.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=Xl(new Ge,l,e),i[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(t){const e=this,n=this.json,i=this.extensions,s=n.meshes[t],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?$_(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(e.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){const _=h[p],m=a[p];let f;const b=l[p];if(m.mode===nn.TRIANGLES||m.mode===nn.TRIANGLE_STRIP||m.mode===nn.TRIANGLE_FAN||m.mode===void 0)f=s.isSkinnedMesh===!0?new zg(_,b):new Re(_,b),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===nn.TRIANGLE_STRIP?f.geometry=Hl(f.geometry,Rh):m.mode===nn.TRIANGLE_FAN&&(f.geometry=Hl(f.geometry,To));else if(m.mode===nn.LINES)f=new Yh(_,b);else if(m.mode===nn.LINE_STRIP)f=new nc(_,b);else if(m.mode===nn.LINE_LOOP)f=new Wg(_,b);else if(m.mode===nn.POINTS)f=new Xg(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&J_(f,s),f.name=e.createUniqueName(s.name||"mesh_"+t),Bn(f,s),m.extensions&&yi(i,f,m),e.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)e.associations.set(u[p],{meshes:t,primitives:p});if(u.length===1)return s.extensions&&yi(i,u[0],s),u[0];const d=new ze;s.extensions&&yi(i,d,s),e.associations.set(d,{meshes:t});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new Ae(Qe.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(e=new Zo(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),Bn(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let i=0,s=e.joints.length;i<s;i++)n.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const u=a[l];if(u){o.push(u);const d=new Pt;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new tc(o,c)})}loadAnimation(t){const e=this.json,n=this,i=e.animations[t],s=i.name?i.name:"animation_"+t,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const p=i.channels[u],g=i.samplers[p.sampler],_=p.target,m=_.node,f=i.parameters!==void 0?i.parameters[g.input]:g.input,b=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",b)),l.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],p=u[1],g=u[2],_=u[3],m=u[4],f=[];for(let b=0,T=d.length;b<T;b++){const x=d[b],L=p[b],C=g[b],R=_[b],D=m[b];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const E=n._createAnimationTracks(x,L,C,R,D);if(E)for(let M=0;M<E.length;M++)f.push(E[M])}return new Io(s,void 0,f)})}createNodeMesh(t){const e=this.json,n=this,i=e.nodes[t];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(t){const e=this.json,n=this,i=e.nodes[t],s=n._loadNodeShallow(t),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,ex)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(t){const e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const s=e.nodes[t],a=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){o.push(l)}),this.nodeCache[t]=Promise.all(o).then(function(l){let h;if(s.isBone===!0?h=new jh:l.length>1?h=new ze:l.length===1?h=l[0]:h=new pe,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Bn(h,s),s.extensions&&yi(n,h,s),s.matrix!==void 0){const u=new Pt;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],i=this,s=new ze;n.name&&(s.name=i.createUniqueName(n.name)),Bn(s,n),n.extensions&&yi(e,s,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);const l=h=>{const u=new Map;for(const[d,p]of i.associations)(d instanceof yn||d instanceof Te)&&u.set(d,p);return h.traverse(d=>{const p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=l(s),s})}_createAnimationTracks(t,e,n,i,s){const a=[],o=t.name?t.name:t.uuid,c=[];ei[s.path]===ei.weights?t.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(ei[s.path]){case ei.weights:l=ls;break;case ei.rotation:l=hs;break;case ei.position:case ei.scale:l=us;break;default:switch(n.itemSize){case 1:l=ls;break;case 2:case 3:default:l=us;break}break}const h=i.interpolation!==void 0?Y_[i.interpolation]:zs,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){const g=new l(c[d]+"."+ei[s.path],e.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=Do(e.constructor),i=new Float32Array(e.length);for(let s=0,a=e.length;s<a;s++)i[s]=e[s]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const i=this instanceof hs?K_:su;return new i(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function ix(r,t,e){const n=t.attributes,i=new je;if(n.POSITION!==void 0){const o=e.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new A(c[0],c[1],c[2]),new A(l[0],l[1],l[2])),o.normalized){const h=Do(Qi[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=t.targets;if(s!==void 0){const o=new A,c=new A;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=e.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const _=Do(Qi[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new wn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Xl(r,t,e){const n=t.attributes,i=[];function s(a,o){return e.getDependency("accessor",a).then(function(c){r.setAttribute(o,c)})}for(const a in n){const o=Lo[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(t.indices!==void 0&&!r.index){const a=e.getDependency("accessor",t.indices).then(function(o){r.setIndex(o)});i.push(a)}return Kt.workingColorSpace!==Ce&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Kt.workingColorSpace}" not supported.`),Bn(r,t),ix(r,t,e),Promise.all(i).then(function(){return t.targets!==void 0?Z_(r,t.targets,e):r})}const ru={rom:{value:new Tt(1,1,1)},chr:{value:new Tt(1,1,1)},obj:{value:new Tt(1,1,1)},itm:{value:new Tt(1,1,1)},inv:{value:new Tt(.55,.55,.55).multiplyScalar(Math.PI)}},ql={flg:1,type:4,aspd:30,lkflg:1,lkno:0,lkono:9,lsrc:4,p:[0,0,0],l:[.3,0,-1.5],v:[0,1,0],spc:0,dif:0,amb:0,c:[3.16,2.06,.7],nr:.8,fr:40,ang:[0,0,0,0,0]},Xi=r=>Math.sin(r*2*Math.PI/65536),jl=r=>Math.cos(r*2*Math.PI/65536),Sr=r=>({...JSON.parse(JSON.stringify(r)),mode:0,ct0:0,px:r.p[0],py:r.p[1],pz:r.p[2],way:r.ang[3]??0});class sx{constructor(){S(this,"group",new ze);S(this,"pts",[]);S(this,"dir",new Br(16777215,0));S(this,"lgt",[]);S(this,"evl",[]);S(this,"amb",{idx:[0,1,0,2],r:[1,1,1,0],g:[1,1,1,0],b:[1,1,1,0]});S(this,"event",!1);S(this,"lockFn",null);for(let t=0;t<3;t++){const e=new qr(16777215,0,1,0);this.pts.push(e),this.group.add(e)}this.group.add(this.dir,this.dir.target)}setRoom(t,e,n){for(this.lgt=(t??[]).map(Sr),this.evl=(e??[]).map(Sr);this.lgt.length<4;)this.lgt.push(Sr({...ql,flg:1,type:0,lkflg:0,c:[0,0,0]}));for(let i=0;i<4;i++)this.lgt[i].flg&=-3;n&&(this.amb=JSON.parse(JSON.stringify(n))),this.event=!1,this.applyAmb()}hide(t,e){const n=t?this.evl:this.lgt;for(let i=t?0:4;i<n.length;i++)(e[i>>5]??0)&2147483648>>>(i&31)?n[i].flg&=-3:n[i].flg|=2}set(t,e,n){const i=(n===0?this.lgt:this.evl)[e];i&&(t===0?i.flg|=1:i.flg&=-2)}type(t,e,n){const i=this.lgt[t];i&&(i.type=e,i.aspd=n)}param(t,e,n,i,s,a,o){const c=(e===0?this.lgt:this.evl)[t];c&&(c.c=[n/100,i/100,s/100],c.nr=a/100*.1,c.fr=o/100*.1)}setAmb(t,e,n,i){this.amb.r[i]=t*.1,this.amb.g[i]=e*.1,this.amb.b[i]=n*.1,this.applyAmb()}applyAmb(){const t=this.amb,e=(n,i)=>ru[n].value.setRGB(t.r[i]??0,t.g[i]??0,t.b[i]??0).multiplyScalar(Math.PI);e("rom",t.idx[0]),e("chr",t.idx[1]),e("obj",t.idx[2]),e("itm",t.idx[3])}lighter(t){const e=this.lgt[1];if(e)if(t){if(!(e.flg&2)){const n=Sr(ql);n.flg|=2,this.lgt[1]=n}}else e.flg&=-3}frame(){var i;const t=this.event?[...this.lgt.slice(0,4),...this.evl]:this.lgt;let e=0,n=!1;for(const s of t){if(!(s.flg&1)||!(s.flg&2))continue;let[a,o,c]=s.c,[l,h,u]=s.v,d;const p=()=>Math.random();switch(s.type){case 1:d=Xi(s.ct0)*.25,a=d*a+a*.75,o=d*o+o*.75,c=d*c+c*.75,s.ct0=s.ct0+(s.aspd<<8)&32767;break;case 2:d=Xi(s.ct0)*.5,a=d*a+a*.5,o=d*o+o*.5,c=d*c+c*.5,s.ct0=s.ct0+(s.aspd<<8)&32767;break;case 3:d=Xi(s.ct0),a*=d,o*=d,c*=d,s.ct0=s.ct0+(s.aspd<<8)&32767;break;case 4:d=Xi(s.ct0)*.25,a=d*a+a*.75,o=d*o+o*.75,c=d*c+c*.75,s.ct0=s.ct0+Math.floor((s.aspd<<8)*p())&32767;break;case 5:d=Xi(s.ct0)*.5,a=d*a+a*.5,o=d*o+o*.5,c=d*c+c*.5,s.ct0=s.ct0+Math.floor((s.aspd<<8)*p())&32767;break;case 6:d=Xi(s.ct0),a*=d,o*=d,c*=d,s.ct0=s.ct0+Math.floor((s.aspd<<8)*p())&32767;break;case 8:case 9:{s.way=s.way+(s.type===8?-1:1)*(Math.floor(182.04445*.5*s.aspd)&65535)&65535;const f=rx(s.ang[2],s.way,s.ang[4]);l=f.x,h=f.y,u=f.z;break}case 12:s.mode===0?--s.ct0<=0&&(s.ct0=Math.floor(s.aspd*p())+1,s.mode=1):(a*=.5,o*=.5,c*=.5,--s.ct0<=0&&(s.ct0=Math.floor(s.aspd*p())+1,s.mode=0));break;case 13:d=jl(s.ct0),a*=d,o*=d,c*=d,s.ct0+=s.aspd<<8,s.ct0>16383&&(s.flg&=-2);break;case 100:s.mode===0?s.mode++:s.flg&=-3;break;case 101:d=jl(s.ct0),a*=d,o*=d,c*=d,s.ct0+=s.aspd<<8,s.ct0>16383&&(s.flg&=-3);break}let g=s.px,_=s.py,m=s.pz;if(s.lkflg>=1&&s.lkflg<=4){const f=(i=this.lockFn)==null?void 0:i.call(this,s.lkflg,s.lkno,[s.l[0]*.1,s.l[1]*.1,s.l[2]*.1],s.lkono);if(!f){s.flg&=-4;continue}g=s.px=f.x,_=s.py=f.y,m=s.pz=f.z}if(s.lsrc===2&&!n)n=!0,this.dir.color.setRGB(a,o,c),this.dir.intensity=Math.PI,this.dir.position.set(-l,-h,-u),this.dir.target.position.set(0,0,0);else if(s.lsrc===4&&e<3){const f=this.pts[e++];f.position.set(g,_,m),f.color.setRGB(Math.max(0,a),Math.max(0,o),Math.max(0,c)),f.intensity=Math.PI,f.distance=Math.max(s.fr,.001),f.decay=-(Math.max(0,s.nr)+1e-4)}}n||(this.dir.intensity=0);for(let s=e;s<3;s++)this.pts[s].intensity=0}}function rx(r,t,e){const n=2*Math.PI/65536;return new A(0,0,-1).applyEuler(new Ve(r*n,t*n,e*n,"ZYX"))}function ax(){const r=kt,t="float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {";!r.lights_pars_begin.includes(t)||r.lights_pars_begin.includes("NINJA_RANGE")||(r.lights_pars_begin=r.lights_pars_begin.replace(t,t+`
	// NINJA_RANGE
	if ( decayExponent < 0.0 ) { float nr = - decayExponent; return clamp( ( cutoffDistance - lightDistance ) / max( cutoffDistance - nr, 1e-4 ), 0.0, 1.0 ); }`))}function Tn(r){var e;return((e=window.__ASSETS)==null?void 0:e[r])??`assets/${r}`}const ox=new S_,Kl=new Map;function Wn(r){let t=Kl.get(r);return t||(t=window.__ASSETS&&!window.__ASSETS[r]?Promise.reject(new Error("missing asset "+r)):ox.loadAsync(Tn(r)),Kl.set(r,t)),t}async function zr(r){return(await fetch(Tn(r))).json()}const cx=kt.lights_fragment_begin.replace("getAmbientLightIrradiance( ambientLightColor )","uAmb");function ui(r,t="chr"){r.traverse(e=>{const n=e;if(!n.isMesh)return;const i=s=>{var u,d;const a=s,c=!!(((u=a.userData)==null?void 0:u.gltfExtensions)??{}).KHR_materials_unlit||a.isMeshBasicMaterial,l={map:a.map??null,color:((d=a.color)==null?void 0:d.clone())??new Tt(1,1,1),transparent:a.transparent,alphaTest:a.alphaTest,side:a.side,depthWrite:a.depthWrite,opacity:a.opacity},h=c?new an(l):new qg(l);if(h.name=a.name,h.userData={...a.userData,amb:t},h.map&&(h.map.anisotropy=4,h.map.colorSpace!==mn&&(h.map.colorSpace=mn,h.map.needsUpdate=!0)),!c){t!=="inv"&&h.color.multiplyScalar(178/255);const p=ru[t];h.onBeforeCompile=g=>{g.uniforms.uAmb=p,g.fragmentShader=`uniform vec3 uAmb;
`+g.fragmentShader.replace("#include <lights_fragment_begin>",cx)}}return h};n.material=Array.isArray(n.material)?n.material.map(i):i(n.material)})}class uc{constructor(t){S(this,"group",new ze);S(this,"shapes",[]);S(this,"wallShapes",[]);S(this,"objMeshes",new Map);S(this,"outside",new Set);S(this,"floor");S(this,"itemMeshes",new Map);S(this,"itemClips",new Map);S(this,"lights",[]);S(this,"occluders",[]);S(this,"nodes",new Map);S(this,"ray",new Bl);S(this,"occRay",new Bl);this.data=t}setHidden(t){for(const e of this.nodes.keys()){const n=!!((t[e>>5]??0)&2147483648>>>(e&31));for(const i of this.ownMeshes(e))i.geometry.setDrawRange(0,n?0:1/0)}}ownMeshes(t){const e=this.nodes.get(t);if(!e)return[];const n=[];e.isMesh&&n.push(e);for(const i of e.children)i.isMesh&&!/^n\d+$/.test(i.name)&&n.push(i);return n}hiddenMeshes(t){const e=new Set;if(!t)return e;for(const n of this.nodes.keys())if((t[n>>5]??0)&2147483648>>>(n&31))for(const i of this.ownMeshes(n))e.add(i);return e}static async load(t){const e=await zr(`rooms/${t}.json`),n=new uc(e);return await n.build(),n}async build(){const t=this.data,e=(await Wn(`rooms/${t.id}.glb`)).scene.clone(!0);e.scale.setScalar(.1),ui(e,"rom"),this.group.add(e),e.updateMatrixWorld(!0),this.buildFloor(e),e.traverse(i=>{const s=/^n(\d+)$/.exec(i.name);s&&this.nodes.set(+s[1],i)}),e.traverse(i=>{const s=i;if(!s.isMesh||!s.visible)return;const a=Array.isArray(s.material)?s.material[0]:s.material;a.transparent||(a.alphaTest??0)>0||this.occluders.push(s)});const n=new je().setFromObject(e);for(let i=0;i<t.objects.length;i++){const s=t.objects[i];if(!s.model||s.flags==="00000000")continue;const a=new A(...s.pos),o=a.x<n.min.x-.05||a.z<n.min.z-.05||a.x>n.max.x+.05||a.z>n.max.z+.05,c=(await Wn(`objects/${s.model}.glb`)).scene.clone(!0);o&&(this.outside.add(i),c.visible=!1),ui(c,"obj"),c.scale.setScalar(.1),c.position.copy(a),c.rotation.set(s.rot[0],s.rot[2],s.rot[1],"ZYX"),c.name=s.model,this.group.add(c),this.objMeshes.set(i,c)}this.wallShapes=t.collision.map(i=>this.colliderShape(i)),this.shapes=this.wallShapes.filter((i,s)=>i&&parseInt(t.collision[s].type,16)&1)}buildFloor(t){const e=[],n=new A,i=new A,s=new A,a=new A;t.traverse(c=>{const l=c;if(!l.isMesh)return;const h=l.geometry.attributes.position,u=l.geometry.index,d=u?u.count:h.count;for(let p=0;p<d;p+=3){const g=u?u.getX(p):p,_=u?u.getX(p+1):p+1,m=u?u.getX(p+2):p+2;n.fromBufferAttribute(h,g).applyMatrix4(l.matrixWorld),i.fromBufferAttribute(h,_).applyMatrix4(l.matrixWorld),s.fromBufferAttribute(h,m).applyMatrix4(l.matrixWorld),a.subVectors(i,n).cross(s.clone().sub(n));const f=a.length();f<1e-9||Math.abs(a.y/f)<.55||e.push(n.x,n.y,n.z,i.x,i.y,i.z,s.x,s.y,s.z)}});const o=new Ge;o.setAttribute("position",new Ue(e,3)),o.computeBoundingSphere(),o.computeBoundingBox(),this.floor=new Re(o,new an({side:sn})),this.floor.visible=!1}addLight(t){const e=new Tt(t.color[0],t.color[1],t.color[2]),n=Math.max(t.color[0],t.color[1],t.color[2]);if(n<.03)return;e.multiplyScalar(1/n);const i=t.far>.01?Math.min(t.far,30):6,s=new qr(e,Math.min(n,3.5)*2.2,i,1);s.position.set(t.pos[0],t.pos[1],t.pos[2]),this.group.add(s),this.lights.push(s)}colliderShape(t){const n=parseInt(t.type,16)>>8&255;return n===7||n===6||n===2||t.y>.6?null:n===4||n===5?{k:"tri",a:new Ut(t.x,t.z),b:new Ut(t.x+t.sx,t.z),c:new Ut(t.x,t.z+t.sz)}:n===3?{k:"circle",x:t.x,z:t.z,r:Math.max(.08,t.sx*.5)}:{k:"box",x0:t.x,z0:t.z,x1:t.x+t.sx,z1:t.z+t.sz}}syncWalls(t){this.shapes=this.wallShapes.filter((e,n)=>e&&t(n))}async placeItems(){for(let t=0;t<this.data.items.length;t++){const e=this.data.items[t];try{const n=await Wn(`items/it_${String(e.id).padStart(3,"0")}.glb`),i=n.scene.clone(!0);n.animations.length&&this.itemClips.set(t,n.animations),ui(i,"itm"),i.scale.setScalar(.1),i.position.set(...e.pos),i.rotation.set(e.rot[0],e.rot[2],e.rot[1],"ZYX"),this.group.add(i),this.itemMeshes.set(t,i)}catch{}}}removeItem(t){const e=this.itemMeshes.get(t);e&&(e.removeFromParent(),this.itemMeshes.delete(t))}floorAt(t,e,n,i=.45){this.ray.set(new A(t,n+i,e),new A(0,-1,0)),this.ray.far=i+2;const s=this.ray.intersectObject(this.floor,!1);return s.length?s[0].point.y:null}clearDistance(t,e,n){const i=e.clone().sub(t),s=i.length();if(s<1e-6)return 0;this.occRay.set(t,i.divideScalar(s)),this.occRay.far=s,this.occRay.near=0;const a=this.occRay.intersectObjects(this.occluders,!1),o=new Ot,c=new A;for(const l of a)if(!(!l.face||n&&n.has(l.object))&&(o.getNormalMatrix(l.object.matrixWorld),c.copy(l.face.normal).applyMatrix3(o),c.dot(i)<0))return l.distance;return s}resolve(t,e){for(let n=0;n<3;n++)for(const i of this.shapes)if(i.k==="box"){const s=Math.max(i.x0,Math.min(t.x,i.x1)),a=Math.max(i.z0,Math.min(t.z,i.z1)),o=t.x-s,c=t.z-a,l=o*o+c*c;if(l>=e*e)continue;if(l>1e-10){const h=Math.sqrt(l);t.x=s+o/h*e,t.z=a+c/h*e}else{const h=t.x-i.x0,u=i.x1-t.x,d=t.z-i.z0,p=i.z1-t.z,g=Math.min(h,u,d,p);g===h?t.x=i.x0-e:g===u?t.x=i.x1+e:g===d?t.z=i.z0-e:t.z=i.z1+e}}else if(i.k==="circle"){const s=t.x-i.x,a=t.z-i.z,o=Math.hypot(s,a),c=e+i.r;o<c&&o>1e-6&&(t.x=i.x+s/o*c,t.z=i.z+a/o*c)}else{const s=new Ut(t.x,t.z),a=lx(s,i.a,i.b,i.c),o=hx(s,i.a,i.b,i.c),c=s.distanceTo(o);if(a){const l=o.clone().sub(s),h=l.length()||1;t.x=o.x+l.x/h*e,t.z=o.y+l.y/h*e}else if(c<e){const l=s.clone().sub(o).divideScalar(c||1);t.x=o.x+l.x*e,t.z=o.y+l.y*e}}}bounds(){return this.floor.geometry.boundingBox.clone()}}function lx(r,t,e,n){const i=(h,u,d)=>(h.x-d.x)*(u.y-d.y)-(u.x-d.x)*(h.y-d.y),s=i(r,t,e),a=i(r,e,n),o=i(r,n,t),c=s<0||a<0||o<0,l=s>0||a>0||o>0;return!(c&&l)}function La(r,t,e){const n=e.clone().sub(t),i=Math.max(0,Math.min(1,r.clone().sub(t).dot(n)/(n.lengthSq()||1)));return t.clone().addScaledVector(n,i)}function hx(r,t,e,n){const i=La(r,t,e),s=La(r,e,n),a=La(r,n,t),o=r.distanceToSquared(i),c=r.distanceToSquared(s),l=r.distanceToSquared(a);return o<=c&&o<=l?i:c<=l?s:a}const ux={idle:["m35","m36","m37"],walk:["m00","m02","m03"],run:["m04","m07","m08"],back:["m11","m12","m13"],turnL:["m46"],turnR:["m47"]},Yl={walk:35/39,run:19/25},Er=1.05,$l=2.6,dx=2.6,fx=.2,px="k00",mx=["k01","k04","k07"],gx=["k03","k06","k09"],_x=9/30,xx=24/30,vx=8/30,yx={draw:px,act:mx,stance:gx,drawT:_x,actT:xx,hitT:vx},Mx={draw:"g00",act:["g01","g03","g05"],stance:["g02","g04","g06"],drawT:9/30,actT:16/30,hitT:1/30},bx="g07",Sx=32/30;class Ex{constructor(){S(this,"root",new ze);S(this,"model");S(this,"mixer");S(this,"actions",new Map);S(this,"cur","");S(this,"heading",0);S(this,"state","idle");S(this,"frozen",!1);S(this,"onStep",null);S(this,"stepPrev",-1);S(this,"stepClip","");S(this,"tail",[]);S(this,"tailRest",[]);S(this,"sway",new Ut);S(this,"swayV",new Ut);S(this,"lastPos",new A);S(this,"lastHead",0);S(this,"bones",{});S(this,"lighterOn",!1);S(this,"lighter",null);S(this,"knifeHand",null);S(this,"gunHand",null);S(this,"gunOn",!1);S(this,"onFire",null);S(this,"needReload",null);S(this,"skinHandR",[]);S(this,"zippoParts",[]);S(this,"knifeOn",!1);S(this,"hp",160);S(this,"sync",null);S(this,"aiming",!1);S(this,"slashT",-1);S(this,"kState","none");S(this,"kT",0);S(this,"kDir",0);S(this,"kQueued",!1);S(this,"onSlash",null);S(this,"flame");S(this,"flameLight");S(this,"flameT",0);S(this,"armBlend",0);S(this,"slashHit",!1);S(this,"canFire",null);S(this,"emptyClick",null)}async load(){const t=await Wn("chars/claire.glb");this.model=t.scene,ui(this.model),this.model.traverse(e=>{e.isMesh&&(e.castShadow=!1,e.frustumCulled=!1),/^b\d\d$|^pt\d$/.test(e.name)&&(this.bones[e.name]=e)}),this.root.add(this.model),this.mixer=new hc(this.model);for(const e of t.animations)this.actions.set(e.name,this.mixer.clipAction(e));this.play("idle",0);for(let e=0;e<4;e++){const n=this.bones["pt"+e];n&&(this.tail.push(n),this.tailRest.push(n.quaternion.clone()))}await this.loadLighter()}async loadHand(t){var i;const n=(await Wn(t)).scene.clone(!0);return ui(n),n.scale.setScalar(.1),n.visible=!1,n.traverse(s=>{s.isMesh&&(s.frustumCulled=!1)}),(i=this.bones.b09)==null||i.add(n),n}async loadLighter(){this.model.traverse(n=>{const i=n.material;n.isMesh&&i&&/handR/.test(i.name)&&this.skinHandR.push(n)});try{this.lighter=await this.loadHand("chars/hand_zippo.glb"),this.lighter.traverse(n=>{const i=n.material;n.isMesh&&i&&/_t0$/.test(i.name)&&this.zippoParts.push(n)})}catch{this.lighter=null}try{this.knifeHand=await this.loadHand("chars/hand_knife.glb")}catch{this.knifeHand=null}try{this.gunHand=await this.loadHand("chars/hand_gun.glb")}catch{this.gunHand=null}const t=new sc(.009,.035,10,1,!0);t.translate(0,.0175,0),this.flame=new Re(t,new an({color:16756800,transparent:!0,opacity:.9,blending:ts,depthWrite:!1}));const e=new Re(new rc(.006,8,6),new an({color:16773312,transparent:!0,opacity:.9,blending:ts,depthWrite:!1}));e.position.y=.006,this.flame.add(e),this.flame.visible=!1,this.root.add(this.flame),this.flameLight=new qr(16754768,0,6,1.6),this.root.add(this.flameLight)}setLighter(t){this.lighterOn=t&&!!this.lighter}setKnife(t){this.knifeOn=t&&!!this.knifeHand,!this.knifeOn&&!this.gunOn&&(this.aiming=!1,this.slashT=-1)}setGun(t){this.gunOn=t&&!!this.gunHand,this.gunOn&&(this.knifeOn=!1),!this.knifeOn&&!this.gunOn&&(this.aiming=!1,this.slashT=-1),this.kState="none"}get wpn(){return this.gunOn?Mx:yx}updateHands(){const t=this.armBlend>.5,e=this.knifeOn&&!t,n=this.gunOn&&!t;this.lighter&&(this.lighter.visible=t),this.knifeHand&&(this.knifeHand.visible=e),this.gunHand&&(this.gunHand.visible=n);for(const i of this.skinHandR)i.visible=!t&&!e&&!n}dmlvl(){return this.hp>=120?0:this.hp>=30?1:2}play(t,e=.18,n=1){const i=ux[t];this.playId(i[Math.min(i.length-1,this.dmlvl())],e,!0,n)}playId(t,e,n,i=1,s=!1){const a=this.actions.get(t);if(!a||(a.timeScale=i,this.cur===t&&!s))return;if(this.cur===t){a.reset(),a.play();return}const o=this.actions.get(this.cur);a.reset(),a.setLoop(n?Xo:Vr,1/0),a.clampWhenFinished=!n,a.play(),o&&e>0?a.crossFadeFrom(o,e,!1):o&&o.stop(),this.cur=t}get pos(){return this.root.position}forward(t=new A){return t.set(-Math.sin(this.heading),0,-Math.cos(this.heading))}place(t,e,n,i){this.root.position.set(t,e,n),this.heading=i,this.root.rotation.y=i,this.lastPos.set(t,e,n),this.lastHead=i}headPos(t=new A){const e=this.bones.b05;return e?e.getWorldPosition(t):t.copy(this.root.position).setY(this.root.position.y+1.5)}playSync(t,e=!1,n=.08){this.sync=t,this.aiming=!1,this.kState="none",t?this.playId(t,n,e):this.play("idle",.25)}update(t,e,n,i=null){if(this.sync){this.state="sync",this.root.rotation.y=this.heading,this.mixer.update(t),this.updateTail(t),this.updateLighter(t),this.updateHands();return}let s=0,a=0;const o=(this.knifeOn||this.gunOn)&&!this.lighterOn&&!this.frozen;if(this.aiming=o&&(e.aim||this.kState==="slash"||this.kState==="reload"),this.aiming||(this.kState="none"),!this.frozen&&i!==null){const l=(e.strafeR?1:0)-(e.strafeL?1:0),h=(e.fwd?1:0)-(e.back?1:0);let u=null;if(this.aiming)u=i;else if(l||h){const d=Math.cos(i),p=Math.sin(i),g=-p*h+d*l,_=-d*h-p*l;u=Math.atan2(-g,-_),s=e.run?$l:Er}if(u!==null){let d=u-this.heading;d=Math.atan2(Math.sin(d),Math.cos(d));const p=(this.aiming?14:9)*t;this.heading+=Qe.clamp(d,-p,p),Math.abs(d)>1.6&&s>0&&(s*=.35),!s&&Math.abs(d)>.05&&!this.aiming&&(a=Math.sign(d))}}else this.frozen||(e.left&&(a+=1),e.right&&(a-=1),e.fwd?s=e.run?$l:Er:e.back&&(s=-.62),this.aiming&&(s=0));const c=this.dmlvl();if(c===2&&s>0&&(s*=s>Er?Yl.run:Yl.walk),this.heading+=a*dx*t*(s>Er?.8:1)*(c===2?.8:1)*(i!==null?0:1),this.root.rotation.y=this.heading,this.aiming?this.updateKnife(t,e):s>0?(this.state=e.run?"run":"walk",this.play(this.state)):s<0?(this.state="back",this.play("back")):a!==0?(this.state="turn",this.play("walk",.15,.7)):(this.state="idle",this.play("idle",.25)),s!==0){const l=this.forward(),h=this.root.position.clone().addScaledVector(l,s*t);n.resolve(h,fx);const u=n.floorAt(h.x,h.z,this.root.position.y);u!==null&&Math.abs(u-this.root.position.y)<.5&&this.root.position.set(h.x,u,h.z)}else{const l=n.floorAt(this.root.position.x,this.root.position.z,this.root.position.y);l!==null&&(this.root.position.y=l)}this.mixer.update(t),this.footsteps(),this.updateTail(t),this.updateLighter(t),this.updateHands()}footsteps(){var s,a;const t={m00:[10,28,0],m02:[10,28,0],m03:[10,28,0],m04:[8,18,1],m07:[8,18,1],m08:[8,18,1],m11:[10,28,0],m12:[10,28,0],m13:[10,28,0]},e=this.state==="walk"||this.state==="run"||this.state==="back"?t[this.cur]:void 0,n=e&&this.actions.get(this.cur);if(!e||!n){this.stepClip="";return}const i=Math.floor(n.time*30);if(this.stepClip===this.cur){const o=c=>this.stepPrev<c&&i>=c||i<this.stepPrev&&(i>=c||this.stepPrev<c);o(e[0])&&((s=this.onStep)==null||s.call(this,this.bones.b17,e[2])),o(e[1])&&((a=this.onStep)==null||a.call(this,this.bones.b21,e[2]))}this.stepClip=this.cur,this.stepPrev=i}updateKnife(t,e){var s,a,o,c,l;const n=this.wpn,i=e.fwd?1:e.back?2:0;if(this.kT+=t,this.kState==="none"&&(this.kState="draw",this.kT=0,this.kQueued=!1,this.playId(n.draw,.12,!1,1,!0)),e.attack&&this.kState!=="stance"&&(this.kQueued=!0),this.kState==="draw"&&this.kT>=n.drawT&&(this.kState="stance",this.kT=0),this.kState==="reload"&&this.kT>=Sx&&(this.kState="stance",this.kT=0,this.kQueued=!1),this.kState==="slash"){if(!this.slashHit&&this.kT>=n.hitT){this.slashHit=!0,this.root.updateMatrixWorld(!0);const h=this.forward(),u=this.bones.b09?this.bones.b09.getWorldPosition(new A):this.headPos();this.gunOn?(this.kDir===1?h.y=.6:this.kDir===2&&(h.y=-.6),h.normalize(),(s=this.onFire)==null||s.call(this,u,h,this.kDir)):(a=this.onSlash)==null||a.call(this,u.addScaledVector(h,.25),h)}this.kT>=n.actT&&(this.kState="stance",this.kT=0)}this.kState==="stance"&&(this.gunOn&&((o=this.needReload)!=null&&o.call(this))?(this.kState="reload",this.kT=0,this.playId(bx,.1,!1,1,!0)):e.attack||this.kQueued?(this.kQueued=!1,this.kDir=i,this.slashHit=!1,this.gunOn&&this.onFire&&!((c=this.canFire)!=null&&c.call(this))?((l=this.emptyClick)==null||l.call(this),this.kT=0,this.kState="slash",this.slashHit=!0,this.playId(n.stance[i],.15,!0)):(this.kState="slash",this.kT=0,this.playId(n.act[i],.06,!1,1,!0))):(this.kDir=i,this.playId(n.stance[i],.15,!0))),this.slashT=this.kState==="slash"?this.kT:-1,this.state=this.kState==="slash"?"slash":this.kState==="reload"?"reload":"aim"}solveArm(t,e,n){const i=this.bones.b07,s=this.bones.b08,a=this.bones.b09;if(!i||!s||!a)return;const o=i.getWorldPosition(new A),c=s.getWorldPosition(new A),l=a.getWorldPosition(new A),h=o.distanceTo(c),u=c.distanceTo(l),d=t.clone().sub(o);let p=d.length();const g=(h+u)*.98;p>g&&(d.setLength(g),p=g,t=o.clone().add(d));const _=d.clone().normalize(),m=n.clone().normalize().addScaledVector(_,-n.clone().normalize().dot(_)).normalize(),f=Qe.clamp((h*h+p*p-u*u)/(2*h*p),-1,1),b=Math.sqrt(1-f*f),T=o.clone().addScaledVector(_,h*f).addScaledVector(m,h*b);this.aimBone(i,c.clone().sub(o),T.clone().sub(o),e);const x=s.getWorldPosition(new A),L=a.getWorldPosition(new A);this.aimBone(s,L.clone().sub(x),t.clone().sub(x),e)}updateTail(t){if(!this.tail.length||t<=0)return;const e=this.root.position.clone().sub(this.lastPos).divideScalar(t);this.lastPos.copy(this.root.position);let n=this.heading-this.lastHead;this.lastHead=this.heading,n=Math.atan2(Math.sin(n),Math.cos(n))/t;const i=this.forward(),s=e.x*i.x+e.z*i.z,a=new Ut(Qe.clamp(s*.22,-.3,.6),Qe.clamp(-n*.12,-.5,.5));a.x+=Math.sin(this.mixer.time*9)*.03*Math.min(1,Math.abs(s)),this.swayV.addScaledVector(a.clone().sub(this.sway),60*t).multiplyScalar(Math.exp(-7*t)),this.sway.addScaledVector(this.swayV,t);const o=this.tail[0];this.root.updateMatrixWorld(!0);const c=new A(-i.z,0,i.x),l=new A(0,-1,0).addScaledVector(i,-.14-this.sway.x*1.1).addScaledVector(c,this.sway.y*.9).normalize(),h=c.clone().addScaledVector(l,-c.dot(l)).normalize(),u=new A().crossVectors(l,h),d=new Ee().setFromRotationMatrix(new Pt().makeBasis(h,u,l)),p=o.parent.getWorldQuaternion(new Ee);o.quaternion.copy(p.invert().multiply(d));const g=new Ee;for(let _=1;_<this.tail.length;_++)g.setFromEuler(new Ve(-this.sway.x*.3,this.sway.y*.3,0)),this.tail[_].quaternion.copy(this.tailRest[_]).multiply(g)}aimBone(t,e,n,i){const s=new Ee().setFromUnitVectors(e.clone().normalize(),n.clone().normalize());i<1&&s.slerp(new Ee,1-i);const a=t.getWorldQuaternion(new Ee),o=t.parent.getWorldQuaternion(new Ee);t.quaternion.copy(o.invert().multiply(s).multiply(a)),t.updateMatrixWorld(!0)}updateLighter(t){const e=this.lighterOn?1:0;this.armBlend+=(e-this.armBlend)*Math.min(1,t*6);const n=this.bones.b07,i=this.bones.b08,s=this.bones.b09,a=this.armBlend>.02&&!!this.lighter&&!!n&&!!i&&!!s;if(this.flame.visible=a&&this.armBlend>.6,this.flameLight.intensity=0,!a)return;this.root.updateMatrixWorld(!0);const o=n.getWorldPosition(new A),c=i.getWorldPosition(new A),l=s.getWorldPosition(new A),h=o.distanceTo(c),u=c.distanceTo(l),d=this.forward(),p=new A(0,1,0),g=new A().crossVectors(d,p).normalize(),_=o.clone().addScaledVector(d,.33).addScaledVector(g,-.06).addScaledVector(p,-.08),m=_.clone().sub(o);let f=m.length();const b=(h+u)*.98;f>b&&(m.setLength(b),f=b,_.copy(o).add(m));const T=m.clone().normalize(),x=p.clone().multiplyScalar(-1).addScaledVector(g,.6).normalize(),L=x.clone().addScaledVector(T,-x.dot(T)).normalize(),C=Qe.clamp((h*h+f*f-u*u)/(2*h*f),-1,1),R=Math.sqrt(1-C*C),D=o.clone().addScaledVector(T,h*C).addScaledVector(L,h*R);this.aimBone(n,c.clone().sub(o),D.clone().sub(o),this.armBlend);const E=i.getWorldPosition(new A),M=s.getWorldPosition(new A);this.aimBone(i,M.clone().sub(E),_.clone().sub(E),this.armBlend),this.root.updateMatrixWorld(!0);const I=new je;for(const J of this.zippoParts)I.expandByObject(J);const V=new Pt().copy(this.root.matrixWorld).invert(),q=(I.isEmpty()?s.getWorldPosition(new A):I.getCenter(new A)).clone();I.isEmpty()||(q.y=I.max.y-.035),this.flameT+=t;const Y=q.clone().addScaledVector(p,.035).applyMatrix4(V),X=1+Math.sin(this.flameT*23)*.08+Math.sin(this.flameT*37.7)*.06+(Math.random()-.5)*.08;this.flame.position.copy(Y),this.flame.scale.set(1,X,1),this.flameLight.position.copy(Y).add(new A(0,.05,0))}}const As=360/65536,Rs=Math.PI/180,Da=r=>(r+32768&65535)-32768;function Zl(r,t,e,n,i){const s=i*i,a=s*i,o=[];for(let c=0;c<t.length;c++)o.push(.5*(2*t[c]+(-r[c]+e[c])*i+(2*r[c]-5*t[c]+4*e[c]-n[c])*s+(-r[c]+3*t[c]-3*e[c]+n[c])*a));return o}class Tx{constructor(t){S(this,"active",!1);S(this,"evc",[]);S(this,"no",0);S(this,"key",0);S(this,"ct0",0);S(this,"mode",0);S(this,"paused",!1);S(this,"P",[]);S(this,"F",[]);this.lock=t}setRoom(t){this.evc=t??[],this.active=!1}start(t,e){if(!this.evc[t]||!this.evc[t].keys.length){this.active=!1;return}this.no=t,this.key=Math.min(e,this.evc[t].keys.length-1),this.ct0=0,this.mode=0,this.active=!0,this.paused=!1}stop(){this.active=!1}lockAng(t,e){if(!t.lk[0])return e;const n=this.lock(t.lk[0],t.lk[1],t.lk[2],t.l);if(!n)return e;const i=n.x-t.pos[0],s=n.y-t.pos[1],a=n.z-t.pos[2];return[Da(-Math.round(10430.381*Math.atan2(s,Math.hypot(i,a)))),Da(-Math.round(10430.381*Math.atan2(i,a))+32768),t.ang[2]]}build(){const t=this.evc[this.no],e=this.no===t.nxt-1,n=t.nxt?this.evc[t.nxt-1]:null;let i=e?n.keys[n.keys.length-1]:t.keys[0];const s=[],a=[];let o=this.lockAng(i,i.ang),c=o.map(h=>h*As);s.push([...i.pos,...c]),a.push([i.pers*As]),t.nxt&&(i=t.keys[0],o=this.lockAng(i,i.ang),c=o.map(h=>h*As));let l=0;for(let h=1;h<20;h++){s.push([...i.pos,...c]),a.push([i.pers*As]);let u=null;if(h<t.keys.length?u=t.keys[h]:n&&l<n.keys.length&&(u=n.keys[l],l++),u){const d=o;i=u,o=this.lockAng(i,i.ang),c=c.map((p,g)=>p+Da(o[g]-d[g])*As)}}this.P=s,this.F=a}step(){if(!this.active||(this.mode===0&&(this.mode=1,this.ct0=0),this.mode!==1||this.paused))return;const t=this.evc[this.no],e=t.keys[this.key];this.ct0++,e.frame<=this.ct0&&(this.ct0=0,this.key++,this.key>=t.keys.length-1&&(t.nxt===0?(this.key>=t.keys.length&&(this.key=t.keys.length-1),this.mode=2):this.key>=t.keys.length&&(this.no=t.nxt-1,this.key=0)))}apply(t,e=0){this.build();const n=this.evc[this.no],i=n.keys[this.key],s=this.mode===1&&i.frame?Math.min(1,(this.ct0+(this.paused?0:e))/i.frame):0,a=this.key,o=this.P,c=this.F,l=(p,g)=>p[Math.min(g,p.length-1)],h=Zl(l(o,a),l(o,a+1),l(o,a+2),l(o,a+3),s),u=Zl(l(c,a),l(c,a+1),l(c,a+2),l(c,a+3),s)[0];t.position.set(h[0],h[1],h[2]),t.rotation.set(-h[3]*Rs,-h[4]*Rs,h[5]*Rs,"YXZ");const d=2*Math.atan(Math.tan(u*Rs/2)*.75)/Rs;Math.abs(t.fov-d)>.001&&(t.fov=d,t.updateProjectionMatrix()),t.updateMatrixWorld(!0)}}const Vs=4/3,Na=46;class wx{constructor(){S(this,"cam",new Ae(Na,Vs,.05,200));S(this,"index",-1);S(this,"forced",null);S(this,"lockFn",null);S(this,"ev",new Tx((t,e,n,i)=>{var s;return((s=this.lockFn)==null?void 0:s.call(this,t,e,n,i))??null}));S(this,"evSub",0);S(this,"mode","fixed");S(this,"usingFallback",!1);S(this,"cams",[]);S(this,"room",null);S(this,"trackYaw",null);S(this,"trackPitch",null);S(this,"visT",0);S(this,"override",-2);S(this,"follow",{pos:new A,look:new A,init:!1});S(this,"cut",[]);S(this,"cutOn",null);S(this,"shown",-1);S(this,"tmpCam",new Ae(Na,Vs,.05,200));S(this,"yaw",0);S(this,"pitch",.08);S(this,"zoom",0)}computeCuts(){this.cut=[];const t=this.room;if(t)for(const e of this.cams)this.cut.push(t.hiddenMeshes(e.hid))}applyCut(t){this.cutOn=t}setRoom(t){this.cutOn=null,this.room=t,this.ev.stop(),this.forced=null,this.cams=t.data.cameras,this.computeCuts(),this.cams=t.data.cameras,this.index=-1,this.override=-2,this.follow.init=!1,this.trackYaw=null}inside(t,e,n,i=0){const[s,a,o,c]=t.zone;return e>=Math.min(s,o)-i&&e<=Math.max(s,o)+i&&n>=Math.min(a,c)-i&&n<=Math.max(a,c)+i}zoneCam(t){const e=this.cams[this.index];if(e&&this.inside(e,t.x,t.z,.05))return this.index;let n=-1,i=1/0;for(let s=0;s<this.cams.length;s++){const a=this.cams[s];if(this.inside(a,t.x,t.z))return s;const o=Qe.clamp(t.x,Math.min(a.zone[0],a.zone[2]),Math.max(a.zone[0],a.zone[2])),c=Qe.clamp(t.z,Math.min(a.zone[1],a.zone[3]),Math.max(a.zone[1],a.zone[3])),l=Math.hypot(o-t.x,c-t.z);l<i&&(i=l,n=s)}return e?this.index:n}aim(t,e){const n=t.lim??[0,0,0,0],i=Math.max(n[0],n[1]),s=Math.max(n[2],n[3]);if(i<=0&&s<=0)return{yaw:t.yaw,pitch:t.pitch,track:!1};const a=e.x-t.pos[0],o=e.y+1-t.pos[1],c=e.z-t.pos[2],l=Math.atan2(-a,-c),h=Math.atan2(-o,Math.hypot(a,c));let u=l-t.yaw;return u=Math.atan2(Math.sin(u),Math.cos(u)),{yaw:t.yaw+Qe.clamp(u,-i,i),pitch:Qe.clamp(h,t.pitch-s,t.pitch+s),track:!0}}visible(t,e,n){const i=this.aim(t,e),s=this.tmpCam;s.position.set(t.pos[0],t.pos[1],t.pos[2]),s.rotation.set(-i.pitch,i.yaw,t.roll,"YXZ"),s.updateMatrixWorld(!0);const a=[e.clone().setY(e.y+.9),n.clone(),e.clone().setY(e.y+.3)];let o=0,c=0;for(const l of a){const h=l.clone().project(s);if(h.z<1&&Math.abs(h.x)<.97&&Math.abs(h.y)<.97)o++;else continue;if(!this.room){c++;continue}const u=s.position.distanceTo(l);this.room.clearDistance(s.position,l,this.cut[this.cams.indexOf(t)])>=u-.25&&c++}return o>=2&&c>=1}update(t,e,n,i=!1,s=1/60){var g;const a=this.index,o=this.override;if(this.shown=-1,this.ev.active)return this.applyCut(null),this.ev.apply(this.cam,this.evSub),this.follow.init=!1,this.index=-1,!1;if(this.mode==="behind")return this.applyCut(null),this.updateShoulder(t,e,i,s),!1;const c=this.forced!==null&&this.cams[this.forced]?this.forced:null;let l=c??this.zoneCam(t);if(this.index=l,this.visT-=s,c!==null)this.override=-2;else if(i||this.visT<=0||l!==a){this.visT=.2;const _=this.cams[l];if(_&&this.visible(_,t,e))this.override=-2;else if(!(this.override>=0&&this.cams[this.override]&&this.visible(this.cams[this.override],t,e))){let m=-1,f=1/0;for(let b=0;b<this.cams.length;b++){if(b===l||!this.visible(this.cams[b],t,e))continue;const T=this.cams[b],x=Math.hypot(T.pos[0]-t.x,T.pos[2]-t.z);x<f&&(f=x,m=b)}this.override=m>=0?m:-1}}if(this.usingFallback=this.override!==-2,this.override===-1)return this.applyCut(null),this.updateFollow(t,e,n,i||o!==-1,s),o!==-1;const h=this.override>=0?this.override:l,u=this.cams[h];if(!u)return!1;this.shown=h,this.applyCut((g=this.cut[h])!=null&&g.size?this.cut[h]:null);const d=h!==(o>=0?o:a)||o===-1;this.cam.fov=Na,this.cam.updateProjectionMatrix(),this.cam.position.set(u.pos[0],u.pos[1],u.pos[2]);const p=this.aim(u,t);if(p.track){if(d||i||this.trackYaw===null)this.trackYaw=p.yaw,this.trackPitch=p.pitch;else{const _=1-Math.exp(-4*s);this.trackYaw+=(p.yaw-this.trackYaw)*_,this.trackPitch+=(p.pitch-this.trackPitch)*_}this.cam.rotation.set(-this.trackPitch,this.trackYaw,u.roll,"YXZ")}else this.trackYaw=null,this.cam.rotation.set(-p.pitch,p.yaw,u.roll,"YXZ");return this.cam.updateMatrixWorld(!0),this.follow.init=!1,d}look(t,e){this.yaw-=t,this.pitch=Qe.clamp(this.pitch+e,-.65,.75)}resetYaw(t){this.yaw=t,this.pitch=.08}updateShoulder(t,e,n,i){const s=Math.cos(this.yaw),a=Math.sin(this.yaw),o=new A(-a,0,-s),c=new A(s,0,-a),l=this.zoom,h=new A(t.x,Math.max(e.y-.02,t.y+1.15),t.z),u=Math.cos(this.pitch),d=Math.sin(this.pitch),p=new A(o.x*u,-d,o.z*u),g=.36-.04*l,_=1.15-.45*l,m=.06,f=h.clone().addScaledVector(c,g);if(this.room){const L=h.distanceTo(f),C=this.room.clearDistance(h,f);C<L&&f.copy(h).add(f.clone().sub(h).setLength(Math.max(.05,C-.12)))}let b=f.clone().addScaledVector(p,-_).add(new A(0,m,0));if(this.room){const L=f.distanceTo(b),C=this.room.clearDistance(f,b);C<L&&(b=f.clone().add(b.clone().sub(f).setLength(Math.max(.12,C-.15))))}const T=b.clone().addScaledVector(p,6),x=this.follow;if(!x.init||n)x.pos.copy(b),x.look.copy(T),x.init=!0;else if(x.pos.lerp(b,1-Math.exp(-18*i)),x.look.copy(T),this.room){const L=f.distanceTo(x.pos),C=this.room.clearDistance(f,x.pos);C<L&&x.pos.copy(f).add(x.pos.clone().sub(f).setLength(Math.max(.12,C-.15)))}this.cam.fov=58-10*l,this.cam.near=.05,this.cam.updateProjectionMatrix(),this.cam.position.copy(x.pos),this.cam.lookAt(x.look),this.cam.updateMatrixWorld(!0)}updateFollow(t,e,n,i,s){const a=new A(-Math.sin(n),0,-Math.cos(n)),o=new A(t.x,Math.max(e.y,t.y+1.2)+.12,t.z);let c=o.clone().addScaledVector(a,-1.9).add(new A(0,.35,0));if(this.room){const u=o.distanceTo(c),d=this.room.clearDistance(o,c);d<u&&(c=o.clone().add(c.clone().sub(o).setLength(Math.max(.25,d-.18))))}const l=o.clone().addScaledVector(a,1.2).add(new A(0,-.25,0)),h=this.follow;if(!h.init||i)h.pos.copy(c),h.look.copy(l),h.init=!0;else{const u=1-Math.exp(-8*s);if(h.pos.lerp(c,u),h.look.lerp(l,1-Math.exp(-10*s)),this.room){const d=o.distanceTo(h.pos),p=this.room.clearDistance(o,h.pos);p<d&&h.pos.copy(o).add(h.pos.clone().sub(o).setLength(Math.max(.25,p-.18)))}}this.cam.fov=60,this.cam.updateProjectionMatrix(),this.cam.position.copy(h.pos),this.cam.lookAt(h.look),this.cam.updateMatrixWorld(!0)}}class Ax{constructor(){S(this,"down",new Set);S(this,"pressed",new Set);S(this,"mdx",0);S(this,"mdy",0);S(this,"locked",!1);addEventListener("keydown",t=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","Tab"].includes(t.code)&&t.preventDefault(),this.down.has(t.code)||this.pressed.add(t.code),this.down.add(t.code)}),addEventListener("keyup",t=>this.down.delete(t.code)),addEventListener("blur",()=>this.down.clear()),addEventListener("mousedown",t=>{const e="Mouse"+t.button;this.down.has(e)||this.pressed.add(e),this.down.add(e)}),addEventListener("mouseup",t=>this.down.delete("Mouse"+t.button)),addEventListener("contextmenu",t=>{this.locked&&t.preventDefault()}),addEventListener("mousemove",t=>{this.locked&&(this.mdx+=t.movementX,this.mdy+=t.movementY)}),document.addEventListener("pointerlockchange",()=>{this.locked=!!document.pointerLockElement})}requestLock(t){var e;if(!this.locked&&t.requestPointerLock)try{const n=t.requestPointerLock();(e=n==null?void 0:n.catch)==null||e.call(n,()=>{})}catch{}}releaseLock(){document.pointerLockElement&&document.exitPointerLock()}has(...t){return t.some(e=>this.down.has(e))}hit(...t){return t.some(e=>this.pressed.has(e))}get fwd(){return this.has("KeyW","ArrowUp")}get back(){return this.has("KeyS","ArrowDown")}get left(){return this.has("KeyA","ArrowLeft")}get right(){return this.has("KeyD","ArrowRight")}get strafeL(){return this.has("KeyA")}get strafeR(){return this.has("KeyD")}get camL(){return this.has("ArrowLeft")}get camR(){return this.has("ArrowRight")}get run(){return this.has("ShiftLeft","ShiftRight","KeyX")}get aim(){return this.has("KeyF","Mouse2","ControlLeft","ControlRight")}get attack(){return this.hit("KeyE","Space","Enter","KeyZ","Mouse0")}get action(){return this.hit("KeyE","Space","Enter","KeyZ")}get cancel(){return this.hit("Escape","Backspace","KeyQ")}get inventory(){return this.hit("Tab","KeyI")}get camToggle(){return this.hit("KeyC","KeyV")}endFrame(){this.pressed.clear(),this.mdx=0,this.mdy=0}}const Jl=new Set([12,31]);class Rx{constructor(){S(this,"slots",new Array(8).fill(null))}add(t,e,n=1){if(Jl.has(t)){const s=this.slots.find(a=>(a==null?void 0:a.id)===t);if(s)return s.count+=n,!0}const i=this.slots.findIndex(s=>!s);return i<0?!1:(this.slots[i]={id:t,name:e,count:n},!0)}canAdd(t){return Jl.has(t)&&this.has(t)||this.slots.some(e=>!e)}has(t){return this.slots.some(e=>(e==null?void 0:e.id)===t)}take(t){const e=this.slots.findIndex(i=>(i==null?void 0:i.id)===t);if(e<0)return!1;const n=this.slots[e];return n.count--,n.count<=0&&(this.slots[e]=null),!0}toJSON(){return this.slots}}const Cx={8:{en:`This weapon is a
veteran survivor's
first choice.`,ru:`Это оружие —
первый выбор
бывалого выживальщика.`},9:{en:`M93R\fAn Italian handgun
which uses
9mm × 19 rounds.`,ru:`M93R\fИтальянский пистолет
под патрон
9 × 19 мм.`},59:{en:`An emblem carved
with a
hawk symbol.\fIt appears to be
made of pure gold.`,ru:`Эмблема
с изображением
ястреба.\fПохоже, она из
чистого золота.`},83:{en:`A case made of
metal.\fThe case seems to
be closed.\fMaybe if you
examine it
closely...`,ru:`Металлический
кейс.\fКейс, похоже,
закрыт.\fМожет, если
осмотреть его
повнимательнее...`},86:{en:`A picture of a
hawk is carved on
it.\fIt's made of
newly-developed
alloy TG-01.`,ru:`На ней вырезано
изображение
ястреба.\fСделана из
новейшего
сплава TG-01.`},12:{en:`9mm × 19 Rounds\fThese can be used
with the M93R
and Glock 17.`,ru:`Патроны 9 × 19 мм\fПодходят для
M93R и Glock 17.`},21:{en:`This was made by
breeding the herb
from Raccoon city.`,ru:`Выведена из травы,
привезённой из
Раккун-Сити.`},31:{en:`Use this with a
typewriter to save
your progress.`,ru:`Используйте её
с пишущей машинкой,
чтобы сохраниться.`},50:{en:`Lockpick.\fA simple lock can
be opened with
this.`,ru:`Отмычка.\fЕю можно открыть
простой замок.`},55:{en:`An oil lighter.
You can use it to
light a dark area.`,ru:`Бензиновая зажигалка.
Ею можно осветить
тёмное место.`},95:{en:`Medicine that is
used to stop
bleeding.\fIt should be used
on someone who
is wounded.`,ru:`Лекарство,
останавливающее
кровотечение.\fЕго нужно применить
к раненому.`},104:{en:`Medicine that is
used to stop
bleeding.\fIt should be used
on someone who
is wounded.`,ru:`Лекарство,
останавливающее
кровотечение.\fЕго нужно применить
к раненому.`},133:{en:`A board clip holding
some papers.`,ru:`Планшет-зажим
с бумагами.`}},Ql=new Set([8,9]),Ua={9:[-1.15,0,.25]},th=new Set([55]),$t=()=>ye==="ru",ee={menu:()=>$t()?["ВЫХОД","ФАЙЛЫ","КАРТА","ПРЕДМЕТЫ"]:["EXIT","FILE","MAP","ITEM"],equip:()=>$t()?"ЭКИПИРОВКА":"EQUIP",standard:()=>$t()?"СТАНДАРТ":"STANDARD",status:()=>$t()?"СТАТУС":"STATUS",info:()=>$t()?"ИНФО":"INFO",name:()=>$t()?"КЛЭР":"CLAIRE",full:()=>$t()?"КЛЭР РЕДФИЛД":"CLAIRE REDFIELD",height:()=>$t()?"РОСТ":"HEIGHT",weight:()=>$t()?"ВЕС":"WEIGHT",blood:()=>$t()?"ГР.КРОВИ":"BLOOD TYPE",cm:()=>$t()?"см":"cm",kg:()=>$t()?"кг":"kg",btype:()=>$t()?"0":"O",cond:()=>$t()?"СОСТОЯНИЕ":"CONDITION",fine:()=>$t()?"Норма":"Fine",caution:()=>$t()?"Осторожно":"Caution",danger:()=>$t()?"Опасно":"Danger",list:()=>$t()?"СПИСОК":"LIST",use:()=>$t()?"Использовать":"Use",equipA:()=>$t()?"Экипировать":"Equip",unequip:()=>$t()?"Снять":"Unequip",hold:()=>$t()?"Взять в руку":"Hold",putAway:()=>$t()?"Убрать":"Put away",check:()=>$t()?"Осмотреть":"Check",combine:()=>$t()?"Комбинировать":"Combine",noData:()=>$t()?"Нет данных.":"No data.",equipped:r=>$t()?`${r}: экипировано.`:`Equipped the ${r}.`,lit:()=>$t()?"Клэр зажгла зажигалку.":"Claire lit the lighter.",unlit:()=>$t()?"Клэр убрала зажигалку.":"Claire put the lighter away.",rot:()=>$t()?"Стрелки — вращать · Enter — далее · Esc — назад":"Arrows — rotate · Enter — next · Esc — back"};function Ix(r){const t=Cx[r];return t?($t()?t.ru:t.en).split("\f"):[""]}const fn=930,De=650,Px=`
.inv{position:absolute;inset:0;display:none;background:#000;overflow:hidden;z-index:4}
.inv .scr{position:absolute;left:0;top:0;width:${fn}px;height:${De}px;transform-origin:0 0;font-family:"Arial Black",Arial,sans-serif;color:#d8d8d0}
.inv .scr *{box-sizing:border-box}
.inv .bgc{position:absolute;inset:0}
.inv .abs{position:absolute}
.inv .olive{background:linear-gradient(180deg,#b3b08a 0%,#8f8c66 18%,#6f6d4c 60%,#5a583c 100%);border:2px solid;border-color:#d6d3b0 #4b4930 #3e3c27 #cfcca8;box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.inv .stripes{background:repeating-linear-gradient(90deg,#8d8a64 0 2px,#6b694a 2px 4px,#7c7a58 4px 6px);border:2px solid;border-color:#cfcca8 #3e3c27 #3e3c27 #cfcca8}
.inv .hstripes{background:repeating-linear-gradient(0deg,#8d8a64 0 2px,#6b694a 2px 4px,#7c7a58 4px 6px)}
.inv .blue{background:linear-gradient(180deg,#0b0b56 0%,#1b1b8c 45%,#12127a 70%,#0a0a58 100%);border:2px solid;border-color:#05052a #7a7ac8 #9a9ae0 #05052a}
.inv .bar{display:flex;align-items:center;justify-content:center;font-size:13px;letter-spacing:.12em;color:#2a2a22;background:linear-gradient(180deg,#f0eedc 0%,#c9c6a8 35%,#8f8c70 70%,#bdb99a 100%);border:1px solid #3b3a2a}
.inv .btn{display:flex;align-items:center;justify-content:center;font-size:17px;letter-spacing:.02em;color:#cfcfc4;background:linear-gradient(180deg,#5a5338 0%,#3a3424 50%,#2b2618 100%);border:3px solid;border-color:#e2dcb0 #6b6440 #5a5434 #d8d2a6;box-shadow:0 0 0 2px #2a2718,inset 0 0 0 1px #000;text-shadow:1px 1px 0 #000}
.inv .btn.on{color:#ff8a2e}
.inv .btn.sel{box-shadow:0 0 0 2px #ff8a2e,inset 0 0 0 1px #000}
.inv .black{background:#000;border:3px solid;border-color:#cbbf7a #6e663c #6e663c #cbbf7a;box-shadow:0 0 0 2px #2d2a1a}
.inv .tab{display:flex;align-items:center;padding-left:10px;font-size:17px;letter-spacing:.06em;color:#fff;background:linear-gradient(180deg,#2a2aa8,#121270);border:2px solid #e8e8ff;box-shadow:0 0 0 2px #000}
.inv .tab:after{content:'';position:absolute;right:4px;top:50%;margin-top:-7px;border:7px solid transparent;border-left:9px solid #a0a0c0;border-right:0}
.inv .teal{border:3px solid #1d9f98;box-shadow:inset 0 0 0 1px #0b3c3a,0 0 0 1px #052}
.inv .head{position:absolute;left:0;right:0;top:0;height:13px;font:bold 10px Arial,sans-serif;letter-spacing:.15em;color:#bfe;padding-left:6px;line-height:13px;background:repeating-linear-gradient(0deg,#126 0 1px,#0a0a3c 1px 3px)}
.inv .infotx{position:absolute;left:8px;right:8px;font:bold 14px Arial,sans-serif;letter-spacing:.08em;color:#e8e8f0;display:flex;justify-content:space-between;text-shadow:1px 1px 0 #000}
.inv .plate{display:flex;align-items:center;justify-content:center;font-size:18px;letter-spacing:.08em;color:#fff;background:linear-gradient(180deg,#26265e,#0c0c34);border:2px solid #f2f2f2;box-shadow:0 0 0 2px #000}
.inv .slot{position:absolute;width:100px;height:65px;display:flex;align-items:center;justify-content:center}
.inv .slot img{max-width:94px;max-height:58px}
.inv .slot .cnt{position:absolute;left:4px;bottom:1px;font:bold 17px Arial,sans-serif;color:#dfe6ff;text-shadow:1px 1px 0 #000}
.inv .slot .eq{position:absolute;right:4px;top:2px;font:bold 11px Arial,sans-serif;color:#ffd060;text-shadow:1px 1px 0 #000}
.inv .slot.sel{outline:3px solid #c81e1e;outline-offset:-3px;box-shadow:inset 0 0 8px rgba(255,40,40,.35)}
.inv .msgtx{position:absolute;left:14px;top:12px;right:14px;bottom:10px;font:24px/1.35 "Courier New",monospace;font-weight:bold;letter-spacing:.06em;color:#ececec;white-space:pre-wrap;text-shadow:1px 1px 0 #333}
.inv .sub{position:absolute;display:none;padding:6px 0;min-width:170px;z-index:3}
.inv .sub div{font:bold 15px Arial,sans-serif;letter-spacing:.05em;padding:5px 16px;color:#cfcfc4}
.inv .sub div.sel{color:#ff8a2e;background:rgba(0,0,0,.35)}
.inv .chk{position:absolute;display:none;left:75px;top:162px;width:538px;height:278px;z-index:2;background:radial-gradient(ellipse at 50% 45%,#1a1a70,#03031c 75%);border:3px solid;border-color:#cbbf7a #6e663c #6e663c #cbbf7a}
.inv .chk canvas{position:absolute;left:0;top:0;width:100%;height:100%}
.inv .grp{position:absolute;left:0;top:0;width:${fn}px;height:${De}px;pointer-events:none}
.inv .grp>*{pointer-events:auto}
.inv .slot.cmb{outline:3px dashed #ffb030;outline-offset:-3px}
.inv .ich{display:inline-block;margin:0 1.2em}
.inv .ich.sel{color:#ff8a2e}
.inv.get .stc{visibility:hidden}
.inv .chk .hint{position:absolute;bottom:4px;width:100%;text-align:center;font:11px Arial,sans-serif;color:#8a8ab8}
`,eh=[4,1,0,16,2,4,17,18,3,20],Fa=160,Lx={9:[[19,10,0],[12,9,0]],12:[[5,5,1],[9,9,1],[10,10,1],[12,12,2],[131,131,1]],21:[[21,24,6],[22,25,6],[23,26,6],[24,28,6],[26,27,6]],22:[[21,25,6],[26,29,6]],23:[[21,26,6],[24,27,6],[25,29,6]],24:[[21,28,6],[23,27,6]],25:[[23,29,6]],26:[[21,27,6],[22,29,6]]},ka=new Set([12]),Dx={9:15,10:15,12:15},Nx={1:[0,-120],2:[-448,0],3:[288,0],5:[208,0],6:[0,152]};class Ux{constructor(t,e,n,i,s){S(this,"open",!1);S(this,"equipped",null);S(this,"standard",null);S(this,"onEquipChange");S(this,"onUseItem");S(this,"anim",null);S(this,"ask",null);S(this,"cmbA",-1);S(this,"getId",-1);S(this,"acc",0);S(this,"mode","list");S(this,"sel",0);S(this,"menuSel",3);S(this,"subSel",0);S(this,"subOpts",[]);S(this,"text","");S(this,"pages",[]);S(this,"page",0);S(this,"r3",null);S(this,"icons",new Map);S(this,"portrait",null);S(this,"ecgT",0);S(this,"chk",null);S(this,"q",t=>this.root.querySelector(t));this.root=t,this.inv=e,this.input=n,this.audio=i,this.player=s;const a=document.createElement("style");a.textContent=Px,document.head.appendChild(a),t.innerHTML=`<div class="scr">
<canvas class="bgc" width="${fn}" height="${De}"></canvas>
<!-- top menu -->
<div class="grp" data-c="1">
<div class="abs olive" style="left:40px;top:55px;width:428px;height:72px"></div>
<div class="abs olive" style="left:300px;top:118px;width:168px;height:28px;border-top:0"></div>
<div class="abs menu"></div>
</div>
<!-- equipment / standard -->
<div class="grp" data-c="3">
<div class="abs olive" style="left:484px;top:55px;width:442px;height:100px"></div>
<div class="abs stripes" style="left:868px;top:58px;width:56px;height:76px"></div>
<div class="abs blue eqbox" style="left:515px;top:62px;width:203px;height:68px"></div>
<div class="abs blue stbox" style="left:765px;top:62px;width:103px;height:68px"></div>
<div class="abs bar l-eq" style="left:482px;top:133px;width:246px;height:20px"></div>
<div class="abs bar l-st" style="left:730px;top:133px;width:196px;height:20px"></div>
</div>
<!-- status panel -->
<div class="grp" data-c="2">
<div class="abs olive" style="left:0;top:135px;width:617px;height:312px"></div>
<div class="abs stripes" style="left:2px;top:138px;width:72px;height:305px"></div>
<div class="abs black" style="left:75px;top:162px;width:538px;height:278px"></div>
<div class="abs tab l-status stc" style="left:83px;top:148px;width:139px;height:24px"></div>
<canvas class="abs portrait stc" width="126" height="120" style="left:105px;top:189px;width:126px;height:120px;border:2px solid #0a0a40;background:linear-gradient(180deg,#1a1a6a,#08082c)"></canvas>
<div class="abs plate l-name stc" style="left:104px;top:314px;width:127px;height:26px"></div>
<canvas class="abs redemb stc" width="118" height="66" style="left:108px;top:350px;width:118px;height:66px"></canvas>
<div class="abs teal info stc" style="left:245px;top:189px;width:202px;height:97px;background:#08083a"><div class="head l-info"></div>
 <div class="infotx" style="top:18px"><span class="i-full"></span></div>
 <div class="infotx" style="top:37px"><span class="i-h"></span><span>169<small class="i-cm"></small></span></div>
 <div class="infotx" style="top:56px"><span class="i-w"></span><span>52.4<small class="i-kg"></small></span></div>
 <div class="infotx" style="top:75px"><span class="i-b"></span><span class="i-bt"></span></div></div>
<canvas class="abs emblem stc" width="116" height="97" style="left:465px;top:189px;width:116px;height:97px;border:2px solid #23238a"></canvas>
<div class="abs teal stc" style="left:245px;top:299px;width:336px;height:117px;background:#000"><div class="head l-cond"></div>
 <canvas class="ecg" width="330" height="98" style="position:absolute;left:0;top:13px;width:330px;height:98px"></canvas>
 <div class="fine" style="position:absolute;right:10px;bottom:4px;font:bold 22px Arial,sans-serif;color:#28c828;letter-spacing:.04em"></div></div>
<div class="abs pegs stc"></div>
<div class="abs chk"><canvas width="538" height="278"></canvas><div class="hint"></div></div>
</div>
<!-- item list -->
<div class="grp" data-c="5">
<div class="abs olive" style="left:658px;top:162px;width:214px;height:300px"></div>
<div class="abs blue list" style="left:667px;top:170px;width:200px;height:263px;padding:0"></div>
<div class="abs bar l-list" style="left:667px;top:437px;width:200px;height:20px"></div>
<div class="abs stripes" style="left:872px;top:155px;width:54px;height:440px"></div>
</div>
<!-- message box -->
<div class="grp" data-c="6">
<div class="abs olive" style="left:40px;top:450px;width:578px;height:146px"></div>
<div class="abs black" style="left:58px;top:459px;width:541px;height:127px"><div class="msgtx"></div></div>
</div>
<div class="abs olive sub"></div>
</div>`,this.drawBackground(),this.drawRed(),this.drawEmblem();const o=this.q(".pegs");for(const c of[223,353]){const l=document.createElement("div");l.className="abs",l.style.cssText=`left:615px;top:${c}px;width:44px;height:22px;border-radius:0 11px 11px 0;background:linear-gradient(180deg,#e8e8e0,#8a8a80 45%,#3a3a34 100%);border:1px solid #222`,o.appendChild(l)}addEventListener("resize",()=>this.layout())}layout(){const t=this.root.getBoundingClientRect();if(!t.width)return;const e=Math.min(t.width/fn,t.height/De),n=this.q(".scr");n.style.transform=`translate(${(t.width-fn*e)/2}px,${(t.height-De*e)/2}px) scale(${e})`}drawBackground(){const t=this.q(".bgc"),e=t.getContext("2d");e.fillStyle="#121212",e.fillRect(0,0,fn,De);const n=e.getImageData(0,0,fn,De);for(let a=0;a<n.data.length;a+=4){const o=14+Math.random()*16;n.data[a]=n.data[a+1]=n.data[a+2]=o,n.data[a+3]=255}e.putImageData(n,0,0);const i=(a,o,c,l,h)=>{const u=e.createLinearGradient(a-h,o,a+h,o+h);u.addColorStop(0,"#2a2a2a"),u.addColorStop(.5,"#6c6c68"),u.addColorStop(1,"#262626"),e.strokeStyle=u,e.lineWidth=h,e.beginPath(),e.moveTo(a,o),e.lineTo(c,l),e.stroke(),e.strokeStyle="rgba(160,160,150,.25)",e.lineWidth=1,e.beginPath(),e.moveTo(a,o-h/3),e.lineTo(c,l-h/3),e.stroke()},s=190;for(let a=-De;a<fn+De;a+=s)i(a,0,a+De,De,16),i(a+De,0,a,De,16);for(const a of[8,De-10]){const o=e.createLinearGradient(0,a-10,0,a+10);o.addColorStop(0,"#222"),o.addColorStop(.5,"#5e5e5a"),o.addColorStop(1,"#1c1c1c"),e.fillStyle=o,e.fillRect(0,a-10,fn,20)}for(let a=0;a<fn;a+=s/2)e.fillStyle="#7a7a72",e.beginPath(),e.arc(a,8,2.5,0,7),e.fill(),e.beginPath(),e.arc(a,De-10,2.5,0,7),e.fill()}drawRed(){const t=this.q(".redemb"),e=t.getContext("2d"),n=t.width,i=t.height,s=e.createRadialGradient(n/2,i/2,4,n/2,i/2,n*.7);s.addColorStop(0,"#5a0000"),s.addColorStop(.5,"#a00808"),s.addColorStop(1,"#3a0000"),e.fillStyle=s,e.fillRect(0,0,n,i),e.fillStyle="rgba(0,0,0,.55)",e.beginPath(),e.ellipse(n/2,i/2-4,30,18,0,0,7),e.fill(),e.fillStyle="rgba(255,90,90,.5)",e.beginPath(),e.ellipse(n/2-12,i/2-7,7,4,0,0,7),e.ellipse(n/2+12,i/2-7,7,4,0,0,7),e.fill(),e.fillStyle="rgba(255,200,200,.75)",e.font="6px Arial";for(let a=0;a<3;a++)e.fillText("LET ME LIVE · MADE IN HEAVEN · ROCKFORT",10,i-18+a*6);e.strokeStyle="rgba(255,220,220,.8)",e.lineWidth=1;for(const[a,o,c,l]of[[3,3,1,1],[n-3,3,-1,1],[3,i-3,1,-1],[n-3,i-3,-1,-1]])e.beginPath(),e.moveTo(a,o+l*8),e.lineTo(a,o),e.lineTo(a+c*8,o),e.stroke()}drawEmblem(){const t=this.q(".emblem"),e=t.getContext("2d"),n=t.width,i=t.height;e.fillStyle="#0c0c66",e.fillRect(0,0,n,i),e.strokeStyle="rgba(90,110,255,.7)",e.lineWidth=1;for(let a=0;a<=n;a+=9)e.beginPath(),e.moveTo(a+.5,0),e.lineTo(a+.5,i),e.stroke();for(let a=0;a<=i;a+=9)e.beginPath(),e.moveTo(0,a+.5),e.lineTo(n,a+.5),e.stroke();const s=(a,o,c,l)=>{e.save(),e.translate(a,o),e.rotate(l);const h=e.createLinearGradient(0,0,0,-c);h.addColorStop(0,"#ff4a00"),h.addColorStop(.6,"#ffb000"),h.addColorStop(1,"#fff4a0"),e.fillStyle=h,e.beginPath(),e.moveTo(-c*.25,0),e.quadraticCurveTo(-c*.35,-c*.5,0,-c),e.quadraticCurveTo(c*.1,-c*.55,c*.3,0),e.closePath(),e.fill(),e.restore()};for(let a=0;a<9;a++)s(n/2+(a-4)*10,i*.72-Math.abs(a-4)*3,34-Math.abs(a-4)*4,(a-4)*.22);e.fillStyle="#e8e8f8";for(const a of[-1,1])e.beginPath(),e.moveTo(n/2,i*.45),e.quadraticCurveTo(n/2+a*30,i*.18,n/2+a*44,i*.3),e.quadraticCurveTo(n/2+a*24,i*.38,n/2+a*6,i*.55),e.fill();e.fillStyle="#1a1010",e.beginPath(),e.arc(n/2,i*.36,6,0,7),e.fill(),e.beginPath(),e.moveTo(n/2-7,i*.44),e.lineTo(n/2+7,i*.44),e.lineTo(n/2+10,i*.78),e.lineTo(n/2-10,i*.78),e.closePath(),e.fill(),e.fillStyle="#f6f0d0",e.font="bold 8px Arial",e.textAlign="center",e.fillText("MADE IN HEAVEN",n/2,i-5)}lvl(){var e;const t=((e=this.player)==null?void 0:e.hp)??Fa;return t>=120?0:t>=60?1:t>=30?2:3}cond(){return[0,1,1,2][this.lvl()]}condRgb(t=1){return["rgba(40,200,40,","rgba(230,200,30,","rgba(240,120,20,","rgba(220,40,30,"][this.lvl()]+t+")"}drawEcg(t){const e=this.q(".ecg"),n=e.getContext("2d");this.ecgT+=t;const i=e.width,s=e.height;n.fillStyle="#000",n.fillRect(0,0,i,s),n.strokeStyle="#4a4a4a",n.lineWidth=1;for(let p=6;p<s;p+=9)n.beginPath(),n.moveTo(8,p+.5),n.lineTo(i-8,p+.5),n.stroke();const a=[1.9,1.3,.9][this.cond()],o=this.ecgT%a/a,c=40,l=i-80,h=c+o*l,u=s*.52,d=p=>{const g=(p-c)/l;if(g<=.18)return 0;const _=(g-.18)*14;return Math.sin(_*1.6)*Math.exp(-_*.32)*.95};n.lineWidth=2;for(let p=c;p<h;p+=2){const g=(h-p)/l;n.strokeStyle=this.condRgb(+Math.max(0,1-g*1.6).toFixed(3)),n.beginPath(),n.moveTo(p,u-d(p)*s*.45),n.lineTo(p+2,u-d(p+2)*s*.45),n.stroke()}}renderer(){if(!this.r3){const t=this.q(".chk canvas");this.r3=new Xh({canvas:t,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.r3.outputColorSpace=Ce}return this.r3}async model(t){const e=`it_${String(t).padStart(3,"0")}.glb`;let n;try{n=await Wn("inv/"+e)}catch{try{n=await Wn("items/"+e)}catch{return null}}const i=n.scene.clone(!0);ui(i,"inv");const s=new je().setFromObject(i),a=s.getCenter(new A),o=s.getSize(new A).length()||1;i.position.sub(a);const c=new ze;return c.add(i),c.scale.setScalar(2/o),c}stageFor(t){const e=new qh;e.add(new nu(16777215,1.3));const n=new Br(16777215,2.4);n.position.set(1,2,2.5),e.add(n);const i=new Br(10473727,.8);i.position.set(-2,-1,-1),e.add(i),e.add(t);const s=new Ae(28,1,.1,50);return s.position.set(0,0,4.4),s.lookAt(0,0,0),{scene:e,cam:s}}async icon(t){var g;if(this.icons.has(t))return this.icons.get(t);const e=await this.model(t);if(!e)return null;const n=new je().setFromObject(e).getSize(new A),i=((g=window.__iconRot)==null?void 0:g[t])??Ua[t];i?e.rotation.set(i[0],i[1],i[2]):n.y<=n.x&&n.y<=n.z?e.rotation.set(1.15,0,-.25):n.x<=n.y&&n.x<=n.z?e.rotation.set(.3,-1.2,0):e.rotation.set(.3,-.45,0);const{scene:s,cam:a}=this.stageFor(e);a.aspect=1.5,a.updateProjectionMatrix(),e.updateMatrixWorld(!0);const o=new je().setFromObject(e),c=o.getSize(new A),l=o.getCenter(new A),h=Math.tan(a.fov*Math.PI/360),u=Math.max(c.y,c.x/a.aspect)/(2*h)*1.08+c.z/2;a.position.set(l.x,l.y,l.z+u),a.lookAt(l);const d=this.renderer();d.setSize(192,128,!1),d.setClearColor(0,0),d.render(s,a);const p=d.domElement.toDataURL();return this.icons.set(t,p),p}async renderPortrait(){if(this.portrait)return;this.portrait=Tn("inv/portrait.jpg");const t=new Image;t.src=this.portrait,await t.decode().catch(()=>{});const e=this.q(".portrait");e.width=252,e.height=240,e.getContext("2d").drawImage(t,0,0,252,240)}show(t,e=-1){var n,i,s;return t?(this.open=!0,this.root.style.display="block",this.layout(),this.mode=e>=0?"get":"list",this.menuSel=3,this.getId=e,this.cmbA=-1,this.ask=null,this.root.classList.toggle("get",e>=0),this.setText(e>=0?"":this.curName()),this.audio.se("menu"),new Promise(a=>{this.anim={dir:1,f:0,wait:0,se7:!1,lock:e>=0?8:14,done:a},this.applyAnim(),this.renderPortrait().then(()=>this.render()),e>=0&&this.showGetModel(e)})):this.open?((i=(n=this.anim)==null?void 0:n.done)==null||i.call(n),(s=this.ask)==null||s.res(this.ask.choices?this.ask.choices.length-1:0),this.ask=null,this.audio.sys(9),new Promise(a=>{this.anim={dir:-1,f:8,wait:6,se7:!0,lock:0,done:()=>{this.open=!1,this.root.style.display="none",this.closeCheck(),this.mode="list",this.root.classList.remove("get"),this.getId=-1,a()}}})):Promise.resolve()}stepAnim(){var e,n;const t=this.anim;t.dir>0?t.f<8?(t.f++,t.f===8&&!t.se7&&(t.se7=!0,this.audio.sys(7))):--t.lock<=0&&(this.anim=null,(e=t.done)==null||e.call(t)):t.wait>0?t.wait--:t.f>0?t.f--:(this.anim=null,(n=t.done)==null||n.call(t)),this.applyAnim()}applyAnim(){const t=this.anim?this.anim.f:8,e=1-t/8;this.root.querySelectorAll(".grp").forEach(i=>{const s=Nx[+i.dataset.c]??[0,0];i.style.transform=e?`translate(${s[0]*e*fn/640}px,${s[1]*e*De/480}px)`:""});const n=Math.min(1,t*.0571*2.2);this.root.style.background=`rgba(0,0,0,${n})`,this.q(".bgc").style.opacity=String(Math.min(1,t*.0571))}say(t,e){var n;return(n=this.ask)==null||n.res(-1),new Promise(i=>{this.ask={pages:t.length?t:[""],page:0,choices:e??null,sel:0,res:i},this.renderAsk()})}renderAsk(){const t=this.ask,e=t.page===t.pages.length-1,n=this.q(".msgtx");n.innerHTML=Ds(t.pages[t.page])+(e&&t.choices?`
`+t.choices.map((i,s)=>`<span class="ich ${s===t.sel?"sel":""}">${Ds(i)}</span>`).join(""):"")}updateAsk(){const t=this.ask,e=this.input,n=t.page===t.pages.length-1,i=s=>{this.ask=null,this.q(".msgtx").textContent=this.text,t.res(s)};n&&t.choices?e.hit("KeyA","ArrowLeft")||e.hit("KeyD","ArrowRight")?(t.sel=(t.sel+1)%t.choices.length,this.audio.se("cursor"),this.renderAsk()):e.action?(this.audio.se(t.sel===t.choices.length-1?"cancel":"menu"),i(t.sel)):e.cancel&&(this.audio.se("cancel"),i(t.choices.length-1)):(e.action||e.cancel)&&(n?i(0):(t.page++,this.renderAsk()))}async showGetModel(t){const e=await this.model(t);if(this.getId!==t)return;const n=this.q(".chk");n.style.display="block",this.q(".chk .hint").textContent="",this.renderer().setSize(538,278,!1);const s=new ze;if(e){s.add(e);const c=Ua[t];c&&e.rotation.set(c[0],c[1],c[2])}const{scene:a,cam:o}=this.stageFor(s);o.aspect=538/278,o.position.z=3.4,o.updateProjectionMatrix(),this.chk={scene:a,cam:o,obj:s,rx:.35,ry:0}}refresh(){this.render()}heal(t){const e=eh[t-20]??0,n=e&15,i=this.player;i&&(n===1?i.hp+=50:n===2?i.hp+=100:n>=3&&(i.hp=Fa),i.hp=Math.min(Fa,i.hp))}cur(){return this.inv.slots[this.sel]??null}curName(){const t=this.cur();return t?Tr(t.name):""}setText(t){this.pages=Array.isArray(t)?t:t.split("\f"),this.page=0,this.text=this.pages[0]??"";const e=this.q(".msgtx");e&&(e.textContent=this.text)}slotHtml(t,e,n=""){return t?`${e?`<img src="${e}">`:`<span style="font:bold 12px Arial">${Ds(Tr(t.name))}</span>`}${t.count>1||t.id===12||t.id===9?`<span class="cnt">${t.count}</span>`:""}${n}`:""}async render(){var o,c;const t=this.q;t(".menu").innerHTML=ee.menu().map((l,h)=>`<div class="btn ${h===3&&this.mode!=="menu"?"on":""} ${this.mode==="menu"&&h===this.menuSel?"on sel":""}" style="position:absolute;left:${[18,116,216,314][h]}px;top:18px;width:90px;height:38px">${l}</div>`).join(""),t(".menu").style.cssText="left:40px;top:55px;width:0;height:0",t(".l-eq").textContent=ee.equip(),t(".l-st").textContent=ee.standard(),t(".l-status").textContent=ee.status(),t(".l-name").textContent=ee.name(),t(".l-info").textContent=ee.info(),t(".l-cond").textContent=ee.cond(),t(".l-list").textContent=ee.list(),t(".i-full").textContent=ee.full(),t(".i-h").textContent=ee.height(),t(".i-w").textContent=ee.weight(),t(".i-b").textContent=ee.blood(),t(".i-cm").textContent=ee.cm(),t(".i-kg").textContent=ee.kg(),t(".i-bt").textContent=ee.btype();{const l=this.cond(),h=t(".fine");h.textContent=l===2?ee.danger():l===1?ee.caution():ee.fine(),h.style.color=this.condRgb()}const e=l=>l==null?null:this.inv.slots.find(h=>(h==null?void 0:h.id)===l)??null,n=e(this.equipped),i=e(this.standard);!n&&this.equipped!=null&&(this.equipped=null,(o=this.onEquipChange)==null||o.call(this)),!i&&this.standard!=null&&(this.standard=null,(c=this.onEquipChange)==null||c.call(this)),t(".eqbox").innerHTML=n?`<div class="slot" style="left:50px;top:0">${this.slotHtml(n,await this.icon(n.id))}</div>`:"",t(".stbox").innerHTML=i?`<div class="slot" style="left:0;top:0">${this.slotHtml(i,await this.icon(i.id))}</div>`:"";const s=[];for(let l=0;l<8;l++){const h=this.inv.slots[l],u=h?await this.icon(h.id):null,d=h&&(h.id===this.equipped||h.id===this.standard)?'<span class="eq">E</span>':"";s.push(`<div class="slot ${l===this.sel&&this.mode!=="menu"&&this.mode!=="get"?"sel":""} ${this.mode==="comb"&&l===this.cmbA?"cmb":""}" style="left:${l%2*100}px;top:${Math.floor(l/2)*65.5}px">${this.slotHtml(h,u,d)}</div>`)}t(".list").innerHTML=s.join("");const a=t(".sub");this.mode==="sub"?(a.innerHTML=this.subOpts.map((l,h)=>`<div class="${h===this.subSel?"sel":""}">${l.t}</div>`).join(""),a.style.left="478px",a.style.top=Math.min(330,175+Math.floor(this.sel/2)*65)+"px",a.style.display="block"):a.style.display="none",this.ask?this.renderAsk():t(".msgtx").textContent=this.text}openSub(){const t=this.cur();if(!t)return;const e=Ql.has(t.id)?{t:this.equipped===t.id?ee.unequip():ee.equipA(),k:"use"}:th.has(t.id)?{t:this.standard===t.id?ee.putAway():ee.hold(),k:"use"}:{t:ee.use(),k:"use"};this.subOpts=[e,{t:ee.check(),k:"check"},{t:ee.combine(),k:"combine"}],this.subSel=0,this.mode="sub",this.audio.se("menu")}doUse(){var e,n,i;const t=this.cur();if(t)if(Ql.has(t.id))this.equipped=this.equipped===t.id?null:t.id,this.equipped&&(this.standard=null),(e=this.onEquipChange)==null||e.call(this),this.setText(this.equipped?ee.equipped(Tr(t.name)):this.curName());else if(th.has(t.id))this.standard=this.standard===t.id?null:t.id,this.standard&&(this.equipped=null),(n=this.onEquipChange)==null||n.call(this),this.setText(this.standard?ee.lit():ee.unlit());else if(t.id>=20&&t.id<=29){if(eh[t.id-20]===0){this.setText(En(ai[161]));return}this.heal(t.id),this.inv.take(t.id),this.setText(this.curName())}else{if((i=this.onUseItem)!=null&&i.call(this,t.id))return;this.setText(En(ai[ka.has(t.id)?160:161]))}}async combine(t,e){var c;const n=this.inv.slots[t],i=this.inv.slots[e],s=n&&i&&t!==e?(c=Lx[i.id])==null?void 0:c.find(l=>l[0]===n.id):void 0;if(!n||!i||!s){this.audio.se("error");return}const[,a,o]=s;if(o===0||o===1){const[l,h]=ka.has(n.id)?[i,n]:[n,i];if(!ka.has(h.id)){this.inv.slots[t]=null,i.id=a,i.name=ks[a]??i.name,this.audio.se("menu");return}const u=Dx[l.id]??15,d=Math.min(u-l.count,h.count);if(d<=0){this.audio.se("cancel"),this.setText(En(ai[156]));return}l.count+=d,h.count-=d,h.count<=0&&(this.inv.slots[this.inv.slots.indexOf(h)]=null),this.audio.se("menu")}else if(o===2)i.count+=n.count,this.inv.slots[t]=null,this.audio.se("menu");else if(o===6){if(this.audio.se("menu"),await this.say(En(ai[155]),[dn.yes(),dn.no()])!==0)return;this.inv.slots[t]=null,this.inv.slots[e]={id:a,name:ks[a]??"",count:1},this.sel=e}else{this.audio.se("error");return}this.setText(this.curName())}async openCheck(){const t=this.cur();if(!t)return;const e=await this.model(t.id),n=this.q(".chk");n.style.display="block",this.q(".chk .hint").textContent=ee.rot(),this.renderer().setSize(538,278,!1);const s=new ze;if(e){s.add(e);const c=Ua[t.id];c&&e.rotation.set(c[0],c[1],c[2])}const{scene:a,cam:o}=this.stageFor(s);o.aspect=538/278,o.position.z=3.4,o.updateProjectionMatrix(),this.chk={scene:a,cam:o,obj:s,rx:.35,ry:0},this.setText(Ix(t.id)),this.mode="check"}closeCheck(){this.chk=null;const t=this.q(".chk");t&&(t.style.display="none"),this.mode==="check"&&(this.mode="list")}spinGet(t){if(this.mode!=="get"||!this.chk)return;const e=this.chk;e.ry+=t*.6,e.obj.rotation.set(e.rx,e.ry,0),this.r3.setClearColor(0,0),this.r3.render(e.scene,e.cam)}update(t){if(!this.open)return!1;const e=this.input;if(this.acc+=t,this.anim){for(;this.acc>=1/30&&this.anim;)this.acc-=1/30,this.stepAnim();return this.drawEcg(t),this.spinGet(t),!0}if(this.acc=0,this.mode==="get")return this.drawEcg(t),this.spinGet(t),this.ask&&this.updateAsk(),!0;if(this.ask)return this.drawEcg(t),this.updateAsk(),!0;const n=e.hit("KeyA","ArrowLeft"),i=e.hit("KeyD","ArrowRight"),s=e.hit("KeyW","ArrowUp"),a=e.hit("KeyS","ArrowDown");if(this.drawEcg(t),this.mode==="check"&&this.chk){const c=this.chk;return e.has("KeyA","ArrowLeft")?c.ry-=t*2.2:e.has("KeyD","ArrowRight")?c.ry+=t*2.2:c.ry+=t*.6,e.has("KeyW","ArrowUp")&&(c.rx-=t*2.2),e.has("KeyS","ArrowDown")&&(c.rx+=t*2.2),c.obj.rotation.set(c.rx,c.ry,0),this.r3.setClearColor(0,0),this.r3.render(c.scene,c.cam),e.action?this.page+1<this.pages.length?(this.page++,this.text=this.pages[this.page],this.q(".msgtx").textContent=this.text,this.audio.se("cursor")):(this.audio.se("cancel"),this.closeCheck(),this.setText(this.curName()),this.render()):(e.cancel||e.inventory)&&(this.audio.se("cancel"),this.closeCheck(),this.setText(this.curName()),this.render()),!0}if(this.mode==="sub"){if(s||a)this.subSel=(this.subSel+(a?1:this.subOpts.length-1))%this.subOpts.length,this.audio.se("cursor"),this.render();else if(e.action){const c=this.subOpts[this.subSel].k;this.mode="list",c==="use"?(this.audio.se("menu"),this.doUse(),this.render()):c==="check"?(this.audio.se("menu"),this.openCheck().then(()=>this.render())):(this.audio.se("menu"),this.cmbA=this.sel,this.mode="comb",this.render())}else e.cancel&&(this.mode="list",this.audio.se("cancel"),this.render());return!0}if(this.mode==="menu"){if(n||i)this.menuSel=(this.menuSel+(i?1:3))%4,this.audio.se("cursor"),this.setText(""),this.render();else if(a)this.mode="list",this.menuSel=3,this.audio.se("cursor"),this.setText(this.curName()),this.render();else if(e.action)if(this.menuSel===3)this.mode="list",this.audio.se("menu"),this.setText(this.curName()),this.render();else{if(this.menuSel===0)return this.audio.se("cancel"),!1;this.audio.se("menu"),this.setText(ee.noData())}else if(e.cancel||e.inventory)return this.audio.se("cancel"),!1;return!0}if(this.mode==="comb"){let c=0;if(n&&this.sel%2===1&&(c=-1),i&&this.sel%2===0&&(c=1),a&&this.sel<6&&(c=2),s&&this.sel>=2&&(c=-2),c)this.sel+=c,this.audio.se("cursor"),this.setText(this.curName()),this.render();else if(e.action){const l=this.cmbA;this.mode="list",this.cmbA=-1,this.combine(l,this.sel).then(()=>this.render()),this.render()}else e.cancel&&(this.mode="list",this.cmbA=-1,this.audio.se("cancel"),this.render());return!0}let o=0;if(n&&this.sel%2===1&&(o=-1),i&&this.sel%2===0&&(o=1),a&&this.sel<6&&(o=2),s)if(this.sel>=2)o=-2;else return this.mode="menu",this.menuSel=3,this.audio.se("cursor"),this.render(),!0;if(o)this.sel+=o,this.audio.se("cursor"),this.setText(this.curName()),this.render();else if(e.action)this.cur()&&(this.openSub(),this.render());else if(e.cancel||e.inventory)return this.audio.se("cancel"),!1;return!0}}const Fx=["door_knob","door_open","door_close","typewriter","gun_shot","gun_shell","gun_empty","gun_rl1","gun_rl2","gun_rl3"],kx=new Set(["000","002","003","004","005","006","007","008","009"]),Ox=new Set(["002","003","005","008","016"]),Oa=["000_0","003_0","003_1","005_0","006_0","007_0","010_0","014_0"],Bx=(()=>{const r=[];for(let t=0;t<128;t++)r.push(t<=32?-2*t:t<=64?-64-6*(t-32):t<=96?-256-8*(t-64):t<127?-512-16*(t-96):-999);return r})(),qi=r=>Bx[Math.max(0,Math.min(127,Math.round(-r)))]/10,Mi=r=>r<=-99?0:Math.pow(10,r/20),zx=[0,-2,-4,-6,-8,-10,-12,-14,-16,-18,-20,-22,-24,-26,-28,-30,-32,-32,-30,-28,-26,-24,-22,-20,-18,-16,-14,-12,-10,-8,-6,-4,-2,0,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,32,30,28,26,24,22,20,18,16,14,12,10,8,6,4,2,0],Hx=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2,-4,-6,-8,-10,-12,-14,-16,-18,-20,-22,-24,-26,-28,-30,-32,-34,-36,-38,-38,-36,-34,-32,-30,-28,-26,-24,-22,-20,-18,-16,-14,-12,-10,-8,-6,-4,-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Vx=r=>r<30?0:r<40?-1:Math.max(-87,-2-Math.floor((r-40)/5)),Gx=[0,256,256,0],Wx=[512,768,768,512],Ba=(r,t)=>String(r).padStart(t,"0");class Xx{constructor(){S(this,"ctx",null);S(this,"master");S(this,"sfx");S(this,"music");S(this,"buffers",new Map);S(this,"bufP",new Map);S(this,"banks",new Map);S(this,"slots",new Map);S(this,"rmBank","");S(this,"bgBank","");S(this,"pcBank","");S(this,"bgmIdx",null);S(this,"bgmNo",-1);S(this,"bgmVol",-127);S(this,"bgmV",null);S(this,"bgCur",[null,null,null]);S(this,"footSw",[0,0,0]);S(this,"listener",null);S(this,"voiceIdx",null);S(this,"voiceV",null);S(this,"voiceNo",-1);S(this,"sysSw",0)}init(){if(this.ctx)return;try{this.ctx=new AudioContext}catch{return}const t=this.ctx;this.master=t.createGain(),this.master.gain.value=.9,this.master.connect(t.destination),this.sfx=t.createGain(),this.sfx.connect(this.master),this.music=t.createGain(),this.music.connect(this.master);const e=()=>{var n;return((n=this.ctx)==null?void 0:n.state)==="suspended"&&this.ctx.resume()};addEventListener("keydown",e),addEventListener("pointerdown",e);for(const n of Fx)this.buf(`audio/${n}.ogg`);this.bank("sys")}buf(t){let e=this.bufP.get(t);return e||(e=(async()=>{try{const n=await fetch(Tn(t));if(!n.ok)return null;const i=await this.ctx.decodeAudioData(await n.arrayBuffer());return this.buffers.set(t,i),i}catch{return null}})(),this.bufP.set(t,e)),e}bank(t){let e=this.banks.get(t);return e||(e=(async()=>{try{const n=await fetch(Tn(`audio/se/${t}.json`));if(!n.ok)return null;const i=await n.json();if(this.ctx)for(const s of i.samples)this.buf(`audio/se/${s.f}.ogg`);return i}catch{return null}})(),this.banks.set(t,e)),e}room(t,e,n){if(!this.ctx)return;const i=`${t}${Ba(e,2)}`;this.rmBank=kx.has(i)?`rm_${i}_0`:"";const s=Ox.has(i)?`bg_${i}_0`:"";if(!s)for(let o=0;o<3;o++)this.bgSeOff(o);this.bgBank=s;let a=Oa[0];for(const o of Oa)+o.slice(0,3)<=+i&&(o.endsWith("_0")||+o[4]===n)&&(a=o);Oa.includes(`${Ba(+i,3)}_${n}`)&&(a=`${Ba(+i,3)}_${n}`),(i==="002"||i==="003")&&(a="005_0"),this.pcBank=`pc_${a}`;for(const o of[...this.slots.keys()])o.startsWith("bg")||this.stop(o);for(const o of[this.rmBank,this.bgBank,this.pcBank,"rm_common"])o&&this.bank(o)}spatial(t){const e=this.listener;if(!t||!e)return{u:0,pan:0};const n=t.clone().applyMatrix4(e.matrixWorldInverse),i=n.length()*10;let s=Math.atan2(-n.x,-n.z)*180/Math.PI;s<0&&(s+=360);const a=Math.min(67,Math.floor(s/5));return{u:Vx(i)+Hx[a],pan:zx[a]/128}}async playList(t,e,n,i={}){var d;const s=this.ctx;if(!s||!t)return;t.startsWith("rm_")&&e>=64&&(t="rm_common");const a=await this.bank(t);if(!a)return;const o=a.lists[e];if(!o||!a.samples[o.s])return;n&&this.stop(n);const c=s.createGain(),l=s.createStereoPanner();c.connect(l).connect(this.sfx);const h={srcs:[],gain:c,pan:l,pos:(d=i.pos)==null?void 0:d.clone(),base:i.u??0},u=this.spatial(h.pos);l.pan.value=Math.max(-1,Math.min(1,(i.pan??0)+u.pan)),i.fade?this.fadeUnits(c,i.fade[0]+u.u,i.fade[1]+u.u,i.fade[2]):c.gain.value=Mi(qi(h.base+u.u)),n&&this.slots.set(n,h);for(let p=o,g=0;p&&g<4;p=p.l!==void 0?a.lists[p.l]:void 0,g++){const _=a.samples[p.s];if(!_)continue;const m=this.buffers.get(`audio/se/${_.f}.ogg`)??await this.buf(`audio/se/${_.f}.ogg`);if(!m)continue;if(n&&this.slots.get(n)!==h)return;const f=s.createBufferSource();f.buffer=m,i.cents&&(f.detune.value=i.cents),_.loop&&i.loop!==!1&&(f.loop=!0,f.loopStart=_.loop[0]/_.sr,f.loopEnd=Math.min(m.duration,_.loop[1]/_.sr));const b=s.createGain();b.gain.value=Mi(p.v);let T=b;if(p.p!==void 0){const x=s.createStereoPanner();x.pan.value=p.p<128?(p.p-64)/64:1,b.connect(x),T=x}f.connect(b),T.connect(c),f.start(),h.srcs.push(f),f.onended=()=>{const x=h.srcs.indexOf(f);x>=0&&h.srcs.splice(x,1),!h.srcs.length&&n&&this.slots.get(n)===h&&this.slots.delete(n)}}}fadeUnits(t,e,n,i){const s=this.ctx,a=Math.max(2,Math.round(i)+1);if(i<=0){t.gain.value=Mi(qi(n));return}const o=new Float32Array(a);for(let c=0;c<a;c++)o[c]=Mi(qi(e+(n-e)*c/(a-1)));t.gain.cancelScheduledValues(s.currentTime),t.gain.setValueCurveAtTime(o,s.currentTime,i/30)}stop(t,e=0){const n=this.slots.get(t);if(!n)return;this.slots.delete(t);const i=this.ctx;if(e>0){n.gain.gain.cancelScheduledValues(i.currentTime),n.gain.gain.setValueAtTime(n.gain.gain.value,i.currentTime),n.gain.gain.linearRampToValueAtTime(0,i.currentTime+e/30);for(const s of n.srcs)s.stop(i.currentTime+e/30)}else for(const s of n.srcs)try{s.stop()}catch{}}eventSe(t,e,n,i){const s=i&&i[1]!==-1?i:void 0;this.playList(this.rmBank,e&255,`evt${t}`,{pos:n,fade:s,u:i?i[0]:0})}eventSeOff(t){this.stop(`evt${t}`)}bgSe(t,e,n=0){if(this.bgCur[t]===e&&this.slots.has(`bg${t}`))return;this.bgCur[t]=e;const i=(e>>8&15)===3?this.bgBank:this.rmBank;this.playList(i,e&255,`bg${t}`,n?{fade:[-127,0,n*.3]}:{})}bgSeOff(t,e=0){this.bgCur[t]=null,this.stop(`bg${t}`,e)}objSe(t,e,n){this.playList(this.rmBank,n&255,`obj${t}`,{pos:e})}objSeOff(t){this.stop(`obj${t}`)}foot(t,e,n,i=0,s){const a=e?Wx:Gx,o=a[Math.floor(Math.random()*4)&3];this.footSw[i]^=1,this.playList(this.pcBank,Math.max(0,Math.min(4,t)),`foot${i}_${this.footSw[i]}`,{pos:n,cents:o/1024*100,fade:s&&s[1]!==-1?s:void 0,u:s?s[0]:0})}action(t,e){this.playList(this.pcBank,t&255,"act",{pos:e})}async bgm(t,e=0,n=-45){const i=this.ctx;if(!i)return;if(t===this.bgmNo&&this.bgmV){n!==this.bgmVol&&(this.bgmVol=n,this.bgmV.gain.gain.setTargetAtTime(Mi(qi(n)),i.currentTime,.3));return}this.bgmOff(e||0),this.bgmNo=t,this.bgmVol=n,this.bgmIdx??(this.bgmIdx=fetch(Tn("audio/bgm.json")).then(h=>h.json()).catch(()=>({})));const s=(await this.bgmIdx)[t];if(!s||this.bgmNo!==t)return;const a=await this.buf(`audio/bgm/${s.f}.ogg`);if(!a||this.bgmNo!==t)return;const o=i.createBufferSource();o.buffer=a,s.loop&&(o.loop=!0,o.loopStart=s.loop[0],o.loopEnd=Math.min(a.duration,s.loop[1]));const c=i.createGain();o.connect(c).connect(this.music);const l=Mi(qi(n));e?(c.gain.setValueAtTime(0,i.currentTime),c.gain.linearRampToValueAtTime(l,i.currentTime+e/100)):c.gain.value=l,o.start(),this.bgmV={src:o,gain:c},o.onended=()=>{var h;((h=this.bgmV)==null?void 0:h.src)===o&&(this.bgmV=null)}}bgm2(t){this.bgm(t,100)}bgmOff(t=0){const e=this.ctx,n=this.bgmV;if(this.bgmNo=-1,this.bgmV=null,!e||!n)return;const i=e.currentTime+t/100;n.gain.gain.cancelScheduledValues(e.currentTime),n.gain.gain.setValueAtTime(n.gain.gain.value,e.currentTime),t>0&&n.gain.gain.linearRampToValueAtTime(0,i),n.src.stop(t>0?i:0)}async voice(t,e=0){const n=this.ctx;if(!n)return;this.voiceOff(),this.voiceNo=t,this.voiceIdx??(this.voiceIdx=fetch(Tn("audio/voice.json")).then(c=>c.json()).catch(()=>({})));const i=(await this.voiceIdx)[t];if(!i||this.voiceNo!==t)return;const s=await this.buf(`audio/voice/${i}.ogg`);if(!s||this.voiceNo!==t)return;const a=n.createBufferSource();a.buffer=s;const o=n.createGain();a.connect(o).connect(this.sfx),e&&(o.gain.setValueAtTime(0,n.currentTime),o.gain.linearRampToValueAtTime(1,n.currentTime+e/100)),a.start(),this.voiceV={src:a,gain:o,no:t},a.onended=()=>{var c;((c=this.voiceV)==null?void 0:c.src)===a&&(this.voiceV=null)}}preloadVoices(t){this.ctx&&(this.voiceIdx??(this.voiceIdx=fetch(Tn("audio/voice.json")).then(e=>e.json()).catch(()=>({}))),this.voiceIdx.then(e=>{for(const n of t)e[n]&&this.buf(`audio/voice/${e[n]}.ogg`)}))}voiceOff(t=0){const e=this.ctx,n=this.voiceV;if(this.voiceNo=-1,this.voiceV=null,!(!e||!n))if(t>0)n.gain.gain.setValueAtTime(n.gain.gain.value,e.currentTime),n.gain.gain.linearRampToValueAtTime(0,e.currentTime+t/100),n.src.stop(e.currentTime+t/100);else try{n.src.stop()}catch{}}update(){for(const[t,e]of this.slots)if(e.pos&&t.startsWith("obj")){const n=this.spatial(e.pos);e.gain.gain.setTargetAtTime(Mi(qi(e.base+n.u)),this.ctx.currentTime,.05),e.pan.pan.setTargetAtTime(n.pan,this.ctx.currentTime,.05)}}play(t,e=1,n=1,i=0){const s=this.ctx,a=this.buffers.get(`audio/${t}.ogg`);if(!s||!a)return 0;const o=s.createBufferSource();o.buffer=a,o.playbackRate.value=n;const c=s.createGain();return c.gain.value=e,o.connect(c).connect(this.sfx),o.start(s.currentTime+i),a.duration/n}se(t){switch(t){case"door":{const e=this.play("door_knob");this.play("door_open",.9,1,Math.max(.25,e*.6));break}case"doorClose":this.play("door_close");break;case"locked":this.play("door_knob"),this.play("door_knob",1,1.05,.35);break;case"pickup":case"menu":this.sys(3);break;case"cursor":this.sys(2);break;case"cancel":this.sys(0);break;case"error":this.sys(1);break;case"typewriter":this.play("typewriter");break;case"lighter":this.play("door_knob",.35,2.2);break;case"knife":this.swish();break;case"shot":this.play("gun_shot"),this.play("gun_shell",.6,1,.35);break;case"empty":this.play("gun_empty");break;case"reload":this.play("gun_rl1",1,1,.1),this.play("gun_rl2",1,1,.4),this.play("gun_rl3",1,1,.75);break}}sys(t){this.sysSw^=1,this.playList("sys",t,`sys${this.sysSw}`)}swish(){const t=this.ctx;if(!t)return;const e=Math.floor(t.sampleRate*.22),n=t.createBuffer(1,e,t.sampleRate),i=n.getChannelData(0);for(let c=0;c<e;c++){const l=c/e;i[c]=(Math.random()*2-1)*Math.sin(Math.PI*l)**2}const s=t.createBufferSource();s.buffer=n;const a=t.createBiquadFilter();a.type="bandpass",a.Q.value=2.5,a.frequency.setValueAtTime(900,t.currentTime),a.frequency.exponentialRampToValueAtTime(3800,t.currentTime+.2);const o=t.createGain();o.gain.value=.55,s.connect(a).connect(o).connect(this.sfx),s.start()}}function qx(r){const t=new Map,e=new Map,n=r.clone();return au(r,n,function(i,s){t.set(s,i),e.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,a=t.get(i),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(c){return e.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function au(r,t,e){e(r,t);for(let n=0;n<r.children.length;n++)au(r.children[n],t.children[n],e)}class jr{constructor(){S(this,"root",new ze);S(this,"model");S(this,"mixer");S(this,"clips",new Map);S(this,"action",null);S(this,"cur","");S(this,"bones",{})}async load(t){const e=await Wn(t);this.model=qx(e.scene),ui(this.model),this.model.traverse(n=>{n.isMesh&&(n.frustumCulled=!1),/^b\d\d$/.test(n.name)&&!this.bones[n.name]&&(this.bones[n.name]=n)}),this.root.add(this.model),this.mixer=new hc(this.model);for(const n of e.animations)this.clips.set(n.name,n);return this}play(t,e=.2,n=!0,i=1){var o;if(this.cur===t)return this.action;const s=this.clips.get(t);if(!s)return null;const a=this.mixer.clipAction(s);return a.reset(),a.setLoop(n?Xo:Vr,1/0),a.clampWhenFinished=!n,a.timeScale=i,this.action&&e>0?(a.play(),this.action.crossFadeTo(a,e,!1)):((o=this.action)==null||o.stop(),a.play()),this.action=a,this.cur=t,a}update(t){this.mixer.update(t)}}window.__EnemyModel=jr;const bi={rise:"m11",walk:"m71",idle:"m56",lunge:"m73",bite:"m00",release:"m14",flinch:"m15",flinch2:"m16",dieF:"m09",dieB:"m10",lie:"m13"};class jx extends jr{constructor(e){super();S(this,"state","idle");S(this,"t",0);S(this,"hp",8);S(this,"heading",0);S(this,"cool",0);S(this,"mdlver",0);S(this,"b00",null);S(this,"rootRest",new A);this.index=e}async init(e,n,i,s,a,o){return await this.load(e),this.model.traverse(c=>{c.name==="b00"&&!this.b00&&(this.b00=c)}),this.b00&&this.rootRest.copy(this.b00.position),this.root.position.set(n,i,s),this.heading=a,this.root.rotation.y=a,o?(this.state="lying",this.play(bi.lie,0,!0)):this.set("idle"),this.update(0),this}get hittable(){return!["lying","die","dead","rise"].includes(this.state)}get alive(){return this.state!=="die"&&this.state!=="dead"}set(e){this.state=e,this.t=0;const n=e!=="walk"&&e!=="idle";let i=bi[e]??bi.idle;e==="flinch"&&(i=Math.random()<.5?bi.flinch:bi.flinch2),e==="die"&&(i=Math.random()<.5?bi.dieF:bi.dieB),this.cur="",this.play(i,e==="bite"?.05:.2,!n,1)}get clipLen(){return this.action?this.action.getClip().duration:0}forward(e=new A){return e.set(-Math.sin(this.heading),0,-Math.cos(this.heading))}tick(e,n,i,s){this.t+=e,this.cool=Math.max(0,this.cool-e);const a=n.x-this.root.position.x,o=n.z-this.root.position.z,c=Math.hypot(a,o);let h=Math.atan2(-a,-o)-this.heading;h=Math.atan2(Math.sin(h),Math.cos(h));let u=!1;const d=g=>{this.heading+=Qe.clamp(h,-g*e,g*e)},p=g=>{const _=this.root.position.clone().addScaledVector(this.forward(),g*e);s.resolve(_,.25);const m=s.floorAt(_.x,_.z,this.root.position.y);m!==null&&Math.abs(m-this.root.position.y)<.5?_.y=m:_.y=this.root.position.y,this.root.position.copy(_)};switch(this.state){case"lying":c<3.2&&this.set("rise");break;case"rise":this.t>=this.clipLen&&this.set("walk");break;case"idle":c<7&&this.set("walk");break;case"walk":d(1.1),p(.36),c<.95&&Math.abs(h)<.5&&this.cool<=0&&i&&this.set("lunge");break;case"lunge":d(1.5),this.t<.6&&c>.55&&p(.9),this.t>.35&&this.t<.9&&c<.7&&i?(this.set("bite"),u=!0):this.t>=Math.min(this.clipLen,1.3)&&(this.cool=1.2,this.set("walk"));break;case"bite":break;case"release":this.t<.5&&p(-.8),this.t>=Math.min(this.clipLen,1.4)&&(this.cool=2.5,this.set("walk"));break;case"flinch":this.t<.3&&p(-.5),this.t>=Math.min(this.clipLen,1)&&this.set("walk");break;case"die":this.t>=this.clipLen&&(this.state="dead");break}return this.root.rotation.y=this.heading,this.update(e),this.b00&&this.state!=="die"&&this.state!=="dead"&&(this.b00.position.x=this.rootRest.x,this.b00.position.z=this.rootRest.z),u}hit(e){this.hittable&&(this.hp-=e,this.hp<=0?this.set("die"):this.state!=="bite"&&this.set("flinch"))}}const Kx={idle:"m00",trot:"m00",run:"m01",leap:"m04",recoil:"m07",flinch:"m10",die:"m11"};class Yx extends jr{constructor(e){super();S(this,"state","idle");S(this,"t",0);S(this,"hp",6);S(this,"heading",0);S(this,"cool",0);S(this,"burst",0);S(this,"b00",null);S(this,"rootRest",new A);this.index=e}async init(e,n,i,s,a){return await this.load(e),this.model.traverse(o=>{o.name==="b00"&&!this.b00&&(this.b00=o)}),this.b00&&this.rootRest.copy(this.b00.position),this.root.position.set(n,i,s),this.heading=a,this.root.rotation.y=a,this.set("idle"),this.update(0),this}get hittable(){return this.state!=="die"&&this.state!=="dead"}get alive(){return this.hittable}set(e){this.state=e,this.t=0;const n=e==="idle"||e==="trot"||e==="run";this.cur="",this.play(Kx[e],.15,n,1)}get clipLen(){return this.action?this.action.getClip().duration:0}forward(e=new A){return e.set(-Math.sin(this.heading),0,-Math.cos(this.heading))}tick(e,n,i,s){this.t+=e,this.cool=Math.max(0,this.cool-e),this.burst=Math.max(0,this.burst-e);const a=n.x-this.root.position.x,o=n.z-this.root.position.z,c=Math.hypot(a,o);let l=Math.atan2(-a,-o)-this.heading;l=Math.atan2(Math.sin(l),Math.cos(l));let h=!1;const u=p=>{this.heading+=Qe.clamp(l,-p*e,p*e)},d=p=>{const g=this.root.position.clone().addScaledVector(this.forward(),p*e);this.burst<=0&&s.resolve(g,.25);const _=s.floorAt(g.x,g.z,this.root.position.y);_!==null&&Math.abs(_-this.root.position.y)<.5?g.y=_:g.y=this.root.position.y,this.root.position.copy(g)};switch(this.state){case"idle":c<6.5&&(this.burst=1.2,this.set("run"));break;case"trot":u(2.5),d(1),this.cool<=0&&this.set("run");break;case"run":u(3.2),d(3.4),c<1.9&&Math.abs(l)<.35&&this.cool<=0&&i&&this.set("leap");break;case"leap":if(this.t<.45&&d(3.6),this.t>.15&&this.t<.5&&c<.75&&i){h=!0;break}this.t>=this.clipLen&&(this.cool=.6,this.set("trot"));break;case"recoil":this.t<.4&&d(-1.2),this.t>=this.clipLen&&(this.cool=1.5,this.set("trot"));break;case"flinch":this.t<.3&&d(-1.5),this.t>=this.clipLen&&(this.cool=.8,this.set("trot"));break;case"die":this.t>=this.clipLen&&(this.state="dead");break}return this.root.rotation.y=this.heading,this.update(e),this.b00&&this.state!=="die"&&this.state!=="dead"&&(this.b00.position.x=this.rootRest.x,this.b00.position.z=this.rootRest.z),h}hit(e){this.hittable&&(this.hp-=e,this.set(this.hp<=0?"die":"flinch"))}}const $x=[2,2,2,2,6,6,4,6,4,4,4,4,4,4,6,2,2,2,2,4,4,4,2,8,2,8,2,6,6,4,6,4,4,6,4,6,4,10,2,2,2,2,4,2,4,2,2,4,4,2,12,8,12,4,6,2,6,4,2,6,4,4,4,4,8,2,4,4,6,2,8,10,6,10,8,4,6,4,14,6,2,12,12,12,12,2,6,2,14,12,4,2,2,6,4,2,6,2,6,2,2,4,2,2,6,2,2,2,8,22,22,12,2,2,14,22,4,4,4,6,14,6,2,10,10,4,4,6,4,2,4,2,8,4,16,2,10,2,2,12,6,2,4,4,2,4,2,2,4,4,2,8,12,4,4,6,2,4,2,2,6,2,4,12,4,4,4,4,10,2,10,6,6,4,2,4,22,6,4,8,4,4,2,2,2,10,16,2,2,2,6,4,28,2,6,4,8,2,2,4,8,4,2,2,4,2,2,2,4,10,10,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,4,3,4,2,2,1,1,2],Zx={100:[2,0,0,0,0,0,0,8,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,2,4,6,0,0,0,0,4,0,2,8,6,2,4,0,6,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],102:[0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],103:[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,6,2,0,8,8,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],105:[2,0,4,4,4,6,6,8,8,6,6,6,6,6,4,6,6,4,4,4,0,4,6,4,8,8,10,8,4,4,4,4,4,4,10,10,2,0,10,0,4,4,4,6,6,6,4,2,4,4,4,6,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,8,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};class Jx{constructor(t,e){S(this,"px",0);S(this,"py",0);S(this,"pz",0);S(this,"ax",0);S(this,"ay",0);S(this,"az",0);S(this,"posSet",!1);S(this,"angSet",!1);S(this,"frm",0);S(this,"add",65536);S(this,"mtn",-1);S(this,"mtnKind",-1);S(this,"paused",!1);S(this,"gone",!1);S(this,"hidden",!1);S(this,"scripted",!1);S(this,"parts",new Map);S(this,"dead",!1);S(this,"hp",0);S(this,"link",null);this.kind=t,this.idx=e}}const Qx=new Set([1,2,3,7,8,9,12,13,14,15,16,11]),tv={1:65536,2:65536,0:32768,3:32768,8:32768,4:21845,5:16384,9:16384,6:13107,7:10922,10:10922,11:8192,12:6553,13:5461,14:9362,15:8192,16:7281,17:6553,18:5957,19:5461,20:4681,21:4096,22:3640,23:3276,24:2978,25:2730},Je=Math.PI/180;function ev(){const r=()=>new Array(32).fill(0);return{ev:r(),ky:r(),ed:r(),it:r(),mp:r(),ic:r(),ts:r(),gm:0}}class nv{constructor(t,e){S(this,"s",[]);S(this,"f");S(this,"rm",0);S(this,"st",0);S(this,"sp",-1>>>0);S(this,"cb",0);S(this,"pl",[0,0,0,0]);S(this,"etc",[]);S(this,"flr",[]);S(this,"wal",[]);S(this,"etc_idx",0);S(this,"flr_idx",0);S(this,"sb_id",0);S(this,"mes_sel",0);S(this,"rcase",0);S(this,"pos_no",0);S(this,"stg",0);S(this,"room",0);S(this,"wpnl",0);S(this,"works",new Map);S(this,"tasks",[]);S(this,"p",0);S(this,"cur",0);S(this,"ifel",0);S(this,"gsp",[]);S(this,"ct",null);S(this,"trace",!1);S(this,"pendingMsg",null);this.host=t,this.f=e??ev();for(let n=0;n<16;n++)this.tasks.push(this.newTask())}newTask(){return{status:0,p:0,script:0,loop:-1,cnt:[],cnt2:0,cnt3:0,lstack:[],lcond:[],data:0,work:null,cno:0,bp:[0,0,0],ba:[0,0,0],addp:[0,0,0],adda:[0,0,0],ips:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],ian:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]]}}work(t,e){const n=t+":"+e;let i=this.works.get(n);return i||(i=new Jx(t,e),this.works.set(n,i)),i}init(t){this.s=t.map(e=>{const n=new Uint8Array(e.length/2);for(let i=0;i<n.length;i++)n[i]=parseInt(e.substr(i*2,2),16);return n});for(const e of this.tasks)e.status=0;this.wpnl=0,this.sp=4294967295,this.check(0),this.sp|=16,this.scheduler(),this.sp&=-17}tick(){if(this.s.length){this.check(1),this.scheduler();for(const t of this.works.values())t.paused||(t.frm+=t.add)}}roomChange(){this.st=0,this.rm=0,this.cb&=2944401595,this.f.gm&=2609643723,this.works.clear()}word(t,e,n){const i=this;if(!Qx.has(t)){const c=e&31,h={4:"rm",5:"st",6:"sp",10:"cb"}[t];return{arr:null,bit:c,get:()=>(h?i[h]:0)>>>0,set:u=>{h&&(i[h]=u>>>0)}}}const s=e<<8|n;if(t>=13){const c=t-13;return{arr:null,bit:s&31,get:()=>i.pl[c]>>>0,set:l=>{i.pl[c]=l>>>0}}}if(t===11)return{arr:null,bit:s&31,get:()=>i.f.gm>>>0,set:c=>{i.f.gm=c>>>0}};const a={1:this.f.ev,2:this.f.ky,3:this.f.ed,7:this.f.it,8:this.f.mp,9:this.f.ic,12:this.f.ts}[t],o=(s&1023)>>5;return{arr:a,bit:s&31,get:()=>a[o]>>>0,set:c=>{a[o]=c>>>0}}}flag(t,e){const n=this.word(t,e>>8,e&255);return(n.get()>>>31-n.bit&1)===1}setFlag(t,e,n){const i=this.word(t,e>>8,e&255),s=2147483648>>>i.bit;i.set(n?i.get()|s:i.get()&~s)}cbBit(t){return 2147483648>>>t}check(t){this.s[t]&&(this.cur=t,this.p=0,this.ifel=0,this.gsp=[],this.ct=this.tasks[t===0?0:15]??this.tasks[0],this.runLoop())}runLoop(){var e,n;let t=0;for(;;){for(;this.exec()!==0;)if(++t>1e5){(n=(e=this.host).log)==null||n.call(e,"evt: runaway script "+this.cur);return}if(this.ifel<=0)break;this.p=this.gsp.pop()??this.p,this.ifel--}}scheduler(){if(this.sp&16)for(let t=0;t<16;t++){const e=this.tasks[t];this.ct=e,e.status&&(this.cur=e.script,this.p=e.p,this.ifel=0,this.gsp=[],this.runLoop(),e.p=this.p)}}evtOn(t,e){if(t>=16)for(t=0;this.tasks[t].status!==0&&t!==15;)t++;const n=this.tasks[t],i=n.work;Object.assign(n,this.newTask()),n.work=i,n.status=1,n.script=e+2,n.p=0}b(t){return this.s[this.cur][this.p+t]??0}u16(t){return this.b(t)<<8|this.b(t+1)}len(t){var e;return t===100||t===102||t===103||t===105?((e=Zx[t])==null?void 0:e[this.b(1)])||2:$x[t]||2}exec(){var c,l,h,u,d,p,g,_,m,f,b,T,x,L,C,R,D,E,M,I,V,B,q,Y,X,J,G,rt,ft,St,Ht,Jt,K,nt,_t,at,It,Nt,Vt,le,qt,fe,U,Fe,Gt,Wt,Rt,oe,wt,w,v,O,$,Q,j,vt,ot,pt,jt,et,mt,Ct,Lt,gt;const t=this.s[this.cur];if(this.p>=t.length)return this.ifel=0,0;const e=t[this.p],n=this.ct,i=k=>this.b(k),s=k=>this.u16(k),a=this.len(e),o=(k=1)=>(this.p+=a,k);switch(this.trace&&((l=(c=this.host).log)==null||l.call(c,`evt s${this.cur} @${this.p.toString(16)} op ${e.toString(16)}`)),e){case 0:return this.ifel=0,0;case 1:return this.gsp.push(this.p+2+i(1)),this.ifel++,this.p+=2,1;case 2:return this.gsp.pop(),this.ifel--,this.p+=i(1),1;case 3:return this.gsp.pop(),this.ifel--,this.p+=2,1;case 4:{const k=i(1);if(k===10&&(i(2)===23&&this.etc_idx!==i(4)||i(2)===22&&this.flr_idx!==i(4)))return o(0);const lt=this.word(k,i(2),i(3)),Dt=lt.get()>>>31-lt.bit&1;return o(i(5)&1^Dt)}case 5:{const k=this.word(i(1),i(2),i(3)),lt=2147483648>>>k.bit,Dt=4294967295>>>k.bit,P=k.get();switch(i(5)){case 0:k.set(P|lt);break;case 1:k.set(P&~lt);break;case 2:k.set(P^lt);break;case 3:k.set(P|Dt);break;case 4:k.set(P&~Dt);break;case 5:k.set(P^Dt);break}return o(1)}case 6:{const k={0:this.stg,1:this.room,15:this.pos_no,8:this.sb_id,17:this.wpnl,21:this.rcase,23:0,24:0,25:0};return o(nh(k[i(1)]??0,i(2),i(3)))}case 7:{const k=i(2)===5?this.host.playerHp():i(2)===7?this.mes_sel:i(2)===10?this.work(1,i(1)).hp:0;return o(nh(k,i(3),s(4)))}case 8:{const k=i(2);switch(i(1)){case 0:this.stg=k;break;case 1:this.room=k;break;case 8:this.sb_id=k;break;case 15:this.pos_no=k;break;case 18:this.host.setWeapon(k);break;case 20:this.etc_idx=k;break;case 21:this.rcase=k;break}return o(1)}case 10:{const k=this.wal[i(1)];return k&&(k.flg=i(2)?k.flg&-2:k.flg|1),o(1)}case 11:{const k=this.etc[i(1)];return k&&(k.flg=i(2)?k.flg&-2:k.flg|1),o(1)}case 12:{const k=this.flr[i(1)];return k&&(k.flg=i(2)?k.flg&-2:k.flg|1),o(1)}case 13:{const k=s(2);return!this.flag(3,k)&&this.work(1,i(1)).dead&&this.setFlag(3,k,!0),o(1)}case 14:{const k=s(2),lt=i(4),Dt=i(5);if(this.etc_idx!==lt)return o(1);if(this.cb&2048){if(!this.flag(7,k)){const P=this.etc[lt];P&&(Dt||(P.flg&=-2),this.work(3,P.prm[0]).gone=!0),this.setFlag(7,k,!0),this.setFlag(9,k,!1)}}else this.flag(7,k)||this.setFlag(9,k,!0);return this.cb&=-2049,o(1)}case 15:return this.cb&=-1025,o(0);case 16:return o(this.cb&1024?+(this.sb_id===i(1)):0);case 17:return o(+this.host.hasItem(i(1)));case 18:{const k=i(1);return k===0||k===5?(this.cb&=-65,this.cb|=4,this.st|=4):k===1||k===4?(k===4&&(this.cb&=-65),this.cb&=-5,this.st&=-5,this.sp=4294967295):k===2?(this.cb&=-5,this.st&=-5):k===3&&(this.cb|=68,this.st|=4),this.host.cine(k),o(1)}case 19:return this.host.camSet(i(1),i(2),i(3)),o(1);case 41:return(u=(h=this.host).camPause)==null||u.call(h,i(1)===0),o(1);case 42:return(p=(d=this.host).camFix)==null||p.call(d,i(1),i(2)),o(1);case 91:return(_=(g=this.host).camInit)==null||_.call(g),o(1);case 43:return n.work&&(n.work.paused=i(1)===0),o(1);case 45:return this.work(1,i(1)).paused=!0,o(1);case 48:{const k=this.work(1,i(1));return k.paused=!0,k.frm=0,k.mtn=i(2),k.mtnKind=1,o(1)}case 20:return this.evtOn(i(2),i(3)),o(1);case 31:return i(1)===0?(i(3)===0&&(this.sp&=-8),this.openMessage(i(2))):this.sp|=7,o(1);case 32:{const k=this.ent(i(2),i(1));return k&&(k.hidden=i(3)===0),o(1)}case 34:return this.flag(3,s(2))&&(this.work(1,i(1)).gone=!0),o(1);case 35:{const k=this.etc[i(4)];return this.flag(7,s(2))?(k&&!i(5)&&(k.flg&=-2),this.work(3,i(1)).gone=!0):k&&(k.flg|=1),o(1)}case 36:{const k=this.ent(i(1),i(2));return k&&(k.gone=i(3)===0),o(1)}case 37:{const k=this.etc[i(1)];return k&&(k.attr=s(2),k.prm=[i(4),i(5),i(6),i(7)],k.type=i(8)),o(1)}case 38:return o(+(this.host.weapon()===i(1)));case 39:return this.host.setWeapon(i(1)),o(1);case 49:return this.host.loseItem(i(1)),o(1);case 51:return this.host.door(s(2),i(4),i(5),i(6),i(7)),this.sp=72,this.cb|=1,o(1);case 54:return this.host.fade((i(1)<<24|i(2)<<16|i(3)<<8|i(4))>>>0,i(5)),o(1);case 55:return this.rcase=i(1),o(1);case 56:{const k=(s(4)<<16)+(i(3)?32768:0),lt=i(1)===0?this.work(0,0):i(1)===1?this.work(1,i(2)):this.work(2,i(2));return o(lt.frm>=k?0:1)}case 94:return this.host.movie(i(1)),o(1);case 25:return(f=(m=this.host).snd)==null||f.call(m,"voice",[s(2),i(4),i(5)*10]),o(1);case 26:return(T=(b=this.host).snd)==null||T.call(b,"voiceOff",[i(1)*10]),o(1);case 21:return(L=(x=this.host).snd)==null||L.call(x,"bgm",[i(1),i(2)*10,-45]),o(1);case 22:return(R=(C=this.host).snd)==null||R.call(C,"bgmOff",[i(1)*10]),o(1);case 166:return(E=(D=this.host).snd)==null||E.call(D,"bgm",[i(1),i(2)*10,-i(3)]),o(1);case 149:return(I=(M=this.host).snd)==null||I.call(M,"bgm2",[i(1),-45]),o(1);case 167:return(B=(V=this.host).snd)==null||B.call(V,"bgm2",[i(1),-i(2)]),o(1);case 147:return(Y=(q=this.host).snd)==null||Y.call(q,"bgmOff",[100]),o(1);case 23:return(J=(X=this.host).snd)==null||J.call(X,"se",[i(1),i(2),i(3),s(4),i(6)]),o(1);case 24:return(rt=(G=this.host).snd)==null||rt.call(G,"seOff",[i(1)]),o(1);case 28:return(St=(ft=this.host).snd)==null||St.call(ft,"bgSe",[i(1),s(2),i(4)*10]),o(1);case 148:return(Jt=(Ht=this.host).snd)==null||Jt.call(Ht,"bgSe",[i(1),s(2),0]),o(1);case 29:return(nt=(K=this.host).snd)==null||nt.call(K,"bgSeOff",[i(1),i(2)*10]),o(1);case 146:return(at=(_t=this.host).snd)==null||at.call(_t,"bgSeOff",[i(1),100]),o(1);case 139:{const k=i(3),lt=(Dt,P)=>(k&P?-1:1)*s(Dt)/1e3;return(Nt=(It=this.host).snd)==null||Nt.call(It,"objSe",[i(1),lt(4,1),lt(6,2),lt(8,4),s(10)]),o(1)}case 69:return(le=(Vt=this.host).snd)==null||le.call(Vt,"objSeOff",[i(1)]),o(1);case 72:return(fe=(qt=this.host).snd)==null||fe.call(qt,"foot",[i(1),i(3),i(4),i(5)],n.work),o(1);case 134:return(Fe=(U=this.host).snd)==null||Fe.call(U,"easy",[i(1),i(2),-i(3),-i(4),i(5)-128,i(6)-128,i(7),i(8),i(9),i(10),i(11),i(12),s(14)]),o(1);case 212:return(Wt=(Gt=this.host).snd)==null||Wt.call(Gt,"sys",[s(2)]),o(1);case 182:return(oe=(Rt=this.host).snd)==null||oe.call(Rt,"case",[i(1)]),o(1);case 50:case 52:case 82:case 83:case 163:{const k=e===50||e===52?this.work(2,i(2)):this.work(3,i(2));if(i(4)!==0)return k.link=null,o(1);const lt=i(5),Dt=(P,ct)=>(lt&ct?-1:1)*s(P)/1e3;return k.link={kind:e===52||e===163?0:e===82?2:1,idx:i(1),bone:i(3),lo:[Dt(6,1),Dt(8,2),Dt(10,4)]},o(1)}case 99:return this.wpnl=Math.floor(Math.random()*100)%Math.max(1,i(1)),o(1);case 101:{const k=i(1);return n.work=this.work(k,k===0?0:i(2)),n.work.scripted=!0,n.cno=k===1||k===2?i(3):0,k===0&&(n.work.mtn=42,n.work.frm=0),o(1)}case 100:{const k=i(1),lt=n.work;return(k===128||k===139)&&lt?lt.scripted=!1:(k===7||k===12||k===13)&&this.common(n),o(1)}case 103:{const k=i(1),lt=n.work;return(k===128||k===143||k===139)&&lt&&(lt.scripted=!1),lt&&(k===143||k===144?lt.paused=!1:k===146?lt.paused=i(6)===4:k===147&&(lt.paused=i(5)===4)),o(1)}case 105:{this.common(n);const k=i(1);return(k>=28&&k<=33||k>=43&&k<=45||k===2||k===3||k===17||k===18)&&i(a-1)===254?(this.p+=a-1,1):o(1)}case 129:{const k=!!(this.st&262144)||!!(this.st&8);return o(k?i(1)?0:1:i(1)?1:0)}case 155:return o(this.host.moviePlaying()?0:1);case 53:return(w=(wt=this.host).light)==null||w.call(wt,"set",[i(1),i(2),i(3)]),o(1);case 75:return(O=(v=this.host).light)==null||O.call(v,"type",[i(1),i(2),i(3)]),o(1);case 120:return(Q=($=this.host).light)==null||Q.call($,"param",[i(1),i(2),s(4),s(6),s(8),s(10),s(12)]),o(1);case 115:return n.elgt=[0,1,2,3,4,5,6,7,8,9].map(k=>s(2+2*k)/100),o(1);case 116:{const k=n.elgt??[0,0,0,0,0,0,0,0,0,0],lt=n.cnt3?n.cnt2/n.cnt3:0,Dt=P=>k[5+P]+(k[P]-k[5+P])*lt;return(vt=(j=this.host).light)==null||vt.call(j,"param",[i(1),i(2),Dt(0)*100,Dt(1)*100,Dt(2)*100,Dt(3)*100,Dt(4)*100]),o(0)}case 68:return(pt=(ot=this.host).light)==null||pt.call(ot,"amb",[i(1),i(2),i(3),i(4)]),o(1);case 67:return(et=(jt=this.host).eff)==null||et.call(jt,"disp",i(1),i(2)),o(1);case 145:return(Ct=(mt=this.host).eff)==null||Ct.call(mt,"mode",i(1),i(2)),o(1);case 90:return(gt=(Lt=this.host).eff)==null||gt.call(Lt,"yure",i(1),s(2)),o(1);case 188:{const k=this.tasks[i(1)];return k&&(k.status=0),o(1)}case 243:case 253:{n.data=this.p;const k=n.lcond[n.loop];return this.p=k,this.exec()!==0?(this.p=n.lstack[n.loop],1):(this.p=n.data+1,n.loop--,e===243?1:0)}case 244:return this.p+=1,1;case 248:return n.loop++,n.cnt[n.loop]=s(2),this.p+=1,--n.cnt[n.loop]<=0&&(this.p+=3,n.loop--),0;case 249:return--n.cnt[n.loop]<=0&&(this.p+=3,n.loop--),0;case 250:return n.loop++,n.cnt3=n.cnt2=n.cnt[n.loop]=s(2)<<16>>16,this.p+=4,n.lstack[n.loop]=this.p,1;case 251:return--n.cnt[n.loop]!==0?(n.cnt2=n.cnt[n.loop],this.p=n.lstack[n.loop]):(this.p+=2,n.loop--),1;case 252:return n.loop++,n.lcond[n.loop]=this.p+2,this.p=this.p+i(1),n.lstack[n.loop]=this.p,1;case 254:return this.p+=1,0;case 255:return n.status=0,this.p+=2,0;default:return o(1)}}ent(t,e){return t<=3?this.work(t,t===0?0:e):null}openMessage(t){this.mes_sel=0,this.st|=512,this.st&=-580609,this.cb&=-536883201,this.pendingMsg=t,this.host.message(t)}messageClosed(t,e){this.st&=-513,t>=0&&(this.mes_sel=t,this.cb|=4096,this.st|=16384),this.cb|=8192,e&&(this.cb|=536870912,this.sp=4294967295,this.st&=-8709),this.pendingMsg=null}common(t){const e=c=>this.b(c),n=c=>this.u16(c),i=t.work,s=e(1);if(!i)return;const a=()=>{let c=i.parts.get(t.cno);return c||(c={},i.parts.set(t.cno,c)),c},o=(c,l)=>l?-c:c;switch(s){case 2:i.px+=o(t.addp[0],t.bp[0]),i.py+=o(t.addp[1],t.bp[1]),i.pz+=o(t.addp[2],t.bp[2]),i.posSet=!0;break;case 3:i.ax+=o(t.adda[0],t.ba[0]),i.ay+=o(t.adda[1],t.ba[1]),i.az+=o(t.adda[2],t.ba[2]),i.angSet=!0;break;case 5:t.addp=[e(2)*.01,e(3)*.01,e(4)*.01];break;case 6:t.adda=[e(2)*Je/2,e(3)*Je/2,e(4)*Je/2];break;case 7:i.px=o(n(2)/1e3,t.bp[0]),i.py=o(n(4)/1e3,t.bp[1]),i.pz=o(n(6)/1e3,t.bp[2]),i.posSet=!0;break;case 8:a().pos=[o(n(2)/1e3,t.bp[0]),o(n(4)/1e3,t.bp[1]),o(n(6)/1e3,t.bp[2])];break;case 9:a().ang=[o(e(2),t.ba[0])*Je,o(e(3),t.ba[1])*Je,o(e(4),t.ba[2])*Je];break;case 11:case 15:i.ax=o(e(2),t.ba[0])*Je,i.ay=o(e(3),t.ba[1])*Je,i.az=o(e(4),t.ba[2])*Je,i.angSet=!0;break;case 12:t.bp=[e(2),e(3),e(4)];break;case 13:t.ba=[e(2),e(3),e(4)];break;case 17:{const c=a(),l=c.pos??[0,0,0];c.pos=[l[0]+o(t.addp[0],t.bp[0]),l[1]+o(t.addp[1],t.bp[1]),l[2]+o(t.addp[2],t.bp[2])];break}case 18:{const c=a(),l=c.ang??[0,0,0];c.ang=[l[0]+o(t.adda[0],t.ba[0]),l[1]+o(t.adda[1],t.ba[1]),l[2]+o(t.adda[2],t.ba[2])];break}case 24:case 34:case 25:case 35:{i.add=tv[e(2)]??65536,(s===24||s===34)&&(i.paused=!1,i.mtnKind=e(3),i.mtn=e(4),i.frm=0,s===34&&(i.frm=n(8)<<16));break}case 26:t.ips[e(2)]=[o(n(4)/1e3,e(3)&1),o(n(6)/1e3,e(3)&2),o(n(8)/1e3,e(3)&4)];break;case 27:t.ian[e(2)]=[o(e(4),e(3)&1),o(e(5),e(3)&2),o(e(6),e(3)&4)];break;case 30:case 31:case 28:case 43:case 44:case 45:{const c=t.cnt3?t.cnt2/t.cnt3:1,h=e(2)!==0?c:.5*c+1.5*c*c-c*c*c,u=(m,f)=>[m[0]+(f[0]-m[0])*h,m[1]+(f[1]-m[1])*h,m[2]+(f[2]-m[2])*h],d=s===30||s===28||s===43||s===44,p=s===31||s===28||s===43||s===45,g=s===43||s===44?e(3):7,_=s===43?e(4):s===45?e(3):7;if(d){const m=u(t.ips[1],t.ips[0]);if(t.cno===0)g&1&&(i.px=m[0]),g&2&&(i.py=m[1]),g&4&&(i.pz=m[2]),i.posSet=!0;else{const f=a(),b=f.pos??[0,0,0];f.pos=[g&1?m[0]:b[0],g&2?m[1]:b[1],g&4?m[2]:b[2]]}}if(p){const m=u(t.ian[1],t.ian[0]).map(f=>f*Je);if(t.cno===0)_&1&&(i.ax=m[0]),_&2&&(i.ay=m[1]),_&4&&(i.az=m[2]),i.angSet=!0;else{const f=a(),b=f.ang??[0,0,0];f.ang=[_&1?m[0]:b[0],_&2?m[1]:b[1],_&4?m[2]:b[2]]}}break}case 40:i.frm=n(2)<<16;break;case 48:t.ips[e(2)]=t.cno===0?[i.px,i.py,i.pz]:[...a().pos??[0,0,0]];break;case 49:t.ian[e(2)]=[i.ax/Je,i.ay/Je,i.az/Je];break}}}function nh(r,t,e){switch(t){case 0:return+(r===e);case 1:return+(r>e);case 2:return+(r>=e);case 3:return+(r<e);case 4:return+(r<=e);case 5:return+(r!==e)}return 0}function za(r){const t=parseInt(r.type,16)>>>0,e=parseInt(r.flags,16)>>>0,n=r.extra>>>0,i=((e&255)<<24|(e&65280)<<8|e>>>8&65280|e>>>24)>>>0;return{flg:t&255,type:t>>8&255,id:t>>16&255,flr:t>>>24,attr:i,x:r.x,y:r.y,z:r.z,w:r.sx,h:r.sy,d:r.sz,prm:[n&255,n>>8&255,n>>16&255,n>>>24]}}function iv(r){return new Promise((t,e)=>{const n=document.createElement("script");n.src=r,n.onload=()=>t(),n.onerror=()=>e(new Error("load "+r)),document.head.appendChild(n)})}async function sv(r,t){var n,i,s;const e=(n=window.__MOVIES)==null?void 0:n[r];if(window.__ASSETS){if(!e)return null;if(!((i=window.__MV)!=null&&i[r])||window.__MV[r].length<e)for(let c=0;c<e;c++)await iv(`data/${r}_${String(c).padStart(2,"0")}.js`),t((c+1)/e);const o=(((s=window.__MV)==null?void 0:s[r])??[]).map(c=>{const l=atob(c),h=new Uint8Array(l.length);for(let u=0;u<l.length;u++)h[u]=l.charCodeAt(u);return h});return delete window.__MV[r],URL.createObjectURL(new Blob(o,{type:"video/mp4"}))}return`movies/${r}.mp4`}async function ou(r,t){const e=document.createElement("div");e.style.cssText="position:absolute;inset:0;background:#000;z-index:20;display:flex;align-items:center;justify-content:center";const n=document.createElement("div");n.style.cssText="position:absolute;bottom:3%;right:3%;font:12px sans-serif;color:#777;letter-spacing:.1em;transition:opacity .5s",e.appendChild(n),r.appendChild(e),n.textContent=ye==="ru"?"ЗАГРУЗКА РОЛИКА…":"LOADING MOVIE…";let i=null;try{i=await sv(t,a=>n.textContent=(ye==="ru"?"ЗАГРУЗКА РОЛИКА… ":"LOADING MOVIE… ")+Math.round(a*100)+"%")}catch(a){console.warn(a)}if(!i){e.remove();return}const s=document.createElement("video");s.src=i,s.playsInline=!0,s.preload="auto",s.style.cssText="width:100%;height:100%;object-fit:contain;background:#000",e.insertBefore(s,n),n.textContent=ye==="ru"?"Enter / Esc — пропустить":"Enter / Esc — skip",await new Promise(a=>{let o=!1;const c=()=>{o||(o=!0,removeEventListener("keydown",l,!0),s.pause(),a())},l=h=>{["Enter","Space","Escape","KeyE"].includes(h.code)&&(h.preventDefault(),h.stopPropagation(),c())};addEventListener("keydown",l,!0),e.addEventListener("click",c),s.addEventListener("ended",c),s.addEventListener("error",c),s.play().catch(()=>{s.muted=!0,s.play().catch(c)}),setTimeout(()=>n.style.opacity="0",4e3)}),e.remove(),i.startsWith("blob:")&&URL.revokeObjectURL(i)}const se=Math.random,si=Math.PI*2/65536,kn=r=>Math.sin(r*si),Cs=r=>Math.cos(r*si),me=r=>r.map(([t,e,n,i])=>({u:t,v:e,w:n,h:i})),ge=[-1,0,0,0],rv=[me([[0,0,.1875,.1875],[.1875,0,.1875,.1875],[.375,0,.1875,.1875],[.5625,0,.1875,.1875],[.75,0,.1875,.1875],[0,.1875,.1875,.1875],[.1875,.1875,.1875,.1875],ge]),me([[.375,.1875,.1875,.1875],[.5625,.1875,.1875,.1875],[.75,.1875,.1875,.1875],[0,.375,.1875,.1875],[.1875,.375,.1875,.1875],[.375,.375,.1875,.1875],[.5625,.375,.1875,.1875],ge]),me([[.75,.375,.1875,.1875],[0,.5625,.1875,.1875],[.1875,.5625,.1875,.1875],[.375,.5625,.1875,.1875],[.5625,.5625,.1875,.1875],[.75,.5625,.1875,.1875],[0,.75,.1875,.1875],ge])],cu=[[.09375,.15625,.0625,.0625],[0,.125,.09375,.09375],[0,0,.125,.125],[.125,0,.15625,.15625],[.28125,0,.15625,.15625],[.4375,0,.1875,.1875],[.625,0,.1875,.1875],[.8125,0,.1875,.1875],[0,.21875,.1875,.1875],[.1875,.1875,.21875,.21875],[.40625,.1875,.21875,.21875],[.625,.1875,.21875,.21875],[0,.40625,.25,.25],[.25,.40625,.25,.25]],ih=me([...cu,[.5,.40625,.25,.25],[.75,.40625,.25,.25],[0,.65625,.25,.25],[.25,.65625,.25,.25],[.5,.65625,.25,.25],[.75,.65625,.25,.25],[0,.75,.25,.25],[.25,.75,.25,.25],[.5,.75,.25,.25],[.75,.75,.25,.25],ge]),av=me([...cu,[0,0,.25,.25],[.25,0,.25,.25],[.5,0,.25,.25],[.75,0,.25,.25],[0,.25,.25,.25],[.25,.25,.25,.25],[.5,.25,.25,.25],[.75,.25,.25,.25],[0,.5,.25,.25],[.25,.5,.25,.25],[.5,.5,.25,.25],[.75,.5,.25,.25],ge]),ov=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,3,3,3],cv=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2],pn=(r,t,e,n,i)=>{const s=[];for(let a=0;a<e;a++)s.push([r+a%n*i,t+Math.floor(a/n)*i,i,i]);return s},sh=[me([...pn(0,0,6,6,.15625),...pn(0,.15625,4,4,.15625),ge]),me([...pn(0,.3125,6,6,.15625),...pn(0,.46875,4,4,.15625),ge])],At=.15625,xt=.1875,tt=.21875,No=[me([[0,0,.09375,.09375],[.09375,0,.09375,.09375],[.1875,0,.09375,.09375],[.28125,0,.09375,.09375],[.375,0,.09375,.09375],[.46875,0,.125,.125],[.59375,0,.125,.125],[.71875,0,.125,.125],[.84375,0,.125,.125],[0,.09375,.125,.125],[.125,.09375,At,At],[.28125,.09375,At,At],[.4375,.125,At,At],[.59375,.125,At,At],[.75,.125,At,At],[0,.25,At,At],[At,.25,At,At],[.3125,.28125,At,.125],[.46875,.28125,At,.125],[.625,.28125,.125,.125],ge]),me([[0,.40625,.125,.125],[.125,.40625,At,At],[.28125,.40625,At,At],[.4375,.40625,At,At],[.59375,.40625,At,At],[.75,.40625,At,At],...pn(0,.5625,6,6,At),...pn(0,.71875,6,6,At),[0,.875,At,.125],[At,.875,At,.125],[.3125,.875,.125,.125],[.4375,.875,.125,.125],ge]),me([...pn(0,0,25,5,xt).slice(0,24),ge]),me([...pn(0,0,25,5,xt).slice(0,24),ge]),me([...pn(0,0,16,4,tt),ge]),me([[0,0,.125,.125],[0,.125,.125,.125],[0,.25,.125,.125],[0,.375,.125,.125],[.125,0,xt,xt],[.125,xt,xt,xt],[.125,.375,xt,xt],[.125,.5625,xt,xt],[.3125,0,tt,tt],[.3125,tt,tt,tt],[.3125,.4375,tt,tt],[.3125,.65625,tt,tt],[.53125,0,tt,tt],[.53125,tt,tt,tt],[.53125,.4375,tt,tt],[.53125,.65625,tt,tt],[.75,0,tt,tt],[.75,tt,tt,tt],[.75,.4375,tt,tt],[.75,.65625,tt,tt],ge]),me([[0,0,At,At],[At,0,At,At],[.3125,0,At,At],[.46875,0,xt,xt],[.65625,0,xt,xt],[0,At,tt,tt],[tt,At,tt,tt],[.4375,xt,tt,tt],[.65625,xt,tt,tt],[0,.375,tt,tt],[tt,.375,tt,tt],[.4375,.40625,tt,tt],[.65625,.40625,tt,tt],[0,.59375,tt,tt],[tt,.59375,tt,tt],[.4375,.625,tt,tt],[.65625,.625,tt,tt],ge]),me([[0,0,At,At],[At,0,At,At],[.3125,0,At,At],[.46875,0,xt,xt],[.65625,0,xt,xt],[0,At,tt,tt],[tt,At,tt,tt],[.4375,xt,tt,tt],[.65625,xt,tt,tt],[0,.375,.25,.25],[.25,.40625,.25,.25],[.5,.40625,.25,.25],[0,.625,.25,.25],[.25,.65625,.25,.25],[.5,.65625,.25,.25],[.75,.40625,tt,tt],ge]),me([...pn(0,0,5,5,xt),[0,xt,tt,tt],[tt,xt,tt,tt],[.4375,xt,tt,tt],[.65625,xt,tt,tt],[0,.40625,tt,tt],[tt,.40625,tt,tt],[.4375,.40625,tt,tt],[.65625,.40625,tt,tt],[0,.625,tt,tt],[tt,.625,tt,tt],[.4375,.625,tt,tt],[.65625,.625,tt,tt],ge])];No.push(No[0]);const lv=[400,400,401,402,403,404,405,406,407,400],hv=[[4294967295,4294967295,4294967295,4294967295],[3491762192,1882204714,3491762192,1882204714],[4292927712,4288716960,4286611584,4282400832],[4290777088,4287627264,4287627264,4284481536],[4288725136,4286619760,4284518496,4283457600],[4293980224,4291870768,4290818080,4288712720],[4286603328,4285554752,4284502064,4283449392],[4290830591,4289773792,4288721104,4286619824],[3491762192,1882204714,3491762192,1882204714],[4282400832,4286611584,4288716960,4292927712]],rh=me([[0,0,.0625,.0625],[0,.0625,.0625,.0625],[.0625,0,.09375,.09375],[.15625,0,.125,.125],[.28125,0,.125,.125],[.40625,0,xt,xt],[.59375,0,xt,xt],[.78125,0,xt,xt],[0,.125,tt,tt],[0,.34375,.25,.25],[.25,.34375,.25,.25],[.5,.34375,.25,.25],[.75,.34375,.25,.25],[0,.59375,.25,.25],[.25,.59375,.25,.25],ge]),ah=me([...pn(0,0,10,4,.25),ge]),oh=me([[.5,.5,.25,.125],[.75,.5,.25,.125],[.5,.625,.25,.125],[.75,.625,.25,.125],ge]),uv=me([[.09375,.90625,.125,.09375],[.21875,.84375,.125,At],[.34375,.8125,.125,xt],[.46875,.6875,.125,.3125],[.59375,.625,xt,.375],[.78125,.5625,tt,.4375],[0,.53125,xt,.375],[xt,.53125,At,.28125],[.34375,.53125,.125,.25],[.46875,.53125,.125,At],[.59375,.53125,.125,.09375],ge]),dv=me([[.375,.375,xt,xt],[.5625,.375,xt,xt],[0,.5625,xt,xt],[xt,.5625,xt,xt],[.375,.5625,xt,xt],[.5625,.5625,xt,xt],[0,.75,xt,xt],[xt,.75,xt,xt],ge]),fv=me([[.375,.75,xt,.09375],[.5625,.75,xt,.09375],[.375,.84375,xt,.09375],[.5625,.84375,xt,.09375],ge]),pv=me([[0,0,.109375,.09375],[.109375,0,.109375,.09375],[.21875,0,.109375,.09375],[.328125,0,.109375,.09375],[.4375,0,.109375,.09375],ge]),Ke=r=>{const t=[];for(let e=0;e<r.length;e+=2)t.push([r[e],r[e+1]]);return t},ae=(r,t,e,n)=>{const i=[];for(let s=0;s<n;s++)i.push(r+s*e,t);return i},ch=Ke([...ae(0,0,40,6),...ae(0,40,40,4)]),mv=Ke([...ae(0,80,40,6),...ae(0,120,40,6)]),gv=Ke([...ae(0,160,40,6),...ae(0,200,40,6)]),lh=Ke([...ae(0,0,56,4),...ae(0,56,56,4)]),_v=Ke(ae(0,112,24,10)),xv=Ke([...ae(0,136,48,5),...ae(0,184,48,5)]),vv=Ke([...ae(0,112,48,5),...ae(0,168,48,5)]),hh=Ke([...ae(0,0,48,5),...ae(0,48,48,5)]),yv=Ke([...ae(0,96,48,5),...ae(0,144,48,5)]),Mv=Ke([...ae(0,0,56,4),...ae(0,56,56,4),...ae(0,112,56,2)]),bv=Ke([...ae(0,0,56,4),...ae(0,56,56,4),...ae(0,112,56,4)]),Sv=Ke([...ae(0,0,32,7),...ae(0,32,32,7)]),Ev=Ke([...ae(0,64,56,4),...ae(0,120,56,4)]),Tv=Ke([...ae(0,0,40,6),...ae(0,40,40,6)]),wv=[[70,ch,40,40],[70,mv,40,40],[70,gv,40,40],[71,lh,56,56],[71,_v,24,24],[71,xv,48,48],[72,lh,56,56],[72,vv,48,56],[73,hh,48,48],[73,yv,48,48],[74,Mv,56,56],[75,ch,40,40],[76,hh,48,48],[77,bv,56,56],[78,Sv,32,32],[78,Ev,56,56],[79,Tv,40,40]];function uh(){return{flg:0,stflg:0,id:0,type:0,mode0:0,mode1:0,mdlver:0,flr:0,ct0:0,ct1:0,ct2:0,ct3:0,px:0,py:0,pz:0,sx:0,sy:0,sz:0,sxb:0,syb:0,szb:0,ax:0,ay:0,az:0,xn:0,yn:0,zn:0,spd:0,aox:0,aoy:0,aoz:0,axp:0,ayp:0,azp:0,gpx:0,gpy:0,gpz:0,tex:-1,ani:0,bls:8,bld:6,tv:[{x:-1,y:-1,u:0,v:0,col:0},{x:1,y:-1,u:1,v:0,col:0},{x:-1,y:1,u:0,v:1,col:0},{x:1,y:1,u:1,v:1,col:0}],exp:null,er:null,func:0,lkono:0}}class Av{constructor(){S(this,"eff",Array.from({length:512},uh));S(this,"trs",[]);S(this,"fnc",[]);S(this,"windr",0);S(this,"winds",0);S(this,"of",[0,0,0]);S(this,"group",new ze);S(this,"floors",[]);S(this,"camPos",new A);S(this,"camDir",new A);S(this,"tex",new Map);S(this,"loader",new eu);S(this,"batches",new Map);S(this,"rain");S(this,"unknown",new Set);S(this,"index",null);S(this,"layer",document.createElement("div"));S(this,"l2d",new Map);S(this,"bars",null);S(this,"lang","ru");S(this,"trs2d",[]);this.group.renderOrder=10;const t=new Ge;t.setAttribute("position",new xe(new Float32Array(77*2*3),3)),t.setAttribute("color",new xe(new Float32Array(77*2*4),4)),this.rain=new Yh(t,new ec({vertexColors:!0,transparent:!0,blending:ts,depthWrite:!1})),this.rain.frustumCulled=!1,this.rain.renderOrder=2e3,this.rain.visible=!1,this.group.add(this.rain)}async load(t){for(const i of this.eff)i.flg=0;this.of=[0,0,0],this.windr=this.winds=0;const e=await zr(`eft/${t}.json`).catch(()=>[]);for(const i of e){const s=this.setTb({flg:i.flg,id:i.id,type:i.type,flr:i.flr,mdlver:i.mdlver,px:i.p[0],py:i.p[1],pz:i.p[2],sx:i.s[0],sy:i.s[1],sz:i.s[2],ax:i.ax,ay:i.ay});s>=0&&i.lk&&i.lk.length>=24&&(this.eff[s].lkono=parseInt(i.lk.slice(16,24),16)|0)}this.index||(this.index=await zr("effects/index.json").catch(()=>({})));const n=new Set;for(const i of e)(i.id<100||i.id>=400)&&n.add(i.id===20?i.type:i.id);await Promise.all([...n].flatMap(i=>Array.from({length:this.index[i]??0},(s,a)=>this.texture(i,a))))}texture(t,e){var s;const n=`ef_${String(t).padStart(3,"0")}_${e}`;if(this.tex.has(n))return this.tex.get(n);if(e>=(((s=this.index)==null?void 0:s[t])??0))return this.tex.set(n,null),null;const i=`effects/${n}.png`;return window.__ASSETS&&!window.__ASSETS[i]?(this.tex.set(n,null),null):this.loader.loadAsync(Tn(i)).then(a=>(a.flipY=!1,a.colorSpace=mn,a.magFilter=Xe,this.tex.set(n,a),a),()=>(this.tex.set(n,null),null))}setPos(t,e,n,i){const s=this.eff[t];s.px=e,s.py=n,s.pz=i}disp(t,e){const n=this.eff[t];e===0?n.stflg|=16777216:n.stflg&=-16777217}mode(t,e){this.eff[t].mode1=e}yure(t,e){t===0?this.of=[.01*e*se(),.01*e*se(),.01*e*se()]:this.of=[0,0,0]}setTb(t){for(let e=0;e<512;e++){const n=this.eff[e];if(!(n.flg&3))return Object.assign(n,uh()),n.flg=t.flg,n.id=t.id,n.type=t.type,n.tex=-1,n.mdlver=t.mdlver??0,n.flr=t.flr??0,n.px=t.px,n.py=t.py,n.pz=t.pz,n.sx=n.sxb=t.sx,n.sy=n.syb=t.sy,n.sz=n.szb=t.sz,n.ax=t.ax,n.ay=t.ay,n.az=0,e}return-1}setentry(t,e,n){return this.setTb({flg:68157441,id:t,type:e,px:n.px,py:n.py,pz:n.pz,sx:n.sx,sy:n.sy,sz:n.sz,ax:n.ax,ay:n.ay})}effinit(t){t.flg|=68157440;const e=t.tv;e[0].x=-1,e[0].y=-1,e[1].x=1,e[1].y=-1,e[2].x=-1,e[2].y=1,e[3].x=1,e[3].y=1;for(const n of e)n.col=4294967295;t.bls=8,t.bld=6,t.ani=0,t.ct1=0,t.ct0=0,t.sxb=t.sx,t.syb=t.sy,t.spd=0,t.xn=t.yn=t.zn=0}effset(t,e,n){t.sx=4*t.sxb*e.w,t.sy=4*t.syb*e.h;const i=hv[n],s=t.tv;for(let a=0;a<4;a++)s[a].col=i[a];this.uv4(t,e.u,e.v,e.u+e.w,e.v+e.h)}uv4(t,e,n,i,s){const a=t.tv;a[0].u=a[2].u=e,a[1].u=a[3].u=i,a[0].v=a[1].v=n,a[2].v=a[3].v=s}dir(t,e,n){return new A(0,0,n).applyEuler(new Ve(t*si,e*si,0,"ZYX"))}e2D(t){if(t.mode0===0){t.flg|=16777216,t.tex=t.type,t.ani=t.lkono,t.px=t.py=t.pz=0,this.uv4(t,0,0,1,1);for(const e of t.tv)e.col=4292927712;t.bls=8,t.bld=6,t.mode0=1;return}if(t.mode1===0){t.flg|=16777216;return}t.flg&=-16777217,this.trs2d.push(t)}e021(t){t.mode1!==0?(t.func=21,this.fnc.push(t)):t.flg|=16777216}draw2D(){const t=new Set;for(const n of this.trs2d){if(n.stflg&16777216)continue;const i=this.eff.indexOf(n);t.add(i);let s=this.l2d.get(i);const a=`ef_${String(n.tex).padStart(3,"0")}_${n.ani}`,o=this.lang==="ru"?`effects/${a}_ru.png`:`effects/${a}.png`;if(s||(s=document.createElement("div"),s.style.cssText="position:absolute;background-size:100% 100%;image-rendering:auto",this.layer.appendChild(s),this.l2d.set(i,s)),s.dataset.src!==o){s.dataset.src=o;const h=!window.__ASSETS||window.__ASSETS[o];s.style.backgroundImage=`url(${Tn(h?o:`effects/${a}.png`)})`}const c=n.sx/4*512*(n.tv[1].u-n.tv[0].u),l=n.sy/4*512*(n.tv[2].v-n.tv[0].v);s.style.left=`${n.px/640*100}%`,s.style.top=`${n.py/480*100}%`,s.style.width=`${c/640*100}%`,s.style.height=`${l/480*100}%`,s.style.display="block",s.style.filter="brightness(0.88)"}for(const[n,i]of this.l2d)t.has(n)||(i.style.display="none");const e=this.fnc.some(n=>n.func===21);e&&!this.bars&&(this.bars=document.createElement("div"),this.bars.style.cssText="position:absolute;inset:0;pointer-events:none;background:linear-gradient(to bottom,#000 0,#000 8.333%,transparent 21.667%,transparent 78.333%,#000 91.667%,#000 100%)",this.layer.appendChild(this.bars)),this.bars&&(this.bars.style.display=e?"block":"none")}update(t){t.getWorldPosition(this.camPos).multiplyScalar(10),t.getWorldDirection(this.camDir);for(const e of this.fnc)if(e.func===107)for(const n of e.er)n.ay++;this.trs.length=0,this.fnc.length=0,this.trs2d.length=0;for(let e=0;e<512;e++){const n=this.eff[e];if(!(!(n.flg&1)||n.stflg&16777216)){if(n.id>=400){n.flg=0;continue}this.run(n)}}}run(t){switch(t.id){case 15:return this.e015(t);case 20:return this.e2D(t);case 21:return this.e021(t);case 32:case 36:case 39:case 52:case 54:case 59:case 70:case 71:case 72:case 73:case 74:case 75:case 76:case 77:case 78:case 79:case 31:case 33:case 34:case 35:case 41:case 45:t.flg=0;return;case 100:return this.e100(t);case 101:return this.e101(t);case 102:return this.e102(t);case 103:return this.e103(t);case 106:t.flg=0;return;case 107:return this.e107(t);case 116:return this.e116(t);case 119:return this.e119(t);case 154:return this.e154(t);case 155:return this.e155(t);case 158:return this.e158(t);case 159:return this.e159(t);case 164:return this.e164(t);case 165:return this.e165(t);case 179:return this.e179(t);case 180:return this.e180(t);case 181:return this.e181(t);case 182:return this.e182(t);case 201:return this.e201(t);case 218:return this.e218(t)}this.unknown.has(t.id)||(this.unknown.add(t.id),console.info("effect id",t.id,"not ported")),t.flg|=16777216}e100(t){if(t.flg|=16777216,t.stflg&16777216){t.flg=0;return}if(t.mode0===0){t.func=106,t.er=[];for(let e=0;e<77;e++)t.er.push({px:this.camPos.x+30*this.camDir.x+(80*se()-40),py:80*se(),pz:this.camPos.z+30*this.camDir.z+(80*se()-40),ax:0,ay:0});t.mode0=1;return}for(const e of t.er)e.ax=182.04445*(25*this.winds),e.px-=this.winds*kn(e.ay),e.pz-=this.winds*Cs(e.ay),e.py-=5,e.py<0&&(e.ay=this.windr,e.px=this.camPos.x+30*this.camDir.x+(80*se()-40),e.py=80,e.pz=this.camPos.z+30*this.camDir.z+(80*se()-40));this.fnc.push(t)}e101(t){if(t.flg|=16777216,t.stflg&16777216){t.flg=0;return}this.setTb({flg:1,id:107,type:0,px:0,py:0,pz:0,sx:t.sx,sy:t.sy,sz:t.sz,ax:0,ay:0})}e102(t){t.flg|=16777216,t.lkono!==0?this.windr=this.windr+(Math.trunc(182.04445*(t.sz*se()-.5*t.sz))&65535):this.windr=t.ay+(Math.trunc(182.04445*(20*kn(t.ct0)))&65535),this.winds=t.sx+t.sy*kn(t.ct0),t.ct0=t.ct0+t.type*256&65535}e107(t){if(t.mode0===0){t.func=107,t.er=[];for(let e=0;e<8;e++){const n=this.camPos.x+40*this.camDir.x+(80*se()-40),i=this.camPos.z+40*this.camDir.z+(80*se()-40),s=this.floors.find(a=>a.flg&1&&a.type===3&&a.flr===0&&a.x*10<=n&&(a.x+a.w)*10>=n&&a.z*10<=i&&(a.z+a.d)*10>=i);t.er.push({px:n,py:.1,pz:i,ax:s&&s.prm[0]===0?0:1,ay:0})}t.mode0=1,t.ct0=0;return}if(++t.ct0>4){t.flg=0;return}this.fnc.push(t)}e103(t){switch(t.flg|=16777216,t.type){case 0:se()<.3&&this.setTb({flg:1048577,id:10,type:1,px:t.px+3*se()-1.5,py:t.py+3*se()-1.5,pz:t.pz+3*se()-1.5,sx:t.sx,sy:t.sy,sz:t.sz,ax:0,ay:0});break;case 1:t.ct0=t.ct0+1&3,t.ct0===0&&(this.setTb({flg:68157441,id:119,type:0,px:t.px,py:t.py,pz:t.pz,sx:t.sx,sy:t.sy,sz:t.sz,ax:0,ay:t.ay+Math.trunc(2048*kn(t.ct1))}),t.ct1+=2048);break;case 2:t.ct0=t.ct0+1&1,t.ct0===0&&this.setTb({flg:68157441,id:119,type:1,px:t.px,py:t.py,pz:t.pz,sx:t.sx,sy:t.sy,sz:t.sz,ax:0,ay:0});break}}e116(t){t.flg|=16777216,t.ct3=t.ct3+1&3,t.ct3===0&&t.type===0&&this.setTb({flg:68157441,id:15,type:5,mdlver:t.ct3&7,px:t.px,py:t.py,pz:t.pz,sx:t.sx,sy:t.sy,sz:t.sz,ax:0,ay:t.ay})}e015(t){const e=t.tv;if(t.mode0===0){t.flg=68157441,t.tex=33;for(const i of e)i.col=2701131775;switch(t.bls=8,t.bld=6,t.ani=0,t.type){case 0:t.xn=.7,t.yn=.2,t.exp=ah;break;case 1:t.exp=oh;break;case 2:t.tex=34,t.bls=8,t.bld=10,e[0].x=-1,e[0].y=-2,e[1].x=1,e[1].y=-2,e[2].x=-1,e[2].y=0,e[3].x=1,e[3].y=0,t.exp=uv;break;case 3:t.tex=31,t.xn=.4,t.yn=.3,t.exp=ah;break;case 4:t.tex=31,t.exp=oh;break;case 5:t.tex=36,t.gpx=t.px,t.gpy=t.py,t.gpz=t.pz,t.xn=t.sz,t.yn=t.sy,t.sxb=t.sx,t.sy=t.syb=t.sx,t.sz=t.szb=t.sx,t.ct1=t.mdlver,t.exp=dv;break;case 6:t.tex=36,t.exp=fv;break}t.ct0=0,t.mode0=1}if(t.type===2){if(t.flr>0){t.flg|=16777216,t.flr--;return}t.flg&=-16777217}let n=t.exp[t.ct0];if(n.u===-1)if(t.type===5)t.ct0=0,n=t.exp[0];else{t.flg=0,(t.type===0||t.type===3)&&this.setTb({flg:68157441,id:15,type:t.type+1,mdlver:0,sx:2,sy:2,sz:2,px:t.px+2*se()-1,py:t.py,pz:t.pz+2*se()-1,ax:0,ay:0});return}switch(t.type===2&&(t.sx=8*t.sxb*n.w,t.sy=8*t.syb*n.h),this.uv4(t,n.u,n.v,n.u+n.w,n.v+n.h),t.type){case 0:case 3:t.sx+=.1,t.sy+=.1,t.px-=t.xn*kn(t.ay),t.pz-=t.xn*Cs(t.ay),t.py+=t.yn,t.xn-=.07*t.xn,t.yn-=.15;break;case 5:{const i=t.xn*-kn(t.ct1);if(t.px=t.gpx+i*kn(t.ay),t.pz=t.gpz+i*Cs(t.ay),t.py=t.gpy+t.yn*Cs(t.ct1),t.sx+=.001,t.ct1+=512,t.ct1>=16384){t.flg=0,this.setTb({flg:68157441,id:15,type:t.type+1,mdlver:0,sx:1.2*t.sx,sy:1.2*t.sy,sz:1.2*t.sz,px:t.px+se()-.5,py:t.py,pz:t.pz+se()-.5,ax:0,ay:0});return}break}}t.ct0++,this.trs.push(t)}e119(t){const e=t.tv;if(t.mode0===0){t.tex=39,t.flg|=68157440;for(const i of e)i.col=4294967295;if(t.bls=11,t.bld=3,t.gpy=t.py,t.ani=0,t.ct0=0,t.xn=.4*se()-.2,t.zn=.4*se()-.2,t.type===0){for(const i of e)i.col=3238002687;t.ct2=192,t.exp=rh,t.spd=.1*t.sz}else t.type===1&&(t.exp=rh.slice(5));t.mode0=1}const n=t.exp[t.ct0];if(n.u===-1){t.flg=0;return}if(t.type===0){for(const i of e)i.col=(t.ct2<<24|16777215)>>>0;t.spd*=.9,t.px-=t.spd*kn(t.ay),t.pz-=t.spd*Cs(t.ay),t.py+=.5,t.ct2-=8}else t.type===1&&(t.px+=t.xn,t.pz+=t.zn,t.py=t.gpy+t.sz*kn(t.ct0*1024),t.sx=8*t.sxb*n.w,t.sy=8*t.syb*n.h);this.uv4(t,n.u,n.v,n.u+n.w,n.v+n.h),t.ct0++,this.trs.push(t)}e154(t){t.flg|=16777216,t.type===0&&t.mode1!==0&&(t.type=t.mode1),t.type!==0&&((t.ct1<1||t.ct1>7)&&(t.ct0=t.ct0===1?se()>=.5?2:0:t.ct0===2?se()>=.5?1:0:se()>=.5?2:1,this.setentry(155,t.ct0,t),t.mode1=0,t.ct1=7),t.ct1--)}e155(t){t.mode0===0&&(t.tex=52,this.effinit(t),t.exp=rv[t.type===1?1:t.type===2?2:0],t.mode0=1),this.seq(t,0)}seq(t,e){const n=t.exp[t.ct0];if(n.u===-1){t.flg=0;return}this.effset(t,n,e),t.ct0++,this.trs.push(t)}e158(t){t.flg|=16777216,t.type===0&&t.mode1!==0&&(t.type=t.mode1),t.type!==0&&(this.setentry(159,t.type===2?1:0,t),t.mode1=0,t.type=0)}e159(t){t.mode0===0&&(t.tex=54,this.effinit(t),t.type===1?t.exp=av:t.type===2?(t.exp=ih,t.type-=2,t.xn=t.sz*(se()-.5)/8,t.yn=t.sz*(se()-.5)/8,t.zn=t.sz*(se()-.5)/8):(t.exp=ih,t.type=0),t.mode0=1);const e=t.exp[t.ct0];if(e.u===-1){t.flg=0;return}t.ani=(t.type===1?cv:ov)[t.ct0]??0,t.px+=t.xn,t.py+=t.yn,t.pz+=t.zn,this.effset(t,e,0),t.ct0++,this.trs.push(t)}e164(t){t.flg|=16777216,t.type===0&&t.mode1!==0&&(t.type=t.mode1,t.mode1=0),t.type!==0&&t.ct0===0&&(t.ct0=t.type&65535),t.ct0!==0&&(this.setentry(159,2,t),t.ct0-=1,t.ct0===0&&(t.type=0))}e165(t){if(t.flg|=16777216,t.type===0&&t.mode1!==0&&(t.type=t.mode1&255,t.mode1=0),t.type!==0&&t.ct0===0){t.ct0=t.type*2;const e=this.dir(t.ax,t.ay,t.sz);t.xn=e.x,t.yn=e.y,t.zn=e.z,t.spd=0,t.aox=t.px,t.aoy=t.py,t.aoz=t.pz,t.axp=t.ax,t.ayp=t.ay,t.azp=t.az}if(t.ct0!==0){t.ct0&1||this.setentry(159,1,t),t.px+=t.xn,t.py+=t.yn,t.pz+=t.zn,t.py+=t.spd,t.spd-=.05;const e=this.dir(t.ax,t.ay,t.sz);t.xn=e.x,t.yn=e.y,t.zn=e.z,0>=t.py&&(t.yn<0?(t.spd=2*-t.yn,t.yn=0):(t.yn=-(t.yn+t.spd),t.spd=0)),t.ct0--,t.ct0===0&&(t.type=0,t.px=t.aox,t.py=t.aoy,t.pz=t.aoz,t.ax=t.axp,t.ay=t.ayp,t.az=t.azp)}}e179(t){if(t.flg|=16777216,t.type===0&&t.mode1!==0&&(t.type=t.mode1),t.type!==0){if(!t.sz){this.setentry(180,t.type-1,t),t.mode1=0,t.type=0;return}t.ct1<=0&&(this.setentry(180,t.type-1,t),t.ct1=Math.trunc(t.sz)),t.ct1-=1}}e180(t){t.mode0===0&&(t.tex=408,this.effinit(t),t.type===1?(t.exp=sh[1],t.ani=1):t.exp=sh[0],t.mode0=1),this.seq(t,0)}e181(t){if(t.flg|=16777216,t.type===0&&t.mode1!==0&&(t.type=t.mode1),t.type!==0){const e=t.type-1;if(!Math.floor(t.sz)){this.setentry(182,e,t),t.mode1=0,t.type=0;return}t.ct1<1&&(this.setentry(182,e,t),t.ct1=Math.floor(t.sz)),t.ct1--}}e182(t){const e=t.type%10,n=Math.floor(t.type/10);t.mode0===0&&(t.tex=lv[e],this.effinit(t),t.exp=No[e],t.mode0=1);const i=this.dir(t.ax,t.ay,t.sz-Math.trunc(t.sz));t.px+=i.x,t.py+=i.y,t.pz+=i.z;const s=t.exp[t.ct0];if(s.u===-1){t.flg=0;return}this.effset(t,s,n),t.ct0++,this.trs.push(t)}e201(t){if(t.type===0&&t.mode1!==0&&(t.type=t.mode1),t.type===0){t.flg|=16777216;return}if(t.flg&=-16777217,t.mode0===0){t.flg|=68681728,t.tex=59,t.ani=0,t.bls=8,t.bld=3,t.ct0=Math.trunc(16*se());for(const i of t.tv)i.col=4294967295;t.mode0=1}else++t.ct0>=16&&(t.ct0=0);const e=t.ct0%4*64,n=Math.floor(t.ct0/4)*64;this.uv4(t,e/256,n/256,(e+63)/256,(n+63)/256),this.trs.push(t)}e218(t){if(t.type===0&&t.mode1!==0&&(t.type=t.mode1),t.type===0){t.flg|=16777216;return}t.flg&=-16777217;const e=wv[(t.type-1)%17],n=t.tv;if(t.mode0===0){t.flg|=68681728,t.bls=8,t.bld=3,n[0].x=n[2].x=-1,n[1].x=n[3].x=1,n[0].y=n[1].y=-2,n[2].y=n[3].y=0;for(const a of n)a.col=4294967295;t.ct0=Math.trunc(e[1].length*se()),t.mode0=1}else++t.ct0>=e[1].length&&(t.ct0=0);t.tex=e[0],t.ani=0;const[i,s]=e[1][t.ct0];this.uv4(t,i/256,(s&&s+1)/256,(i+e[2]-1)/256,(s+e[3])/256),this.trs.push(t)}mat(t,e,n,i){let s=this.batches.get(t);if(!s){const a=new Ge,o=512;a.setAttribute("position",new xe(new Float32Array(o*4*3),3).setUsage($r)),a.setAttribute("uv",new xe(new Float32Array(o*4*2),2).setUsage($r)),a.setAttribute("color",new xe(new Float32Array(o*4*4),4).setUsage($r));const c=new Uint16Array(o*6);for(let u=0;u<o;u++)c.set([u*4,u*4+2,u*4+1,u*4+1,u*4+2,u*4+3],u*6);a.setIndex(new xe(c,1));const l=new an({map:e,vertexColors:!0,transparent:!0,depthWrite:!1,side:sn,fog:!0});i===10?l.blending=ts:n===11&&(l.blending=mh,l.blendSrc=gh,l.blendDst=Dr,l.blendEquation=ri);const h=new Re(a,l);h.frustumCulled=!1,s={mesh:h,geo:a,n:0},this.batches.set(t,s),this.group.add(h)}return s}draw(t){for(const o of this.batches.values())o.n=0;t.updateMatrixWorld();const e=t.matrixWorld.elements,n=[e[0],e[1],e[2]],i=[e[4],e[5],e[6]];let s=0;for(const o of this.trs){if(o.flg&16777216||o.stflg&16777216||o.tex<0||!(o.flg&1))continue;const c=this.tex.get(`ef_${String(o.tex).padStart(3,"0")}_${o.ani}`);if(!c){this.tex.has(`ef_${String(o.tex).padStart(3,"0")}_${o.ani}`)||this.texture(o.tex,o.ani);continue}const l=`${o.tex}_${o.ani}_${o.bls}_${o.bld}`,h=this.mat(l,c,o.bls,o.bld);if(h.n===0&&(h.mesh.renderOrder=1e3+s++),h.n>=512)continue;const u=h.geo.attributes.position.array,d=h.geo.attributes.uv.array,p=h.geo.attributes.color.array,g=Math.cos(o.az*si),_=Math.sin(o.az*si);for(let m=0;m<4;m++){const f=o.tv[m],b=h.n*4+m,T=f.x*o.sx,x=f.y*o.sy,L=T*g-x*_,C=-(T*_+x*g);u[b*3]=(o.px+n[0]*L+i[0]*C)*.1,u[b*3+1]=(o.py+n[1]*L+i[1]*C)*.1,u[b*3+2]=(o.pz+n[2]*L+i[2]*C)*.1,d[b*2]=f.u,d[b*2+1]=f.v;const R=f.col>>>0;p[b*4]=((R>>>16&255)+1>>1)/128,p[b*4+1]=((R>>>8&255)+1>>1)/128,p[b*4+2]=((R&255)+1>>1)/128,p[b*4+3]=Math.min(1,((R>>>24)+1>>1)/128)}h.n++}let a=!1;for(const o of this.fnc)o.func===106?(a=!0,this.drawRain(o)):o.func===107&&this.drawSplash(o,n,i);this.rain.visible=a;for(const o of this.batches.values())o.geo.setDrawRange(0,o.n*6),o.mesh.visible=o.n>0,o.n&&(o.geo.attributes.position.needsUpdate=!0,o.geo.attributes.uv.needsUpdate=!0,o.geo.attributes.color.needsUpdate=!0)}drawRain(t){const e=this.rain.geometry,n=e.attributes.position.array,i=e.attributes.color.array,s=new A,a=new A,o=new Ve,c=[8/128,8/128,8/128,8/128],l=[24/128,24/128,24/128,32/128];t.er.forEach((h,u)=>{o.set(h.ax*si,h.ay*si,0,"ZYX"),s.set(0,7,0).applyEuler(o),a.set(0,-7,0).applyEuler(o),n.set([(h.px+s.x)*.1,(h.py+s.y)*.1,(h.pz+s.z)*.1,(h.px+a.x)*.1,(h.py+a.y)*.1,(h.pz+a.z)*.1],u*6),i.set([...c,...l],u*8)}),e.attributes.position.needsUpdate=!0,e.attributes.color.needsUpdate=!0}drawSplash(t,e,n){const i=this.tex.get("ef_032_0");if(!i)return;const s=this.mat("32_0_8_10",i,8,10);s.n===0&&(s.mesh.renderOrder=1900);const a=s.geo.attributes.position.array,o=s.geo.attributes.uv.array,c=s.geo.attributes.color.array,l=[[-.7,-1.4],[.7,-1.4],[-.7,0],[.7,0]];for(const h of t.er){const u=pv[Math.min(h.ay,5)];if(h.ay<5&&h.ax!==0&&s.n<512){const d=[u.u,u.u+u.w,u.u,u.u+u.w],p=[u.v,u.v,u.v+u.h,u.v+u.h];for(let g=0;g<4;g++){const _=s.n*4+g,m=l[g][0],f=-l[g][1];a[_*3]=(h.px+e[0]*m+n[0]*f)*.1,a[_*3+1]=(h.py+e[1]*m+n[1]*f)*.1,a[_*3+2]=(h.pz+e[2]*m+n[2]*f)*.1,o[_*2]=d[g],o[_*2+1]=p[g],c.set([.5,.5,.5,.5],_*4)}s.n++}}}}ax();Kt.enabled=!1;const Rv=new Set(["rm_0000","rm_0010","rm_0020","rm_0021","rm_0030","rm_0031","rm_0040","rm_0050","rm_0060","rm_0070","rm_0080","rm_0090","rm_0160"]),Cv=new Set(["en91a00","en93a00","en98a00"]),Iv=new Set([0,1,2,9,10,32,33]),Pv={0:0,1:5,2:5,9:0,10:0,32:5,33:8},ni=55,lu=8,ii=9,dh=12,fh=15,Ha={[ni]:1,[lu]:2,[ii]:4},Lv=1.5,Dv=[.45,.075,.45,.6,.2],Oe=(r,t)=>String(r).padStart(t,"0");class Nv{constructor(t){S(this,"renderer");S(this,"scene",new qh);S(this,"fx",new Av);S(this,"lights",new sx);S(this,"cam",new wx);S(this,"input",new Ax);S(this,"player",new Ex);S(this,"inv",new Rx);S(this,"msg");S(this,"room",null);S(this,"roomId","");S(this,"busy",!1);S(this,"invOpen",!1);S(this,"invScreen");S(this,"debug",!1);S(this,"clock",new h_);S(this,"audio",new Xx);S(this,"playTime",0);S(this,"vm");S(this,"evtAcc",0);S(this,"wallSig","");S(this,"movieOn",!1);S(this,"pendingDoor",null);S(this,"dialog",!1);S(this,"ambient",new nu(12109016,.95));S(this,"hemi",new s_(10135232,2760728,.5));S(this,"actors",[]);S(this,"chars",[]);S(this,"mixers",new WeakMap);S(this,"hidSig","");S(this,"linkM",new Pt);S(this,"linkT",new Pt);S(this,"linkR",new Pt);S(this,"linkBase",new Map);S(this,"npcs",[]);S(this,"zombies",[]);S(this,"dogs",[]);S(this,"dogBite",null);S(this,"grab",null);S(this,"overShown",!1);S(this,"loop",()=>{requestAnimationFrame(this.loop);const t=Math.min(this.clock.getDelta(),1/10);this.step(t),this.render(),this.input.endFrame()});this.ui=t,this.renderer=new Xh({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=Ce,this.ui.stage.prepend(this.renderer.domElement),this.fx.layer.style.cssText="position:absolute;inset:0;pointer-events:none;z-index:4;overflow:hidden",this.fx.lang=ye,this.renderer.domElement.after(this.fx.layer),this.msg=new yu(this.ui.msg),this.msg.onCursor=()=>this.audio.se("cursor"),this.vm=new nv(this),this.invScreen=new Ux(this.ui.inv,this.inv,this.input,this.audio,this.player),this.invScreen.onEquipChange=()=>{this.player.setLighter(this.invScreen.standard===ni),this.player.setKnife(this.invScreen.equipped===lu),this.player.setGun(this.invScreen.equipped===ii)},this.invScreen.onUseItem=i=>this.useItem(i),this.scene.background=new Tt(0),this.scene.add(this.lights.group,this.player.root,this.fx.group),this.lights.lockFn=(i,s,a,o)=>this.lockPos(i,s,a,o),addEventListener("resize",()=>this.resize()),this.resize(),localStorage.getItem("cvx.cam")==="behind"&&(this.cam.mode="behind"),this.player.onSlash=i=>this.onSlash(i);const n=()=>this.inv.slots.find(i=>(i==null?void 0:i.id)===ii);this.player.canFire=()=>{var i;return(((i=n())==null?void 0:i.count)??0)>0},this.player.emptyClick=()=>this.audio.se("empty"),this.player.onStep=(i,s)=>{const a=i?this.bonePos(0,0,i===this.player.bones.b17?17:21):this.player.pos.clone();this.audio.foot(this.floorSound(a),s===1,a,0)},this.player.onFire=(i,s,a)=>this.onFire(i,s,a),this.player.needReload=()=>{const i=n(),s=this.inv.slots.find(o=>(o==null?void 0:o.id)===dh);if(!i||i.count>0||!s)return!1;const a=Math.min(fh,s.count);return i.count+=a,s.count-=a,s.count<=0&&(this.inv.slots[this.inv.slots.indexOf(s)]=null),this.audio.se("reload"),!0},window.__game=this}resize(){const{w:t,h:e}=this.ui.fit(Vs);this.renderer.setSize(t,e,!1),this.renderer.domElement.style.width=t+"px",this.renderer.domElement.style.height=e+"px"}async start(t,e){await this.player.load(),this.audio.init(),t?(this.player.hp=t.hp??160,this.inv.slots=t.inv.map(n=>n?{...n}:null),this.invScreen.equipped=t.eq??null,this.invScreen.standard=t.std??null,this.playTime=t.t??0,t.evt&&(this.vm.f=t.evt.f,this.vm.rcase=t.evt.rcase),await this.enterRoom(t.room,t.pos??0,{x:t.x,y:t.y,z:t.z,h:t.h},!1)):(this.inv.add(ni,ks[ni]),await this.enterRoom("rm_0000",0,void 0,!1)),this.invScreen.onEquipChange(),this.renderer.domElement.addEventListener("mousedown",()=>{this.cam.mode==="behind"&&!this.invOpen&&!this.msg.active&&this.input.requestLock(this.renderer.domElement)}),this.loop(),e==null||e(),t&&await this.ui.fade(!1,900)}async enterRoom(t,e,n,i=!0,s=0){this.busy=!0;const a=performance.now();i&&await this.ui.fade(!0,350),this.room&&(this.scene.remove(this.room.group),this.vm.roomChange());const[o,c]=await Promise.all([uc.load(t),zr(`evt/${t}.json`).catch(()=>({scripts:[]}))]);await o.placeItems(),this.room=o,this.roomId=t;for(const d of[...this.zombies,...this.dogs])this.scene.remove(d.root);for(const d of this.actors)this.scene.remove(d);for(const d of this.chars)this.scene.remove(d.m.root);if(this.chars=[],this.zombies=[],this.dogs=[],this.npcs=[],this.actors=[],this.grab=null,this.dogBite=null,n)this.player.place(n.x,n.y,n.z,n.h);else{const d=o.data.spawns[Math.max(0,Math.min(e,o.data.spawns.length-1))];this.player.place(d.pos[0],d.pos[1],d.pos[2],d.ang)}const l=o.floorAt(this.player.pos.x,this.player.pos.z,this.player.pos.y+.3,.6);l!==null&&(this.player.pos.y=l);const h=this.vm;h.stg=+t[3],h.room=parseInt(t.slice(4,6),10),h.rcase=+t[6],h.pos_no=e,h.etc=o.data.triggers.map(za),h.wal=o.data.collision.map(za),h.flr=(o.data.areas??[]).map(za),this.syncPlayerWork(),this.cam.forced=null,this.wallSig="",this.audio.room(h.stg,h.room,h.rcase),this.audio.listener=this.cam.cam,this.fx.floors=h.flr,await this.fx.load(t),this.lights.setRoom(o.data.lgt,o.data.evl,o.data.amb),h.init(c.scripts),await this.spawnEnemies(o),this.applyWorks(),this.scene.add(o.group),this.cam.setRoom(o),this.cam.ev.setRoom(c.evc??[]),this.cam.lockFn=(d,p,g,_)=>this.lockPos(d,p,_,g),this.player.root.updateMatrixWorld(!0),this.cam.update(this.player.pos,this.player.headPos(),this.player.heading,!0),this.renderer.compile(this.scene,this.cam.cam);const u=s-(performance.now()-a);u>0&&await new Promise(d=>setTimeout(d,u)),i&&await this.ui.fade(!1,350),this.busy=!1}async spawnEnemies(t){const e=t.data.enemies??[];for(let n=0;n<e.length;n++){const i=e[n];this.vm.works.get("1:"+n);const s=i.ex??"000000000000",a=parseInt(s.slice(0,4),16),o=parseInt(s.slice(6,8),16);if(i.id===1){if(!Iv.has(o)){console.info(`${this.roomId}: zombie ${n} model en01a${Oe(o,2)} not converted`);continue}const c=a===0&&this.roomId.startsWith("rm_002"),l=new jx(n);l.mdlver=o,await l.init(`enemies/en01a${Oe(o,2)}.glb`,i.pos[0],i.pos[1],i.pos[2],c?i.rot[1]??0:i.rot[2]??0,c),this.zombies.push(l),this.scene.add(l.root);const h=this.vm;this.npcs.push({root:l.root,get hittable(){var u;return l.root.visible&&l.hittable&&!((u=h.works.get("1:"+n))!=null&&u.scripted)},hit:()=>this.hitZombie(l,1)})}else if(i.id===4){const c=new Yx(n);await c.init("enemies/en04a00.glb",i.pos[0],i.pos[1],i.pos[2],i.rot[2]??0),this.dogs.push(c),this.scene.add(c.root),this.npcs.push({root:c.root,get hittable(){return c.root.visible&&c.hittable},hit:()=>this.hitZombie(c,1)})}else if(Cv.has(`en${Oe(i.id,2)}a${Oe(o,2)}`)){const c=new jr;await c.load(`npc/en${Oe(i.id,2)}a${Oe(o,2)}.glb`),c.root.position.set(i.pos[0],i.pos[1],i.pos[2]),c.root.rotation.y=i.rot[1]??0;{const l=this.vm.works.get("1:"+n);c.root.visible=!(l&&(l.gone||l.hidden))}this.chars.push({index:n,m:c}),this.scene.add(c.root)}else if(i.id===67){const c=this.vm.works.get("1:"+n);if(c&&(c.gone||c.hidden))continue;const l=await Wn("npc/en67a00.glb").catch(()=>null);if(!l)continue;const h=l.scene.clone(!0);ui(h,"chr"),h.position.set(i.pos[0],i.pos[1],i.pos[2]),h.rotation.y=i.rot[1]??0,this.actors.push(h),this.scene.add(h)}else console.info(`${this.roomId}: character en${Oe(i.id,2)} (enemy ${n}) not converted`)}}syncPlayerWork(){const t=this.vm.work(0,0),e=this.player;t.posSet||(t.px=e.pos.x,t.py=e.pos.y,t.pz=e.pos.z),t.angSet||(t.ay=e.heading)}applyWorks(){const t=this.vm,e=this.room,n=this.player,i=t.works.get("0:0");i?(i.posSet?(n.place(i.px,i.py,i.pz,i.angSet?i.ay:n.heading),i.posSet=!1,i.angSet=!1):i.angSet&&(n.place(n.pos.x,n.pos.y,n.pos.z,i.ay),i.angSet=!1),n.root.visible=!i.gone&&!i.hidden):n.root.visible=!0;for(const[a,o]of e.itemMeshes){const c=t.works.get("3:"+a);if(!c){o.visible=!0;continue}o.visible=!c.gone&&!c.hidden,c.posSet&&(o.position.set(c.px,c.py,c.pz),c.posSet=!1),c.angSet&&(o.rotation.set(c.ax,c.ay,c.az,"ZYX"),c.angSet=!1),c.mtnKind===3&&c.mtn>=0&&this.nodeMotion(o,e.itemClips.get(a),c)}for(const[a,o]of e.objMeshes){const c=t.works.get("2:"+a);if(!c)continue;const l=c.link?t.works.get(`${c.link.kind}:${c.link.kind===0?0:c.link.idx}`):void 0,h=c.link?!!(l!=null&&l.gone):c.gone;o.visible=!h&&!c.hidden&&(!e.outside.has(a)||!!c.link),c.posSet&&(o.position.set(c.px,c.py,c.pz),c.posSet=!1),c.angSet&&(o.rotation.set(c.ax,c.ay,c.az,"ZYX"),c.angSet=!1)}for(const[a,o]of t.works)o.kind===4&&o.posSet&&(this.fx.setPos(o.idx,o.px*10,o.py*10,o.pz*10),o.posSet=!1);for(const a of this.chars){const o=t.works.get("1:"+a.index),c=a.m;o&&(c.root.visible=!o.gone&&!o.hidden,o.posSet&&(c.root.position.set(o.px,o.py,o.pz),o.posSet=!1),o.angSet&&(c.root.rotation.set(o.ax,o.ay,o.az,"ZYX"),o.angSet=!1),o.mtnKind===1&&o.mtn>=0&&this.roomMotion(c,o))}for(const a of[...this.zombies,...this.dogs]){const o=t.works.get("1:"+a.index);if(o&&(a.root.visible=!o.gone&&!o.hidden,o.posSet&&((o.px||o.py||o.pz)&&a.root.position.set(o.px,o.py,o.pz),o.posSet=!1),o.angSet&&(a.heading=o.ay,a.root.rotation.y=o.ay,o.angSet=!1),o.mtnKind===1&&o.mtn>=0)){const c=`${this.roomId}/r${Oe(o.mtn,2)}`;a.cur!==c&&a.clips.has(c)&&(a.root.position.set(o.px,o.py,o.pz),a.heading=o.ay,a.root.rotation.y=o.ay),this.roomMotion(a,o)}}const s=t.wal.map(a=>a.flg&1).join("");s!==this.wallSig&&(this.wallSig=s,e.syncWalls(a=>!!(t.wal[a]&&t.wal[a].flg&1)))}inBox(t,e,n){return e>=Math.min(t.x,t.x+t.w)&&e<=Math.max(t.x,t.x+t.w)&&n>=Math.min(t.z,t.z+t.d)&&n<=Math.max(t.z,t.z+t.d)}quadBit(){const t=Math.round(this.player.heading/(Math.PI*2)*65536)+8192&49152;return t===32768?1024:t===16384?2048:t===0?4096:8192}floorCheck(){const t=this.vm,e=this.player,n=e.forward(),i=this.quadBit();t.cb&=-134218241;for(let s=0;s<t.flr.length;s++){const a=t.flr[s];if(!(a.flg&1)||a.type!==0)continue;let o;a.attr&1?o=this.inBox(a,e.pos.x+n.x*.6,e.pos.z+n.z*.6)&&!(a.attr&i):o=this.inBox(a,e.pos.x,e.pos.z),o&&(t.cb|=512,t.flr_idx=s)}}examine(){const t=this.vm,e=this.player,n=e.forward(),i=this.quadBit();t.cb&=-257;for(let s=0;s<t.etc.length;s++){const a=t.etc[s];if(!(a.flg&1))continue;const o=Dv[a.type]??.45;if(!(!this.inBox(a,e.pos.x+n.x*o,e.pos.z+n.z*o)||a.attr&i)){if(t.cb|=256,t.etc_idx=s,a.type===0)this.door(0,a.prm[0],a.prm[1],a.prm[2]);else if(a.type===3)a.attr&32768&&this.showMessage(a.prm[1],!0);else if(a.type===4&&!(a.attr&2)){const c=a.prm[0],l=this.room.data.items[c],h=t.works.get("3:"+c);l&&!(h!=null&&h.gone)&&(t.sb_id=l.id,this.itemScreen())}return!0}}return!1}useItem(t){const e=this.vm;if(!(e.cb&512))return!1;const n=e.flr[e.flr_idx];return!n||!n.prm.includes(t)?!1:(e.sb_id=t,e.cb|=1024,this.toggleInv(!1),!0)}roomMessage(t){var e;return((e=this.room)==null?void 0:e.data.messages[t])??""}showMessage(t,e){const n=this.roomMessage(t),i=En(n,this.vm.sb_id),s=_u(n);if(e&&(this.vm.st|=8704),!i.length){queueMicrotask(()=>this.vm.messageClosed(-1,e));return}this.msg.show(i,s?[dn.yes(),dn.no()]:void 0).then(a=>this.vm.messageClosed(s?a:-1,e))}async itemScreen(){const t=this.vm,e=t.sb_id,n=this.invScreen,i=!!(t.cb&16384);t.cb&=-16401,this.dialog=!0,this.invOpen=!0;try{if(await n.show(!0,e),!i&&await n.say(En(ai[157],e),[dn.yes(),dn.no()])!==0){t.cb&=-32769;return}let s=e===dh||e===ii?fh:1;if(t.cb&32768&&e===ii&&(s-=3),!this.inv.canAdd(e)){t.cb&=-32769,e===20||e===21||e===23?await n.say(En(ai[153]),[dn.yes(),dn.no()])===0&&(n.heal(e),t.cb|=2048,n.refresh()):await n.say(En(ai[154]));return}this.inv.add(e,ks[e]??"",s),t.cb|=2048,t.cb&32768&&e===ii&&(n.equipped=ii,n.standard=null,n.onEquipChange()),t.cb&=-32769,n.refresh(),await n.say(En(ai[158],e))}finally{await n.show(!1),this.invOpen=!1,this.dialog=!1}}lockPos(t,e,n,i=0){var l,h;const s=this.room;let a;if(t===6){const u=s.data.spawns[e]??s.data.spawns[0];return u?new A(u.pos[0]+n[0],u.pos[1]+n[1],u.pos[2]+n[2]):null}if(t===1?a=this.player.root:t===2?a=((l=this.chars.find(u=>u.index===e))==null?void 0:l.m.root)??((h=[...this.zombies,...this.dogs].find(u=>u.index===e))==null?void 0:h.root):t===3?a=s.objMeshes.get(e):t===4&&(a=s.itemMeshes.get(e),a=(a==null?void 0:a.getObjectByName("n000"))??a),!a)return null;if(i>0&&t<=4){const u=this.boneObj(t-1,e,i);u&&u!==a&&(a=u)}a.updateWorldMatrix(!0,!1);const o=a.matrixWorld.clone(),c=new A().setFromMatrixScale(o);return o.multiply(new Pt().makeScale(1/c.x,1/c.y,1/c.z)),new A(n[0],n[1],n[2]).applyMatrix4(o)}roomMotion(t,e){const n=`${this.roomId}/r${Oe(e.mtn,2)}`;if(!t.clips.has(n))return;if(t.cur!==n){const s=t.play(n,0,!1);s&&(s.paused=!0)}const i=t.action;i&&(i.time=Math.min(e.frm/65536/30,i.getClip().duration),t.mixer.update(0))}nodeMotion(t,e,n){const i=`${this.roomId}/r${Oe(n.mtn,2)}`,s=e==null?void 0:e.find(o=>o.name===i);if(!s)return;let a=this.mixers.get(t);a||(a={mixer:new hc(t),cur:"",action:null},this.mixers.set(t,a)),a.cur!==i&&(a.mixer.stopAllAction(),a.action=a.mixer.clipAction(s),a.action.setLoop(Vr,1),a.action.clampWhenFinished=!0,a.action.play(),a.action.paused=!0,a.cur=i),a.action.time=Math.min(n.frm/65536/30,s.duration),a.mixer.update(0)}evtFrame(){const t=this.vm;this.syncPlayerWork(),this.floorCheck(),t.tick(),this.fx.update(this.cam.cam),this.cam.ev.step(),this.applyWorks(),this.lightFrame(),t.cb&16&&!this.dialog&&this.itemScreen(),t.cb&2097152&&(t.cb&=-2097153,this.saveScreen())}lightFrame(){this.lights.event=this.cam.ev.active,this.lights.lighter(this.weapon()===1&&this.player.root.visible),this.player.root.updateMatrixWorld(!0),this.hideFrame(),this.lights.frame()}hideFrame(){var s,a,o,c;const t=this.room;if(!t)return;const e=this.cam.ev;let n;e.active?n=(a=e.evc[e.no])==null?void 0:a.keys[Math.min(e.key,(((s=e.evc[e.no])==null?void 0:s.keys.length)??1)-1)]:this.cam.shown>=0&&(n=t.data.cameras[this.cam.shown]);const i=`${t.data.id}|${e.active}|${(o=n==null?void 0:n.hid)==null?void 0:o.join(",")}|${(c=n==null?void 0:n.hidl)==null?void 0:c.join(",")}`;i!==this.hidSig&&(this.hidSig=i,t.setHidden((n==null?void 0:n.hid)??[]),this.lights.hide(e.active,(n==null?void 0:n.hidl)??[]))}light(t,e){const n=this.lights;t==="set"?n.set(e[0],e[1],e[2]):t==="type"?n.type(e[0],e[1],e[2]):t==="param"?n.param(e[0],e[1],e[2],e[3],e[4],e[5],e[6]):t==="amb"&&n.setAmb(e[0],e[1],e[2],e[3])}get inCine(){const t=this.vm.works.get("0:0");return!!(this.vm.st&4)||!!(t!=null&&t.scripted)||!!(t!=null&&t.gone)}hasItem(t){return this.inv.has(t)}loseItem(t){const e=this.inv.slots.findIndex(n=>(n==null?void 0:n.id)===t);e>=0&&(this.inv.slots[e]=null),this.invScreen.equipped===t&&(this.invScreen.equipped=null),this.invScreen.standard===t&&(this.invScreen.standard=null),this.invScreen.onEquipChange()}weapon(){return this.invScreen.standard===ni?1:Ha[this.invScreen.equipped??-1]??0}setWeapon(t){const e=Object.keys(Ha).map(Number).find(n=>Ha[n]===t);e===ni?this.inv.has(ni)&&(this.invScreen.standard=ni,this.invScreen.equipped=null):e!==void 0?this.inv.has(e)&&(this.invScreen.equipped=e,this.invScreen.standard=null):(this.invScreen.equipped=null,this.invScreen.standard=null),this.invScreen.onEquipChange()}message(t){this.showMessage(t,!1)}fade(t,e){this.ui.fade(t>>>24>=128,Math.max(1,e)*1e3/30)}cine(t){(t===1||t===2||t===4)&&(this.cam.forced=null)}camSet(t,e,n){t===0?this.cam.ev.start(e,n):this.cam.ev.stop()}camFix(t,e){this.cam.forced=t===0?e:null}camPause(t){this.cam.ev.paused=t}camInit(){this.cam.ev.stop(),this.cam.forced=null}door(t,e,n,i){this.pendingDoor={stg:e,room:n,pos:i}}movie(t){this.movieOn=!0,this.audio.bgmOff(0),this.audio.voiceOff(0),ou(this.ui.stage,`mv_${Oe(t,3)}`).finally(()=>{this.movieOn=!1})}moviePlaying(){return this.movieOn}eff(t,e,n){t==="disp"?this.fx.disp(e,n):t==="mode"?this.fx.mode(e,n):this.fx.yure(e,n)}boneObj(t,e,n){var i,s;if(t===0)return this.player.bones["b"+Oe(n,2)]??this.player.root;if(t===1){const a=this.chars.find(c=>c.index===e);if(a){const c=n<=5?n:n<15?5:n-4;return a.m.bones["b"+Oe(c,2)]??a.m.root}const o=[...this.zombies,...this.dogs].find(c=>c.index===e);return o?o.bones["b"+Oe(n,2)]??o.root:void 0}if(t===2)return(i=this.room)==null?void 0:i.objMeshes.get(e);if(t===3)return(s=this.room)==null?void 0:s.itemMeshes.get(e)}bonePos(t,e,n){const i=this.boneObj(t,e,n);if(i)return i.updateWorldMatrix(!0,!1),new A().setFromMatrixPosition(i.matrixWorld)}floorSound(t){if(!t)return 0;let e=0;for(const n of this.vm.flr)n.flg&1&&n.type===1&&!(n.attr&1)&&this.inBox(n,t.x,t.z)&&n.prm[0]<=4&&(e=n.prm[0]);return e}updateLinks(){const t=this.room;if(t)for(const[e,n]of this.vm.works){if(n.kind!==2&&n.kind!==3)continue;const i=(n.kind===2?t.objMeshes:t.itemMeshes).get(n.idx);if(!i)continue;if(!n.link){const c=this.linkBase.get(i);c&&(i.position.copy(c.pos),i.rotation.copy(c.rot),i.scale.copy(c.scale),this.linkBase.delete(i));continue}const s=this.boneObj(n.link.kind,n.link.idx,n.link.bone);if(!s||s===i)continue;let a=this.linkBase.get(i);a||(a={pos:i.position.clone(),rot:i.rotation.clone(),scale:i.scale.clone()},this.linkBase.set(i,a)),s.updateWorldMatrix(!0,!1),this.linkT.makeTranslation(n.link.lo[0],n.link.lo[1],n.link.lo[2]),this.linkR.makeRotationFromEuler(a.rot).scale(a.scale),this.linkM.copy(s.matrixWorld).multiply(this.linkT).multiply(this.linkR);const o=new A().setFromMatrixScale(s.matrixWorld);this.linkM.multiply(new Pt().makeScale(1/o.x,1/o.y,1/o.z)),i.parent&&(i.parent.updateWorldMatrix(!0,!1),this.linkM.premultiply(new Pt().copy(i.parent.matrixWorld).invert())),this.linkM.decompose(i.position,i.quaternion,i.scale)}}snd(t,e,n){const i=this.audio;switch(t){case"bgm":i.bgm(e[0],e[1],e[2]);break;case"bgm2":i.bgm(e[0],100,e[1]);break;case"bgmOff":i.bgmOff(e[0]);break;case"voice":i.voice(e[0],e[1]===1?e[2]:0);break;case"voiceOff":i.voiceOff(e[0]);break;case"se":i.eventSe(e[0],e[3],e[4]===0?this.bonePos(e[1],e[2],0):void 0);break;case"seOff":i.eventSeOff(e[0]);break;case"bgSe":i.bgSe(e[0],e[1],e[2]);break;case"bgSeOff":i.bgSeOff(e[0],e[1]*.3);break;case"objSe":i.objSe(e[0],new A(e[1],e[2],e[3]),e[4]);break;case"objSeOff":i.objSeOff(e[0]);break;case"foot":{if(!n||e[0]!==0)break;const s=this.bonePos(n.kind,n.idx,e[3]);i.foot(this.floorSound(s),e[2]===1,s,Math.min(2,e[1]));break}case"easy":{const[s,a,o,c,,,l,h,u,d,p,g,_]=e,m=[o,c,l],f=this.bonePos(u,d,p);s===7?i.eventSe(a,_,void 0,m):s===1?i.foot(h,g===1,c!==-1?void 0:f,Math.min(2,a),m):s===2?i.action(_,f):s===6&&i.bgSe(a,_);break}}}playerHp(){return this.player.hp}log(t){this.debug&&console.log(t)}async goDoor(t){const e=`rm_${t.stg}${Oe(t.room,2)}${this.vm.rcase}`;this.busy=!0;try{if(!Rv.has(e)){this.vm.sp=4294967295,this.vm.cb&=-2,await this.escaped(e);return}this.audio.se("door"),await this.enterRoom(e,t.pos,void 0,!0,1400),this.audio.se("doorClose")}finally{this.busy=!1}}async saveScreen(){this.busy=!0;try{if(!this.inv.take(31))return;this.audio.se("typewriter"),this.save(),await this.msg.raw([dn.saved()])}finally{this.busy=!1}}save(){const t=this.player.pos,e={hp:this.player.hp,room:this.roomId,pos:this.vm.pos_no,x:t.x,y:t.y,z:t.z,h:this.player.heading,inv:this.inv.slots,eq:this.invScreen.equipped,std:this.invScreen.standard,evt:{f:this.vm.f,rcase:this.vm.rcase},t:this.playTime};localStorage.setItem("cvx.save",JSON.stringify(e))}async toggleInv(t){t?(this.invOpen=!0,await this.invScreen.show(!0)):this.invScreen.open?(await this.invScreen.show(!1),this.invOpen=!1):this.invOpen=!1}toggleCamera(){this.cam.mode=this.cam.mode==="fixed"?"behind":"fixed",localStorage.setItem("cvx.cam",this.cam.mode),this.cam.mode==="behind"?this.cam.resetYaw(this.player.heading):this.input.releaseLock(),this.ui.toast(this.cam.mode==="fixed"?dn.camFixed():dn.camBehind()),this.cam.update(this.player.pos,this.player.headPos(),this.player.heading,!0)}onSlash(t){var e;this.audio.se("knife");for(const n of this.npcs)n.hittable&&n.root.position.distanceTo(t.clone().setY(n.root.position.y))<.6&&((e=n.hit)==null||e.call(n))}onFire(t,e,n){const i=this.inv.slots.find(c=>(c==null?void 0:c.id)===ii);if(!i||i.count<=0)return!1;i.count--,this.audio.se("shot");const s=new Ut(e.x,e.z).normalize();let a=null,o=12;for(const c of[...this.zombies,...this.dogs]){if(!c.hittable)continue;const l=new Ut(c.root.position.x-t.x,c.root.position.z-t.z),h=l.length();h>o||h<.05||l.dot(s)/h<(n===0?.94:.8)||(a=c,o=h)}return a&&this.hitZombie(a,Lv),!0}hitZombie(t,e){t.hit(e),t.alive||(this.vm.work(1,t.index).dead=!0)}startGrab(t){const e=this.player,n=e.root.position,i=t.root.position,s=new A(i.x-n.x,0,i.z-n.z),a=e.forward().dot(s)>=0;t.heading=Math.atan2(-(n.x-i.x),-(n.z-i.z)),t.root.rotation.y=t.heading;const o=t.forward(),c=i.clone().addScaledVector(o,.42);c.y=n.y,e.place(c.x,c.y,c.z,a?t.heading+Math.PI:t.heading),e.playSync(a?"z00":"z01"),this.grab={z:t,t:0,front:a,phase:"bite",hurt:!1,hurt2:!1}}startDogBite(t){const e=this.player,n=e.root.position,i=t.root.position,s=e.forward().dot(new A(i.x-n.x,0,i.z-n.z))>=0;e.heading=s?Math.atan2(-(i.x-n.x),-(i.z-n.z)):Math.atan2(-(n.x-i.x),-(n.z-i.z)),e.root.rotation.y=e.heading,this.player.hp-=12,this.audio.se("bite");const a=this.player.hp<=0;e.playSync(a?s?"d03":"d04":s?"d00":"d05"),t.set(a?"idle":"recoil"),this.dogBite={z:t,t:0,front:s,dead:a}}updateDogBite(t){const e=this.dogBite;e.t+=t,!e.dead&&e.t>=1?(this.player.playSync(null),this.dogBite=null):e.dead&&e.t>=2.6&&(this.dogBite=null,this.gameOver())}updateGrab(t){const e=this.grab;if(e.t+=t,e.phase==="bite"){const n=10+(Pv[e.z.mdlver]??0);!e.hurt&&e.t*30>=25&&(e.hurt=!0,this.player.hp-=n,this.audio.se("bite")),!e.hurt2&&e.t*30>=59.5&&(e.hurt2=!0,this.player.hp-=n,this.audio.se("bite")),e.t>=2&&(e.t=0,this.player.hp<=0?(e.phase="dead",this.player.playSync(e.front?"z10":"z11"),e.z.set("idle")):(e.phase="push",this.player.playSync(e.front?"z02":"z03"),e.z.set("release")))}else e.phase==="push"?e.t>=1.6&&(this.player.playSync(null),this.grab=null):e.phase==="dead"&&e.t>=2.6&&(this.grab=null,this.gameOver())}async gameOver(){this.overShown||(this.overShown=!0,this.busy=!0,await this.ui.fade(!0,1200),await this.msg.raw([ye==="ru"?"ВЫ ПОГИБЛИ":"YOU ARE DEAD"]),location.reload())}async escaped(t){await this.ui.fade(!0,600),await this.msg.raw(ye==="ru"?[`Дверь ведёт в ${t}.`,`Эта часть игры
пока не перенесена.`]:[`The door leads to ${t}.`,`This area is
not ported yet.`]),await this.ui.fade(!1,600)}sim(t,e=[]){for(const n of e)this.input.down.add(n),this.input.pressed.add(n);for(let n=0;n<t;n+=1/30)this.step(1/30),this.input.pressed.clear();for(const n of e)this.input.down.delete(n);this.render()}render(){const t=this.cam.cam,e=this.fx.of;t.position.x+=e[0]*.1,t.position.y+=e[1]*.1,t.position.z+=e[2]*.1,t.updateMatrixWorld(),this.fx.draw(t),this.fx.draw2D(),this.renderer.render(this.scene,t),t.position.x-=e[0]*.1,t.position.y-=e[1]*.1,t.position.z-=e[2]*.1,t.updateMatrixWorld()}step(t){var i;const e=this.input;this.playTime+=t,e.hit("F1","Backquote")&&(this.debug=!this.debug);const n=this.inCine;if(this.msg.active?(this.msg.update(t,e.action,e.hit("KeyA","ArrowLeft"),e.hit("KeyD","ArrowRight"),e.cancel),this.player.frozen=!0):this.invOpen?(this.player.frozen=!0,this.invScreen.update(t)||this.toggleInv(!1)):this.busy||this.dialog?this.player.frozen=!0:n?(this.player.frozen=!0,this.vm.cb&4&&e.hit("Escape","Enter","Space")&&(this.vm.cb|=268435456)):(this.player.frozen=!1,this.player.sync||(e.inventory?this.toggleInv(!0):e.camToggle?this.toggleCamera():e.action&&!this.player.aiming&&this.examine())),this.room){if(!this.invOpen&&!this.busy){for(this.evtAcc=Math.min(this.evtAcc+t,.25);this.evtAcc>=1/30&&!this.busy;)this.evtAcc-=1/30,this.evtFrame();this.cam.evSub=this.evtAcc*30}if(this.pendingDoor&&!this.busy){const a=this.pendingDoor;this.pendingDoor=null,this.goDoor(a)}const s=this.cam.mode==="behind";if(s&&!this.player.frozen){const a=.0024*(this.player.aiming?.6:1);this.cam.look(e.mdx*a+((e.camR?1:0)-(e.camL?1:0))*2.2*t,e.mdy*a)}if(this.cam.zoom+=((s&&this.player.aiming?1:0)-this.cam.zoom)*Math.min(1,t*10),this.player.update(t,e,this.room,s?this.cam.yaw:null),!this.msg.active&&!this.invOpen&&!this.inCine&&!(this.busy&&!this.grab)){this.grab&&this.updateGrab(t),this.dogBite&&this.updateDogBite(t);const a=!this.grab&&!this.dogBite&&!this.player.sync&&this.player.hp>0;for(const o of this.zombies){const c=this.vm.works.get("1:"+o.index);if(!(c!=null&&c.gone||c!=null&&c.hidden)){if(c!=null&&c.scripted){o.update(t);continue}o.state==="bite"&&((i=this.grab)==null?void 0:i.z)!==o&&o.set("walk"),o.tick(t,this.player.root.position,a,this.room)&&!this.grab&&a&&this.startGrab(o)}}for(const o of this.dogs){const c=this.vm.works.get("1:"+o.index);if(!(c!=null&&c.gone||c!=null&&c.hidden)){if(c!=null&&c.scripted){o.update(t);continue}o.tick(t,this.player.root.position,a&&!this.grab&&!this.dogBite,this.room)&&!this.grab&&!this.dogBite&&a&&this.startDogBite(o)}}}this.cam.update(this.player.pos,this.player.headPos(),this.player.heading,!1,t),this.updateLinks(),this.audio.update()}if(this.ui.hud.style.display=this.debug?"block":"none",this.debug&&this.room){const s=this.player.pos,a=this.vm,o=a.tasks.map((c,l)=>c.status?`${l}:e${c.script-2}`:"").filter(Boolean).join(" ");this.ui.hud.textContent=`${this.roomId} cam ${this.cam.mode==="behind"?"behind":this.cam.index+(this.cam.forced!==null?" (event "+this.cam.forced+")":this.cam.usingFallback?" (fallback)":"")}
pos ${s.x.toFixed(2)} ${s.y.toFixed(2)} ${s.z.toFixed(2)} h ${(this.player.heading*180/Math.PI).toFixed(0)}°
evt cb ${(a.cb>>>0).toString(16)} st ${(a.st>>>0).toString(16)} etc ${a.etc_idx} flr ${a.cb&512?a.flr_idx:"-"} tasks ${o}`}}}const zn=new vu;zn.fit(Vs);let Uo=null;function Uv(){const r=document.createElement("div");r.className="title";const t=localStorage.getItem("cvx.save"),e=()=>[{k:"new",t:ye==="ru"?"Новая игра":"New game"},...t?[{k:"load",t:ye==="ru"?"Продолжить":"Continue"}]:[],{k:"movie",t:ye==="ru"?"Вступительный ролик":"Opening movie"},{k:"lang",t:ye==="ru"?"Язык: русский":"Language: English"}];let n=0;const i=()=>{r.innerHTML=`<h1>RESIDENT EVIL<br>CODE: Veronica X</h1><h3>${ye==="ru"?"ТЮРЬМА · ОСТРОВ РОКФОРТ":"PRISON · ROCKFORT ISLAND"}</h3>
<div class="menu">${e().map((o,c)=>`<div data-i="${c}" class="${c===n?"sel":""}">${o.t}</div>`).join("")}</div>
<div class="help">${ye==="ru"?"W/S или ↑/↓ — вперёд/назад · A/D или ←/→ — поворот · Shift — бег · C — камера (фиксированная / от плеча: мышь или ←/→ — обзор, A/D — шаг вбок)<br>F / ПКМ — приготовить нож · E / Пробел / Enter / ЛКМ — действие, удар · Tab — предметы · Esc — отмена · F1 — отладка":"W/S or ↑/↓ — forward/back · A/D or ←/→ — turn · Shift — run · C — camera (fixed / over-the-shoulder: mouse or ←/→ look, A/D strafe)<br>F / RMB — ready knife · E / Space / Enter / LMB — action, attack · Tab — items · Esc — cancel · F1 — debug"}<br>
${ye==="ru"?"Фанатский порт на основе ресурсов PS3-версии. Не для распространения.":"Fan port built from the PS3 version assets. Not for distribution."}</div>`},s=async o=>{if(o==="lang"){gu(ye==="ru"?"en":"ru"),i();return}if(removeEventListener("keydown",a),r.remove(),o==="movie"&&await ou(zn.stage,"mv_000"),o==="movie"){zn.stage.appendChild(r),addEventListener("keydown",a),i();return}zn.fadeEl.style.transition="none",zn.fadeEl.style.opacity="1";const c=document.createElement("div");c.className="loading",c.textContent=ye==="ru"?"ЗАГРУЗКА…":"LOADING…",zn.stage.appendChild(c),Uo=new Nv(zn);const l=o==="load"&&t?JSON.parse(t):void 0;try{await Uo.start(l,()=>c.remove())}catch(h){c.textContent="Error: "+h.message,console.error(h);return}},a=o=>{const c=e().length;o.code==="ArrowDown"||o.code==="KeyS"?(n=(n+1)%c,i()):o.code==="ArrowUp"||o.code==="KeyW"?(n=(n+c-1)%c,i()):["Enter","Space","KeyE"].includes(o.code)&&(o.preventDefault(),s(e()[n].k))};r.addEventListener("click",o=>{var l;const c=(l=o.target.dataset)==null?void 0:l.i;c!==void 0&&(n=+c,s(e()[n].k))}),addEventListener("keydown",a),i(),zn.stage.appendChild(r)}Uv();addEventListener("resize",()=>{Uo||zn.fit(Vs)});
