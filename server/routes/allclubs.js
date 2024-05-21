const express = require("express");
const router = express.Router();
import { BackendUserLink } from "../server";
// Import the database connection
const db = require("../db"); // Adjust the path as necessary

// Fetch active venues
router.get(`${BackendUserLink}/all_clubs`, (req, res) => {
  const sql = "SELECT DISTINCT `club` FROM user_login ";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching club data:", err);
      return res.status(500).json({ message: "Server error" }); // Sending 500 status for internal server errors
    }
    return res.json(result);
  });
});

module.exports = router;
