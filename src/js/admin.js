document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/api/restaurants";
  const container = document.getElementById("restaurant-container");
  // Fetch data from the API
  async function fetchRestaurants() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      return [];
    }
  }

  // Function to display restaurants
  function displayRestaurants(restaurants) {
    // Clear current table content
    container.innerHTML = "";

    // Create the table and header
    const table = document.createElement("table");
    table.classList.add("restaurants-table");

    const headerRow = `
      <thead>
        <tr>
          <th>Photo</th>
          <th>Nom</th>
          <th>Type de Cuisine</th>
          <th>Adresse</th>
          <th>Note Moyenne</th>
          <th>Action</th>
          <th>Action</th>
        </tr>
      </thead>
    `;
    table.innerHTML = headerRow;

    // Add rows for each restaurant
    const tableBody = document.createElement("tbody");

    restaurants.forEach((restaurant) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><img src="${restaurant.photo}" alt="${
        restaurant.nom
      }" class="restaurant-photo"></td>
        <td>${restaurant.nom}</td>
        <td>${restaurant.type_cuisine}</td>
        <td>${restaurant.adresse}</td>
        <td>★ ${restaurant.note_moyenne.toFixed(1)}/5</td>
        <td><button class="details-btn" data-id="${
          restaurant.id
        }">Détails</button></td>
        <td><button class="delete-btn" onclick="deleteData(${
          restaurant.id
        })" data-id="${restaurant.id}">Delete</button></td>
      `;

      tableBody.appendChild(row);

      // Add click event to the details button
      const detailsButton = row.querySelector(".details-btn");
      detailsButton.addEventListener("click", () => {
        redirectToDetailsPage(restaurant.id);
      });
    });

    table.appendChild(tableBody);
    container.appendChild(table); // Append the table to the container
  }

  // Function to redirect to the restaurant details page
  function redirectToDetailsPage(restaurantId) {
    window.location.href = `../../restaurent.html?id=${restaurantId}`;
  }

  // Search function
  function searchRestaurants(restaurants) {
    const query = document.getElementById("searchInput").value.toLowerCase();

    const filteredRestaurants = restaurants.filter((restaurant) => {
      return (
        restaurant.nom.toLowerCase().includes(query) ||
        restaurant.type_cuisine.toLowerCase().includes(query)
      );
    });

    displayRestaurants(filteredRestaurants);
    container.scrollIntoView({ behavior: "smooth" });
  }

  // Initialize the application
  async function initialize() {
    const restaurants = await fetchRestaurants();
    displayRestaurants(restaurants);

    // Attach the search function to the global scope
    window.searchRestaurants = () => searchRestaurants(restaurants);
  }

  document
    .getElementById("restaurant-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        nom: document.getElementById("nom").value,
        type_cuisine: document.getElementById("type_cuisine").value,
        telephone: document.getElementById("telephone").value,
        adresse: document.getElementById("adresse").value,
        photo: document.getElementById("image").value,
        email: document.getElementById("email").value,
        site_web: document.getElementById("siteweb").value,
        note_moyenne: parseFloat(document.getElementById("note_moyenne").value),
      };

      try {
        const response = await fetch("http://localhost:3000/api/restaurants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Data added successfully!");
        } else {
          console.error("Failed to add data.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });

  initialize();
});

// Function to delete data (using DELETE method)
async function deleteData(id) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/restaurants/${id}`,
      {
        method: "DELETE",
      }
    );
    initialize();

    if (response.ok) {
      console.log("Data deleted successfully!");
    } else {
      console.error("Failed to delete data.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
