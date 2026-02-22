// circleoutline.js

window.addEventListener('DOMContentLoaded', () => {
  const circle = document.querySelector('.circle-outline circle');

  if (circle) {
    circle.animate([
      { strokeDashoffset: 263.9 },
      { strokeDashoffset: 0 }
    ], {
      duration: 1200,
      easing: 'ease-out',
      fill: 'forwards'
    });
  }
});
