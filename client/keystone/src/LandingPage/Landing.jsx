import { useState } from "react";
import "./landing.css";
import Logo from "../assets/logo.png";
import BookingsPage from "../SidebarPages/BookingsPage";
// import PFP from "../assets/temp_profile.jpg";
function Landing() {
  const [navWidth, setNavWidth] = useState("100px"); // Initial width of the sidebar

  const toggleNav = () => {
    setNavWidth(navWidth === "100px" ? "300px" : "100px");
  };

  return (
    <div
      className="d-flex flex-column align-items-start overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* TopNav */}
      <div
        className="d-flex flex-row align-items-center"
        style={{ backgroundColor: "#31374A", height: "70px", width: "1920px" }}
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
          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center">
            {/* Icon */}
            <a className="text-reset me-3" href="#">
              <i className="fas fa-shopping-cart"></i>
            </a>

            {/* Notifications */}
            <div className="dropdown">
              <a
                data-mdb-dropdown-init
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                aria-expanded="false"
              >
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">
                  1
                </span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another news
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            {/* Avatar */}
            <div className="dropdown">
              <a
                data-mdb-dropdown-init
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                aria-expanded="false"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="25"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    My profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Right elements */}

          {/* <div className="d-flex flex-row align-items-end mb-3 align-items-center justify-content-center  pt-3 pe-2">
            <i className="bi bi-bell-fill"></i>
            <div>wew</div>
            <div
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
            </div>
          </div> */}
        </div>
      </div>

      {/*  */}
      {/* Sidebar and Content */}
      <div className="d-flex flex-row flex-grow-1 ">
        {/* Sidebar */}
        <div
          className="col-md-3 col-lg-2 d-flex flex-column align-items-start justify-content-start"
          onClick={toggleNav}
          style={{
            backgroundColor: "#31374A",
            minHeight: "100vh",
            width: navWidth,
          }}
        >
          <div className="text-light">Sidebar Content</div>
          {/* Conditional Content Based on Sidebar Width */}
          {navWidth === "100px" ? (
            <div className="text-light">Narrow Sidebar Content</div>
          ) : (
            <div className="text-light">Wide Sidebar Content</div>
          )}
        </div>
        {/* Main Content */}
        <div
          className="col-md-9 col-lg-10 d-flex flex-column align-items-start justify-content-start m-3"
          style={{
            backgroundColor: "#fff",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <div
            className="container-fluid"
            style={{
              width: "100%",
              height: "100%",
              padding: "20px",
              paddingRight: "100px",
            }}
          >
            <BookingsPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
