// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Animate sections on scroll (fade-in)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

// Add observer to all sections with the .fade-section or tier panels
document.querySelectorAll(
  '.feature, .tier-panel, .about, .contact, .fade-section'
).forEach(section => {
  observer.observe(section);
});

// Optional: Fade out header title slightly on scroll (luxury touch)
const logo = document.querySelector('.fade-out-on-scroll');
if (logo) {
  window.addEventListener('scroll', () => {
    logo.style.opacity = Math.max(1 - window.scrollY / 200, 0.05);
  });
}
