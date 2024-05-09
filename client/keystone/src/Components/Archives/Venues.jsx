import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

function Venues() {
  const [isPending, setIsPending] = useState([]);
  const [restore, setRestored] = useState(true);
  const [dropped, setDropped] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/deleted_venues")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsPending(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [restore, dropped]);
  function handleRestore(venue_id) {
    axios
      .post(`http://localhost:5000/restore_venues/${venue_id}`)
      .then((res) => {
        console.log(res.data);
        // Toggle the 'deleted' state to trigger a re-fetch of the data
        setRestored((prevRestored) => !prevRestored);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  function handleDrop(venue_id) {
    axios
      .post(`http://localhost:5000/drop_venues/${venue_id}`)
      .then((res) => {
        console.log(res.data);
        setDropped((prevDropped) => !prevDropped);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="bg-info-subtle p-3">
      <h5>Archived Venues</h5>
      <div>
        {isPending.map((venue) => (
          <tr key={venue.venue_id}>
            <td className="w-28 text-xs ">{venue.venue_name}</td>

            <td className="w-28 text-xs ">
              <button onClick={() => handleRestore(venue.venue_id)}>
                Restore
              </button>

              <button onClick={() => handleDrop(venue.venue_id)}>Drop</button>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}

export default Venues;
