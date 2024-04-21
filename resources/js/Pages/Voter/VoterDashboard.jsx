import React, { useState, useEffect, useMemo } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/inertia-react";
import CandidateCard from "./CandidateCard";
import VoteConfirmationModal from "@/Components/VoteConfirmationModal";
import AlreadyVoted from "@/Components/AlreadyVoted";
import CouncilLogo from "../../../../public/councilLogo.png";
import STIBacoorLogo from "../../assets/bacoor-logo.png";
import BarChartContainer from "../Moderator/BarChartContainer";
import PartylistCarousel from "@/Components/PartylistCarousel";




const VoterDashboard = ({ election, candidatesAll, positionList, partyList, castedVotes, voteCounts, voterHasVoted }) => {
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [now, setNow] = useState(new Date());

    const memoizedEndingDate = useMemo(() => election.status === 'Inactive' ? '' : election.end_date, [election.end_date, election.status]);

    const endDate = memoizedEndingDate ? new Date(memoizedEndingDate) : new Date(0);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [result, setResult] = useState(now > endDate);

    useEffect(() => {
        const updateNow = () => {
            setNow(new Date());
            setTimeout(updateNow, 1000);
        };


        updateNow();

        return () => clearTimeout(updateNow);
    }, []);

    useEffect(() => {
        setResult(now > endDate);
    }, [endDate, now]);

    const electionId = election ? election.id : 0;

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
            window.location.reload();
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
                name: `${candidate.first_name}  ${candidate.last_name}`,
                partylist: candidate.partylist.name,
                position: candidate.position
            };
        });
    };


    console.log(election)


    return (
        <div>
            {(election && election.status === "Active" || election.start_date < new Date()) && (new Date(election.start_date) < new Date()) ? (

                <div>
                    <div className="bg-white border border-black border-3 p-5 rounded-md ">
                        <div className="flex  items-center justify-between">
                            <div><img src={STIBacoorLogo} alt="STI Bacoor Logo" className="w-32 sm:w-32" /></div>
                            <div className="text-xl md:text-5xl text-center font-medium">{election.title}</div>

                            <div><img src={CouncilLogo} alt="Council Logo" className="w-32 sm:w-32" /></div>
                        </div>
                        {election.start_date < election.end_date && (
                            <div className="text-center flex justify-center text-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                                        </svg>
                                    </span>

                                    Start Date: {new Date(election.start_date).toLocaleString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                                        </svg>

                                    </span>
                                    End Date: {new Date(election.end_date).toLocaleString()}
                                </div>
                            </div>
                        )}
                    </div>
                    <div>


                    </div>
                    <div>
                        {result ? (
                            <div className="mt-20">
                                <div className="w-full text-xl md:text-2xl lg:text-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 justify-center">
                                    {positionList.map(position => (
                                        <BarChartContainer key={position.id} positionId={position.id} positionName={position.name} voteCounts={voteCounts} />
                                    ))}
                                </div>
                            </div>
                        ) : voterHasVoted ? (
                            <AlreadyVoted castedVotes={castedVotes} positionList={positionList} partyList={partyList} />
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
                                        <PrimaryButton

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

                <div className="w-full flex justify-center items-center">
                    <div className="text-gray-600 p-5 text-center">
                        <div className="text-xl">The election for this position has not started yet.</div>
                        <div className="text-xl">Please check back later for updates.</div>
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
