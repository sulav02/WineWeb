// Import the functions from header.js and  footer.js
import { appendFooterToElement } from '../../components/footer/footer.js';
import { appendHeaderToElement } from '../../components/header/header.js';
import { createWineReviewComponent } from '../../components/WineLinkReview.js';
import * as linkController from "../../../controller/linkController.js"
import { transformToFavoriteUiWineLinksList } from '../../../constant/transformToUiWineLinksList.js';

const isLoggedIn = Boolean(localStorage.getItem('token'));
appendHeaderToElement('header-container', isLoggedIn);
appendFooterToElement('footer-container');


// Reference to the dropdown
const sortDropdown = document.getElementById('sortDropdown');

// Helper function to clear and re-render the wine components
function renderFavouriteWineList(wineData) {
    const hiddenLinksList = document.getElementById("favourites-links-list");
    hiddenLinksList.innerHTML = "" // Clear existing content

    const noFavouritesMessage = document.getElementById("no-favourites-message");

    if (wineData && wineData.length > 0) {
        // Hide the no-Favourites-message
        noFavouritesMessage.style.display = "none";

        new createWineReviewComponent({
            containerId: 'favourites-links-list',
            wineList: transformToFavoriteUiWineLinksList(wineData),
            isLoggedIn: isLoggedIn,
            isHidden: false
        });
        
    } else {
        noFavouritesMessage.style.display = "block";
    }
}


const getAllFavouriteMostRecentLinks = async () => {
    try {
        const response = await linkController.getAllFavouriteMostRecentLinks()
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const getAllFavouriteHighestRatedAverageLinks = async () => {
    try {
        const response = await linkController.getAllFavouriteHighestRatedAverageLinks()
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const getAllFavouriteHighestRatedBayesianLinks = async () => {
    try {
        const response = await linkController.getAllFavouriteHighestRatedBayesianLinks()
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
        wineLinksData = await getAllFavouriteHighestRatedAverageLinks();
    } else if (selected === 'bayesian') {
        wineLinksData = await getAllFavouriteHighestRatedBayesianLinks();
    } else {
        wineLinksData = await getAllFavouriteMostRecentLinks();
    }
    renderFavouriteWineList(wineLinksData);
}