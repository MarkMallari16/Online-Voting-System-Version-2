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
                <Menu.Button className="w-full flex items-center justify-between gap-x-1.5 rounded-md bg-white px-3 py-2.5 text-md font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
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
