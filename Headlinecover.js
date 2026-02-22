document.addEventListener('DOMContentLoaded', () => {
 const highlight = document.querySelector('.snow-highlight');
 const moveText = document.querySelector('.move-pro-text');
 const section = document.querySelector('.snow-tagline-wrapper');

 if (highlight && section && moveText) {
 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 highlight.classList.add('active-highlight');
 setTimeout(() => {
 moveText.classList.add('active-blue');
 }, 1500); // wait for highlight to finish
 } else {
 highlight.classList.remove('active-highlight');
 moveText.classList.remove('active-blue');
 }
 },
 {
 threshold: 0.6
 }
 );

 observer.observe(section);
 }
});
