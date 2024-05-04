import { useState } from "react";
import axios from "axios";
import ArchivedVenues from "../../Components/ArchivedVenues";
import ActiveVenues from "../../Components/ActiveVenues";
function Venues() {
  //
  const [values, setValues] = useState({
    venue_name: "",
  });
  function handleSubmit() {
    // function handleSubmit(e) {

    console.log(values);
    axios
      .post("http://localhost:5000/add_venue", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }
  return (
    <div>
      <h1>Venues</h1>
      <button className="bg-primary">Add Venue</button>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Add Venue</label>
          <input
            type="text"
            name="venue_name"
            onChange={(e) =>
              setValues({
                ...values,
                venue_name: e.target.value,
              })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="d-flex flex-row justify-content-around">
        {/* Left */}
        <ActiveVenues />
        {/* Right */}
        <ArchivedVenues />
      </div>
    </div>
  );
}

export default Venues;
