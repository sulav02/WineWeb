import * as ratingController from "../../controller/ratingController.js"
import * as linkController from "../../controller/linkController.js"
import { createPopupDialog } from "./dialogs.js"
import { createSuccessDialog } from "./successDialog.js"
import { appendPopupToElement } from "./popups.js";



export function createWineReviewComponent({
    containerId = 'reviewPanel',
    wineList = [],
    isLoggedIn = false,
    isHidden = false,
    onToggleHide = (linkId, hidden) => {
        if(isHidden===true) {
            const popup = createPopupDialog({
                title: '⚠️ Remove From Hidden Link!',
                message: 'Are you sure to remove from your hidden link?',
                confirmText: 'Unhide',
                cancelText: 'Cancel'
            });
            popup.show(async () => {
                const response = await linkController.unhideLink(linkId)
                if (response.success === true) {
                    appendPopupToElement('popup-container', "Unhidden Successful.", true)
                    window.location.reload()
                }
            });
        } else {
            const popup = createPopupDialog({
                title: 'Add to your Hidden Link!',
                message: 'Are you sure to hide this link?',
                confirmText: 'Hide',
                cancelText: 'Cancel'
            });
            popup.show(async () => {
                const response = await linkController.hideLink(linkId)
                if (response.success === true) {
                    appendPopupToElement('popup-container', "Hidden Successful.", true)
                    window.location.reload()
                }
            });
        }
    }
}) {
    const member_id = isLoggedIn == true ? localStorage.getItem("member_id") : ""
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
    }

    const feedback = {
        0: "No rating yet 😶",
        0.5: "😞 Very Poor Experience    0.5/5",
        1: "😟 Poor Experience         1/5",
        1.5: "🙁 Below Average          1.5/5",
        2: "😕 Needs Improvement      2/5",
        2.5: "😐 Neutral Experience     2.5/5",
        3: "🙂 Fair Experience        3/5",
        3.5: "😊 Good Experience        3.5/5",
        4: "😃 Great Experience       4/5",
        4.5: "🤩 Excellent Experience   4.5/5",
        5: "🥂 Outstanding Experience 5/5"
    };

    container.innerHTML = '';

    wineList.forEach((wine, index) => {
        const {
            _id = wine._id,
            title,
            url,
            description,
            fullName,
            profilePic,
            winePoints,
            avgRating,
            defaultRating,
            userReview,
            allowUserRating = isLoggedIn === true,
        } = wine;

        const accordion = document.createElement('div');
        accordion.className = 'accordion';

        accordion.innerHTML = `
    <div class="accordion-header">
    <span>${title}</span>
    <div id="popup-container"></div>
        <div class="profile-container" data-toggle-container>
            <div class="profile-toggle-content" data-toggle-content>
                <img src="${profilePic}" alt="${fullName}" class="profile-pic" />
                <div class="profile-name-hover">${fullName}</div>
            </div>
        </div>
    </div>
    <div class="accordion-body">
        <a class="wine-link" href="${url}" target="_blank">${url}</a>
        <p>${description}</p>
        <div class="wine-meta"><strong>Wine Points:</strong> ${winePoints} </div>
        <div class="wine-meta"><strong>Average Rating:</strong> ${avgRating} / 5</div>
        <div class="rating-container" data-rating-index="${index}">
            ${[1, 2, 3, 4, 5].map(i => `<span class="star" data-index="${i}">★</span>`).join('')}
        </div>
        <div class="interpretation" id="interpretation-${index}">${feedback[isLoggedIn === true ? defaultRating : 0] || feedback[0]}</div>
        <textarea placeholder="Write your review..." ${!allowUserRating ? 'disabled' : ''}>${isLoggedIn === true ? (defaultRating !== 0 && userReview ? userReview : (defaultRating === 0 ? "" : "No Review Given")) : ""}</textarea>
        <div class="accordion-actions">
        <button class="submit-btn" ${!allowUserRating ? 'disabled' : ''}>Submit Review</button>
        </div>
        <button class="toggle-hide-btn" data-hidden="${isHidden}" data-id="${_id}">${isLoggedIn === true ? (isHidden ? 'Unhide' : 'Hide this link'):""}</button>
                
        <div class="profile-bottom">
        <img src="${profilePic}" alt="${fullName}" class="profile-pic" />
        <span>${fullName}</span>
        </div>
    </div>
`;


        container.appendChild(accordion);

        const stars = accordion.querySelectorAll('.star');
        const interp = accordion.querySelector(`#interpretation-${index}`);
        const ratingContainer = accordion.querySelector('.rating-container');

        let currentRating = isLoggedIn == true ? defaultRating : 0;
        updateStars(stars, currentRating);

        // Accordion toggle behavior
        accordion.querySelector('.accordion-header').addEventListener('click', () => {
            const isActive = accordion.classList.contains('active');
            document.querySelectorAll('.accordion').forEach(a => a.classList.remove('active'));
            if (!isActive) accordion.classList.add('active');
        });

        // Hide/Unhide toggle
        const toggleBtn = accordion.querySelector('.toggle-hide-btn');
        toggleBtn.addEventListener('click', () => {
            const isHiddenNow = toggleBtn.dataset.hidden === "true";
            const newHidden = !isHiddenNow;
            
            // Update UI
            // toggleBtn.textContent = newHidden ? "Unhide" : "Hide";
            toggleBtn.dataset.hidden = newHidden;

            // Callback to parent (e.g. to update backend)
            onToggleHide(_id, isHiddenNow);
        });



        // If user is not logged in, show message on hover or touch
        if (!isLoggedIn) {
            const handleNotLoggedIn = () => {
                const popup = createPopupDialog({
                    title: '⚠️ Login Required!',
                    message: 'You are not logged in. Please log in to continue rating.',
                    confirmText: 'Login Now',
                    cancelText: 'Cancel'
                });
                popup.show(() => {
                    window.location.href = "../../pages/login/login.html";
                });
                console.log("⚠️ You are not logged in. Please log in to rate.");
            };
            ratingContainer.addEventListener('mouseenter', handleNotLoggedIn);
            ratingContainer.addEventListener('touchstart', handleNotLoggedIn, { once: true });
        }

        if (!allowUserRating) return;



        // Star hover + selection
        ratingContainer.addEventListener('mousemove', e => {
            let rating = 0;
            stars.forEach((star, i) => {
                const rect = star.getBoundingClientRect();
                const isHalf = (e.clientX - rect.left) < rect.width / 2;
                if (e.clientX >= rect.left && e.clientX <= rect.right) {
                    rating = i + (isHalf ? 0.5 : 1);
                }
            });
            if (rating === 0) rating = 0.5;
            updateStars(stars, rating);
            interp.textContent = feedback[rating] || "❓ Unknown Rating";
        });

        ratingContainer.addEventListener('mouseleave', () => {
            updateStars(stars, currentRating);
            interp.textContent = feedback[currentRating] || feedback[0];
        });

        ratingContainer.addEventListener('click', e => {
            let rating = 0;
            stars.forEach((star, i) => {
                const rect = star.getBoundingClientRect();
                const isHalf = (e.clientX - rect.left) < rect.width / 2;
                if (e.clientX >= rect.left && e.clientX <= rect.right) {
                    rating = i + (isHalf ? 0.5 : 1);
                }
            });
            if (rating === 0) rating = 0.5;
            currentRating = rating;
            updateStars(stars, currentRating);
            interp.textContent = feedback[currentRating];
        });

        // Submit logic
        const submitBtn = accordion.querySelector('.submit-btn');
        submitBtn.addEventListener('click', async () => {
            const textarea = accordion.querySelector('textarea');
            const text = textarea.value.trim();
            if (!currentRating) { return appendPopupToElement('popup-container', "Please select a rating.", false) }
            if (!text) { return appendPopupToElement('popup-container', "Please write your review.", false) };
            const ratingData = {
                member_id: member_id,
                link_id: _id,
                rating: currentRating,
                review: text
            }
            const response = await ratingController.addNewRating(ratingData);
            if (response.success === true) {
                // Example usage
                const myDialog = createSuccessDialog({
                    title: 'Rating Added',
                    message: 'Your Rating & Review has been added successfully!',
                    confirmText: 'Okay'
                });
                myDialog.show(() => {
                    myDialog.hide()
                    window.location.reload()
                })
            } else {
                appendPopupToElement('popup-container', "Something went wrong.", false)
            }
            // alert(`✅ Review for "${title}" submitted!\nRating: ${currentRating} stars\nText: ${text}`);
            textarea.value = '';
            currentRating = 0;
            updateStars(stars, 0);
            interp.textContent = feedback[0];
        });

    });

    function updateStars(stars, rating) {
        stars.forEach((star, index) => {
            const i = index + 1;
            star.classList.remove('full', 'half');
            if (rating >= i) {
                star.classList.add('full');
            } else if (rating + 0.5 === i) {
                star.classList.add('half');
            }
        });
    }
}
