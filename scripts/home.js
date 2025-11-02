// ---------- SCROLL TRIGGERED FADE-IN ----------
const fadeEls = document.querySelectorAll('.fade-in');

function handleFadeIn() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100){
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleFadeIn);
handleFadeIn(); // initial check
