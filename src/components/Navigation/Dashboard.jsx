import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";
import { userContext } from "../UserContext";
const DashboardNew = () => {
  const { showSidebar } = useContext(userContext);

  return (
    <Container fluid className="p-0">
      <Row className="g-0" style={{ height: "100vh", overflow: "hidden" }}>
        
        {/* Sidebar */}
        {showSidebar && (
          <Col
            xs={2}  md={4} lg={3} xl={2} xxl={1}
            className="bg-light sidebar "
           
          >
            <Sidebar />
          </Col>
        )}

        {/* Header and Main Content */}
        <Col
         xs = {showSidebar? 12: 12} md={showSidebar ? 6: 12}  xl={showSidebar ? 8 : 12}  xxl={showSidebar?10:12}
          style={{
            marginLeft: showSidebar ? "10.7%" : "0",
            transition: "margin-left 0.3s ease",
            position:"fixed",width:"90%"
          }}
        >
          {/* Header */}
          <Row className="g-0">
            <Col style={{zIndex: 1}}>
              <Header />
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