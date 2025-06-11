// utils/giveChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

export default function giveChart() {
  const data = {
    labels: ['Checked In', 'Not Checked In','inleave'],
    datasets: [
      {
        data: [4500, 500,1000],
        backgroundColor: ['#4CAF50', '#FF5252','#4CAG56'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        display: false, // hides the labels
      },
    },
  };

  return (
    <div style={{ width: '120px', height: '120px' }}>
      <Pie data={data} options={options} />
    </div>
  );
}
