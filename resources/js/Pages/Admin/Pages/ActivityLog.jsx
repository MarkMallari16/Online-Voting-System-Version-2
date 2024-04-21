import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { Avatar, Spinner, Typography } from "@material-tailwind/react";
import ActivityLogPagination from "./ActivityLogPagination";
import ExcelExport from "@/Components/ExcelExport";
const ActivityLog = ({ auth }) => {
    const [activityLog, setActivityLog] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const fetchActivityLog = async (page) => {
        try {
            const response = await axios.get("/activity-logs", {
                params: { page }, // Send current page as a query parameter
            });
            setActivityLog(response.data.data);
            setTotalPages(response.data.last_page); // Set the total number of pages

            setIsLoading(true);
        } catch (error) {
            console.error("Error fetching activity log:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchActivityLog();
    }, []);

    const handlePageChange = async (page) => {
        setCurrentPage(page);

        await fetchActivityLog(page);
    };

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
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
                                <div className="flex justify-end mb-3">
                                    <div>
                                        <ExcelExport data={activityLog} fileName='activity_logs' />
                                    </div>
                                </div>
                                <div className="bg-white shadow-md rounded-md overflow-hidden">

                                    <div className="bg-blue-200 px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6 "
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Recent Activity
                                            </h3>

                                        </div>
                                    </div>
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
                                            {activityLog.length == 0 ? (
                                                <tbody>
                                                    <tr className="text-center">
                                                        <td
                                                            colSpan="5"
                                                            className="py-5 text-center text-gray-600"
                                                        >
                                                            No matching users found.
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ) : (
                                                <tbody>
                                                    {activityLog.map(
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
                                                                        <Avatar
                                                                            src={
                                                                                log
                                                                                    .user
                                                                                    .profile_picture
                                                                            }
                                                                            alt="User Profile"
                                                                            size="sm"
                                                                        />
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
                                <div className="flex justify-center mt-5 ">
                                    <ActivityLogPagination
                                        active={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
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
