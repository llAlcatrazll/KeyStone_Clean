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
    <div className="p-3" style={{ backgroundColor: "#31375A" }}>
      <h3 className="text-white">Registered Clubs</h3>
      <div className="justify-content-evenly align-content-center  d-flex w-100 flex-row">
        {" "}
        {isApproved.map((club) => (
          <div key={club.id}>
            <div
              className="w-auto text-xs badge badge-pill bg-dark justfy-content-center text-center align-items-center pt-2"
              style={{ height: "28px" }}
            >
              {club.club}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RegisteredClubs;
