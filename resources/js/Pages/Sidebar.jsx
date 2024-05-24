import React, { useState } from 'react';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    UserCircleIcon,

} from "@heroicons/react/24/solid";


import NavLink from '@/Components/NavLink';
import ModeratorSideBarLinks from './Moderator/ModeratorSideBarLinks';
import TextInput from '@/Components/TextInput';

const Sidebar = ({ auth }) => {
    const user = {
        name: auth.name,
        role: auth.role
    }

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const showSidebar = () => {
        setIsSidebarVisible(true);
    };

    const hideSidebar = () => {
        setIsSidebarVisible(false);
    };

    return (
        <div className={`fixed ${isSidebarVisible ? 'w-[20rem]' : 'w-[4rem]'} transition-all duration-300 `}>
            <div className={`fixed  z-50 w-100  transition-transform duration-300 ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}>
                <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                    <div className="flex items-center mb-2 p-4 gap-2  border-b-2">
                        <UserCircleIcon className="h-12 w-12" />
                        <div>
                            <div className='text-xl font-bold'>
                                {user.name}
                            </div>
                            <div className='text-sm'>
                                {user.role.toUpperCase()}
                            </div>
                        </div>
                    </div>
                    <List>
                        <ListItem>
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                className={`${route().current('dashboard')}`}
                            >
                                <ListItemPrefix>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                                    </svg>

                                </ListItemPrefix>
                                Dashboard
                            </NavLink>

                        </ListItem>
                        {user.role === 'moderator' &&
                            <ModeratorSideBarLinks />
                        }
                        {/* Add more sidebar links as needed */}
                    </List>
                </Card>
                <div className='absolute top-[20px] right-0 transform -translate-y-1/2' onClick={hideSidebar}>
                    <div className='w-[24px] cursor-pointer p-1 bg-amber-500 rounded-full'>
                        <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"></path>
                        </svg>
                    </div>
                </div>
                <TextInput />
            </div>
            <div className='absolute top-[24px]  left-0 transform -translate-y-1/2' onClick={showSidebar}>
                <div className='w-[24px] cursor-pointer p-1 bg-amber-500 rounded-full' >
                    <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;
