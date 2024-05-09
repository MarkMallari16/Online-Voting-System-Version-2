import { Typography } from '@material-tailwind/react'
import React from 'react'
import CouncilLogo from '../assets/councilLogo.png'

import BacoorSHSLogo from '../assets/bacoor-shs-logo.png';
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { Link } from '@inertiajs/react'

const Footer = () => {
  const bgStyle = {
    backgroundColor: 'hsla(0, 0%, 100%, 1)',
    backgroundImage: 'radial-gradient(at 40% 20%, hsla(32,100%,88%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(212, 100%, 76%, 1) 0px, transparent 50%)',
  };
  return (
    <>
<<<<<<< HEAD
      <footer className="mt-24 w-auto p-8 mx-0  md:mx-6" >
=======
      <footer className="mt-24 w-auto p-8 mx-0  md:mx-20" >
>>>>>>> 2d24901e4dec103af57935fd35a96b1bbd3b614f
        <div className="flex flex-row flex-wrap items-center justify-between gap-y-6 gap-x-12 bg-white text-center md:justify-between">
          <img src={BacoorSHSLogo} alt="council-logo" className='w-36' />
          <ul className="flex flex-wrap items-center gap-y-12 gap-x-8">
            <li className='cursor-pointer'>
              <Link href={route('login')}>
                <Typography


                  color="blue-gray"
                  className="font-medium transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  Log In
                </Typography>
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link href={route('register')}>
                <Typography
                  color="blue-gray"
                  className="font-medium transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  Register
                </Typography>
              </Link>
            </li>

          </ul>
        </div>
        <hr className=" border-blue-gray-100 my-8" />
        <div className='flex justify-between items-center'>
          <div>
            <Typography color="blue-gray" className="text-center font-normal">
              &copy; {new Date().getFullYear()} STI Bacoor SHS Student Council
            </Typography>
          </div>
          <div className='flex gap-2'>
            <div className='border border-1 border-gray-400 p-1 rounded-sm hover:border-blue-500 hover:text-blue-800 transition ease-in duration-100' >
              <a href='https://www.facebook.com/stibacoorshssc'>    <FaFacebookSquare className=' text-3xl' /></a>
            </div>
           
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer