document.addEventListener("DOMContentLoaded", function() {
    // Menu Elements
    const menuButton = document.getElementById("menuButton");
    const closeMenuButton = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function openMenu() {
        sideMenu.style.left = "0"; // Slide menu in
        menuOverlay.style.display = "block"; // Show overlay
        document.body.classList.add("menu-open"); // Prevent background scrolling
    }

    function closeMenu() {
        sideMenu.style.left = "-250px"; // Slide menu out
        menuOverlay.style.display = "none"; // Hide overlay
        document.body.classList.remove("menu-open");
    }

    // Open menu when clicking ☰ button
    menuButton.addEventListener("click", openMenu);
    
    // Close menu when clicking X button
    closeMenuButton.addEventListener("click", closeMenu);
    
    // Close menu when clicking outside (overlay)
    menuOverlay.addEventListener("click", closeMenu);

    // Close menu with Escape key
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") closeMenu();
    });
});
