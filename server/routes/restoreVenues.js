const express = require("express");
const router = express.Router();

// Import the database connection
const db = require("../db"); // Adjust the path as necessary

// RESTORE VENUE
router.post("/restore_venue/:venue_id", (req, res) => {
  const venue_id = req.params.venue_id;
  const sql = "UPDATE event_venues SET `deleted`='Active' WHERE venue_id=?";
  db.query(sql, [venue_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json({ success: "User marked as restored successfully" });
  });
});

module.exports = router;
