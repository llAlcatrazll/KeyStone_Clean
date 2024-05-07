import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserFormController from "../utils/UserFormController";
function RegisteredUsers() {
  const [isApproved, setIsApproved] = useState([]);
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/registered_user")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsApproved(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [deleted]);
  function handleDelete(user_id) {
    axios
      .post(`http://localhost:5000/delete_user/${user_id}`)
      .then((res) => {
        console.log(res.data);
        // Toggle the 'deleted' state to trigger a re-fetch of the data
        setDeleted((prevDeleted) => !prevDeleted);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-info-subtle p-3">
      <div className="d-flex flex-row">
        <h3>Users List</h3>
        <UserFormController />
      </div>
      <div>
        {" "}
        {isApproved.map((user) => (
          <tr
            className="justify-content-evenly align-content-center bg-body-tertiary d-flex w-100 flex-row"
            key={user.user_id}
          >
            <div className=" h-auto  w-100 ms-2 me-2 align-content-center ">
              {user.user_id}
            </div>
            <div className=" w-100 ms-2 me-2 align-content-center">
              {user.position}
            </div>
            <div className=" w-100 ms-2 me-2 align-content-center">
              {user.club}
            </div>
            <div className=" w-100 ms-2 me-2 align-content-center">
              {user.username}
            </div>
            <div className=" w-100 ms-2 me-2 align-content-center">
              {user.email}
            </div>
            <div className="justify-content-around align-items-center bg-body-tertiary d-flex w-100 flex-row">
              <Link to={`/read/${user.user_id}`}>Read</Link>
              <Link to={`/edit/${user.user_id}`}>Edit</Link>
              <button onClick={() => handleDelete(user.user_id)}>Delete</button>
            </div>
          </tr>
        ))}
        {/* 
        position
         club 
         username 
         email */}
      </div>
    </div>
  );
}
export default RegisteredUsers;
