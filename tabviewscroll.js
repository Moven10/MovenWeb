document.addEventListener("DOMContentLoaded", () => {

  /* 🚫 FULLY DISABLE TABVIEW SCROLL ON IPHONE */
  if (window.innerWidth <= 430) {
    return; // 🔥 nothing runs on iPhone
  }

  const section = document.querySelector(".sneaker-preview-section");
  const track = document.querySelector(".tabview-track");
  const tabs = document.querySelectorAll(".tabview-tab");

  let currentTab = 0;
  let isLocked = false;
  let isThrottled = false;
  let touchStartY = null;
  let hasScrolledToLock = false;
  let lastScrollY = window.scrollY;

  const WHEEL_THRESHOLD = 25;
  const TOUCH_THRESHOLD = 40;
  const THROTTLE_TIME = 300;
  const LOCK_EPSILON = 2;
  const STICKY_OFFSET = 160;
  const STICKY_Y = () => section.offsetTop + STICKY_OFFSET;

  function setTabPosition() {
    const pct = currentTab * (100 / tabs.length);
    track.style.transform = `translateX(-${pct}%)`;
  }

  function handleTabScroll(delta) {
    if (delta > 0 && currentTab < tabs.length - 1) {
      currentTab++;
      setTabPosition();
      return true;
    }
    if (delta < 0 && currentTab > 0) {
      currentTab--;
      setTabPosition();
      return true;
    }
    return false;
  }

  function throttle() {
    isThrottled = true;
    clearTimeout(throttle._t);
    throttle._t = setTimeout(() => {
      isThrottled = false;
    }, THROTTLE_TIME);
  }

  function smoothScrollTo(targetY, duration = 500) {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const startTime = performance.now();

    function easeInOutCubic(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + diff * eased);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function crossedStickyPoint(prevY, currentY) {
    const sticky = STICKY_Y();
    return (
      (prevY < sticky - LOCK_EPSILON && currentY >= sticky - LOCK_EPSILON) ||
      (prevY > sticky + LOCK_EPSILON && currentY <= sticky + LOCK_EPSILON)
    );
  }

  function isFullyOutsideSection() {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const buffer = window.innerHeight * 0.5;

    return (
      window.scrollY < top - buffer ||
      window.scrollY > bottom + buffer
    );
  }

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const sticky = STICKY_Y();

    if (isFullyOutsideSection()) {
      hasScrolledToLock = false;
    }

    if (
      !isLocked &&
      !hasScrolledToLock &&
      crossedStickyPoint(lastScrollY, currentY)
    ) {
      smoothScrollTo(sticky, 500);
      isLocked = true;
      hasScrolledToLock = true;
    }

    if (
      !isLocked &&
      currentTab === tabs.length - 1 &&
      crossedStickyPoint(lastScrollY, currentY)
    ) {
      smoothScrollTo(sticky, 500);
      isLocked = true;
    }

    lastScrollY = currentY;
  });

  window.addEventListener("wheel", (e) => {
    if (!isLocked) return;

    const delta = e.deltaY;
    const absDelta = Math.abs(delta);
    const scrollingDown = delta > 0;
    const scrollingUp = delta < 0;
    const atFirstTab = currentTab === 0;
    const atLastTab = currentTab === tabs.length - 1;

    if ((scrollingDown && atLastTab) || (scrollingUp && atFirstTab)) {
      isLocked = false;
      return;
    }

    e.preventDefault();
    if (absDelta < WHEEL_THRESHOLD || isThrottled) return;

    const moved = handleTabScroll(delta);
    if (moved) throttle();
  }, { passive: false });

  window.addEventListener("touchstart", (e) => {
    if (!isLocked) return;
    touchStartY = e.touches[0].clientY;
  });

  window.addEventListener("touchmove", (e) => {
    if (!isLocked || touchStartY === null || isThrottled) return;

    const currentY = e.touches[0].clientY;
    const diff = touchStartY - currentY;
    const absDiff = Math.abs(diff);

    const scrollingDown = diff > 0;
    const scrollingUp = diff < 0;
    const atFirstTab = currentTab === 0;
    const atLastTab = currentTab === tabs.length - 1;

    if ((scrollingDown && atLastTab) || (scrollingUp && atFirstTab)) {
      isLocked = false;
      touchStartY = null;
      return;
    }

    e.preventDefault();
    if (absDiff < TOUCH_THRESHOLD) return;

    const moved = handleTabScroll(diff);
    if (moved) {
      touchStartY = currentY;
      throttle();
    }
  }, { passive: false });

});
