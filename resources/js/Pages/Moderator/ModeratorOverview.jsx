import React from "react";
import { GrStatusInfo } from "react-icons/gr";
import { FaUser, FaUserTie, FaUserCheck } from "react-icons/fa6";

const ModeratorOverview = ({ voters, candidates, election, votersVotedCount }) => {
    // const status = election.status;
    // console.log(voters)

    return (
        <div className="flex flex-col md:flex-row sm:flex-row justify-between gap-4">
            <div className="w-full md:w-1/3 flex justify-between sm:w-full h-50   bg-yellow-300 rounded-lg p-10 mb-2 md:mb-0">
                <div>
                    <h2 className="text-3xl mb-8 font-bold">
                        {election ? election.status : "Inactive"}
                    </h2>
                    <p className="text-xl">Election Status</p>
                </div>
                <div>
                    <GrStatusInfo className="text-3xl" />
                </div>
            </div>

            <div className="w-full md:w-1/3  flex justify-between sm:w-full h-50  bg-light-blue-200 rounded-lg p-10 mb-2 md:mb-0">
                <div>
                    <h2 className="text-4xl mb-8 font-bold">
                        {candidates.length}
                    </h2>
                    <p className="text-lg">No. of Candidates</p>
                </div>
                <div>
                    <FaUserTie className="  text-3xl" />
                </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-between sm:w-full h-50  bg-deep-orange-200 rounded-lg p-10">
                <div>
                    <h2 className="text-3xl mb-8 font-bold">{voters.length}</h2>
                    <p className="text-xl">Total Students</p>
                </div>
                <div>
                    <FaUser className=" text-3xl" />
                </div>
            </div>

            <div className="w-full md:w-1/3 flex justify-between sm:w-full h-50  bg-cyan-200 rounded-lg p-10">
                <div>
                    <h2 className="text-3xl mb-8 font-bold">{votersVotedCount}</h2>
                    <p className="text-xl ">Students Voted</p>
                </div>

                <div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>

                </div>
            </div>
        </div>
    );
};

export default ModeratorOverview;
