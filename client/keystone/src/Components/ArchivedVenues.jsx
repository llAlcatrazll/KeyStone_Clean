import { useEffect, useState } from "react";
import axios from "axios";
import { UserLink } from "../App";
function ArchivedVenues() {
  const [archivedVenue, setArchivedVenue] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = archivedVenue.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchVenues(); // Initial fetch
    const interval = setInterval(() => {
      fetchVenues();
    }, 2000); // Fetch every few seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  const fetchVenues = () => {
    // ARCHIVED VENUES
    axios
      .get(`${UserLink}/booking_archived`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setArchivedVenue(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleRestore = (venue_id) => {
    axios
      .post(`${UserLink}/restore_venue/${venue_id}`)
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
        <h3>Deleted Venues</h3>
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
                  onClick={() => handleRestore(venue.venue_id)}
                >
                  Restore
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
              { length: Math.ceil(archivedVenue.length / itemsPerPage) },
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

export default ArchivedVenues;
