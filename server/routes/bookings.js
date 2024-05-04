// const express = require("express");
// const router = express.Router();
// const db = require("../server"); // Assuming you have a separate file for your database connection

// // UPDATED BOOKINGS
// router.get("/venue_bookings", (req, res) => {
//   const sql = "SELECT * FROM venue_bookings WHERE `deleted`='Active'";
//   db.query(sql, (err, result) => {
//     if (err) res.json({ message: "Server error" });
//     return res.json(result);
//   });
// });

// module.exports = router;
