function CreateBookings() {
  return (
    <div>
      <h2>Create Bookings</h2>
      <div className="flex-row d-flex justify-content-start bg-dark-subtle w-100 mb-3 p-2 h-100vh">
        <div className="bg-danger-subtle me-3">User Profiles</div>
        <form action="" onSubmit={""}>
          <div className="bg-danger-subtle container-fluid flex-grow-1 w-100vw">
            <div className="flex-row d-flex justify-content-around bg-dark-subtle w-100 mb-3 p-2">
              <h2>date</h2>
              <h2>Time in</h2>
              <h2>Time out</h2>
            </div>
            <div className=" d-flex justify-content-around bg-secondary-subtle -subtle w-100 ">
              <h2>Event Name</h2>
            </div>
            <div className=" d-flex justify-content-around bg-secondary-subtle -subtle w-100 ">
              <h2>Event Facility</h2>
            </div>
            <div className="mt-2 d-flex justify-content-around bg-dark-subtle -subtle w-100 ">
              <h2>Select User</h2>
              <div>autofil</div>
              <div>username</div>
              <div>designation</div>
              <div>college affiliation</div>
              <div>club</div>
            </div>
            <div className="d-flex justify-content-center ">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBookings;
