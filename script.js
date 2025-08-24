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
    const strength = Number(el.getAttribute('data-parallax')) || 8; // px per 100px scroll
    el.style.transform = `translateY(${(scrollY * strength) / 100}px)`;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
