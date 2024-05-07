import { useState } from "react";
import axios from "axios";
// import AddNewUser from "../Components/AdminComponents/AddNewUser";
function UserFormControllerAdmin() {
  const [showForm, setShowForm] = useState(false);
  const [uservalues, setUserValues] = useState({
    email: "",
    password: "",
    username: "",
    college_affiliation: "",
    club: "",
    position: "",
    account_type: "Admin",
  });
  function handleuserSubmit() {
    // function handleSubmit(e) {
    // e.preventDefault();
    console.log(uservalues);
    axios
      .post("http://localhost:5000/add_newuser", uservalues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }
  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <div>
      <button className="ms-3 mb-2" type="button" onClick={toggleForm}>
        {showForm ? "Hide" : "Show"} Add New User
      </button>
      {showForm && (
        <div>
          <div className="flex flex-row">
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

                <button type="submit">Submit</button>
              </form>
              <hr />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserFormControllerAdmin;
