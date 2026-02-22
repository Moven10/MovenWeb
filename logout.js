document.addEventListener("DOMContentLoaded", () => {
  // 🔓 Load user info
  const avatarEl = document.getElementById("account-avatar");
  const usernameEl = document.getElementById("account-username");

  const userJSON = localStorage.getItem("movenUser");
  const user = userJSON ? JSON.parse(userJSON) : null;

  if (user && user.profileImageUrl && user.username) {
    avatarEl.src = user.profileImageUrl;
    usernameEl.textContent = user.username;
  } else {
    avatarEl.src = "default-avatar.jpg";
    usernameEl.textContent = "Guest";
  }

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Show progress view
      showLogoutProgress();

      // 👇 Wait a tick to allow DOM to render overlay
      requestAnimationFrame(() => {
        setTimeout(() => {
          localStorage.removeItem("movenUser");
          window.location.href = "index.html";
        }, 5000);
      });
    });
  }

  function showLogoutProgress() {
    const overlay = document.createElement("div");
    overlay.className = "progress-overlay";
    overlay.innerHTML = `
      <div class="progress-spinner">
        <img src="MovenLogo1.png" alt="Loading" />
        <p>Logging out...</p>
      </div>
    `;
    document.body.appendChild(overlay);
  }
});
