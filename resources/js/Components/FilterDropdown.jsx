import React, { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function FilterDropdown({ onSelectFilter, options }) {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleSelectedFilter = (filter) => {
        setSelectedFilter(filter);
        onSelectFilter(filter);
    };

    return (
        <Menu as="div" className="relative inline-block text-left">

            <div>
                <Menu.Button className="w-full flex items-center justify-between gap-x-1.5 rounded-md bg-white px-3 py-2.5 text-md font-normal text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <div>
 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                        </svg>
                       
                    </div>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {options.map((option) => (
                            <Menu.Item key={option.value}>
                                <span
                                    className={classNames(
                                        selectedFilter === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'hover:bg-gray-100 block px-4 py-2 text-sm cursor-pointer'
                                    )}
                                    onClick={() => handleSelectedFilter(option.value)}
                                >
                                    {option.label}
                                </span>
                            </Menu.Item>
                        ))}

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
