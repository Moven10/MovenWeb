document.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY; // Track scroll position

    // Select the images for the existing parallax effect
    const mainFeature = document.querySelector(".main-feature");
    const supportingFeature = document.querySelector(".supporting-feature");

    // Adjust the transform for existing images based on scroll position
    mainFeature.style.transform = `translateY(${scrollPosition * 0.2}px)`; // Moves downward
    supportingFeature.style.transform = `translateY(${-scrollPosition * 0.2}px)`; // Moves upward

    // Parallax effect for heart rate image (74)
    const heartRateImageRight = document.querySelector(".heart-rate-image-right");
    heartRateImageRight.style.transform = `translateY(${-scrollPosition * 0.3}px)`; // Moves upward

    // NEW: Add parallax effect for image 93, but only when its section is in view
    const newRecordSection = document.querySelector(".new-record-content"); // Section containing the image
    const newRecordImage = document.querySelector(".new-record-image img:first-child"); // The 93.jpg image

    const sectionTop = newRecordSection.getBoundingClientRect().top; // Get section's top position relative to viewport
    const sectionBottom = newRecordSection.getBoundingClientRect().bottom; // Get section's bottom position relative to viewport

    if (sectionTop < window.innerHeight && sectionBottom > 0) {
        // Section is in view, apply the parallax effect
        newRecordImage.style.transform = `translateY(${(scrollPosition - newRecordSection.offsetTop) * 0.3}px)`; // Moves downward
    } else {
        // Reset the image position if the section is out of view
        newRecordImage.style.transform = `translateY(0px)`;
    }
});
