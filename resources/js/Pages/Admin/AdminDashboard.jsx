import React from 'react';

import UserTable from './UserTable';
import AdminDashboardOverview from './AdminDashboardOverview';

const AdminDashboard = ({ usersPerPage }) => {


    const users = usersPerPage.data;

    const totalStudents = users.filter(user => user.role == 'voter').length;
    const totalAdmins = users.filter(user => user.role === 'admin').length;
    const totalModerators = users.filter(user => user.role === 'moderator').length;
    const totalPartylistEditor = users.filter(user => user.role === 'partylist_editor').length;

    const TABLE_HEAD = ["ID", "Name", "Profile", "Email", "Role", "Created At", "Updated At", "Email Status", "Action"];

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
                    <AdminDashboardOverview totalStudents={totalStudents} totalAdmins={totalAdmins} totalModerators={totalModerators} totalPartylistEditors={totalPartylistEditor} />
                </div>

                <div className="mt-5">
                    <UserTable TABLE_HEAD={TABLE_HEAD} users={users} usersPerPage={usersPerPage} />
                </div>
            </div>

        </div>

    );
};

export default AdminDashboard;
