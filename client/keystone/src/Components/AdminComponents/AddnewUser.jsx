import { useState } from "react";
import axios from "axios";

function AddNewUserForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
    college_affiliation: "",
    club: "",
    position: "",
    account_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values); // Add this line
    axios
      .post("http://localhost:5000/add_newuser", values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="college_affiliation"
          placeholder="College Affiliation"
          value={values.college_affiliation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="club"
          placeholder="Club"
          value={values.club}
          onChange={handleChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={values.position}
          onChange={handleChange}
        />
        <input
          type="text"
          name="account_type"
          placeholder="Account Type"
          value={values.account_type}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddNewUserForm;
