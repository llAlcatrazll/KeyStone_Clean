import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Venues() {
  const [venueData, setVenueData] = useState([]);
  const [archivedVenue, setArchivedVenue] = useState([]);
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
  //
  const [values, setValues] = useState({
    venue_name: "",
  });
  function handleSubmit() {
    // function handleSubmit(e) {
    // e.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:5000/add_venue", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }
  return (
    <div>
      <h1>Venues</h1>
      <button className="bg-primary">Add Venue</button>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Add Venue</label>
          <input
            type="text"
            name="venue_name"
            onChange={(e) =>
              setValues({
                ...values,
                venue_name: e.target.value,
              })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="d-flex flex-row justify-content-around">
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
      </div>
    </div>
  );
}

export default Venues;
