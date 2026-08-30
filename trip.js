// ================================
// WANDERLOG - TRIP DETAIL PAGE
// ================================


// Get trip ID from URL
const params = new URLSearchParams(window.location.search);

const tripId = Number(params.get("id"));


// Get saved trips
const trips = JSON.parse(
    localStorage.getItem("wanderlogTrips")
) || [];


// Find selected trip
const trip = trips.find(
    (trip) => trip.id === tripId
);


// Get detail container
const tripDetail = document.getElementById("tripDetail");


// If trip does not exist
if (!trip) {

    tripDetail.innerHTML = `
        <div class="empty-state">

            <h2>Trip not found</h2>

            <p>
                This trip may have been deleted.
            </p>

            <a href="index.html" class="back-button">
                ← Go back
            </a>

        </div>
    `;

} else {

    // Display trip
    tripDetail.innerHTML = `

        <article class="trip-detail-card">

            ${trip.image ? `
                <img
                    src="${trip.image}"
                    alt="${trip.title}"
                    class="trip-detail-image"
                >
            ` : `
                <div class="trip-image-placeholder">
                    ✦ No photo available
                </div>
            `}


            <div class="trip-detail-content">

                <p class="detail-label">
                    YOUR JOURNEY
                </p>

                <h1>${trip.title}</h1>

                <p>
                    <strong>Destination:</strong>
                    ${trip.destination}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${trip.date}
                </p>

                <div class="trip-detail-notes">

                    <h3>Trip Notes</h3>

                    <p>${trip.notes || "No notes added for this trip."}</p>

                </div>

            </div>

        </article>

    `;
}