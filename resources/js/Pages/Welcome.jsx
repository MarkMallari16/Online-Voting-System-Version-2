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
import { FaAngleUp } from "react-icons/fa";

import Footer from '@/Components/Footer';
import { ArrowUpIcon } from '@heroicons/react/20/solid';


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

            <div>
                <div
                    className="h-full w-full"
                    style={bgStyle}
                >
                    <div className={`z-50 sticky top-0 transition-all duration-300   ${scrolled ? ' bg-blue-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ' : 'bg-none'}`}>
                        <div className={`flex sm:mx-24  md:mx-20 `} >
                            <div className="logo">
                                <Link href='/' > <ApplicationLogo /></Link>
                            </div>
                            <div className={`flex items-center ms-auto`} >

                                <>
                                    <div className='mx-5' >
                                        <Link
                                            href={route('login')}
                                            className="font-medium text-black   focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="ms-4 font-medium bg-blue-600 px-3 py-2 border-0 text-white rounded-md hover:bg-blue-600  ease-in duration-75 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:blue-red-500"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </>
                            </div>
                        </div>

                    </div>



                    <div className="sm:mt-5 md:my-24 lg:mt-5 mt-24 flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center gap-5 sm:gap-24  mx-5 sm:mx-24  md:mx-20"

                    >
                        <div className='flex-1'>
                            <div>
                                <p className='tracking-wide font-bold text-gray-900 text-center  md:text-left'><span >STAND UP, SPEAK OUT, AND CREATE CHANGE!</span></p>
                                <h1 className="text-5xl md:text-6xl font-extrabold text-center  md:text-left mb-3">MAKE YOUR <span className='text-blue-600'>VOICE HEARD</span></h1>

                            </div>
                            <p className='text-lg text-center md:text-left'>Exercise your right to vote and elect your senior high school student leaders.</p>
                            <div className='mt-3 flex  md:flex-row gap-2 items-center justify-center md:justify-start'>
                                <Link
                                    href={route('register')}
                                    className="font-medium bg-blue-600 px-4 py-2 text-white rounded-md hover:bg-blue-600 ease-in duration-75 focus:outline focus:outline-2 focus:rounded-sm focus:blue-red-500 "
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
                            <img src={Cover} alt="hero-section" className="w-auto sm:w-[89%] md:w-50" />
                        </div>

                    </div>
                    {/*STI Bacoor Logo and Council Logo */}
                    <div
                        className='h-auto w-full flex justify-center gap-5 mt-10 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] filter'>
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

                    <div className='h-auto mt-24'>
                        <div className='text-center text-4xl font-bold' >Frequently Asked Question</div>
                        <p className="text-lg font-meidium text-gray-800 text-center mt-2 mb-10">
                            Get quick answers to common questions about the STI College Bacoor SHS student council's online voting system.
                        </p>
                        <div className=' flex justify-center'>
                            <div className='w-[90%] bg-blue-50 px-3' >
                                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(1)}>What is the online voting system for the SHS student council at STI College Bacoor?</AccordionHeader>
                                    <AccordionBody>
                                        The online voting system is a platform designed to facilitate the election process for the Senior High School (SHS) council at STI College Bacoor. It allows students to cast their votes electronically from anywhere with an internet connection, providing a convenient and accessible way to participate in the democratic process.
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                                    <AccordionHeader onClick={() => handleOpen(2)}>Who is eligible to vote in the SHS student council elections?</AccordionHeader>
                                    <AccordionBody>
                                        All Senior High School (SHS) students currently enrolled at STI College Bacoor are eligible to vote in the student council elections.
                                    </AccordionBody>
                                </Accordion>


                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>

            </div>
        </>

    );

}
