const movenGearSection = document.querySelector('#moven-gear-collection');

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      // Fade to blue when section is in view
      movenGearSection.classList.add('scrolled-in');
    } else {
      // Fade back to white when out of view
      movenGearSection.classList.remove('scrolled-in');
    }
  },
  {
    threshold: 0.15 // triggers when ~15% of the section is visible
  }
);

if (movenGearSection) {
  observer.observe(movenGearSection);
}
