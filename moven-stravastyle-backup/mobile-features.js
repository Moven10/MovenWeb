document.addEventListener("DOMContentLoaded", () => {
    // MENU FUNCTIONALITY
    const menuButton = document.getElementById("menuButton");
    const closeMenu = document.getElementById("closeMenu");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function openMenu() {
        sideMenu.style.left = "0"; // Slide menu into view
        menuOverlay.style.display = "block"; // Show overlay
        document.body.classList.add("menu-open"); // Prevent scrolling
    }

    function closeSideMenu() {
        sideMenu.style.left = "-250px"; // Slide menu out of view
        menuOverlay.style.display = "none"; // Hide overlay
        document.body.classList.remove("menu-open");
    }

    // Event Listeners for opening and closing menu
    menuButton.addEventListener("click", openMenu);
    closeMenu.addEventListener("click", closeSideMenu);
    menuOverlay.addEventListener("click", closeSideMenu);

    // IMAGE SLIDER FUNCTIONALITY
    const images = ["96s.jpg", "96s1.jpg", "96.jpg"];
    let index = 0;
    const changingImage = document.getElementById("changing-image");

    function changeImage() {
        changingImage.style.opacity = 0; // Fade out effect
        setTimeout(() => {
            changingImage.src = images[index];
            changingImage.style.opacity = 1; // Fade in effect
            index = (index + 1) % images.length; // Loop through images
        }, 500); // Delay matches CSS transition
    }

    setInterval(changeImage, 5000); // Change image every 5 seconds

    // Smooth image transition
    changingImage.style.transition = "opacity 0.5s ease-in-out";
});
