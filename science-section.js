const setupScience=()=>{
  const section=document.querySelector('.trust-section');
  if(!section)return false;
  const description=section.querySelector('.trust-copy p').textContent.trim();
  section.id='grounded-in-science';section.classList.add('science-section');
  section.innerHTML=`<div class="science-stage"><img class="science-portrait" src="/assets/figma/marc-portrait.png" alt="Marc Brackett"><div class="science-copy"><h2>Grounded<br>in science</h2><p>${description}</p><div class="science-audio"><button class="science-play-card" type="button" aria-label="Play audio" aria-expanded="false" aria-controls="science-audio-controls"><span>Hear Marc discuss How We Feel on Armchair Expert</span><span class="science-play-icon"><img src="/assets/figma/science-play.svg" alt=""></span></button><div id="science-audio-controls" class="science-audio-controls" hidden><p class="science-audio-label">Marc Brackett · Armchair Expert</p><audio-player content-title="Marc Brackett · Armchair Expert"><audio-skin><audio src="https://content.production.cdn.art19.com/validation=1791381970,c0f4cf08-7fff-5b55-a661-16b8e2f6736b,jsKrrkr9ULAoDl1p23oIMzvYF0Y/episodes/e1d89627-ad5d-44ae-a86f-a797e0142103/00339b5cad65f74a88263336a80f242eb63014554dedfd57f030fe0dec10966b531c0a9258f4fbcc867595b3de716a8f08f4e71de00aed5acc0394a6d7f5b84e/1084%20-%20Marc%20Brackett%20%28Wide%29%20-%20V2%20AP.mp3" preload="metadata"></audio></audio-skin></audio-player><a class="science-episode-link" href="https://armchairexpertpod.com/pods/marc-brackett" target="_blank" rel="noopener noreferrer">Open Marc’s Armchair Expert episode ↗</a><p class="science-audio-error" role="status" hidden>Playback could not start. Try the player’s play button.</p></div></div></div></div>`;
  const trigger=section.querySelector('.science-play-card');
  const controls=section.querySelector('.science-audio-controls');
  const audio=section.querySelector('audio');
  trigger.addEventListener('click',()=>{
    controls.hidden=false;
    trigger.setAttribute('aria-expanded','true');
    trigger.hidden=true;
    section.classList.add('science-audio-open');
    audio.play().catch(()=>{section.querySelector('.science-audio-error').hidden=false;});
  });
  const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){section.classList.add('science-visible');observer.disconnect();}},{threshold:.18});
  observer.observe(section);
  return true;
};
if(!setupScience()){const observer=new MutationObserver(()=>{if(setupScience())observer.disconnect()});observer.observe(document.getElementById('app'),{childList:true,subtree:true})}
