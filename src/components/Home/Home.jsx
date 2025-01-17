import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import MostSellingCategories from "./MostSellingChart";
import Customerschart from "./Customerschart";
import Saleschart from "./Saleschart";
import {userContext} from  "../UserContext";
import UserContext from "../UserContext";

const Home = () => {
  const { users } = useContext(userContext);
  const newUsers = users?.length;
  return (
    <div style={{ padding: "30px" }}>
      <div className="card-container">
        <Card className="card">
          <Card.Body>
            <Card.Title>Revenue</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">$15,58745</Card.Subtitle>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        <Card className="card">
          <Card.Body>
            <Card.Title>New Users</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {newUsers}
            </Card.Subtitle>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        <Card className="card">
          <Card.Body>
            <Card.Title>Repeat Purchase Rate</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">56%</Card.Subtitle>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
        <Card className="card">
          <Card.Body>
            <Card.Title>Average Order Value</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">$8,575</Card.Subtitle>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div
        className="chart-container"
      >
        {/* LineChart on the left */}
        <div className=" chart ">
          <Saleschart />
        </div>
        <div className="chart ">
          <MostSellingCategories />
        </div>
        <div className="chart ">
          <Customerschart />
        </div>
      </div>
    </div>
  );
};

export default Home;
