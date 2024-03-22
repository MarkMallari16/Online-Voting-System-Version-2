import React, { useEffect, useRef, useState } from 'react'
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
const PartylistEditorDashboard = () => {
    const CURRENT_DATE = new Date();

    const month = CURRENT_DATE.getMonth() + 1;
    const day = CURRENT_DATE.getDate();
    const year = CURRENT_DATE.getFullYear();

    const COUNTDOWN_FROM = `${month}/${24}/${year}`;


    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    const intervalRef = useRef(null);

    const [remaining, setRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        intervalRef.current = setInterval(handleCountdown, 1000);

        return () => clearInterval(intervalRef.current || undefined);
    }, []);

    const handleCountdown = () => {
        const end = new Date(COUNTDOWN_FROM);

        const now = new Date();

        const distance = +end - +now;

        const days = Math.floor(distance / DAY);
        const hours = Math.floor((distance % DAY) / HOUR);
        const minutes = Math.floor((distance % HOUR) / MINUTE);
        const seconds = Math.floor((distance % MINUTE) / SECOND);

        setRemaining({
            days,
            hours,
            minutes,
            seconds,
        });
    };
    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <h1 className="text-xl font-bold">Welcome, Partylist Editor!</h1>
                </div>
            </div>
            <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-4 ">
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
        </div>
    )
}

export default PartylistEditorDashboard