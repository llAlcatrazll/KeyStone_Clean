import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisteredClubs() {
  const [isApproved, setIsApproved] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/all_clubs")
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
      <h3>Registered Clubs</h3>
      <div>
        {" "}
        {isApproved.map((club) => (
          <tr key={club.id}>
            <td className="w-28 text-xs ">{club.club}</td>
            <td className="w-28 text-xs ">
              <Link to={`/edit/${club.id}`}>Edit</Link>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}
export default RegisteredClubs;
