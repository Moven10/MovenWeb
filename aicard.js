// aicard.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".ai-card");
  const aiSection = document.querySelector(".ai-cards-section");

  if (!aiSection || cards.length === 0) return;

  // 1️⃣ Reveal cards when they enter view
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.5 }
  );

  cards.forEach((card) => cardObserver.observe(card));

  // 2️⃣ Detect when section fully enters & exits
  const sectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        // Section entering view — restore normal state
        aiSection.classList.remove("fade-to-black");

        // re‑reveal cards staggered
        cards.forEach((card, index) => {
          card.classList.remove("visible");
          setTimeout(() => {
            card.classList.add("visible");
          }, index * 100);
        });
      } else {
        // Section exited view — fade to black
        aiSection.classList.add("fade-to-black");

        // hide cards
        cards.forEach((card) => card.classList.remove("visible"));
      }
    },
    {
      root: null,
      threshold: 0,             // triggers when ANY part goes out of view
      rootMargin: "-20% 0px -80% 0px", // fires when scrolling past
    }
  );

  sectionObserver.observe(aiSection);
});
