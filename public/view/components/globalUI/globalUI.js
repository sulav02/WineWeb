const wineList = [
    {
        title: "1. Perfect Wine Match 🥂",
        url: "https://example.com/red-wine",
        description: "This link helped me find the perfect wine I was looking for. It tastes amazing🥂. Highly recommended!",
        
    },
    {
        title: "2. Crisp White",
        url: "https://example.com/crisp-white",
        description: "Great for hot afternoons and light dishes. Very refreshing!",
        
    },
    {
        title: "3. Budget Pick",
        url: "https://example.com/budget-pick",
        description: "Surprisingly good for the price. Not complex but easy to enjoy.",
        
    },
    {
        title: "4. Sparkling Joy 🥂",
        url: "https://example.com/sparkling",
        description: "Effervescent and delightful. Excellent for celebrations.",
        
    },
    {
        title: "5. Bold & Aged",
        url: "https://example.com/bold-aged",
        description: "Rich flavors with a long finish. Aged to perfection.",
        
    }
];

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


const reviewPanel = document.getElementById('reviewPanel');
let userRatings = Array(wineList.length).fill(0);

// Build accordions dynamically
wineList.forEach((wine, index) => {
    const accordion = document.createElement('div');
    accordion.className = 'accordion';
    accordion.innerHTML = `
        <div class="accordion-header">
<span>${wine.title}</span>
<div class="profile-container">
    <img src="https://i.pravatar.cc/36?img=5" alt="John Doe" class="profile-pic" />
    <div class="profile-name-hover">John Doe</div>
</div>
</div>
            <div class="accordion-body">
                <a class="wine-link" href="${wine.url}" target="_blank">${wine.url}</a>
                <p>${wine.description}</p>
                <div class="wine-meta"><strong>Wine Points:</strong> ${wine.winePoints} / 100</div>
                <div class="wine-meta"><strong>Average Rating:</strong> ${wine.avgRating} / 5</div>
                <div class="rating-container" data-rating-index="${index}">
                    ${[1, 2, 3, 4, 5].map(i => `<span class="star" data-index="${i}">★</span>`).join('')}
                </div>
                <div class="interpretation" id="interpretation-${index}">No rating yet 😶</div>
                <textarea placeholder="Write your review..."></textarea>
                <button class="submit-btn">Submit Review</button>
                <div class="profile-bottom">
                    <img src="https://i.pravatar.cc/36?img=5" alt="John Doe" class="profile-pic" />
                    <span>John Doe</span>
                </div>
            </div>
    `;
    reviewPanel.appendChild(accordion);
});

// Accordion toggle logic
const accordions = document.querySelectorAll('.accordion');
accordions.forEach((acc, i) => {
    acc.querySelector('.accordion-header').addEventListener('click', () => {
        accordions.forEach((other, j) => {
            if (i !== j) other.classList.remove('active');
        });
        acc.classList.toggle('active');
    });
});

// Rating interactions
document.querySelectorAll('.rating-container').forEach((container, groupIndex) => {
    const stars = container.querySelectorAll('.star');
    const interp = document.getElementById(`interpretation - ${groupIndex} `);

    container.addEventListener('mousemove', e => {
        let rating = 0;
        stars.forEach((star, i) => {
            const starRect = star.getBoundingClientRect();
            if (e.clientX >= starRect.left && e.clientX <= starRect.right) {
                const half = (e.clientX - starRect.left) < starRect.width / 2 ? 0.5 : 1;
                rating = i + half;
            }
        });
        if (rating === 0) rating = 0.5;
        updateStars(stars, rating);
        interp.textContent = feedback[rating] || "❓ Unknown Rating";
    });

    container.addEventListener('mouseleave', () => {
        updateStars(stars, userRatings[groupIndex]);
        interp.textContent = feedback[userRatings[groupIndex]] || "No rating yet 😶";
    });

    container.addEventListener('click', e => {
        let rating = 0;
        stars.forEach((star, i) => {
            const starRect = star.getBoundingClientRect();
            if (e.clientX >= starRect.left && e.clientX <= starRect.right) {
                const half = (e.clientX - starRect.left) < starRect.width / 2 ? 0.5 : 1;
                rating = i + half;
            }
        });
        if (rating === 0) rating = 0.5;
        userRatings[groupIndex] = rating;
        updateStars(stars, rating);
        interp.textContent = feedback[rating];
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

// Submit review button logic
document.querySelectorAll('.submit-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const textarea = btn.previousElementSibling;
        const text = textarea.value.trim();
        if (!userRatings[index]) return alert("Please select a rating.");
        if (!text) return alert("Please write your review.");
        alert(`✅ Review for "${wineList[index].title}" submitted!\nRating: ${userRatings[index]} stars\nText: ${text} `);
        textarea.value = '';
        userRatings[index] = 0;
        const stars = document.querySelectorAll(`.rating - container[data - rating - index="${index}"] .star`);
        updateStars(stars, 0);
        document.getElementById(`interpretation - ${index} `).textContent = feedback[0];
    });
});
