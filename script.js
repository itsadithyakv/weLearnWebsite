/* ---------------- SMOOTH TYPING EFFECT (no flicker, glowing, cursor) ---------------- */
const words = ["Leaders", "Creators", "Visionaries", "Innovators"];
const dyn = document.getElementById("dynamic-word");
const cursor = document.getElementById("cursor");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeSpeed = 110;
const eraseSpeed = 60;
const delayBetween = 1300;

function typeWord() {
  if (!dyn) return;

  const currentWord = words[wordIndex];

  // typing forward
  if (!isDeleting && charIndex <= currentWord.length) {
    dyn.textContent = currentWord.substring(0, charIndex);
    dyn.style.visibility = "visible";
    dyn.style.textShadow = "0 0 15px rgba(0,170,255,0.75)";
    dyn.style.color = "#00aaff";
    charIndex++;
    setTimeout(typeWord, typeSpeed);
  }

  // finished word → pause → start deleting
  else if (!isDeleting && charIndex > currentWord.length) {
    setTimeout(() => {
      isDeleting = true;
      typeWord();
    }, delayBetween);
  }

  // deleting
  else if (isDeleting && charIndex >= 0) {
    dyn.textContent = currentWord.substring(0, charIndex);
    charIndex--;
    setTimeout(typeWord, eraseSpeed);
  }

  // done deleting → move to next
  else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeWord, 400);
  }
}

window.addEventListener("load", () => {
  dyn.textContent = "";
  setTimeout(typeWord, 400);
});

/* Cursor blinking stays active */
setInterval(() => {
  if (cursor) cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
}, 600);

/* ---------- NAVBAR glass effect on scroll (works on all pages) ---------- */
const navbar = document.getElementById("navbar");

function handleNavScroll() {
  // Find hero section for any page
  const hero =
    document.querySelector(".hero") ||
    document.querySelector(".about-hero") ||
    document.querySelector(".team-hero") ||
    document.querySelector(".contact-hero");

  // If no hero found, just apply glass when scrolled past 80px
  if (!hero) {
    if (window.scrollY > 80) {
      navbar.classList.add("glass");
      navbar.classList.remove("transparent");
    } else {
      navbar.classList.remove("glass");
      navbar.classList.add("transparent");
    }
    return;
  }

  // Get the height of the hero to decide when to trigger the glass effect
  const heroHeight = hero.offsetHeight - 80;

  if (window.scrollY > heroHeight) {
    navbar.classList.add("glass");
    navbar.classList.remove("transparent");
  } else {
    navbar.classList.remove("glass");
    navbar.classList.add("transparent");
  }
}

// Run once after full load
window.addEventListener("load", handleNavScroll);
// Run when scrolling
window.addEventListener("scroll", handleNavScroll);
// Also run if window resizes
window.addEventListener("resize", handleNavScroll);


/* ---------------- DROPDOWN toggle (click - stays open until click outside) ---------------- */
const coursesBtn = document.getElementById("courses-btn");
const coursesMenu = document.getElementById("courses-menu");
const dropdown = document.getElementById("courses-dropdown");

function openDropdown() {
  coursesMenu.style.display = "block";
  coursesMenu.setAttribute("aria-hidden", "false");
  coursesBtn.setAttribute("aria-expanded", "true");
}

function closeDropdown() {
  coursesMenu.style.display = "none";
  coursesMenu.setAttribute("aria-hidden", "true");
  coursesBtn.setAttribute("aria-expanded", "false");
}

coursesBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (coursesMenu.style.display === "block") closeDropdown();
  else openDropdown();
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) closeDropdown();
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 600) closeDropdown();
});

/* ---------------- TESTIMONIAL CAROUSEL ---------------- */
const testimonialTrack = document.querySelector('.testimonial-track');
if(testimonialTrack){
  const testimonialItems = Array.from(testimonialTrack.children);
  const testimonialDotsContainer = document.querySelector('.testimonial-dots');
  let testimonialIndex = 0;
  const scrollInterval = 3500;
  let testimonialAutoScroll;

  // Create dots dynamically
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
    const cardWidth = testimonialItems[0].offsetWidth + 16; // 16 = gap between cards
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;

    const dots = Array.from(testimonialDotsContainer.children);
    dots.forEach(dot => dot.classList.remove('active'));
    dots[testimonialIndex].classList.add('active');
  }

  // Auto-scroll function
  function startAutoScroll() {
    testimonialAutoScroll = setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
      updateTestimonialCarousel();
    }, scrollInterval);
  }

  function resetTestimonialInterval() {
    clearInterval(testimonialAutoScroll);
    startAutoScroll();
  }

  // Initialize carousel
  updateTestimonialCarousel();
  startAutoScroll();

  // Optional: update on window resize to keep alignment
  window.addEventListener('resize', updateTestimonialCarousel);
}


/* ---------------- subtle parallax for doodles when mouse moves ---------------- */
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".doodle").forEach(d => {
    const speed = parseFloat(getComputedStyle(d).getPropertyValue('--speed')) || parseFloat(d.style.getPropertyValue('--speed')) || 10;
    // compute small translations
    const x = (e.clientX - window.innerWidth/2) / (window.innerWidth/2) * (speed * 0.6);
    const y = (e.clientY - window.innerHeight/2) / (window.innerHeight/2) * (speed * 0.35);
    d.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${d.style.getPropertyValue('--rot') || d.getAttribute('data-rot') || 0}deg)`;
  });

  // subtle tilt for collage cards when mouse over hero (only small)
  const collage = document.querySelector('.photo-collage');
  if(collage){
    const rect = collage.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const rx = (e.clientX - cx) / rect.width;
    const ry = (e.clientY - cy) / rect.height;
    collage.style.transform = `translateY(-50%) perspective(1400px) rotateX(${ry * 4}deg) rotateY(${rx * 6}deg)`;
  }
});
