// ===== PARALLAX =====
const heroEl = document.querySelector('.premium-holidays:not(.premium-holidays--tours)');

if (heroEl && window.innerWidth > 768) {
  const updateParallax = () => {
    const scrolled = window.scrollY;
    const rect = heroEl.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      heroEl.style.backgroundPositionY = `calc(50% + ${scrolled * 0.35}px)`;
    }
  };
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = entry.target.dataset.delay || '0ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Stagger delay for groups
document.querySelectorAll('.reveal-group').forEach(group => {
  group.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = `${i * 100}ms`;
  });
});
