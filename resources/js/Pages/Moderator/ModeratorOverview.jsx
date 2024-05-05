import React from "react";
import { GrStatusInfo } from "react-icons/gr";
import { FaUser, FaUserTie, FaUserCheck } from "react-icons/fa6";
import { PiStudentLight } from "react-icons/pi";
import { BsPersonCheck } from "react-icons/bs";
import { RiUser2Line } from "react-icons/ri";
import { IoRibbonOutline } from "react-icons/io5";

const ModeratorOverview = ({ voters, candidates, election, votersVotedCount }) => {
    // const status = election.status;
    // console.log(voters)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="w-full flex justify-between sm:w-full  rounded-lg bg-white px-6 py-5  md:mb-0 ring-1 ring-inset ring-gray-300 ">
                <div>
                    <p className="text-xl mb-8">Election Status</p>
                    <h2 className="text-3xl  font-bold">
                        {election ? election.status : "Inactive"}
                    </h2>

                </div>
                <div>
                    <GrStatusInfo className=" bg-amber-300 w-10 h-10 rounded-lg  p-2" />
                </div>
            </div>

            <div className="w-full  flex justify-between sm:w-full px-6 py-5   bg-white  rounded-lg bg-whitemd:mb-0 ring-1 ring-inset ring-gray-300">
                <div>
                    <p className="text-xl mb-8">No. of Candidates</p>
                    <h2 className="text-4xl  font-bold">
                        {candidates.length}
                    </h2>

                </div>
                <div>
                    <IoRibbonOutline className='  bg-light-blue-200 w-10 h-10 rounded-lg p-1' />
                </div>
            </div>

            <div className="w-full flex justify-between sm:w-full  px-6 py-5  rounded-lg bg-white  ring-1 ring-inset ring-gray-300">
                <div>
                    <p className="text-xl mb-8">Total Students</p>
                    <h2 className="text-4xl  font-bold">{voters.length}</h2>
                </div>
                <div>
                    <PiStudentLight className='bg-deep-orange-200 w-10 h-10 rounded-lg p-1' />
                </div>
            </div>

            <div className="w-full flex justify-between sm:w-full  rounded-lg  bg-white  px-6 py-5  shadow-md ring-1 ring-inset ring-gray-300">
                <div>
                    <p className="text-xl mb-8">Students Voted</p>
                    <h2 className="text-4xl  font-bold">{votersVotedCount}</h2>

                </div>

                <div>

                    <div >
                        <BsPersonCheck className=" w-10 h-10  rounded-lg p-2 bg-cyan-200" />

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ModeratorOverview;
