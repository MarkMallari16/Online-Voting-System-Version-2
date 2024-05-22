import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'
import { LuAlarmClockOff } from 'react-icons/lu'

function ElectionEndedModal({ electionEndedModalOpen, handleElectionEndedModalOpen, handleSubmit, processing,confirmText,confirmButtonText}) {

    return (
        <Dialog open={electionEndedModalOpen} handler={handleElectionEndedModalOpen}>
            <DialogHeader>Election Ended</DialogHeader>
            <form onSubmit={handleSubmit}>
                <DialogBody>
                    <div className='flex justify-center mb-5'>
                        <LuAlarmClockOff className='w-32 h-32 text-red-500' />
                    </div>
                    <div className='text-gray-900 text-center'>{confirmText}</div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleElectionEndedModalOpen}
                        className="mr-1"
                    >
                        Cancel
                    </Button>
                    <Button variant="gradient" color="blue" type='submit' disabled={processing}>
                        {confirmButtonText}
                    </Button>
                </DialogFooter>

            </form>
        </Dialog>
    )
}

export default ElectionEndedModal