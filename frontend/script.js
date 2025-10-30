(function () {
  const body = document.body;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const navToggle = document.querySelector('.site-nav__toggle');
  const navLinks = document.querySelector('.site-nav__links');
  const filterButtons = document.querySelectorAll('.use-case__filters [data-filter]');
  const cards = document.querySelectorAll('.use-case__grid .card');
  const billingToggle = document.getElementById('billing-toggle');
  const priceLabels = document.querySelectorAll('.price');
  const accordionTriggers = document.querySelectorAll('.accordion__trigger');

  const THEME_KEY = 'gemini-nano-banana-theme';

  function applyTheme(theme) {
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(theme);
    const isDark = theme === 'theme-dark';
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.textContent = isDark ? 'Switch to light mode' : 'Toggle dark mode';
    }
  }

  function detectInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'theme-light' || stored === 'theme-dark') {
      return stored;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'theme-dark' : 'theme-light';
  }

  const initialTheme = detectInitialTheme();
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark';
      applyTheme(nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme);
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (filterButtons.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((btn) => {
          btn.classList.toggle('is-active', btn === button);
          btn.setAttribute('aria-checked', String(btn === button));
        });

        cards.forEach((card) => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.removeAttribute('hidden');
            requestAnimationFrame(() => card.classList.add('is-visible'));
          } else {
            card.classList.remove('is-visible');
            card.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  if (billingToggle && priceLabels.length) {
    billingToggle.addEventListener('change', () => {
      const annual = billingToggle.checked;
      priceLabels.forEach((label) => {
        const value = label.querySelector('.price__value');
        const suffix = label.querySelector('.price__suffix');
        if (!value || !suffix) return;
        const text = annual ? label.dataset.annual : label.dataset.monthly;
        value.textContent = text;
        suffix.textContent = text.includes('$') ? (annual ? '/yr' : '/mo') : '';
      });
    });
  }

  if (accordionTriggers.length) {
    accordionTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        const content = trigger.nextElementSibling;
        if (content) {
          if (expanded) {
            content.hidden = true;
          } else {
            content.hidden = false;
          }
        }
      });
    });
  }

  const sections = document.querySelectorAll('main section[id]');
  const navItems = document.querySelectorAll('.site-nav__links a');

  if (sections.length && navItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach((link) => {
              const isActive = link.getAttribute('href') === `#${id}`;
              link.classList.toggle('active', isActive);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  const animatedCards = document.querySelectorAll('.card');
  if (animatedCards.length) {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedCards.forEach((card) => reveal.observe(card));
  }

  const scrollButtons = document.querySelectorAll('[data-scroll]');
  scrollButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
