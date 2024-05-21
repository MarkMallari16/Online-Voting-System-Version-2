import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Cover from '../assets/Voting-amico.svg';
import BacoorLogo from '../assets/bacoor-logo.png';
import CouncilLogo from '../assets/councilLogo.png'

import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState, useEffect } from 'react';
import Footer from '@/Components/Footer';
import { BsBox2 } from "react-icons/bs";
import { CiUser } from "react-icons/ci";





export default function Welcome({ auth }) {
    const [open, setOpen] = useState(1);
    const [scrolled, setScrolled] = useState(false);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    })

    const bgStyle = {
        backgroundColor: 'hsla(0, 0%, 100%, 1)',
        backgroundImage: 'radial-gradient(at 40% 20%, hsla(32,100%,88%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(212, 100%, 76%, 1) 0px, transparent 50%)',
    };

    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }
    return (
        <>

            <div style={bgStyle}>
                <div
                    className="h-full w-full"

                >
                    <div className={`z-50 sticky top-0 transition-all duration-300   ${scrolled ? ' bg-blue-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ' : 'bg-none'}`}>
                        <div className={`flex sm:mx-10  md:mx-20 `} >
                            <div className="mx-3 sm:mx-0">
                                <Link href='/' > <ApplicationLogo /></Link>
                            </div>
                            <div className={`flex items-center ms-auto`} >

                                <>
                                    <div className='mx-3 sm:mx-0' >
                                        <Link
                                            href={route('login')}
                                            className="font-medium text-black  focus:text-white transition-all ease-in-out"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="ms-4 font-medium  px-6 py-2 border-0 text-white rounded-md  bg-gradient-to-b from-blue-400 to-blue-600 focus:outline focus:outline-2   duration-75 dark:text-gray-400 dark:hover:text-white  focus:blue-red-500 ease-in-out"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </>
                            </div>
                        </div>

                    </div>



                    <div className="sm:mt-5 sm:mb-40 md:my-24 lg:mt-5 mt-24 flex items-center flex-col-reverse sm:flex-col-reverse md:flex-row  gap-5 sm:gap-24  mx-5 sm:mx-10  md:mx-20"

                    >
                        <div className='flex-1'>
                            <div>
                                <p className='tracking-wide font-bold text-grayy-900 text-center  md:text-left'><span >STAND UP, SPEAK OUT, AND CREATE CHANGE!</span></p>
                                <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold text-center  md:text-left mb-3">MAKE YOUR <span className='text-blue-600'>VOICE HEARD</span></h1>
                            </div>
                            <p className='mt-5 text-lg text-center md:text-left text-gray-900'>Exercise your right to vote and elect your STI Bacoor Senior High School student leaders.</p>
                            <div className='mt-5 flex  md:flex-row gap-2 items-center justify-center md:justify-start'>
                                <Link
                                    href={route('register')}
                                    className="font-medium  px-6 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-800  bg-gradient-to-b from-blue-400 to-blue-600  duration-75 focus:outline focus:outline-2 transition-all  ease-in-out"
                                >
                                    Register
                                </Link>
                                <Link
                                    href={route('login')}
                                    className=" text-black px-4 py-2 rounded-md transition-all ease-in-out"
                                >
                                    Already have an account?
                                </Link>
                            </div>

                            <div className='mt-3 flex  md:flex-row gap-2 items-center justify-center md:justify-start'>

                            </div>
                        </div>
                        <div className="flex-1 drop-shadow-2xl" >
                            <img src={Cover} alt="hero-section" className="w-auto sm:w-[89%] md:w-50 hidden sm:hiddent md:block" />
                        </div>

                    </div>
                    {/*STI Bacoor Logo and Council Logo */}
                    <div
                        className='h-auto w-full flex justify-center gap-5 my-24 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] '>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className='flex items-center justify-center md:justify-end gap-5 animate-infinite-scroll'>
                                {[...Array(14)].map((_, index) => (
                                    <div key={index} className='w-28 object-cover '>
                                        <img loading='lazy' src={index % 2 === 0 ? BacoorLogo : CouncilLogo} alt="Logo" className="pointer-events-none" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className='mt-32 mb-44 w-[90%] mx-auto'>
                        <div>
                            <div className='text-center text-4xl font-bold' >How it works?</div>
                            <div className="text-lg font-normal text-gray-900 text-center mt-2 mb-10 mx-4 lg:mx-0">
                                Explore simple steps for secure voting in the SHS student council elections.
                            </div>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-3 justify-center gap-5 flex-wrap mt-10  text-center'>
                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-b from-blue-200 to-blue-300  rounded-lg  p-4 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>

                                </div>
                                <div className="text-xl font-medium mt-3">Step 1: Register</div>
                                <div className="text-center text-gray-800 mt-2">
                                    Sign up by providing your student email and verifying your identity through email.
                                </div>
                            </div>


                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-b from-amber-200 to-amber-300 rounded-lg p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                    </svg>

                                </div>
                                <div className="text-xl font-medium mt-5">Step 2: Choose Your Candidates</div>
                                <div className="text-center text-gray-800 mt-2">
                                    Browse through the list of candidates, read their platforms.
                                </div>
                            </div>


                            <div className="flex flex-col items-center">
                                <div className="bg-gradient-to-b from-red-200 to-red-300 rounded-lg p-4">
                                    <BsBox2 className="w-5 h-5" />
                                </div>
                                <div className="text-xl font-medium mt-5">Step 3: Cast Your Vote</div>
                                <div className="text-center text-gray-800 mt-2">
                                    Submit your vote securely online.
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='mt-24 '>
                        <div>
                            <div className='text-center text-4xl font-bold' >Benefits & Features</div>
                            <div className="text-lg font-normal text-gray-900 text-center mt-2 mb-10 mx-4 lg:mx-0">
                                Discover the advantages of using the online voting system for the SHS student council elections.

                            </div>
                        </div>
                        <div>
                            <div className='w-[90%]  px-3  grid grid-cols-1 lg:grid-cols-2  justify-center mx-auto  lg:gap-4'>

                                <div className="mb-8 lg:mb-0 bg-white p-10 rounded-lg ring-1 ring-inset ring-gray-300   transition-all ease-in-out duration-300">

                                    <div className='flex items-center gap-4'>
                                        <span className='bg-yellow-200 p-2 rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </span>
                                        <div className="font-medium text-xl text-gray-900">Convenience</div>
                                    </div>

                                    <div className="text-lg font-normal mt-4">
                                        With STI Bacoor SHS Student Council Online Voting System, students can cast their votes conveniently from anywhere with an internet connection, eliminating the need to physically the school.
                                    </div>
                                </div>

                                <div className="mb-8 lg:mb-0  bg-white p-10 rounded-lg ring-1 ring-inset ring-gray-300">
                                    <div className='flex items-center gap-4' >
                                        <span className='bg-yellow-200 p-2 rounded-lg'>
                                           
                                            <CiUser className='w-8 h-8'/>
                                        </span>


                                        <div className="font-medium text-xl text-gray-900">Accessibility</div>
                                    </div>
                                    <div className="text-lg font-normal mt-4">
                                        The online voting system ensures that all eligible students have equal access to the voting process, regardless of their location.
                                    </div>
                                </div>

                                <div className="mb-8 lg:mb-0  bg-white p-10 rounded-lg ring-1 ring-inset ring-gray-300">
                                    <div className='flex items-center gap-4'>
                                        <span className='bg-yellow-200 p-2 rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                            </svg>

                                        </span>
                                        <div className="font-medium text-xl text-gray-900">Transparency</div>
                                    </div>
                                    <div className="text-lg font-normal mt-4">
                                        Transparent and verifiable results are provided instantly after the voting period ends, ensuring integrity and fairness in the election process.
                                    </div>
                                </div>


                                <div className="mb-8 lg:mb-0  bg-white p-10 rounded-lg ring-1 ring-inset ring-gray-300">
                                    <div className='flex items-center gap-4' >
                                        <span className='bg-yellow-200 p-2 rounded-lg' >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                            </svg>

                                        </span>
                                        <div className="font-medium text-xl text-gray-900">Environment Friendly</div>
                                    </div>
                                    <p className="text-lg font-normal mt-4">
                                        By reducing the need for paper-based ballots and physical infrastructure, the online voting system contributes to environmental sustainability and reduces carbon footprint.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/**Frequently Asked Questions */}
                    <div className='h-auto mt-36 '>
                        <div className='text-center text-4xl font-bold' >Frequently Asked Question</div>
                        <div className="text-lg font-normal text-gray-900 text-center mt-2 mb-10 mx-4 lg:mx-0">
                            Get quick answers to common questions about the STI College Bacoor SHS student council's online voting system.
                        </div>
                        <div className=' flex justify-center'>
                            <div className='w-[90%] bg-blue-50 px-3' >
                                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(1)}>What is the online voting system for the SHS student council at STI College Bacoor?</AccordionHeader>
                                    <AccordionBody>
                                        <div className='text-lg'>
                                            The online voting system is a platform designed to facilitate the election process for the Senior High School (SHS) council at STI College Bacoor. It allows students to cast their votes electronically from anywhere with an internet connection, providing a convenient and accessible way to participate in the democratic process.
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(2)}>Who is eligible to vote in the SHS student council elections?</AccordionHeader>
                                    <AccordionBody>
                                        <div className='text-lg'>All Senior High School (SHS) students currently enrolled at STI College Bacoor are eligible to vote in the student council elections.</div>
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(3)}>Can I change my vote after submitting?</AccordionHeader>
                                    <AccordionBody>
                                        <div className='text-lg'>
                                            No, once a vote is submitted, it is final.
                                        </div>
                                    </AccordionBody>
                                </Accordion>


                            </div>
                        </div>
                    </div>
                    <div>


                    </div>
                    <Footer />
                </div>

            </div>
        </>

    );

}
