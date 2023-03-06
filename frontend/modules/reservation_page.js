import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    var res = await fetch(`${config.backendEndpoint}/reservations/`);
    var data = await res.json();
    return data;
  } catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  var noreservation = document.getElementById("no-reservation-banner");
  var yes = document.getElementById("reservation-table-parent");
  if (reservations.length) {
    noreservation.style.display = "none";
    yes.style.display = "block";
    console.log(reservations);
    var reservationtable = document.getElementById("reservation-table");

    reservations.forEach((element) => {
      var d = new Date(element.date);
      let text = d.toLocaleDateString("en-IN");
      var d1 = new Date(element.time);
      let date =
        d1.toLocaleString("en-IN", { dateStyle: "long" }) +
        ", " +
        d1.toLocaleString("en-IN", { timeStyle: "medium" });
      console.log(text);
      let div = `<tr>
      <td scope="col">${element.id}</td>
      <td scope="col">${element.name}</td>
      <td scope="col">${element.adventureName}</td>
      <td scope="col">${element.person}</td>
      <td scope="col">${text}</td>
      <td scope="col">${element.price}</td>
      <td scope="col">${date}</td>
      <td>
      <button
        id="${element.id}"
        class="reservation-visit-button"
        type="submit"
      >
        <a
          href="${config.frontEndpoint}adventures/detail/?adventure=${element.adventure}"
        >
          Visit the adventure</a
        >
      </button>
    </td>
      
    
    </tr>`;
      reservationtable.innerHTML += div;
    });
  } else {
    yes.style.display = "none";
    noreservation.style.display = "block";
  }

  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
