import React from 'react';

import UserTable from './UserTable';
import AdminDashboardOverview from './AdminDashboardOverview';
import DashboardBarAdminChart from '@/Components/DashboardAdminBarChart';
import DashboardAdminDoughnutChart from '@/Components/DashboardAdminDoughnutChart';
import LatestUsersTable from './LatestUsersTable';


const AdminDashboard = ({ usersPerPage, latestUsers }) => {
    const users = usersPerPage.data;

    const totalStudents = users.filter(user => user.role === 'voter').length;
    const totalAdmins = users.filter(user => user.role === 'admin').length;
    const totalModerators = users.filter(user => user.role === 'moderator').length;
    const usersVerified = users.filter(user => user.email_verified_at).length;
    const usersNotVerified = users.filter(user => !user.email_verified_at).length;

    const TABLE_HEAD = ["ID", "Name", "Email", "Role", "Created At", "Updated At", "Email Status", "Action"];
    console.log(latestUsers);

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex-1 ">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 flex justify-between items-center">
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
                    <DashboardAdminDoughnutChart usersVerified={usersVerified} usersNotVerified={usersNotVerified} className='col-span-1 h-full' />
                </div>

                <div className="mt-5 ring-1 ring-gray-300 rounded-lg">
                    <LatestUsersTable TABLE_HEAD={TABLE_HEAD} users={latestUsers}  />
                </div>
                <div>


                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
