document.addEventListener('DOMContentLoaded', function () {
  // Select all menu items that have a data-icon attribute
  document.querySelectorAll('.menu-item[data-icon]').forEach(item => {
    // Add a special class to enable CSS styling
    item.classList.add('hover-icon');

    // Get the icon URL from the data attribute
    const iconUrl = item.getAttribute('data-icon');

    // Set a CSS variable for that item's icon
    item.style.setProperty('--hover-icon-url', `url(${iconUrl})`);

    // Add click event to redirect to sneaker.html
    item.addEventListener('click', () => {
      window.location.href = 'sneaker.html';
    });
  });

  // Inject dynamic CSS to use the variable for ::after background-image
  const dynamicStyle = document.createElement('style');
  dynamicStyle.innerHTML = `
    .menu-item.hover-icon:hover::after {
      background-image: var(--hover-icon-url);
    }
  `;
  document.head.appendChild(dynamicStyle);

  console.log('menu.js is loaded'); // 👈 use this to confirm it's running
});
