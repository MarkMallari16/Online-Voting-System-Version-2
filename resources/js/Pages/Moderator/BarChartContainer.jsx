import React from 'react'
import BarChart from './BarChart'

const BarChartContainer = ({ positionId, positionName, voteCounts, chartPositionOption }) => {

  const positionVotes = Object.values(voteCounts).filter(vote => vote.position_id === positionId);


  const labels = positionVotes.map(vote => (
    vote.candidate

  ));
  const data = positionVotes.map(vote => vote.voteCount);


  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Vote(s)",
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
    indexAxis: chartPositionOption ? chartPositionOption : 'y',

    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    },
    responsive: true,
    plugins: {
      legend: false,
    },
  };

  return (
    <div className="mt-4 lg:mt-0 p-0 sm:p-3 md:p-5 lg:p-5 xl:p-8  rounded-lg bg-white dark:bg-[#252525]">
      <div className="text-2xl font-medium text-center mb-5  dark:text-gray-50">{positionName}</div>
      <BarChart data={barChartData} options={chartOptions} />
    </div>
  )
}

export default BarChartContainer