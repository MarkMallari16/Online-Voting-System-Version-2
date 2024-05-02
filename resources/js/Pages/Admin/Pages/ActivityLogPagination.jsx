import React, { useState } from 'react'
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { InertiaLink } from "@inertiajs/inertia-react";
const ActivityLogPagination = ({ active, totalPages, onPageChange, logs }) => {
    const next = () => {
        if (active === totalPages) return;

        onPageChange(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        onPageChange(active - 1);
    };

    return (
        <div className="flex items-center gap-8">

            {logs.links.map((link) => (
                <span key={link.label}>
                    {link.url ? (
                        <InertiaLink
                            href={link.url || ""}
                            className={"rounded-md " + (link.active ? 'bg-black  text-white  py-2 px-4 ' : ' py-2')}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveScroll
                        />


                    ) : (
                        <span className="text-gray-400 border-black" dangerouslySetInnerHTML={{ __html: link.label }} />
                    )}
                </span>
            ))}


            {/** <div className="flex justify-between mt-4">

                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{active}</strong> of{" "}
                    <strong className="text-gray-900">{totalPages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    disabled={active === totalPages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>

            </div> */}
        </div>
    )
}

export default ActivityLogPagination