import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FckingWork() {
  /*
HAVE THE ABILITY TO HIDE USER AND VENUE DATA TO FOCUS ON BOOKINGS

*/

  //
  //  STORE DATA FOR NEW VENUE
  const [values, setValues] = useState({
    venue_name: "",
  });
  //
  // ADD A NEW VENUE TO DATABASE
  //
  function handleSubmit() {
    // function handleSubmit(e) {
    // e.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:5000/add_venue", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }
  //
  // ADD NEW USER
  const [uservalues, setUserValues] = useState({
    email: "",
    password: "",
    username: "",
    college_affiliation: "",
    club: "",
    position: "",
    account_type: "",
  });
  function handleuserSubmit() {
    // function handleSubmit(e) {
    // e.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:5000/add_newuser", uservalues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }

  return (
    <>
      <div className="bg-slate-900 min-w-full ps-8 "></div>
      <div className="">
        <h1>Admin Panel</h1>
        <div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="bg-slate-950 ps-8 h-full ">
                <table>
                  <thead>
                    <tr className="w-52">Venue</tr>
                    <tr>
                      <th className="w-72">Venue ID</th>
                      <th className="w-72">Venue Name</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <div className="justify-center w-5/6 bg-slate-900 ps-8 ">
              <table>
                <thead>
                  <tr className="text-justify">Users</tr>
                  <tr>
                    <th className="w-36">User Id</th>
                    <th className="w-36">Username</th>
                    <th className="w-36">Email</th>
                    <th className="w-36">Club</th>
                    <th className="w-36">Account Type</th>
                    <th className="w-36">Position</th>
                    <th className="w-36">College Affiliation</th>
                  </tr>
                  <component />
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>

          <div className="w-full bg-indigo-900 h-96 ps-8 ">
            <div className="flex flex-row justify-center">
              <div className="w-96 bg-gray-900 rounded-md text-center">
                Pending
                <hr />
                <div></div>
              </div>
              <div className="w-96 bg-gray-900 rounded-md text-center ml-14 mr-14">
                Approved
                <hr />
                <div> </div>
              </div>
              <div className="w-96 bg-gray-900 rounded-md text-center">
                Denied
                <hr />
                <div> </div>
              </div>
            </div>
          </div>
          <Link to={`/`}>
            <button>Back</button>
          </Link>
          <div className="flex flex-row">
            <div className="bg-gray-500 w-96 p-10 pr-10">
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
            </div>
            {/* 
            // 
            // 
            // 
            //  */}
            <div className="ml-20 bg-slate-600 h-auto p-10 pt-10">
              <form action="" onSubmit={handleuserSubmit}>
                <div>
                  <label htmlFor="">email</label>
                  <input
                    className="mb-2 ml-2 rounded-sm bg-slate-700 "
                    type="text"
                    name="email"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">password</label>
                  <input
                    className="mb-2 ml-2 rounded-sm bg-slate-700 "
                    type="text"
                    name="password"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">username</label>
                  <input
                    className="mb-2 ml-2 rounded-sm bg-slate-700 "
                    type="text"
                    name="username"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">College Affiliation</label>
                  <input
                    className="mb-2 ml-2 rounded-sm bg-slate-700 "
                    type="text"
                    name="college_affiliation"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        college_affiliation: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Club</label>
                  <input
                    className="mb-2 ml-2 rounded-sm bg-slate-700 "
                    type="text"
                    name="club"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        club: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Position</label>
                  <input
                    className="mb-2 ml-2 rounded-sm bg-slate-700 "
                    type="text"
                    name="position"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        position: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="">Account Type</label>
                  <input
                    className="mb-2 ml-2 rounded-sm bg-slate-700 "
                    type="text"
                    name="account_type"
                    onChange={(e) =>
                      setUserValues({
                        ...uservalues,
                        account_type: e.target.value,
                      })
                    }
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FckingWork;
