// Pathline.js
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".scroll-lock-section");
  const path = document.getElementById("scroll-line");
  const textBlock = document.querySelector(".dive-in-text");

  if (!section || !path || !textBlock) return;

  const pathLength = path.getTotalLength();
  path.style.strokeDasharray = pathLength;
  path.style.strokeDashoffset = pathLength;

  let scrollProgress = 0;
  const maxScroll = window.innerHeight * 1.5;
  let isActive = false;
  let lastScrollY = window.scrollY;

  function lockScroll() {
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.overflow = "";
  }

  function handleScroll(e) {
    e.preventDefault();

    scrollProgress += e.deltaY;
    scrollProgress = Math.max(0, Math.min(maxScroll, scrollProgress));

    const draw = (pathLength * scrollProgress) / maxScroll;
    path.style.strokeDashoffset = pathLength - draw;

    if (scrollProgress > 40) {
      textBlock.classList.add("show-headline");
    } else {
      textBlock.classList.remove("show-headline");
    }

    if (scrollProgress > maxScroll * 0.2) {
      textBlock.classList.add("show-paragraph");
    } else {
      textBlock.classList.remove("show-paragraph");
    }

    if (scrollProgress === maxScroll || scrollProgress === 0) {
      unlockScroll();
      window.removeEventListener("wheel", handleScroll);
      isActive = false;
    }
  }

  function startPathlineAnimation() {
    scrollProgress = Math.max(0, Math.min(maxScroll, scrollProgress));
    lockScroll();
    isActive = true;
    window.addEventListener("wheel", handleScroll, { passive: false });
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;
      lastScrollY = currentScrollY;

      if (entry.isIntersecting && isScrollingDown && !isActive) {
        startPathlineAnimation();
      }
    },
    {
      rootMargin: "-5% 0px -90% 0px", // Trigger later when scrolling down
    }
  );

  observer.observe(section);
});
