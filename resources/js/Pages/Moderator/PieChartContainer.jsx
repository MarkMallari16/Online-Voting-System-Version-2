import React from 'react'
import PieChart from './PieChart';

const PieChartContainer = ({ voters, votersVotedCount }) => {
    const notYetVoted = voters.length - votersVotedCount;

    const pieChartData = {
        labels: ['Voters Voted', 'Voters Not Voted'],
        datasets: [
            {
                data: [votersVotedCount, notYetVoted],
                backgroundColor: ["#60a5fa", "#ef4444"],
                borderWidth: 1,
                borderRadius: 12,
                responsive:true
            },
        ],
    };

    return (
        <div className='flex justify-center mt-8'>
            <PieChart data={pieChartData} />
        </div>
    )
}

export default PieChartContainer