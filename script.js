// ---------- Config ----------
const WAITLIST_URL = "https://buttondown.email/thebetterkey";
const FOLLOW_URL   = "https://instagram.com/thebetterkey";

// ---------- Footer year ----------
const yEl = document.getElementById('year');
if (yEl) yEl.textContent = new Date().getFullYear();

// ---------- Mobile menu (no 'hidden' attribute reliance) ----------
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden','true');
    burger.setAttribute('aria-expanded','false');
  };
  const openMenu = () => {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden','false');
    burger.setAttribute('aria-expanded','true');
  };
  burger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth >= 920) closeMenu(); });
}

// ---------- Smooth scroll for same-page anchors ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior:'smooth', block:'start' }); }
    }
  });
});

// ---------- Reveal on scroll (fast + subtle) ----------
const revealEls = Array.from(document.querySelectorAll('.reveal'));
if (revealEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

  revealEls.forEach(el => obs.observe(el));
}
