// ===== EVENT TICKER =====
(function () {
  const ticker = document.getElementById('eventTicker');
  const closeBtn = document.getElementById('tickerClose');
  const track = document.getElementById('tickerTrack');
  if (!ticker) return;

  // Restore dismissed state
  if (localStorage.getItem('tickerClosed') === '1') {
    ticker.classList.add('ticker-hidden');
  } else {
    document.body.classList.add('has-ticker');
    // Duplicate track content for seamless infinite scroll
    if (track) track.innerHTML += track.innerHTML;
  }

  closeBtn?.addEventListener('click', () => {
    ticker.classList.add('ticker-hidden');
    document.body.classList.remove('has-ticker');
    localStorage.setItem('tickerClosed', '1');
  });
})();

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.querySelector('.mobile-menu-close');

hamburger?.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu || e.target.tagName === 'A') mobileMenu.classList.remove('open');
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  revealObserver.observe(el);
});

// Stagger children
document.querySelectorAll('.stagger-children').forEach(parent => {
  parent.querySelectorAll(':scope > *').forEach((child, i) => {
    child.classList.add('reveal');
    child.dataset.delay = i * 120;
    revealObserver.observe(child);
  });
});

// ===== MENU TABS =====
const tabs = document.querySelectorAll('.menu-tab');
const categories = document.querySelectorAll('.menu-category');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    categories.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector(`[data-category="${target}"]`)?.classList.add('active');
  });
});

// ===== COUNT UP ANIMATION =====
function animateCount(el, target, suffix = '') {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      animateCount(el, target, suffix);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

// ===== SMOOTH SCROLL FOR ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CHARGING ANIMATION =====
let pct = 0;
const pctEl = document.querySelector('.charge-pct');
if (pctEl) {
  setInterval(() => {
    pct = (pct + 1) % 101;
    pctEl.textContent = pct + '%';
  }, 120);
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => navObserver.observe(s));
