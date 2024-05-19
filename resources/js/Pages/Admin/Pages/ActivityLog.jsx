import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Avatar, IconButton, Spinner, Tooltip } from "@material-tailwind/react";

import ExcelExport from "@/Components/ExcelExport";
import FilterDropdown from "@/Components/FilterDropdown";
import PaginationComponent from "@/Components/PaginationComponent";
import AvatarComponent from "@/Components/AvatarComponent";
import SearchInput from "@/Components/SearchInput";
import Modal from "@/Components/Modal";
const ActivityLog = ({ auth, logs }) => {

    const [selectedFilter, setSelectedFilter] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [openLogModal, setOpenLogModal] = useState(false);
    const [logId, setLogId] = useState(null);
    const [selectedLog, setSelectedLog] = useState();

    useEffect(() => {
        setIsLoading(false);

    }, [logs]);


    const getClassByAction = (action) => {
        switch (action) {
            case "User Created":
                return " bg-green-100 text-green-800 rounded";
            case "User Updated":
                return " bg-blue-100 text-blue-800 rounded";
            case "User Deleted":
                return " bg-red-100 text-red-800 rounded";
            default:
                return " bg-gray-100 text-gray-800 rounded";
        }
    };

    const handleSelectedFilter = (filter) => {
        setSelectedFilter(filter);

    }

    const options = [
        { value: '', label: 'All' },
        { value: 'User Created', label: 'Created' },
        { value: 'User Updated', label: 'Updated' },
        { value: 'User Deleted', label: 'Deleted' }
    ]
    console.log(logs)

    const exportExcellogs = logs.data.map((log) => {
        return {
            "ID": log.user.id,
            "Name": log.user.name,
            "Action": log.action,
            "Details": log.details,
        }
    })
    console.log(selectedLog)
    const handleOpenModal = (id) => {
        setOpenLogModal(true);

        const log = logs.data.find((log) => log.id === id);
        console.log(log);
        setLogId(id);
        setSelectedLog(log);

    }
    const handleCloseModal = () => {
        setOpenLogModal(false);
        setLogId(null);

    };
    const filteredLogs = logs.data.filter(log => {
        const matchesFilter = selectedFilter ? log.action === selectedFilter : true;
        const matchesSearch = log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || log.action.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-xl text-gray-800 leading-tight">
                    Activity Log
                </h2>
            }
        >
            <main className=" py-12">

                <div className=" max-w-full mx-auto px-4 sm:max-w-4xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                    {isLoading ? (
                        <div className="max-w-full mx-auto flex justify-center items-center h-full">
                            <div className="text-center">
                                <Spinner color="blue" className="h-12 w-12" />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>

                                <div className="mb-2">
                                    <div >
                                        <div className="flex justify-between items-center">

                                            <div className="text-lg  font-medium text-gray-900 flex gap-1 ">

                                                <div className="text-2xl">
                                                    Activity
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <div>
                                                    <ExcelExport data={exportExcellogs} fileName='activity_logs' />
                                                </div>
                                                <div >
                                                    <FilterDropdown onSelectFilter={handleSelectedFilter} options={options} />
                                                </div>
                                                <div>
                                                    <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white shadow-md rounded-md overflow-hidden">


                                    <div>

                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        User ID
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                                        Name
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Action
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Details
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        <div>
                                                            Action Button
                                                        </div>

                                                    </th>
                                                </tr>
                                            </thead>
                                            {filteredLogs.length === 0 ? (
                                                <tbody>
                                                    <tr className="text-center">
                                                        <td colSpan="6" className="py-5 text-center text-gray-600">
                                                            No activity logs found.
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody>
                                                    {filteredLogs.map(
                                                        (log, index) => (
                                                            <tr
                                                                key={index}
                                                                className="bg-white"
                                                            >
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                                    {log.user_id}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                                    <div className="flex items-center gap-2">
                                                                        <AvatarComponent Profile={log.user.profile_picture} size="sm" />
                                                                        <span>
                                                                            {
                                                                                log
                                                                                    .user
                                                                                    .name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                                    {new Date(
                                                                        log.created_at
                                                                    ).toLocaleString()}
                                                                </td>
                                                                <td
                                                                    className={`font-medium whitespace-no-wrap text-sm sm:text-base leading-5`}
                                                                >
                                                                    <span
                                                                        className={`${getClassByAction(
                                                                            log.action
                                                                        )} px-2 py-2 sm:px-3 sm:py-2 inline-block w-[140px] text-center`}
                                                                    >
                                                                        {log.action}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 ">
                                                                    {log.details}
                                                                </td>
                                                                <td className="text-center">
                                                                    <Tooltip content="View Log">
                                                                        <div className="cursor-pointer flex justify-center whitespace-no-wrap text-sm leading-5  text-gray-900" onClick={() => handleOpenModal(log.id)}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                                                                                <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </div>
                                                                    </Tooltip>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-8 ">

                                    <PaginationComponent
                                        dataPerPage={logs}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Modal maxWidth="md" show={openLogModal} onClose={handleCloseModal} >
                {selectedLog && (
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-1 text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                </svg>
                                Log Details
                            </div>
                            <div onClick={handleCloseModal}>Close</div>
                        </div>
                        <div className="mt-5">
                            <div>ID:{selectedLog.user.id}</div>
                            <div>{selectedLog.user.name}</div>
                            <div>{selectedLog.action}</div>
                            <div>{selectedLog.details}</div>
                        </div>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
};

export default ActivityLog;
