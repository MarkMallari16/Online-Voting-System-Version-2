import React from 'react';

import AdminDashboardOverview from './AdminDashboardOverview';
import DashboardBarAdminChart from '@/Components/DashboardAdminBarChart';
import DashboardAdminDoughnutChart from '@/Components/DashboardAdminDoughnutChart';
import LatestUsersTable from './LatestUsersTable';


const AdminDashboard = ({ latestUsers, totalAdmins, totalModerators, totalStudents, totalVerifiedUsers, totalUnverifiedUsers }) => {
    const LATEST_USER_TABLE_HEAD = ["ID", "Name", "Email", "Role", "Created At", "Updated At", "Email Status"]
    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex-1 ">
                <div className="bg-white dark:bg-[#252525] dark:text-gray-50 ring-1 ring-gray-300 ring-inset dark:ring-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-medium">Welcome, Admin!</h1>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <AdminDashboardOverview totalStudents={totalStudents} totalAdmins={totalAdmins} totalModerators={totalModerators} />
                </div>

                <div className="mt-5 grid grid-rows-1 grid-cols-1 lg:grid-cols-3 items-center gap-5">
                    <DashboardBarAdminChart totalStudents={totalStudents} totalAdmins={totalAdmins} totalModerators={totalModerators} className='col-span-2  h-full' />
                    <DashboardAdminDoughnutChart className='col-span-1 h-full' totalVerifiedUsers={totalVerifiedUsers} totalUnverifiedUsers={totalUnverifiedUsers} />
                </div>

                <div className="mt-5 ring-1 ring-gray-300 rounded-lg">
                    <LatestUsersTable TABLE_HEAD={LATEST_USER_TABLE_HEAD} users={latestUsers} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
