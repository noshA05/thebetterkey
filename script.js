// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = !mobileMenu.hasAttribute('hidden');
    if (open) mobileMenu.setAttribute('hidden', '');
    else mobileMenu.removeAttribute('hidden');
    burger.setAttribute('aria-expanded', String(!open));
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.setAttribute('hidden',''); burger.setAttribute('aria-expanded','false');
  }));
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

// Parallax (desktop only to avoid mobile jank)
const pxEls = Array.from(document.querySelectorAll('[data-parallax]'));
function parallaxOK(){ return window.matchMedia('(min-width: 980px)').matches; }
function onScroll(){
  if(!parallaxOK()){ pxEls.forEach(el => el.style.transform='none'); return; }
  const y = window.scrollY || window.pageYOffset;
  pxEls.forEach(el => {
    const s = Number(el.getAttribute('data-parallax')) || 6;
    el.style.transform = `translateY(${(y * s)/100}px)`;
  });
}
window.addEventListener('scroll', onScroll, { passive:true });
window.addEventListener('resize', onScroll);
onScroll();

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
