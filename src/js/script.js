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
    container.innerHTML = ""; // Clear current restaurant cards

    restaurants.forEach((restaurant) => {
      const card = document.createElement("div");
      card.classList.add("restaurant-card");
      card.innerHTML = `
        <div class="card-image-container">
          <img src="${restaurant.photo}" alt="${restaurant.nom}">
        </div>
        <div class="card-content">
          <h3>${restaurant.nom}</h3>
          <p class="cuisine-type">${restaurant.type_cuisine}</p>
          <p class="address">${restaurant.adresse}</p>
          <div class="card-footer">
            <span class="rating">★ ${restaurant.note_moyenne.toFixed(
              1
            )}/5</span>
            <button class="details-btn" data-id="${
              restaurant.id
            }">Détails</button>
          </div>
        </div>
      `;

      container.appendChild(card);

      const detailsButton = card.querySelector(".details-btn");
      detailsButton.addEventListener("click", () => {
        redirectToDetailsPage(restaurant.id);
      });
    });
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
