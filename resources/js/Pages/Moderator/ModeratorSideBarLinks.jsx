import React, { useState } from 'react'
import {
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography,
    List
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ChevronDownIcon,
    ChevronRightIcon
} from "@heroicons/react/24/solid";
import NavLink from '@/Components/NavLink';


const ModeratorSideBarLinks = () => {
    const [open, setOpen] = useState(0);


    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    return (
        <>
            <ListItem>
                <NavLink
                    href={route('election')}
                    active={route().current('election')}
                    className={`${route().current('election')}`}
                >
                    <ListItemPrefix>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                        </svg>

                    </ListItemPrefix>
                    Election
                </NavLink>

            </ListItem>
            <ListItem>
                <NavLink
                    href={route('partylist')}
                    active={route().current('partylist')}
                    className={`${route().current('partylist')}`}
                >
                    <ListItemPrefix>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clipRule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>

                    </ListItemPrefix>
                    Partylist
                </NavLink>

            </ListItem>
            <ListItem>
                <NavLink
                    href={route('candidate')}
                    active={route().current('candidate')}
                    className={`${route().current('candidate')}`}
                >
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Candidate
                </NavLink>

            </ListItem>

            <ListItem>
                <NavLink
                    href={route('ballot')}
                    active={route().current('ballot')}
                    className={`${route().current('ballot')}`}
                >
                    <ListItemPrefix>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                        </svg>


                    </ListItemPrefix>
                    Ballot
                </NavLink>

            </ListItem>
            <Accordion
                open={open === 1}
                icon={
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                    />
                }
            >
                <ListItem className="p-0" selected={open === 1} >
                    <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal">
                            Candidate
                        </Typography>
                    </AccordionHeader>
                </ListItem>


                <AccordionBody className="py-1">
                    <List className="p-0">
                        <ListItem >
                            <ListItemPrefix>
                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                            </ListItemPrefix>
                            Analytics
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                            </ListItemPrefix>

                            Reporting
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                            </ListItemPrefix>
                            Projects
                        </ListItem>
                    </List>
                </AccordionBody>
            </Accordion>
            <ListItem>
                <NavLink
                    href={route('dashboard')}
                    active={route().current('dashboard')}
                    className={`${route().current('dashboard')}`}
                >
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Live Results
                </NavLink>

            </ListItem>

        </>


    )
}

export default ModeratorSideBarLinks