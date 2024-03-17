import React from 'react'
import NavLink from '@/Components/NavLink'
import { PresentationChartBarIcon } from '@heroicons/react/24/solid'
import Dropdown from '@/Components/Dropdown'
const ModeratorNavigation = () => {
    return (
        <>
            {/* <NavLink href={route('dashboard')} active={route().current('partylist')} className={`${route().current('partylist')}`}>Create Partylist</NavLink>
            <NavLink href={route('dashboard')} active={route().current('dashboard')} className={`${route().current('dashboard')}`}>View Partylists</NavLink>

            <NavLink href={route('dashboard')} active={route().current('dashboard')} className={`${route().current('dashboard')}`}>Create E-Ballots</NavLink>
            <NavLink href={route('dashboard')} active={route().current('dashboard')} className={`${route().current('dashboard')}`}>View Ballots</NavLink>


            <NavLink href={route('dashboard')} active={route().current('dashboard')} className={`${route().current('dashboard')}`}>Set Schedule</NavLink>
            <NavLink href={route('dashboard')} active={route().current('dashboard')} className={`${route().current('dashboard')}`}>View Schedule</NavLink> */}

            <NavLink href={route('election')} active={route().current('election')} className={`${route().current('election')}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
            </svg>Election</NavLink>

            <NavLink href={route('partylist')} active={route().current('partylist')} className={`${route().current('partylist')}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 me-1">
                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
            </svg>Partylist</NavLink>

          
            <NavLink href={route('positions')} active={route().current('positions')} className={`${route().current('positions')}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 me-1">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
            </svg>
                Positions</NavLink>

            {/*  // <NavLink href={route('votes')} active={route().current('votes')} className={`${route().current('votes')}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 me-1">
            //     <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            // </svg>
            //     Votes</NavLink> */}

            <NavLink href={route('candidate')} active={route().current('candidate')} className={`${route().current('candidate')}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 me-1">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
                Candidate</NavLink>



            <NavLink href={route('live-result')} active={route().current('live-result')} className={`${route().current('live-result')}`}><PresentationChartBarIcon className="h-5 w-5 me-1" /> Live Results</NavLink>
        </>
    )
}

export default ModeratorNavigation