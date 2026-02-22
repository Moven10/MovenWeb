document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".fade-item");

  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -120px 0px",
    }
  );

  items.forEach((item) => observer.observe(item));
});
