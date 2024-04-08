import React from 'react'
import PrimaryButton from './PrimaryButton'

const AlreadyVoted = () => {
  return (
    <div>
      <div>Thank you for voting.</div>
      <PrimaryButton className=' className="bg-blue-500 hover:bg-blue-700  text-white px-6 py-3 rounded-md'>See casted vote</PrimaryButton>
    </div>
  )
}

export default AlreadyVoted