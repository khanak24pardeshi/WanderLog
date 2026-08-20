// ================================
// WANDERLOG - DESTINATION STORIES
// ================================

const destinationData = {
    1: {
        title: "Find inspiration",
        location: "EXPLORE THE UNKNOWN",
        story:
            "Discover places, ideas and experiences that make you want to pack your bags. Every journey begins with a single thought — where should I go next?"
    },

    2: {
        title: "Tell your story",
        location: "YOUR JOURNEY, YOUR WORDS",
        story:
            "Turn your journeys into personal stories. Write about the places you visited, the people you met and the moments that made your journey special."
    },

    3: {
        title: "Keep the memories",
        location: "MOMENTS WORTH KEEPING",
        story:
            "Save the little moments that make every journey unforgettable. From quiet sunsets to unexpected adventures, every memory deserves a place."
    }
};


// Select destination cards
const destinationCards = document.querySelectorAll(".destination-card");


// Create story modal
const modal = document.createElement("div");

modal.className = "story-modal";

modal.innerHTML = `
    <div class="modal-content">

        <button class="modal-close" aria-label="Close story">
            ×
        </button>

        <p class="modal-location"></p>

        <h2 class="modal-title"></h2>

        <p class="modal-story"></p>

        <div class="modal-decoration">
            ✦
        </div>

    </div>
`;

document.body.appendChild(modal);


// Get modal elements
const modalTitle = document.querySelector(".modal-title");
const modalLocation = document.querySelector(".modal-location");
const modalStory = document.querySelector(".modal-story");
const modalClose = document.querySelector(".modal-close");


// Add story button to every destination card
destinationCards.forEach((card, index) => {

    const button = document.createElement("button");

    button.className = "story-button";
    button.textContent = "View story →";

    card.appendChild(button);


    button.addEventListener("click", () => {

        const destination = destinationData[index + 1];

        modalTitle.textContent = destination.title;
        modalLocation.textContent = destination.location;
        modalStory.textContent = destination.story;

        modal.classList.add("active");

        document.body.classList.add("modal-open");
    });
});


// Close modal function
function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
}


// Close button
modalClose.addEventListener("click", closeModal);


// Close when clicking outside modal
modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeModal();
    }

});


// Close using Escape key
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeModal();
    }

});