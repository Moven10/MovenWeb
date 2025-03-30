document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#partnerForm");
    if (!form) {
        console.error("❌ Form not found in the DOM!");
        return;
    }

    const submitButton = form.querySelector("button[type='submit']");

    // ✅ Create a success message element with a black checkmark
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.style.display = "none";
    successMessage.innerHTML = `
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="black" d="M9 16.2l-4.2-4.2-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
        </svg>
        Thank you for your interest! Check your email for confirmation.
    `;
    form.appendChild(successMessage);

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // ✅ Prevent default form submission

        // ✅ Store original button text
        const originalButtonText = submitButton.innerHTML;

        // ✅ Show spinner inside button
        submitButton.innerHTML = `<div class="loading-spinner"></div>`;
        submitButton.disabled = true;

        // ✅ Collect form data safely
        const formData = {
            email: document.getElementById("email").value.trim(),
            company: document.getElementById("company").value.trim(),
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            workType: document.getElementById("agency").value,
            employees: document.getElementById("employees").value,
            location: document.getElementById("location").value.trim(),
            budget: document.getElementById("budget").value,
            goals: document.getElementById("goals").value.trim()
        };

        console.log("📡 Sending form data:", JSON.stringify(formData, null, 2)); // Debugging

        try {
            const response = await fetch("https://alpaca-bursting-koala.ngrok-free.app/submit-partnership-form", {
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

            // ⏳ Keep spinner for a smooth transition before success message
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText; // Restore button text
                submitButton.disabled = false; // Re-enable button
                successMessage.style.display = "flex";
                successMessage.classList.add("fade-in");
            }, 2000); // 2-second delay for smooth UI transition

            form.reset(); // ✅ Clear form fields after successful submission

        } catch (error) {
            console.error("❌ Error submitting form:", error);
            alert("Submission failed. Please check your internet and try again.");
            submitButton.innerHTML = originalButtonText; // Restore button text
            submitButton.disabled = false; // Re-enable button
        }
    });
});
