const express = require("express");
const router = express.Router();
import { BackendUserLink } from "../server";
// Import the database connection
const db = require("../db");

// ADD EVENT VENUES
router.post(`${BackendUserLink}/add_venue`, (req, res) => {
  const sql = "INSERT INTO event_venues (`venue_name`) VALUES (?)";
  const values = [req.body.venue_name];
  console.log(req.body);
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: "Something unexpected has occured: " + err });
    }
    return res.json({ success: "Venue added successfully" });
  });
});

module.exports = router;
