document.addEventListener("DOMContentLoaded", () => {
  // Retrieve restaurant details from localStorage
  const restaurant = JSON.parse(localStorage.getItem("selectedRestaurant"));

  if (restaurant) {
    const restaurantName = document.getElementById("restaurant-name");
    const restaurantDetails = document.getElementById("restaurant-details");

    restaurantName.textContent = restaurant.nom;

    restaurantDetails.innerHTML = `
      <div class="detail-item">
                <strong>${restaurant.nom}:</strong>
                <img src=${restaurant.photo}>
            </div>
            <div class="detail-item">
                <strong>Type de cuisine:</strong> 
                <span>${restaurant.type_cuisine}</span>
            </div>
            <div class="detail-item">
                <strong>Adresse:</strong> 
                <span>${restaurant.adresse}</span>
            </div>
            <div class="detail-item">
                <strong>Téléphone:</strong> 
                <span>${restaurant.telephone}</span>
            </div>
            <div class="detail-item">
                <strong>Email:</strong> 
                <span>${restaurant.email}</span>
            </div>
            ${
              restaurant.site_web
                ? `
                <div class="detail-item">
                    <strong>Site Web:</strong> 
                    <a href="https://${restaurant.site_web}" target="_blank">${restaurant.site_web}</a>
                </div>
            `
                : ""
            }
            <div class="detail-item">
                <strong>Note moyenne:</strong> 
                <span>★ ${restaurant.note_moyenne}/5</span>
            </div>
        `;
  } else {
    // Handle case where no restaurant details were found in localStorage
    console.error("Restaurant details not found in localStorage");
  }
});
