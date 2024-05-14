// import { useState } from "react";
import "./landing.css";
import Logo from "../../assets/logo.png";
// import BookingsPage from "../SidebarPages/BookingsPage";

// import PFP from "../../assets/temp_profile.jpg";
import Sidebar from "../Sidebar/Sidebar";
// import { BrowserRouter as Router } from "react-router-dom";
function Landing() {
  // const [navWidth, setNavWidth] = useState("100px"); // Initial width of the sidebar

  // const toggleNav = () => {
  //   setNavWidth(navWidth === "100px" ? "300px" : "100px");
  // };

  return (
    <div
      className="d-flex flex-column align-items-start overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* TopNav */}
      <div
        className="d-flex flex-row align-items-center"
        style={{ backgroundColor: "#31374A", height: "70px", width: "100vw" }}
      >
        <div>
          <img
            src={Logo}
            alt=""
            style={{
              height: "120px",
              width: "170px",
            }}
          />
        </div>

        <div className="d-flex flex-row align-items-start overflow-hidden justify-content-between w-100 align-items-center ">
          <form className="w-25" onSubmit={(e) => e.preventDefault()}>
            <div className="d-flex flex-row align-items-start justify-content-start w-auto">
              <input
                className="form-control mr-sm-2 ms-5 me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 w-75"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
          {/* --this */}

          <div className="d-flex flex-row align-items-end mb-3 align-items-center justify-content-center  pt-3 pe-2">
            {/* <i className="bi bi-bell-fill"></i>
            <div>wew</div> */}
            {/* <div
              className="mt-auto p-2 align-self-end"
              style={{
                height: "65px",
                width: "65px",
                borderRadius: "100%", // Make the div circular
                display: "flex", // Use flexbox to center the image
                justifyContent: "center", // Center the image horizontally
                alignItems: "center", // Center the image vertically
              }}
            >
              <img
                src={PFP}
                alt=""
                style={{
                  height: "100%", // Make the image take up all the space inside the div
                  width: "120%",
                  borderRadius: "100%", // Ensure the image is also circular
                }}
              />
            </div> */}
          </div>
        </div>
      </div>

      {/*  */}
      <Sidebar />
    </div>
  );
}

export default Landing;
