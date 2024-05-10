import PFP from "../../assets/temp_profile.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const [userDetails, setUserDetails] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    // Fetch user data based on userEmail
    axios
      .get(`http://localhost:5000/user_fetchall?email=${userEmail}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUserDetails(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [userEmail]); // Add userEmail as a dependency to useEffect so it re-runs when userEmail changes

  return (
    <div className="bg-white container-fluid p-1 ">
      <div className="bg-white d-flex flex-row ">
        {userDetails.map((User) => (
          <div
            key={User.user_id}
            className="flex-grow-1 bg-danger-subtle align-contents-center justify-content-center"
          >
            <div
              className="col-lg-5 d-flex justify-content-evenly align-items-center rounded-circle"
              style={{ height: "180px", width: "180px" }}
            >
              <img
                src={PFP}
                className="rounded-circle"
                style={{ height: "180px", width: "180px" }}
                alt=""
              />
            </div>
            <div className="col d-flex align-items-center p-3 flex-row row justify-content-center">
              <div>
                <div className="fw-bold fs-3">{User.username}</div>
                <div className="fst- fs-5 fw-medium">{User.account_type}</div>
                <div className="fst- fs-6">{User.position}</div>
                {/* Convert to Chips */}
                <div className="d-flex mb-3 ps-3">
                  <div className="d-flex flex-row row text-center me-3">
                    {User.club}
                  </div>
                  <div className="">{User.college_affiliation}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
      <div className="p-4 d-flex flex-row justify-content-between ">
        <div className="text-center justify-content-center  ">
          <div className="fw-bold fs-5">Following</div>
          <div className="fs-6">871</div>
        </div>

        <div className="text-center justify-content-center  ">
          <div className="fw-bold fs-5">Projects</div>
          <div className="fs-6">34</div>
        </div>
        <div className="text-center justify-content-center  ">
          <div className="fw-bold fs-5">Completed</div>
          <div className="fs-6">27</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
