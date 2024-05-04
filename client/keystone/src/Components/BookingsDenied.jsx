import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function BookingsDenied() {
  const [isDenied, setIsDenied] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/booking_denied")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsDenied(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-info-subtle p-3">
      <h2>Bookings Denied</h2>
      <div>
        {" "}
        {isDenied.map((venue) => (
          <tr key={venue.venue_id}>
            <td className="w-28 text-xs ">{venue.eventname}</td>
            <td className="w-28 text-xs ">{venue.event_date}</td>
            <td className="w-28 text-xs ">{venue.college_afiliation}</td>
            <td className="w-28 text-xs ">{venue.event_facility}</td>
            <td className="w-28 text-xs ">
              <Link to={`/read/${venue.venue_id}`}>Read</Link>
              <Link to={`/edit/${venue.venue_id}`}>Edit</Link>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default BookingsDenied;
