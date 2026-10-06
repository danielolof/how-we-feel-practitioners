const setupReviews=()=>{
  const section=document.querySelector('.reviews-section');
  if(!section||!section.querySelector('.review-card'))return false;
  const heading=section.querySelector('h2').textContent;
  const reviews=[...section.querySelectorAll('.review-card')].map(card=>({source:card.querySelector('div').textContent.replace(/\s*★+\s*/g,'').trim(),quote:card.querySelector('p').textContent}));
  section.id='reviews';section.classList.add('figma-reviews');
  const shell=document.createElement('div');shell.className='figma-reviews-shell';
  const stats=document.createElement('div');stats.className='figma-review-stats';
  [['4.9','30K APP STORE RATINGS'],['100M+','CHECK-INS'],['3M+','TOTAL DOWNLOADS']].forEach(([value,label])=>{const stat=document.createElement('div');const strong=document.createElement('strong');strong.textContent=value;const small=document.createElement('span');small.textContent=label;stat.append(strong,small);stats.append(stat)});
  const grid=document.createElement('div');grid.className='figma-reviews-grid';
  reviews.forEach(review=>{const card=document.createElement('article');card.className='figma-review-card';const source=document.createElement('p');source.className='figma-review-source';source.textContent=review.source;const quote=document.createElement('blockquote');quote.textContent=review.quote;const stars=document.createElement('img');stars.src='/assets/figma/review-stars.svg';stars.alt='5 out of 5 stars';card.append(source,quote,stars);grid.append(card)});
  const title=document.createElement('h2');title.className='figma-reviews-heading';title.textContent=heading;
  shell.append(title,stats,grid);section.replaceChildren(shell);section.setAttribute('aria-label','App ratings and reviews');
  const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){stats.classList.add('stats-visible');observer.disconnect();}},{threshold:.35});observer.observe(stats);
  return true;
};
if(!setupReviews()){const observer=new MutationObserver(()=>{if(setupReviews())observer.disconnect()});observer.observe(document.getElementById('app'),{childList:true,subtree:true})}
