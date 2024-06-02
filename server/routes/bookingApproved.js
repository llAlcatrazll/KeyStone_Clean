const express = require("express");
const router = express.Router();
const { BackendUserLink } = require("../server");
// Import the database connection
const db = require("../db"); // Adjust the path as necessary

// Fetch approved bookings
router.get(`${BackendUserLink}/booking_approved`, (req, res) => {
  const sql =
    "SELECT * FROM venue_bookings WHERE `deleted`='Active' AND `status`='Approved'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

module.exports = router;
