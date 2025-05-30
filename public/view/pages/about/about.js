// Import the functions from header.js and  footer.js
import { appendFooterToElement } from '../../components/footer/footer.js';

import { appendHeaderToElement } from '../../components/header/header.js';


const isLoggedIn = Boolean(localStorage.getItem('token'));  // Example


// Call the function to append the header
appendHeaderToElement('header-container', isLoggedIn);

// Call the function to append the footer
appendFooterToElement('footer-container');  // The ID of the container in your HTML
