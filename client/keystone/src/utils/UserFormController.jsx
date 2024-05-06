import { useState } from "react";

import AddNewUser from "../Components/AdminComponents/AddNewUser";
function UserFormController() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <div>
      <button className="ms-3 mb-2" type="button" onClick={toggleForm}>
        {showForm ? "Hide" : "Show"} Add New User
      </button>
      {showForm && <AddNewUser />}
    </div>
  );
}

export default UserFormController;
