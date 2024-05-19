const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const jwt = require("jsonwebtoken");

//  database connection
const db = require("./db");

//  route handlers
/*{ VENUE PAGE}*/
const archiveVenueRoutes = require("./routes/archivedVenues");
const restoreVenueRoutes = require("./routes/restoreVenues");
const activeVenuesRoutes = require("./routes/activeVenues");
const deleteVenueRoutes = require("./routes/deleteVenues");
const addVenueRoutes = require("./routes/addVenue");
/*{ BOOKINGS PAGE}*/
const bookingApprovedRoutes = require("./routes/bookingApproved");
const bookingPendingRoutes = require("./routes/bookingPending");
const bookingDeniedRoutes = require("./routes/booklingDenied");
const bookingDeleteRoutes = require("./routes/bookingDelete");
const bookingAllRoutes = require("./routes/bookingAll");
/*{ USER MANAGAMENT }*/
const registeredUserRoutes = require("./routes/registeredUsers");
const deleteUsersRoutes = require("./routes/deleteUser");
const adminUserRoutes = require("./routes/adminUsers");
const allClubsRoutes = require("./routes/allclubs");
/*{ ARCHIVE } */
const deletedAdminsRoutes = require("./routes/Archives/deletedAdmins");
const deletedBookingRoutes = require("./routes/Archives/deletedBookings");
const deletedOfficerRoutes = require("./routes/Archives/deletedOfficers");
const deletedVenuesRoutes = require("./routes/Archives/deletedVenues");
const restoreUserRoutes = require("./routes/Archives/restoreUser");
const restoreVenuesRoutes = require("./routes/Archives/restoreVenues");
const restoreBookingRoutes = require("./routes/Archives/restoreBookings");
const dropVenuesRoutes = require("./routes/Archives/dropVenues");
const dropUserRoutes = require("./routes/Archives/dropUsers");
/*{ PROFILE PAGE }*/
const userFetchAllRoutes = require("./routes/UserProfiles/userFetchAll");
const userBookingsRoutes = require("./routes/UserProfiles/userBookingsAll");
/*{ CALENDAR PAGE } */
const userBookingsAllFilterRoutes = require("./routes/bookingAllCalendar");
//
const { verify } = require("crypto");
//
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
app.use("/", bookingDeleteRoutes);
//
/*{ USER MANAGEMENT }*/
app.use("/", adminUserRoutes);
app.use("/", registeredUserRoutes);
app.use("/", deleteUsersRoutes);
app.use("/", allClubsRoutes);
/*{ ARCHIVE } */
app.use("/", deletedAdminsRoutes);
app.use("/", deletedBookingRoutes);
app.use("/", deletedOfficerRoutes);
app.use("/", deletedVenuesRoutes);
app.use("/", restoreUserRoutes);
app.use("/", restoreVenuesRoutes);
app.use("/", restoreBookingRoutes);
app.use("/", dropVenuesRoutes);
app.use("/", dropUserRoutes);
//
/*{ PROFILE PAGE }*/
app.use("/", userFetchAllRoutes);
app.use("/", userBookingsRoutes);
//
/*{ CALENDAR PAGE } */
app.use("/api", userBookingsAllFilterRoutes);
``;
//
//
//
//
//
//
//
// CALENDAR
// CALENDAR
// CALENDAR
app.get("/event_venues_booked", (req, res) => {
  const venue = req.query.venue || ""; // Default to empty string if not provided
  const sql = "SELECT * FROM venue_bookings WHERE `event_facility`=?";
  db.query(sql, [venue], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
    } else {
      res.json(result);
    }
  });
});
/*
THIS WORKS
app.get("/event_venues_booked", (req, res) => {
  const status = req.query.status || "Active"; // Default to 'Active' if not provided
  const sql = "SELECT * FROM venue_bookings WHERE `deleted`=?";
  db.query(sql, [status], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
    } else {
      res.json(result);
    }
  });
});
*/
//
//
//
//
//

// const port = 5000;
const port = process.env.PORT || 5000;
//
// Verify JWT
const verifyJwt = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.json("we need token please provide one");
  } else {
    jwt.verify(token, "jwtSecretKey", (err, decoded) => {
      if (err) {
        res.json("Not Authenticated");
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
// JWT AUTH
app.get("/checkauth", verifyJwt, (req, res) => {
  return res.json("Authenticated");
});
//

// Import the database connection

//
// LOG IN USER
app.post("/check_user", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user_login WHERE email = ? AND password = ?";
  // JWT token passed
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (result.length > 0) {
      const user_id = result[0].user_id; // Corrected variable name
      const token = jwt.sign({ user_id }, "jwtSecretKey", { expiresIn: 10 });
      // User exists and password matches
      return res.json({ Login: true, token, data: result }); // Corrected variable name
      // pass to fontend
    } else {
      // No user found with the provided email and password
      return res.json({ success: false, message: "Invalid email or password" });
    }
  });
});

// TRANSER TO INDIVIDUAL
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
  /*
    const minTime = new Date();
  minTime.setHours(6, 0, 0); // 6 AM

  const maxTime = new Date();
  maxTime.setHours(21, 0, 0); // 9 PM
          min={minTime}
        max={maxTime}
  */
  console.log(req.body);
  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ message: "Something unexpected has occured" + err });
    }
    return res.json({ success: "Student added successfully" });
  });
}); // CREATE BOOKINGS
// app.post("/create_booking", (req, res) => {
//   // ALREADY WORKING JUST COMMENTED OUT
//   const sql =
//     "INSERT INTO venue_bookings (`booker_id`,`eventname`,`event_purpose`,`event_date`,`starting_time`,`ending_time`,`event_facility`,`username`, `email`)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//   const values = [
//     req.body.booker_id,
//     req.body.eventname,
//     req.body.event_purpose,
//     req.body.event_date,
//     req.body.starting_time,
//     req.body.ending_time,
//     req.body.event_facility,
//     req.body.username,
//     req.body.email,
//   ];
//   console.log(req.body);
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       return res.json({ message: "Something unexpected has occured" + err });
//     }
//     return res.json({ success: "Student added successfully" });
//   });
// });
//
// // CONNECT TO PORT NUMBER
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
app.post("/create_booking", (req, res) => {
  const {
    booker_id,
    eventname,
    event_purpose,
    event_date,
    starting_time,
    ending_time,
    event_facility,
    username,
    email,
  } = req.body;

  // SQL query to check for overlapping bookings
  const checkOverlapSql = `
    SELECT * FROM venue_bookings
    WHERE event_facility = ?
    AND event_date = ?
    AND (
      (starting_time < ? AND ending_time > ?) OR
      (starting_time >= ? AND starting_time < ?)
    )
  `;

  const overlapValues = [
    event_facility,
    event_date,
    ending_time,
    starting_time,
    starting_time,
    ending_time,
  ];

  db.query(checkOverlapSql, overlapValues, (err, results) => {
    if (err) {
      return res.json({
        message: "Error checking for overlapping bookings: " + err,
      });
    }

    if (results.length > 0) {
      // There is an overlapping booking
      return res.json({
        message: "There is a conflict with an existing booking.",
        overlapBooking: results[0], // Include the overlapping booking details
      });
    } else {
      // No overlapping bookings, proceed with the insertion
      const insertSql = `
      INSERT INTO venue_bookings (booker_id, eventname, event_purpose, event_date, starting_time, ending_time, event_facility, username, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
      const insertValues = [
        booker_id,
        eventname,
        event_purpose,
        event_date,
        starting_time,
        ending_time,
        event_facility,
        username,
        email,
      ];

      db.query(insertSql, insertValues, (err, result) => {
        if (err) {
          return res.json({ message: "Error creating booking: " + err });
        }
        return res.json({ success: "Booking added successfully" });
      });
    }
  });
});

// DELETE BOOKING /UPDATE 1 VALUE I-O
// app.post("/delete_user/:booking_id", (req, res) => {
//   const booking_id = req.params.booking_id;
//   const sql =
//     "UPDATE venue_bookings SET `deleted`='Deleted' WHERE booking_id=?";
//   db.query(sql, [booking_id], (err, result) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ message: "Database error" });
//     }
//     return res.json({ success: "User marked as deleted successfully" });
//   });
// });
//
//
//
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

//
//
//

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
