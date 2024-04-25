import React, { useState, useEffect } from 'react'
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";


import ExcelExport from '@/Components/ExcelExport';
const TABS = [
    {
        label: "Students Voted",
        value: "students_voted",
    },
    {
        label: "Students Not Voted",
        value: "students_not_voted",
    },

];

const VoteTable = ({ votes, votesPerPage, voters, voterVoted, positions }) => {
    const TABLE_HEAD = ["#", "Voter ID", "Voter's Name", "Candidate Voted For", "Candidate Position", "Election ID", "Vote Timestamp", "Action"];
    const VOTER_NOT_VOTED_TABLE_HEAD = ["#", "Voter ID", "Voter's Name", "Action"];
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(votesPerPage.current_page);

    const indexOfLastVote = currentPage * votesPerPage.per_page;//1
    const indexOfFirstVote = indexOfLastVote - votesPerPage.per_page;//10

    const currentVotes = votes.slice(indexOfFirstVote, indexOfLastVote);

    const totalPages = votesPerPage.last_page;

    const handleOpen = (id) => {
        setOpen(!open);
        setId(id);

    }


    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }
    const classes = "p-4 border-b border-blue-gray-50";
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Votes
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all Votes
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">


                    </div>
                    {/*Dialog* */}
                    <Dialog open={open} size='lg' handler={handleOpen}>
                        <DialogHeader>
                            Vote Details
                        </DialogHeader>
                        <DialogBody>
                            <div >
                                <div className='text-xl text-black font-medium'>
                                    <div>Voter ID: <span>{votes.find(vote => vote.id === id)?.voter_id}</span></div>
                                </div>

                                <div className='text-xl text-black font-medium'>
                                    <div>Voter's Name: <span>{votes.find(vote => vote.id === id)?.user.name}</span></div>
                                </div>

                                <div className='text-xl text-black font-medium'>

                                    <div>Candidate Voted For: <span>{`${votes.find(vote => vote.id === id)?.candidate.first_name} ${votes.find(vote => vote.id === id)?.candidate.last_name}`}</span></div>
                                </div>

                                <div className='text-xl text-black font-medium'>
                                    <div>Candidate Position: <span>{votes.find(vote => vote.id === id)?.candidate.position_id ? positions.find(position => position.id === votes.find(vote => vote.id === id).candidate.position_id).name : ''}</span></div>

                                </div>

                                <div className='text-xl text-black font-medium'>
                                    <div>Election ID: <span>{votes.find(vote => vote.id === id)?.election_id}</span></div>

                                </div>

                                <div className='text-xl text-black font-medium'>
                                    <div>Vote Timestamp: <span>{new Date(votes.find(vote => vote.id === id)?.vote_timestamp).toLocaleString()}</span></div>
                                </div>
                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Close</span>
                            </Button>

                        </DialogFooter>
                    </Dialog>
                </div>

                <div className="flex flex-col items-center justify-end gap-4 md:flex-row ">

                    <div className='flex justify-start gap-2'>
                        <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md'>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>


                        </div>
                        <ExcelExport data={votes} fileName='votes' />
                    </div>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <Tabs value="students_voted">
                    <div className="w-full  mx-4">
                        <TabsHeader >
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>

                    </div>
                    <TabsBody>

                        <TabPanel value="students_voted">
                            <table className="mt-4 w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        {TABLE_HEAD.map((head, index) => (
                                            <th
                                                key={head}
                                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                                >
                                                    {head}{" "}
                                                    {index !== TABLE_HEAD.length - 1 && (
                                                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                                    )}
                                                </Typography>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                {currentVotes.length === 0 || currentVotes.filter(vote => {
                                    const userMatches = vote.user.name.toLowerCase().includes(searchQuery.toLowerCase());
                                    const candidateMatches = `${vote.candidate.first_name} ${vote.candidate.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
                                    const position = positions.find(position => position.id === vote.candidate.position_id).name.toLowerCase().includes(searchQuery.toLowerCase());
                                    return userMatches || candidateMatches || position;
                                }).length === 0 ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan="8" className="text-center py-4 text-gray-500">
                                                No votes found
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        {currentVotes
                                            .filter(vote => {
                                                const userMatches = vote.user.name.toLowerCase().includes(searchQuery.toLowerCase());
                                                const candidateMatches = `${vote.candidate.first_name} ${vote.candidate.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
                                                const position = positions.find(position => position.id === vote.candidate.position_id).name.toLowerCase().includes(searchQuery.toLowerCase());
                                                return userMatches || candidateMatches || position;
                                            })
                                            .map(({ id, voter_id, user, candidate, election_id, vote_timestamp }) => {



                                                const formatDate = (dateString) => {
                                                    const date = new Date(dateString);
                                                    return date.toLocaleString(); // or use other methods to format the date
                                                };

                                                return (
                                                    <tr key={id}>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {id}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {voter_id}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {user.name}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>


                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {`${candidate.first_name} ${candidate.last_name}`}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {candidate.position_id ? positions.find(position => position.id === candidate.position_id).name : ''}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {election_id}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {new Date(vote_timestamp).toLocaleString()}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex gap-2">
                                                                <Tooltip content="View Vote">
                                                                    <IconButton variant="text" className="bg-blue-700 text-white" onClick={() => handleOpen(id)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                                        </svg>
                                                                    </IconButton>
                                                                </Tooltip>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                )}
                            </table>
                        </TabPanel>
                        <TabPanel value="students_not_voted">
                            <div >
                                <table className="mt-4 w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {VOTER_NOT_VOTED_TABLE_HEAD.map((head, index) => (
                                                <th
                                                    key={head}
                                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                                >
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                                    >
                                                        {head}{" "}
                                                        {index !== VOTER_NOT_VOTED_TABLE_HEAD.length - 1 && (
                                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                                        )}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            voters
                                                .filter((voter) => !votes.some(vote => vote.voter_id === voter.id))

                                                .map((voter, index) => (

                                                    <tr key={index}>
                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {voter.id}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {voter.id}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex flex-col">
                                                                    <Typography
                                                                        variant="small"
                                                                        color="blue-gray"
                                                                        className="font-normal"
                                                                    >
                                                                        {voter.name}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {currentPage} of {totalPages}
                </Typography>
                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        size="sm"
                        onClick={handlePreviousPage} // Corrected
                        disabled={currentPage === 1 || searchQuery !== ""}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || searchQuery !== ""}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>

        </Card >

    )
}

export default VoteTable
