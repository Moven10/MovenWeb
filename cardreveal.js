document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".gear-card-fan-layout");
  const detailViews = document.querySelectorAll(".gear-card-detail-view");
  const tokenSection = document.querySelector(".token-info-section");

  if (!section || detailViews.length === 0 || !tokenSection) return;

  const revealOrder = [
    '[data-index="3"]',
    '[data-index="2"]',
    '[data-index="4"]',
    '[data-index="1"]',
    '[data-index="5"]',
    '[data-index="0"]',
    '[data-index="6"]',
  ];

  const cards = revealOrder
    .map(selector => section.querySelector(selector))
    .filter(Boolean);

  let isVisible = false;

  const revealCards = () => {
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add("reveal"), i * 180);
    });
  };

  const unrevealCards = () => {
    cards.slice().reverse().forEach((card, i) => {
      setTimeout(() => card.classList.remove("reveal"), i * 120);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const anyDetailVisible = Array.from(detailViews).some(view =>
        view.classList.contains("visible")
      );

      if (entry.isIntersecting && !isVisible && !anyDetailVisible) {
        isVisible = true;
        revealCards();
      } else if (!entry.isIntersecting && isVisible) {
        isVisible = false;
        unrevealCards();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const index = card.getAttribute("data-index");
      const headline = card.querySelector(".card-headline")?.textContent;
      const body = card.querySelector(".card-body")?.textContent;
      const imgSrc = card.querySelector(".card-image")?.getAttribute("src");

      if (!index || !headline || !body || !imgSrc) return;

      const detailView = document.querySelector(
        `.gear-card-detail-view[data-index="${index}"]`
      );
      const imagePreview = detailView?.querySelector(".detail-image-preview");
      const imageTag = imagePreview?.querySelector("img");
      const detailHeadline = detailView?.querySelector(".detail-headline");
      const detailBody = detailView?.querySelector(".detail-body");

      if (!detailView || !imagePreview || !imageTag || !detailHeadline || !detailBody) return;

      // Hide all other detail views
      detailViews.forEach(view => view.classList.remove("visible"));

      unrevealCards();

      setTimeout(() => {
        detailHeadline.textContent = headline;
        detailBody.textContent = body;
        imageTag.src = imgSrc;

        detailView.classList.add("visible");
        imagePreview.classList.add("visible");

        // ✅ EXPAND TOKEN SECTION HEIGHT
        tokenSection.style.minHeight = "960px";

        // ✅ MOVE ENTIRE FAN LAYOUT UP
        section.classList.add("shift-up");
      }, cards.length * 120 + 200);
    });
  });

  detailViews.forEach(view => {
    const imagePreview = view.querySelector(".detail-image-preview");
    if (imagePreview) {
      imagePreview.addEventListener("click", () => {
        view.classList.remove("visible");
        imagePreview.classList.remove("visible");

        setTimeout(() => {
          revealCards();

          // ✅ RESTORE HEIGHT
          tokenSection.style.minHeight = "600px";

          // ✅ MOVE FAN BACK DOWN
          section.classList.remove("shift-up");
        }, 300);
      });
    }
  });
});
