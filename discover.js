// discover.js — smooth reveal with zoom AND fallback reveal logic
document.addEventListener('DOMContentLoaded', () => {
  const transitionSection = document.getElementById('transitionSection');
  const transitionImage   = document.getElementById('transitionImage');
  const sportsSection     = document.getElementById('sportsSection');
  const moverProSection   = document.getElementById('moverproSection');
  const signUserSection   = document.getElementById('signUserSection');

  if (!transitionSection || !transitionImage) {
    console.warn('Missing required elements — transition disabled');
    return;
  }

  const minScale = 1;
  const maxScale = 1.4;
  const expandWidthAt = 0.75; // when width expansion begins
  const revealClass = 'revealed';
  const revealSections = [sportsSection, moverProSection, signUserSection];

  let ticking = false;

  function applyZoom() {
    ticking = false;

    const rect = transitionSection.getBoundingClientRect();
    const vh = window.innerHeight;
    const sectionHeight = transitionSection.offsetHeight;

    const scrollIn = Math.max(0, vh - rect.top);
    const progress = Math.min(1, scrollIn / sectionHeight);

    // Zoom scale
    const scale = minScale + (maxScale - minScale) * progress;
    transitionImage.style.transform = `scale(${scale})`;

    // Expand image if past threshold
    if (progress >= expandWidthAt) {
      transitionImage.classList.add('expanded');
    } else {
      transitionImage.classList.remove('expanded');
    }

    // Check for full-width OR fallback: section is visible in viewport
    const imgRect = transitionImage.getBoundingClientRect();
    const isFullWidth = imgRect.width >= window.innerWidth * 0.99;

    revealSections.forEach(section => {
      if (!section) return;

      const secRect = section.getBoundingClientRect();
      const isInView = secRect.top < window.innerHeight * 0.9;

      if (isFullWidth || isInView) {
        section.classList.add(revealClass);
      } else {
        section.classList.remove(revealClass);
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(applyZoom);
      ticking = true;
    }
  });

  // Initial trigger in case user reloads mid-scroll
  applyZoom();
});