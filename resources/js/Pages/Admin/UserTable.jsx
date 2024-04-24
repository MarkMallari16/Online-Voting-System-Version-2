import React, { useState } from "react";
import UsersPDF from "./UsersPDF";
import { FaRegFilePdf, FaRegFileExcel } from "react-icons/fa6";
import { SiMicrosoftexcel } from "react-icons/si";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
   
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon} from "@heroicons/react/24/solid"
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
    Alert,
} from "@material-tailwind/react";

import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { Inertia } from "@inertiajs/inertia";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ExcelExport from "@/Components/ExcelExport";

const UserTable = ({
    TABLE_HEAD,
    users,
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterValue, setFilterValue] = useState("");

    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    //message
    const [message, setMessage] = useState(null);
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    //filtered users
    const filteredUsers = users.filter((user) => {
        if (filterValue && searchQuery) {
            return (
                user.role.toLowerCase() === filterValue.toLowerCase() &&
                Object.values(user).some(
                    (value) =>
                        value &&
                        typeof value === "string" &&
                        value.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else if (filterValue) {
            return user.role.toLowerCase() === filterValue.toLowerCase();
        } else if (searchQuery) {
            return Object.values(user).some(
                (value) =>
                    value &&
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchQuery.toLowerCase())
            );
        } else {
            return true;
        }
    });

    //handle previous page
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    //handle next page
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    //handle add in add user modal
    const handleAddUser = async () => {
        try {
            setIsSuccessMessage(true);
            setMessage("User added successfully!");
            setIsAddUserModalOpen(false);
        } catch (error) {
            console.error("Error adding user:", error);
            setIsSuccessMessage(false);
        }
    };

    //handle the user in edit user modal
    const handleEditUser = async () => {
        try {
            setIsSuccessMessage(true);
            setMessage("User updated successfully!");
            setIsEditUserModalOpen(false); // Close the edit user modal
        } catch (error) {
            console.error("Error editing user:", error);
            setIsSuccessMessage(false);
        }
    };

    //handle the user in delete user modal
    const handleDeleteUser = async (userId) => {
        try {
            await Inertia.delete(`/users/${userId}`);
            setIsSuccessMessage(true);
            setMessage("User deleted successfully");
            setIsDeleteUserModalOpen(false);
        } catch (error) {
            console.error("Error deleting user:", error.message);
            setIsSuccessMessage(false);
        }
    };

    const handleFilter = (e) => {
        const selectedValue = e.target.value;
        setFilterValue(selectedValue);
     
    };

    return (
        <div>
            <div className="mb-5">
                {isSuccessMessage && <Alert color="green">{message}</Alert>}
            </div>

            <Card className="h-full w-full p-4 ">
                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none"
                >
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Users list
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                See information about all users
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button
                                className="flex items-center gap-3 bg-blue-500"
                                size="sm"
                                onClick={() => setIsAddUserModalOpen(true)}
                            >
                                <UserPlusIcon
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                />{" "}
                                Add user
                            </Button>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col items-center justify-end md:flex-row">
                        <div className="flex items-center gap-2 cursor-pointer border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md">
                            <div>
                                <FaRegFilePdf className="text-xl" />
                            </div>
                            <PDFDownloadLink
                                document={<UsersPDF users={users} />}
                                fileName="users.pdf"
                            >
                                {({ blob, url, loading, error }) =>
                                    "Export to PDF"
                                }
                            </PDFDownloadLink>
                        </div>
                        <ExcelExport data={users} fileName="user" />

                        <div className="relative flex gap-2 cursor-pointer border-1  text-gray-800 px-2 py-2 rounded-md">
                            <div className="absolute p-3 textblue">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                                    />
                                </svg>
                            </div>

                            <select
                                variant="outlined"
                                label="Filter by"
                                onChange={handleFilter}
                                className=" border-1 text-right rounded-lg w-full md:w-48 "
                                value={filterValue}
                            >
                                <option value="">Filter by</option>
                                <option value="admin">Admin</option>
                                <option value="moderator">Moderator</option>
                                <option value="voter">Voter</option>
                                <option value="partylist_editor">
                                    Partylist Editor
                                </option>
                            </select>
                        </div>
                        <div className="flex w-full md:w-72">
                            <Input
                                label="Search"
                                icon={
                                    <MagnifyingGlassIcon className="h-5 w-5" />
                                }
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    console.log(searchQuery);
                                }}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll overflow-x-auto">
                    <table className="mt-4 min-w-full table-auto text-left">
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
                                            {index !==
                                                TABLE_HEAD.length - 1 && (
                                                    <ChevronUpDownIcon
                                                        strokeWidth={2}
                                                        className="h-4 w-4"
                                                    />
                                                )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {filteredUsers.length === 0 ? (
                            <tbody>
                                <tr className="text-center">
                                    <td
                                        colSpan="9"
                                        className="py-10 text-center"
                                    >
                                        No matching users found.
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {filteredUsers.map(
                                    (
                                        {
                                            id,
                                            name,
                                            profile_picture,
                                            email,
                                            role,
                                            created_at,
                                            updated_at,
                                            email_verified_at,
                                        },
                                        index
                                    ) => {
                                        const isLast =
                                            index === users.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={id}>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {id}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {name}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        <Avatar
                                                            src={
                                                                profile_picture
                                                            }
                                                        />
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {email}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {role}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {new Date(
                                                            created_at
                                                        ).toLocaleString()}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {new Date(
                                                            updated_at
                                                        ).toLocaleString()}
                                                    </Typography>
                                                </td>
                                                <td className="p-5">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className={`text-white font-semibold text-center rounded-md  px-2 py-2  ${email_verified_at
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {email_verified_at
                                                            ? "VERIFIED"
                                                            : "UNVERIFIED"}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex gap-3">
                                                        <Tooltip
                                                            content="Update User"
                                                            className="bg-amber-700"
                                                        >
                                                            <IconButton
                                                                className="bg-amber-700 "
                                                                variant="text"
                                                                onClick={() => {
                                                                    setSelectedUser(
                                                                        {
                                                                            id,
                                                                            name,
                                                                            email,
                                                                            role,
                                                                            created_at,
                                                                            updated_at,
                                                                        }
                                                                    );
                                                                    setIsEditUserModalOpen(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                            <PencilIcon className="h-5 w-5 text-white" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip
                                                            content="Delete User"
                                                            className="bg-red-700"
                                                        >
                                                            <IconButton
                                                                className="bg-red-700 "
                                                                variant="text"
                                                                onClick={() => {
                                                                    setSelectedUserId(
                                                                        id
                                                                    );
                                                                    setIsDeleteUserModalOpen(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="w-5 h-5 text-white"
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
                                    }
                                )}
                            </tbody>
                        )}
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                    >
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <div className="flex gap-2">
                        <Button
                            variant="outlined"
                            size="sm"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outlined"
                            size="sm"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
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
            <div id="pdf-content" className="hidden">
                <UsersPDF users={users} />
            </div>
        </div>
    );
};

export default UserTable;
