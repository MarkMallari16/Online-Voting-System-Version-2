import React from 'react'
import { UserIcon } from '@heroicons/react/24/solid';
const AdminDashboardOverview = ({ users }) => {
    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <div className='flex justify-between items-center bg-blue-200 rounded-md p-5'>
                    <div>
                        <div>Number of Users:</div>
                        <div className='font-bold text-5xl'>{users}</div>
                    </div>
                    <UserIcon className='w-20' />
                </div>

                <div className='flex justify-between items-center bg-blue-200 rounded-md p-5'>
                    <div>
                        <div>Number of Users:</div>
                        <div className='font-bold text-5xl'>50</div>
                    </div>
                    <UserIcon className='w-20' />
                </div>

                <div className='flex justify-between items-center bg-blue-200 rounded-md p-5'>
                    <div>
                        <div>Number of Users:</div>
                        <div className='font-bold text-5xl'>50</div>
                    </div>
                    <UserIcon className='w-20' />
                </div>

                <div className='flex justify-between items-center bg-blue-200 rounded-md p-5'>
                    <div>
                        <div>Number of Users:</div>
                        <div className='font-bold text-5xl'>50</div>
                    </div>
                    <UserIcon className='w-20' />
                </div>
            </div>

        </>
    )
}

export default AdminDashboardOverview