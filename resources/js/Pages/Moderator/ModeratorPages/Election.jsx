import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'

const Election = ({ auth }) => {

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Election</h2>} >
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        {/* Add your sidebar component here */}

        {/* Main Content */}
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
              <header className='mb-5'>
                <h2 className="text-lg font-medium text-gray-900">Election Date</h2>

                <p className="mt-1 text-sm text-gray-600">
                  Set Election Date
                </p>
              </header>
              <div className='flex gap-4'>

                <div>
                  <InputLabel htmlFor="name" value="Set Date" />

                  <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    type='date'
                  />

                  <InputError className="mt-2" />
                </div>
                <div>
                  <InputLabel htmlFor="name" value="End Date" />

                  <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    type='date'
                  />

                  <InputError className="mt-2" />
                </div>
              </div>
            </div>
          </div>

        </main>
      </div >

    </AuthenticatedLayout >
  )
}

export default Election