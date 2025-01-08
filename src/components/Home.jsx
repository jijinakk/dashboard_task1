import React from 'react'
import Card from 'react-bootstrap/Card';
import LineChart from './Linechart';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MostSellingCategories from './Chart';
import { FcStatistics } from "react-icons/fc";
import Revenuechart from './Revenuechart';

const Home = () => {
  return (
    <div style={{padding:'30px' ,backgroundColor:"beige"}}>
    <div className="card-container">
      <Card className="card" >
        <Card.Body>
          <Card.Title>
          Revenue
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">$15,58745</Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
      <Card className="card">
        <Card.Body>
          <Card.Title>New Customers</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">7859</Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
      <Card className="card">
        <Card.Body >
          <Card.Title>Repeat Purchase Rate</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">56%</Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
      <Card className="card">
        <Card.Body >
          <Card.Title>Average Order Value</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">$8,575</Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'flex-start', marginTop: '20px' }}>
      {/* LineChart on the left */}
      <div className='bg-light' style={{ flex: 1 }}>
        <LineChart />
      </div>
      <div className='bg-light' style={{ display: 'flex', flexDirection: 'column', gap: '5px' ,width:"40%" }}>
        <MostSellingCategories/>
      </div>
    </div>
   </div>
 

  )
}

export default Home