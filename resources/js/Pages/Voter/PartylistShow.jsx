import Countdown from '@/Components/Countdown'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react';
import { Avatar, Button } from '@material-tailwind/react';
import React from 'react'

import { MdGroups } from "react-icons/md";

const PartylistShow = ({ auth, partylist, election }) => {

  console.log(partylist);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-medium text-xl text-gray-800 leading-tight dark:text-gray-50">Candidate Partylists Members</h2>}
    >
      <div className="flex flex-col md:flex-row min-h-screen">
        <main className="flex-1 py-12">
          <div className="max-w-full  mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl bg-white dark:bg-[#252525] dark:ring-1 dark:ring-inset dark:ring-gray-800 rounded-lg p-5 lg:p-10">
            <div>

              <div>
                <img src={`/storage/${partylist.partylist_logo}`} alt="image" className='rounded-md' />
              </div>

              <div className='mt-5'>
                <div className='flex items-center gap-2 text-lg mb-1'>


                  <div className='font-medium  dark:text-gray-50'>

                    Partylist Description
                  </div>

                </div>
                <div className='text-justify dark:text-gray-400'>
                  {partylist.description}

                </div>
              </div>

              <div className='mt-5 mb-3 text-2xl flex gap-2 items-center dark:text-gray-50'>
                <MdGroups className='h-10 w-10'/>

                <div> {partylist.name} Partylist Members</div>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {partylist.candidates.map((candidate) => (
                  <div key={candidate.id} className='flex flex-col items-center ring-1 ring-inset ring-gray-300 bg-gray-100 dark:bg-[#1f1f1f] dark:ring-gray-800 rounded-md p-6 shadow-sm ease-in duration-100 '>
                    <div>
                      <Avatar src={`/storage/${candidate.candidate_profile}`} variant='rounded' size='xxl'></Avatar>
                    </div>
                    <div className='mt-4 text-2xl font-medium dark:text-gray-50'>
                      {`${candidate.first_name} ${candidate.last_name}`}
                    </div>

                    <div className='text-lg font-normal flex items-center gap-1 dark:text-gray-400'>
                      {candidate.position.name}
                    </div>


                  </div>
                ))}
              </div>
            </div>

          </div>
          <div className="flex items-center justify-center mt-10">
            <Link as='Button' href="/dashboard" >
              <Button color='blue' variant='gradient' className=" flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>

                <div className='font-normal'>
                  <span>Go back to dashboard</span>
                </div>
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  )
}

export default PartylistShow
