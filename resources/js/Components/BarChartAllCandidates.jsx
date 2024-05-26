import BarChart from '@/Pages/Moderator/BarChart';
import React from 'react'

const BarChartAllCandidates = ({ voteCounts, positionLists }) => {
  const positionVotes = Object.values(voteCounts).filter(vote => vote.position_id);

  console.log(positionVotes);

  const labels = positionVotes.map(vote => (

    <>
      vote.candidate
      vote.position
    </>
  ));


  const data = positionVotes.map(vote => vote.voteCount);

  console.log(labels);
  const barChartData = {

    labels: labels,
    datasets: [
      {
        label: "Vote(s)",
        pointBackgroundColor: "#fcd34d",
        data: data,
        backgroundColor: ["#3b82f6", "#fcd34d"],
        borderRadius: 8,
        borderWidth: 1,


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
    plugins: {
      legend: false
    }
  };
  return (
    <div className='mt-5 bg-white w-full p-10 rounded-lg ring-1 ring-gray-300'>
      <div className='flex  gap-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-gray-900">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>


        <div className='text-xl font-medium mb-4'>Live Election Results</div>
      </div>
      <BarChart data={barChartData} options={chartOptions} />
    </div>
  )
}

export default BarChartAllCandidates