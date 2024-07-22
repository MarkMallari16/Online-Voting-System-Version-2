import React, { useState } from "react";
import UsersPDF from "./UsersPDF";
import { FaRegFilePdf } from "react-icons/fa6";
import {
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
} from "@material-tailwind/react";


import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import toast from 'react-hot-toast';
import { PDFDownloadLink } from "@react-pdf/renderer";
import ExcelExport from "@/Components/ExcelExport";
import { Link, router } from "@inertiajs/react";
import SearchInput from "@/Components/SearchInput";
import AvatarComponent from "@/Components/AvatarComponent";


const LatestUsersTable = ({ TABLE_HEAD, users }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRoleFilter, setSelectedRoleFilter] = useState("");
    
    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const [isSuccessMessage, setIsSuccessMessage] = useState(false);


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

 
    const handleEditUser = () => {

        setIsSuccessMessage(true);
        toast.success("User successfully updated");
        setIsEditUserModalOpen(false);


    };


    const handleDeleteUser = (userId) => {
        router.delete(`/users/${userId}`);

        setIsSuccessMessage(true);
        toast.success("User successfully deleted");
        setIsDeleteUserModalOpen(false);
    };

    const handleSelectedRole = (filter) => {
        setSelectedRoleFilter(filter);
    };

    return (
        <div>
          

            <Card className="h-full w-full ">

                <CardHeader
                    floated={false}
                    shadow={false}
                    className="rounded-none "
                >
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Latest Users
                            </Typography>
                            <Typography
                                color="gray"
                                className="mt-1 font-normal"
                            >
                                See information about latest users
                            </Typography>

                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Link href='users' as='Button'>
                                <Button
                                    color="black"
                                    variant="gradient"
                                    className="flex items-center gap-2   py-2"
                                    size="sm"

                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    View all
                                </Button>
                            </Link>
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
                                {"Export to PDF"}
                            </PDFDownloadLink>
                        </div>
                        <div className="w-full md:w-40 lg:w-40 ">
                            <ExcelExport data={users} fileName="user" />
                        </div>
                       

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

                                            return (
                                                <tr key={id}>
                                                    <td className="p-4 ">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {id}
                                                        </Typography>
                                                    </td>
                                                    <td className="p-4 ">
                                                        <div className="flex items-center gap-2 ">
                                                            <AvatarComponent Profile={profile_picture} size="sm" />
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {name}
                                                            </Typography>
                                                        </div>
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
                                                    <td className="p-4 w-52 ">
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
                                                    <td className="p-4 w-52 ">
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
                                                  
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        )}
                    </table>
                </CardBody>

            </Card>
          

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

export default LatestUsersTable;
