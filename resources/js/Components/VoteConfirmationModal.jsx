import React from 'react'
import Modal from './Modal';
import { Dialog } from '@headlessui/react';
import PrimaryButton from './PrimaryButton';
import DangerButton from './DangerButton';
const VoteConfirmationModal = ({ isOpen, onClose, onSubmitVote, selectedCandidates }) => {
    console.log(selectedCandidates);
    const handleVoteSubmit = async (e) => {
        e.preventDefault();
        onSubmitVote()
    }
    const handleClose = () => {

        onClose(selectedCandidates);
    };
    return (
        <Modal show={isOpen} onClose={onClose}>
            <form onSubmit={handleVoteSubmit}>
                <div className="p-6">
                    <h2 className="text-lg font-bold mb-4">Vote Confirmation</h2>
                    <div className='center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                            <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>

                    </div>
                    <p className="mb-4">Are you sure you want to submit your votes for the following candidate(s):</p>
                    <ul className="mb-4">
                        {selectedCandidates.map(candidate => (
                            <li key={candidate.id}>{candidate.first_name} {candidate.last_name}</li>
                        ))}
                    </ul>
                    <div className="flex justify-center">
                        <DangerButton className="mr-2" onClick={handleClose}>
                            Cancel
                        </DangerButton>
                        <PrimaryButton type="submit">
                            Confirm
                        </PrimaryButton>

                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default VoteConfirmationModal