const setupStories=()=>{
  const section=document.querySelector('.stories-section');
  if(!section||!section.querySelector('.story-track'))return false;
  const heading=section.querySelector('h2').textContent;
  const description=section.querySelector('.section-heading p').textContent;
  const stories=[...section.querySelectorAll('.story-track a')].map(a=>({href:a.href,name:a.querySelector('.story-person').textContent,title:a.querySelector('h3').textContent}));
  section.classList.add('stories-list-section');section.id='practitioner-stories';
  const layout=document.createElement('div');layout.className='stories-list-layout';
  const intro=document.createElement('div');intro.className='stories-list-intro';const h=document.createElement('h2');h.textContent=heading;const p=document.createElement('p');p.textContent=description;intro.append(h,p);
  const list=document.createElement('div');list.className='stories-list';list.setAttribute('aria-label','Practitioner stories');
  const excerpts=["“Maybe my condition didn’t get worse. Maybe my body was just responding to how I was feeling. And that is a powerful discovery.”","A collaborative approach to care, grounded in mindfulness and the belief that clients are experts on their own lives.","Helping men turn emotional awareness into practical steps they can use outside the therapy room.","Making space to slow down, explore what has gone unchecked, and build connection through compassionate, collaborative care.","“It helps me feel seen and validated in a way that is impactful towards my mental health.”"];
  const controls=document.createElement('div');controls.className='stories-controls';
  const buttons=['Previous stories','Next stories'].map((label,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',label);const img=document.createElement('img');img.src='/assets/figma/story-arrow.svg';img.alt='';b.append(img);b.addEventListener('click',()=>list.scrollBy({left:(i?1:-1)*367.2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));controls.append(b);return b});
  const update=()=>{buttons[0].disabled=list.scrollLeft<2;buttons[1].disabled=list.scrollLeft>=list.scrollWidth-list.clientWidth-2};list.addEventListener('scroll',update,{passive:true});new ResizeObserver(update).observe(list);
  stories.forEach((story,i)=>{const a=document.createElement('a');a.className='stories-list-card';a.href=story.href;a.target='_blank';a.rel='noopener noreferrer';const copy=document.createElement('span');const name=document.createElement('span');name.className='stories-list-name';name.textContent=story.name;const title=document.createElement('span');title.className='stories-list-title';title.textContent=story.title;copy.append(name,title);const arrow=document.createElement('img');arrow.src='/assets/figma/story-arrow.svg';arrow.alt='';const excerpt=document.createElement('p');excerpt.className='stories-excerpt';excerpt.textContent=excerpts[i];a.append(copy,excerpt,arrow);list.append(a)});
  const header=document.createElement('div');header.className='stories-header';header.append(intro,controls);const viewport=document.createElement('div');viewport.className='stories-viewport';viewport.append(list);layout.append(header,viewport);section.replaceChildren(layout);return true;
};
if(!setupStories()){const observer=new MutationObserver(()=>{if(setupStories())observer.disconnect()});observer.observe(document.getElementById('app'),{childList:true,subtree:true})}
