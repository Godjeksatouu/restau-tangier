document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/restaurants")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("restaurant-container");
      const modal = document.getElementById("restaurant-modal");
      const modalDetails = document.getElementById("modal-details");
      const closeButton = document.querySelector(".close-button");

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
            // Save restaurant details to localStorage
            localStorage.setItem(
              "selectedRestaurant",
              JSON.stringify(restaurant)
            );

            // Redirect to the restaurant page
            window.location.href = "/restaurent.html";

            // Display details in the modal (if you want to show the modal)
            const restaurantDetails = data.restaurants.find(
              (r) => r.id === parseInt(detailsButton.dataset.id)
            );
            modalDetails.innerHTML = `
              <h2>${restaurantDetails.nom}</h2>
              <p>${restaurantDetails.description}</p>
              <p>Adresse: ${restaurantDetails.adresse}</p>
              <p>Type de cuisine: ${restaurantDetails.type_cuisine}</p>
              <p>Note: ★ ${restaurantDetails.note_moyenne.toFixed(1)}/5</p>
            `;
            modal.style.display = "block";
          });
        });
      }

      // Initially display all restaurants
      displayRestaurants(data.restaurants);

      // Search function
      window.searchRestaurants = function () {
        const query = document
          .getElementById("searchInput")
          .value.toLowerCase();

        // Filter the restaurants by nom or type_cuisine
        const filteredRestaurants = data.restaurants.filter((restaurant) => {
          return (
            restaurant.nom.toLowerCase().includes(query) ||
            restaurant.type_cuisine.toLowerCase().includes(query)
          );
        });

        // Display filtered restaurants
        displayRestaurants(filteredRestaurants);
        container.scrollIntoView({ behavior: "smooth" });
      };

      // Close the modal when the close button is clicked
      closeButton.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
});
