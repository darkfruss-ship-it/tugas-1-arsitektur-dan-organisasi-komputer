const loader = document.querySelector('.page-loader');
window.addEventListener('load', () => {
  setTimeout(() => loader?.classList.add('done'), 350);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Gentle cinematic parallax for full-bleed image sections.
const parallaxSections = document.querySelectorAll('.hero, .feature-image, .outro');
let ticking = false;
function updateParallax() {
  const vh = window.innerHeight;
  parallaxSections.forEach(section => {
    const img = section.querySelector('.hero-bg img, .feature-bg, .outro-bg');
    if (!img) return;
    const rect = section.getBoundingClientRect();
    const progress = (vh - rect.top) / (vh + rect.height);
    const offset = (progress - 0.5) * -26;
    img.style.transform = `scale(1.045) translate3d(0, ${offset}px, 0)`;
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
}, { passive: true });
updateParallax();

// Active navigation state.
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => navObserver.observe(section));
