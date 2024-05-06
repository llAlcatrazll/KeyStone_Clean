import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import UserManagement from "../SidebarPages/UserManagement";
import BookingAnalytics from "../SidebarPages/BookingAnalytics";
import Venues from "../SidebarPages/Venues";
import UserProfiles from "../SidebarPages/UserProfiles";
import useToggle from "./usetoggle";
import CreateBooking from "../SidebarPages/CreateBooking";
import BookingsPage from "../SidebarPages/BookingsPage";
import AllBookings from "../SidebarPages/AllBookings";

import "./customschollbar.css";
const Sidebar = () => {
  const [activePage, setActivePage] = useToggle("usermanagement");
  // Toggle Active Page
  return (
    <>
      {/* Main Wrapper */}
      <div
        className="d-flex flex-row justify-content-between "
        style={{ width: "100vw" }}
      >
        <div
          style={{
            display: "flex",
            height: "92.6vh",
            overflow: "scroll initial",
          }}
        >
          {/* Sidebar Start */}
          <CDBSidebar textColor="#fff" backgroundColor="#31374A ">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a
                href="/"
                className="text-decoration-none"
                style={{ color: "inherit" }}
              >
                Sidebar
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink
                  activeClassName="activeClicked"
                  onClick={() => setActivePage("createbooking")}
                >
                  <CDBSidebarMenuItem icon="columns">
                    Create Booking
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  onClick={() => setActivePage("bookingspage")}
                >
                  <CDBSidebarMenuItem icon="table">Bookings</CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  onClick={() => setActivePage("allbookings")}
                >
                  <CDBSidebarMenuItem icon="table">
                    All Bookings
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  onClick={() => setActivePage("userprofiles")}
                >
                  <CDBSidebarMenuItem icon="user">
                    User Profile
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  activeClassName="activeClicked"
                  onClick={() => setActivePage("usermanagement")}
                >
                  <CDBSidebarMenuItem icon="user">
                    Manage Users
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  activeClassName="activeClicked"
                  onClick={() => setActivePage("bookinganalytics")}
                >
                  <CDBSidebarMenuItem icon="user">
                    Booking Analytics
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  onClick={() => setActivePage("venues")}
                >
                  <CDBSidebarMenuItem icon="chart-line">
                    Manage Venues
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  activeClassName="activeClicked"
                  onClick={() => setActivePage("venues")}
                >
                  <CDBSidebarMenuItem icon="chart-line">
                    Archive
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  onClick={() => setActivePage("")}
                  target="_blank"
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="exclamation-circle">
                    404 page
                  </CDBSidebarMenuItem>
                </NavLink>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: "center" }}>
              <div
                style={{
                  padding: "20px 5px",
                }}
              >
                <button>Log Out</button>
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
        {/* Sidebar End */}
        {/* Content Start */}
        <div
          style={{
            width: "100%",
            height: "92.6vh",
            padding: "20px",
            overflowY: "scroll",
          }}
          className="custom-scrollbar"
        >
          {activePage === "usermanagement" && <UserManagement />}
          {activePage === "bookinganalytics" && <BookingAnalytics />}
          {activePage === "venues" && <Venues />}
          {activePage === "userprofiles" && <UserProfiles />}
          {activePage === "createbooking" && <CreateBooking />}
          {activePage === "bookingspage" && <BookingsPage />}
          {activePage === "allbookings" && <AllBookings />}
        </div>
        {/* Content End */}
      </div>
      {/* Main Wrapper End */}
    </>
  );
};

export default Sidebar;
