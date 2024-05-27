import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'

function DeactivateElectionModal({ deactivateOpen, handleDeactivateOpen, handleDeactivate, processing }) {

    return (
      <Dialog open={deactivateOpen} handler={handleDeactivateOpen}>
        <DialogHeader>Confirm</DialogHeader>
        <DialogBody>
          <div className='flex justify-center mb-5'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
  
            </div>
          </div>
          <div className='text-gray-900 text-center'>
            Are you sure you want to deactivate the election? Once deactivated, users will no longer be able to participate in the election.
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDeactivateOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={handleDeactivate} disabled={processing}>
            Deactivate Election
          </Button>
        </DialogFooter>
      </Dialog>
    )
  
  }

export default DeactivateElectionModal