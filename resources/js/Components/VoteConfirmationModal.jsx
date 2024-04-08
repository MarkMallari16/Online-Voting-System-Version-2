import React from 'react'
import Modal from './Modal';
import { Dialog } from '@headlessui/react';
import PrimaryButton from './PrimaryButton';
import DangerButton from './DangerButton';
import { Avatar } from '@material-tailwind/react';
import { FaVoteYea } from "react-icons/fa";

const VoteConfirmationModal = ({ isOpen, onClose, onSubmitVote, selectedCandidates, selectedCandidatesInfo }) => {
    console.log(selectedCandidatesInfo);
    const handleVoteSubmit = async (e) => {
        e.preventDefault();
        onSubmitVote()
    }
    const handleClose = () => {

        onClose(selectedCandidates);
    };


    return (
        <Modal show={isOpen} onClose={onClose} className=''>
            <form onSubmit={handleVoteSubmit}>
                <div className="p-6">
                    <div className=" flex items-center gap-3">
                        <FaVoteYea className='text-5xl bg-gray-200 p-2 rounded-md' />
                        <span className='text-xl font-bold'>Vote Confirmation</span>
                    </div>
                    <div className='center'>
                        <div className='flex justify-center'>
                            <div>

                            </div>
                        </div>
                        <p className="mt-2 mb-4 text-gray-900">Are you sure you want to submit your votes for the following candidates?</p>

                        <div className='mt-2'>


                            <ul>
                                {selectedCandidatesInfo.map(candidate => (
                                    <li key={candidate.id} className="mb-3 border-2 border-blue-gray-200 p-3 rounded-md ">
                                        <div className="flex justify-between items-center ">
                                            <div className='flex gap-3'>
                                                <Avatar src={candidate.candidateProfile} />
                                                <div>
                                                    <div className='font-medium'>{candidate.name}</div>
                                                    <div className='text-blue-gray-800 flex items-center gap-1'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                                        </svg>

                                                        {candidate.partylist}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-blue-gray-800'>{candidate.position.name}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center gap-1">
                        <DangerButton type="button" className="mr-2 " onClick={handleClose}>
                            Cancel
                        </DangerButton>
                        <PrimaryButton type="submit" >
                            Confirm
                        </PrimaryButton>

                    </div>
                </div>
            </form>

        </Modal>
    )
}

export default VoteConfirmationModal