import { http } from '../../../services/http.js';
import * as controller from '../../../controller/userController.js';


// Import the functions from footer.js
import { appendFooterToElement } from '../../components/footer/footer.js';
// Call the function to append the footer
appendFooterToElement('footer-container');  // The ID of the container in your HTML


// Toggle password visibility
const checkbox = document.getElementById("show-password-checkbox");
const passwordField = document.getElementById("signup-password");

checkbox.addEventListener('change', function () {
    passwordField.type = checkbox.checked ? 'text' : 'password';
});

const form = document.querySelector('form');
const errorDisplay = document.createElement('p');
errorDisplay.style.color = 'red';
form.appendChild(errorDisplay);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDisplay.textContent = '';

    const fullname = form.elements['fullname'].value.trim();
    const username = form.elements['username'].value.trim();
    const email = form.elements['email'].value.trim();
    const password = form.elements['password'].value;

    const data = { fullname, username, email, password };

    try {
        const response = await controller.registerUser(data)
        if (response.success===true) {
            window.location.href = '../login/login.html';
        } else {
            showError(response.message || "❌ Registration failed. Please try again.");  // UI message
        }
        console.log('Registration successful:', response.success);
        // alert(response.message || 'Registration successful! Please log in.');
        // window.location.href = '../login/login.html';
    } catch (error) {
        console.error('Registration error:', error);
        // error should be the parsed JSON error object or {message}
        errorDisplay.textContent = error.message || 'Registration failed. Please try again.';
      }
});

function showError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";

    usernameInput.classList.add("input-error");
    passwordInput.classList.add("input-error");
}