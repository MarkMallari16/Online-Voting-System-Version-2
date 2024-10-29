import PartylistCarousel from '@/Components/PartylistCarousel'
import React, { useEffect, useRef, useState } from 'react'
import { FaUserGroup } from 'react-icons/fa6';


const PartylistEditorDashboard = ({ partylists }) => {
    console.log(partylists);
    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-medium">Welcome, Partylist Editor!</h1>
                </div>
            </div>
<<<<<<< HEAD
            <div className='mt-5 p-5 rounded-lg font-medium flex justify-between  border-1 border-gray-white bg-white  ring-1 ring-inset ring-gray-300'>
=======
<<<<<<< HEAD
            <div className='mt-5 p-5 rounded-lg font-medium flex justify-between  border-1 border-gray-white bg-white  ring-1 ring-inset ring-gray-300'>

                <div >
                    <div >

                        <div className='text-xl'>
                            <div>
                                Number of Partylists
                            </div>

                        </div>
                    </div>
                    <div className='mt-2 text-6xl font-bold'>
                        <span>{partylists.length}</span>
                    </div>
                </div>
                <div >
                    <div className='bg-cyan-200 p-2 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>

                    </div>
=======
            <div className='mt-5 p-5 rounded-md font-medium flex justify-between items-center border-1 border-gray-white bg-blue-50  ring-1 ring-inset ring-gray-300'>
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933

                <div >
                    <div >

                        <div className='text-xl'>
                            <div>
                                Number of Partylists
                            </div>

                        </div>
                    </div>
                    <div className='mt-2 text-6xl font-bold'>
                        <span>{partylists.length}</span>
                    </div>
                </div>
                <div >
                    <div className='bg-cyan-200 p-2 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>

<<<<<<< HEAD
                    </div>
=======
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
                </div>

            </div>
            <PartylistCarousel />
        </div>
    )
}

export default PartylistEditorDashboard