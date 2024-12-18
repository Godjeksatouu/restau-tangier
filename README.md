# 08-Blog de Restaurants à Tanger

## Contexte

La ville de Tanger, avec sa richesse culinaire, regorge de restaurants proposant une variété de plats locaux et internationaux. Cependant, il peut être difficile pour les habitants et les visiteurs de découvrir facilement les meilleurs endroits où manger. Ce projet vise à créer un blog interactif permettant d'explorer les restaurants de Tanger.

## Objectif

Ce blog permettra aux utilisateurs de :
- Découvrir une liste de restaurants avec leurs informations principales.
- Filtrer ou rechercher des restaurants par type de cuisine, nom de restaurant, ou note.

Les informations des restaurants seront stockées dans un fichier JSON et utilisées pour construire une API REST qui alimentera le blog en données.

## Fonctionnalités

### Pages à créer :

1. **Page index.html : Liste des restaurants**
   - Affiche tous les restaurants disponibles dans l'API sous forme de cartes.
   - Chaque carte présente :
     - Une image de couverture du restaurant.
     - Le nom du restaurant.
     - Le type de cuisine proposé.
     - La notation du restaurant.
     - Un lien vers la page `restaurant.html` pour plus de détails.
   - **Fonctionnalités supplémentaires** :
     - Barre de recherche pour rechercher par nom ou spécialité.
     - Fonctionnalité de tri selon la notation.
     - Filtre par type de cuisine.

2. **Page restaurant.html : Détails d'un restaurant**
   - Affiche tous les détails d'un restaurant, y compris :
     - Nom du restaurant.
     - Adresse.
     - Téléphone.
     - Email.
     - Type de cuisine.
     - Photo.
     - Note moyenne.
     - Lien vers le site web (si disponible).

3. **Page admin.html : Page administrateur**
   - Permet à l'administrateur de gérer les restaurants de manière simple via un back-office.
   - Fonctions disponibles :
     - Afficher la liste des restaurants avec possibilité de suppression.
     - Ajouter un nouveau restaurant.
     - Chercher un restaurant par nom ou spécialité.
     - **Bonus** : Modifier un restaurant.

### Données

- Les données des restaurants seront structurées dans un fichier JSON.
- Le projet comprendra une API REST qui permet de gérer les restaurants via les méthodes GET, POST, et DELETE.

### Travail à rendre

- Structuration des données dans un fichier JSON.
- APIs : `GET`, `POST`, `DELETE`.
- Code source HTML, CSS, et JavaScript.
- Tester les APIs via un outil comme **Postman**.

### Structure du Projet

```
/blog-restaurants-tanger
|-- /data
|   |-- restaurants.json
|-- /src
|   |-- /api
|   |   |-- api.js
|   |-- /css
|   |   |-- style.css
|   |-- /js
|   |   |-- app.js
|-- index.html
|-- restaurant.html
|-- admin.html
|-- README.md
```

### Technologies utilisées

- **HTML** : Pour structurer les pages.
- **CSS** : Pour la mise en forme et l’interface utilisateur.
- **JavaScript** : Pour l'interactivité et les appels API.
- **Node.js / Express** : Pour créer l'API REST.
- **Postman** : Pour tester les API.

### Instructions

1. **Installation** :
   - Clonez ce dépôt sur votre machine locale.
   - Installez les dépendances nécessaires avec `npm install`.
   - Exécutez le serveur local avec `npm start`.

2. **Utilisation** :
   - Accédez à `index.html` pour découvrir les restaurants.
   - Utilisez la barre de recherche ou les filtres pour affiner vos résultats.
   - Allez sur `restaurant.html` pour consulter les détails d'un restaurant.
   - Accédez à `admin.html` pour ajouter, modifier ou supprimer des restaurants.

3. **Tester les APIs** :
   - Utilisez Postman pour tester les API avec les routes suivantes :
     - `GET /api/restaurants` : Obtenir la liste des restaurants.
     - `POST /api/restaurants` : Ajouter un nouveau restaurant.
     - `DELETE /api/restaurants/:id` : Supprimer un restaurant.

## Conclusion

Ce projet offre une solution dynamique et interactive pour explorer les restaurants de Tanger, tout en permettant une gestion facile des données grâce à une interface d'administration.
