// import PFP from "../../assets/temp_profile.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "@mantine/core";
import "../../Transition.css";
function UserProfile() {
  const [userDetails, setUserDetails] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const user_picture_base_url =
    "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/";

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
    <div className="container-fluid p-1 bg-red">
      <div className="container p-2">
        <div className="bg-white rounded-4 shadow-custom shadow p-2 mb-1 bg-body rounded d-flex flex-row flex-wrap">
          {userDetails.map((User) => (
            <div
              key={User.user_id}
              className="flex-grow-1 p-3 m-2 rounded bg-light align-content-center justify-content-center"
            >
              <div className="col d-flex align-items-center p-3 flex-column text-center">
                <Avatar
                  src={user_picture_base_url + User.user_profile_pic}
                  size={200}
                  radius={200}
                  mx="auto"
                />
                <div className="fw-bold fs-3 mt-3">{User.username}</div>
                <div className="fst-italic fs-5 fw-medium">
                  {User.account_type}
                </div>
                <div className="fst-italic fs-6">{User.position}</div>
                <div className="d-flex mb-3 ps-3 justify-content-center">
                  <div className="d-flex flex-row text-center me-3">
                    {User.club}
                  </div>
                  <div>{User.college_affiliation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <hr /> */}
      <div className="rounded p-4 d-flex flex-row justify-content-between bg-white rounded shadow-inner">
        <div className="text-center justify-content-center">
          <div className="fw-bold fs-5">Following</div>
          <div className="fs-6">871</div>
        </div>
        <div className="text-center justify-content-center">
          <div className="fw-bold fs-5">Projects</div>
          <div className="fs-6">34</div>
        </div>
        <div className="text-center justify-content-center">
          <div className="fw-bold fs-5">Completed</div>
          <div className="fs-6">27</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
