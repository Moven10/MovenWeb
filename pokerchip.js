// pokerchip.js
document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".goal-chip");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          chips.forEach((chip, i) => {
            setTimeout(() => {
              chip.classList.add("revealed");
            }, i * 150); // stagger timing
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const chipGroup = document.querySelector(".poker-chip-group");
  if (chipGroup) observer.observe(chipGroup);
});
