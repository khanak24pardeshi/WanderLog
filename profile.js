// ========================================
// WANDERLOG - PUBLIC PROFILE PAGE
// ========================================


// Get user name from URL
const params = new URLSearchParams(window.location.search);

const user = params.get("user");


// Profile information
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");


// ========================================
// PROFILE INFORMATION
// ========================================

// Get saved profile information
const savedName =
    user ||
    localStorage.getItem("wanderlogUserName") ||
    "WanderLog Traveler";

const savedBio =
    localStorage.getItem("wanderlogUserBio") ||
    "Exploring new places, collecting memories, and sharing every journey along the way.";


// Display saved profile information
profileName.textContent = savedName;
profileBio.textContent = savedBio;
// ========================================
// SAVE PROFILE
// ========================================

const profileNameInput =
    document.getElementById("profileNameInput");

const profileBioInput =
    document.getElementById("profileBioInput");

const saveProfile =
    document.getElementById("saveProfile");
    const editProfile =
    document.getElementById("editProfile");

const profileEditSection =
    document.querySelector(".profile-edit");

// Show existing information in inputs
profileNameInput.value =
    localStorage.getItem("wanderlogUserName") || "";

profileBioInput.value =
    localStorage.getItem("wanderlogUserBio") || "";
// Hide setup form if profile is already saved
if (localStorage.getItem("wanderlogUserName")) {

    document.querySelector(".profile-edit").style.display = "none";

}
// Show profile form when Edit Profile is clicked
editProfile.addEventListener("click", () => {

    profileEditSection.style.display = "block";

    profileNameInput.value =
        localStorage.getItem("wanderlogUserName") || "";

    profileBioInput.value =
        localStorage.getItem("wanderlogUserBio") || "";

});
// Save button
saveProfile.addEventListener("click", () => {

    const newName = profileNameInput.value.trim();

    const newBio = profileBioInput.value.trim();


    if (newName) {

    localStorage.setItem(
        "wanderlogUserName",
        newName
    );

    profileName.textContent = newName;

    // Update the profile URL
    const newUrl =
        `profile.html?user=${encodeURIComponent(newName)}`;

    window.history.replaceState({}, "", newUrl);
}

    // Save bio
    if (newBio) {

        localStorage.setItem(
            "wanderlogUserBio",
            newBio
        );

        profileBio.textContent = newBio;
    }


    alert("Profile saved successfully!");

document.querySelector(".profile-edit").style.display = "none";

});
// ========================================
// GET TRIPS FROM LOCALSTORAGE
// ========================================

const trips = JSON.parse(
    localStorage.getItem("wanderlogTrips")
) || [];


// Get trip grid
const profileTripGrid =
    document.getElementById("profileTripGrid");


// Clear loading text
profileTripGrid.innerHTML = "";


// ========================================
// DISPLAY TRIPS
// ========================================

if (trips.length === 0) {

    profileTripGrid.innerHTML = `
        <div class="empty-state">

            <h3>No trips yet ✈️</h3>

            <p>
                This traveler hasn't added any trips yet.
            </p>

        </div>
    `;

} else {

    trips.forEach((trip, index) => {

        const tripCard = document.createElement("article");

        tripCard.className =
            "destination-card profile-trip-card";


        tripCard.innerHTML = `

            <div class="destination-number">
                ${String(index + 1).padStart(2, "0")}
            </div>


            ${trip.image ? `
                <img
                    src="${trip.image}"
                    alt="${trip.title}"
                    class="trip-image"
                >
            ` : `
                <div class="trip-image-placeholder">
                    ✦ No photo
                </div>
            `}


            <div class="destination-icon">✦</div>


            <h3>${trip.title}</h3>


            <p>
                <strong>Destination:</strong>
                ${trip.destination}
            </p>


            <p>
                <strong>Date:</strong>
                ${trip.date}
            </p>


            <p>
                ${trip.notes || "No notes added."}
            </p>

        `;


        profileTripGrid.appendChild(tripCard);

    });

}