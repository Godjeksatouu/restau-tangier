document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/restaurants")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("restaurant-container");
      const modal = document.getElementById("restaurant-modal");
      const modalDetails = document.getElementById("modal-details");
      const closeButton = document.querySelector(".close-button");

      // Créer des cartes pour chaque restaurant
      data.restaurants.forEach((restaurant) => {
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

        // Ajouter la carte au conteneur
        container.appendChild(card);

        // Ajouter un événement au bouton Détails pour ouvrir le modal
        const detailsButton = card.querySelector(".details-btn");
        detailsButton.addEventListener("click", () => {
          // Afficher les détails dans le modal
          const restaurantDetails = data.restaurants.find(
            (r) => r.id === parseInt(detailsButton.dataset.id)
          );
          modalDetails.innerHTML = `
                        <h2>${restaurantDetails.nom}</h2>
                        <p>${restaurantDetails.description}</p>
                        <p>Adresse: ${restaurantDetails.adresse}</p>
                        <p>Type de cuisine: ${
                          restaurantDetails.type_cuisine
                        }</p>
                        <p>Note: ★ ${restaurantDetails.note_moyenne.toFixed(
                          1
                        )}/5</p>
                    `;
          modal.style.display = "block";
        });

        // Ajouter un autre événement au bouton Détails pour rediriger vers la page restaurant.html
        detailsButton.addEventListener("click", () => {
          // Sauvegarder les détails du restaurant dans localStorage
          localStorage.setItem(
            "selectedRestaurant",
            JSON.stringify(restaurant)
          );

          // Rediriger vers la nouvelle page
          window.location.href = "/restau-tangier/restaurent.html";
        });
      });

      // Fermer le modal lorsqu'on clique sur le bouton de fermeture
      closeButton.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
});
