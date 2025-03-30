document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"); // Select the correct form

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
        Thank you for your submission! Check your email for confirmation.
    `;
    form.appendChild(successMessage);

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Show spinner
        spinner.style.display = "block";
        successMessage.style.display = "none"; // Hide previous messages

        // Collect form data
        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            runClubName: document.getElementById("run-club-name").value.trim(),
            collaborationReason: document.getElementById("collaboration-reason").value.trim(),
        };

        console.log("🔹 Sending form data:", formData); // Debugging log

        try {
            const response = await fetch("http://52.62.119.117:8080/submit-run-club-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                console.error("❌ Server responded with error:", response.status);
                throw new Error(`Server Error: ${response.status}`);
            }

            const result = await response.json();
            console.log("✅ Server response:", result); // Debugging log

            // Hide spinner and show success message
            spinner.style.display = "none";
            successMessage.style.display = "flex";
            successMessage.classList.add("fade-in");

            // Reset the form
            form.reset();

        } catch (error) {
            console.error("❌ Error submitting form:", error);
            alert("Failed to submit. Please check your internet and try again.");
        } finally {
            spinner.style.display = "none"; // Always hide spinner
        }
    });
});
