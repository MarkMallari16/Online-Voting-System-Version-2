import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import Modal from './Modal'

import { FaVoteYea } from "react-icons/fa";
import { Avatar, Button } from '@material-tailwind/react';

<<<<<<< HEAD
=======
import { IoIosCheckboxOutline } from "react-icons/io";
<<<<<<< HEAD
=======
import DefaultCandidatePicture from "../../../public/storage/candidate_profile_photos/default_candidate_profile.png";
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933

import { FaBox } from "react-icons/fa";

import Thankyou from '../../js/assets/thankyou.svg';

function CastedVotesModal({ showModal, handleClose, castedVotes }) {
  return (
    <Modal show={showModal} onClose={handleClose} maxWidth='xl' >
      <div className='p-8 dark:bg-[#252525] dark:text-gray-50' >
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-2'>
            <FaVoteYea className='text-5xl bg-gray-200 dark:bg-gray-800  p-2 rounded-md ' />

            <div className='text-2xl font-medium'>Casted Votes</div>
          </div>
          <div className='p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-all ease-in-out duration-200 cursor-pointer' onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex justify-center gap-1 ">
          <div className='mt-2 w-full'>
            <ul>
              {castedVotes.some(vote => vote.isAbstained) ? (
                <div className='flex flex-col justify-center items-center'>
                  <div>
                    <FaBox className='w-10 h-10  mb-4 text-gray-900' />
                  </div>
                  <div className='text-center text-gray-900'>You have chosen to abstain from voting for all positions.</div>
                </div>

              ) : (
                castedVotes?.filter(vote => vote.candidate).sort((vote1, vote2) => vote1?.candidate?.position_id - vote2?.candidate?.position_id).map(vote => (
                  <li key={vote.id} className="mb-3 ring-1 ring-inset ring-gray-900 dark:ring-gray-800 p-3 rounded-md w-full">
                    <div className="flex justify-between items-center">
                      <div className='flex gap-3'>
                        <Avatar src={`storage/${vote?.candidate?.candidate_profile}`} />
                        <div>
                          <div className='font-medium'>{`${vote?.candidate?.first_name} ${vote?.candidate?.middle_name ? vote?.candidate?.middle_name : ''} ${vote?.candidate?.last_name}`}</div>
                          <div className='text-gray-900 dark:text-gray-200 flex items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                              <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                            <div >{vote?.candidate?.partylist?.name}</div>
                          </div>
                        </div>
                      </div>
                      <div className='text-gray-900 dark:text-gray-400'>{vote?.candidate?.position?.name}</div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

        </div>

      </div>
    </Modal>
  )
}
const AlreadyVoted = ({ castedVotes, positionList, partyList }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSeeCastedVote = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };



  return (
    <div className='mt-8 w-full flex justify-center items-center'>
      <div className='bg-white dark:bg-[#252525] dark:text-gray-50 dark:ring-gray-800 ring-1 ring-inset ring-gray-300  shadow-sm w-full rounded-md py-10'>
        <div className='flex justify-center text-blue-500'>
          <img src={Thankyou} alt="Thank you image" className='w-1/4' />
        </div>
        <div className='text-6xl md:text-8xl font-bold text-center'>Thank you!</div>
        <div className='text-center my-3 text-gray-900 dark:text-gray-400'>You have successfully voted!</div>
        <div className='text-8xl text-green-700 flex justify-center'>

        </div>
        <div className='text-center mt-3'>
          <Button color='blue' variant='gradient' onClick={handleSeeCastedVote} className='bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md'>See Casted Vote</Button>
        </div>
      </div>

<<<<<<< HEAD
      <Modal show={showModal} onClose={handleClose} maxWidth='xl' >
        <div className='p-8'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-2'>
              <FaVoteYea className='text-5xl bg-gray-200 p-2 rounded-md ' />

              <div className='text-2xl font-medium'>Casted Votes</div>
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
<<<<<<< HEAD
                {castedVotes.some(vote => vote.isAbstained) ? (
                  <div className='flex flex-col justify-center items-center'>
                    <div>
                      <FaBox className='w-10 h-10  mb-4 text-gray-900' />
                    </div>
                    <div className='text-center text-gray-900'>You have chosen to abstain from voting for all positions.</div>
                  </div>
=======
                {castedVotes.sort((vote1, vote2) => vote1.candidate.position_id - vote2.candidate.position_id).map(vote => (
                  <li key={vote.id} className="mb-3 ring-1 ring-inset ring-gray-900   p-3 rounded-md w-full">
                    <div className="flex justify-between items-center ">
                      <div className='flex gap-3'>
<<<<<<< HEAD
                        <Avatar src={ `storage/${vote.candidate.candidate_profile}`} />
=======
                        <Avatar src={vote.candidate.candidate_profile ? `storage/${vote.candidate.candidate_profile}` : DefaultCandidatePicture} />
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
                        <div>
                          <div className='font-medium'>{`${vote.candidate.first_name} ${vote.candidate?.middle_name ? vote.candidate.middle_name : ''} ${vote.candidate.last_name}`}</div>
                          <div className='text-blue-gray-900 flex items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                              <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                            </svg>
                            <div>{getPartylistName(vote.candidate.partylist_id)}</div>
>>>>>>> 322bd4894822b2699a0f1730a42d9fab92e91933

                ) : (
                  castedVotes?.filter(vote => vote.candidate).sort((vote1, vote2) => vote1?.candidate?.position_id - vote2?.candidate?.position_id).map(vote => (
                    <li key={vote.id} className="mb-3 ring-1 ring-inset ring-gray-900 p-3 rounded-md w-full">
                      <div className="flex justify-between items-center">
                        <div className='flex gap-3'>
                          <Avatar src={`storage/${vote?.candidate?.candidate_profile}`} />
                          <div>
                            <div className='font-medium'>{`${vote?.candidate?.first_name} ${vote?.candidate?.middle_name ? vote?.candidate?.middle_name : ''} ${vote?.candidate?.last_name}`}</div>
                            <div className='text-blue-gray-900 flex items-center gap-1'>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                              </svg>
                              <div>{getPartylistName(vote?.candidate?.partylist_id)}</div>
                            </div>
                          </div>
                        </div>
                        <div className='text-blue-gray-900'>{getPositionName(vote?.candidate?.position_id)}</div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </div>

          </div>

        </div>
      </Modal>
=======
      <CastedVotesModal showModal={showModal} handleClose={handleClose} castedVotes={castedVotes} />
>>>>>>> a5d97759504b06652679829a51d708a4355848c1
    </div>

  )
}

export default AlreadyVoted