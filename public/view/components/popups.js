// Create a generic popup element
export const createPopup = (message = "✅ Action successful ✅") => {
    const popup = document.createElement('div');
    popup.className = 'login-popup-message';
    popup.textContent = message;

    // Automatically hide after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);

    // Trigger the animation on the next frame
    requestAnimationFrame(() => popup.classList.add('show'));


    return popup;
};

export const createErrorNotification = (message = "Action failed") => {
    const popup = document.createElement('div');
    popup.className = 'notification-message-error';
    popup.textContent = message;

    // Automatically hide after 3 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);

    // Trigger the animation on the next frame
    requestAnimationFrame(() => popup.classList.add('show'));


    return popup;
};

// Append popup to any element by ID
export const appendPopupToElement = (elementId, message = "✅ Action successful ✅",success=true) => {
    const container = document.getElementById(elementId);
    if (container) {
        const popup = success === true ? createPopup(message) : createErrorNotification(message);
        container.appendChild(popup);
    } else {
        console.error(`No element found with ID: ${elementId}`);
    }
};
