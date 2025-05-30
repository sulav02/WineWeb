// Import the functions from header.js and  footer.js
import { appendFooterToElement } from '../../components/footer/footer.js';
import { appendHeaderToElement } from '../../components/header/header.js';
import { createWineReviewComponent } from '../../components/WineLinkReview.js';
import * as linkController from "../../../controller/linkController.js"
import { transformToUiWineLinksList } from '../../../constant/transformToUiWineLinksList.js';

const isLoggedIn = Boolean(localStorage.getItem('token'));
appendHeaderToElement('header-container', isLoggedIn);
appendFooterToElement('footer-container');


// Reference to the dropdown
const sortDropdown = document.getElementById('sortDropdown');

// Helper function to clear and re-render the wine components
function renderHiddenWineList(wineData) {
    const hiddenLinksList = document.getElementById("hidden-links-list");
    hiddenLinksList.innerHTML = "" // Clear existing content
    const noHiddenMessage = document.getElementById("no-hidden-message");

    if (wineData && wineData.length > 0) {
        // Hide the no-hidden-message
        noHiddenMessage.style.display = "none";

        new createWineReviewComponent({
            containerId: 'hidden-links-list',
            wineList: transformToUiWineLinksList(wineData),
            isLoggedIn: isLoggedIn,
            isHidden: true
        });
    } else {
        // Show the no-hidden-message
        noHiddenMessage.style.display = "block";
    }
}


const getAllHiddenMostRecentLinks = async () => {
    try {
        const response = await linkController.getAllHiddenMostRecentLinks()
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const getAllHiddenHighestRatedAverageLinks = async () => {
    try {
        const response = await linkController.getAllHiddenHighestRatedAverageLinks()
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const getAllHiddenHighestRatedBayesianLinks = async () => {
    try {
        const response = await linkController.getAllHiddenHighestRatedBayesianLinks()
        return response.data
    } catch (error) {
        console.log(error);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    fetchAndRenderBySort(sortDropdown.value);
});

sortDropdown.addEventListener('change', (e) => {
    const selected = e.target.value;
    fetchAndRenderBySort(selected);
});


// Handle dropdown change
async function fetchAndRenderBySort(selected) {
    let wineLinksData;

    if (selected === 'avg') {
        wineLinksData = await getAllHiddenHighestRatedAverageLinks();
    } else if (selected === 'bayesian') {
        wineLinksData = await getAllHiddenHighestRatedBayesianLinks();
    } else {
        wineLinksData = await getAllHiddenMostRecentLinks();
    }

    renderHiddenWineList(wineLinksData);
}