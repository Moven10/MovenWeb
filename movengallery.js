// Sliding Hero Image with Circle Timer (DOM-based)
document.addEventListener('DOMContentLoaded', () => {
 const hero = document.querySelector('.gear-hero-image');
 let currentSlide = hero.querySelector('.current-slide');
 let nextSlide = hero.querySelector('.next-slide');

 const images = [
 'gallery10.jpg',
 'gallery20.jpg',
 'gallery30.jpg',
 'gallery40.jpg',
 'gallery50.jpg',
 'gallery60.jpg'
 ];

 let index = 0;

 function slideImages() {
 const nextIndex = (index + 1) % images.length;

 // Set background images
 currentSlide.style.backgroundImage = `url('${images[index]}')`;
 nextSlide.style.backgroundImage = `url('${images[nextIndex]}')`;

 // Animate slides
 nextSlide.style.transform = 'translateX(0%)';
 currentSlide.style.transform = 'translateX(-100%)';

 // After transition ends
 setTimeout(() => {
 // Reset the offscreen slide
 currentSlide.style.transform = 'translateX(100%)';
 currentSlide.style.backgroundImage = ''; // Remove background to prevent overlap

 // Swap class names
 currentSlide.classList.remove('current-slide');
 nextSlide.classList.add('current-slide');

 currentSlide.classList.add('next-slide');
 nextSlide.classList.remove('next-slide');

 // Swap DOM refs
 [currentSlide, nextSlide] = [nextSlide, currentSlide];
 index = nextIndex;
 }, 1000); // match CSS transition duration
 }

 // Initial image
 currentSlide.style.backgroundImage = `url('${images[0]}')`;

 // Slide every 7 seconds
 setInterval(slideImages, 7000);
});

