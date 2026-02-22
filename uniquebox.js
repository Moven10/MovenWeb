document.addEventListener("DOMContentLoaded", function () {
  const toggleHeadlines = document.querySelectorAll(".toggle-headline");
  const allParagraphs = document.querySelectorAll(".unique-text");
  const uniqueBox = document.querySelector(".unique-box");

  // ✅ Image references
  const img1 = document.getElementById("img-1");
  const img2 = document.getElementById("img-2");

  // ✅ Hide all paragraphs initially
  allParagraphs.forEach((p) => {
    p.classList.add("unique-hidden");
  });

  // ✅ Show default paragraph
  const defaultParagraph = document.querySelector('[data-paragraph="default"]');
  if (defaultParagraph) {
    defaultParagraph.classList.remove("unique-hidden");
  }

  // 📏 Calculate max paragraph height for layout stability
  let maxParagraphHeight = 0;

  allParagraphs.forEach((p) => {
    const originalDisplay = p.style.display;
    const originalVisibility = p.style.visibility;
    const originalPosition = p.style.position;

    p.classList.remove("unique-hidden");
    p.style.visibility = "hidden";
    p.style.position = "absolute";
    p.style.display = "block";

    const height = p.offsetHeight;
    if (height > maxParagraphHeight) {
      maxParagraphHeight = height;
    }

    // Restore
    p.style.display = originalDisplay;
    p.style.visibility = originalVisibility;
    p.style.position = originalPosition;
    p.classList.add("unique-hidden");
  });

  // ✅ Re-show default paragraph
  if (defaultParagraph) {
    defaultParagraph.classList.remove("unique-hidden");
  }

  // ✅ Lock box height
  const buffer = 200;
  uniqueBox.style.minHeight = (maxParagraphHeight + buffer) + "px";

  // 🔁 Toggle + Image Swap Logic
  toggleHeadlines.forEach((headline) => {
    headline.addEventListener("click", () => {
      const target = headline.getAttribute("data-target");

      // ✅ Show correct paragraph only
      allParagraphs.forEach((p) => {
        if (p.getAttribute("data-paragraph") === target) {
          p.classList.remove("unique-hidden");
        } else {
          p.classList.add("unique-hidden");
        }
      });

      // ✅ Active headline state
      toggleHeadlines.forEach(h => h.classList.remove("active"));
      headline.classList.add("active");

      // 🔄 Swap images based on selected section
      if (target === "default") {
        img1.src = "Watchphoto.png";
        img2.src = "phonephoto.png";
      }

      if (target === "creator") {
        img1.src = "creator1.jpg";
        img2.src = "creator2.jpg";
      }

      if (target === "sports") {
        img1.src = "WalkerStroll.jpg";
        img2.src = "iosdisplay2.jpg";
      }
    });
  });
});
