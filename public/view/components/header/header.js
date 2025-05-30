import { createPopupDialog } from "../dialogs.js"

export const createHeader = (isLoggedIn = false) => {
    const header = document.createElement('header');

    header.innerHTML = `
        <h1>Wine Links - Discover & Share</h1>
        <p>Your community for sharing and rating the best wine links or wine-related content</p>
        <nav>
            <a href="../../pages/home/home.html">Home</a>
            <a href="../../pages/about/about.html">About</a>
            <a href="../../pages/contact/contact.html">Contact</a>
            ${isLoggedIn ? `
                <a href="../../pages/favourites/favourites.html">Favourites</a>
                <a href="../../pages/submit/submitLink.html">Submit a Link</a>
                <a href="../../pages/profile/profile.html">Profile</a>
                <a href="../../pages/hiddenLinks/hiddenLinks.html">Hidden-Links</a>
                 <a href="#" id="logout-link">Logout</a>
            ` : `
                <a href="../../pages/signup/signup.html">Sign Up</a>
                <a href="../../pages/login/login.html">Login</a>
            `}
        </nav>
    `;


    // Attach logout handler after setting innerHTML
    if (isLoggedIn) {
        requestAnimationFrame(() => {
            const logoutLink = header.querySelector('#logout-link');
            if (logoutLink) {
                const popup = createPopupDialog({
                    title: 'Logout Confirmation',
                    message: 'Are you sure that you want to logout?',
                    confirmText: 'Logout',
                    cancelText: 'Cancel'
                });
                logoutLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    popup.show(() => {
                        localStorage.clear()
                        window.location.href = "../../pages/login/login.html";
                    });
                });
            }
        });
    }

    return header;
};

export const appendHeaderToElement = (elementId, isLoggedIn = false) => {
    const container = document.getElementById(elementId);
    if (container) {
        container.appendChild(createHeader(isLoggedIn));
    } else {
        console.error(`Header container with ID "${elementId}" not found.`);
    }
};
