import React from 'react'
import BarChart from './BarChart'


const BarChartContainer = ({ positionId, positionName, voteCounts, chartPositionOption }) => {

  const positionVotes = Object.values(voteCounts).filter(vote => vote.position_id === positionId);

  const labels = positionVotes.map(vote => (
    vote.candidate
    
  ));
  const data = positionVotes.map(vote => vote.voteCount);
  console.log(positionVotes);
  const barChartData = {
    labels: labels,
    datasets: [
      {
     
        label: "Vote",
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
    indexAxis: chartPositionOption ? chartPositionOption : 'x',
    legend: {
      display: false
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0, 
      }
    }
  };

  return (
    <div className="p-0 sm:p-3 md:p-5 lg:p-5 xl:p-8 bg-white rounded-lg">
      <div className="text-2xl font-medium text-center mb-5">{positionName}</div>
      <div className="overflow-hidden rounded-md ">
        <BarChart data={barChartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default BarChartContainer