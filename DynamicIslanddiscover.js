document.addEventListener("DOMContentLoaded", function () {
  const stickyBar = document.getElementById("stickyTopBar");
  const footer = document.querySelector(".minimal-footer");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY || window.pageYOffset;
    const triggerFull = window.innerHeight * 0.6;
    const triggerCompact = window.innerHeight * 1.4;

    // Handle sticky states
    if (scrollY > triggerCompact) {
      // Switch to compact mode
      stickyBar.classList.remove("show-full");
      stickyBar.classList.add("show-compact");
    } else if (scrollY > triggerFull) {
      // Show full notch
      stickyBar.classList.add("show-full");
      stickyBar.classList.remove("show-compact");
    } else {
      // Hide both
      stickyBar.classList.remove("show-full", "show-compact");
    }

    // Toggle footer visibility
    if (scrollY > triggerFull) {
      document.body.classList.add("hide-footer");
      footer.style.transition = "all 0.4s ease";
      footer.style.opacity = "0";
      footer.style.transform = "translateY(30px)";
    } else {
      document.body.classList.remove("hide-footer");
      footer.style.opacity = "1";
      footer.style.transform = "translateY(0)";
    }
  });
});
