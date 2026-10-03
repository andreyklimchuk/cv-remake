var Ch=Object.defineProperty;var Ih=(r,e,t)=>e in r?Ch(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var A=(r,e,t)=>Ih(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const xo={0:"Not usable",1:"Rocket Launcher",2:"Assault Rifle",3:"Sniper Rifle",4:"Shotgun",5:"Handgun",6:"Grenade Launcher",7:"Bow Gun",8:"Combat Knife",9:"Handgun",10:"Custom Handgun",11:"Linear Launcher",12:"Handgun Bullets",13:"Magnum Bullets",14:"Shotgun Shells",15:"Grenade Rounds",16:"Acid Rounds",17:"Flame Rounds",18:"Bow Gun Arrows",19:"M93R Part",20:"F. Aid Spray",21:"Green Herb",22:"Red Herb",23:"Blue Herb",24:"Mixed Herb",25:"Mixed Herb",26:"Mixed Herb",27:"Mixed Herb",28:"Mixed Herb",29:"Mixed Herb",30:"Magnum Bullets",31:"Ink Ribbon",32:"Magnum",33:"Gold Lugers",34:"Sub Machine Gun",35:"Bow Gun Powder",36:"Gun Powder Arrow",37:"BOW Gas Rounds",38:"M.Gun Bullets",39:"Gas Mask",40:"Rifle Bullets",41:"Duralumin Case",42:"A.Rifle Bullets",43:"Alexander's Pierce",44:"Alexander's Jewel",45:"Alfred's Ring",46:"Alfred's Jewel",47:"Prisoner's Diary",48:"Director's Memo",49:"Instructions",50:"Lockpick",51:"Glass Eye",52:"Piano Roll",53:"Steering Wheel",54:"Crane Key",55:"Lighter",56:"Eagle Plate",57:"Side Pack",58:"Map",59:"Hawk Emblem",60:"Queen Ant Object",61:"King Ant Object",62:"Biohazard Card",63:"Duralumin Case",64:"Detonator",65:"Control Lever",66:"Gold Dragonfly",67:"Silver Key",68:"Gold Key",69:"Army Proof",70:"Navy Proof",71:"Air Force Proof",72:"Key with Tag",73:"ID Card",74:"Map",75:"Airport Key",76:"Emblem Card",77:"Skeleton Picture",78:"Music Box Plate",79:"Dragonfly Object",80:"Album",81:"Halberd",82:"Extinguisher",83:"Briefcase",84:"Padlock Key",85:"TG{0d}01",86:"Sp. Alloy Emblem",87:"Valve Handle",88:"Octa Valve Handle",89:"Machine Room Key",90:"Mining Room Key",91:"Bar Code Sticker",92:"Sterile Room Key",93:"Door Knob",94:"Battery Pack",95:"Hemostatic",96:"Turn Table Key",97:"Chem.Storage Key",98:"Clement {5b}",99:"Clement {5c}",100:"Tank Object",101:"Sp. Alloy Emblem",102:"Alfred's Memo",103:"Rusted Sword",104:"Hemostatic",105:"Security Card",106:"Security File",107:"Alexia's Choker",108:"Alexia's Jewel",109:"Queen Ant Relief",110:"King Ant Relief",111:"Red Jewel",112:"Blue Jewel",113:"Socket",114:"Sq. Valve Handle",115:"Serum",116:"Earthenware Vase",117:"Paper Weight",118:"Silver Dragonfly",119:"Silver Dragonfly",120:"Wing Object",121:"Crystal",122:"Gold Dragonfly",123:"Gold Dragonfly",124:"Gold Dragonfly",125:"File",126:"Plant Pot",127:"Picture B",128:"Duralumin Case",129:"Duralumin Case",130:"Bow Gun Powder",131:"Enhanced Handgun",132:"Memo",133:"Board Clip",134:"Card",135:"Newspaper Clip",136:"Luger Replica",137:"Queen Ant Relief",138:"Family Picture",139:"File",140:"Remote Controller",141:"?",142:"M{0d}100P",143:"Calico Bullets",144:"Clement Mixture",145:"Playing Manual",146:"?",147:"?",148:"?",149:"Empty Extinguisher",150:"Square Socket",151:"?",152:"Crest Key S",153:"Crest Key G",154:"Uses{0f}Checks Items.",155:"",156:"",157:"Returns to thegame screen.",158:"Storage Key",159:"Playing Manual",160:"Facility Ent. Fax",161:"TG{0d}01 Product Des.",162:"Users' Manual",163:"Pass Number Memo",164:"Memo to New Master",165:"Security File",166:"Alloy Report",167:"Prisoner's Diary",168:"Anatomist's Note",169:"Secretary's Note",170:"D.I.J. Diary",171:"Newspaper Clip",172:"Message Card",173:"Hunk's Report",174:"Worker's Diary",175:"Alexander's Memo",176:"Butler's Letter",177:"Confession Letter",178:"Passage Memo",179:"Veronica Report",180:"Alfred's Diary",181:"Queen Ant Report",182:"Virus Report"},wr={153:`You can't take any
more items.\f<0>Use it now?
        {4:39}es  {4:2e}o`,154:`You can't take any
more items.`,157:`Take the
{3:ffff}?
        {4:39}es  {4:2e}o`,158:`You've taken the
{3:ffff}.`,161:`There's no need to
use it now.`},Qa={"There are hairs scattered here.":"Здесь разбросаны волосы.","A hemostatic capsule\nis on the floor.":`На полу лежит
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
взять предметов.`,"Use it now?":"Использовать сейчас?","There's no need to\nuse it now.":`Сейчас в этом
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
переключателем слева...`,"An outdoor shutter.":"Наружная ставня."},Ph={"Combat Knife":"Боевой нож",Map:"Карта",Extinguisher:"Огнетушитель","Eagle Plate":"Пластина с орлом","Handgun Bullets":"Патроны для пистолета","Green Herb":"Зелёная трава","Ink Ribbon":"Красящая лента","Board Clip":"Планшет с бумагами",Hemostatic:"Кровоостанавливающее",Lighter:"Зажигалка",Briefcase:"Кейс","Hawk Emblem":"Эмблема ястреба","Sp. Alloy Emblem":"Эмблема из спецсплава",Memo:"Записка",Lockpick:"Отмычка",Handgun:"Пистолет","F. Aid Spray":"Аптечка-спрей"};let dt=localStorage.getItem("cvx.lang")||"ru";function Lh(r){dt=r,localStorage.setItem("cvx.lang",r)}function Dh(r){return/\{4:39\}es/.test(r)}function ps(r,e){const t=[],i=r.replace(/\{3:([0-9a-f]+)\}/g,(o,a)=>{const c=a==="ffff"?e??0:parseInt(a,16);return t.push(xo[c]??""),""}).replace(/<0>|<1>/g,"").replace(/\n\s*\{4:39\}es\s+\{4:2e\}o/g,"").replace(/\{0d\}/g,"-").split("\f").map(o=>o.replace(/^\n+/,"").replace(/\{[0-9a-f]+:[0-9a-f]+\}/g,"").trimEnd()).filter(o=>o.trim().length);let s=0;return i.map(o=>{const a=o.replace(/\u0001/g,"{N}");return(dt==="en"?a:Qa[a]??Qa[a.trim()]??a).replace(/\{N\}/g,()=>ar(t[s++]??""))})}function ar(r){return dt==="ru"?Ph[r]??r:r}const hn=()=>dt==="ru",Zn={take:()=>hn()?"Взять":"Take",takeQ:r=>hn()?`Взять: ${r}?`:`Will you take the ${r}?`,yes:()=>hn()?"Да":"Yes",no:()=>hn()?"Нет":"No",got:r=>hn()?`Получено: ${r}.`:`Picked up the ${r}.`,full:()=>hn()?"Нет места в инвентаре.":"You cannot carry any more items.",saved:()=>hn()?"Игра сохранена.":"Game saved.",locked:()=>hn()?`Эта часть игры
пока не перенесена.`:`This area is
not ported yet.`,camFixed:()=>hn()?"Камера: фиксированная":"Camera: fixed",camBehind:()=>hn()?"Камера: от плеча (мышь — обзор)":"Camera: over the shoulder (mouse to look)"},Nh=`
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
`;class Uh{constructor(){A(this,"stage",document.createElement("div"));A(this,"msg",document.createElement("div"));A(this,"fadeEl",document.createElement("div"));A(this,"hud",document.createElement("div"));A(this,"inv",document.createElement("div"));A(this,"toastEl",document.createElement("div"));A(this,"toastT",0);const e=document.createElement("style");e.textContent=Nh,document.head.appendChild(e),this.stage.id="stage",document.getElementById("app").appendChild(this.stage),this.msg.className="msg",this.fadeEl.className="fade",this.hud.className="hud",this.inv.className="inv",this.toastEl.className="toast",this.stage.append(this.msg,this.inv,this.hud,this.toastEl,this.fadeEl)}fit(e){const t=innerWidth,n=innerHeight;let i=t,s=t/e;return s>n&&(s=n,i=n*e),this.stage.style.width=i+"px",this.stage.style.height=s+"px",{w:Math.round(i),h:Math.round(s)}}fade(e,t=450){return this.fadeEl.style.transition=`opacity ${t}ms`,this.fadeEl.style.opacity=e?"1":"0",new Promise(n=>setTimeout(n,t+20))}toast(e){this.toastEl.textContent=e,this.toastEl.style.opacity="1",clearTimeout(this.toastT),this.toastT=window.setTimeout(()=>this.toastEl.style.opacity="0",1600)}}class Fh{constructor(e){A(this,"queue",[]);A(this,"full","");A(this,"shown",0);A(this,"resolve");A(this,"choices",null);A(this,"sel",0);A(this,"active",!1);this.el=e}show(e,t){return this.queue=Array.isArray(e)?[...e]:ps(e),this.queue.length||(this.queue=[""]),this.choices=t??null,this.sel=0,this.active=!0,this.next(),this.el.style.display="block",new Promise(n=>this.resolve=n)}raw(e,t){return this.show(e,t)}next(){this.full=this.queue.shift()??"",this.shown=0,this.render()}render(){const e=this.shown>=this.full.length;let t=vo(this.full.slice(0,Math.floor(this.shown)));e&&this.queue.length===0&&this.choices&&(t+=`<div class="choice">${this.choices.map((n,i)=>`<span class="${i===this.sel?"sel":""}">${vo(n)}</span>`).join("")}</div>`),e&&(this.queue.length||!this.choices)&&(t+='<span class="more">▼</span>'),this.el.innerHTML=t}update(e,t,n,i,s){if(this.active){if(this.shown<this.full.length){this.shown=Math.min(this.full.length,this.shown+e*60),t&&(this.shown=this.full.length),this.render();return}if(this.queue.length===0&&this.choices)return(n||i)&&(this.sel=(this.sel+(i?1:this.choices.length-1))%this.choices.length,this.render()),t?this.close(this.sel):s?this.close(this.choices.length-1):void 0;(t||s)&&(this.queue.length?this.next():this.close(0))}}close(e){this.active=!1,this.el.style.display="none";const t=this.resolve;this.resolve=void 0,t==null||t(e)}}function vo(r){return r.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e])}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ma="170",Oh=0,ec=1,kh=2,Dl=1,Bh=2,bn=3,In=0,Ut=1,tn=2,qn=0,Ui=1,mr=2,tc=3,nc=4,zh=5,li=100,Hh=101,Vh=102,Gh=103,Wh=104,Xh=200,qh=201,Yh=202,jh=203,yo=204,Mo=205,Kh=206,$h=207,Zh=208,Jh=209,Qh=210,eu=211,tu=212,nu=213,iu=214,So=0,bo=1,Eo=2,zi=3,To=4,Ao=5,wo=6,Ro=7,ga=0,su=1,ru=2,Yn=0,ou=1,au=2,cu=3,lu=4,hu=5,uu=6,du=7,ic="attached",fu="detached",Nl=300,Hi=301,Vi=302,Co=303,Io=304,Mr=306,Gi=1e3,Wn=1001,gr=1002,Ct=1003,Ul=1004,ms=1005,Vt=1006,cr=1007,wn=1008,Pn=1009,Fl=1010,Ol=1011,Ms=1012,_a=1013,di=1014,rn=1015,As=1016,xa=1017,va=1018,Wi=1020,kl=35902,Bl=1021,zl=1022,Yt=1023,Hl=1024,Vl=1025,Fi=1026,Xi=1027,ya=1028,Ma=1029,Gl=1030,Sa=1031,ba=1033,lr=33776,hr=33777,ur=33778,dr=33779,Po=35840,Lo=35841,Do=35842,No=35843,Uo=36196,Fo=37492,Oo=37496,ko=37808,Bo=37809,zo=37810,Ho=37811,Vo=37812,Go=37813,Wo=37814,Xo=37815,qo=37816,Yo=37817,jo=37818,Ko=37819,$o=37820,Zo=37821,fr=36492,Jo=36494,Qo=36495,Wl=36283,ea=36284,ta=36285,na=36286,Ea=2200,Ta=2201,pu=2202,Ss=2300,bs=2301,Rr=2302,Li=2400,Di=2401,_r=2402,Aa=2500,mu=2501,gu=0,Xl=1,ia=2,_u=3200,xu=3201,wa=0,vu=1,Gn="",ft="srgb",Pt="srgb-linear",Sr="linear",nt="srgb",gi=7680,sc=519,yu=512,Mu=513,Su=514,ql=515,bu=516,Eu=517,Tu=518,Au=519,sa=35044,rc="300 es",Rn=2e3,xr=2001;class pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let oc=1234567;const xs=Math.PI/180,qi=180/Math.PI;function an(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Mt[r&255]+Mt[r>>8&255]+Mt[r>>16&255]+Mt[r>>24&255]+"-"+Mt[e&255]+Mt[e>>8&255]+"-"+Mt[e>>16&15|64]+Mt[e>>24&255]+"-"+Mt[t&63|128]+Mt[t>>8&255]+"-"+Mt[t>>16&255]+Mt[t>>24&255]+Mt[n&255]+Mt[n>>8&255]+Mt[n>>16&255]+Mt[n>>24&255]).toLowerCase()}function bt(r,e,t){return Math.max(e,Math.min(t,r))}function Ra(r,e){return(r%e+e)%e}function wu(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Ru(r,e,t){return r!==e?(t-r)/(e-r):0}function vs(r,e,t){return(1-t)*r+t*e}function Cu(r,e,t,n){return vs(r,e,1-Math.exp(-t*n))}function Iu(r,e=1){return e-Math.abs(Ra(r,e*2)-e)}function Pu(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Lu(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Du(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Nu(r,e){return r+Math.random()*(e-r)}function Uu(r){return r*(.5-Math.random())}function Fu(r){r!==void 0&&(oc=r);let e=oc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ou(r){return r*xs}function ku(r){return r*qi}function Bu(r){return(r&r-1)===0&&r!==0}function zu(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Hu(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Vu(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),c=o(t/2),l=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),p=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*h,c*u,c*d,a*l);break;case"YZY":r.set(c*d,a*h,c*u,a*l);break;case"ZXZ":r.set(c*u,c*d,a*h,a*l);break;case"XZX":r.set(a*h,c*g,c*p,a*l);break;case"YXY":r.set(c*p,a*h,c*g,a*l);break;case"ZYZ":r.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function nn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function tt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Ht={DEG2RAD:xs,RAD2DEG:qi,generateUUID:an,clamp:bt,euclideanModulo:Ra,mapLinear:wu,inverseLerp:Ru,lerp:vs,damp:Cu,pingpong:Iu,smoothstep:Pu,smootherstep:Lu,randInt:Du,randFloat:Nu,randFloatSpread:Uu,seededRandom:Fu,degToRad:Ou,radToDeg:ku,isPowerOfTwo:Bu,ceilPowerOfTwo:zu,floorPowerOfTwo:Hu,setQuaternionFromProperEuler:Vu,normalize:tt,denormalize:nn};class Pe{constructor(e=0,t=0){Pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class De{constructor(e,t,n,i,s,o,a,c,l){De.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l)}set(e,t,n,i,s,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=i[0],m=i[3],f=i[6],S=i[1],E=i[4],x=i[7],D=i[2],R=i[5],C=i[8];return s[0]=o*_+a*S+c*D,s[3]=o*m+a*E+c*R,s[6]=o*f+a*x+c*C,s[1]=l*_+h*S+u*D,s[4]=l*m+h*E+u*R,s[7]=l*f+h*x+u*C,s[2]=d*_+p*S+g*D,s[5]=d*m+p*E+g*R,s[8]=d*f+p*x+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*s,p=l*s-o*c,g=t*u+n*d+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*s-a*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Cr.makeScale(e,t)),this}rotate(e){return this.premultiply(Cr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Cr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Cr=new De;function Yl(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Es(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Gu(){const r=Es("canvas");return r.style.display="block",r}const ac={};function gs(r){r in ac||(ac[r]=!0,console.warn(r))}function Wu(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Xu(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function qu(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ge={enabled:!0,workingColorSpace:Pt,spaces:{},convert:function(r,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===nt&&(r.r=Cn(r.r),r.g=Cn(r.g),r.b=Cn(r.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(r.applyMatrix3(this.spaces[e].toXYZ),r.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===nt&&(r.r=Oi(r.r),r.g=Oi(r.g),r.b=Oi(r.b))),r},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Gn?Sr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,e=this.workingColorSpace){return r.fromArray(this.spaces[e].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,e,t){return r.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Cn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Oi(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const cc=[.64,.33,.3,.6,.15,.06],lc=[.2126,.7152,.0722],hc=[.3127,.329],uc=new De().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dc=new De().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ge.define({[Pt]:{primaries:cc,whitePoint:hc,transfer:Sr,toXYZ:uc,fromXYZ:dc,luminanceCoefficients:lc,workingColorSpaceConfig:{unpackColorSpace:ft},outputColorSpaceConfig:{drawingBufferColorSpace:ft}},[ft]:{primaries:cc,whitePoint:hc,transfer:nt,toXYZ:uc,fromXYZ:dc,luminanceCoefficients:lc,outputColorSpaceConfig:{drawingBufferColorSpace:ft}}});let _i;class Yu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{_i===void 0&&(_i=Es("canvas")),_i.width=e.width,_i.height=e.height;const n=_i.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=_i}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Cn(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Cn(t[n]/255)*255):t[n]=Cn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ju=0;class jl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=an(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Ir(i[o].image)):s.push(Ir(i[o]))}else s=Ir(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ir(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Yu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ku=0;class xt extends pi{constructor(e=xt.DEFAULT_IMAGE,t=xt.DEFAULT_MAPPING,n=Wn,i=Wn,s=Vt,o=wn,a=Yt,c=Pn,l=xt.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ku++}),this.uuid=an(),this.name="",this.source=new jl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Nl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gi:e.x=e.x-Math.floor(e.x);break;case Wn:e.x=e.x<0?0:1;break;case gr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gi:e.y=e.y-Math.floor(e.y);break;case Wn:e.y=e.y<0?0:1;break;case gr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}xt.DEFAULT_IMAGE=null;xt.DEFAULT_MAPPING=Nl;xt.DEFAULT_ANISOTROPY=1;class Ke{constructor(e=0,t=0,n=0,i=1){Ke.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(l+1)/2,x=(p+1)/2,D=(f+1)/2,R=(h+d)/4,C=(u+_)/4,P=(g+m)/4;return E>x&&E>D?E<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(E),i=R/n,s=C/n):x>D?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=R/i,s=P/i):D<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(D),n=C/s,i=P/s),this.set(n,i,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(d-h)/S,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $u extends pi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ke(0,0,e,t),this.scissorTest=!1,this.viewport=new Ke(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new xt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new jl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fi extends $u{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Kl extends xt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zu extends xt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _t{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],p=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==p||h!==g){let m=1-a;const f=c*d+l*p+h*g+u*_,S=f>=0?1:-1,E=1-f*f;if(E>Number.EPSILON){const D=Math.sqrt(E),R=Math.atan2(D,f*S);m=Math.sin(m*R)/D,a=Math.sin(a*R)/D}const x=a*S;if(c=c*m+d*x,l=l*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-a){const D=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=D,l*=D,h*=D,u*=D}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[o],d=s[o+1],p=s[o+2],g=s[o+3];return e[t]=a*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-a*p,e[t+2]=l*g+h*p+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),p=c(i/2),g=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(o-i)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(i+o)/p,this._z=(s+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(s-l)/p,this._x=(i+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-i)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,n=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-s*i),u=2*(s*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Pr.copy(this).projectOnVector(e),this.sub(Pr)}reflect(e){return this.sub(Pr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pr=new w,fc=new _t;class Ft{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Jt):Jt.fromBufferAttribute(s,o),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ds.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ds.copy(n.boundingBox)),Ds.applyMatrix4(e.matrixWorld),this.union(Ds)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(is),Ns.subVectors(this.max,is),xi.subVectors(e.a,is),vi.subVectors(e.b,is),yi.subVectors(e.c,is),Nn.subVectors(vi,xi),Un.subVectors(yi,vi),Jn.subVectors(xi,yi);let t=[0,-Nn.z,Nn.y,0,-Un.z,Un.y,0,-Jn.z,Jn.y,Nn.z,0,-Nn.x,Un.z,0,-Un.x,Jn.z,0,-Jn.x,-Nn.y,Nn.x,0,-Un.y,Un.x,0,-Jn.y,Jn.x,0];return!Lr(t,xi,vi,yi,Ns)||(t=[1,0,0,0,1,0,0,0,1],!Lr(t,xi,vi,yi,Ns))?!1:(Us.crossVectors(Nn,Un),t=[Us.x,Us.y,Us.z],Lr(t,xi,vi,yi,Ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _n=[new w,new w,new w,new w,new w,new w,new w,new w],Jt=new w,Ds=new Ft,xi=new w,vi=new w,yi=new w,Nn=new w,Un=new w,Jn=new w,is=new w,Ns=new w,Us=new w,Qn=new w;function Lr(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Qn.fromArray(r,s);const a=i.x*Math.abs(Qn.x)+i.y*Math.abs(Qn.y)+i.z*Math.abs(Qn.z),c=e.dot(Qn),l=t.dot(Qn),h=n.dot(Qn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Ju=new Ft,ss=new w,Dr=new w;class dn{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ju.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ss.subVectors(e,this.center);const t=ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ss,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ss.copy(e.center).add(Dr)),this.expandByPoint(ss.copy(e.center).sub(Dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xn=new w,Nr=new w,Fs=new w,Fn=new w,Ur=new w,Os=new w,Fr=new w;class ws{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xn.copy(this.origin).addScaledVector(this.direction,t),xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Nr.copy(e).add(t).multiplyScalar(.5),Fs.copy(t).sub(e).normalize(),Fn.copy(this.origin).sub(Nr);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Fs),a=Fn.dot(this.direction),c=-Fn.dot(Fs),l=Fn.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),p=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Nr).addScaledVector(Fs,d),p}intersectSphere(e,t){xn.subVectors(e.center,this.origin);const n=xn.dot(this.direction),i=xn.dot(xn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,xn)!==null}intersectTriangle(e,t,n,i,s){Ur.subVectors(t,e),Os.subVectors(n,e),Fr.crossVectors(Ur,Os);let o=this.direction.dot(Fr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Fn.subVectors(this.origin,e);const c=a*this.direction.dot(Os.crossVectors(Fn,Os));if(c<0)return null;const l=a*this.direction.dot(Ur.cross(Fn));if(l<0||c+l>o)return null;const h=-a*Fn.dot(Fr);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ae{constructor(e,t,n,i,s,o,a,c,l,h,u,d,p,g,_,m){Ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,c,l,h,u,d,p,g,_,m)}set(e,t,n,i,s,o,a,c,l,h,u,d,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=s,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ae().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Mi.setFromMatrixColumn(e,0).length(),s=1/Mi.setFromMatrixColumn(e,1).length(),o=1/Mi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qu,e,ed)}lookAt(e,t,n){const i=this.elements;return kt.subVectors(e,t),kt.lengthSq()===0&&(kt.z=1),kt.normalize(),On.crossVectors(n,kt),On.lengthSq()===0&&(Math.abs(n.z)===1?kt.x+=1e-4:kt.z+=1e-4,kt.normalize(),On.crossVectors(n,kt)),On.normalize(),ks.crossVectors(kt,On),i[0]=On.x,i[4]=ks.x,i[8]=kt.x,i[1]=On.y,i[5]=ks.y,i[9]=kt.y,i[2]=On.z,i[6]=ks.z,i[10]=kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],S=n[3],E=n[7],x=n[11],D=n[15],R=i[0],C=i[4],P=i[8],b=i[12],M=i[1],I=i[5],V=i[9],B=i[13],q=i[2],K=i[6],X=i[10],J=i[14],G=i[3],se=i[7],ue=i[11],Me=i[15];return s[0]=o*R+a*M+c*q+l*G,s[4]=o*C+a*I+c*K+l*se,s[8]=o*P+a*V+c*X+l*ue,s[12]=o*b+a*B+c*J+l*Me,s[1]=h*R+u*M+d*q+p*G,s[5]=h*C+u*I+d*K+p*se,s[9]=h*P+u*V+d*X+p*ue,s[13]=h*b+u*B+d*J+p*Me,s[2]=g*R+_*M+m*q+f*G,s[6]=g*C+_*I+m*K+f*se,s[10]=g*P+_*V+m*X+f*ue,s[14]=g*b+_*B+m*J+f*Me,s[3]=S*R+E*M+x*q+D*G,s[7]=S*C+E*I+x*K+D*se,s[11]=S*P+E*V+x*X+D*ue,s[15]=S*b+E*B+x*J+D*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+s*c*u-i*l*u-s*a*d+n*l*d+i*a*p-n*c*p)+_*(+t*c*p-t*l*d+s*o*d-i*o*p+i*l*h-s*c*h)+m*(+t*l*u-t*a*p-s*o*u+n*o*p+s*a*h-n*l*h)+f*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],S=u*m*l-_*d*l+_*c*p-a*m*p-u*c*f+a*d*f,E=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,x=h*_*l-g*u*l+g*a*p-o*_*p-h*a*f+o*u*f,D=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,R=t*S+n*E+i*x+s*D;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/R;return e[0]=S*C,e[1]=(_*d*s-u*m*s-_*i*p+n*m*p+u*i*f-n*d*f)*C,e[2]=(a*m*s-_*c*s+_*i*l-n*m*l-a*i*f+n*c*f)*C,e[3]=(u*c*s-a*d*s-u*i*l+n*d*l+a*i*p-n*c*p)*C,e[4]=E*C,e[5]=(h*m*s-g*d*s+g*i*p-t*m*p-h*i*f+t*d*f)*C,e[6]=(g*c*s-o*m*s-g*i*l+t*m*l+o*i*f-t*c*f)*C,e[7]=(o*d*s-h*c*s+h*i*l-t*d*l-o*i*p+t*c*p)*C,e[8]=x*C,e[9]=(g*u*s-h*_*s-g*n*p+t*_*p+h*n*f-t*u*f)*C,e[10]=(o*_*s-g*a*s+g*n*l-t*_*l-o*n*f+t*a*f)*C,e[11]=(h*a*s-o*u*s-h*n*l+t*u*l+o*n*p-t*a*p)*C,e[12]=D*C,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*C,e[14]=(g*a*i-o*_*i-g*n*c+t*_*c+o*n*m-t*a*m)*C,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*C,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,u=a+a,d=s*l,p=s*h,g=s*u,_=o*h,m=o*u,f=a*u,S=c*l,E=c*h,x=c*u,D=n.x,R=n.y,C=n.z;return i[0]=(1-(_+f))*D,i[1]=(p+x)*D,i[2]=(g-E)*D,i[3]=0,i[4]=(p-x)*R,i[5]=(1-(d+f))*R,i[6]=(m+S)*R,i[7]=0,i[8]=(g+E)*C,i[9]=(m-S)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Mi.set(i[0],i[1],i[2]).length();const o=Mi.set(i[4],i[5],i[6]).length(),a=Mi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Qt.copy(this);const l=1/s,h=1/o,u=1/a;return Qt.elements[0]*=l,Qt.elements[1]*=l,Qt.elements[2]*=l,Qt.elements[4]*=h,Qt.elements[5]*=h,Qt.elements[6]*=h,Qt.elements[8]*=u,Qt.elements[9]*=u,Qt.elements[10]*=u,t.setFromRotationMatrix(Qt),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Rn){const c=this.elements,l=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let p,g;if(a===Rn)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===xr)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Rn){const c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-s),d=(t+e)*l,p=(n+i)*h;let g,_;if(a===Rn)g=(o+s)*u,_=-2*u;else if(a===xr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Mi=new w,Qt=new Ae,Qu=new w(0,0,0),ed=new w(1,1,1),On=new w,ks=new w,kt=new w,pc=new Ae,mc=new _t;class Kt{constructor(e=0,t=0,n=0,i=Kt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(bt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-bt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return pc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return mc.setFromEuler(this),this.setFromQuaternion(mc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kt.DEFAULT_ORDER="XYZ";class Ca{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let td=0;const gc=new w,Si=new _t,vn=new Ae,Bs=new w,rs=new w,nd=new w,id=new _t,_c=new w(1,0,0),xc=new w(0,1,0),vc=new w(0,0,1),yc={type:"added"},sd={type:"removed"},bi={type:"childadded",child:null},Or={type:"childremoved",child:null};class lt extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=an(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=lt.DEFAULT_UP.clone();const e=new w,t=new Kt,n=new _t,i=new w(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ae},normalMatrix:{value:new De}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.multiply(Si),this}rotateOnWorldAxis(e,t){return Si.setFromAxisAngle(e,t),this.quaternion.premultiply(Si),this}rotateX(e){return this.rotateOnAxis(_c,e)}rotateY(e){return this.rotateOnAxis(xc,e)}rotateZ(e){return this.rotateOnAxis(vc,e)}translateOnAxis(e,t){return gc.copy(e).applyQuaternion(this.quaternion),this.position.add(gc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_c,e)}translateY(e){return this.translateOnAxis(xc,e)}translateZ(e){return this.translateOnAxis(vc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Bs.copy(e):Bs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(rs,Bs,this.up):vn.lookAt(Bs,rs,this.up),this.quaternion.setFromRotationMatrix(vn),i&&(vn.extractRotation(i.matrixWorld),Si.setFromRotationMatrix(vn),this.quaternion.premultiply(Si.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yc),bi.child=e,this.dispatchEvent(bi),bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sd),Or.child=e,this.dispatchEvent(Or),Or.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yc),bi.child=e,this.dispatchEvent(bi),bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,e,nd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rs,id,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}lt.DEFAULT_UP=new w(0,1,0);lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new w,yn=new w,kr=new w,Mn=new w,Ei=new w,Ti=new w,Mc=new w,Br=new w,zr=new w,Hr=new w,Vr=new Ke,Gr=new Ke,Wr=new Ke;class sn{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),en.subVectors(e,t),i.cross(en);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){en.subVectors(i,t),yn.subVectors(n,t),kr.subVectors(e,t);const o=en.dot(en),a=en.dot(yn),c=en.dot(kr),l=yn.dot(yn),h=yn.dot(kr),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(e,t,n,i,s,o,a,c){return this.getBarycoord(e,t,n,i,Mn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Mn.x),c.addScaledVector(o,Mn.y),c.addScaledVector(a,Mn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,o){return Vr.setScalar(0),Gr.setScalar(0),Wr.setScalar(0),Vr.fromBufferAttribute(e,t),Gr.fromBufferAttribute(e,n),Wr.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Vr,s.x),o.addScaledVector(Gr,s.y),o.addScaledVector(Wr,s.z),o}static isFrontFacing(e,t,n,i){return en.subVectors(n,t),yn.subVectors(e,t),en.cross(yn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return en.subVectors(this.c,this.b),yn.subVectors(this.a,this.b),en.cross(yn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return sn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Ei.subVectors(i,n),Ti.subVectors(s,n),Br.subVectors(e,n);const c=Ei.dot(Br),l=Ti.dot(Br);if(c<=0&&l<=0)return t.copy(n);zr.subVectors(e,i);const h=Ei.dot(zr),u=Ti.dot(zr);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ei,o);Hr.subVectors(e,s);const p=Ei.dot(Hr),g=Ti.dot(Hr);if(g>=0&&p<=g)return t.copy(s);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Ti,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Mc.subVectors(s,i),a=(u-h)/(u-h+(p-g)),t.copy(i).addScaledVector(Mc,a);const f=1/(m+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(Ei,o).addScaledVector(Ti,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $l={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},zs={h:0,s:0,l:0};function Xr(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class we{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ge.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ge.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ge.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ge.workingColorSpace){if(e=Ra(e,1),t=bt(t,0,1),n=bt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Xr(o,s,e+1/3),this.g=Xr(o,s,e),this.b=Xr(o,s,e-1/3)}return Ge.toWorkingColorSpace(this,i),this}setStyle(e,t=ft){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ft){const n=$l[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=Oi(e.r),this.g=Oi(e.g),this.b=Oi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ft){return Ge.fromWorkingColorSpace(St.copy(this),e),Math.round(bt(St.r*255,0,255))*65536+Math.round(bt(St.g*255,0,255))*256+Math.round(bt(St.b*255,0,255))}getHexString(e=ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ge.workingColorSpace){Ge.fromWorkingColorSpace(St.copy(this),t);const n=St.r,i=St.g,s=St.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ge.workingColorSpace){return Ge.fromWorkingColorSpace(St.copy(this),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=ft){Ge.fromWorkingColorSpace(St.copy(this),e);const t=St.r,n=St.g,i=St.b;return e!==ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(kn),this.setHSL(kn.h+e,kn.s+t,kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(zs);const n=vs(kn.h,zs.h,t),i=vs(kn.s,zs.s,t),s=vs(kn.l,zs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const St=new we;we.NAMES=$l;let rd=0;class cn extends pi{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=an(),this.name="",this.blending=Ui,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yo,this.blendDst=Mo,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==In&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yo&&(n.blendSrc=this.blendSrc),this.blendDst!==Mo&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class on extends cn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new w,Hs=new Pe;class It{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=sa,this.updateRanges=[],this.gpuType=rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hs.fromBufferAttribute(this,t),Hs.applyMatrix3(e),this.setXY(t,Hs.x,Hs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nn(t,this.array)),t}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nn(t,this.array)),t}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nn(t,this.array)),t}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sa&&(e.usage=this.usage),e}}class Zl extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Jl extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Tt extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}}let od=0;const Xt=new Ae,qr=new lt,Ai=new w,Bt=new Ft,os=new Ft,gt=new w;class Gt extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=an(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yl(e)?Jl:Zl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new De().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,n){return Xt.makeTranslation(e,t,n),this.applyMatrix4(Xt),this}scale(e,t,n){return Xt.makeScale(e,t,n),this.applyMatrix4(Xt),this}lookAt(e){return qr.lookAt(e),qr.updateMatrix(),this.applyMatrix4(qr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Tt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ft);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Bt.setFromBufferAttribute(s),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new dn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const n=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];os.setFromBufferAttribute(a),this.morphTargetsRelative?(gt.addVectors(Bt.min,os.min),Bt.expandByPoint(gt),gt.addVectors(Bt.max,os.max),Bt.expandByPoint(gt)):(Bt.expandByPoint(os.min),Bt.expandByPoint(os.max))}Bt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)gt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(gt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)gt.fromBufferAttribute(a,l),c&&(Ai.fromBufferAttribute(e,l),gt.add(Ai)),i=Math.max(i,n.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new w,c[P]=new w;const l=new w,h=new w,u=new w,d=new Pe,p=new Pe,g=new Pe,_=new w,m=new w;function f(P,b,M){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,P),p.fromBufferAttribute(s,b),g.fromBufferAttribute(s,M),h.sub(l),u.sub(l),p.sub(d),g.sub(d);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(I),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(I),a[P].add(_),a[b].add(_),a[M].add(_),c[P].add(m),c[b].add(m),c[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let P=0,b=S.length;P<b;++P){const M=S[P],I=M.start,V=M.count;for(let B=I,q=I+V;B<q;B+=3)f(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const E=new w,x=new w,D=new w,R=new w;function C(P){D.fromBufferAttribute(i,P),R.copy(D);const b=a[P];E.copy(b),E.sub(D.multiplyScalar(D.dot(b))).normalize(),x.crossVectors(R,b);const I=x.dot(c[P])<0?-1:1;o.setXYZW(P,E.x,E.y,E.z,I)}for(let P=0,b=S.length;P<b;++P){const M=S[P],I=M.start,V=M.count;for(let B=I,q=I+V;B<q;B+=3)C(e.getX(B+0)),C(e.getX(B+1)),C(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const i=new w,s=new w,o=new w,a=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new It(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gt,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=e(c,n);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sc=new Ae,ei=new ws,Vs=new dn,bc=new w,Gs=new w,Ws=new w,Xs=new w,Yr=new w,qs=new w,Ec=new w,Ys=new w;class Et extends lt{constructor(e=new Gt,t=new on){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){qs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(Yr.fromBufferAttribute(u,e),o?qs.addScaledVector(Yr,h):qs.addScaledVector(Yr.sub(t),h))}t.add(qs)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(s),ei.copy(e.ray).recast(e.near),!(Vs.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Vs,bc)===null||ei.origin.distanceToSquared(bc)>(e.far-e.near)**2))&&(Sc.copy(s).invert(),ei.copy(e.ray).applyMatrix4(Sc),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ei)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),E=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=S,D=E;x<D;x+=3){const R=a.getX(x),C=a.getX(x+1),P=a.getX(x+2);i=js(this,f,e,n,l,h,u,R,C,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=a.getX(m),E=a.getX(m+1),x=a.getX(m+2);i=js(this,o,e,n,l,h,u,S,E,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],S=Math.max(m.start,p.start),E=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let x=S,D=E;x<D;x+=3){const R=x,C=x+1,P=x+2;i=js(this,f,e,n,l,h,u,R,C,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const S=m,E=m+1,x=m+2;i=js(this,o,e,n,l,h,u,S,E,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function ad(r,e,t,n,i,s,o,a){let c;if(e.side===Ut?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,e.side===In,a),c===null)return null;Ys.copy(a),Ys.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(Ys);return l<t.near||l>t.far?null:{distance:l,point:Ys.clone(),object:r}}function js(r,e,t,n,i,s,o,a,c,l){r.getVertexPosition(a,Gs),r.getVertexPosition(c,Ws),r.getVertexPosition(l,Xs);const h=ad(r,e,t,n,Gs,Ws,Xs,Ec);if(h){const u=new w;sn.getBarycoord(Ec,Gs,Ws,Xs,u),i&&(h.uv=sn.getInterpolatedAttribute(i,a,c,l,u,new Pe)),s&&(h.uv1=sn.getInterpolatedAttribute(s,a,c,l,u,new Pe)),o&&(h.normal=sn.getInterpolatedAttribute(o,a,c,l,u,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new w,materialIndex:0};sn.getNormal(Gs,Ws,Xs,d.normal),h.face=d,h.barycoord=u}return h}class Rs extends Gt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(h,3)),this.setAttribute("uv",new Tt(u,2));function g(_,m,f,S,E,x,D,R,C,P,b){const M=x/C,I=D/P,V=x/2,B=D/2,q=R/2,K=C+1,X=P+1;let J=0,G=0;const se=new w;for(let ue=0;ue<X;ue++){const Me=ue*I-B;for(let Fe=0;Fe<K;Fe++){const $e=Fe*M-V;se[_]=$e*S,se[m]=Me*E,se[f]=q,l.push(se.x,se.y,se.z),se[_]=0,se[m]=0,se[f]=R>0?1:-1,h.push(se.x,se.y,se.z),u.push(Fe/C),u.push(1-ue/P),J+=1}}for(let ue=0;ue<P;ue++)for(let Me=0;Me<C;Me++){const Fe=d+Me+K*ue,$e=d+Me+K*(ue+1),Y=d+(Me+1)+K*(ue+1),ee=d+(Me+1)+K*ue;c.push(Fe,$e,ee),c.push($e,Y,ee),G+=6}a.addGroup(p,G,b),p+=G,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Yi(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Rt(r){const e={};for(let t=0;t<r.length;t++){const n=Yi(r[t]);for(const i in n)e[i]=n[i]}return e}function cd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Ql(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ge.workingColorSpace}const ld={clone:Yi,merge:Rt};var hd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ud=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Kn extends cn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hd,this.fragmentShader=ud,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Yi(e.uniforms),this.uniformsGroups=cd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class eh extends lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=Rn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new w,Tc=new Pe,Ac=new Pe;class vt extends eh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=qi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qi*2*Math.atan(Math.tan(xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,Tc,Ac),t.subVectors(Ac,Tc)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const wi=-90,Ri=1;class dd extends lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new vt(wi,Ri,e,t);i.layers=this.layers,this.add(i);const s=new vt(wi,Ri,e,t);s.layers=this.layers,this.add(s);const o=new vt(wi,Ri,e,t);o.layers=this.layers,this.add(o);const a=new vt(wi,Ri,e,t);a.layers=this.layers,this.add(a);const c=new vt(wi,Ri,e,t);c.layers=this.layers,this.add(c);const l=new vt(wi,Ri,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===xr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class th extends xt{constructor(e,t,n,i,s,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Hi,super(e,t,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fd extends fi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new th(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Vt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Rs(5,5,5),s=new Kn({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:qn});s.uniforms.tEquirect.value=t;const o=new Et(i,s),a=t.minFilter;return t.minFilter===wn&&(t.minFilter=Vt),new dd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const jr=new w,pd=new w,md=new De;class ai{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=jr.subVectors(n,t).cross(pd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(jr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||md.getNormalMatrix(e),i=this.coplanarPoint(jr).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new dn,Ks=new w;class Ia{constructor(e=new ai,t=new ai,n=new ai,i=new ai,s=new ai,o=new ai){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],p=i[8],g=i[9],_=i[10],m=i[11],f=i[12],S=i[13],E=i[14],x=i[15];if(n[0].setComponents(c-s,d-l,m-p,x-f).normalize(),n[1].setComponents(c+s,d+l,m+p,x+f).normalize(),n[2].setComponents(c+o,d+h,m+g,x+S).normalize(),n[3].setComponents(c-o,d-h,m-g,x-S).normalize(),n[4].setComponents(c-a,d-u,m-_,x-E).normalize(),t===Rn)n[5].setComponents(c+a,d+u,m+_,x+E).normalize();else if(t===xr)n[5].setComponents(a,u,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){return ti.center.set(0,0,0),ti.radius=.7071067811865476,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ks.x=i.normal.x>0?e.max.x:e.min.x,Ks.y=i.normal.y>0?e.max.y:e.min.y,Ks.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ks)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function nh(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function gd(r){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=r.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=r.SHORT;else if(l instanceof Uint32Array)p=r.UNSIGNED_INT;else if(l instanceof Int32Array)p=r.INT;else if(l instanceof Int8Array)p=r.BYTE;else if(l instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(r.bindBuffer(l,a),u.length===0)r.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];r.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(r.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}class br extends Gt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const S=f*d-o;for(let E=0;E<l;E++){const x=E*u-s;g.push(x,-S,0),_.push(0,0,1),m.push(E/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let S=0;S<a;S++){const E=S+l*f,x=S+l*(f+1),D=S+1+l*(f+1),R=S+1+l*f;p.push(E,x,R),p.push(x,D,R)}this.setIndex(p),this.setAttribute("position",new Tt(g,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new br(e.width,e.height,e.widthSegments,e.heightSegments)}}var _d=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xd=`#ifdef USE_ALPHAHASH
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
#endif`,vd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Md=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bd=`#ifdef USE_AOMAP
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
#endif`,Ed=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Td=`#ifdef USE_BATCHING
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
#endif`,Ad=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Id=`#ifdef USE_IRIDESCENCE
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
#endif`,Pd=`#ifdef USE_BUMPMAP
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
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Od=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,kd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zd=`#define PI 3.141592653589793
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
} // validated`,Hd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vd=`vec3 transformedNormal = objectNormal;
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
#endif`,Gd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yd="gl_FragColor = linearToOutputTexel( gl_FragColor );",jd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Kd=`#ifdef USE_ENVMAP
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
#endif`,$d=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zd=`#ifdef USE_ENVMAP
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
#endif`,Jd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qd=`#ifdef USE_ENVMAP
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
#endif`,ef=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rf=`#ifdef USE_GRADIENTMAP
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
}`,of=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,af=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lf=`uniform bool receiveShadow;
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
#endif`,hf=`#ifdef USE_ENVMAP
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
#endif`,uf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,df=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ff=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mf=`PhysicalMaterial material;
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
#endif`,gf=`struct PhysicalMaterial {
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
}`,_f=`
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
#endif`,xf=`#if defined( RE_IndirectDiffuse )
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
#endif`,vf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mf=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ef=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Af=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wf=`#if defined( USE_POINTS_UV )
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
#endif`,Rf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,If=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`#ifdef USE_MORPHTARGETS
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
#endif`,Nf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ff=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zf=`#ifdef USE_NORMALMAP
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
#endif`,Hf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$f=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ep=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,np=`float getShadowMask() {
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
}`,ip=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sp=`#ifdef USE_SKINNING
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
#endif`,rp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,op=`#ifdef USE_SKINNING
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
#endif`,ap=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,up=`#ifdef USE_TRANSMISSION
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
#endif`,dp=`#ifdef USE_TRANSMISSION
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
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _p=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xp=`uniform sampler2D t2D;
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
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bp=`#include <common>
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
}`,Ep=`#if DEPTH_PACKING == 3200
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
}`,Tp=`#define DISTANCE
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
}`,Ap=`#define DISTANCE
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
}`,wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`uniform float scale;
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
}`,Ip=`uniform vec3 diffuse;
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
}`,Pp=`#include <common>
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
}`,Lp=`uniform vec3 diffuse;
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
}`,Dp=`#define LAMBERT
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
}`,Np=`#define LAMBERT
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
}`,Up=`#define MATCAP
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
}`,Fp=`#define MATCAP
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
}`,Op=`#define NORMAL
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
}`,kp=`#define NORMAL
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
}`,Bp=`#define PHONG
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
}`,zp=`#define PHONG
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
}`,Hp=`#define STANDARD
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
}`,Vp=`#define STANDARD
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
}`,Gp=`#define TOON
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
}`,Wp=`#define TOON
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
}`,Xp=`uniform float size;
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
}`,qp=`uniform vec3 diffuse;
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
}`,Yp=`#include <common>
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
}`,jp=`uniform vec3 color;
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
}`,Kp=`uniform float rotation;
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
}`,$p=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:_d,alphahash_pars_fragment:xd,alphamap_fragment:vd,alphamap_pars_fragment:yd,alphatest_fragment:Md,alphatest_pars_fragment:Sd,aomap_fragment:bd,aomap_pars_fragment:Ed,batching_pars_vertex:Td,batching_vertex:Ad,begin_vertex:wd,beginnormal_vertex:Rd,bsdfs:Cd,iridescence_fragment:Id,bumpmap_pars_fragment:Pd,clipping_planes_fragment:Ld,clipping_planes_pars_fragment:Dd,clipping_planes_pars_vertex:Nd,clipping_planes_vertex:Ud,color_fragment:Fd,color_pars_fragment:Od,color_pars_vertex:kd,color_vertex:Bd,common:zd,cube_uv_reflection_fragment:Hd,defaultnormal_vertex:Vd,displacementmap_pars_vertex:Gd,displacementmap_vertex:Wd,emissivemap_fragment:Xd,emissivemap_pars_fragment:qd,colorspace_fragment:Yd,colorspace_pars_fragment:jd,envmap_fragment:Kd,envmap_common_pars_fragment:$d,envmap_pars_fragment:Zd,envmap_pars_vertex:Jd,envmap_physical_pars_fragment:hf,envmap_vertex:Qd,fog_vertex:ef,fog_pars_vertex:tf,fog_fragment:nf,fog_pars_fragment:sf,gradientmap_pars_fragment:rf,lightmap_pars_fragment:of,lights_lambert_fragment:af,lights_lambert_pars_fragment:cf,lights_pars_begin:lf,lights_toon_fragment:uf,lights_toon_pars_fragment:df,lights_phong_fragment:ff,lights_phong_pars_fragment:pf,lights_physical_fragment:mf,lights_physical_pars_fragment:gf,lights_fragment_begin:_f,lights_fragment_maps:xf,lights_fragment_end:vf,logdepthbuf_fragment:yf,logdepthbuf_pars_fragment:Mf,logdepthbuf_pars_vertex:Sf,logdepthbuf_vertex:bf,map_fragment:Ef,map_pars_fragment:Tf,map_particle_fragment:Af,map_particle_pars_fragment:wf,metalnessmap_fragment:Rf,metalnessmap_pars_fragment:Cf,morphinstance_vertex:If,morphcolor_vertex:Pf,morphnormal_vertex:Lf,morphtarget_pars_vertex:Df,morphtarget_vertex:Nf,normal_fragment_begin:Uf,normal_fragment_maps:Ff,normal_pars_fragment:Of,normal_pars_vertex:kf,normal_vertex:Bf,normalmap_pars_fragment:zf,clearcoat_normal_fragment_begin:Hf,clearcoat_normal_fragment_maps:Vf,clearcoat_pars_fragment:Gf,iridescence_pars_fragment:Wf,opaque_fragment:Xf,packing:qf,premultiplied_alpha_fragment:Yf,project_vertex:jf,dithering_fragment:Kf,dithering_pars_fragment:$f,roughnessmap_fragment:Zf,roughnessmap_pars_fragment:Jf,shadowmap_pars_fragment:Qf,shadowmap_pars_vertex:ep,shadowmap_vertex:tp,shadowmask_pars_fragment:np,skinbase_vertex:ip,skinning_pars_vertex:sp,skinning_vertex:rp,skinnormal_vertex:op,specularmap_fragment:ap,specularmap_pars_fragment:cp,tonemapping_fragment:lp,tonemapping_pars_fragment:hp,transmission_fragment:up,transmission_pars_fragment:dp,uv_pars_fragment:fp,uv_pars_vertex:pp,uv_vertex:mp,worldpos_vertex:gp,background_vert:_p,background_frag:xp,backgroundCube_vert:vp,backgroundCube_frag:yp,cube_vert:Mp,cube_frag:Sp,depth_vert:bp,depth_frag:Ep,distanceRGBA_vert:Tp,distanceRGBA_frag:Ap,equirect_vert:wp,equirect_frag:Rp,linedashed_vert:Cp,linedashed_frag:Ip,meshbasic_vert:Pp,meshbasic_frag:Lp,meshlambert_vert:Dp,meshlambert_frag:Np,meshmatcap_vert:Up,meshmatcap_frag:Fp,meshnormal_vert:Op,meshnormal_frag:kp,meshphong_vert:Bp,meshphong_frag:zp,meshphysical_vert:Hp,meshphysical_frag:Vp,meshtoon_vert:Gp,meshtoon_frag:Wp,points_vert:Xp,points_frag:qp,shadow_vert:Yp,shadow_frag:jp,sprite_vert:Kp,sprite_frag:$p},ie={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},un={basic:{uniforms:Rt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Rt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new we(0)}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Rt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Rt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Rt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new we(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Rt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Rt([ie.points,ie.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Rt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Rt([ie.common,ie.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Rt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Rt([ie.sprite,ie.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distanceRGBA:{uniforms:Rt([ie.common,ie.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distanceRGBA_vert,fragmentShader:ze.distanceRGBA_frag},shadow:{uniforms:Rt([ie.lights,ie.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};un.physical={uniforms:Rt([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const $s={r:0,b:0,g:0},ni=new Kt,Zp=new Ae;function Jp(r,e,t,n,i,s,o){const a=new we(0);let c=s===!0?0:1,l,h,u=null,d=0,p=null;function g(S){let E=S.isScene===!0?S.background:null;return E&&E.isTexture&&(E=(S.backgroundBlurriness>0?t:e).get(E)),E}function _(S){let E=!1;const x=g(S);x===null?f(a,c):x&&x.isColor&&(f(x,1),E=!0);const D=r.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,o):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(S,E){const x=g(E);x&&(x.isCubeTexture||x.mapping===Mr)?(h===void 0&&(h=new Et(new Rs(1,1,1),new Kn({name:"BackgroundCubeMaterial",uniforms:Yi(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),ni.copy(E.backgroundRotation),ni.x*=-1,ni.y*=-1,ni.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Zp.makeRotationFromEuler(ni)),h.material.toneMapped=Ge.getTransfer(x.colorSpace)!==nt,(u!==x||d!==x.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=r.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Et(new br(2,2),new Kn({name:"BackgroundMaterial",uniforms:Yi(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Ge.getTransfer(x.colorSpace)!==nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==r.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,p=r.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function f(S,E){S.getRGB($s,Ql(r)),n.buffers.color.setClear($s.r,$s.g,$s.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(S,E=1){a.set(S),c=E,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,f(a,c)},render:_,addToRenderList:m}}function Qp(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(M,I,V,B,q){let K=!1;const X=u(B,V,I);s!==X&&(s=X,l(s.object)),K=p(M,B,V,q),K&&g(M,B,V,q),q!==null&&e.update(q,r.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,x(M,I,V,B),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function c(){return r.createVertexArray()}function l(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,I,V){const B=V.wireframe===!0;let q=n[M.id];q===void 0&&(q={},n[M.id]=q);let K=q[I.id];K===void 0&&(K={},q[I.id]=K);let X=K[B];return X===void 0&&(X=d(c()),K[B]=X),X}function d(M){const I=[],V=[],B=[];for(let q=0;q<t;q++)I[q]=0,V[q]=0,B[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:B,object:M,attributes:{},index:null}}function p(M,I,V,B){const q=s.attributes,K=I.attributes;let X=0;const J=V.getAttributes();for(const G in J)if(J[G].location>=0){const ue=q[G];let Me=K[G];if(Me===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(Me=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(Me=M.instanceColor)),ue===void 0||ue.attribute!==Me||Me&&ue.data!==Me.data)return!0;X++}return s.attributesNum!==X||s.index!==B}function g(M,I,V,B){const q={},K=I.attributes;let X=0;const J=V.getAttributes();for(const G in J)if(J[G].location>=0){let ue=K[G];ue===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(ue=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(ue=M.instanceColor));const Me={};Me.attribute=ue,ue&&ue.data&&(Me.data=ue.data),q[G]=Me,X++}s.attributes=q,s.attributesNum=X,s.index=B}function _(){const M=s.newAttributes;for(let I=0,V=M.length;I<V;I++)M[I]=0}function m(M){f(M,0)}function f(M,I){const V=s.newAttributes,B=s.enabledAttributes,q=s.attributeDivisors;V[M]=1,B[M]===0&&(r.enableVertexAttribArray(M),B[M]=1),q[M]!==I&&(r.vertexAttribDivisor(M,I),q[M]=I)}function S(){const M=s.newAttributes,I=s.enabledAttributes;for(let V=0,B=I.length;V<B;V++)I[V]!==M[V]&&(r.disableVertexAttribArray(V),I[V]=0)}function E(M,I,V,B,q,K,X){X===!0?r.vertexAttribIPointer(M,I,V,q,K):r.vertexAttribPointer(M,I,V,B,q,K)}function x(M,I,V,B){_();const q=B.attributes,K=V.getAttributes(),X=I.defaultAttributeValues;for(const J in K){const G=K[J];if(G.location>=0){let se=q[J];if(se===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(se=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(se=M.instanceColor)),se!==void 0){const ue=se.normalized,Me=se.itemSize,Fe=e.get(se);if(Fe===void 0)continue;const $e=Fe.buffer,Y=Fe.type,ee=Fe.bytesPerElement,_e=Y===r.INT||Y===r.UNSIGNED_INT||se.gpuType===_a;if(se.isInterleavedBufferAttribute){const re=se.data,Te=re.stride,Ce=se.offset;if(re.isInstancedInterleavedBuffer){for(let Oe=0;Oe<G.locationSize;Oe++)f(G.location+Oe,re.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Oe=0;Oe<G.locationSize;Oe++)m(G.location+Oe);r.bindBuffer(r.ARRAY_BUFFER,$e);for(let Oe=0;Oe<G.locationSize;Oe++)E(G.location+Oe,Me/G.locationSize,Y,ue,Te*ee,(Ce+Me/G.locationSize*Oe)*ee,_e)}else{if(se.isInstancedBufferAttribute){for(let re=0;re<G.locationSize;re++)f(G.location+re,se.meshPerAttribute);M.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let re=0;re<G.locationSize;re++)m(G.location+re);r.bindBuffer(r.ARRAY_BUFFER,$e);for(let re=0;re<G.locationSize;re++)E(G.location+re,Me/G.locationSize,Y,ue,Me*ee,Me/G.locationSize*re*ee,_e)}}else if(X!==void 0){const ue=X[J];if(ue!==void 0)switch(ue.length){case 2:r.vertexAttrib2fv(G.location,ue);break;case 3:r.vertexAttrib3fv(G.location,ue);break;case 4:r.vertexAttrib4fv(G.location,ue);break;default:r.vertexAttrib1fv(G.location,ue)}}}}S()}function D(){P();for(const M in n){const I=n[M];for(const V in I){const B=I[V];for(const q in B)h(B[q].object),delete B[q];delete I[V]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const V in I){const B=I[V];for(const q in B)h(B[q].object),delete B[q];delete I[V]}delete n[M.id]}function C(M){for(const I in n){const V=n[I];if(V[M.id]===void 0)continue;const B=V[M.id];for(const q in B)h(B[q].object),delete B[q];delete V[M.id]}}function P(){b(),o=!0,s!==i&&(s=i,l(s.object))}function b(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:b,dispose:D,releaseStatesOfGeometry:R,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function em(r,e,t){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function c(l,h,u,d){if(u===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function tm(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(C){return!(C!==Yt&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const P=C===As&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Pn&&n.convert(C)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==rn&&!P)}function c(C){if(C==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),f=r.getParameter(r.MAX_VERTEX_ATTRIBS),S=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),E=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,R=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:x,vertexTextures:D,maxSamples:R}}function nm(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new ai,a=new De,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||i;return i=d,n=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):l();else{const S=s?0:n,E=S*4;let x=f.clippingState||null;c.value=x,x=h(g,d,E,p);for(let D=0;D!==E;++D)x[D]=t[D];f.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,x=p;E!==_;++E,x+=4)o.copy(u[E]).applyMatrix4(S,a),o.normal.toArray(m,x),m[x+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function im(r){let e=new WeakMap;function t(o,a){return a===Co?o.mapping=Hi:a===Io&&(o.mapping=Vi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Co||a===Io)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new fd(c.height);return l.fromEquirectangularTexture(r,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Pa extends eh{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ni=4,wc=[.125,.215,.35,.446,.526,.582],hi=20,Kr=new Pa,Rc=new we;let $r=null,Zr=0,Jr=0,Qr=!1;const ci=(1+Math.sqrt(5))/2,Ci=1/ci,Cc=[new w(-ci,Ci,0),new w(ci,Ci,0),new w(-Ci,0,ci),new w(Ci,0,ci),new w(0,ci,-Ci),new w(0,ci,Ci),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];class Ic{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){$r=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel(),Qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($r,Zr,Jr),this._renderer.xr.enabled=Qr,e.scissorTest=!1,Zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hi||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$r=this._renderer.getRenderTarget(),Zr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel(),Qr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:As,format:Yt,colorSpace:Pt,depthBuffer:!1},i=Pc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=sm(s)),this._blurMaterial=rm(s,e,t)}return i}_compileMaterial(e){const t=new Et(this._lodPlanes[0],e);this._renderer.compile(t,Kr)}_sceneToCubeUV(e,t,n,i){const a=new vt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Rc),h.toneMapping=Yn,h.autoClear=!1;const p=new on({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),g=new Et(new Rs,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Rc),_=!0);for(let f=0;f<6;f++){const S=f%3;S===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):S===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const E=this._cubeSize;Zs(i,S*E,f>2?E:0,E,E),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Hi||e.mapping===Vi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lc());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Et(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Zs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Kr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Cc[(i-s-1)%Cc.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Et(this._lodPlanes[i],l),d=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*hi-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):hi;m>hi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hi}`);const f=[];let S=0;for(let C=0;C<hi;++C){const P=C/_,b=Math.exp(-P*P/2);f.push(b),C===0?S+=b:C<m&&(S+=2*b)}for(let C=0;C<f.length;C++)f[C]=f[C]/S;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:E}=this;d.dTheta.value=g,d.mipInt.value=E-n;const x=this._sizeLods[i],D=3*x*(i>E-Ni?i-E+Ni:0),R=4*(this._cubeSize-x);Zs(t,D,R,3*x,2*x),c.setRenderTarget(t),c.render(u,Kr)}}function sm(r){const e=[],t=[],n=[];let i=r;const s=r-Ni+1+wc.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let c=1/a;o>r-Ni?c=wc[o-r+Ni-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,S=new Float32Array(_*g*p),E=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let R=0;R<p;R++){const C=R%3*2/3-1,P=R>2?0:-1,b=[C,P,0,C+2/3,P,0,C+2/3,P+1,0,C,P,0,C+2/3,P+1,0,C,P+1,0];S.set(b,_*g*R),E.set(d,m*g*R);const M=[R,R,R,R,R,R];x.set(M,f*g*R)}const D=new Gt;D.setAttribute("position",new It(S,_)),D.setAttribute("uv",new It(E,m)),D.setAttribute("faceIndex",new It(x,f)),e.push(D),i>Ni&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Pc(r,e,t){const n=new fi(r,e,t);return n.texture.mapping=Mr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function rm(r,e,t){const n=new Float32Array(hi),i=new w(0,1,0);return new Kn({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:La(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Lc(){return new Kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:La(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Dc(){return new Kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function La(){return`

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
	`}function om(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Co||c===Io,h=c===Hi||c===Vi;if(l||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ic(r)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&i(p)?(t===null&&(t=new Ic(r)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function am(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&gs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function cm(r,e,t,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete i[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],r.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],r.ARRAY_BUFFER)}}function l(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const S=p.array;_=p.version;for(let E=0,x=S.length;E<x;E+=3){const D=S[E+0],R=S[E+1],C=S[E+2];d.push(D,R,R,C,C,D)}}else if(g!==void 0){const S=g.array;_=g.version;for(let E=0,x=S.length/3-1;E<x;E+=3){const D=E+0,R=E+1,C=E+2;d.push(D,R,R,C,C,D)}}else return;const m=new(Yl(d)?Jl:Zl)(d,1);m.version=_;const f=s.get(u);f&&e.remove(f),s.set(u,m)}function h(u){const d=s.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function lm(r,e,t){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,p){r.drawElements(n,p,s,d*o),t.update(p,n,1)}function l(d,p,g){g!==0&&(r.drawElementsInstanced(n,p,s,d*o,g),t.update(p,n,g))}function h(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function u(d,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,d,0,_,0,g);let f=0;for(let S=0;S<g;S++)f+=p[S]*_[S];t.update(f,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function hm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function um(r,e,t){const n=new WeakMap,i=new Ke;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var p=M;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let D=a.attributes.position.count*x,R=1;D>e.maxTextureSize&&(R=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const C=new Float32Array(D*R*4*u),P=new Kl(C,D,R,u);P.type=rn,P.needsUpdate=!0;const b=x*4;for(let I=0;I<u;I++){const V=f[I],B=S[I],q=E[I],K=D*R*4*I;for(let X=0;X<V.count;X++){const J=X*b;g===!0&&(i.fromBufferAttribute(V,X),C[K+J+0]=i.x,C[K+J+1]=i.y,C[K+J+2]=i.z,C[K+J+3]=0),_===!0&&(i.fromBufferAttribute(B,X),C[K+J+4]=i.x,C[K+J+5]=i.y,C[K+J+6]=i.z,C[K+J+7]=0),m===!0&&(i.fromBufferAttribute(q,X),C[K+J+8]=i.x,C[K+J+9]=i.y,C[K+J+10]=i.z,C[K+J+11]=q.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new Pe(D,R)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(r,"morphTargetBaseInfluence",_),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function dm(r,e,t,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class ih extends xt{constructor(e,t,n,i,s,o,a,c,l,h=Fi){if(h!==Fi&&h!==Xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Fi&&(n=di),n===void 0&&h===Xi&&(n=Wi),super(null,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ct,this.minFilter=c!==void 0?c:Ct,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const sh=new xt,Nc=new ih(1,1),rh=new Kl,oh=new Zu,ah=new th,Uc=[],Fc=[],Oc=new Float32Array(16),kc=new Float32Array(9),Bc=new Float32Array(4);function Zi(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Uc[i];if(s===void 0&&(s=new Float32Array(i),Uc[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function pt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function mt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Er(r,e){let t=Fc[e];t===void 0&&(t=new Int32Array(e),Fc[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function fm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function pm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;r.uniform2fv(this.addr,e),mt(t,e)}}function mm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;r.uniform3fv(this.addr,e),mt(t,e)}}function gm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;r.uniform4fv(this.addr,e),mt(t,e)}}function _m(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Bc.set(n),r.uniformMatrix2fv(this.addr,!1,Bc),mt(t,n)}}function xm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;kc.set(n),r.uniformMatrix3fv(this.addr,!1,kc),mt(t,n)}}function vm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(pt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,n))return;Oc.set(n),r.uniformMatrix4fv(this.addr,!1,Oc),mt(t,n)}}function ym(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Mm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;r.uniform2iv(this.addr,e),mt(t,e)}}function Sm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;r.uniform3iv(this.addr,e),mt(t,e)}}function bm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;r.uniform4iv(this.addr,e),mt(t,e)}}function Em(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Tm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;r.uniform2uiv(this.addr,e),mt(t,e)}}function Am(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;r.uniform3uiv(this.addr,e),mt(t,e)}}function wm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;r.uniform4uiv(this.addr,e),mt(t,e)}}function Rm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Nc.compareFunction=ql,s=Nc):s=sh,t.setTexture2D(e||s,i)}function Cm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||oh,i)}function Im(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||ah,i)}function Pm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||rh,i)}function Lm(r){switch(r){case 5126:return fm;case 35664:return pm;case 35665:return mm;case 35666:return gm;case 35674:return _m;case 35675:return xm;case 35676:return vm;case 5124:case 35670:return ym;case 35667:case 35671:return Mm;case 35668:case 35672:return Sm;case 35669:case 35673:return bm;case 5125:return Em;case 36294:return Tm;case 36295:return Am;case 36296:return wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Rm;case 35679:case 36299:case 36307:return Cm;case 35680:case 36300:case 36308:case 36293:return Im;case 36289:case 36303:case 36311:case 36292:return Pm}}function Dm(r,e){r.uniform1fv(this.addr,e)}function Nm(r,e){const t=Zi(e,this.size,2);r.uniform2fv(this.addr,t)}function Um(r,e){const t=Zi(e,this.size,3);r.uniform3fv(this.addr,t)}function Fm(r,e){const t=Zi(e,this.size,4);r.uniform4fv(this.addr,t)}function Om(r,e){const t=Zi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function km(r,e){const t=Zi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Bm(r,e){const t=Zi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function zm(r,e){r.uniform1iv(this.addr,e)}function Hm(r,e){r.uniform2iv(this.addr,e)}function Vm(r,e){r.uniform3iv(this.addr,e)}function Gm(r,e){r.uniform4iv(this.addr,e)}function Wm(r,e){r.uniform1uiv(this.addr,e)}function Xm(r,e){r.uniform2uiv(this.addr,e)}function qm(r,e){r.uniform3uiv(this.addr,e)}function Ym(r,e){r.uniform4uiv(this.addr,e)}function jm(r,e,t){const n=this.cache,i=e.length,s=Er(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||sh,s[o])}function Km(r,e,t){const n=this.cache,i=e.length,s=Er(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||oh,s[o])}function $m(r,e,t){const n=this.cache,i=e.length,s=Er(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||ah,s[o])}function Zm(r,e,t){const n=this.cache,i=e.length,s=Er(t,i);pt(n,s)||(r.uniform1iv(this.addr,s),mt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||rh,s[o])}function Jm(r){switch(r){case 5126:return Dm;case 35664:return Nm;case 35665:return Um;case 35666:return Fm;case 35674:return Om;case 35675:return km;case 35676:return Bm;case 5124:case 35670:return zm;case 35667:case 35671:return Hm;case 35668:case 35672:return Vm;case 35669:case 35673:return Gm;case 5125:return Wm;case 36294:return Xm;case 36295:return qm;case 36296:return Ym;case 35678:case 36198:case 36298:case 36306:case 35682:return jm;case 35679:case 36299:case 36307:return Km;case 35680:case 36300:case 36308:case 36293:return $m;case 36289:case 36303:case 36311:case 36292:return Zm}}class Qm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lm(t.type)}}class e0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jm(t.type)}}class t0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const eo=/(\w+)(\])?(\[|\.)?/g;function zc(r,e){r.seq.push(e),r.map[e.id]=e}function n0(r,e,t){const n=r.name,i=n.length;for(eo.lastIndex=0;;){const s=eo.exec(n),o=eo.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){zc(t,l===void 0?new Qm(a,r,e):new e0(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new t0(a),zc(t,u)),t=u}}}class pr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);n0(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Hc(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const i0=37297;let s0=0;function r0(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Vc=new De;function o0(r){Ge._getMatrix(Vc,Ge.workingColorSpace,r);const e=`mat3( ${Vc.elements.map(t=>t.toFixed(4))} )`;switch(Ge.getTransfer(r)){case Sr:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Gc(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+r0(r.getShaderSource(e),o)}else return i}function a0(r,e){const t=o0(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function c0(r,e){let t;switch(e){case ou:t="Linear";break;case au:t="Reinhard";break;case cu:t="Cineon";break;case lu:t="ACESFilmic";break;case uu:t="AgX";break;case du:t="Neutral";break;case hu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Js=new w;function l0(){Ge.getLuminanceCoefficients(Js);const r=Js.x.toFixed(4),e=Js.y.toFixed(4),t=Js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function h0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_s).join(`
`)}function u0(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function d0(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function _s(r){return r!==""}function Wc(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xc(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const f0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ra(r){return r.replace(f0,m0)}const p0=new Map;function m0(r,e){let t=ze[e];if(t===void 0){const n=p0.get(e);if(n!==void 0)t=ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ra(t)}const g0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(r){return r.replace(g0,_0)}function _0(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Yc(r){let e=`precision ${r.precision} float;
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
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function x0(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Dl?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Bh?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===bn&&(e="SHADOWMAP_TYPE_VSM"),e}function v0(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Hi:case Vi:e="ENVMAP_TYPE_CUBE";break;case Mr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function y0(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Vi:e="ENVMAP_MODE_REFRACTION";break}return e}function M0(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case ga:e="ENVMAP_BLENDING_MULTIPLY";break;case su:e="ENVMAP_BLENDING_MIX";break;case ru:e="ENVMAP_BLENDING_ADD";break}return e}function S0(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function b0(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=x0(t),l=v0(t),h=y0(t),u=M0(t),d=S0(t),p=h0(t),g=u0(s),_=i.createProgram();let m,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_s).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(_s).join(`
`),f.length>0&&(f+=`
`)):(m=[Yc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_s).join(`
`),f=[Yc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yn?"#define TONE_MAPPING":"",t.toneMapping!==Yn?ze.tonemapping_pars_fragment:"",t.toneMapping!==Yn?c0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,a0("linearToOutputTexel",t.outputColorSpace),l0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(_s).join(`
`)),o=ra(o),o=Wc(o,t),o=Xc(o,t),a=ra(a),a=Wc(a,t),a=Xc(a,t),o=qc(o),a=qc(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=S+m+o,x=S+f+a,D=Hc(i,i.VERTEX_SHADER,E),R=Hc(i,i.FRAGMENT_SHADER,x);i.attachShader(_,D),i.attachShader(_,R),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(I){if(r.debug.checkShaderErrors){const V=i.getProgramInfoLog(_).trim(),B=i.getShaderInfoLog(D).trim(),q=i.getShaderInfoLog(R).trim();let K=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(K=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,D,R);else{const J=Gc(i,D,"vertex"),G=Gc(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+V+`
`+J+`
`+G)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(B===""||q==="")&&(X=!1);X&&(I.diagnostics={runnable:K,programLog:V,vertexShader:{log:B,prefix:m},fragmentShader:{log:q,prefix:f}})}i.deleteShader(D),i.deleteShader(R),P=new pr(i,_),b=d0(i,_)}let P;this.getUniforms=function(){return P===void 0&&C(this),P};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,i0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=s0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=R,this}let E0=0;class T0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new A0(e),t.set(e,n)),n}}class A0{constructor(e){this.id=E0++,this.code=e,this.usedTimes=0}}function w0(r,e,t,n,i,s,o){const a=new Ca,c=new T0,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,I,V,B){const q=V.fog,K=B.geometry,X=b.isMeshStandardMaterial?V.environment:null,J=(b.isMeshStandardMaterial?t:e).get(b.envMap||X),G=J&&J.mapping===Mr?J.image.height:null,se=g[b.type];b.precision!==null&&(p=i.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const ue=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Me=ue!==void 0?ue.length:0;let Fe=0;K.morphAttributes.position!==void 0&&(Fe=1),K.morphAttributes.normal!==void 0&&(Fe=2),K.morphAttributes.color!==void 0&&(Fe=3);let $e,Y,ee,_e;if(se){const et=un[se];$e=et.vertexShader,Y=et.fragmentShader}else $e=b.vertexShader,Y=b.fragmentShader,c.update(b),ee=c.getVertexShaderID(b),_e=c.getFragmentShaderID(b);const re=r.getRenderTarget(),Te=r.state.buffers.depth.getReversed(),Ce=B.isInstancedMesh===!0,Oe=B.isBatchedMesh===!0,it=!!b.map,Ve=!!b.matcap,ct=!!J,U=!!b.aoMap,At=!!b.lightMap,O=!!b.bumpMap,fe=!!b.normalMap,pe=!!b.displacementMap,ke=!!b.emissiveMap,Ee=!!b.metalnessMap,T=!!b.roughnessMap,v=b.anisotropy>0,k=b.clearcoat>0,$=b.dispersion>0,Q=b.iridescence>0,j=b.sheen>0,Se=b.transmission>0,ae=v&&!!b.anisotropyMap,de=k&&!!b.clearcoatMap,qe=k&&!!b.clearcoatNormalMap,te=k&&!!b.clearcoatRoughnessMap,me=Q&&!!b.iridescenceMap,Re=Q&&!!b.iridescenceThicknessMap,Ie=j&&!!b.sheenColorMap,ge=j&&!!b.sheenRoughnessMap,We=!!b.specularMap,Be=!!b.specularColorMap,st=!!b.specularIntensityMap,L=Se&&!!b.transmissionMap,oe=Se&&!!b.thicknessMap,W=!!b.gradientMap,Z=!!b.alphaMap,he=b.alphaTest>0,ce=!!b.alphaHash,Ne=!!b.extensions;let ht=Yn;b.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ht=r.toneMapping);const yt={shaderID:se,shaderType:b.type,shaderName:b.name,vertexShader:$e,fragmentShader:Y,defines:b.defines,customVertexShaderID:ee,customFragmentShaderID:_e,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:Oe,batchingColor:Oe&&B._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&B.instanceColor!==null,instancingMorph:Ce&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:re===null?r.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Pt,alphaToCoverage:!!b.alphaToCoverage,map:it,matcap:Ve,envMap:ct,envMapMode:ct&&J.mapping,envMapCubeUVHeight:G,aoMap:U,lightMap:At,bumpMap:O,normalMap:fe,displacementMap:d&&pe,emissiveMap:ke,normalMapObjectSpace:fe&&b.normalMapType===vu,normalMapTangentSpace:fe&&b.normalMapType===wa,metalnessMap:Ee,roughnessMap:T,anisotropy:v,anisotropyMap:ae,clearcoat:k,clearcoatMap:de,clearcoatNormalMap:qe,clearcoatRoughnessMap:te,dispersion:$,iridescence:Q,iridescenceMap:me,iridescenceThicknessMap:Re,sheen:j,sheenColorMap:Ie,sheenRoughnessMap:ge,specularMap:We,specularColorMap:Be,specularIntensityMap:st,transmission:Se,transmissionMap:L,thicknessMap:oe,gradientMap:W,opaque:b.transparent===!1&&b.blending===Ui&&b.alphaToCoverage===!1,alphaMap:Z,alphaTest:he,alphaHash:ce,combine:b.combine,mapUv:it&&_(b.map.channel),aoMapUv:U&&_(b.aoMap.channel),lightMapUv:At&&_(b.lightMap.channel),bumpMapUv:O&&_(b.bumpMap.channel),normalMapUv:fe&&_(b.normalMap.channel),displacementMapUv:pe&&_(b.displacementMap.channel),emissiveMapUv:ke&&_(b.emissiveMap.channel),metalnessMapUv:Ee&&_(b.metalnessMap.channel),roughnessMapUv:T&&_(b.roughnessMap.channel),anisotropyMapUv:ae&&_(b.anisotropyMap.channel),clearcoatMapUv:de&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:qe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:ge&&_(b.sheenRoughnessMap.channel),specularMapUv:We&&_(b.specularMap.channel),specularColorMapUv:Be&&_(b.specularColorMap.channel),specularIntensityMapUv:st&&_(b.specularIntensityMap.channel),transmissionMapUv:L&&_(b.transmissionMap.channel),thicknessMapUv:oe&&_(b.thicknessMap.channel),alphaMapUv:Z&&_(b.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(fe||v),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!K.attributes.uv&&(it||Z),fog:!!q,useFog:b.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Te,skinning:B.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Fe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:r.shadowMap.enabled&&I.length>0,shadowMapType:r.shadowMap.type,toneMapping:ht,decodeVideoTexture:it&&b.map.isVideoTexture===!0&&Ge.getTransfer(b.map.colorSpace)===nt,decodeVideoTextureEmissive:ke&&b.emissiveMap.isVideoTexture===!0&&Ge.getTransfer(b.emissiveMap.colorSpace)===nt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===tn,flipSided:b.side===Ut,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ne&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&b.extensions.multiDraw===!0||Oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return yt.vertexUv1s=l.has(1),yt.vertexUv2s=l.has(2),yt.vertexUv3s=l.has(3),l.clear(),yt}function f(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const I in b.defines)M.push(I),M.push(b.defines[I]);return b.isRawShaderMaterial===!1&&(S(M,b),E(M,b),M.push(r.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function S(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function E(b,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),b.push(a.mask)}function x(b){const M=g[b.type];let I;if(M){const V=un[M];I=ld.clone(V.uniforms)}else I=b.uniforms;return I}function D(b,M){let I;for(let V=0,B=h.length;V<B;V++){const q=h[V];if(q.cacheKey===M){I=q,++I.usedTimes;break}}return I===void 0&&(I=new b0(r,M,b,s),h.push(I)),I}function R(b){if(--b.usedTimes===0){const M=h.indexOf(b);h[M]=h[h.length-1],h.pop(),b.destroy()}}function C(b){c.remove(b)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:x,acquireProgram:D,releaseProgram:R,releaseShaderCache:C,programs:h,dispose:P}}function R0(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function C0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function jc(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Kc(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,p,g,_,m){let f=r[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},r[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?i.push(f):t.push(f)}function c(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?i.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||C0),n.length>1&&n.sort(d||jc),i.length>1&&i.sort(d||jc)}function h(){for(let u=e,d=r.length;u<d;u++){const p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function I0(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Kc,r.set(n,[o])):i>=s.length?(o=new Kc,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function P0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new we};break;case"SpotLight":t={position:new w,direction:new w,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new w,halfWidth:new w,halfHeight:new w};break}return r[e.id]=t,t}}}function L0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let D0=0;function N0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function U0(r){const e=new P0,t=L0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new w);const i=new w,s=new Ae,o=new Ae;function a(l){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,S=0,E=0,x=0,D=0,R=0,C=0;l.sort(N0);for(let b=0,M=l.length;b<M;b++){const I=l[b],V=I.color,B=I.intensity,q=I.distance,K=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=V.r*B,u+=V.g*B,d+=V.b*B;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],B);C++}else if(I.isDirectionalLight){const X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const J=I.shadow,G=t.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.directionalShadow[p]=G,n.directionalShadowMap[p]=K,n.directionalShadowMatrix[p]=I.shadow.matrix,S++}n.directional[p]=X,p++}else if(I.isSpotLight){const X=e.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(V).multiplyScalar(B),X.distance=q,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[_]=X;const J=I.shadow;if(I.map&&(n.spotLightMap[D]=I.map,D++,J.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[_]=J.matrix,I.castShadow){const G=t.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=K,x++}_++}else if(I.isRectAreaLight){const X=e.get(I);X.color.copy(V).multiplyScalar(B),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=X,m++}else if(I.isPointLight){const X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){const J=I.shadow,G=t.get(I);G.shadowIntensity=J.intensity,G.shadowBias=J.bias,G.shadowNormalBias=J.normalBias,G.shadowRadius=J.radius,G.shadowMapSize=J.mapSize,G.shadowCameraNear=J.camera.near,G.shadowCameraFar=J.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=K,n.pointShadowMatrix[g]=I.shadow.matrix,E++}n.point[g]=X,g++}else if(I.isHemisphereLight){const X=e.get(I);X.skyColor.copy(I.color).multiplyScalar(B),X.groundColor.copy(I.groundColor).multiplyScalar(B),n.hemi[f]=X,f++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==f||P.numDirectionalShadows!==S||P.numPointShadows!==E||P.numSpotShadows!==x||P.numSpotMaps!==D||P.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=x+D-R,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,P.directionalLength=p,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=f,P.numDirectionalShadows=S,P.numPointShadows=E,P.numSpotShadows=x,P.numSpotMaps=D,P.numLightProbes=C,n.version=D0++)}function c(l,h){let u=0,d=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,S=l.length;f<S;f++){const E=l[f];if(E.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(E.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(E.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function $c(r){const e=new U0(r),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function F0(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new $c(r),e.set(i,[a])):s>=o.length?(a=new $c(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class O0 extends cn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=_u,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class k0 extends cn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const B0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,z0=`uniform sampler2D shadow_pass;
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
}`;function H0(r,e,t){let n=new Ia;const i=new Pe,s=new Pe,o=new Ke,a=new O0({depthPacking:xu}),c=new k0,l={},h=t.maxTextureSize,u={[In]:Ut,[Ut]:In,[tn]:tn},d=new Kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:B0,fragmentShader:z0}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Gt;g.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Et(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dl;let f=this.type;this.render=function(R,C,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const b=r.getRenderTarget(),M=r.getActiveCubeFace(),I=r.getActiveMipmapLevel(),V=r.state;V.setBlending(qn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const B=f!==bn&&this.type===bn,q=f===bn&&this.type!==bn;for(let K=0,X=R.length;K<X;K++){const J=R[K],G=J.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const se=G.getFrameExtents();if(i.multiply(se),s.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/se.x),i.x=s.x*se.x,G.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/se.y),i.y=s.y*se.y,G.mapSize.y=s.y)),G.map===null||B===!0||q===!0){const Me=this.type!==bn?{minFilter:Ct,magFilter:Ct}:{};G.map!==null&&G.map.dispose(),G.map=new fi(i.x,i.y,Me),G.map.texture.name=J.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const ue=G.getViewportCount();for(let Me=0;Me<ue;Me++){const Fe=G.getViewport(Me);o.set(s.x*Fe.x,s.y*Fe.y,s.x*Fe.z,s.y*Fe.w),V.viewport(o),G.updateMatrices(J,Me),n=G.getFrustum(),x(C,P,G.camera,J,this.type)}G.isPointLightShadow!==!0&&this.type===bn&&S(G,P),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(b,M,I)};function S(R,C){const P=e.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new fi(i.x,i.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(C,null,P,d,_,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(C,null,P,p,_,null)}function E(R,C,P,b){let M=null;const I=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(I!==void 0)M=I;else if(M=P.isPointLight===!0?c:a,r.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const V=M.uuid,B=C.uuid;let q=l[V];q===void 0&&(q={},l[V]=q);let K=q[B];K===void 0&&(K=M.clone(),q[B]=K,C.addEventListener("dispose",D)),M=K}if(M.visible=C.visible,M.wireframe=C.wireframe,b===bn?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=r.properties.get(M);V.light=P}return M}function x(R,C,P,b,M){if(R.visible===!1)return;if(R.layers.test(C.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===bn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const B=e.update(R),q=R.material;if(Array.isArray(q)){const K=B.groups;for(let X=0,J=K.length;X<J;X++){const G=K[X],se=q[G.materialIndex];if(se&&se.visible){const ue=E(R,se,b,M);R.onBeforeShadow(r,R,C,P,B,ue,G),r.renderBufferDirect(P,null,B,ue,R,G),R.onAfterShadow(r,R,C,P,B,ue,G)}}}else if(q.visible){const K=E(R,q,b,M);R.onBeforeShadow(r,R,C,P,B,K,null),r.renderBufferDirect(P,null,B,K,R,null),R.onAfterShadow(r,R,C,P,B,K,null)}}const V=R.children;for(let B=0,q=V.length;B<q;B++)x(V[B],C,P,b,M)}function D(R){R.target.removeEventListener("dispose",D);for(const P in l){const b=l[P],M=R.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const V0={[So]:bo,[Eo]:wo,[To]:Ro,[zi]:Ao,[bo]:So,[wo]:Eo,[Ro]:To,[Ao]:zi};function G0(r,e){function t(){let L=!1;const oe=new Ke;let W=null;const Z=new Ke(0,0,0,0);return{setMask:function(he){W!==he&&!L&&(r.colorMask(he,he,he,he),W=he)},setLocked:function(he){L=he},setClear:function(he,ce,Ne,ht,yt){yt===!0&&(he*=ht,ce*=ht,Ne*=ht),oe.set(he,ce,Ne,ht),Z.equals(oe)===!1&&(r.clearColor(he,ce,Ne,ht),Z.copy(oe))},reset:function(){L=!1,W=null,Z.set(-1,0,0,0)}}}function n(){let L=!1,oe=!1,W=null,Z=null,he=null;return{setReversed:function(ce){if(oe!==ce){const Ne=e.get("EXT_clip_control");oe?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT);const ht=he;he=null,this.setClear(ht)}oe=ce},getReversed:function(){return oe},setTest:function(ce){ce?re(r.DEPTH_TEST):Te(r.DEPTH_TEST)},setMask:function(ce){W!==ce&&!L&&(r.depthMask(ce),W=ce)},setFunc:function(ce){if(oe&&(ce=V0[ce]),Z!==ce){switch(ce){case So:r.depthFunc(r.NEVER);break;case bo:r.depthFunc(r.ALWAYS);break;case Eo:r.depthFunc(r.LESS);break;case zi:r.depthFunc(r.LEQUAL);break;case To:r.depthFunc(r.EQUAL);break;case Ao:r.depthFunc(r.GEQUAL);break;case wo:r.depthFunc(r.GREATER);break;case Ro:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Z=ce}},setLocked:function(ce){L=ce},setClear:function(ce){he!==ce&&(oe&&(ce=1-ce),r.clearDepth(ce),he=ce)},reset:function(){L=!1,W=null,Z=null,he=null,oe=!1}}}function i(){let L=!1,oe=null,W=null,Z=null,he=null,ce=null,Ne=null,ht=null,yt=null;return{setTest:function(et){L||(et?re(r.STENCIL_TEST):Te(r.STENCIL_TEST))},setMask:function(et){oe!==et&&!L&&(r.stencilMask(et),oe=et)},setFunc:function(et,$t,mn){(W!==et||Z!==$t||he!==mn)&&(r.stencilFunc(et,$t,mn),W=et,Z=$t,he=mn)},setOp:function(et,$t,mn){(ce!==et||Ne!==$t||ht!==mn)&&(r.stencilOp(et,$t,mn),ce=et,Ne=$t,ht=mn)},setLocked:function(et){L=et},setClear:function(et){yt!==et&&(r.clearStencil(et),yt=et)},reset:function(){L=!1,oe=null,W=null,Z=null,he=null,ce=null,Ne=null,ht=null,yt=null}}}const s=new t,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,S=null,E=null,x=null,D=null,R=null,C=new we(0,0,0),P=0,b=!1,M=null,I=null,V=null,B=null,q=null;const K=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,J=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=J>=1):G.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=J>=2);let se=null,ue={};const Me=r.getParameter(r.SCISSOR_BOX),Fe=r.getParameter(r.VIEWPORT),$e=new Ke().fromArray(Me),Y=new Ke().fromArray(Fe);function ee(L,oe,W,Z){const he=new Uint8Array(4),ce=r.createTexture();r.bindTexture(L,ce),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ne=0;Ne<W;Ne++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(oe,0,r.RGBA,1,1,Z,0,r.RGBA,r.UNSIGNED_BYTE,he):r.texImage2D(oe+Ne,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,he);return ce}const _e={};_e[r.TEXTURE_2D]=ee(r.TEXTURE_2D,r.TEXTURE_2D,1),_e[r.TEXTURE_CUBE_MAP]=ee(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[r.TEXTURE_2D_ARRAY]=ee(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),_e[r.TEXTURE_3D]=ee(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(r.DEPTH_TEST),o.setFunc(zi),O(!1),fe(ec),re(r.CULL_FACE),U(qn);function re(L){h[L]!==!0&&(r.enable(L),h[L]=!0)}function Te(L){h[L]!==!1&&(r.disable(L),h[L]=!1)}function Ce(L,oe){return u[L]!==oe?(r.bindFramebuffer(L,oe),u[L]=oe,L===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=oe),L===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=oe),!0):!1}function Oe(L,oe){let W=p,Z=!1;if(L){W=d.get(oe),W===void 0&&(W=[],d.set(oe,W));const he=L.textures;if(W.length!==he.length||W[0]!==r.COLOR_ATTACHMENT0){for(let ce=0,Ne=he.length;ce<Ne;ce++)W[ce]=r.COLOR_ATTACHMENT0+ce;W.length=he.length,Z=!0}}else W[0]!==r.BACK&&(W[0]=r.BACK,Z=!0);Z&&r.drawBuffers(W)}function it(L){return g!==L?(r.useProgram(L),g=L,!0):!1}const Ve={[li]:r.FUNC_ADD,[Hh]:r.FUNC_SUBTRACT,[Vh]:r.FUNC_REVERSE_SUBTRACT};Ve[Gh]=r.MIN,Ve[Wh]=r.MAX;const ct={[Xh]:r.ZERO,[qh]:r.ONE,[Yh]:r.SRC_COLOR,[yo]:r.SRC_ALPHA,[Qh]:r.SRC_ALPHA_SATURATE,[Zh]:r.DST_COLOR,[Kh]:r.DST_ALPHA,[jh]:r.ONE_MINUS_SRC_COLOR,[Mo]:r.ONE_MINUS_SRC_ALPHA,[Jh]:r.ONE_MINUS_DST_COLOR,[$h]:r.ONE_MINUS_DST_ALPHA,[eu]:r.CONSTANT_COLOR,[tu]:r.ONE_MINUS_CONSTANT_COLOR,[nu]:r.CONSTANT_ALPHA,[iu]:r.ONE_MINUS_CONSTANT_ALPHA};function U(L,oe,W,Z,he,ce,Ne,ht,yt,et){if(L===qn){_===!0&&(Te(r.BLEND),_=!1);return}if(_===!1&&(re(r.BLEND),_=!0),L!==zh){if(L!==m||et!==b){if((f!==li||x!==li)&&(r.blendEquation(r.FUNC_ADD),f=li,x=li),et)switch(L){case Ui:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mr:r.blendFunc(r.ONE,r.ONE);break;case tc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case nc:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ui:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case mr:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case tc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case nc:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}S=null,E=null,D=null,R=null,C.set(0,0,0),P=0,m=L,b=et}return}he=he||oe,ce=ce||W,Ne=Ne||Z,(oe!==f||he!==x)&&(r.blendEquationSeparate(Ve[oe],Ve[he]),f=oe,x=he),(W!==S||Z!==E||ce!==D||Ne!==R)&&(r.blendFuncSeparate(ct[W],ct[Z],ct[ce],ct[Ne]),S=W,E=Z,D=ce,R=Ne),(ht.equals(C)===!1||yt!==P)&&(r.blendColor(ht.r,ht.g,ht.b,yt),C.copy(ht),P=yt),m=L,b=!1}function At(L,oe){L.side===tn?Te(r.CULL_FACE):re(r.CULL_FACE);let W=L.side===Ut;oe&&(W=!W),O(W),L.blending===Ui&&L.transparent===!1?U(qn):U(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const Z=L.stencilWrite;a.setTest(Z),Z&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ke(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?re(r.SAMPLE_ALPHA_TO_COVERAGE):Te(r.SAMPLE_ALPHA_TO_COVERAGE)}function O(L){M!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),M=L)}function fe(L){L!==Oh?(re(r.CULL_FACE),L!==I&&(L===ec?r.cullFace(r.BACK):L===kh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Te(r.CULL_FACE),I=L}function pe(L){L!==V&&(X&&r.lineWidth(L),V=L)}function ke(L,oe,W){L?(re(r.POLYGON_OFFSET_FILL),(B!==oe||q!==W)&&(r.polygonOffset(oe,W),B=oe,q=W)):Te(r.POLYGON_OFFSET_FILL)}function Ee(L){L?re(r.SCISSOR_TEST):Te(r.SCISSOR_TEST)}function T(L){L===void 0&&(L=r.TEXTURE0+K-1),se!==L&&(r.activeTexture(L),se=L)}function v(L,oe,W){W===void 0&&(se===null?W=r.TEXTURE0+K-1:W=se);let Z=ue[W];Z===void 0&&(Z={type:void 0,texture:void 0},ue[W]=Z),(Z.type!==L||Z.texture!==oe)&&(se!==W&&(r.activeTexture(W),se=W),r.bindTexture(L,oe||_e[L]),Z.type=L,Z.texture=oe)}function k(){const L=ue[se];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function $(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{r.texSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ae(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function qe(){try{r.texStorage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{r.texStorage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function me(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ie(L){$e.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),$e.copy(L))}function ge(L){Y.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),Y.copy(L))}function We(L,oe){let W=l.get(oe);W===void 0&&(W=new WeakMap,l.set(oe,W));let Z=W.get(L);Z===void 0&&(Z=r.getUniformBlockIndex(oe,L.name),W.set(L,Z))}function Be(L,oe){const Z=l.get(oe).get(L);c.get(oe)!==Z&&(r.uniformBlockBinding(oe,Z,L.__bindingPointIndex),c.set(oe,Z))}function st(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},se=null,ue={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,S=null,E=null,x=null,D=null,R=null,C=new we(0,0,0),P=0,b=!1,M=null,I=null,V=null,B=null,q=null,$e.set(0,0,r.canvas.width,r.canvas.height),Y.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Te,bindFramebuffer:Ce,drawBuffers:Oe,useProgram:it,setBlending:U,setMaterial:At,setFlipSided:O,setCullFace:fe,setLineWidth:pe,setPolygonOffset:ke,setScissorTest:Ee,activeTexture:T,bindTexture:v,unbindTexture:k,compressedTexImage2D:$,compressedTexImage3D:Q,texImage2D:me,texImage3D:Re,updateUBOMapping:We,uniformBlockBinding:Be,texStorage2D:qe,texStorage3D:te,texSubImage2D:j,texSubImage3D:Se,compressedTexSubImage2D:ae,compressedTexSubImage3D:de,scissor:Ie,viewport:ge,reset:st}}function Zc(r,e,t,n){const i=W0(n);switch(t){case Bl:return r*e;case Hl:return r*e;case Vl:return r*e*2;case ya:return r*e/i.components*i.byteLength;case Ma:return r*e/i.components*i.byteLength;case Gl:return r*e*2/i.components*i.byteLength;case Sa:return r*e*2/i.components*i.byteLength;case zl:return r*e*3/i.components*i.byteLength;case Yt:return r*e*4/i.components*i.byteLength;case ba:return r*e*4/i.components*i.byteLength;case lr:case hr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ur:case dr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Lo:case No:return Math.max(r,16)*Math.max(e,8)/4;case Po:case Do:return Math.max(r,8)*Math.max(e,8)/2;case Uo:case Fo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Oo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ko:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Bo:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case zo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Vo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Go:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Xo:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case qo:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Yo:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case jo:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Ko:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case $o:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Zo:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case fr:case Jo:case Qo:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Wl:case ea:return Math.ceil(r/4)*Math.ceil(e/4)*8;case ta:case na:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function W0(r){switch(r){case Pn:case Fl:return{byteLength:1,components:1};case Ms:case Ol:case As:return{byteLength:2,components:1};case xa:case va:return{byteLength:2,components:4};case di:case _a:case rn:return{byteLength:4,components:1};case kl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function X0(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Pe,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return p?new OffscreenCanvas(T,v):Es("canvas")}function _(T,v,k){let $=1;const Q=Ee(T);if((Q.width>k||Q.height>k)&&($=k/Math.max(Q.width,Q.height)),$<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const j=Math.floor($*Q.width),Se=Math.floor($*Q.height);u===void 0&&(u=g(j,Se));const ae=v?g(j,Se):u;return ae.width=j,ae.height=Se,ae.getContext("2d").drawImage(T,0,0,j,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+Se+")."),ae}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){r.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?r.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function E(T,v,k,$,Q=!1){if(T!==null){if(r[T]!==void 0)return r[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j=v;if(v===r.RED&&(k===r.FLOAT&&(j=r.R32F),k===r.HALF_FLOAT&&(j=r.R16F),k===r.UNSIGNED_BYTE&&(j=r.R8)),v===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(j=r.R8UI),k===r.UNSIGNED_SHORT&&(j=r.R16UI),k===r.UNSIGNED_INT&&(j=r.R32UI),k===r.BYTE&&(j=r.R8I),k===r.SHORT&&(j=r.R16I),k===r.INT&&(j=r.R32I)),v===r.RG&&(k===r.FLOAT&&(j=r.RG32F),k===r.HALF_FLOAT&&(j=r.RG16F),k===r.UNSIGNED_BYTE&&(j=r.RG8)),v===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(j=r.RG8UI),k===r.UNSIGNED_SHORT&&(j=r.RG16UI),k===r.UNSIGNED_INT&&(j=r.RG32UI),k===r.BYTE&&(j=r.RG8I),k===r.SHORT&&(j=r.RG16I),k===r.INT&&(j=r.RG32I)),v===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(j=r.RGB8UI),k===r.UNSIGNED_SHORT&&(j=r.RGB16UI),k===r.UNSIGNED_INT&&(j=r.RGB32UI),k===r.BYTE&&(j=r.RGB8I),k===r.SHORT&&(j=r.RGB16I),k===r.INT&&(j=r.RGB32I)),v===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),k===r.UNSIGNED_INT&&(j=r.RGBA32UI),k===r.BYTE&&(j=r.RGBA8I),k===r.SHORT&&(j=r.RGBA16I),k===r.INT&&(j=r.RGBA32I)),v===r.RGB&&k===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),v===r.RGBA){const Se=Q?Sr:Ge.getTransfer($);k===r.FLOAT&&(j=r.RGBA32F),k===r.HALF_FLOAT&&(j=r.RGBA16F),k===r.UNSIGNED_BYTE&&(j=Se===nt?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function x(T,v){let k;return T?v===null||v===di||v===Wi?k=r.DEPTH24_STENCIL8:v===rn?k=r.DEPTH32F_STENCIL8:v===Ms&&(k=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===di||v===Wi?k=r.DEPTH_COMPONENT24:v===rn?k=r.DEPTH_COMPONENT32F:v===Ms&&(k=r.DEPTH_COMPONENT16),k}function D(T,v){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ct&&T.minFilter!==Vt?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function R(T){const v=T.target;v.removeEventListener("dispose",R),P(v),v.isVideoTexture&&h.delete(v)}function C(T){const v=T.target;v.removeEventListener("dispose",C),M(v)}function P(T){const v=n.get(T);if(v.__webglInit===void 0)return;const k=T.source,$=d.get(k);if($){const Q=$[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(T),Object.keys($).length===0&&d.delete(k)}n.remove(T)}function b(T){const v=n.get(T);r.deleteTexture(v.__webglTexture);const k=T.source,$=d.get(k);delete $[v.__cacheKey],o.memory.textures--}function M(T){const v=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(v.__webglFramebuffer[$]))for(let Q=0;Q<v.__webglFramebuffer[$].length;Q++)r.deleteFramebuffer(v.__webglFramebuffer[$][Q]);else r.deleteFramebuffer(v.__webglFramebuffer[$]);v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer[$])}else{if(Array.isArray(v.__webglFramebuffer))for(let $=0;$<v.__webglFramebuffer.length;$++)r.deleteFramebuffer(v.__webglFramebuffer[$]);else r.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&r.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let $=0;$<v.__webglColorRenderbuffer.length;$++)v.__webglColorRenderbuffer[$]&&r.deleteRenderbuffer(v.__webglColorRenderbuffer[$]);v.__webglDepthRenderbuffer&&r.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const k=T.textures;for(let $=0,Q=k.length;$<Q;$++){const j=n.get(k[$]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(k[$])}n.remove(T)}let I=0;function V(){I=0}function B(){const T=I;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),I+=1,T}function q(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function K(T,v){const k=n.get(T);if(T.isVideoTexture&&pe(T),T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){const $=T.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(k,T,v);return}}t.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+v)}function X(T,v){const k=n.get(T);if(T.version>0&&k.__version!==T.version){Y(k,T,v);return}t.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+v)}function J(T,v){const k=n.get(T);if(T.version>0&&k.__version!==T.version){Y(k,T,v);return}t.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+v)}function G(T,v){const k=n.get(T);if(T.version>0&&k.__version!==T.version){ee(k,T,v);return}t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+v)}const se={[Gi]:r.REPEAT,[Wn]:r.CLAMP_TO_EDGE,[gr]:r.MIRRORED_REPEAT},ue={[Ct]:r.NEAREST,[Ul]:r.NEAREST_MIPMAP_NEAREST,[ms]:r.NEAREST_MIPMAP_LINEAR,[Vt]:r.LINEAR,[cr]:r.LINEAR_MIPMAP_NEAREST,[wn]:r.LINEAR_MIPMAP_LINEAR},Me={[yu]:r.NEVER,[Au]:r.ALWAYS,[Mu]:r.LESS,[ql]:r.LEQUAL,[Su]:r.EQUAL,[Tu]:r.GEQUAL,[bu]:r.GREATER,[Eu]:r.NOTEQUAL};function Fe(T,v){if(v.type===rn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Vt||v.magFilter===cr||v.magFilter===ms||v.magFilter===wn||v.minFilter===Vt||v.minFilter===cr||v.minFilter===ms||v.minFilter===wn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(T,r.TEXTURE_WRAP_S,se[v.wrapS]),r.texParameteri(T,r.TEXTURE_WRAP_T,se[v.wrapT]),(T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY)&&r.texParameteri(T,r.TEXTURE_WRAP_R,se[v.wrapR]),r.texParameteri(T,r.TEXTURE_MAG_FILTER,ue[v.magFilter]),r.texParameteri(T,r.TEXTURE_MIN_FILTER,ue[v.minFilter]),v.compareFunction&&(r.texParameteri(T,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(T,r.TEXTURE_COMPARE_FUNC,Me[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ct||v.minFilter!==ms&&v.minFilter!==wn||v.type===rn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");r.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,i.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function $e(T,v){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",R));const $=v.source;let Q=d.get($);Q===void 0&&(Q={},d.set($,Q));const j=q(v);if(j!==T.__cacheKey){Q[j]===void 0&&(Q[j]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),Q[j].usedTimes++;const Se=Q[T.__cacheKey];Se!==void 0&&(Q[T.__cacheKey].usedTimes--,Se.usedTimes===0&&b(v)),T.__cacheKey=j,T.__webglTexture=Q[j].texture}return k}function Y(T,v,k){let $=r.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&($=r.TEXTURE_2D_ARRAY),v.isData3DTexture&&($=r.TEXTURE_3D);const Q=$e(T,v),j=v.source;t.bindTexture($,T.__webglTexture,r.TEXTURE0+k);const Se=n.get(j);if(j.version!==Se.__version||Q===!0){t.activeTexture(r.TEXTURE0+k);const ae=Ge.getPrimaries(Ge.workingColorSpace),de=v.colorSpace===Gn?null:Ge.getPrimaries(v.colorSpace),qe=v.colorSpace===Gn||ae===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let te=_(v.image,!1,i.maxTextureSize);te=ke(v,te);const me=s.convert(v.format,v.colorSpace),Re=s.convert(v.type);let Ie=E(v.internalFormat,me,Re,v.colorSpace,v.isVideoTexture);Fe($,v);let ge;const We=v.mipmaps,Be=v.isVideoTexture!==!0,st=Se.__version===void 0||Q===!0,L=j.dataReady,oe=D(v,te);if(v.isDepthTexture)Ie=x(v.format===Xi,v.type),st&&(Be?t.texStorage2D(r.TEXTURE_2D,1,Ie,te.width,te.height):t.texImage2D(r.TEXTURE_2D,0,Ie,te.width,te.height,0,me,Re,null));else if(v.isDataTexture)if(We.length>0){Be&&st&&t.texStorage2D(r.TEXTURE_2D,oe,Ie,We[0].width,We[0].height);for(let W=0,Z=We.length;W<Z;W++)ge=We[W],Be?L&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,ge.width,ge.height,me,Re,ge.data):t.texImage2D(r.TEXTURE_2D,W,Ie,ge.width,ge.height,0,me,Re,ge.data);v.generateMipmaps=!1}else Be?(st&&t.texStorage2D(r.TEXTURE_2D,oe,Ie,te.width,te.height),L&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,te.width,te.height,me,Re,te.data)):t.texImage2D(r.TEXTURE_2D,0,Ie,te.width,te.height,0,me,Re,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Be&&st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,oe,Ie,We[0].width,We[0].height,te.depth);for(let W=0,Z=We.length;W<Z;W++)if(ge=We[W],v.format!==Yt)if(me!==null)if(Be){if(L)if(v.layerUpdates.size>0){const he=Zc(ge.width,ge.height,v.format,v.type);for(const ce of v.layerUpdates){const Ne=ge.data.subarray(ce*he/ge.data.BYTES_PER_ELEMENT,(ce+1)*he/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,ce,ge.width,ge.height,1,me,Ne)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,ge.width,ge.height,te.depth,me,ge.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,W,Ie,ge.width,ge.height,te.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?L&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,W,0,0,0,ge.width,ge.height,te.depth,me,Re,ge.data):t.texImage3D(r.TEXTURE_2D_ARRAY,W,Ie,ge.width,ge.height,te.depth,0,me,Re,ge.data)}else{Be&&st&&t.texStorage2D(r.TEXTURE_2D,oe,Ie,We[0].width,We[0].height);for(let W=0,Z=We.length;W<Z;W++)ge=We[W],v.format!==Yt?me!==null?Be?L&&t.compressedTexSubImage2D(r.TEXTURE_2D,W,0,0,ge.width,ge.height,me,ge.data):t.compressedTexImage2D(r.TEXTURE_2D,W,Ie,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?L&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,ge.width,ge.height,me,Re,ge.data):t.texImage2D(r.TEXTURE_2D,W,Ie,ge.width,ge.height,0,me,Re,ge.data)}else if(v.isDataArrayTexture)if(Be){if(st&&t.texStorage3D(r.TEXTURE_2D_ARRAY,oe,Ie,te.width,te.height,te.depth),L)if(v.layerUpdates.size>0){const W=Zc(te.width,te.height,v.format,v.type);for(const Z of v.layerUpdates){const he=te.data.subarray(Z*W/te.data.BYTES_PER_ELEMENT,(Z+1)*W/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Z,te.width,te.height,1,me,Re,he)}v.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,me,Re,te.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ie,te.width,te.height,te.depth,0,me,Re,te.data);else if(v.isData3DTexture)Be?(st&&t.texStorage3D(r.TEXTURE_3D,oe,Ie,te.width,te.height,te.depth),L&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,me,Re,te.data)):t.texImage3D(r.TEXTURE_3D,0,Ie,te.width,te.height,te.depth,0,me,Re,te.data);else if(v.isFramebufferTexture){if(st)if(Be)t.texStorage2D(r.TEXTURE_2D,oe,Ie,te.width,te.height);else{let W=te.width,Z=te.height;for(let he=0;he<oe;he++)t.texImage2D(r.TEXTURE_2D,he,Ie,W,Z,0,me,Re,null),W>>=1,Z>>=1}}else if(We.length>0){if(Be&&st){const W=Ee(We[0]);t.texStorage2D(r.TEXTURE_2D,oe,Ie,W.width,W.height)}for(let W=0,Z=We.length;W<Z;W++)ge=We[W],Be?L&&t.texSubImage2D(r.TEXTURE_2D,W,0,0,me,Re,ge):t.texImage2D(r.TEXTURE_2D,W,Ie,me,Re,ge);v.generateMipmaps=!1}else if(Be){if(st){const W=Ee(te);t.texStorage2D(r.TEXTURE_2D,oe,Ie,W.width,W.height)}L&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,me,Re,te)}else t.texImage2D(r.TEXTURE_2D,0,Ie,me,Re,te);m(v)&&f($),Se.__version=j.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ee(T,v,k){if(v.image.length!==6)return;const $=$e(T,v),Q=v.source;t.bindTexture(r.TEXTURE_CUBE_MAP,T.__webglTexture,r.TEXTURE0+k);const j=n.get(Q);if(Q.version!==j.__version||$===!0){t.activeTexture(r.TEXTURE0+k);const Se=Ge.getPrimaries(Ge.workingColorSpace),ae=v.colorSpace===Gn?null:Ge.getPrimaries(v.colorSpace),de=v.colorSpace===Gn||Se===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const qe=v.isCompressedTexture||v.image[0].isCompressedTexture,te=v.image[0]&&v.image[0].isDataTexture,me=[];for(let Z=0;Z<6;Z++)!qe&&!te?me[Z]=_(v.image[Z],!0,i.maxCubemapSize):me[Z]=te?v.image[Z].image:v.image[Z],me[Z]=ke(v,me[Z]);const Re=me[0],Ie=s.convert(v.format,v.colorSpace),ge=s.convert(v.type),We=E(v.internalFormat,Ie,ge,v.colorSpace),Be=v.isVideoTexture!==!0,st=j.__version===void 0||$===!0,L=Q.dataReady;let oe=D(v,Re);Fe(r.TEXTURE_CUBE_MAP,v);let W;if(qe){Be&&st&&t.texStorage2D(r.TEXTURE_CUBE_MAP,oe,We,Re.width,Re.height);for(let Z=0;Z<6;Z++){W=me[Z].mipmaps;for(let he=0;he<W.length;he++){const ce=W[he];v.format!==Yt?Ie!==null?Be?L&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,0,0,ce.width,ce.height,Ie,ce.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,We,ce.width,ce.height,0,ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,0,0,ce.width,ce.height,Ie,ge,ce.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,We,ce.width,ce.height,0,Ie,ge,ce.data)}}}else{if(W=v.mipmaps,Be&&st){W.length>0&&oe++;const Z=Ee(me[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,oe,We,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(te){Be?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,me[Z].width,me[Z].height,Ie,ge,me[Z].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,We,me[Z].width,me[Z].height,0,Ie,ge,me[Z].data);for(let he=0;he<W.length;he++){const Ne=W[he].image[Z].image;Be?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,0,0,Ne.width,Ne.height,Ie,ge,Ne.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,We,Ne.width,Ne.height,0,Ie,ge,Ne.data)}}else{Be?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Ie,ge,me[Z]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,We,Ie,ge,me[Z]);for(let he=0;he<W.length;he++){const ce=W[he];Be?L&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,0,0,Ie,ge,ce.image[Z]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,We,Ie,ge,ce.image[Z])}}}m(v)&&f(r.TEXTURE_CUBE_MAP),j.__version=Q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function _e(T,v,k,$,Q,j){const Se=s.convert(k.format,k.colorSpace),ae=s.convert(k.type),de=E(k.internalFormat,Se,ae,k.colorSpace),qe=n.get(v),te=n.get(k);if(te.__renderTarget=v,!qe.__hasExternalTextures){const me=Math.max(1,v.width>>j),Re=Math.max(1,v.height>>j);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,j,de,me,Re,v.depth,0,Se,ae,null):t.texImage2D(Q,j,de,me,Re,0,Se,ae,null)}t.bindFramebuffer(r.FRAMEBUFFER,T),fe(v)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,$,Q,te.__webglTexture,0,O(v)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,$,Q,te.__webglTexture,j),t.bindFramebuffer(r.FRAMEBUFFER,null)}function re(T,v,k){if(r.bindRenderbuffer(r.RENDERBUFFER,T),v.depthBuffer){const $=v.depthTexture,Q=$&&$.isDepthTexture?$.type:null,j=x(v.stencilBuffer,Q),Se=v.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ae=O(v);fe(v)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ae,j,v.width,v.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,ae,j,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,j,v.width,v.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Se,r.RENDERBUFFER,T)}else{const $=v.textures;for(let Q=0;Q<$.length;Q++){const j=$[Q],Se=s.convert(j.format,j.colorSpace),ae=s.convert(j.type),de=E(j.internalFormat,Se,ae,j.colorSpace),qe=O(v);k&&fe(v)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,qe,de,v.width,v.height):fe(v)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,qe,de,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,de,v.width,v.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Te(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=n.get(v.depthTexture);$.__renderTarget=v,(!$.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K(v.depthTexture,0);const Q=$.__webglTexture,j=O(v);if(v.depthTexture.format===Fi)fe(v)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(v.depthTexture.format===Xi)fe(v)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ce(T){const v=n.get(T),k=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const $=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),$){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,$.removeEventListener("dispose",Q)};$.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=$}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Te(v.__webglFramebuffer,T)}else if(k){v.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer[$]),v.__webglDepthbuffer[$]===void 0)v.__webglDepthbuffer[$]=r.createRenderbuffer(),re(v.__webglDepthbuffer[$],T,!1);else{const Q=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer[$];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,j)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=r.createRenderbuffer(),re(v.__webglDepthbuffer,T,!1);else{const $=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=v.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,Q)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Oe(T,v,k){const $=n.get(T);v!==void 0&&_e($.__webglFramebuffer,T,T.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&Ce(T)}function it(T){const v=T.texture,k=n.get(T),$=n.get(v);T.addEventListener("dispose",C);const Q=T.textures,j=T.isWebGLCubeRenderTarget===!0,Se=Q.length>1;if(Se||($.__webglTexture===void 0&&($.__webglTexture=r.createTexture()),$.__version=v.version,o.memory.textures++),j){k.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[ae]=[];for(let de=0;de<v.mipmaps.length;de++)k.__webglFramebuffer[ae][de]=r.createFramebuffer()}else k.__webglFramebuffer[ae]=r.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let ae=0;ae<v.mipmaps.length;ae++)k.__webglFramebuffer[ae]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(Se)for(let ae=0,de=Q.length;ae<de;ae++){const qe=n.get(Q[ae]);qe.__webglTexture===void 0&&(qe.__webglTexture=r.createTexture(),o.memory.textures++)}if(T.samples>0&&fe(T)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ae=0;ae<Q.length;ae++){const de=Q[ae];k.__webglColorRenderbuffer[ae]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[ae]);const qe=s.convert(de.format,de.colorSpace),te=s.convert(de.type),me=E(de.internalFormat,qe,te,de.colorSpace,T.isXRRenderTarget===!0),Re=O(T);r.renderbufferStorageMultisample(r.RENDERBUFFER,Re,me,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,k.__webglColorRenderbuffer[ae])}r.bindRenderbuffer(r.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),re(k.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){t.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture),Fe(r.TEXTURE_CUBE_MAP,v);for(let ae=0;ae<6;ae++)if(v.mipmaps&&v.mipmaps.length>0)for(let de=0;de<v.mipmaps.length;de++)_e(k.__webglFramebuffer[ae][de],T,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,de);else _e(k.__webglFramebuffer[ae],T,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(v)&&f(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ae=0,de=Q.length;ae<de;ae++){const qe=Q[ae],te=n.get(qe);t.bindTexture(r.TEXTURE_2D,te.__webglTexture),Fe(r.TEXTURE_2D,qe),_e(k.__webglFramebuffer,T,qe,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,0),m(qe)&&f(r.TEXTURE_2D)}t.unbindTexture()}else{let ae=r.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ae=T.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ae,$.__webglTexture),Fe(ae,v),v.mipmaps&&v.mipmaps.length>0)for(let de=0;de<v.mipmaps.length;de++)_e(k.__webglFramebuffer[de],T,v,r.COLOR_ATTACHMENT0,ae,de);else _e(k.__webglFramebuffer,T,v,r.COLOR_ATTACHMENT0,ae,0);m(v)&&f(ae),t.unbindTexture()}T.depthBuffer&&Ce(T)}function Ve(T){const v=T.textures;for(let k=0,$=v.length;k<$;k++){const Q=v[k];if(m(Q)){const j=S(T),Se=n.get(Q).__webglTexture;t.bindTexture(j,Se),f(j),t.unbindTexture()}}}const ct=[],U=[];function At(T){if(T.samples>0){if(fe(T)===!1){const v=T.textures,k=T.width,$=T.height;let Q=r.COLOR_BUFFER_BIT;const j=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Se=n.get(T),ae=v.length>1;if(ae)for(let de=0;de<v.length;de++)t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let de=0;de<v.length;de++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),ae){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Se.__webglColorRenderbuffer[de]);const qe=n.get(v[de]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,qe,0)}r.blitFramebuffer(0,0,k,$,0,0,k,$,Q,r.NEAREST),c===!0&&(ct.length=0,U.length=0,ct.push(r.COLOR_ATTACHMENT0+de),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ct.push(j),U.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,U)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ct))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ae)for(let de=0;de<v.length;de++){t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,Se.__webglColorRenderbuffer[de]);const qe=n.get(v[de]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,qe,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const v=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[v])}}}function O(T){return Math.min(i.maxSamples,T.samples)}function fe(T){const v=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function pe(T){const v=o.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function ke(T,v){const k=T.colorSpace,$=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==Pt&&k!==Gn&&(Ge.getTransfer(k)===nt?($!==Yt||Q!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),v}function Ee(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=V,this.setTexture2D=K,this.setTexture2DArray=X,this.setTexture3D=J,this.setTextureCube=G,this.rebindTextures=Oe,this.setupRenderTarget=it,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=fe}function q0(r,e){function t(n,i=Gn){let s;const o=Ge.getTransfer(i);if(n===Pn)return r.UNSIGNED_BYTE;if(n===xa)return r.UNSIGNED_SHORT_4_4_4_4;if(n===va)return r.UNSIGNED_SHORT_5_5_5_1;if(n===kl)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Fl)return r.BYTE;if(n===Ol)return r.SHORT;if(n===Ms)return r.UNSIGNED_SHORT;if(n===_a)return r.INT;if(n===di)return r.UNSIGNED_INT;if(n===rn)return r.FLOAT;if(n===As)return r.HALF_FLOAT;if(n===Bl)return r.ALPHA;if(n===zl)return r.RGB;if(n===Yt)return r.RGBA;if(n===Hl)return r.LUMINANCE;if(n===Vl)return r.LUMINANCE_ALPHA;if(n===Fi)return r.DEPTH_COMPONENT;if(n===Xi)return r.DEPTH_STENCIL;if(n===ya)return r.RED;if(n===Ma)return r.RED_INTEGER;if(n===Gl)return r.RG;if(n===Sa)return r.RG_INTEGER;if(n===ba)return r.RGBA_INTEGER;if(n===lr||n===hr||n===ur||n===dr)if(o===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===lr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===hr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ur)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===dr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===lr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===hr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ur)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===dr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Po||n===Lo||n===Do||n===No)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Po)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Lo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Do)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===No)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Uo||n===Fo||n===Oo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Uo||n===Fo)return o===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Oo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ko||n===Bo||n===zo||n===Ho||n===Vo||n===Go||n===Wo||n===Xo||n===qo||n===Yo||n===jo||n===Ko||n===$o||n===Zo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ko)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===zo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ho)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Vo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Go)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===qo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Yo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ko)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$o)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Zo)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fr||n===Jo||n===Qo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===fr)return o===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Jo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Wl||n===ea||n===ta||n===na)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===fr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ea)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ta)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===na)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Wi?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class Y0 extends vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class jt extends lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const j0={type:"move"};class to{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(j0)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const K0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$0=`
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

}`;class Z0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new xt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Kn({vertexShader:K0,fragmentShader:$0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Et(new br(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class J0 extends pi{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null;const _=new Z0,m=t.getContextAttributes();let f=null,S=null;const E=[],x=[],D=new Pe;let R=null;const C=new vt;C.viewport=new Ke;const P=new vt;P.viewport=new Ke;const b=[C,P],M=new Y0;let I=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ee=E[Y];return ee===void 0&&(ee=new to,E[Y]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(Y){let ee=E[Y];return ee===void 0&&(ee=new to,E[Y]=ee),ee.getGripSpace()},this.getHand=function(Y){let ee=E[Y];return ee===void 0&&(ee=new to,E[Y]=ee),ee.getHandSpace()};function B(Y){const ee=x.indexOf(Y.inputSource);if(ee===-1)return;const _e=E[ee];_e!==void 0&&(_e.update(Y.inputSource,Y.frame,l||o),_e.dispatchEvent({type:Y.type,data:Y.inputSource}))}function q(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",K);for(let Y=0;Y<E.length;Y++){const ee=x[Y];ee!==null&&(x[Y]=null,E[Y].disconnect(ee))}I=null,V=null,_.reset(),e.setRenderTarget(f),p=null,d=null,u=null,i=null,S=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(f=e.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",q),i.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(D),i.renderState.layers===void 0){const ee={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new fi(p.framebufferWidth,p.framebufferHeight,{format:Yt,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let ee=null,_e=null,re=null;m.depth&&(re=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=m.stencil?Xi:Fi,_e=m.stencil?Wi:di);const Te={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Te),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new fi(d.textureWidth,d.textureHeight,{format:Yt,type:Pn,depthTexture:new ih(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),$e.setContext(i),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function K(Y){for(let ee=0;ee<Y.removed.length;ee++){const _e=Y.removed[ee],re=x.indexOf(_e);re>=0&&(x[re]=null,E[re].disconnect(_e))}for(let ee=0;ee<Y.added.length;ee++){const _e=Y.added[ee];let re=x.indexOf(_e);if(re===-1){for(let Ce=0;Ce<E.length;Ce++)if(Ce>=x.length){x.push(_e),re=Ce;break}else if(x[Ce]===null){x[Ce]=_e,re=Ce;break}if(re===-1)break}const Te=E[re];Te&&Te.connect(_e)}}const X=new w,J=new w;function G(Y,ee,_e){X.setFromMatrixPosition(ee.matrixWorld),J.setFromMatrixPosition(_e.matrixWorld);const re=X.distanceTo(J),Te=ee.projectionMatrix.elements,Ce=_e.projectionMatrix.elements,Oe=Te[14]/(Te[10]-1),it=Te[14]/(Te[10]+1),Ve=(Te[9]+1)/Te[5],ct=(Te[9]-1)/Te[5],U=(Te[8]-1)/Te[0],At=(Ce[8]+1)/Ce[0],O=Oe*U,fe=Oe*At,pe=re/(-U+At),ke=pe*-U;if(ee.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ke),Y.translateZ(pe),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Te[10]===-1)Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const Ee=Oe+pe,T=it+pe,v=O-ke,k=fe+(re-ke),$=Ve*it/T*Ee,Q=ct*it/T*Ee;Y.projectionMatrix.makePerspective(v,k,$,Q,Ee,T),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function se(Y,ee){ee===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ee.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let ee=Y.near,_e=Y.far;_.texture!==null&&(_.depthNear>0&&(ee=_.depthNear),_.depthFar>0&&(_e=_.depthFar)),M.near=P.near=C.near=ee,M.far=P.far=C.far=_e,(I!==M.near||V!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,V=M.far),C.layers.mask=Y.layers.mask|2,P.layers.mask=Y.layers.mask|4,M.layers.mask=C.layers.mask|P.layers.mask;const re=Y.parent,Te=M.cameras;se(M,re);for(let Ce=0;Ce<Te.length;Ce++)se(Te[Ce],re);Te.length===2?G(M,C,P):M.projectionMatrix.copy(C.projectionMatrix),ue(Y,M,re)};function ue(Y,ee,_e){_e===null?Y.matrix.copy(ee.matrixWorld):(Y.matrix.copy(_e.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ee.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ee.projectionMatrix),Y.projectionMatrixInverse.copy(ee.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=qi*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let Me=null;function Fe(Y,ee){if(h=ee.getViewerPose(l||o),g=ee,h!==null){const _e=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let re=!1;_e.length!==M.cameras.length&&(M.cameras.length=0,re=!0);for(let Ce=0;Ce<_e.length;Ce++){const Oe=_e[Ce];let it=null;if(p!==null)it=p.getViewport(Oe);else{const ct=u.getViewSubImage(d,Oe);it=ct.viewport,Ce===0&&(e.setRenderTargetTextures(S,ct.colorTexture,d.ignoreDepthValues?void 0:ct.depthStencilTexture),e.setRenderTarget(S))}let Ve=b[Ce];Ve===void 0&&(Ve=new vt,Ve.layers.enable(Ce),Ve.viewport=new Ke,b[Ce]=Ve),Ve.matrix.fromArray(Oe.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(Oe.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(it.x,it.y,it.width,it.height),Ce===0&&(M.matrix.copy(Ve.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),re===!0&&M.cameras.push(Ve)}const Te=i.enabledFeatures;if(Te&&Te.includes("depth-sensing")){const Ce=u.getDepthInformation(_e[0]);Ce&&Ce.isValid&&Ce.texture&&_.init(e,Ce,i.renderState)}}for(let _e=0;_e<E.length;_e++){const re=x[_e],Te=E[_e];re!==null&&Te!==void 0&&Te.update(re,ee,l||o)}Me&&Me(Y,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),g=null}const $e=new nh;$e.setAnimationLoop(Fe),this.setAnimationLoop=function(Y){Me=Y},this.dispose=function(){}}}const ii=new Kt,Q0=new Ae;function eg(r,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Ql(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,S,E,x){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,S,E):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ut&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ut&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=e.get(f),E=S.envMap,x=S.envMapRotation;E&&(m.envMap.value=E,ii.copy(x),ii.x*=-1,ii.y*=-1,ii.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),m.envMapRotation.value.setFromMatrix4(Q0.makeRotationFromEuler(ii)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,S,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=E*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ut&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function tg(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,E){const x=E.program;n.uniformBlockBinding(S,x)}function l(S,E){let x=i[S.id];x===void 0&&(g(S),x=h(S),i[S.id]=x,S.addEventListener("dispose",m));const D=E.program;n.updateUBOMapping(S,D);const R=e.render.frame;s[S.id]!==R&&(d(S),s[S.id]=R)}function h(S){const E=u();S.__bindingPointIndex=E;const x=r.createBuffer(),D=S.__size,R=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,D,R),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,E,x),x}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const E=i[S.id],x=S.uniforms,D=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,E);for(let R=0,C=x.length;R<C;R++){const P=Array.isArray(x[R])?x[R]:[x[R]];for(let b=0,M=P.length;b<M;b++){const I=P[b];if(p(I,R,b,D)===!0){const V=I.__offset,B=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let K=0;K<B.length;K++){const X=B[K],J=_(X);typeof X=="number"||typeof X=="boolean"?(I.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,V+q,I.__data)):X.isMatrix3?(I.__data[0]=X.elements[0],I.__data[1]=X.elements[1],I.__data[2]=X.elements[2],I.__data[3]=0,I.__data[4]=X.elements[3],I.__data[5]=X.elements[4],I.__data[6]=X.elements[5],I.__data[7]=0,I.__data[8]=X.elements[6],I.__data[9]=X.elements[7],I.__data[10]=X.elements[8],I.__data[11]=0):(X.toArray(I.__data,q),q+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,V,I.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(S,E,x,D){const R=S.value,C=E+"_"+x;if(D[C]===void 0)return typeof R=="number"||typeof R=="boolean"?D[C]=R:D[C]=R.clone(),!0;{const P=D[C];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return D[C]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(S){const E=S.uniforms;let x=0;const D=16;for(let C=0,P=E.length;C<P;C++){const b=Array.isArray(E[C])?E[C]:[E[C]];for(let M=0,I=b.length;M<I;M++){const V=b[M],B=Array.isArray(V.value)?V.value:[V.value];for(let q=0,K=B.length;q<K;q++){const X=B[q],J=_(X),G=x%D,se=G%J.boundary,ue=G+se;x+=se,ue!==0&&D-ue<J.storage&&(x+=D-ue),V.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=x,x+=J.storage}}}const R=x%D;return R>0&&(x+=D-R),S.__size=x,S.__cache={},this}function _(S){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),E}function m(S){const E=S.target;E.removeEventListener("dispose",m);const x=o.indexOf(E.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[E.id]),delete i[E.id],delete s[E.id]}function f(){for(const S in i)r.deleteBuffer(i[S]);o=[],i={},s={}}return{bind:c,update:l,dispose:f}}class ch{constructor(e={}){const{canvas:t=Gu(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const S=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ft,this.toneMapping=Yn,this.toneMappingExposure=1;const x=this;let D=!1,R=0,C=0,P=null,b=-1,M=null;const I=new Ke,V=new Ke;let B=null;const q=new we(0);let K=0,X=t.width,J=t.height,G=1,se=null,ue=null;const Me=new Ke(0,0,X,J),Fe=new Ke(0,0,X,J);let $e=!1;const Y=new Ia;let ee=!1,_e=!1;const re=new Ae,Te=new Ae,Ce=new w,Oe=new Ke,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function ct(){return P===null?G:1}let U=n;function At(y,N){return t.getContext(y,N)}try{const y={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ma}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",he,!1),t.addEventListener("webglcontextcreationerror",ce,!1),U===null){const N="webgl2";if(U=At(N,y),U===null)throw At(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let O,fe,pe,ke,Ee,T,v,k,$,Q,j,Se,ae,de,qe,te,me,Re,Ie,ge,We,Be,st,L;function oe(){O=new am(U),O.init(),Be=new q0(U,O),fe=new tm(U,O,e,Be),pe=new G0(U,O),fe.reverseDepthBuffer&&d&&pe.buffers.depth.setReversed(!0),ke=new hm(U),Ee=new R0,T=new X0(U,O,pe,Ee,fe,Be,ke),v=new im(x),k=new om(x),$=new gd(U),st=new Qp(U,$),Q=new cm(U,$,ke,st),j=new dm(U,Q,$,ke),Ie=new um(U,fe,T),te=new nm(Ee),Se=new w0(x,v,k,O,fe,st,te),ae=new eg(x,Ee),de=new I0,qe=new F0(O),Re=new Jp(x,v,k,pe,j,p,c),me=new H0(x,j,fe),L=new tg(U,ke,fe,pe),ge=new em(U,O,ke),We=new lm(U,O,ke),ke.programs=Se.programs,x.capabilities=fe,x.extensions=O,x.properties=Ee,x.renderLists=de,x.shadowMap=me,x.state=pe,x.info=ke}oe();const W=new J0(x,U);this.xr=W,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const y=O.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=O.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(y){y!==void 0&&(G=y,this.setSize(X,J,!1))},this.getSize=function(y){return y.set(X,J)},this.setSize=function(y,N,z=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=y,J=N,t.width=Math.floor(y*G),t.height=Math.floor(N*G),z===!0&&(t.style.width=y+"px",t.style.height=N+"px"),this.setViewport(0,0,y,N)},this.getDrawingBufferSize=function(y){return y.set(X*G,J*G).floor()},this.setDrawingBufferSize=function(y,N,z){X=y,J=N,G=z,t.width=Math.floor(y*z),t.height=Math.floor(N*z),this.setViewport(0,0,y,N)},this.getCurrentViewport=function(y){return y.copy(I)},this.getViewport=function(y){return y.copy(Me)},this.setViewport=function(y,N,z,H){y.isVector4?Me.set(y.x,y.y,y.z,y.w):Me.set(y,N,z,H),pe.viewport(I.copy(Me).multiplyScalar(G).round())},this.getScissor=function(y){return y.copy(Fe)},this.setScissor=function(y,N,z,H){y.isVector4?Fe.set(y.x,y.y,y.z,y.w):Fe.set(y,N,z,H),pe.scissor(V.copy(Fe).multiplyScalar(G).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(y){pe.setScissorTest($e=y)},this.setOpaqueSort=function(y){se=y},this.setTransparentSort=function(y){ue=y},this.getClearColor=function(y){return y.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(y=!0,N=!0,z=!0){let H=0;if(y){let F=!1;if(P!==null){const ne=P.texture.format;F=ne===ba||ne===Sa||ne===Ma}if(F){const ne=P.texture.type,le=ne===Pn||ne===di||ne===Ms||ne===Wi||ne===xa||ne===va,xe=Re.getClearColor(),ve=Re.getClearAlpha(),Le=xe.r,Ue=xe.g,ye=xe.b;le?(g[0]=Le,g[1]=Ue,g[2]=ye,g[3]=ve,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=Le,_[1]=Ue,_[2]=ye,_[3]=ve,U.clearBufferiv(U.COLOR,0,_))}else H|=U.COLOR_BUFFER_BIT}N&&(H|=U.DEPTH_BUFFER_BIT),z&&(H|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",he,!1),t.removeEventListener("webglcontextcreationerror",ce,!1),de.dispose(),qe.dispose(),Ee.dispose(),v.dispose(),k.dispose(),j.dispose(),st.dispose(),L.dispose(),Se.dispose(),W.dispose(),W.removeEventListener("sessionstart",Xa),W.removeEventListener("sessionend",qa),$n.stop()};function Z(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),D=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),D=!1;const y=ke.autoReset,N=me.enabled,z=me.autoUpdate,H=me.needsUpdate,F=me.type;oe(),ke.autoReset=y,me.enabled=N,me.autoUpdate=z,me.needsUpdate=H,me.type=F}function ce(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ne(y){const N=y.target;N.removeEventListener("dispose",Ne),ht(N)}function ht(y){yt(y),Ee.remove(y)}function yt(y){const N=Ee.get(y).programs;N!==void 0&&(N.forEach(function(z){Se.releaseProgram(z)}),y.isShaderMaterial&&Se.releaseShaderCache(y))}this.renderBufferDirect=function(y,N,z,H,F,ne){N===null&&(N=it);const le=F.isMesh&&F.matrixWorld.determinant()<0,xe=Ah(y,N,z,H,F);pe.setMaterial(H,le);let ve=z.index,Le=1;if(H.wireframe===!0){if(ve=Q.getWireframeAttribute(z),ve===void 0)return;Le=2}const Ue=z.drawRange,ye=z.attributes.position;let je=Ue.start*Le,rt=(Ue.start+Ue.count)*Le;ne!==null&&(je=Math.max(je,ne.start*Le),rt=Math.min(rt,(ne.start+ne.count)*Le)),ve!==null?(je=Math.max(je,0),rt=Math.min(rt,ve.count)):ye!=null&&(je=Math.max(je,0),rt=Math.min(rt,ye.count));const ot=rt-je;if(ot<0||ot===1/0)return;st.setup(F,H,xe,z,ve);let Lt,Ze=ge;if(ve!==null&&(Lt=$.get(ve),Ze=We,Ze.setIndex(Lt)),F.isMesh)H.wireframe===!0?(pe.setLineWidth(H.wireframeLinewidth*ct()),Ze.setMode(U.LINES)):Ze.setMode(U.TRIANGLES);else if(F.isLine){let be=H.linewidth;be===void 0&&(be=1),pe.setLineWidth(be*ct()),F.isLineSegments?Ze.setMode(U.LINES):F.isLineLoop?Ze.setMode(U.LINE_LOOP):Ze.setMode(U.LINE_STRIP)}else F.isPoints?Ze.setMode(U.POINTS):F.isSprite&&Ze.setMode(U.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Ze.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(O.get("WEBGL_multi_draw"))Ze.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const be=F._multiDrawStarts,gn=F._multiDrawCounts,Je=F._multiDrawCount,Zt=ve?$.get(ve).bytesPerElement:1,mi=Ee.get(H).currentProgram.getUniforms();for(let Ot=0;Ot<Je;Ot++)mi.setValue(U,"_gl_DrawID",Ot),Ze.render(be[Ot]/Zt,gn[Ot])}else if(F.isInstancedMesh)Ze.renderInstances(je,ot,F.count);else if(z.isInstancedBufferGeometry){const be=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,gn=Math.min(z.instanceCount,be);Ze.renderInstances(je,ot,gn)}else Ze.render(je,ot)};function et(y,N,z){y.transparent===!0&&y.side===tn&&y.forceSinglePass===!1?(y.side=Ut,y.needsUpdate=!0,Ls(y,N,z),y.side=In,y.needsUpdate=!0,Ls(y,N,z),y.side=tn):Ls(y,N,z)}this.compile=function(y,N,z=null){z===null&&(z=y),f=qe.get(z),f.init(N),E.push(f),z.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),y!==z&&y.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();const H=new Set;return y.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ne=F.material;if(ne)if(Array.isArray(ne))for(let le=0;le<ne.length;le++){const xe=ne[le];et(xe,z,F),H.add(xe)}else et(ne,z,F),H.add(ne)}),E.pop(),f=null,H},this.compileAsync=function(y,N,z=null){const H=this.compile(y,N,z);return new Promise(F=>{function ne(){if(H.forEach(function(le){Ee.get(le).currentProgram.isReady()&&H.delete(le)}),H.size===0){F(y);return}setTimeout(ne,10)}O.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let $t=null;function mn(y){$t&&$t(y)}function Xa(){$n.stop()}function qa(){$n.start()}const $n=new nh;$n.setAnimationLoop(mn),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(y){$t=y,W.setAnimationLoop(y),y===null?$n.stop():$n.start()},W.addEventListener("sessionstart",Xa),W.addEventListener("sessionend",qa),this.render=function(y,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(N),N=W.getCamera()),y.isScene===!0&&y.onBeforeRender(x,y,N,P),f=qe.get(y,E.length),f.init(N),E.push(f),Te.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Y.setFromProjectionMatrix(Te),_e=this.localClippingEnabled,ee=te.init(this.clippingPlanes,_e),m=de.get(y,S.length),m.init(),S.push(m),W.enabled===!0&&W.isPresenting===!0){const ne=x.xr.getDepthSensingMesh();ne!==null&&Ar(ne,N,-1/0,x.sortObjects)}Ar(y,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(se,ue),Ve=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ve&&Re.addToRenderList(m,y),this.info.render.frame++,ee===!0&&te.beginShadows();const z=f.state.shadowsArray;me.render(z,y,N),ee===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,F=m.transmissive;if(f.setupLights(),N.isArrayCamera){const ne=N.cameras;if(F.length>0)for(let le=0,xe=ne.length;le<xe;le++){const ve=ne[le];ja(H,F,y,ve)}Ve&&Re.render(y);for(let le=0,xe=ne.length;le<xe;le++){const ve=ne[le];Ya(m,y,ve,ve.viewport)}}else F.length>0&&ja(H,F,y,N),Ve&&Re.render(y),Ya(m,y,N);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),y.isScene===!0&&y.onAfterRender(x,y,N),st.resetDefaultState(),b=-1,M=null,E.pop(),E.length>0?(f=E[E.length-1],ee===!0&&te.setGlobalState(x.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Ar(y,N,z,H){if(y.visible===!1)return;if(y.layers.test(N.layers)){if(y.isGroup)z=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(N);else if(y.isLight)f.pushLight(y),y.castShadow&&f.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||Y.intersectsSprite(y)){H&&Oe.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Te);const le=j.update(y),xe=y.material;xe.visible&&m.push(y,le,xe,z,Oe.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||Y.intersectsObject(y))){const le=j.update(y),xe=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Oe.copy(y.boundingSphere.center)):(le.boundingSphere===null&&le.computeBoundingSphere(),Oe.copy(le.boundingSphere.center)),Oe.applyMatrix4(y.matrixWorld).applyMatrix4(Te)),Array.isArray(xe)){const ve=le.groups;for(let Le=0,Ue=ve.length;Le<Ue;Le++){const ye=ve[Le],je=xe[ye.materialIndex];je&&je.visible&&m.push(y,le,je,z,Oe.z,ye)}}else xe.visible&&m.push(y,le,xe,z,Oe.z,null)}}const ne=y.children;for(let le=0,xe=ne.length;le<xe;le++)Ar(ne[le],N,z,H)}function Ya(y,N,z,H){const F=y.opaque,ne=y.transmissive,le=y.transparent;f.setupLightsView(z),ee===!0&&te.setGlobalState(x.clippingPlanes,z),H&&pe.viewport(I.copy(H)),F.length>0&&Ps(F,N,z),ne.length>0&&Ps(ne,N,z),le.length>0&&Ps(le,N,z),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function ja(y,N,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new fi(1,1,{generateMipmaps:!0,type:O.has("EXT_color_buffer_half_float")||O.has("EXT_color_buffer_float")?As:Pn,minFilter:wn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ge.workingColorSpace}));const ne=f.state.transmissionRenderTarget[H.id],le=H.viewport||I;ne.setSize(le.z,le.w);const xe=x.getRenderTarget();x.setRenderTarget(ne),x.getClearColor(q),K=x.getClearAlpha(),K<1&&x.setClearColor(16777215,.5),x.clear(),Ve&&Re.render(z);const ve=x.toneMapping;x.toneMapping=Yn;const Le=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),ee===!0&&te.setGlobalState(x.clippingPlanes,H),Ps(y,z,H),T.updateMultisampleRenderTarget(ne),T.updateRenderTargetMipmap(ne),O.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let ye=0,je=N.length;ye<je;ye++){const rt=N[ye],ot=rt.object,Lt=rt.geometry,Ze=rt.material,be=rt.group;if(Ze.side===tn&&ot.layers.test(H.layers)){const gn=Ze.side;Ze.side=Ut,Ze.needsUpdate=!0,Ka(ot,z,H,Lt,Ze,be),Ze.side=gn,Ze.needsUpdate=!0,Ue=!0}}Ue===!0&&(T.updateMultisampleRenderTarget(ne),T.updateRenderTargetMipmap(ne))}x.setRenderTarget(xe),x.setClearColor(q,K),Le!==void 0&&(H.viewport=Le),x.toneMapping=ve}function Ps(y,N,z){const H=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ne=y.length;F<ne;F++){const le=y[F],xe=le.object,ve=le.geometry,Le=H===null?le.material:H,Ue=le.group;xe.layers.test(z.layers)&&Ka(xe,N,z,ve,Le,Ue)}}function Ka(y,N,z,H,F,ne){y.onBeforeRender(x,N,z,H,F,ne),y.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),F.onBeforeRender(x,N,z,H,y,ne),F.transparent===!0&&F.side===tn&&F.forceSinglePass===!1?(F.side=Ut,F.needsUpdate=!0,x.renderBufferDirect(z,N,H,F,y,ne),F.side=In,F.needsUpdate=!0,x.renderBufferDirect(z,N,H,F,y,ne),F.side=tn):x.renderBufferDirect(z,N,H,F,y,ne),y.onAfterRender(x,N,z,H,F,ne)}function Ls(y,N,z){N.isScene!==!0&&(N=it);const H=Ee.get(y),F=f.state.lights,ne=f.state.shadowsArray,le=F.state.version,xe=Se.getParameters(y,F.state,ne,N,z),ve=Se.getProgramCacheKey(xe);let Le=H.programs;H.environment=y.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(y.isMeshStandardMaterial?k:v).get(y.envMap||H.environment),H.envMapRotation=H.environment!==null&&y.envMap===null?N.environmentRotation:y.envMapRotation,Le===void 0&&(y.addEventListener("dispose",Ne),Le=new Map,H.programs=Le);let Ue=Le.get(ve);if(Ue!==void 0){if(H.currentProgram===Ue&&H.lightsStateVersion===le)return Za(y,xe),Ue}else xe.uniforms=Se.getUniforms(y),y.onBeforeCompile(xe,x),Ue=Se.acquireProgram(xe,ve),Le.set(ve,Ue),H.uniforms=xe.uniforms;const ye=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(ye.clippingPlanes=te.uniform),Za(y,xe),H.needsLights=Rh(y),H.lightsStateVersion=le,H.needsLights&&(ye.ambientLightColor.value=F.state.ambient,ye.lightProbe.value=F.state.probe,ye.directionalLights.value=F.state.directional,ye.directionalLightShadows.value=F.state.directionalShadow,ye.spotLights.value=F.state.spot,ye.spotLightShadows.value=F.state.spotShadow,ye.rectAreaLights.value=F.state.rectArea,ye.ltc_1.value=F.state.rectAreaLTC1,ye.ltc_2.value=F.state.rectAreaLTC2,ye.pointLights.value=F.state.point,ye.pointLightShadows.value=F.state.pointShadow,ye.hemisphereLights.value=F.state.hemi,ye.directionalShadowMap.value=F.state.directionalShadowMap,ye.directionalShadowMatrix.value=F.state.directionalShadowMatrix,ye.spotShadowMap.value=F.state.spotShadowMap,ye.spotLightMatrix.value=F.state.spotLightMatrix,ye.spotLightMap.value=F.state.spotLightMap,ye.pointShadowMap.value=F.state.pointShadowMap,ye.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Ue,H.uniformsList=null,Ue}function $a(y){if(y.uniformsList===null){const N=y.currentProgram.getUniforms();y.uniformsList=pr.seqWithValue(N.seq,y.uniforms)}return y.uniformsList}function Za(y,N){const z=Ee.get(y);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function Ah(y,N,z,H,F){N.isScene!==!0&&(N=it),T.resetTextureUnits();const ne=N.fog,le=H.isMeshStandardMaterial?N.environment:null,xe=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Pt,ve=(H.isMeshStandardMaterial?k:v).get(H.envMap||le),Le=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ue=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),ye=!!z.morphAttributes.position,je=!!z.morphAttributes.normal,rt=!!z.morphAttributes.color;let ot=Yn;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ot=x.toneMapping);const Lt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Ze=Lt!==void 0?Lt.length:0,be=Ee.get(H),gn=f.state.lights;if(ee===!0&&(_e===!0||y!==M)){const Wt=y===M&&H.id===b;te.setState(H,y,Wt)}let Je=!1;H.version===be.__version?(be.needsLights&&be.lightsStateVersion!==gn.state.version||be.outputColorSpace!==xe||F.isBatchedMesh&&be.batching===!1||!F.isBatchedMesh&&be.batching===!0||F.isBatchedMesh&&be.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&be.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&be.instancing===!1||!F.isInstancedMesh&&be.instancing===!0||F.isSkinnedMesh&&be.skinning===!1||!F.isSkinnedMesh&&be.skinning===!0||F.isInstancedMesh&&be.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&be.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&be.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&be.instancingMorph===!1&&F.morphTexture!==null||be.envMap!==ve||H.fog===!0&&be.fog!==ne||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==te.numPlanes||be.numIntersection!==te.numIntersection)||be.vertexAlphas!==Le||be.vertexTangents!==Ue||be.morphTargets!==ye||be.morphNormals!==je||be.morphColors!==rt||be.toneMapping!==ot||be.morphTargetsCount!==Ze)&&(Je=!0):(Je=!0,be.__version=H.version);let Zt=be.currentProgram;Je===!0&&(Zt=Ls(H,N,F));let mi=!1,Ot=!1,ts=!1;const at=Zt.getUniforms(),ln=be.uniforms;if(pe.useProgram(Zt.program)&&(mi=!0,Ot=!0,ts=!0),H.id!==b&&(b=H.id,Ot=!0),mi||M!==y){pe.buffers.depth.getReversed()?(re.copy(y.projectionMatrix),Xu(re),qu(re),at.setValue(U,"projectionMatrix",re)):at.setValue(U,"projectionMatrix",y.projectionMatrix),at.setValue(U,"viewMatrix",y.matrixWorldInverse);const Ln=at.map.cameraPosition;Ln!==void 0&&Ln.setValue(U,Ce.setFromMatrixPosition(y.matrixWorld)),fe.logarithmicDepthBuffer&&at.setValue(U,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&at.setValue(U,"isOrthographic",y.isOrthographicCamera===!0),M!==y&&(M=y,Ot=!0,ts=!0)}if(F.isSkinnedMesh){at.setOptional(U,F,"bindMatrix"),at.setOptional(U,F,"bindMatrixInverse");const Wt=F.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),at.setValue(U,"boneTexture",Wt.boneTexture,T))}F.isBatchedMesh&&(at.setOptional(U,F,"batchingTexture"),at.setValue(U,"batchingTexture",F._matricesTexture,T),at.setOptional(U,F,"batchingIdTexture"),at.setValue(U,"batchingIdTexture",F._indirectTexture,T),at.setOptional(U,F,"batchingColorTexture"),F._colorsTexture!==null&&at.setValue(U,"batchingColorTexture",F._colorsTexture,T));const ns=z.morphAttributes;if((ns.position!==void 0||ns.normal!==void 0||ns.color!==void 0)&&Ie.update(F,z,Zt),(Ot||be.receiveShadow!==F.receiveShadow)&&(be.receiveShadow=F.receiveShadow,at.setValue(U,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(ln.envMap.value=ve,ln.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(ln.envMapIntensity.value=N.environmentIntensity),Ot&&(at.setValue(U,"toneMappingExposure",x.toneMappingExposure),be.needsLights&&wh(ln,ts),ne&&H.fog===!0&&ae.refreshFogUniforms(ln,ne),ae.refreshMaterialUniforms(ln,H,G,J,f.state.transmissionRenderTarget[y.id]),pr.upload(U,$a(be),ln,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(pr.upload(U,$a(be),ln,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&at.setValue(U,"center",F.center),at.setValue(U,"modelViewMatrix",F.modelViewMatrix),at.setValue(U,"normalMatrix",F.normalMatrix),at.setValue(U,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Wt=H.uniformsGroups;for(let Ln=0,Dn=Wt.length;Ln<Dn;Ln++){const Ja=Wt[Ln];L.update(Ja,Zt),L.bind(Ja,Zt)}}return Zt}function wh(y,N){y.ambientLightColor.needsUpdate=N,y.lightProbe.needsUpdate=N,y.directionalLights.needsUpdate=N,y.directionalLightShadows.needsUpdate=N,y.pointLights.needsUpdate=N,y.pointLightShadows.needsUpdate=N,y.spotLights.needsUpdate=N,y.spotLightShadows.needsUpdate=N,y.rectAreaLights.needsUpdate=N,y.hemisphereLights.needsUpdate=N}function Rh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(y,N,z){Ee.get(y.texture).__webglTexture=N,Ee.get(y.depthTexture).__webglTexture=z;const H=Ee.get(y);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||O.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,N){const z=Ee.get(y);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(y,N=0,z=0){P=y,R=N,C=z;let H=!0,F=null,ne=!1,le=!1;if(y){const ve=Ee.get(y);if(ve.__useDefaultFramebuffer!==void 0)pe.bindFramebuffer(U.FRAMEBUFFER,null),H=!1;else if(ve.__webglFramebuffer===void 0)T.setupRenderTarget(y);else if(ve.__hasExternalTextures)T.rebindTextures(y,Ee.get(y.texture).__webglTexture,Ee.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const ye=y.depthTexture;if(ve.__boundDepthTexture!==ye){if(ye!==null&&Ee.has(ye)&&(y.width!==ye.image.width||y.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(y)}}const Le=y.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(le=!0);const Ue=Ee.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Ue[N])?F=Ue[N][z]:F=Ue[N],ne=!0):y.samples>0&&T.useMultisampledRTT(y)===!1?F=Ee.get(y).__webglMultisampledFramebuffer:Array.isArray(Ue)?F=Ue[z]:F=Ue,I.copy(y.viewport),V.copy(y.scissor),B=y.scissorTest}else I.copy(Me).multiplyScalar(G).floor(),V.copy(Fe).multiplyScalar(G).floor(),B=$e;if(pe.bindFramebuffer(U.FRAMEBUFFER,F)&&H&&pe.drawBuffers(y,F),pe.viewport(I),pe.scissor(V),pe.setScissorTest(B),ne){const ve=Ee.get(y.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,ve.__webglTexture,z)}else if(le){const ve=Ee.get(y.texture),Le=N||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,ve.__webglTexture,z||0,Le)}b=-1},this.readRenderTargetPixels=function(y,N,z,H,F,ne,le){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Ee.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&le!==void 0&&(xe=xe[le]),xe){pe.bindFramebuffer(U.FRAMEBUFFER,xe);try{const ve=y.texture,Le=ve.format,Ue=ve.type;if(!fe.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!fe.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=y.width-H&&z>=0&&z<=y.height-F&&U.readPixels(N,z,H,F,Be.convert(Le),Be.convert(Ue),ne)}finally{const ve=P!==null?Ee.get(P).__webglFramebuffer:null;pe.bindFramebuffer(U.FRAMEBUFFER,ve)}}},this.readRenderTargetPixelsAsync=async function(y,N,z,H,F,ne,le){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Ee.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&le!==void 0&&(xe=xe[le]),xe){const ve=y.texture,Le=ve.format,Ue=ve.type;if(!fe.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!fe.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=y.width-H&&z>=0&&z<=y.height-F){pe.bindFramebuffer(U.FRAMEBUFFER,xe);const ye=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ye),U.bufferData(U.PIXEL_PACK_BUFFER,ne.byteLength,U.STREAM_READ),U.readPixels(N,z,H,F,Be.convert(Le),Be.convert(Ue),0);const je=P!==null?Ee.get(P).__webglFramebuffer:null;pe.bindFramebuffer(U.FRAMEBUFFER,je);const rt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Wu(U,rt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ye),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ne),U.deleteBuffer(ye),U.deleteSync(rt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(y,N=null,z=0){y.isTexture!==!0&&(gs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,y=arguments[1]);const H=Math.pow(2,-z),F=Math.floor(y.image.width*H),ne=Math.floor(y.image.height*H),le=N!==null?N.x:0,xe=N!==null?N.y:0;T.setTexture2D(y,0),U.copyTexSubImage2D(U.TEXTURE_2D,z,0,0,le,xe,F,ne),pe.unbindTexture()},this.copyTextureToTexture=function(y,N,z=null,H=null,F=0){y.isTexture!==!0&&(gs("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,y=arguments[1],N=arguments[2],F=arguments[3]||0,z=null);let ne,le,xe,ve,Le,Ue,ye,je,rt;const ot=y.isCompressedTexture?y.mipmaps[F]:y.image;z!==null?(ne=z.max.x-z.min.x,le=z.max.y-z.min.y,xe=z.isBox3?z.max.z-z.min.z:1,ve=z.min.x,Le=z.min.y,Ue=z.isBox3?z.min.z:0):(ne=ot.width,le=ot.height,xe=ot.depth||1,ve=0,Le=0,Ue=0),H!==null?(ye=H.x,je=H.y,rt=H.z):(ye=0,je=0,rt=0);const Lt=Be.convert(N.format),Ze=Be.convert(N.type);let be;N.isData3DTexture?(T.setTexture3D(N,0),be=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),be=U.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),be=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const gn=U.getParameter(U.UNPACK_ROW_LENGTH),Je=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Zt=U.getParameter(U.UNPACK_SKIP_PIXELS),mi=U.getParameter(U.UNPACK_SKIP_ROWS),Ot=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ot.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ot.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,ve),U.pixelStorei(U.UNPACK_SKIP_ROWS,Le),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ue);const ts=y.isDataArrayTexture||y.isData3DTexture,at=N.isDataArrayTexture||N.isData3DTexture;if(y.isRenderTargetTexture||y.isDepthTexture){const ln=Ee.get(y),ns=Ee.get(N),Wt=Ee.get(ln.__renderTarget),Ln=Ee.get(ns.__renderTarget);pe.bindFramebuffer(U.READ_FRAMEBUFFER,Wt.__webglFramebuffer),pe.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let Dn=0;Dn<xe;Dn++)ts&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ee.get(y).__webglTexture,F,Ue+Dn),y.isDepthTexture?(at&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ee.get(N).__webglTexture,F,rt+Dn),U.blitFramebuffer(ve,Le,ne,le,ye,je,ne,le,U.DEPTH_BUFFER_BIT,U.NEAREST)):at?U.copyTexSubImage3D(be,F,ye,je,rt+Dn,ve,Le,ne,le):U.copyTexSubImage2D(be,F,ye,je,rt+Dn,ve,Le,ne,le);pe.bindFramebuffer(U.READ_FRAMEBUFFER,null),pe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else at?y.isDataTexture||y.isData3DTexture?U.texSubImage3D(be,F,ye,je,rt,ne,le,xe,Lt,Ze,ot.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(be,F,ye,je,rt,ne,le,xe,Lt,ot.data):U.texSubImage3D(be,F,ye,je,rt,ne,le,xe,Lt,Ze,ot):y.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,F,ye,je,ne,le,Lt,Ze,ot.data):y.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,F,ye,je,ot.width,ot.height,Lt,ot.data):U.texSubImage2D(U.TEXTURE_2D,F,ye,je,ne,le,Lt,Ze,ot);U.pixelStorei(U.UNPACK_ROW_LENGTH,gn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Je),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Zt),U.pixelStorei(U.UNPACK_SKIP_ROWS,mi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ot),F===0&&N.generateMipmaps&&U.generateMipmap(be),pe.unbindTexture()},this.copyTextureToTexture3D=function(y,N,z=null,H=null,F=0){return y.isTexture!==!0&&(gs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,y=arguments[2],N=arguments[3],F=arguments[4]||0),gs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,N,z,H,F)},this.initRenderTarget=function(y){Ee.get(y).__webglFramebuffer===void 0&&T.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),pe.unbindTexture()},this.resetState=function(){R=0,C=0,P=null,pe.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ge._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ge._getUnpackColorSpace()}}class lh extends lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kt,this.environmentIntensity=1,this.environmentRotation=new Kt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ng{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=sa,this.updateRanges=[],this.version=0,this.uuid=an()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=an()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wt=new w;class Da{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=nn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=nn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=nn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=nn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=nn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new It(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Da(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Jc=new w,Qc=new Ke,el=new Ke,ig=new w,tl=new Ae,Qs=new w,no=new dn,nl=new Ae,io=new ws;class sg extends Et{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ic,this.bindMatrix=new Ae,this.bindMatrixInverse=new Ae,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ft),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Qs),this.boundingBox.expandByPoint(Qs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new dn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Qs),this.boundingSphere.expandByPoint(Qs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),no.copy(this.boundingSphere),no.applyMatrix4(i),e.ray.intersectsSphere(no)!==!1&&(nl.copy(i).invert(),io.copy(e.ray).applyMatrix4(nl),!(this.boundingBox!==null&&io.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,io)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ke,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ic?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===fu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Qc.fromBufferAttribute(i.attributes.skinIndex,e),el.fromBufferAttribute(i.attributes.skinWeight,e),Jc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=el.getComponent(s);if(o!==0){const a=Qc.getComponent(s);tl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(ig.copy(Jc).applyMatrix4(tl),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class hh extends lt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class uh extends xt{constructor(e=null,t=1,n=1,i,s,o,a,c,l=Ct,h=Ct,u,d){super(null,o,a,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const il=new Ae,rg=new Ae;class Na{constructor(e=[],t=[]){this.uuid=an(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ae)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ae;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:rg;il.multiplyMatrices(a,t[s]),il.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Na(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new uh(t,e,e,Yt,rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new hh),this.bones.push(o),this.boneInverses.push(new Ae().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class oa extends It{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ii=new Ae,sl=new Ae,er=[],rl=new Ft,og=new Ae,as=new Et,cs=new dn;class ag extends Et{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new oa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,og)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ft),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),rl.copy(e.boundingBox).applyMatrix4(Ii),this.boundingBox.union(rl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new dn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ii),cs.copy(e.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(cs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(as.geometry=this.geometry,as.material=this.material,as.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cs.copy(this.boundingSphere),cs.applyMatrix4(n),e.ray.intersectsSphere(cs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ii),sl.multiplyMatrices(n,Ii),as.matrixWorld=sl,as.raycast(e,er);for(let o=0,a=er.length;o<a;o++){const c=er[o];c.instanceId=s,c.object=this,t.push(c)}er.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new oa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new uh(new Float32Array(i*this.count),i,this.count,ya,rn));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*e;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class dh extends cn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const vr=new w,yr=new w,ol=new Ae,ls=new ws,tr=new dn,so=new w,al=new w;class Ua extends lt{constructor(e=new Gt,t=new dh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)vr.fromBufferAttribute(t,i-1),yr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=vr.distanceTo(yr);e.setAttribute("lineDistance",new Tt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(i),tr.radius+=s,e.ray.intersectsSphere(tr)===!1)return;ol.copy(i).invert(),ls.copy(e.ray).applyMatrix4(ol);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=h.getX(_),S=h.getX(_+1),E=nr(this,e,ls,c,f,S);E&&t.push(E)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),f=nr(this,e,ls,c,_,m);f&&t.push(f)}}else{const p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=l){const f=nr(this,e,ls,c,_,_+1);f&&t.push(f)}if(this.isLineLoop){const _=nr(this,e,ls,c,g-1,p);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function nr(r,e,t,n,i,s){const o=r.geometry.attributes.position;if(vr.fromBufferAttribute(o,i),yr.fromBufferAttribute(o,s),t.distanceSqToSegment(vr,yr,so,al)>n)return;so.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(so);if(!(c<e.near||c>e.far))return{distance:c,point:al.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const cl=new w,ll=new w;class cg extends Ua{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)cl.fromBufferAttribute(t,i),ll.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+cl.distanceTo(ll);e.setAttribute("lineDistance",new Tt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lg extends Ua{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class fh extends cn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hl=new Ae,aa=new ws,ir=new dn,sr=new w;class hg extends lt{constructor(e=new Gt,t=new fh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(i),ir.radius+=s,e.ray.intersectsSphere(ir)===!1)return;hl.copy(i).invert(),aa.copy(e.ray).applyMatrix4(hl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=l.getX(g);sr.fromBufferAttribute(u,m),ul(sr,m,c,i,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)sr.fromBufferAttribute(u,g),ul(sr,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ul(r,e,t,n,i,s,o){const a=aa.distanceSqToPoint(r);if(a<t){const c=new w;aa.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Fa extends Gt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=n/2;let f=0;S(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Tt(u,3)),this.setAttribute("normal",new Tt(d,3)),this.setAttribute("uv",new Tt(p,2));function S(){const x=new w,D=new w;let R=0;const C=(t-e)/n;for(let P=0;P<=s;P++){const b=[],M=P/s,I=M*(t-e)+e;for(let V=0;V<=i;V++){const B=V/i,q=B*c+a,K=Math.sin(q),X=Math.cos(q);D.x=I*K,D.y=-M*n+m,D.z=I*X,u.push(D.x,D.y,D.z),x.set(K,C,X).normalize(),d.push(x.x,x.y,x.z),p.push(B,1-M),b.push(g++)}_.push(b)}for(let P=0;P<i;P++)for(let b=0;b<s;b++){const M=_[b][P],I=_[b+1][P],V=_[b+1][P+1],B=_[b][P+1];(e>0||b!==0)&&(h.push(M,I,B),R+=3),(t>0||b!==s-1)&&(h.push(I,V,B),R+=3)}l.addGroup(f,R,0),f+=R}function E(x){const D=g,R=new Pe,C=new w;let P=0;const b=x===!0?e:t,M=x===!0?1:-1;for(let V=1;V<=i;V++)u.push(0,m*M,0),d.push(0,M,0),p.push(.5,.5),g++;const I=g;for(let V=0;V<=i;V++){const q=V/i*c+a,K=Math.cos(q),X=Math.sin(q);C.x=b*X,C.y=m*M,C.z=b*K,u.push(C.x,C.y,C.z),d.push(0,M,0),R.x=K*.5+.5,R.y=X*.5*M+.5,p.push(R.x,R.y),g++}for(let V=0;V<i;V++){const B=D+V,q=I+V;x===!0?h.push(q,q+1,B):h.push(q+1,q,B),P+=3}l.addGroup(f,P,x===!0?1:2),f+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fa(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Oa extends Fa{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Oa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ka extends Gt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new w,d=new w,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const S=[],E=f/n;let x=0;f===0&&o===0?x=.5/t:f===n&&c===Math.PI&&(x=-.5/t);for(let D=0;D<=t;D++){const R=D/t;u.x=-e*Math.cos(i+R*s)*Math.sin(o+E*a),u.y=e*Math.cos(o+E*a),u.z=e*Math.sin(i+R*s)*Math.sin(o+E*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(R+x,1-E),S.push(l++)}h.push(S)}for(let f=0;f<n;f++)for(let S=0;S<t;S++){const E=h[f][S+1],x=h[f][S],D=h[f+1][S],R=h[f+1][S+1];(f!==0||o>0)&&p.push(E,x,R),(f!==n-1||c<Math.PI)&&p.push(x,D,R)}this.setIndex(p),this.setAttribute("position",new Tt(g,3)),this.setAttribute("normal",new Tt(_,3)),this.setAttribute("uv",new Tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ka(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ba extends cn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wa,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class fn extends Ba{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return bt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class ug extends cn{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wa,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function rr(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function dg(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function fg(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function dl(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let c=0;c!==e;++c)i[o++]=r[a+c]}return i}function ph(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Cs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class pg extends Cs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Li,endingEnd:Li}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Di:s=e,a=2*t-n;break;case _r:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Di:o=e,c=2*n-t;break;case _r:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,f=-d*m+2*d*_-d*g,S=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,E=(-1-p)*m+(1.5+p)*_+.5*g,x=p*m-p*_;for(let D=0;D!==a;++D)s[D]=f*o[h+D]+S*o[l+D]+E*o[c+D]+x*o[u+D];return s}}class mh extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[l+d]*u+o[c+d]*h;return s}}class mg extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class pn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=rr(t,this.TimeBufferType),this.values=rr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:rr(e.times,Array),values:rr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new mg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new mh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new pg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Ss:t=this.InterpolantFactoryMethodDiscrete;break;case bs:t=this.InterpolantFactoryMethodLinear;break;case Rr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return bs;case this.InterpolantFactoryMethodSmooth:return Rr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&dg(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Rr,s=e.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{const u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=bs;class Ji extends pn{constructor(e,t,n){super(e,t,n)}}Ji.prototype.ValueTypeName="bool";Ji.prototype.ValueBufferType=Array;Ji.prototype.DefaultInterpolation=Ss;Ji.prototype.InterpolantFactoryMethodLinear=void 0;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;class gh extends pn{}gh.prototype.ValueTypeName="color";class ji extends pn{}ji.prototype.ValueTypeName="number";class gg extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t);let l=e*a;for(let h=l+a;l!==h;l+=4)_t.slerpFlat(s,0,o,l-a,o,l,c);return s}}class Ki extends pn{InterpolantFactoryMethodLinear(e){return new gg(this.times,this.values,this.getValueSize(),e)}}Ki.prototype.ValueTypeName="quaternion";Ki.prototype.InterpolantFactoryMethodSmooth=void 0;class Qi extends pn{constructor(e,t,n){super(e,t,n)}}Qi.prototype.ValueTypeName="string";Qi.prototype.ValueBufferType=Array;Qi.prototype.DefaultInterpolation=Ss;Qi.prototype.InterpolantFactoryMethodLinear=void 0;Qi.prototype.InterpolantFactoryMethodSmooth=void 0;class $i extends pn{}$i.prototype.ValueTypeName="vector";class ca{constructor(e="",t=-1,n=[],i=Aa){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=an(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(xg(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(pn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const h=fg(c);c=dl(c,1,h),l=dl(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new ji(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,p,g,_){if(p.length!==0){const m=[],f=[];ph(p,m,f,g),m.length!==0&&_.push(new u(d,m,f))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const p={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)p[d[g].morphTargets[_]]=-1;for(const _ in p){const m=[],f=[];for(let S=0;S!==d[g].morphTargets.length;++S){const E=d[g];m.push(E.time),f.push(E.morphTarget===_?1:0)}i.push(new ji(".morphTargetInfluence["+_+"]",m,f))}c=p.length*o}else{const p=".bones["+t[u].name+"]";n($i,p+".position",d,"pos",i),n(Ki,p+".quaternion",d,"rot",i),n($i,p+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function _g(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ji;case"vector":case"vector2":case"vector3":case"vector4":return $i;case"color":return gh;case"quaternion":return Ki;case"bool":case"boolean":return Ji;case"string":return Qi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function xg(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=_g(r.type);if(r.times===void 0){const t=[],n=[];ph(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Xn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class vg{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const yg=new vg;class es{constructor(e){this.manager=e!==void 0?e:yg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}es.DEFAULT_MATERIAL_NAME="__DEFAULT";const Sn={};class Mg extends Error{constructor(e,t){super(e),this.response=t}}class _h extends es{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Xn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Sn[e]!==void 0){Sn[e].push({onLoad:t,onProgress:n,onError:i});return}Sn[e]=[],Sn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Sn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0;let _=0;const m=new ReadableStream({start(f){S();function S(){u.read().then(({done:E,value:x})=>{if(E)f.close();else{_+=x.byteLength;const D=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:p});for(let R=0,C=h.length;R<C;R++){const P=h[R];P.onProgress&&P.onProgress(D)}f.enqueue(x),S()}},E=>{f.error(E)})}}});return new Response(m)}else throw new Mg(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Xn.add(e,l);const h=Sn[e];delete Sn[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{const h=Sn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Sn[e];for(let u=0,d=h.length;u<d;u++){const p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class Sg extends es{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Xn.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Es("img");function c(){h(),Xn.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class bg extends es{constructor(e){super(e)}load(e,t,n,i){const s=new xt,o=new Sg(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Is extends lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Eg extends Is{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ro=new Ae,fl=new w,pl=new w;class za{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ia,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new Ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;fl.setFromMatrixPosition(e.matrixWorld),t.position.copy(fl),pl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(pl),t.updateMatrixWorld(),ro.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ro),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ro)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Tg extends za{constructor(){super(new vt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=qi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Ag extends Is{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Tg}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ml=new Ae,hs=new w,oo=new w;class wg extends za{constructor(){super(new vt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Pe(4,2),this._viewportCount=6,this._viewports=[new Ke(2,1,1,1),new Ke(0,1,1,1),new Ke(3,1,1,1),new Ke(1,1,1,1),new Ke(3,0,1,1),new Ke(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),hs.setFromMatrixPosition(e.matrixWorld),n.position.copy(hs),oo.copy(n.position),oo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(oo),n.updateMatrixWorld(),i.makeTranslation(-hs.x,-hs.y,-hs.z),ml.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ml)}}class Ha extends Is{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new wg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Rg extends za{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class la extends Is{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.shadow=new Rg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class xh extends Is{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ys{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Cg extends es{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Xn.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),s.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Xn.add(e,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Xn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Xn.add(e,c),s.manager.itemStart(e)}}class Ig{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=gl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=gl();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function gl(){return performance.now()}class Pg{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){_t.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;_t.multiplyQuaternionsFlat(e,o,e,t,e,n),_t.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const c=t+a;e[c]=e[c]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const Va="\\[\\]\\.:\\/",Lg=new RegExp("["+Va+"]","g"),Ga="[^"+Va+"]",Dg="[^"+Va.replace("\\.","")+"]",Ng=/((?:WC+[\/:])*)/.source.replace("WC",Ga),Ug=/(WCOD+)?/.source.replace("WCOD",Dg),Fg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ga),Og=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ga),kg=new RegExp("^"+Ng+Ug+Fg+Og+"$"),Bg=["material","materials","bones","map"];class zg{constructor(e,t,n){const i=n||Qe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Qe{constructor(e,t,n){this.path=t,this.parsedPath=n||Qe.parseTrackName(t),this.node=Qe.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Qe.Composite(e,t,n):new Qe(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Lg,"")}static parseTrackName(e){const t=kg.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Bg.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Qe.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[i];if(o===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Qe.Composite=zg;Qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Qe.prototype.GetterByBindingType=[Qe.prototype._getValue_direct,Qe.prototype._getValue_array,Qe.prototype._getValue_arrayElement,Qe.prototype._getValue_toArray];Qe.prototype.SetterByBindingTypeAndVersioning=[[Qe.prototype._setValue_direct,Qe.prototype._setValue_direct_setNeedsUpdate,Qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_array,Qe.prototype._setValue_array_setNeedsUpdate,Qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_arrayElement,Qe.prototype._setValue_arrayElement_setNeedsUpdate,Qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Qe.prototype._setValue_fromArray,Qe.prototype._setValue_fromArray_setNeedsUpdate,Qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Hg{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,a=new Array(o),c={endingStart:Li,endingEnd:Li};for(let l=0;l!==o;++l){const h=s[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Ta,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case mu:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case Aa:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===pu;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===Ea){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Di,i.endingEnd=Di):(e?i.endingStart=this.zeroSlopeAtStart?Di:Li:i.endingStart=_r,t?i.endingEnd=this.zeroSlopeAtEnd?Di:Li:i.endingEnd=_r)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=t,a[1]=s+e,c[1]=n,this}}const Vg=new Float32Array(1);class vh extends pi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==s;++u){const d=i[u],p=d.name;let g=h[p];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;g=new Pg(Qe.create(n,p,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new mh(new Float32Array(2),new Float32Array(2),1,Vg),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?ca.findByName(i,e):e;const a=o!==null?o.uuid:e,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Aa),c!==void 0){const u=c.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const h=new Hg(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?ca.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,s,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const _l=new Ae;class ha{constructor(e,t,n=0,i=1/0){this.ray=new ws(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ca,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return _l.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_l),this}intersectObject(e,t=!0,n=[]){return ua(e,this,n,t),n.sort(xl),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)ua(e[i],this,n,t);return n.sort(xl),n}}function xl(r,e){return r.distance-e.distance}function ua(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let o=0,a=s.length;o<a;o++)ua(s[o],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ma}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ma);function vl(r,e){if(e===gu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ia||e===Xl){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===ia)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Gg extends es{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new jg(t)}),this.register(function(t){return new Kg(t)}),this.register(function(t){return new s_(t)}),this.register(function(t){return new r_(t)}),this.register(function(t){return new o_(t)}),this.register(function(t){return new Zg(t)}),this.register(function(t){return new Jg(t)}),this.register(function(t){return new Qg(t)}),this.register(function(t){return new e_(t)}),this.register(function(t){return new Yg(t)}),this.register(function(t){return new t_(t)}),this.register(function(t){return new $g(t)}),this.register(function(t){return new i_(t)}),this.register(function(t){return new n_(t)}),this.register(function(t){return new Xg(t)}),this.register(function(t){return new a_(t)}),this.register(function(t){return new c_(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=ys.extractUrlBase(e);o=ys.resolveURL(l,this.path)}else o=ys.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new _h(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===yh){try{o[He.KHR_BINARY_GLTF]=new l_(e)}catch(u){i&&i(u);return}s=JSON.parse(o[He.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new S_(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case He.KHR_MATERIALS_UNLIT:o[u]=new qg;break;case He.KHR_DRACO_MESH_COMPRESSION:o[u]=new h_(s,this.dracoLoader);break;case He.KHR_TEXTURE_TRANSFORM:o[u]=new u_;break;case He.KHR_MESH_QUANTIZATION:o[u]=new d_;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Wg(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const He={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Xg{constructor(e){this.parser=e,this.name=He.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const h=new we(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Pt);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new la(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Ha(h),l.distance=u;break;case"spot":l=new Ag(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Tn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class qg{constructor(){this.name=He.KHR_MATERIALS_UNLIT}getMaterialType(){return on}extendParams(e,t,n){const i=[];e.color=new we(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Pt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,ft))}return Promise.all(i)}}class Yg{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class jg{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pe(a,a)}return Promise.all(s)}}class Kg{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class $g{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Zg{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Pt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,ft)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Jg{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Qg{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(a[0],a[1],a[2],Pt),Promise.all(s)}}class e_{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class t_{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(a[0],a[1],a[2],Pt),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,ft)),Promise.all(s)}}class n_{constructor(e){this.parser=e,this.name=He.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class i_{constructor(e){this.parser=e,this.name=He.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class s_{constructor(e){this.parser=e,this.name=He.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class r_{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class o_{constructor(e){this.parser=e,this.name=He.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class a_{constructor(e){this.name=He.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):o.ready.then(function(){const p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}}class c_{constructor(e){this.name=He.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==qt.TRIANGLES&&l.mode!==qt.TRIANGLE_STRIP&&l.mode!==qt.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(const g of u){const _=new Ae,m=new w,f=new _t,S=new w(1,1,1),E=new ag(g.geometry,g.material,d);for(let x=0;x<d;x++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,x),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,x),c.SCALE&&S.fromBufferAttribute(c.SCALE,x),E.setMatrixAt(x,_.compose(m,f,S));for(const x in c)if(x==="_COLOR_0"){const D=c[x];E.instanceColor=new oa(D.array,D.itemSize,D.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&g.geometry.setAttribute(x,c[x]);lt.prototype.copy.call(E,g),this.parser.assignFinalMaterial(E),p.push(E)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const yh="glTF",us=12,yl={JSON:1313821514,BIN:5130562};class l_{constructor(e){this.name=He.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,us),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==yh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-us,s=new DataView(e,us);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===yl.JSON){const l=new Uint8Array(e,us+o,a);this.content=n.decode(l)}else if(c===yl.BIN){const l=us+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class h_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=He.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=da[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=da[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],p=ki[d.componentType];l[u]=p.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(const g in p.attributes){const _=p.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(p)},a,l,Pt,d)})})}}class u_{constructor(){this.name=He.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class d_{constructor(){this.name=He.KHR_MESH_QUANTIZATION}}class Mh extends Cs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,g=e*l,_=g-l,m=-2*p+3*d,f=p-d,S=1-m,E=f-d+u;for(let x=0;x!==a;x++){const D=o[_+x+a],R=o[_+x+c]*h,C=o[g+x+a],P=o[g+x]*h;s[x]=S*D+E*R+m*C+f*P}return s}}const f_=new _t;class p_ extends Mh{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return f_.fromArray(s).normalize().toArray(s),s}}const qt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ki={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ml={9728:Ct,9729:Vt,9984:Ul,9985:cr,9986:ms,9987:wn},Sl={33071:Wn,33648:gr,10497:Gi},ao={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},da={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},zn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},m_={CUBICSPLINE:void 0,LINEAR:bs,STEP:Ss},co={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function g_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Ba({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:In})),r.DefaultMaterial}function si(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Tn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function __(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function x_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function v_(r){let e;const t=r.extensions&&r.extensions[He.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+lo(t.attributes):e=r.indices+":"+lo(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+lo(r.targets[n]);return e}function lo(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function fa(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function y_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const M_=new Ae;class S_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Wg,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new bg(this.options.manager):this.textureLoader=new Cg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _h(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return si(s,a,i),Tn(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())s(h,a.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[He.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(ys.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=ao[i.type],a=ki[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new It(l,o,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=ao[i.type],l=ki[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(p&&p!==u){const f=Math.floor(d/p),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count;let E=t.cache.get(S);E||(_=new l(a,f*p,i.count*p/h),E=new ng(_,p/h),t.cache.add(S,E)),m=new Da(E,c,d%p/h,g)}else a===null?_=new l(i.count*c):_=new l(a,d,i.count*c),m=new It(_,c,g);if(i.sparse!==void 0){const f=ao.SCALAR,S=ki[i.sparse.indices.componentType],E=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,D=new S(o[1],E,i.sparse.count*f),R=new l(o[2],x,i.sparse.count*c);a!==null&&(m=new It(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,P=D.length;C<P;C++){const b=D[C];if(m.setX(b,R[C*c]),c>=2&&m.setY(b,R[C*c+1]),c>=3&&m.setZ(b,R[C*c+2]),c>=4&&m.setW(b,R[C*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=Ml[d.magFilter]||Vt,h.minFilter=Ml[d.minFilter]||wn,h.wrapS=Sl[d.wrapS]||Gi,h.wrapT=Sl[d.wrapT]||Gi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ct&&h.minFilter!==Vt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new xt(_);m.needsUpdate=!0,d(m)}),t.load(ys.resolveURL(u,s.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Tn(u,o),u.userData.mimeType=o.mimeType||y_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[He.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[He.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[He.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new fh,cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new dh,cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Ba}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},c=s.extensions||{},l=[];if(c[He.KHR_MATERIALS_UNLIT]){const u=i[He.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new we(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Pt),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,ft)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=tn);const h=s.alphaMode||co.OPAQUE;if(h===co.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===co.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==on&&(l.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Pe(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==on&&(l.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==on){const u=s.emissiveFactor;a.emissive=new we().setRGB(u[0],u[1],u[2],Pt)}return s.emissiveTexture!==void 0&&o!==on&&l.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,ft)),Promise.all(l).then(function(){const u=new o(a);return s.name&&(u.name=s.name),Tn(u,s),t.associations.set(u,{materials:e}),s.extensions&&si(i,u,s),u})}createUniqueName(e){const t=Qe.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[He.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return bl(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=v_(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[He.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=bl(new Gt,l,t),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?g_(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){const _=h[p],m=o[p];let f;const S=l[p];if(m.mode===qt.TRIANGLES||m.mode===qt.TRIANGLE_STRIP||m.mode===qt.TRIANGLE_FAN||m.mode===void 0)f=s.isSkinnedMesh===!0?new sg(_,S):new Et(_,S),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===qt.TRIANGLE_STRIP?f.geometry=vl(f.geometry,Xl):m.mode===qt.TRIANGLE_FAN&&(f.geometry=vl(f.geometry,ia));else if(m.mode===qt.LINES)f=new cg(_,S);else if(m.mode===qt.LINE_STRIP)f=new Ua(_,S);else if(m.mode===qt.LINE_LOOP)f=new lg(_,S);else if(m.mode===qt.POINTS)f=new hg(_,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&x_(f,s),f.name=t.createUniqueName(s.name||"mesh_"+e),Tn(f,s),m.extensions&&si(i,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return s.extensions&&si(i,u[0],s),u[0];const d=new jt;s.extensions&&si(i,d,s),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new vt(Ht.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Pa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Tn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new Ae;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Na(a,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const p=i.channels[u],g=i.samplers[p.sampler],_=p.target,m=_.node,f=i.parameters!==void 0?i.parameters[g.input]:g.input,S=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",S)),l.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],p=u[1],g=u[2],_=u[3],m=u[4],f=[];for(let S=0,E=d.length;S<E;S++){const x=d[S],D=p[S],R=g[S],C=_[S],P=m[S];if(x===void 0)continue;x.updateMatrix&&x.updateMatrix();const b=n._createAnimationTracks(x,D,R,C,P);if(b)for(let M=0;M<b.length;M++)f.push(b[M])}return new ca(s,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,M_)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(s.isBone===!0?h=new hh:l.length>1?h=new jt:l.length===1?h=l[0]:h=new lt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Tn(h,s),s.extensions&&si(n,h,s),s.matrix!==void 0){const u=new Ae;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new jt;n.name&&(s.name=i.createUniqueName(n.name)),Tn(s,n),n.extensions&&si(t,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);const l=h=>{const u=new Map;for(const[d,p]of i.associations)(d instanceof cn||d instanceof xt)&&u.set(d,p);return h.traverse(d=>{const p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,c=[];zn[s.path]===zn.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(zn[s.path]){case zn.weights:l=ji;break;case zn.rotation:l=Ki;break;case zn.position:case zn.scale:l=$i;break;default:switch(n.itemSize){case 1:l=ji;break;case 2:case 3:default:l=$i;break}break}const h=i.interpolation!==void 0?m_[i.interpolation]:bs,u=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){const g=new l(c[d]+"."+zn[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=fa(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Ki?p_:Mh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function b_(r,e,t){const n=e.attributes,i=new Ft;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new w(c[0],c[1],c[2]),new w(l[0],l[1],l[2])),a.normalized){const h=fa(ki[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new w,c=new w;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){const _=fa(ki[d.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new dn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function bl(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(c){r.setAttribute(a,c)})}for(const o in n){const a=da[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Ge.workingColorSpace!==Pt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ge.workingColorSpace}" not supported.`),Tn(r,e),b_(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?__(r,e.targets,t):r})}function Bi(r){var t;return((t=window.__ASSETS)==null?void 0:t[r])??`assets/${r}`}const E_=new Gg,El=new Map;function jn(r){let e=El.get(r);return e||(e=window.__ASSETS&&!window.__ASSETS[r]?Promise.reject(new Error("missing asset "+r)):E_.loadAsync(Bi(r)),El.set(r,e)),e}async function Sh(r){return(await fetch(Bi(r))).json()}function ui(r){r.traverse(e=>{const t=e;if(!t.isMesh)return;const n=i=>{var h,u;const s=i,a=!!(((h=s.userData)==null?void 0:h.gltfExtensions)??{}).KHR_materials_unlit||s.isMeshBasicMaterial,c={map:s.map??null,color:((u=s.color)==null?void 0:u.clone())??new we(1,1,1),transparent:s.transparent,alphaTest:s.alphaTest,side:s.side,depthWrite:s.depthWrite,opacity:s.opacity},l=a?new on(c):new ug(c);return l.name=s.name,l.userData={...s.userData},l.map&&(l.map.anisotropy=4),l};t.material=Array.isArray(t.material)?t.material.map(n):n(t.material)})}class Wa{constructor(e){A(this,"group",new jt);A(this,"shapes",[]);A(this,"wallShapes",[]);A(this,"objMeshes",new Map);A(this,"outside",new Set);A(this,"floor");A(this,"itemMeshes",new Map);A(this,"lights",[]);A(this,"occluders",[]);A(this,"ray",new ha);A(this,"occRay",new ha);this.data=e}static async load(e){const t=await Sh(`rooms/${e}.json`),n=new Wa(t);return await n.build(),n}async build(){const e=this.data,t=(await jn(`rooms/${e.id}.glb`)).scene.clone(!0);t.scale.setScalar(.1),ui(t),this.group.add(t),t.updateMatrixWorld(!0),this.buildFloor(t),t.traverse(i=>{const s=i;if(!s.isMesh||!s.visible)return;const o=Array.isArray(s.material)?s.material[0]:s.material;o.transparent||(o.alphaTest??0)>0||this.occluders.push(s)});const n=new Ft().setFromObject(t);for(let i=0;i<e.objects.length;i++){const s=e.objects[i];if(!s.model||s.flags==="00000000")continue;const o=new w(...s.pos),a=o.x<n.min.x-.05||o.z<n.min.z-.05||o.x>n.max.x+.05||o.z>n.max.z+.05,c=(await jn(`objects/${s.model}.glb`)).scene.clone(!0);a&&(this.outside.add(i),c.visible=!1),ui(c),c.scale.setScalar(.1),c.position.copy(o),c.rotation.set(s.rot[0],s.rot[2],s.rot[1],"ZYX"),c.name=s.model,this.group.add(c),this.objMeshes.set(i,c)}for(const i of e.lights)this.addLight(i);this.wallShapes=e.collision.map(i=>this.colliderShape(i)),this.shapes=this.wallShapes.filter((i,s)=>i&&parseInt(e.collision[s].type,16)&1)}buildFloor(e){const t=[],n=new w,i=new w,s=new w,o=new w;e.traverse(c=>{const l=c;if(!l.isMesh)return;const h=l.geometry.attributes.position,u=l.geometry.index,d=u?u.count:h.count;for(let p=0;p<d;p+=3){const g=u?u.getX(p):p,_=u?u.getX(p+1):p+1,m=u?u.getX(p+2):p+2;n.fromBufferAttribute(h,g).applyMatrix4(l.matrixWorld),i.fromBufferAttribute(h,_).applyMatrix4(l.matrixWorld),s.fromBufferAttribute(h,m).applyMatrix4(l.matrixWorld),o.subVectors(i,n).cross(s.clone().sub(n));const f=o.length();f<1e-9||Math.abs(o.y/f)<.55||t.push(n.x,n.y,n.z,i.x,i.y,i.z,s.x,s.y,s.z)}});const a=new Gt;a.setAttribute("position",new Tt(t,3)),a.computeBoundingSphere(),a.computeBoundingBox(),this.floor=new Et(a,new on({side:tn})),this.floor.visible=!1}addLight(e){const t=new we(e.color[0],e.color[1],e.color[2]),n=Math.max(e.color[0],e.color[1],e.color[2]);if(n<.03)return;t.multiplyScalar(1/n);const i=e.far>.01?Math.min(e.far,30):6,s=new Ha(t,Math.min(n,3.5)*2.2,i,1);s.position.set(e.pos[0],e.pos[1],e.pos[2]),this.group.add(s),this.lights.push(s)}colliderShape(e){const n=parseInt(e.type,16)>>8&255;return n===7||n===6||n===2||e.y>.6?null:n===4||n===5?{k:"tri",a:new Pe(e.x,e.z),b:new Pe(e.x+e.sx,e.z),c:new Pe(e.x,e.z+e.sz)}:n===3?{k:"circle",x:e.x,z:e.z,r:Math.max(.08,e.sx*.5)}:{k:"box",x0:e.x,z0:e.z,x1:e.x+e.sx,z1:e.z+e.sz}}syncWalls(e){this.shapes=this.wallShapes.filter((t,n)=>t&&e(n))}async placeItems(){for(let e=0;e<this.data.items.length;e++){const t=this.data.items[e];try{const n=(await jn(`items/it_${String(t.id).padStart(3,"0")}.glb`)).scene.clone(!0);ui(n),n.scale.setScalar(.1),n.position.set(...t.pos),n.rotation.set(t.rot[0],t.rot[2],t.rot[1],"ZYX"),this.group.add(n),this.itemMeshes.set(e,n)}catch{}}}removeItem(e){const t=this.itemMeshes.get(e);t&&(t.removeFromParent(),this.itemMeshes.delete(e))}floorAt(e,t,n,i=.45){this.ray.set(new w(e,n+i,t),new w(0,-1,0)),this.ray.far=i+2;const s=this.ray.intersectObject(this.floor,!1);return s.length?s[0].point.y:null}clearDistance(e,t,n){const i=t.clone().sub(e),s=i.length();if(s<1e-6)return 0;this.occRay.set(e,i.divideScalar(s)),this.occRay.far=s,this.occRay.near=0;const o=this.occRay.intersectObjects(this.occluders,!1),a=new De,c=new w;for(const l of o)if(!(!l.face||n&&n.has(l.object))&&(a.getNormalMatrix(l.object.matrixWorld),c.copy(l.face.normal).applyMatrix3(a),c.dot(i)<0))return l.distance;return s}resolve(e,t){for(let n=0;n<3;n++)for(const i of this.shapes)if(i.k==="box"){const s=Math.max(i.x0,Math.min(e.x,i.x1)),o=Math.max(i.z0,Math.min(e.z,i.z1)),a=e.x-s,c=e.z-o,l=a*a+c*c;if(l>=t*t)continue;if(l>1e-10){const h=Math.sqrt(l);e.x=s+a/h*t,e.z=o+c/h*t}else{const h=e.x-i.x0,u=i.x1-e.x,d=e.z-i.z0,p=i.z1-e.z,g=Math.min(h,u,d,p);g===h?e.x=i.x0-t:g===u?e.x=i.x1+t:g===d?e.z=i.z0-t:e.z=i.z1+t}}else if(i.k==="circle"){const s=e.x-i.x,o=e.z-i.z,a=Math.hypot(s,o),c=t+i.r;a<c&&a>1e-6&&(e.x=i.x+s/a*c,e.z=i.z+o/a*c)}else{const s=new Pe(e.x,e.z),o=T_(s,i.a,i.b,i.c),a=A_(s,i.a,i.b,i.c),c=s.distanceTo(a);if(o){const l=a.clone().sub(s),h=l.length()||1;e.x=a.x+l.x/h*t,e.z=a.y+l.y/h*t}else if(c<t){const l=s.clone().sub(a).divideScalar(c||1);e.x=a.x+l.x*t,e.z=a.y+l.y*t}}}bounds(){return this.floor.geometry.boundingBox.clone()}}function T_(r,e,t,n){const i=(h,u,d)=>(h.x-d.x)*(u.y-d.y)-(u.x-d.x)*(h.y-d.y),s=i(r,e,t),o=i(r,t,n),a=i(r,n,e),c=s<0||o<0||a<0,l=s>0||o>0||a>0;return!(c&&l)}function ho(r,e,t){const n=t.clone().sub(e),i=Math.max(0,Math.min(1,r.clone().sub(e).dot(n)/(n.lengthSq()||1)));return e.clone().addScaledVector(n,i)}function A_(r,e,t,n){const i=ho(r,e,t),s=ho(r,t,n),o=ho(r,n,e),a=r.distanceToSquared(i),c=r.distanceToSquared(s),l=r.distanceToSquared(o);return a<=c&&a<=l?i:c<=l?s:o}const w_={idle:"m35",walk:"m00",run:"m04",back:"m11",turnL:"m46",turnR:"m47"},or=1.05,Tl=2.6,R_=2.6,C_=.2,I_="k00",P_=["k01","k04","k07"],L_=["k03","k06","k09"],D_=9/30,N_=24/30,U_=8/30,F_={draw:I_,act:P_,stance:L_,drawT:D_,actT:N_,hitT:U_},O_={draw:"g00",act:["g01","g03","g05"],stance:["g02","g04","g06"],drawT:9/30,actT:16/30,hitT:1/30},k_="g07",B_=32/30;class z_{constructor(){A(this,"root",new jt);A(this,"model");A(this,"mixer");A(this,"actions",new Map);A(this,"cur","");A(this,"heading",0);A(this,"state","idle");A(this,"frozen",!1);A(this,"onStep",null);A(this,"stepPrev",-1);A(this,"stepClip","");A(this,"tail",[]);A(this,"tailRest",[]);A(this,"sway",new Pe);A(this,"swayV",new Pe);A(this,"lastPos",new w);A(this,"lastHead",0);A(this,"bones",{});A(this,"lighterOn",!1);A(this,"lighter",null);A(this,"knifeHand",null);A(this,"gunHand",null);A(this,"gunOn",!1);A(this,"onFire",null);A(this,"needReload",null);A(this,"skinHandR",[]);A(this,"zippoParts",[]);A(this,"knifeOn",!1);A(this,"hp",200);A(this,"sync",null);A(this,"aiming",!1);A(this,"slashT",-1);A(this,"kState","none");A(this,"kT",0);A(this,"kDir",0);A(this,"kQueued",!1);A(this,"onSlash",null);A(this,"flame");A(this,"flameLight");A(this,"flameT",0);A(this,"armBlend",0);A(this,"slashHit",!1);A(this,"canFire",null);A(this,"emptyClick",null)}async load(){const e=await jn("chars/claire.glb");this.model=e.scene,ui(this.model),this.model.traverse(t=>{t.isMesh&&(t.castShadow=!1,t.frustumCulled=!1),/^b\d\d$|^pt\d$/.test(t.name)&&(this.bones[t.name]=t)}),this.root.add(this.model),this.mixer=new vh(this.model);for(const t of e.animations)this.actions.set(t.name,this.mixer.clipAction(t));this.play("idle",0);for(let t=0;t<4;t++){const n=this.bones["pt"+t];n&&(this.tail.push(n),this.tailRest.push(n.quaternion.clone()))}await this.loadLighter()}async loadHand(e){var i;const n=(await jn(e)).scene.clone(!0);return ui(n),n.scale.setScalar(.1),n.visible=!1,n.traverse(s=>{s.isMesh&&(s.frustumCulled=!1)}),(i=this.bones.b09)==null||i.add(n),n}async loadLighter(){this.model.traverse(n=>{const i=n.material;n.isMesh&&i&&/handR/.test(i.name)&&this.skinHandR.push(n)});try{this.lighter=await this.loadHand("chars/hand_zippo.glb"),this.lighter.traverse(n=>{const i=n.material;n.isMesh&&i&&/_t0$/.test(i.name)&&this.zippoParts.push(n)})}catch{this.lighter=null}try{this.knifeHand=await this.loadHand("chars/hand_knife.glb")}catch{this.knifeHand=null}try{this.gunHand=await this.loadHand("chars/hand_gun.glb")}catch{this.gunHand=null}const e=new Oa(.009,.035,10,1,!0);e.translate(0,.0175,0),this.flame=new Et(e,new on({color:16756800,transparent:!0,opacity:.9,blending:mr,depthWrite:!1}));const t=new Et(new ka(.006,8,6),new on({color:16773312,transparent:!0,opacity:.9,blending:mr,depthWrite:!1}));t.position.y=.006,this.flame.add(t),this.flame.visible=!1,this.root.add(this.flame),this.flameLight=new Ha(16754768,0,6,1.6),this.root.add(this.flameLight)}setLighter(e){this.lighterOn=e&&!!this.lighter}setKnife(e){this.knifeOn=e&&!!this.knifeHand,!this.knifeOn&&!this.gunOn&&(this.aiming=!1,this.slashT=-1)}setGun(e){this.gunOn=e&&!!this.gunHand,this.gunOn&&(this.knifeOn=!1),!this.knifeOn&&!this.gunOn&&(this.aiming=!1,this.slashT=-1),this.kState="none"}get wpn(){return this.gunOn?O_:F_}updateHands(){const e=this.armBlend>.5,t=this.knifeOn&&!e,n=this.gunOn&&!e;this.lighter&&(this.lighter.visible=e),this.knifeHand&&(this.knifeHand.visible=t),this.gunHand&&(this.gunHand.visible=n);for(const i of this.skinHandR)i.visible=!e&&!t&&!n}play(e,t=.18,n=1){this.playId(w_[e],t,!0,n)}playId(e,t,n,i=1,s=!1){const o=this.actions.get(e);if(!o||(o.timeScale=i,this.cur===e&&!s))return;if(this.cur===e){o.reset(),o.play();return}const a=this.actions.get(this.cur);o.reset(),o.setLoop(n?Ta:Ea,1/0),o.clampWhenFinished=!n,o.play(),a&&t>0?o.crossFadeFrom(a,t,!1):a&&a.stop(),this.cur=e}get pos(){return this.root.position}forward(e=new w){return e.set(-Math.sin(this.heading),0,-Math.cos(this.heading))}place(e,t,n,i){this.root.position.set(e,t,n),this.heading=i,this.root.rotation.y=i,this.lastPos.set(e,t,n),this.lastHead=i}headPos(e=new w){const t=this.bones.b05;return t?t.getWorldPosition(e):e.copy(this.root.position).setY(this.root.position.y+1.5)}playSync(e,t=!1,n=.08){this.sync=e,this.aiming=!1,this.kState="none",e?this.playId(e,n,t):this.play("idle",.25)}update(e,t,n,i=null){if(this.sync){this.state="sync",this.root.rotation.y=this.heading,this.mixer.update(e),this.updateTail(e),this.updateLighter(e),this.updateHands();return}let s=0,o=0;const a=(this.knifeOn||this.gunOn)&&!this.lighterOn&&!this.frozen;if(this.aiming=a&&(t.aim||this.kState==="slash"||this.kState==="reload"),this.aiming||(this.kState="none"),!this.frozen&&i!==null){const c=(t.strafeR?1:0)-(t.strafeL?1:0),l=(t.fwd?1:0)-(t.back?1:0);let h=null;if(this.aiming)h=i;else if(c||l){const u=Math.cos(i),d=Math.sin(i),p=-d*l+u*c,g=-u*l-d*c;h=Math.atan2(-p,-g),s=t.run?Tl:or}if(h!==null){let u=h-this.heading;u=Math.atan2(Math.sin(u),Math.cos(u));const d=(this.aiming?14:9)*e;this.heading+=Ht.clamp(u,-d,d),Math.abs(u)>1.6&&s>0&&(s*=.35),!s&&Math.abs(u)>.05&&!this.aiming&&(o=Math.sign(u))}}else this.frozen||(t.left&&(o+=1),t.right&&(o-=1),t.fwd?s=t.run?Tl:or:t.back&&(s=-.62),this.aiming&&(s=0));if(this.heading+=o*R_*e*(s>or?.8:1)*(i!==null?0:1),this.root.rotation.y=this.heading,this.aiming?this.updateKnife(e,t):s>0?(this.state=s>or?"run":"walk",this.play(this.state)):s<0?(this.state="back",this.play("back")):o!==0?(this.state="turn",this.play("walk",.15,.7)):(this.state="idle",this.play("idle",.25)),s!==0){const c=this.forward(),l=this.root.position.clone().addScaledVector(c,s*e);n.resolve(l,C_);const h=n.floorAt(l.x,l.z,this.root.position.y);h!==null&&Math.abs(h-this.root.position.y)<.5&&this.root.position.set(l.x,h,l.z)}else{const c=n.floorAt(this.root.position.x,this.root.position.z,this.root.position.y);c!==null&&(this.root.position.y=c)}this.mixer.update(e),this.footsteps(),this.updateTail(e),this.updateLighter(e),this.updateHands()}footsteps(){var s,o;const e={m00:[10,28,0],m04:[8,18,1],m11:[10,28,0]},t=this.state==="walk"||this.state==="run"||this.state==="back"?e[this.cur]:void 0,n=t&&this.actions.get(this.cur);if(!t||!n){this.stepClip="";return}const i=Math.floor(n.time*30);if(this.stepClip===this.cur){const a=c=>this.stepPrev<c&&i>=c||i<this.stepPrev&&(i>=c||this.stepPrev<c);a(t[0])&&((s=this.onStep)==null||s.call(this,this.bones.b17,t[2])),a(t[1])&&((o=this.onStep)==null||o.call(this,this.bones.b21,t[2]))}this.stepClip=this.cur,this.stepPrev=i}updateKnife(e,t){var s,o,a,c,l;const n=this.wpn,i=t.fwd?1:t.back?2:0;if(this.kT+=e,this.kState==="none"&&(this.kState="draw",this.kT=0,this.kQueued=!1,this.playId(n.draw,.12,!1,1,!0)),t.attack&&this.kState!=="stance"&&(this.kQueued=!0),this.kState==="draw"&&this.kT>=n.drawT&&(this.kState="stance",this.kT=0),this.kState==="reload"&&this.kT>=B_&&(this.kState="stance",this.kT=0,this.kQueued=!1),this.kState==="slash"){if(!this.slashHit&&this.kT>=n.hitT){this.slashHit=!0,this.root.updateMatrixWorld(!0);const h=this.forward(),u=this.bones.b09?this.bones.b09.getWorldPosition(new w):this.headPos();this.gunOn?(this.kDir===1?h.y=.6:this.kDir===2&&(h.y=-.6),h.normalize(),(s=this.onFire)==null||s.call(this,u,h,this.kDir)):(o=this.onSlash)==null||o.call(this,u.addScaledVector(h,.25),h)}this.kT>=n.actT&&(this.kState="stance",this.kT=0)}this.kState==="stance"&&(this.gunOn&&((a=this.needReload)!=null&&a.call(this))?(this.kState="reload",this.kT=0,this.playId(k_,.1,!1,1,!0)):t.attack||this.kQueued?(this.kQueued=!1,this.kDir=i,this.slashHit=!1,this.gunOn&&this.onFire&&!((c=this.canFire)!=null&&c.call(this))?((l=this.emptyClick)==null||l.call(this),this.kT=0,this.kState="slash",this.slashHit=!0,this.playId(n.stance[i],.15,!0)):(this.kState="slash",this.kT=0,this.playId(n.act[i],.06,!1,1,!0))):(this.kDir=i,this.playId(n.stance[i],.15,!0))),this.slashT=this.kState==="slash"?this.kT:-1,this.state=this.kState==="slash"?"slash":this.kState==="reload"?"reload":"aim"}solveArm(e,t,n){const i=this.bones.b07,s=this.bones.b08,o=this.bones.b09;if(!i||!s||!o)return;const a=i.getWorldPosition(new w),c=s.getWorldPosition(new w),l=o.getWorldPosition(new w),h=a.distanceTo(c),u=c.distanceTo(l),d=e.clone().sub(a);let p=d.length();const g=(h+u)*.98;p>g&&(d.setLength(g),p=g,e=a.clone().add(d));const _=d.clone().normalize(),m=n.clone().normalize().addScaledVector(_,-n.clone().normalize().dot(_)).normalize(),f=Ht.clamp((h*h+p*p-u*u)/(2*h*p),-1,1),S=Math.sqrt(1-f*f),E=a.clone().addScaledVector(_,h*f).addScaledVector(m,h*S);this.aimBone(i,c.clone().sub(a),E.clone().sub(a),t);const x=s.getWorldPosition(new w),D=o.getWorldPosition(new w);this.aimBone(s,D.clone().sub(x),e.clone().sub(x),t)}updateTail(e){if(!this.tail.length||e<=0)return;const t=this.root.position.clone().sub(this.lastPos).divideScalar(e);this.lastPos.copy(this.root.position);let n=this.heading-this.lastHead;this.lastHead=this.heading,n=Math.atan2(Math.sin(n),Math.cos(n))/e;const i=this.forward(),s=t.x*i.x+t.z*i.z,o=new Pe(Ht.clamp(s*.22,-.3,.6),Ht.clamp(-n*.12,-.5,.5));o.x+=Math.sin(this.mixer.time*9)*.03*Math.min(1,Math.abs(s)),this.swayV.addScaledVector(o.clone().sub(this.sway),60*e).multiplyScalar(Math.exp(-7*e)),this.sway.addScaledVector(this.swayV,e);const a=this.tail[0];this.root.updateMatrixWorld(!0);const c=new w(-i.z,0,i.x),l=new w(0,-1,0).addScaledVector(i,-.14-this.sway.x*1.1).addScaledVector(c,this.sway.y*.9).normalize(),h=c.clone().addScaledVector(l,-c.dot(l)).normalize(),u=new w().crossVectors(l,h),d=new _t().setFromRotationMatrix(new Ae().makeBasis(h,u,l)),p=a.parent.getWorldQuaternion(new _t);a.quaternion.copy(p.invert().multiply(d));const g=new _t;for(let _=1;_<this.tail.length;_++)g.setFromEuler(new Kt(-this.sway.x*.3,this.sway.y*.3,0)),this.tail[_].quaternion.copy(this.tailRest[_]).multiply(g)}aimBone(e,t,n,i){const s=new _t().setFromUnitVectors(t.clone().normalize(),n.clone().normalize());i<1&&s.slerp(new _t,1-i);const o=e.getWorldQuaternion(new _t),a=e.parent.getWorldQuaternion(new _t);e.quaternion.copy(a.invert().multiply(s).multiply(o)),e.updateMatrixWorld(!0)}updateLighter(e){const t=this.lighterOn?1:0;this.armBlend+=(t-this.armBlend)*Math.min(1,e*6);const n=this.bones.b07,i=this.bones.b08,s=this.bones.b09,o=this.armBlend>.02&&!!this.lighter&&!!n&&!!i&&!!s;if(this.flame.visible=o&&this.armBlend>.6,this.flameLight.intensity=0,!o)return;this.root.updateMatrixWorld(!0);const a=n.getWorldPosition(new w),c=i.getWorldPosition(new w),l=s.getWorldPosition(new w),h=a.distanceTo(c),u=c.distanceTo(l),d=this.forward(),p=new w(0,1,0),g=new w().crossVectors(d,p).normalize(),_=a.clone().addScaledVector(d,.33).addScaledVector(g,-.06).addScaledVector(p,-.08),m=_.clone().sub(a);let f=m.length();const S=(h+u)*.98;f>S&&(m.setLength(S),f=S,_.copy(a).add(m));const E=m.clone().normalize(),x=p.clone().multiplyScalar(-1).addScaledVector(g,.6).normalize(),D=x.clone().addScaledVector(E,-x.dot(E)).normalize(),R=Ht.clamp((h*h+f*f-u*u)/(2*h*f),-1,1),C=Math.sqrt(1-R*R),P=a.clone().addScaledVector(E,h*R).addScaledVector(D,h*C);this.aimBone(n,c.clone().sub(a),P.clone().sub(a),this.armBlend);const b=i.getWorldPosition(new w),M=s.getWorldPosition(new w);this.aimBone(i,M.clone().sub(b),_.clone().sub(b),this.armBlend),this.root.updateMatrixWorld(!0);const I=new Ft;for(const J of this.zippoParts)I.expandByObject(J);const V=new Ae().copy(this.root.matrixWorld).invert(),q=(I.isEmpty()?s.getWorldPosition(new w):I.getCenter(new w)).clone();I.isEmpty()||(q.y=I.max.y-.035),this.flameT+=e;const K=q.clone().addScaledVector(p,.035).applyMatrix4(V),X=1+Math.sin(this.flameT*23)*.08+Math.sin(this.flameT*37.7)*.06+(Math.random()-.5)*.08;this.flame.position.copy(K),this.flame.scale.set(1,X,1),this.flameLight.position.copy(K).add(new w(0,.05,0)),this.flameLight.intensity=this.armBlend>.6?2.6*X:0}}const ds=360/65536,fs=Math.PI/180,uo=r=>(r+32768&65535)-32768;function Al(r,e,t,n,i){const s=i*i,o=s*i,a=[];for(let c=0;c<e.length;c++)a.push(.5*(2*e[c]+(-r[c]+t[c])*i+(2*r[c]-5*e[c]+4*t[c]-n[c])*s+(-r[c]+3*e[c]-3*t[c]+n[c])*o));return a}class H_{constructor(e){A(this,"active",!1);A(this,"evc",[]);A(this,"no",0);A(this,"key",0);A(this,"ct0",0);A(this,"mode",0);A(this,"paused",!1);A(this,"P",[]);A(this,"F",[]);this.lock=e}setRoom(e){this.evc=e??[],this.active=!1}start(e,t){if(!this.evc[e]||!this.evc[e].keys.length){this.active=!1;return}this.no=e,this.key=Math.min(t,this.evc[e].keys.length-1),this.ct0=0,this.mode=0,this.active=!0,this.paused=!1}stop(){this.active=!1}lockAng(e,t){if(!e.lk[0])return t;const n=this.lock(e.lk[0],e.lk[1],e.lk[2],e.l);if(!n)return t;const i=n.x-e.pos[0],s=n.y-e.pos[1],o=n.z-e.pos[2];return[uo(-Math.round(10430.381*Math.atan2(s,Math.hypot(i,o)))),uo(-Math.round(10430.381*Math.atan2(i,o))+32768),e.ang[2]]}build(){const e=this.evc[this.no],t=this.no===e.nxt-1,n=e.nxt?this.evc[e.nxt-1]:null;let i=t?n.keys[n.keys.length-1]:e.keys[0];const s=[],o=[];let a=this.lockAng(i,i.ang),c=a.map(h=>h*ds);s.push([...i.pos,...c]),o.push([i.pers*ds]),e.nxt&&(i=e.keys[0],a=this.lockAng(i,i.ang),c=a.map(h=>h*ds));let l=0;for(let h=1;h<20;h++){s.push([...i.pos,...c]),o.push([i.pers*ds]);let u=null;if(h<e.keys.length?u=e.keys[h]:n&&l<n.keys.length&&(u=n.keys[l],l++),u){const d=a;i=u,a=this.lockAng(i,i.ang),c=c.map((p,g)=>p+uo(a[g]-d[g])*ds)}}this.P=s,this.F=o}step(){if(!this.active||(this.mode===0&&(this.mode=1,this.ct0=0),this.mode!==1||this.paused))return;const e=this.evc[this.no],t=e.keys[this.key];this.ct0++,t.frame<=this.ct0&&(this.ct0=0,this.key++,this.key>=e.keys.length-1&&(e.nxt===0?(this.key>=e.keys.length&&(this.key=e.keys.length-1),this.mode=2):this.key>=e.keys.length&&(this.no=e.nxt-1,this.key=0)))}apply(e,t=0){this.build();const n=this.evc[this.no],i=n.keys[this.key],s=this.mode===1&&i.frame?Math.min(1,(this.ct0+(this.paused?0:t))/i.frame):0,o=this.key,a=this.P,c=this.F,l=(p,g)=>p[Math.min(g,p.length-1)],h=Al(l(a,o),l(a,o+1),l(a,o+2),l(a,o+3),s),u=Al(l(c,o),l(c,o+1),l(c,o+2),l(c,o+3),s)[0];e.position.set(h[0],h[1],h[2]),e.rotation.set(-h[3]*fs,-h[4]*fs,h[5]*fs,"YXZ");const d=2*Math.atan(Math.tan(u*fs/2)*.75)/fs;Math.abs(e.fov-d)>.001&&(e.fov=d,e.updateProjectionMatrix()),e.updateMatrixWorld(!0)}}const Ts=4/3,fo=46;class V_{constructor(){A(this,"cam",new vt(fo,Ts,.05,200));A(this,"index",-1);A(this,"forced",null);A(this,"lockFn",null);A(this,"ev",new H_((e,t,n,i)=>{var s;return((s=this.lockFn)==null?void 0:s.call(this,e,t,n,i))??null}));A(this,"evSub",0);A(this,"mode","fixed");A(this,"usingFallback",!1);A(this,"cams",[]);A(this,"room",null);A(this,"trackYaw",null);A(this,"trackPitch",null);A(this,"visT",0);A(this,"override",-2);A(this,"follow",{pos:new w,look:new w,init:!1});A(this,"cut",[]);A(this,"cutOn",null);A(this,"tmpCam",new vt(fo,Ts,.05,200));A(this,"yaw",0);A(this,"pitch",.08);A(this,"zoom",0)}computeCuts(){this.cut=[];const e=this.room;if(!e)return;const t=this.tmpCam,n=new ha,i=new w;for(const s of this.cams){t.position.set(s.pos[0],s.pos[1],s.pos[2]),t.rotation.set(-s.pitch,s.yaw,s.roll,"YXZ"),t.updateMatrixWorld(!0);const o=new Map;for(let c=-.95;c<=.951;c+=.1)for(let l=-.95;l<=.951;l+=.1){i.set(l,c,.5).unproject(t),n.set(t.position,i.sub(t.position).normalize()),n.far=.9;const h=n.intersectObjects(e.occluders,!1)[0];h&&o.set(h.object,(o.get(h.object)??0)+1)}const a=new Set;for(const[c,l]of o)l>=3&&a.add(c);this.cut.push(a)}}applyCut(e){if(e!==this.cutOn){if(this.cutOn)for(const t of this.cutOn)t.visible=!0;if(this.cutOn=e,e)for(const t of e)t.visible=!1}}setRoom(e){this.cutOn=null,this.room=e,this.ev.stop(),this.forced=null,this.cams=e.data.cameras,this.computeCuts(),this.cams=e.data.cameras,this.index=-1,this.override=-2,this.follow.init=!1,this.trackYaw=null}inside(e,t,n,i=0){const[s,o,a,c]=e.zone;return t>=Math.min(s,a)-i&&t<=Math.max(s,a)+i&&n>=Math.min(o,c)-i&&n<=Math.max(o,c)+i}zoneCam(e){const t=this.cams[this.index];if(t&&this.inside(t,e.x,e.z,.05))return this.index;let n=-1,i=1/0;for(let s=0;s<this.cams.length;s++){const o=this.cams[s];if(this.inside(o,e.x,e.z))return s;const a=Ht.clamp(e.x,Math.min(o.zone[0],o.zone[2]),Math.max(o.zone[0],o.zone[2])),c=Ht.clamp(e.z,Math.min(o.zone[1],o.zone[3]),Math.max(o.zone[1],o.zone[3])),l=Math.hypot(a-e.x,c-e.z);l<i&&(i=l,n=s)}return t?this.index:n}aim(e,t){const n=e.lim??[0,0,0,0],i=Math.max(n[0],n[1]),s=Math.max(n[2],n[3]);if(i<=0&&s<=0)return{yaw:e.yaw,pitch:e.pitch,track:!1};const o=t.x-e.pos[0],a=t.y+1-e.pos[1],c=t.z-e.pos[2],l=Math.atan2(-o,-c),h=Math.atan2(-a,Math.hypot(o,c));let u=l-e.yaw;return u=Math.atan2(Math.sin(u),Math.cos(u)),{yaw:e.yaw+Ht.clamp(u,-i,i),pitch:Ht.clamp(h,e.pitch-s,e.pitch+s),track:!0}}visible(e,t,n){const i=this.aim(e,t),s=this.tmpCam;s.position.set(e.pos[0],e.pos[1],e.pos[2]),s.rotation.set(-i.pitch,i.yaw,e.roll,"YXZ"),s.updateMatrixWorld(!0);const o=[t.clone().setY(t.y+.9),n.clone(),t.clone().setY(t.y+.3)];let a=0,c=0;for(const l of o){const h=l.clone().project(s);if(h.z<1&&Math.abs(h.x)<.97&&Math.abs(h.y)<.97)a++;else continue;if(!this.room){c++;continue}const u=s.position.distanceTo(l);this.room.clearDistance(s.position,l,this.cut[this.cams.indexOf(e)])>=u-.25&&c++}return a>=2&&c>=1}update(e,t,n,i=!1,s=1/60){var g;const o=this.index,a=this.override;if(this.ev.active)return this.applyCut(null),this.ev.apply(this.cam,this.evSub),this.follow.init=!1,this.index=-1,!1;if(this.mode==="behind")return this.applyCut(null),this.updateShoulder(e,t,i,s),!1;const c=this.forced!==null&&this.cams[this.forced]?this.forced:null;let l=c??this.zoneCam(e);if(this.index=l,this.visT-=s,c!==null)this.override=-2;else if(i||this.visT<=0||l!==o){this.visT=.2;const _=this.cams[l];if(_&&this.visible(_,e,t))this.override=-2;else if(!(this.override>=0&&this.cams[this.override]&&this.visible(this.cams[this.override],e,t))){let m=-1,f=1/0;for(let S=0;S<this.cams.length;S++){if(S===l||!this.visible(this.cams[S],e,t))continue;const E=this.cams[S],x=Math.hypot(E.pos[0]-e.x,E.pos[2]-e.z);x<f&&(f=x,m=S)}this.override=m>=0?m:-1}}if(this.usingFallback=this.override!==-2,this.override===-1)return this.applyCut(null),this.updateFollow(e,t,n,i||a!==-1,s),a!==-1;const h=this.override>=0?this.override:l,u=this.cams[h];if(!u)return!1;this.applyCut((g=this.cut[h])!=null&&g.size?this.cut[h]:null);const d=h!==(a>=0?a:o)||a===-1;this.cam.fov=fo,this.cam.updateProjectionMatrix(),this.cam.position.set(u.pos[0],u.pos[1],u.pos[2]);const p=this.aim(u,e);if(p.track){if(d||i||this.trackYaw===null)this.trackYaw=p.yaw,this.trackPitch=p.pitch;else{const _=1-Math.exp(-4*s);this.trackYaw+=(p.yaw-this.trackYaw)*_,this.trackPitch+=(p.pitch-this.trackPitch)*_}this.cam.rotation.set(-this.trackPitch,this.trackYaw,u.roll,"YXZ")}else this.trackYaw=null,this.cam.rotation.set(-p.pitch,p.yaw,u.roll,"YXZ");return this.cam.updateMatrixWorld(!0),this.follow.init=!1,d}look(e,t){this.yaw-=e,this.pitch=Ht.clamp(this.pitch+t,-.65,.75)}resetYaw(e){this.yaw=e,this.pitch=.08}updateShoulder(e,t,n,i){const s=Math.cos(this.yaw),o=Math.sin(this.yaw),a=new w(-o,0,-s),c=new w(s,0,-o),l=this.zoom,h=new w(e.x,Math.max(t.y-.02,e.y+1.15),e.z),u=Math.cos(this.pitch),d=Math.sin(this.pitch),p=new w(a.x*u,-d,a.z*u),g=.36-.04*l,_=1.15-.45*l,m=.06,f=h.clone().addScaledVector(c,g);if(this.room){const D=h.distanceTo(f),R=this.room.clearDistance(h,f);R<D&&f.copy(h).add(f.clone().sub(h).setLength(Math.max(.05,R-.12)))}let S=f.clone().addScaledVector(p,-_).add(new w(0,m,0));if(this.room){const D=f.distanceTo(S),R=this.room.clearDistance(f,S);R<D&&(S=f.clone().add(S.clone().sub(f).setLength(Math.max(.12,R-.15))))}const E=S.clone().addScaledVector(p,6),x=this.follow;if(!x.init||n)x.pos.copy(S),x.look.copy(E),x.init=!0;else if(x.pos.lerp(S,1-Math.exp(-18*i)),x.look.copy(E),this.room){const D=f.distanceTo(x.pos),R=this.room.clearDistance(f,x.pos);R<D&&x.pos.copy(f).add(x.pos.clone().sub(f).setLength(Math.max(.12,R-.15)))}this.cam.fov=58-10*l,this.cam.near=.05,this.cam.updateProjectionMatrix(),this.cam.position.copy(x.pos),this.cam.lookAt(x.look),this.cam.updateMatrixWorld(!0)}updateFollow(e,t,n,i,s){const o=new w(-Math.sin(n),0,-Math.cos(n)),a=new w(e.x,Math.max(t.y,e.y+1.2)+.12,e.z);let c=a.clone().addScaledVector(o,-1.9).add(new w(0,.35,0));if(this.room){const u=a.distanceTo(c),d=this.room.clearDistance(a,c);d<u&&(c=a.clone().add(c.clone().sub(a).setLength(Math.max(.25,d-.18))))}const l=a.clone().addScaledVector(o,1.2).add(new w(0,-.25,0)),h=this.follow;if(!h.init||i)h.pos.copy(c),h.look.copy(l),h.init=!0;else{const u=1-Math.exp(-8*s);if(h.pos.lerp(c,u),h.look.lerp(l,1-Math.exp(-10*s)),this.room){const d=a.distanceTo(h.pos),p=this.room.clearDistance(a,h.pos);p<d&&h.pos.copy(a).add(h.pos.clone().sub(a).setLength(Math.max(.25,p-.18)))}}this.cam.fov=60,this.cam.updateProjectionMatrix(),this.cam.position.copy(h.pos),this.cam.lookAt(h.look),this.cam.updateMatrixWorld(!0)}}class G_{constructor(){A(this,"down",new Set);A(this,"pressed",new Set);A(this,"mdx",0);A(this,"mdy",0);A(this,"locked",!1);addEventListener("keydown",e=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","Tab"].includes(e.code)&&e.preventDefault(),this.down.has(e.code)||this.pressed.add(e.code),this.down.add(e.code)}),addEventListener("keyup",e=>this.down.delete(e.code)),addEventListener("blur",()=>this.down.clear()),addEventListener("mousedown",e=>{const t="Mouse"+e.button;this.down.has(t)||this.pressed.add(t),this.down.add(t)}),addEventListener("mouseup",e=>this.down.delete("Mouse"+e.button)),addEventListener("contextmenu",e=>{this.locked&&e.preventDefault()}),addEventListener("mousemove",e=>{this.locked&&(this.mdx+=e.movementX,this.mdy+=e.movementY)}),document.addEventListener("pointerlockchange",()=>{this.locked=!!document.pointerLockElement})}requestLock(e){var t;if(!this.locked&&e.requestPointerLock)try{const n=e.requestPointerLock();(t=n==null?void 0:n.catch)==null||t.call(n,()=>{})}catch{}}releaseLock(){document.pointerLockElement&&document.exitPointerLock()}has(...e){return e.some(t=>this.down.has(t))}hit(...e){return e.some(t=>this.pressed.has(t))}get fwd(){return this.has("KeyW","ArrowUp")}get back(){return this.has("KeyS","ArrowDown")}get left(){return this.has("KeyA","ArrowLeft")}get right(){return this.has("KeyD","ArrowRight")}get strafeL(){return this.has("KeyA")}get strafeR(){return this.has("KeyD")}get camL(){return this.has("ArrowLeft")}get camR(){return this.has("ArrowRight")}get run(){return this.has("ShiftLeft","ShiftRight","KeyX")}get aim(){return this.has("KeyF","Mouse2","ControlLeft","ControlRight")}get attack(){return this.hit("KeyE","Space","Enter","KeyZ","Mouse0")}get action(){return this.hit("KeyE","Space","Enter","KeyZ")}get cancel(){return this.hit("Escape","Backspace","KeyQ")}get inventory(){return this.hit("Tab","KeyI")}get camToggle(){return this.hit("KeyC","KeyV")}endFrame(){this.pressed.clear(),this.mdx=0,this.mdy=0}}const W_=new Set([12,31]);class X_{constructor(){A(this,"slots",new Array(8).fill(null))}add(e,t,n=1){if(W_.has(e)){const s=this.slots.find(o=>(o==null?void 0:o.id)===e);if(s)return s.count+=n,!0}const i=this.slots.findIndex(s=>!s);return i<0?!1:(this.slots[i]={id:e,name:t,count:n},!0)}has(e){return this.slots.some(t=>(t==null?void 0:t.id)===e)}take(e){const t=this.slots.findIndex(i=>(i==null?void 0:i.id)===e);if(t<0)return!1;const n=this.slots[t];return n.count--,n.count<=0&&(this.slots[t]=null),!0}toJSON(){return this.slots}}const q_={8:{en:`This weapon is a
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
с бумагами.`}},wl=new Set([8,9]),Rl={9:[-1.15,0,.25]},Cl=new Set([55]),Xe=()=>dt==="ru",Ye={menu:()=>Xe()?["ВЫХОД","ФАЙЛЫ","КАРТА","ПРЕДМЕТЫ"]:["EXIT","FILE","MAP","ITEM"],equip:()=>Xe()?"ЭКИПИРОВКА":"EQUIP",standard:()=>Xe()?"СТАНДАРТ":"STANDARD",status:()=>Xe()?"СТАТУС":"STATUS",info:()=>Xe()?"ИНФО":"INFO",name:()=>Xe()?"КЛЭР":"CLAIRE",full:()=>Xe()?"КЛЭР РЕДФИЛД":"CLAIRE REDFIELD",height:()=>Xe()?"РОСТ":"HEIGHT",weight:()=>Xe()?"ВЕС":"WEIGHT",blood:()=>Xe()?"ГР.КРОВИ":"BLOOD TYPE",cm:()=>Xe()?"см":"cm",kg:()=>Xe()?"кг":"kg",btype:()=>Xe()?"0":"O",cond:()=>Xe()?"СОСТОЯНИЕ":"CONDITION",fine:()=>Xe()?"Норма":"Fine",caution:()=>Xe()?"Осторожно":"Caution",danger:()=>Xe()?"Опасно":"Danger",list:()=>Xe()?"СПИСОК":"LIST",use:()=>Xe()?"Использовать":"Use",equipA:()=>Xe()?"Экипировать":"Equip",unequip:()=>Xe()?"Снять":"Unequip",hold:()=>Xe()?"Взять в руку":"Hold",putAway:()=>Xe()?"Убрать":"Put away",check:()=>Xe()?"Осмотреть":"Check",combine:()=>Xe()?"Комбинировать":"Combine",noNeed:()=>Xe()?`Сейчас в этом
нет необходимости.`:`There's no need to
use it now.`,ammo:()=>Xe()?`Патроны нельзя
использовать отдельно.`:`The ammos cannot
be used alone.`,noCombine:()=>Xe()?`Это не с чем
комбинировать.`:`There's nothing to
combine it with.`,noData:()=>Xe()?"Нет данных.":"No data.",equipped:r=>Xe()?`${r}: экипировано.`:`Equipped the ${r}.`,lit:()=>Xe()?"Клэр зажгла зажигалку.":"Claire lit the lighter.",unlit:()=>Xe()?"Клэр убрала зажигалку.":"Claire put the lighter away.",rot:()=>Xe()?"Стрелки — вращать · Enter — далее · Esc — назад":"Arrows — rotate · Enter — next · Esc — back"};function Y_(r){const e=q_[r];return e?(Xe()?e.ru:e.en).split("\f"):[""]}const En=930,Nt=650,j_=`
.inv{position:absolute;inset:0;display:none;background:#000;overflow:hidden;z-index:4}
.inv .scr{position:absolute;left:0;top:0;width:${En}px;height:${Nt}px;transform-origin:0 0;font-family:"Arial Black",Arial,sans-serif;color:#d8d8d0}
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
.inv .chk .hint{position:absolute;bottom:4px;width:100%;text-align:center;font:11px Arial,sans-serif;color:#8a8ab8}
`;class K_{constructor(e,t,n,i,s){A(this,"open",!1);A(this,"equipped",null);A(this,"standard",null);A(this,"onEquipChange");A(this,"onUseItem");A(this,"mode","list");A(this,"sel",0);A(this,"menuSel",3);A(this,"subSel",0);A(this,"subOpts",[]);A(this,"text","");A(this,"pages",[]);A(this,"page",0);A(this,"r3",null);A(this,"icons",new Map);A(this,"portrait",null);A(this,"ecgT",0);A(this,"chk",null);A(this,"q",e=>this.root.querySelector(e));this.root=e,this.inv=t,this.input=n,this.audio=i,this.player=s;const o=document.createElement("style");o.textContent=j_,document.head.appendChild(o),e.innerHTML=`<div class="scr">
<canvas class="bgc" width="${En}" height="${Nt}"></canvas>
<!-- top menu -->
<div class="abs olive" style="left:40px;top:55px;width:428px;height:72px"></div>
<div class="abs olive" style="left:300px;top:118px;width:168px;height:28px;border-top:0"></div>
<div class="abs menu"></div>
<!-- equipment / standard -->
<div class="abs olive" style="left:484px;top:55px;width:442px;height:100px"></div>
<div class="abs stripes" style="left:868px;top:58px;width:56px;height:76px"></div>
<div class="abs blue eqbox" style="left:515px;top:62px;width:203px;height:68px"></div>
<div class="abs blue stbox" style="left:765px;top:62px;width:103px;height:68px"></div>
<div class="abs bar l-eq" style="left:482px;top:133px;width:246px;height:20px"></div>
<div class="abs bar l-st" style="left:730px;top:133px;width:196px;height:20px"></div>
<!-- status panel -->
<div class="abs olive" style="left:0;top:135px;width:617px;height:312px"></div>
<div class="abs stripes" style="left:2px;top:138px;width:72px;height:305px"></div>
<div class="abs black" style="left:75px;top:162px;width:538px;height:278px"></div>
<div class="abs tab l-status" style="left:83px;top:148px;width:139px;height:24px"></div>
<canvas class="abs portrait" width="126" height="120" style="left:105px;top:189px;width:126px;height:120px;border:2px solid #0a0a40;background:linear-gradient(180deg,#1a1a6a,#08082c)"></canvas>
<div class="abs plate l-name" style="left:104px;top:314px;width:127px;height:26px"></div>
<canvas class="abs redemb" width="118" height="66" style="left:108px;top:350px;width:118px;height:66px"></canvas>
<div class="abs teal info" style="left:245px;top:189px;width:202px;height:97px;background:#08083a"><div class="head l-info"></div>
 <div class="infotx" style="top:18px"><span class="i-full"></span></div>
 <div class="infotx" style="top:37px"><span class="i-h"></span><span>169<small class="i-cm"></small></span></div>
 <div class="infotx" style="top:56px"><span class="i-w"></span><span>52.4<small class="i-kg"></small></span></div>
 <div class="infotx" style="top:75px"><span class="i-b"></span><span class="i-bt"></span></div></div>
<canvas class="abs emblem" width="116" height="97" style="left:465px;top:189px;width:116px;height:97px;border:2px solid #23238a"></canvas>
<div class="abs teal" style="left:245px;top:299px;width:336px;height:117px;background:#000"><div class="head l-cond"></div>
 <canvas class="ecg" width="330" height="98" style="position:absolute;left:0;top:13px;width:330px;height:98px"></canvas>
 <div class="fine" style="position:absolute;right:10px;bottom:4px;font:bold 22px Arial,sans-serif;color:#28c828;letter-spacing:.04em"></div></div>
<div class="abs pegs"></div>
<div class="abs chk"><canvas width="538" height="278"></canvas><div class="hint"></div></div>
<!-- item list -->
<div class="abs olive" style="left:658px;top:162px;width:214px;height:300px"></div>
<div class="abs blue list" style="left:667px;top:170px;width:200px;height:263px;padding:0"></div>
<div class="abs bar l-list" style="left:667px;top:437px;width:200px;height:20px"></div>
<div class="abs stripes" style="left:872px;top:155px;width:54px;height:440px"></div>
<!-- message box -->
<div class="abs olive" style="left:40px;top:450px;width:578px;height:146px"></div>
<div class="abs black" style="left:58px;top:459px;width:541px;height:127px"><div class="msgtx"></div></div>
<div class="abs olive sub"></div>
</div>`,this.drawBackground(),this.drawRed(),this.drawEmblem();const a=this.q(".pegs");for(const c of[223,353]){const l=document.createElement("div");l.className="abs",l.style.cssText=`left:615px;top:${c}px;width:44px;height:22px;border-radius:0 11px 11px 0;background:linear-gradient(180deg,#e8e8e0,#8a8a80 45%,#3a3a34 100%);border:1px solid #222`,a.appendChild(l)}addEventListener("resize",()=>this.layout())}layout(){const e=this.root.getBoundingClientRect();if(!e.width)return;const t=Math.min(e.width/En,e.height/Nt),n=this.q(".scr");n.style.transform=`translate(${(e.width-En*t)/2}px,${(e.height-Nt*t)/2}px) scale(${t})`}drawBackground(){const e=this.q(".bgc"),t=e.getContext("2d");t.fillStyle="#121212",t.fillRect(0,0,En,Nt);const n=t.getImageData(0,0,En,Nt);for(let o=0;o<n.data.length;o+=4){const a=14+Math.random()*16;n.data[o]=n.data[o+1]=n.data[o+2]=a,n.data[o+3]=255}t.putImageData(n,0,0);const i=(o,a,c,l,h)=>{const u=t.createLinearGradient(o-h,a,o+h,a+h);u.addColorStop(0,"#2a2a2a"),u.addColorStop(.5,"#6c6c68"),u.addColorStop(1,"#262626"),t.strokeStyle=u,t.lineWidth=h,t.beginPath(),t.moveTo(o,a),t.lineTo(c,l),t.stroke(),t.strokeStyle="rgba(160,160,150,.25)",t.lineWidth=1,t.beginPath(),t.moveTo(o,a-h/3),t.lineTo(c,l-h/3),t.stroke()},s=190;for(let o=-Nt;o<En+Nt;o+=s)i(o,0,o+Nt,Nt,16),i(o+Nt,0,o,Nt,16);for(const o of[8,Nt-10]){const a=t.createLinearGradient(0,o-10,0,o+10);a.addColorStop(0,"#222"),a.addColorStop(.5,"#5e5e5a"),a.addColorStop(1,"#1c1c1c"),t.fillStyle=a,t.fillRect(0,o-10,En,20)}for(let o=0;o<En;o+=s/2)t.fillStyle="#7a7a72",t.beginPath(),t.arc(o,8,2.5,0,7),t.fill(),t.beginPath(),t.arc(o,Nt-10,2.5,0,7),t.fill()}drawRed(){const e=this.q(".redemb"),t=e.getContext("2d"),n=e.width,i=e.height,s=t.createRadialGradient(n/2,i/2,4,n/2,i/2,n*.7);s.addColorStop(0,"#5a0000"),s.addColorStop(.5,"#a00808"),s.addColorStop(1,"#3a0000"),t.fillStyle=s,t.fillRect(0,0,n,i),t.fillStyle="rgba(0,0,0,.55)",t.beginPath(),t.ellipse(n/2,i/2-4,30,18,0,0,7),t.fill(),t.fillStyle="rgba(255,90,90,.5)",t.beginPath(),t.ellipse(n/2-12,i/2-7,7,4,0,0,7),t.ellipse(n/2+12,i/2-7,7,4,0,0,7),t.fill(),t.fillStyle="rgba(255,200,200,.75)",t.font="6px Arial";for(let o=0;o<3;o++)t.fillText("LET ME LIVE · MADE IN HEAVEN · ROCKFORT",10,i-18+o*6);t.strokeStyle="rgba(255,220,220,.8)",t.lineWidth=1;for(const[o,a,c,l]of[[3,3,1,1],[n-3,3,-1,1],[3,i-3,1,-1],[n-3,i-3,-1,-1]])t.beginPath(),t.moveTo(o,a+l*8),t.lineTo(o,a),t.lineTo(o+c*8,a),t.stroke()}drawEmblem(){const e=this.q(".emblem"),t=e.getContext("2d"),n=e.width,i=e.height;t.fillStyle="#0c0c66",t.fillRect(0,0,n,i),t.strokeStyle="rgba(90,110,255,.7)",t.lineWidth=1;for(let o=0;o<=n;o+=9)t.beginPath(),t.moveTo(o+.5,0),t.lineTo(o+.5,i),t.stroke();for(let o=0;o<=i;o+=9)t.beginPath(),t.moveTo(0,o+.5),t.lineTo(n,o+.5),t.stroke();const s=(o,a,c,l)=>{t.save(),t.translate(o,a),t.rotate(l);const h=t.createLinearGradient(0,0,0,-c);h.addColorStop(0,"#ff4a00"),h.addColorStop(.6,"#ffb000"),h.addColorStop(1,"#fff4a0"),t.fillStyle=h,t.beginPath(),t.moveTo(-c*.25,0),t.quadraticCurveTo(-c*.35,-c*.5,0,-c),t.quadraticCurveTo(c*.1,-c*.55,c*.3,0),t.closePath(),t.fill(),t.restore()};for(let o=0;o<9;o++)s(n/2+(o-4)*10,i*.72-Math.abs(o-4)*3,34-Math.abs(o-4)*4,(o-4)*.22);t.fillStyle="#e8e8f8";for(const o of[-1,1])t.beginPath(),t.moveTo(n/2,i*.45),t.quadraticCurveTo(n/2+o*30,i*.18,n/2+o*44,i*.3),t.quadraticCurveTo(n/2+o*24,i*.38,n/2+o*6,i*.55),t.fill();t.fillStyle="#1a1010",t.beginPath(),t.arc(n/2,i*.36,6,0,7),t.fill(),t.beginPath(),t.moveTo(n/2-7,i*.44),t.lineTo(n/2+7,i*.44),t.lineTo(n/2+10,i*.78),t.lineTo(n/2-10,i*.78),t.closePath(),t.fill(),t.fillStyle="#f6f0d0",t.font="bold 8px Arial",t.textAlign="center",t.fillText("MADE IN HEAVEN",n/2,i-5)}cond(){var t;const e=((t=this.player)==null?void 0:t.hp)??200;return e<60?2:e<120?1:0}condRgb(e=1){return["rgba(40,200,40,","rgba(230,180,30,","rgba(220,40,30,"][this.cond()]+e+")"}drawEcg(e){const t=this.q(".ecg"),n=t.getContext("2d");this.ecgT+=e;const i=t.width,s=t.height;n.fillStyle="#000",n.fillRect(0,0,i,s),n.strokeStyle="#4a4a4a",n.lineWidth=1;for(let p=6;p<s;p+=9)n.beginPath(),n.moveTo(8,p+.5),n.lineTo(i-8,p+.5),n.stroke();const o=[1.9,1.3,.9][this.cond()],a=this.ecgT%o/o,c=40,l=i-80,h=c+a*l,u=s*.52,d=p=>{const g=(p-c)/l;if(g<=.18)return 0;const _=(g-.18)*14;return Math.sin(_*1.6)*Math.exp(-_*.32)*.95};n.lineWidth=2;for(let p=c;p<h;p+=2){const g=(h-p)/l;n.strokeStyle=this.condRgb(+Math.max(0,1-g*1.6).toFixed(3)),n.beginPath(),n.moveTo(p,u-d(p)*s*.45),n.lineTo(p+2,u-d(p+2)*s*.45),n.stroke()}}renderer(){if(!this.r3){const e=this.q(".chk canvas");this.r3=new ch({canvas:e,antialias:!0,alpha:!0,preserveDrawingBuffer:!0}),this.r3.outputColorSpace=ft}return this.r3}async model(e){const t=`it_${String(e).padStart(3,"0")}.glb`;let n;try{n=await jn("inv/"+t)}catch{try{n=await jn("items/"+t)}catch{return null}}const i=n.scene.clone(!0);ui(i);const s=new Ft().setFromObject(i),o=s.getCenter(new w),a=s.getSize(new w).length()||1;i.position.sub(o);const c=new jt;return c.add(i),c.scale.setScalar(2/a),c}stageFor(e){const t=new lh;t.add(new xh(16777215,1.3));const n=new la(16777215,2.4);n.position.set(1,2,2.5),t.add(n);const i=new la(10473727,.8);i.position.set(-2,-1,-1),t.add(i),t.add(e);const s=new vt(28,1,.1,50);return s.position.set(0,0,4.4),s.lookAt(0,0,0),{scene:t,cam:s}}async icon(e){var g;if(this.icons.has(e))return this.icons.get(e);const t=await this.model(e);if(!t)return null;const n=new Ft().setFromObject(t).getSize(new w),i=((g=window.__iconRot)==null?void 0:g[e])??Rl[e];i?t.rotation.set(i[0],i[1],i[2]):n.y<=n.x&&n.y<=n.z?t.rotation.set(1.15,0,-.25):n.x<=n.y&&n.x<=n.z?t.rotation.set(.3,-1.2,0):t.rotation.set(.3,-.45,0);const{scene:s,cam:o}=this.stageFor(t);o.aspect=1.5,o.updateProjectionMatrix(),t.updateMatrixWorld(!0);const a=new Ft().setFromObject(t),c=a.getSize(new w),l=a.getCenter(new w),h=Math.tan(o.fov*Math.PI/360),u=Math.max(c.y,c.x/o.aspect)/(2*h)*1.08+c.z/2;o.position.set(l.x,l.y,l.z+u),o.lookAt(l);const d=this.renderer();d.setSize(192,128,!1),d.setClearColor(0,0),d.render(s,o);const p=d.domElement.toDataURL();return this.icons.set(e,p),p}async renderPortrait(){if(this.portrait)return;this.portrait=Bi("inv/portrait.jpg");const e=new Image;e.src=this.portrait,await e.decode().catch(()=>{});const t=this.q(".portrait");t.width=252,t.height=240,t.getContext("2d").drawImage(e,0,0,252,240)}async show(e){this.open=e,this.root.style.display=e?"block":"none",e?(this.layout(),this.mode="list",this.menuSel=3,this.setText(this.curName()),this.audio.se("menu"),await this.renderPortrait(),await this.render()):this.closeCheck()}cur(){return this.inv.slots[this.sel]??null}curName(){const e=this.cur();return e?ar(e.name):""}setText(e){this.pages=Array.isArray(e)?e:e.split("\f"),this.page=0,this.text=this.pages[0]??"";const t=this.q(".msgtx");t&&(t.textContent=this.text)}slotHtml(e,t,n=""){return e?`${t?`<img src="${t}">`:`<span style="font:bold 12px Arial">${vo(ar(e.name))}</span>`}${e.count>1||e.id===12||e.id===9?`<span class="cnt">${e.count}</span>`:""}${n}`:""}async render(){var a,c;const e=this.q;e(".menu").innerHTML=Ye.menu().map((l,h)=>`<div class="btn ${h===3&&this.mode!=="menu"?"on":""} ${this.mode==="menu"&&h===this.menuSel?"on sel":""}" style="position:absolute;left:${[18,116,216,314][h]}px;top:18px;width:90px;height:38px">${l}</div>`).join(""),e(".menu").style.cssText="left:40px;top:55px;width:0;height:0",e(".l-eq").textContent=Ye.equip(),e(".l-st").textContent=Ye.standard(),e(".l-status").textContent=Ye.status(),e(".l-name").textContent=Ye.name(),e(".l-info").textContent=Ye.info(),e(".l-cond").textContent=Ye.cond(),e(".l-list").textContent=Ye.list(),e(".i-full").textContent=Ye.full(),e(".i-h").textContent=Ye.height(),e(".i-w").textContent=Ye.weight(),e(".i-b").textContent=Ye.blood(),e(".i-cm").textContent=Ye.cm(),e(".i-kg").textContent=Ye.kg(),e(".i-bt").textContent=Ye.btype();{const l=this.cond(),h=e(".fine");h.textContent=l===2?Ye.danger():l===1?Ye.caution():Ye.fine(),h.style.color=this.condRgb()}const t=l=>l==null?null:this.inv.slots.find(h=>(h==null?void 0:h.id)===l)??null,n=t(this.equipped),i=t(this.standard);!n&&this.equipped!=null&&(this.equipped=null,(a=this.onEquipChange)==null||a.call(this)),!i&&this.standard!=null&&(this.standard=null,(c=this.onEquipChange)==null||c.call(this)),e(".eqbox").innerHTML=n?`<div class="slot" style="left:50px;top:0">${this.slotHtml(n,await this.icon(n.id))}</div>`:"",e(".stbox").innerHTML=i?`<div class="slot" style="left:0;top:0">${this.slotHtml(i,await this.icon(i.id))}</div>`:"";const s=[];for(let l=0;l<8;l++){const h=this.inv.slots[l],u=h?await this.icon(h.id):null,d=h&&(h.id===this.equipped||h.id===this.standard)?'<span class="eq">E</span>':"";s.push(`<div class="slot ${l===this.sel&&this.mode!=="menu"?"sel":""}" style="left:${l%2*100}px;top:${Math.floor(l/2)*65.5}px">${this.slotHtml(h,u,d)}</div>`)}e(".list").innerHTML=s.join("");const o=e(".sub");this.mode==="sub"?(o.innerHTML=this.subOpts.map((l,h)=>`<div class="${h===this.subSel?"sel":""}">${l.t}</div>`).join(""),o.style.left="478px",o.style.top=Math.min(330,175+Math.floor(this.sel/2)*65)+"px",o.style.display="block"):o.style.display="none",e(".msgtx").textContent=this.text}openSub(){const e=this.cur();if(!e)return;const t=wl.has(e.id)?{t:this.equipped===e.id?Ye.unequip():Ye.equipA(),k:"use"}:Cl.has(e.id)?{t:this.standard===e.id?Ye.putAway():Ye.hold(),k:"use"}:{t:Ye.use(),k:"use"};this.subOpts=[t,{t:Ye.check(),k:"check"},{t:Ye.combine(),k:"combine"}],this.subSel=0,this.mode="sub",this.audio.se("menu")}doUse(){var t,n,i;const e=this.cur();if(e)if(wl.has(e.id))this.equipped=this.equipped===e.id?null:e.id,(t=this.onEquipChange)==null||t.call(this),this.setText(this.equipped?Ye.equipped(ar(e.name)):this.curName());else if(Cl.has(e.id))this.standard=this.standard===e.id?null:e.id,(n=this.onEquipChange)==null||n.call(this),this.setText(this.standard?Ye.lit():Ye.unlit());else{if((i=this.onUseItem)!=null&&i.call(this,e.id))return;this.setText(e.id===12?Ye.ammo():Ye.noNeed())}}async openCheck(){const e=this.cur();if(!e)return;const t=await this.model(e.id),n=this.q(".chk");n.style.display="block",this.q(".chk .hint").textContent=Ye.rot(),this.renderer().setSize(538,278,!1);const s=new jt;if(t){s.add(t);const c=Rl[e.id];c&&t.rotation.set(c[0],c[1],c[2])}const{scene:o,cam:a}=this.stageFor(s);a.aspect=538/278,a.position.z=3.4,a.updateProjectionMatrix(),this.chk={scene:o,cam:a,obj:s,rx:.35,ry:0},this.setText(Y_(e.id)),this.mode="check"}closeCheck(){this.chk=null;const e=this.q(".chk");e&&(e.style.display="none"),this.mode==="check"&&(this.mode="list")}update(e){if(!this.open)return!1;const t=this.input,n=t.hit("KeyA","ArrowLeft"),i=t.hit("KeyD","ArrowRight"),s=t.hit("KeyW","ArrowUp"),o=t.hit("KeyS","ArrowDown");if(this.drawEcg(e),this.mode==="check"&&this.chk){const c=this.chk;return t.has("KeyA","ArrowLeft")?c.ry-=e*2.2:t.has("KeyD","ArrowRight")?c.ry+=e*2.2:c.ry+=e*.6,t.has("KeyW","ArrowUp")&&(c.rx-=e*2.2),t.has("KeyS","ArrowDown")&&(c.rx+=e*2.2),c.obj.rotation.set(c.rx,c.ry,0),this.r3.setClearColor(0,0),this.r3.render(c.scene,c.cam),t.action?this.page+1<this.pages.length?(this.page++,this.text=this.pages[this.page],this.q(".msgtx").textContent=this.text,this.audio.se("cursor")):(this.audio.se("cancel"),this.closeCheck(),this.setText(this.curName()),this.render()):(t.cancel||t.inventory)&&(this.audio.se("cancel"),this.closeCheck(),this.setText(this.curName()),this.render()),!0}if(this.mode==="sub"){if(s||o)this.subSel=(this.subSel+(o?1:this.subOpts.length-1))%this.subOpts.length,this.audio.se("cursor"),this.render();else if(t.action){const c=this.subOpts[this.subSel].k;this.mode="list",c==="use"?(this.audio.se("menu"),this.doUse(),this.render()):c==="check"?(this.audio.se("menu"),this.openCheck().then(()=>this.render())):(this.audio.se("cancel"),this.setText(Ye.noCombine()),this.render())}else t.cancel&&(this.mode="list",this.audio.se("cancel"),this.render());return!0}if(this.mode==="menu"){if(n||i)this.menuSel=(this.menuSel+(i?1:3))%4,this.audio.se("cursor"),this.setText(""),this.render();else if(o)this.mode="list",this.menuSel=3,this.audio.se("cursor"),this.setText(this.curName()),this.render();else if(t.action)if(this.menuSel===3)this.mode="list",this.audio.se("menu"),this.setText(this.curName()),this.render();else{if(this.menuSel===0)return this.audio.se("cancel"),this.show(!1),!1;this.audio.se("menu"),this.setText(Ye.noData())}else if(t.cancel||t.inventory)return this.audio.se("cancel"),this.show(!1),!1;return!0}let a=0;if(n&&this.sel%2===1&&(a=-1),i&&this.sel%2===0&&(a=1),o&&this.sel<6&&(a=2),s)if(this.sel>=2)a=-2;else return this.mode="menu",this.menuSel=3,this.audio.se("cursor"),this.render(),!0;if(a)this.sel+=a,this.audio.se("cursor"),this.setText(this.curName()),this.render();else if(t.action)this.cur()&&(this.openSub(),this.render());else if(t.cancel||t.inventory)return this.audio.se("cancel"),this.show(!1),!1;return!0}}const $_=["door_knob","door_open","door_close","typewriter","cursor","confirm","cancel","gun_shot","gun_shell","gun_empty","gun_rl1","gun_rl2","gun_rl3"],Z_=new Set(["000","002","003","004","005","006","008"]),J_=new Set(["002","003","005","008"]),po=["000_0","003_0","003_1","005_0","006_0","007_0"],Q_=(()=>{const r=[];for(let e=0;e<128;e++)r.push(e<=32?-2*e:e<=64?-64-6*(e-32):e<=96?-256-8*(e-64):e<127?-512-16*(e-96):-999);return r})(),Pi=r=>Q_[Math.max(0,Math.min(127,Math.round(-r)))]/10,ri=r=>r<=-99?0:Math.pow(10,r/20),ex=[0,-2,-4,-6,-8,-10,-12,-14,-16,-18,-20,-22,-24,-26,-28,-30,-32,-32,-30,-28,-26,-24,-22,-20,-18,-16,-14,-12,-10,-8,-6,-4,-2,0,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,32,30,28,26,24,22,20,18,16,14,12,10,8,6,4,2,0],tx=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-2,-4,-6,-8,-10,-12,-14,-16,-18,-20,-22,-24,-26,-28,-30,-32,-34,-36,-38,-38,-36,-34,-32,-30,-28,-26,-24,-22,-20,-18,-16,-14,-12,-10,-8,-6,-4,-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],nx=r=>r<30?0:r<40?-1:Math.max(-87,-2-Math.floor((r-40)/5)),ix=[0,256,256,0],sx=[512,768,768,512],mo=(r,e)=>String(r).padStart(e,"0");class rx{constructor(){A(this,"ctx",null);A(this,"master");A(this,"sfx");A(this,"music");A(this,"buffers",new Map);A(this,"bufP",new Map);A(this,"banks",new Map);A(this,"slots",new Map);A(this,"rmBank","");A(this,"bgBank","");A(this,"pcBank","");A(this,"bgmIdx",null);A(this,"bgmNo",-1);A(this,"bgmVol",-127);A(this,"bgmV",null);A(this,"bgCur",[null,null,null]);A(this,"footSw",[0,0,0]);A(this,"listener",null)}init(){if(this.ctx)return;try{this.ctx=new AudioContext}catch{return}const e=this.ctx;this.master=e.createGain(),this.master.gain.value=.9,this.master.connect(e.destination),this.sfx=e.createGain(),this.sfx.connect(this.master),this.music=e.createGain(),this.music.connect(this.master);const t=()=>{var n;return((n=this.ctx)==null?void 0:n.state)==="suspended"&&this.ctx.resume()};addEventListener("keydown",t),addEventListener("pointerdown",t);for(const n of $_)this.buf(`audio/${n}.ogg`)}buf(e){let t=this.bufP.get(e);return t||(t=(async()=>{try{const n=await fetch(Bi(e));if(!n.ok)return null;const i=await this.ctx.decodeAudioData(await n.arrayBuffer());return this.buffers.set(e,i),i}catch{return null}})(),this.bufP.set(e,t)),t}bank(e){let t=this.banks.get(e);return t||(t=(async()=>{try{const n=await fetch(Bi(`audio/se/${e}.json`));if(!n.ok)return null;const i=await n.json();if(this.ctx)for(const s of i.samples)this.buf(`audio/se/${s.f}.ogg`);return i}catch{return null}})(),this.banks.set(e,t)),t}room(e,t,n){if(!this.ctx)return;const i=`${e}${mo(t,2)}`;this.rmBank=Z_.has(i)?`rm_${i}_0`:"";const s=J_.has(i)?`bg_${i}_0`:"";if(!s)for(let a=0;a<3;a++)this.bgSeOff(a);this.bgBank=s;let o=po[0];for(const a of po)+a.slice(0,3)<=+i&&(a.endsWith("_0")||+a[4]===n)&&(o=a);po.includes(`${mo(+i,3)}_${n}`)&&(o=`${mo(+i,3)}_${n}`),this.pcBank=`pc_${o}`;for(const a of[...this.slots.keys()])a.startsWith("bg")||this.stop(a);for(const a of[this.rmBank,this.bgBank,this.pcBank,"rm_common"])a&&this.bank(a)}spatial(e){const t=this.listener;if(!e||!t)return{u:0,pan:0};const n=e.clone().applyMatrix4(t.matrixWorldInverse),i=n.length()*10;let s=Math.atan2(-n.x,-n.z)*180/Math.PI;s<0&&(s+=360);const o=Math.min(67,Math.floor(s/5));return{u:nx(i)+tx[o],pan:ex[o]/128}}async playList(e,t,n,i={}){var d;const s=this.ctx;if(!s||!e)return;e.startsWith("rm_")&&t>=64&&(e="rm_common");const o=await this.bank(e);if(!o)return;const a=o.lists[t];if(!a||!o.samples[a.s])return;n&&this.stop(n);const c=s.createGain(),l=s.createStereoPanner();c.connect(l).connect(this.sfx);const h={srcs:[],gain:c,pan:l,pos:(d=i.pos)==null?void 0:d.clone(),base:i.u??0},u=this.spatial(h.pos);l.pan.value=Math.max(-1,Math.min(1,(i.pan??0)+u.pan)),i.fade?this.fadeUnits(c,i.fade[0]+u.u,i.fade[1]+u.u,i.fade[2]):c.gain.value=ri(Pi(h.base+u.u)),n&&this.slots.set(n,h);for(let p=a,g=0;p&&g<4;p=p.l!==void 0?o.lists[p.l]:void 0,g++){const _=o.samples[p.s];if(!_)continue;const m=this.buffers.get(`audio/se/${_.f}.ogg`)??await this.buf(`audio/se/${_.f}.ogg`);if(!m)continue;if(n&&this.slots.get(n)!==h)return;const f=s.createBufferSource();f.buffer=m,i.cents&&(f.detune.value=i.cents),_.loop&&i.loop!==!1&&(f.loop=!0,f.loopStart=_.loop[0]/_.sr,f.loopEnd=Math.min(m.duration,_.loop[1]/_.sr));const S=s.createGain();S.gain.value=ri(p.v);let E=S;if(p.p!==void 0){const x=s.createStereoPanner();x.pan.value=p.p<128?(p.p-64)/64:1,S.connect(x),E=x}f.connect(S),E.connect(c),f.start(),h.srcs.push(f),f.onended=()=>{const x=h.srcs.indexOf(f);x>=0&&h.srcs.splice(x,1),!h.srcs.length&&n&&this.slots.get(n)===h&&this.slots.delete(n)}}}fadeUnits(e,t,n,i){const s=this.ctx,o=Math.max(2,Math.round(i)+1);if(i<=0){e.gain.value=ri(Pi(n));return}const a=new Float32Array(o);for(let c=0;c<o;c++)a[c]=ri(Pi(t+(n-t)*c/(o-1)));e.gain.cancelScheduledValues(s.currentTime),e.gain.setValueCurveAtTime(a,s.currentTime,i/30)}stop(e,t=0){const n=this.slots.get(e);if(!n)return;this.slots.delete(e);const i=this.ctx;if(t>0){n.gain.gain.cancelScheduledValues(i.currentTime),n.gain.gain.setValueAtTime(n.gain.gain.value,i.currentTime),n.gain.gain.linearRampToValueAtTime(0,i.currentTime+t/30);for(const s of n.srcs)s.stop(i.currentTime+t/30)}else for(const s of n.srcs)try{s.stop()}catch{}}eventSe(e,t,n,i){const s=i&&i[1]!==-1?i:void 0;this.playList(this.rmBank,t&255,`evt${e}`,{pos:n,fade:s,u:i?i[0]:0})}eventSeOff(e){this.stop(`evt${e}`)}bgSe(e,t,n=0){if(this.bgCur[e]===t&&this.slots.has(`bg${e}`))return;this.bgCur[e]=t;const i=(t>>8&15)===3?this.bgBank:this.rmBank;this.playList(i,t&255,`bg${e}`,n?{fade:[-127,0,n*.3]}:{})}bgSeOff(e,t=0){this.bgCur[e]=null,this.stop(`bg${e}`,t)}objSe(e,t,n){this.playList(this.rmBank,n&255,`obj${e}`,{pos:t})}objSeOff(e){this.stop(`obj${e}`)}foot(e,t,n,i=0,s){const o=t?sx:ix,a=o[Math.floor(Math.random()*4)&3];this.footSw[i]^=1,this.playList(this.pcBank,Math.max(0,Math.min(4,e)),`foot${i}_${this.footSw[i]}`,{pos:n,cents:a/1024*100,fade:s&&s[1]!==-1?s:void 0,u:s?s[0]:0})}action(e,t){this.playList(this.pcBank,e&255,"act",{pos:t})}async bgm(e,t=0,n=-45){const i=this.ctx;if(!i)return;if(e===this.bgmNo&&this.bgmV){n!==this.bgmVol&&(this.bgmVol=n,this.bgmV.gain.gain.setTargetAtTime(ri(Pi(n)),i.currentTime,.3));return}this.bgmOff(t||0),this.bgmNo=e,this.bgmVol=n,this.bgmIdx??(this.bgmIdx=fetch(Bi("audio/bgm.json")).then(h=>h.json()).catch(()=>({})));const s=(await this.bgmIdx)[e];if(!s||this.bgmNo!==e)return;const o=await this.buf(`audio/bgm/${s.f}.ogg`);if(!o||this.bgmNo!==e)return;const a=i.createBufferSource();a.buffer=o,s.loop&&(a.loop=!0,a.loopStart=s.loop[0],a.loopEnd=Math.min(o.duration,s.loop[1]));const c=i.createGain();a.connect(c).connect(this.music);const l=ri(Pi(n));t?(c.gain.setValueAtTime(0,i.currentTime),c.gain.linearRampToValueAtTime(l,i.currentTime+t/100)):c.gain.value=l,a.start(),this.bgmV={src:a,gain:c},a.onended=()=>{var h;((h=this.bgmV)==null?void 0:h.src)===a&&(this.bgmV=null)}}bgm2(e){this.bgm(e,100)}bgmOff(e=0){const t=this.ctx,n=this.bgmV;if(this.bgmNo=-1,this.bgmV=null,!t||!n)return;const i=t.currentTime+e/100;n.gain.gain.cancelScheduledValues(t.currentTime),n.gain.gain.setValueAtTime(n.gain.gain.value,t.currentTime),e>0&&n.gain.gain.linearRampToValueAtTime(0,i),n.src.stop(e>0?i:0)}update(){for(const[e,t]of this.slots)if(t.pos&&e.startsWith("obj")){const n=this.spatial(t.pos);t.gain.gain.setTargetAtTime(ri(Pi(t.base+n.u)),this.ctx.currentTime,.05),t.pan.pan.setTargetAtTime(n.pan,this.ctx.currentTime,.05)}}play(e,t=1,n=1,i=0){const s=this.ctx,o=this.buffers.get(`audio/${e}.ogg`);if(!s||!o)return 0;const a=s.createBufferSource();a.buffer=o,a.playbackRate.value=n;const c=s.createGain();return c.gain.value=t,a.connect(c).connect(this.sfx),a.start(s.currentTime+i),o.duration/n}se(e){switch(e){case"door":{const t=this.play("door_knob");this.play("door_open",.9,1,Math.max(.25,t*.6));break}case"doorClose":this.play("door_close");break;case"locked":this.play("door_knob"),this.play("door_knob",1,1.05,.35);break;case"pickup":case"menu":this.play("confirm");break;case"cursor":this.play("cursor",.7);break;case"cancel":this.play("cancel");break;case"typewriter":this.play("typewriter");break;case"lighter":this.play("door_knob",.35,2.2);break;case"knife":this.swish();break;case"shot":this.play("gun_shot"),this.play("gun_shell",.6,1,.35);break;case"empty":this.play("gun_empty");break;case"reload":this.play("gun_rl1",1,1,.1),this.play("gun_rl2",1,1,.4),this.play("gun_rl3",1,1,.75);break}}swish(){const e=this.ctx;if(!e)return;const t=Math.floor(e.sampleRate*.22),n=e.createBuffer(1,t,e.sampleRate),i=n.getChannelData(0);for(let c=0;c<t;c++){const l=c/t;i[c]=(Math.random()*2-1)*Math.sin(Math.PI*l)**2}const s=e.createBufferSource();s.buffer=n;const o=e.createBiquadFilter();o.type="bandpass",o.Q.value=2.5,o.frequency.setValueAtTime(900,e.currentTime),o.frequency.exponentialRampToValueAtTime(3800,e.currentTime+.2);const a=e.createGain();a.gain.value=.55,s.connect(o).connect(a).connect(this.sfx),s.start()}}function ox(r){const e=new Map,t=new Map,n=r.clone();return bh(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function bh(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)bh(r.children[n],e.children[n],t)}class Tr{constructor(){A(this,"root",new jt);A(this,"model");A(this,"mixer");A(this,"clips",new Map);A(this,"action",null);A(this,"cur","");A(this,"bones",{})}async load(e){const t=await jn(e);this.model=ox(t.scene),ui(this.model),this.model.traverse(n=>{n.isMesh&&(n.frustumCulled=!1),/^b\d\d$/.test(n.name)&&!this.bones[n.name]&&(this.bones[n.name]=n)}),this.root.add(this.model),this.mixer=new vh(this.model);for(const n of t.animations)this.clips.set(n.name,n);return this}play(e,t=.2,n=!0,i=1){var a;if(this.cur===e)return this.action;const s=this.clips.get(e);if(!s)return null;const o=this.mixer.clipAction(s);return o.reset(),o.setLoop(n?Ta:Ea,1/0),o.clampWhenFinished=!n,o.timeScale=i,this.action&&t>0?(o.play(),this.action.crossFadeTo(o,t,!1)):((a=this.action)==null||a.stop(),o.play()),this.action=o,this.cur=e,o}update(e){this.mixer.update(e)}}window.__EnemyModel=Tr;const oi={rise:"m11",walk:"m71",idle:"m56",lunge:"m73",bite:"m00",release:"m14",flinch:"m15",flinch2:"m16",dieF:"m09",dieB:"m10",lie:"m13"};class ax extends Tr{constructor(t){super();A(this,"state","idle");A(this,"t",0);A(this,"hp",8);A(this,"heading",0);A(this,"cool",0);A(this,"b00",null);A(this,"rootRest",new w);this.index=t}async init(t,n,i,s,o,a){return await this.load(t),this.model.traverse(c=>{c.name==="b00"&&!this.b00&&(this.b00=c)}),this.b00&&this.rootRest.copy(this.b00.position),this.root.position.set(n,i,s),this.heading=o,this.root.rotation.y=o,a?(this.state="lying",this.play(oi.lie,0,!0)):this.set("idle"),this.update(0),this}get hittable(){return!["lying","die","dead","rise"].includes(this.state)}get alive(){return this.state!=="die"&&this.state!=="dead"}set(t){this.state=t,this.t=0;const n=t!=="walk"&&t!=="idle";let i=oi[t]??oi.idle;t==="flinch"&&(i=Math.random()<.5?oi.flinch:oi.flinch2),t==="die"&&(i=Math.random()<.5?oi.dieF:oi.dieB),this.cur="",this.play(i,t==="bite"?.05:.2,!n,1)}get clipLen(){return this.action?this.action.getClip().duration:0}forward(t=new w){return t.set(-Math.sin(this.heading),0,-Math.cos(this.heading))}tick(t,n,i,s){this.t+=t,this.cool=Math.max(0,this.cool-t);const o=n.x-this.root.position.x,a=n.z-this.root.position.z,c=Math.hypot(o,a);let h=Math.atan2(-o,-a)-this.heading;h=Math.atan2(Math.sin(h),Math.cos(h));let u=!1;const d=g=>{this.heading+=Ht.clamp(h,-g*t,g*t)},p=g=>{const _=this.root.position.clone().addScaledVector(this.forward(),g*t);s.resolve(_,.25);const m=s.floorAt(_.x,_.z,this.root.position.y);m!==null&&Math.abs(m-this.root.position.y)<.5?_.y=m:_.y=this.root.position.y,this.root.position.copy(_)};switch(this.state){case"lying":c<3.2&&this.set("rise");break;case"rise":this.t>=this.clipLen&&this.set("walk");break;case"idle":c<7&&this.set("walk");break;case"walk":d(1.1),p(.36),c<.95&&Math.abs(h)<.5&&this.cool<=0&&i&&this.set("lunge");break;case"lunge":d(1.5),this.t<.6&&c>.55&&p(.9),this.t>.35&&this.t<.9&&c<.7&&i?(this.set("bite"),u=!0):this.t>=Math.min(this.clipLen,1.3)&&(this.cool=1.2,this.set("walk"));break;case"bite":break;case"release":this.t<.5&&p(-.8),this.t>=Math.min(this.clipLen,1.4)&&(this.cool=2.5,this.set("walk"));break;case"flinch":this.t<.3&&p(-.5),this.t>=Math.min(this.clipLen,1)&&this.set("walk");break;case"die":this.t>=this.clipLen&&(this.state="dead");break}return this.root.rotation.y=this.heading,this.update(t),this.b00&&this.state!=="die"&&this.state!=="dead"&&(this.b00.position.x=this.rootRest.x,this.b00.position.z=this.rootRest.z),u}hit(t){this.hittable&&(this.hp-=t,this.hp<=0?this.set("die"):this.state!=="bite"&&this.set("flinch"))}}const cx={idle:"m00",trot:"m00",run:"m01",leap:"m04",recoil:"m07",flinch:"m10",die:"m11"};class lx extends Tr{constructor(t){super();A(this,"state","idle");A(this,"t",0);A(this,"hp",6);A(this,"heading",0);A(this,"cool",0);A(this,"burst",0);A(this,"b00",null);A(this,"rootRest",new w);this.index=t}async init(t,n,i,s,o){return await this.load(t),this.model.traverse(a=>{a.name==="b00"&&!this.b00&&(this.b00=a)}),this.b00&&this.rootRest.copy(this.b00.position),this.root.position.set(n,i,s),this.heading=o,this.root.rotation.y=o,this.set("idle"),this.update(0),this}get hittable(){return this.state!=="die"&&this.state!=="dead"}get alive(){return this.hittable}set(t){this.state=t,this.t=0;const n=t==="idle"||t==="trot"||t==="run";this.cur="",this.play(cx[t],.15,n,1)}get clipLen(){return this.action?this.action.getClip().duration:0}forward(t=new w){return t.set(-Math.sin(this.heading),0,-Math.cos(this.heading))}tick(t,n,i,s){this.t+=t,this.cool=Math.max(0,this.cool-t),this.burst=Math.max(0,this.burst-t);const o=n.x-this.root.position.x,a=n.z-this.root.position.z,c=Math.hypot(o,a);let l=Math.atan2(-o,-a)-this.heading;l=Math.atan2(Math.sin(l),Math.cos(l));let h=!1;const u=p=>{this.heading+=Ht.clamp(l,-p*t,p*t)},d=p=>{const g=this.root.position.clone().addScaledVector(this.forward(),p*t);this.burst<=0&&s.resolve(g,.25);const _=s.floorAt(g.x,g.z,this.root.position.y);_!==null&&Math.abs(_-this.root.position.y)<.5?g.y=_:g.y=this.root.position.y,this.root.position.copy(g)};switch(this.state){case"idle":c<6.5&&(this.burst=1.2,this.set("run"));break;case"trot":u(2.5),d(1),this.cool<=0&&this.set("run");break;case"run":u(3.2),d(3.4),c<1.9&&Math.abs(l)<.35&&this.cool<=0&&i&&this.set("leap");break;case"leap":if(this.t<.45&&d(3.6),this.t>.15&&this.t<.5&&c<.75&&i){h=!0;break}this.t>=this.clipLen&&(this.cool=.6,this.set("trot"));break;case"recoil":this.t<.4&&d(-1.2),this.t>=this.clipLen&&(this.cool=1.5,this.set("trot"));break;case"flinch":this.t<.3&&d(-1.5),this.t>=this.clipLen&&(this.cool=.8,this.set("trot"));break;case"die":this.t>=this.clipLen&&(this.state="dead");break}return this.root.rotation.y=this.heading,this.update(t),this.b00&&this.state!=="die"&&this.state!=="dead"&&(this.b00.position.x=this.rootRest.x,this.b00.position.z=this.rootRest.z),h}hit(t){this.hittable&&(this.hp-=t,this.set(this.hp<=0?"die":"flinch"))}}const hx=[2,2,2,2,6,6,4,6,4,4,4,4,4,4,6,2,2,2,2,4,4,4,2,8,2,8,2,6,6,4,6,4,4,6,4,6,4,10,2,2,2,2,4,2,4,2,2,4,4,2,12,8,12,4,6,2,6,4,2,6,4,4,4,4,8,2,4,4,6,2,8,10,6,10,8,4,6,4,14,6,2,12,12,12,12,2,6,2,14,12,4,2,2,6,4,2,6,2,6,2,2,4,2,2,6,2,2,2,8,22,22,12,2,2,14,22,4,4,4,6,14,6,2,10,10,4,4,6,4,2,4,2,8,4,16,2,10,2,2,12,6,2,4,4,2,4,2,2,4,4,2,8,12,4,4,6,2,4,2,2,6,2,4,12,4,4,4,4,10,2,10,6,6,4,2,4,22,6,4,8,4,4,2,2,2,10,16,2,2,2,6,4,28,2,6,4,8,2,2,4,8,4,2,2,4,2,2,2,4,10,10,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,4,3,4,2,2,1,1,2],ux={100:[2,0,0,0,0,0,0,8,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,2,4,6,0,0,0,0,4,0,2,8,6,2,4,0,6,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],102:[0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],103:[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,6,2,0,8,8,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],105:[2,0,4,4,4,6,6,8,8,6,6,6,6,6,4,6,6,4,4,4,0,4,6,4,8,8,10,8,4,4,4,4,4,4,10,10,2,0,10,0,4,4,4,6,6,6,4,2,4,4,4,6,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,8,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};class dx{constructor(e,t){A(this,"px",0);A(this,"py",0);A(this,"pz",0);A(this,"ax",0);A(this,"ay",0);A(this,"az",0);A(this,"posSet",!1);A(this,"angSet",!1);A(this,"frm",0);A(this,"add",65536);A(this,"mtn",-1);A(this,"mtnKind",-1);A(this,"paused",!1);A(this,"gone",!1);A(this,"hidden",!1);A(this,"scripted",!1);A(this,"parts",new Map);A(this,"dead",!1);A(this,"hp",0);A(this,"link",null);this.kind=e,this.idx=t}}const fx=new Set([1,2,3,7,8,9,12,13,14,15,16,11]),px={1:65536,2:65536,0:32768,3:32768,8:32768,4:21845,5:16384,9:16384,6:13107,7:10922,10:10922,11:8192,12:6553,13:5461,14:9362,15:8192,16:7281,17:6553,18:5957,19:5461,20:4681,21:4096,22:3640,23:3276,24:2978,25:2730},zt=Math.PI/180;function mx(){const r=()=>new Array(32).fill(0);return{ev:r(),ky:r(),ed:r(),it:r(),mp:r(),ic:r(),ts:r(),gm:0}}class gx{constructor(e,t){A(this,"s",[]);A(this,"f");A(this,"rm",0);A(this,"st",0);A(this,"sp",-1>>>0);A(this,"cb",0);A(this,"pl",[0,0,0,0]);A(this,"etc",[]);A(this,"flr",[]);A(this,"wal",[]);A(this,"etc_idx",0);A(this,"flr_idx",0);A(this,"sb_id",0);A(this,"mes_sel",0);A(this,"rcase",0);A(this,"pos_no",0);A(this,"stg",0);A(this,"room",0);A(this,"wpnl",0);A(this,"works",new Map);A(this,"tasks",[]);A(this,"p",0);A(this,"cur",0);A(this,"ifel",0);A(this,"gsp",[]);A(this,"ct",null);A(this,"trace",!1);A(this,"pendingMsg",null);this.host=e,this.f=t??mx();for(let n=0;n<16;n++)this.tasks.push(this.newTask())}newTask(){return{status:0,p:0,script:0,loop:-1,cnt:[],cnt2:0,cnt3:0,lstack:[],lcond:[],data:0,work:null,cno:0,bp:[0,0,0],ba:[0,0,0],addp:[0,0,0],adda:[0,0,0],ips:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],ian:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]]}}work(e,t){const n=e+":"+t;let i=this.works.get(n);return i||(i=new dx(e,t),this.works.set(n,i)),i}init(e){this.s=e.map(t=>{const n=new Uint8Array(t.length/2);for(let i=0;i<n.length;i++)n[i]=parseInt(t.substr(i*2,2),16);return n});for(const t of this.tasks)t.status=0;this.wpnl=0,this.sp=4294967295,this.check(0),this.sp|=16,this.scheduler(),this.sp&=-17}tick(){if(this.s.length){this.check(1),this.scheduler();for(const e of this.works.values())e.paused||(e.frm+=e.add)}}roomChange(){this.st=0,this.rm=0,this.cb&=2944401595,this.f.gm&=2609643723,this.works.clear()}word(e,t,n){const i=this;if(!fx.has(e)){const c=t&31,h={4:"rm",5:"st",6:"sp",10:"cb"}[e];return{arr:null,bit:c,get:()=>(h?i[h]:0)>>>0,set:u=>{h&&(i[h]=u>>>0)}}}const s=t<<8|n;if(e>=13){const c=e-13;return{arr:null,bit:s&31,get:()=>i.pl[c]>>>0,set:l=>{i.pl[c]=l>>>0}}}if(e===11)return{arr:null,bit:s&31,get:()=>i.f.gm>>>0,set:c=>{i.f.gm=c>>>0}};const o={1:this.f.ev,2:this.f.ky,3:this.f.ed,7:this.f.it,8:this.f.mp,9:this.f.ic,12:this.f.ts}[e],a=(s&1023)>>5;return{arr:o,bit:s&31,get:()=>o[a]>>>0,set:c=>{o[a]=c>>>0}}}flag(e,t){const n=this.word(e,t>>8,t&255);return(n.get()>>>31-n.bit&1)===1}setFlag(e,t,n){const i=this.word(e,t>>8,t&255),s=2147483648>>>i.bit;i.set(n?i.get()|s:i.get()&~s)}cbBit(e){return 2147483648>>>e}check(e){this.s[e]&&(this.cur=e,this.p=0,this.ifel=0,this.gsp=[],this.ct=this.tasks[0],this.runLoop())}runLoop(){var t,n;let e=0;for(;;){for(;this.exec()!==0;)if(++e>1e5){(n=(t=this.host).log)==null||n.call(t,"evt: runaway script "+this.cur);return}if(this.ifel<=0)break;this.p=this.gsp.pop()??this.p,this.ifel--}}scheduler(){if(this.sp&16)for(let e=0;e<16;e++){const t=this.tasks[e];this.ct=t,t.status&&(this.cur=t.script,this.p=t.p,this.ifel=0,this.gsp=[],this.runLoop(),t.p=this.p)}}evtOn(e,t){if(e>=16)for(e=0;this.tasks[e].status!==0&&e!==15;)e++;const n=this.tasks[e],i=n.work;Object.assign(n,this.newTask()),n.work=i,n.status=1,n.script=t+2,n.p=0}b(e){return this.s[this.cur][this.p+e]??0}u16(e){return this.b(e)<<8|this.b(e+1)}len(e){var t;return e===100||e===102||e===103||e===105?((t=ux[e])==null?void 0:t[this.b(1)])||2:hx[e]||2}exec(){var c,l,h,u,d,p,g,_,m,f,S,E,x,D,R,C,P,b,M,I,V,B,q,K,X,J,G,se,ue,Me,Fe,$e,Y,ee,_e,re,Te,Ce,Oe,it,Ve,ct,U,At;const e=this.s[this.cur];if(this.p>=e.length)return this.ifel=0,0;const t=e[this.p],n=this.ct,i=O=>this.b(O),s=O=>this.u16(O),o=this.len(t),a=(O=1)=>(this.p+=o,O);switch(this.trace&&((l=(c=this.host).log)==null||l.call(c,`evt s${this.cur} @${this.p.toString(16)} op ${t.toString(16)}`)),t){case 0:return this.ifel=0,0;case 1:return this.gsp.push(this.p+2+i(1)),this.ifel++,this.p+=2,1;case 2:return this.gsp.pop(),this.ifel--,this.p+=i(1),1;case 3:return this.gsp.pop(),this.ifel--,this.p+=2,1;case 4:{const O=i(1);if(O===10&&(i(2)===23&&this.etc_idx!==i(4)||i(2)===22&&this.flr_idx!==i(4)))return a(0);const fe=this.word(O,i(2),i(3)),pe=fe.get()>>>31-fe.bit&1;return a(i(5)&1^pe)}case 5:{const O=this.word(i(1),i(2),i(3)),fe=2147483648>>>O.bit,pe=4294967295>>>O.bit,ke=O.get();switch(i(5)){case 0:O.set(ke|fe);break;case 1:O.set(ke&~fe);break;case 2:O.set(ke^fe);break;case 3:O.set(ke|pe);break;case 4:O.set(ke&~pe);break;case 5:O.set(ke^pe);break}return a(1)}case 6:{const O={0:this.stg,1:this.room,15:this.pos_no,8:this.sb_id,17:this.wpnl,21:this.rcase,23:0,24:0,25:0};return a(Il(O[i(1)]??0,i(2),i(3)))}case 7:{const O=i(2)===5?this.host.playerHp():i(2)===7?this.mes_sel:i(2)===10?this.work(1,i(1)).hp:0;return a(Il(O,i(3),s(4)))}case 8:{const O=i(2);switch(i(1)){case 0:this.stg=O;break;case 1:this.room=O;break;case 8:this.sb_id=O;break;case 15:this.pos_no=O;break;case 18:this.host.setWeapon(O);break;case 20:this.etc_idx=O;break;case 21:this.rcase=O;break}return a(1)}case 10:{const O=this.wal[i(1)];return O&&(O.flg=i(2)?O.flg&-2:O.flg|1),a(1)}case 11:{const O=this.etc[i(1)];return O&&(O.flg=i(2)?O.flg&-2:O.flg|1),a(1)}case 12:{const O=this.flr[i(1)];return O&&(O.flg=i(2)?O.flg&-2:O.flg|1),a(1)}case 13:{const O=s(2);return!this.flag(3,O)&&this.work(1,i(1)).dead&&this.setFlag(3,O,!0),a(1)}case 14:{const O=s(2),fe=i(4),pe=i(5);if(this.etc_idx!==fe)return a(1);if(this.cb&2048){if(!this.flag(7,O)){const ke=this.etc[fe];ke&&(pe||(ke.flg&=-2),this.work(3,ke.prm[0]).gone=!0),this.setFlag(7,O,!0),this.setFlag(9,O,!1)}}else this.flag(7,O)||this.setFlag(9,O,!0);return this.cb&=-2049,a(1)}case 15:return this.cb&=-1025,a(0);case 16:return a(this.cb&1024?+(this.sb_id===i(1)):0);case 17:return a(+this.host.hasItem(i(1)));case 18:{const O=i(1);return O===0||O===5?(this.cb&=-65,this.cb|=4,this.st|=4):O===1||O===4?(O===4&&(this.cb&=-65),this.cb&=-5,this.st&=-5,this.sp=4294967295):O===2?(this.cb&=-5,this.st&=-5):O===3&&(this.cb|=68,this.st|=4),this.host.cine(O),a(1)}case 19:return this.host.camSet(i(1),i(2),i(3)),a(1);case 41:return(u=(h=this.host).camPause)==null||u.call(h,i(1)===0),a(1);case 42:return(p=(d=this.host).camFix)==null||p.call(d,i(1),i(2)),a(1);case 91:return(_=(g=this.host).camInit)==null||_.call(g),a(1);case 43:return n.work&&(n.work.paused=i(1)===0),a(1);case 45:return this.work(1,i(1)).paused=!0,a(1);case 48:{const O=this.work(1,i(1));return O.paused=!0,O.frm=0,O.mtn=i(2),O.mtnKind=1,a(1)}case 20:return this.evtOn(i(2),i(3)),a(1);case 31:return i(1)===0?(i(3)===0&&(this.sp&=-8),this.openMessage(i(2))):this.sp|=7,a(1);case 32:{const O=this.ent(i(2),i(1));return O&&(O.hidden=i(3)===0),a(1)}case 34:return this.flag(3,s(2))&&(this.work(1,i(1)).gone=!0),a(1);case 35:{const O=this.etc[i(4)];return this.flag(7,s(2))?(O&&!i(5)&&(O.flg&=-2),this.work(3,i(1)).gone=!0):O&&(O.flg|=1),a(1)}case 36:{const O=this.ent(i(1),i(2));return O&&(O.gone=i(3)===0),a(1)}case 37:{const O=this.etc[i(1)];return O&&(O.attr=s(2),O.prm=[i(4),i(5),i(6),i(7)],O.type=i(8)),a(1)}case 38:return a(+(this.host.weapon()===i(1)));case 39:return this.host.setWeapon(i(1)),a(1);case 49:return this.host.loseItem(i(1)),a(1);case 51:return this.host.door(s(2),i(4),i(5),i(6),i(7)),this.sp=72,this.cb|=1,a(1);case 54:return this.host.fade((i(1)<<24|i(2)<<16|i(3)<<8|i(4))>>>0,i(5)),a(1);case 55:return this.rcase=i(1),a(1);case 56:{const O=(s(4)<<16)+(i(3)?32768:0),fe=i(1)===0?this.work(0,0):i(1)===1?this.work(1,i(2)):this.work(2,i(2));return a(fe.frm>=O?0:1)}case 94:return this.host.movie(i(1)),a(1);case 21:return(f=(m=this.host).snd)==null||f.call(m,"bgm",[i(1),i(2)*10,-45]),a(1);case 22:return(E=(S=this.host).snd)==null||E.call(S,"bgmOff",[i(1)*10]),a(1);case 166:return(D=(x=this.host).snd)==null||D.call(x,"bgm",[i(1),i(2)*10,-i(3)]),a(1);case 149:return(C=(R=this.host).snd)==null||C.call(R,"bgm2",[i(1),-45]),a(1);case 167:return(b=(P=this.host).snd)==null||b.call(P,"bgm2",[i(1),-i(2)]),a(1);case 147:return(I=(M=this.host).snd)==null||I.call(M,"bgmOff",[100]),a(1);case 23:return(B=(V=this.host).snd)==null||B.call(V,"se",[i(1),i(2),i(3),s(4),i(6)]),a(1);case 24:return(K=(q=this.host).snd)==null||K.call(q,"seOff",[i(1)]),a(1);case 28:return(J=(X=this.host).snd)==null||J.call(X,"bgSe",[i(1),s(2),i(4)*10]),a(1);case 148:return(se=(G=this.host).snd)==null||se.call(G,"bgSe",[i(1),s(2),0]),a(1);case 29:return(Me=(ue=this.host).snd)==null||Me.call(ue,"bgSeOff",[i(1),i(2)*10]),a(1);case 146:return($e=(Fe=this.host).snd)==null||$e.call(Fe,"bgSeOff",[i(1),100]),a(1);case 139:{const O=i(3),fe=(pe,ke)=>(O&ke?-1:1)*s(pe)/1e3;return(ee=(Y=this.host).snd)==null||ee.call(Y,"objSe",[i(1),fe(4,1),fe(6,2),fe(8,4),s(10)]),a(1)}case 69:return(re=(_e=this.host).snd)==null||re.call(_e,"objSeOff",[i(1)]),a(1);case 72:return(Ce=(Te=this.host).snd)==null||Ce.call(Te,"foot",[i(1),i(3),i(4),i(5)],n.work),a(1);case 134:return(it=(Oe=this.host).snd)==null||it.call(Oe,"easy",[i(1),i(2),-i(3),-i(4),i(5)-128,i(6)-128,i(7),i(8),i(9),i(10),i(11),i(12),s(14)]),a(1);case 212:return(ct=(Ve=this.host).snd)==null||ct.call(Ve,"sys",[s(2)]),a(1);case 182:return(At=(U=this.host).snd)==null||At.call(U,"case",[i(1)]),a(1);case 50:case 52:case 82:case 83:case 163:{const O=t===50||t===52?this.work(2,i(2)):this.work(3,i(2));if(i(4)!==0)return O.link=null,a(1);const fe=i(5),pe=(ke,Ee)=>(fe&Ee?-1:1)*s(ke)/1e3;return O.link={kind:t===52||t===163?0:t===82?2:1,idx:i(1),bone:i(3),lo:[pe(6,1),pe(8,2),pe(10,4)]},a(1)}case 99:return this.wpnl=Math.floor(Math.random()*100)%Math.max(1,i(1)),a(1);case 101:{const O=i(1);return n.work=this.work(O,O===0?0:i(2)),n.work.scripted=!0,n.cno=O===1||O===2?i(3):0,O===0&&(n.work.mtn=42,n.work.frm=0),a(1)}case 100:{const O=i(1),fe=n.work;return(O===128||O===139)&&fe?fe.scripted=!1:(O===7||O===12||O===13)&&this.common(n),a(1)}case 103:{const O=i(1),fe=n.work;return(O===128||O===143||O===139)&&fe&&(fe.scripted=!1),fe&&(O===143||O===144?fe.paused=!1:O===146?fe.paused=i(6)===4:O===147&&(fe.paused=i(5)===4)),a(1)}case 105:return this.common(n),a(1);case 129:{const O=!!(this.st&262144)||!!(this.st&8);return a(O?i(1)?0:1:i(1)?1:0)}case 155:return a(this.host.moviePlaying()?0:1);case 188:{const O=this.tasks[i(1)];return O&&(O.status=0),a(1)}case 243:case 253:{n.data=this.p;const O=n.lcond[n.loop];return this.p=O,this.exec()!==0?(this.p=n.lstack[n.loop],1):(this.p=n.data+1,n.loop--,t===243?1:0)}case 244:return this.p+=1,1;case 248:return n.loop++,n.cnt[n.loop]=s(2),this.p+=1,--n.cnt[n.loop]<=0&&(this.p+=3,n.loop--),0;case 249:return--n.cnt[n.loop]<=0&&(this.p+=3,n.loop--),0;case 250:return n.loop++,n.cnt3=n.cnt2=n.cnt[n.loop]=s(2)<<16>>16,this.p+=4,n.lstack[n.loop]=this.p,1;case 251:return--n.cnt[n.loop]!==0?(n.cnt2=n.cnt[n.loop],this.p=n.lstack[n.loop]):(this.p+=2,n.loop--),1;case 252:return n.loop++,n.lcond[n.loop]=this.p+2,this.p=this.p+i(1),n.lstack[n.loop]=this.p,1;case 254:return this.p+=1,0;case 255:return n.status=0,this.p+=2,0;default:return a(1)}}ent(e,t){return e<=3?this.work(e,e===0?0:t):null}openMessage(e){this.mes_sel=0,this.st|=512,this.st&=-580609,this.cb&=-536883201,this.pendingMsg=e,this.host.message(e)}messageClosed(e,t){this.st&=-513,e>=0&&(this.mes_sel=e,this.cb|=4096,this.st|=16384),this.cb|=8192,t&&(this.cb|=536870912,this.sp=4294967295,this.st&=-8709),this.pendingMsg=null}common(e){const t=c=>this.b(c),n=c=>this.u16(c),i=e.work,s=t(1);if(!i)return;const o=()=>{let c=i.parts.get(e.cno);return c||(c={},i.parts.set(e.cno,c)),c},a=(c,l)=>l?-c:c;switch(s){case 2:i.px+=a(e.addp[0],e.bp[0]),i.py+=a(e.addp[1],e.bp[1]),i.pz+=a(e.addp[2],e.bp[2]),i.posSet=!0;break;case 3:i.ax+=a(e.adda[0],e.ba[0]),i.ay+=a(e.adda[1],e.ba[1]),i.az+=a(e.adda[2],e.ba[2]),i.angSet=!0;break;case 5:e.addp=[t(2)*.01,t(3)*.01,t(4)*.01];break;case 6:e.adda=[t(2)*zt/2,t(3)*zt/2,t(4)*zt/2];break;case 7:i.px=a(n(2)/1e3,e.bp[0]),i.py=a(n(4)/1e3,e.bp[1]),i.pz=a(n(6)/1e3,e.bp[2]),i.posSet=!0;break;case 8:o().pos=[a(n(2)/1e3,e.bp[0]),a(n(4)/1e3,e.bp[1]),a(n(6)/1e3,e.bp[2])];break;case 9:o().ang=[a(t(2),e.ba[0])*zt,a(t(3),e.ba[1])*zt,a(t(4),e.ba[2])*zt];break;case 11:case 15:i.ax=a(t(2),e.ba[0])*zt,i.ay=a(t(3),e.ba[1])*zt,i.az=a(t(4),e.ba[2])*zt,i.angSet=!0;break;case 12:e.bp=[t(2),t(3),t(4)];break;case 13:e.ba=[t(2),t(3),t(4)];break;case 17:{const c=o(),l=c.pos??[0,0,0];c.pos=[l[0]+a(e.addp[0],e.bp[0]),l[1]+a(e.addp[1],e.bp[1]),l[2]+a(e.addp[2],e.bp[2])];break}case 18:{const c=o(),l=c.ang??[0,0,0];c.ang=[l[0]+a(e.adda[0],e.ba[0]),l[1]+a(e.adda[1],e.ba[1]),l[2]+a(e.adda[2],e.ba[2])];break}case 24:case 34:case 25:case 35:{i.add=px[t(2)]??65536,(s===24||s===34)&&(i.paused=!1,i.mtnKind=t(3),i.mtn=t(4),i.frm=0,s===34&&(i.frm=n(8)<<16));break}case 26:e.ips[t(2)]=[a(n(4)/1e3,t(3)&1),a(n(6)/1e3,t(3)&2),a(n(8)/1e3,t(3)&4)];break;case 27:e.ian[t(2)]=[a(t(4),t(3)&1),a(t(5),t(3)&2),a(t(6),t(3)&4)];break;case 30:case 31:case 28:case 43:case 44:case 45:{const c=e.cnt3?e.cnt2/e.cnt3:1,h=t(2)!==0?c:.5*c+1.5*c*c-c*c*c,u=(m,f)=>[m[0]+(f[0]-m[0])*h,m[1]+(f[1]-m[1])*h,m[2]+(f[2]-m[2])*h],d=s===30||s===28||s===43||s===44,p=s===31||s===28||s===43||s===45,g=s===43||s===44?t(3):7,_=s===43?t(4):s===45?t(3):7;if(d){const m=u(e.ips[1],e.ips[0]);if(e.cno===0)g&1&&(i.px=m[0]),g&2&&(i.py=m[1]),g&4&&(i.pz=m[2]),i.posSet=!0;else{const f=o(),S=f.pos??[0,0,0];f.pos=[g&1?m[0]:S[0],g&2?m[1]:S[1],g&4?m[2]:S[2]]}}if(p){const m=u(e.ian[1],e.ian[0]).map(f=>f*zt);if(e.cno===0)_&1&&(i.ax=m[0]),_&2&&(i.ay=m[1]),_&4&&(i.az=m[2]),i.angSet=!0;else{const f=o(),S=f.ang??[0,0,0];f.ang=[_&1?m[0]:S[0],_&2?m[1]:S[1],_&4?m[2]:S[2]]}}break}case 40:i.frm=n(2)<<16;break;case 48:e.ips[t(2)]=e.cno===0?[i.px,i.py,i.pz]:[...o().pos??[0,0,0]];break;case 49:e.ian[t(2)]=[i.ax/zt,i.ay/zt,i.az/zt];break}}}function Il(r,e,t){switch(e){case 0:return+(r===t);case 1:return+(r>t);case 2:return+(r>=t);case 3:return+(r<t);case 4:return+(r<=t);case 5:return+(r!==t)}return 0}function go(r){const e=parseInt(r.type,16)>>>0,t=parseInt(r.flags,16)>>>0,n=r.extra>>>0,i=((t&255)<<24|(t&65280)<<8|t>>>8&65280|t>>>24)>>>0;return{flg:e&255,type:e>>8&255,id:e>>16&255,flr:e>>>24,attr:i,x:r.x,y:r.y,z:r.z,w:r.sx,h:r.sy,d:r.sz,prm:[n&255,n>>8&255,n>>16&255,n>>>24]}}function _x(r){return new Promise((e,t)=>{const n=document.createElement("script");n.src=r,n.onload=()=>e(),n.onerror=()=>t(new Error("load "+r)),document.head.appendChild(n)})}async function xx(r,e){var n,i,s;const t=(n=window.__MOVIES)==null?void 0:n[r];if(window.__ASSETS){if(!t)return null;if(!((i=window.__MV)!=null&&i[r])||window.__MV[r].length<t)for(let c=0;c<t;c++)await _x(`data/${r}_${String(c).padStart(2,"0")}.js`),e((c+1)/t);const a=(((s=window.__MV)==null?void 0:s[r])??[]).map(c=>{const l=atob(c),h=new Uint8Array(l.length);for(let u=0;u<l.length;u++)h[u]=l.charCodeAt(u);return h});return delete window.__MV[r],URL.createObjectURL(new Blob(a,{type:"video/mp4"}))}return`movies/${r}.mp4`}async function Eh(r,e){const t=document.createElement("div");t.style.cssText="position:absolute;inset:0;background:#000;z-index:20;display:flex;align-items:center;justify-content:center";const n=document.createElement("div");n.style.cssText="position:absolute;bottom:3%;right:3%;font:12px sans-serif;color:#777;letter-spacing:.1em;transition:opacity .5s",t.appendChild(n),r.appendChild(t),n.textContent=dt==="ru"?"ЗАГРУЗКА РОЛИКА…":"LOADING MOVIE…";let i=null;try{i=await xx(e,o=>n.textContent=(dt==="ru"?"ЗАГРУЗКА РОЛИКА… ":"LOADING MOVIE… ")+Math.round(o*100)+"%")}catch(o){console.warn(o)}if(!i){t.remove();return}const s=document.createElement("video");s.src=i,s.playsInline=!0,s.preload="auto",s.style.cssText="width:100%;height:100%;object-fit:contain;background:#000",t.insertBefore(s,n),n.textContent=dt==="ru"?"Enter / Esc — пропустить":"Enter / Esc — skip",await new Promise(o=>{let a=!1;const c=()=>{a||(a=!0,removeEventListener("keydown",l,!0),s.pause(),o())},l=h=>{["Enter","Space","Escape","KeyE"].includes(h.code)&&(h.preventDefault(),h.stopPropagation(),c())};addEventListener("keydown",l,!0),t.addEventListener("click",c),s.addEventListener("ended",c),s.addEventListener("error",c),s.play().catch(()=>{s.muted=!0,s.play().catch(c)}),setTimeout(()=>n.style.opacity="0",4e3)}),t.remove(),i.startsWith("blob:")&&URL.revokeObjectURL(i)}const vx=new Set(["rm_0000","rm_0010","rm_0020","rm_0021","rm_0030","rm_0031","rm_0040","rm_0050","rm_0060","rm_0080"]),yx=new Set(["en91a00","en93a00","en98a00"]),Mx=new Set([0,1,2,9,10,32,33]),Hn=55,Th=8,Vn=9,Pl=12,Ll=15,_o={[Hn]:1,[Th]:2,[Vn]:4},Sx=1.5,bx=[.45,.075,.45,.6,.2],Dt=(r,e)=>String(r).padStart(e,"0");class Ex{constructor(e){A(this,"renderer");A(this,"scene",new lh);A(this,"cam",new V_);A(this,"input",new G_);A(this,"player",new z_);A(this,"inv",new X_);A(this,"msg");A(this,"room",null);A(this,"roomId","");A(this,"busy",!1);A(this,"invOpen",!1);A(this,"invScreen");A(this,"debug",!1);A(this,"clock",new Ig);A(this,"audio",new rx);A(this,"playTime",0);A(this,"vm");A(this,"evtAcc",0);A(this,"wallSig","");A(this,"movieOn",!1);A(this,"pendingDoor",null);A(this,"dialog",!1);A(this,"ambient",new xh(12109016,.95));A(this,"hemi",new Eg(10135232,2760728,.5));A(this,"actors",[]);A(this,"chars",[]);A(this,"linkM",new Ae);A(this,"linkT",new Ae);A(this,"linkR",new Ae);A(this,"linkBase",new Map);A(this,"npcs",[]);A(this,"zombies",[]);A(this,"dogs",[]);A(this,"dogBite",null);A(this,"grab",null);A(this,"overShown",!1);A(this,"loop",()=>{requestAnimationFrame(this.loop);const e=Math.min(this.clock.getDelta(),1/10);this.step(e),this.renderer.render(this.scene,this.cam.cam),this.input.endFrame()});this.ui=e,this.renderer=new ch({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=ft,this.ui.stage.prepend(this.renderer.domElement),this.msg=new Fh(this.ui.msg),this.vm=new gx(this),this.invScreen=new K_(this.ui.inv,this.inv,this.input,this.audio,this.player),this.invScreen.onEquipChange=()=>{this.player.setLighter(this.invScreen.standard===Hn),this.player.setKnife(this.invScreen.equipped===Th),this.player.setGun(this.invScreen.equipped===Vn)},this.invScreen.onUseItem=i=>this.useItem(i),this.scene.background=new we(0),this.scene.add(this.ambient,this.hemi,this.player.root),addEventListener("resize",()=>this.resize()),this.resize(),localStorage.getItem("cvx.cam")==="behind"&&(this.cam.mode="behind"),this.player.onSlash=i=>this.onSlash(i);const n=()=>this.inv.slots.find(i=>(i==null?void 0:i.id)===Vn);this.player.canFire=()=>{var i;return(((i=n())==null?void 0:i.count)??0)>0},this.player.emptyClick=()=>this.audio.se("empty"),this.player.onStep=(i,s)=>{const o=i?this.bonePos(0,0,i===this.player.bones.b17?17:21):this.player.pos.clone();this.audio.foot(this.floorSound(o),s===1,o,0)},this.player.onFire=(i,s,o)=>this.onFire(i,s,o),this.player.needReload=()=>{const i=n(),s=this.inv.slots.find(a=>(a==null?void 0:a.id)===Pl);if(!i||i.count>0||!s)return!1;const o=Math.min(Ll,s.count);return i.count+=o,s.count-=o,s.count<=0&&(this.inv.slots[this.inv.slots.indexOf(s)]=null),this.audio.se("reload"),!0},window.__game=this}resize(){const{w:e,h:t}=this.ui.fit(Ts);this.renderer.setSize(e,t,!1),this.renderer.domElement.style.width=e+"px",this.renderer.domElement.style.height=t+"px"}async start(e,t){await this.player.load(),this.audio.init(),e?(this.player.hp=e.hp??200,this.inv.slots=e.inv.map(n=>n?{...n}:null),this.invScreen.equipped=e.eq??null,this.invScreen.standard=e.std??null,this.playTime=e.t??0,e.evt&&(this.vm.f=e.evt.f,this.vm.rcase=e.evt.rcase),await this.enterRoom(e.room,e.pos??0,{x:e.x,y:e.y,z:e.z,h:e.h},!1)):(this.inv.add(Hn,xo[Hn]),await this.enterRoom("rm_0000",0,void 0,!1)),this.invScreen.onEquipChange(),this.renderer.domElement.addEventListener("mousedown",()=>{this.cam.mode==="behind"&&!this.invOpen&&!this.msg.active&&this.input.requestLock(this.renderer.domElement)}),this.loop(),t==null||t(),e&&await this.ui.fade(!1,900)}async enterRoom(e,t,n,i=!0,s=0){this.busy=!0;const o=performance.now();i&&await this.ui.fade(!0,350),this.room&&(this.scene.remove(this.room.group),this.vm.roomChange());const[a,c]=await Promise.all([Wa.load(e),Sh(`evt/${e}.json`).catch(()=>({scripts:[]}))]);await a.placeItems(),this.room=a,this.roomId=e;for(const d of[...this.zombies,...this.dogs])this.scene.remove(d.root);for(const d of this.actors)this.scene.remove(d);for(const d of this.chars)this.scene.remove(d.m.root);if(this.chars=[],this.zombies=[],this.dogs=[],this.npcs=[],this.actors=[],this.grab=null,this.dogBite=null,n)this.player.place(n.x,n.y,n.z,n.h);else{const d=a.data.spawns[Math.max(0,Math.min(t,a.data.spawns.length-1))];this.player.place(d.pos[0],d.pos[1],d.pos[2],d.ang)}const l=a.floorAt(this.player.pos.x,this.player.pos.z,this.player.pos.y+.3,.6);l!==null&&(this.player.pos.y=l);const h=this.vm;h.stg=+e[3],h.room=parseInt(e.slice(4,6),10),h.rcase=+e[6],h.pos_no=t,h.etc=a.data.triggers.map(go),h.wal=a.data.collision.map(go),h.flr=(a.data.areas??[]).map(go),this.syncPlayerWork(),this.cam.forced=null,this.wallSig="",this.audio.room(h.stg,h.room,h.rcase),this.audio.listener=this.cam.cam,h.init(c.scripts),await this.spawnEnemies(a),this.applyWorks(),this.scene.add(a.group),this.cam.setRoom(a),this.cam.ev.setRoom(c.evc??[]),this.cam.lockFn=(d,p,g,_)=>this.lockPos(d,p,_,g),this.player.root.updateMatrixWorld(!0),this.cam.update(this.player.pos,this.player.headPos(),this.player.heading,!0),this.renderer.compile(this.scene,this.cam.cam);const u=s-(performance.now()-o);u>0&&await new Promise(d=>setTimeout(d,u)),i&&await this.ui.fade(!1,350),this.busy=!1}async spawnEnemies(e){const t=e.data.enemies??[];for(let n=0;n<t.length;n++){const i=t[n];this.vm.works.get("1:"+n);const s=i.ex??"000000000000",o=parseInt(s.slice(0,4),16),a=parseInt(s.slice(6,8),16);if(i.id===1){if(!Mx.has(a)){console.info(`${this.roomId}: zombie ${n} model en01a${Dt(a,2)} not converted`);continue}const c=o===0&&this.roomId.startsWith("rm_002"),l=new ax(n);await l.init(`enemies/en01a${Dt(a,2)}.glb`,i.pos[0],i.pos[1],i.pos[2],c?i.rot[1]??0:i.rot[2]??0,c),this.zombies.push(l),this.scene.add(l.root);const h=this.vm;this.npcs.push({root:l.root,get hittable(){var u;return l.root.visible&&l.hittable&&!((u=h.works.get("1:"+n))!=null&&u.scripted)},hit:()=>this.hitZombie(l,1)})}else if(i.id===4){const c=new lx(n);await c.init("enemies/en04a00.glb",i.pos[0],i.pos[1],i.pos[2],i.rot[2]??0),this.dogs.push(c),this.scene.add(c.root),this.npcs.push({root:c.root,get hittable(){return c.root.visible&&c.hittable},hit:()=>this.hitZombie(c,1)})}else if(yx.has(`en${Dt(i.id,2)}a${Dt(a,2)}`)){const c=new Tr;await c.load(`npc/en${Dt(i.id,2)}a${Dt(a,2)}.glb`),c.root.position.set(i.pos[0],i.pos[1],i.pos[2]),c.root.rotation.y=i.rot[1]??0;{const l=this.vm.works.get("1:"+n);c.root.visible=!(l&&(l.gone||l.hidden))}this.chars.push({index:n,m:c}),this.scene.add(c.root)}else console.info(`${this.roomId}: character en${Dt(i.id,2)} (enemy ${n}) not converted`)}}syncPlayerWork(){const e=this.vm.work(0,0),t=this.player;e.posSet||(e.px=t.pos.x,e.py=t.pos.y,e.pz=t.pos.z),e.angSet||(e.ay=t.heading)}applyWorks(){const e=this.vm,t=this.room,n=this.player,i=e.works.get("0:0");i?(i.posSet?(n.place(i.px,i.py,i.pz,i.angSet?i.ay:n.heading),i.posSet=!1,i.angSet=!1):i.angSet&&(n.place(n.pos.x,n.pos.y,n.pos.z,i.ay),i.angSet=!1),n.root.visible=!i.gone&&!i.hidden):n.root.visible=!0;for(const[o,a]of t.itemMeshes){const c=e.works.get("3:"+o);if(!c){a.visible=!0;continue}a.visible=!c.gone&&!c.hidden,c.posSet&&(a.position.set(c.px,c.py,c.pz),c.posSet=!1),c.angSet&&(a.rotation.set(c.ax,c.ay,c.az,"ZYX"),c.angSet=!1)}for(const[o,a]of t.objMeshes){const c=e.works.get("2:"+o);c&&(a.visible=!c.gone&&!c.hidden&&(!t.outside.has(o)||!!c.link),c.posSet&&(a.position.set(c.px,c.py,c.pz),c.posSet=!1),c.angSet&&(a.rotation.set(c.ax,c.ay,c.az,"ZYX"),c.angSet=!1))}for(const o of this.chars){const a=e.works.get("1:"+o.index),c=o.m;a&&(c.root.visible=!a.gone&&!a.hidden,a.posSet&&(c.root.position.set(a.px,a.py,a.pz),a.posSet=!1),a.angSet&&(c.root.rotation.set(a.ax,a.ay,a.az,"ZYX"),a.angSet=!1),a.mtnKind===1&&a.mtn>=0&&this.roomMotion(c,a))}for(const o of[...this.zombies,...this.dogs]){const a=e.works.get("1:"+o.index);if(a&&(o.root.visible=!a.gone&&!a.hidden,a.posSet&&((a.px||a.py||a.pz)&&o.root.position.set(a.px,a.py,a.pz),a.posSet=!1),a.angSet&&(o.heading=a.ay,o.root.rotation.y=a.ay,a.angSet=!1),a.mtnKind===1&&a.mtn>=0)){const c=`${this.roomId}/r${Dt(a.mtn,2)}`;o.cur!==c&&o.clips.has(c)&&(o.root.position.set(a.px,a.py,a.pz),o.heading=a.ay,o.root.rotation.y=a.ay),this.roomMotion(o,a)}}const s=e.wal.map(o=>o.flg&1).join("");s!==this.wallSig&&(this.wallSig=s,t.syncWalls(o=>!!(e.wal[o]&&e.wal[o].flg&1)))}inBox(e,t,n){return t>=Math.min(e.x,e.x+e.w)&&t<=Math.max(e.x,e.x+e.w)&&n>=Math.min(e.z,e.z+e.d)&&n<=Math.max(e.z,e.z+e.d)}quadBit(){const e=Math.round(this.player.heading/(Math.PI*2)*65536)+8192&49152;return e===32768?1024:e===16384?2048:e===0?4096:8192}floorCheck(){const e=this.vm,t=this.player,n=t.forward(),i=this.quadBit();e.cb&=-134218241;for(let s=0;s<e.flr.length;s++){const o=e.flr[s];if(!(o.flg&1)||o.type!==0)continue;let a;o.attr&1?a=this.inBox(o,t.pos.x+n.x*.6,t.pos.z+n.z*.6)&&!(o.attr&i):a=this.inBox(o,t.pos.x,t.pos.z),a&&(e.cb|=512,e.flr_idx=s)}}examine(){const e=this.vm,t=this.player,n=t.forward(),i=this.quadBit();e.cb&=-257;for(let s=0;s<e.etc.length;s++){const o=e.etc[s];if(!(o.flg&1))continue;const a=bx[o.type]??.45;if(!(!this.inBox(o,t.pos.x+n.x*a,t.pos.z+n.z*a)||o.attr&i)){if(e.cb|=256,e.etc_idx=s,o.type===0)this.door(0,o.prm[0],o.prm[1],o.prm[2]);else if(o.type===3)o.attr&32768&&this.showMessage(o.prm[1],!0);else if(o.type===4&&!(o.attr&2)){const c=o.prm[0],l=this.room.data.items[c],h=e.works.get("3:"+c);l&&!(h!=null&&h.gone)&&(e.sb_id=l.id,this.itemScreen())}return!0}}return!1}useItem(e){const t=this.vm;if(!(t.cb&512))return!1;const n=t.flr[t.flr_idx];return!n||!n.prm.includes(e)?!1:(t.sb_id=e,t.cb|=1024,this.toggleInv(!1),!0)}roomMessage(e){var t;return((t=this.room)==null?void 0:t.data.messages[e])??""}showMessage(e,t){const n=this.roomMessage(e),i=ps(n,this.vm.sb_id),s=Dh(n);if(t&&(this.vm.st|=8704),!i.length){queueMicrotask(()=>this.vm.messageClosed(-1,t));return}this.msg.show(i,s?[Zn.yes(),Zn.no()]:void 0).then(o=>this.vm.messageClosed(s?o:-1,t))}async itemScreen(){const e=this.vm,t=e.sb_id,n=!!(e.cb&16384);e.cb&=-16401,this.dialog=!0;try{if(!n&&await this.msg.show(ps(wr[157],t),[Zn.yes(),Zn.no()])!==0){e.cb&=-32769;return}let i=t===Pl||t===Vn?Ll:1;if(e.cb&32768&&t===Vn&&(i-=3),!this.inv.add(t,xo[t]??"",i)){e.cb&=-32769,await this.msg.show(ps(wr[154]));return}e.cb|=2048,this.audio.se("pickup"),e.cb&32768&&t===Vn&&(this.invScreen.equipped=Vn,this.invScreen.onEquipChange()),e.cb&=-32769,await this.msg.show(ps(wr[158],t))}finally{this.dialog=!1}}lockPos(e,t,n,i=0){var l,h;const s=this.room;let o;if(e===6){const u=s.data.spawns[t]??s.data.spawns[0];return u?new w(u.pos[0]+n[0],u.pos[1]+n[1],u.pos[2]+n[2]):null}if(e===1?o=this.player.root:e===2?o=((l=this.chars.find(u=>u.index===t))==null?void 0:l.m.root)??((h=[...this.zombies,...this.dogs].find(u=>u.index===t))==null?void 0:h.root):e===3?o=s.objMeshes.get(t):e===4&&(o=s.itemMeshes.get(t)),!o)return null;if(i>0&&e<=4){const u=this.boneObj(e-1,t,i);u&&u!==o&&(o=u)}o.updateWorldMatrix(!0,!1);const a=o.matrixWorld.clone(),c=new w().setFromMatrixScale(a);return a.multiply(new Ae().makeScale(1/c.x,1/c.y,1/c.z)),new w(n[0],n[1],n[2]).applyMatrix4(a)}roomMotion(e,t){const n=`${this.roomId}/r${Dt(t.mtn,2)}`;if(!e.clips.has(n))return;if(e.cur!==n){const s=e.play(n,0,!1);s&&(s.paused=!0)}const i=e.action;i&&(i.time=Math.min(t.frm/65536/30,i.getClip().duration),e.mixer.update(0))}evtFrame(){const e=this.vm;this.syncPlayerWork(),this.floorCheck(),e.tick(),this.cam.ev.step(),this.applyWorks(),e.cb&16&&!this.dialog&&this.itemScreen(),e.cb&2097152&&(e.cb&=-2097153,this.saveScreen())}get inCine(){const e=this.vm.works.get("0:0");return!!(this.vm.st&4)||!!(e!=null&&e.scripted)||!!(e!=null&&e.gone)}hasItem(e){return this.inv.has(e)}loseItem(e){const t=this.inv.slots.findIndex(n=>(n==null?void 0:n.id)===e);t>=0&&(this.inv.slots[t]=null),this.invScreen.equipped===e&&(this.invScreen.equipped=null),this.invScreen.standard===e&&(this.invScreen.standard=null),this.invScreen.onEquipChange()}weapon(){return this.invScreen.standard===Hn?1:_o[this.invScreen.equipped??-1]??0}setWeapon(e){const t=Object.keys(_o).map(Number).find(n=>_o[n]===e);t===Hn?this.inv.has(Hn)&&(this.invScreen.standard=Hn,this.invScreen.equipped=null):t!==void 0?this.inv.has(t)&&(this.invScreen.equipped=t,this.invScreen.standard=null):(this.invScreen.equipped=null,this.invScreen.standard=null),this.invScreen.onEquipChange()}message(e){this.showMessage(e,!1)}fade(e,t){this.ui.fade(e>>>24>=128,Math.max(1,t)*1e3/30)}cine(e){(e===1||e===2||e===4)&&(this.cam.forced=null)}camSet(e,t,n){e===0?this.cam.ev.start(t,n):this.cam.ev.stop()}camFix(e,t){this.cam.forced=e===0?t:null}camPause(e){this.cam.ev.paused=e}camInit(){this.cam.ev.stop(),this.cam.forced=null}door(e,t,n,i){this.pendingDoor={stg:t,room:n,pos:i}}movie(e){this.movieOn=!0,Eh(this.ui.stage,`mv_${Dt(e,3)}`).finally(()=>{this.movieOn=!1})}moviePlaying(){return this.movieOn}boneObj(e,t,n){var i,s;if(e===0)return this.player.bones["b"+Dt(n,2)]??this.player.root;if(e===1){const o=this.chars.find(c=>c.index===t);if(o){const c=n<=5?n:n<15?5:n-4;return o.m.bones["b"+Dt(c,2)]??o.m.root}const a=[...this.zombies,...this.dogs].find(c=>c.index===t);return a?a.bones["b"+Dt(n,2)]??a.root:void 0}if(e===2)return(i=this.room)==null?void 0:i.objMeshes.get(t);if(e===3)return(s=this.room)==null?void 0:s.itemMeshes.get(t)}bonePos(e,t,n){const i=this.boneObj(e,t,n);if(i)return i.updateWorldMatrix(!0,!1),new w().setFromMatrixPosition(i.matrixWorld)}floorSound(e){if(!e)return 0;let t=0;for(const n of this.vm.flr)n.flg&1&&n.type===1&&!(n.attr&1)&&this.inBox(n,e.x,e.z)&&(t=n.prm[0]);return t}updateLinks(){const e=this.room;if(e)for(const[t,n]of this.vm.works){if(n.kind!==2&&n.kind!==3)continue;const i=(n.kind===2?e.objMeshes:e.itemMeshes).get(n.idx);if(!i)continue;if(!n.link){const c=this.linkBase.get(i);c&&(i.position.copy(c.pos),i.rotation.copy(c.rot),i.scale.copy(c.scale),this.linkBase.delete(i));continue}const s=this.boneObj(n.link.kind,n.link.idx,n.link.bone);if(!s||s===i)continue;let o=this.linkBase.get(i);o||(o={pos:i.position.clone(),rot:i.rotation.clone(),scale:i.scale.clone()},this.linkBase.set(i,o)),s.updateWorldMatrix(!0,!1),this.linkT.makeTranslation(n.link.lo[0],n.link.lo[1],n.link.lo[2]),this.linkR.makeRotationFromEuler(o.rot).scale(o.scale),this.linkM.copy(s.matrixWorld).multiply(this.linkT).multiply(this.linkR);const a=new w().setFromMatrixScale(s.matrixWorld);this.linkM.multiply(new Ae().makeScale(1/a.x,1/a.y,1/a.z)),i.parent&&(i.parent.updateWorldMatrix(!0,!1),this.linkM.premultiply(new Ae().copy(i.parent.matrixWorld).invert())),this.linkM.decompose(i.position,i.quaternion,i.scale)}}snd(e,t,n){const i=this.audio;switch(e){case"bgm":i.bgm(t[0],t[1],t[2]);break;case"bgm2":i.bgm(t[0],100,t[1]);break;case"bgmOff":i.bgmOff(t[0]);break;case"se":i.eventSe(t[0],t[3],t[4]===0?this.bonePos(t[1],t[2],0):void 0);break;case"seOff":i.eventSeOff(t[0]);break;case"bgSe":i.bgSe(t[0],t[1],t[2]);break;case"bgSeOff":i.bgSeOff(t[0],t[1]*.3);break;case"objSe":i.objSe(t[0],new w(t[1],t[2],t[3]),t[4]);break;case"objSeOff":i.objSeOff(t[0]);break;case"foot":{if(!n||t[0]!==0)break;const s=this.bonePos(n.kind,n.idx,t[3]);i.foot(this.floorSound(s),t[2]===1,s,Math.min(2,t[1]));break}case"easy":{const[s,o,a,c,,,l,h,u,d,p,g,_]=t,m=[a,c,l],f=this.bonePos(u,d,p);s===7?i.eventSe(o,_,void 0,m):s===1?i.foot(h,g===1,c!==-1?void 0:f,Math.min(2,o),m):s===2?i.action(_,f):s===6&&i.bgSe(o,_);break}}}playerHp(){return this.player.hp}log(e){this.debug&&console.log(e)}async goDoor(e){const t=`rm_${e.stg}${Dt(e.room,2)}${this.vm.rcase}`;this.busy=!0;try{if(!vx.has(t)){this.vm.sp=4294967295,this.vm.cb&=-2,await this.escaped(t);return}this.audio.se("door"),await this.enterRoom(t,e.pos,void 0,!0,1400),this.audio.se("doorClose")}finally{this.busy=!1}}async saveScreen(){this.busy=!0;try{if(!this.inv.take(31))return;this.audio.se("typewriter"),this.save(),await this.msg.raw([Zn.saved()])}finally{this.busy=!1}}save(){const e=this.player.pos,t={hp:this.player.hp,room:this.roomId,pos:this.vm.pos_no,x:e.x,y:e.y,z:e.z,h:this.player.heading,inv:this.inv.slots,eq:this.invScreen.equipped,std:this.invScreen.standard,evt:{f:this.vm.f,rcase:this.vm.rcase},t:this.playTime};localStorage.setItem("cvx.save",JSON.stringify(t))}async toggleInv(e){this.invOpen=e,await this.invScreen.show(e)}toggleCamera(){this.cam.mode=this.cam.mode==="fixed"?"behind":"fixed",localStorage.setItem("cvx.cam",this.cam.mode),this.cam.mode==="behind"?this.cam.resetYaw(this.player.heading):this.input.releaseLock(),this.ui.toast(this.cam.mode==="fixed"?Zn.camFixed():Zn.camBehind()),this.cam.update(this.player.pos,this.player.headPos(),this.player.heading,!0)}onSlash(e){var t;this.audio.se("knife");for(const n of this.npcs)n.hittable&&n.root.position.distanceTo(e.clone().setY(n.root.position.y))<.6&&((t=n.hit)==null||t.call(n))}onFire(e,t,n){const i=this.inv.slots.find(c=>(c==null?void 0:c.id)===Vn);if(!i||i.count<=0)return!1;i.count--,this.audio.se("shot");const s=new Pe(t.x,t.z).normalize();let o=null,a=12;for(const c of[...this.zombies,...this.dogs]){if(!c.hittable)continue;const l=new Pe(c.root.position.x-e.x,c.root.position.z-e.z),h=l.length();h>a||h<.05||l.dot(s)/h<(n===0?.94:.8)||(o=c,a=h)}return o&&this.hitZombie(o,Sx),!0}hitZombie(e,t){e.hit(t),e.alive||(this.vm.work(1,e.index).dead=!0)}startGrab(e){const t=this.player,n=t.root.position,i=e.root.position,s=new w(i.x-n.x,0,i.z-n.z),o=t.forward().dot(s)>=0;e.heading=Math.atan2(-(n.x-i.x),-(n.z-i.z)),e.root.rotation.y=e.heading;const a=e.forward(),c=i.clone().addScaledVector(a,.42);c.y=n.y,t.place(c.x,c.y,c.z,o?e.heading+Math.PI:e.heading),t.playSync(o?"z00":"z01"),this.grab={z:e,t:0,front:o,phase:"bite",hurt:!1}}startDogBite(e){const t=this.player,n=t.root.position,i=e.root.position,s=t.forward().dot(new w(i.x-n.x,0,i.z-n.z))>=0;t.heading=s?Math.atan2(-(i.x-n.x),-(i.z-n.z)):Math.atan2(-(n.x-i.x),-(n.z-i.z)),t.root.rotation.y=t.heading,this.player.hp-=30,this.audio.se("bite");const o=this.player.hp<=0;t.playSync(o?s?"d03":"d04":s?"d00":"d05"),e.set(o?"idle":"recoil"),this.dogBite={z:e,t:0,front:s,dead:o}}updateDogBite(e){const t=this.dogBite;t.t+=e,!t.dead&&t.t>=1?(this.player.playSync(null),this.dogBite=null):t.dead&&t.t>=2.6&&(this.dogBite=null,this.gameOver())}updateGrab(e){const t=this.grab;t.t+=e,t.phase==="bite"?(!t.hurt&&t.t>1&&(t.hurt=!0,this.player.hp-=40,this.audio.se("bite")),t.t>=2&&(t.t=0,this.player.hp<=0?(t.phase="dead",this.player.playSync(t.front?"z10":"z11"),t.z.set("idle")):(t.phase="push",this.player.playSync(t.front?"z02":"z03"),t.z.set("release")))):t.phase==="push"?t.t>=1.6&&(this.player.playSync(null),this.grab=null):t.phase==="dead"&&t.t>=2.6&&(this.grab=null,this.gameOver())}async gameOver(){this.overShown||(this.overShown=!0,this.busy=!0,await this.ui.fade(!0,1200),await this.msg.raw([dt==="ru"?"ВЫ ПОГИБЛИ":"YOU ARE DEAD"]),location.reload())}async escaped(e){await this.ui.fade(!0,600),await this.msg.raw(dt==="ru"?[`Дверь ведёт в ${e}.`,`Эта часть игры
пока не перенесена.`]:[`The door leads to ${e}.`,`This area is
not ported yet.`]),await this.ui.fade(!1,600)}sim(e,t=[]){for(const n of t)this.input.down.add(n),this.input.pressed.add(n);for(let n=0;n<e;n+=1/30)this.step(1/30),this.input.pressed.clear();for(const n of t)this.input.down.delete(n);this.renderer.render(this.scene,this.cam.cam)}step(e){var i;const t=this.input;this.playTime+=e,t.hit("F1","Backquote")&&(this.debug=!this.debug);const n=this.inCine;if(this.msg.active?(this.msg.update(e,t.action,t.hit("KeyA","ArrowLeft"),t.hit("KeyD","ArrowRight"),t.cancel),this.player.frozen=!0):this.invOpen?(this.player.frozen=!0,this.invScreen.update(e)||(this.invOpen=!1)):this.busy||this.dialog?this.player.frozen=!0:n?(this.player.frozen=!0,this.vm.cb&4&&t.hit("Escape","Enter","Space")&&(this.vm.cb|=268435456)):(this.player.frozen=!1,this.player.sync||(t.inventory?this.toggleInv(!0):t.camToggle?this.toggleCamera():t.action&&!this.player.aiming&&this.examine())),this.room){if(!this.invOpen&&!this.busy){for(this.evtAcc=Math.min(this.evtAcc+e,.25);this.evtAcc>=1/30&&!this.busy;)this.evtAcc-=1/30,this.evtFrame();this.cam.evSub=this.evtAcc*30}if(this.pendingDoor&&!this.busy){const o=this.pendingDoor;this.pendingDoor=null,this.goDoor(o)}const s=this.cam.mode==="behind";if(s&&!this.player.frozen){const o=.0024*(this.player.aiming?.6:1);this.cam.look(t.mdx*o+((t.camR?1:0)-(t.camL?1:0))*2.2*e,t.mdy*o)}if(this.cam.zoom+=((s&&this.player.aiming?1:0)-this.cam.zoom)*Math.min(1,e*10),this.player.update(e,t,this.room,s?this.cam.yaw:null),!this.msg.active&&!this.invOpen&&!this.inCine&&!(this.busy&&!this.grab)){this.grab&&this.updateGrab(e),this.dogBite&&this.updateDogBite(e);const o=!this.grab&&!this.dogBite&&!this.player.sync&&this.player.hp>0;for(const a of this.zombies){const c=this.vm.works.get("1:"+a.index);if(!(c!=null&&c.gone||c!=null&&c.hidden)){if(c!=null&&c.scripted){a.update(e);continue}a.state==="bite"&&((i=this.grab)==null?void 0:i.z)!==a&&a.set("walk"),a.tick(e,this.player.root.position,o,this.room)&&!this.grab&&o&&this.startGrab(a)}}for(const a of this.dogs){const c=this.vm.works.get("1:"+a.index);if(!(c!=null&&c.gone||c!=null&&c.hidden)){if(c!=null&&c.scripted){a.update(e);continue}a.tick(e,this.player.root.position,o&&!this.grab&&!this.dogBite,this.room)&&!this.grab&&!this.dogBite&&o&&this.startDogBite(a)}}}this.cam.update(this.player.pos,this.player.headPos(),this.player.heading,!1,e),this.updateLinks(),this.audio.update()}if(this.ui.hud.style.display=this.debug?"block":"none",this.debug&&this.room){const s=this.player.pos,o=this.vm,a=o.tasks.map((c,l)=>c.status?`${l}:e${c.script-2}`:"").filter(Boolean).join(" ");this.ui.hud.textContent=`${this.roomId} cam ${this.cam.mode==="behind"?"behind":this.cam.index+(this.cam.forced!==null?" (event "+this.cam.forced+")":this.cam.usingFallback?" (fallback)":"")}
pos ${s.x.toFixed(2)} ${s.y.toFixed(2)} ${s.z.toFixed(2)} h ${(this.player.heading*180/Math.PI).toFixed(0)}°
evt cb ${(o.cb>>>0).toString(16)} st ${(o.st>>>0).toString(16)} etc ${o.etc_idx} flr ${o.cb&512?o.flr_idx:"-"} tasks ${a}`}}}const An=new Uh;An.fit(Ts);let pa=null;function Tx(){const r=document.createElement("div");r.className="title";const e=localStorage.getItem("cvx.save"),t=()=>[{k:"new",t:dt==="ru"?"Новая игра":"New game"},...e?[{k:"load",t:dt==="ru"?"Продолжить":"Continue"}]:[],{k:"movie",t:dt==="ru"?"Вступительный ролик":"Opening movie"},{k:"lang",t:dt==="ru"?"Язык: русский":"Language: English"}];let n=0;const i=()=>{r.innerHTML=`<h1>RESIDENT EVIL<br>CODE: Veronica X</h1><h3>${dt==="ru"?"ТЮРЬМА · ОСТРОВ РОКФОРТ":"PRISON · ROCKFORT ISLAND"}</h3>
<div class="menu">${t().map((a,c)=>`<div data-i="${c}" class="${c===n?"sel":""}">${a.t}</div>`).join("")}</div>
<div class="help">${dt==="ru"?"W/S или ↑/↓ — вперёд/назад · A/D или ←/→ — поворот · Shift — бег · C — камера (фиксированная / от плеча: мышь или ←/→ — обзор, A/D — шаг вбок)<br>F / ПКМ — приготовить нож · E / Пробел / Enter / ЛКМ — действие, удар · Tab — предметы · Esc — отмена · F1 — отладка":"W/S or ↑/↓ — forward/back · A/D or ←/→ — turn · Shift — run · C — camera (fixed / over-the-shoulder: mouse or ←/→ look, A/D strafe)<br>F / RMB — ready knife · E / Space / Enter / LMB — action, attack · Tab — items · Esc — cancel · F1 — debug"}<br>
${dt==="ru"?"Фанатский порт на основе ресурсов PS3-версии. Не для распространения.":"Fan port built from the PS3 version assets. Not for distribution."}</div>`},s=async a=>{if(a==="lang"){Lh(dt==="ru"?"en":"ru"),i();return}if(removeEventListener("keydown",o),r.remove(),a==="movie"&&await Eh(An.stage,"mv_000"),a==="movie"){An.stage.appendChild(r),addEventListener("keydown",o),i();return}An.fadeEl.style.transition="none",An.fadeEl.style.opacity="1";const c=document.createElement("div");c.className="loading",c.textContent=dt==="ru"?"ЗАГРУЗКА…":"LOADING…",An.stage.appendChild(c),pa=new Ex(An);const l=a==="load"&&e?JSON.parse(e):void 0;try{await pa.start(l,()=>c.remove())}catch(h){c.textContent="Error: "+h.message,console.error(h);return}},o=a=>{const c=t().length;a.code==="ArrowDown"||a.code==="KeyS"?(n=(n+1)%c,i()):a.code==="ArrowUp"||a.code==="KeyW"?(n=(n+c-1)%c,i()):["Enter","Space","KeyE"].includes(a.code)&&(a.preventDefault(),s(t()[n].k))};r.addEventListener("click",a=>{var l;const c=(l=a.target.dataset)==null?void 0:l.i;c!==void 0&&(n=+c,s(t()[n].k))}),addEventListener("keydown",o),i(),An.stage.appendChild(r)}Tx();addEventListener("resize",()=>{pa||An.fit(Ts)});
