document.addEventListener("DOMContentLoaded", () => {
  const blur = document.getElementById("pinkBlur");
  const signSection = document.getElementById("signUserSection");
  const topWrapper = document.getElementById("blurWrapper") || document.getElementById("topImagesWrapper");
  const bottomImages = document.getElementById("bottomImages");

  if (!blur || !signSection || !topWrapper || !bottomImages) {
    console.warn("Blur: missing required elements");
    return;
  }

  // Set initial hidden
  blur.style.opacity = "0";

  // Helper to position blur behind given element
  function positionBlur(el, scale = 1.3) {
    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY;
    const left = scrollY + rect.left + rect.width / 2;
    const top = scrollY + rect.top + rect.height / 2;

    blur.style.width = `${rect.width * scale}px`;
    blur.style.height = `${rect.height * scale}px`;
    blur.style.left = `${left}px`;
    blur.style.top = `${top}px`;
    blur.style.transform = `translate(-50%, -50%)`;
  }

  // Intersection Observer to detect entering / leaving sign‑user section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Fade in when section enters viewport
        blur.style.opacity = "1";
        positionBlur(topWrapper, 1.3);
      } else {
        // Fade out when leaving top of section
        blur.style.opacity = "0";
      }
    });
  }, {
    root: null,
    threshold: 0.1
  });

  observer.observe(signSection);

  // Listen to scroll to reposition blur when passing bottom images
  window.addEventListener("scroll", () => {
    const bottomRect = bottomImages.getBoundingClientRect();
    if (bottomRect.top < window.innerHeight * 0.75) {
      // bottom images are in view — reposition blur behind bottom images
      positionBlur(bottomImages, 1.2);
    }
  });
});
