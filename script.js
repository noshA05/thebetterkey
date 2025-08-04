// Fade-in on scroll
const fadeInElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeInElements.forEach(el => observer.observe(el));

// Scroll logo fade
const logo = document.querySelector('.fade-out-on-scroll');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  logo.style.opacity = Math.max(1 - scrollY / 150, 0);
});
