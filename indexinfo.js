document.addEventListener('DOMContentLoaded', () => {
  const headline = document.getElementById('scrollHeadline');
  const gradient = headline?.querySelector('.gradient-text');

  if (!headline || !gradient) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            gradient.classList.add('active');
          }, 500);
          observer.unobserve(headline);
        }
      });
    },
    { threshold: 0.6 }
  );

  observer.observe(headline);
});
