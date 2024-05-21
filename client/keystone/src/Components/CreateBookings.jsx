import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "@mantine/core";
import { UserLink } from "../App";
function CreateBookings() {
  const [venueData, setVenueData] = useState([]);
  const [isApproved, setIsApproved] = useState([]);
  const [isOfficer, setisOfficer] = useState();
  const [selectedUser, setSelectedUser] = useState("");
  const user_picture =
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/";

  useEffect(() => {
    axios
      .get(`${UserLink}/admin_users`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsApproved(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(`${UserLink}/registered_user`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setisOfficer(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []); // Added empty dependency array to run only once

  const [values, setValues] = useState({
    booker_id: "",
    eventname: "",
    event_purpose: "",
    event_date: "--:--:----",
    starting_time: "-----",
    ending_time: "-----",
    event_facility: "",
    username: "",
    email: "",
    profile_pic: "",
    account_type: "",
    position: "",
    club: "",
    college_affiliation: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`${UserLink}/create_booking`, values)
      .then((res) => {
        console.log(res);
        if (
          res.data.message === "There is a conflict with an existing booking."
        ) {
          const overlapBooking = res.data.overlapBooking;
          alert(
            `There is a conflict with an existing booking.\nEvent Name: ${overlapBooking.eventname}\nBooked by: ${overlapBooking.username} \n Starting Time: ${overlapBooking.starting_time} \n Ending Time: ${overlapBooking.ending_time}`
          );
        } else {
          alert("Booking added successfully!");
          // Clear the form or redirect as needed
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    // ACTIVE VENUES
    axios
      .get(`${UserLink}/venues`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setVenueData(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []); // Added empty dependency array to run only once

  function convertTime24to12(time24) {
    const [hour, minute] = time24.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const hour12 = hourInt % 12 || 12; // Convert to 12-hour format and handle midnight (0) case
    return `${hour12}:${minute} ${period}`;
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    if (dateString === "--:--:----") {
      return dateString;
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  // function formatTimeRange(startTime, endTime) {
  //   const start = convertTime24to12(startTime);
  //   const end = convertTime24to12(endTime);
  //   return `${start} - ${end}`;
  // } CONCATENATED
  function formatStartingTime(startTime) {
    if (startTime === "-----" || startTime === "--:--") {
      return startTime; // Return the default value as is
    }
    const start = convertTime24to12(startTime);
    return `${start}`;
  }
  function formatEndingTime(endTime) {
    if (endTime === "-----" || endTime === "--:--") {
      return endTime; // Return the default value as is
    }
    const end = convertTime24to12(endTime);
    return `${end}`;
  }

  return (
    // function formatDate(dateString) {
    //   const date = new Date(dateString);
    //   return date.toLocaleDateString("en-US", {
    //     year: "numeric",
    //     month: "long"

    //     day: "numeric",
    //   });
    // }
    <div>
      <div
        className="justify-content-start  p-2 d-flex rounded p-3 mb-5 bg-dark-subtle rounded"
        style={{ height: "83vh" }}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className=" flex-grow-1 flex-column  d-flex"
        >
          {" "}
          <div
            className=" flex-grow-1 d-flex bg-dark-subtle rounded justify-content-between p-2 "
            style={{ height: "77vh" }}
          >
            {" "}
            {/* 
            SELECT USER AREA
            */}
            <div className="flex-grow-1 bg-dark-subtle d-flex flex-column">
              <div className="p-1 bg-white rounded flex-grow-1 m-2">
                <div className="mt-2 d-flex justify-content-around bg-dark-subtle -subtle w-100 ">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    <option value="">Select User</option>
                    <option value="admin">Admin</option>
                    <option value="officer">Officer</option>
                  </select>
                  {selectedUser === "admin" && (
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => {
                        const selectedUsername = e.target.value;
                        const selectedAdmin = isApproved.find(
                          (admin) => admin.username === selectedUsername
                        );
                        setValues({
                          ...values,
                          username: selectedUsername,
                          booker_id: selectedAdmin ? selectedAdmin.user_id : "", // Set the booker_id based on selected user
                        });
                      }}
                    >
                      <option value="">Select Admin</option>
                      {isApproved.map((admin) => (
                        <option key={admin.user_id} value={admin.username}>
                          {admin.username}
                        </option>
                      ))}
                    </select>
                  )}

                  {selectedUser === "officer" && (
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => {
                        const selectedUsername = e.target.value;

                        const selectedOfficer = isOfficer.find(
                          (officer) => officer.username === selectedUsername
                        );
                        setValues({
                          ...values,
                          username: selectedUsername,
                          booker_id: selectedOfficer
                            ? selectedOfficer.user_id
                            : "", // Set the booker_id based on selected user
                          email: selectedOfficer ? selectedOfficer.email : "",
                          profile_pic: selectedOfficer
                            ? selectedOfficer.user_profile_pic
                            : "",
                          account_type: selectedOfficer
                            ? selectedOfficer.account_type
                            : "",
                          position: selectedOfficer
                            ? selectedOfficer.position
                            : "",
                          club: selectedOfficer ? selectedOfficer.club : "",
                          college_affiliation: selectedOfficer
                            ? selectedOfficer.user_college_affiliation
                            : "",
                        });
                      }}
                    >
                      <option value="">Select Officer</option>
                      {isOfficer.map((officer) => (
                        <option key={officer.user_id} value={officer.username}>
                          {officer.username}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="flex-row d-flex justify-content-between w-100 mb-3 p-2 rounded ">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Date of Event</span>
                    </div>
                    <input
                      type="date"
                      aria-label="First name"
                      className="form-control"
                      name="event_date"
                      onChange={(e) =>
                        setValues({ ...values, event_date: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Starting Time</span>
                  </div>
                  <input
                    type="time"
                    aria-label="Starting Time"
                    className="form-control"
                    name="starting_time"
                    min="06:00"
                    max="20:00"
                    onChange={(e) => {
                      const time = e.target.value;
                      const hour = parseInt(time.split(":")[0], 10);
                      if (hour < 6 || hour > 20) {
                        alert("Please select a time between 06:00 and 20:00.");
                        e.target.value = ""; // Resetting the input field
                      } else {
                        setValues({ ...values, starting_time: time });
                      }
                    }}
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text">Ending Time</span>
                  </div>
                  <input
                    type="time"
                    aria-label="Ending Time"
                    className="form-control"
                    name="ending_time"
                    min="06:00"
                    max="20:00"
                    onChange={(e) => {
                      const time = e.target.value;
                      const hour = parseInt(time.split(":")[0], 10);
                      if (hour < 6 || hour > 20) {
                        alert("Please select a time between 06:00 and 20:00.");
                        e.target.value = ""; // Resetting the input field
                      } else {
                        setValues({ ...values, ending_time: time });
                      }
                    }}
                  />
                </div>
              </div>
              {/* 
            EVENT NAME AREA
            */}
              <div className="bg-danger m-2 p-2 rounded bg-white flex-grow-1">
                <div className=" d-flex justify-content-around bg-secondary-subtle -subtle w-100 ">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Event Name</span>
                    </div>
                    <input
                      type="text"
                      aria-label="First name"
                      name="eventname"
                      className="form-control"
                      onChange={(e) =>
                        setValues({ ...values, eventname: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className=" d-flex justify-content-around bg-secondary-subtle -subtle w-100 ">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Event Purpose</span>
                    </div>
                    <input
                      type="text"
                      aria-label="First name"
                      name="event_purpose"
                      className="form-control"
                      onChange={(e) =>
                        setValues({ ...values, event_purpose: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              {/* 
            EVENT FACILITY AREA
            */}
              <div className=" flex-grow-1 m-2 rounded pt-2 justify-content-around bg-white">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Event Facility</span>
                  </div>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="event_facility"
                    onChange={(e) =>
                      setValues({ ...values, event_facility: e.target.value })
                    }
                  >
                    <option value="">Select Venue</option>
                    {venueData.map((venue) => (
                      <option key={venue.venue_id}>
                        <option value={venue.venue_name} className="w-52">
                          {venue.venue_name}
                        </option>
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* 
            BOOKINGS SUMMARY AREA
            */}
            <div
              className="shadow p-3 mb-5 bg-white rounded "
              style={{ width: "35%", height: "99%" }}
            >
              <div className="col  d-flex align-items-center p-3 flex-column text-center">
                <Avatar
                  src={user_picture + values.profile_pic}
                  size={150}
                  radius={150}
                  mx="auto"
                />
                <div className="fw-bold fs-3 mt-3">{values.username}</div>
                <div className="fst-italic fs-5 fw-medium">
                  {values.account_type}
                </div>
                <div className="fst-italic fs-6">{values.position}</div>
                <div className="d-flex mb-3 ps-3 justify-content-center">
                  <div className="d-flex flex-row text-center me-3">
                    {values.club}
                  </div>
                  <div>{values.college_affiliation}</div>
                </div>
              </div>

              {/* <h2>Booking Summary</h2> */}
              <div className="d-flex flex-column p-1">
                <div className="input-group mb-3 d-flex flex-column bg-light p-3 rounded border">
                  {/* START EVENT NAME AREA */}
                  <div className="p-2 d-flex mb-2 bg-white rounded border">
                    <div className="fw-bold me-3">Event Name:</div>
                    <div>{values.eventname}</div>
                  </div>
                  {/* END EVENT NAME AREA */}
                  <div className="p-2 d-flex mb-2 bg-white rounded border">
                    <div className="fw-bold me-3">Date of Event:</div>
                    <div>{formatDate(values.event_date)}</div>
                  </div>
                  {/* START OF EVENT PURPOSE */}
                  <div className="flex-grow-1 p-2 d-flex mb-4 bg-white rounded border">
                    <div className="fw-bold me-3">Event Description:</div>
                    <div>{values.event_purpose}</div>
                  </div>
                  {/* END OF EVENT PURPOSE */}
                  {/* START OF TIME AREA */}
                  <div className="d-flex justify-content-around flex-grow-1 mb-4">
                    <div className="text-center bg-white rounded border p-2">
                      <div className="fw-bold">Starting Time:</div>
                      <div defaultValue={0}>
                        {" "}
                        {formatStartingTime(values.starting_time)}
                      </div>
                    </div>
                    <div className="text-center bg-white rounded border p-2">
                      <div className="fw-bold">Ending Time:</div>
                      <div>{formatEndingTime(values.ending_time)}</div>
                    </div>
                  </div>
                  {/* END OF TIME AREA */}
                  {/* START OF VENUE */}
                  <div className="d-flex flex-column text-center bg-white rounded mb-4 border p-2">
                    <div className="fw-bold">Event Venue:</div>
                    <div>{values.event_facility}</div>
                  </div>
                  {/* END OF VENUE */}
                  <button type="submit" className="btn btn-dark w16 w-100">
                    Submit
                  </button>
                </div>
              </div>
              {/* GROW GREEN WHEN ITS NOT EMPTY OR DEFAULT */}
              {/* <div>{values.event_facility}</div> */}
              {/* <div>{values.username}</div> */}
            </div>
          </div>
        </form>
        {/* 
        BOOKINGS SUMMARY  
        */}
      </div>
    </div>
  );
}

export default CreateBookings;
