import React from "react";

import { PiStudent } from "react-icons/pi";
import { BsPersonCheck } from "react-icons/bs";
import { LiaUserTieSolid } from "react-icons/lia";
import { CiSquareInfo } from "react-icons/ci";
import { HiOutlineCheckCircle } from "react-icons/hi";

import { FiSlash } from "react-icons/fi";


const ModeratorOverview = ({ voters, candidates, election, votersVotedCount, numberOfPartylists, numberOfPositions, abstainCount }) => {

    return (
        <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 dark:text-gray-50">
            <div className="w-full sm:w-full md:w-auto flex justify-between rounded-lg bg-white px-6 py-5  md:mb-0 ring-1 ring-inset ring-gray-300  dark:ring-gray-800 dark:bg-[#252525] ">
                <div>
<<<<<<< HEAD
<<<<<<< HEAD
                    <p className="text-lg mb-8 text-black">Election Status</p>
                    <h2 className="text-4xl  font-medium">
=======
                    <h2 className="text-3xl mb-8 font-bold">
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
                        {election ? election.status : "Inactive"}
=======
                    <p className="text-lg mb-8">Election Status</p>
                    <h2 className={`text-4xl  font-medium ${new Date(election?.end_date) < new Date() ? 'text-red-700' : ''}`}>
                        {election ? (new Date(election?.end_date) < new Date() ? 'Ended' : election?.status) : 'Inactive'
                        }
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
                    </h2>
                </div>
                <div>
                    <CiSquareInfo className=" bg-amber-200 dark:bg-amber-600 w-10 h-10 rounded-lg  p-1" />
                </div>
            </div>

            <div className="w-full sm:w-full md:w-auto  flex justify-between  rounded-lg  bg-white  px-6 py-5  ring-1 ring-inset ring-gray-300  dark:ring-gray-800 col-span-1 dark:bg-[#252525]">
                <div>
<<<<<<< HEAD
<<<<<<< HEAD
                    <p className="text-lg mb-8 text-black">No. of Candidates</p>
=======
                    <p className="text-lg mb-8 ">No. of  Partylists</p>
                    <h2 className="text-4xl  font-medium">{numberOfPartylists}</h2>

                </div>

                <div>

                    <div >


                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 rounded-lg p-2 bg-deep-orange-200 dark:bg-deep-orange-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>


                    </div>

                </div>
            </div>

            <div className="w-full sm:w-full md:w-auto  flex justify-between rounded-lg  bg-white  px-6 py-5  ring-1 ring-inset ring-gray-300 dark:ring-gray-800 col-span-1 dark:bg-[#252525] ">
                <div>
                    <p className="text-lg mb-8 ">No. of Positions</p>
                    <h2 className="text-4xl  font-medium">{numberOfPositions}</h2>

                </div>

                <div>

                    <div >

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-10 h-10  rounded-lg p-2 bg-indigo-100 dark:bg-indigo-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                        </svg>

                    </div>

                </div>
            </div>

            <div className="w-full sm:w-full md:w-auto flex justify-between  px-6 py-5   bg-white  rounded-lg bg-whitemd:mb-0 ring-1 ring-inset ring-gray-300 dark:ring-gray-800 dark:bg-[#252525] ">
                <div>
                    <p className="text-lg mb-8 ">No. of Candidates</p>
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
                    <h2 className="text-4xl  font-medium">
=======
                    <h2 className="text-4xl mb-8 font-bold">
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
                        {candidates.length}
                    </h2>

                </div>
                <div>
                    <LiaUserTieSolid className='bg-green-200 dark:bg-green-600 w-10 h-10 rounded-lg p-1' />
                </div>
            </div>

            <div className="w-full sm:w-full md:w-auto  flex justify-between   px-6 py-5  rounded-lg bg-white  ring-1 ring-inset ring-gray-300  dark:ring-gray-800 sm:col-span-2 dark:bg-[#252525] ">
                <div>
<<<<<<< HEAD
<<<<<<< HEAD
                    <p className="text-lg mb-8 text-black">Total Students</p>
=======
                    <p className="text-lg mb-8 ">Total Students</p>
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
                    <h2 className="text-4xl  font-medium">{voters.length}</h2>
=======
                    <h2 className="text-3xl mb-8 font-bold">{voters.length}</h2>
                    <p className="text-xl">Total Students</p>
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
                </div>
                <div>
                    <PiStudent className='bg-blue-200 dark:bg-blue-600 w-10 h-10 rounded-lg p-1' />
                </div>
            </div>
<<<<<<< HEAD

<<<<<<< HEAD
            <div className="w-full flex justify-between sm:w-full  rounded-lg  bg-white  px-6 py-5  ring-1 ring-inset ring-gray-300">
=======
            <div className="w-full sm:w-full md:w-auto  flex justify-between   rounded-lg  bg-white  px-6 py-5  ring-1 ring-inset ring-gray-300 dark:ring-gray-800  sm:col-span-2 dark:bg-[#252525] ">
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
                <div>
                    <p className="text-lg mb-8 ">Students Voted</p>
                    <h2 className="text-4xl  font-medium">{votersVotedCount}</h2>

=======
            <div className="w-full md:w-1/3 flex justify-between sm:w-full h-50  bg-cyan-200 rounded-lg p-10">
                <div>
                    <h2 className="text-3xl mb-8 font-bold">{votersVotedCount}</h2>
                    <p className="text-xl ">Students Voted</p>
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
                </div>

                <div>

                    <div >
                        <HiOutlineCheckCircle className=" w-10 h-10  rounded-lg p-2 bg-light-blue-200 dark:bg-light-blue-600" />
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-full md:w-auto  flex justify-between   rounded-lg  bg-white  px-6 py-5  ring-1 ring-inset ring-gray-300 dark:ring-gray-800  sm:col-span-4 dark:bg-[#252525] ">
                <div>
                    <p className="text-lg mb-8 ">No. of Students Abstain</p>
                    <h2 className="text-4xl  font-medium">{abstainCount}</h2>

                </div>
                <div >
                    <div >
                        <FiSlash className=" w-10 h-10  rounded-lg p-2 bg-red-200 dark:bg-red-600" />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ModeratorOverview;
