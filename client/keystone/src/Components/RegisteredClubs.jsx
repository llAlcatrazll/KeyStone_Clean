import { useEffect, useState } from "react";
import axios from "axios";
import { UserLink } from "../App";
function RegisteredClubs() {
  const [isApproved, setIsApproved] = useState([]);
  useEffect(() => {
    axios
      .get(`${UserLink}/all_clubs`)
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
      <div className="justify-content-evenly align-content-center bg-body-tertiary d-flex w-100 flex-row">
        {" "}
        {isApproved.map((club) => (
          <div key={club.id}>
            <div className="w-auto text-xs badge badge-pill bg-dark-subtle">
              {club.club}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RegisteredClubs;
