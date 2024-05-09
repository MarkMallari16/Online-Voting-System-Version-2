import React from "react";
import { GrStatusInfo } from "react-icons/gr";
import { FaUser, FaUserTie, } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { BsPersonCheck } from "react-icons/bs";
import { LiaUserTieSolid, LiaUserCheckSolid } from "react-icons/lia";
import { CiSquareInfo } from "react-icons/ci";


import { TbTie } from "react-icons/tb";

const ModeratorOverview = ({ voters, candidates, election, votersVotedCount }) => {
    // const status = election.status;
    // console.log(voters)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full flex justify-between sm:w-full  rounded-lg bg-white px-6 py-5  md:mb-0 ring-1 ring-inset ring-gray-300 ">
                <div>
                    <p className="text-lg mb-8 text-black">Election Status</p>
                    <h2 className="text-4xl  font-medium">
                        {election ? election.status : "Inactive"}
                    </h2>

                </div>
                <div>
                    <CiSquareInfo className=" bg-amber-300 w-10 h-10 rounded-lg  p-1" />
                </div>
            </div>

            <div className="w-full flex justify-between sm:w-full px-6 py-5   bg-white  rounded-lg bg-whitemd:mb-0 ring-1 ring-inset ring-gray-300">
                <div>
                    <p className="text-lg mb-8 text-black">No. of Candidates</p>
                    <h2 className="text-4xl  font-medium">
                        {candidates.length}
                    </h2>

                </div>
                <div>
                    <LiaUserTieSolid className='  bg-green-200 w-10 h-10 rounded-lg p-1' />
                </div>
            </div>

            <div className="w-full flex justify-between sm:w-full  px-6 py-5  rounded-lg bg-white  ring-1 ring-inset ring-gray-300">
                <div>
                    <p className="text-lg mb-8 text-black">Total Students</p>
                    <h2 className="text-4xl  font-medium">{voters.length}</h2>
                </div>
                <div>
                    <PiStudent className='bg-blue-200 w-10 h-10 rounded-lg p-1' />
                </div>
            </div>

            <div className="w-full flex justify-between sm:w-full  rounded-lg  bg-white  px-6 py-5  ring-1 ring-inset ring-gray-300">
                <div>
                    <p className="text-lg mb-8 text-black">Students Voted</p>
                    <h2 className="text-4xl  font-medium">{votersVotedCount}</h2>

                </div>

                <div>

                    <div >
                        <BsPersonCheck className=" w-10 h-10  rounded-lg p-1 bg-light-blue-200" />

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ModeratorOverview;
