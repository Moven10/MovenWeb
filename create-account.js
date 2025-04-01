document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const usernameField = document.getElementById("username");
    const usernameFeedback = document.createElement("span");

    // Add username feedback span
    usernameFeedback.style.display = "block";
    usernameFeedback.style.marginTop = "0.5rem";
    usernameFeedback.style.fontSize = "0.9rem";
    usernameField.parentNode.appendChild(usernameFeedback);

    usernameField.addEventListener("input", async () => {
        const username = usernameField.value.trim();

        if (!username) {
            usernameFeedback.textContent = "";
            usernameField.style.borderColor = "";
            return;
        }

        try {
            const response = await fetch("https://api.startmoven.com/check-username", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            const result = await response.json();

            if (result.available) {
                usernameFeedback.textContent = "Username is available.";
                usernameFeedback.style.color = "green";
                usernameField.style.borderColor = "green";
            } else {
                usernameFeedback.textContent = "Username is already taken. Please choose another.";
                usernameFeedback.style.color = "red";
                usernameField.style.borderColor = "red";
            }
        } catch (error) {
            console.error("Error checking username availability:", error);
            usernameFeedback.textContent = "Unable to check username availability. Please try again.";
            usernameFeedback.style.color = "orange";
        }
    });

    // Show/hide password feature
    const togglePasswordVisibility = (fieldId, toggleButtonId) => {
        const passwordField = document.getElementById(fieldId);
        const toggleButton = document.getElementById(toggleButtonId);

        toggleButton.addEventListener("click", () => {
            const isPasswordHidden = passwordField.type === "password";
            passwordField.type = isPasswordHidden ? "text" : "password";
            toggleButton.textContent = isPasswordHidden ? "👁️" : "🙈";
        });
    };

    togglePasswordVisibility("password", "password-toggle");
    togglePasswordVisibility("retype-password", "retype-password-toggle");

    // Handle form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const username = usernameField.value.trim();
        const email = document.getElementById("email").value.trim();
        const number = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();
        const retypePassword = document.getElementById("retype-password").value.trim();
        const termsChecked = document.getElementById("terms").checked;

        const message = termsChecked
            ? `Thank you, ${username}!\n\nWelcome to Moven. Down below are your account details. Be sure to keep them safe and not show them to anyone.\n\nGo get Moven!\n\n- Name: ${name}\n- Username: ${username}\n- Email: ${email}\n- Phone Number: ${number}\n- Password: ${password}\n\nThe Moven Team.`
            : "";

        const errors = [];
        const fields = [
            usernameField,
            document.getElementById("name"),
            document.getElementById("email"),
            document.getElementById("phone"),
            document.getElementById("password"),
            document.getElementById("retype-password"),
        ];

        fields.forEach((field) => (field.style.borderColor = ""));

        if (!name) {
            errors.push("Name is required.");
            document.getElementById("name").style.borderColor = "red";
        }
        if (!username) {
            errors.push("Username is required.");
            usernameField.style.borderColor = "red";
        }
        if (!email) {
            errors.push("Email is required.");
            document.getElementById("email").style.borderColor = "red";
        }
        if (!number) {
            errors.push("Phone number is required.");
            document.getElementById("phone").style.borderColor = "red";
        }
        if (!password) {
            errors.push("Password is required.");
            document.getElementById("password").style.borderColor = "red";
        }
        if (!retypePassword) {
            errors.push("Please confirm your password.");
            document.getElementById("retype-password").style.borderColor = "red";
        }
        if (password && retypePassword && password !== retypePassword) {
            errors.push("Passwords do not match.");
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("retype-password").style.borderColor = "red";
        }
        if (!termsChecked) errors.push("You must agree to the Terms and Conditions.");

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        try {
            const usernameResponse = await fetch("https://api.startmoven.com/check-username", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });
            const usernameResult = await usernameResponse.json();

            if (!usernameResult.available) {
                alert("The username is not available. Please choose a different username.");
                usernameField.style.borderColor = "red";
                return;
            }
        } catch (error) {
            console.error("Error checking username availability during submission:", error);
            alert("Unable to verify username availability. Please try again.");
            return;
        }

        // Show loading overlay
        const overlay = document.createElement("div");
        overlay.id = "loading-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

        const spinner = document.createElement("div");
        spinner.style.border = "6px solid #f3f3f3";
        spinner.style.borderTop = "6px solid lightblue";
        spinner.style.borderRadius = "50%";
        spinner.style.width = "50px";
        spinner.style.height = "50px";
        spinner.style.animation = "spin 1s linear infinite";

        const text = document.createElement("p");
        text.textContent = "Creating Account...";
        text.style.color = "lightblue";
        text.style.fontSize = "1.2rem";
        text.style.marginTop = "20px";

        const wrapper = document.createElement("div");
        wrapper.style.textAlign = "center";

        wrapper.appendChild(spinner);
        wrapper.appendChild(text);
        overlay.appendChild(wrapper);

        document.body.appendChild(overlay);

        try {
            const response = await fetch("https://api.startmoven.com/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    number,
                    password,
                    message,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                window.location.href = "success.html"; // Redirect to success.html
            } else {
                alert(result.message || "An error occurred while creating the account.");
            }
        } catch (error) {
            console.error("Error during account creation:", error);
            alert("An error occurred while creating the account. Please try again.");
        } finally {
            document.body.removeChild(overlay);
        }
    });
});

// Add spinner animation
const style = document.createElement("style");
style.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
