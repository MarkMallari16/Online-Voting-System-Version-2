import React, { useState } from "react";
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
    Alert
} from "@material-tailwind/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Modal from "@/Components/Modal";
import axios from "axios";

const TABLE_HEAD = ["Position ID", "Position", "Action"];


export function PositionsTable(props) {

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);
    const [id, setId] = useState(null);
    const [positions, setPositions] = useState(props.positions);
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);


    const { data, setData, post, errors } = useForm({
        positionName: ''
    });
    //modal add
    const handleAddOpen = () => setOpenAddModal(!openAddModal);

    //modal 
    const handleDeleteOpen = (id) => {
        setDeleteModal(!openDeleteModal)
        setId(id);
    };


    const handleAddSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Send a POST request to '/positions.store'
            await post('/positions', data);

            // Close the add modal
            setOpenAddModal(false);
            setMessage('Position successfully added');
            setIsSuccessMessage(true);
            // Reset the positionName field to empty
            setData('positionName', '');
        } catch (error) {
            console.error('Failed to create position:', error);
        }
    };

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleDeletePositions = async (positionId) => {
        try {
            // Send a DELETE request to delete the position
            await Inertia.delete(`/positions/${positionId}`);

            // Update the positions state by filtering out the deleted position
            setPositions(prevPositions => prevPositions.filter(position => position.id !== positionId));
            setMessage('Position successfully deleted');
            setIsSuccessMessage(true);
            // Close the delete modal
            setDeleteModal(false);
        } catch (error) {
            console.error('Failed to delete position:', error);
        }
    };
    return (
        <div>
            <div className="mb-4">
                {isSuccessMessage && <Alert color="green">{message}</Alert>}
            </div>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Positions
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all Candidate Positions
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

                            <Button className="flex items-center gap-3 bg-blue-500" size="sm" onClick={handleAddOpen}>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                                Add position
                            </Button>


                        </div>
                        {/*Dialog for add */}
                        <Dialog open={openAddModal} handler={handleAddOpen}>
                            <DialogHeader>Add Position</DialogHeader>
                            <DialogBody>
                                <form onSubmit={handleAddSubmit}>
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
                                        <Button variant="text" color="red" onClick={handleAddOpen} className="mr-1">
                                            <span>Cancel</span>
                                        </Button>
                                        <Button variant="gradient" color="blue" type="submit">
                                            <span>Confirm</span>
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogBody>
                        </Dialog>

                        {/*Dialog for delete */}
                        <Dialog open={openDeleteModal} handler={handleDeleteOpen}>
                            <DialogHeader>Delete Position</DialogHeader>
                            <div className="p-8 flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-400 w-[150px]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <div className="text-center">
                                <p>Are you sure you want to delete this position?</p>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="black"
                                    onClick={handleDeleteOpen}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    onClick={() => handleDeletePositions(id)}
                                    variant="gradient"
                                    color="red"
                                >
                                    <span>Delete</span>
                                </Button>
                            </DialogFooter>
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
                        {positions.length > 0 && (
                            <tbody>
                                {positions.map(({ id, name, created_at }) => {

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
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </div>
                                            </td>
                                            {/* <td className={classes}>
                                       <div className="flex flex-col">
                                           <Typography
                                               variant="small"
                                               color="blue-gray"
                                               className="font-normal"
                                           >
                                               {formatDate(created_at)}
                                           </Typography>
                                       </div>
                                   </td> */}
                                            {/* <td className={classes}>
                                       <div className="flex flex-col">
                                           <Typography
                                               variant="small"
                                               color="blue-gray"
                                               className="font-normal"
                                           >
                                               {formatDate(updated_at)}
                                           </Typography>
                                       </div>
                                   </td> */}
                                            <td className={classes}>
                                                <div className="flex gap-2">
                                                    <Tooltip content="Edit Position">
                                                        <IconButton variant="text" className="bg-amber-700 text-white">
                                                            <PencilIcon className="h-5 w-5" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Delete Position">
                                                        <IconButton
                                                            variant="text"
                                                            className="bg-red-700 text-white"
                                                            onClick={() => handleDeleteOpen(id)}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                                    clipRule="evenodd"
                                                                />
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
                <Modal />
            </Card>

        </div>

    );
}