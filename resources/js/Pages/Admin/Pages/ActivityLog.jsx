import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Avatar, Spinner } from "@material-tailwind/react";

import ExcelExport from "@/Components/ExcelExport";
import FilterDropdown from "@/Components/FilterDropdown";
import PaginationComponent from "@/Components/PaginationComponent";
import AvatarComponent from "@/Components/AvatarComponent";
import SearchInput from "@/Components/SearchInput";
const ActivityLog = ({ auth, logs }) => {

    const [selectedFilter, setSelectedFilter] = useState(null); 
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-xl text-gray-800 leading-tight">
                    Activity Log
                </h2>
            }
        >
            <main className="flex-1 py-12">

                <div className="max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
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
                                                    <ExcelExport data={logs.data} fileName='activity_logs' />
                                                </div>
                                                <div >
                                                    <FilterDropdown onSelectFilter={handleSelectedFilter} options={options}/>
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
                                                </tr>
                                            </thead>
                                            {logs.data.length == 0 || logs.data.filter(log =>
                                                log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                log.action.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                                                <tbody>
                                                    <tr className="text-center">
                                                        <td
                                                            colSpan="5"
                                                            className="py-5 text-center text-gray-600"
                                                        >
                                                            No activity logs found.
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody>
                                                    {logs.data
                                                        .filter(log => (
                                                            selectedFilter ? log.action === selectedFilter : true
                                                        ))
                                                        .filter(log => (
                                                            log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                            log.action.toLowerCase().includes(searchQuery.toLowerCase())
                                                        ))
                                                        .map(
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
                                                                            <AvatarComponent Profile={log.user.profile_picture} />
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
        </AuthenticatedLayout>
    );
};

export default ActivityLog;
