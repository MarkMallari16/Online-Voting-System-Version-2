import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

import VoteTable from '../Table/VoteTable';
const Votes = ({ auth, votes, votesPerPage, voters, candidates, positions }) => {

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-medium text-xl text-gray-800 leading-tight dark:text-gray-50">Votes</h2>} >

      <div className="flex flex-col md:flex-row min-h-screen">

        <main className="flex-1 py-12 ">
          <div className="max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl ">
            <VoteTable votes={votes} votesPerPage={votesPerPage} voters={voters} candidates={candidates} positions={positions} />
          </div>
        </main>
      </div>

    </AuthenticatedLayout>
  )
}

export default Votes