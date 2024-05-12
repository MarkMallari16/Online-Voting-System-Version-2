import React from 'react'

import { Dialog, DialogHeader, DialogFooter, Button } from "@material-tailwind/react";
const DeleteUserModal = ({ open, handleClose, handleDeleteUser, userId }) => {

    const handleDelete = () => {
        handleDeleteUser(userId);
    };

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Delete User</DialogHeader>
            <div className="p-8 flex justify-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-400 w-[150px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>

            </div>
            <div className="text-center">
                <p>Are you sure you want to delete this user?</p>
            </div>
            <DialogFooter>
                <Button
                    variant="text"
                    color="black"
                    onClick={handleClose}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    type='button'
                    onClick={handleDelete}
                    variant="gradient"
                    color="red"
                >
                    <div className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                        <p>Delete</p>
                    </div>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default DeleteUserModal