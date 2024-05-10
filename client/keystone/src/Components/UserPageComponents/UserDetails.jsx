import { useEffect, useState } from "react";
import axios from "axios";

function UserDetails() {
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
  }, [userEmail]);
  return (
    <div>
      {" "}
      {userDetails.map((User) => (
        <div key={User.user_id} className="bg-white mt-2 h-90 p-3">
          <h2>User Details</h2>
          <div className="d-flex flex-row row mb-3">
            <h5>Email</h5>
            <div>{User.email}</div>
          </div>
          <div className="d-flex flex-row row mb-3">
            <h5>Phone</h5>
            <div>{User.user_id}</div>
          </div>
          <div className="d-flex flex-row row ">
            <h5>Password</h5>
            <div>{User.password}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDetails;
