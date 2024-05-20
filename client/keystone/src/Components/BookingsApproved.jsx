import { useEffect, useState } from "react";
import axios from "axios";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import "../../src/Transition.css";
function BookingsApproved() {
  const [isPending, setIsPending] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  useEffect(() => {
    fetchApproved();
    const interval = setInterval(() => {
      fetchApproved();
    }, 1000);
    return () => clearInterval(interval);
  });
  const fetchApproved = () => {
    axios
      .get("http://localhost:5000/booking_approved")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsPending(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  };
  function handleDelete(booking_id) {
    axios
      .post(`http://localhost:5000/delete_booking/${booking_id}`)
      .then((res) => {
        console.log(res.data);
        // Toggle the 'deleted' state to trigger a re-fetch of the data
        fetchApproved();
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  function handlePending(booking_id) {
    axios
      .post(`http://localhost:5000/pending_booking/${booking_id}`)
      .then((res) => {
        console.log(res.data);
        fetchApproved();
      })
      .catch((err) => console.log(err));
  }
  function handleDeny(booking_id) {
    axios
      .post(`http://localhost:5000/booking_denied/${booking_id}`)
      .then((res) => {
        console.log(res.data);
        fetchApproved();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-white rounded">
      {" "}
      <hr className="bg-white opacity-0" />
      <div
        className="white border-light shadow-lg border-top-0 border rounded-2  p-3"
        // style={{ marginLeft: "20px", marginTop: "20px" }}
      >
        {/* MAIN WRAPPER TO DESGIN */}
        <h4
          className="text.small rounded align-middle ps-3 shadow-light"
          style={{
            backgroundColor: "#9ADE7B",

            alignContent: "center",
            height: "60px",
            width: "70%",
            // position: "absolute",
            // opacity: "20%",
          }}
        >
          Approved Bookings
        </h4>
        <div>
          <div className="accordion mt-5" id="accordionExample">
            {/* <div className="my-4">Headers</div> */}
            <div className="flex-grow-1 ps-3 d-flex">
              <div className="d-flex   flex-grow-1 ">
                <div className="w-50 ms-2 me-2 align-content-center fst-italic ">
                  Event Name
                </div>
                <div className="w-50 ms-2 me-2 align-content-center  fst-italic ">
                  Facility
                </div>
                <div className="w-75 ms-2 me-2 align-content-center fst-italic ">
                  Date
                </div>
                <div className="d-flex align-content-left  w-75">
                  <div className="w-100 align-content-center  fst-italic ">
                    Time
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="pe-4 justify-content-around  d-flex">
                  <IconTrash
                    onClick={console.log("it works")}
                    size={20}
                    className="me-3"
                  />
                  <IconEdit size={20} />
                </div>
              </div>
            </div>
            {currentItems.map((venue, index) => (
              <div key={venue.venue_id} className="accordion-item">
                <h2 className="accordion-header" id={`headingApproved${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseApproved${index}`}
                    aria-expanded="false"
                    aria-controls={`collapseApproved${index}`}
                  >
                    <div className="flex-grow-1  d-flex">
                      <div className="d-flex   flex-grow-1 ">
                        <div className="w-50 ms-2 me-2 align-content-center">
                          {venue.eventname}
                        </div>
                        <div className="w-50 ms-2 me-2 align-content-center">
                          {venue.event_facility}
                        </div>
                        <div className="w-75 ms-2 me-2 align-content-center">
                          {formatDate(venue.event_date)}
                        </div>
                        <div className="d-flex align-content-left  w-75">
                          <div className="w-100 align-content-center">
                            {formatTimeRange(
                              venue.starting_time,
                              venue.ending_time
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="pe-4 justify-content-around  d-flex"></div>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id={`collapseApproved${index}`} // Ensure unique IDs for approved bookings
                  className="accordion-collapse collapse"
                  aria-labelledby={`headingApproved${index}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="d-flex  justify-content-between px-5 ">
                    <div className="d-flex  text-center align-items-center justify-content-center">
                      <div className="me-2 fw-bold text-dark  text-opacity-25 ">
                        Booker:
                      </div>
                      <div className="accordion-body">{venue.username}</div>
                    </div>
                    <div className="d-flex  text-center align-items-center justify-content-center">
                      <div className="me-2 fw-bold text-dark  text-opacity-25 ">
                        Email:
                      </div>
                      <div className="accordion-body">{venue.email}</div>
                    </div>
                    <div className="d-flex  text-center align-items-center justify-content-center">
                      {" "}
                      <button
                        className="btn   me-2 text-dark fw-semibold"
                        style={{ backgroundColor: "#EEF296" }}
                        onClick={() => handlePending(venue.booking_id)}
                      >
                        Pending
                      </button>
                      <button
                        className="btn   me-2 text-dark fw-semibold"
                        style={{ backgroundColor: "#FF8F8F" }}
                        onClick={() => handleDeny(venue.booking_id)}
                      >
                        Deny
                      </button>
                    </div>
                    <div className="d-flex  text-center align-items-center justify-content-center">
                      {" "}
                      <IconTrash
                        onClick={() => handleDelete(venue.booking_id)}
                        size={22}
                        className="me-3"
                      />
                      <IconEdit size={22} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
    </div>
  );
}

export default BookingsApproved;
