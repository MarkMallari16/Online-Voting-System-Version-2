import React, { useState, useEffect } from 'react'

import ModeratorOverview from './ModeratorOverview'
import { Select, Option } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import BarChartContainer from './BarChartContainer';
import PieChartContainer from './PieChartContainer';
const ModeratorDashboard = ({ voters, candidates, election, position_list, voteCounts, votersVotedCount }) => {
    console.log(position_list);

    const [selectedPosition, setSelectedPosition] = useState('');

    const selectedPositionData = position_list.find(position => position.id === selectedPosition);
    const positionId = selectedPositionData ? selectedPositionData.id : null;
    const positionName = selectedPositionData ? selectedPositionData.name : ""

    useEffect(() => {
        console.log(selectedPosition);
    }, [selectedPosition]);

    const handlePositionChange = (event) => {
        setSelectedPosition(event.target.value);
        console.log(selectedPosition);
    };
    return (
        <div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-3">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-bold">Welcome back, Moderator!</h1>
                </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-3">
                <div className="p-6 text-gray-900">
                    <ModeratorOverview voters={voters} election={election} candidates={candidates} votersVotedCount={votersVotedCount} />

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
                                <Select label="Select Positions" onChange={handlePositionChange} value={selectedPosition}>
                                    {position_list.map((position) => (
                                        <Option key={position.id} value={String(position.id)}>{position?.name}</Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <BarChartContainer positionId={positionId} positionName={positionName} voteCounts={voteCounts} selectedPosition={selectedPosition} />
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h1 className='text-xl font-bold'>Votes Tally</h1>

                    </div>
                    <div className='p-5'>
                        <div className='flex justify-end'>

                            <div className="w-72">
                                {/**<Select label="Votes">
                                    <Option>Voter Not Voted</Option>

                                </Select> */}
                            </div>
                        </div>
                        <PieChartContainer voters={voters} votersVotedCount={votersVotedCount} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModeratorDashboard