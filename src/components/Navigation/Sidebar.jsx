import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import { IoBagOutline } from "react-icons/io5";
import { AiOutlineAntDesign } from "react-icons/ai";
import {
  MdOutlineDashboardCustomize,
  MdOutlineInventory,
  MdOutlinePayments,
} from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { LiaLinkSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import { userContext } from "../UserContext";

const Sidebar = () => {
  const { showSidebar } = useContext(userContext);
  const navigate = useNavigate();
  const menuItems = [
    { to: "/home", icon: <MdOutlineDashboardCustomize />, label: "Home" },
    { to: "/users", icon: <GoPeople />, label: "Users" },
    { to: "/product", icon: <IoBagOutline />, label: "Product" },
    { to: "/inventory", icon: <MdOutlineInventory />, label: "Inventory" },
    { to: "/review", icon: <CiStar />, label: "Review" },
    { to: "/payment", icon: <MdOutlinePayments />, label: "Payment" },
    { to: "/integration", icon: <LiaLinkSolid />, label: "Integration" },
  ];

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
  };

  return (
    <div
      className={`sidebar ${showSidebar ? "show" : "hide"}`}
      style={{
        backgroundColor: "rgb(42, 156, 248)"
      }}
    >
      <div className="d-flex  align-items-center">
        <AiOutlineAntDesign className="logo" />
        <h2 className="fw-bold fst-italic text-white logo-text">Square</h2>
      </div>
      <Nav className="flex-column">
        {menuItems.map((item, index) => (
          <Nav.Link
            key={index}
            onClick={() => handleNavigation(item.to)}
            className="mb-2 text-light sidebar-icon"
          >
            {item.icon} <span className="sidebar-label">{item.label}</span>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
