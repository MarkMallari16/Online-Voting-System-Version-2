import React from 'react'
import DoughnutChart from './DoughnutChart';

const DoughnutContainer = ({ votersVotedCount, abstainCount, votersNotVoted }) => {

    const pieChartData = {
        labels: ['Students Voted', 'Students Not Voted', 'Students Abstain'],
        datasets: [
            {
                data: [votersVotedCount, votersNotVoted, abstainCount],
                backgroundColor: ["#60a5fa", "#9ca3af", "#334155"],
                borderWidth: 1,
                borderRadius: 12,
                responsive: true
            },
        ],
    };

    return (
        <div className='flex justify-center'>
            <DoughnutChart data={pieChartData} />
        </div>
    )
}

export default DoughnutContainer