document.addEventListener("DOMContentLoaded", () => {
  const stickyBar = document.getElementById("stickyTopBar");
  const navDefault = document.getElementById("stickyNavDefault");
  const navPull1 = document.getElementById("stickyNavPull1");
  const pullGear = document.getElementById("stickyPullGear");
  const notchIcon = document.getElementById("notchIcon");

  let currentStage = 0;
  let isAnimating = false;
  let currentImage = "IconCycle.svg";

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;

    // ✅ Show or hide sticky top bar based on scroll position
    if (scrollY > 800) {
      stickyBar.classList.add("show-full");
    } else {
      stickyBar.classList.remove("show-full");
    }

    const stage1Trigger = 2000;
    const stage2Trigger = 10000;

    let newStage;
    if (scrollY < stage1Trigger) newStage = 0;
    else if (scrollY < stage2Trigger) newStage = 1;
    else newStage = 2;

    if (newStage !== currentStage && !isAnimating) {
      handleStageChange(currentStage, newStage);
      currentStage = newStage;
    }
  });

  function handleStageChange(oldStage, newStage) {
    navDefault.style.display = "none";
    navPull1.style.display = "none";
    pullGear.style.display = "none";

    if (newStage === 0) navDefault.style.display = "flex";
    if (newStage === 1) navPull1.style.display = "flex";
    if (newStage === 2) pullGear.style.display = "flex";

    const targetImage = newStage === 2 ? "JoggerUltra.jpg" : "IconCycle.svg";

    if (targetImage === currentImage) return;

    animateIconChange(targetImage);
  }

  function animateIconChange(toUrl) {
    isAnimating = true;

    notchIcon.classList.remove("notch-enter-simple", "notch-exit-simple");
    void notchIcon.offsetWidth; // force reflow

    notchIcon.classList.add("notch-exit-simple");

    const onExit = (e) => {
      if (e.animationName !== "icon-exit") return;
      notchIcon.removeEventListener("animationend", onExit);

      notchIcon.style.backgroundImage = `url("${toUrl}")`;
      currentImage = toUrl;

      notchIcon.classList.remove("notch-exit-simple");
      void notchIcon.offsetWidth;

      notchIcon.classList.add("notch-enter-simple");

      const onEnter = (e) => {
        if (e.animationName !== "icon-enter") return;
        notchIcon.removeEventListener("animationend", onEnter);
        notchIcon.classList.remove("notch-enter-simple");
        isAnimating = false;
      };

      notchIcon.addEventListener("animationend", onEnter);
    };

    notchIcon.addEventListener("animationend", onExit);
  }

  // 🔗 Add navigation on icon click
  notchIcon.addEventListener("click", () => {
    if (currentImage.includes("Cycle")) {
      window.location.href = "index.html";
    } else if (currentImage.includes("Jogger")) {
      window.location.href = "movengear.html";
    }
  });
});
