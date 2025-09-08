// app.js - minimal hotel reservation backend
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

// Create reservation
app.post("/reservations", (req, res) => {
  const { hotelId, guestName, nights, email, phoneNumber } = req.body;

  // ✅ Validate properly
  if (
    !hotelId ||
    !guestName ||
    typeof nights !== "number" ||
    !email ||
    typeof email !== "string" ||
    !phoneNumber ||
    typeof phoneNumber !== "string"
  ) {
    return res.status(400).json({
      error:
        "hotelId, guestName, nights(required, must be number), email(required, must be string), phoneNumber(required, must be string)"
    });
  }

  const hotel = hotels.find(h => h.id === hotelId);
  if (!hotel) return res.status(404).json({ error: "Hotel not found" });

  // ✅ Include email + phoneNumber in the reservation object
  const reservation = {
    id: nextReservationId++,
    hotelId,
    guestName,
    nights,
    email,
    phoneNumber,
    createdAt: new Date().toISOString()
  };

  reservations.push(reservation);
  console.log("Reservation created:", reservation);
  res.status(201).json(reservation);
});


// List reservations
app.get("/reservations", (req, res) => {
  res.json(reservations);
});

// Cancel reservation
app.delete("/reservations/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = reservations.findIndex(r => r.id === id);
  if (idx === -1) return res.status(404).json({ error: "Reservation not found" });
  const [removed] = reservations.splice(idx, 1);
  console.log("Reservation cancelled:", removed);
  res.json({ message: "Reservation cancelled", reservation: removed });
});

// Health endpoint
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Hotel Reservation API running at http://localhost:${PORT}`);
});
