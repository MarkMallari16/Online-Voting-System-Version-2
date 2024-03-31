import React, { useState, useEffect } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/inertia-react';
import CandidateCard from './CandidateCard';

const VoterDashboard = ({ election, candidatesAll, positionList }) => {
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    const electionId = election.id;

    const { data, setData, post, errors } = useForm({
        election_id: electionId,
        candidate_ids: [],
    });

    useEffect(() => {
        // Update the candidate_ids field in the form data when selectedCandidates changes
        setData('candidate_ids', selectedCandidates);
    }, [selectedCandidates]);

    const onSelectCandidate = (candidateId, positionId) => {
        // Check if a candidate for the current position is already selected
        const isCandidateSelected = selectedCandidates.some(candidate => candidatesAll.find(c => c.id === candidate).position_id === positionId);

        if (!isCandidateSelected) {
            // Remove any previously selected candidate for the current position
            const updatedCandidates = selectedCandidates.filter(candidate => candidatesAll.find(c => c.id === candidate).position_id !== positionId);
            // Add the newly selected candidate
            setSelectedCandidates([...updatedCandidates, candidateId]);
        } else {
            // Deselect the candidate if already selected
            setSelectedCandidates(prevState => prevState.filter(candidate => candidatesAll.find(c => c.id === candidate).position_id !== positionId));
            setSelectedCandidates(prevState => [...prevState, candidateId]);
        }
    };

    const onVoteSubmit = async (e) => {
        e.preventDefault();

        // Check if there are selected candidates
        if (selectedCandidates.length === 0) {
            // Handle case where no candidates are selected
            console.error("No candidates selected.");
            return;
        }

        try {
            // Set the candidate_ids field in the form data
            setData('candidate_ids', selectedCandidates);

            // Make POST request to create votes
            await post('/votes', {
                election_id: electionId,
                candidate_ids: selectedCandidates,
            });
            setIsSuccessMessage(true);

        } catch (error) {
            // Handle error
            console.error("Error submitting vote:", error);
        }
    };


    return (
        <div>
            <form onSubmit={onVoteSubmit}>
                {/* Form content */}
                {positionList.map(position => (
                    <div key={position.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-7">
                        <div className='mt-11 text-2xl text-center'>Vote for {position.name}</div>
                        <div className='text-center text-gray-600'>Select your preferred candidate(s) for the position of {position.name}</div>
                        <div className="p-6 text-gray-900">
                            <div className='mb-10 flex flex-wrap justify-center sm:justify-start gap-5 p-10 sm:p-5'>
                                {candidatesAll
                                    .filter(candidate => candidate.position_id === position.id) // Filter candidates for the current position
                                    .map(candidate => (
                                        <CandidateCard
                                            key={candidate.id}
                                            candidate={candidate}
                                            onSelectCandidate={() => onSelectCandidate(candidate.id, position.id)}
                                            selected={selectedCandidates.includes(candidate.id)} 
                                            positionId={position.id}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Submit button */}
                <div className='text-center mt-7'>
                    <PrimaryButton className='bg-blue-500 hover:bg-blue-700  text-white px-6 py-3 rounded-md'>Submit</PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default VoterDashboard;
