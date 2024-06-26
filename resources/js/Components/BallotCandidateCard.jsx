import { Avatar, Radio } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'
import { FaUsers } from "react-icons/fa";

import {
    Card,
    CardBody,
    CardFooter,
    Typography,

} from "@material-tailwind/react";
import CandidateModal from '@/Components/CandidateModal';
const BallotCandidateCard = ({ candidate }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>
            <Card className={`px-5 py-8 w-full ring-1 ring-gray-300 dark:bg-[#1f1f1f] dark:ring-gray-800   md:w-96 h-auto `}>
                <div className='flex justify-center  '>
                    <Avatar src={`storage/${candidate.candidate_profile}`} size="xxl" withBorder={true} className='border-none' />
                </div>


                <CardBody className='text-center'>
                    <Typography variant="h5"  className="mb-1 text-gray-900 dark:text-gray-50">
                        {`${candidate.first_name} ${candidate.middle_name === null ? '' : ''} ${candidate.last_name}`}
                    </Typography>
                    <div className='flex items-center justify-center gap-1 text-gray-900 dark:text-gray-500'>
                        <span><FaUsers className='text-lg' /></span>
                        <span>{candidate.partylist.name}</span>
                    </div>

                </CardBody>
                <CardFooter className="pt-0 text-center">
                    <button type='button' className='text-center text-black font-medium bg-gray-300 hover:bg-gray-400 transition-all ease-in-out text px-3 py-2 rounded-md z-50' onClick={handleOpen}>View Platform</button>
                </CardFooter>
            </Card>

            <CandidateModal candidate={candidate} isOpen={open} onClose={handleClose} />
        </>



    )
}

export default BallotCandidateCard