import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Avatar } from "@material-tailwind/react";
import DefaultCandidateProfile from '../../../public/storage/candidate_profile_photos/default_candidate_profile.png'
const CandidateModal = ({ candidate, isOpen, onClose }) => {
    return (
        <Dialog size='lg' open={isOpen} handler={onClose}>
            <DialogHeader>
                <div className="flex items-center gap-2">
                    <Avatar src={candidate.candidate_profile ? `storage/${candidate.candidate_profile}` : DefaultCandidateProfile} size="xxl" />
                    <div>
                        <span className='font-medium'>Vote!</span>
                        <h3 className="font-extrabold text-gray-900">{`${candidate.first_name} ${candidate?.middle_name ? candidate.middle_name : ''} ${candidate.last_name}`}</h3>
                        <div className="flex items-center gap-1">
                            <h4 className="font-medium text-gray-900">for</h4>
                            <h4 className="text-gray-900 font-extrabold">{`${candidate.position.name.toUpperCase()} STUDENT COUNCIL`}</h4>
                        </div>
                        <div className="flex items-center gap-1 text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                            <span className="font-bold">{`${candidate.partylist.name}`}</span>
                        </div>
                    </div>
                </div>
                <hr />
            </DialogHeader>
            <DialogBody>
                <div className="relative w-100  mx-2">
                    <h4 className="text-gray-900 font-bold text-xl">Campaign Platform</h4>
                    <div className="text-gray-800 text-justify">
                        <p>{candidate.manifesto}</p>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                >
                    Close
                </button>
            </DialogFooter>
        </Dialog>
    )
}

export default CandidateModal