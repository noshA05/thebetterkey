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

// Lightweight parallax (translateY based on scroll)
const pxEls = Array.from(document.querySelectorAll('[data-parallax]'));
function onScroll() {
  const scrollY = window.scrollY || window.pageYOffset;
  pxEls.forEach(el => {
    const strength = Number(el.getAttribute('data-parallax')) || 6; // px per 100px scroll
    el.style.transform = `translateY(${(scrollY * strength) / 100}px)`;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Waitlist form: AJAX submit with success / error message
const waitlist = document.getElementById("waitlist");
if (waitlist) {
  waitlist.addEventListener("submit", async (e) => {
    e.preventDefault();
    const statusEl = document.getElementById("waitlist-status");
    const btn = waitlist.querySelector('button[type="submit"]');
    const data = new FormData(waitlist);

    btn.disabled = true;
    btn.textContent = "Sending…";
    if (statusEl) statusEl.textContent = "Submitting…";

    try {
      const res = await fetch(waitlist.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      });

      if (res.ok) {
        waitlist.reset();
        if (statusEl) statusEl.textContent = "You're on the list. Check your email for confirmation.";
        btn.textContent = "Joined";
      } else {
        const out = await res.json().catch(() => ({}));
        const msg = out.errors?.map(e => e.message).join(", ") || "Something went wrong.";
        if (statusEl) statusEl.textContent = msg;
        btn.textContent = "Try again";
        btn.disabled = false;
      }
    } catch {
      if (statusEl) statusEl.textContent = "Network error — please try again.";
      btn.textContent = "Try again";
      btn.disabled = false;
    }
  });
}
