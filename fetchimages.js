document.addEventListener("DOMContentLoaded", async () => {
  const usernameEl = document.getElementById("account-username");
  const container = document.getElementById("gear-images-container");

  if (!usernameEl || !container) return;

  const username = usernameEl.textContent.trim().toLowerCase();
  if (!username || username === "guest") return;

  try {
    const res = await fetch(
      `http://52.62.119.117:8080/get-claimed-images?username=${encodeURIComponent(username)}`
    );

    if (!res.ok) throw new Error(`Server returned ${res.status}`);

    const images = await res.json();

    if (!Array.isArray(images) || images.length === 0) {
      container.innerHTML = `<p style="color:#888; font-size:0.9rem;">No gear claimed yet.</p>`;
      return;
    }

    // Clear existing content just in case
    container.innerHTML = "";

    images.forEach(imageName => {
      const wrapper = document.createElement("div");
      wrapper.className = "gear-item";

      const img = document.createElement("img");
      img.src = imageName.endsWith(".png") ? imageName : `${imageName}.png`;
      img.alt = imageName;
      img.className = "gear-image";

      const label = document.createElement("div");
      label.className = "gear-image-label";
      label.textContent = imageName;

      wrapper.appendChild(img);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });

  } catch (err) {
    console.error("❌ Failed to fetch gear images:", err);
    container.innerHTML = `<p style="color:#888; font-size:0.9rem;">Unable to load gear.</p>`;
  }
});
