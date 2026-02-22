// backdrop.js

window.addEventListener('DOMContentLoaded', () => {
  const intro = document.querySelector('.blue-intro');
  const icon = document.getElementById('rotating-icon');
  const titleContainer = document.querySelector('.intro-title-container');

  // ─── Rotating Icons (every 1s) ───
  const icons = [
    'Moveiconblack.svg',
    'Moveiconwhite.svg',
    'Moveiconpink.svg'
  ];

  let index = 0;
  setInterval(() => {
    index = (index + 1) % icons.length;
    icon.style.opacity = 0;

    setTimeout(() => {
      icon.src = icons[index];
      icon.style.opacity = 1;
    }, 250);
  }, 1000);

  // ─── Title fades & slides up ───
  setTimeout(() => {
    if (titleContainer) {
      titleContainer.classList.add('mini');
    }
  }, 2000);

  // ─── Slide blue-intro upward ───
  setTimeout(() => {
    if (intro) {
      intro.classList.add('hide');
    }
  }, 900);
});



window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const titleContainer = document.querySelector('.intro-title-container');
    if (titleContainer) {
      titleContainer.classList.add('mini');
    }
  }, 1000);
});
