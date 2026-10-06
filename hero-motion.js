const buildHero = () => {
  const hero = document.querySelector('.hero-section');
  if (!hero || !hero.querySelector('.hero-contact')) return false;
  hero.classList.add('motion-hero');
  const art = hero.querySelector('.hero-art-wrap');
  if (art) art.remove();
  const heading = hero.querySelector('h1');
  heading.classList.add('hero-accessible-heading');
  const field = document.createElement('div');
  field.className = 'emotion-field';
  field.setAttribute('aria-hidden', 'true');
  const names = ["abandoned", "absorbed", "abused", "adoring", "affectionate", "afraid", "agitated", "alarmed", "alert", "ambivalent", "amused", "anguished", "astonished", "attentive", "avoidant", "bereft", "betrayed", "bleh", "blue", "brooding", "buoyant", "burdened", "cancelled", "chatty", "clear", "competent", "concerned-v8 2", "conflicted", "contemplative", "copacetic", "crushed", "dazed", "dead inside", "defeated", "deficient", "dejected", "desire", "desolate", "despondent", "discombobulated", "discomfort", "discontented", "disenchanted", "disgraced", "disgruntled", "disillusioned", "dispirited", "displeased", "disrespected", "dissatisfied", "distracted", "distressed", "dread", "dumbfounded", "dysregulated", "empty", "enchanted", "encouraged", "engrossed", "enjoyment", "enraptured", "enthralled", "euphoric", "eventempered", "exasperated", "fascinated", "flabbergasted", "foolish", "fragile", "frazzled", "frozen", "gaslit", "ghosted", "glad", "glowing", "goofy", "grief", "groggy", "grounded", "grumpy", "hate", "heard", "heartbroken", "hesitant", "hollow", "homesick", "horrified", "hurting", "icky", "imperturbable", "in love", "inadequate", "incompetent", "indecisive", "indifferent", "indignant", "infatuated", "interested", "invalidated", "irked", "irritable", "isolated", "jilted", "judged", "lazy", "letdown", "longing", "lovesick", "loving", "mad", "malaised", "melancholic", "minimized", "morose", "nauseated", "neglected", "obsessed", "ok", "overjoyed", "painful", "pathetic", "pensive", "pissed", "poised", "poopy", "present", "protective", "refreshed", "regretful", "reinvigorated", "rejected", "rejuvenated", "remorseful", "resentful", "resigned", "reverent", "romantic", "rushed", "scorn", "sensual", "sick", "silly", "solemn", "sorrowful", "spiteful", "stable", "startled", "stoked", "strained", "stuck", "suffocated", "taken aback", "talkative", "tenderness", "touched", "triggered", "turned off", "unappreciated", "unbothered", "uncertain", "uncomfortable", "undervalued", "unhappy", "unmotivated", "unseen", "unstable", "upset", "validated", "vengeful", "weary", "welp", "whole", "wistful", "worthless", "zen"];
  const pool = names.map(name => ({name, order:Math.random()})).sort((a,b)=>a.order-b.order).map(x=>x.name);
  const pick = () => pool.pop();
  const colors = ['blue', 'red', 'yellow', 'green'];
  const rowColors = [[], [], []];
  const dot = (column, row) => {
    const index = rowColors[row].length;
    const choices = colors.filter(color => color !== rowColors[row][index - 1] && color !== rowColors[row - 1]?.[index]);
    const color = choices[Math.floor(Math.random() * choices.length)];
    rowColors[row].push(color);
    const wrap = document.createElement('span');
    wrap.className = 'emotion-dot-entry';
    wrap.style.setProperty('--entry-delay', `${column * 28 + row * 18}ms`);
    const circle = document.createElement('span');
    circle.className = 'emotion-dot';
    circle.style.setProperty('--flow-duration', `${4.5 + Math.random() * 3}s`);
    circle.style.setProperty('--flow-delay', `${-Math.random() * 7}s`);
    const img = document.createElement('img');
    circle.dataset.color = color;
    img.src = `/assets/emotions/${color}/${pick()}.svg`;
    img.alt = '';
    circle.append(img); wrap.append(circle);
    return wrap;
  };
  ['Care','between','sessions'].forEach((word,row) => {
    const line = document.createElement('div'); line.className='emotion-row';
    line.style.setProperty('--word-delay', `${1500 + row * 190}ms`);
    const before = [10,12,14][row];
    for(let i=0;i<before;i++) line.append(dot(i,row));
    const slot = document.createElement('span'); slot.className='emotion-word-slot';
    slot.style.setProperty('--word-delay', `${1500 + row * 190}ms`);
    const placeholders = document.createElement('span'); placeholders.className='word-placeholder-dots';

    const text = document.createElement('span');text.className='emotion-word';text.textContent=word;
    slot.append(placeholders,text);line.append(slot);
    for(let i=before+5;i<39;i++) line.append(dot(i,row));
    field.append(line);
  });
  hero.prepend(field);
  // Rank the circles around the viewport so the visible entrance runs left to right.
  const visibleDots = [...field.querySelectorAll('.emotion-dot-entry')]
    .filter(dot => { const rect=dot.getBoundingClientRect(); return rect.right > -220 && rect.left < innerWidth + 220; })
    .sort((a,b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left || a.getBoundingClientRect().top - b.getBoundingClientRect().top);
  field.querySelectorAll('.emotion-dot-entry').forEach(dot => dot.style.setProperty('--entry-delay', '0ms'));
  visibleDots.forEach((dot,index) => dot.style.setProperty('--entry-delay', `${index * 30}ms`));
  const copy = hero.querySelector('.hero-subhead');
  const button = hero.querySelector('.hero-contact');
  const arrow = button.querySelector('svg');
  if(arrow) { const img=document.createElement('img');img.src='/assets/figma/arrow.svg';img.alt='';img.className='hero-arrow';arrow.replaceWith(img); }
  const footer=document.createElement('div');footer.className='hero-motion-copy';footer.append(copy,button);hero.append(footer);
  return true;
};
if(!buildHero()) {
  const observer=new MutationObserver(()=>{if(buildHero()) observer.disconnect();});
  observer.observe(document.getElementById('app'),{childList:true,subtree:true});
}
