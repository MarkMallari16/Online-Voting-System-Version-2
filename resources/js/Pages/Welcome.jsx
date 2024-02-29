import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Cover from '../assets/undraw_upvote_re_qn2k.svg';

export default function Welcome({ auth }) {
    return (
        <>
            {/* */}
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div
                className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-radial-gradient"
                style={{
                    backgroundColor: 'hsla(0, 0%, 100%, 1)',
                    backgroundImage: 'radial-gradient(at 40% 20%, hsla(32,100%,88%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(212, 100%, 76%, 1) 0px, transparent 50%)'
                }}
            >

                <div className='flex sticky top-0 ' >
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

                <div className=" mt-5 flex flex-col md:flex-row items-center gap-5 mx-5 ">
                    <div className='flex-1'>
                        <div>
                            <span className='tracking-wide font-bold text-gray-800 text-center'>WELCOME TO OUR WEBSITE!</span>
                            <h1 className="text-4xl md:text-8xl font-extrabold text-center md:text-left mb-3">MAKE YOUR <span className='text-yellow-400'>VOICE</span> <span className='text-blue-300'>HEARD</span></h1>

                        </div>
                        <p className='text-lg text-center md:text-left'>Exercise your right to vote and elect your senior high school student leaders.</p>
                        <div className='mt-3 flex  md:flex-row gap-2 items-center justify-center md:justify-start'>
                            <Link
                                href={route('register')}
                                className="font-medium bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600 ease-in duration-75 focus:outline focus:outline-2 focus:rounded-sm focus:blue-red-500"
                            >
                                Register
                            </Link>
                            <Link
                                href={route('login')}
                                className="font-bold border border-blue-500 px-5 py-2 rounded-md text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 ease-in duration-75 focus:outline focus:outline-2 focus:rounded-sm focus:outline-blue-500"
                            >
                                Log in
                            </Link>
                        </div>

                        <div className='mt-3 flex  md:flex-row gap-2 items-center justify-center md:justify-start'>

                        </div>
                    </div>
                    <div className="flex-1" >
                        <img src={Cover} alt="hero-section" className="w-[80%] h-auto" />
                    </div>
                </div>
            </div >
        </>

    );

}
