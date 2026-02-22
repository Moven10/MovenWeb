// text-fade-in.js

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  document
    .querySelectorAll(".fade-on-scroll, .new-sports-bold, .new-sports-side-headline")
    .forEach(el => observer.observe(el));
});
