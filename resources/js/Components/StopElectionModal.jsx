import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'

function StopElectionModal({ stopElectionModal, handleStopElectionModalOpen, handleStopElectionSubmit, processing }) {
   
    return (
        <Dialog open={stopElectionModal} handler={handleStopElectionModalOpen}>
            <DialogHeader>Election Stop</DialogHeader>
            <DialogBody>
                <div className='flex justify-center mb-5'>


                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 bg-gray-100 text-red-500 rounded-md" alt="Stop icon">
                        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
                    </svg>

                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='text-gray-900'>Are you sure you want to stop the election?</div>
                    <div className='text-red-700 text-md font-medium'>
                        This action cannot be undone.
                    </div>
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="black"
                    onClick={handleStopElectionModalOpen}
                    className="mr-1"
                >
                    Cancel
                </Button>
                <Button variant="gradient" color="red" onClick={handleStopElectionSubmit} disabled={processing}>
                    Stop the Election
                </Button>
            </DialogFooter>
        </Dialog>
    )

}

export default StopElectionModal