import { useState } from "react";

import axios from "axios";

function AddnewUser() {
  const [uservalues, setUserValues] = useState({
    email: "",
    password: "",
    username: "",
    college_affiliation: "",
    club: "",
    position: "",
    account_type: "",
  });
  function handleUserSubmit(e) {
    // function handleSubmit(e) {
    e.preventDefault();
    console.log(uservalues);
    axios
      .post("http://localhost:5000/add_newuser", uservalues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    //   post to database
  }

  return (
    <div>
      <form action="" onSubmit={handleUserSubmit}>
        <h2>Add new User</h2>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) =>
            setUserValues({
              ...uservalues,
              email: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) =>
            setUserValues({
              ...uservalues,
              password: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="UserName"
          onChange={(e) =>
            setUserValues({
              ...uservalues,
              username: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="College Affiliation"
          onChange={(e) =>
            setUserValues({
              ...uservalues,
              college_affiliation: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Club"
          onChange={(e) =>
            setUserValues({
              ...uservalues,
              club: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Position"
          onChange={(e) =>
            setUserValues({
              ...uservalues,
              position: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Account Type"
          value={"Officer"}
          onChange={(e) =>
            setUserValues({
              ...uservalues,
              account_type: e.target.value,
            })
          }
        />
        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}

export default AddnewUser;
