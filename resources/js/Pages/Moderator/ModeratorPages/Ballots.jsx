import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CandidateCard from '@/Components/CandidateCard'; // Assuming you have CandidateCard component
import ElectionHeader from '@/Components/ElectionHeader';
import { Button } from '@material-tailwind/react';
import { Link } from '@inertiajs/react';

import { LiaUserAltSlashSolid } from "react-icons/lia";
import { FaBox } from "react-icons/fa";

const Ballots = ({ auth, candidatesPerPosition, positionList, election }) => {

  


    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-medium text-xl text-gray-800 leading-tight">Ballot</h2>} >

            <div className='mt-10 md:mx-44'>
                <ElectionHeader election={election} />

                {positionList.length > 0 || candidatesPerPosition.length > 0 ? (
                    positionList.map((position) => (
                        <div key={position.id} className="bg-white overflow-hidden shadow-sm sm:rounded-md mt-7">
                            <div className="mt-11 font-medium text-2xl text-center">
                                Vote for {position.name}
                            </div>
                            <div className="text-center text-gray-800">
                                Select your preferred candidate(s) for the position of {position.name}
                            </div>
                            <div className={`p-6 text-gray-900`}>
                                {candidatesPerPosition.filter(candidate => candidate.position_id === position.id).length > 0 ? (
                                    <div className="mb-10 justify-center flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:justify-center gap-8 p-5 lg:p-10">
                                        {candidatesPerPosition
                                            .filter(candidate => candidate.position_id === position.id)
                                            .map(candidate => (
                                                <CandidateCard
                                                    key={candidate.id}
                                                    candidate={candidate}

                                                    positionId={position.id}
                                                />
                                            ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col justify-center items-center text-gray-900 py-5">

                                        <div>
                                            <LiaUserAltSlashSolid className='h-16 w-16' />

                                        </div>

                                        <div className='mt-4 mb-1'>
                                            No candidates found for this position.
                                        </div>


                                        <div>
                                            <Link href={route('candidate')} >

                                                <Button color='blue' variant='gradient'>

                                                    Add candidate </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))

                ) : (
                    <div className='flex  flex-col justify-center items-center mt-10 bg-white h-52 rounded-md shadow-sm'>

                        <div>
                            <FaBox className='h-10 w-10' />
                        </div>
                        <div className='text-gray-900 mt-4 mb-2'>No candidate position found</div>
                        <div>

                            <Link href={route('positions')} >

                                <Button color='blue' variant='gradient'> Create candidate positions </Button>
                            </Link>

                        </div>

                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}

export default Ballots;
