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

// scroll-fade.js
const cards = document.querySelectorAll('.feature-card');

function fadeInOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll); // trigger on page load
