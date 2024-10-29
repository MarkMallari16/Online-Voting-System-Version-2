import React from 'react'
import Modal from './Modal';
import { Avatar, Button } from '@material-tailwind/react';
import { FaVoteYea } from "react-icons/fa";

const VoteConfirmationModal = ({ isOpen, onClose, onSubmitVote, selectedCandidates, selectedCandidatesInfo, processing }) => {

    const handleVoteSubmit = async (e) => {
        e.preventDefault();
        onSubmitVote();
    }

    const handleClose = () => {

        onClose(selectedCandidates);
    };
    const sortSelectedCandidatesInfo = selectedCandidatesInfo.sort((a, b) => a.position.id - b.position.id);
<<<<<<< HEAD
<<<<<<< HEAD
    console.log(selectedCandidatesInfo)
    const candidateProfiles = sortSelectedCandidatesInfo.map(candidate => candidate.candidateProfile);
=======

>>>>>>> a5d97759504b06652679829a51d708a4355848c1

=======
<<<<<<< HEAD
    console.log(selectedCandidatesInfo)
    const candidateProfiles = sortSelectedCandidatesInfo.map(candidate => candidate.candidateProfile);

=======

    const candidateProfiles = sortSelectedCandidatesInfo.map(candidate => candidate.candidateProfile);
  
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
    return (
        <Modal show={isOpen} onClose={onClose} className='overflow-y-auto'>
            <div className='dark:bg-[#252525] dark:text-gray-50'>
                <form onSubmit={handleVoteSubmit}>
                    <div className="p-6">
                        <div className=" flex items-center gap-3 ">
                            <FaVoteYea className='text-5xl bg-gray-200 dark:bg-gray-800  p-2 rounded-md ' />
                            <span className='text-xl font-bold'>Vote Confirmation</span>
                        </div>
                        <div className='center'>
                            <div className='flex justify-center'>
                                <div>

                                </div>
                            </div>
                            <p className="mt-2 mb-5 text-gray-900 dark:text-gray-400">Are you sure you want to submit your votes for the following candidate(s)?</p>

                            <div>


                                <ul>
                                    {sortSelectedCandidatesInfo.map(candidate => (
                                        <li key={candidate.id} className="mb-3 p-3 ring-1 ring-inset ring-gray-900 dark:ring-gray-800 rounded-md ">
                                            <div className="flex justify-between items-center ">
                                                <div className='flex gap-3'>
                                                    <Avatar src={`storage/${candidate.candidateProfile}`} />
                                                    <div>
                                                        <div className='font-medium'>{candidate.name}</div>
                                                        <div className='text-gray-900 dark:text-gray-200 flex items-center gap-1'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                                            </svg>

<<<<<<< HEAD

                            <ul>
                                {sortSelectedCandidatesInfo.map(candidate => (
                                    <li key={candidate.id} className="mb-3 p-3 ring-1 ring-inset ring-gray-900 rounded-md ">
                                        <div className="flex justify-between items-center ">
                                            <div className='flex gap-3'>
<<<<<<< HEAD
                                                <Avatar src={`storage/${candidate.candidateProfile}`} />
=======
<<<<<<< HEAD
                                                <Avatar src={`storage/${candidate.candidateProfile}`}/>
=======
                                                <Avatar src={candidate.candidateProfile ? 'storage/${candidate.candidate_profile}' : DefaultCandidatePicture} />
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
                                                <div>
                                                    <div className='font-medium'>{candidate.name}</div>
                                                    <div className='text-blue-gray-900 flex items-center gap-1'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                                        </svg>

                                                        {candidate.partylist}
=======
                                                            {candidate.partylist}
                                                        </div>
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
                                                    </div>
                                                </div>
                                                <div className='text-black dark:text-gray-400'>{candidate.position.name}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {!selectedCandidatesInfo.length && (
                            <div className="flex justify-center items-center flex-col  text-gray-900 mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>

                                <div>
                                    You have chosen to abstain from voting.
                                </div>
                            </div>
                        )}
                        <div className="mt-5 flex justify-center gap-1">
                            <Button color='red' variant='gradient' type="button" className="mr-2 " onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button color='blue' variant='gradient' type="submit" disabled={processing}>
                                Confirm
                            </Button>

                        </div>
                    </div>
                </form>
            </div>

        </Modal>
    )
}

export default VoteConfirmationModal