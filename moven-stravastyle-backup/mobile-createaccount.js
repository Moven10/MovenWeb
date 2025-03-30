document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const usernameInput = document.getElementById("username");
    const usernameMessage = document.getElementById("username-message");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const createAccountBtn = document.getElementById("create-account-btn");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const privacyCheckbox = document.getElementById("privacy");
    const overlay = document.getElementById("overlay");
    const overlayMessage = document.getElementById("overlay-message");

    const menuButton = document.getElementById("menuButton");
    const sideMenu = document.getElementById("sideMenu");
    const closeMenu = document.getElementById("closeMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    const body = document.body;

    // Function to open the menu
    function openMenu() {
        sideMenu.style.left = "0";
        menuOverlay.style.display = "block";
        body.classList.add("menu-open");
    }

    // Function to close the menu
    function closeSideMenu() {
        sideMenu.style.left = "-250px"; // Move it off-screen
        menuOverlay.style.display = "none";
        body.classList.remove("menu-open");
    }

    // Event listeners for menu toggle
    menuButton.addEventListener("click", openMenu);
    closeMenu.addEventListener("click", closeSideMenu);
    menuOverlay.addEventListener("click", closeSideMenu);

    function validateForm() {
        const isUsernameValid = usernameMessage.classList.contains("username-available");
        const isEmailValid = validateEmail(emailInput.value);
        const isPhoneValid = validatePhone(phoneInput.value);
        const isPasswordMatch = passwordInput.value === confirmPasswordInput.value;
        const isPrivacyChecked = privacyCheckbox.checked;

        createAccountBtn.disabled = !(isUsernameValid && isEmailValid && isPhoneValid && isPasswordMatch && isPrivacyChecked);
    }

    usernameInput.addEventListener("input", async () => {
        usernameInput.value = usernameInput.value.toLowerCase(); // Force lowercase

        const username = usernameInput.value.trim();
        if (username.length < 3) {
            usernameMessage.textContent = "Username must be at least 3 characters.";
            usernameMessage.classList.add("username-taken");
            usernameMessage.classList.remove("username-available");
            createAccountBtn.disabled = true;
            return;
        }

        try {
            const response = await fetch("http://52.62.119.117:8080/check-username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username })
            });

            const data = await response.json();

            if (data.available) {
                usernameMessage.textContent = "Available Username";
                usernameMessage.classList.remove("username-taken");
                usernameMessage.classList.add("username-available");
            } else {
                usernameMessage.textContent = "Username Taken";
                usernameMessage.classList.remove("username-available");
                usernameMessage.classList.add("username-taken");
            }
        } catch (error) {
            console.error("Error checking username:", error);
            usernameMessage.textContent = "Error checking username.";
        }

        validateForm();
    });

    emailInput.addEventListener("input", () => {
        emailInput.style.borderColor = validateEmail(emailInput.value) ? "green" : "red";
        validateForm();
    });

    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, ""); // Remove non-numeric characters
        phoneInput.style.borderColor = validatePhone(phoneInput.value) ? "green" : "red";
        validateForm();
    });

    passwordInput.addEventListener("input", validateForm);
    confirmPasswordInput.addEventListener("input", validateForm);
    privacyCheckbox.addEventListener("change", validateForm);

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    function validatePhone(phone) {
        return phone.length >= 10;
    }

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const username = usernameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const password = passwordInput.value;

        // Show the overlay loading screen
        overlay.style.display = "flex";
        overlayMessage.innerHTML = `<div class="loader"></div><p>Creating Account</p>`;

        // Construct the email message with all the user details
        const emailMessage = 
            `Welcome to Moven, ${name}!\n\n` +
            `Here are your account details so you don't have to remember them off the top of your head. Just keep them safe and let no one see them:\n\n` +
            `Name: ${name}\nUsername: ${username}\nNumber: ${phone}\nEmail: ${email}\nPassword: ${password}\n\n` +
            `Alright ${username}, you're all set now! Go get Moven and post a run to the gram for us!`;

        const userData = { 
            email, 
            message: emailMessage, 
            username, 
            password, 
            name, 
            number: phone 
        };

        try {
            const response = await fetch("http://52.62.119.117:8080/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error("Failed to create account.");

            // Show success message
            overlayMessage.innerHTML = `
                <h2>Welcome to Moven, ${name}!</h2>
                <p>Your account has been created successfully.</p>
                <button id="get-moven-btn" class="green-button">Get Moven</button>
            `;

            // Add event listener to button to redirect user
            document.getElementById("get-moven-btn").addEventListener("click", () => {
                window.location.href = "mobile.html";
            });

            signupForm.reset();
        } catch (error) {
            overlay.style.display = "none";
            alert("Error: Could not reach server.");
        }
    });
});
