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
import {userContext} from  "../UserContext";

const Sidebar = () => {
    const { setIsAuthenticated,loggedInUser,showSidebar,setShowSidebar} = useContext(userContext);
          const navigate = useNavigate();
          const toggleSidebar = () => setShowSidebar(!showSidebar);
          let logoutTimer;
          const userList = () => {
            navigate("/users");
          };
  return (
    <div>
      
      <div
        className={`sidebar ${showSidebar ? "show" : "hide"}`}
        style={{
          backgroundColor: "rgb(42, 156, 248)",
          width: showSidebar ? "250px" : "0",
          overflow: "hidden",
          transition: "width 0.3s ease",
          padding: showSidebar ? "10px" : "0",
          height: "100vh",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" ,padding: "10px 0px 0px 5px" }}>
          <h2
            className="fw-bold fst-italic text-white"
           
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
          <Nav.Link as={Link} to="/home" className="mb-2 text-light">
            <MdOutlineDashboardCustomize /> Home
          </Nav.Link>
          <Nav.Link as={Link} to="/product" className="mb-2 text-light">
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

    </div>
  )
}

export default Sidebar
