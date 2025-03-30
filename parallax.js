// Select all images with the 'parallax-img' class
const parallaxImages = document.querySelectorAll('.parallax-img');

// Select the reverse-moving image
const reverseParallaxImage = document.querySelector('.reverse-parallax-img');

// Select image 306 specifically
const image306 = document.querySelector('.white-section img[src="306.jpg"]');

// Add an event listener for scrolling
window.addEventListener('scroll', () => {
    const speed = 0.2; // Speed for normal parallax images
    const reverseSpeed = 0.2; // Speed for reverse parallax
    const speed306 = 0.25; // Custom speed for 306.jpg

    // Apply parallax effect to regular images
    parallaxImages.forEach(img => {
        const offset = window.scrollY * speed;
        img.style.transform = `translateY(-${offset}px)`; // Move opposite to scroll
    });

    // Apply reverse parallax effect to the reverse-moving image
    if (reverseParallaxImage) {
        const reverseOffset = window.scrollY * reverseSpeed;
        reverseParallaxImage.style.transform = `translateY(${reverseOffset}px)`; // Move with the scroll
    }

    // Apply parallax effect to image 306.jpg
    if (image306) {
        const offset306 = window.scrollY * speed306;
        image306.style.transform = `translateY(-${offset306}px)`; // Move opposite to scroll
    }

    // No parallax applied to 307.jpg
});
