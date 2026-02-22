// movengear.js
document.addEventListener('DOMContentLoaded', () => {
  const gearSection = document.querySelector('.gearview-section');
  const highlightImg = document.querySelector('.gear-highlight-img');
  const nextSection = document.getElementById('built-for-real-section');

  if (!gearSection || !highlightImg || !nextSection) {
    console.error('Required elements missing:', { gearSection, highlightImg, nextSection });
    return;
  }

  let zoomActive = false;
  let zoomProgress = 0;

  const SCROLL_RANGE = 700;   // px scroll to go from start → full zoom
  const MAX_SCALE = 2.2;
  const MAX_TRANSLATE = 240;

  function onScroll() {
    if (zoomActive) return;

    const rect = gearSection.getBoundingClientRect();
    const bottomPos = rect.bottom;
    const vh = window.innerHeight;

    // Debug logging
    // console.log('onScroll: gear bottom →', bottomPos, 'viewport height →', vh);

    // Trigger zoom mode when the bottom of gearSection enters view (or above)
    if (bottomPos <= vh + 1) {
      console.log('🟢 Trigger activateZoomMode()');
      activateZoomMode();
    }
  }

  function onWheel(e) {
    if (!zoomActive) return;
    e.preventDefault();

    zoomProgress += e.deltaY / SCROLL_RANGE;
    zoomProgress = Math.max(0, Math.min(zoomProgress, 1));

    // Debug logging
    console.log('⏩ zoomProgress =', zoomProgress.toFixed(3));

    applyTransform(zoomProgress);

    if (zoomProgress >= 1) {
      console.log('✅ Full zoom achieved — finishing zoom');
      finishZoom();
    }
  }

  function applyTransform(progress) {
    const scale = 1 + (MAX_SCALE - 1) * progress;
    const translateY = MAX_TRANSLATE * progress;

    highlightImg.style.transform = `
      translateX(-50%)
      scale(${scale})
      translateY(${translateY}px)
    `;
  }

  function activateZoomMode() {
    zoomActive = true;
    highlightImg.classList.add('bg-active');

    // Lock page scroll temporarily
    document.body.style.overflow = 'hidden';

    window.addEventListener('wheel', onWheel, { passive: false });
    console.log('🔒 Zoom mode activated, waiting for wheel scroll to zoom.');
  }

  function finishZoom() {
    document.body.style.overflow = '';
    window.removeEventListener('wheel', onWheel, { passive: false });

    // Reveal next section
    nextSection.classList.add('active');
    console.log('➡️ Revealed next section.');
  }

  function resetZoom() {
    zoomActive = false;
    zoomProgress = 0;
    highlightImg.classList.remove('bg-active');
    highlightImg.style.transform = '';
    nextSection.classList.remove('active');
    console.log('🔄 Zoom reset.');
  }

  // If you want reset on scroll-up or similar, you can hook here
  // optionally add scroll-up detection...

  window.addEventListener('scroll', onScroll);
  console.log('⚙️ movengear.js initialized');
});
