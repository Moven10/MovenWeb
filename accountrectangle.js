document.addEventListener("DOMContentLoaded", async () => {
  const usernameEl = document.getElementById("account-username");
  const panelEl = document.getElementById("account-panel-profile");

  if (!usernameEl || !panelEl) return;

  const username = usernameEl.textContent.trim().toLowerCase();
  if (!username || username === "guest") return;

  try {
    const res = await fetch(`http://52.62.119.117:8080/get-user-details?username=${encodeURIComponent(username)}`);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    const user = await res.json();

    const profileImgEl = document.getElementById("account-avatar");
    const profileSrc = profileImgEl ? profileImgEl.src : "default-avatar.jpg";

    panelEl.innerHTML = `
      <img src="${profileSrc}" class="account-panel-avatar" alt="User Avatar" />
      <div class="account-panel-name" style="font-weight: 700;">${user.name || "Unknown Name"}</div>
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
    panelEl.innerHTML = `<p style="color:#888;">Unable to load user info.</p>`;
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
    }, 300); // small delay for UI smoothness
  });
});
