import React, { useState } from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/outline";

import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Select,
    Option,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Text
} from "@material-tailwind/react";


import { useForm } from '@inertiajs/inertia-react';


const ModeratorDashboard = ({ TABLE_HEAD, users, setUsers, currentPage, totalPages, setCurrentPage }) => {
    // if (!users || !Array.isArray(users)) {
    //     return <div>No user data available.</div>;
    // }
    const [searchQuery, setSearchQuery] = useState('');

    //filtered users
    const filteredUsers = users.filter((user) =>
        Object.values(user).some(
            (value) =>
                value &&
                typeof value === 'string' &&
                value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    //handle previous page
    const handlePreviousPage = () => {
        console.log("Previous page clicked");
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    //handle next page
    const handleNextPage = () => {
        console.log("Next page clicked");
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    //handle modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((prevOpen) => !prevOpen);
    

    //handle user
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        role: "",
        password_confirmation: "",
    });

    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        post(route("users.store"), {
            onSuccess: () => {
                setOpen();
                reset();
                // Assuming you get the updated user list after successful submission
                // and set it using setUsers
                // For demonstration purposes, you can fetch the updated user list here
                // Example: fetchUpdatedUserList().then(updatedUsers => setUsers(updatedUsers));
            },
        });
    };



    return (
        <div >
            <Card className="h-full w-full p-1">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Users list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all users
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

                            <Button className="flex items-center gap-3 bg-blue-500" size="sm" onClick={handleOpen}>
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add candidate
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-4 md:flex-row ">

                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                onChange={(e) => setSearchQuery(e.target.value)}

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
                            {filteredUsers.length === 0 ? (
                                <tr >
                                    <td colSpan="7" className="p-4 text-center text-blue-gray">
                                        No matching users found.
                                    </td>
                                </tr>
                            ) :

                                filteredUsers.map(
                                    ({ id, name, email, role, created_at, updated_at }, index) => {
                                        const isLast = index === users.length - 1; // Corrected line
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={id}>
                                                <td className='p-4'>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {id}
                                                    </Typography>
                                                </td>
                                                <td className='p-4'>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className='p-4'>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {email}
                                                    </Typography>
                                                </td>
                                                <td className='p-4'>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {role}
                                                    </Typography>
                                                </td>
                                                <td className='p-4'>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {created_at}
                                                    </Typography>
                                                </td>
                                                <td className='p-4'>
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {updated_at}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Tooltip content="Edit User" className='bg-amber-700'>
                                                        <IconButton variant="text">
                                                            <PencilIcon className="text-amber-500  h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Delete User" className='bg-red-900'>
                                                        <IconButton variant="text">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-400">
                                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                            </svg>


                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    },
                                )
                            }
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </div>
                </CardFooter>

            </Card>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Add User</DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody>

                        <div className="w-100 mb-3">
                            <Input type="text" label="Name" name="name" onChange={handleOnChange} />
                            {errors.name && <Text color="red">{errors.name}</Text>}
                        </div>
                        <div className="w-100 mb-3">
                            <Input type="email" label="Email" name="email" onChange={handleOnChange} />
                            {errors.email && <Text color="red">{errors.email}</Text>}
                        </div>
                        <div className="w-100 mb-3" >
                            <Select label="Role" name="role" onChange={(value) => setData({ ...data, role: value })} >
                                <Option value='admin'>Admin</Option>
                                <Option value='moderator'>Moderator</Option>
                                <Option value='partylist_editor'>Partylist Editor</Option>
                                <Option value='voter'>Voter</Option>
                            </Select>
                            {errors.role && <Text color="red">{errors.role}</Text>}
                        </div>
                        <div className="w-100 mb-3">
                            <Input type='password' label="Password" name="password" onChange={handleOnChange} />
                            {errors.password && <Text color="red">{errors.password}</Text>}
                        </div>
                        <div className="w-100 mb-3">
                            <Input type='password' label="Confirm Password" name="password_confirmation" onChange={handleOnChange} />
                            {errors.password_confirmation && <Text color="red">{errors.password_confirmation}</Text>}
                        </div>

                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"

                        >
                            <span>Cancel</span>
                        </Button>
                        <Button type='submit' variant="gradient" color="blue"  >
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </div >
    )
}

export default ModeratorDashboard