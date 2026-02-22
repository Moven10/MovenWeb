window.addEventListener('scroll', () => {
  const transitionSection = document.querySelector('.transition-section');
  const transitionImage = document.querySelector('.transition-image');
  if (!transitionSection || !transitionImage) return;

  const scrollY = window.scrollY;

  // 📏 Tune this number for your layout
  const triggerPoint = 4000;

  if (scrollY > triggerPoint) {
    transitionSection.classList.add('black-screen');
    transitionImage.classList.remove('expanded'); // safety reset
  } else {
    transitionSection.classList.remove('black-screen');
  }
});
