import { useState, useEffect } from "react";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

function CreateBookings() {
  const [venueData, setVenueData] = useState([]);
  const [isApproved, setIsApproved] = useState([]);
  const [isOfficer, setisOfficer] = useState();
  const [selectedUser, setSelectedUser] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin_users")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsApproved(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:5000/registered_user")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setisOfficer(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  const [values, setValues] = useState({
    booker_id: "",
    eventname: "",
    event_purpose: "",
    event_date: "",
    starting_time: "",
    ending_time: "",
    event_facility: "",
    username: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/create_booking", values)

      .then((res) => {
        // navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }
  useEffect(() => {
    // ACTIVE VENUES
    axios
      .get("http://localhost:5000/venues")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setVenueData(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <h2>Create Bookings</h2>
      <div
        className="justify-content-start bg-dark-subtle p-2 d-flex flex-row "
        style={{ height: "83vh" }}
      >
        <div className="bg-danger-subtle me-3">User Profiles</div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="bg-danger-subtle p-3 flex-grow-1"
        >
          <div>
            <div className="flex-row d-flex justify-content-around bg-dark-subtle w-100 mb-3 p-2">
              <label htmlFor="">Event Date</label>
              <input
                // event_date
                type="date"
                name="event_date"
                onChange={(e) =>
                  setValues({ ...values, event_date: e.target.value })
                }
              />
              <label htmlFor="">Starting Time</label>
              <input
                // starting_time
                type="time"
                name="starting_time"
                onChange={(e) =>
                  setValues({ ...values, starting_time: e.target.value })
                }
              />
              <label htmlFor="">Ending Time</label>
              <input
                // ending_time
                type="time"
                name="ending_time"
                onChange={(e) =>
                  setValues({ ...values, ending_time: e.target.value })
                }
              />
            </div>
            <div className=" d-flex justify-content-around bg-secondary-subtle -subtle w-100 ">
              <label htmlFor="">Event Name</label>
              <input
                type="text"
                name="eventname"
                className="form-control"
                placeholder="Event Name"
                onChange={(e) =>
                  setValues({ ...values, eventname: e.target.value })
                }
              />
            </div>
            <div className=" d-flex justify-content-around bg-secondary-subtle -subtle w-100 ">
              <label htmlFor="">Event Purpose</label>
              <input
                type="text"
                name="event_purpose"
                className="form-control"
                placeholder="Event Purpose"
                onChange={(e) =>
                  setValues({ ...values, event_purpose: e.target.value })
                }
              />
            </div>
            <div className=" d-flex justify-content-around bg-secondary-subtle -subtle w-100 ">
              <label htmlFor="">Event Facility</label>

              <select
                name="event_facility"
                onChange={(e) =>
                  setValues({ ...values, event_facility: e.target.value })
                }
              >
                {venueData.map((venue) => (
                  <option key={venue.venue_id}>
                    <option value={venue.venue_name} className="w-52">
                      {venue.venue_name}
                    </option>
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 d-flex justify-content-around bg-dark-subtle -subtle w-100 ">
              <h2>Select User</h2>
              <div>autofil</div>
              <label htmlFor="">Name</label>

              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select User</option>
                <option value="admin">Admin</option>
                <option value="officer">Officer</option>
              </select>
              {selectedUser === "admin" && (
                <select
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
                  onChange={(e) => {
                    const selectedUsername = e.target.value;
                    // Assuming isOfficer is the list of officer users
                    const selectedOfficer = isOfficer.find(
                      (officer) => officer.username === selectedUsername
                    );
                    setValues({
                      ...values,
                      username: selectedUsername,
                      booker_id: selectedOfficer ? selectedOfficer.user_id : "", // Set the booker_id based on selected user
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
            <div className="d-flex justify-content-center ">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBookings;
