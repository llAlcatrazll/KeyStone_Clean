import UserAnalytics from "../../Components/UserAnalytics.jsx";
import AdminList from "../../Components/AdminList.jsx";
import RegisteredClubs from "../../Components/RegisteredClubs.jsx";
import RegisteredUsers from "../../Components/RegisteredUsers.jsx";
import axios from "axios";
// u need camel casing
function UserManagement() {
  const token = localStorage.getItem("token");
  // Optionally, retrieve other user data
  const userEmail = localStorage.getItem("userEmail");
  const userPassword = localStorage.getItem("userPassword");
  const handleAuth = () => {
    axios
      .get("http://localhost:5000/checkauth", {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>User Management</h1>
      <div>{token}</div>
      <div>{userEmail}</div>
      <div>{userPassword}</div>
      <button onClick={handleAuth} className="btn btn-primary ">
        CHeck Auth
      </button>
      <UserAnalytics />

      <hr />
      <AdminList />
      <hr />
      <RegisteredUsers />

      <hr />
      <RegisteredClubs />
    </div>
  );
}

export default UserManagement;
