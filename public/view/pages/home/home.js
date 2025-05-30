// Import the functions from footer.js
import { appendFooterToElement } from '../../components/footer/footer.js';
import { appendPopupToElement } from '../../components/popups.js';
import { appendHeaderToElement } from '../../components/header/header.js';
import { createWineReviewComponent } from '../../components/WineLinkReview.js';
import * as linkController from "../../../controller/linkController.js"
import { transformToUiWineLinksList } from '../../../constant/transformToUiWineLinksList.js';

const isLoggedIn = Boolean(localStorage.getItem('token'));  // Example
const fullname = localStorage.getItem('fullname');


// Call the function to append the header
appendHeaderToElement('header-container', isLoggedIn);

// Call the function to append the header
if (localStorage.getItem("showLoginPopup") === "true") {
    appendPopupToElement('popup-container', "✅ Login successful ✅")
    localStorage.removeItem('showLoginPopup');
}

// Call the function to append the footer
appendFooterToElement('footer-container');  // The ID of the container in your HTML


if (fullname) {
    const firstName = fullname.split(' ')[0];
    const welcomeMessageEl = document.getElementById('welcome-message');
    if (welcomeMessageEl) {
        welcomeMessageEl.textContent = ` Welcome back , ${firstName} 👋🍷`;
    }
}


// Reference to the dropdown
const sortDropdown = document.getElementById('sortDropdown');

// Helper function to clear and re-render the wine components
function renderWineList(wineData) {
    const reviewPanel = document.getElementById('reviewPanel');
    reviewPanel.innerHTML = ''; // Clear existing content

    const noLinkMessage = document.getElementById("no-link-message");

    if (wineData && wineData.length > 0) {
        // Hide the no-link-message
        noLinkMessage.style.display = "none";
        new createWineReviewComponent({
            containerId: 'reviewPanel',
            wineList: transformToUiWineLinksList(wineData),
            isLoggedIn:isLoggedIn
        });
    } else {
        noLinkMessage.style.display = "block";
    }
}


// Data fetching functions
const getAllMostRecentLinks = async () => {
    try {
        const response = await linkController.getAllMostRecentLinks();
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getHighestRatedAverageLinks = async () => {
    try {
        const response = await linkController.getHighestRatedAverageLinks();
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const getHighestRatedBayesianLinks = async () => {
    try {
        const response = await linkController.getHighestRatedBayesianLinks();
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// Extracted function to fetch and render based on dropdown selection
async function fetchAndRenderBySort(selected) {
    let wineLinksData;

    if (selected === 'avg') {
        wineLinksData = await getHighestRatedAverageLinks();
    } else if (selected === 'bayesian') {
        wineLinksData = await getHighestRatedBayesianLinks();
    } else {
        wineLinksData = await getAllMostRecentLinks(); // default
    }
    renderWineList(wineLinksData);
}

// Usage on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchAndRenderBySort(sortDropdown.value);
});

// Usage on dropdown change
sortDropdown.addEventListener('change', (e) => {
    const selected = e.target.value;
    fetchAndRenderBySort(selected);
});
