document.addEventListener("DOMContentLoaded", () => {
  const introSection = document.querySelector(".MoverProIntro");
  const content = introSection.querySelector(".moverpro-content");
  const images = introSection.querySelectorAll(".moverpro-image, .mockup-image");
  const introHeight = introSection.offsetHeight;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // 🔁 Fade starts even later ↓
    let progress = (scrollY - introHeight * 1.2) / (introHeight * 0.6);

    // Clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    // Apply fading
    introSection.style.backgroundColor = `rgba(255, 255, 255, ${progress})`;
    content.style.opacity = 1 - progress;
    images.forEach(img => {
      img.style.opacity = 1 - progress;
    });
  });
});
