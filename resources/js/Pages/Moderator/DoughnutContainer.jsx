import React from 'react'
import DoughnutChart from './DoughnutChart';

const DoughnutContainer = ({ voters, votersVotedCount }) => {
    const notYetVoted = voters.length - votersVotedCount;

    const pieChartData = {
        labels: ['Students Voted', 'Students Not Voted'],
        datasets: [
            {
                data: [votersVotedCount, notYetVoted],
                backgroundColor: ["#60a5fa", "#9ca3af"],
                borderWidth: 1,
                borderRadius: 12,
                responsive:true
            },
        ],
    };

    return (
        <div className='flex justify-center mt-8 '>
            <DoughnutChart data={pieChartData} />
        </div>
    )
}

export default DoughnutContainer