import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);
const DoughnutChart = ({ data }) => {
    return (
        <div >
            <Doughnut data={data} />
        </div>
    )
}

export default DoughnutChart