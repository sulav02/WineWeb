// Import the functions from header.js and  footer.js
// Import the functions from footer.js
import { appendFooterToElement } from '../../components/footer/footer.js';
import { appendPopupToElement } from '../../components/popups.js';
import { appendHeaderToElement } from '../../components/header/header.js';

import { createWineReviewComponent } from '../../components/WineLinkReview.js';

const isLoggedIn = Boolean(localStorage.getItem('token'));
appendHeaderToElement('header-container', isLoggedIn);
appendFooterToElement('footer-container');

document.addEventListener("DOMContentLoaded", async () => {
    const hiddenLinksList = document.getElementById("hidden-links-list");
    const noHiddenMsg = document.getElementById("no-hidden-message");

    // TODO: Replace with your API call to fetch hidden links
    async function fetchHiddenLinks() {
        return [
            {
                _id: "1",
                title: "Hidden Link Example",
                url: "https://hidden-example.com",
                description: "This is a hidden link description."
            },
            {
                _id: "2",
                title: "Secret Page",
                url: "https://secretpage.com",
                description: "Hidden link with important info."
            }
        ];
    }

    // TODO: Replace with your API call to unhide a link by ID
    async function unhideLink(linkId) {
        try {
            // Example API call:
            // const res = await fetch(`/api/links/unhide/${linkId}`, {
            //   method: "PATCH",
            //   headers: {
            //     "Content-Type": "application/json",
            //     Authorization: "Bearer your_token_here"
            //   }
            // });
            // const data = await res.json();
            // return data.success;

            console.log(`Unhiding link ID: ${linkId}`);
            // Simulate delay and success
            return new Promise(resolve => setTimeout(() => resolve(true), 500));
        } catch (error) {
            console.error("Failed to unhide link", error);
            return false;
        }
    }

    try {
        const hiddenLinks = await fetchHiddenLinks();

        if (!hiddenLinks.length) {
            noHiddenMsg.style.display = "block";
            hiddenLinksList.style.display = "none";
            return;
        }

        noHiddenMsg.style.display = "none";
        hiddenLinksList.style.display = "flex";

        hiddenLinks.forEach(link => {
            const card = document.createElement("div");
            card.className = "hidden-link-card";

            card.innerHTML = `
          <div class="hidden-link-title">${link.title}</div>
          <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="hidden-link-url">${link.url}</a>
          <div class="hidden-link-description">${link.description || "No description"}</div>
        `;

            // Create Unhide button
            const btn = document.createElement("button");
            btn.className = "unhide-button";
            btn.textContent = "Unhide";
            btn.addEventListener("click", async () => {
                btn.disabled = true;
                btn.textContent = "Unhiding...";
                const success = await unhideLink(link._id);
                if (success) {
                    // Remove card on success
                    card.remove();
                    if (hiddenLinksList.children.length === 0) {
                        noHiddenMsg.style.display = "block";
                        hiddenLinksList.style.display = "none";
                    }
                } else {
                    btn.disabled = false;
                    btn.textContent = "Unhide";
                    alert("Failed to unhide link. Please try again.");
                }
            });

            card.appendChild(btn);
            hiddenLinksList.appendChild(card);
        });
    } catch (error) {
        console.error("Failed to load hidden links", error);
        noHiddenMsg.textContent = "Error loading hidden links. Please try again later.";
        noHiddenMsg.style.display = "block";
    }
});
  