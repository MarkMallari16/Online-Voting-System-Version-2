import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import BarChartContainer from '../BarChartContainer'

const LiveResult = ({ auth }) => {
    const data = {
        labels: ['Candidate A', 'Candidate B', 'Candidate C'],
        datasets: [{
            data: [300, 200, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }],
    };
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Live results</h2>} >
            <div className='mt-5 flex gap-2 justify-end p-4'>
                <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md'>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>


                </div>

            </div>
            <div className="flex flex-row md:flex-row min-h-screen ">

                <main className="flex-1 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                    <div className="bg-white p-5 max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                        <BarChartContainer position="President" />
                    </div>
                    <div className="bg-white p-5 max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                        <BarChartContainer position="Vice President" />
                    </div>
                    <div className="bg-white p-5 max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                        <BarChartContainer position="Secretary" />
                    </div>
                    <div className="bg-white p-5 max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                        <BarChartContainer position="Treasurer" />
                    </div>
                    <div className="bg-white p-5 max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                        <BarChartContainer position="Auditor" />
                    </div>
                    <div className="bg-white p-5 max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                        <BarChartContainer position="P.R.O" />
                    </div>
                </main>
            </div>

        </AuthenticatedLayout>
    )
}

export default LiveResult