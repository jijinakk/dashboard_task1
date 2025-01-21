import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoIosNotifications } from "react-icons/io";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2"
import { RxHamburgerMenu } from "react-icons/rx";
import { Dropdown, DropdownMenu } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { userContext } from "../UserContext";

const Header = () => {
  const { setIsAuthenticated, loggedInUser, showSidebar, setShowSidebar } =
    useContext(userContext);
  const navigate = useNavigate();
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  let logoutTimer;
  // const user =location.state?.user || JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Clear authentication state
    localStorage.removeItem("user");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token"); // Optionally remove user details
    setIsAuthenticated(false); // Set authentication state to false
    navigate("/login"); // Redirect to login page
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
 
  return (
    
   
        <Navbar expand="lg" className="bg-light">
          <Button
            onClick={toggleSidebar}
            className="hamburger-btn"
            
          >
{showSidebar ? (
    <HiOutlineBars3BottomLeft size={25} />
  ) : (
    <RxHamburgerMenu size={25} />
  )}          </Button>
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
                  className="dropdown-toggle"
                >
                  <CgProfile size={30} />
                  <span>{loggedInUser?.name || "User"}</span>
                </Dropdown.Toggle>
                <DropdownMenu className="dropdown-menu">
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Navbar>
    
  );
};

export default Header;
