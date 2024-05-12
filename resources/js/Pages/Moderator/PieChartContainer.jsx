import React from 'react'
import PieChart from './PieChart';

const PieChartContainer = ({ voters, votersVotedCount }) => {
    const notYetVoted = voters.length - votersVotedCount;

    const pieChartData = {
<<<<<<< HEAD
        labels: ['Voters Voted', 'Voters Not Voted', 'Abstain'],
        datasets: [
            {
                data: [votersVotedCount, notYetVoted,212],
                backgroundColor: ["#60a5fa", "#9ca3af",'#334155'],
                borderWidth: 1,
                borderRadius: 12,
                responsive: true
=======
        labels: ['Voters Voted', 'Voters Not Voted'],
        datasets: [
            {
                data: [votersVotedCount, notYetVoted],
                backgroundColor: ["#60a5fa", "#9ca3af"],
                borderWidth: 1,
                borderRadius: 12,
                responsive:true
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
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