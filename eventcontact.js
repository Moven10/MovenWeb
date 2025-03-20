document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript loaded!");

    const newsletterForm = document.getElementById("newsletterForm");
    const submitButton = newsletterForm.querySelector("button[type='submit']");
    const successContainer = document.getElementById("successContainer");
    const successMessage = document.getElementById("successMessage");
    const responseMessage = document.getElementById("responseMessage");
    const loadingSpinner = document.getElementById("loadingSpinner");

    const API_URL = "https://alpaca-bursting-koala.ngrok-free.app/subscribe-newsletter";

    if (!newsletterForm) {
        console.error("❌ Form not found! JavaScript may not be linked properly.");
        return;
    }

    console.log("✅ Form found!");

    newsletterForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload
        console.log("✅ Form submission prevented!");

        const email = document.getElementById("email").value.trim();
        const name = document.getElementById("name").value.trim();
        const company = document.getElementById("company").value.trim();

        // Validation check
        if (!email || !name || !company) {
            responseMessage.textContent = "Please fill in all fields.";
            responseMessage.style.color = "red";
            responseMessage.style.display = "block";
            return;
        }

        // Show spinner and disable button
        loadingSpinner.style.display = "block";
        submitButton.disabled = true;
        responseMessage.style.display = "none"; // Hide any previous messages

        try {
            console.log("🔄 Sending request to:", API_URL);
            console.log("📩 Payload:", { email, name, company });

            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name, company }),
            });

            console.log("✅ Response received:", response);

            // If response is not JSON, handle error
            let result;
            try {
                result = await response.json();
            } catch (jsonError) {
                console.error("⚠️ Response is not valid JSON:", jsonError);
                throw new Error("Server response was not JSON.");
            }

            // Hide spinner
            loadingSpinner.style.display = "none";
            submitButton.disabled = false;

            if (response.ok) {
                // ✅ Hide form fields & show success message with tick
                newsletterForm.style.display = "none";
                successContainer.style.display = "flex"; // Show the success container

                console.log("🎉 Success:", result.message);

                newsletterForm.reset(); // Clear the form
            } else {
                responseMessage.textContent = `Try again: ${result.message || "Something went wrong."}`;
                responseMessage.style.color = "red";
                responseMessage.style.display = "block";
                console.error("⚠️ Backend error:", result.message);
            }
        } catch (error) {
            console.error("🚨 Fetch error:", error);
            loadingSpinner.style.display = "none";
            submitButton.disabled = false;

            responseMessage.textContent = "Try again. Check your internet connection.";
            responseMessage.style.color = "red";
            responseMessage.style.display = "block";
        }
    });
});
