import { Switch } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react'



const ThemeSwitchComponent = () => {
    const [isEnable, setIsEnable] = useState(() => {
        const userTheme = localStorage.getItem('theme');

        return userTheme ? userTheme === 'dark' : false
    });


    useEffect(() => {
        if (isEnable) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isEnable]);


    const handleToggle = () => {
        setIsEnable(!isEnable);
    }
    return (
        <Switch label="Dark Mode" checked={isEnable} onChange={handleToggle} />
    )
}

export default ThemeSwitchComponent