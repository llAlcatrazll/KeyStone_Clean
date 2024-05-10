const express = require("express");
const router = express.Router();
const db = require("../../db"); // Adjust the path as necessary

// DELETE VENUE
router.post("/drop_users/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const sql = "DELETE FROM user_login  WHERE user_id=?";
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json({ success: "User marked as dropped successfully" });
  });
});

module.exports = router;
