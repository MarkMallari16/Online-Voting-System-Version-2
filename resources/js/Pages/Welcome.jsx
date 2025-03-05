
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Cover from '../assets/Voting-amico.svg';
import BacoorLogo from '../assets/bacoor-logo.png';
import CouncilLogo from '../assets/councilLogo.png'

import Footer from '@/Components/Footer';

import FAQSComponent from '@/Components/FAQSComponent';
import BenefitsAndFeatures from '@/Components/BenefitsAndFeatures';
import VoterGuideComponent from '@/Components/VoterGuideComponent';
import HeroComponent from '@/Components/HeroComponent';
import NavigationBarComponent from '@/Components/NavigationBarComponent';


export default function Welcome() {


    const bgStyle = {
        backgroundColor: 'hsla(0, 0%, 100%, 1)',
        backgroundImage: 'radial-gradient(at 50% 20%, hsla(40,100%,88%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(212, 100%, 76%, 1) 0px, transparent 50%)',
    };
    return (
        <>
            <div style={bgStyle}>
                <div
                    className="h-full w-full">

                    <NavigationBarComponent />

                    <HeroComponent />

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
                    className='h-auto w-full flex justify-center gap-5 my-24 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]'>
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className='flex items-center justify-center md:justify-end gap-5 animate-infinite-scroll '>
                            {[...Array(14)].map((_, index) => (
                                <div key={index} className='w-28 object-cover '>
                                    <img loading='lazy' src={index % 2 === 0 ? BacoorLogo : CouncilLogo} alt="Logo" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <VoterGuideComponent />

                <BenefitsAndFeatures />
                <FAQSComponent />
                <Footer />
            </div>
        </>

    );

}
