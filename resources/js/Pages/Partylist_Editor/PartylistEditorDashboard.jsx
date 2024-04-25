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
            <div className='mt-5 p-5  rounded-md font-medium flex justify-between items-center border-1 border-gray-200 bg-white'>

                <div>

                    Number of Partylists

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