import UserAnalytics from "../Components/UserAnalytics.jsx";
import AdminList from "../Components/AdminList.jsx";
import RegisteredClubs from "../Components/RegisteredClubs.jsx";
import RegisteredUsers from "../Components/RegisteredUsers.jsx";
// u need camel casing
function UserManagement() {
  return (
    <div>
      <h1>User Management</h1>
      <UserAnalytics />

      <hr />
      <AdminList />
      <hr />
      <RegisteredClubs />
      <hr />
      <RegisteredUsers />
    </div>
  );
}

export default UserManagement;
