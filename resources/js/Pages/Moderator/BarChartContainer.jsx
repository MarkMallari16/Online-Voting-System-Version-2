import React from 'react'
import BarChart from './BarChart'


const BarChartContainer = ({ positionId, positionName, voteCounts, chartPositionOption }) => {

  // console.log(selectedPosition);
  const positionVotes = Object.values(voteCounts).filter(vote => vote.position_id === positionId);

  const labels = positionVotes.map(vote => vote.candidate);
  const data = positionVotes.map(vote => vote.voteCount);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        //data
        label: "Vote/s",
        pointBackgroundColor: "#fcd34d",
        data: data,
        backgroundColor: ["#3b82f6", "#fcd34d"],
        borderRadius: 12,
        borderWidth: 1,
        responsive: true
      },
    ],
  };

  const chartOptions = {
    indexAxis: chartPositionOption  ? chartPositionOption : 'y',
    legend: {
      display: false
    },
  }

  return (
    <div className="mt-5  p-0 sm:p-3 md:p-5 lg:p-5 xl:p-8 bg-white rounded-lg">
      <div className="text-2xl font-medium text-center mb-5">{positionName}</div>
      <div className=" overflow-hidden rounded-md ">
        <BarChart data={barChartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default BarChartContainer