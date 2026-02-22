document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // 🧹 Clear user session
      localStorage.removeItem("movenUser");

      // ✅ Redirect to homepage
      window.location.href = "index.html";
    });
  }
});





const toggleBtn = document.getElementById("accountToggle");
const layout = document.querySelector(".centered-layout");

toggleBtn.addEventListener("click", () => {

  const isAccountVisible = layout.classList.contains("show-account");

  if (isAccountVisible) {
    layout.classList.remove("show-account");
    toggleBtn.textContent = "Account";
  } else {
    layout.classList.add("show-account");
    toggleBtn.textContent = "Sessions";
  }

});
