document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product-item .product-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const parent = card.closest(".product-item");

      // Deactivate other cards
      document.querySelectorAll(".product-item").forEach(item => {
        if (item !== parent) item.classList.remove("active");
      });

      // Toggle this card
      parent.classList.toggle("active");
    });
  });
});
