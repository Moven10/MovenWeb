document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("pillSection");
  const imageWrapper = document.getElementById("backgroundPill");
  const image = imageWrapper?.querySelector(".pill-image");
  const snowSection = document.querySelector(".snow-sports-section");
  const footer = document.querySelector("footer");
  const extremeSection = document.getElementById("moreSports");

  if (!section || !imageWrapper || !image || !snowSection || !footer || !extremeSection) return;

  // ✅ Force start with image background
  document.body.classList.remove("footer-white-bg");
  imageWrapper.classList.remove("white-bg");

  let isLocked = false;
  let progress = 0;
  let hasScrolled = false;

  const maxProgress = 1.6;
  const speed = 0.015;

  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    isLocked = true;
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
    isLocked = false;
  };

  const updateImage = () => {
    const scale = 1 + progress * 0.8;
    const radius = Math.max(999 - progress * 999, 0);

    imageWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    imageWrapper.style.borderRadius = `${radius}px`;

    if (progress >= 1) {
      imageWrapper.classList.add("fullscreen");
      document.body.classList.add("pill-background-active");
      unlockScroll();
    } else {
      imageWrapper.classList.remove("fullscreen");
      document.body.classList.remove("pill-background-active");
    }

    if (progress <= 0) {
      progress = 0;
      imageWrapper.classList.remove("fullscreen", "white-bg");
      document.body.classList.remove("pill-background-active", "footer-white-bg");
      unlockScroll();
    }
  };

  // ✅ Sentinel helper
  const createSentinel = (id) => {
    const el = document.createElement("div");
    el.id = id;
    el.style.width = "100%";
    el.style.height = "1px";
    el.style.position = "relative";
    return el;
  };

  const sentinelAfterPill = createSentinel("sentinel-after-pill");
  section.parentNode.insertBefore(sentinelAfterPill, section.nextSibling);

  const sentinelSnowStart = createSentinel("sentinel-snow-start");
  snowSection.parentNode.insertBefore(sentinelSnowStart, snowSection);

  const sentinelAfterSnow = createSentinel("sentinel-after-snow");
  snowSection.parentNode.insertBefore(sentinelAfterSnow, snowSection.nextSibling);

  const sentinelFooter = createSentinel("sentinel-footer");
  footer.parentNode.insertBefore(sentinelFooter, footer);

  // ✅ Background control
  const updateBackground = (state) => {
    if (!hasScrolled) return;

    if (state === "white") {
      imageWrapper.classList.add("white-bg");
      document.body.classList.add("footer-white-bg");
    } else {
      imageWrapper.classList.remove("white-bg");
      document.body.classList.remove("footer-white-bg");
    }
  };

  // ✅ Intersection logic
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!hasScrolled) return;

        const id = entry.target.id;
        const visible = entry.isIntersecting;

        if (id === "sentinel-after-pill" && visible) {
          updateBackground("white");
        } else if (id === "sentinel-snow-start" && visible) {
          updateBackground("image");
        } else if (id === "sentinel-after-snow" && visible) {
          updateBackground("white");
        } else if (id === "sentinel-footer" && visible) {
          updateBackground("white");
        }
      });
    },
    { rootMargin: "0px", threshold: 0 }
  );

  observer.observe(sentinelAfterPill);
  observer.observe(sentinelSnowStart);
  observer.observe(sentinelAfterSnow);
  observer.observe(sentinelFooter);

  // ✅ Scroll lock for pill section
  const pillObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && progress < 1) {
          lockScroll();
        }
      });
    },
    { threshold: 0.6 }
  );
  pillObserver.observe(section);

  // ✅ Scroll control
  window.addEventListener(
    "wheel",
    (e) => {
      hasScrolled = true;

      const direction = Math.sign(e.deltaY);

      if (isLocked) {
        e.preventDefault();
        progress += direction * speed;
        progress = Math.max(0, Math.min(maxProgress, progress));
        updateImage();
        return;
      }

      const backgroundActive = document.body.classList.contains("pill-background-active");

      if (backgroundActive && direction < 0) {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop >= -10) {
          e.preventDefault();
          lockScroll();
          progress -= speed * 2;
          progress = Math.max(0, progress);
          updateImage();
        }
      }
    },
    { passive: false }
  );
});
