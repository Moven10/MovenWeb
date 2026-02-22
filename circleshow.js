document.addEventListener("DOMContentLoaded", () => {
  const group = document.querySelector(".subscribe-circle-group");
  const circles = group ? [...group.querySelectorAll(".circle")] : [];

  if (!group || circles.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        circles.forEach((circle, i) => {
          setTimeout(() => {
            circle.classList.add("visible");
          }, i * 200);
        });
        obs.unobserve(group);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(group);
});
