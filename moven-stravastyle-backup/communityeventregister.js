document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-container");

    // Create a spinner element
    const spinner = document.createElement("div");
    spinner.innerHTML = `<div class="loading-spinner"></div>`;
    spinner.style.display = "none";
    form.appendChild(spinner);

    // Create a success message element with an SVG black checkmark
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.style.display = "none";
    successMessage.innerHTML = `
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="black" d="M9 16.2l-4.2-4.2-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
        </svg>
        Thank you for your interest, check your email for confirmation.
    `;
    form.appendChild(successMessage);

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Stop default form submission

        // Show spinner
        spinner.style.display = "block";
        successMessage.style.display = "none"; // Hide previous messages

        const formData = {
            firstName: document.getElementById("first-name").value.trim(),
            lastName: document.getElementById("last-name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            message: document.getElementById("message").value.trim(),
            description: document.getElementById("description").value.trim()
        };

        console.log("🔹 Sending form data:", formData); // Debug log

        try {
            const response = await fetch("http://52.62.119.117:8080/communityformevent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.error("❌ Server responded with error:", response.status);
                throw new Error(`Server Error: ${response.status}`);
            }

            const result = await response.json();
            console.log("✅ Server response:", result); // Debug log

            // Hide spinner and show success message
            spinner.style.display = "none";
            successMessage.style.display = "flex";
            successMessage.classList.add("fade-in");

        } catch (error) {
            console.error("❌ Error submitting form:", error);
            alert("Failed to submit. Please check your internet and try again.");
        } finally {
            spinner.style.display = "none"; // Always hide spinner
        }
    });
});
