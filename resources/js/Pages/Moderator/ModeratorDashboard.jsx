import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ModeratorOverview from './ModeratorOverview'
import { Select, Option } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import BarChartContainer from './BarChartContainer';
import PieChartContainer from './PieChartContainer';
const ModeratorDashboard = () => {
    return (
        <div>
           
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-3">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-bold">Welcome, Moderator!</h1>
                </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-3">
                <div className="p-6 text-gray-900">
                    <ModeratorOverview />

                </div>
            </div>

            <div className='mt-5 flex gap-2 flex-col sm:flex-row'>
                <div className="flex-1 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h1 className='text-xl font-bold'>Votes Tally</h1>

                    </div>
                    <div className='p-5'>
                        <div className='flex justify-end'>

                            <div className="w-72">
                                <Select label="Select Positions">
                                    <Option>President</Option>
                                    <Option>Vice President</Option>
                                    <Option>Secretary</Option>
                                    <Option>Treasurer</Option>
                                    <Option>Auditor</Option>
                                    <Option>P.R.O</Option>
                                </Select>
                            </div>
                        </div>
                        <BarChartContainer />
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h1 className='text-xl font-bold'>Votes Tally</h1>

                    </div>
                    <div className='p-5'>
                        <div className='flex justify-end'>

                            <div className="w-72">
                                <Select label="Votes">
                                    <Option>Voters Voted</Option>
                                    <Option>Voter Not Voted</Option>

                                </Select>
                            </div>
                        </div>
                        <PieChartContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModeratorDashboard