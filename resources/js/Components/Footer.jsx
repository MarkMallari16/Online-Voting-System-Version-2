import { Typography } from '@material-tailwind/react'
import React from 'react'
import CouncilLogo from '../assets/councilLogo.png'
import ApplicationLogo from './ApplicationLogo'
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { Link } from '@inertiajs/react'

const Footer = () => {
  return (
    <>
      <footer className="mt-24 w-auto p-8 mx-0  md:mx-20">
        <div className="flex flex-row flex-wrap items-center justify-between gap-y-6 gap-x-12 bg-white text-center md:justify-between">
          <img src={CouncilLogo} alt="council-logo" className='w-28' />
          <ul className="flex flex-wrap items-center gap-y-12 gap-x-8">
            <li className='cursor-pointer'>
              <Link href={route('login')}>
                <Typography


                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                >
                  Log In
                </Typography>
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link href={route('register')}>
                <Typography
                  color="blue-gray"
                  className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
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
              &copy; {new Date().getFullYear()} STI SHS Student Council
            </Typography>
          </div>
          <div className='flex gap-2'>
            <div className='border border-1 border-gray-400 p-1 rounded-sm' >
              <a href='https://www.facebook.com/stibacoorshssc'>    <FaFacebookSquare className=' text-3xl' /></a>

            </div>
            <div className='border border-1 border-gray-400 p-1 rounded-sm' >
              <a href='https://www.facebook.com/stibacoorshssc'>    <FaInstagramSquare className=' text-3xl' /></a>

            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer