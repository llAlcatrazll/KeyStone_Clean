/*{ LEFT SIDE }*/
import UserProfile from "../../Components/UserPageComponents/UserProfile";
import UserDetails from "../../Components/UserPageComponents/UserDetails";
import UserNotes from "../../Components/UserPageComponents/UserNotes";
/*{ RIGHT SIDE }*/
import UserLog from "../../Components/UserPageComponents/UserLog";
import UserPendingBookings from "../../Components/UserPageComponents/UserPendingBookings";
function UserProfiles() {
  return (
    <div className="container-fluid h-100">
      <div className="row mh-100vh h-100">
        <div className="col-lg-4 bg-dark-subtle rounded p-2 h-100 d-flex flex-column">
          <div className="rcol-lg-5">
            <UserProfile />
          </div>
          <div className="flex-grow-1">
            <UserDetails />
          </div>
          <div className="flex-grow-1">
            <UserNotes />
          </div>
        </div>
        <div className="rounded ms-2 col bg-dark-subtle p-2 h-100 d-flex flex-column">
          <div className="flex-grow-1">
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
