import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Outlet } from 'react-router-dom';
import { userContext } from '../UserContext';


const DashboardNew = () => {
    const { setIsAuthenticated,loggedInUser,showSidebar,setShowSidebar} = useContext(userContext);
    const toggleSidebar = () => setShowSidebar(!showSidebar);


  return (
    <div>
    <Container fluid className="p-0">
      <Row className='g-0'>
        {/* Sidebar */}
        {showSidebar && (
          <Col
           
            style={{
             
              minHeight: "100vh",
              position: "fixed",
            }}
          >
            <Sidebar />
          </Col>
        )}

        {/* Header and Main Content */}
        <Col
          xs={12}
          md={showSidebar ? 10 : 12} // Adjust column width dynamically
          style={{
            marginLeft: showSidebar ? (showSidebar ? "16.67%" : "0") : "0", // Adjust based on sidebar visibility
            transition: "margin-left 0.3s ease",
          }}
        >
          {/* Header */}
          <Row>
            <Col
              
            >
              <Header />
              
            </Col>
          </Row>

          {/* Main Content */}
          <Row>
            <Col style={{ padding: "20px" }}>
             <Outlet />
              {/* Add your main content here */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default DashboardNew
