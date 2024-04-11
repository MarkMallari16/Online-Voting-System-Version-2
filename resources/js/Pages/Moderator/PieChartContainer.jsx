import React from 'react'
import PieChart from './PieChart';

const PieChartContainer = ({voters, votersVotedCount}) => {
    const notYetVoted = voters.length - votersVotedCount
    const pieChartData = {
        labels: ['Voters Voted', 'Voters Not Voted'],
        datasets: [
            {
                data: [votersVotedCount, notYetVoted], // Replace these with the actual counts
                backgroundColor: ["#60a5fa", "#ef4444"], // Blue for voters voted, gray for voters not voted
                borderWidth: 1,
                borderRadius: 12
            },
        ],
    };

    return (
        <div className='mt-8'>
            <PieChart data={pieChartData} />
        </div>
    )
}

export default PieChartContainer