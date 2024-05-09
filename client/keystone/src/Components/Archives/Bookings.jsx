import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

function Bookings() {
  const [isPending, setIsPending] = useState([]);
  const [restore, setRestored] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/deleted_bookings")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsPending(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [restore]);
  function handleRestore(user_id) {
    axios
      .post(`http://localhost:5000/restore_user/${user_id}`)
      .then((res) => {
        console.log(res.data);
        // Toggle the 'deleted' state to trigger a re-fetch of the data
        setRestored((prevRestored) => !prevRestored);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-info-subtle p-3">
      <h5>Archived Bookings</h5>
      <div>
        {isPending.map((venue) => (
          <tr key={venue.venue_id}>
            <td className="w-28 text-xs ">{venue.eventname}</td>
            <td className="w-28 text-xs ">{venue.event_date}</td>
            <td className="w-28 text-xs ">{venue.college_afiliation}</td>
            <td className="w-28 text-xs ">{venue.event_facility}</td>
            <td className="w-28 text-xs ">
              <button onClick={() => handleRestore(venue.booking_id)}>
                Delete
              </button>

              <button>Drop</button>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
