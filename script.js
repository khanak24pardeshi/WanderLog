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

}
);
// ================================
// WANDERLOG - TRIP CRUD
// ================================

// Trip form
const tripForm = document.getElementById("trip-form");

// Form fields
const tripTitle = document.getElementById("trip-title");
const tripDestination = document.getElementById("trip-destination");
const tripDate = document.getElementById("trip-date");
const tripNotes = document.getElementById("trip-notes");


// ========================================
// CREATE + UPDATE TRIP
// ========================================

tripForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const trips = getTrips();


    // ====================================
    // UPDATE EXISTING TRIP
    // ====================================

    if (editingTripId !== null) {

        const tripIndex = trips.findIndex(
            (trip) => trip.id === editingTripId
        );

        if (tripIndex !== -1) {

            trips[tripIndex] = {

                id: editingTripId,

                title: tripTitle.value.trim(),

                destination: tripDestination.value.trim(),

                date: tripDate.value,

                notes: tripNotes.value.trim()

            };
        }

        localStorage.setItem(
            "wanderlogTrips",
            JSON.stringify(trips)
        );

        editingTripId = null;

        tripForm.reset();

        tripSubmit.textContent = "Add Trip →";

        renderTrips();

        showSuccessMessage("Trip updated successfully!");

        return;
    }


    // ====================================
    // CREATE NEW TRIP
    // ====================================

    const newTrip = {

        id: Date.now(),

        title: tripTitle.value.trim(),

        destination: tripDestination.value.trim(),

        date: tripDate.value,

        notes: tripNotes.value.trim()

    };

    trips.push(newTrip);

    localStorage.setItem(
        "wanderlogTrips",
        JSON.stringify(trips)
    );

    tripForm.reset();

    renderTrips();

    showSuccessMessage("Trip added successfully!");

});
// ========================================
// READ - DISPLAY SAVED TRIPS
// ========================================

const tripGrid = document.getElementById("trip-grid");
const tripSubmit = document.getElementById("trip-submit");
let editingTripId = null;

// Get trips from localStorage
function getTrips() {
    return JSON.parse(localStorage.getItem("wanderlogTrips")) || [];
}


// Display trips on the page
// ========================================
// READ - DISPLAY SAVED TRIPS
// ========================================

function renderTrips() {

    const trips = getTrips();

    // Clear the grid
    tripGrid.innerHTML = "";


    // Show empty state when there are no trips
    if (trips.length === 0) {

        tripGrid.innerHTML = `
            <div class="empty-state">
                <h3>No trips yet ✈️</h3>
                <p>Start your journey by adding your first trip.</p>
            </div>
        `;

        return;
    }


    // Create a card for every trip
    trips.forEach((trip, index) => {

        const tripCard = document.createElement("article");

        // Keep existing destination-card design + add trip-card styling
        tripCard.className = "destination-card trip-card";

        tripCard.innerHTML = `
            <div class="destination-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="destination-icon">✦</div>

            <h3>${trip.title}</h3>

            <p>
                <strong>Destination:</strong> ${trip.destination}
            </p>

            <p>
                <strong>Date:</strong> ${trip.date}
            </p>

            <p>
                ${trip.notes}
            </p>

            <div class="trip-actions">

                <button
                    class="edit-trip"
                    data-id="${trip.id}"
                >
                    Edit
                </button>

                <button
                    class="delete-trip"
                    data-id="${trip.id}"
                >
                    Delete
                </button>

            </div>
        `;

        tripGrid.appendChild(tripCard);

    });
}


// Display saved trips when page loads
renderTrips();
// ========================================
// UPDATE - EDIT TRIP
// ========================================

function editTrip(id) {

    const trips = getTrips();

    const trip = trips.find((trip) => trip.id === id);

    if (!trip) {
        return;
    }

    // Put trip information into the form
    tripTitle.value = trip.title;
    tripDestination.value = trip.destination;
    tripDate.value = trip.date;
    tripNotes.value = trip.notes;

    // Remember which trip we are editing
    editingTripId = id;

    // Change button text
    tripSubmit.textContent = "Update Trip →";

    // Scroll to form
    tripForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}
// ========================================
// EDIT BUTTON CLICK
// ========================================

// ========================================
// EDIT + DELETE BUTTON CLICK
// ========================================

tripGrid.addEventListener("click", (event) => {

    const id = Number(event.target.dataset.id);


    // EDIT
    if (event.target.classList.contains("edit-trip")) {

        editTrip(id);

    }


    // DELETE
    if (event.target.classList.contains("delete-trip")) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this trip?"
    );

    if (confirmDelete) {

        deleteTrip(id);

    }

}

});
// ========================================
// DELETE TRIP
// ========================================

function deleteTrip(id) {

    const trips = getTrips();

    const updatedTrips = trips.filter(
        (trip) => trip.id !== id
    );

    localStorage.setItem(
        "wanderlogTrips",
        JSON.stringify(updatedTrips)
    );

    renderTrips();

    showSuccessMessage("Trip deleted successfully!");
}
// ========================================
// SUCCESS NOTIFICATION
// ========================================

function showSuccessMessage(message) {

    const notification = document.createElement("div");

    notification.className = "success-message";

    notification.innerHTML = `
        <span>✓</span>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}