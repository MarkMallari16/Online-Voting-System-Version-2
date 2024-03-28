import React from 'react'
import CandidateContainer from './CandidateContainer'
import Countdown from '@/Components/Countdown'
import PrimaryButton from '@/Components/PrimaryButton';
const VoterDashboard = ({ election }) => {

    const { title } = election;


    console.log(title);
    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            </div>
            <div className='text-center font-bold text-4xl mt-10 mb-2 w-100'>
                {title}
            </div>


            <div className='flex items-center justify-end gap-3 '>
               
                <button className='bg-blue-500 text-white px-2 py-2 rounded'>See Casted Votes</button>

            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-7">
                <div className='mt-11 text-2xl text-center'>Vote for President</div>
                <div className='text-center text-gray-600'>Select your preferred candidate for the position of President</div>
                <div className="p-6 text-gray-900">
                    <CandidateContainer />
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-7">
                <div className='mt-11 text-2xl text-center  mb-1'>Vote for Vice President</div>
                <div className='text-center text-gray-600'>Select your preferred candidate for the position of Vice President</div>
                <div className="p-6 text-gray-900">
                    <CandidateContainer />
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-7">
                <div className='mt-11 text-2xl text-center mb-1'>Vote for Secretary</div>
                <div className='text-center text-gray-600'>Select your preferred candidate for the position of Secretary</div>
                <div className="p-6 text-gray-900">
                    <CandidateContainer />
                </div>
            </div>
            <div className='text-center mt-7'>
                <PrimaryButton className='bg-blue-500 hover:bg-blue-700  text-white px-6 py-3 rounded-md'>Submit</PrimaryButton>
            </div>

        </div>
    )
}

export default VoterDashboard