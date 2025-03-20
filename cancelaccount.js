const form = document.getElementById('cancelForm');
const overlay = document.createElement('div'); // Create an overlay for the blur effect
const messageDiv = document.getElementById('message');
const submitButton = document.querySelector('.btn-submit');

// Add overlay styles
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
overlay.style.zIndex = 9999;
overlay.style.display = 'none';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.flexDirection = 'column'; // Ensure the text and button stack vertically
overlay.style.color = 'white';
overlay.style.fontSize = '1.5em';
overlay.style.textAlign = 'center';
document.body.appendChild(overlay);

// Wrap the main content to apply blur only to it
const mainContent = document.createElement('div');
mainContent.id = 'mainContent';
while (document.body.firstChild && document.body.firstChild !== overlay) {
    mainContent.appendChild(document.body.firstChild);
}
document.body.insertBefore(mainContent, overlay);

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Show the confirmation alert before proceeding
    const confirmation = confirm("Are you sure you would like to cancel your Moven Membership?");
    if (!confirmation) return;

    // Prepare the overlay for loading state
    overlay.style.display = 'flex';
    overlay.textContent = 'Canceling Membership...';
    mainContent.style.filter = 'blur(5px)';
    submitButton.disabled = true;

    // Extract username and password from the form
    const formData = {
        username: form.username.value,
        password: form.password.value, // Include the password field
    };

    try {
        const response = await fetch('http://localhost:8080/cancel-subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            // Show success message and "Close" button
            overlay.innerHTML = `
                <p>MoverPro has been cancelled and you will no longer be billed.<br>
                We are sad to see you go...</p>
                <button id="closeBtn" style="
                    margin-top: 20px; 
                    padding: 10px 20px; 
                    background-color: black; 
                    color: white; 
                    border: none; 
                    border-radius: 5px; 
                    cursor: pointer;
                ">Close</button>
            `;

            // Add event listener to close button
            const closeButton = document.getElementById('closeBtn');
            closeButton.addEventListener('click', () => {
                window.location.href = 'index.html'; // Redirect to index.html
            });
        } else {
            // Error message, no blur
            overlay.style.display = 'none';
            mainContent.style.filter = 'none';
            messageDiv.innerHTML = `<p style="color:red; text-align: center;">Error: ${data.message}</p>`;
        }
    } catch (error) {
        // Network or unexpected error
        overlay.style.display = 'none';
        mainContent.style.filter = 'none';
        messageDiv.innerHTML = `<p style="color:red; text-align: center;">Failed to cancel membership. Please try again later.</p>`;
    } finally {
        submitButton.disabled = false;
    }
});
