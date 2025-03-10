import React, { useState } from "react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
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
import { useForm, router, usePage } from "@inertiajs/react";


import ExcelExport from "@/Components/ExcelExport";
import DeleteModal from "@/Components/DeleteModal";
import CustomToast from "@/Components/CustomToast";
import toast from "react-hot-toast";
import PaginationInTable from "@/Components/PaginationInTable";
import SearchInput from "@/Components/SearchInput";



const TABLE_HEAD = ["Position ID", "Position", "Action"];


export function PositionsTable(props) {

    const { data, setData, post, put, delete: destroy, errors, processing, reset } = useForm();

    const [id, setId] = useState(null);
    const { election } = usePage().props;

    //modals
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [openDeleteModal, setDeleteModal] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    const positionsPerPage = props.positionsPerPage.data;

    //modal add
    const handleAddOpen = () => {
        setOpenAddModal(!openAddModal)
        setData('name', '');
    };
    console.log(positionsPerPage)
    const handleAddSubmit = (e) => {
        e.preventDefault();

        post(route('positions.store', data), {
            onSuccess: () => {
                setOpenAddModal(false);
                setIsSuccessMessage(true);
                toast.success("Position created successfully")
            },
            onError: () => {
                setOpenAddModal(true);
            },
            preserveScroll: true,

        });
    };
    //modal update
    const handleUpdateOpen = (id) => {
        setUpdateModal(!openUpdateModal);
        setId(id);
        // Set the initial value of the input field to the current position name
        const positionToUpdate = positionsPerPage.find(position => position.id === id);
        // console.log("positionToUpdate:", positionToUpdate); // Add this line for debugging
        if (positionToUpdate) {
            setData({ 'name': positionToUpdate.name });

        } else {
            setData({ name: '' })
        }
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        // Send a PUT request to '/positions/{id}'
        put(route('positions.update', { id: id }, data), {
            onSuccess: () => {
                setIsSuccessMessage(true);
                toast.success("Position updated successfully")
                setUpdateModal(false);
            },
            preserveScroll: true
        });
    };

    //modal for delete
    const handleDeleteOpen = (id) => {
        setDeleteModal(!openDeleteModal)
        setId(id);
    };

    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const handleDeletePositions = (positionId) => {
        try {

            destroy(`/position/${positionId}`);


            toast.success("Position deleted successfully")
            setIsSuccessMessage(true);

            setDeleteModal(false);

        } catch (error) {
            console.error('Failed to delete position:', error);
        }
    };

    return (
        <div>
            {isSuccessMessage && <CustomToast />}
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

                            <Button className="flex items-center gap-3 bg-blue-500" size="sm" onClick={handleAddOpen} disabled={election.status === "Active"}>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-4 h-4">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                                Add position
                            </Button>


                        </div>
                        {/*Dialog for add */}
                        <Dialog open={openAddModal} handler={handleAddOpen}>
                            <DialogHeader>Add Position</DialogHeader>
                            <form onSubmit={handleAddSubmit}>
                                <DialogBody>

                                    <div>
                                        <InputLabel htmlFor="positionName" value="Position Name" />
                                        <TextInput
                                            id="positionName"
                                            className="mt-1 block w-full"
                                            name="name"
                                            value={data.name || ''}
                                            onChange={handleChange}

                                            autoFocus
                                            placeholder="Enter position name"
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>


                                </DialogBody>
                                <DialogFooter>
                                    <Button variant="text" color="red" onClick={handleAddOpen} className="mr-1">
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="blue" type="submit" disabled={processing}>
                                        <span>Confirm</span>
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Dialog>

                        {/*Dialog for update*/}
                        <Dialog open={openUpdateModal} handler={handleUpdateOpen}>
                            <DialogHeader>Update Position</DialogHeader>
                            <form onSubmit={handleUpdateSubmit}>
                                <DialogBody>

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


                                </DialogBody>
                                <DialogFooter>
                                    <Button variant="text" color="red" onClick={handleUpdateOpen} className="mr-1" >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="blue" type="submit" disabled={processing}>
                                        <span>Confirm</span>
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Dialog>

                    </div>
                    <div className="flex flex-col items-center justify-end gap-2 md:flex-row me-3 mb-1">
                        <div className='flex justify-start gap-2'>
                            <ExcelExport data={positionsPerPage} fileName="positions" />

                        </div>
                        <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
                        {positionsPerPage.length === 0 || positionsPerPage.filter(position =>
                            position.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan="3" className="text-center py-4 ">
                                        No position found
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {positionsPerPage
                                    .filter(position => position.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(({ id, name }) => {

                                        const classes = "p-4 border-b border-blue-gray-50";


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

                                                <td className={classes}>
                                                    <div className="flex gap-2">
                                                        <Tooltip content="Edit Position">
                                                            <IconButton variant="text" className="bg-amber-700 text-white"
                                                                onClick={() => handleUpdateOpen(id)}
                                                                disabled={election.status === "Active"}>
                                                                <PencilIcon className="h-5 w-5" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip content="Delete Position">
                                                            <IconButton
                                                                variant="text"
                                                                className="bg-red-700 text-white"
                                                                onClick={() => handleDeleteOpen(id)}
                                                                disabled={election.status === "Active"}
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
                    <PaginationInTable dataPerPage={props.positionsPerPage} />
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