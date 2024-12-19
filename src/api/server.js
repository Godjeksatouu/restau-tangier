const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let restaurents = require("./restaurants.json");

// Get all restaurants
app.get("/api/restaurants", (req, res) => {
  res.json(restaurents);
});
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
