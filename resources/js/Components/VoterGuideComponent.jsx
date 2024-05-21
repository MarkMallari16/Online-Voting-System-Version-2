import React from 'react'
import { BsBox2 } from 'react-icons/bs'

const VoterGuideComponent = () => {
    return (
        <div className='mt-32 mb-44 w-[90%] mx-auto'>
            <div>
                <div className='text-center text-4xl font-bold' >How it works?</div>
                <div className="text-lg font-normal text-gray-900 text-center mt-2 mb-10 mx-4 lg:mx-0">
                    Explore simple steps for secure voting in the SHS student council elections.
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 justify-center gap-5 flex-wrap mt-10  text-center'>
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-blue-200 to-blue-300  rounded-lg  p-4 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>

                    </div>
                    <div className="text-xl font-medium mt-3">Step 1: Register</div>
                    <div className="text-center text-gray-800 mt-2">
                        Sign up by providing your student email and verifying your identity through email.
                    </div>
                </div>


                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-amber-200 to-amber-300 rounded-lg p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>

                    </div>
                    <div className="text-xl font-medium mt-5">Step 2: Choose Your Candidates</div>
                    <div className="text-center text-gray-800 mt-2">
                        Browse through the list of candidates, read their platforms.
                    </div>
                </div>


                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-red-200 to-red-300 rounded-lg p-4">
                        <BsBox2 className="w-5 h-5" />
                    </div>
                    <div className="text-xl font-medium mt-5">Step 3: Cast Your Vote</div>
                    <div className="text-center text-gray-800 mt-2">
                        Submit your vote securely online.
                    </div>
                </div>
            </div>

        </div>
    )
}

export default VoterGuideComponent