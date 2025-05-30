// Import the functions from footer.js
import { appendFooterToElement } from '../../components/footer/footer.js';
// Call the function to append the footer
appendFooterToElement('footer-container');  // The ID of the container in your HTML

// JavaScript to toggle the password visibility when the checkbox is clicked
const checkbox = document.getElementById("show-password-checkbox");
const passwordField = document.getElementById("login-password");

checkbox.addEventListener('change', function () {
    passwordField.type = checkbox.checked ? 'text' : 'password';
});


import * as userController from "../../../controller/userController.js"

// Handle form submission
const form = document.querySelector("form");

const errorDisplay = document.getElementById("error-message");
const usernameInput = form.elements["usernameOrEmail"];
const passwordInput = form.elements["password"];

function showLoginPopup() {
    const popup = document.getElementById('login-popup');
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000); // hide after 2 seconds
}

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission

    errorDisplay.textContent = ""; // clear previous errors
    errorDisplay.style.display = "none";
    usernameInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");

    const usernameOrEmail = form.elements["usernameOrEmail"].value;
    const password = form.elements["password"].value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isGivenEmail = emailRegex.test(usernameOrEmail)
    const loginData = {
        email: isGivenEmail == true ? usernameOrEmail : undefined,
        username: isGivenEmail != true ? usernameOrEmail : undefined,
        password
    };

    try {
        const response = await userController.loginUser(loginData)
       
        if (response.success === true) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('member_id', response.data._id);
            localStorage.setItem('fullname', response.data.fullname);
            localStorage.setItem('username', response.data.username);
         
            // Set a flag to show popup on homepage
            localStorage.setItem('showLoginPopup', 'true');
            window.location.href = '../../pages/home/home.html';

        } else {
            showError(response.message || "❌ Login failed. Please try again.");  // UI message
        }

    } catch (err) {
        console.error("Login failed:", err);

        showError(err.message || "❌ Login failed. Please try again.");  // UI message
    }
});

function showError(message) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = "block";

    usernameInput.classList.add("input-error");
    passwordInput.classList.add("input-error");
}