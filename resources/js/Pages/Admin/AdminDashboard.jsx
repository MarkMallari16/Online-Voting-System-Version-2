import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import AdminDashboardOverview from './AdminDashboardOverview';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const totalUsers = users.length;
    const totalStudents = users.filter(user => user.role == 'voter').length;
    const totalAdmins = users.filter(user => user.role === 'admin').length;
    const totalModerators = users.filter(user => user.role === 'moderator').length;
    const totalPartylistEditor = users.filter(user => user.role === 'partylist_editor').length;

    const TABLE_HEAD = ["ID", "Name", "Profile", "Email", "Role", "Created At", "Updated At", "Email Status", "Action"];

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 3, 5, 2], // Sample data points
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/users?perPage=10&page=${currentPage}`);
                setUsers(response.data.data);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.last_page);
            } catch (error) {
                setError('Error fetching users');
            }
        };

        fetchUsers();
    }, [currentPage]);

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex-1 p-4">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-bold">Welcome, Admin!</h1>
                        </div>

                    </div>
                </div>

                <div className='mt-5'>
                    <AdminDashboardOverview users={totalUsers} studentCount={totalStudents} adminCount={totalAdmins} moderatorCount={totalModerators} partylistEditorCount={totalPartylistEditor} />
                </div>

                <div className="mt-5">
                    <UserTable TABLE_HEAD={TABLE_HEAD} users={users} setUsers={setUsers} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                </div>

                {/**<div className='bg-white overflow-hidden shadow-sm sm:rounded-lg mt-8 p-2'>
                    <h1>Hello</h1>
                    <Doughnut data={data} />
                </div> */}
            </div>

        </div>

    );
};

export default AdminDashboard;
