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

                <div >
                    <div className='flex gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                        <div className='text-xl'>
                            Number of Partylists

                        </div>
                    </div>

>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
                </div>

                <div className='text-4xl text-blue-500'>
                    <span>{partylists.length}</span>
                </div>
            </div>
            <PartylistCarousel />
        </div>
    )
}

export default PartylistEditorDashboard