import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// Basic Card component
const Card = ({ children }) => (
  <div className="border rounded-lg shadow-sm p-4 bg-white">{children}</div>
);

const Chart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: "Total",
        data: data.map((item) => item.total),
        backgroundColor: "#0369a1",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `$${context.parsed.y}`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#888888",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#888888",
          font: {
            size: 12,
          },
          callback: function(value) {
            return `$${value}`;
          },
        },
      },
    },
  };

  return (
    <Card>
      <Bar data={chartData} options={options} height={350} />
    </Card>
  );
};

export default Chart;
