document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript loaded!");

    const athleteForm = document.getElementById("athleteForm");
    if (!athleteForm) {
        console.error("❌ Form not found! JavaScript may not be linked properly.");
        return;
    }

    console.log("✅ Form found!");

    const submitButton = athleteForm.querySelector("button[type='submit']");
    const successContainer = document.getElementById("successContainer");
    const responseMessage = document.getElementById("responseMessage");
    const loadingSpinner = document.getElementById("loadingSpinner");

    const API_URL = "https://alpaca-bursting-koala.ngrok-free.app/api/send-email"; // Ensure this is correct

    athleteForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        console.log("✅ Form submission prevented!");

        // Grab form values safely
        const formData = {
            firstName: document.getElementById("firstName")?.value.trim() || "",
            lastName: document.getElementById("lastName")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            instagram: document.getElementById("instagram")?.value.trim() || "",
            tiktok: document.getElementById("tiktok")?.value.trim() || "",
            youtube: document.getElementById("youtube")?.value.trim() || "",
            twitter: document.getElementById("twitter")?.value.trim() || "",
            brandOrCreator: document.querySelector('input[name="brandOrCreator"]:checked')?.value || "Not specified",
            partnerType: document.querySelector('input[name="partnerType"]:checked')?.value || "Not specified",
            experience: document.getElementById("experience")?.value || "Not specified",
            location: document.getElementById("location")?.value || "Not specified",
        };

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email) {
            responseMessage.textContent = "Please fill in all required fields.";
            responseMessage.style.color = "red";
            responseMessage.style.display = "block";
            return;
        }

        // Show spinner and disable button
        loadingSpinner.style.display = "block";
        submitButton.disabled = true;
        responseMessage.style.display = "none";

        try {
            console.log("🔄 Sending request to:", API_URL);
            console.log("📩 Payload:", formData);

            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            console.log("✅ Response received:", response);

            // Parse JSON response
            const result = await response.json();

            // Hide spinner
            loadingSpinner.style.display = "none";
            submitButton.disabled = false;

            if (response.ok) {
                athleteForm.style.display = "none";
                successContainer.style.display = "flex"; // Show success message

                console.log("🎉 Success:", result.message);
                athleteForm.reset(); // Clear form
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
