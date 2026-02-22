document.addEventListener('DOMContentLoaded', function () {
  const sportsSection = document.getElementById('sportsSection');
  const weatherSection = document.getElementById('weatherSection');
  const popupBar = document.getElementById('sportsFloatBar');

  window.addEventListener('scroll', () => {
    const sportsRect = sportsSection.getBoundingClientRect();
    const weatherRect = weatherSection.getBoundingClientRect();

    /* ───────── Sports bar visibility ───────── */
    const sportsInView =
      sportsRect.top < window.innerHeight && sportsRect.bottom > 0;

    if (sportsInView) {
      popupBar.classList.add('visible');
    } else {
      popupBar.classList.remove('visible');
    }

    /* ───────── Weather morph + bounce ───────── */
    const weatherInView =
      weatherRect.top < window.innerHeight * 0.6 &&
      weatherRect.bottom > window.innerHeight * 0.4;

    if (weatherInView) {
      popupBar.classList.add('weather-mode');
    } else {
      popupBar.classList.remove('weather-mode');
    }
  });
});
