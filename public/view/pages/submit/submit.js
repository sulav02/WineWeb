// Import the functions from footer.js
import { appendFooterToElement } from '../../components/footer/footer.js';
import { appendHeaderToElement } from '../../components/header/header.js';
import { appendPopupToElement } from '../../components/popups.js';
import * as linkController from "../../../controller/linkController.js"
import { formatAndValidateUrl } from "../../validator.js"

const isLoggedIn = Boolean(localStorage.getItem('token'));  // Example


// Call the function to append the header
appendHeaderToElement('header-container', isLoggedIn);
// Call the function to append the footer
appendFooterToElement('footer-container');  // The ID of the container in your HTML

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('link-form');
    const titleInput = document.getElementById('title');
    const urlValidation = document.getElementById('url-validation');
    const urlInput = document.getElementById('url');
    const descriptionInput = document.getElementById('description');
    const submitBtn = form.querySelector('button[type="submit"]');


    // Watch only URL input to show/hide the error message on typing
    urlInput.addEventListener('input', () => {
        const url = urlInput.value.trim();

        // Show error only if user started typing AND URL is invalid
        if (url.length > 0 && !formatAndValidateUrl(url)) {
            urlValidation.hidden = false
        } else {
            urlValidation.hidden = true
        }
    });

    const originalData = {
        title: '',
        url: '',
        description: ''
    };

    // Disable submit button initially
    submitBtn.disabled = true;

    function toggleSubmitButton() {
        const title = titleInput.value.trim();
        const url = urlInput.value.trim();
        const description = descriptionInput.value.trim();

        const formattedUrl = formatAndValidateUrl(url);

        const allFilled = title !== '' && url !== '' && description !== '';
        const allChanged =
            title !== originalData.title &&
            formattedUrl !== originalData.url &&
            description !== originalData.description;

        submitBtn.disabled = !(allFilled && allChanged && formattedUrl !== null);
    }

    [titleInput, urlInput, descriptionInput].forEach((input) => {
        input.addEventListener('input', toggleSubmitButton);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        let url = urlInput.value.trim();
        const description = descriptionInput.value.trim();

        // Validate and format URL before submitting
        const validUrl = formatAndValidateUrl(url);

        if (!validUrl) {
            appendPopupToElement('popup-container', "❌ Please enter a valid URL.");
            return;
        }

        const linkData = {
            title,
            url: validUrl,
            description
        };

        try {
            const response = await linkController.addNewLink(linkData);
            if (response?.success) {
                appendPopupToElement('popup-container', "✅ Link submitted successfully!");

                // Update originalData
                Object.assign(originalData, linkData);

                form.reset();
                submitBtn.disabled = true;
            } else {
                appendPopupToElement('popup-container', "❌ Failed to submit link");
            }
        } catch (err) {
            appendPopupToElement('popup-container', "❌ Error submitting link");
        }
    });
});
