document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".inspire-section .block");
  const titles = document.querySelectorAll(".block-title");

  const defaultFlex = [2, 1.2, 1];

  let resetTimer = null;

  titles.forEach((title, index) => {
    const block = blocks[index];

    title.addEventListener("mouseenter", () => {
      clearTimeout(resetTimer); // cancel previous reset if hovering quickly again

      blocks.forEach((b, i) => {
        b.style.transition = "flex 0.4s ease";
        b.style.flex = i === index ? "0.7" : "1.4";
      });
    });

    title.addEventListener("mouseleave", () => {
      resetTimer = setTimeout(() => {
        blocks.forEach((b, i) => {
          b.style.flex = defaultFlex[i];
        });
      }, 150); // slight delay prevents flicker when moving fast between words
    });
  });
});
