// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu (no 'hidden' attr reliance)
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  const closeMenu = () => { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden','true'); burger.setAttribute('aria-expanded','false'); };
  const openMenu  = () => { mobileMenu.classList.add('open'); mobileMenu.setAttribute('aria-hidden','false'); burger.setAttribute('aria-expanded','true'); };

  burger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  // Close on link click or escape
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  // Ensure closed on resize up
  window.addEventListener('resize', () => { if (window.innerWidth >= 920) closeMenu(); });
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// Waitlist AJAX (no redirect)
const form = document.getElementById('waitlist');
if(form){
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('waitlist-status');
    const btn = form.querySelector('button[type="submit"]');
    const data = new FormData(form);
    btn.disabled = true; btn.textContent = 'Sending…';
    if(status) status.textContent = 'Submitting…';
    try{
      const res = await fetch(form.action, { method:'POST', headers:{Accept:'application/json'}, body:data });
      if(res.ok){
        form.reset();
        btn.textContent = 'Joined';
        if(status) status.textContent = "You're on the list. We’ll email when units are ready.";
      }else{
        const out = await res.json().catch(()=>({}));
        const msg = (out.errors||[]).map(e=>e.message).join(', ') || 'Something went wrong.';
        if(status) status.textContent = msg;
        btn.textContent = 'Notify me'; btn.disabled = false;
      }
    }catch{
      if(status) status.textContent = 'Network error — please try again.';
      btn.textContent = 'Notify me'; btn.disabled = false;
    }
  });
}
