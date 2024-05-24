import { Link } from '@inertiajs/react'
import React from 'react'
import Cover from '../assets/Voting-amico.svg';
const HeroComponent = () => {
    return (
        <div className="sm:mt-5 sm:mb-40 md:my-24 lg:mt-5 mt-24 flex items-center flex-col-reverse sm:flex-col-reverse md:flex-row  gap-5 sm:gap-24  mx-5 sm:mx-10  md:mx-20"

        >
            <div className='flex-1'>
                <div>
                    <p className='tracking-wide font-bold text-grayy-900 text-center  md:text-left'><span >STAND UP, SPEAK OUT, AND CREATE CHANGE!</span></p>
                    <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold text-center  md:text-left mb-3">ONLINE VOTING <span className='text-blue-600'>SYSTEM</span></h1>
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
    )
}

export default HeroComponent