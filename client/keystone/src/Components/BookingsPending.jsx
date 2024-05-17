import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

function BookingsPending() {
  const [isPending, setIsPending] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  useEffect(() => {
    axios
      .get("http://localhost:5000/booking_pending")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsPending(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // Logic to slice data based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isPending.slice(indexOfFirstItem, indexOfLastItem);
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="bg-info-subtle p-3">
      <h2>Bookings Pending</h2>

      <div>
        <div className="accordion">
          {currentItems.map(
            (
              venue,
              index // Added index parameter
            ) => (
              <div key={venue.venue_id}>
                <div className="accordion-item">
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`} // Unique ID
                      aria-expanded="false" // Initially closed
                      aria-controls={`collapse${index}`} // Corresponding collapse ID
                    >
                      {venue.eventname}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`} // Unique ID
                    className="accordion-collapse collapse" // Removed 'show'
                    aria-labelledby={`heading${index}`} // Corresponding header ID
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">{venue.event_facility}</div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from(
              { length: Math.ceil(isPending.length / itemsPerPage) },
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

export default BookingsPending;
