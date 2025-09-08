	// Create reservation
app.post("/reservations", (req, res) => {
  const { hotelId, guestName, nights, email, phoneNumber } = req.body;

  // Validate properly
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