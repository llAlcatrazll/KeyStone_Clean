import { useEffect, useState } from "react";
import axios from "axios";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import "../../src/Transition.css";
function BookingsPending() {
  const [isPending, setIsPending] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleted, setDeleted] = useState(true);
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
    const hour12 = hourInt % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  }

  function formatTimeRange(startTime, endTime) {
    const start = convertTime24to12(startTime);
    const end = convertTime24to12(endTime);
    return `${start} - ${end}`;
  }

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
  }, [deleted]);

  function handleDelete(booking_id) {
    axios
      .post(`http://localhost:5000/delete_booking/${booking_id}`)
      .then((res) => {
        console.log(res.data);
        setDeleted((prevDeleted) => !prevDeleted);
      })
      .catch((err) => console.log(err));
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isPending.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white rounded">
      <hr className="bg-white opacity-0" />
      <div className="white border-light shadow-lg border-top-0 border rounded-2  p-3">
        <h4
          className="text.small rounded align-middle ps-3 shadow-light"
          style={{
            backgroundColor: "#EEF296",
            alignContent: "center",
            height: "60px",
            width: "70%",
          }}
        >
          Pending Bookings
        </h4>
        <div>
          <div className="accordion mt-5" id="accordionPending">
            <div className="flex-grow-1 ps-3 d-flex">
              <div className="d-flex flex-grow-1">
                <div className="w-50 ms-2 me-2 align-content-center fst-italic">
                  Event Name
                </div>
                <div className="w-50 ms-2 me-2 align-content-center fst-italic">
                  Facility
                </div>
                <div className="w-75 ms-2 me-2 align-content-center fst-italic">
                  Date
                </div>
                <div className="d-flex align-content-left w-75">
                  <div className="w-100 align-content-center fst-italic">
                    Time
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="pe-4 justify-content-around d-flex">
                  <IconTrash size={20} className="me-3" />
                  <IconEdit size={20} />
                </div>
              </div>
            </div>
            {currentItems.map((venue, index) => (
              <div key={venue.venue_id} className="accordion-item">
                <h2 className="accordion-header" id={`headingPending${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapsePending${index}`}
                    aria-expanded="false"
                    aria-controls={`collapsePending${index}`}
                  >
                    <div className="flex-grow-1 d-flex">
                      <div className="d-flex flex-grow-1">
                        <div className="w-50 ms-2 me-2 align-content-center">
                          {venue.eventname}
                        </div>
                        <div className="w-50 ms-2 me-2 align-content-center">
                          {venue.event_facility}
                        </div>
                        <div className="w-75 ms-2 me-2 align-content-center">
                          {formatDate(venue.event_date)}
                        </div>
                        <div className="d-flex align-content-left w-75">
                          <div className="w-100 align-content-center">
                            {formatTimeRange(
                              venue.starting_time,
                              venue.ending_time
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="pe-4 justify-content-around d-flex"></div>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id={`collapsePending${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`headingPending${index}`}
                  data-bs-parent="#accordionPending"
                >
                  <div className="d-flex justify-content-between px-5">
                    <div className="d-flex text-center align-items-center justify-content-center">
                      <div className="me-2 fw-bold text-dark text-opacity-25">
                        Booker:
                      </div>
                      <div className="accordion-body">{venue.username}</div>
                    </div>
                    <div className="d-flex text-center align-items-center justify-content-center">
                      <div className="me-2 fw-bold text-dark text-opacity-25">
                        Email:
                      </div>
                      <div className="accordion-body">{venue.email}</div>
                    </div>
                    <div className="d-flex text-center align-items-center justify-content-center">
                      <button
                        className="btn btn-dark color-black me-2"
                        style={{ backgroundColor: "#EEF296" }}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-dark"
                        style={{ backgroundColor: "#FF8F8F" }}
                      >
                        Deny
                      </button>
                    </div>
                    <div className="d-flex text-center align-items-center justify-content-center">
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

export default BookingsPending;
