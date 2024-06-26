import React, { useEffect, useRef, useMemo, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

const CountdownItem = ({ num, text }) => {

    return (
        <div className=" font-mono w-1/4 h-24 md:h-36 flex flex-col gap-1 md:gap-2 items-center justify-center border-r-[1px] border-slate-200">
            <div className="w-full text-center relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={num}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ ease: "backIn", duration: 0.75 }}
                        className="block text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-black font-medium dark:text-gray-50"
                    >
                        {num}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-xs md:text-sm lg:text-base font-light  dark:text-gray-100">
                {text}
            </span>
        </div>
    );
};

function Countdown({ election }) {
    const [reload, setReload] = useState(false);

    if (!election) {
        // Render a loading state or return null if election is not defined
        return null;
    }


    const memoizedStartingDate = useMemo(() => election.status === 'Inactive' ? '' : election.start_date, [election.start_date, election.status]);
    const memoizedEndingDate = useMemo(() => election.status === 'Inactive' ? '' : election.end_date, [election.end_date, election.status]);

    // console.log(startingDate)
    // console.log(endingDate)

    const [remaining, setRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const countdownInterval = setInterval(handleCountdown, 1000);
        return () => clearInterval(countdownInterval);
    }, [memoizedStartingDate, memoizedEndingDate]);

    const handleCountdown = () => {
        const startDate = memoizedStartingDate ? new Date(memoizedStartingDate) : new Date(0);
        const endDate = memoizedEndingDate ? new Date(memoizedEndingDate) : new Date(0);
        const now = new Date();

        if (startDate && endDate) {
            if (now < startDate) {
                setRemaining(calculateRemaining(startDate.getTime(), now.getTime()));
            } else if (now > endDate) {
                setRemaining({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                });
                setReload(true)
            } else {
                setRemaining(calculateRemaining(endDate.getTime(), now.getTime()));
            }
        }
    };


    const calculateRemaining = (targetDate, currentDate) => {
        const distance = targetDate - currentDate;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const status = election.status === 'Active';
    const isVotingStarts = new Date() < new Date(memoizedStartingDate);
    const isVotingEnded = new Date() > new Date(memoizedEndingDate);
    
    return (
        <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg  ">
            {status ? (
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg dark:bg-gray-900 ">
                    <div className="p-4 dark:bg-gray-900">
                        <>
                            {isVotingStarts ? (
                                <div className='text-center mb-4'>
                                    <h2 className="text-2xl font-semibold text-black dark:text-gray-300">Voting Starts In:</h2>
                                    <p className="text-sm text-blue-gray-600">Get ready to cast your vote!</p>
                                </div>
                            ) : isVotingEnded ? (
                                (
                                    <div className='text-center mb-4'>
                                        <h2 className="text-2xl font-bold text-red-700 dark:text-red-600">Election Ended</h2>
                                        <p className="text-sm text-gray-600">Thank you for participating!</p>
                                    </div>

                                )
                            ) : (
                                <div className="text-center mb-4 ">
                                    <h2 className="text-2xl font-semibold text-black dark:text-gray-50">Voting Ends In:</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Make sure to vote before the deadline to make your choice count!</p>
                                </div>
                            )}
                        </>
                        <div className="w-full max-w-5xl mx-auto flex items-center justify-around text-gray-800 dark:bg-gray-900 ">
                            <CountdownItem num={remaining.days} text="Day(s)" />
                            <CountdownItem num={remaining.hours} text="Hour(s)" />
                            <CountdownItem num={remaining.minutes} text="Minute(s)" />
                            <CountdownItem num={remaining.seconds} text="Second(s)" />
                        </div>
                    </div>
                </div >
            ) : (
                <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-4">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">Election is currently inactive.</h2>
                            <p className="text-sm text-gray-900 dark:text-gray-400">Stay tuned for updates!</p>
                        </div>
                        <div className="w-full max-w-5xl mx-auto flex items-center justify-around bg-white dark:bg-gray-900 text-gray-900">
                            <CountdownItem num={remaining.days} text="Day(s)" />
                            <CountdownItem num={remaining.hours} text="Hour(s)" />
                            <CountdownItem num={remaining.minutes} text="Minute(s)" />
                            <CountdownItem num={remaining.seconds} text="Second(s)" />
                        </div>
                    </div>
                </div>

            )
            }
        </div >
    );
}

export default Countdown;
