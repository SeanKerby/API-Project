const express = require("express");
const app = express();
app.use(express.json());

let hotels = [];
let reservations = [];
let nextHotelId = 1;
let nextReservationId = 1;

// Create hotel
app.post("/hotels", (req, res) => {
  console.log("Incoming body:", req.body);
  const { name, location, rooms } = req.body;
  if (!name || !location || typeof rooms !== "number") {
    return res.status(400).json({ error: "name, location, rooms(required, rooms must be number)" });
  }
  const hotel = { id: nextHotelId++, name, location, rooms };
  hotels.push(hotel);
  console.log("Hotel created:", hotel);
  res.status(201).json(hotel);
});

// List hotels
app.get("/hotels", (req, res) => {
  res.json(hotels);
});