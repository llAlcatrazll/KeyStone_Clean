import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookingsApproved() {
  const [isApproved, setIsApproved] = useState([]);
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/booking_approved")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsApproved(res.data);
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
    <div className="bg-info-subtle p-3">
      <h2>Bookings Approved</h2>
      <div>
        {" "}
        {isApproved.map((booking) => (
          <tr key={booking.booking_id}>
            <td className="w-28 text-xs ">{booking.eventname}</td>
            <td className="w-28 text-xs ">{booking.event_date}</td>
            <td className="w-28 text-xs ">{booking.college_afiliation}</td>
            <td className="w-28 text-xs ">{booking.event_facility}</td>
            <td className="w-28 text-xs ">
              <Link to={`/read/${booking.booking_id}`}>Read</Link>
              <Link to={`/edit/${booking.booking_id}`}>Edit</Link>
              <button onClick={() => handleDelete(booking.booking_id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default BookingsApproved;
