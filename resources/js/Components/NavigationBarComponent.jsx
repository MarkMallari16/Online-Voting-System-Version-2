import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import ApplicationLogo from './ApplicationLogo';

function NavigationBarComponent() {
    const [scrolled, setScrolled] = useState(false);


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

    
    return (
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
                                className="font-medium text-black  focus:text-black transition-all ease-in-out"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-medium  px-6 py-2 border-0 text-white rounded-md  bg-gradient-to-b from-blue-400 to-blue-600 focus:outline focus:outline-2 duration-75 "
                            >
                                Register
                            </Link>
                        </div>
                    </>
                </div>
            </div>

        </div>
    )
}

export default NavigationBarComponent