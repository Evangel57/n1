// ===== PARALLAX TOURS BG =====
const toursBg = document.querySelector('main.full-bg');

if (toursBg && window.innerWidth > 768) {
  const updateToursBg = () => {
    toursBg.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.4}px)`;
  };
  window.addEventListener('scroll', updateToursBg, { passive: true });
  updateToursBg();
}

// ===== PARALLAX HERO =====
const heroEl = document.querySelector('.premium-holidays:not(.premium-holidays--tours)');

if (heroEl && window.innerWidth > 768) {
  const updateHeroParallax = () => {
    const scrolled = window.scrollY;
    const rect = heroEl.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      heroEl.style.backgroundPositionY = `calc(50% + ${scrolled * 0.55}px)`;
    }
  };
  window.addEventListener('scroll', updateHeroParallax, { passive: true });
  updateHeroParallax();
}

// ===== PARALLAX ABOUT BG =====
const aboutBg = document.querySelector('.premium-holidays-desc-bg');

if (aboutBg && window.innerWidth > 768) {
  const updateAboutParallax = () => {
    const rect = aboutBg.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.22;
      aboutBg.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    }
  };
  window.addEventListener('scroll', updateAboutParallax, { passive: true });
  updateAboutParallax();
}

// ===== PARALLAX CARDS =====
const cards = document.querySelectorAll('.news-events-item');

if (cards.length && window.innerWidth > 768) {
  const updateCardsParallax = () => {
    cards.forEach((card, i) => {
      if (card.matches(':hover')) return;
      const rect = card.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const progress = rect.top / window.innerHeight;
        const offset = Math.max(0, progress * 28) - i * 3;
        card.style.transform = `translateY(${offset}px)`;
      }
    });
  };

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', updateCardsParallax);
  });

  window.addEventListener('scroll', updateCardsParallax, { passive: true });
  updateCardsParallax();
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = entry.target.dataset.delay || '0ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.reveal-group').forEach(group => {
  group.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = `${i * 100}ms`;
  });
});
