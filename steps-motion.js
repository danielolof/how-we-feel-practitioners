const setupSteps = () => {
  const section = document.querySelector('#how-it-helps');
  if (!section || !section.querySelector('.value-card')) return false;
  const cards = [...section.querySelectorAll('.value-card')];
  const title = section.querySelector('h2').textContent;
  const subtitle = section.querySelector('.section-heading p').textContent.trim();
  const steps = cards.map(card => ({ title:card.querySelector('h3').textContent, body:card.querySelector('p').textContent }));
  section.classList.add('motion-steps');
  const stage = document.createElement('div'); stage.className='steps-stage';
  const intro = document.createElement('div'); intro.className='steps-intro';
  const headline = document.createElement('h2'); headline.textContent=title;
  const subtext = document.createElement('p'); subtext.textContent=subtitle;
  intro.append(headline,subtext);stage.append(intro);
  const numbers = steps.map((step,i) => {
    const number=document.createElement('span');number.className=`steps-number steps-number-${i+1}`;number.textContent=i+1;number.setAttribute('aria-hidden','true');stage.append(number);return number;
  });
  const lines=[1,2].map(i => { const wrap=document.createElement('span');wrap.className=`steps-line steps-line-${i}`;wrap.setAttribute('aria-hidden','true');const img=document.createElement('img');img.src=`/assets/figma/steps-line-${i}.svg`;img.alt='';wrap.append(img);stage.append(wrap);return wrap; });
  const panels=steps.map((step,i) => {
    const panel=document.createElement('article');panel.className='steps-panel';
    const phone=document.createElement('div');phone.className='steps-phone';phone.setAttribute('aria-hidden','true');
    const copy=document.createElement('div');copy.className='steps-copy';
    const h=document.createElement('h3');h.textContent=step.title;const p=document.createElement('p');p.textContent=step.body;
    copy.append(h,p);panel.append(phone,copy);stage.append(panel);return panel;
  });
  section.replaceChildren(stage);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=n=>Math.max(0,Math.min(1,n));const ease=n=>n*n*(3-2*n);
  let pending=false;
  const update=()=>{
    pending=false;
    const h=innerHeight;const rect=section.getBoundingClientRect();
    if(rect.top<h*.55)stage.classList.add('steps-entered');
    section.classList.toggle('steps-reduced',reduced.matches);
    if(reduced.matches){panels.forEach(panel=>panel.setAttribute('aria-hidden','false'));return;}
    // Native document scrolling: only the overview-to-detail handoff is animated.
    const morph=ease(clamp(-rect.top/(h*.75)));
    stage.style.setProperty('--intro-exit',1-morph);
    stage.style.setProperty('--intro-lift',`${-50*morph}px`);
    const width=stage.clientWidth;
    stage.style.setProperty('--line-scale',Math.min(1,width/1440));
    const xStart=[.202,.5,.798];const xEnd=width<650?.105:.1083;
    const spacing=h;
    numbers.forEach((number,i)=>{
      number.style.left=`${(xStart[i]+(xEnd-xStart[i])*morph)*100}%`;
      number.style.top=`${h*.5+(i+1)*spacing*morph}px`;
      number.style.setProperty('--number-opacity',1);
    });
    lines.forEach((line,i)=>{
      const start=i===0?.351:.649;
      line.style.left=`${(start+(xEnd-start)*morph)*100}%`;
      line.style.top=`${h*.5+(i+1.5)*spacing*morph}px`;
      line.style.setProperty('--line-rotation',`${90*morph}deg`);
    });
    panels.forEach((panel,i)=>{
      // Animate around each step's natural document position; never pin the scroll.
      const bounds=panel.getBoundingClientRect();
      const entrance=ease(clamp((h-bounds.top)/(h*.35)));
      const exit=ease(clamp((-bounds.bottom)/(h*.2)));
      panel.style.opacity=entrance*(1-exit);
      panel.style.transform='none';
      const offset=(1-entrance)*45-exit*45;
      panel.querySelector('.steps-copy').style.translate=`0 ${offset}px`;
      panel.querySelector('.steps-phone').style.translate=`0 ${offset}px`;
      numbers[i].style.top=`${h*.5+(i+1)*spacing*morph+offset*morph}px`;
      numbers[i].style.setProperty('--number-opacity',1-morph+morph*entrance*(1-exit));
      panel.setAttribute('aria-hidden','false');
    });

  };
  const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update)}};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',schedule);update();
  return true;
};
if(!setupSteps()){
  const observer=new MutationObserver(()=>{if(setupSteps())observer.disconnect()});
  observer.observe(document.getElementById('app'),{childList:true,subtree:true});
}
