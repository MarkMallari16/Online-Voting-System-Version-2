import Countdown from '@/Components/Countdown'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/react';
import { Avatar, Button } from '@material-tailwind/react';
import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
const PartylistShow = ({ auth, partylist, election }) => {

  console.log(partylist);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-medium text-xl text-gray-800 leading-tight">Candidate Partylists Members</h2>}
    >
      <div className="flex flex-col md:flex-row min-h-screen">
        <main className="flex-1 py-12">
          <div className="max-w-full  mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl bg-white rounded-lg p-5 lg:p-10">
            <div>

              <div>
                <img src={`/storage/${partylist.partylist_logo}`} alt="image" className='rounded-md' />
              </div>

              <div className='mt-5'>
                <div className='flex items-center gap-2 text-lg mb-1'>


                  <div className='font-medium'>
                    Partylist Description
                  </div>

                </div>
                <div className='text-justify'>
                  {partylist.description}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error provident nihil eos, tenetur debitis deserunt odio perferendis consequatur alias veritatis repellat vero voluptatum quisquam necessitatibus ullam accusamus molestias harum placeat enim similique, inventore nemo! Sequi ipsam culpa, dicta quis ad, mollitia nam explicabo illum dolor alias accusamus, possimus facere libero.
                </div>
              </div>

              <div className='mt-20 mb-5 text-3xl'>
                {partylist.name} Partylist Members
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                {partylist.candidates.map((candidate) => (
                  <div key={candidate.id} className='flex flex-col items-center ring-1 ring-inset ring-gray-300 bg-white rounded-md p-6 shadow-sm ease-in duration-100'>
                    <div>
                      <Avatar src={`/storage/${candidate.candidate_profile}`} variant='rounded' size='xxl'></Avatar>
                    </div>
                    <div className='mt-4 text-2xl font-medium'>
                      {`${candidate.first_name} ${candidate.last_name}`}

                    </div>

                    <div className='text-lg font-normal flex items-center gap-1'>


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
