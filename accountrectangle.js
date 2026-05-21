document.addEventListener("DOMContentLoaded", async () => {
  const usernameEl = document.getElementById("account-username");
  const panelEl = document.getElementById("account-panel-profile");

  if (!usernameEl || !panelEl) return;

  const username = usernameEl.textContent.trim().toLowerCase();

  if (!username || username === "guest") return;

  try {
    const res = await fetch(
      `https://api.startmoven.com/get-user-details?username=${encodeURIComponent(username)}`
    );

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const user = await res.json();

    console.log("✅ Loaded user:", user);

    // Try multiple possible avatar fields from API
    let profileSrc =
      user.avatar ||
      user.profilePicture ||
      user.profile_picture ||
      user.image ||
      user.photo ||
      "default-avatar.jpg";

    // Fix mixed-content issue (http -> https)
    if (
      typeof profileSrc === "string" &&
      profileSrc.startsWith("http://")
    ) {
      profileSrc = profileSrc.replace("http://", "https://");
    }

    panelEl.innerHTML = `
      <img
        src="${profileSrc}"
        class="account-panel-avatar"
        alt="User Avatar"
        onerror="this.onerror=null; this.src='default-avatar.jpg';"
      />

      <div class="account-panel-name" style="font-weight: 700;">
        ${user.name || "Unknown Name"}
      </div>

      <hr class="account-divider" />

      <div class="account-field">
        <span class="account-label">Username:</span>
        <span class="account-value italic">${username}</span>
      </div>

      <hr class="account-divider" />

      <div class="account-field">
        <span class="account-label">Email:</span>
        <span class="account-value">${user.email || "—"}</span>
      </div>

      <hr class="account-divider" />

      <div class="account-field">
        <span class="account-label">Phone:</span>
        <span class="account-value">${user.phone || "—"}</span>
      </div>
    `;
  } catch (err) {
    console.error("❌ Failed to load user details:", err);

    panelEl.innerHTML = `
      <p style="color:#888;">Unable to load user info.</p>
    `;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const subscribeBtn = document.getElementById("subscribeBtn");

  if (!subscribeBtn) return;

  subscribeBtn.addEventListener("click", function () {
    subscribeBtn.textContent = "Loading...";
    subscribeBtn.disabled = true;

    setTimeout(() => {
      window.location.href = "MoverPro.html";
    }, 300);
  });
});