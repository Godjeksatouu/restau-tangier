document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/api/restaurants";
  const container = document.getElementById("restaurant-container");

  const nom = document.getElementById("nom").value;
  const typeCuisine = document.getElementById("type_cuisine").value;
  const phone = document.getElementById("telephone").value;
  const adresse = document.getElementById("adresse").value;
  const image = document.getElementById("image").value;
  const email = document.getElementById("email").value;
  const siteweb = document.getElementById("siteweb").value;
  const note = document.getElementById("note_moyenne").value;
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
        <td><button class="delete-btn" data-id="${
          restaurant.id
        }">Delete</button></td>
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

  initialize();
});
