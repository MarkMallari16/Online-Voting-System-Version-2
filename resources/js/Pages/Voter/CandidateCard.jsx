import { Avatar } from '@material-tailwind/react'
import React, { useState } from 'react'
import profile from '../../assets/stiLogo.png'

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    use

} from "@material-tailwind/react";
const CandidateCard = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    return (
        <>
            <Card className="p-5 mt-6 w-full md:w-96 h-auto cursor-pointer hover:border-2 border-blue focus:border border-blue-500">
                <div className='flex justify-center'>
                    <Avatar src={profile} size="xxl" />
                </div>
                <CardBody className='text-center'>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        Jobert Cruz
                    </Typography>
                    <span>Sandigan</span>
                </CardBody>
                <CardFooter className="pt-0 text-center">
                    <button className='text-center text-black bg-gray-200 px-3 py-2 rounded-md' onClick={handleOpen}>View Details</button>
                </CardFooter>
            </Card>


            <Dialog open={open} handler={handleOpen}>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-100 my-6 mx-auto max-w-3xl ">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                <div className="flex gap-3">
                                    <h1>
                                        <Avatar src={profile} size="xxl" />
                                    </h1>
                                    <div>
                                        <span className="text-slate-500">
                                            Vote
                                        </span>
                                        <h3 className="font-extrabold text-slate-600">
                                            Mark Mallari
                                        </h3>
                                        <div className="flex items-center gap-1">
                                            <h4 className="font-medium text-slate-500">
                                                for
                                            </h4>
                                            <h4 className="text-slate-600 font-extrabold">
                                                PRESIDENT STUDENT COUNCIL
                                            </h4>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                            </svg>

                                            <span className="font-bold text-slate-600">
                                                sandigan Partylist
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

                                >
                                    <span className="bg-transparent text-black opacity-5 6h-4 w- text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <h4 className="text-slate-700 font-extrabold">
                                    Campaign Platform
                                </h4>
                                <div className="text-slate-700">
                                    <p>
                                        1. I am committed to improving
                                        education by investing in modern
                                        teaching technologies, supporting
                                        teachers, and ensuring access to
                                        quality education for all students.
                                    </p>
                                    <p>
                                        2. My focus is on healthcare reform, advocating for affordable and accessible healthcare services, mental health awareness, and initiatives to improve overall community well-being.
                                    </p>
                                    <p>
                                        3. As a business leader, I aim to boost the local economy by attracting new businesses, creating job opportunities, and supporting entrepreneurship within our community.
                                    </p>
                                    <p>
                                        4. I am passionate about environmental sustainability, and my platform includes initiatives to promote renewable energy, reduce carbon footprint, and preserve natural habitats in our region.
                                    </p>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"

                                    onClick={handleOpen}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

        </>



    )
}

export default CandidateCard