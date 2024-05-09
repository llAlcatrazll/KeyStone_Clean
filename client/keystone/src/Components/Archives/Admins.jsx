import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

function Admins() {
  const [isPending, setIsPending] = useState([]);
  const [restore, setRestored] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/deleted_admins")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setIsPending(res.data);
        } else {
          console.error("Expected an array but received:", res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [restore]);
  function handleRestore(user_id) {
    axios
      .post(`http://localhost:5000/restore_user/${user_id}`)
      .then((res) => {
        console.log(res.data);
        // Toggle the 'deleted' state to trigger a re-fetch of the data
        setRestored((prevRestored) => !prevRestored);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bg-info-subtle p-3">
      <h5>Archived Admins</h5>
      <div>
        {isPending.map((admin) => (
          <tr key={admin.admin_id}>
            <td className="w-28 text-xs ">{admin.username}</td>
            <td className="w-28 text-xs ">{admin.club}</td>
            <td className="w-28 text-xs ">{admin.position}</td>

            <td className="w-28 text-xs ">
              <button onClick={() => handleRestore(admin.user_id)}>
                Restore
              </button>

              <button>Drop</button>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
}
export default Admins;