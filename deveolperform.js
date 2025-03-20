document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-container");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        console.log("🚀 Form submitted! Preparing to send data...");

        const email = document.getElementById("email").value.trim();
        const company = document.getElementById("company").value.trim();
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const companyName = document.getElementById("company-name").value.trim() || "Not specified";
        const workType = document.querySelector('input[name="work-type"]:checked')?.id || "Not specified";
        const employees = document.querySelector('input[name="employees"]:checked')?.id || "Not specified";
        const country = document.getElementById("country").value.trim();
        const budget = document.getElementById("budget").value;
        const goals = document.getElementById("goals").value.trim() || "Not provided";
        const referral = document.getElementById("referral").value.trim() || "Not provided";

        // 🔍 Validate required fields
        if (!email || !company || !firstName || !lastName || !country) {
            showMessage("❌ Missing required fields. Please complete the form.", "error");
            return;
        }

        const formData = { email, company, companyName, firstName, lastName, workType, employees, country, budget, goals, referral };

        console.log("📤 Sending data to backend:", formData);

        // 📌 Create or find the response container
        let responseContainer = document.getElementById("responseContainer");
        if (!responseContainer) {
            responseContainer = document.createElement("div");
            responseContainer.id = "responseContainer";
            form.appendChild(responseContainer);
        }

        // 💫 Create or show the spinner
        let spinner = document.getElementById("spinner");
        if (!spinner) {
            spinner = document.createElement("div");
            spinner.id = "spinner";
            responseContainer.appendChild(spinner);
        }
        spinner.style.display = "block"; // Show spinner

        // 🔵 Show processing message
        showMessage("Processing...", "processing");

        try {
            const response = await fetch("https://alpaca-bursting-koala.ngrok-free.app/submit-tech-idea", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            console.log("📩 Response received from backend:", response);

            const result = await response.json();
            console.log("📜 Response Data:", result);

            if (response.ok) {
                showMessage("Thank you for your tech idea! Check your email for confirmation.", "success");
                form.reset(); // Clear the form after successful submission
            } else {
                showMessage(`❌ Error: ${result.message || "Try again."}`, "error");
            }
        } catch (error) {
            console.error("❌ Network error:", error);
            showMessage("❌ Network error. Please try again.", "error");
        } finally {
            spinner.style.display = "none"; // Hide spinner after request completes
        }
    });

    // 🛠 Helper function to show status messages
    function showMessage(message, type) {
        let responseMessage = document.getElementById("responseMessage");
        if (!responseMessage) {
            responseMessage = document.createElement("p");
            responseMessage.id = "responseMessage";
            document.getElementById("responseContainer").appendChild(responseMessage);
        }
        responseMessage.textContent = message;
        responseMessage.className = `${type}-message`;

        // 🖤 Add checkmark animation for success message
        if (type === "success") {
            responseMessage.innerHTML = '<span class="checkmark">✔</span> ' + message;
        }
    }
});
