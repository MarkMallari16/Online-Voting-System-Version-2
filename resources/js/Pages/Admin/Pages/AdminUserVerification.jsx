import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AvatarComponent from '@/Components/AvatarComponent';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import { Button, Tooltip } from '@material-tailwind/react'
import { useForm } from '@inertiajs/react';
import PaginationComponent from '@/Components/PaginationComponent';
import SearchInput from '@/Components/SearchInput';

function AdminUserVerification({ auth, unverifiedUsers }) {

    const { put, processing, reset, delete: destroy } = useForm({
        id: '',
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [id, setId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [modalAction, setModalAction] = useState('');

    const handleOpenModal = (id, action) => {
        setId(id)
        setOpenModal(true);
        setModalAction(action);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedUserId(null);
        reset();
        setModalAction('');
    };

    const handleVerifyUser = (e) => {
        e.preventDefault();


        put(route('verify.user', { id: id }), {
            onSuccess: () => {
                console.log('User verify successfully')
                handleCloseModal()
            },
            onError: () => {
                console.log('User not verified')
            },
        })

    }

    const handleRejectUser = (e) => {
        e.preventDefault();


        destroy(route('reject.user', { id: id }), {
            onSuccess: () => {
                console.log('User verify successfully')
                handleCloseModal()
            },
            onError: () => {
                console.log('User not verified')
            },
        })

    };

    console.log(unverifiedUsers.data)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-medium text-xl text-gray-800 leading-tight">
                    Verify Users
                </h2>
            }>

            <main className=" py-12">

                <div className="max-w-full mx-auto px-4 sm:max-w-4xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                    <div className='flex justify-end mb-3'>
                        <div>
                            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        </div>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 ">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    User ID
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Name
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Email
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Action

                                </th>
                            </tr>
                        </thead>
                        {unverifiedUsers.data.length === 0 || unverifiedUsers.data.filter(unverifiedUser =>
                            unverifiedUser.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ).length === 0 ? (
                            <tbody className='bg-white'>
                                <tr className="text-center">
                                    <td colSpan="5" className="py-5 text-center  text-gray-600">
                                        No unverify users found.
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {unverifiedUsers.data
                                    .filter(unverifiedUser =>
                                        unverifiedUser.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(
                                        (unverifiedUser, index) => (
                                            <tr
                                                key={index}
                                                className="bg-white"
                                            >
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                    {unverifiedUser?.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                    <div className="flex items-center gap-2">
                                                        <AvatarComponent Profile={unverifiedUser?.profile_picture} size="sm" />
                                                        <span>
                                                            {
                                                                unverifiedUser
                                                                    ?.name
                                                            }
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                    {unverifiedUser?.email}
                                                </td>
                                                <td className="px-2 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                    <div className='flex items-center gap-2'>

                                                        <div className='cursor-pointer text-white bg-red-600 py-2 px-2 rounded-lg' onClick={() => handleOpenModal(unverifiedUser.id, 'reject')}>
                                                            <Tooltip content="Reject User">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                                </svg>

                                                            </Tooltip>
                                                        </div>

                                                        <div className='cursor-pointer text-white bg-green-600 py-2 px-2 rounded-lg' onClick={() => handleOpenModal(unverifiedUser.id, 'verify')}>
                                                            <Tooltip content="Verify User">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                                                </svg>

                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        )}
                    </table>

                    <div className="flex justify-center mt-8 ">

                        <PaginationComponent
                            dataPerPage={unverifiedUsers}
                        />
                    </div>
                </div>
            </main>

            <Modal show={openModal} onClose={handleCloseModal}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold">{modalAction === 'verify' ? 'Verify' : 'Reject'} User</h2>
                    <p className="mt-2">
                        {modalAction === 'verify'
                            ? 'Are you sure you want to verify this user?'
                            : 'Are you sure you want to reject this user? This action cannot be undone.'}
                    </p>

                    <div className="mt-4 flex justify-end gap-1">
                        <Button
                            onClick={handleCloseModal}

                            variant='text'
                        >
                            Cancel
                        </Button>
                        <Button
                            color={modalAction === 'verify' ? 'green' : 'red'}
                            variant='gradient'
                            onClick={modalAction === 'verify' ? handleVerifyUser : handleRejectUser}
                            className={`px-4 py-2 rounded-md text-white }`}
                            disabled={processing}
                        >
                            {modalAction === 'verify' ? 'Verify' : 'Reject'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    )
}

export default AdminUserVerification