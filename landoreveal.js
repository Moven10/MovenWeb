// landoreveal.js
document.addEventListener("DOMContentLoaded", () => {
  const headline = document.querySelector(".ai-cards-intro-headline");

  if (!headline) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        headline.classList.add("revealed");
        observer.unobserve(entry.target); // 🔁 trigger once
      }
    },
    {
      threshold: 0.4, // reveal when headline is nicely in view
    }
  );

  observer.observe(headline);
});
