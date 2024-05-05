const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

//  database connection
const db = require("./db");

//  route handlers
/*{ VENUE PAGE}*/
const addVenueRoutes = require("./routes/addVenue");
const archiveVenueRoutes = require("./routes/archivedVenues");
const activeVenuesRoutes = require("./routes/activeVenues");
const deleteVenueRoutes = require("./routes/deleteVenues");
const restoreVenueRoutes = require("./routes/restoreVenues");
/*{ BOOKINGS PAGE}*/
const bookingApprovedRoutes = require("./routes/bookingApproved");
const bookingPendingRoutes = require("./routes/bookingPending");
const bookingDeniedRoutes = require("./routes/booklingDenied");
const bookingAllRoutes = require("./routes/bookingAll");
/*{ USER MANAGAMENT }*/
const adminUserRoutes = require("./routes/adminUsers");
const registeredUserRoutes = require("./routes/registeredUsers");
const deleteUsersRoutes = require("./routes/deleteUser");
//
// handle middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
// Use the route handlers
/*{ VENUE PAGE}*/
app.use("/", addVenueRoutes);
app.use("/", archiveVenueRoutes);
app.use("/", activeVenuesRoutes);
app.use("/", deleteVenueRoutes);
app.use("/", restoreVenueRoutes);
//
/*{ BOOKINGS PAGE}*/
app.use("/", bookingApprovedRoutes);
app.use("/", bookingPendingRoutes);
app.use("/", bookingDeniedRoutes);
app.use("/", bookingAllRoutes);
//
/*{ USER MANAGEMENT }*/
app.use("/", adminUserRoutes);
app.use("/", registeredUserRoutes);
app.use("/", deleteUsersRoutes);
const port = 5000;
// TRANSER TO INDIVIDUAL JS
app.get("/all_clubs", (req, res) => {
  const sql = "SELECT DISTINCT `club` FROM user_login ";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching venue data:", err);
      return res.status(500).json({ message: "Server error" }); // Sending 500 status for internal server errors
    }
    return res.json(result);
  });
});
// CONNECT TO PORT NUMBER
app.listen(port, () => {
  console.log("listening");
});
//
//
//
//
//
//
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
//
app.get("/all_admins", (req, res) => {
  const sql =
    "SELECT COUNT(*) AS admin_count FROM user_login WHERE `account_type` = 'Admin';";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching venue data:", err);
      return res.status(500).json({ message: "Server error" }); // Sending 500 status for internal server errors
    }
    // Assuming the result is an array with a single object that contains the count
    return res.json(result[0]);
  });
});

// CREATE BOOKINGS
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
// DISPLAY LISTED USERS
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user_login WHERE `Deleted`='Active'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});
