import React, { useState } from 'react'

import ModeratorOverview from './ModeratorOverview'
import { Select, Option, Button, Avatar } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import BarChartContainer from './BarChartContainer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaRegFilePdf } from 'react-icons/fa';
import VotesPDF from '@/Components/VotesPDF';
import { Link } from '@inertiajs/react';
import { FaBox } from "react-icons/fa";
import DoughnutContainer from './DoughnutContainer';
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


    const votedVoters = voters.filter(voter => voter.hasVoted);
    console.log(votedVoters);
    const latestVotedVoter = votedVoters.reduce((prev, current) =>
        (new Date(prev.updated_at) > new Date(current.updated_at)) ? prev : current, []
    ) || [];
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
                                    document={<VotesPDF voteCounts={voteCounts} positionList={position_list} />}
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

                <div className='flex flex-col gap-5'>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-max">
                        <div className="p-4 text-gray-900">
                            <h1 className='text-xl font-medium'>Votes Tally</h1>
                        </div>
                        <div className='px-4 py-0 md:p-8'> {/* Adjust padding based on screen size */}
                            <DoughnutContainer voters={voters} votersVotedCount={votersVotedCount} />
                        </div>

                    </div>
                    <div className="bg-white flex-1 rounded-md">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-max px-5 py-5">
                            <div className="flex justify-between">
                                <div >
                                    <div className='font-medium'>Today, {new Date().toLocaleDateString()}</div>


                                    <div className='text-gray-600 text-sm'>Latest voter voted</div>
                                </div>

                                <div className=" text-gray-900 text-end">

                                    <Link href={route('votes')} className='font-medium border-b-2 border-black hover:border-blue-500 transition-all ease-in-out duration-50 hover:text-blue-500 cursor-pointer' >View All</Link>
                                    {/* Place your latest votes components here */}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-max">
                            <div className="text-gray-900">
                                {latestVotedVoter && latestVotedVoter.length > 0 ? (
                                    <div className='flex justify-between px-4 py-2 items-center'>
                                        <div>
                                            <Avatar src={latestVotedVoter.profile_picture} alt={latestVotedVoter.name} />
                                        </div>
                                        <div>
                                            {latestVotedVoter.name}
                                        </div>
                                        <div className='text-blue-500 font-medium'>
                                            {latestVotedVoter.hasVoted && 'Voted'}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center flex-col mb-3'>
                                        <div className='mb-3'>
                                            <div>No Voters Yet</div>
                                        </div>
                                        <div>
                                            <FaBox className='text-2xl' />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModeratorDashboard