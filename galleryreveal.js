// diveInScroll.js
document.addEventListener("scroll", () => {
  const panels = document.querySelectorAll(".dive-panel");
  const scrollTop = window.scrollY;
  const section = document.querySelector(".dive-in-next-section");
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  const progress = (scrollTop - sectionTop) / sectionHeight;
  const index = Math.floor(progress * panels.length);

  panels.forEach((panel, i) => {
    panel.classList.toggle("active", i === index);
  });
});
