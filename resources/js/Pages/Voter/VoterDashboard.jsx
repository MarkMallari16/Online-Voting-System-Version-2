import React, { useState, useEffect, useMemo, useRef } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import CandidateCard from "@/Components/CandidateCard";
import VoteConfirmationModal from "@/Components/VoteConfirmationModal";
import AlreadyVoted from "@/Components/AlreadyVoted";

import BarChartContainer from "../Moderator/BarChartContainer";
import PartylistCarousel from "@/Components/PartylistCarousel";
import Time from '../../assets/time.svg';
import ElectionHeader from "@/Components/ElectionHeader";
import toast from "react-hot-toast";
import CustomToast from "@/Components/CustomToast";


const VoterDashboard = ({ election, candidatesAll, positionList, partyList, castedVotes, voteCounts, voterHasVoted }) => {
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [now, setNow] = useState(new Date());
    const [isSuccessMessage,setIsSuccessMessage] = useState(false);
    const memoizedEndingDate = useMemo(() => {

        if (!election || election.status === 'Inactive') {
            return '';
        } else {
            return election.end_date;
        }
    }, [election]);

    const endDate = memoizedEndingDate ? new Date(memoizedEndingDate) : new Date(0);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [result, setResult] = useState(now > endDate);

    const resultRef = useRef(null);

    useEffect(() => {
        if (result && resultRef.current) {
            resultRef.current.scrollIntoView({ behavior: 'smooth', block: "start" });
        }
    }, [result])

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

    const isElectionStarted = now > new Date(election?.start_date);


    const { data, setData, post, errors, processing } = useForm({
        election_id: electionId,
        candidate_ids: [],
    });

    
    console.log(errors)
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

    const onVoteSubmit = (e) => {
        e.preventDefault();

        setShowConfirmationModal(true);
    };

    const confirmVote = async () => {
        try {

            setData("candidate_ids", selectedCandidates);

            await post("/votes", {
                election_id: electionId,
                candidate_ids: selectedCandidates,
            });
            toast.success("You have successfully voted!");
            setIsSuccessMessage(true);


        } catch (error) {

            console.error("Error submitting vote:", error);
        }

        setShowConfirmationModal(false);
    };

    const getSelectedCandidatesInfo = () => {

        return selectedCandidates.map(candidateId => {

            const candidate = candidatesAll.find(candidate => candidate.id === candidateId);

            return {
                id: candidate.id,
                candidateProfile: candidate.candidate_profile,
                name: `${candidate.first_name} ${candidate?.middle_name ? candidate?.middle_name : ''} ${candidate.last_name}`,
                partylist: candidate.partylist.name,
                position: candidate.position
            };
        });
    };


    // console.log(election)


    return (
        <div>
            {isSuccessMessage && <CustomToast/>}
            {(election && election?.status === "Active") && isElectionStarted ? (

                <div>
                    <PartylistCarousel partylistCarouselData={partyList}/>
                    <ElectionHeader election={election} />
                    <div>
                        {result ? (
                            <div ref={resultRef} className="mt-10">
                                <div className="text-end">
                                    <PrimaryButton>See Winners</PrimaryButton>
                                </div>
                                <div className="w-full text-xl md:text-2xl lg:text-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 justify-center ">
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
                                    <div key={position.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-7">
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
                                                <div className="text-gray-900 p-5 text-center ">
                                                    <div>No candidate available for this position</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}


                                <div className="text-center mt-7">
                                    {
                                        result || candidatesAll.length === 0 ? "" : <PrimaryButton

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

                <div className=" w-full flex justify-center items-center bg-white py-10 rounded-md ring-1 inset-1 ring-gray-300">
                    <div className="text-gray-800 p-5 text-center flex justify-center items-center flex-col">
                        <img src={Time} alt="waiting" className="w-44" />
                        <div className="mt-2 text-xl">Please wait for the Moderator</div>
                        <div className="text-xl mb-2">Election for this position will be available soon.</div>
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