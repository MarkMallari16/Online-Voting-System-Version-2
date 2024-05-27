import React, { useState } from 'react'
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
import PaginationInTable from '@/Components/PaginationInTable';
import SearchInput from '@/Components/SearchInput';


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

const VoteTable = ({ votes, votesPerPage, voters }) => {
    const TABLE_HEAD = ["Voter ID", "Voter's Name", "Election Name", "Status", "Vote Timestamp", "Action"];
    const VOTER_NOT_VOTED_TABLE_HEAD = ["#", "Voter ID", "Voter's Name",];

    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const [selectedVote, setSelectedVote] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const handleOpen = (id) => {
        setOpen(!open);

        const vote = votes.find((vote) => vote.voter_id === id);
        setId(id);

        console.log(id);
        if (vote) {
            setSelectedVote(vote);
        } else {
            setSelectedVote(null); // Or any other appropriate value
        }
    }

    const handleClose = () => {
        setOpen(false);
    }
    console.log(votes);

    const exportVotesExcel = votes.map((vote) => {
        return {
            'Voter ID': vote.voter_id,
            "Voter's": vote.user.name,
            'Election Name': vote?.election?.title,
            'Status': vote.vote_timestamp && 'Voted',
            'Date & Time': vote.vote_timestamp,
        }
    })


    const classes = "p-4 border-b border-blue-gray-50";
    return (
        <Card className="h-full w-full ">
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
                    {/*Modal* */}
                    <Dialog open={open} size='md' handler={handleOpen}>
                        {selectedVote && (
                            <>
                                <DialogHeader className='flex gap-1 text-gray-900'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>

                                    </div>
                                    Vote Details
                                </DialogHeader>
                                <DialogBody>
                                    <div >
                                        <div>
                                            <div className=' text-gray-900 '>
                                                <div className='flex items-center gap-1 text-xl font-medium '>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                                    </svg>

                                                    <div className='font-normal'>
                                                        Voter Information
                                                    </div>
                                                </div>

                                                <div className='flex items-center  mt-2 gap-2 text-lg'>

                                                    Voter's ID:
                                                    <div>{selectedVote.user.id}</div></div>
                                            </div>

                                            <div className='text-lg text-gray-900 flex items-center gap-2'>

                                                <div>Voter's Name: <span>{selectedVote.user.name}</span></div>
                                            </div>
                                        </div>

                                        <div className='text-xl text-gray-900 font-medium mt-4 flex items-center gap-2'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                                </svg>
                                            </div>
                                            <div className='font-normal'>Election Title:</div>
                                            <div className='font-normal'>{selectedVote.election.title}</div>

                                        </div>

                                        <div className='text-xl text-gray-900 font-medium mt-4 flex items-center gap-2'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>

                                            </div>
                                            <div className='font-normal'>Date & Time:</div>
                                            <div className='font-normal'>
                                                {new Date(selectedVote.vote_timestamp).toLocaleString()}
                                            </div>

                                        </div>
                                    </div>
                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        variant="text"
                                        color="red"
                                        onClick={handleClose}
                                        className="mr-1"
                                    >
                                        <span>Close</span>
                                    </Button>

                                </DialogFooter>
                            </>
                        )}
                    </Dialog>
                </div>

                <div className="flex flex-col items-center justify-end gap-2 md:flex-row me-3 mb-1">
                    <div className='flex  gap-2'>
                        <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-m hidden'>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>


                        </div>
                        <ExcelExport data={exportVotesExcel} fileName='votes' />
                    </div>
                    <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <Tabs value="students_voted">
                    <div className="w-full px-5 ">
                        <TabsHeader >
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>

                    </div>
                    <TabsBody>
                        <TabPanel value="students_voted" className='px-0'>
                            <table className="w-full min-w-max table-auto text-left">
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

                                {votesPerPage?.data.length === 0 || votesPerPage?.data.filter(vote => {
                                    const userMatches = vote?.user?.name.toLowerCase().includes(searchQuery.toLowerCase());
                                    const election = vote?.election?.title.toLowerCase().includes(searchQuery.toLowerCase());
                                    // const position = positions.find(position => position?.id === vote?.candidate?.position_id)?.name?.toLowerCase().includes(searchQuery.toLowerCase());

                                    // const isNotAbstained = vote.isAbstained === 0;
                                    return (userMatches || election);
                                }).length === 0 ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan="8" className="text-center py-5 text-gray-900 ">
                                                No votes found
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        {votesPerPage?.data
                                            .filter(vote => {
                                                const userMatches = vote?.user?.name.toLowerCase().includes(searchQuery.toLowerCase());
                                                const election = vote?.election?.title.toLowerCase().includes(searchQuery.toLowerCase());
                                                // const position = positions?.find(position => position?.id === vote.candidate?.position_id)?.name?.toLowerCase().includes(searchQuery.toLowerCase());
                                                // const isNotAbstained = vote.isAbstained === 0;

                                                return (userMatches || election);
                                            })
                                            .map(({ voter_id, user, election, vote_timestamp }) => {



                                                const formatDate = (dateString) => {
                                                    const date = new Date(dateString);
                                                    return date.toLocaleString();
                                                };

                                                return (
                                                    <tr key={voter_id}>

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
                                                                        {user?.name}
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
                                                                    {election?.title}
                                                                </Typography>
                                                            </div>
                                                        </td>
                                                        <td className={classes}>
                                                            <div className="flex flex-col ">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="text-center py-2 rounded-md  bg-green-200 text-green-900 text-md font-bold"
                                                                >
                                                                    {vote_timestamp && 'Voted'}
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
                                                                    {formatDate(vote_timestamp)}
                                                                </Typography>
                                                            </div>
                                                        </td>

                                                        <td className={classes}>
                                                            <div className="flex gap-2">
                                                                <Tooltip content="View Vote">
                                                                    <IconButton variant="text" className="bg-blue-700 text-white" onClick={() => handleOpen(voter_id)}>
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


                        <TabPanel value="students_not_voted" className='px-0'>
                            <div >
                                <table className=" w-full min-w-max table-auto text-left">
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
                                            voters.data.length === 0 ||
                                                voters.data.filter((voter) => !votes.some(vote => vote.voter_id === voter.id)).length === 0 ||
                                                voters.data.filter((voter) => {
                                                    const voterName = voter.name.toLowerCase().includes(searchQuery.toLowerCase());
                                                    return voterName;
                                                }).length === 0 ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center py-5 text-gray-900 ">
                                                        No voters found
                                                    </td>
                                                </tr>
                                            ) : (

                                                voters.data
                                                    .filter((voter) => !votes.some(vote => vote.voter_id === voter.id))
                                                    .filter((voter) => {
                                                        const voterName = voter.name.toLowerCase().includes(searchQuery.toLowerCase());

                                                        return voterName;
                                                    })
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
                                                    ))
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>


                    </TabsBody>
                </Tabs>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <PaginationInTable dataPerPage={votesPerPage} />
            </CardFooter>

        </Card >

    )
}

export default VoteTable
