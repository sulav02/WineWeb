// Function to create the footer
export const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('about-footer');

    footer.innerHTML = `
        <p><strong>Copyright&copy; 2025 &nbsp; Wine &nbsp;Links &nbsp; by &nbsp; Sulav Dhakal</strong></p>
        <p>
            <a href="../../pages/home/home.html">Home</a> |
            <a href="../../pages/privacy/privacy.html">Privacy Policy</a> |
            <a href="../../pages/terms/terms.html">Terms of Use</a> |
            <a href="../../pages/contact/contact.html">Contact</a>
        </p>
        <p class="footer-note">
            <strong>Built for ITECH3108 • Passion for wine, tech, and community 🍷🍷</strong>
        </p>
    `;

    return footer;
}

// Function to add the footer to a specific element by its ID
export const appendFooterToElement = (elementId) => {
    const footerContainer = document.getElementById(elementId);
    if (footerContainer) {
        footerContainer.appendChild(createFooter());
    } else {
        console.error(`No element found with ID: ${elementId}`);
    }
}
