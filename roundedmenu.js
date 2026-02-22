// roundedmenu.js
document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".icon-option");
  const displayImage = document.getElementById("rounded-menu-image");

  // Map sport keys to image files
  const imageMap = {
    walk: "backmockup4.png",
    jog: "backmockup2.png",
    cycle: "backupmockup5.png",
    swim: "backmockup1.png",
    golf: "backmockup3.png"
  };

  options.forEach(option => {
    option.addEventListener("click", () => {
      // Reset all options
      options.forEach(opt => {
        opt.classList.remove("active");

        const imgEl = opt.querySelector("img");
        if (!imgEl) return;

        // Restore default icon
        const originalSrc = imgEl.src.replace("black.svg", ".svg");
        imgEl.src = originalSrc;
      });

      // Add active to clicked
      option.classList.add("active");

      const sport = option.getAttribute("data-sport");

      // Swap image
      if (imageMap[sport]) {
        displayImage.src = imageMap[sport];
      }

      // Swap icon to black version
      const imgEl = option.querySelector("img");
      if (imgEl) {
        const base = imgEl.src.replace(".svg", "");
        imgEl.src = base + "black.svg";
      }
    });
  });
});
