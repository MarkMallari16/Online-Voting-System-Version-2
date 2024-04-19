import PartylistCarousel from '@/Components/PartylistCarousel'
import React, { useEffect, useRef, useState } from 'react'


const PartylistEditorDashboard = ({ partylists }) => {
    // console.log(partylists);
    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-medium">Welcome, Partylist Editor!</h1>
                </div>
            </div>

            <PartylistCarousel/>
        </div>
    )
}

export default PartylistEditorDashboard