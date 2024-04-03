import React from "react";
import { GrStatusInfo } from "react-icons/gr";
import { FaUser, FaUserTie, FaUserCheck } from "react-icons/fa6";

const ModeratorOverview = ({ voters, candidates, election }) => {
    // const status = election.status;

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
                    <GrStatusInfo className=" text-3xl" />
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
                    <h2 className="text-3xl mb-8 font-bold">50</h2>
                    <p className="text-xl ">Voters Voted</p>
                </div>

                <div>
                    <FaUserCheck className=" text-3xl" />
                </div>
            </div>
        </div>
    );
};

export default ModeratorOverview;
