// Import footer and header
import { appendFooterToElement } from '../../components/footer/footer.js';
import { appendHeaderToElement } from '../../components/header/header.js';

const isLoggedIn = Boolean(localStorage.getItem('token'));
appendHeaderToElement('header-container', isLoggedIn);
appendFooterToElement('footer-container');

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !message) {
        status.textContent = "Please fill in all fields.";
        status.style.color = "red";
        return;
    }

    // Simulated form submission (could be extended to send data to a backend)
    status.textContent = "✅ Your message has been sent. Thank you!";
    status.style.color = "green";

    // Reset form
    event.target.reset();
});
