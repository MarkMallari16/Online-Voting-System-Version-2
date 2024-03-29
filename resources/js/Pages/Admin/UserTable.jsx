import React, { useState } from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import StatusMessage from '@/Components/StatusMessage';
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
    Avatar,
} from "@material-tailwind/react";

import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import { Inertia } from '@inertiajs/inertia';

const UserTable = ({ TABLE_HEAD, users, currentPage, totalPages, setCurrentPage }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);


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



    //message
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);


    //handle add in add user modal
    const handleAddUser = async () => {
        try {
            setIsSuccessMessage(true)
            setIsAddUserModalOpen(false);
        } catch (error) {

            console.error('Error adding user:', error);
            setIsSuccessMessage(false); // Set success message to false in case of an error

        }
    }
    //handle the user in edit user modal
    const handleEditUser = async () => {
        try {
            setIsSuccessMessage(true);
            setIsEditUserModalOpen(false); // Close the edit user modal
        } catch (error) {
            // Handle error and show error message if needed
            console.error('Error editing user:', error);
            setIsSuccessMessage(false); // Set success message to false in case of an error
        }
    }
    //handle the user in delete user modal
    const handleDeleteUser = async (userId) => {
        try {
            await Inertia.delete(`/users/${userId}`);
            // setIsSuccessMessage(true);
            setIsDeleteUserModalOpen(false);
        } catch (error) {
            console.error("Error deleting user:", error.message);
            setIsSuccessMessage(false);
        }
    };


    return (
        <div>
            {isSuccessMessage && <StatusMessage color="green" info="User Deleted Successfully" />}
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

                            <Button className="flex items-center gap-3 bg-blue-500" size="sm" onClick={() => setIsAddUserModalOpen(true)}>
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add user
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col items-center justify-end md:flex-row  ">
                        <div className='flex justify-start gap-2'>
                            <div className='bg-blue-500 text-white px-2 py-2 rounded-md'>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z" clipRule="evenodd" />
                                </svg>


                            </div>
                            <div className='bg-blue-500 text-white px-2 py-2 rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                                    <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>



                            </div>
                        </div>
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
                                <tr className='text-center'>
                                    <td colSpan="8" className="py-8">No matching users found.</td>
                                </tr>
                            ) :

                                filteredUsers.map(
                                    ({ id, name, profile_picture, email, role, created_at, updated_at, email_verified_at }, index) => {
                                        const isLast = index === users.length - 1;
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
                                                        <Avatar src={profile_picture} />
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
                                                <td className='p-5'>
                                                    <Typography variant="small" color="blue-gray" className={`text-white font-semibold text-center rounded-md py-2  ${email_verified_at ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {email_verified_at ? "VERIFIED" : "UNVERIFIED"}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Tooltip
                                                        content="Edit User"
                                                        className="bg-amber-700"

                                                    >
                                                        <IconButton variant="text" onClick={() => {
                                                            setSelectedUser({
                                                                id,
                                                                name,
                                                                email,
                                                                role,
                                                                created_at,
                                                                updated_at,
                                                            });
                                                            setIsEditUserModalOpen(true);
                                                        }}>
                                                            <PencilIcon className="text-amber-500  h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content="Delete User" className='bg-red-900'>
                                                        <IconButton
                                                            variant="text"
                                                            onClick={() => {
                                                                setSelectedUserId(id);
                                                                setIsDeleteUserModalOpen(true);
                                                            }}
                                                        >
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
            <AddUserModal
                open={isAddUserModalOpen}
                handleClose={() => setIsAddUserModalOpen(false)}
                handleAddUser={handleAddUser}
            />

            <EditUserModal
                open={isEditUserModalOpen}
                handleClose={() => setIsEditUserModalOpen(false)}
                user={selectedUser}
                handleEditUser={handleEditUser}

            />
            <DeleteUserModal
                open={isDeleteUserModalOpen}
                handleClose={() => setIsDeleteUserModalOpen(false)}
                handleDeleteUser={handleDeleteUser}
                userId={selectedUserId}
            />
        </div >
    )
}

export default UserTable