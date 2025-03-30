document.addEventListener("DOMContentLoaded", function() {
    // === Slide-Out Menu (With Larger X & Click-Outside Close) ===
    const menuButton = document.getElementById("menuButton");
    const closeMenuButton = document.getElementById("closeMenu"); // Static X button in HTML
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function openMenu() {
        sideMenu.style.left = "0";
        menuOverlay.style.display = "block"; // Show overlay
        document.body.classList.add("menu-open"); // Prevent scrolling
    }

    function closeMenu() {
        sideMenu.style.left = "-250px";
        menuOverlay.style.display = "none"; // Hide overlay
        document.body.classList.remove("menu-open"); // Restore scrolling
    }

    // Open menu when clicking ☰ button
    menuButton.addEventListener("click", openMenu);
    
    // Close menu when clicking X button
    closeMenuButton.addEventListener("click", closeMenu);
    
    // Close menu when clicking outside (overlay)
    menuOverlay.addEventListener("click", closeMenu);
});
