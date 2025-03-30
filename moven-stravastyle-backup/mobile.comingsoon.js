document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const closeMenuButton = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function openMenu() {
        sideMenu.style.left = "0"; // Slide in menu
        menuOverlay.style.display = "block"; // Show overlay
    }

    function closeMenu() {
        sideMenu.style.left = "-250px"; // Slide out menu
        menuOverlay.style.display = "none"; // Hide overlay
    }

    // Open menu when clicking ☰ button
    menuButton.addEventListener("click", openMenu);

    // Close menu when clicking X button
    closeMenuButton.addEventListener("click", closeMenu);

    // Close menu when clicking outside (overlay)
    menuOverlay.addEventListener("click", closeMenu);
});
