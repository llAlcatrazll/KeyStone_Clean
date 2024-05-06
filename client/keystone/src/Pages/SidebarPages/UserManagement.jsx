import UserAnalytics from "../../Components/UserAnalytics.jsx";
import AdminList from "../../Components/AdminList.jsx";
import RegisteredClubs from "../../Components/RegisteredClubs.jsx";
import RegisteredUsers from "../../Components/RegisteredUsers.jsx";
import AddNewUser from "../../Components/AdminComponents/AddNewUser.jsx";
// u need camel casing
function UserManagement() {
  return (
    <div>
      <h1>User Management</h1>
      <UserAnalytics />
      <AddNewUser />
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
