document.addEventListener("DOMContentLoaded", function() {
    // Elements for Swiping Section
    const infoImage = document.getElementById("info-image");
    const dots = document.querySelectorAll(".dot");
    const exerciseTitle = document.getElementById("exercise-title");
    const exerciseDescription = document.getElementById("exercise-description");
    const learnMore = document.getElementById("learnMore");
    const downArrow = document.getElementById("downArrow");
    const infoSection = document.getElementById("info-section");

    let currentSlide = 0;

    const slides = [
        {
            image: "assets/section1.jpg",
            exerciseTitle: "More than tracking—this is movement redefined.",
            exerciseDescription: "Seamlessly move with your own Move Token for a more personal and connected experience."
        },
        {
            image: "assets/section2.jpg",
            exerciseTitle: "Move and Earn",
            exerciseDescription: "Every move brings you closer—track, push, and earn along the way"
        },
        {
            image: "assets/section3.jpg",
            exerciseTitle: "More Ways To Save",
            exerciseDescription: "Capture every session, save your progress, and relive your journey—one album at a time"
        }
    ];

    function updateSlide(index) {
        infoImage.src = slides[index].image;
        exerciseTitle.textContent = slides[index].exerciseTitle;
        exerciseDescription.textContent = slides[index].exerciseDescription;

        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");

        currentSlide = index;
    }

    let touchStartX = 0;

    document.addEventListener("touchstart", event => touchStartX = event.touches[0].clientX);
    document.addEventListener("touchend", event => {
        let touchEndX = event.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) currentSlide = (currentSlide + 1) % slides.length;
        else if (touchEndX - touchStartX > 50) currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    });

    // Scroll to info section when clicking "Learn More" or the down arrow
    function scrollToSection() {
        infoSection.scrollIntoView({ behavior: "smooth" });
    }

    learnMore.addEventListener("click", scrollToSection);
    downArrow.addEventListener("click", scrollToSection);

    updateSlide(0);

    // === Slide-Out Menu (With Larger X & Click-Outside Close) ===
    const menuButton = document.getElementById("menuButton");
    const closeMenuButton = document.getElementById("closeMenu"); // Static X button in HTML
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    function openMenu() {
        sideMenu.style.left = "0";
        menuOverlay.style.display = "block"; // Show overlay
    }

    function closeMenu() {
        sideMenu.style.left = "-250px";
        menuOverlay.style.display = "none"; // Hide overlay
    }

    // Open menu when clicking ☰ button
    menuButton.addEventListener("click", openMenu);
    
    // Close menu when clicking X button
    closeMenuButton.addEventListener("click", closeMenu);
    
    // Close menu when clicking outside (overlay)
    menuOverlay.addEventListener("click", closeMenu);
});
