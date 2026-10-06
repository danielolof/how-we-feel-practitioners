const setupStories=()=>{
  const section=document.querySelector('.stories-section');
  if(!section||!section.querySelector('.story-track'))return false;
  const heading=section.querySelector('h2').textContent;
  const description=section.querySelector('.section-heading p').textContent;
  const stories=[...section.querySelectorAll('.story-track a')].map(a=>({href:a.href,name:a.querySelector('.story-person').textContent,title:a.querySelector('h3').textContent}));
  section.classList.add('stories-list-section');section.id='practitioner-stories';
  const layout=document.createElement('div');layout.className='stories-list-layout';
  const intro=document.createElement('div');intro.className='stories-list-intro';const h=document.createElement('h2');h.textContent=heading;const p=document.createElement('p');p.textContent=description;intro.append(h,p);
  const list=document.createElement('div');list.className='stories-list';
  stories.forEach(story=>{const a=document.createElement('a');a.className='stories-list-card';a.href=story.href;a.target='_blank';a.rel='noopener noreferrer';const copy=document.createElement('span');const name=document.createElement('span');name.className='stories-list-name';name.textContent=story.name;const title=document.createElement('span');title.className='stories-list-title';title.textContent=story.title;copy.append(name,title);const arrow=document.createElement('img');arrow.src='/assets/figma/story-arrow.svg';arrow.alt='';a.append(copy,arrow);list.append(a)});
  layout.append(intro,list);section.replaceChildren(layout);return true;
};
if(!setupStories()){const observer=new MutationObserver(()=>{if(setupStories())observer.disconnect()});observer.observe(document.getElementById('app'),{childList:true,subtree:true})}
