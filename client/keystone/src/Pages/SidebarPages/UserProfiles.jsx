import { useEffect, useState } from "react";
import axios from "axios";
/* LEFT SIDE COMPONENTS */
import UserProfile from "../../Components/UserPageComponents/UserProfile";
import UserDetails from "../../Components/UserPageComponents/UserDetails";
import UserNotes from "../../Components/UserPageComponents/UserNotes";
/* RIGHT SIDE COMPONENTS */
import UserLog from "../../Components/UserPageComponents/UserLog";
import UserPendingBookings from "../../Components/UserPageComponents/UserPendingBookings";
import { UserLink } from "../../App";
function UserProfiles() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || ""); // Initialize with localStorage value
  localStorage.setItem("userEmail", email);

  const fetchUser = () => {
    axios
      .get(`${UserLink}/user_fetchall`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        {/* LEFT SIDE */}
        <div className="col-lg-4 bg-dark-subtle rounded p-2 h-100 d-flex flex-column">
          <select
            name=""
            className="rounded p-2 mb-2"
            id=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            {data.map((user) => (
              <option key={user.user_id} value={user.email}>
                {user.username}
              </option>
            ))}
          </select>
          <div>Email: {email}</div>
          <div className="flex-grow-1">
            <UserProfile />
          </div>
          <div className="flex-grow-1">
            <UserDetails />
          </div>
          <div className="flex-grow-1">
            <UserNotes />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col bg-dark-subtle rounded ms-2 p-2 h-100 d-flex flex-column">
          <div className="flex-grow-1 mb-2">
            <UserLog />
          </div>
          <div className="flex-grow-1">
            <UserPendingBookings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfiles;
