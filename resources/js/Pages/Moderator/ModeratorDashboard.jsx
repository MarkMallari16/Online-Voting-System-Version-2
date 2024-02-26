import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ModeratorOverview from './ModeratorOverview'
import { Select, Option } from "@material-tailwind/react";

import ChartContainer from './ChartContainer';
import { Input } from "@material-tailwind/react";
const ModeratorDashboard = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const TABLE_HEAD = ["ID", "Candidate Name", "Email", "Role", "Created At", "Updated At", "Action"];


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/users?perPage=10&page=${currentPage}`);
                setUsers(response.data.data);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.last_page);
            } catch (error) {

            } finally {

            }
        };

        fetchUsers();
    }, [currentPage]);

    return (
        <div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-3">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-bold">Welcome, Moderator!</h1>
                </div>
            </div>

            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-3">
                <div className="p-6 text-gray-900">
                    <ModeratorOverview />

                </div>
            </div>

            <div className='mt-5 flex gap-2 flex-col sm:flex-row'>
                <div className="flex-1 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h1 className='text-xl font-bold'>Votes Tally</h1>

                    </div>
                    <div className='p-5'>
                        <div className='flex justify-end'>

                            <div className="w-72">
                                <Select label="Select Version">
                                    <Option>Material Tailwind HTML</Option>
                                    <Option>Material Tailwind React</Option>
                                    <Option>Material Tailwind Vue</Option>
                                    <Option>Material Tailwind Angular</Option>
                                    <Option>Material Tailwind Svelte</Option>
                                </Select>
                            </div>
                        </div>
                        <ChartContainer />
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h1 className='text-xl font-bold'>Votes Tally</h1>

                    </div>
                    <div className='p-5'>
                        <div className='flex justify-end'>

                            <div className="w-72">
                                <Select label="Select Version">
                                    <Option>Material Tailwind HTML</Option>
                                    <Option>Material Tailwind React</Option>
                                    <Option>Material Tailwind Vue</Option>
                                    <Option>Material Tailwind Angular</Option>
                                    <Option>Material Tailwind Svelte</Option>
                                </Select>
                            </div>
                        </div>
                        <ChartContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModeratorDashboard