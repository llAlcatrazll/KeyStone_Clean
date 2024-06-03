const express = require("express");
const router = express.Router();
const db = require("../../db");
// const { BackendUserLink } = require("../../server");
router.get(`/user_fetchall`, (req, res) => {
  // const userEmail = req.query.email; // Get userEmail from query parameters
  const sql =
    "SELECT * FROM user_login WHERE deleted = 'Active' AND `account_type` = 'Admin'";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.json(result);
  });
});

module.exports = router;
