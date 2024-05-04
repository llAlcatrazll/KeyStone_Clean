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

const Sidebar = () => {
  return (
    <>
      {/* Main Wrapper */}
      <div
        className="d-flex flex-row justify-content-between "
        style={{ width: "100vw", backgroundColor: "green" }}
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
                Sidebar Footer
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
        {/* Sidebar End */}
        {/* Content Start */}
        <div
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: "orange",
            padding: "20px",
          }}
          className=""
        >
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
          <button>test</button>
        </div>
        {/* Content End */}
      </div>
      {/* Main Wrapper End */}
    </>
  );
};

export default Sidebar;
