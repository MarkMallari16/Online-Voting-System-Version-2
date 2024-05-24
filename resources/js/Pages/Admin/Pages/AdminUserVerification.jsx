import React from 'react'
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AvatarComponent from '@/Components/AvatarComponent';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import { Button, Tooltip } from '@material-tailwind/react'
import { useForm } from '@inertiajs/react';
import PaginationComponent from '@/Components/PaginationComponent';

function AdminUserVerification({ auth, unverifiedUsers }) {

    const { put, processing, reset, delete: destroy } = useForm({
        id: '',
    });

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
                    <table className="min-w-full divide-y divide-gray-200 ">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    User ID
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ">
                                    Name
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                    Action

                                </th>
                            </tr>
                        </thead>
                        {unverifiedUsers.data.length === 0 ? (
                            <tbody className='bg-white'>
                                <tr className="text-center">
                                    <td colSpan="3" className="py-5 text-center  text-gray-600">
                                        No unverify users found.
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {unverifiedUsers.data.map(
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

                                            <td className="px-2 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                                <div className='flex gap-2'>

                                                    <div className='cursor-pointer text-white bg-red-500 px-4 py-3 rounded-lg' onClick={() => handleOpenModal(unverifiedUser.id, 'reject')}>
                                                        <Tooltip content="Reject User">
                                                            Reject
                                                        </Tooltip>
                                                    </div>

                                                    <div className='cursor-pointer text-white bg-green-500 px-4 py-3 rounded-lg' onClick={() => handleOpenModal(unverifiedUser.id, 'verify')}>
                                                        <Tooltip content="Verify User">
                                                            Verify
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
                    <h2 className="text-lg font-semibold">Verify User</h2>
                    <p className="mt-2">
                        {modalAction === 'verify'
                            ? 'Are you sure you want to verify this user?'
                            : 'Are you sure you want to reject this user? This action cannot be undone.'}
                    </p>

                    <div className="mt-4 flex justify-end gap-3">
                        <Button
                            onClick={handleCloseModal}
                            color='none'
                            variant='gradient'
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