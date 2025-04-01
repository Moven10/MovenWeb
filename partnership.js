// partnership.js

// Toggle dropdown menus and rotate the arrow on click
document.querySelectorAll('.dropdown-button').forEach(button => {
    button.addEventListener('click', () => {
        const dropdown = button.closest('.dropdown'); // Find parent .dropdown
        const menu = dropdown.querySelector('.dropdown-menu'); // Find the dropdown menu

        // Toggle 'open' class for arrow rotation
        dropdown.classList.toggle('open');

        // Show or hide the dropdown menu
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    });
});

// Close dropdowns if clicked outside
document.addEventListener('click', (event) => {
    const isDropdown = event.target.closest('.dropdown');
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        if (!isDropdown || dropdown !== isDropdown) {
            dropdown.classList.remove('open');
            dropdown.querySelector('.dropdown-menu').style.display = 'none';
        }
    });
});

// Form validation and submission
document.addEventListener("DOMContentLoaded", function () {
    const formFields = document.querySelectorAll(".registration-form input");
    const submitButton = document.getElementById("submit-btn");
    const pageContent = document.getElementById("page-content");

    // Form validation
    function validateForm() {
        let isValid = true;

        formFields.forEach((field) => {
            if (field.value.trim() === "") {
                isValid = false;
            }
        });

        if (isValid) {
            submitButton.style.backgroundColor = "#00aaff";
            submitButton.style.cursor = "pointer";
            submitButton.disabled = false;
        } else {
            submitButton.style.backgroundColor = "#000";
            submitButton.style.cursor = "not-allowed";
            submitButton.disabled = true;
        }
    }

    // Form submission
    async function sendFormData(event) {
        try {
            event.preventDefault();

            const formData = {
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                businessNumber: document.getElementById("business-number").value,
                businessName: document.getElementById("business-name").value,
                email: document.getElementById("email").value,
                country: document.getElementById("country").value,
            };

            const apiUrl = "https://api.startmoven.com/send-form-email";

            pageContent.style.filter = "blur(5px)";

            const overlay = document.createElement("div");
            overlay.id = "loading-overlay";
            overlay.style.position = "fixed";
            overlay.style.top = "0";
            overlay.style.left = "0";
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            overlay.style.color = "#fff";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = "1000";
            overlay.style.fontSize = "1.5rem";
            overlay.innerHTML = `<div>Loading...</div>`;
            document.body.appendChild(overlay);

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Failed to submit the form. HTTP status: ${response.status}`);
            }

            const data = await response.json();
            overlay.innerHTML = `<div>Successfully Submitted!</div>`;
            setTimeout(() => {
                pageContent.style.filter = "none"; // Remove blur effect
                window.location.href = "index.html"; // Redirect to the home page
            }, 2000); // Wait 2 seconds before redirecting

        } catch (error) {
            console.error("Error during form submission:", error);
            alert("An error occurred while submitting the form. Please try again.");
            pageContent.style.filter = "none";
            const overlay = document.getElementById("loading-overlay");
            if (overlay) overlay.remove();
        }
    }

    validateForm();

    // Validate the form on input changes
    formFields.forEach((field) => {
        field.addEventListener("input", validateForm);
    });

    // Handle form submission
    submitButton.addEventListener("click", sendFormData);
});
