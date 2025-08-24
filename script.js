// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const revealEls = document.querySelectorAll('[data-reveal]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Lightweight parallax (disabled on small screens to avoid weird tier behavior)
function parallaxEnabled() { return window.matchMedia('(min-width: 780px)').matches; }
const pxEls = Array.from(document.querySelectorAll('[data-parallax]'));
function onScroll() {
  if (!parallaxEnabled()) {
    pxEls.forEach(el => el.style.transform = 'none');
    return;
  }
  const y = window.scrollY || window.pageYOffset;
  pxEls.forEach(el => {
    const strength = Number(el.getAttribute('data-parallax')) || 6;
    el.style.transform = `translateY(${(y * strength) / 100}px)`;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

// Waitlist form: AJAX submit with success / error message (no redirect)
const form = document.getElementById("waitlist");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const statusEl = document.getElementById("waitlist-status");
    const btn = form.querySelector('button[type="submit"]');
    const data = new FormData(form);

    btn.disabled = true;
    btn.textContent = "Sending…";
    if (statusEl) statusEl.textContent = "Submitting…";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      });

      if (res.ok) {
        form.reset();
        if (statusEl) statusEl.textContent = "You're on the list. We’ll email when units are ready.";
        btn.textContent = "Joined";
      } else {
        const out = await res.json().catch(() => ({}));
        const msg = out.errors?.map(e => e.message).join(", ") || "Something went wrong.";
        if (statusEl) statusEl.textContent = msg;
        btn.textContent = "Notify me";
        btn.disabled = false;
      }
    } catch {
      if (statusEl) statusEl.textContent = "Network error — please try again.";
      btn.textContent = "Notify me";
      btn.disabled = false;
    }
  });
}
