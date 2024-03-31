import { Avatar, Radio } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'


import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    use

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
        if (!isSelected) {
            onSelectCandidate(candidate.id, positionId);
        }
    };


    return (
        <>
            <Card className={`p-5 mt-6 w-full shadow-md   md:w-96 h-auto cursor-pointer ${isSelected ? 'border-blue-500' : 'border-transparent'} hover:border-blue-500 focus:border-blue-500`} onClick={handleCandidateClick}>
                <div className='flex justify-center'>
                    <Avatar src={candidate.candidate_profile} size="xxl" />

                </div>
                <Radio
                    name={positionId}
                    color='blue'
                    checked={selected}
                    onChange={handleCandidateClick}
                />
                <CardBody className='text-center'>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {`${candidate.first_name} ${candidate.middle_name} ${candidate.last_name}`}
                    </Typography>
                    <span>{candidate.partylist.name}</span>

                </CardBody>
                <CardFooter className="pt-0 text-center">
                    <button type='button' className='text-center text-black font-medium bg-gray-300 px-3 py-2 rounded-md' onClick={handleOpen}>View Details</button>
                </CardFooter>
            </Card>

            <CandidateModal candidate={candidate} isOpen={open} onClose={handleClose} />


        </>



    )
}

export default CandidateCard