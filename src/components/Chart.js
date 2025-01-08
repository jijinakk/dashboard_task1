import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const MostSellingCategories = () => {
  const data = {
    labels: ['Electronics', 'Fashion', 'Home & Kitchen', 'Books', 'Toys'], // Categories
    datasets: [
      {
        data: [40, 25, 15, 10, 10], // Sales data for each category
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD'], // Colors for each segment
        borderColor: '#fff', // Border color for each segment
        borderWidth: 2, // Border width for each segment
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', // Position of the legend
      },
      title: {
        display: true,
        text: 'Most Selling Products',
      },
    },
  };

  return (
    <div style={{ width: '80%', height: '470px', marginLeft: '20px', paddingTop: '10px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default MostSellingCategories;
