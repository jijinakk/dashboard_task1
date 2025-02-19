import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const MostSellingCategories = () => {
  const data = {
    labels: ["Electronics", "Fashion", "Home & Kitchen", "Books", "Toys"], 
    datasets: [
      {
        data: [40, 25, 15, 10, 10], 
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#F1C40F",
          "#8E44AD",
        ], 
        borderColor: "#fff", 
        borderWidth: 2, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right", 
      },
      title: {
        display: true,
        text: "Most Selling Products",
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutout: "0%",
    radius: "100%",
  };

  return (
    // <div style={{width: '400px', height: '380px',
    //   margin: "20px auto",
    //   borderRadius: "15px", // Curved corners
    //   padding: "20px 20px", // Padding inside the container
    //   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"}}>
    <div style={{ position: "relative", width: "100%", height: "400px" }}>

    <Pie data={data} options={options} />
    </div>
  );
};

export default MostSellingCategories;
