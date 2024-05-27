import React from 'react'
import { Bar } from 'react-chartjs-2';

const DashboardBarAdminChart = ({ totalStudents, totalAdmins, totalModerators, className }) => {

    // Data for the bar chart
    const data = {
        labels: ['Admins', 'Moderators', 'Students',],
        datasets: [
            {
                label: "Users",
                backgroundColor: ['#fef08a', '#80DEEA', '#60a5fa'],
                borderWidth: 1,
                borderRadius: 12,
                data: [totalAdmins, totalModerators, totalStudents],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0
                }
            }
        },
       
        responsive: true

    };
    return (
        <div className={` bg-white dark:bg-[#252525] dark:ring-gray-800 dark:text-gray-50 p-5 ring-1 ring-inset ring-gray-300 rounded-lg shadow-sm w-auto ${className} `}  >
            <div className='font-medium'>Number of Users</div>
            <Bar data={data} options={options} />
        </div>
    )
}

export default DashboardBarAdminChart