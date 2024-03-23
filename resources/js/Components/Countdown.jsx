import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

const CountdownItem = ({ num, text }) => {
    return (
        <div className="font-mono w-1/4 h-24 md:h-36 flex flex-col gap-1 md:gap-2 items-center justify-center border-r-[1px] border-slate-200">
            <div className="w-full text-center relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={num}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ ease: "backIn", duration: 0.75 }}
                        className="block text-2xl md:text-4xl lg:text-6xl xl:text-7xl text-black font-medium"
                    >
                        {num}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-xs md:text-sm lg:text-base font-light text-slate-500">
                {text}
            </span>
        </div>
    );
};

function Countdown({ election }) {
    const startingDate = election.status === 'Inactive' ? '2024-03-23 14:55:00' : election.start_date
    const endingDate = election.status === 'Inactive' ? '2024-03-23 14:55:00' : election.end_date


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
    }, []);

    const handleCountdown = () => {

        const startDate = new Date(startingDate).getTime();
        const endDate = new Date(endingDate).getTime();
        const now = new Date().getTime();

        // Check if the current date is after the start date
        if (now < startDate) {
            // Countdown hasn't started yet, set remaining time to start date
            setRemaining(calculateRemaining(startDate, now));
        } else if (now >= startDate && now <= endDate) {
            // Countdown is ongoing, set remaining time to end date
            setRemaining(calculateRemaining(endDate, now));
        } else {
            // Countdown has ended, set remaining time to 0
            setRemaining({
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            });
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

    const status = election.status === 'active' || election.status === 'Active';


    return (
        <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {status ? (
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-4">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-semibold text-black">Voting Ends In:</h2>
                            <p className="text-sm text-blue-gray-600">Cast your vote before the deadline to have your voice heard!</p>
                        </div>
                        <div className="w-full max-w-5xl mx-auto flex items-center justify-around bg-white text-blue-gray-800">
                            <CountdownItem num={remaining.days} text="Days" />
                            <CountdownItem num={remaining.hours} text="Hours" />
                            <CountdownItem num={remaining.minutes} text="Minutes" />
                            <CountdownItem num={remaining.seconds} text="Seconds" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-4">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-semibold text-black">Election is currently inactive.</h2>
                            <p className="text-sm text-black">Stay tuned for updates!</p>
                        </div>
                        <div className="w-full max-w-5xl mx-auto flex items-center justify-around bg-white text-blue-gray-800">
                            <CountdownItem num={remaining.days} text="Days" />
                            <CountdownItem num={remaining.hours} text="Hours" />
                            <CountdownItem num={remaining.minutes} text="Minutes" />
                            <CountdownItem num={remaining.seconds} text="Seconds" />
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default Countdown;
