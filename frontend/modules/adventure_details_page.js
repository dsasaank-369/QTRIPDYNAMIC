import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  const id = new URLSearchParams(search);
  // Place holder for functionality to work in the Stubs
  return id.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    var res = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    var data = await res.json();
    // console.log(data);
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
  document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
  let photoGallery = document.getElementById("photo-gallery");
  adventure.images.forEach((key) => {
    let div = `
    <div>
    <img src = "${key}" class = "activity-card-image">
    </div>
    `;
    photoGallery.innerHTML += div;
  });
  document.getElementById("adventure-content").innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  //console.log(images);
  let photo = document.getElementById("photo-gallery");
  photo.innerHTML = ``;
  let div = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id = "indicators">
  </div>
  <div class="carousel-inner" id = "carouselItem">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;
  photo.innerHTML += div;
  let count = 0;
  let carouselItem = document.getElementById("carouselItem");
  let indicator = document.getElementById("indicators");
  images.forEach((key) => {
    let photoDiv;
    if (count == 0) {
      photoDiv = `
    <div class="carousel-item active">
      <img src="${key}" class="d-block activity-card-image" alt="..." />
    </div>
    `;
    } else {
      photoDiv = `
    <div class="carousel-item">
      <img src="${key}" class="d-block activity-card-image" alt="..." />
    </div>
    `;
    }

    let buttonDiv = `
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${count}" class="active" aria-current="true" aria-label="Slide ${count}"></button>
    `;

    carouselItem.innerHTML += photoDiv;
    count += 1;
    indicator.innerHTML += buttonDiv;
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  var reservationpanel1 = document.getElementById("reservation-panel-sold-out");
  var reservationpanel2 = document.getElementById(
    "reservation-panel-available"
  );
  var reservationperson = document.getElementById("reservation-person-cost");
  if (adventure.available) {
    reservationpanel1.style.display = "none";
    reservationpanel2.style.display = "block";
    reservationperson.innerHTML = adventure.costPerHead;
  } else {
    reservationpanel1.style.display = "block";
    reservationpanel2.style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  var reservationcost = document.getElementById("reservation-cost");
  reservationcost.innerHTML = adventure.costPerHead * persons;
  console.log(persons);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  var myForm = document.getElementById("myForm");
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = event.target.elements.name.value;
    let date = event.target.elements.date.value;
    let person = event.target.elements.person.value;

    const data = {
      name: name,
      date: date,
      person: person,
      adventure: adventure.id,
    };
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${config.backendEndpoint}/reservations/new`, options)
      .then((data) => {
        if (!data.ok) {
          throw Error(data.status);
        }
        // return data.json();
        alert("Success");
      })

      .catch((e) => {
        alert("Failed");
      });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  var reservedbanner = document.getElementById("reserved-banner");
  if (adventure.reserved) {
    reservedbanner.style.display = "block";
  } else {
    reservedbanner.style.display = "none";
  }
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
