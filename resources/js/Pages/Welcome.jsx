import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Cover from '../assets/Voting-amico.svg';

export default function Welcome({ auth }) {
    
    const bgStyle = {
       
        backgroundColor: 'hsla(0, 0%, 100%, 1)',
        backgroundImage: 'radial-gradient(at 40% 20%, hsla(32,100%,88%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(212, 100%, 76%, 1) 0px, transparent 50%)'

    }
   
    return (
        <>
            {/* */}

            <div
                className="absolute inset-0 -z-10 h-full w-full"
                style={bgStyle}
            >

                <div className='flex sticky top-0 mx-5 sm:mx-24  md:mx-20' >
                    <div className="logo">
                        <ApplicationLogo />
                    </div>
                    <div className="flex items-center ms-auto" >

                        <>
                            <div className='mx-5' >
                                <Link
                                    href={route('login')}
                                    className="font-medium text-black hover:text-white dark:text-gray-400 dark:hover:text-white ease-in duration-75 focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="ms-4 font-medium bg-blue-500 px-3 py-2 text-white rounded-md hover:bg-blue-600  ease-in duration-75 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:blue-red-500"
                                >
                                    Register
                                </Link>
                            </div>
                        </>

                    </div>
                </div>

                <div className="sm:mt-5 mt-24 flex flex-col-reverse sm:flex-col-reverse md:flex-row items-center gap-5 sm:gap-24 mx-5 sm:mx-24  md:mx-20">
                    <div className='flex-1'>
                        <div>
                            <p className='tracking-wide font-bold text-gray-900 text-center md:text-left'><span >STAND UP, SPEAK OUT, AND CREATE CHANGE!</span></p>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-center md:text-left mb-3">MAKE YOUR <span className='text-yellow-500'>VOICE</span> <span className='text-blue-500'>HEARD</span></h1>

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
                                className="bg-blue-50  px-4 py-2 rounded-md text-black "
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

        </>

    );

}
