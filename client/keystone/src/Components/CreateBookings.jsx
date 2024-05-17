import { useState, useEffect } from "react";
import axios from "axios";
// import { Calendar } from "primereact/calendar";
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
    email: "",
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
      <div
        className="justify-content-start  p-2 d-flex rounded shadow p-3 mb-5 bg-white rounded"
        style={{ height: "83vh" }}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className=" p-3 flex-grow-1 flex-column "
        >
          <div
            className=" flex-grow-1 d-flex flex-column rounded justify-content-between p-2 "
            style={{ height: "77vh" }}
          >
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
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Starting Time</span>
                </div>
                <input
                  type="time"
                  aria-label="Starting Time"
                  className="form-control"
                  name="starting_time"
                  onChange={(e) =>
                    setValues({ ...values, starting_time: e.target.value })
                  }
                />
                <div className="input-group-prepend">
                  <span className="input-group-text">Ending Time</span>
                </div>
                <input
                  type="time"
                  aria-label="Ending Time"
                  className="form-control"
                  name="ending_time"
                  onChange={(e) =>
                    setValues({ ...values, ending_time: e.target.value })
                  }
                />
              </div>
            </div>
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
            <div className=" d-flex justify-content-around bg-secondary-subtle -subtle">
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
                      booker_id: selectedOfficer ? selectedOfficer.user_id : "", // Set the booker_id based on selected user
                      email: selectedOfficer ? selectedOfficer.email : "",
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
              <button type="submit" className="btn btn-dark w16">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="shadow p-3 mb-5 bg-white rounded b">
          <h2>Booking Summary</h2>
          <div className="d-flex flex-column">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Facility
                </span>
              </div>
              <input
                type="text"
                value={values.event_facility}
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Username
                </span>
              </div>
              <input
                type="text"
                value={values.username}
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  Event Name
                </span>
              </div>
              <input
                type="text"
                value={values.eventname}
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
              {/* GROW GREEN WHEN ITS NOT EMPTY OR DEFAULT */}
            </div>
            <div>wew</div>
            <div>wew</div>
            <div>wew</div>
          </div>
          <div>{values.event_facility}</div>
          <div>{values.username}</div>
        </div>
      </div>
    </div>
  );
}

export default CreateBookings;
