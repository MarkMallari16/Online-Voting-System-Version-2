import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
const Partylist = ({ auth }) => {
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Partylist</h2>} >
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar */}
        {/* Add your sidebar component here */}

        {/* Main Content */}
        <main className="flex-1 py-12">
          <div className="max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
            Partylist
          </div>
        </main>
      </div>

    </AuthenticatedLayout>
  )
}

export default Partylist