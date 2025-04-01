// Initialize Stripe
const stripe = Stripe('pk_live_51Pd4oWRxRsBHsdbXFrYDCjXTwbKyYw7UgLpoGLY08MJce9wyt5uuK5Q51oz5szREGVn66sx8MxhvRc6VsUNAvLLa00cjOkTvOu'); // Replace with your Stripe publishable key
const elements = stripe.elements();

// Custom styling for the Stripe Elements card input
const style = {
    base: {
        color: '#00796b', // Aqua text color
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        '::placeholder': {
            color: '#b2ebf2' // Placeholder color
        }
    },
    invalid: {
        color: '#e53935', // Red for invalid input
        iconColor: '#e53935'
    }
};

// Create an instance of the card Element with custom styles
const card = elements.create('card', { style: style });
card.mount('#card-element');

// Handle real-time validation errors from the card Element
card.on('change', function (event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Username availability check
const usernameInput = document.getElementById('username');
const usernameStatus = document.getElementById('usernameStatus'); // Div to display status messages

usernameInput.addEventListener('input', async (event) => {
    const username = event.target.value.trim();

    if (!username) {
        usernameStatus.textContent = ''; // Clear the status when input is empty
        usernameStatus.style.color = ''; // Reset color
        return;
    }

    try {
        // Send a request to the backend to check username availability
        const response = await fetch('https://api.startmoven.com/check-username', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });

        const data = await response.json();

        if (data.available) {
            usernameStatus.textContent = '✅ Username is available!';
            usernameStatus.style.color = 'green';
        } else {
            usernameStatus.textContent = '❌ Username is already taken.';
            usernameStatus.style.color = 'red';
        }
    } catch (error) {
        console.error('Error checking username:', error);
        usernameStatus.textContent = '⚠️ Unable to check username availability.';
        usernameStatus.style.color = 'orange';
    }
});

const form = document.getElementById('moverForm');
const spinner = document.getElementById('loading-spinner');
const submitButton = document.querySelector('.btn-submit');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Show the spinner and disable the button
    spinner.style.display = 'block';
    submitButton.disabled = true;

    // Extract form data
    const formData = {
        name: form.name.value,
        username: form.username.value,
        number: form.phone.value,
        email: form.email.value,
        password: form.password.value
    };

    // Create a payment method using the card element
    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
        billing_details: {
            name: formData.name,
            email: formData.email,
        },
    });

    if (error) {
        // Display error in card-errors div
        const displayError = document.getElementById('card-errors');
        displayError.textContent = error.message;
        spinner.style.display = 'none'; // Hide spinner
        submitButton.disabled = false; // Re-enable the button
    } else {
        // Add paymentMethod.id to formData
        formData.paymentMethodId = paymentMethod.id;

        try {
            const response = await fetch('https://api.startmoven.com/create-premium-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Show a success alert or message
                alert('Account created successfully! A confirmation email has been sent.');

                // Redirect to success page
                window.location.href = 'successfull-member.html';  // Redirect to the new HTML page
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            alert('Failed to create account. Please try again.');
        } finally {
            // Hide the spinner and enable the button again
            spinner.style.display = 'none';
            submitButton.disabled = false;
        }
    }
});

// Scroll-triggered animation for headline
document.addEventListener('scroll', () => {
    const moverMemberHeadline = document.querySelector('.headline-scroll');
    const rect = moverMemberHeadline.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        moverMemberHeadline.classList.add('visible');
    }
});
