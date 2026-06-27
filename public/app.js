/* ═══════════════════════════ DATA ═══════════════════════════ */
const TRAITS=[
  {id:'adaptive',name:'Adaptive Thinking', color:'#5b9ae0'},
  {id:'ethical', name:'Ethical Judgement',  color:'#d4a843'},
  {id:'creative',name:'Creative Synthesis', color:'#9b72cf'},
  {id:'empathic',name:'Empathic Accuracy',  color:'#4ecdc4'},
  {id:'critical',name:'Critical Scepticism',color:'#e07c5b'}
];

const BANDS={
  adaptive:[
    {min:80,band:'Highly Adaptive',insight:'You treat change as raw material rather than disruption. Where others need a clear playbook, you build one as you go — and quickly enough that others rarely notice the uncertainty you navigated. This is the trait most strongly correlated with performing well in AI-era roles.',what:'<strong>In practice:</strong> you\'re the person others turn to when something breaks or shifts unexpectedly. You\'re most valuable in roles without fixed processes, and least comfortable doing the same thing indefinitely.'},
    {min:60,band:'Adaptable',insight:'You handle change well when you have some foundation to work from. You\'re not thrown by ambiguity, but you work best when you can orient yourself before acting rather than moving immediately into the unknown.',what:'<strong>In practice:</strong> you bring stability to change rather than just enthusiasm for it — often more valuable than pure agility. Someone who keeps a team functional through a transition rather than racing ahead of it.'},
    {min:40,band:'Selectively Adaptive',insight:'You adapt effectively within familiar territory but feel the friction more in genuinely novel situations. Your instinct is to draw on what you know before exploring what you don\'t — usually the right call, but can slow you when the situation is truly new.',what:'<strong>In practice:</strong> when facing a new situation, explicitly map what still applies from what you know before trying to solve what\'s genuinely unknown. That transition step is what gets skipped under pressure.'},
    {min:0, band:'Stability-Oriented',insight:'You prefer established processes and clear expectations. In AI-era workplaces, people who reliably execute within well-defined systems are essential. But you may need to invest in building tolerance for ambiguity as the pace of change increases.',what:'<strong>In practice:</strong> practise making decisions with incomplete information in low-stakes situations. The ability to act without full certainty is increasingly non-optional in most professional contexts.'}
  ],
  ethical:[
    {min:80,band:'Strong Ethical Compass',insight:'You notice ethical dimensions that others walk straight past — and you act on them, not performatively but because not doing so would compromise your sense of who you are. This is exceptionally rare and increasingly valuable as AI handles more decisions at scale.',what:'<strong>In practice:</strong> you\'re most valuable in roles involving policy, governance, client relationships, or any situation where the "technically correct" answer might not be the right one. Organisations deploying AI at scale urgently need your profile.'},
    {min:60,band:'Ethically Grounded',insight:'You have clear personal values and act on them when it matters. You don\'t impose your ethics on others, but you won\'t compromise your own standards to avoid friction. You\'re trustworthy in a specific and valuable way.',what:'<strong>In practice:</strong> people know you\'ll flag a genuine problem rather than paper over it. This is undersold on most CVs — make it visible and specific.'},
    {min:40,band:'Contextually Ethical',insight:'Your ethical judgement varies with context — stronger when the stakes are clear, less consistent in ambiguous situations or when social dynamics are in play. Not unprincipled; human in a way most ethical frameworks underestimate.',what:'<strong>In practice:</strong> the gap tends to show in the middle ground — situations that are uncomfortable but not clearly wrong. A simple personal rule ("what would I be comfortable explaining out loud?") can close this gap.'},
    {min:0, band:'Pragmatically Oriented',insight:'You prioritise outcomes and tend to defer on ethical questions unless they\'re stark. Often this means trusting systems and hierarchies to handle them. In an AI-augmented world, more of these grey-area decisions escalate to humans precisely because they\'re too nuanced for automated systems.',what:'<strong>In practice:</strong> developing a stronger personal ethical framework is increasingly a career skill, not just a moral one. Start with the questions you\'d rather not have to answer in public.'}
  ],
  creative:[
    {min:80,band:'Synthetic Thinker',insight:'You instinctively connect across domains that others compartmentalise. Your ideas aren\'t just creative — they\'re structurally different, because they\'re built from components that don\'t usually appear together. This is one of the hardest capabilities for AI to replicate.',what:'<strong>In practice:</strong> your best work happens at intersections — between disciplines, problems, or audiences. You\'re less effective in roles requiring deep narrow expertise. Seek problems others have declared unsolvable.'},
    {min:60,band:'Creatively Capable',insight:'You generate novel approaches reliably, especially under pressure or when given latitude. You\'re not always the first to reframe a problem, but you\'re usually in the group that produces the most useful ideas once a direction is set.',what:'<strong>In practice:</strong> you work best when creative and analytical phases are separated. Protect idea-generation time from evaluation and you\'ll get consistently stronger output.'},
    {min:40,band:'Structured Creator',insight:'You\'re most creative within a framework — you generate strong ideas when the parameters are clear, but struggle in genuinely open-ended situations. This is more common than the "creative" mythology suggests, and it\'s a highly functional profile for most workplaces.',what:'<strong>In practice:</strong> structured methods like constraint-based thinking significantly increase output. Your ideas are good — the constraint is the generation process, not the quality of thought.'},
    {min:0, band:'Methodical Thinker',insight:'You\'re stronger at developing and executing ideas than generating them from scratch. Most good outcomes require far more execution than invention, and your ability to turn a rough idea into something real is genuinely valuable.',what:'<strong>In practice:</strong> position yourself as the person who makes ideas work rather than the person who has them. That\'s often where the actual value lives.'}
  ],
  empathic:[
    {min:80,band:'Highly Empathic',insight:'You read situations and people with unusual accuracy — not by projecting your own state, but by genuinely modelling theirs. You notice what isn\'t said as much as what is. In any context involving relationships or persuasion, this is your dominant advantage.',what:'<strong>In practice:</strong> be careful not to absorb others\' emotional states in a way that compromises your judgement. Your superpower is reading the room; your risk is feeling responsible for it.'},
    {min:60,band:'Empathically Aware',insight:'You pick up on emotional undercurrents reliably and respond thoughtfully. You\'re not always certain what\'s happening beneath the surface, but you notice when something is — and you act on it rather than ploughing through.',what:'<strong>In practice:</strong> your awareness shows most clearly in 1-to-1 contexts. In groups you may miss individual threads. Make a habit of checking in with quieter people in group settings.'},
    {min:40,band:'Situationally Empathic',insight:'Your empathic response is reliable in clear emotional situations but less consistent in subtle ones. You respond well to obvious signals; you sometimes miss the middle ground — the person who says they\'re fine and isn\'t.',what:'<strong>In practice:</strong> the most valuable empathic skill is curiosity about ambiguous signals rather than certainty about clear ones. Practise asking one more question when something seems slightly off.'},
    {min:0, band:'Analytically Oriented',insight:'You engage with people primarily through ideas and information rather than emotional attunement. This isn\'t coldness — it\'s a different orientation. You tend to be less swayed by emotional pressure and more consistent in your responses.',what:'<strong>In practice:</strong> in roles involving team leadership or client relationships, build explicit prompts to check emotional signals. What you miss isn\'t usually dramatic — it\'s the early warning signs.'}
  ],
  critical:[
    {min:80,band:'Rigorous Thinker',insight:'You are genuinely hard to mislead. You identify the assumption buried in the premise, the statistic that doesn\'t pass the sniff test, the conclusion that doesn\'t follow. In an era when AI produces confident-sounding outputs at scale, this is one of the most practically valuable skills a person can have.',what:'<strong>In practice:</strong> your risk is over-scepticism in contexts requiring trust and momentum. Not every claim needs interrogating. Develop a calibrated sense of when rigour is the priority and when velocity matters more.'},
    {min:60,band:'Critically Capable',insight:'You apply scrutiny when it matters and you usually know when that is. You don\'t accept things uncritically, but you don\'t paralyse things with excessive interrogation either.',what:'<strong>In practice:</strong> your critical thinking is strongest when you have time. Under pressure, you\'re more susceptible to plausible-sounding claims. A set of fast heuristics — quick questions you always ask — can protect against this.'},
    {min:40,band:'Selectively Sceptical',insight:'You apply critical thinking when you\'re already suspicious, but less reliably when presented with confident, well-packaged information. Most misinformation succeeds precisely because it\'s packaged convincingly.',what:'<strong>In practice:</strong> build a habit of asking "what would have to be true for this to be wrong?" for any claim that supports what you already believe. Confirmation bias is the specific vulnerability here.'},
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

const QS=[
  {trait:'adaptive',secs:25,text:"You're two weeks into a new job and the approach you were hired to use turns out not to work in this context. What do you do?",opts:[{t:"Start adapting immediately, using what I can observe about what actually works here",s:4},{t:"Try harder with the original approach — maybe it just needs more time",s:1},{t:"Raise it with my manager and ask for guidance before changing anything",s:2},{t:"Quietly experiment with alternatives while keeping up the original approach outwardly",s:3}]},
  {trait:'adaptive',secs:25,text:"You're given a task with almost no instructions and no obvious right answer. Your first move is to…",opts:[{t:"Define what I think 'done' looks like, state my assumptions out loud, and start",s:4},{t:"Ask for clarification — I don't want to waste effort going in the wrong direction",s:2},{t:"Find something similar I've seen done and use it as a starting template",s:2},{t:"Break it into the smallest possible first step and see what I learn from that",s:3}]},
  {trait:'adaptive',secs:25,text:"Something you've been doing a specific way for a long time turns out to have a significantly better alternative. How do you respond?",opts:[{t:"I switch, and I switch fast — the point was always the outcome, not the method",s:4},{t:"I test both in parallel for a while before committing",s:3},{t:"I'm interested, but I don't change something working without strong evidence",s:2},{t:"Change feels uncomfortable — I tend to stay with what I know unless forced to shift",s:1}]},
  {trait:'ethical',secs:30,text:"You're asked to send a message to customers that is technically accurate but you know creates a misleading impression. What do you do?",opts:[{t:"Push back — explain why it's misleading and propose a version that isn't",s:4},{t:"Send it — my job isn't to second-guess what I'm asked to do",s:1},{t:"Send it but flag my concern to someone above me",s:2},{t:"Rewrite it to be clearer on my own initiative and send that version instead",s:3}]},
  {trait:'ethical',secs:30,text:"You notice a colleague consistently taking credit in group settings for work that's partly or entirely yours. You…",opts:[{t:"Raise it with them directly and privately — I'd rather resolve it than escalate",s:4},{t:"Let it go; making an issue of it creates more problems than it solves",s:1},{t:"Find natural ways to make my contribution visible without directly confronting them",s:3},{t:"Mention it to someone I trust to gauge whether I'm reading the situation right",s:2}]},
  {trait:'ethical',secs:30,text:"You discover something your organisation does — legal, profitable, normal in the industry — causes low-level harm to people outside the transaction. Most people there don't seem to think about it. You…",opts:[{t:"Look for the right channel to raise it — even if nothing changes, I need to flag it",s:4},{t:"It's not my responsibility; the organisation has implicitly decided this is acceptable",s:1},{t:"Sit with it for a while — I want to understand the full picture before doing anything",s:3},{t:"Mention it informally to someone I respect and see how they respond",s:2}]},
  {trait:'creative',secs:25,text:"You're stuck on a problem and none of your usual approaches are working. What do you reach for?",opts:[{t:"How has a completely different field dealt with something structurally similar?",s:4},{t:"Talk it through with someone — articulating it out loud usually breaks something loose",s:3},{t:"Step away and do something unrelated — the answer usually arrives when I stop looking",s:3},{t:"Go back to basics and make sure I'm actually solving the right problem",s:3}]},
  {trait:'creative',secs:25,text:"You need to explain something genuinely complex to someone with no background in it. You instinctively reach for…",opts:[{t:"An analogy from everyday life that captures the essential structure, even if it loses some detail",s:4},{t:"A clear sequence — I build from first principles and don't skip steps",s:2},{t:"A visual — a diagram or sketch usually cuts through faster than words",s:3},{t:"A concrete example of it working in practice — showing is better than telling",s:3}]},
  {trait:'creative',secs:30,text:"Two observations: most communication fails not because of what's said, but because of what the listener was already thinking. And: good architects design for how a space feels when it's empty, not when it's full.\n\nWhat's the most useful connection between those ideas?",opts:[{t:"Both require designing for an internal state rather than an observable behaviour — the real work is invisible",s:4},{t:"Both suggest the 'absent' person or moment is who you're actually designing for",s:4},{t:"Interesting parallel, but I'm not sure the analogy is precise enough to act on",s:2},{t:"Both show that the obvious interpretation of a problem usually isn't the real one",s:3}]},
  {trait:'empathic',secs:25,text:"Someone you're working with says 'no, it's fine' when you ask if everything's okay. You…",opts:[{t:"Take them at their word — pushing further feels intrusive",s:1},{t:"Ask one more specific question that makes it easier to say what's actually going on",s:4},{t:"Let it go for now but check back in the next day or two",s:3},{t:"Tell them my door is open if they want to talk, and leave it there",s:2}]},
  {trait:'empathic',secs:25,text:"You're in a group conversation and someone makes a point that lands in silence. Nobody responds. You notice the person's expression shift slightly. What are you reading?",opts:[{t:"They felt their point wasn't heard — deciding whether to let it drop or try again",s:4},{t:"I don't read much into silence — people are often just thinking",s:1},{t:"There could be many explanations — I'd need more context to say",s:2},{t:"Something's off — I'd probably find a way to bring their point back in",s:3}]},
  {trait:'empathic',secs:30,text:"You're trying to persuade someone of something and you can tell they're becoming defensive, even though they haven't said so. You…",opts:[{t:"Name what I'm observing and shift to understanding their perspective before continuing",s:4},{t:"Stay the course — backing down signals my position wasn't strong",s:1},{t:"Suggest pausing and returning to it later when the temperature has dropped",s:3},{t:"Ease off the pressure without making it explicit — give them space to come around",s:2}]},
  {trait:'critical',secs:25,text:"Someone cites a statistic that perfectly supports an argument you were already inclined to agree with. Your reaction?",opts:[{t:"That makes me more cautious — confirming evidence is exactly when I check most carefully",s:4},{t:"It reinforces my view; I didn't need the evidence but it's good to have",s:1},{t:"I'd want to know the source before putting much weight on it",s:3},{t:"Statistics are easily cherry-picked either way — I don't over-index on any single number",s:2}]},
  {trait:'critical',secs:25,text:"An AI tool produces an analysis that says exactly what you hoped it would say. You…",opts:[{t:"That's when I scrutinise most carefully — flattering outputs are the ones most likely to be wrong",s:4},{t:"Feel relieved and move forward — it's useful confirmation",s:1},{t:"Check the inputs and logic before treating it as reliable",s:4},{t:"Use it, but note the caveat when I share it — I don't want to over-sell it",s:2}]},
  {trait:'critical',secs:30,text:"An article claims a major study proves something plausible. You want to know if it's actually true. First move?",opts:[{t:"Find the original study — not the article's summary — and look at what was actually measured",s:4},{t:"Check whether other credible sources report the same finding",s:3},{t:"Consider whether I have any reason to doubt it; if not, accept it provisionally",s:2},{t:"Plausible claims that fit existing evidence are usually fine to accept without hunting for the primary source",s:1}]}
];

/* ═══════════════════════════ STATE ═══════════════════════════ */
let S={
  qi:0,
  scores:{adaptive:0,ethical:0,creative:0,empathic:0,critical:0},
  maxes: {adaptive:0,ethical:0,creative:0,empathic:0,critical:0},
  tim:null,tl:25,at:0,susp:0,
  overall:0,arch:null,pcts:{},
  prods:new Set(['bundle']),
  uname:'',liText:'',qaData:[],
  sharedOnce:false,
  honestyDismissed:false
};

/* ═══════════════════════════ UTILS ═══════════════════════════ */
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0);}
function delay(ms){return new Promise(r=>setTimeout(r,ms));}
function getBand(tid,pct){return BANDS[tid].find(b=>pct>=b.min);}

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
function startQuiz(){
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
  document.getElementById('prog-label').innerHTML=`<strong>Taking your reading…</strong> Question ${S.qi+1} of ${QS.length}`;
  document.getElementById('q-section-lbl').textContent=`${tr.name} · ${(S.qi%3)+1} of 3`;

  // Trait marker
  const isFirstInTrait=(S.qi%3===0);
  const marker=document.getElementById('trait-marker');
  const tsm=document.getElementById('tsm-inner');
  if(isFirstInTrait){
    tsm.textContent=`${tr.name} — 3 questions`;
    tsm.style.color=tr.color;
    marker.style.display='block';
  } else {
    marker.style.display='none';
  }

  // Question text
  const qt=document.getElementById('qtext');
  qt.style.animation='none';qt.offsetHeight;qt.style.animation='';
  qt.textContent=q.text;
  document.getElementById('ttag').textContent=tr.name;
  document.getElementById('ttag').style.color=tr.color;
  document.getElementById('qlbl').textContent=`Question ${S.qi+1} of ${QS.length}`;

  // Options
  const container=document.getElementById('opts');
  container.style.animation='none';container.offsetHeight;container.style.animation='';
  container.innerHTML='';
  const letters=['A','B','C','D'];
  [...q.opts].sort(()=>Math.random()-.5).forEach((o,i)=>{
    const btn=document.createElement('button');
    btn.className='opt';
    btn.innerHTML=`<span class="ol">${letters[i]}</span>${o.t}`;
    btn.addEventListener('click',()=>pick(o.s,q.trait,btn));
    container.appendChild(btn);
  });

  startTim(q.secs||25);
  S.at=Date.now();

  // Midpoint toast at Q8
  if(S.qi===7){
    const toast=document.getElementById('midpt-toast');
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),2800);
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
            document.getElementById('reveal-share').style.display='block';
          },600);
        },300);
      },300);
    }
  },40);
}

function goToResults(){buildResults();}

function saveRevealEmail(){
  const v=document.getElementById('rev-email').value.trim();
  if(!v||!v.includes('@')){alert('Please enter a valid email address.');return;}
  S.savedEmail=v;
  postEmail(v);
  document.getElementById('rev-email-ok').style.display='block';
  document.getElementById('reveal-email-row').style.display='none';
  document.getElementById('reveal-email-label').style.display='none';
  setTimeout(goToResults,1200);
}

/* ═══════════════════════════ RESULTS ═══════════════════════════ */
function buildResults(){
  show('results');
  document.getElementById('arch-name').textContent=S.arch.name;
  document.getElementById('arch-tag').textContent=S.arch.tag;
  document.getElementById('ov-score').textContent=S.overall;
  const pct=getPercentile(S.overall);
  document.getElementById('ov-pct').innerHTML=`Top <strong>${pct}%</strong> of respondents`;
  document.getElementById('sticky-arch-name').textContent=S.arch.name;

  // Rarity line — makes sharing feel worthwhile
  const rarityEl=document.getElementById('rarity-line');
  if(rarityEl){
    const rarity=S.overall>=85?`Only 5% of people score this high. Most people who share this are in the top percentile.`:
      S.overall>=75?`Top 10% overall. A score worth posting.`:
      S.overall>=65?`Top 20% — stronger than most professionals on this assessment.`:
      `Your profile is more distinctive than your overall score suggests — see your dimension breakdown below.`;
    rarityEl.textContent=rarity;
  }

  // Share block label — personalised to score
  const shareLblEl=document.getElementById('share-rarity-label');
  if(shareLblEl){
    shareLblEl.textContent=`You scored ${S.overall}/100 — top ${pct}% of all respondents. Post it.`;
  }

  buildInsightCards();
  drawConst();
  buildShareCard();
  buildAffiliateCards();
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
          <div class="dc-trait" style="color:${t.color}99">${t.name}</div>
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
    ['Start by noticing ethical dimensions in situations where the stakes are low. Ask yourself: "Who else is affected by this decision who isn\'t in the room?" This builds the habit before it matters.','Read one case study per month of an organisational ethics failure. Understanding how smart people ended up in compromised positions is the most practical ethics education available.']
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
    ['At this level, the development area is calibration — knowing when rigour is the right call and when it slows things down unnecessarily. Not every claim needs interrogating. Identify your highest-leverage moments.','Practice "steel-manning" — taking a position you disagree with and making the strongest possible case for it before critiquing it. This is the advanced form of critical thinking.'],
    ['Build a small set of fast heuristics you apply under pressure — three questions you always ask when evaluating a claim. Make them automatic so they work even when you\'re moving fast.','Identify your specific confirmation bias patterns. What kinds of claims do you tend to accept without scrutiny? Usually they\'re in the areas you care most about. That\'s where the blind spot lives.'],
    ['Build the habit of asking "what would have to be true for this to be wrong?" for any claim that supports what you already want to believe. Confirming evidence is the most dangerous kind.','Before sharing any statistic or claim in a professional context, spend 2 minutes finding the original source. Not the article about the study — the study. This habit alone will change how you evaluate information.'],
    ['Start with one consistent practice: when someone cites a study or statistic that matters to a decision, ask for the source. Not aggressively — just as a matter of course. "Where\'s that from?" is a complete sentence.','Practise noticing when you accept something because it\'s plausible rather than because you\'ve verified it. Plausibility is not evidence. Building this distinction is the foundation of critical thinking.']
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
      'ethical+critical':'Ethical judgement plus critical scepticism means you\'re hard to manipulate and hard to mislead into compromised positions. You question the framing, not just the conclusion.',
      'creative+empathic':'Creative synthesis and empathic accuracy together mean your ideas land. You don\'t just generate — you understand the audience and shape ideas to reach them. This is the combination that produces effective communication rather than just original thinking.',
      'creative+critical':'Creative and critical in combination is unusual — most people are stronger in one. You generate ideas and evaluate them with genuine rigour. The risk is paralysis; the reward is reliably better output.',
      'empathic+critical':'High empathy and high critical scepticism create a specific kind of intelligence: you understand what people feel and you question the reasoning beneath it. This makes you effective in situations requiring both trust and analytical clarity.'
    };
    const key=[top.id,second.id].sort().join('+');
    const combo=combos[key]||`Your strongest two dimensions — ${top.name} and ${second.name} — reinforce each other in your professional context. The combination creates capability that neither dimension produces independently.`;
    items.push({label:`${top.name} + ${second.name}`,text:combo});
  }

  // Insight 2: top strength + bottom development area — the dynamic tension
  if(top && bottom){
    const tensions={
      'adaptive+ethical':'High adaptability with developing ethical judgement creates a specific watch-out: moving fast can mean not pausing long enough to notice when a line is being crossed. Build in a deliberate "is this right?" checkpoint before committing to new approaches.',
      'adaptive+creative':'Strong adaptability with developing creative synthesis means you respond well to change but may default to known solutions rather than genuinely new ones. Invest in the generative phase before jumping to implementation.',
      'adaptive+empathic':'You adapt to situations quickly but may not always read how others are experiencing the same change. Build in explicit check-ins with people during transitions — don\'t assume your experience of change maps to theirs.',
      'adaptive+critical':'Adapting quickly with developing critical thinking creates a risk of moving confidently in the wrong direction. Build a pause-and-verify habit before committing to new approaches, especially when the evidence is thin.',
      'ethical+adaptive':'Strong ethical compass with developing adaptability means you know what\'s right but can struggle when the right path requires stepping into genuinely unknown territory. The ethical clarity is the foundation — build the tolerance for uncertainty on top of it.',
      'ethical+creative':'High ethical standards with developing creative synthesis can occasionally manifest as constraint-before-generation — you filter ideas for appropriateness before fully exploring them. Try separating the generative and evaluative phases deliberately.',
      'ethical+empathic':'Strong ethics with developing empathic accuracy creates a specific gap: you may act on principle when the situation actually calls for reading what the other person needs first. Ethical action and relational attunement aren\'t always the same thing.',
      'ethical+critical':'Strong ethical grounding with developing critical scepticism means your values are clear but you may sometimes accept supporting evidence without sufficient scrutiny. Apply your ethical rigour to the evidence itself, not just the conclusion.',
      'creative+adaptive':'Strong creative synthesis with developing adaptability — this is an interesting combination. You generate novel ideas but can be slower to adapt your approach when the context changes. Build the flexibility to shift your creative process, not just your output.',
      'creative+ethical':'Strong creative thinking with developing ethical judgement creates a specific risk in ideation: not all novel ideas are responsible ones. Build an ethical filter as a deliberate stage in your creative process.',
      'creative+empathic':'Strong creative synthesis with developing empathic accuracy means your ideas may not always land with the intended audience. The idea generation is strong; invest equally in understanding who you\'re generating for.',
      'creative+critical':'Strong creative output with developing critical scepticism means you generate prolifically but may not evaluate rigorously enough before committing. Build a structured evaluation phase after ideation.',
      'empathic+adaptive':'High empathic accuracy with developing adaptability means you read people exceptionally well but can find it harder to navigate when the whole situation is changing. Your relational anchors are strong — build situational flexibility around them.',
      'empathic+ethical':'Strong empathic accuracy with developing ethical judgement creates a nuanced tension: you understand how people feel, which can make it harder to act on principle when doing so causes visible discomfort. Being kind and being ethical are sometimes different things.',
      'empathic+creative':'Strong empathic accuracy with developing creative synthesis means you understand your audience exceptionally well but may be slower to generate genuinely novel approaches for them. You have the insight — invest in the generative process.',
      'empathic+critical':'High empathic accuracy with developing critical scepticism is a specific combination to watch: you\'re attuned to people, which can make you more susceptible to well-delivered but poorly-evidenced arguments. Conviction is not the same as correctness.',
      'critical+adaptive':'High critical scepticism with developing adaptability can occasionally mean you scrutinise new approaches so thoroughly that you don\'t move quickly enough to test them. Distinguish between evaluating an idea and implementing it cautiously.',
      'critical+ethical':'Strong critical thinking with developing ethical judgement — you question evidence rigorously, which is valuable, but may be less consistent in applying the same rigour to the ethical dimensions of decisions.',
      'critical+creative':'High critical scepticism with developing creative synthesis can inhibit idea generation — you evaluate before you\'ve finished generating. Build a strict rule: no evaluation during ideation. Separate the phases completely.',
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
    shapeInsight=`Your profile is unusually balanced — all five dimensions within ${spread} points of each other. This breadth is genuinely rare. It suggests you bring consistent capability across very different types of challenge, rather than being transformationally strong in one direction. In teams, this makes you the person who holds things together across boundaries. <strong>The development implication:</strong> choose one dimension to take to an exceptional level, rather than optimising for breadth.`;
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
    if(shown||S.sharedOnce)return;
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
   runFulfilment() restores the saved profile, generates the AI assets, and shows
   the deliverables. No card details are ever handled by this site. */

function closePay(){document.getElementById('modal-bg').classList.remove('open');}

/* Fire-and-forget email capture → Mailchimp via /api/email */
function postEmail(email){
  if(!email)return;
  try{
    fetch('/api/email',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:S.uname||'',email,scores:S.pcts})}).catch(()=>{});
  }catch(e){}
}

async function startCheckout(){
  const em=document.getElementById('pe').value.trim();
  const nm=document.getElementById('pn').value.trim();
  if(!em||!em.includes('@')){alert('Please enter a valid email.');return;}
  if(!nm){alert('Please enter your name.');return;}
  S.uname=nm;S.savedEmail=em;
  postEmail(em);
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
   fulfilment steps while the AI assets generate, then reveal the deliverables. */
async function runFulfilment(){
  buildResults();
  show('results');
  document.getElementById('pf-step').style.display='none';
  document.getElementById('proc-step').classList.add('show');
  document.getElementById('modal-bg').classList.add('open');
  const steps=[['ps1',900],['ps2',700],['ps3',null],['ps4',null],['ps5',600]];
  for(let i=0;i<steps.length;i++){
    const[id,ms]=steps[i];const el=document.getElementById(id);el.classList.add('act');
    if(ms)await delay(ms);
    else if(id==='ps3')await genLinkedIn();
    else if(id==='ps4')await genQA();
    el.classList.remove('act');el.classList.add('done');
  }
  await delay(300);closePay();buildDeliverables();show('deliverables');
}

document.addEventListener('DOMContentLoaded',()=>{
  initCounter();
  const params=new URLSearchParams(window.location.search);
  if(params.get('paid')==='true'){
    const saved=sessionStorage.getItem('hm_state');
    if(saved){
      try{
        const d=JSON.parse(saved);
        S.pcts=d.pcts;S.overall=d.overall;S.arch=d.arch;S.uname=d.uname;S.savedEmail=d.savedEmail;S.selectedPack=d.selectedPack;
        history.replaceState({},'',window.location.pathname); // avoid re-trigger on refresh
        runFulfilment();
      }catch(e){}
    }
  }
});

/* ═══════════════════════════ AI GEN ═══════════════════════════ */
function profileStr(){
  const tr=TRAITS.map(t=>`${t.name}: ${S.pcts[t.id]}/100`).join(', ');
  const strong=TRAITS.reduce((a,b)=>S.pcts[a.id]>S.pcts[b.id]?a:b);
  const weak=TRAITS.reduce((a,b)=>S.pcts[a.id]<S.pcts[b.id]?a:b);
  return{tr,strong,weak};
}
async function genLinkedIn(){
  const{tr,strong}=profileStr();
  const p=`Write a LinkedIn 'About' section for a professional with this Humanometer profile:
Archetype: ${S.arch.name} — "${S.arch.tag}"
Scores: ${tr}
Overall: ${S.overall}/100, Strongest: ${strong.name} (${S.pcts[strong.id]}/100)

Three paragraphs, ~60 words each (~180 words total).
Para 1: Who they are professionally — open with their dominant human quality. First sentence must be distinctive and make a reader stop.
Para 2: What they bring to teams — concrete, grounded in their top 2-3 traits. Specific enough it couldn't apply to anyone.
Para 3: What they're working on or looking for — forward-facing, confident. One sentence on the kind of work that gets the best from them.

Rules: First person. No clichés (no "passionate", "results-driven", "dynamic", "team player"). No emojis. No hashtags. Tone: confident, warm, real. Write as if you are them.
Output ONLY the three paragraphs separated by a blank line.`;
  try{
    const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:600,messages:[{role:'user',content:p}]})});
    const d=await r.json();S.liText=d.content.map(b=>b.text||'').join('').trim();
  }catch(e){S.liText=`[Could not generate — check API connection]\nProfile: ${S.arch.name}, ${S.overall}/100`;}
}
async function genQA(){
  const{tr}=profileStr();
  const p=`Write 5 personalised interview answers for someone with this profile:
Archetype: ${S.arch.name}, Scores: ${tr}, Overall: ${S.overall}/100

Questions:
1. "Tell me about yourself."
2. "What's your greatest professional strength?"
3. "How do you handle situations where there's no clear right answer?"
4. "Tell me about a time you had to push back on something you disagreed with."
5. "What makes you different from other candidates?"

Each answer: 90-110 words. Specific to their profile. First person. Natural spoken rhythm, as if said aloud in an interview. Ground each answer in their genuine trait scores.
Return ONLY a JSON array of 5 objects with keys "question" and "answer". No markdown, no fences, no preamble.`;
  try{
    const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1200,messages:[{role:'user',content:p}]})});
    const d=await r.json();
    S.qaData=JSON.parse(d.content.map(b=>b.text||'').join('').trim().replace(/```json|```/g,'').trim());
  }catch(e){S.qaData=[1,2,3,4,5].map(n=>({question:`Question ${n}`,answer:'[Could not generate — please retry]'}));}
}

/* ═══════════════════════════ DELIVERABLES ═══════════════════════════ */
function buildDeliverables(){
  document.getElementById('li-text').textContent=S.liText;
  const ql=document.getElementById('qa-list');ql.innerHTML='';
  S.qaData.forEach((qa,i)=>{const el=document.createElement('div');el.className='qa';el.innerHTML=`<div class="qa-q"><span class="qa-n">0${i+1}</span>${qa.question}</div><div class="qa-a">${qa.answer}</div>`;ql.appendChild(el);});
  document.getElementById('cert-name').textContent=S.uname||'Your Name';
  document.getElementById('cert-arch').textContent=S.arch.name+' — '+S.arch.tag;
  document.getElementById('cert-date').textContent=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  const cs=document.getElementById('cert-scores');cs.innerHTML='';
  TRAITS.forEach(t=>{const el=document.createElement('div');el.className='cscore';el.innerHTML=`<div class="cscore-v" style="color:${t.color}">${S.pcts[t.id]}</div><div class="cscore-l">${t.name.split(' ')[0]}</div>`;cs.appendChild(el);});
  document.getElementById('dsc-n').textContent=S.overall;
  document.getElementById('dsc-arch').textContent=S.arch.name;
  const dt=document.getElementById('dsc-traits');dt.innerHTML='';
  TRAITS.forEach(t=>{const s=document.createElement('span');s.className='sc-t';s.textContent=`${t.name.split(' ')[0]} ${S.pcts[t.id]}`;dt.appendChild(s);});
  // Also update deliverables share panel
  const dspill=document.getElementById('dsc-traits');
  if(dspill){dspill.innerHTML='';TRAITS.forEach(t=>{const s=document.createElement('span');s.className='sc-t';s.textContent=`${t.name.split(' ')[0]} ${S.pcts[t.id]}`;dspill.appendChild(s);});}
}
function tab(id,btn){document.querySelectorAll('.dpanel').forEach(p=>p.classList.remove('act'));document.querySelectorAll('.dtab').forEach(t=>t.classList.remove('act'));document.getElementById('dp-'+id).classList.add('act');btn.classList.add('act');}

/* ═══════════════════════════ SHARE ═══════════════════════════ */
function getShareText(platform='linkedin'){
  const pct=getPercentile(S.overall);
  const sorted=[...TRAITS].sort((a,b)=>S.pcts[b.id]-S.pcts[a.id]);
  const top2=sorted.slice(0,2);
  const peakLines=top2.map(t=>`${t.name}: ${S.pcts[t.id]}/100`).join(' · ');

  if(platform==='linkedin'){
    return `I just took the Humanometer — a 5-minute assessment of the skills AI can't replicate.

My profile: "${S.arch.name}" · ${S.overall}/100 · Top ${pct}%

My two strongest dimensions:
${top2.map(t=>`▸ ${t.name}: ${S.pcts[t.id]}/100`).join('\n')}

The full assessment also gives you a breakdown of your development areas, how your dimensions interact, and combination insights specific to your profile — not just a label.

Free to take (5 mins): humanometer.com

What's your profile? Can you beat The ${S.arch.name}?`;
  }

  if(platform==='x'){
    return `My Humanometer reading: "${S.arch.name}" · ${S.overall}/100 (top ${pct}%)\nTop strengths: ${peakLines}\nFull reading — dev areas, profile interactions — free at humanometer.com\nCan you beat it?`;
  }

  if(platform==='whatsapp'){
    return `I took the Humanometer — a 5-min assessment of the skills AI can't replace.\n\nMy profile: "${S.arch.name}" · ${S.overall}/100 · Top ${pct}%\nTop strengths: ${peakLines}\n\nIt also gives a full breakdown of your development areas and how your dimensions interact — not just a personality label. Free at humanometer.com — what's yours?`;
  }

  // clipboard / generic
  return `The Humanometer — My Results\n\nProfile: "${S.arch.name}"\nOverall: ${S.overall}/100 · Top ${pct}%\n\nTop strengths:\n${top2.map(t=>`${t.name}: ${S.pcts[t.id]}/100`).join('\n')}\n\nFull reading (development areas, profile interactions, career insights): humanometer.com\n\nCan you beat The ${S.arch.name}?`;
}

function shareLinkedIn(){
  S.sharedOnce=true;document.getElementById('sticky-share').classList.remove('show');
  const txt=getShareText('linkedin');
  window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://humanometer.com')}&summary=${encodeURIComponent(txt)}`,'_blank','width=600,height=500');
}
function shareX(){
  S.sharedOnce=true;
  const txt=getShareText('x');
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}`,'_blank','width=600,height=400');
}
function shareWhatsApp(){
  S.sharedOnce=true;
  const txt=getShareText('whatsapp');
  window.open(`https://wa.me/?text=${encodeURIComponent(txt)}`,'_blank');
}
function copyShare(){
  S.sharedOnce=true;
  navigator.clipboard.writeText(getShareText('clipboard')).then(()=>{
    const btn=event.target.closest('button');
    const o=btn.innerHTML;btn.innerHTML='✓ Copied';btn.style.borderColor='var(--ok)';btn.style.color='var(--ok)';
    setTimeout(()=>{btn.innerHTML=o;btn.style.borderColor='';btn.style.color='';},2000);
  });
}
function copyLI(){navigator.clipboard.writeText(S.liText).then(()=>{const b=event.target;const o=b.textContent;b.textContent='✓ Copied';setTimeout(()=>b.textContent=o,1800);});}
async function regenLI(){document.getElementById('li-text').textContent='Regenerating…';await genLinkedIn();document.getElementById('li-text').textContent=S.liText;}
function copyAllQA(){navigator.clipboard.writeText(S.qaData.map((qa,i)=>`${i+1}. ${qa.question}\n\n${qa.answer}`).join('\n\n---\n\n'));}
async function regenQA(){document.getElementById('qa-list').innerHTML='<div style="color:var(--muted);padding:12px;">Regenerating…</div>';await genQA();const ql=document.getElementById('qa-list');ql.innerHTML='';S.qaData.forEach((qa,i)=>{const el=document.createElement('div');el.className='qa';el.innerHTML=`<div class="qa-q"><span class="qa-n">0${i+1}</span>${qa.question}</div><div class="qa-a">${qa.answer}</div>`;ql.appendChild(el);});}
function copyCert(){navigator.clipboard.writeText(`Humanometer Certificate — ${S.uname}\n${S.arch.name}\n${TRAITS.map(t=>t.name+': '+S.pcts[t.id]).join('\n')}\nOverall: ${S.overall}/100\nVerified by humanometer.com`);}

function retake(){show('landing');}
function getPercentile(s){if(s>=85)return 5;if(s>=75)return 10;if(s>=65)return 20;if(s>=55)return 35;return 50;}

function buildAffiliateCards(){
  const sorted=[...TRAITS].sort((a,b)=>S.pcts[a.id]-S.pcts[b.id]);
  const devTraits=sorted.slice(0,3);
  const AFF={
    adaptive:[{name:'Adaptability & Resilience at Work',provider:'LinkedIn Learning',url:'https://linkedin.com/learning'}],
    ethical:[{name:'Ethics in the Age of AI',provider:'edX / MIT',url:'https://edx.org'}],
    creative:[{name:'Creative Thinking: Techniques & Tools',provider:'Coursera',url:'https://coursera.org'}],
    empathic:[{name:'Empathy & Emotional Intelligence',provider:'LinkedIn Learning',url:'https://linkedin.com/learning'}],
    critical:[{name:'Critical Thinking & Problem Solving',provider:'edX',url:'https://edx.org'}]
  };
  const grid=document.getElementById('aff-grid');if(!grid)return;grid.innerHTML='';
  devTraits.forEach(t=>{
    const c=(AFF[t.id]||[])[0];if(!c)return;
    const trait=TRAITS.find(tr=>tr.id===t.id);
    const card=document.createElement('a');card.className='aff-card';card.href=c.url;card.target='_blank';card.rel='noopener';
    card.innerHTML=`<div class="aff-left"><div class="aff-trait" style="color:${trait.color}">${trait.name}</div><div class="aff-name">${c.name}</div><div class="aff-provider">${c.provider}</div></div><div class="aff-arrow">→</div>`;
    grid.appendChild(card);
  });
}

function buyPack(type){
  S.selectedPack=type;
  const prices={results:9.99,benchmark:3.99,bundle:10.99};
  document.getElementById('mpay-lbl').textContent=`Pay £${prices[type].toFixed(2)} · Instant Access`;
  let rows='';
  if(type==='results'){rows=`<div class="orow"><span>LinkedIn Rewrite</span><span>included</span></div><div class="orow"><span>5 Interview Answers</span><span>included</span></div><div class="orow"><span>Career Synthesis</span><span>included</span></div>`;}
  else if(type==='benchmark'){rows=`<div class="orow"><span>Permanent results page</span><span>included</span></div><div class="orow"><span>Verified certificate PDF</span><span>included</span></div><div class="orow"><span>Annual re-test + comparison</span><span>included</span></div>`;}
  else{rows=`<div class="orow"><span>Results Pack</span><span>£9.99</span></div><div class="orow"><span>Benchmark (year 1)</span><span>£1.00</span></div><div class="orow" style="color:var(--ok)"><span>Bundle saving</span><span>−£3.99</span></div>`;}
  rows+=`<div class="orow"><span>Total</span><span>£${prices[type].toFixed(2)}</span></div>`;
  document.getElementById('morder').innerHTML=rows;
  document.getElementById('pf-step').style.display='block';
  document.getElementById('proc-step').classList.remove('show');
  if(S.savedEmail){const pe=document.getElementById('pe');if(pe)pe.value=S.savedEmail;}
  document.getElementById('modal-bg').classList.add('open');
}

function submitEmail(){
  const v=document.getElementById('einp').value.trim();
  if(!v||!v.includes('@'))return;
  S.savedEmail=v;
  postEmail(v);
  const row=document.getElementById('email-form-row');if(row)row.style.display='none';
  document.querySelector('.ebtn').style.display='none';
  document.getElementById('eok').style.display='block';
}
