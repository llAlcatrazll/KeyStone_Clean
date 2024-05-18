import { useEffect, useState } from "react";
import axios from "axios";
// import { IconTrash, IconEdit } from "@tabler/icons-react";
import "../../Transition.css";
function UserPendingBookings() {
  const [isPending, setIsPending] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const userEmail = localStorage.getItem("userEmail");
  const itemsPerPage = 5;
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  function convertTime24to12(time24) {
    const [hour, minute] = time24.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const hour12 = hourInt % 12 || 12; // Convert to 12-hour format and handle midnight (0) case
    return `${hour12}:${minute} ${period}`;
  }
  function formatTimeRange(startTime, endTime) {
    const start = convertTime24to12(startTime);
    const end = convertTime24to12(endTime);
    return `${start} - ${end}`;
  }

  // Logic to slice data based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isPending.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //
  useEffect(() => {
    // Fetch user data based on userEmail
    axios
      .get(`http://localhost:5000/user_bookingsall?email=${userEmail}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsPending(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [userEmail]);
  return (
    <div
      className="p-1  parent-container bg-white rounded mt-2  mb-2"
      style={{ height: "98%" }}
    >
      {/* put box styling here */}
      <div
        className=" p-1 flex-grow-1 d-flex flex-column "
        // style={{ height: "100%" }}
      >
        <div
          className="fw-bold fs-3 m-2 rounded ps-3 text-white"
          style={{ backgroundColor: "#31375A" }}
        >
          My Bookings
        </div>
        <table className="table table-striped  w-100">
          <thead className="bg-danger-subtle">
            <tr>
              <th>Booking ID</th>
              <th>Event Name</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((venue, index) => (
              <tr key={index}>
                <td>{venue.booking_id}</td>
                <td>{venue.eventname}</td>
                <td>{venue.event_facility}</td>
                <td>{formatDate(venue.event_date)}</td>
                <td>
                  {formatTimeRange(venue.starting_time, venue.ending_time)}
                </td>
                <td>{venue.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-center mt-3 align-items-end">
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
      {/* Pagination */}
    </div>
  );
}

export default UserPendingBookings;
