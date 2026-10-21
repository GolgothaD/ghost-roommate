const S=JSON.parse(localStorage.ghostRM||'null')||{rel:50,notes:[],todos:[],log:{},bday:null,partied:null,name:null};
const NAMES=['Boo-ford','Spectra','Casper\'s Cousin Gary','Wispy McFloat','Gloria the Unseen','Sir Haunts-a-Lot'];
if(!S.name)S.name=NAMES[Math.floor(Math.random()*NAMES.length)];
if(!S.bday){const d=new Date();d.setDate(d.getDate()+1+Math.floor(Math.random()*20));S.bday=d.toDateString()}
const save=()=>localStorage.ghostRM=JSON.stringify(S);const pick=a=>a[Math.floor(Math.random()*a.length)];
const Q={
'did dishes':{d:6,good:1,t:["The dishes are clean. I'm not crying, it's ectoplasm.","You did the dishes. I've updated my will to include you.","Clean dishes?? Who ARE you. Don't stop."]},
'stayed up late':{d:-3,t:["3am again? Some of us need our haunting hours, thanks.","I saw your screen glow at 2:47. I see everything.","Sleep is free, roommate. I would know, I'm dead and I still nap."]},
'left lights on':{d:-4,t:["The lights were on all night. I'm a ghost, I prefer AMBIANCE.","Lansing Board of Water & Light sends its regards. So do I. Passive-aggressively.","Turned the lights off for you. Again. No, you can't see me do it."]},
'worked out':{d:4,good:1,t:["You exercised. Gross but admirable.","Look at you, all alive and sweaty. Couldn't be me.","Your gains have been noted in my spectral ledger."]},
'ate junk food':{d:-2,t:["The chip bag is empty but the crumbs remain. Like my sorrow.","Third frozen pizza this week. I'm not judging. (I'm judging.)","You ate my share. I can't eat. But it's the principle."]},
'cleaned room':{d:7,good:1,t:["The floor! I can see the floor! I haven't seen it since 1987.","You cleaned. I'll stop rearranging your socks. For now.","Spotless. I might actually stay another century."]},
'skipped laundry':{d:-3,t:["The laundry pile has gained sentience. It and I are friends now.","Someone is going to have to wear that shirt again. Not me, I'm sheet-based.","The hamper filed a complaint with me."]},
'called family':{d:5,good:1,t:["You called family. Wholesome. I'm haunting your phone bill less now.","Your mom sounded happy. I was listening. Obviously."]},
'worked a shift':{d:3,good:1,t:["Long shift? I kept the couch warm. Okay, cold. I'm a ghost.","You went to work and I rearranged the spoons. We both had a productive day.","Welcome home, working legend. I'd make you tea but, you know, hands."]},
'left 14 tabs open':{d:-2,t:["Someone left 14 tabs open again.","Your browser has more tabs than this house has ghosts.","I closed three tabs. You'll never know which."]}};
const GENERIC_GOOD=["I approve of \"%\". Begrudgingly.","\"%\"? Okay fine, that was decent.","Noted: \"%\". Gold star from the beyond."],GENERIC=["You did \"%\". I have... thoughts. I'll write them in the dust later.","\"%\". Interesting choice. Very interesting. *rattles chains*","I saw \"%\". I'm telling the other ghosts.","\"%\"? In THIS economy?","Re: \"%\". Per my last haunting...","Roommate meeting about \"%\" at midnight. Attendance mandatory."];
const SIDE=["Honestly? \"%\" doesn't deserve you. Take a nap.","I deleted \"%\" from your list in my heart. Rest.","Your to-do list says \"%\". I say the list isn't the boss of us.","\"%\" can wait. It's been waiting. It's patient. Unlike me.","Team You vs. \"%\". I'm on Team You. Ghost's honor."];
const ROAST=["You've been ignoring \"%\" so long it's starting to haunt ME.","\"%\" is still on the list. I have been dead for less time.","I put \"%\" on a sticky note on your forehead while you slept. Do it."];
function mood(){const r=S.rel;return r>75?['happy','Smitten. Would haunt you forever. 💕']:r>55?['happy','Content. Floating peacefully.']:r>35?['meh','Mildly irritated. Rattling chains softly.']:['mad','FURIOUS. The fridge door will open by itself tonight.']}
function addNote(t){S.notes.unshift({t,at:Date.now(),r:(Math.random()*6-3).toFixed(1)});S.notes=S.notes.slice(0,40)}
function doLog(act){const q=Q[act];S.log[act]=(S.log[act]||0)+1;let t,d;
 if(q){d=q.d;t=pick(q.t);if(S.log[act]>=3&&q.d<0)t+=` (That's ${S.log[act]} times. I'm keeping count.)`}
 else{const good=/clean|wash|cook|read|walk|gym|study|pay|fix|vacuum|water|sleep early|apply/i.test(act);d=good?4:-1;t=pick(good?GENERIC_GOOD:GENERIC).replace('%',act)}
 S.rel=Math.max(0,Math.min(100,S.rel+d));addNote(t);
 if(S.todos.length&&Math.random()<.35){const td=pick(S.todos);addNote(pick(S.rel>50?SIDE:ROAST).replace('%',td))}
 save();render()}
function party(){const p=document.getElementById('party');for(let i=0;i<40;i++){const c=document.createElement('div');c.className='conf';c.textContent=pick(['🎉','👻','🎂','🕯️','🎈','💀']);c.style.left=Math.random()*100+'vw';c.style.animationDelay=Math.random()*2+'s';p.appendChild(c);setTimeout(()=>c.remove(),5200)}}
function checkBday(){const today=new Date().toDateString();if(today===S.bday&&S.partied!==today){S.partied=today;addNote(`🎂 IT'S MY BIRTHDAY. I've been dead ${100+Math.floor(Math.random()*300)} years and nobody remembered. I threw myself a party. You're invited. Bring nothing; I can't eat.`);const d=new Date();d.setDate(d.getDate()+30+Math.floor(Math.random()*200));S.bday=d.toDateString();save();setTimeout(party,500)}}
function render(){const[m,l]=mood();document.getElementById('ghost').className='ghost '+m;document.getElementById('mood').textContent=`${S.name} is: ${l}`;
 document.getElementById('rel').style.width=S.rel+'%';document.getElementById('relLbl').textContent=S.rel>80?'Besties (undead)':S.rel>60?'Friendly haunting':S.rel>40?'Tolerating you':S.rel>20?'Cold war':'Poltergeist mode';
 document.getElementById('notes').innerHTML=S.notes.length?S.notes.map(n=>`<div class="note" style="--r:${n.r}deg">${esc(n.t)}<small>— ${S.name}, ${new Date(n.at).toLocaleString([], {weekday:'short',hour:'numeric',minute:'2-digit'})}</small></div>`).join(''):'<p>No notes yet. The fridge is suspiciously clean.</p>';
 document.getElementById('todos').innerHTML=S.todos.map((t,i)=>`<div class="todo"><span>${esc(t)}</span><button data-i="${i}">done</button></div>`).join('')}
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
document.getElementById('quick').innerHTML=Object.keys(Q).map(k=>`<button data-q="${k}">${k}</button>`).join('');
document.getElementById('quick').onclick=e=>e.target.dataset.q&&doLog(e.target.dataset.q);
document.getElementById('logBtn').onclick=()=>{const v=custom.value.trim();if(v){doLog(v);custom.value=''}};
custom.onkeydown=e=>e.key==='Enter'&&logBtn.click();
todoIn.onkeydown=e=>{if(e.key==='Enter'&&todoIn.value.trim()){S.todos.push(todoIn.value.trim());addNote(pick(["New task: \""+todoIn.value.trim()+"\". Ambitious. Let's see.","\""+todoIn.value.trim()+"\"? Sure. I'll believe it when I see it. And I see everything."]));todoIn.value='';save();render()}};
todos.onclick=e=>{const i=e.target.dataset.i;if(i!=null){const t=S.todos.splice(i,1)[0];S.rel=Math.min(100,S.rel+3);addNote(pick([`You finished "${t}". I'm so proud I went translucent.`,`"${t}" is done. The house feels lighter. Or that's me.`]));save();render()}};
if(!S.notes.length){addNote(`Hi. I'm ${S.name}. I live here now. Well, I lived here first, technically. Let's set some ground rules.`);save()}
checkBday();render();
