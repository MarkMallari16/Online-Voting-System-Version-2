import React, { useState } from "react";
import UsersPDF from "./UsersPDF";
import { FaRegFilePdf } from "react-icons/fa6";

import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,

    UserPlusIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid"
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

import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import toast from 'react-hot-toast';
import { PDFDownloadLink } from "@react-pdf/renderer";
import ExcelExport from "@/Components/ExcelExport";
<<<<<<< HEAD
import { router } from "@inertiajs/react";
import CustomToast from "@/Components/CustomToast";
import PaginationInTable from "@/Components/PaginationInTable";
import SearchInput from "@/Components/SearchInput";
import AvatarComponent from "@/Components/AvatarComponent";
import FilterDropdown from "@/Components/FilterDropdown";

const UserTable = ({ TABLE_HEAD, users, usersPerPage, }) => {
    console.log(users);
=======

const UserTable = ({
    TABLE_HEAD,
    users,
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRoleFilter, setSelectedRoleFilter] = useState(null);

    //modal
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
    //getting id
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [isSuccessMessage, setIsSuccessMessage] = useState(false);



    //filtered users
    const filteredUsers = users.filter((user) => {
        if (searchQuery) {
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

    //handle add in add user modal
    const handleAddUser = () => {

        setIsSuccessMessage(true);
        setIsAddUserModalOpen(false);
        toast.success("User successfully added");
    };

    //handle the user in edit user modal
    const handleEditUser = () => {

        setIsSuccessMessage(true);
        toast.success("User successfully updated");
        setIsEditUserModalOpen(false);


    };

    //handle the user in delete user modal
    const handleDeleteUser = (userId) => {
        router.delete(`/users/${userId}`);

        setIsSuccessMessage(true);
        toast.success("User successfully deleted");
        setIsDeleteUserModalOpen(false);

<<<<<<< HEAD

=======
        } catch (error) {
            console.error("Error deleting user:", error.message);
            setIsSuccessMessage(false);
        }
    };

    const handleFilter = (e) => {
        const selectedValue = e.target.value;
        setFilterValue(selectedValue);
        console.log(selectedValue);
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
    };


    console.log(usersPerPage);
    const roleOptions = [
        { value: '', label: 'All' },
        { value: 'admin', label: 'Admin' },
        { value: 'moderator', label: 'Moderator' },
        { value: 'voter', label: 'Voter' },
        { value: 'partylist_editor', label: 'Partylist Editor' }
    ]

    const handleSelectedRole = (filter) => {
        setSelectedRoleFilter(filter);

    };
    console.log(users);
    return (
        <div>
            <div className="mb-5">
                {isSuccessMessage && <CustomToast />}
            </div>

            <Card className="h-full w-full">

                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none "
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
                                className="flex items-center gap-3 bg-blue-500 py-2"
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



                </CardHeader>
                <div className=" ">
                    <div className="flex gap-2 justify-end items-center me-3 flex-wrap mb-1">
                        <div className="flex justify-start md:justify-end lg:justify-end xl:justify-end items-center gap-2 cursor-pointer ring-1 ring-inset ring-gray-300 text-gray-900 px-3 py-2 rounded-lg w-full md:w-40 lg:w-40  ">
                            <div>
                                <FaRegFilePdf className="text-xl text-gray-900" />
                            </div>
                            <PDFDownloadLink
                                document={<UsersPDF users={users} />}
                                fileName="users.pdf"
                            >
                                {({ blob, url, loading, error }) => "Export to PDF"}
                            </PDFDownloadLink>
                        </div>
                        <div className="w-full md:w-40 lg:w-40 ">
                            <ExcelExport data={users} fileName="user" />
                        </div>
                        <Tooltip content="Filter by"
                            className="bg-gray-300">
                            <FilterDropdown onSelectFilter={handleSelectedRole} options={roleOptions} />
                        </Tooltip>

                        <div>
                            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        </div>
                    </div>
                </div>
                <CardBody className="overflow-scroll overflow-x-auto p-0 z-0 ">
                    <table className="mt-4 min-w-full table-auto text-left ">
                        <div className="z-50">

                        </div>
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

                        {filteredUsers.length === 0 || filteredUsers.filter(user =>
                            selectedRoleFilter ? user.role === selectedRoleFilter : true ||
                                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.role.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                            <tbody>
                                <tr className="text-center">
                                    <td
                                        colSpan="10"
                                        className="py-5 text-center"
                                    >
                                        No matching users found.
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {filteredUsers
                                    .filter(user => (
                                        selectedRoleFilter ? user.role === selectedRoleFilter : true
                                    ))
                                    .map(
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

<<<<<<< HEAD
                                            return (
                                                <tr key={id}>
                                                    <td className="p-4">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
=======
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
                                                <td className="p-4 ">
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
                                                            content="Edit User"
                                                            className="bg-amber-700"
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
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
                                                            <AvatarComponent Profile={profile_picture} />
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
                                                    <td className="p-4 ">
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
                                                                content="Edit User"
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
                    <PaginationInTable dataPerPage={usersPerPage} />
                </CardFooter>
            </Card>
            <AddUserModal
                open={isAddUserModalOpen}
                handleClose={() => setIsAddUserModalOpen(false)}
                handleAddUser={handleAddUser}
                setIsSuccessMessage={setIsSuccessMessage}

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

        </div>
    );
};

export default UserTable;
