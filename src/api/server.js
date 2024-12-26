const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let restaurants = require("./restaurants.json");

// Get all restaurants
app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

// Get a specific restaurant by ID
app.get("/api/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  const restaurant = restaurants.find((r) => r.id === parseInt(req.params.id));
  if (!restaurant) {
    return res.status(404).send("Restaurant not found");
  }
  res.json(restaurant);
});

// Add a restaurant
app.post("/api/restaurants", (req, res) => {
  const newRestaurant = { id: Date.now(), nom: req.body.nom };
  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
});

// Update a restaurant
app.put("/api/restaurants/:id", (req, res) => {
  const restaurant = restaurants.find((r) => r.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).send("Restaurant not found");

  restaurant.nom = req.body.nom;
  res.json(restaurant);
});

// Delete a restaurant
app.delete("/api/restaurants/:id", (req, res) => {
  const index = restaurants.findIndex((r) => r.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Restaurant not found");

  restaurants.splice(index, 1);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
