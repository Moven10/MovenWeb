document.addEventListener("DOMContentLoaded", () => {
  const headline = document.getElementById("animatedHeadline");
  const words = headline.querySelectorAll(".word");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {

        // ✅ Trigger only when ~80% of the headline is visible
        if (entry.intersectionRatio > 0.8) {
          headline.classList.add("visible");

          words.forEach((word, index) => {
            setTimeout(() => {
              word.classList.add("visible");
            }, index * 200); // ⏱ Word-by-word delay
          });

          observer.unobserve(headline); // Run once
        }

      });
    },
    {
      threshold: [0, 0.2, 0.5, 0.8, 1]
    }
  );

  observer.observe(headline);
});
