const express = require("express");
const router = express.Router();
import { BackendUserLink } from "../../server";
// Import the database connection
const db = require("../../db");
//const db = require("../../db"); // Adjust the path as necessary

// Fetch approved bookings
router.get(`${BackendUserLink}/deleted_venues`, (req, res) => {
  const sql = "SELECT * FROM event_venues WHERE `deleted`='Deleted'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

module.exports = router;
