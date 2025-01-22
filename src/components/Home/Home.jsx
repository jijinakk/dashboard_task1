import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import MostSellingCategories from "./MostSellingChart";
import Customerschart from "./Customerschart";
import Saleschart from "./Saleschart";
import { userContext } from "../UserContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
const Home = () => {
  const { users } = useContext(userContext);
  const newUsers = users?.length;

  return (
    <Container fluid style={{ minHeight: "100vh",height:"auto", overflow: "auto" }}>      <Row  className="mb-4">
        <Col xs={12} lg={3}>
        <Card className="shadow-sm border-0 custom-card mb-4" >
          <Card.Body>
            <Card.Title>Revenue</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">$15,58745</Card.Subtitle>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col xs={12} lg={3}>
        <Card className="shadow-sm border-0 custom-card mb-4" >
          
          <Card.Body>
            <Card.Title>New Users</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {newUsers}
            </Card.Subtitle>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col xs={12} lg={3}>
        <Card className="shadow-sm border-0 custom-card mb-4">
          <Card.Body>
            <Card.Title>Repeat Purchase Rate</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">56%</Card.Subtitle>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        </Col>
        <Col xs={12} lg={3}>
        <Card className="shadow-sm border-0 custom-card mb-4">
          <Card.Body>
            <Card.Title>Average Order Value</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">$8,575</Card.Subtitle>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        </Col>
      </Row>
      <Row className="mb-3 d-flex justify-content-between">
  {/* Most Selling Categories Card */}
  <Col xs={12} sm={6} lg={4} className="mb-3">
   <div className="shadow-sm border-0 custom-chart">
      <MostSellingCategories />
    </div>
  </Col>

  {/* Customer Growth Card */}
  <Col xs={12} sm={6} lg={4} className="mb-3">
  <div className="shadow-sm border-0 custom-chart h-100"> 
  <Customerschart />
  </div>
  </Col>

  {/* Monthly Sales Data Card */}
  <Col xs={12} sm={6} lg={4} className="mb-3">
  <div className="shadow-sm border-0 custom-chart h-100"> 
<Saleschart />
  </div>
  </Col>
</Row>

    </Container>
  );
};

export default Home;
