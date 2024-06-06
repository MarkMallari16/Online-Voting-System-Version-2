import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'

function ShowVoteDetailsModal({ selectedVote, open, handleOpen, handleClose }) {

    return (
        <Dialog open={open} size='md' handler={handleOpen}>
            {selectedVote && (
                <>
                    <DialogHeader className='flex gap-1 text-gray-900'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>

                        </div>
                        Vote Details
                    </DialogHeader>
                    <DialogBody>
                        <div >
                            <div>
                                <div className=' text-gray-900 '>
                                    <div className='flex items-center gap-1 text-xl font-medium '>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                        </svg>

                                        <div className='font-normal'>
                                            Voter Information
                                        </div>
                                    </div>

                                    <div className='flex items-center  mt-2 gap-2 text-lg'>

                                        Voter's ID:
                                        <div>{selectedVote?.user?.id}</div></div>
                                </div>

                                <div className='text-lg text-gray-900 flex items-center gap-2'>

                                    <div>Voter's Name: <span>{selectedVote?.user?.name}</span></div>
                                </div>
                            </div>

                            <div className='text-xl text-gray-900 font-medium mt-4 flex items-center gap-2'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                    </svg>
                                </div>
                                <div className='font-normal'>Election Title:</div>
                                <div className='font-normal'>{selectedVote?.election?.title}</div>

                            </div>

                            <div className='text-xl text-gray-900 font-medium mt-4 flex items-center gap-2'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>

                                </div>
                                <div className='font-normal'>Date & Time:</div>
                                <div className='font-normal'>
                                    {new Date(selectedVote?.vote_timestamp).toLocaleString()}
                                </div>

                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleClose}
                            className="mr-1"
                        >
                            <span>Close</span>
                        </Button>

                    </DialogFooter>
                </>
            )}
        </Dialog>
    )
}

export default ShowVoteDetailsModal