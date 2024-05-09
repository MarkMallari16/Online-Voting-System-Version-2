import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import ModeratorNavigation from '@/Pages/Moderator/ModeratorNavigation';
import { Avatar } from '@material-tailwind/react';
import { GrDocumentTime } from "react-icons/gr";
export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100 p-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/dashboard">
                                    <ApplicationLogo className="block " />
                                </Link>

                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">

                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className={` ${route().current('dashboard')}`}
                                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="me-1 w-5 h-5">
                                        <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                                    </svg >Dashboard</NavLink>


                                {user.role === 'admin' &&
                                    <NavLink
                                        href={route('activitylog')}
                                        active={route().current('activitylog')}
                                        className={` ${route().current('activitylog')}`}
                                    >
                                        <GrDocumentTime className='w-5 h-5  me-2' />


                                        Activity Log
                                    </NavLink>

                                }
                                {user.role === 'moderator' &&
                                    <ModeratorNavigation />
                                }
                                {/**  {user.role === 'partylist_editor' &&
                                    <NavLink href={route('partylists')} active={route().current('partylists')} className={`${route().current('partylists')}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 me-1">
                                        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                                        <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                                    </svg>Partylist</NavLink>
                                } */}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">

                            <div className="ms-3 relative">

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {/*user.name */}
                                                <div className='flex items-center'>
                                                    <div>
                                                        <Avatar src={`/storage/${user.profile_picture}` } />
                                                    </div>
                                                    {/**<div>{user.name}</div> */}
                                                </div>
                                                {/*console.log(user.profile_picture)*/}

                                                <div>
                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            <div className='flex gap-2 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                                </svg>

                                                <p> Log Out</p>
                                            </div>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden '}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                        {user.role === 'admin' &&

                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                className={` ${route().current('dashboard')}`}
                            >Activity Log</ResponsiveNavLink>
                        }
                        {user.role === 'moderator' &&
                            <>
                                <ResponsiveNavLink
                                    href={route('election')}
                                    active={route().current('election')}
                                    className={` ${route().current('election')}`}
                                >Election</ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('votes')}
                                    active={route().current('votes')}
                                    className={` ${route().current('votes')}`}
                                >Votes</ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('partylists')}
                                    active={route().current('partylists')}
                                    className={` ${route().current('partylists')}`}
                                >Partylists</ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('positions')}
                                    active={route().current('positions')}
                                    className={` ${route().current('positions')}`}
                                >Positions</ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('candidate')}
                                    active={route().current('candidate')}
                                    className={` ${route().current('candidate')}`}
                                >Candidate</ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('ballot')}
                                    active={route().current('ballot')}
                                    className={` ${route().current('ballot')}`}
                                >Ballot</ResponsiveNavLink>
                            </>

                        }
                        {/**{user.role === 'partylist_editor' &&
                        <ResponsiveNavLink
                            href={route('partylists')}
                            active={route().current('partylists')}
                            className={`${route().current('partylists') ? 'active' : ''}`}
                        >
                            Partylist
                        </ResponsiveNavLink>
                    } */}
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav >
            <div className='z-40'>

            </div>
            {
                header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )
            }

            <main>{children}</main>
        </div >
    );
}
