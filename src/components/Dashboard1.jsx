import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {  IoBagOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  MdOutlineDashboardCustomize,
  MdOutlineInventory,
  MdOutlinePayments,
  MdClose,
} from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { LiaLinkSolid } from "react-icons/lia";
import { Link, Outlet } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Dropdown, DropdownMenu } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import {userContext} from  "./UserContext";

const Dashboard = () => {
  const { setIsAuthenticated,loggedInUser} = useContext(userContext);
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  let logoutTimer;
  // const user =location.state?.user || JSON.parse(localStorage.getItem("user"));
 
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Clear authentication state
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUser"); // Optionally remove user details
    setIsAuthenticated(false); // Set authentication state to false
    navigate("/"); // Redirect to login page
  };
  const resetInactivityTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    logoutTimer = setTimeout(() => {
      handleLogout(); // Log the user out after 15 minutes
    }, 900000); // 15 minutes in milliseconds
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);
    window.addEventListener("click", resetInactivityTimer);

    resetInactivityTimer(); // Start the inactivity timer

    return () => {
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
      window.removeEventListener("click", resetInactivityTimer);
      clearTimeout(logoutTimer); // Cleanup timer on component unmount
    };
  }, []);
  const userProfile = () => {
    navigate("userprofile");
  };
  const userList = () => {
    navigate("users");
  };
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div
        className={`sidebar ${showSidebar ? "show" : "hide"}`}
        style={{
          backgroundColor: "rgb(42, 156, 248)",
          width: showSidebar ? "200px" : "0",
          overflow: "hidden",
          transition: "width 0.3s ease",
          padding: showSidebar ? "10px" : "0",
          height: "100vh",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" ,padding: "10px 0px 0px 5px" }}>
          <h2
            className="fw-bold fst-italic text-white"
            style={{  }}
          >
            Shopy
          </h2>
          <Button
            variant="link"
            onClick={toggleSidebar}
            className="sidebar-close"
          >
            <MdClose />
          </Button>
        </div>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="home" className="mb-2 text-light">
            <MdOutlineDashboardCustomize /> Home
          </Nav.Link>
          <Nav.Link as={Link} to="product" className="mb-2 text-light">
            <IoBagOutline /> Product
          </Nav.Link>
          <Nav.Link href="#Inventory" className="mb-2 text-light">
            <MdOutlineInventory /> Inventory
          </Nav.Link>
          <Nav.Link onClick={userList} className="mb-2 text-light">
            <GoPeople /> Users
          </Nav.Link>
          <Nav.Link href="#Review" className="mb-2 text-light">
            <CiStar /> Review
          </Nav.Link>
          <Nav.Link href="#Payment" className="mb-2 text-light">
            <MdOutlinePayments /> Payment
          </Nav.Link>
          <Nav.Link href="#Integration" className="mb-2 text-light">
            <LiaLinkSolid /> Integration
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1 }}>
        <Navbar expand="lg" className="bg-light">
          <Button
            onClick={toggleSidebar}
            className="sidebar-open"
            style={{
              
              visibility: showSidebar ? "hidden" : "visible",
            }}
          >
            <RxHamburgerMenu size={20} />
          </Button>
          <Form.Control
            type="search"
            placeholder="Search"
            className="my-2"
            aria-label="Search"
            style={{ width: "300px" }}
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="notification-btn" href="#link">
                <IoIosNotifications size={25} />
              </Nav.Link>
              {/* <Button variant="outline-dark" onClick={handleLogout}>
                <IoLogOut size={25} />{" "}
              </Button> */}
            </Nav>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                id="dropdown-basic-button"
                className="dropdown-toggle">
                  <CgProfile size={25} />
                 <span>{loggedInUser?.firstName || "User"}</span>
              </Dropdown.Toggle>
              <DropdownMenu className="dropdown-menu">
                <Dropdown.Item onClick={userProfile} >Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <div ><Outlet /></div>
         {/* Child components will render here based on the route */}
      </div>
    </div>
  );
};

export default Dashboard;
