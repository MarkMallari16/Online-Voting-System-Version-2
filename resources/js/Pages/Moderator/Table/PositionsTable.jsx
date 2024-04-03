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
import { useForm} from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import Modal from "@/Components/Modal";
import InfoIcon from "@/Components/InfoIcon";
import ExcelExport from "@/Components/ExcelExport";
import DeleteModal from "@/Components/DeleteModal";


const TABLE_HEAD = ["Position ID", "Position", "Action"];


export function PositionsTable(props) {

    const [positions, setPositions] = useState(props.positions);

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const [id, setId] = useState(null);

    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);

    const { data, setData, post, errors } = useForm();

    //modal add
    const handleAddOpen = () => setOpenAddModal(!openAddModal);

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
            setData('name', '');
        } catch (error) {
            console.error('Failed to create position:', error);
        }
    };
    //modal update
    const handleUpdateOpen = (id) => {
        setUpdateModal(!openUpdateModal);
        setId(id);
        // Set the initial value of the input field to the current position name
        const positionToUpdate = positions.find(position => position.id === id);
        // console.log("positionToUpdate:", positionToUpdate); // Add this line for debugging
        if (positionToUpdate) {
            setData('name', positionToUpdate.name);
        } else {
            console.error("Position not found with id:", id);
            setData('name', '');
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a PUT request to '/positions/{id}'
            await Inertia.put(`/positions/${id}`, data);

            // Close the update modal
            setUpdateModal(false);

            setMessage('Position successfully updated');
            setIsSuccessMessage(true);
            // Reset the positionName field to empty
            setData('name', '');
        } catch (error) {
            console.error('Failed to update position:', error);
        }
    };

    //modal for delete
    const handleDeleteOpen = (id) => {
        setDeleteModal(!openDeleteModal)
        setId(id);
        console.log(id);
        console.log(openDeleteModal);
    };

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleDeletePositions = (positionId) => {
        try {
            // Send a DELETE request to delete the position
            Inertia.delete(`/positions/${positionId}`);

            // Update the positions state by filtering out the deleted position
            setPositions(prevPositions => prevPositions.filter(position => position.id !== positionId));
            setMessage(`Position successfully deleted`);
            setIsSuccessMessage(true);
            // Close the delete modal
            setDeleteModal(false);
        } catch (error) {
            console.error('Failed to delete position:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };
    return (
        <div>
            <div className="mb-3">
                {isSuccessMessage && <Alert icon={<InfoIcon />} color="green">{message}</Alert>}
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
                                        <InputError>{errors.name}</InputError>
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

                        {/*Dialog for update*/}
                        <Dialog open={openUpdateModal} handler={handleUpdateOpen}>
                            <DialogHeader>Update Position</DialogHeader>
                            <DialogBody>
                                <form onSubmit={handleUpdateSubmit}>
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
                                        <InputError>{errors.name}</InputError>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="text" color="red" onClick={handleUpdateOpen} className="mr-1">
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
                            <ExcelExport data={positions} fileName="positions" />
                        </div>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchQuery}
                                onChange={handleSearch}
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
                        {positions.length > 0 ? (
                            <tbody>
                                {positions
                                    .filter(position => position.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(({ id, name, created_at }) => {

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
                                                            <IconButton variant="text" className="bg-amber-700 text-white"
                                                                onClick={() => handleUpdateOpen(id)}>
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
                        ) : (
                            <tbody>
                                <tr>
                                    <td colSpan="3" className="text-center py-4 text-gray-500">
                                        No position found
                                    </td>
                                </tr>
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

                <DeleteModal
                    open={openDeleteModal}
                    handleDeleteOpen={handleDeleteOpen}
                    handleDeleteData={handleDeletePositions}
                    id={id}
                    dataName="Position"
                />
            </Card>

        </div>

    );
}