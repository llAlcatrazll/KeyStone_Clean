const express = require("express");
const router = express.Router();
const { BackendUserLink } = require("../server");
// Import the database connection
const db = require("../db"); // Adjust the path as necessary

// ADMIN USERS
router.get(`${BackendUserLink}/admin_users`, (req, res) => {
  const sql =
    "SELECT * FROM user_login WHERE `account_type`='Admin' AND `deleted`='Active'";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching venue data:", err);
      return res.status(500).json({ message: "Server error" }); // Sending 500 status for internal server errors
    }
    return res.json(result);
  });
});

module.exports = router;
