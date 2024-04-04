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
const CandidateCard = ({ candidate, onSelectCandidate, positionId, selected }) => {
    const [isSelected, setIsSelected] = useState(false);

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // Update isSelected state when selected prop changes
        setIsSelected(selected);
    }, [selected]);

    const handleCandidateClick = () => {
        onSelectCandidate(candidate.id, positionId);
    };


    return (
        <>
        {/**hover:border-blue-500 focus:border-blue-500 */}
            <Card className={`p-5 w-full shadow-md border-2 md:w-96 h-auto cursor-pointer ${isSelected ? 'border-blue-500' : 'border-transparent'}  transition-all duration-200 ease-in-out`} onClick={handleCandidateClick} >
                <div className='flex justify-center'>
                    <Avatar src={candidate.candidate_profile} size="xxl" withBorder={true} className='border-blue-500 p-0.5' />

                </div>
                <input
                    type='radio'
                    name={positionId}

                    checked={selected}
                    onChange={handleCandidateClick}
                    className='hidden'
                />
                <CardBody className='text-center'>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {`${candidate.first_name} ${candidate.middle_name} ${candidate.last_name}`}
                    </Typography>
                    <div className='flex items-center justify-center gap-2'>
                        <span><FaUsers className='text-lg' /></span>
                        <span>{candidate.partylist.name}</span>
                    </div>

                </CardBody>
                <CardFooter className="pt-0 text-center">
                    <button type='button' className='text-center text-black font-medium bg-gray-300 px-3 py-2 rounded-md' onClick={handleOpen}>View Platform</button>
                </CardFooter>
            </Card>

            <CandidateModal candidate={candidate} isOpen={open} onClose={handleClose} />


        </>



    )
}

export default CandidateCard