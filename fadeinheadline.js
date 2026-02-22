// fadeinheadline.js
document.addEventListener('DOMContentLoaded', () => {
 const messageHeadline = document.querySelector('.moven-message-heading');

 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 messageHeadline.classList.add('fade-in');
 observer.unobserve(entry.target); // 🔁 Only trigger once
 }
 },
 {
 threshold: 0.5 // Trigger when 50% visible
 }
 );

 if (messageHeadline) {
 observer.observe(messageHeadline);
 }
});
