import React from 'react'
import { Pie } from 'react-chartjs-2';
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
const PieChart = ({ data }) => {
    return (
        <div>
            <Pie data={data} />
        </div>
    )
}

export default PieChart