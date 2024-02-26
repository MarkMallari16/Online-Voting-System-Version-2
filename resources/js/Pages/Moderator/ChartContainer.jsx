import React from 'react'
import BarChart from './BarChart'
const ChartContainer = () => {
  const chartData = {
    labels: ['President', 'Vice President', 'Secretary', 'Treasurer', 'Auditor', 'PRO'],
    
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ["#64748b", "#fbbf24"],

        borderWidth: 1,
      },
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ["#64748b", "#fbbf24"],

        borderWidth: 1,
      },
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: ["#64748b", "#fbbf24"],

        borderWidth: 1,
      },
    ],
  }
  const chartOptions = {
    indexAxis: "y",
  };
  return (
    < >
      <BarChart data={chartData} options={chartOptions} />
    </>
  )
}

export default ChartContainer