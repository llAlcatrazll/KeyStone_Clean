const express = require("express");
const router = express.Router();
const db = require("../../db");

router.get("/user_bookingsall", (req, res) => {
  const userEmail = req.query.email; // Get userEmail from query parameters
  const sql =
    "SELECT * FROM venue_bookings WHERE email = ? AND deleted = 'Active'";

  db.query(sql, [userEmail], (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.json(result);
  });
});

module.exports = router;
