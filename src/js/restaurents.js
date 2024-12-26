document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Get the restaurant ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = parseInt(urlParams.get("id"));

    // Fetch restaurant details from the API based on the ID
    const response = await fetch(
      `http://localhost:3000/api/restaurants/${restaurantId}`
    );
    if (!response.ok) {
      throw new Error("Restaurant not found");
    }

    const restaurant = await response.json();
    const restaurantDetailsHTML = document.getElementById("restaurant-details");

    // Display restaurant details on the page
    const restaurantDetails = `
            <h2>${restaurant.nom}</h2>
            <div class="restaurant-image">
              <img src="${restaurant.photo}" alt="${restaurant.nom}">
            </div>
            <p><strong>Type de cuisine:</strong> ${restaurant.type_cuisine}</p>
            <p><strong>Adresse:</strong> ${restaurant.adresse}</p>
            <p><strong>Téléphone:</strong> ${restaurant.telephone}</p>
            <p><strong>Email:</strong> ${restaurant.email}</p>
            <p><strong>Note:</strong> ★ ${restaurant.note_moyenne.toFixed(
              1
            )}/5</p>
            <p><strong>Site Web:</strong> <a href="http://${
              restaurant.site_web
            }" target="_blank">${restaurant.site_web}</a></p>
        `;

    // Append the restaurant details to the modal or the details section
    restaurantDetailsHTML.innerHTML = restaurantDetails;

    // Optionally, open the modal to show the details
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    // Optionally, display an error message if the restaurant is not found
    document.body.innerHTML = "<h2>Restaurant not found</h2>";
  }

  // Close the modal when the close button is clicked
});
