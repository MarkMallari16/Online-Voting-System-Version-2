import { Link } from '@inertiajs/react'
import React from 'react'
import Cover from '../assets/Voting-amico.svg';
const HeroComponent = () => {
    return (
        <div className="sm:mt-5 sm:mb-40 sm:my-24 md:my-10 mt-32 grid grid-cols-1  lg:grid-cols-2 place-items-center items-center flex-col-reverse sm:flex-col-reverse md:flex-row  gap-5 sm:gap-20  mx-5 sm:mx-10  md:mx-20"

        >
            <div >
                <div>
                    <p className='tracking-wide font-bold text-grayy-900 text-center  md:text-left'><span >STAND UP  AND CREATE CHANGE!</span></p>
                    <h1 className="text-5xl sm:text-6xl md:text-6xl font-extrabold text-center  md:text-left mb-3">ONLINE VOTING <span className='text-blue-600'>SYSTEM</span></h1>
                </div>
                <p className='mt-5 text-lg text-center md:text-left text-gray-900 '>Exercise your right to vote and elect your STI Bacoor Senior High School student leaders.</p>
                <div className='mt-5 flex  md:flex-row gap-2 items-center justify-center md:justify-start'>
                    <Link
                        href={route('register')}
                        className="font-medium  px-6 py-2 text-white rounded-md  hover:to-blue-700  bg-gradient-to-b from-blue-400 to-blue-600  duration-300 transition-all  ease-in"
                    >
                        Create Account
                    </Link>
                    <Link
                        href={route('login')}
                        className=" text-black px-4  rounded-md transition-all ease-in-out "
                    >
                        Already have an account?
                    </Link>
                </div>


            </div>
            <img src={Cover} alt="hero-section" className=" w-full h-full md:w-auto sm:w-[90%] xl:w-[90%]  hidden sm:hiddent md:block drop-shadow-xl" />
        </div>
    )
}

export default HeroComponent