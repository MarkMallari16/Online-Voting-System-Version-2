import React from 'react'


const ModeratorOverview = ({voters,candidates,election}) => {
    const status = election.status;

    return (
        <div className='flex flex-col md:flex-row sm:flex-row justify-between gap-4'>
            <div className='w-full md:w-1/3 sm:w-full h-50 bg-amber-300 rounded-lg p-10 mb-2 md:mb-0'>
                <div>
                    <h2 className='text-3xl mb-4 font-bold'>{status}</h2>
                    <p className='text-xl'>Election Status</p>

                </div>
            </div>

            <div className='w-full md:w-1/3 sm:w-full h-50 bg-light-blue-300 rounded-lg p-10 mb-2 md:mb-0'>
                <div>

                    <h2 className='text-3xl mb-4 font-bold'>{candidates.length}</h2>
                    <p className='text-xl'>No. of Candidates</p>
                </div>
            </div>


            <div className='w-full md:w-1/3 sm:w-full h-50 bg-deep-orange-300 rounded-lg p-10'>
                <div>

                    <h2 className='text-3xl mb-4 font-bold'>{voters.length}</h2>
                    <p className='text-xl'>Total Voters</p>
                </div>
            </div>


            <div className='w-full md:w-1/3 sm:w-full h-50 bg-cyan-300 rounded-lg p-10'>
                <div>
                    <h2 className='text-3xl mb-4 font-bold'>50</h2>
                    <p className='text-xl '>Voters Voted</p>
                </div>
            </div>
        </div>
    )
}

export default ModeratorOverview