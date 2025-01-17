import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Customerschart = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Septemper",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "",
        data: [10, 30, 22, 35, 25, 40, 20, 12, 50, 40, 55, 53],
        borderColor: " #4e8cff",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "New Customers",
      },
    },
  };

  return (
    // <div  style={{width: '600px', height: '380px',
    //   margin: "20px auto",
    //   borderRadius: "15px", // Curved corners
    //   padding: "20px 20px", // Padding inside the container
    //   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"}}>
    <Line data={data} options={options} />
    // </div>
  );
};

export default Customerschart;
