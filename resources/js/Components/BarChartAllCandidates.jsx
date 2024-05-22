import BarChart from '@/Pages/Moderator/BarChart';
import React from 'react'

const BarChartAllCandidates = ({ voteCounts }) => {
  const positionVotes = Object.values(voteCounts).filter(vote => vote.position_id);


  const labels = positionVotes.map(vote => (

    vote.candidate
  ));


  const data = positionVotes.map(vote => vote.voteCount);


  const barChartData = {

    labels: labels,
    datasets: [
      {
        label: "Votes",
        pointBackgroundColor: "#fcd34d",
        data: data,
        backgroundColor: ["#3b82f6", "#fcd34d"],
        borderRadius: 8,
        borderWidth: 1,
        responsive: true

      },

    ],
  };

  const chartOptions = {
    indexAxis: 'x',

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

  };
  return (
    <div className='mt-5 bg-white w-full p-10 rounded-lg ring-1 ring-gray-300'>
      <div className='text-xl font-medium'>Live Election Results</div>
      <BarChart data={barChartData} options={chartOptions}/>
    </div>
  )
}

export default BarChartAllCandidates