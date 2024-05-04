import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function ArchivedVenues() {
  const [archivedVenue, setArchivedVenue] = useState([]);
  useEffect(() => {
    // ARCHIVED VENUES
    axios
      .get("http://localhost:5000/booking_archived")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setArchivedVenue(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className=" p-3 w-100 h-100 d-inline-block bg-info-subtle d-flex justify-content-evenly align-items-center ">
      Archive
      <table>
        <thead>
          <tr className="w-52">
            <h3>Archived Venues</h3>
          </tr>
          <tr>
            <th className="w-72">Venue ID</th>
            <th className="w-72">Venue Name</th>
          </tr>
        </thead>
        <tbody>
          {archivedVenue.map((archived) => (
            <tr key={archived.venue_id}>
              booking_approved
              <td className="w-52">{archived.venue_id}</td>
              <td className="w-52">{archived.venue_name}</td>
              <td className="w-52">
                <Link to={`/read/${archived.venue_id}`}>Read</Link>
                <Link to={`/edit/${archived.venue_id}`}>Edit</Link>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArchivedVenues;
