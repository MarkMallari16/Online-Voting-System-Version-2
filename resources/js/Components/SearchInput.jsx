import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React from 'react'
import TextInput from './TextInput';
import { Tooltip } from '@material-tailwind/react';

const SearchInput = ({ searchQuery, setSearchQuery }) => {
    const handleClearInputSearch = () => {
        setSearchQuery("");
    }

    return (
        <div className="w-[100%] md:w-96">
            <div className="relative ">
                <TextInput
                    className=" pl-9 pr-3 py-2  rounded-lg border-transparent ring-1 ring-inset ring-gray-300  focus:ring-black focus:border-transparent w-full"
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    placeHolder="Search"
                    value={searchQuery}
                    
                />
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>

                {searchQuery &&
                    <Tooltip
                        content="Clear"
                        className="bg-black">
                        <div className="absolute right-0 top-2 pr-2 flex items-center cursor-pointer" onClick={handleClearInputSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </Tooltip>
                }
            </div>

        </div>
    )
}

export default SearchInput