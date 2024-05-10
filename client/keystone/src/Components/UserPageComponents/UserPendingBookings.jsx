import { useEffect, useState } from "react";
import axios from "axios";

function UserPendingBookings() {
  const [userDetails, setUserDetails] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    // Fetch user data based on userEmail
    axios
      .get(`http://localhost:5000/user_bookingsall?email=${userEmail}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUserDetails(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [userEmail]);
  return (
    <div className="bg-primary-subtle">
      <h2>User Bookings</h2>
      <div>{userEmail}</div>
      {userDetails.map((venue) => (
        <div key={venue.id} className=" d-flex justify-content-between ">
          <div>{venue.booking_id}</div>
          <div>{venue.booker_id}</div>
          <div>{venue.username}</div>
          <div>{venue.eventname}</div>
          <div>{venue.event_purpose}</div>
          <div>{venue.event_date}</div>
          <div>{venue.starting_time}</div>
          <div>{venue.ending_time}</div>
          <div>{venue.event_facility}</div>
          <div className="bg-danger-subtle">
            {/* <Link to={`/read/${venue.booking_id}`}>Read</Link>
            <Link to={`/edit/${venue.booking_id}`}>Edit</Link> */}
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPendingBookings;
