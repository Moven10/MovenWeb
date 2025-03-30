document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const closeMenu = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    // Function to open the menu
    function openMenu() {
        sideMenu.style.left = "0";
        menuOverlay.style.display = "block";
        document.body.classList.add("menu-open"); // Prevent scrolling
    }

    // Function to close the menu
    function closeSideMenu() {
        sideMenu.style.left = "-250px";
        menuOverlay.style.display = "none";
        document.body.classList.remove("menu-open"); // Enable scrolling again
    }

    // Open menu when clicking the menu button
    menuButton.addEventListener("click", openMenu);

    // Close menu when clicking the close button
    closeMenu.addEventListener("click", closeSideMenu);

    // Close menu when clicking the overlay
    menuOverlay.addEventListener("click", closeSideMenu);
});
