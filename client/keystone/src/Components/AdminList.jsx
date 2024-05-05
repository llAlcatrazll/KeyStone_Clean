import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminList() {
  const [isApproved, setIsApproved] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin_users")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsApproved(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-info-subtle p-3 justify-content-around ">
      <form className="d-flex flex-row">
        <h3>Admin List</h3>
        <button className="ms-3 mb-2">Add new Admin</button>
      </form>
      <div>
        {" "}
        {isApproved.map((admin) => (
          <tr
            className="justify-content-evenly align-content-center bg-body-tertiary d-flex w-100 flex-row"
            key={admin.id}
          >
            <div className=" h-auto  w-100 ms-2 me-2 align-content-center ">
              {admin.id}
            </div>
            <div className=" w-100 ms-2 me-2 align-content-center">
              {admin.email}
            </div>
            <div className=" w-100 ms-2 me-2 align-content-center">
              {admin.password}
            </div>
            <div className=" w-100 ms-2 me-2 align-content-center">
              {admin.username}
            </div>
            <div className=" w-100 ms-2 me-2 align-content-center">
              {admin.club}
            </div>
            {/*
            
            */}

            <div className="justify-content-around align-items-center bg-body-tertiary d-flex w-100 flex-row">
              <Link to={`/read/${admin.id}`}>Read</Link>
              <Link to={`/edit/${admin.id}`}>Edit</Link>
              <button>Delete</button>
            </div>
          </tr>
        ))}
      </div>
    </div>
  );
}
export default AdminList;
