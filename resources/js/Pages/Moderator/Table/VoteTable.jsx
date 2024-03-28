import React, { useState } from 'react'
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
} from "@material-tailwind/react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from '@inertiajs/inertia-react';



const VoteTable = ({ votes, voters, candidates }) => {

    const TABLE_HEAD = ["ID", "Voter ID", "Voter's Name", "Candidate Voted For", "Election ID", "Vote Timestamp", "Action"];
    const [open, setOpen] = useState(false);


    console.log(votes);

    const { data, setData, post, errors } = useForm({

    });

    const handleOpen = () => {

    }
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
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
                    <Dialog open={open} handler={handleOpen}>
                        <DialogBody>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <InputLabel htmlFor="positionName" value="Enter Position Name" />
                                    <TextInput
                                        id="positionName"
                                        className="mt-1 block w-full"
                                        name="name"
                                        value={data.name || ''}
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                    />
                                    <InputError>{errors.positionName}</InputError>
                                </div>
                                <DialogFooter>
                                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="blue" type="submit">
                                        <span>Confirm</span>
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogBody>
                    </Dialog>
                </div>
                <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
                    <div className='flex justify-start gap-2'>
                        <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md'>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </svg>


                        </div>
                        <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                            </svg>

                        </div>
                    </div>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
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

                    <tbody>
                        {votes.map(({ id, voter_id, user, candidate, vote_timestamp }) => {

                            const classes = "p-4 border-b border-blue-gray-50";

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
                                                {candidate.position}
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
                                                {vote_timestamp}
                                            </Typography>
                                        </div>
                                    </td>

                                    <td className={classes}>
                                        <div className="flex gap-2">
                                            <Tooltip content="View Vote">
                                                <IconButton variant="text" className="bg-blue-700 text-white">
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

                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>

        </Card>

    )
}

export default VoteTable
