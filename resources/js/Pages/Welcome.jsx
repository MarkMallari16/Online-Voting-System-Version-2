import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Cover from '../assets/undraw_voting_nvu7-removebg-preview.png';

export default function Welcome({ auth }) {
    return (
        <>
            <div style={{
                backgroundColor: 'hsla(0, 0%, 100%, 1)',
                backgroundImage: 'radial-gradient(at 40% 20%, hsla(32,100%,88%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(212, 100%, 76%, 1) 0px, transparent 50%)'
            }}>

                <div className='flex sticky top-0 '>
                    <div className="logo">
                        <ApplicationLogo />
                    </div>
                    <div className="flex items-center ms-auto">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-black  dark:text-gray-400 focus:outline focus:outline-2 focus:rounded-sm focus:blue-red-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <div className='mx-5'>
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-black hover:text-white dark:text-gray-400 dark:hover:text-white ease-in duration-75 focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                                    >
                                        Log in
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="ms-4 font-semibold bg-blue-500 px-3 py-2 text-white rounded-sm hover:bg-blue-600  ease-in duration-75 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:blue-red-500"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className=" mt-5 flex flex-col md:flex-row items-center gap-5 mx-5 ">
                    <div className='flex-1'>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-center md:text-left mb-3">Make Your Voice Heard: Vote for Your Senior High School Student Council!</h1>
                        <p className='text-lg text-center md:text-left'>Exercise your right to vote and elect your senior high school student leaders.</p>
                        <div className='mt-3 flex  md:flex-row gap-2 items-center justify-center md:justify-start'>
                            <Link
                                href={route('register')}
                                className="font-semibold bg-blue-500 px-4 py-2 text-white rounded-sm hover:bg-blue-600 ease-in duration-75 focus:outline focus:outline-2 focus:rounded-sm focus:blue-red-500"
                            >
                                Register
                            </Link>
                            <Link
                                href={route('login')}
                                className="font-semibold border border-black px-4 py-2 rounded-sm text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 ease-in duration-75 focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1">
                        <img src={Cover} alt="hero-section" className="w-[100%] h-auto" />
                    </div>
                </div>
            </div >
        </>

    );
    <style>

    </style>
}
