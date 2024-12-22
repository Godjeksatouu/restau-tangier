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

// Add a restaurant
app.post("/api/restaurants", (req, res) => {
  // Fixed the endpoint
  const newRestaurant = { id: Date.now(), nom: req.body.nom };
  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
});

// Update a restaurant
app.put("/api/restaurants/:id", (req, res) => {
  // Added ':id' to the endpoint
  const restaurant = restaurants.find((r) => r.id === parseInt(req.params.id)); // Fixed the variable name
  if (!restaurant) return res.status(404).send("Restaurant not found"); // Fixed the message

  restaurant.nom = req.body.nom; // Updated the correct restaurant
  res.json(restaurant); // Return the updated restaurant
});

// Delete a restaurant
app.delete("/api/restaurants/:id", (req, res) => {
  // Fixed the endpoint
  const index = restaurants.findIndex((r) => r.id === parseInt(req.params.id)); // Fixed the variable name
  if (index === -1) return res.status(404).send("Restaurant not found"); // Fixed the message

  restaurants.splice(index, 1);
  res.sendStatus(204); // No content
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
