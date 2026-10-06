const setupHeader = () => {
  const heroButton = document.querySelector('.hero-contact');
  const actions = document.querySelector('.header-actions');
  if (!heroButton || !actions) return false;
  const header = document.querySelector('header');
  for (let i = 0; i < 8; i++) {
    const layer = document.createElement('span');
    layer.className = 'header-blur-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.style.setProperty('--blur', `${(i + 1) * 3}px`);
    layer.style.setProperty('--fade-start', `${Math.max(0, 75 - i * 12.5)}%`);
    layer.style.setProperty('--fade-end', `${100 - i * 12.5}%`);
    header.prepend(layer);
  }
  const wordmark = actions.querySelector('a');
  wordmark.classList.add('header-wordmark');
  const button = heroButton.cloneNode(true);
  button.classList.remove('hero-contact');
  button.classList.add('header-contact');
  button.setAttribute('aria-hidden', 'true');
  button.tabIndex = -1;
  actions.append(button);
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const passed = heroButton.getBoundingClientRect().bottom <= document.querySelector('header').getBoundingClientRect().bottom;
    actions.classList.toggle('show-contact', passed);
    button.setAttribute('aria-hidden', String(!passed));
    button.tabIndex = passed ? 0 : -1;
    wordmark.setAttribute('aria-hidden', String(passed));
    wordmark.tabIndex = passed ? -1 : 0;
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
  return true;
};
if (!setupHeader()) {
  const observer = new MutationObserver(() => {
    if (setupHeader()) observer.disconnect();
  });
  observer.observe(document.getElementById('app'), { childList: true, subtree: true });
}
