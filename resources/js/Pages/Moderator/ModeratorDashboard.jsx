import React, { useState } from 'react'

import ModeratorOverview from './ModeratorOverview'
import { Select, Option, Avatar } from "@material-tailwind/react";
import BarChartContainer from './BarChartContainer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaRegFilePdf } from 'react-icons/fa';
import VotesPDF from '@/Components/VotesPDF';
import { Link } from '@inertiajs/react';
import { FaBox } from "react-icons/fa";
import DoughnutContainer from './DoughnutContainer';
import moment from 'moment';
import BarChartAllCanidadtes from '@/Components/BarChartAllCandidates';

function PositionSelector({ label, onChange, value, positionList }) {
    return (
        <Select className='dark:bg-[#121212] dark:text-gray-50' label={label} onChange={onChange} value={value}>
            {positionList.map((position) => (
                <Option key={position.id} value={position.id} className='mb-1'>{position.name}</Option>
            ))}
        </Select>
    );
}
const ModeratorDashboard = ({ voters, candidates, election, position_list, voteCounts, votersVotedCount, votersNotVoted, numberOfPartylists, numberOfPositions, latestVotedUsers, totalVotesPerPosition, abstainCount }) => {


    const electionTitle = election ? election.title : '';

    const defaultPositionId = position_list.length > 0 ? position_list[0].id : ''
    const [selectedPosition, setSelectedPosition] = useState(defaultPositionId);

    const [chartPositionOption, setChartPositionOption] = useState(() => {
        return localStorage.getItem('chartPositionOption') || 'y';
    });

    const selectedPositionData = position_list.find(position => position.id === selectedPosition);



    const positionId = selectedPositionData ? selectedPositionData.id : null;
    const positionName = selectedPositionData ? selectedPositionData.name : ""

    const handlePositionChange = (value) => {
        setSelectedPosition(value);
    };

    const handleChartPositionOption = (value) => {
        setChartPositionOption(value);

        localStorage.setItem('chartPositionOption', value);
    }

    const votedVoters = voters.filter(voter => voter.hasVoted);


    return (
        <div>

            <div className="bg-white text-gray-900 dark:bg-[#252525] dark:ring-gray-800 dark:text-gray-100 ring-1 ring-gray-300 overflow-hidden shadow-sm sm:rounded-lg mb-5 ">
                <div className="p-6 ">
                    <h1 className="text-xl font-medium">Welcome back, Moderator!</h1>
                </div>
            </div>

            <div className="overflow-hidden  sm:rounded-lg mb-3 ">
                <div className=" text-gray-900">
                    <ModeratorOverview voters={voters} election={election} candidates={candidates} votersVotedCount={votersVotedCount} numberOfPartylists={numberOfPartylists} numberOfPositions={numberOfPositions} abstainCount={abstainCount} />

                </div>
            </div>

            <div className='mt-5 flex gap-3 flex-col sm:flex-row '>
                <div className="bg-white flex-1 dark:bg-[#252525] overflow-hidden shadow-sm sm:rounded-lg ring-1 ring-inset ring-gray-300 dark:ring-gray-800 rounded-lg">
                    <div className="p-6 text-gray-900 flex gap-2 dark:text-gray-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                        <div className='text-xl font-medium '>Current Votes</div>

                    </div>
                    <div className='p-5 '>
                        <div className='flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row justify-end gap-3 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-2'>
                            <div className="dark:bg-[#121212] dark:ring-gray-800 dark:text-gray-50 flex items-center gap-2 cursor-pointer border-1 bg-white ring-1 ring-inset ring-gray-300  text-black px-2 py-2 rounded-md">
                                <div>
                                    <FaRegFilePdf className="text-xl" />
                                </div>
                                <PDFDownloadLink
                                    document={<VotesPDF voteCounts={voteCounts} positionList={position_list} electionTitle={electionTitle} totalVotesPerPosition={totalVotesPerPosition} />}
                                    fileName="votes_report.pdf"

                                >
                                    {({ blob, url, loading, error }) =>
                                        "Export to PDF"
                                    }

                                </PDFDownloadLink>
                            </div>
                            <div className="w-100 ">
                                <Select className='dark:bg-[#121212] dark:text-gray-50' label="Select Chart Position" onChange={handleChartPositionOption} value={chartPositionOption}>
                                    <Option value="y" className='mb-1'>Horizontal</Option>
                                    <Option value="x">Vertical</Option>
                                </Select>
                            </div>
                            <div className="w-100">
                                <PositionSelector label="Select Position" onChange={handlePositionChange} value={selectedPosition} positionList={position_list} />
                            </div>

                        </div>
                        {votedVoters.length > 0 ? <BarChartContainer positionId={positionId} positionName={positionName} voteCounts={voteCounts} selectedPosition={selectedPosition} chartPositionOption={chartPositionOption} /> :

                            <div className='flex justify-center flex-col items-center h-96'>

                                <div className='text-gray-900  mb-3'>No voters have cast their votes yet</div>
                                <div>
                                    <FaBox className='text-2xl' />
                                </div>
                            </div>}
                    </div>

                </div>

                <div className='flex flex-col gap-5  '>
                    <div className="bg-white dark:bg-[#252525] shadow-sm sm:rounded-lg ring-1 ring-inset ring-gray-300 dark:ring-gray-800  rounded-lg ">
                        <div className=" p-5  flex items-center gap-2 dark:text-gray-50 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                            </svg>


                            <div className='text-xl font-medium '>Current Students Votes</div>
                        </div>
                        <div className='px-4 py-5 lg:p-8 '>

                            {election && votedVoters.length > 0 ? <DoughnutContainer votersVotedCount={votersVotedCount} abstainCount={abstainCount} votersNotVoted={votersNotVoted} /> :

                                <div className='flex justify-center flex-col items-center h-96'>

                                    <div className='text-gray-900  mb-3'>No voters have cast their votes yet</div>
                                    <div>
                                        <FaBox className='text-2xl' />
                                    </div>
                                </div>}
                        </div>

                    </div>
                    <div className="bg-white dark:bg-[#252525] dark:text-gray-50 flex-1 ring-1 ring-inset ring-gray-300 dark:ring-gray-800 rounded-lg  p-2 ">
                        <div className=" overflow-hidden shadow-sm sm:rounded-lg h-max px-5 pt-5">
                            <div className="flex justify-between">
                                <div >
                                    <div className='font-medium'>Today, {new Date().toLocaleDateString()}</div>


                                    <div className='text-gray-800 dark:text-gray-600 text-sm'>Latest voter voted</div>
                                </div>

                                <div className=" text-gray-900 text-end">

                                    <Link href={route('votes')} className='dark:text-gray-50 dark:border-gray-50 font-medium border-b-2 border-black hover:border-blue-500 transition-all ease-in-out duration-50 hover:text-blue-500 cursor-pointer' >View All</Link>

                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#252525] dark:text-gray-50  overflow-hidden shadow-sm sm:rounded-lg px-5 ">
                            <div className="text-gray-900 mt-4 dark:text-gray-50">
                                {election?.status === "Active" && latestVotedUsers.length > 0 ? (
                                    latestVotedUsers.map((latestVotedUser, id) => (
                                        <div key={id} className='flex justify-between  px-2 py-2 items-center mb-4 rounded-md '>
                                            <div className='flex items-center gap-3'>
                                                <div>
                                                    <Avatar src={`storage/${latestVotedUser.profile_picture}`} alt="Avatar" size='lg' />
                                                </div>
                                                <div className='flex flex-col '>

                                                    <div className='font-medium'>
                                                        {latestVotedUser.name}
                                                    </div>
                                                    <div className='text-sm text-gray-800 dark:text-gray-400'>{moment(latestVotedUser.vote_timestamp).fromNow()}</div>
                                                </div>
                                            </div>

                                            <Link href={route('votes')} className='flex items-center hover:text-blue-500 transition-all ease-in font-medium' >
                                                <div>
                                                    View
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                                                </svg>

                                            </Link>

                                        </div>
                                    ))
                                ) : (
                                    <div className='flex justify-center items-center flex-col mb-3'>
                                        <div className='mb-3'>
                                            <div className='text-gray-900'>No Voters Yet</div>
                                        </div>
                                        <div>
                                            <FaBox className='text-2xl mb-3' />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div>
                {
                    election && votedVoters.length > 0 ? (
                        <BarChartAllCanidadtes positionLists={position_list} voteCounts={voteCounts} />

                    ) : (
                        <div className='mt-4 rounded-lg ring-1 ring-inset ring-gray-300 bg-white flex justify-center flex-col items-center h-96'>

                            <div className='text-gray-900  mb-3'>No voters have cast their votes yet</div>
                            <div>
                                <FaBox className='text-2xl' />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ModeratorDashboard