import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function ActiveVenues() {
  const [venueData, setVenueData] = useState([]);
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
  }, []);
  return (
    <div
      className=" p-3 w-100 bg-info-subtle d-flex justify-content-evenly align-items-center"
      style={{ height: "100%" }}
    >
      <table>
        <thead>
          <tr className="w-52">
            <h3>Active Venues</h3>
          </tr>
          <tr>
            <th className="w-72">Venue ID</th>
            <th className="w-72">Venue Name</th>
          </tr>
        </thead>
        <tbody>
          {venueData.map((venue) => (
            <tr key={venue.venue_id}>
              booking_approved
              <td className="w-52">{venue.venue_id}</td>
              <td className="w-52">{venue.venue_name}</td>
              <td className="w-52">
                <Link to={`/read/${venue.venue_id}`}>Read</Link>
                <Link to={`/edit/${venue.venue_id}`}>Edit</Link>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveVenues;
