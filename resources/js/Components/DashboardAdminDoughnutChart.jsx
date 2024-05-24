import { Pie } from "react-chartjs-2";

function DashboardAdminDoughnutChart({ usersVerified, usersNotVerified, className }) {
    const data = {
        labels: ['Verified Users', 'Not Verified Users'],
        datasets: [
            {
                data: [usersVerified, usersNotVerified],
                backgroundColor: ["#60a5fa", "#9ca3af"],
                borderWidth: 1,
                borderRadius: 12,
                responsive: true
            },
        ],
        hoverOffset: 4
    };

    const options = {
        plugins: {
            datalabels: {
                color: '#000',
                formatter: (value, context) => {
                    let sum = context.chart.data.datasets[0].data.reduce((acc, data) => acc + data, 0);
                    let percentage = ((value / sum) * 100).toFixed(2) + '%';
                    return percentage;
                },
                font: {
                    weight: 'bold',
                    size: 16,
                },
            },
            centerText: {}
        },
        cutout: '20%',
        responsive: true
    };

    return (
        <div className={`bg-white p-5 ring-1 ring-inset ring-gray-300 rounded-lg shadow-sm w-auto ${className}`}>
            <div className='font-medium pb-5'>User Verification status</div>
            <Pie data={data} options={options} />
        </div>
    );
}

export default DashboardAdminDoughnutChart;