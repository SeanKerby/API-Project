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