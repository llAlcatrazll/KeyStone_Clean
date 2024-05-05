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
      <h3>User Analytics</h3>
      <div
        className="w-100 bg-info-subtle  d-flex justify-content-evenly align-items-center "
        style={{ height: "200px" }}
      >
        <div>registered admins</div>
        <div>{adminCount}</div>
        <div className="vr"></div>
        <div>registered users</div>
        <div className="vr"></div>
        <div>registered clubs</div>
        <div className="vr"></div>
        <div>total users</div>
      </div>
    </div>
  );
}

export default UserAnalytics;
