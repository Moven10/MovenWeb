document.addEventListener("DOMContentLoaded", function() {
    // Elements for the Slide-Out Menu
    const menuButton = document.getElementById("menuButton");
    const closeMenuButton = document.getElementById("closeMenu"); // Static X button in HTML
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function openMenu() {
        sideMenu.style.left = "0";  // Moves the menu into view
        menuOverlay.style.display = "block"; // Show the dark overlay
        document.body.classList.add("menu-open"); // Prevent background scrolling
    }

    function closeMenu() {
        sideMenu.style.left = "-250px"; // Hides the menu
        menuOverlay.style.display = "none"; // Hide the dark overlay
        document.body.classList.remove("menu-open"); // Restore scrolling
    }

    // Open menu when clicking ☰ button
    menuButton.addEventListener("click", openMenu);
    
    // Close menu when clicking X button
    closeMenuButton.addEventListener("click", closeMenu);
    
    // Close menu when clicking outside (overlay)
    menuOverlay.addEventListener("click", closeMenu);

    // Close menu when pressing the Escape key
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
});
