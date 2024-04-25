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
import { motion } from 'framer-motion';
import Footer from '@/Components/Footer';

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


    return (
        <>

            <div>
                <div
                    className="h-full w-full"
                    style={bgStyle}
                >
                    <div className={`z-50 sticky top-0 transition-all duration-300   ${scrolled ? ' bg-blue-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ' : 'bg-none'}`}>
                        <div className={`flex  mx-5 sm:mx-24  md:mx-20 `} >
                            <div className="logo">
                                <ApplicationLogo />
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



                    <motion.div className="sm:mt-5 mt-24 flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center gap-5 sm:gap-24  mx-5 sm:mx-24  md:mx-20"
                        initial={{
                            opacity: 0,
                        }}
                        whileInView={{ opacity: 1 }}
                        viewport={{
                            amount: 'all',


                        }}

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

                    </motion.div>

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        whileInView={{ opacity: 1 }}
                        viewport={{
                            amount: 'all',


                        }}

                        className='h-auto w-full flex justify-center gap-5 mt-10 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)] filter'>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className='flex items-center justify-center md:justify-end gap-5 animate-infinite-scroll'>
                                {[...Array(14)].map((_, index) => (
                                    <div key={index} className='w-28'>
                                        <img loading='lazy' src={index % 2 === 0 ? BacoorLogo : CouncilLogo} alt="STI Bacoor Logo" />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>

                    <div className='h-auto' >
                        <div className='mt-24 text-center text-4xl font-bold' >Frequently Asked Question</div>
                        <p className="text-lg font-normal text-gray-600 text-center mt-1 mb-10">
                            Get quick answers to common questions about the SHS student council's online voting system.
                        </p>                        <div className=' flex justify-center'>
                            <div className='w-[90%] bg-blue-50 px-3' >
                                <Accordion open={open === 1}>
                                    <AccordionHeader onClick={() => handleOpen(1)}>What is the online voting system for the SHS student council at STI College Bacoor?</AccordionHeader>
                                    <AccordionBody>
                                        The online voting system is a platform designed to facilitate the election process for the Senior High School (SHS) council at STI College Bacoor. It allows students to cast their votes electronically from anywhere with an internet connection, providing a convenient and accessible way to participate in the democratic process.
                                    </AccordionBody>
                                </Accordion>
                                <Accordion open={open === 2}>
                                    <AccordionHeader onClick={() => handleOpen(2)}>Who is eligible to vote in the SHS student council elections?</AccordionHeader>
                                    <AccordionBody>
                                        All Senior High School (SHS) students currently enrolled at STI College Bacoor are eligible to vote in the student council elections.
                                    </AccordionBody>
                                </Accordion>
                            </div>
                        </div>
                    </div>

                    {/*<Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                    >
                        &nbsp;
                    </Typography>
                    <Typography
                        as="div"
                        variant="paragraph"
                        className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                    >
                        &nbsp;
                    </Typography>
                    <Button
                        disabled
                        tabIndex={-1}
                        className="h-8 w-20 bg-gray-300 shadow-none hover:shadow-none"
                    >
                        &nbsp;
                    </Button> */}
                    <Footer />
                </div>
                {/*
              <div >
                    <div className='mt-24 mb-10 text-center text-4xl font-bold' >Meet the Candidate</div>
                    <div className=' flex justify-center'>

                    </div>
                </div>
            */}
            </div>
        </>

    );

}
