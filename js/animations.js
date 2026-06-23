// ===== PARALLAX HERO =====
const heroEl = document.querySelector('.premium-holidays:not(.premium-holidays--tours)');

if (heroEl && window.innerWidth > 768) {
  const updateHeroParallax = () => {
    const scrolled = window.scrollY;
    const rect = heroEl.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      heroEl.style.backgroundPositionY = `calc(50% + ${scrolled * 0.35}px)`;
    }
  };
  window.addEventListener('scroll', updateHeroParallax, { passive: true });
  updateHeroParallax();
}

// ===== PARALLAX ABOUT SECTION =====
const aboutBg = document.querySelector('.premium-holidays-desc-bg');

if (aboutBg && window.innerWidth > 768) {
  const updateAboutParallax = () => {
    const rect = aboutBg.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.12;
      aboutBg.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    }
  };
  window.addEventListener('scroll', updateAboutParallax, { passive: true });
  updateAboutParallax();
}

// ===== PARALLAX CARDS (лёгкое всплытие) =====
const cards = document.querySelectorAll('.news-events-item');

if (cards.length && window.innerWidth > 768) {
  const updateCardsParallax = () => {
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const progress = 1 - rect.top / window.innerHeight;
        const offset = Math.max(0, (0.5 - progress) * 30);
        const delay = i * 0.04;
        card.style.transform = `translateY(${offset * (1 - delay * 2)}px)`;
      }
    });
  };

  // Не переопределяем hover — сбрасываем parallax при hover
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', () => {
      updateCardsParallax();
    });
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

// Stagger delay for groups
document.querySelectorAll('.reveal-group').forEach(group => {
  group.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = `${i * 100}ms`;
  });
});
