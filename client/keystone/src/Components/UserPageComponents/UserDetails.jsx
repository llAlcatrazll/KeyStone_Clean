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
    <div className="container mt-1">
      {userDetails.map((User) => (
        <div key={User.user_id} className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-center mb-2 ">
              <div>
                {" "}
                <h5 className="card-subtitle me-3 mb-2">Email </h5>
              </div>
              <div className="card-text pb-2">{User.email}</div>
            </div>
            <div className="mb-3 d-flex flex-grow-1 justify-content-around  ">
              <div className="d-flex">
                <h5 className="card-subtitle mb-2 me-3">User ID</h5>
                <div className="card-text">{User.user_id}</div>
              </div>
              <div className="d-flex">
                <h5 className="card-subtitle mb-2 me-3 align-content-center  justify-content-center text-center ">
                  Password
                </h5>
                <div className="card-text">{User.password}</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDetails;
