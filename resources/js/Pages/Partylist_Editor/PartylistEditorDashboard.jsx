import React, { useEffect, useRef, useState } from 'react'


const PartylistEditorDashboard = ({partylists}) => {
    // console.log(partylists);
    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-medium">Welcome, Partylist Editor!</h1>
                </div>
            </div>

            <div className='w-full flex mt-5 gap-2 flex-wrap'>
                <div className="w-full flex bg-white p-6 shadow-md rounded-lg text-gray-900">
                    <h1 className="text-xl font-bold">Sandigan Partylist</h1>
                </div>
                <div className="w-full flex bg-white p-6 shadow-md rounded-lg text-gray-900">
                    <h1 className="text-xl font-bold">Sanaol Partylist</h1>
                </div>
                <div className="w-full flex bg-white p-6 shadow-md rounded-lg text-gray-900">
                    <h1 className="text-xl font-bold">ICTians</h1>
                </div>

            </div>
        </div>
    )
}

export default PartylistEditorDashboard