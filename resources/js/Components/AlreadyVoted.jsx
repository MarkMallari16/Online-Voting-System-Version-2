import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import Modal from './Modal'

import { FaVoteYea } from "react-icons/fa";
import { Avatar } from '@material-tailwind/react';

import { IoIosCheckboxOutline } from "react-icons/io";

const AlreadyVoted = ({ castedVotes, positionList, partyList }) => {
  const [showModal, setShowModal] = useState(false);
  const handleSeeCastedVote = () => {
    setShowModal(true);
  };
  // console.log(positionList);
  // console.log(partyList);
  const handleClose = () => {
    setShowModal(false);
  };

  const getPositionName = (positionId) => {
    const position = positionList.find((pos) => pos.id === positionId);

    return position && position.name;
  }
  const getPartylistName = (partylistId) => {
    const partylist = partyList.find((list) => list.id === partylistId);

    return partylist && partylist.name;
  }
  console.log(castedVotes);
  return (
    <div className='mt-10 w-full flex justify-center items-center'>
      <div className='bg-white shadow-md w-full rounded-md px-10 py-20 '>
        <div className='flex justify-center mb-2 text-blue-500'><IoIosCheckboxOutline className='text-9xl' />
        </div>
        <div className='text-6xl md:text-8xl lg:text-8xl font-bold text-center'>Thank you!</div>
        <div className='text-center mt-4 text-gray-900'>You have successfully voted!</div>
        <div className='text-8xl text-green-700 flex justify-center'>

        </div>
        <div className='text-center mt-3'>
          <PrimaryButton onClick={handleSeeCastedVote} className='bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md'>See Casted Vote</PrimaryButton>
        </div>
      </div>

      <Modal show={showModal} onClose={handleClose} maxWidth='xl' >
        <div className='p-8'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-2'>
              <FaVoteYea className='text-5xl bg-gray-200 p-2 rounded-md ' />

              <div className='text-2xl font-medium '>Casted Votes</div>
            </div>
            <div className='p-2 rounded-md hover:bg-gray-200 transition-all ease-in-out duration-200 cursor-pointer' onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="flex justify-center gap-1 ">
            <div className='mt-2 w-full'>
              <ul>
                {castedVotes.sort((vote1, vote2) => vote1.candidate.position_id - vote2.candidate.position_id).map(vote => (
                  <li key={vote.id} className="mb-3 ring-1 ring-inset ring-gray-900   p-3 rounded-md w-full">
                    <div className="flex justify-between items-center ">
                      <div className='flex gap-3'>
                        <Avatar src={ `storage/${vote.candidate.candidate_profile}`} />
                        <div>
                          <div className='font-medium'>{`${vote.candidate.first_name} ${vote.candidate?.middle_name ? vote.candidate.middle_name : ''} ${vote.candidate.last_name}`}</div>
                          <div className='text-blue-gray-900 flex items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                              <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                            <div>{getPartylistName(vote.candidate.partylist_id)}</div>

                          </div>
                        </div>
                      </div>
                      <div className='text-blue-gray-900'>{getPositionName(vote.candidate.position_id)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </Modal>
    </div>

  )
}

export default AlreadyVoted