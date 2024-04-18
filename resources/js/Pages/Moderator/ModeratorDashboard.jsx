import React, { useState } from 'react'

import ModeratorOverview from './ModeratorOverview'
import { Select, Option } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import BarChartContainer from './BarChartContainer';
import PieChartContainer from './PieChartContainer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaRegFilePdf } from 'react-icons/fa';
import UsersPDF from '../Admin/UsersPDF';
import VotesPDF from '@/Components/VotesPDF';
const ModeratorDashboard = ({ voters, candidates, election, position_list, voteCounts, votersVotedCount }) => {

    const defaultPositionId = position_list.length > 0 ? position_list[0].id : ''
    const [selectedPosition, setSelectedPosition] = useState(defaultPositionId);

    const [chartPositionOption, setChartPositionOption] = useState(() => {
        // Retrieve the stored option from localStorage or default to "y"
        return localStorage.getItem('chartPositionOption') || 'y';
    });
    const selectedPositionData = position_list.find(position => position.id === selectedPosition);

    console.log(selectedPositionData);

    const positionId = selectedPositionData ? selectedPositionData.id : null;
    const positionName = selectedPositionData ? selectedPositionData.name : ""

    const handlePositionChange = (value) => {
        setSelectedPosition(value);
    };
    const handleChartPositionOption = (value) => {
        setChartPositionOption(value);
        console.log(value);
        localStorage.setItem('chartPositionOption', value);
    }
    console.log(voteCounts);
    return (
        <div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-3">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-medium">Welcome back, Moderator!</h1>
                </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-3">
                <div className="p-6 text-gray-900">
                    <ModeratorOverview voters={voters} election={election} candidates={candidates} votersVotedCount={votersVotedCount} />

                </div>
            </div>

            <div className='mt-5 flex gap-3 flex-col sm:flex-row'>
                <div className="flex-1 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h1 className='text-xl font-medium'>Votes Tally</h1>

                    </div>
                    <div className='p-5'>
                        <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-end gap-3 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2'>
                            <div className="flex  items-center gap-2 cursor-pointer border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md">
                                <div>
                                    <FaRegFilePdf className="text-xl" />
                                </div>
                                <PDFDownloadLink
                                    document={<VotesPDF voteCounts={voteCounts} />}
                                    fileName="votes_report.pdf"
                                >
                                    {({ blob, url, loading, error }) =>
                                        "Export to PDF"
                                    }
                                </PDFDownloadLink>
                            </div>
                            <div className="w-100 sm:w-72 md:w-72 lg:w-72">
                                <Select label="Select Chart Position" onChange={handleChartPositionOption} value={chartPositionOption}>
                                    <Option value="y">Horizontal</Option>
                                    <Option value="x">Vertical</Option>
                                </Select>
                            </div>
                            <div className="w-100 sm:w-72 md:w-72 lg:w-72">
                                <Select label="Select Position" onChange={handlePositionChange} value={selectedPosition}>

                                    {position_list.map((position) => (
                                        <Option key={position.id} value={position.id}>{position.name}</Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <BarChartContainer positionId={positionId} positionName={positionName} voteCounts={voteCounts} selectedPosition={selectedPosition} chartPositionOption={chartPositionOption} />
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-max">
                    <div className="p-6 text-gray-900">
                        <h1 className='text-xl font-medium'>Votes Tally</h1>
                    </div>
                    <div className='p-8'>
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