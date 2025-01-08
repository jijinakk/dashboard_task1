import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoLogOut,IoBagOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FaGripLines } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import { MdOutlineDashboardCustomize,MdOutlineInventory,MdOutlinePayments} from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { LiaLinkSolid } from "react-icons/lia";
import { Link, Outlet } from 'react-router-dom'; 
import { RxHamburgerMenu } from "react-icons/rx";

const Dashboard = ({setIsAuthenticated}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  let logoutTimer;

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication state
    localStorage.removeItem('user'); // Optionally remove user details
    setIsAuthenticated(false); // Set authentication state to false
    navigate('/'); // Redirect to login page
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
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keydown', resetInactivityTimer);
    window.addEventListener('click', resetInactivityTimer);

    resetInactivityTimer(); // Start the inactivity timer

    return () => {
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keydown', resetInactivityTimer);
      window.removeEventListener('click', resetInactivityTimer);
      clearTimeout(logoutTimer); // Cleanup timer on component unmount
    };
  }, []);
  return (
    <div style={{ display: "flex"}}>
      {/* Sidebar */}
      <div
        className={`sidebar bg-dark ${showSidebar ? "show" : "hide"}`}
        style={{
          width: showSidebar ? "280px" : "0",
          overflow: "hidden",
          transition: "width 0.3s ease",
          padding: showSidebar ? "10px" : "0",
          height: "125vh"
        }}
      >
        {/* sidebar */}
        <div style={{ color: "white", display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="link"
            onClick={toggleSidebar}
            style={{ color: "white", textDecoration: "none", fontSize: "30px",
              position: "relative", marginLeft: "220px"}}>
            &times;
          </Button>
        </div>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="home" className="mb-2 text-white">
            <MdOutlineDashboardCustomize /> Home
          </Nav.Link>
          <Nav.Link as={Link} to="product" className="mb-2 text-white">
            <IoBagOutline /> Product
          </Nav.Link>
          <Nav.Link href="#Inventory" className="mb-2 text-white">
            <MdOutlineInventory /> Inventory
          </Nav.Link>
          <Nav.Link href="#Customers" className="mb-2 text-white">
            <GoPeople /> Customers
          </Nav.Link>
          <Nav.Link href="#Review" className="mb-2 text-white">
            <CiStar /> Review
          </Nav.Link>
          <Nav.Link href="#Payment" className="mb-2 text-white">
            <MdOutlinePayments /> Payment
          </Nav.Link>
          <Nav.Link href="#Integration" className="mb-2 text-white">
            <LiaLinkSolid /> Integration
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, padding: "20px"}}>
        <Navbar expand="lg"  className="bg-transparent">
          <h2 style={{color:" #c475e6"}}>Shopy</h2>
          <Button
            onClick={toggleSidebar}
            style={{ background: "none", border: "none", color: "black" ,paddingLeft:"30px"}}
          >
            <RxHamburgerMenu size={20}/>
          </Button>
          <Form.Control
          type="search"
          placeholder="Search"
          className="my-2"
          aria-label="Search" 
           
        />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#link">
                <IoIosNotifications size={25} />
              </Nav.Link>
              <Button variant="outline-dark"  onClick={handleLogout}>
              <IoLogOut size={25} />  </Button>
              <Nav.Link href="#home">
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
         <Outlet /> {/* Child components will render here based on the route */}
      </div>
    </div>
  )
}
  

export default Dashboard

