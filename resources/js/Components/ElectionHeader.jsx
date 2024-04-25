import React from 'react'
import CouncilLogo from "../../../public/councilLogo.png";
import STIBacoorLogo from "../assets/bacoor-logo.png";
const ElectionHeader = ({ election }) => {
    return (
        <>

            <div className="bg-white border shadow-md border-3 rounded-md  p-10 ">
                <div className="flex items-center justify-between">
                    <div><img src={STIBacoorLogo} alt="STI Bacoor Logo" className="w-32 sm:w-32" /></div>
                    <div className="text-xl md:text-5xl text-center font-medium">{election?.title ? election.title : 'Inactive'}</div>

                    <div><img src={CouncilLogo} alt="Council Logo" className="w-32 sm:w-32" /></div>
                </div>
                {election?.start_date < election?.end_date && (
                    <div className="text-center flex justify-center text-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                                </svg>
                            </span>

                            Start Date: {new Date(election.start_date).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 md:gap-2 lg:gap-2">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                                </svg>
                            </span>
                            End Date: {new Date(election.end_date).toLocaleString()}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ElectionHeader