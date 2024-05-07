import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function BookingsAll() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/venue_bookings")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [deleted]);
  function handleDelete(booking_id) {
    axios
      .post(`http://localhost:5000/delete_booking/${booking_id}`)
      .then((res) => {
        console.log(res.data);
        // Toggle the 'deleted' state to trigger a re-fetch of the data
        setDeleted((prevDeleted) => !prevDeleted);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="bg-info-subtle p-3 justify-content-evenly ">
      <h2>Bookigns All Componenet</h2>
      <div>
        <div>
          <tr className="grid grid-flow-col justify-content-evenly flex-grow-1 bg-dark-subtle d-flex ">
            <th className=" text-xs">Booking ID</th>
            <th className=" text-xs">Requested by</th>
            <th className=" text-xs">College</th>
            <th className=" text-xs">Event Date</th>
            <th className=" text-xs">Starting Time</th>
            <th className=" text-xs">Eding Time</th>
            <th className=" text-xs">Event Facility</th>
            <th className=" text-xs">Event Name</th>
            <th className=" text-xs">Event Purpose</th>
            <th className=" text-xs">Event Status</th>
            <th className=" text-xs">Actions</th>
          </tr>
        </div>
      </div>
      <tbody className="grid grid-flow-col justify-content-evenly flex-grow-1 bg-dark-subtle d-flex flex-column">
        {Array.isArray(data) &&
          data.map((venue) => {
            return (
              <div key={venue.id} className=" d-flex justify-content-between ">
                <div className="align-content-center">{venue.booking_id}</div>
                <div className="align-content-center">{venue.booker_id}</div>
                <div className="align-content-center">{venue.username}</div>
                <div className="align-content-center">{venue.eventname}</div>
                <div className="align-content-center">
                  {venue.event_purpose}
                </div>
                <div className="align-content-center">{venue.event_date}</div>
                <div className="align-content-center">
                  {venue.starting_time}
                </div>
                <div className="align-content-center">{venue.ending_time}</div>
                <div className="align-content-center">
                  {venue.event_facility}
                </div>

                <div className="align-content-center">{venue.designation}</div>
                <div className="align-content-center">
                  {venue.college_afiliation}
                </div>
                <div className="align-content-center">{venue.status}</div>
                <div className="align-content-center">{venue.club}</div>
                <div className="bg-danger-subtle">
                  <Link to={`/read/${venue.booking_id}`}>Read</Link>
                  <Link to={`/edit/${venue.booking_id}`}>Edit</Link>
                  <button onClick={() => handleDelete(venue.booking_id)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
      </tbody>
    </div>
  );
}

export default BookingsAll;
