import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,

} from "@material-tailwind/react";
const DeleteModal = ({ open, handleDeleteOpen, handleDeleteData, id, dataName, processing }) => {
    return (
        <Dialog open={open} handler={handleDeleteOpen}>
            <DialogHeader>Delete {dataName}</DialogHeader>
            <div className="p-8 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-red-400 w-[150px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
            </div>
            <div className="text-center">
                <p>Are you sure you want to delete this {dataName}?</p>
            </div>
            <DialogFooter>
                <Button
                    variant="text"
                    color="black"
                    onClick={handleDeleteOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    onClick={() => handleDeleteData(id)}
                    variant="gradient"
                    color="red"
                    disabled={processing}
                >
                    <span>Delete</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default DeleteModal