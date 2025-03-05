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

const VoterDashboard = ({ authenticatedName, election, candidatesAll, positionList, partyList, castedVotes, voteCounts, voterHasVoted, candidateWinners }) => {

    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [now, setNow] = useState(new Date());
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);

    const electionId = election ? election.id : 0;

    const memoizedEndingDate = useMemo(() => {

        if (!election || election.status === 'Inactive') {
            return null;
        } else {
            return election.end_date;
        }
    }, [election]);

    const endDate = memoizedEndingDate ? new Date(memoizedEndingDate) : new Date();

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showCandidateWinnerModal, setShowCandidateWinnerModal] = useState(false);

    const isElectionEnded = election?.status === 'Inactive' || now > endDate;
    const isElectionStarted = now > new Date(election?.start_date);


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

    useEffect(() => {
        setData("candidate_ids", selectedCandidates);
    }, [selectedCandidates]);

    const { data, setData, post, errors, processing } = useForm({
        election_id: electionId,
        candidate_ids: [],
    });


    useEffect(() => {
        setData("candidate_ids", selectedCandidates);
    }, [selectedCandidates]);


    const onSelectCandidate = (candidateId, positionId) => {

        const isCandidateSelected = selectedCandidates.some(
            (candidate) =>
                candidatesAll.find((c) => c.id === candidate).position_id ===
                positionId
        );

        if (isCandidateSelected) {

            setSelectedCandidates((prevState) =>
                prevState.filter(
                    (candidate) =>
                        candidatesAll.find((c) => c.id === candidate)
                            .position_id !== positionId
                )
            );
        } else {

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

    const confirmVote = () => {
        try {

            setData("candidate_ids", selectedCandidates);

            post(route('votes.store', data));
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


    return (
        <div>
            {/* <div className="bg-white text-gray-900 dark:bg-[#252525] dark:ring-gray-800 dark:text-gray-100 ring-1 ring-gray-300 overflow-hidden shadow-sm rounded-lg mb-8 ">
                <div className="p-6 ">
                    <h1 className="text-xl font-medium">Welcome back, {authenticatedName}!</h1>
                </div>
            </div> */}

            {!isElectionEnded && (
                <>
                    <PartylistCarousel partylistCarouselData={partyList} />
                    {shouldShowToast && <CustomToast />}
                </>
            )}

            {(election && election?.status === "Active") && isElectionStarted ? (
                <div>
                    <div>
                        {isElectionEnded ? (
                            <>
                                <VoteCandidateWinnerModal isOpen={showCandidateWinnerModal} onClose={() => setShowCandidateWinnerModal(false)} candidateWinners={candidateWinners} electionTitle={election?.title} />

                                <div ref={resultRef} className="">
                                    <div className="text-end">
                                        <Button color="blue" variant="gradient" onClick={() => setShowCandidateWinnerModal(true)}>
                                            <div className="flex items-center gap-1">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                                                    </svg>
                                                </div>
                                                <div>

                                                    View Election Winners
                                                </div>
                                            </div>
                                        </Button>
                                    </div>
                                    <div className="w-full text-xl md:text-2xl lg:text-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 justify-center mt-5">
                                        {positionList.map(position => (
                                            <BarChartContainer key={position.id} positionId={position.id} positionName={position.name} voteCounts={voteCounts} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : voterHasVoted ? (
                            <AlreadyVoted castedVotes={castedVotes} positionList={positionList} partyList={partyList} />
                        ) : (
                            <form onSubmit={onVoteSubmit}>
                                {positionList.map((position) => {
                                    const filteredCandidates = candidatesAll.filter(candidate => candidate.position_id === position.id);

                                    return (
                                        <div key={position.id} className="bg-white dark:bg-[#252525] dark:text-gray-50 dark:ring-gray-800 ring-1 ring-inset ring-gray-300  overflow-hidden shadow-sm rounded-lg mt-7">
                                            <div className="mt-11 font-medium text-2xl text-center">
                                                Vote for {position.name}
                                            </div>
                                            <div className="text-center text-gray-600 dark:text-gray-500">
                                                Select your preferred candidate(s) for the position of {position.name}
                                            </div>
                                            <div className={`p-6 text-gray-900`}>
                                                {filteredCandidates.length > 0 ? (
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
                                                        <div className="flex justify-center">
                                                            <div className="flex flex-col items-center">
                                                                <div>
                                                                    <LiaUserAltSlashSolid className='h-16 w-16 dark:text-gray-50' />

                                                                </div>
                                                                <div className="mt-2 dark:text-gray-400">

                                                                    No candidate available for this position
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}


                                <div className="text-center mt-7">
                                    {
                                        result || candidatesAll.length === 0 ? "" :
                                            <Button color="blue" variant="gradient"

                                                onClick={onVoteSubmit}
                                                disabled={processing}
                                                className=" text-white px-10 py-3 rounded-md"
                                            >
                                                Submit
                                            </Button>
                                    }
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            ) : (

                <div className=" w-full flex justify-center items-center bg-white dark:bg-[#252525] dark:ring-gray-800 py-10 rounded-md ring-1 inset-1 ring-gray-300">
                    <div className="text-gray-900 dark:text-gray-50 p-5 text-center flex justify-center items-center flex-col">
                        <img src={Time} alt="waiting" className="w-44" />
                        <div className="mt-3 text-xl">Please wait for the Moderator</div>
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