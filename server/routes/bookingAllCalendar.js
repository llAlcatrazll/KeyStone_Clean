const express = require("express");
const bodyParser = require("body-parser"); // Required for parsing JSON bodies
const router = express.Router();
const db = require("../db"); // Adjust the path as necessary
// const { BackendUserLink } = require("../server");
// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Route to fetch venue bookings
router.get(`/api/venue_bookings_calendar/:event_facility`, (req, res) => {
  const eventFacility = req.params.event_facility;
  const sql =
    "SELECT * FROM venue_bookings WHERE deleted='Active' AND event_facility=?";
  db.query(sql, [eventFacility], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.json(result);
  });
});

// Export the router so it can be used in the main app file
module.exports = router;
