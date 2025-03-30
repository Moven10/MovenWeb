// Select the floating 54 image
const floatingImage = document.querySelector('.floating-54-image');

// Select the event image for the parallax effect
const eventImage = document.querySelector('.event-image');

// Select the new floating image (63.jpg)
const floatingImage63 = document.querySelector('.events-floating-image');

// Add a scroll event listener to the window
window.addEventListener('scroll', () => {
    // Get the current scroll position of the page
    const scrollPosition = window.scrollY;

    // Apply a transform to create the floating effect for the floating-54-image
    // The position will adjust slightly based on the scroll position
    if (floatingImage) {
        floatingImage.style.transform = `translate(-50%, calc(-50% + ${scrollPosition * 0.1}px))`;
    }

    // Apply the parallax effect to the event-image
    // The image moves slightly in the opposite direction of the scroll
    if (eventImage) {
        const offset = scrollPosition * 0.3; // Adjust multiplier for subtle parallax
        eventImage.style.transform = `translate(-50%, calc(-50% + ${offset}px))`;
    }

    // Apply a subtle parallax effect for the floating 63 image
    if (floatingImage63) {
        const offset63 = scrollPosition * -0.2; // Moves in the opposite direction
        floatingImage63.style.transform = `translateY(calc(-50% + ${offset63}px))`;
    }
});
