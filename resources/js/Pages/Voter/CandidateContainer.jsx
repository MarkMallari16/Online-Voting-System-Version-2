import React from 'react'
import CandidateCard from './CandidateCard'

const CandidateContainer = () => {
  return (
    <div className='p-4  h-auto overflow-x-auto'>
     
      <div className='mb-10 flex gap-5 p-10 sm:p-5'>

        <CandidateCard />
        <CandidateCard />
        <CandidateCard />
        <CandidateCard />
      </div>
    </div>
  )
}

export default CandidateContainer