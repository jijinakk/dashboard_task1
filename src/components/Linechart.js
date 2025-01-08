import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Linechart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April','May','June','July','August','Septemper','October','November','December'],
    datasets: [
      {
        label: 'sales',
        data: [10, 30, 22, 35,25,40,20,12,50,40,55,53],
        borderColor: ' #c475e6',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Overview',
      },
    },
  };

  return (
  <div style={{ width: '800px', height: '450px', margin: '0', margin: '10px 10px 10px 30px', textAlign: 'left' }}>
  <Line data={data} options={options} />
  </div>
  )
};

export default Linechart;
