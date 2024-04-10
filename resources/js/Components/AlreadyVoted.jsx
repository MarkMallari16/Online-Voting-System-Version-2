import React from 'react'
import PrimaryButton from './PrimaryButton'


const AlreadyVoted = () => {
  return (
    <div className='mt-10 w-full flex justify-center items-center'>
      <div>
       
        <div className='text-5xl'>Thank you for voting!</div>
        <div className='text-center mt-3'>
          <PrimaryButton className='bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-md'>See Casted Vote</PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default AlreadyVoted