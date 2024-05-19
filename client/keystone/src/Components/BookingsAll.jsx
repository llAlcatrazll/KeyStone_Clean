import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mantine/core";
import { useEffect } from "react";
import axios from "axios";
import "../../src/Transition.css";
//
export function BookingsAll() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const user_picture_base_url =
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/";
  // const profile_cont = "avatar-5.png";

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
  function getStatusStyle(status) {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          backgroundColor: "#9ADE7B",
          color: "white",
          borderRadius: "10px",
        };
      case "pending":
        return {
          backgroundColor: "#EEF296",
          color: "black",
          borderRadius: "10px",
        };
      case "denied":
        return {
          backgroundColor: "#FF8F8F",
          color: "white",
          borderRadius: "10px",
        };
      default:
        return {};
    }
  }

  return (
    <div
      className="bg-dark-subtle rounded p-3 d-flex flex-column"
      style={{ height: "85vh" }}
    >
      {/* <h2>Bookings All Component</h2> */}
      <div
        className="d-flex flex-grow-1 align-items-center text-white fw-bold fs-1  text-center justify-content-center rounded"
        style={{ backgroundColor: "#31375A" }}
      >
        All Bookings
      </div>
      <div className="d-flex  flex-column p-1 bg-white">
        <table className="table table-default table-striped table-hover ">
          <thead>
            <tr>
              <th className="text-center">Profile</th>
              <th className="text-center">Username</th>
              <th className="text-center">Event Name</th>
              <th className="text-center">Event Date</th>
              <th className="text-center">Starting Time</th>
              {/* <th className="text-center">Ending Time</th> */}
              <th className="text-center">Event Facility</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((venue) => (
              <tr key={venue.id}>
                <td className="text-center">
                  <Avatar
                    src={user_picture_base_url + venue.profile_pic}
                    size={35}
                    radius={35}
                    mx="auto"
                  />
                </td>
                <td className="text-center">{venue.username}</td>
                <td className="text-center">{venue.eventname}</td>
                <td className="text-center"> {formatDate(venue.event_date)}</td>
                <td className="text-center">
                  {" "}
                  {formatTimeRange(venue.starting_time, venue.ending_time)}
                </td>
                {/* <td className="text-center">{venue.ending_time}</td> */}
                <td className="text-center">{venue.event_facility}</td>
                <td className="text-center">
                  <div style={getStatusStyle(venue.status)}>{venue.status}</div>
                </td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <Link
                      to={`/read/${venue.booking_id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Read
                    </Link>
                    <Link
                      to={`/edit/${venue.booking_id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(venue.booking_id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
