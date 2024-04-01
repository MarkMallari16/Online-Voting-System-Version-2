import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Cover from '../assets/Voting-amico.svg';

import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { useState, useEffect } from 'react';

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
    // const bgStyle = {

    //     backgroundColor: 'hsla(0, 0%, 100%, 1)',
    //     backgroundImage: 'radial-gradient(at 40% 20%, hsla(32,100%,88%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(212, 100%, 76%, 1) 0px, transparent 50%)'
    // }
    const bgStyle = {
        backgroundColor: 'hsla(0, 0%, 100%, 1)',
        backgroundImage: 'radial-gradient(at 40% 20%, hsla(32,100%,88%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(212, 100%, 76%, 1) 0px, transparent 50%)',
    };

    const faqStyle = { // Add this style for the FAQ section
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Example gradient colors
        borderRadius: '10px',
        padding: '20px',
        color: '#fff',
    };
    return (
        <>
            {/* absolute inset-0 -z-10*/}
            <div >
                <div
                    className="h-full w-full"
                    style={bgStyle}
                >

                    <div className={`z-20 sticky top-0 transition-all duration-300 ${scrolled ? 'bg-gray-50 shadow-md' : 'bg-none'}`}>
                        <div className={`flex  mx-5 sm:mx-24  md:mx-20 `} >
                            <div className="logo">
                                <ApplicationLogo />
                            </div>
                            <div className={`flex items-center ms-auto`} >

                                <>
                                    <div className='mx-5' >
                                        <Link
                                            href={route('login')}
                                            className="font-medium text-black hover:text-white dark:text-gray-400 dark:hover:text-white ease-in duration-100 focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="ms-4 font-bold bg-blue-500 px-3 py-2 text-white rounded-md hover:bg-blue-600  ease-in duration-75 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:blue-red-500"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </>
                            </div>
                        </div>

                    </div>



                    <div className="sm:mt-5 mt-24 flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center gap-5 sm:gap-24 mx-5 sm:mx-24  md:mx-20">
                        <div className='flex-1'>
                            <div>
                                <p className='tracking-wide font-bold text-gray-900 text-center  md:text-left'><span >STAND UP, SPEAK OUT, AND CREATE CHANGE!</span></p>
                                <h1 className="text-5xl md:text-6xl font-extrabold text-center  md:text-left mb-3">MAKE YOUR <span className='text-yellow-500'>VOICE</span> <span className='text-blue-500'>HEARD</span></h1>

                            </div>
                            <p className='text-lg text-center md:text-left'>Exercise your right to vote and elect your senior high school student leaders.</p>
                            <div className='mt-3 flex  md:flex-row gap-2 items-center justify-center md:justify-start'>
                                <Link
                                    href={route('register')}
                                    className="font-bold bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600 ease-in duration-75 focus:outline focus:outline-2 focus:rounded-sm focus:blue-red-500"
                                >
                                    Register
                                </Link>
                                <Link
                                    href={route('login')}
                                    className=" text-blue-500  px-4 py-2 rounded-md  "
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

                </div >
                <div >
                    <div className='mt-24 mb-10 text-center text-4xl font-bold' >Meet the Candidate</div>
                    <div className=' flex justify-center'>
                        
                    </div>
                </div>
                <div >
                    <div className='mt-24 mb-10 text-center text-4xl font-bold' >Frequently Asked Question</div>
                    <div className=' flex justify-center'>
                        <div className='w-[90%] bg-blue-50 p-2' >
                            <Accordion open={open === 1}>
                                <AccordionHeader onClick={() => handleOpen(1)}>What is the online voting system for the SHS council at STI College Bacoor?</AccordionHeader>
                                <AccordionBody>
                                    The online voting system is a platform designed to facilitate the election process for the Senior High School (SHS) council at STI College Bacoor. It allows students to cast their votes electronically from anywhere with an internet connection, providing a convenient and accessible way to participate in the democratic process.
                                </AccordionBody>
                            </Accordion>

                        </div>
                    </div>
                </div>


            </div>

        </>

    );

}
