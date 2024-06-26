const express = require("express");
const router = express.Router();

// Import the database connection
const db = require("../db"); // Adjust the path as necessary

// DELETE VENUE
router.post("/delete_booking/:booking_id", (req, res) => {
  const booking_id = req.params.booking_id;
  const sql =
    "UPDATE venue_bookings SET `deleted`='Deleted' WHERE booking_id=?";
  db.query(sql, [booking_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json({ success: "User marked as deleted successfully" });
  });
});

module.exports = router;
