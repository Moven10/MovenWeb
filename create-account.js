document.addEventListener("DOMContentLoaded", () => {
  const createPanel = document.querySelector(".create-panel");
  const loginPanel = document.querySelector(".login-panel");
  const switchToLogin = document.getElementById("switchToLogin");
  const switchToCreate = document.getElementById("switchToCreate");
  const loginForm = loginPanel.querySelector("form");
  const createForm = document.getElementById("createAccountForm");

  // 🎯 Inputs
  const nameInput = document.getElementById("name");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const repeatPasswordInput = document.getElementById("repeatPassword");
  const privacyCheckbox = document.getElementById("privacy");
  const createBtn = createForm?.querySelector(".btn-create");

  const loginUsernameInput = document.getElementById("login-username");
  const loginPasswordInput = document.getElementById("login-password");

  const getWrap = (input) => input?.closest(".field-wrap");
  const getDot = (wrap) => wrap?.querySelector(".field-status");
  const getError = (wrap) => wrap?.querySelector(".field-error");

  const fields = {
    name: getWrap(nameInput),
    username: getWrap(usernameInput),
    email: getWrap(emailInput),
    phone: getWrap(phoneInput),
    password: getWrap(passwordInput),
    repeatPassword: getWrap(repeatPasswordInput)
  };

  let usernameValid = false;

  /* ---------------------------------------------------
     🚫 Bad Words Filter
  --------------------------------------------------- */
  const badWords = ["fuck", "shit", "bitch", "asshole", "cunt"];

  function containsBadWord(text) {
    return badWords.some(word =>
      text.toLowerCase().includes(word)
    );
  }

  /* ---------------------------------------------------
     🟡 Status Helpers
  --------------------------------------------------- */

  function setDotState(dot, state) {
    if (!dot) return;
    dot.classList.remove("valid", "invalid", "default");
    dot.classList.add(state);
  }

  function showError(wrap, message) {
    const error = getError(wrap);
    const dot = getDot(wrap);
    if (!error || !dot) return;

    error.textContent = message;
    error.classList.add("visible");
    setDotState(dot, "invalid");
  }

  function hideError(wrap) {
    const error = getError(wrap);
    const dot = getDot(wrap);
    if (!error || !dot) return;

    error.textContent = "";
    error.classList.remove("visible");
  }

  function markValid(wrap) {
    const dot = getDot(wrap);
    if (dot) setDotState(dot, "valid");
  }

  function markDefault(wrap) {
    const dot = getDot(wrap);
    if (dot) setDotState(dot, "default");
  }

  /* ---------------------------------------------------
     🧪 Validators
  --------------------------------------------------- */

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) =>
    /^[0-9+\s()-]{7,}$/.test(phone);

  /* ---------------------------------------------------
     🔘 Create Button State
  --------------------------------------------------- */

  function updateCreateButtonState() {
    if (!createBtn) return;

    const allValid =
      nameInput.value.trim() &&
      usernameInput.value.trim() &&
      emailInput.value.trim() &&
      phoneInput.value.trim() &&
      passwordInput.value &&
      repeatPasswordInput.value &&
      usernameValid &&
      privacyCheckbox.checked &&
      passwordInput.value === repeatPasswordInput.value;

    createBtn.disabled = !allValid;
    createBtn.classList.toggle("enabled", allValid);
    createBtn.classList.toggle("disabled", !allValid);
  }

  /* ---------------------------------------------------
     📝 Field Validation
  --------------------------------------------------- */

  nameInput.addEventListener("input", () => {
    const value = nameInput.value.trim();
    if (!value) return markDefault(fields.name);

    if (containsBadWord(value)) {
      showError(fields.name, "Inappropriate");
    } else {
      hideError(fields.name);
      markValid(fields.name);
    }
    updateCreateButtonState();
  });

  emailInput.addEventListener("input", () => {
    const value = emailInput.value.trim();
    if (!value) return markDefault(fields.email);

    if (!isValidEmail(value)) {
      showError(fields.email, "Invalid email");
    } else {
      hideError(fields.email);
      markValid(fields.email);
    }
    updateCreateButtonState();
  });

  phoneInput.addEventListener("input", () => {
    const value = phoneInput.value.trim();
    if (!value) return markDefault(fields.phone);

    if (!isValidPhone(value)) {
      showError(fields.phone, "Invalid number");
    } else {
      hideError(fields.phone);
      markValid(fields.phone);
    }
    updateCreateButtonState();
  });

  function validatePasswords() {
    const pass = passwordInput.value;
    const repeat = repeatPasswordInput.value;

    if (!pass && !repeat) {
      markDefault(fields.password);
      markDefault(fields.repeatPassword);
      return;
    }

    if (pass !== repeat) {
      showError(fields.repeatPassword, "Passwords don't match");
    } else {
      hideError(fields.repeatPassword);
      markValid(fields.password);
      markValid(fields.repeatPassword);
    }
  }

  passwordInput.addEventListener("input", () => {
    validatePasswords();
    updateCreateButtonState();
  });

  repeatPasswordInput.addEventListener("input", () => {
    validatePasswords();
    updateCreateButtonState();
  });

  privacyCheckbox.addEventListener("change", updateCreateButtonState);

  /* ---------------------------------------------------
     🔍 Username Availability
  --------------------------------------------------- */

  usernameInput.addEventListener("input", async () => {
    const username = usernameInput.value.trim();

    if (!username) {
      hideError(fields.username);
      markDefault(fields.username);
      usernameValid = false;
      updateCreateButtonState();
      return;
    }

    if (containsBadWord(username)) {
      showError(fields.username, "Inappropriate");
      usernameValid = false;
      updateCreateButtonState();
      return;
    }

    try {
      const res = await fetch("http://52.62.119.117:8080/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });

      const data = await res.json();

      if (!data.available) {
        showError(fields.username, "Username taken");
        usernameValid = false;
      } else {
        hideError(fields.username);
        markValid(fields.username);
        usernameValid = true;
      }
    } catch {
      showError(fields.username, "Unable to verify username");
      usernameValid = false;
    }

    updateCreateButtonState();
  });

/* ---------------------------------------------------
   👁 Password Eye Toggle (Image Version - Adjusted Higher)
--------------------------------------------------- */

function attachPasswordToggle(input) {
  const wrap = getWrap(input);
  if (!wrap) return;

  // Prevent duplicate icons
  if (wrap.querySelector(".custom-eye-icon")) return;

  // Ensure wrap is positioned
  wrap.style.position = "relative";

  const eyeImg = document.createElement("img");
  eyeImg.src = "eye1.png"; // default (hidden password)
  eyeImg.alt = "Toggle Password";
  eyeImg.className = "custom-eye-icon";

  // 🔧 Positioning (moved higher)
  eyeImg.style.position = "absolute";
  eyeImg.style.right = "32px";
  eyeImg.style.top = "13px";   // 👈 moved higher
  eyeImg.style.width = "18px";
  eyeImg.style.height = "18px";
  eyeImg.style.cursor = "pointer";
  eyeImg.style.opacity = "0.8";
  eyeImg.style.transition = "opacity 0.2s ease";

  // Hover effect
  eyeImg.addEventListener("mouseenter", () => {
    eyeImg.style.opacity = "1";
  });

  eyeImg.addEventListener("mouseleave", () => {
    eyeImg.style.opacity = "0.8";
  });

  // Toggle visibility
  eyeImg.addEventListener("click", () => {
    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";
    eyeImg.src = isHidden ? "eye2.png" : "eye1.png";
  });

  wrap.appendChild(eyeImg);
}

// Attach to all password fields
attachPasswordToggle(passwordInput);
attachPasswordToggle(repeatPasswordInput);
attachPasswordToggle(loginPasswordInput);



  /* ---------------------------------------------------
     🔄 Panel Switching
  --------------------------------------------------- */

  switchToLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    createPanel.classList.remove("active");
    loginPanel.classList.add("active");
  });

  switchToCreate?.addEventListener("click", (e) => {
    e.preventDefault();
    loginPanel.classList.remove("active");
    createPanel.classList.add("active");
  });

  /* ---------------------------------------------------
     🆕 Create Account
  --------------------------------------------------- */

  createForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (createBtn.disabled) return;

    showProgressView();

    try {
      const response = await fetch("http://52.62.119.117:8080/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          username: usernameInput.value.trim(),
          email: emailInput.value.trim(),
          number: phoneInput.value.trim(),
          password: passwordInput.value,
          message: `Welcome to Moven, ${nameInput.value.trim()}! 🎉`,
          profileImageUrl: ""
        })
      });

      const result = await response.json();

      if (!response.ok) {
        hideProgressView();
        alert(result.message || "Failed to create account.");
        return;
      }

      hideProgressView();
      alert("✅ Account created successfully! Please log in.");
      createPanel.classList.remove("active");
      loginPanel.classList.add("active");

    } catch {
      hideProgressView();
      alert("Network error — please try again.");
    }
  });

  /* ---------------------------------------------------
     🔐 LOGIN — ✅ FIXED REDIRECT
  --------------------------------------------------- */

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value;

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    showProgressView();

    try {
      const response = await fetch("http://52.62.119.117:8080/SignMoveUserIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        hideProgressView();
        alert(data.message || "Login failed.");
        return;
      }

      // ✅ Store user
      localStorage.setItem("movenUser", JSON.stringify(data.user));

      // ✅ Redirect
      window.location.href = "account.html";

    } catch (err) {
      hideProgressView();
      console.error("Login error:", err);
      alert("Network error — please try again.");
    }
  });

  /* ---------------------------------------------------
     ⏳ Progress View
  --------------------------------------------------- */

  function showProgressView() {
    const overlay = document.createElement("div");
    overlay.className = "progress-overlay";
    overlay.innerHTML = `
      <div class="progress-spinner">
        <img src="MovenLogo1.png" />
        <p>Processing...</p>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function hideProgressView() {
    document.querySelector(".progress-overlay")?.remove();
  }
});
