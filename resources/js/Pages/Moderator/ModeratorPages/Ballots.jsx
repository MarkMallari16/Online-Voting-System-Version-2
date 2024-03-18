import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
const Ballots = ({auth}) => {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ballots</h2>} >
            <div className="flex flex-col md:flex-row min-h-screen">


            </div>

        </AuthenticatedLayout>
    )
}

export default Ballots