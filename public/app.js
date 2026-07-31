/* ═══════════════════════════ DATA ═══════════════════════════ */
const TRAITS=[
  {id:'adaptive',name:'Adaptive Thinking', color:'#5b9ae0'},
  {id:'ethical', name:'Ethical Judgment',  color:'#d4a843'},
  {id:'creative',name:'Creative Synthesis', color:'#9b72cf'},
  {id:'empathic',name:'Empathic Accuracy',  color:'#4ecdc4'},
  {id:'critical',name:'Critical Skepticism',color:'#e07c5b'}
];

const BANDS={
  adaptive:[
    {min:80,band:'Highly Adaptive',insight:'You treat change as raw material rather than disruption. Where others need a clear playbook, you build one as you go — and quickly enough that others rarely notice the uncertainty you navigated. This is the trait most strongly correlated with performing well in AI-era roles.',what:'<strong>In practice:</strong> you\'re the person others turn to when something breaks or shifts unexpectedly. You\'re most valuable in roles without fixed processes, and least comfortable doing the same thing indefinitely.'},
    {min:60,band:'Adaptable',insight:'You handle change well when you have some foundation to work from. You\'re not thrown by ambiguity, but you work best when you can orient yourself before acting rather than moving immediately into the unknown.',what:'<strong>In practice:</strong> you bring stability to change rather than just enthusiasm for it — often more valuable than pure agility. Someone who keeps a team functional through a transition rather than racing ahead of it.'},
    {min:40,band:'Selectively Adaptive',insight:'You adapt effectively within familiar territory but feel the friction more in genuinely novel situations. Your instinct is to draw on what you know before exploring what you don\'t — usually the right call, but can slow you when the situation is truly new.',what:'<strong>In practice:</strong> when facing a new situation, explicitly map what still applies from what you know before trying to solve what\'s genuinely unknown. That transition step is what gets skipped under pressure.'},
    {min:0, band:'Stability-Oriented',insight:'You prefer established processes and clear expectations. In AI-era workplaces, people who reliably execute within well-defined systems are essential. But you may need to invest in building tolerance for ambiguity as the pace of change increases.',what:'<strong>In practice:</strong> practice making decisions with incomplete information in low-stakes situations. The ability to act without full certainty is increasingly non-optional in most professional contexts.'}
  ],
  ethical:[
    {min:80,band:'Strong Ethical Compass',insight:'You notice ethical dimensions that others walk straight past — and you act on them, not performatively but because not doing so would compromise your sense of who you are. This is exceptionally rare and increasingly valuable as AI handles more decisions at scale.',what:'<strong>In practice:</strong> you\'re most valuable in roles involving policy, governance, client relationships, or any situation where the "technically correct" answer might not be the right one. Organizations deploying AI at scale urgently need your profile.'},
    {min:60,band:'Ethically Grounded',insight:'You have clear personal values and act on them when it matters. You don\'t impose your ethics on others, but you won\'t compromise your own standards to avoid friction. You\'re trustworthy in a specific and valuable way.',what:'<strong>In practice:</strong> people know you\'ll flag a genuine problem rather than paper over it. This is undersold on most CVs — make it visible and specific.'},
    {min:40,band:'Contextually Ethical',insight:'Your ethical judgment varies with context — stronger when the stakes are clear, less consistent in ambiguous situations or when social dynamics are in play. Not unprincipled; human in a way most ethical frameworks underestimate.',what:'<strong>In practice:</strong> the gap tends to show in the middle ground — situations that are uncomfortable but not clearly wrong. A simple personal rule ("what would I be comfortable explaining out loud?") can close this gap.'},
    {min:0, band:'Pragmatically Oriented',insight:'You prioritize outcomes and tend to defer on ethical questions unless they\'re stark. Often this means trusting systems and hierarchies to handle them. In an AI-augmented world, more of these gray-area decisions escalate to humans precisely because they\'re too nuanced for automated systems.',what:'<strong>In practice:</strong> developing a stronger personal ethical framework is increasingly a career skill, not just a moral one. Start with the questions you\'d rather not have to answer in public.'}
  ],
  creative:[
    {min:80,band:'Synthetic Thinker',insight:'You instinctively connect across domains that others compartmentalize. Your ideas aren\'t just creative — they\'re structurally different, because they\'re built from components that don\'t usually appear together. This is one of the hardest capabilities for AI to replicate.',what:'<strong>In practice:</strong> your best work happens at intersections — between disciplines, problems, or audiences. You\'re less effective in roles requiring deep narrow expertise. Seek problems others have declared unsolvable.'},
    {min:60,band:'Creatively Capable',insight:'You generate novel approaches reliably, especially under pressure or when given latitude. You\'re not always the first to reframe a problem, but you\'re usually in the group that produces the most useful ideas once a direction is set.',what:'<strong>In practice:</strong> you work best when creative and analytical phases are separated. Protect idea-generation time from evaluation and you\'ll get consistently stronger output.'},
    {min:40,band:'Structured Creator',insight:'You\'re most creative within a framework — you generate strong ideas when the parameters are clear, but struggle in genuinely open-ended situations. This is more common than the "creative" mythology suggests, and it\'s a highly functional profile for most workplaces.',what:'<strong>In practice:</strong> structured methods like constraint-based thinking significantly increase output. Your ideas are good — the constraint is the generation process, not the quality of thought.'},
    {min:0, band:'Methodical Thinker',insight:'You\'re stronger at developing and executing ideas than generating them from scratch. Most good outcomes require far more execution than invention, and your ability to turn a rough idea into something real is genuinely valuable.',what:'<strong>In practice:</strong> position yourself as the person who makes ideas work rather than the person who has them. That\'s often where the actual value lives.'}
  ],
  empathic:[
    {min:80,band:'Highly Empathic',insight:'You read situations and people with unusual accuracy — not by projecting your own state, but by genuinely modeling theirs. You notice what isn\'t said as much as what is. In any context involving relationships or persuasion, this is your dominant advantage.',what:'<strong>In practice:</strong> be careful not to absorb others\' emotional states in a way that compromises your judgment. Your superpower is reading the room; your risk is feeling responsible for it.'},
    {min:60,band:'Empathically Aware',insight:'You pick up on emotional undercurrents reliably and respond thoughtfully. You\'re not always certain what\'s happening beneath the surface, but you notice when something is — and you act on it rather than plowing through.',what:'<strong>In practice:</strong> your awareness shows most clearly in 1-to-1 contexts. In groups you may miss individual threads. Make a habit of checking in with quieter people in group settings.'},
    {min:40,band:'Situationally Empathic',insight:'Your empathic response is reliable in clear emotional situations but less consistent in subtle ones. You respond well to obvious signals; you sometimes miss the middle ground — the person who says they\'re fine and isn\'t.',what:'<strong>In practice:</strong> the most valuable empathic skill is curiosity about ambiguous signals rather than certainty about clear ones. Practice asking one more question when something seems slightly off.'},
    {min:0, band:'Analytically Oriented',insight:'You engage with people primarily through ideas and information rather than emotional attunement. This isn\'t coldness — it\'s a different orientation. You tend to be less swayed by emotional pressure and more consistent in your responses.',what:'<strong>In practice:</strong> in roles involving team leadership or client relationships, build explicit prompts to check emotional signals. What you miss isn\'t usually dramatic — it\'s the early warning signs.'}
  ],
  critical:[
    {min:80,band:'Rigorous Thinker',insight:'You are genuinely hard to mislead. You identify the assumption buried in the premise, the statistic that doesn\'t pass the sniff test, the conclusion that doesn\'t follow. In an era when AI produces confident-sounding outputs at scale, this is one of the most practically valuable skills a person can have.',what:'<strong>In practice:</strong> your risk is over-skepticism in contexts requiring trust and momentum. Not every claim needs interrogating. Develop a calibrated sense of when rigor is the priority and when velocity matters more.'},
    {min:60,band:'Critically Capable',insight:'You apply scrutiny when it matters and you usually know when that is. You don\'t accept things uncritically, but you don\'t paralyze things with excessive interrogation either.',what:'<strong>In practice:</strong> your critical thinking is strongest when you have time. Under pressure, you\'re more susceptible to plausible-sounding claims. A set of fast heuristics — quick questions you always ask — can protect against this.'},
    {min:40,band:'Selectively Skeptical',insight:'You apply critical thinking when you\'re already suspicious, but less reliably when presented with confident, well-packaged information. Most misinformation succeeds precisely because it\'s packaged convincingly.',what:'<strong>In practice:</strong> build a habit of asking "what would have to be true for this to be wrong?" for any claim that supports what you already believe. Confirmation bias is the specific vulnerability here.'},
    {min:0, band:'Trust-Oriented',insight:'You tend to extend trust to sources and confident-sounding claims. In stable, high-trust environments this is efficient. In information-saturated professional contexts, it creates risk.',what:'<strong>In practice:</strong> start with one habit: always ask for the original source when a claim matters. "A study shows..." is not a source. Tracing claims to their origin is the most practical critical-thinking skill you can build.'}
  ]
};

const ARCHETYPES=[
  {name:'The Vanguard',  tag:'You lead where others haven\'t mapped yet',       min:78},
  {name:'The Architect', tag:'You build meaning where others see complexity',    min:64},
  {name:'The Compass',   tag:'You know what\'s right when others are uncertain', min:52},
  {name:'The Connector', tag:'You see the human picture others miss',            min:40},
  {name:'The Analyst',   tag:'You question everything worth questioning',        min:0}
];

/* Every question runs on the same clock. This is a ceiling that keeps answers
   instinctive, not a target — most people answer in well under half of it.
   Change it here: the landing page and the prequiz screen both quote this number. */
const QUESTION_SECONDS=50;

const QS=[
  {trait:'adaptive',text:"You're two weeks into a new job and the approach you were hired to use turns out not to work in this context. What do you do?",opts:[{t:"Start adapting immediately, using what I can observe about what actually works here",s:4},{t:"Try harder with the original approach — maybe it just needs more time",s:1},{t:"Raise it with my manager and ask for guidance before changing anything",s:2},{t:"Quietly experiment with alternatives while outwardly keeping up the original approach",s:3}]},
  {trait:'adaptive',text:"You're given a task with almost no instructions and no obvious right answer. Your first move is to…",opts:[{t:"Define what I think 'done' looks like, state my assumptions out loud, and start",s:4},{t:"Ask for clarification — I don't want to waste effort going in the wrong direction",s:2},{t:"Find something similar I've seen done and use it as a starting template",s:2},{t:"Break it into the smallest possible first step and see what I learn from that",s:3}]},
  {trait:'adaptive',text:"Something you've been doing a specific way for a long time turns out to have a significantly better alternative. How do you respond?",opts:[{t:"I switch, and I switch fast — the point was always the outcome, not the method",s:4},{t:"I test both in parallel for a while before committing",s:3},{t:"I'm interested, but I don't change something that's working without strong evidence",s:2},{t:"Change feels uncomfortable — I tend to stay with what I know unless forced to shift",s:1}]},
  {trait:'ethical',text:"You're asked to send a customer message that is technically accurate but that you know creates a misleading impression. What do you do?",opts:[{t:"Push back — explain why it's misleading and propose a version that isn't",s:4},{t:"Send it — my job isn't to second-guess what I'm asked to do",s:1},{t:"Send it but flag my concern to someone above me",s:2},{t:"Rewrite it on my own initiative so it isn't misleading, and send that version instead",s:3}]},
  {trait:'ethical',text:"You notice a colleague consistently taking credit in group settings for work that's partly or entirely yours. You…",opts:[{t:"Raise it with them directly and privately — I'd rather resolve it than escalate",s:4},{t:"Let it go; making an issue of it creates more problems than it solves",s:1},{t:"Find natural ways to make my contribution visible without directly confronting them",s:3},{t:"Mention it to someone I trust to gauge whether I'm reading the situation right",s:2}]},
  {trait:'ethical',text:"You discover something your organization does — legal, profitable, normal in the industry — causes low-level harm to people outside the transaction. Most people there don't seem to think about it. You…",opts:[{t:"Look for the right channel to raise it — even if nothing changes, I need to flag it",s:4},{t:"Leave it — it's not my responsibility, and the organization has implicitly decided this is acceptable",s:1},{t:"Sit with it for a while — I want to understand the full picture before doing anything",s:3},{t:"Mention it informally to someone I respect and see how they respond",s:2}]},
  {trait:'creative',text:"You're stuck on a problem and none of your usual approaches are working. What do you do?",opts:[{t:"Look at how a completely different field handles something structurally similar",s:4},{t:"Talk it through with someone — articulating it out loud usually breaks something loose",s:2},{t:"Step away and do something unrelated — the answer usually arrives when I stop looking",s:3},{t:"Go back to basics and make sure I'm actually solving the right problem",s:2}]},
  {trait:'creative',text:"You need to explain something genuinely complex to someone with no background in it. You instinctively reach for…",opts:[{t:"An analogy from everyday life that captures the essential structure, even if it loses some detail",s:4},{t:"A clear sequence — I build from first principles and don't skip steps",s:1},{t:"A visual — a diagram or sketch usually cuts through faster than words",s:3},{t:"A concrete example of it working in practice — showing is better than telling",s:2}]},
  {trait:'creative',text:"Two quick ideas: a great teacher plans for the student who stays quiet, and a great host plans for the guest who doesn't know anyone. What connects them?",opts:[{t:"Both design for the person who's easiest to overlook — the real skill is noticing who isn't speaking up",s:4},{t:"Both are about making sure nobody gets left behind",s:3},{t:"Both are just examples of planning ahead for people",s:2},{t:"Not much — teaching and hosting are pretty different jobs",s:1}]},
  {trait:'empathic',text:"You ask a colleague if everything's OK, and they reply 'No, it's fine.' You…",opts:[{t:"Take them at their word — pushing further feels intrusive",s:1},{t:"Ask one more specific question that makes it easier to say what's actually going on",s:4},{t:"Let it go for now but check back in the next day or two",s:3},{t:"Tell them my door is open if they want to talk, and leave it there",s:2}]},
  {trait:'empathic',text:"You're in a group conversation and someone makes a point that lands in silence. Nobody responds. You notice the person's expression shift slightly. What do you think is happening?",opts:[{t:"They felt their point wasn't heard, and they're deciding whether to let it drop or try again",s:4},{t:"I don't read much into silence — people are often just thinking",s:1},{t:"There could be many explanations — I'd need more context to say",s:2},{t:"Something's off — I'd probably find a way to bring their point back in",s:3}]},
  {trait:'empathic',text:"You're trying to persuade someone and you can tell they're becoming defensive, even though they haven't said so. You…",opts:[{t:"Name what I'm observing and shift to understanding their perspective before continuing",s:4},{t:"Stay the course — backing down is a sign of weakness",s:1},{t:"Suggest pausing and returning to it later when the temperature has dropped",s:3},{t:"Ease off the pressure without making it explicit — give them space to come around",s:2}]},
  {trait:'critical',text:"Someone cites a statistic that perfectly supports an argument you were already inclined to agree with. What's your reaction?",opts:[{t:"That makes me more cautious — confirming evidence is exactly when I check most carefully",s:4},{t:"It reinforces my view; I didn't need the evidence but it's good to have",s:1},{t:"I'd want to know the source before putting much weight on it",s:3},{t:"Statistics are easily cherry-picked either way — I don't over-index on any single number",s:2}]},
  {trait:'critical',text:"An AI tool produces an analysis that says exactly what you hoped it would say. You…",opts:[{t:"Scrutinize it harder than usual — flattering outputs are the ones most likely to be wrong",s:4},{t:"Feel relieved and move forward — it's useful confirmation",s:1},{t:"Check the inputs and logic before treating it as reliable",s:3},{t:"Use it, but note the caveat when I share it — I don't want to over-sell it",s:2}]},
  {trait:'critical',text:"An article claims a major study proves something plausible. You want to know if it's actually true. What's your first move?",opts:[{t:"Find the original study — not the article's summary — and look at what was actually measured",s:4},{t:"Check whether other credible sources report the same finding",s:3},{t:"Consider whether I have any reason to doubt it; if not, accept it provisionally",s:2},{t:"Accept it — claims that are plausible and fit existing evidence rarely need chasing to the primary source",s:1}]}
];

/* ═══════════════════════════ STATE ═══════════════════════════ */
let S={
  qi:0,
  scores:{adaptive:0,ethical:0,creative:0,empathic:0,critical:0},
  maxes: {adaptive:0,ethical:0,creative:0,empathic:0,critical:0},
  tim:null,tl:25,at:0,susp:0,
  overall:0,arch:null,pcts:{},
  prods:new Set(['bundle']),
  uname:'',liText:'',gen:{},
  sharedOnce:false,purchased:false,
  honestyDismissed:false
};

/* ═══════════════════════════ UTILS ═══════════════════════════ */
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0);}
function delay(ms){return new Promise(r=>setTimeout(r,ms));}

/* Fisher-Yates. The old `sort(()=>Math.random()-.5)` comparator is not a uniform
   shuffle: measured over 400k draws it left the first option in slot A ~36% of the
   time and slot D ~31%, versus 25% expected. The top-scoring option is listed first
   in 14 of the 15 questions, so that bias made "A" the best answer more often than
   chance — a tell for anyone trying to game the reading. */
function shuffled(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

/* Session persistence — mobile browsers aggressively unload tabs.
   We save once results are computed so a user who switches apps and returns
   lands back on their results, not the home page. */
const HM_SESSION_KEY='hm_completed_session';
function saveSession(){
  try{
    sessionStorage.setItem(HM_SESSION_KEY,JSON.stringify({
      pcts:S.pcts,overall:S.overall,arch:S.arch,uname:S.uname,savedEmail:S.savedEmail,
      // The paid session id is the only key to a purchase. It used to live in
      // memory alone — and the URL carrying it is stripped right after Stripe
      // redirects back — so a reload dropped the buyer onto the free results
      // screen with no route back to what they'd bought.
      sessionId:S.sessionId,selectedPack:S.selectedPack
    }));
  }catch(e){}
}
function loadSession(){
  try{
    const raw=sessionStorage.getItem(HM_SESSION_KEY);
    if(!raw)return false;
    const d=JSON.parse(raw);
    if(!d||!d.pcts||!d.arch)return false;
    S.pcts=d.pcts;S.overall=d.overall;S.arch=d.arch;
    if(d.uname)S.uname=d.uname;
    if(d.savedEmail)S.savedEmail=d.savedEmail;
    if(d.sessionId)S.sessionId=d.sessionId;
    if(d.selectedPack)S.selectedPack=d.selectedPack;
    return true;
  }catch(e){return false;}
}
function clearSession(){try{sessionStorage.removeItem(HM_SESSION_KEY);}catch(e){}}
function getBand(tid,pct){return BANDS[tid].find(b=>pct>=b.min);}

/* ── PERMALINKS ─────────────────────────────────────────────────────────
   A reading is just five 0–100 percentages + an archetype index — 38 bits.
   Pack into 7 base64-url characters → e.g. humanometer.com/r/aB3xY9z.
   No backend needed; the URL itself carries the data. Lives forever.
   Worker routes /r/* to index.html so the SPA can decode and render. */
const PERM_CHARS='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
const PERM_TRAIT_ORDER=['adaptive','ethical','creative','empathic','critical'];

function encodeReading(pcts, archIdx){
  let bits=0n;
  for(const t of PERM_TRAIT_ORDER){
    const v=Math.max(0,Math.min(100,Math.round(pcts[t]||0)));
    bits=(bits<<7n)|BigInt(v);
  }
  bits=(bits<<3n)|BigInt(Math.max(0,Math.min(7,archIdx)));
  let s='';
  for(let i=0;i<7;i++){
    s=PERM_CHARS[Number(bits&63n)]+s;
    bits>>=6n;
  }
  return s;
}
function decodeReading(code){
  if(!code||!/^[A-Za-z0-9_-]{7}$/.test(code))return null;
  let bits=0n;
  for(const ch of code){
    const idx=PERM_CHARS.indexOf(ch);
    if(idx<0)return null;
    bits=(bits<<6n)|BigInt(idx);
  }
  const archIdx=Number(bits&7n); bits>>=3n;
  const pcts={};
  for(let i=PERM_TRAIT_ORDER.length-1;i>=0;i--){
    const v=Number(bits&127n);
    // Each percentage is encoded in 7 bits (0..127). A legitimate code from
    // our encoder will always be 0..100. Anything above is URL tampering —
    // reject the whole reading so we don't render bogus scores.
    if(v>100)return null;
    pcts[PERM_TRAIT_ORDER[i]]=v;
    bits>>=7n;
  }
  // Same defense for the archetype index — only 5 archetypes exist.
  if(archIdx>=ARCHETYPES.length)return null;
  return { pcts, archIdx };
}
/* Name on permalink — short, URL-safe. Optional in the URL but required
   in the UI before the user gets a Copy / Send button. Stripped to alnum,
   space, apostrophe, hyphen — keeps it safe to render anywhere. */
function sanitizeName(n){
  return String(n||'').trim().replace(/[^\p{L}\p{N}\s'\-]/gu,'').replace(/\s+/g,' ').slice(0,60);
}
function permalinkFor(pcts, arch, name){
  const archIdx=Math.max(0, ARCHETYPES.findIndex(a=>a.name===arch.name));
  let url='https://humanometer.com/?r='+encodeReading(pcts, archIdx);
  const cleanName=sanitizeName(name);
  if(cleanName) url+='&n='+encodeURIComponent(cleanName);
  return url;
}
function currentPermalink(){
  if(!S.arch || !S.pcts) return null;
  return permalinkFor(S.pcts, S.arch, S.uname);
}

/* ── REAL COUNTER via Cloudflare Pages Function ──
   GET  /api/counter  → {count: N}  (read only, called on page load)
   POST /api/counter  → {count: N}  (increment, called on quiz start)
   If the API is not yet set up, the counter is hidden gracefully.    */
async function initCounter(){
  try{
    const r=await fetch('/api/counter',{method:'GET',headers:{'Content-Type':'application/json'}});
    if(!r.ok)throw new Error('not ready');
    const d=await r.json();
    if(d.count && d.count>0){
      document.getElementById('counter-display').textContent=d.count.toLocaleString();
      const wrap=document.getElementById('counter-wrap');
      if(wrap)wrap.classList.remove('hidden');
    }
  }catch(e){
    // API not yet deployed — counter stays hidden. No fake numbers.
    const wrap=document.getElementById('counter-wrap');
    if(wrap)wrap.classList.add('hidden');
  }
}
async function bumpCounter(){
  /* Increment on quiz start — counts actual assessment takers */
  try{
    await fetch('/api/counter',{method:'POST'});
  }catch(e){ /* silent — not critical */ }
}

/* ═══════════════════════════ QUIZ ═══════════════════════════ */
// startQuiz shows the readiness interstitial; actuallyStartQuiz begins the questions.
// Prevents mid-flow abandonment by setting expectations first (timer, instinct, focus).
function startQuiz(){ show('prequiz'); }

function actuallyStartQuiz(){
  clearSession(); // fresh attempt — drop any previously-persisted results
  // Must run BEFORE the spread below: S={...S,…} carries every field forward,
  // so anything tied to a previous attempt has to be cleared first or the new
  // reading inherits it.
  resetForFreshAttempt();
  S={...S,qi:0,scores:{adaptive:0,ethical:0,creative:0,empathic:0,critical:0},maxes:{adaptive:0,ethical:0,creative:0,empathic:0,critical:0},susp:0,prods:new Set(['bundle']),sharedOnce:false};
  bumpCounter();
  show('quiz');
  document.getElementById('honesty-banner').style.display='flex';
  S.honestyDismissed=false;
  renderQ();
  // Auto-dismiss honesty banner after 6 seconds
  setTimeout(dismissHonesty,6000);
}

function dismissHonesty(){
  const b=document.getElementById('honesty-banner');
  if(b){b.style.opacity='0';b.style.transition='opacity .4s';setTimeout(()=>b.style.display='none',400);}
  S.honestyDismissed=true;
}

function renderQ(){
  const q=QS[S.qi];
  const tr=TRAITS.find(t=>t.id===q.trait);
  const pct=Math.round((S.qi/QS.length)*100);

  // Progress
  document.getElementById('prog').style.width=pct+'%';
  document.getElementById('prog-pct').textContent=pct+'%';
  document.getElementById('prog-label').innerHTML=`<strong>${S.qi+1}</strong> / ${QS.length}`;
  document.getElementById('q-section-lbl').textContent=`${tr.name} · ${(S.qi%3)+1} of 3`;

  // Trait section marker removed — the .trait-tag below already shows the trait name.
  // Keep the element hidden in case any CSS references it.
  const marker=document.getElementById('trait-marker');
  if(marker)marker.style.display='none';

  // Question text
  const qt=document.getElementById('qtext');
  qt.style.animation='none';qt.offsetHeight;qt.style.animation='';
  qt.textContent=q.text;
  document.getElementById('ttag').textContent=tr.name;
  document.getElementById('ttag').style.color=tr.color;
  // qlbl removed — progress bar already shows "N / 15"
  const qlbl=document.getElementById('qlbl');
  if(qlbl)qlbl.style.display='none';

  // Options
  const container=document.getElementById('opts');
  container.style.animation='none';container.offsetHeight;container.style.animation='';
  container.innerHTML='';
  const letters=['A','B','C','D'];
  shuffled(q.opts).forEach((o,i)=>{
    const btn=document.createElement('button');
    btn.className='opt';
    btn.innerHTML=`<span class="ol">${letters[i]}</span>${o.t}`;
    btn.addEventListener('click',()=>pick(o.s,q.trait,btn));
    container.appendChild(btn);
  });

  startTim(QUESTION_SECONDS);
  S.at=Date.now();

  // Midpoint toast at Q8 — repositioned to top to avoid covering options
  // on mobile; auto-dismiss after 1.8s so it doesn't linger.
  if(S.qi===7){
    const toast=document.getElementById('midpt-toast');
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),1800);
  }
}

/* Arc timer */
const ARC_C=2*Math.PI*15; // circumference
function startTim(secs){
  clearInterval(S.tim);S.tl=secs;updTim(secs,secs);
  S.tim=setInterval(()=>{S.tl--;updTim(S.tl,secs);if(S.tl<=0){clearInterval(S.tim);adv(0,QS[S.qi].trait);}},1000);
}
function updTim(tl,total){
  const fill=document.getElementById('arc-fill');
  const lbl=document.getElementById('arc-label');
  const frac=tl/total;
  const offset=ARC_C*(1-frac);
  fill.style.strokeDashoffset=offset;
  fill.style.stroke=tl<=7?'#e05c5c':'#d4a843';
  lbl.style.color=tl<=7?'#e05c5c':'var(--muted)';
  lbl.textContent=tl;
}

function pick(score,trait,btn){
  const el=(Date.now()-S.at)/1000;
  if(el<1.5)S.susp+=2;
  clearInterval(S.tim);
  document.querySelectorAll('.opt').forEach(b=>{b.classList.remove('chosen');b.disabled=true;});
  btn.classList.add('chosen');
  const adj=S.susp>8?Math.max(1,score-1):score;
  setTimeout(()=>adv(adj,trait),400);
}
function adv(score,trait){
  S.scores[trait]+=score;S.maxes[trait]+=4;S.qi++;
  if(S.qi>=QS.length)showReveal();else renderQ();
}

/* ═══════════════════════════ REVEAL ═══════════════════════════ */
async function showReveal(){
  TRAITS.forEach(t=>{S.pcts[t.id]=Math.round((S.scores[t.id]/S.maxes[t.id])*100);});
  S.overall=Math.round(Object.values(S.pcts).reduce((a,b)=>a+b,0)/5);
  S.arch=ARCHETYPES.find(a=>S.overall>=a.min)||ARCHETYPES[ARCHETYPES.length-1];
  saveSession(); // persist so app-switch on mobile doesn't lose results

  show('reveal');
  const revNum=document.getElementById('rev-num');
  const revArch=document.getElementById('rev-arch');
  const revTag=document.getElementById('rev-tag');
  revNum.textContent='—';revArch.textContent='';revTag.textContent='';

  await delay(400);
  let cur=0;const target=S.overall;const step=Math.ceil(target/30);
  const interval=setInterval(()=>{
    cur=Math.min(cur+step,target);revNum.textContent=cur;
    if(cur>=target){
      clearInterval(interval);
      setTimeout(()=>{
        revArch.textContent=S.arch.name;revArch.style.animation='pop .5s ease both';
        setTimeout(()=>{
          revTag.textContent=S.arch.tag;
          // Show share + email prompt after reveal
          setTimeout(()=>{
            document.getElementById('reveal-cta-wrap').style.display='block';
          },600);
        },300);
      },300);
    }
  },40);
}

function goToResults(){buildResults();}

/* ═══════════════════════════ RESULTS ═══════════════════════════ */
function buildResults(){
  show('results');
  document.getElementById('arch-name').textContent=S.arch.name;
  document.getElementById('arch-tag').textContent=S.arch.tag;
  document.getElementById('ov-score').textContent=S.overall;
  // No verdict on the total — the archetype above already interprets it, and it
  // does so kindly for every score. What goes here instead is a fact about THIS
  // profile: which dimension leads it. Non-comparative, and it sets up the point
  // the whole reading is built on — the shape matters more than the total.
  const lead=leadSummary();
  document.getElementById('ov-pct').innerHTML=lead.balanced
    ? `<strong>Evenly balanced</strong>`
    : `Led by <strong>${escapeHtml(lead.label)}</strong>`;

  // Shared-view mode: someone is looking at another person's reading
  const banner=document.getElementById('shared-banner');
  const bannerText=banner?.querySelector('.shared-banner-text');
  const resEy=document.getElementById('res-ey-label');
  if(S.isShared){
    if(banner)banner.style.display='flex';
    if(resEy)resEy.textContent = S.uname
      ? `${S.uname}'s Humanometer reading`
      : 'A Humanometer Reading';
    if(bannerText){
      bannerText.innerHTML = S.uname
        ? `You're viewing <strong>${escapeHtml(S.uname)}'s</strong> Humanometer reading. <strong>Want to discover your own professional edge?</strong>`
        : `You're viewing someone's Humanometer reading. <strong>Want to discover your own professional edge?</strong>`;
    }
  } else {
    if(banner)banner.style.display='none';
    if(resEy)resEy.textContent='Your Humanometer Reading';
  }

  // Permalink block — two states:
  //  • If S.uname is set (e.g. after entering name, or on a shared view), show
  //    the generated URL + Copy + Send buttons.
  //  • Otherwise show the name input + "Generate link" button.
  renderPermalinkBlock();

  // Was a rarity claim ("only 5% of people score this high"). Now it says the
  // one thing nothing else on the page says: what their leading dimension means
  // against AI — which is the actual proposition, rather than a ranking against
  // other people.
  const rarityEl=document.getElementById('rarity-line');
  if(rarityEl){
    rarityEl.textContent=lead.balanced
      ? `Your strongest dimensions sit level with each other — no single spike, which is its own kind of signal.`
      : `${lead.label} ${lead.names.length>1?'are your strongest signals':'is your strongest signal'} — the kind of judgment that grows more valuable as AI takes on the routine work.`;
  }

  // Share block label. With the ranking gone this no longer needs to branch on
  // score: "led by X" reads well at any total, so nobody is either flattered
  // with a fake percentile or told their number isn't worth posting.
  const shareLblEl=document.getElementById('share-rarity-label');
  if(shareLblEl){
    shareLblEl.textContent=lead.balanced
      ? `You scored ${S.overall}/100, evenly balanced across your top dimensions. Post it.`
      : `You scored ${S.overall}/100, led by ${lead.label}. Post it.`;
  }

  buildInsightCards();
  drawConst();
  buildShareCard();
  setupStickyShare();
}

function buildInsightCards(){
  // Sort traits: top half = strengths, bottom half = development
  const sorted=[...TRAITS].sort((a,b)=>S.pcts[b.id]-S.pcts[a.id]);
  const threshold=S.overall; // traits at or above overall = strengths
  const strengths=sorted.filter(t=>S.pcts[t.id]>=threshold);
  const devs=sorted.filter(t=>S.pcts[t.id]<threshold);

  // Ensure at least 2 in strengths, rest in dev
  while(strengths.length<2 && devs.length>0) strengths.push(devs.shift());

  // STRENGTHS CARDS
  const sc=document.getElementById('strength-cards');sc.innerHTML='';
  strengths.forEach((t,i)=>{
    const pct=S.pcts[t.id];
    const band=getBand(t.id,pct);
    const card=document.createElement('div');card.className='icard';
    card.innerHTML=`
      <div class="icard-top">
        <div class="icard-score-col" style="background:${t.color}16;border-right:1px solid ${t.color}20;">
          <div class="ic-num" style="color:${t.color}">${pct}</div>
          <div class="ic-bar"><div class="ic-fill" style="background:${t.color}"></div></div>
        </div>
        <div class="icard-body">
          <div class="ic-trait" style="color:${t.color}">${t.name}</div>
          <div class="ic-band">${band.band}</div>
          <div class="ic-insight">${band.insight}</div>
        </div>
      </div>
      <div class="icard-detail"><div class="ic-what">${band.what}</div></div>`;
    sc.appendChild(card);
    setTimeout(()=>card.querySelector('.ic-fill').style.width=pct+'%',200+i*80);
  });

  // COMBINATION INSIGHTS
  buildComboInsights(sorted, strengths, devs);

  // DEVELOPMENT CARDS — with learning tips
  const dc=document.getElementById('dev-cards');dc.innerHTML='';
  devs.forEach((t,i)=>{
    const pct=S.pcts[t.id];
    const band=getBand(t.id,pct);
    const tips=DEV_TIPS[t.id]?.[getBandIndex(pct)]||[];
    const card=document.createElement('div');card.className='dcard';
    card.innerHTML=`
      <div class="dcard-top">
        <div class="dcard-score-col">
          <div class="dc-num">${pct}</div>
          <div class="dc-bar"><div class="dc-fill" style="background:${t.color}88"></div></div>
        </div>
        <div class="dcard-body">
          <div class="dc-trait" style="color:${t.color}">${t.name}</div>
          <div class="dc-band">${band.band}</div>
          <div class="dc-insight">${band.insight}</div>
        </div>
      </div>
      <div class="dcard-learn">
        <div class="dc-tip-label">How to develop this</div>
        ${tips.map(tip=>`<div class="dc-tip">${tip}</div>`).join('')}
      </div>`;
    dc.appendChild(card);
    setTimeout(()=>card.querySelector('.dc-fill').style.width=pct+'%',200+i*80);
  });
}

function getBandIndex(pct){if(pct>=80)return 0;if(pct>=60)return 1;if(pct>=40)return 2;return 3;}

// Development tips — actionable, specific, 2 per trait per band
const DEV_TIPS={
  adaptive:[
    ['Your adaptability is already strong. The next level is helping others adapt — consider how you can use your fluency with change to coach colleagues who find it harder.','Watch for "change fatigue": people who adapt quickly can underestimate how disorienting change is for others. Slow down deliberately when leading others through transitions.'],
    ['Build your comfort with moving before you have complete information. Set yourself a rule: in low-stakes decisions, act on 70% of the information you think you need.','Practice "assumption mapping" — before starting anything ambiguous, write down your three biggest assumptions. Revisit them after. This builds the habit of making uncertainty explicit.'],
    ['The gap between adapting within familiar territory and adapting to genuinely new territory is mostly about tolerance for being wrong temporarily. Try deliberately entering situations where you\'re a beginner.','When you find yourself defaulting to a known approach, ask: "What would someone from a completely different field do here?" It doesn\'t have to be the answer — it just breaks the default.'],
    ['Start with micro-experiments in low-stakes situations. Take a different route to work. Change one thing about how you run a meeting. The goal is building the evidence that change doesn\'t break things.','Find one area of your professional life where a process could be different and run a 2-week experiment. Document what you notice. This builds the data that makes change less threatening.']
  ],
  ethical:[
    ['At this level, your challenge is helping others develop their ethical reasoning without it feeling like a lecture. Ask questions rather than making statements when you notice ethical gaps.','Consider whether your strong ethical instincts are always calibrated correctly — occasionally a high ethical standard can become a barrier to pragmatic progress. Reflect on where the line is for you.'],
    ['The next development area is moral courage under social pressure — when the group is going one way and you know it\'s wrong. Prepare for this in advance: decide your lines before you\'re in the situation.','Practice making your ethical reasoning visible when it\'s low-stakes. Say "I\'m hesitating because I\'m not sure this is fair to X" in small situations. It makes the bigger moments easier.'],
    ['The middle-ground ethical situations are where your consistency matters most. Build a simple personal rule you can apply quickly: "Would I be comfortable if this decision was reported publicly?"','When you notice an ethical discomfort but are unsure whether to act on it, write it down. Often the act of articulating it clarifies whether it requires action — and creates a record if it later matters.'],
    ['Start by noticing ethical dimensions in situations where the stakes are low. Ask yourself: "Who else is affected by this decision who isn\'t in the room?" This builds the habit before it matters.','Read one case study per month of an organizational ethics failure. Understanding how smart people ended up in compromised positions is the most practical ethics education available.']
  ],
  creative:[
    ['Your synthesis ability is rare. The risk at this level is that your ideas outpace your audience\'s ability to follow. Invest in making your thinking legible — build the bridge, not just the destination.','Consider deliberately working in constrained, narrow domains occasionally. Deep expertise in a single area gives synthetic thinkers more to work with across domains.'],
    ['Schedule deliberate "input time" — reading, conversations, or experiences outside your domain. Synthetic thinking is fuelled by varied inputs; without them, the connections get thinner.','Practice "forced connections" — take two completely unrelated concepts and find the most useful link between them. Do this daily for one month. It sharpens the underlying skill.'],
    ['Try constraint-based thinking: "How would I solve this if I had only half the budget / one week / three people?" Constraints force the kind of lateral thinking that produces genuinely new ideas.','Dedicate the first 10 minutes of any problem-solving session to generating ideas without evaluating them. Separate generation from assessment — mixing them is what kills creative output most often.'],
    ['Start treating execution excellence as a creative act. The most valuable creative contribution isn\'t always the new idea — it\'s often seeing a better way to build something that\'s already been decided.','Find one problem per month where you\'re asked to contribute ideas rather than execute, even if informally. Offer a suggestion in a meeting. Start small and build the creative-contribution habit.']
  ],
  empathic:[
    ['High empathic accuracy can become a burden if you absorb responsibility for emotional situations you can\'t resolve. Practice "noticing without owning" — you can see what someone is feeling without needing to fix it.','At this level, your biggest risk is emotional exhaustion. Build deliberate recovery habits after high-empathy interactions — not because you\'re failing, but because high output requires replenishment.'],
    ['The development edge here is group dynamics. You\'re strong in 1-to-1 but may miss the undercurrents in larger settings. Before group meetings, identify who is likely to be quiet and make a plan to include them.','Practice naming what you observe in low-stakes situations: "I noticed you went quiet when we discussed X — is there something there?" It builds the habit of acting on what you sense rather than just sensing it.'],
    ['Build a habit of one deliberate follow-up question when someone gives a surface-level answer. Not "are you sure?" but something specific: "What would actually make this easier for you?"','Pay attention to mismatches between words and tone. When someone\'s language is positive but their tone isn\'t, that gap is information. Practice noting it rather than accepting the words at face value.'],
    ['Start by simply noticing emotional information in interactions rather than immediately responding to the content. Ask: "How does this person seem to be feeling?" before deciding how to respond.','Choose one relationship per month — a colleague, a client — and invest deliberately in understanding how they think and what they find difficult. Build the curiosity habit in small, contained doses.']
  ],
  critical:[
    ['At this level, the development area is calibration — knowing when rigor is the right call and when it slows things down unnecessarily. Not every claim needs interrogating. Identify your highest-leverage moments.','Practice "steel-manning" — taking a position you disagree with and making the strongest possible case for it before critiquing it. This is the advanced form of critical thinking.'],
    ['Build a small set of fast heuristics you apply under pressure — three questions you always ask when evaluating a claim. Make them automatic so they work even when you\'re moving fast.','Identify your specific confirmation bias patterns. What kinds of claims do you tend to accept without scrutiny? Usually they\'re in the areas you care most about. That\'s where the blind spot lives.'],
    ['Build the habit of asking "what would have to be true for this to be wrong?" for any claim that supports what you already want to believe. Confirming evidence is the most dangerous kind.','Before sharing any statistic or claim in a professional context, spend 2 minutes finding the original source. Not the article about the study — the study. This habit alone will change how you evaluate information.'],
    ['Start with one consistent practice: when someone cites a study or statistic that matters to a decision, ask for the source. Not aggressively — just as a matter of course. "Where\'s that from?" is a complete sentence.','Practice noticing when you accept something because it\'s plausible rather than because you\'ve verified it. Plausibility is not evidence. Building this distinction is the foundation of critical thinking.']
  ]
};

function buildComboInsights(sorted, strengths, devs){
  const top=strengths[0];
  const second=strengths[1];
  const bottom=devs[devs.length-1];
  const items=[];

  // Insight 1: top two working together
  if(top && second){
    const combos={
      'adaptive+ethical':'Your adaptability and ethical grounding together create something rare: you can move fast through change without losing your moral compass. Most people sacrifice one for the other under pressure.',
      'adaptive+creative':'Adaptability and creative synthesis amplify each other directly — you don\'t just respond to new situations, you generate novel approaches within them. This combination is particularly powerful in roles without playbooks.',
      'adaptive+empathic':'Adaptability with high empathic accuracy means you adjust not just to new situations but to the people in them. You read what each person needs from the change, not just what the change requires logistically.',
      'adaptive+critical':'Adaptability tempered by rigorous thinking is a rare and valuable combination. You change direction quickly, but you verify before you commit. This prevents the impulsiveness that sometimes accompanies high adaptability.',
      'ethical+creative':'Ethical grounding combined with creative synthesis gives you the ability to find solutions that are both novel and responsible — you generate ideas within real-world constraints that others either ignore or treat as unchallengeable.',
      'ethical+empathic':'These two together make you exceptionally trustworthy in interpersonal situations. You notice how people are feeling and you care about doing right by them. In leadership or client contexts, this combination is deeply differentiating.',
      'ethical+critical':'Ethical judgment plus critical skepticism means you\'re hard to manipulate and hard to mislead into compromised positions. You question the framing, not just the conclusion.',
      'creative+empathic':'Creative synthesis and empathic accuracy together mean your ideas land. You don\'t just generate — you understand the audience and shape ideas to reach them. This is the combination that produces effective communication rather than just original thinking.',
      'creative+critical':'Creative and critical in combination is unusual — most people are stronger in one. You generate ideas and evaluate them with genuine rigor. The risk is paralysis; the reward is reliably better output.',
      'empathic+critical':'High empathy and high critical skepticism create a specific kind of intelligence: you understand what people feel and you question the reasoning beneath it. This makes you effective in situations requiring both trust and analytical clarity.'
    };
    const key=[top.id,second.id].sort().join('+');
    const combo=combos[key]||`Your strongest two dimensions — ${top.name} and ${second.name} — reinforce each other in your professional context. The combination creates capability that neither dimension produces independently.`;
    items.push({label:`${top.name} + ${second.name}`,text:combo});
  }

  // Insight 2: top strength + bottom development area — the dynamic tension
  if(top && bottom){
    const tensions={
      'adaptive+ethical':'High adaptability with developing ethical judgment creates a specific watch-out: moving fast can mean not pausing long enough to notice when a line is being crossed. Build in a deliberate "is this right?" checkpoint before committing to new approaches.',
      'adaptive+creative':'Strong adaptability with developing creative synthesis means you respond well to change but may default to known solutions rather than genuinely new ones. Invest in the generative phase before jumping to implementation.',
      'adaptive+empathic':'You adapt to situations quickly but may not always read how others are experiencing the same change. Build in explicit check-ins with people during transitions — don\'t assume your experience of change maps to theirs.',
      'adaptive+critical':'Adapting quickly with developing critical thinking creates a risk of moving confidently in the wrong direction. Build a pause-and-verify habit before committing to new approaches, especially when the evidence is thin.',
      'ethical+adaptive':'Strong ethical compass with developing adaptability means you know what\'s right but can struggle when the right path requires stepping into genuinely unknown territory. The ethical clarity is the foundation — build the tolerance for uncertainty on top of it.',
      'ethical+creative':'High ethical standards with developing creative synthesis can occasionally manifest as constraint-before-generation — you filter ideas for appropriateness before fully exploring them. Try separating the generative and evaluative phases deliberately.',
      'ethical+empathic':'Strong ethics with developing empathic accuracy creates a specific gap: you may act on principle when the situation actually calls for reading what the other person needs first. Ethical action and relational attunement aren\'t always the same thing.',
      'ethical+critical':'Strong ethical grounding with developing critical skepticism means your values are clear but you may sometimes accept supporting evidence without sufficient scrutiny. Apply your ethical rigor to the evidence itself, not just the conclusion.',
      'creative+adaptive':'Strong creative synthesis with developing adaptability — this is an interesting combination. You generate novel ideas but can be slower to adapt your approach when the context changes. Build the flexibility to shift your creative process, not just your output.',
      'creative+ethical':'Strong creative thinking with developing ethical judgment creates a specific risk in ideation: not all novel ideas are responsible ones. Build an ethical filter as a deliberate stage in your creative process.',
      'creative+empathic':'Strong creative synthesis with developing empathic accuracy means your ideas may not always land with the intended audience. The idea generation is strong; invest equally in understanding who you\'re generating for.',
      'creative+critical':'Strong creative output with developing critical skepticism means you generate prolifically but may not evaluate rigorously enough before committing. Build a structured evaluation phase after ideation.',
      'empathic+adaptive':'High empathic accuracy with developing adaptability means you read people exceptionally well but can find it harder to navigate when the whole situation is changing. Your relational anchors are strong — build situational flexibility around them.',
      'empathic+ethical':'Strong empathic accuracy with developing ethical judgment creates a nuanced tension: you understand how people feel, which can make it harder to act on principle when doing so causes visible discomfort. Being kind and being ethical are sometimes different things.',
      'empathic+creative':'Strong empathic accuracy with developing creative synthesis means you understand your audience exceptionally well but may be slower to generate genuinely novel approaches for them. You have the insight — invest in the generative process.',
      'empathic+critical':'High empathic accuracy with developing critical skepticism is a specific combination to watch: you\'re attuned to people, which can make you more susceptible to well-delivered but poorly-evidenced arguments. Conviction is not the same as correctness.',
      'critical+adaptive':'High critical skepticism with developing adaptability can occasionally mean you scrutinize new approaches so thoroughly that you don\'t move quickly enough to test them. Distinguish between evaluating an idea and implementing it cautiously.',
      'critical+ethical':'Strong critical thinking with developing ethical judgment — you question evidence rigorously, which is valuable, but may be less consistent in applying the same rigor to the ethical dimensions of decisions.',
      'critical+creative':'High critical skepticism with developing creative synthesis can inhibit idea generation — you evaluate before you\'ve finished generating. Build a strict rule: no evaluation during ideation. Separate the phases completely.',
      'critical+empathic':'Rigorous critical thinking with developing empathic accuracy creates a profile that is analytically strong but can miss the relational dimension of situations. Build the deliberate habit of asking "how is this person experiencing this?" alongside "is this correct?"'
    };
    const tkey=[top.id,bottom.id].sort().join('+');
    const tension=tensions[tkey]||`Your strongest dimension (${top.name}) and your developing dimension (${bottom.name}) create a dynamic worth understanding. Where you\'re naturally strong, invest in the complementary capability — it\'s often where the real professional leverage lies.`;
    items.push({label:`Watch point: ${top.name} × ${bottom.name}`,text:tension});
  }

  // Insight 3: overall profile shape
  const spread=Math.max(...Object.values(S.pcts))-Math.min(...Object.values(S.pcts));
  let shapeInsight='';
  if(spread<20){
    shapeInsight=`Your profile is unusually balanced — all five dimensions within ${spread} points of each other. This breadth is genuinely rare. It suggests you bring consistent capability across very different types of challenge, rather than being transformationally strong in one direction. In teams, this makes you the person who holds things together across boundaries. <strong>The development implication:</strong> choose one dimension to take to an exceptional level, rather than optimizing for breadth.`;
  } else if(spread<35){
    shapeInsight=`Your profile has clear peaks and a relatively solid floor — a moderately concentrated shape. You have genuine standout strengths and functional capability everywhere else. <strong>The development implication:</strong> your most efficient investment is shoring up your lowest dimension, which would raise your overall effectiveness more than pushing your peaks further.`;
  } else {
    shapeInsight=`Your profile is highly concentrated — a ${spread}-point spread between your highest and lowest dimension. This is a specialist profile: you bring exceptional depth in your leading traits and are meaningfully less developed in others. <strong>The development implication:</strong> know which roles play to your peaks and which expose your valleys. Choosing the right context is as important as developing the capability.`;
  }
  items.push({label:'Your overall profile shape',text:shapeInsight});

  const container=document.getElementById('combo-items');container.innerHTML='';
  items.forEach(item=>{
    const el=document.createElement('div');el.className='combo-item';
    el.innerHTML=`<div class="combo-item-label">${item.label}</div><div class="combo-item-text">${item.text}</div>`;
    container.appendChild(el);
  });
}

function drawConst(){
  const svg=document.getElementById('constellation');svg.innerHTML='';
  const cx=90,cy=90,r=68,n=TRAITS.length;
  const mk=(tag,attrs)=>{const el=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));return el;};
  const pts=TRAITS.map((t,i)=>{
    const a=(i/n)*2*Math.PI-Math.PI/2;
    const pr=14+(S.pcts[t.id]/100)*(r-14);
    return{x:cx+Math.cos(a)*pr,y:cy+Math.sin(a)*pr,ox:cx+Math.cos(a)*r,oy:cy+Math.sin(a)*r,color:t.color,val:S.pcts[t.id],a};
  });
  svg.appendChild(mk('polygon',{points:pts.map(p=>`${p.ox},${p.oy}`).join(' '),fill:'none',stroke:'rgba(212,168,67,0.1)','stroke-width':'1'}));
  pts.forEach(p=>svg.appendChild(mk('line',{x1:cx,y1:cy,x2:p.ox,y2:p.oy,stroke:'rgba(212,168,67,0.07)','stroke-width':'1'})));
  svg.appendChild(mk('polygon',{points:pts.map(p=>`${p.x},${p.y}`).join(' '),fill:'rgba(212,168,67,0.08)',stroke:'rgba(212,168,67,0.4)','stroke-width':'1.5'}));
  pts.forEach((p,i)=>{const nx=pts[(i+1)%n];svg.appendChild(mk('line',{x1:p.x,y1:p.y,x2:nx.x,y2:nx.y,stroke:p.color,'stroke-width':'1','stroke-opacity':'0.3'}));});
  pts.forEach(p=>{
    svg.appendChild(mk('circle',{cx:p.x,cy:p.y,r:'8',fill:p.color,opacity:'0.1'}));
    svg.appendChild(mk('circle',{cx:p.x,cy:p.y,r:'4',fill:p.color}));
    const lx=cx+Math.cos(p.a)*(r+15),ly=cy+Math.sin(p.a)*(r+15);
    const txt=mk('text',{x:lx,y:ly,fill:p.color,'font-size':'9','font-weight':'600','text-anchor':'middle','dominant-baseline':'middle','font-family':'Outfit,sans-serif'});
    txt.textContent=p.val;svg.appendChild(txt);
  });
  const spread=Math.max(...Object.values(S.pcts))-Math.min(...Object.values(S.pcts));
  const strongest=TRAITS.reduce((a,b)=>S.pcts[a.id]>S.pcts[b.id]?a:b);
  let shape='';
  if(spread<20)shape=`Your profile is unusually balanced — all five dimensions within a ${spread}-point range. This breadth is rare and suggests genuine cognitive versatility.`;
  else if(spread<35)shape=`Your shape is moderately varied, with ${strongest.name} as the clear leading dimension. Focused strengths alongside solid foundations.`;
  else shape=`Your constellation is highly distinctive — a ${spread}-point spread. This concentrated profile means exceptional depth in your leading traits.`;
  document.getElementById('ct-body').textContent=shape;
}

function buildShareCard(){
  const sorted=[...TRAITS].sort((a,b)=>S.pcts[b.id]-S.pcts[a.id]);
  const top2=sorted.slice(0,2);
  const rest=sorted.slice(2);

  document.getElementById('sc-n').textContent=S.overall;
  document.getElementById('sc-arch').textContent=S.arch.name;
  document.getElementById('sc-tag').textContent=S.arch.tag;

  // Peaks — prominent
  const peaksEl=document.getElementById('sc-peaks');peaksEl.innerHTML='';
  top2.forEach(t=>{
    const el=document.createElement('div');el.className='sc2-peak';
    el.innerHTML=`<div class="sc2-peak-score" style="color:${t.color}">${S.pcts[t.id]}</div><div class="sc2-peak-name">${t.name}</div>`;
    peaksEl.appendChild(el);
  });

  // Others — dimmed
  const othersEl=document.getElementById('sc-others');othersEl.innerHTML='';
  rest.forEach(t=>{
    const el=document.createElement('span');el.className='sc2-other';
    el.textContent=`${t.name.split(' ')[0]} ${S.pcts[t.id]}`;
    othersEl.appendChild(el);
  });

  // Hint text — creates curiosity about the on-screen depth
  const hintEl=document.getElementById('sc-hint');
  const weakest=sorted[sorted.length-1];
  hintEl.innerHTML=`Full reading — development areas, profile interactions, career insights — <strong>free at humanometer.com</strong>`;

  // Also update deliverables share panel
  const dn=document.getElementById('dsc-n');const da=document.getElementById('dsc-arch');const dt=document.getElementById('dsc-traits');
  if(dn)dn.textContent=S.overall;
  if(da)da.textContent=S.arch.name;
  if(dt){dt.innerHTML='';TRAITS.forEach(t=>{const s=document.createElement('span');s.className='sc-t';s.textContent=`${t.name.split(' ')[0]} ${S.pcts[t.id]}`;dt.appendChild(s);});}
}

/* Sticky share — appears when user has scrolled 80% of results without sharing */
function setupStickyShare(){
  let shown=false;
  const handler=()=>{
    if(shown||S.sharedOnce||S.purchased)return;
    const scrolled=window.scrollY+window.innerHeight;
    const total=document.body.scrollHeight;
    if(scrolled/total>0.82){
      document.getElementById('sticky-share').classList.add('show');
      shown=true;
      window.removeEventListener('scroll',handler);
    }
  };
  window.addEventListener('scroll',handler);
}

/* ═══════════════════════════ PAYMENT (Stripe Checkout) ═══════════════════════════ */
/* Product keys map to PRODUCTS in the Cloudflare Worker (/api/checkout).
   buyPack() (further down) opens the modal; startCheckout() redirects to Stripe's
   hosted payment page. After payment Stripe returns to /?paid=true and
   runFulfillment() restores the saved profile, generates the AI assets, and shows
   the deliverables. No card details are ever handled by this site. */

/* Checkout-modal accessibility. The modal is a plain div, so keyboard support
   is wired by hand: Escape closes it, Tab is trapped inside it (a keyboard user
   can't wander onto the covered page behind), focus moves in on open and returns
   to the trigger on close. Applied only to the purchase step via openModal() —
   the processing step (runFulfillment) opens the same element WITHOUT this, so a
   buyer can't Escape out mid-generation. */
let _modalPrevFocus=null;
function modalFocusables(){
  const modal=document.querySelector('#modal-bg .modal'); if(!modal) return [];
  return [...modal.querySelectorAll('button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])')]
    .filter(el=>el.offsetParent!==null && !el.disabled);
}
function trapModalKey(e){
  if(e.key==='Escape'){ e.preventDefault(); closePay(); return; }
  if(e.key!=='Tab') return;
  const f=modalFocusables(); if(!f.length) return;
  const first=f[0], last=f[f.length-1];
  if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
}
function openModal(){
  const bg=document.getElementById('modal-bg');
  _modalPrevFocus=document.activeElement;
  bg.classList.add('open');
  document.addEventListener('keydown',trapModalKey);
  const first=bg.querySelector('#pf-step input')||bg.querySelector('.mclose');
  if(first) setTimeout(()=>{ try{first.focus();}catch(e){} },50);
}
function closePay(){
  document.getElementById('modal-bg').classList.remove('open');
  document.removeEventListener('keydown',trapModalKey);
  if(_modalPrevFocus && _modalPrevFocus.focus){ try{_modalPrevFocus.focus();}catch(e){} }
  _modalPrevFocus=null;
}

async function startCheckout(){
  const em=document.getElementById('pe').value.trim();
  const nm=document.getElementById('pn').value.trim();
  if(!em||!em.includes('@')){alert('Please enter a valid email.');return;}
  if(!nm){alert('Please enter your name.');return;}
  S.uname=nm;S.savedEmail=em;
  // Persist the computed profile so we can restore it when Stripe redirects back
  sessionStorage.setItem('hm_state',JSON.stringify({
    pcts:S.pcts,overall:S.overall,arch:S.arch,uname:nm,savedEmail:em,selectedPack:S.selectedPack
  }));
  const btn=document.querySelector('.mpay');const lbl=document.getElementById('mpay-lbl');
  const orig=lbl.textContent;lbl.textContent='Redirecting to secure checkout…';if(btn)btn.disabled=true;
  try{
    const r=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({product:S.selectedPack,email:em,scores:S.pcts})});
    const d=await r.json();
    if(d.url){window.location.href=d.url;return;}
    throw new Error(d.error||'No checkout URL');
  }catch(e){
    alert('Could not start secure checkout. Please try again in a moment.');
    lbl.textContent=orig;if(btn)btn.disabled=false;
  }
}

/* Runs after returning from Stripe (?paid=true): rebuild results, animate the
   fulfillment steps while the AI assets generate, then reveal the deliverables.
   Only generates the assets the purchased tier actually includes. */
async function runFulfillment(){
  buildResults();
  show('results');
  document.getElementById('pf-step').style.display='none';
  document.getElementById('proc-step').classList.add('show');
  document.getElementById('modal-bg').classList.add('open');
  const tier = PACKS[S.selectedPack] || PACKS.career;
  const tabs = tier.tabs;
  S.gen={};
  // ps1 payment, ps2 analyze, ps3 edge/traps + LinkedIn, ps4 interview prep, ps5 certificate
  await stepUI('ps1', 800);
  await stepUI('ps2', 600);
  await stepUI('ps3', null, async()=>{
    if(tabs.includes('edge'))     await genAsset('edge');
    if(tabs.includes('traps'))    await genAsset('traps');
    if(tabs.includes('linkedin')) await genLinkedIn();
  });
  await stepUI('ps4', null, async()=>{
    if(tabs.includes('stories'))  await genAsset('stories');
    if(tabs.includes('guide'))    await genAsset('guide');
  });
  await stepUI('ps5', 500);
  // Purchase complete — the "Get career assets" sticky bar no longer applies.
  S.purchased=true;
  const ss=document.getElementById('sticky-share'); if(ss)ss.classList.remove('show');
  await delay(250);closePay();buildDeliverables();show('deliverables');
  // Persist the pack for durable re-access and email a copy (fire-and-forget).
  deliverPackAuto();
}

async function stepUI(id, ms, work){
  const el=document.getElementById(id); if(!el)return;
  el.classList.add('act');
  if(work) await work(); else if(ms) await delay(ms);
  el.classList.remove('act'); el.classList.add('done');
}

document.addEventListener('DOMContentLoaded',()=>{
  initCounter();
  const params=new URLSearchParams(window.location.search);

  // Post-Stripe-redirect fulfillment (highest priority — takes over the page)
  if(params.get('paid')==='true'){
    const sid=params.get('session_id')||'';
    const saved=sessionStorage.getItem('hm_state');
    if(saved){
      try{
        const d=JSON.parse(saved);
        S.pcts=d.pcts;S.overall=d.overall;S.arch=d.arch;S.uname=d.uname;S.savedEmail=d.savedEmail;S.selectedPack=d.selectedPack;
        // Stripe returns ?session_id=cs_... — the Worker verifies it's paid
        // before generating any asset. Capture it before we strip the query.
        S.sessionId=sid;
        // Make the purchase durable before doing anything that can fail:
        //  (1) persist the session id, so a reload reopens the pack;
        //  (2) claim it server-side — records the order and emails the
        //      permanent access link — so closing the tab during the ~30s of
        //      generation can't leave a paying customer with nothing.
        // Both run before generation; claimPurchase is fire-and-forget.
        saveSession();
        claimPurchase();
        history.replaceState({},'',window.location.pathname);
        runFulfillment();
        return;
      }catch(e){}
    }
    // No local state (re-access on another device / cleared tab). Rebuild the
    // reading + stored pack from the Worker rather than dumping them at home.
    if(sid){
      history.replaceState({},'',window.location.pathname+'?paid=true&session_id='+encodeURIComponent(sid));
      restoreFromServer(sid);
      return;
    }
  }

  // Permalink view — primary form is ?r=<code>; we also accept /r/<code>
  // as a fallback in case the Cloudflare assets layer ever lets it through.
  // Decode, populate state, render results in "shared view" mode.
  let permCode = params.get('r');
  if(!permCode){
    const pathMatch = window.location.pathname.match(/^\/r\/([A-Za-z0-9_-]{7})\/?$/);
    if(pathMatch) permCode = pathMatch[1];
  }
  if(permCode){
    const decoded = decodeReading(permCode);
    if(decoded){
      S.pcts = decoded.pcts;
      // Recompute overall from pcts (don't trust the URL not to lie about it)
      S.overall = Math.round(Object.values(S.pcts).reduce((a,b)=>a+b,0)/5);
      // Use the URL-encoded archetype, but only if it matches what overall
      // would naturally produce (defends against people hand-editing the URL
      // to claim "The Vanguard" with a score of 30).
      const expected = ARCHETYPES.find(a=>S.overall>=a.min)||ARCHETYPES[ARCHETYPES.length-1];
      S.arch = expected;
      S.uname = sanitizeName(params.get('n')||'');
      S.isShared = true;
      buildResults();
      show('results');
      return;
    }
  }

  // Restore the user's results if the tab was reloaded (mobile app-switching
  // commonly unloads the page). Without this they're dumped back at the home
  // page after taking the test, which feels like their work was lost.
  if(loadSession()){
    buildResults();
    show('results');
    // If this tab had a purchase, reopen it rather than stranding the buyer on
    // the free results screen. restoreFromServer re-verifies the payment with
    // Stripe and renders the stored pack without regenerating it.
    if(S.sessionId) restoreFromServer(S.sessionId);
  }
});

/* ═══════════════════════════ AI GEN ═══════════════════════════ */
/* Assets are generated server-side after payment. The client sends only the
   verified Stripe session id, the profile, and which asset it wants; the
   Worker (/api/fulfil) verifies the payment, checks the tier includes that
   asset, builds the prompt, and returns text. No prompts or model choices
   live here anymore — that's what closed the old open /api/generate proxy. */
function buildProfile(){
  return {
    scores:S.pcts,
    archetype:S.arch?S.arch.name:'',
    archetypeTag:S.arch?S.arch.tag:'',
    overall:S.overall,
    name:S.uname||''
  };
}
async function fulfil(kind,extra){
  const r=await fetch('/api/fulfil',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({session_id:S.sessionId||'',kind,profile:buildProfile(),...(extra||{})})
  });
  const d=await r.json().catch(()=>({}));
  if(!r.ok||!d||typeof d.text!=='string'){throw new Error((d&&d.error)||'Generation failed');}
  const text=d.text.trim();
  // A 200 with blank content (a content filter, an empty completion) is a
  // failure, not a result. Without this it slips past every caller's catch:
  // the asset stays '' (falsy), its panel never leaves "Generating…", and it's
  // never marked failed — so no retry banner ever appears. Throwing routes it
  // through the same failure path as a 502, so the buyer gets the retry option.
  if(!text){ throw new Error('The model returned an empty response'); }
  return text;
}
/* A failed generation is tracked in S.genFailed, NOT just papered over with
   placeholder text. Without this the placeholder gets stored in KV, emailed, and
   exported as if it were the asset the buyer paid for — so a bad Anthropic key
   or a transient 502 would send someone a receipt-worthy "pack" of error strings.
   The placeholder still renders in the panel so the tab isn't blank; everything
   that leaves the page filters on S.genFailed. */
const GEN_FAILED_TEXT='[Could not generate — use the Retry button at the top of this page]';
function markGenFailed(kind,e){
  S.genFailed=S.genFailed||{};
  S.genFailed[kind]=(e&&e.message)||'Generation failed';
}
function clearGenFailed(kind){ if(S.genFailed) delete S.genFailed[kind]; }
function genFailedKinds(){ return Object.keys(S.genFailed||{}); }

async function genLinkedIn(){
  try{ S.liText=await fulfil('linkedin'); clearGenFailed('linkedin'); }
  catch(e){ S.liText=GEN_FAILED_TEXT; markGenFailed('linkedin',e); }
}
// Coaching assets (edge, traps, stories, guide) all return Markdown and render
// identically, so one helper covers them. Text is kept in S.gen[kind].
async function genAsset(kind){
  S.gen=S.gen||{};
  try{ S.gen[kind]=await fulfil(kind); clearGenFailed(kind); }
  catch(e){ S.gen[kind]=GEN_FAILED_TEXT; markGenFailed(kind,e); }
}

/* ═══════════════════════════ DELIVERY (email + re-access) ═══════════════════════════ */
/* Send the finished pack to the Worker (/api/deliver): it stores the assets under
   the paid session id (so ?paid=true&session_id=… reopens them on any device) and
   emails a copy via Resend. The server re-verifies payment and ignores anything not
   in the purchased tier, so it's safe to hand it whatever we generated. */
function collectPackAssets(){
  const assets={};
  const failed=S.genFailed||{};
  ['edge','traps','stories','guide','role'].forEach(k=>{ if(S.gen&&S.gen[k]&&!failed[k]) assets[k]=S.gen[k]; });
  if(S.liText&&!failed.linkedin) assets.linkedin=S.liText;
  return assets;
}
async function deliverPack(email,opts){
  try{
    const body={session_id:S.sessionId||'',email:(email||'').trim(),name:S.uname||'',assets:collectPackAssets()};
    if(opts&&opts.storeOnly)body.storeOnly=true;
    const r=await fetch('/api/deliver',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify(body)
    });
    return await r.json().catch(()=>({}));
  }catch(e){ return {ok:false}; }
}
/* Register the purchase the instant we get back from Stripe, before generating
   anything. The server writes the order record and emails the permanent
   re-access link. Fulfillment is driven entirely by this browser, so without
   this a closed tab (or a crash) mid-generation left a paying customer with no
   assets, no email and no record — recoverable only by hand from the Stripe
   dashboard. Idempotent server-side, so revisits neither re-send nor overwrite. */
async function claimPurchase(){
  try{
    await fetch('/api/deliver',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        session_id:S.sessionId||'',
        email:(S.savedEmail||'').trim(),
        name:S.uname||'',
        assets:{},
        mode:'claim'
      })
    });
  }catch(e){ /* non-fatal — the pack delivery at the end still stores + emails */ }
}

/* Fired once automatically after fulfillment. Stores the pack for re-access and, if
   we have the buyer's email (we almost always do — checkout requires it), sends it. */
async function deliverPackAuto(){
  if(S.delivered)return;
  S.delivered=true;
  const to=(S.savedEmail||'').trim();
  const d=await deliverPack(to);
  updateDeliverStatus(d,to);
}
/* Manual "email me a copy" button on the deliverables page. */
async function sendPackByEmail(){
  const inp=document.getElementById('de-input');
  const btn=document.getElementById('de-send');
  if(!inp)return;
  const to=(inp.value||'').trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)){
    inp.focus();inp.style.borderColor='var(--bad,#e05c5c)';
    setTimeout(()=>{inp.style.borderColor='';},1500);
    return;
  }
  S.savedEmail=to; saveSession();
  const orig=btn?btn.textContent:'';
  if(btn){btn.disabled=true;btn.textContent='Sending…';}
  const d=await deliverPack(to);
  if(btn){btn.disabled=false;btn.textContent=orig;}
  updateDeliverStatus(d,to);
}
function updateDeliverStatus(d,to){
  const st=document.getElementById('de-status');
  const inp=document.getElementById('de-input');
  if(!st)return;
  if(d&&d.emailed){
    st.textContent='✓ Sent to '+to; st.className='de-status ok';
    S.emailedOnce=true;
    if(inp&&to)inp.value=to;
  }else if(d&&d.reason==='not-configured'){
    st.textContent='Saved to your re-access link. (Email delivery is being switched on.)'; st.className='de-status';
  }else if(d&&d.reason==='no-email'){
    st.textContent='Enter your email and we’ll send the full pack.'; st.className='de-status';
  }else if(d&&d.reason==='nothing-to-send'){
    // Every asset failed — don't imply a pack is sitting safely on the page.
    st.textContent='Nothing to send yet — retry the assets above first.'; st.className='de-status';
  }else{
    st.textContent='Couldn’t email just now — your assets are safe on this page. Try again?'; st.className='de-status';
  }
}

/* Durable re-access: returning to ?paid=true&session_id=… with no saved tab state
   (another device, cleared storage). Rebuild the reading from the Worker, which
   returns the scores captured at checkout plus any stored pack — no regeneration
   needed if the pack was saved. */
async function restoreFromServer(sid){
  S.sessionId=sid;
  // This now also runs on a plain reload, where the tab already has a perfectly
  // good reading in memory. Falling back to the home page there would throw away
  // a reading the user can see — so bail to their results instead, and only drop
  // to the landing screen when there's genuinely nothing to show.
  const bail=()=>{
    if(S.arch&&S.pcts&&Object.keys(S.pcts).length){ buildResults(); show('results'); }
    else show('landing');
  };
  try{
    const r=await fetch('/api/assets?session_id='+encodeURIComponent(sid));
    const d=await r.json().catch(()=>({}));
    // Needs real scores to rebuild a reading — an empty {} would render a
    // straight-zeros profile, which looks like a broken purchase.
    if(!r.ok||!d||!d.scores||!Object.keys(d.scores).length){ bail(); return; }
    S.pcts={};
    TRAITS.forEach(t=>{ let v=Math.round(Number(d.scores[t.id])); if(!isFinite(v))v=0; S.pcts[t.id]=Math.max(0,Math.min(100,v)); });
    S.overall=Math.round(Object.values(S.pcts).reduce((a,b)=>a+b,0)/5);
    S.arch=ARCHETYPES.find(a=>S.overall>=a.min)||ARCHETYPES[ARCHETYPES.length-1];
    // Keep a locally-known name if the server has none: a claim made before the
    // buyer's name reached KV would otherwise blank the certificate.
    const srvName=sanitizeName(d.name||'');
    if(srvName)S.uname=srvName;
    if(PACKS[d.product])S.selectedPack=d.product;
    S.purchased=true;
    S.gen={};
    ['edge','traps','stories','guide','role'].forEach(k=>{ if(d.assets&&d.assets[k])S.gen[k]=d.assets[k]; });
    if(d.assets&&d.assets.linkedin)S.liText=d.assets.linkedin;
    buildResults();
    saveSession(); // keep the session id fresh so further reloads still resolve
    if(Object.keys(S.gen).length||S.liText){
      // Already generated + stored on a previous visit — just render it.
      S.delivered=true;
      buildDeliverables(); show('deliverables');
    }else{
      // Paid but nothing stored (rare) — regenerate from the still-valid session
      // and let deliverPackAuto persist it. savedEmail isn't set on a re-access
      // load, so this stores the pack without re-emailing.
      S.delivered=false;
      runFulfillment();
    }
  }catch(e){ bail(); }
}

/* ═══════════════════════════ PACK EXPORT (copy / .md / .html) ═══════════════════════════ */
/* Client-side, no infra: let the buyer keep the whole pack as a file or clipboard
   blob so losing the tab never loses the purchase. Whole-pack only — each asset
   already has its own "Copy to clipboard". Includes the tier's AI assets plus a
   small header (name, archetype, scores). */
const PACK_ORDER=['edge','traps','stories','guide','role','linkedin'];
const PACK_LABELS={edge:'Your Edge',traps:'Know Your Traps',stories:'Stories to Dig Up',guide:'The Interview Prep Guide',role:'Your Role-Tailored Brief',linkedin:"Your LinkedIn 'About' — themes to emphasize"};
function packAssetText(k){return k==='linkedin'?(S.liText||''):((S.gen&&S.gen[k])||'');}
function packItems(){
  const allowed=new Set((PACKS[S.selectedPack]||PACKS.career).tabs);
  const failed=S.genFailed||{};
  return PACK_ORDER.filter(k=>allowed.has(k)&&!failed[k]&&packAssetText(k).trim())
                   .map(k=>({title:PACK_LABELS[k],text:packAssetText(k).trim()}));
}
function packAsMarkdown(){
  const L=['# Humanometer — Your Career Pack',''];
  if(S.uname)L.push('**'+S.uname+'**');
  if(S.arch)L.push(S.arch.name+' — '+S.arch.tag);
  L.push('','Overall: '+S.overall+'/100');
  L.push(TRAITS.map(t=>'- '+t.name+': '+S.pcts[t.id]+'/100').join('\n'));
  packItems().forEach(it=>{L.push('','## '+it.title,'',it.text);});
  L.push('','---','Generated at humanometer.com');
  return L.join('\n');
}
function packAsHtml(){
  const esc=escapeHtml;
  const scoreRows=TRAITS.map(t=>`<tr><td>${esc(t.name)}</td><td class="v">${S.pcts[t.id]}/100</td></tr>`).join('');
  const sections=packItems().map(it=>`<section><h2>${esc(it.title)}</h2><div class="body">${mdLite(it.text)}</div></section>`).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Humanometer — ${esc(S.uname||'Your Career Pack')}</title>
<style>
:root{--gold:#c79a2e}
*{box-sizing:border-box}
body{margin:0;background:#f4f1ea;color:#22201b;font:16px/1.65 Georgia,'Times New Roman',serif;padding:32px 16px}
.wrap{max-width:720px;margin:0 auto;background:#fff;border:1px solid #e7e0d0;border-radius:14px;padding:34px 32px}
.brand{font:700 22px/1 Georgia,serif}.brand span{color:var(--gold)}
h1{font-size:26px;margin:18px 0 4px}
.sub{color:#6a6456;font-style:italic;margin:0 0 18px}
table{border-collapse:collapse;width:100%;margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:14px}
td{padding:6px 0;border-bottom:1px solid #eee6d5}.v{text-align:right;font-weight:700;color:#8a6a1f}
section{margin-top:26px}
h2{font:600 13px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#a6791f;margin:0 0 10px;border-top:1px solid #eee6d5;padding-top:20px}
.body{white-space:pre-wrap;background:#faf7f0;border:1px solid #ece3cf;border-radius:10px;padding:16px 18px}
.foot{margin-top:28px;color:#9a9484;font:12px/1.6 Arial,sans-serif}
a{color:#a6791f}
</style></head><body><div class="wrap">
<div class="brand">Human<span>ometer</span></div>
<h1>${esc(S.uname||'Your Career Pack')}</h1>
${S.arch?`<p class="sub">${esc(S.arch.name)} — ${esc(S.arch.tag)}</p>`:''}
<table><tbody>${scoreRows}<tr><td><strong>Overall</strong></td><td class="v">${S.overall}/100</td></tr></tbody></table>
${sections}
<p class="foot">Your reading and coaching from <a href="https://humanometer.com">humanometer.com</a> — built from your specific scores.</p>
</div></body></html>`;
}
function downloadFile(filename,text,mime){
  try{
    const blob=new Blob([text],{type:mime});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download=filename;
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1500);
    return true;
  }catch(e){return false;}
}
function packFileBase(){
  const n=(S.uname||'').trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  return n?('humanometer-pack-'+n):'humanometer-pack';
}
function copyEverything(btn){
  // Was reporting "✓ Copied" on rejection too (same handler for both branches);
  // copyToClipboard distinguishes them and falls back to execCommand first.
  copyToClipboard(packAsMarkdown(),btn);
}
function downloadPackMd(){
  if(downloadFile(packFileBase()+'.md',packAsMarkdown(),'text/markdown;charset=utf-8'))showToast('Downloaded your pack as a Markdown file.');
}
function downloadPackHtml(){
  if(downloadFile(packFileBase()+'.html',packAsHtml(),'text/html;charset=utf-8'))showToast('Downloaded your pack as a web page you can keep.');
}

/* ═══════════════════════════ PNG EXPORT (certificate + share card) ═══════════════════════════ */
/* Drawn on a <canvas> by hand — no html2canvas/jsPDF dependency, no CDN, works
   offline and stays CSP-clean. Produces a crisp shareable image of the cert /
   score card from the same profile the on-page versions use. */
function roundRectPath(x,rx,ry,w,h,r){
  x.beginPath();x.moveTo(rx+r,ry);
  x.arcTo(rx+w,ry,rx+w,ry+h,r);x.arcTo(rx+w,ry+h,rx,ry+h,r);
  x.arcTo(rx,ry+h,rx,ry,r);x.arcTo(rx,ry,rx+w,ry,r);x.closePath();
}
function setSpacing(x,v){ if('letterSpacing' in x){ try{x.letterSpacing=v;}catch(e){} } }
async function fontsReady(){ try{ if(document.fonts&&document.fonts.ready) await document.fonts.ready; }catch(e){} }

async function renderCertCanvas(scale){
  await fontsReady();
  scale=scale||1;
  const W=1000,H=680,c=document.createElement('canvas');c.width=W*scale;c.height=H*scale;
  const x=c.getContext('2d');x.scale(scale,scale);
  const g=x.createLinearGradient(0,0,W*0.4,H);
  g.addColorStop(0,'#0d1220');g.addColorStop(.55,'#141c2e');g.addColorStop(1,'#0d1220');
  x.fillStyle=g;x.fillRect(0,0,W,H);
  x.strokeStyle='#d4a843';x.lineWidth=2;x.strokeRect(14,14,W-28,H-28);
  x.textAlign='center';x.textBaseline='alphabetic';
  setSpacing(x,'4px');x.fillStyle='#d4a843';x.font="600 15px 'Outfit',Arial,sans-serif";
  x.fillText('HUMANOMETER · VERIFIED READING · 2026',W/2,86);
  setSpacing(x,'0px');
  x.fillStyle='#ece8de';x.font="700 48px 'Cormorant Garamond',Georgia,serif";
  x.fillText(S.uname||'Your Name',W/2,200);
  x.fillStyle='#d4a843';x.font="italic 700 24px 'Cormorant Garamond',Georgia,serif";
  x.fillText(S.arch.name+' — '+S.arch.tag,W/2,256);
  x.strokeStyle='rgba(212,168,67,.4)';x.lineWidth=1;
  x.beginPath();x.moveTo(W/2-30,290);x.lineTo(W/2+30,290);x.stroke();
  const n=TRAITS.length,spanW=780,startX=W/2-spanW/2,step=spanW/n;
  TRAITS.forEach((t,i)=>{
    const cx=startX+step*(i+0.5);
    x.fillStyle=t.color;x.font="700 34px 'Cormorant Garamond',Georgia,serif";
    x.fillText(String(S.pcts[t.id]),cx,374);
    setSpacing(x,'2px');x.fillStyle='#7a7670';x.font="600 13px 'Outfit',Arial,sans-serif";
    x.fillText(t.name.split(' ')[0].toUpperCase(),cx,400);setSpacing(x,'0px');
  });
  x.textAlign='left';x.fillStyle='#ece8de';x.font="600 15px 'Outfit',Arial,sans-serif";
  x.fillText('humanometer.com',60,H-72);
  x.fillStyle='#7a7670';x.font="400 13px 'Outfit',Arial,sans-serif";
  x.fillText(new Date().toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'}),60,H-48);
  setSpacing(x,'2px');x.font="600 14px 'Outfit',Arial,sans-serif";
  const chipText='VERIFIED ✓',tw=x.measureText(chipText).width,chipW=tw+24,chipX=W-60-chipW,chipY=H-92,chipH=34;
  x.fillStyle='rgba(212,168,67,.12)';x.strokeStyle='rgba(212,168,67,.22)';x.lineWidth=1;
  roundRectPath(x,chipX,chipY,chipW,chipH,4);x.fill();x.stroke();
  x.fillStyle='#d4a843';x.textBaseline='middle';x.fillText(chipText,chipX+12,chipY+chipH/2+1);
  x.textBaseline='alphabetic';setSpacing(x,'0px');
  return c;
}

async function renderShareCanvas(scale){
  await fontsReady();
  scale=scale||1;
  const W=1200,H=630,c=document.createElement('canvas');c.width=W*scale;c.height=H*scale;
  const x=c.getContext('2d');x.scale(scale,scale);
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#0c0f1a');g.addColorStop(1,'#111520');
  x.fillStyle=g;x.fillRect(0,0,W,H);
  x.strokeStyle='rgba(212,168,67,.22)';x.lineWidth=1;x.strokeRect(.5,.5,W-1,H-1);
  const gb=x.createLinearGradient(0,0,W,0);
  gb.addColorStop(0,'rgba(212,168,67,0)');gb.addColorStop(.5,'#d4a843');gb.addColorStop(1,'rgba(212,168,67,0)');
  x.fillStyle=gb;x.fillRect(0,0,W,5);
  const rcx=200,rcy=H/2-10,rr=95;
  x.beginPath();x.arc(rcx,rcy,rr,0,Math.PI*2);x.closePath();
  x.fillStyle='rgba(212,168,67,.10)';x.fill();x.strokeStyle='#d4a843';x.lineWidth=3;x.stroke();
  x.textAlign='center';
  x.fillStyle='#d4a843';x.font="700 72px 'Cormorant Garamond',Georgia,serif";x.fillText(String(S.overall),rcx,rcy+8);
  x.fillStyle='#7a7670';x.font="400 20px 'Outfit',Arial,sans-serif";x.fillText('/ 100',rcx,rcy+44);
  const bx=360;x.textAlign='left';
  setSpacing(x,'4px');x.fillStyle='#d4a843';x.font="600 20px 'Outfit',Arial,sans-serif";
  x.fillText('THE HUMAN EDGE · 2026',bx,rcy-92);setSpacing(x,'0px');
  x.fillStyle='#ece8de';x.font="700 60px 'Cormorant Garamond',Georgia,serif";x.fillText(S.arch.name,bx,rcy-26);
  x.fillStyle='#9a948a';x.font="italic 400 24px 'Cormorant Garamond',Georgia,serif";x.fillText(S.arch.tag,bx,rcy+12);
  let cxp=bx,cyp=rcy+42;const chipH=40,padX=14,gap=10;
  x.font="600 16px 'Outfit',Arial,sans-serif";setSpacing(x,'1px');
  TRAITS.forEach(t=>{
    const label=t.name.split(' ')[0].toUpperCase()+' '+S.pcts[t.id];
    const cw=x.measureText(label).width+padX*2;
    if(cxp+cw>W-50){cxp=bx;cyp+=chipH+gap;}
    x.fillStyle='rgba(212,168,67,.10)';x.strokeStyle='rgba(212,168,67,.22)';x.lineWidth=1;
    roundRectPath(x,cxp,cyp,cw,chipH,6);x.fill();x.stroke();
    x.fillStyle=t.color;x.textBaseline='middle';x.fillText(label,cxp+padX,cyp+chipH/2+1);x.textBaseline='alphabetic';
    cxp+=cw+gap;
  });
  setSpacing(x,'0px');
  x.textAlign='right';x.fillStyle='#7a7670';x.font="400 18px 'Outfit',Arial,sans-serif";
  x.fillText('humanometer.com',W-40,H-34);
  return c;
}

function saveCanvasPng(canvas,filename,done){
  if(canvas.toBlob){
    canvas.toBlob(function(blob){
      if(!blob){return;}
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');a.href=url;a.download=filename;
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1500);
      if(done)done();
    },'image/png');
  }else{
    const a=document.createElement('a');a.href=canvas.toDataURL('image/png');a.download=filename;
    document.body.appendChild(a);a.click();a.remove();
    if(done)done();
  }
}
async function downloadCertPng(){
  if(!S.arch)return;
  const c=await renderCertCanvas();
  saveCanvasPng(c,packFileBase()+'-certificate.png',()=>showToast('Saved your certificate as an image.'));
}
async function downloadSharePng(){
  if(!S.arch)return;
  const c=await renderShareCanvas();
  saveCanvasPng(c,packFileBase()+'-share-card.png',()=>showToast('Saved your share card as an image.'));
}

/* One-tap PDF, dependency-free: embed the canvas as a JPEG image XObject in a
   hand-written single-page PDF (JPEG is natively supported via /DCTDecode, so no
   library is needed and CSP stays clean). Byte offsets are tracked exactly for
   the xref table. */
async function canvasToPdfBlob(canvas){
  const jpegBlob=await new Promise(res=>canvas.toBlob(res,'image/jpeg',0.92));
  const jpeg=new Uint8Array(await jpegBlob.arrayBuffer());
  const iw=canvas.width, ih=canvas.height;
  const pw=522, ph=Math.round(pw*ih/iw); // points (72dpi); 522pt fits Letter margins
  const enc=(s)=>new TextEncoder().encode(s);
  const parts=[]; let len=0; const offsets=[];
  const push=(bytes)=>{parts.push(bytes);len+=bytes.length;};
  const pushStr=(s)=>push(enc(s));
  const obj=(n,body)=>{offsets[n]=len;pushStr(n+' 0 obj\n'+body+'\nendobj\n');};
  pushStr('%PDF-1.3\n');
  obj(1,'<< /Type /Catalog /Pages 2 0 R >>');
  obj(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  obj(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+pw+' '+ph+'] /Resources << /XObject << /Im0 5 0 R >> >> /Contents 4 0 R >>');
  const content='q '+pw+' 0 0 '+ph+' 0 0 cm /Im0 Do Q';
  obj(4,'<< /Length '+content.length+' >>\nstream\n'+content+'\nendstream');
  offsets[5]=len;
  pushStr('5 0 obj\n<< /Type /XObject /Subtype /Image /Width '+iw+' /Height '+ih+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+jpeg.length+' >>\nstream\n');
  push(jpeg);
  pushStr('\nendstream\nendobj\n');
  const xrefStart=len;
  let xref='xref\n0 6\n0000000000 65535 f \n';
  for(let i=1;i<=5;i++){xref+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';}
  pushStr(xref);
  pushStr('trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n'+xrefStart+'\n%%EOF');
  const out=new Uint8Array(len); let p=0; for(const b of parts){out.set(b,p);p+=b.length;}
  return new Blob([out],{type:'application/pdf'});
}
function savePdfBlob(blob,filename,done){
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=filename;
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
  if(done)done();
}
/* Light (printable) PDF renderers. The on-screen cards stay as they are; these
   are white-background versions drawn just for the one-tap PDFs, so printouts
   look right on paper. Same canvas→JPEG→PDF path as the certificate. */
function wrapText(x,text,maxW){
  const words=String(text||'').replace(/\s+/g,' ').trim().split(' ');
  const lines=[];let line='';
  for(const w of words){const t=line?line+' '+w:w;if(x.measureText(t).width>maxW&&line){lines.push(line);line=w;}else line=t;}
  if(line)lines.push(line);
  return lines;
}
const LT={gold:'#a6791f',accent:'#c79a2e',txt:'#1c1c1c',mut:'#8a8371',body:'#3a352b',bord:'#e6ddc9',rule:'#cfc7b3'};
function newLightCanvas(W,H,scale){
  const c=document.createElement('canvas');c.width=W*scale;c.height=H*scale;
  const x=c.getContext('2d');x.scale(scale,scale);
  x.fillStyle='#ffffff';x.fillRect(0,0,W,H);
  return {c,x};
}

async function renderCertLightCanvas(scale){
  await fontsReady();scale=scale||1;const W=1000,H=680;const {c,x}=newLightCanvas(W,H,scale);
  x.fillStyle='#fffdf7';x.fillRect(0,0,W,H);
  x.strokeStyle=LT.accent;x.lineWidth=2;x.strokeRect(16,16,W-32,H-32);
  x.strokeStyle='rgba(199,154,46,.35)';x.lineWidth=1;x.strokeRect(24,24,W-48,H-48);
  x.textAlign='center';
  setSpacing(x,'4px');x.fillStyle=LT.gold;x.font="600 15px 'Outfit',Arial,sans-serif";x.fillText('HUMANOMETER · VERIFIED READING · 2026',W/2,88);
  setSpacing(x,'0px');
  x.fillStyle=LT.txt;x.font="700 48px 'Cormorant Garamond',Georgia,serif";x.fillText(S.uname||'Your Name',W/2,200);
  x.fillStyle=LT.gold;x.font="700 24px 'Cormorant Garamond',Georgia,serif";x.fillText(S.arch.name+' — '+S.arch.tag,W/2,256);
  x.strokeStyle='rgba(199,154,46,.5)';x.lineWidth=1;x.beginPath();x.moveTo(W/2-30,290);x.lineTo(W/2+30,290);x.stroke();
  const n=TRAITS.length,spanW=780,startX=W/2-spanW/2,step=spanW/n;
  TRAITS.forEach((t,i)=>{const cx=startX+step*(i+0.5);
    x.fillStyle=t.color;x.font="700 34px 'Cormorant Garamond',Georgia,serif";x.fillText(String(S.pcts[t.id]),cx,374);
    setSpacing(x,'2px');x.fillStyle=LT.mut;x.font="600 13px 'Outfit',Arial,sans-serif";x.fillText(t.name.split(' ')[0].toUpperCase(),cx,400);setSpacing(x,'0px');});
  x.textAlign='left';x.fillStyle=LT.txt;x.font="600 15px 'Outfit',Arial,sans-serif";x.fillText('humanometer.com',60,H-72);
  x.fillStyle=LT.mut;x.font="400 13px 'Outfit',Arial,sans-serif";x.fillText(new Date().toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'}),60,H-48);
  setSpacing(x,'2px');x.font="600 14px 'Outfit',Arial,sans-serif";
  const ct='VERIFIED ✓',tw=x.measureText(ct).width,cw=tw+24,cX=W-60-cw,cY=H-92,cH=34;
  x.fillStyle='rgba(199,154,46,.12)';x.strokeStyle='rgba(199,154,46,.4)';x.lineWidth=1;roundRectPath(x,cX,cY,cw,cH,4);x.fill();x.stroke();
  x.fillStyle=LT.gold;x.textBaseline='middle';x.fillText(ct,cX+12,cY+cH/2+1);x.textBaseline='alphabetic';setSpacing(x,'0px');
  return c;
}

async function renderCheatCanvas(scale){
  await fontsReady();scale=scale||1;const W=1000,H=1540,M=64,R=W-M;const {c,x}=newLightCanvas(W,H,scale);
  const sorted=[...TRAITS].sort((a,b)=>S.pcts[b.id]-S.pcts[a.id]),strong=sorted[0],weak=sorted[sorted.length-1];
  const rule=(x1,x2,yy,col)=>{x.strokeStyle=col||LT.rule;x.lineWidth=1;x.beginPath();x.moveTo(x1,yy);x.lineTo(x2,yy);x.stroke();};
  let y=76;
  x.textAlign='center';
  setSpacing(x,'3px');x.fillStyle=LT.gold;x.font="600 13px 'Outfit',Arial,sans-serif";x.fillText('HUMANOMETER · INTERVIEW CHEAT SHEET · 2026',W/2,y);setSpacing(x,'0px');y+=40;
  x.fillStyle=LT.txt;x.font="700 34px 'Cormorant Garamond',Georgia,serif";x.fillText(S.uname||'Your Interview Prep',W/2,y);y+=28;
  x.fillStyle=LT.gold;x.font="700 17px 'Cormorant Garamond',Georgia,serif";x.fillText(S.arch.name+' — '+S.arch.tag,W/2,y);y+=22;
  x.strokeStyle=LT.txt;x.lineWidth=2;x.beginPath();x.moveTo(M,y);x.lineTo(R,y);x.stroke();y+=34;
  // score chips (centered)
  x.font="600 14px 'Outfit',Arial,sans-serif";
  const chips=TRAITS.map(t=>({t,l:t.name.split(' ')[0].toUpperCase()+' '+S.pcts[t.id]}));
  const cH=32,pX=12,g=8;let tot=0;chips.forEach(ch=>{ch.w=x.measureText(ch.l).width+pX*2;tot+=ch.w+g;});tot-=g;
  let cx=(W-tot)/2;
  chips.forEach(ch=>{const isS=ch.t.id===strong.id,isW=ch.t.id===weak.id;
    x.fillStyle=isS?'#fbf2da':(isW?'#fbeee8':'#faf7f0');x.strokeStyle=isS?LT.accent:(isW?'#e0b4a0':LT.bord);x.lineWidth=1;
    roundRectPath(x,cx,y,ch.w,cH,6);x.fill();x.stroke();
    x.fillStyle=ch.t.color;x.textBaseline='middle';x.textAlign='left';x.fillText(ch.l,cx+pX,y+cH/2+1);x.textBaseline='alphabetic';cx+=ch.w+g;});
  y+=cH+26;
  x.textAlign='left';x.fillStyle=LT.body;x.font="13px 'Outfit',Arial,sans-serif";
  wrapText(x,'Interviewers probe your lowest dimension — '+weak.name+' — hardest. Prepare that story first. Lead with your '+strong.name+'.',R-M).forEach(l=>{x.fillText(l,M,y);y+=19;});
  y+=20;
  const heading=(t,sub)=>{x.fillStyle=LT.txt;setSpacing(x,'.5px');x.font="700 13px 'Outfit',Arial,sans-serif";x.fillText(t.toUpperCase(),M,y);
    if(sub){const w=x.measureText(t.toUpperCase()).width;setSpacing(x,'0px');x.fillStyle=LT.mut;x.font="12px 'Outfit',Arial,sans-serif";x.fillText('   '+sub,M+w,y);}setSpacing(x,'0px');y+=9;rule(M,R,y,LT.bord);y+=24;};
  heading('Your STAR stories','— 3–4 real ones you can tell cold');
  for(let i=1;i<=4;i++){
    x.beginPath();x.arc(M+9,y-5,9,0,Math.PI*2);x.fillStyle=LT.txt;x.fill();
    x.fillStyle='#fff';x.font="700 11px 'Outfit',Arial,sans-serif";x.textAlign='center';x.fillText(String(i),M+9,y-1);x.textAlign='left';
    rule(M+26,R,y,LT.txt);y+=6;
    if(i===1){x.fillStyle='#a06a2e';x.font="italic 11px 'Outfit',Arial,sans-serif";y+=14;x.fillText('Make this the one that shows your '+weak.name+' — prepare it first.',M+26,y);}
    y+=16;
    ['S','T','A','R'].forEach(lab=>{x.fillStyle=LT.gold;x.font="700 12px 'Outfit',Arial,sans-serif";x.fillText(lab,M+26,y);rule(M+46,R,y+2,LT.rule);y+=23;});
    y+=8;
  }
  y+=4;
  heading('STAR in one line');
  x.fillStyle=LT.body;x.font="13px 'Outfit',Arial,sans-serif";
  wrapText(x,'Situation → Task → Action → Result. One sentence each; spend most of your words on Action and Result.',R-M).forEach(l=>{x.fillText(l,M,y);y+=19;});
  y+=18;
  heading('Freeze questions','— decide your angle before the room');
  ['“What’s your greatest weakness?”','“Why are you leaving your current job?” (or why you left your last one)','“Tell me about a time you failed.”'].forEach(q=>{
    x.fillStyle=LT.txt;x.font="600 13px 'Outfit',Arial,sans-serif";x.fillText(q,M,y);y+=20;
    x.fillStyle=LT.mut;x.font="11px 'Outfit',Arial,sans-serif";x.fillText('Your angle:',M,y);rule(M+62,R,y+1,LT.rule);y+=26;});
  y+=6;
  heading('3 questions to ask them');
  for(let i=0;i<3;i++){rule(M,R,y,LT.rule);y+=30;}
  y+=8;
  heading('Before you walk in');
  x.font="13px 'Outfit',Arial,sans-serif";
  [ 'Lead with your strongest dimension — '+strong.name+' ('+S.pcts[strong.id]+'/100).',
    'Have your '+weak.name+' story ready — that’s where they’ll push.',
    'One real, specific moment beats an impressive vague one, every time.' ].forEach(r=>{
    x.fillStyle=LT.gold;x.fillText('•',M,y);x.fillStyle=LT.body;
    const ls=wrapText(x,r,R-M-16);ls.forEach((l,i)=>{x.fillText(l,M+16,y);if(i<ls.length-1)y+=18;});y+=22;});
  y+=18;x.textAlign='center';x.fillStyle=LT.mut;x.font="11px 'Outfit',Arial,sans-serif";
  x.fillText('humanometer.com · '+new Date().toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'}),W/2,y);
  return c;
}

async function renderResultsCanvas(scale){
  await fontsReady();scale=scale||1;const W=1000,H=1380,M=64,R=W-M;const {c,x}=newLightCanvas(W,H,scale);
  const sorted=[...TRAITS].sort((a,b)=>S.pcts[b.id]-S.pcts[a.id]);
  let y=84;
  x.textAlign='center';
  setSpacing(x,'3px');x.fillStyle=LT.gold;x.font="600 13px 'Outfit',Arial,sans-serif";x.fillText('HUMANOMETER · FULL READING · 2026',W/2,y);setSpacing(x,'0px');y+=44;
  x.fillStyle=LT.txt;x.font="700 40px 'Cormorant Garamond',Georgia,serif";x.fillText(S.uname||'Your Reading',W/2,y);y+=30;
  x.fillStyle=LT.gold;x.font="700 18px 'Cormorant Garamond',Georgia,serif";x.fillText(S.arch.name+' — '+S.arch.tag,W/2,y);y+=40;
  x.fillStyle=LT.txt;x.font="600 20px 'Outfit',Arial,sans-serif";x.fillText(S.overall+' / 100',W/2,y);y+=30;
  x.strokeStyle=LT.bord;x.lineWidth=1;x.beginPath();x.moveTo(M,y);x.lineTo(R,y);x.stroke();y+=36;
  x.textAlign='left';
  sorted.forEach(t=>{const v=S.pcts[t.id],band=getBand(t.id,v);
    x.fillStyle=LT.txt;x.font="600 16px 'Outfit',Arial,sans-serif";x.fillText(t.name,M,y);
    x.fillStyle=t.color;x.font="700 24px 'Cormorant Garamond',Georgia,serif";x.textAlign='right';x.fillText(String(v),R,y+2);x.textAlign='left';y+=14;
    x.fillStyle='#eee6d5';roundRectPath(x,M,y,R-M,7,3.5);x.fill();
    x.fillStyle=t.color;roundRectPath(x,M,y,(R-M)*v/100,7,3.5);x.fill();y+=24;
    setSpacing(x,'.5px');x.fillStyle=LT.gold;x.font="600 11px 'Outfit',Arial,sans-serif";x.fillText(band.band.toUpperCase(),M,y);setSpacing(x,'0px');y+=19;
    x.fillStyle='#4a453b';x.font="13px 'Outfit',Arial,sans-serif";
    wrapText(x,band.insight,R-M).forEach(l=>{x.fillText(l,M,y);y+=18;});y+=24;});
  y+=6;x.textAlign='center';x.fillStyle=LT.mut;x.font="11px 'Outfit',Arial,sans-serif";
  x.fillText('Generated from your 15 answers at humanometer.com · '+new Date().toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'}),W/2,y);
  return c;
}

async function downloadCertPdf(){ if(!S.arch)return; savePdfBlob(await canvasToPdfBlob(await renderCertLightCanvas(2)),packFileBase()+'-certificate.pdf',()=>showToast('Saved your certificate as a PDF.')); }
async function downloadCheatPdf(){ if(!S.arch)return; savePdfBlob(await canvasToPdfBlob(await renderCheatCanvas(2)),packFileBase()+'-cheat-sheet.pdf',()=>showToast('Saved your cheat sheet as a PDF.')); }
async function downloadResultsPdf(){ if(!S.arch)return; savePdfBlob(await canvasToPdfBlob(await renderResultsCanvas(2)),packFileBase()+'-full-results.pdf',()=>showToast('Saved your full results as a PDF.')); }

/* ═══════════════════════════ DELIVERABLES ═══════════════════════════ */
/* Render all panels, but only show tabs/panels for what the purchased tier includes.
   Activates the first allowed tab so the user lands on something visible. */
function buildDeliverables(){
  // LinkedIn (Markdown coaching — themes to emphasize, not a paste-ready draft)
  if(S.liText) document.getElementById('li-text').innerHTML=mdLite(S.liText);
  // Coaching assets (Markdown → mdLite; .out-text preserves the newlines)
  const g=S.gen||{};
  ['edge','traps','stories','guide'].forEach(k=>{
    const el=document.getElementById(k+'-text');
    if(el && g[k]) el.innerHTML=renderAssetHtml(k,g[k]);
  });
  // Full results sheet + fillable cheat sheet (both printable, client-rendered)
  buildFullResults();
  buildCheatSheet();
  // Role-tailored brief (pro): show a saved/generated brief, else the paste box.
  if(S.gen && S.gen.role) showRoleOutput(); else showRoleInput();
  // Certificate
  document.getElementById('cert-name').textContent=S.uname||'Your Name';
  document.getElementById('cert-arch').textContent=S.arch.name+' — '+S.arch.tag;
  document.getElementById('cert-date').textContent=new Date().toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'});
  const cs=document.getElementById('cert-scores');cs.innerHTML='';
  TRAITS.forEach(t=>{const el=document.createElement('div');el.className='cscore';el.innerHTML=`<div class="cscore-v" style="color:${t.color}">${S.pcts[t.id]}</div><div class="cscore-l">${t.name.split(' ')[0]}</div>`;cs.appendChild(el);});
  // Share card on deliverables page
  document.getElementById('dsc-n').textContent=S.overall;
  document.getElementById('dsc-arch').textContent=S.arch.name;
  const dt=document.getElementById('dsc-traits');dt.innerHTML='';
  TRAITS.forEach(t=>{const s=document.createElement('span');s.className='sc-t';s.textContent=`${t.name.split(' ')[0]} ${S.pcts[t.id]}`;dt.appendChild(s);});
  // Permalink accordion (deliverables) — reflects whether a link exists yet.
  renderPermalinkBlock();

  // Email-a-copy card — prefill the buyer's address; status is filled in once
  // deliverPackAuto()/sendPackByEmail() runs (or on re-access, where it's done).
  const de=document.getElementById('de-input');
  if(de&&S.savedEmail&&!de.value)de.value=S.savedEmail;
  const dstat=document.getElementById('de-status');
  if(dstat&&!dstat.textContent.trim())dstat.textContent=S.savedEmail?'Sending a copy to '+S.savedEmail+'…':'Enter your email and we’ll send the full pack.';

  // Honest banner if anything failed to generate (see renderGenAlert).
  renderGenAlert();

  // Tier-aware tab visibility
  const allowed = new Set((PACKS[S.selectedPack]||PACKS.career).tabs);
  ['edge','traps','stories','guide','cheat','role','linkedin','results','cert','share'].forEach(id=>{
    const t=document.getElementById('dtab-'+id);
    const p=document.getElementById('dp-'+id);
    const ok=allowed.has(id);
    if(t)t.style.display=ok?'':'none';
    if(p){p.style.display='';p.classList.remove('act');}
  });
  // Activate the first allowed tab
  const first=[...allowed][0]||'linkedin';
  const ft=document.getElementById('dtab-'+first); const fp=document.getElementById('dp-'+first);
  document.querySelectorAll('.dtab').forEach(t=>t.classList.remove('act'));
  if(ft)ft.classList.add('act'); if(fp)fp.classList.add('act');
}
function tab(id,btn){document.querySelectorAll('.dpanel').forEach(p=>p.classList.remove('act'));document.querySelectorAll('.dtab').forEach(t=>t.classList.remove('act'));document.getElementById('dp-'+id).classList.add('act');btn.classList.add('act');}

/* If any asset failed to generate, say so plainly rather than leaving the buyer
   to discover placeholder text tab by tab. They've paid — they get a one-tap
   retry and a real address to write to. Silent partial failure is the worst
   outcome here, so this is deliberately prominent. */
function renderGenAlert(){
  const el=document.getElementById('gen-alert');
  if(!el)return;
  const failed=genFailedKinds();
  if(!failed.length){ el.style.display='none'; el.innerHTML=''; return; }
  const names=failed.map(k=>PACK_LABELS[k]||k);
  const list=names.length===1?names[0]:names.slice(0,-1).join(', ')+' and '+names[names.length-1];
  const noun=names.length===1?'asset':'assets';
  el.style.display='';
  el.innerHTML=
    `<div class="ga-head"><span class="ga-ico" aria-hidden="true">⚠️</span><strong>${escapeHtml(list)}</strong> didn’t generate.</div>`+
    `<p class="ga-body">Your purchase is safe and nothing has been lost — this is on our side, not yours. Retry below, and if the ${noun} still won’t build, email <a href="mailto:hello@humanometer.com">hello@humanometer.com</a> and we’ll sort it out or refund you.</p>`+
    `<button class="ga-btn" type="button" onclick="retryFailedAssets(this)">↺ Retry ${names.length>1?'them':'it'}</button>`;
}

/* Retry every failed asset, then re-render and re-store the pack. Deliberately
   store-only: the buyer presses Send if they want a corrected email copy, so a
   retry can't spam their inbox. */
async function retryFailedAssets(btn){
  const failed=genFailedKinds();
  if(!failed.length)return;
  const orig=btn?btn.textContent:'';
  if(btn){btn.disabled=true;btn.textContent='Retrying…';}
  for(const k of failed){
    if(k==='linkedin') await genLinkedIn(); else await genAsset(k);
  }
  buildDeliverables();
  const still=genFailedKinds();
  if(btn){btn.disabled=false;btn.textContent=orig;}
  if(still.length){
    showToast('Still not generating. Email hello@humanometer.com and we’ll fix it or refund you.',6000);
  }else{
    showToast('All your assets are ready.');
    deliverPack(S.savedEmail,{storeOnly:true});
    const st=document.getElementById('de-status');
    if(st&&S.emailedOnce){st.textContent='Assets rebuilt — press Send to email yourself the corrected pack.';st.className='de-status';}
  }
}

/* Minimal markdown for AI text: **bold** → <strong>. Newlines are preserved by
   .out-text's white-space:pre-wrap, so we don't convert them here. Escapes
   first so model output can never inject markup. */
function mdLite(s){return escapeHtml(s||'').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');}

/* Build the printable full-reading sheet from the computed profile. */
function buildFullResults(){
  const el=document.getElementById('full-results-sheet');
  if(!el||!S.arch)return;
  const sorted=[...TRAITS].sort((a,b)=>S.pcts[b.id]-S.pcts[a.id]);
  const rows=sorted.map(t=>{
    const v=S.pcts[t.id];const band=getBand(t.id,v);
    return `<div class="fr-dim">
      <div class="fr-dim-top"><span class="fr-dim-name">${t.name}</span><span class="fr-dim-score" style="color:${t.color}">${v}</span></div>
      <div class="fr-bar"><div class="fr-bar-fill" style="width:${v}%;background:${t.color}"></div></div>
      <div class="fr-band">${escapeHtml(band.band)}</div>
      <div class="fr-insight">${escapeHtml(band.insight)}</div>
    </div>`;
  }).join('');
  el.innerHTML=`
    <div class="fr-head">
      <div class="fr-brand">Humanometer · Full Reading · 2026</div>
      <div class="fr-name">${escapeHtml(S.uname||'Your Reading')}</div>
      <div class="fr-arch">${escapeHtml(S.arch.name)} — ${escapeHtml(S.arch.tag)}</div>
      <div class="fr-overall"><span class="fr-overall-n">${S.overall}</span><span class="fr-overall-d">/100</span></div>
    </div>
    <div class="fr-dims">${rows}</div>
    <div class="fr-foot">Generated from your 15 answers at humanometer.com · ${new Date().toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'})}</div>`;
}

/* Build the fillable, printable Interview Cheat Sheet. Client-rendered (no AI):
   scores drive which dimension to flag; everything else is a worksheet the user
   fills in by hand after printing. It operationalises the coaching — the guide
   teaches, this is the one page they take into their prep. */
function buildCheatSheet(){
  const el=document.getElementById('cheat-sheet');
  if(!el||!S.arch)return;
  const sorted=[...TRAITS].sort((a,b)=>S.pcts[b.id]-S.pcts[a.id]);
  const strong=sorted[0], weak=sorted[sorted.length-1];
  const esc=escapeHtml;
  const line='<span class="cs-line"></span>';
  const chips=TRAITS.map(t=>{
    const isS=t.id===strong.id, isW=t.id===weak.id;
    const cls='cs-chip'+(isS?' strong':(isW?' weak':''));
    const flag=isS?' ★':(isW?' ⚠':'');
    return `<div class="${cls}"><span class="cs-chip-v" style="color:${t.color}">${S.pcts[t.id]}</span><span class="cs-chip-l">${esc(t.name.split(' ')[0])}${flag}</span></div>`;
  }).join('');
  const story=(n,hint)=>`<div class="cs-story">
      <div class="cs-story-hd"><span class="cs-num">${n}</span><span class="cs-line cs-title"></span></div>
      ${hint?`<div class="cs-hint">${esc(hint)}</div>`:''}
      <div class="cs-star">
        <div><b>S</b>${line}</div><div><b>T</b>${line}</div>
        <div><b>A</b>${line}</div><div><b>R</b>${line}</div>
      </div>
    </div>`;
  const freeze=(q)=>`<div class="cs-fq"><div class="cs-fq-q">${esc(q)}</div><div class="cs-fq-a">Your angle: ${line}</div></div>`;
  el.innerHTML=`
    <div class="cheat-head">
      <div class="cheat-brand">Humanometer · Interview Cheat Sheet · 2026</div>
      <div class="cheat-name">${esc(S.uname||'Your Interview Prep')}</div>
      <div class="cheat-arch">${esc(S.arch.name)} — ${esc(S.arch.tag)}</div>
    </div>
    <div class="cheat-scores">${chips}</div>
    <div class="cheat-note">Interviewers are trained to probe your lowest dimension — <strong>${esc(weak.name)}</strong>. Prepare that story <strong>first</strong>. Lead with your <strong>${esc(strong.name)}</strong>.</div>

    <section class="cheat-sec">
      <h3>Your STAR stories <span>— 3–4 real ones you can tell cold</span></h3>
      ${story(1, 'Make this the one that shows your '+weak.name+' — prepare it first.')}
      ${story(2)}
      ${story(3)}
      ${story(4)}
    </section>

    <section class="cheat-sec cs-inline">
      <h3>STAR in one line</h3>
      <p><strong>S</strong>ituation → <strong>T</strong>ask → <strong>A</strong>ction → <strong>R</strong>esult. One sentence each; spend most of your words on Action and Result.</p>
    </section>

    <section class="cheat-sec">
      <h3>Freeze questions <span>— decide your angle before the room</span></h3>
      ${freeze('“What’s your greatest weakness?”')}
      ${freeze('“Why are you leaving your current job?” (or why you left your last one)')}
      ${freeze('“Tell me about a time you failed.”')}
    </section>

    <section class="cheat-sec">
      <h3>3 questions to ask them</h3>
      <div class="cs-ask">${line}${line}${line}</div>
    </section>

    <section class="cheat-sec cs-inline">
      <h3>Before you walk in</h3>
      <ul class="cs-rem">
        <li>Lead with your strongest dimension — <strong>${esc(strong.name)}</strong> (${S.pcts[strong.id]}/100).</li>
        <li>Have your <strong>${esc(weak.name)}</strong> story ready — that’s where they’ll push.</li>
        <li>One real, specific moment beats an impressive vague one, every time.</li>
      </ul>
    </section>

    <div class="cheat-foot">humanometer.com · ${new Date().toLocaleDateString('en-US',{day:'numeric',month:'long',year:'numeric'})}</div>`;
}

/* Guide renderer: like mdLite, but turns dash bullets into checklist rows so the
   Interview Prep Guide reads as tick-off sections. Guide-only — other assets keep
   plain mdLite. Escapes first, so model output can never inject markup. */
function mdGuide(s){
  return escapeHtml(s||'')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/(^|\n)[-•]\s+/g,'$1<span class="chk">☐</span> ');
}
function renderAssetHtml(kind,text){return (kind==='guide'||kind==='role'?mdGuide:mdLite)(text);}

/* ═══════════════════════════ ROLE-TAILORED BRIEF (Interview Coach) ═══════════════════════════ */
/* The one asset that takes user input: paste a job description, get prep tuned to
   that role. Reusable — generate a fresh brief for every application. Company
   facts stay a research checklist (the server prompt never asserts them). */
async function genRole(){
  const ta=document.getElementById('role-jd');
  const btn=document.getElementById('role-gen-btn');
  if(!ta)return;
  const jd=(ta.value||'').trim();
  if(jd.length<40){
    ta.focus();ta.style.borderColor='var(--bad,#e05c5c)';
    setTimeout(()=>{ta.style.borderColor='';},1600);
    showToast('Paste the full job description first.');
    return;
  }
  const orig=btn?btn.textContent:'';
  if(btn){btn.disabled=true;btn.textContent='Building your brief…';}
  try{
    S.gen=S.gen||{};
    S.gen.role=await fulfil('role',{jd});
    showRoleOutput();
    // Refresh the stored pack (now including the brief) for re-access — no re-email.
    deliverPack(S.savedEmail,{storeOnly:true});
    showToast('Your role brief is ready.');
    // The auto-email at purchase didn't include this brief. If they've had an
    // email, nudge them to re-send so their inbox copy stays complete.
    if(S.emailedOnce){
      const st=document.getElementById('de-status');
      if(st){st.textContent='📎 Role brief added — press Send to email yourself the updated pack.';st.className='de-status';}
    }
  }catch(e){
    showToast((e&&e.message)||'Could not generate the brief. Please try again.');
  }
  if(btn){btn.disabled=false;btn.textContent=orig;}
}
/* Toggle the role panel between the paste box and the generated brief. */
function showRoleOutput(){
  const el=document.getElementById('role-text');
  if(el)el.innerHTML=renderAssetHtml('role',(S.gen&&S.gen.role)||'');
  const inp=document.getElementById('role-input');if(inp)inp.style.display='none';
  const box=document.getElementById('role-out-box');if(box)box.style.display='';
  const acts=document.getElementById('role-acts');if(acts)acts.style.display='';
}
function showRoleInput(){
  const inp=document.getElementById('role-input');if(inp)inp.style.display='';
  const box=document.getElementById('role-out-box');if(box)box.style.display='none';
  const acts=document.getElementById('role-acts');if(acts)acts.style.display='none';
}
/* "New role" — clear the box so they can tailor a brief to a different job. */
function newRole(){
  const ta=document.getElementById('role-jd');if(ta)ta.value='';
  showRoleInput();
  const ta2=document.getElementById('role-jd');if(ta2)ta2.focus();
}


/* ═══════════════════════════ SHARE ═══════════════════════════ */
function getShareText(platform='linkedin'){
  const sorted=[...TRAITS].sort((a,b)=>S.pcts[b.id]-S.pcts[a.id]);
  const top2=sorted.slice(0,2);
  const peakLines=top2.map(t=>`${t.name} ${S.pcts[t.id]}`).join(' · ');

  const link=currentPermalink()||'https://humanometer.com';

  if(platform==='linkedin'){
    return `I just measured the five professional capabilities AI can't replicate — on the Humanometer.

My profile: ${S.arch.name} · ${S.overall}/100
Strongest: ${top2.map(t=>`${t.name} ${S.pcts[t.id]}`).join(' · ')}

It's a scored, five-dimension reading grounded in WEF and LinkedIn research on the human skills rising in value as AI spreads.

My full reading: ${link}
Take yours (free, 5 min): https://humanometer.com

What's your profile?`;
  }

  if(platform==='x'){
    return `I'm "${S.arch.name}" on the Humanometer — ${S.overall}/100.
Top strengths: ${peakLines}

The five professional capabilities AI can't replicate, scored in 5 minutes.
My reading → ${link}
Take yours (free): https://humanometer.com`;
  }

  if(platform==='whatsapp'){
    return `Just took the Humanometer — the five professional skills AI can't replicate, scored in 5 minutes.

I'm "${S.arch.name}" — ${S.overall}/100. Strongest: ${peakLines}

My reading: ${link}
Try it: https://humanometer.com`;
  }

  if(platform==='facebook'){
    return `I just took the Humanometer — a free 5-minute reading of the five professional capabilities AI can't replicate.

I'm "${S.arch.name}" · ${S.overall}/100. Strongest: ${peakLines}

A scored, five-dimension breakdown grounded in research on the skills rising in value as AI spreads.

My full reading: ${link}
Take yours (free, 5 min): https://humanometer.com`;
  }

  // clipboard / generic
  return `My Humanometer reading — the five professional capabilities AI can't replicate.

Profile: ${S.arch.name} · ${S.overall}/100
Strongest: ${top2.map(t=>`${t.name} ${S.pcts[t.id]}`).join(' · ')}

Full reading: ${link}
Take yours (free, 5 min): https://humanometer.com`;
}

/* LinkedIn share is intentionally two-step:
   1) Copy our crafted post text to the clipboard
   2) Open LinkedIn's modern share-offsite URL (the old shareArticle endpoint
      was deprecated and randomly substitutes other sites' OG meta — that's
      what was producing the "Seismometer" preview)
   The URL preview will use humanometer.com's OG image/title/description.
   The user pastes the prepared text into the post composer. */
function shareLinkedIn(){
  S.sharedOnce=true;
  const sticky=document.getElementById('sticky-share');if(sticky)sticky.classList.remove('show');
  const txt=getShareText('linkedin');
  // Open LinkedIn's share dialog for the permalink (the preview pulls our OG
  // image + title) and copy the crafted post text so the user can paste it.
  // We deliberately do NOT use navigator.share: on desktop Windows it opens the
  // generic OS share sheet instead of LinkedIn.
  const openShare = () => window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentPermalink()||'https://humanometer.com')}`,
    '_blank','noopener,width=620,height=600'
  );
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(()=>{
      showToast('Your post text is copied — paste it into your LinkedIn post.');
      openShare();
    },()=>openShare());
  } else { openShare(); }
}
function shareX(){
  S.sharedOnce=true;
  const txt=getShareText('x');
  // X's intent/tweet endpoint still accepts pre-filled text reliably; URL preview pulls OG meta.
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}`,'_blank','noopener,width=600,height=480');
}
/* Facebook's sharer takes only a URL (it builds the preview from our OG meta),
   so we open the sharer for the permalink and copy the crafted post text for the
   user to paste. Same direct approach as X/LinkedIn — no navigator.share, which
   on desktop Windows opens the generic OS share sheet instead of Facebook. */
function shareFacebook(){
  S.sharedOnce=true;
  const sticky=document.getElementById('sticky-share');if(sticky)sticky.classList.remove('show');
  const txt=getShareText('facebook');
  const openShare = () => window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPermalink()||'https://humanometer.com')}`,
    '_blank','noopener,width=620,height=620'
  );
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(()=>{
      showToast('Your post text is copied — paste it into your Facebook post.');
      openShare();
    },()=>openShare());
  } else { openShare(); }
}
/* Pass `this` from text buttons for inline feedback; the sticky bar's icon-only
   button calls it with no argument and gets a toast instead, so we never replace
   an icon with a word. */
function copyShare(btn){
  S.sharedOnce=true;
  copyToClipboard(getShareText('clipboard'),btn);
}

/* Front-page share — spreads the SITE, not a personal reading, so it just opens
   the platform's share dialog for humanometer.com and lets the OG tags supply the
   preview. Separate from shareLinkedIn/shareX/shareFacebook, which share the
   user's own reading via their permalink. */
function shareSite(platform){
  const url='https://humanometer.com';
  const text="The Humanometer — a free 5-minute reading of the five professional capabilities AI can't replace.";
  let shareUrl;
  if(platform==='linkedin') shareUrl='https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(url);
  else if(platform==='x') shareUrl='https://twitter.com/intent/tweet?text='+encodeURIComponent(text)+'&url='+encodeURIComponent(url);
  else if(platform==='facebook') shareUrl='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url);
  else return;
  window.open(shareUrl,'_blank','noopener,width=620,height=600');
}

/* Small bottom-right toast for transient confirmations. */
function showToast(msg, ms=3200){
  let t=document.getElementById('hm-toast');
  if(!t){
    t=document.createElement('div');
    t.id='hm-toast';t.className='hm-toast';
    document.body.appendChild(t);
  }
  t.textContent=msg;
  t.classList.add('show');
  clearTimeout(t._tm);
  t._tm=setTimeout(()=>t.classList.remove('show'),ms);
}
/* One clipboard path for every copy button.
   Two things this fixes: (1) the button is passed in explicitly — the old code
   read the global `event` inside the clipboard promise callback, and `event` is
   already null by the time that resolves, so the "✓ Copied" feedback never fired
   and threw an unhandled rejection; (2) a rejected write (permission denied,
   non-secure context, unfocused document) now falls back to execCommand and, if
   that fails too, says so instead of silently doing nothing. */
function legacyCopy(text){
  try{
    const ta=document.createElement('textarea');
    ta.value=text; ta.setAttribute('readonly','');
    ta.style.cssText='position:fixed;top:-1000px;left:0;opacity:0;';
    document.body.appendChild(ta);
    ta.select(); ta.setSelectionRange(0,ta.value.length);
    const ok=document.execCommand('copy');
    ta.remove();
    return ok;
  }catch(e){ return false; }
}
function copyToClipboard(text,btn,okLabel){
  const label=okLabel||'✓ Copied';
  const flash=(msg,isError)=>{
    if(!btn){ showToast(isError?'Couldn’t copy — select the text and press Ctrl+C.':'Copied to your clipboard.'); return; }
    const orig=btn.innerHTML;
    btn.innerHTML=msg;
    setTimeout(()=>{btn.innerHTML=orig;},1800);
  };
  if(!String(text||'').trim()){ flash('Nothing to copy',true); return; }
  const done=ok=>flash(ok?label:'Copy failed',!ok);
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>done(true),()=>done(legacyCopy(text)));
  }else{
    done(legacyCopy(text));
  }
}
function copyLI(btn){copyToClipboard(S.liText,btn);}
function copyAsset(kind,btn){copyToClipboard((S.gen&&S.gen[kind])||'',btn);}
function copyCert(btn){copyToClipboard(`Humanometer Certificate — ${S.uname}\n${S.arch.name}\n${TRAITS.map(t=>t.name+': '+S.pcts[t.id]).join('\n')}\nOverall: ${S.overall}/100\nVerified by humanometer.com`,btn);}

/* Everything tied to a previous attempt or purchase. Shared by retake() and
   actuallyStartQuiz() so a fresh run can never inherit an earlier reading's
   name, email, or paid session — hand the laptop to a colleague and their
   result was being pre-filled with the previous person's identity. */
function resetForFreshAttempt(){
  try{ sessionStorage.removeItem('hm_state'); }catch(e){}
  S.sessionId=null;S.selectedPack=null;S.purchased=false;S.delivered=false;S.emailedOnce=false;
  S.gen={};S.genFailed={};S.liText='';
  S.uname='';S.savedEmail='';
}
function retake(){
  clearSession();
  resetForFreshAttempt();
  // Scrub the query string. Arriving from a re-access link leaves
  // ?paid=true&session_id=… in the address bar, and retake() used to leave it
  // there. That URL is a bearer token for the buyer's paid pack — it must not
  // survive into a fresh attempt where it could be copied out of the address
  // bar by someone sharing "the test" — and reloading with it still present
  // sent the app back into fulfillment, regenerating the whole pack.
  if(window.location.search||window.location.hash){
    try{ history.replaceState({},'',window.location.pathname); }catch(e){}
  }
  show('landing');
}
/* The dimension this profile leads with. Used wherever the overall score is
   presented, in place of any verdict on the total.

   History: this slot used to hold getPercentile(), a hardcoded lookup rendered
   as "Top X% of respondents" with no respondent distribution behind it — and
   skewed, since answering at random averages 65/100, which it called "Top 20%".
   That was replaced with an Exceptional/Strong/Solid/Developing/Emerging band,
   but a band is still a verdict, and it contradicted the archetypes: those are
   assigned from the same overall score and every one of them is written to be
   flattering, so labelling someone "Emerging" directly under "The Connector —
   you see the human picture others miss" undid that on purpose.
   Ranking is also the wrong axis for this product. It measures capability
   against what AI can't replicate, which is not zero-sum: a percentile forces
   half the users below the middle to answer a question nobody asked. So the
   overall score is now stated plainly and interpreted by the archetype, and
   this is what accompanies it — a fact about them, not a placement.

   Ties are not an edge case here: a dimension is three questions scored out of
   four, so it has only thirteen possible values, and ~23% of profiles have two
   or more dimensions level at the top. Picking the first of them would hand the
   lead to Adaptive Thinking on declaration order alone, so we return the whole
   tied set and let the caller phrase it. */
function leadTraits(){
  const max=Math.max(...TRAITS.map(t=>S.pcts[t.id]||0));
  return TRAITS.filter(t=>(S.pcts[t.id]||0)===max);
}
/* → { names, label, balanced }. Three or more dimensions level at the top means
   nothing distinguishes the profile, so we say that rather than list them. */
function leadSummary(){
  const leads=leadTraits();
  const names=leads.map(t=>t.name);
  const balanced=leads.length>=3;
  return { names, balanced, label: balanced ? 'Evenly balanced' : names.join(' and ') };
}


/* Single source of truth for tier definitions — used by buyPack, runFulfillment,
   buildDeliverables. Keep aligned with PRODUCTS in src/worker.js. */
const PACKS = {
  boost:  { name:'Edge Report',     price:6.99,
            includes:['Your Edge — how your dimensions combine','Know Your Traps — your interview blind spots',"LinkedIn 'About' themes to emphasize",'Verified certificate','Permanent results page'],
            tabs:['edge','traps','linkedin','cert','share'] },
  career: { name:'Interview Kit',   price:14.99,
            includes:['Everything in Edge Report','Stories to Dig Up — find your own best examples','The Interview Prep Guide','Fillable interview cheat sheet','Full results PDF'],
            tabs:['edge','traps','stories','guide','cheat','linkedin','results','cert','share'] },
  pro:    { name:'Interview Coach',  price:19.99,
            includes:['Everything in Interview Kit','Role-tailored brief — prep for the specific job you paste in','Reusable for every role you apply to'],
            tabs:['edge','traps','stories','guide','cheat','role','linkedin','results','cert','share'] }
};

function buyPack(type){
  const pack=PACKS[type]; if(!pack)return;
  S.selectedPack=type;
  document.getElementById('mpay-lbl').textContent=`Pay $${pack.price.toFixed(2)} · Instant Access`;
  const rows = pack.includes.map(i=>`<div class="orow"><span>${i}</span><span>included</span></div>`).join('')
    + `<div class="orow"><span>Total</span><span>$${pack.price.toFixed(2)}</span></div>`;
  document.getElementById('morder').innerHTML=rows;
  document.getElementById('pf-step').style.display='block';
  document.getElementById('proc-step').classList.remove('show');
  if(S.savedEmail){const pe=document.getElementById('pe');if(pe)pe.value=S.savedEmail;}
  // Pre-fill the certificate name from the permalink name (S.uname),
  // so users who already entered it don't have to type it twice.
  if(S.uname){const pn=document.getElementById('pn');if(pn)pn.value=S.uname;}
  openModal();
}


/* Copy the user's permalink to the clipboard with inline button feedback. */
function copyPermalink(btn){
  const root=btn&&btn.closest?btn.closest('.permalink-block'):null;
  const el=(root&&root.querySelector('.js-perm-url'))||document.querySelector('.js-perm-url');
  const url=(el && el.dataset.fullUrl) || el?.textContent || '';
  if(!url)return;
  const finish=()=>{
    if(!btn)return;
    const orig=btn.innerHTML;
    btn.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg><span>Copied!</span>';
    btn.classList.add('copied');
    setTimeout(()=>{btn.innerHTML=orig;btn.classList.remove('copied');},2200);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(finish,()=>finish());
  } else { finish(); }
}

/* Minimal HTML escape for any user-supplied string rendered as HTML. */
function escapeHtml(s){
  return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

/* Show either the "enter your name" step or the "link generated" step,
   based on whether S.uname is set. Also pre-fills the input on retry. */
// Sync every permalink block on the page (there are two: one on the results
// screen, one in the deliverables accordion). Works off classes, not ids, so
// the same logic drives both — either the "enter your name" step or the
// "link generated" step, based on whether S.uname is set.
function renderPermalinkBlock(){
  document.querySelectorAll('.permalink-block').forEach(root=>{
    const stepName=root.querySelector('.js-perm-name');
    const stepLink=root.querySelector('.js-perm-link');
    if(!stepName||!stepLink)return;
    if(S.uname){
      stepName.style.display='none';
      stepLink.style.display='';
      const nameDisplay=root.querySelector('.js-perm-namedisplay');
      if(nameDisplay)nameDisplay.textContent=S.uname;
      const urlEl=root.querySelector('.js-perm-url');
      if(urlEl){
        const link=currentPermalink();
        urlEl.textContent=link?link.replace(/^https?:\/\//,''):'—';
        urlEl.dataset.fullUrl=link||'';
      }
    } else {
      stepName.style.display='';
      stepLink.style.display='none';
      const input=root.querySelector('.js-perm-input');
      if(input)input.value='';
    }
  });
}

function generatePermalink(el){
  const root=el&&el.closest?el.closest('.permalink-block'):null;
  const input=(root&&root.querySelector('.js-perm-input'))||document.querySelector('.js-perm-input');
  if(!input)return;
  const name=sanitizeName(input.value);
  if(!name){
    input.focus();
    input.style.borderColor='var(--bad,#e05c5c)';
    setTimeout(()=>{input.style.borderColor='';},1500);
    return;
  }
  S.uname=name;
  saveSession(); // persist so reload restores name too
  renderPermalinkBlock(); // fills the URL in every block
}

function editPermalinkName(){
  S.uname='';
  saveSession();
  renderPermalinkBlock();
}

/* Send the permalink to the user's chosen email provider.
   - 'gmail'   → opens Gmail compose in a new tab (works when signed in)
   - 'outlook' → opens Outlook web compose (consumer or 365, signed in)
   - 'default' → mailto:, opens whatever the OS has registered
   No data leaves the browser. Subject + body are pre-filled. */
function sendPermalinkVia(provider){
  const link=currentPermalink();
  if(!link)return;
  const subject='My Humanometer reading';
  const body =
    `Here's the permanent link to my Humanometer reading:\n\n` +
    `${link}\n\n` +
    `Humanometer measures the five professional capabilities AI can't replicate.\n` +
    `Take your own reading (free, 5 min): https://humanometer.com`;
  const e=encodeURIComponent;
  let url;
  if(provider==='gmail'){
    url=`https://mail.google.com/mail/?view=cm&fs=1&su=${e(subject)}&body=${e(body)}`;
  } else if(provider==='outlook'){
    url=`https://outlook.live.com/mail/0/deeplink/compose?subject=${e(subject)}&body=${e(body)}`;
  } else {
    url=`mailto:?subject=${e(subject)}&body=${e(body)}`;
  }
  window.open(url,'_blank','noopener');
}

/* GDPR-compliant opt-in submission. Requires consent checkbox. Sends to
   /api/optin which stores in Cloudflare KV. No third-party service. */
async function submitOptin(ev){
  if(ev)ev.preventDefault();
  const emailInp=document.getElementById('optin-email');
  const consentCb=document.getElementById('optin-consent');
  const msg=document.getElementById('optin-msg');
  const btn=document.getElementById('optin-submit');
  if(!emailInp||!consentCb||!msg||!btn)return false;
  const email=emailInp.value.trim();
  if(!email||!email.includes('@')){
    msg.className='optin-msg err';msg.textContent='Please enter a valid email address.';
    return false;
  }
  if(!consentCb.checked){
    msg.className='optin-msg err';msg.textContent='Please tick the consent box to subscribe.';
    return false;
  }
  btn.disabled=true;const origBtn=btn.textContent;btn.textContent='Subscribing…';
  msg.className='';msg.textContent='';
  try{
    const r=await fetch('/api/optin',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email,
        name:S.uname||'',
        consent:true,
        source:S.isShared?'shared-view':'results-page'
      })
    });
    const d=await r.json();
    if(r.ok && d.success){
      msg.className='optin-msg ok';
      msg.innerHTML=`✓ Thanks — you're on the list. <a href="/unsubscribe.html?email=${encodeURIComponent(email)}">Change your mind?</a>`;
      document.getElementById('optin-form').style.display='none';
    } else {
      msg.className='optin-msg err';
      msg.textContent=d.error||'Something went wrong. Please try again.';
      btn.disabled=false;btn.textContent=origBtn;
    }
  } catch(err){
    msg.className='optin-msg err';
    msg.textContent='Connection error. Please try again.';
    btn.disabled=false;btn.textContent=origBtn;
  }
  return false;
}
