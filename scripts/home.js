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

const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialItems = Array.from(testimonialTrack.children);
const testimonialDotsContainer = document.querySelector('.testimonial-dots');
let testimonialIndex = 0;
const scrollInterval = 3500;

// Create 6 dots
testimonialItems.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  testimonialDotsContainer.appendChild(dot);

  dot.addEventListener('click', () => {
    testimonialIndex = i;
    updateTestimonialCarousel();
    resetTestimonialInterval();
  });
});

function updateTestimonialCarousel() {
  const cardWidth = testimonialItems[0].offsetWidth + 16; // card width + gap
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;

  const dots = Array.from(testimonialDotsContainer.children);
  dots.forEach(dot => dot.classList.remove('active'));
  dots[testimonialIndex].classList.add('active');
}

// Auto-scroll
let testimonialAutoScroll = setInterval(() => {
  testimonialIndex++;
  if (testimonialIndex >= testimonialItems.length) testimonialIndex = 0;
  updateTestimonialCarousel();
}, scrollInterval);

function resetTestimonialInterval() {
  clearInterval(testimonialAutoScroll);
  testimonialAutoScroll = setInterval(() => {
    testimonialIndex++;
    if (testimonialIndex >= testimonialItems.length) testimonialIndex = 0;
    updateTestimonialCarousel();
  }, scrollInterval);
}

// Initial position
updateTestimonialCarousel();
