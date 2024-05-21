import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import React,{useState} from 'react'

const FAQSComponent = () => {
    const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const Icon = ({ id, open }) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }
    return (
        <>
            {/**Frequently Asked Questions */}
            <div className='h-auto mt-36 '>
                <div className='text-center text-4xl font-bold' >Frequently Asked Question</div>
                <div className="text-lg font-normal text-gray-900 text-center mt-2 mb-10 mx-4 lg:mx-0">
                    Get quick answers to common questions about the STI College Bacoor SHS student council's online voting system.
                </div>
                <div className=' flex justify-center'>
                    <div className='w-[90%] bg-blue-50 px-3' >
                        <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                            <AccordionHeader onClick={() => handleOpen(1)}>What is the online voting system for the SHS student council at STI College Bacoor?</AccordionHeader>
                            <AccordionBody>
                                <div className='text-lg'>
                                    The online voting system is a platform designed to facilitate the election process for the Senior High School (SHS) council at STI College Bacoor. It allows students to cast their votes electronically from anywhere with an internet connection, providing a convenient and accessible way to participate in the democratic process.
                                </div>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                            <AccordionHeader onClick={() => handleOpen(2)}>Who is eligible to vote in the SHS student council elections?</AccordionHeader>
                            <AccordionBody>
                                <div className='text-lg'>All Senior High School (SHS) students currently enrolled at STI College Bacoor are eligible to vote in the student council elections.</div>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                            <AccordionHeader onClick={() => handleOpen(3)}>Can I change my vote after submitting?</AccordionHeader>
                            <AccordionBody>
                                <div className='text-lg'>
                                    No, once a vote is submitted, it is final.
                                </div>
                            </AccordionBody>
                        </Accordion>


                    </div>
                </div>
            </div>
        </>
    )
}

export default FAQSComponent