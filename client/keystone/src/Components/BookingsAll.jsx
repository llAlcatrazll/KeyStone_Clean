import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookingsAll() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
  }, []);

  // Logic to slice data based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleDelete(booking_id) {
    axios
      .post(`http://localhost:5000/delete_booking/${booking_id}`)
      .then((res) => {
        console.log(res.data);
        // Refresh the data by fetching it again
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
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-info-subtle p-3 justify-content-evenly ">
      <h2>Bookings All Component</h2>
      <tbody className="grid grid-flow-col justify-content-evenly flex-grow-1 bg-dark-subtle d-flex flex-column">
        {currentItems.map((venue) => (
          <div key={venue.id} className=" d-flex justify-content-between ">
            <div>{venue.booking_id}</div>
            <div>{venue.booker_id}</div>
            <div>{venue.username}</div>
            <div>{venue.eventname}</div>
            <div>{venue.event_purpose}</div>
            <div>{venue.event_date}</div>
            <div>{venue.starting_time}</div>
            <div>{venue.ending_time}</div>
            <div>{venue.event_facility}</div>
            <div>{venue.designation}</div>
            <div>{venue.college_afiliation}</div>
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
        ))}
      </tbody>
      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
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

export default BookingsAll;
