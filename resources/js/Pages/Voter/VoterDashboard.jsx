import React from 'react'
import CandidateContainer from './CandidateContainer'

const VoterDashboard = () => {
    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-bold">Welcome, Voter!</h1>
                </div>
            </div>
            <div className='text-center font-bold text-4xl mt-10 mb-2 '>
                STI Student Election 2023
            </div>
            <div className="text-2xl mt-10 mb-2 font-light">
                You May Now Cast Your Vote
            </div>

            <div className='flex items-center justify-end gap-3 '>
                <div className='flex justify-start gap-2'>
                    <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md'>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>


                    </div>
                    <div className='border-1 bg-gray-200 border-gray-200 text-black px-2 py-2 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                            <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                        </svg>

                    </div>
                </div>
                <button className='bg-blue-500 text-white px-2 py-2 rounded'>See Casted Votes</button>

            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-7">
                <div className='mt-11 text-2xl text-center'>Vote for President</div>
                <div className='text-center text-gray-600'>Select your preferred candidate for the position of President</div>
                <div className="p-6 text-gray-900">
                    <CandidateContainer />
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-7">
                <div className='mt-11 text-2xl text-center  mb-1'>Vote for Vice President</div>
                <div className='text-center text-gray-600'>Select your preferred candidate for the position of Vice President</div>
                <div className="p-6 text-gray-900">
                    <CandidateContainer />
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-7">
                <div className='mt-11 text-2xl text-center mb-1'>Vote for Secretary</div>
                <div className='text-center text-gray-600'>Select your preferred candidate for the position of Secretary</div>
                <div className="p-6 text-gray-900">
                    <CandidateContainer />
                </div>
            </div>
            <div className='text-center mt-7'>
                <button className='bg-blue-500  text-white px-7 py-2 rounded-md'>Submit</button>
            </div>

        </div>
    )
}

export default VoterDashboard