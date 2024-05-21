import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
// import UserFormController from "../utils/UserFormController";
import { Avatar } from "@mantine/core";
import { UserLink } from "../App";
function RegisteredUsers() {
  const [isApproved, setIsApproved] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Logic to slice data based on current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isApproved.slice(indexOfFirstItem, indexOfLastItem);
  const user_picture_base_url =
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/";
  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    axios
      .get(`${UserLink}/registered_user`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsApproved(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  function handleDelete(user_id) {
    axios
      .post(`${UserLink}/delete_user/${user_id}`)
      .then((res) => {
        console.log(res.data);
        // Toggle the 'deleted' state to trigger a re-fetch of the data
        // setDeleted((prevDeleted) => !prevDeleted);
        window.location.reload();
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
          className="text.small rounded align-middle ps-3 shadow-light text-white"
          style={{
            backgroundColor: "#31375A",

            alignContent: "center",
            height: "60px",
            width: "70%",
            // position: "absolute",
            // opacity: "20%",
          }}
        >
          Officer Users
        </h4>
        <div>
          <div className="accordion mt-5" id="accordionExample">
            {/* <div className="my-4">Headers</div> */}
            <div className="flex-grow-1 ps-3 d-flex">
              <div className="d-flex   flex-grow-1 ">
                <div className="w-auto ms-2 me-3 align-content-center fst-italic fw-bold">
                  UserID
                </div>
                <div className="w-50 ms-5 me-2 align-content-center  fst-italic fw-bold">
                  Profile
                </div>
                <div className="w-75 ms-2 me-2 align-content-center fst-italic fw-bold">
                  UserName
                </div>
                <div className="w-75 ms-2 me-2 align-content-center fst-italic fw-bold">
                  Email
                </div>
                <div className="w-75 ms-5 me-2 align-content-center fst-italic fw-bold">
                  College
                </div>
                <div className="w-75 ms-3  align-content-center fst-italic fw-bold">
                  Club
                </div>
              </div>
              <div className="d-flex">
                <div className="pe-4 justify-content-around  d-flex">
                  {/* <IconTrash
                    onClick={console.log("it works")}
                    size={20}
                    className="me-3"
                  />
                  <IconEdit size={20} /> */}
                </div>
              </div>
            </div>
            {/* <div className="d-flex   flex-grow-1 ms-4">
              <div className="w-25 ms-2 me-2 align-content-center">User</div>
              <div className="w-25 ms-2 me-2 align-content-center">wew</div>
              <div className="w-50 ms-2 me-2 align-content-center">wew</div>
              <div className="w-75 ms-2 me-2 align-content-center">wew</div>
              <div className="w-50 ms-2 me-2 align-content-center">wew</div>
              <div className="w-50 ms-2 me-2 align-content-center">wew</div>
            </div> */}
            {currentItems.map((venue, index) => (
              <div key={venue.venue_id} className="accordion-item">
                <h2 className="accordion-header" id={`headingApproved${index}`}>
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapsedUsers${index}`}
                    aria-expanded="false"
                    aria-controls={`collapsedUsers${index}`}
                  >
                    <div className="flex-grow-1  d-flex">
                      <div className="d-flex   flex-grow-1 ">
                        <div className=" ms-2 me-2 align-content-center">
                          {venue.user_id}
                        </div>
                        <div className="w-25 ms-3 me-5 align-content-center">
                          <Avatar
                            src={user_picture_base_url + venue.user_profile_pic}
                            size={35}
                            radius={35}
                            mx="auto"
                          />
                        </div>
                        <div className="w-50 ms-4 me-2 align-content-center">
                          {venue.username}
                        </div>
                        <div className="w-75 ms-2 me-2 align-content-center">
                          {venue.email}
                        </div>
                        <div className="w-50 ms-2 me-2 align-content-center">
                          {venue.college_affiliation}
                        </div>
                        <div className="w-50 ms-2 me-2 align-content-center">
                          {venue.club}
                        </div>
                      </div>
                    </div>
                  </button>
                </h2>
                <div
                  id={`collapsedUsers${index}`} // Ensure unique IDs for approved bookings
                  className="accordion-collapse collapse"
                  aria-labelledby={`headingApproved${index}`}
                  data-bs-parent="#accordionExample"
                >
                  <div className="d-flex  justify-content-between px-5 ">
                    <div className="d-flex  text-center align-items-center justify-content-center">
                      <div className="me-2 fw-bold text-dark  text-opacity-25 ">
                        Password:
                      </div>
                      <div className="accordion-body">{venue.password}</div>
                    </div>
                    <div className="d-flex  text-center align-items-center justify-content-center">
                      <div className="me-2 fw-bold text-dark  text-opacity-25 ">
                        Position:
                      </div>
                      <div className="accordion-body">{venue.position}</div>
                    </div>
                    <div className="d-flex  text-center align-items-center justify-content-center">
                      <div className="me-2 fw-bold text-dark  text-opacity-25 ">
                        Account Type:
                      </div>
                      <div className="accordion-body">{venue.account_type}</div>
                    </div>

                    <div className="d-flex  text-center align-items-center justify-content-center">
                      {" "}
                      <button
                        className="btn   me-2 text-dark fw-semibold"
                        style={{ backgroundColor: "#FF8F8F" }}
                        onClick={() => handleDelete(venue.user_id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="d-flex  text-center align-items-center justify-content-center">
                      {" "}
                      {/* <IconTrash
                        // onClick={() => handleDelete(venue.booking_id)}
                        size={22}
                        className="me-3"
                      />
                      <IconEdit size={22} /> */}
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
                { length: Math.ceil(isApproved.length / itemsPerPage) },
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
export default RegisteredUsers;
