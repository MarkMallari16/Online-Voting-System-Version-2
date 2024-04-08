import React from 'react'
import BarChart from './BarChart'


const BarChartContainer = ({ position, voteCounts }) => {

  const labels = Object.keys(voteCounts);
  const data = Object.values(voteCounts);

  const barChartData = {
    labels: labels,

    datasets: [
      {
        data: data ,
        backgroundColor: ["#64748b", "#fbbf24"], // Colors for each bar

        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    legend: {
      display: false // Set display to false to hide the legend
    }
  };
  return (
    <div className="bg-white mx-auto px-4 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">

      <h1 className="text-2xl text-center mb-5">{position}</h1>
      <div className="overflow-hidden rounded-lg shadow-md">
        <BarChart data={barChartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default BarChartContainer