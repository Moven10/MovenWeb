document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("intro-splash");
  const progress = document.querySelector(".loading-progress");

  const LOAD_TIME = 2200;
  const FADE_TIME = 1200;

  // Only show splash on first visit
  const hasSeenSplash = sessionStorage.getItem("movenSplashSeen");

  if (hasSeenSplash) {
    splash.remove(); // Skip splash immediately
    return;
  }

  // Otherwise, show it and mark as seen
  sessionStorage.setItem("movenSplashSeen", "true");

  // Animate loading bar
  requestAnimationFrame(() => {
    progress.style.transition = `width ${LOAD_TIME}ms linear`;
    progress.style.width = "100%";
  });

  // Fade out after loading completes
  setTimeout(() => {
    splash.classList.add("fade-out");
  }, LOAD_TIME);

  // Remove splash from DOM after fade
  setTimeout(() => {
    splash.remove();
  }, LOAD_TIME + FADE_TIME);
});
