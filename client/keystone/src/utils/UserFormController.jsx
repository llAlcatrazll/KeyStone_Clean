import { useState } from "react";
import AddnewUser from "../Components/AdminComponents/AddnewUser";
function UserFormController() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <button className="ms-3 mb-2" type="button" onClick={toggleForm}>
          {showForm ? "Hide" : "Show"} Add New User
        </button>
        {showForm && <AddnewUser />}
      </form>
    </div>
  );
}

export default UserFormController;
