import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
const ActivityLog = ({ auth }) => {

    const [activityLog, setActivityLog] = useState([]);

    const fetchActivityLog = async () => {
        try {
            const response = await axios.get('/activity-logs'); // Assuming your backend route for fetching activity logs is '/api/activity-log'
            setActivityLog(response.data); // Set activity log data in state

            console.log(response.data);
        } catch (error) {
            console.error('Error fetching activity log:', error);
        }
    };

    // useEffect hook to fetch activity log data when the component mounts
    useEffect(() => {
        fetchActivityLog();
    }, []); // Empty dependency array ensures this effect runs only once after initial render
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Activity Log</h2>}>
            <main className="flex-1 py-12">
                <div className="max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <div className="bg-gray-200 px-4 py-3">
                            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                        </div>
                        <div className="p-4">
                           
                        </div>
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
};

export default ActivityLog;
