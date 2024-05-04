import React from 'react'
import { InertiaLink } from "@inertiajs/inertia-react";
const PaginationComponent = ({ dataPerPage }) => {

    return (
        <div className="flex items-center gap-8">

            {dataPerPage.links.map((link) => (
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
        </div>
    )
}

export default PaginationComponent