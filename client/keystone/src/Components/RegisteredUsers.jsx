import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisteredUsers() {
  const [isApproved, setIsApproved] = useState([]);
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
  }, []);
  return (
    <div className="bg-info-subtle p-3">
      <h3>Admin List</h3>
      <div>
        {" "}
        {isApproved.map((admin) => (
          <tr key={admin.id}>
            <td className="w-28 text-xs ">{admin.position}</td>
            <td className="w-28 text-xs ">{admin.club}</td>
            <td className="w-28 text-xs ">{admin.username}</td>
            <td className="w-28 text-xs ">{admin.email}</td>
            <td className="w-28 text-xs ">
              <Link to={`/read/${admin.id}`}>Read</Link>
              <Link to={`/edit/${admin.id}`}>Edit</Link>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}
export default RegisteredUsers;
