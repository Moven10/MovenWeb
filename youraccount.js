async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const loginForm = document.getElementById('login-form');
    const spinnerContainer = document.getElementById('spinner-container'); // Updated ID
    const errorMessage = document.getElementById('error-message');

    // ✅ Clear previous error message
    errorMessage.textContent = '';

    if (!username || !password) {
        showErrorMessage("Please fill in all fields.");
        return;
    }

    try {
        console.log(`Attempting login with: ${username}, ${password}`);

        // ✅ Show spinner and hide form when login starts
        if (spinnerContainer) {
            spinnerContainer.style.display = 'flex';
            loginForm.style.display = 'none';
        }

        const response = await fetch('https://alpaca-bursting-koala.ngrok-free.app/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Login failed. Please try again.');
        }

        const data = await response.json();

        console.log('Login success:', data);

        // ✅ Save username to localStorage after successful login
        localStorage.setItem('username', data.user.username);

        // ✅ Redirect to dashboard
        window.location.href = 'dashboard.html';

    } catch (error) {
        console.error('Login error:', error);

        // ✅ Hide spinner and restore form on error
        if (spinnerContainer) {
            spinnerContainer.style.display = 'none';
            loginForm.style.display = 'flex';
        }

        // ✅ Show error message
        showErrorMessage('Couldn’t find account, try again.');
    }
}

// ✅ Function to show error message
function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}

document.getElementById('login-form').addEventListener('submit', loginUser);
