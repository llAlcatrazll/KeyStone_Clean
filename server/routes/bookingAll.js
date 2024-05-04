const express = require("express");
const router = express.Router();

// Import the database connection
const db = require("../db"); // Adjust the path as necessary

// Fetch approved bookings
router.get("/venue_bookings", (req, res) => {
  const sql = "SELECT * FROM venue_bookings WHERE `deleted`='Active'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

module.exports = router;
