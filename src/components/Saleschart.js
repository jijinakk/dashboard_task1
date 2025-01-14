import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,

  Title,
  Tooltip
);

const Saleschart = () => {
  // Chart Data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "customers",
        data: [2000, 3000, 7000, 4500, 3000, 8000, 5000, 12000],
        borderColor: "rgba(75,192,192,1)", // Line color
        backgroundColor: "rgba(81, 214, 255, 0.31)", // Area fill color
        tension: 0.4, // Makes the line curved
        fill: true, // Fills the area below the line
      },
    ],
  };

  // Chart Options (disable axes and gridlines)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: true,
        text: "Monthly sales Data",
      },
    },
  };

  return (
    // <div style={{width: '100%', height: '380px',

    //     margin: "20px auto",
    //     borderRadius: "15px", // Curved corners
    //     padding: "20px 20px", // Padding inside the container
    //     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"}}>

    <Bar data={data} options={options} />
    // </div>
  );
};

export default Saleschart;
