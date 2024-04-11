import React, { useState, useEffect, useMemo } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/inertia-react";
import CandidateCard from "./CandidateCard";
import VoteConfirmationModal from "@/Components/VoteConfirmationModal";
import AlreadyVoted from "@/Components/AlreadyVoted";
import CouncilLogo from "../../../../public/councilLogo.png";
import STIBacoorLogo from "../../assets/bacoor-logo.png";
import BarChartContainer from "../Moderator/BarChartContainer";
const findVoterWhoVoted = (voters, setVoterId) => {
    const voterWhoVoted = voters.find(voter => voter.hasVoted);
    console.log(voterWhoVoted);
    if (voterWhoVoted) {
        setVoterId(voterWhoVoted.id);
    }
};


const VoterDashboard = ({ election, candidatesAll, positionList, voters, castedVotes }) => {
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    const [now, setNow] = useState(new Date());
    const [voterId, setVoterId] = useState(null);
    const memoizedEndingDate = useMemo(() => election.status === 'Inactive' ? '' : election.end_date, [election.end_date, election.status]);
    const isStartingDate = new Date() < election.start_date;

    const endDate = memoizedEndingDate ? new Date(memoizedEndingDate) : new Date(0);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [result, setResult] = useState(now > endDate);

    useEffect(() => {
        findVoterWhoVoted(voters, setVoterId);
    }, [voters, setVoterId]);

    const updateNow = () => {
        setNow(new Date());
        setTimeout(updateNow, 1000); // Schedule the next update after 1 second
    };


    useEffect(() => {
        updateNow();
    }, []);

    useEffect(() => {
        setResult(now > endDate);
    }, [endDate, now]);

    const electionId = election ? election.id : null;

    const { data, setData, post, errors, processing } = useForm({
        election_id: electionId,
        candidate_ids: [],
    });

    useEffect(() => {
        // Update the candidate_ids field in the form data when selectedCandidates changes
        setData("candidate_ids", selectedCandidates);
    }, [selectedCandidates]);



    const onSelectCandidate = (candidateId, positionId) => {
        // Check if the candidate is already selected for the current position
        const isCandidateSelected = selectedCandidates.some(
            (candidate) =>
                candidatesAll.find((c) => c.id === candidate).position_id ===
                positionId
        );

        if (isCandidateSelected) {
            // Deselect the candidate if already selected
            setSelectedCandidates((prevState) =>
                prevState.filter(
                    (candidate) =>
                        candidatesAll.find((c) => c.id === candidate)
                            .position_id !== positionId
                )
            );
        } else {
            // Remove any previously selected candidate for the current position
            const updatedCandidates = selectedCandidates.filter(
                (candidate) =>
                    candidatesAll.find((c) => c.id === candidate)
                        .position_id !== positionId
            );

            setSelectedCandidates([...updatedCandidates, candidateId]);
        }
    };

    const onVoteSubmit = async (e) => {
        e.preventDefault();

        if (selectedCandidates.length === 0) {
            // Handle case where no candidates are selected
            console.error("No candidates selected.");
            return;
        }

        setShowConfirmationModal(true);
    };

    const confirmVote = async () => {
        try {
            // Set the candidate_ids field in the form data
            setData("candidate_ids", selectedCandidates);

            // Make POST request to create votes
            await post("/votes", {
                election_id: electionId,
                candidate_ids: selectedCandidates,
            });
            setIsSuccessMessage(true);
            // setVoterHasVoted(true);
        } catch (error) {
            // Handle error
            console.error("Error submitting vote:", error);
        }

        setShowConfirmationModal(false);
    };
    // console.log(hasVoted);
    const getSelectedCandidatesInfo = () => {

        return selectedCandidates.map(candidateId => {
            // Find the candidate object with the matching ID
            const candidate = candidatesAll.find(candidate => candidate.id === candidateId);
            // Return an object with the required information
            return {
                id: candidate.id,
                candidateProfile: candidate.candidate_profile,
                name: `${candidate.first_name} ${candidate?.middle_name} ${candidate.last_name}`,
                partylist: candidate.partylist.name,
                position: candidate.position
            };
        });
    };



    return (
        <div>
            {election ? (
                <div>
                    <div className="flex  items-center justify-between border p-5 border-black rounded-md border-3 ">
                        <div><img src={STIBacoorLogo} alt="STI Bacoor Logo" className="w-52 sm:w-32" /></div>
                        <div className="text-xl md:text-5xl text-center font-medium">{election.title}</div>

                        <div><img src={CouncilLogo} alt="Council Logo" className="w-48 sm:w-36" /></div>
                    </div>
                    <div>
                        {result ? (
                            <div className="mt-20 ">
                                <div className="text-2xl flex flex-wrap">
                                    <BarChartContainer position="President"/>
                                    <BarChartContainer position="Vice President"/>
                                </div>
                            </div>
                        ) : voterId ? (
                            <AlreadyVoted castedVotes={castedVotes} />
                        ) : (
                            <form onSubmit={onVoteSubmit}>
                                {positionList.map((position) => (
                                    <div key={position.id} className="bg-white overflow-hidden shadow-md sm:rounded-lg mt-7">
                                        <div className="mt-11 font-medium text-2xl text-center">
                                            Vote for {position.name}
                                        </div>
                                        <div className="text-center text-gray-600">
                                            Select your preferred candidate(s) for the position of {position.name}
                                        </div>
                                        <div className={`p-6 text-gray-900`}>
                                            {candidatesAll.filter(candidate => candidate.position_id === position.id).length > 0 ? (
                                                <div className="mb-10 justify-center flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:justify-center gap-8 p-5 lg:p-10">
                                                    {candidatesAll
                                                        .filter(candidate => candidate.position_id === position.id)
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
                                            ) : (
                                                <div className="text-gray-600 p-5 text-center">
                                                    <div>No candidate available</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}


                                <div className="text-center mt-7">
                                    {
                                        result ? "" : <PrimaryButton

                                            onClick={onVoteSubmit}
                                            disabled={processing}
                                            className="bg-blue-500 hover:bg-blue-700  text-white px-6 py-3 rounded-md"
                                        >
                                            Submit
                                        </PrimaryButton>
                                    }
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            ) : (

                <div className="h-screen w-full flex justify-center items-center">
                    <div className="text-gray-600 p-5 text-center ">
                        <div className="text-xl">Please wait for the moderator</div>
                        <div className="text-xl">Election for this position will be available soon.</div>
                    </div>

                </div>
            )
            }

            <VoteConfirmationModal
                isOpen={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onSubmitVote={confirmVote}
                selectedCandidates={selectedCandidates}
                selectedCandidatesInfo={getSelectedCandidatesInfo()}
            />
        </div >

    )
}
export default VoterDashboard;
