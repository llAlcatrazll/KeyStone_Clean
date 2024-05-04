import PFP from "../../assets/temp_profile.jpg";
function UserProfile() {
  return (
    <div className="bg-white container-fluid p-1 ">
      <div className="bg-white d-flex flex-row ">
        <div
          className="col-lg-5 d-flex justify-content-evenly align-items-center rounded-circle"
          style={{ height: "180px", width: "180px" }}
        >
          <img
            src={PFP}
            className="rounded-circle"
            style={{ height: "180px", width: "180px" }}
            alt=""
          />
        </div>
        <div className="col d-flex align-items-center p-3 flex-row row justify-content-center">
          <div>
            <div className="fw-bold fs-3">Elijah Marquess</div>
            <div className="fst- fs-5 fw-medium">Admin</div>
            <div className="fst- fs-6">Joined Last Month</div>
            {/* Convert to Chips */}
            <div className="d-flex mb-3 ps-3">
              <div className="d-flex flex-row row text-center me-3">CCIS</div>
              <div className="">ACSS</div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="p-4 d-flex flex-row justify-content-between ">
        <div className="text-center justify-content-center  ">
          <div className="fw-bold fs-5">Following</div>
          <div className="fs-6">871</div>
        </div>

        <div className="text-center justify-content-center  ">
          <div className="fw-bold fs-5">Projects</div>
          <div className="fs-6">34</div>
        </div>
        <div className="text-center justify-content-center  ">
          <div className="fw-bold fs-5">Completed</div>
          <div className="fs-6">27</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
