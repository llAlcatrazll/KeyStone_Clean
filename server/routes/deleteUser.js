const express = require("express");
const router = express.Router();
const { BackendUserLink } = require("../server");
// Import the database connection
const db = require("../db"); // Adjust the path as necessary

// DELETE VENUE
router.post(`${BackendUserLink}/delete_user/:user_id`, (req, res) => {
  const user_id = req.params.user_id;
  const sql = "UPDATE user_login SET `deleted`='Deleted' WHERE user_id=?";
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json({ success: "User marked as deleted successfully" });
  });
});

module.exports = router;
