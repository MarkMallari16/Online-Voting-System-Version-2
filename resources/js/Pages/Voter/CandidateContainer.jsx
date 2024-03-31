import React from 'react'
import CandidateCard from './CandidateCard'

const CandidateContainer = ({ candidatesAll, positionId }) => {
  const candidatesForPosition = candidatesAll.filter(candidate => candidate.position_id === positionId);
  console.log(candidatesAll)

  console.log(candidatesAll);
  return (
    <div className='p-4 h-auto overflow-x-auto'>

      <div className=' mb-10 flex flex-wrap justify-center sm:justify-start gap-5 p-10 sm:p-5'>
        {/* Use flex-wrap to allow items to wrap to the next line on small screens */}
        {/* Use justify-center for center alignment, justify-start for left alignment */}

        {
          candidatesForPosition.map(candidate => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))
        }
      </div>
    </div>
  )
}

export default CandidateContainer