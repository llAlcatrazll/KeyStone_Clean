import { useState } from "react";
import axios from "axios";
import ArchivedVenues from "../../Components/ArchivedVenues";
import ActiveVenues from "../../Components/ActiveVenues";
import { UserLink } from "../../App";
function Venues() {
  //
  const [values, setValues] = useState({
    venue_name: "",
  });
  function handleSubmit() {
    // function handleSubmit(e) {

    console.log(values);
    axios
      .post(`${UserLink}/add_venue`, values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }
  return (
    <div
      className="bg-dark-subtle p-1 flex-grow-1 rounded"
      style={{ height: "100%" }}
    >
      {/* <button className="bg-primary">Add Venue</button> */}
      <form
        className="d-flex flex-columnpy-3 m-2 rounded p-2"
        onSubmit={handleSubmit}
        style={{ backgroundColor: "#31375A" }}
      >
        {" "}
        <h2 className="text-white p-2 w-100 ">Venue Management Page</h2>
        {/* ADD VENUE START */}
        <div className=" d-flex justify-content-around p-3 w-100 ">
          <div className=" " style={{ width: "10%" }}></div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Add Venue</span>
            </div>
            <input
              type="text"
              placeholder="Venue Name"
              aria-label="First name"
              name="venue_name"
              className="form-control"
              onChange={(e) =>
                setValues({
                  ...values,
                  venue_name: e.target.value,
                })
              }
            />
          </div>
          <button type="submit" className="mx-3 w-25 btn btn-light">
            Submit
          </button>
          <div className=" " style={{ width: "20%" }}></div>
        </div>
        {/* ADD VENUE END */}
      </form>
      <div
        className="d-flex align-content-start pb-2"
        style={{ height: "89%" }}
      >
        {/* Left */}
        <ActiveVenues />
        {/* Right */}
        <ArchivedVenues />
      </div>
    </div>
  );
}

export default Venues;
