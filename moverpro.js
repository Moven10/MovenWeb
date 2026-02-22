document.addEventListener("DOMContentLoaded", () => {
  const cardHand = document.getElementById("moverproCardHand");
  const cards = cardHand ? cardHand.querySelectorAll(".card-image") : [];
  const blurBg = document.getElementById("moverproBlurBg");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Scrolled into view — fan out cards
          cardHand.classList.add("visible");
          cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 120}ms`;
            card.classList.add("card-animate-in");
            card.classList.remove("card-animate-out");
          });

          // Move blur background down slightly
          if (blurBg) {
            blurBg.style.transform = "translateY(200px)";
          }
        } else {
          // Scrolled out of view — fold cards back
          cards.forEach((card, i) => {
            card.style.transitionDelay = `${(cards.length - i - 1) * 120}ms`;
            card.classList.add("card-animate-out");
            card.classList.remove("card-animate-in");
          });

          // Reset blur background
          if (blurBg) {
            blurBg.style.transform = "translateY(0)";
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  if (cardHand) observer.observe(cardHand);
});
