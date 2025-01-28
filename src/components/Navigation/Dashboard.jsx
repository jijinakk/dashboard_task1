import React, { useContext,useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
import { userContext } from "../UserContext";
const DashboardNew = () => {
  const { showSidebar,setShowSidebar } = useContext(userContext);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1400) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setShowSidebar]);
  
  return (
    <Container fluid className="p-0">
      <Row className="g-0" style={{ minHeight:"100vh", overflow: "hidden" }}>
        {/* Sidebar */}
        {showSidebar && (
          <Col
            xl={2}
            className="bg-light sidebar"
          >
            <Sidebar />
          </Col>
        )}

        {/* Header and Main Content */}
        <Col
          style={{
            marginLeft: showSidebar ? "11%" : "0",
            transition: "margin-left 0.3s ease",
            width: "100%",
          }}
        >
          {/* Header */}
          <Row className="g-0">

            <Col xxl={12} md={12} style={{ zIndex: 1 }}>
            
              <Header  />
            </Col>
          </Row>

          {/* Main Content */}
          <Row className="g-0">
            <Col style={{ padding: "20px" }}>
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardNew;