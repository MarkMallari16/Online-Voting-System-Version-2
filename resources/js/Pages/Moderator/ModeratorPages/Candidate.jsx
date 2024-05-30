import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CandidateTable } from '../Table/CandidateTable'
import { usePage } from '@inertiajs/react'

const Candidate = ({ auth, partylist_list, position_list, candidates, candidatesPerPage }) => {
  const { election } = usePage().props;
  return (

    <AuthenticatedLayout user={auth.user} header={<h2 className="font-medium text-xl text-gray-800 dark:text-gray-50 leading-tight ">Manage Candidate</h2>} >
      <div className="flex flex-col md:flex-row min-h-screen">

        <main className="flex-1 py-12">
          <div className="max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
            <CandidateTable partylist_list={partylist_list} position_list={position_list} candidates={candidates} candidatesPerPage={candidatesPerPage} />
          </div>
        </main>
      </div>

    </AuthenticatedLayout>
  )
}

export default Candidate