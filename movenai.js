// Fade In/Out on Scroll for sections with .fade-on-scroll
document.addEventListener('DOMContentLoaded', () => {
  const fadeSections = document.querySelectorAll('.fade-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      } else {
        entry.target.classList.remove('fade-in');
      }
    });
  }, {
    threshold: 0.3 // Trigger when 30% of the element is in view
  });

  fadeSections.forEach((section) => observer.observe(section));
});