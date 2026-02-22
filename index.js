document.addEventListener('DOMContentLoaded', () => {
  // 🔽 Dropdown logic
  const link = document.getElementById('ways-link');
  const dropdown = document.getElementById('ways-dropdown');

  function showDropdown() {
    const rect = link.getBoundingClientRect();
    dropdown.style.display = 'block';
    const offset = 35;
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.top = `${rect.bottom + window.scrollY + offset}px`;

    setTimeout(() => {
      dropdown.style.opacity = '1';
      dropdown.style.transform = 'translateY(0)';
    }, 10);
  }

  function hideDropdown() {
    dropdown.style.opacity = '0';
    dropdown.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      if (dropdown.style.opacity === '0') {
        dropdown.style.display = 'none';
      }
    }, 300);
  }

  if (link && dropdown) {
    link.addEventListener('mouseenter', showDropdown);
    link.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!dropdown.matches(':hover')) hideDropdown();
      }, 100);
    });

    dropdown.addEventListener('mouseenter', showDropdown);
    dropdown.addEventListener('mouseleave', hideDropdown);
  }

  // 🔵 Bottom flare scroll logic
  const styleHeadline = document.querySelector('.style-headline');
  const bottomFlare = document.querySelector('.bottom-flare');
  let flareTimeout;

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  window.addEventListener('scroll', () => {
    if (styleHeadline && bottomFlare) {
      if (isElementInViewport(styleHeadline)) {
        clearTimeout(flareTimeout);
        flareTimeout = setTimeout(() => {
          bottomFlare.classList.add('visible');
        }, 500);
      } else {
        clearTimeout(flareTimeout);
        bottomFlare.classList.remove('visible');
      }
    }
  });

  // ✨ Inspire section flare
  const inspireSection = document.querySelector('.inspire-section');

  if (inspireSection) {
    inspireSection.addEventListener('mouseenter', () => {
      inspireSection.classList.add('flare-active');
    });

    inspireSection.addEventListener('mouseleave', () => {
      inspireSection.classList.remove('flare-active');
    });
  }

  // 👤 User Profile Logic
  const profileEl = document.getElementById("user-profile");
  const avatarEl = document.getElementById("profile-avatar");
  const usernameEl = document.getElementById("profile-username");
  const signinBtn = document.getElementById("signin-btn");

  const userJSON = localStorage.getItem("movenUser");
  const user = userJSON ? JSON.parse(userJSON) : null;

  if (user && user.profileImageUrl) {
    if (avatarEl && usernameEl && profileEl) {
      avatarEl.src = "spinner.svg";
      usernameEl.textContent = "\u00A0"; // non-breaking space to reserve layout

      profileEl.style.display = "flex";

      setTimeout(() => {
        avatarEl.src = user.profileImageUrl;
        usernameEl.textContent = user.username || "User";
      }, 1000);
    }
    if (signinBtn) signinBtn.style.display = "none";
  } else {
    // Show Sign In button
    if (signinBtn) {
      signinBtn.style.display = "inline-block";
      signinBtn.addEventListener("click", () => {
        window.location.href = "create-account.html";
      });
    }
    if (profileEl) profileEl.style.display = "none";
  }

  // ➡️ Navigate to account.html when clicking profile
  if (profileEl) {
    profileEl.addEventListener("click", () => {
      window.location.href = "account.html";
    });
  }
});






// iphone js menu

document.addEventListener("DOMContentLoaded", function () {

  const toggle = document.getElementById("mobileMenuToggle");
  const menu = document.getElementById("mobileGlassMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });
  }

});
