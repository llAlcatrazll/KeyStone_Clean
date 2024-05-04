const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "booking",
});

//
//  ADD NEW USER
app.post("/add_newuser", (req, res) => {
  const sql =
    "INSERT INTO user_login (`email`,`password`,`username`,`college_affiliation`,`club`,`position`,`account_type`)VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.email,
    req.body.password,
    req.body.username,
    req.body.college_affiliation,
    req.body.club,
    req.body.position,
    req.body.account_type,
  ];
  console.log(req.body);
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: "Something unexpected has occured" + err });
    }
    return res.json({ success: "Student added successfully" });
  });
});
//
//  ADD EVENT VENUES
app.post("/add_venue", (req, res) => {
  const sql = "INSERT INTO event_venues (`venue_name`)VALUES (?)";
  const values = [req.body.venue_name];
  console.log(req.body);
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student added successfully" });
  });
});
//
//
//
app.post("/create_booking", (req, res) => {
  const sql =
    "INSERT INTO venue_bookings (`booker_id`,`eventname`,`event_purpose`,`event_date`,`starting_time`,`ending_time`,`event_facility`,`username`,`designation`,`college_afiliation`,`club`)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    // 100005,
    req.body.eventname,
    req.body.event_purpose,
    req.body.event_date,
    req.body.starting_time,
    req.body.ending_time,
    req.body.event_facility,
    req.body.username,
    req.body.designation,
    req.body.college_afiliation,
    req.body.club,
  ];
  console.log(req.body);
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: "Something unexpected has occured" + err });
    }
    return res.json({ success: "Student added successfully" });
  });
});

//       /students
//  DISPLAY ALL BOOKINGS
app.get("/booking", (req, res) => {
  const sql = "SELECT * FROM user_details WHERE `Deleted`='Active'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
//
// UPDATED BOOKINGS
app.get("/venue_bookings", (req, res) => {
  const sql = "SELECT * FROM venue_bookings WHERE `deleted`='Active'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
//
//
//       /get_student
//  DISPLAY BOOKING DETAILS
app.get("/get_booking/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM user_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
//
//
//
//   EDIT BOOKING DETAILS - ADMIN ONLY
app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE user_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  console.log(values);
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Student updated successfully" });
  });
});
//
//
// DELETE BOOKING /UPDATE 1 VALUE I-O
app.post("/delete_user/:booking_id", (req, res) => {
  const booking_id = req.params.booking_id;
  const sql =
    "UPDATE venue_bookings SET `deleted`='Deleted' WHERE booking_id=?";
  db.query(sql, [booking_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json({ success: "User marked as deleted successfully" });
  });
});
app.post("/delete_venu/:booking_id", (req, res) => {
  const booking_id = req.params.booking_id;
  const sql = "UPDATE venue_bookings SET `deleted`='Deleted' WHERE venue_id=?";
  db.query(sql, [booking_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    return res.json({ success: "User marked as deleted successfully" });
  });
});
//
//
//
// LOG IN USER
app.post("/check_user", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user_login WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (result.length > 0) {
      // User exists and password matches
      return res.json({ success: true, message: "Login successful" });
    } else {
      // No user found with the provided email and password
      return res.json({ success: false, message: "Invalid email or password" });
    }
  });
});

//
//
//

//
// ADMIN STUFF
//
// DISPLAY LISTED VENUES
// app.get("/venues", (req, res) => {
//   const sql = "SELECT * FROM event_venues WHERE `Deleted`='Active'";
//   db.query(sql, (err, result) => {
//     if (err) res.json({ message: "Server error" });
//     return res.json(result);
//   });
// });
// app.get("/users", (req, res) => {
//   const sql = "SELECT * FROM user_login WHERE `status`='Active'";
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error fetching user data:", err);
//       return res.status(500).json({ message: "Server error" }); // Sending 500 status for internal server errors
//     }
//     return res.json(result);
//   });
// });

//
//
// DISPLAY LISTED USERS
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user_login WHERE `Deleted`='Active'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
app.get("/venues", (req, res) => {
  const sql = "SELECT * FROM event_venues WHERE `deleted`='Active'";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching venue data:", err);
      return res.status(500).json({ message: "Server error" }); // Sending 500 status for internal server errors
    }
    return res.json(result);
  });
});
//
//
// GET IS PENDING
app.get("/booking_pending", (req, res) => {
  const sql =
    "SELECT * FROM venue_bookings WHERE `deleted`='Active' AND `status`='Pending'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
//
// GET IS DENIED
app.get("/booking_denied", (req, res) => {
  const sql =
    "SELECT * FROM venue_bookings WHERE `deleted`='Active' AND `status`='Denied'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
//
// GET IS APPROVED
app.get("/booking_approved", (req, res) => {
  const sql =
    "SELECT * FROM venue_bookings WHERE `deleted`='Active' AND `status`='Approved'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
//

// CONNECT TO PORT NUMBER
app.listen(port, () => {
  console.log("listening");
});
