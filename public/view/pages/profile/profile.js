import { appendHeaderToElement } from '../../components/header/header.js';
import { appendFooterToElement } from '../../components/footer/footer.js';
import { appendPopupToElement } from '../../components/popups.js';
import * as userController from "../../../controller/userController.js"

const isLoggedIn = Boolean(localStorage.getItem('token'));
appendHeaderToElement('header-container', isLoggedIn);
appendFooterToElement('footer-container');

let originalData = {};

document.addEventListener('DOMContentLoaded', async () => {
    const profilePic = document.getElementById('profilePic');
    const fullNameEl = document.getElementById('fullName');
    const inputFullname = document.getElementById('inputFullname');
    const inputEmail = document.getElementById('inputEmail');
    const usernameField = document.querySelector('input[readonly]');
    const submitBtn = document.querySelector('.submit-btn');
    const winePointsEl = document.querySelector('.divider-item .value');
    const memberSinceEl = document.querySelectorAll('.divider-item .value')[1];

    try {
        const response = await userController.getUserProfile();
        const user = response.data
        originalData = { ...user };

        // Populate UI
        profilePic.src = user.picurl;
        fullNameEl.textContent = user.fullname;
        inputFullname.value = user.fullname;
        inputEmail.value = user.email;
        usernameField.value = user.username;
        winePointsEl.textContent = `${user.wine_points} 🍷`;
        memberSinceEl.textContent = new Date(user.created_at).toLocaleDateString('en-GB');

        // Disable button initially
        submitBtn.disabled = true;

        // Enable button if fullname or email changes
        inputFullname.addEventListener('input', toggleSubmitButton);
        inputEmail.addEventListener('input', toggleSubmitButton);

    } catch (err) {
        alert('Failed to load profile.');
    }

    function toggleSubmitButton() {
        const changed = (
            inputFullname.value !== originalData.fullname ||
            inputEmail.value !== originalData.email
        );
        submitBtn.disabled = !changed;
    }
});

// Submit handler
window.handleUpdate = async function (e) {
    e.preventDefault();
    const inputFullname = document.getElementById('inputFullname');
    const inputEmail = document.getElementById('inputEmail');

    const updateData = {
        _id: originalData._id,
        fullname: inputFullname.value,
        email: inputEmail.value
    };

    try {
        const response = await userController.updateUserProfile(updateData);
        if(response.success==true){
            appendPopupToElement('popup-container', "✅ Profile updated successfully! ✅")
        }
        originalData = { ...originalData, ...updateData };
        document.getElementById('fullName').textContent = updateData.fullname;
        document.querySelector('.submit-btn').disabled = true;
    } catch (err) {
        appendPopupToElement('popup-container', `Failed to updae Profile`)
    }
};
