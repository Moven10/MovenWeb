window.addEventListener('scroll', function () {
  const hero = document.querySelector('.hero-section');
  const heroLayout = document.querySelector('.hero-layout');
  const scrollY = window.scrollY;

  const triggerPoint = 2800; // 📏 Adjusted scroll threshold

  if (scrollY > triggerPoint) {
    hero.style.backgroundImage = 'none';
    hero.style.backgroundColor = 'white';
    heroLayout.classList.add('hide');
  } else {
    hero.style.backgroundImage = `
      linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
      url('Running2.jpg')
    `;
    hero.style.backgroundColor = 'transparent';
    heroLayout.classList.remove('hide');
  }
});
