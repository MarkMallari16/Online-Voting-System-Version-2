import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import ModeratorNavigation from '@/Pages/Moderator/ModeratorNavigation';
import { Avatar } from '@material-tailwind/react';
import DefaultProfile from '../../../public/storage/images/default_profile.png'
import ThemeSwitchComponent from '@/Components/ThemeSwitchComponent';
export default function Authenticated({ user, header, children }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100   dark:bg-[#121212]">
            <nav className="bg-white border-b dark:border-none border-gray-100 p-5 dark:bg-[#252525] dark:text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/dashboard">
                                    <ApplicationLogo className="block" />
                                </Link>

                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex ">

                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className={` ${route().current('dashboard')} dark:text-gray-100`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="me-1 w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>


                                    Dashboard</NavLink>


                                {user.role === 'admin' &&
                                    <>

                                        <NavLink
                                            href={route('users')}
                                            active={route().current('users')}
                                            className={` ${route().current('users')} dark:text-gray-100`}
                                        >

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 me-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                            </svg>

                                            Users
                                        </NavLink>
                                        <NavLink
                                            href={route('verifyUsers')}
                                            active={route().current('verifyUsers')}
                                            className={` ${route().current('verifyUsers')} dark:text-gray-100`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 me-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>



                                            Verify Users
                                        </NavLink>

                                        <NavLink
                                            href={route('activitylog')}
                                            active={route().current('activitylog')}
                                            className={` ${route().current('activitylog')} dark:text-gray-100`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 me-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>

                                            Activity Log
                                        </NavLink>


                                    </>

                                }
                                {user.role === 'moderator' &&
                                    <ModeratorNavigation />
                                }

                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">

                            <div className="ms-3 relative">

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white dark:bg-[#252525] hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >

                                                <div className='flex items-center'>
                                                    <div>
                                                        <Avatar src={`/storage/${user.profile_picture}` ?
                                                            `/storage/${user.profile_picture}` : DefaultProfile} />
                                                    </div>

                                                </div>


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
                                        <Dropdown.Link href={route('profile.edit')}>
                                            <div className='flex gap-2 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                                <p>Profile</p>
                                            </div>
                                        </Dropdown.Link>
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

                            <>
                                <ResponsiveNavLink
                                    href={route('users')}
                                    active={route().current('users')}
                                    className={` ${route().current('users')}`}
                                >Users</ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('users')}
                                    active={route().current('users')}
                                    className={` ${route().current('users')}`}
                                >Verify Users</ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route('activitylog')}
                                    active={route().current('activitylog')}
                                    className={` ${route().current('activitylog')}`}
                                >Activity Log</ResponsiveNavLink>
                            </>
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
                    <header className="bg-white shadow dark:bg-gray-900 ">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 dark:text-white">{header}</div>
                    </header>
                )
            }

            <main>{children}</main>
        </div >
    );
}
