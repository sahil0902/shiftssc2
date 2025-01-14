import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center gap-1">
            {links.map((link, key) => {
                // Don't render "prev" and "next" labels
                if (link.label === '&laquo; Previous' || link.label === 'Next &raquo;') {
                    return null;
                }

                return (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-4 py-2 text-sm border rounded-md ${
                            link.active
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                        preserveScroll
                    >
                        <span dangerouslySetInnerHTML={{ __html: link.label }}></span>
                    </Link>
                );
            })}
        </div>
    );
} 