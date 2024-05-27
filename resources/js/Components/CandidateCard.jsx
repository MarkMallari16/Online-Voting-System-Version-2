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
import AvatarComponent from './AvatarComponent';
const CandidateCard = ({ candidate, onSelectCandidate, positionId, selected }) => {
    const [isSelected, setIsSelected] = useState(false);

    const [open, setOpen] = useState(false);
    const [showCheck, setShowCheck] = useState(false);

    const handleOpen = (event) => {
        event.stopPropagation();
        setOpen(true);

    };
    const handleClose = () => setOpen(false);

    useEffect(() => {

        setIsSelected(selected);
        if (selected) {
            setShowCheck(true);
        } else {
            setShowCheck(false);
        }

    }, [selected]);

    const handleCandidateClick = (event) => {
        event.stopPropagation();
        if (!open) {
            if (selected) {
                onSelectCandidate(candidate.id, positionId);

            } else {
                onSelectCandidate(null, positionId);
            }

        }
    };

    return (
        <>
            {/**hover:border-blue-500 focus:border-blue-500 */}

            <Card className={`dark:bg-[#1f1f1f] px-5 py-8 w-full ring-1 ring-gray-300 dark:ring-gray-800 md:w-96 h-auto cursor-pointer select-none   ${isSelected ? 'ring-4 ring-blue-500 dark:ring-blue-600 ' : ''}  transition-all duration-200 ease-in-out `} onClick={handleCandidateClick} >
                <div className='flex justify-center'>
<<<<<<< HEAD
<<<<<<< HEAD
                    <Avatar src={`storage/${candidate.candidate_profile}`} size="xxl" withBorder={true} className='border-black p-0.5' />
=======
                    <AvatarComponent Profile={candidate.candidate_profile} size='xxl'/>
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933
=======
                    <Avatar src={`storage/${candidate.candidate_profile}`} size="xxl" withBorder={true} className='border-none' />
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
                </div>

                <input
                    type='radio'
                    name={positionId}
                    checked={selected}
                    onChange={handleCandidateClick}
                    className='hidden'
                />
                <CardBody className='text-center'>
                    <Typography variant="h5" className="mb-2 text-gray-900 dark:text-gray-100">
                        {`${candidate.first_name} ${candidate.middle_name === null ? '' : ''} ${candidate.last_name}`}
                    </Typography>
                    <div className='flex items-center justify-center gap-1 text-gray-900 dark:text-gray-400'>
                        <span><FaUsers className='text-lg' /></span>
                        <span>{candidate.partylist.name}</span>
                    </div>


                </CardBody>

                <CardFooter className="pt-0 text-center ">
                    <button type='button' className='text-center text-black font-medium bg-gray-300 hover:bg-gray-400 transition-all ease-in-out text px-3 py-2 rounded-md z-50' onClick={handleOpen}>View Platform</button>

                </CardFooter>
                <div className={`relative flex justify-end  transition-opacity duration-100 ${showCheck ? 'opacity-100 bg-gray-200' : 'opacity-0 bg-transparent'}`}>
                    <div className='absolute bottom-0   text-blue-500 p-2 rounded-lg'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>

                    </div>
                </div>

            </Card>

            <CandidateModal candidate={candidate} isOpen={open} onClose={handleClose} />
        </>



    )
}

export default CandidateCard