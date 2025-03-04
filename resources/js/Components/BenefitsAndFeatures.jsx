import React from 'react'
import { CiUser } from 'react-icons/ci'

const BenefitsAndFeatures = () => {
    return (
        <div className='mt-24 '>
            <div>
                <div className='text-center text-4xl font-bold' >Benefits & Features</div>
                <div className="text-lg font-normal text-gray-900 text-center mt-2 mb-10 mx-4 lg:mx-0">
                    Discover the advantages of using the online voting system for the SHS student council elections.

                </div>

                <div className='w-[90%]  px-3 grid grid-cols-1 lg:grid-cols-2  justify-center mx-auto  lg:gap-4'>

                    <div className="mb-8 lg:mb-0 bg-white p-10 rounded-lg ring-1 ring-inset ring-gray-300   transition-all ease-in-out duration-300">

                        <div className='flex items-center gap-4'>
                            <span className='bg-gradient-to-b from-blue-200 to-blue-400 p-2 rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </span>
                            <div className="font-medium text-xl text-gray-900">Convenience</div>
                        </div>

                        <div className="text-lg font-normal mt-4">
                            With STI Bacoor SHS Student Council Online Voting System, students can cast their votes conveniently from anywhere with an internet connection, eliminating the need to physically the school.
                        </div>
                    </div>

                    <div className="mb-8 lg:mb-0  bg-white p-10 rounded-lg ring-1 ring-inset ring-gray-300">
                        <div className='flex items-center gap-4' >
                            <span className='bg-gradient-to-b from-blue-200 to-blue-400 p-2 rounded-lg'>

                               
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000" className="w-8 h-8"><path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-520q-60-5-122-15t-118-25l20-80q78 21 166 30.5t174 9.5q86 0 174-9.5T820-720l20 80q-56 15-118 25t-122 15v520h-80v-240h-80v240h-80Z" /></svg>
                            </span>


                            <div className="font-medium text-xl text-gray-900">Accessibility</div>
                        </div>
                        <div className="text-lg font-normal mt-4">
                            The online voting system ensures that all eligible students have equal access to the voting process, regardless of their location.
                        </div>
                    </div>

                    <div className="mb-8 lg:mb-0  bg-white p-10 rounded-lg ring-1 ring-inset ring-gray-300">
                        <div className='flex items-center gap-4'>
                            <span className='bg-gradient-to-b from-blue-200 to-blue-400 p-2 rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                </svg>

                            </span>
                            <div className="font-medium text-xl text-gray-900">Transparency</div>
                        </div>
                        <div className="text-lg font-normal mt-4">
                            Transparent and verifiable results are provided instantly after the voting period ends, ensuring integrity and fairness in the election process.
                        </div>
                    </div>


                    <div className="mb-8 lg:mb-0  bg-white p-10 rounded-lg ring-1 ring-inset ring-gray-300">
                        <div className='flex items-center gap-4' >
                            <span className='bg-gradient-to-b from-blue-200 to-blue-400 p-2 rounded-lg' >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>

                            </span>
                            <div className="font-medium text-xl text-gray-900">Environment Friendly</div>
                        </div>
                        <p className="text-lg font-normal mt-4">
                            By reducing the need for paper-based ballots and physical infrastructure, the online voting system contributes to environmental sustainability and reduces carbon footprint.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BenefitsAndFeatures