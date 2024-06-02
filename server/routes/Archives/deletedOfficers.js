const express = require("express");
const router = express.Router();
const { BackendUserLink } = require("../../server");
// Import the database connection
const db = require("../../db"); // Adjust the path as necessary

// Fetch approved bookings
router.get(`${BackendUserLink}/deleted_officers`, (req, res) => {
  const sql =
    "SELECT * FROM user_login WHERE `deleted`='Deleted' AND `account_type`='Officer'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

module.exports = router;
