import React from 'react'
import BarChart from './BarChart'


const BarChartContainer = ({ positionId, positionName, voteCounts, options }) => {

  const positionVotes = Object.values(voteCounts).filter(vote => vote.position_id === positionId);

  const labels = positionVotes.map(vote => vote.candidate);
  const data = positionVotes.map(vote => vote.voteCount);

  const barChartData = {
    labels: labels,

    datasets: [
      {
        //data
        data: data,
        backgroundColor: ["#60a5fa", "#fcd34d"], 
        borderRadius: 12,
        borderWidth: 1,
        responsive: true
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
    <div className="p-5  bg-white">

      <h1 className="text-2xl font-medium text-center mb-5">{positionName}</h1>
      <div className=" overflow-hidden rounded-md ">
        <BarChart data={barChartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default BarChartContainer