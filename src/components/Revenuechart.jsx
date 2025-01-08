import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const Revenuechart = () => {
  // Chart Data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Revenue",
        data: [2000, 3000, 4000, 5000, 7000, 8000, 9500, 12000],
        borderColor: "rgba(75,192,192,1)", // Line color
        backgroundColor: "rgba(75,192,192,0.2)", // Area fill color
        tension: 0.4, // Makes the line curved
        fill: true, // Fills the area below the line
      },
    ],
  };

  // Chart Options (disable axes and gridlines)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltip for interactivity
      },
    },
    scales: {
      x: {
        display: false, // Hide the X-axis
      },
      y: {
        display: false, // Hide the Y-axis
      },
    },
  };

  return (
    <div style={{
        width: "20%",
        margin: "20px auto",
        background: "white", // Background color
        border: "1px solid #ccc", // Light gray border
        borderRadius: "15px", // Curved corners
        padding: "20px", // Padding inside the container
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"}}>
      <h4 style={{ textAlign: "left", marginBottom: "10px" }}>
        Revenue 
      </h4>
      <h5>$7,58,5774</h5>
      <Line data={data} options={options} />
    </div>
  );
};

export default Revenuechart;
