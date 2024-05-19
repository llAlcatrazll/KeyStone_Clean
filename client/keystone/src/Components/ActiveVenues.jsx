import { useEffect, useState } from "react";
import axios from "axios";

function ActiveVenues() {
  const [venueData, setVenueData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = venueData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = () => {
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
  };

  const handleDelete = (venue_id) => {
    axios
      .post(`http://localhost:5000/delete_venu/${venue_id}`)
      .then((res) => {
        console.log(res.data);
        fetchVenues(); // Re-fetch the venues after deleting
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-3 w-100 bg-white shadow-lg rounded m-2 flex-grow-1">
      <div
        className="w-52 p-2 px-4 text-white rounded"
        style={{ backgroundColor: "#31375A" }}
      >
        <h3>Active Venues</h3>
      </div>
      <table className="w-100 my-2 rounded p-2 table table-striped">
        <thead>
          <tr>
            <th className="w-72">Venue ID</th>
            <th className="w-72">Venue Name</th>
            <th className="w-72">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((venue) => (
            <tr key={venue.venue_id}>
              <td className="w-52">{venue.venue_id}</td>
              <td className="w-52">{venue.venue_name}</td>
              <td className="w-52">
                <button
                  className="btn btn-dark"
                  onClick={() => handleDelete(venue.venue_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-3 align-items-end">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(venueData.length / itemsPerPage) },
              (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ActiveVenues;
