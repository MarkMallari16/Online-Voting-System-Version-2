import React from "react";

import { PiStudentLight } from "react-icons/pi";


const AdminDashboardOverview = ({
    totalStudents,
    totalAdmins,
    totalModerators,

}) => {
    return (
        <>
<<<<<<< HEAD
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="flex justify-between shadow-sm bg-white ring-1 ring-inset ring-gray-300  rounded-lg p-5 ">
                    <div>
                        <div className="text-black">Number of Students</div>
                        <div className="font-medium text-5xl  mt-5">{totalStudents ? totalStudents : 0}</div>
                    </div>
                    <PiStudentLight className='w-10 h-10 bg-blue-200 rounded-lg p-1' />
                </div>
=======
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">

>>>>>>> a5d97759504b06652679829a51d708a4355848c1

                <div className="flex justify-between shadow-sm bg-white  dark:bg-[#252525] dark:ring-gray-800 dark:text-gray-50 ring-1 ring-inset ring-gray-300  rounded-lg p-5 ">
                    <div>
                        <div >Number of Admins</div>
                        <div className="font-medium text-5xl  mt-5">{totalAdmins ? totalAdmins : 0}</div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 bg-amber-200 dark:bg-amber-500 rounded-lg p-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>
                </div>
                <div className="flex justify-between shadow-sm bg-white  dark:bg-[#252525] dark:ring-gray-800 dark:text-gray-50 ring-1 ring-inset ring-gray-300  rounded-lg p-5 ">
                    <div>
                        <div >Number of Moderators</div>
                        <div className="font-medium text-5xl mt-5">
                            {totalModerators ? totalModerators : 0}
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 bg-cyan-200 dark:bg-cyan-500 rounded-lg p-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>

                </div>
                <div className="flex justify-between shadow-sm bg-white  dark:bg-[#252525] dark:ring-gray-800 dark:text-gray-50 ring-1 ring-inset ring-gray-300  rounded-lg p-5 ">
                    <div>
                        <div >Number of Students</div>
                        <div className="font-medium text-5xl  mt-5">{totalStudents ? totalStudents : 0}</div>
                    </div>
                    <PiStudentLight className='w-10 h-10 bg-blue-200 dark:bg-blue-500 rounded-lg p-1' />


                </div>
                
            </div>
        </>
    );
};

export default AdminDashboardOverview;
