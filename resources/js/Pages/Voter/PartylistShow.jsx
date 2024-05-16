import Countdown from '@/Components/Countdown'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Avatar } from '@material-tailwind/react';
import React from 'react'

const PartylistShow = ({ auth, partylist, election }) => {

  console.log(partylist);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={election && <Countdown election={election} />}
    >
      <div className="flex flex-col md:flex-row min-h-screen">
        <main className="flex-1 py-12">
          <div className="max-w-full  mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl bg-white rounded-lg p-5 lg:p-10">

            <div>
              <img src={`/storage/${partylist.partylist_logo}`} alt="image" className='rounded-md' />
            </div>

            <div className='mt-5'>
              <div className='flex items-center gap-2 text-lg mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8   rounded-md">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>

                <div>
                  Partylist Description
                </div>

              </div>
              <div className='text-justify'>
                {partylist.description} 
              </div>
            </div>

            <div className='mt-10 mb-5 text-center text-3xl'>
              {partylist.name} Partylist Members
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
              {partylist.candidates.map((candidate) => (
                <div key={candidate.id} className='flex items-center gap-5 ring-1 ring-inset ring-gray-300 bg-gray-50 rounded-md p-5 hover:bg-gray-200 ease-in duration-100'>
                  <div>
                    <Avatar src={`/storage/${candidate.candidate_profile}`} size='xl'></Avatar>
                  </div>
                  <div>
                    <div className='text-2xl font-medium'>
                      {`${candidate.first_name} ${candidate.last_name}`}

                    </div>
                    <div className='text-md'>
                      {candidate.position.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  )
}

export default PartylistShow
