import React from 'react'
import Modal from './Modal'

import { Avatar } from '@material-tailwind/react';
import { BsFillPatchCheckFill } from "react-icons/bs";

const VoteCandidateWinnerModal = ({ isOpen, onClose, candidateWinners, electionTitle }) => {

    // console.log(candidateWinners);
    return (
        <Modal show={isOpen} onClose={onClose} maxWidth='5xl' className='overflow-y-auto'>
            <div className='px-6 py-4 dark:bg-[#252525]'>
                <div className='flex justify-between items-center mb-5'>
                    <div className='flex items-center gap-3 '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-10 h-10 bg-gray-900 dark:bg-gray-800 p-2 rounded-md">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                        </svg>
                        <div className='text-xl font-medium dark:text-gray-50'>Election Result for {electionTitle}</div>
                    </div>
                    <div className='p-2 rounded-md hover:bg-gray-200 transition-all ease-in-out duration-200 cursor-pointer' onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div>
                    <div className='mt-5 mb-6 sm:mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-sm md:text-base'>
                        {

                            Object.keys(candidateWinners).map((position, id) => (
                                <div key={id}>

                                    <div className='flex items-center ring-1 ring-inset ring-gray-300 dark:ring-gray-800 bg-gray-50 dark:bg-[#252525] rounded-lg py-5 px-4 gap-3 w-full md:w-auto'>
                                        <div>
                                            <Avatar src={`storage/${candidateWinners[position].candidate_profile}`}></Avatar>
                                        </div>
                                        <div>
                                            <div className='text-gray-900 dark:text-gray-50'>{`${candidateWinners[position].candidate_full_name}`}</div>
                                            <div className='flex  items-center gap-1 text-gray-900 dark:text-gray-400'>
                                                <div>

                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                                        <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                                    </svg>

                                                </div>
                                                <div >
                                                    {candidateWinners[position].partylist_name}

                                                </div>

                                            </div>
                                        </div>
                                        <div className='flex-1 flex justify-end items-center gap-1 flex-wrap text-blue-600 dark:text-blue-400'>
                                            <BsFillPatchCheckFill />

                                            <div className=' text-end  font-medium'>Elected {position}</div>
                                        </div>
                                    </div>
                                </div>
                            ))

                        }
                    </div>

                </div>

            </div>
        </Modal>
    )
}

export default VoteCandidateWinnerModal