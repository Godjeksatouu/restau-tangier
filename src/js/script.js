document.addEventListener('DOMContentLoaded', () => {
    fetch('/restau-tangier/data/restaurants.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('restaurant-container');
            const modal = document.getElementById('restaurant-modal');
            const modalDetails = document.getElementById('modal-details');
            const closeButton = document.querySelector('.close-button');

            // Créer des cartes pour chaque restaurant
            data.restaurants.forEach(restaurant => {
                const card = document.createElement('div');
                card.classList.add('restaurant-card');
                
                card.innerHTML = `
                    <div class="card-image-container">
                        <img src="${restaurant.photo}" alt="${restaurant.nom}">
                    </div>
                    <div class="card-content">
                        <h3>${restaurant.nom}</h3>
                        <p class="cuisine-type">${restaurant.type_cuisine}</p>
                        <p class="address">${restaurant.adresse}</p>
                        <div class="card-footer">
                            <span class="rating">★ ${restaurant.note_moyenne.toFixed(1)}/5</span>
                            <button class="details-btn" data-id="${restaurant.id}">Détails</button>
                        </div>
                    </div>
                `;

                // Ajouter un événement pour ouvrir les détails
                card.querySelector('.details-btn').addEventListener('click', () => {
                    modalDetails.innerHTML = `
                        <div class="modal-header">
                            <h2>${restaurant.nom}</h2>
                            <span class="rating">★ ${restaurant.note_moyenne}/5</span>
                        </div>
                        
                        <div class="modal-details-content">
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
                            ${restaurant.site_web ? `
                                <div class="detail-item">
                                    <strong>Site Web:</strong> 
                                    <a href="https://${restaurant.site_web}" target="_blank">${restaurant.site_web}</a>
                                </div>
                            ` : ''}
                        </div>
                    `;
                    modal.classList.add('show');
                });

                container.appendChild(card);
            });

            // Fermer le modal
            closeButton.addEventListener('click', () => {
                modal.classList.remove('show');
            });

            // Fermer le modal si cliqué en dehors
            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.classList.remove('show');
                }
            });
        })
        .catch(error => {
            console.error('Erreur de chargement des restaurants:', error);
            const container = document.getElementById('restaurant-container');
            container.innerHTML = `
                <div class="error-message">
                    <p>Impossible de charger les restaurants. Veuillez réessayer plus tard.</p>
                    <p>Erreur: ${error.message}</p>
                </div>
            `;
        });
});