import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import LineChart from "./Saleschart";
import ProgressBar from "react-bootstrap/ProgressBar";
import MostSellingCategories from "./MostSellingChart";
import Customerschart from "./Customerschart";
import Saleschart from "./Saleschart";
import { userContext } from "../App";

const Home = () => {
  const { users } = useContext(userContext);
  const newUsers = users.length;
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
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          alignItems: "flex-start",
          marginTop: "40px",
        }}
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
