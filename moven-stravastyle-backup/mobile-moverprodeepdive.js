document.addEventListener("DOMContentLoaded", function() {
    // Select menu elements
    const menuButton = document.getElementById("menuButton");
    const closeMenuButton = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    const body = document.body; // For preventing scrolling when menu is open

    function openMenu() {
        sideMenu.style.left = "0";  // Slide menu in
        menuOverlay.style.display = "block";  // Show overlay
        body.classList.add("menu-open");  // Prevent background scroll
    }

    function closeMenu() {
        sideMenu.style.left = "-250px";  // Slide menu out
        menuOverlay.style.display = "none";  // Hide overlay
        body.classList.remove("menu-open");  // Allow scrolling again
    }

    // Open menu when clicking ☰ button
    menuButton.addEventListener("click", openMenu);
    
    // Close menu when clicking X button
    closeMenuButton.addEventListener("click", closeMenu);
    
    // Close menu when clicking outside (overlay)
    menuOverlay.addEventListener("click", closeMenu);
});
