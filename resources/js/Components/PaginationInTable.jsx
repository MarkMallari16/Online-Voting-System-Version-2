import { Link } from '@inertiajs/react'
import { Button, Typography } from '@material-tailwind/react'
import React from 'react'

const PaginationInTable = ({ dataPerPage }) => {
    return (
        <>
            <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
            >
                Page {dataPerPage.current_page} of {dataPerPage.last_page}
            </Typography>
            <div className="flex gap-2">
                <Button
                    className='font-medium'
                    variant="outlined"
                    size="sm"
                    disabled={dataPerPage.prev_page_url === null}>
                    <Link
                        href={dataPerPage.prev_page_url}
                        className={`rounded-md `}
                        preserveScroll

                    >
                        Previous

                    </Link>
                </Button>
                <Button
                    className='font-medium'
                    variant="outlined"
                    size="sm"
                    disabled={dataPerPage.next_page_url === null}
                >
                    <Link
                        href={dataPerPage.next_page_url}
                        className={`rounded-md`}
                        preserveScroll
                    >
                        Next
                    </Link>
                </Button>
            </div>
        </>
    )
}

export default PaginationInTable