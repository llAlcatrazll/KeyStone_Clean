import { useEffect, useState } from "react";
import axios from "axios";

function UserAnalytics() {
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    axios
      .get("/all_admins")
      .then((response) => {
        setAdminCount(response.data.admin_count);
      })
      .catch((error) => {
        console.error("Error fetching admin count:", error);
        // Handle error, e.g., show error message to the user
      });
  }, []);

  return (
    <div>
      {/* <h3>User Analytics</h3> */}
      <div
        className="w-100 bg-white rounded shadow-lg   d-flex justify-content-evenly  "
        style={{ height: "100px" }}
      >
        <div className="flex-grow-1">
          <div
            className="d-flex justify-content-evenly rounded align-items-center text-white fw-semibold fs-4"
            style={{ backgroundColor: "#31375A", height: "50px" }}
          >
            {" "}
            <div>Registered Admin</div>
            <div>{adminCount}</div>
            <div className="vr"></div>
            <div>Registered Officers</div>
            <div className="vr"></div>
            <div>Registered Clubs</div>
            <div className="vr"></div>
            <div>Total Users</div>
          </div>
          <div className="d-flex justify-content-evenly rounded align-items-center  fw-semibold fs-4">
            <div>6</div>
            <div>{adminCount}</div>
            <div className="vr bg-white"></div>
            <div>12</div>
            <div className="vr bg-white"></div>
            <div>18</div>
            <div className="vr bg-white"></div>
            <div>36</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAnalytics;
