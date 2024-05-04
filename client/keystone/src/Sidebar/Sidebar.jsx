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
import BookingsAnalytics from "../SidebarPages/BookingsAnalytics";
import useToggle from "./usetoggle";
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
                <NavLink exact to="/" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="columns">
                    Dashboard
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/tables" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="table">Tables</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/profile" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="user">
                    Profile page
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                  exact
                  activeClassName="activeClicked"
                  onClick={() => setActivePage("usermanagement")}
                >
                  <CDBSidebarMenuItem icon="user">
                    User Management
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
                <NavLink exact to="/analytics" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="chart-line">
                    Analytics
                  </CDBSidebarMenuItem>
                </NavLink>

                <NavLink
                  exact
                  to="/hero404"
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
          className=""
        >
          {activePage === "usermanagement" && <UserManagement />}
          {activePage === "bookinganalytics" && <BookingsAnalytics />}
          {/*          
          <UserManagement />
          wew
          <BookingsAnalytics /> */}
        </div>
        {/* Content End */}
      </div>
      {/* Main Wrapper End */}
    </>
  );
};

export default Sidebar;
