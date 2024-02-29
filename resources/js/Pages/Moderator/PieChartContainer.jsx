import React from 'react'
import PieChart from './PieChart';

const PieChartContainer = () => {
    const pieChartData = {
        labels: ['Voters Voted', 'Voters Not Voted'],
        datasets: [
            {
                data: [65, 59], // Replace these with the actual counts
                backgroundColor: ["#60a5fa", "#94a3b8"], // Blue for voters voted, gray for voters not voted
                borderWidth: 1,
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