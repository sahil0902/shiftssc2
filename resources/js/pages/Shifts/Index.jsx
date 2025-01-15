import React, { useEffect } from 'react'; // Importing React and useEffect hook for side effects
import { Head, usePage, router } from '@inertiajs/react'; // Importing Head for document title and usePage for accessing page props
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing the layout for authenticated users
import { DataTable } from '@/Components/DataTable'; // Importing the DataTable component for displaying data in a table format
import { Button } from '@/Components/ui/button'; // Importing Button component for UI actions
import { Link } from '@inertiajs/react'; // Importing Link for navigation
import { Badge } from '@/Components/ui/badge'; // Importing Badge component for displaying status
import { format } from 'date-fns'; // Importing date-fns for date formatting
import { toast } from 'sonner'; // Importing toast for displaying notifications

// Main functional component for displaying shifts
export default function Index({ can = {}, shifts = { data: [], current_page: 1, per_page: 10, last_page: 1, total: 0 } }) {
    const { auth, flash } = usePage().props; // Destructuring auth and flash messages from page props

    // Effect to show success or error messages based on flash data
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success); // Show success toast
        }
        if (flash?.error) {
            toast.error(flash.error); // Show error toast
        }
    }, [flash]); // Dependency array to run effect when flash changes

    // Function to handle deletion of a shift
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this shift? This action cannot be undone.')) {
            router.delete(route('shifts.destroy', id)); // Send delete request to the server
        }
    };

    // Logging flash messages and received data for debugging
    console.log('Flash messages:', flash);
    console.log('Received shifts data:', shifts);
    console.log('Received can data:', can);

    // Defining columns for the data table
    const columns = [
        {
            accessorKey: 'title', // Key for accessing title
            header: 'Title', // Header for the title column
        },
        {
            accessorKey: 'department.name', // Key for accessing department name
            header: 'Department', // Header for the department column
        },
        {
            accessorKey: 'start_time', // Key for accessing start time
            header: 'Start Time', // Header for the start time column
            cell: ({ row }) => {
                return format(new Date(row.original.start_time), 'PPp'); // Formatting start time
            },
        },
        {
            accessorKey: 'end_time', // Key for accessing end time
            header: 'End Time', // Header for the end time column
            cell: ({ row }) => {
                return format(new Date(row.original.end_time), 'PPp'); // Formatting end time
            },
        },
        {
            accessorKey: 'status', // Key for accessing status
            header: 'Status', // Header for the status column
            cell: ({ row }) => {
                const status = row.original.status; // Getting the status from the row
                const colorMap = { // Mapping status to color variants
                    open: 'success',
                    filled: 'warning',
                    cancelled: 'destructive',
                    completed: 'default',
                };
                return (
                    <Badge variant={colorMap[status]}> {/* Displaying badge with appropriate color */}
                        {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalizing the first letter of status */}
                    </Badge>
                );
            },
        },
        {
            id: 'actions', // Unique ID for actions column
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2"> {/* Flex container for action buttons */}
                        <Link
                            href={route('shifts.show', row.original.id)} // Link to view shift details
                            className="text-blue-600 hover:text-blue-800" // Styling for the link
                        >
                            View
                        </Link>
                        {can.create_shift && ( // Conditional rendering based on permissions
                            <>
                                <Link
                                    href={route('shifts.edit', row.original.id)} // Link to edit shift
                                    className="text-yellow-600 hover:text-yellow-800" // Styling for the link
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(row.original.id)} // Delete button with click handler
                                    className="text-red-600 hover:text-red-800" // Styling for the button
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user to layout
            header={
                <div className="flex items-center justify-between"> {/* Flex container for header */}
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight"> {/* Header title */}
                        Shifts
                    </h2>
                    {can.create_shift && ( // Conditional rendering for create shift button
                        <Link href={route('shifts.create')}> {/* Link to create a new shift */}
                            <Button>Create Shift</Button> {/* Button for creating a shift */}
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Shifts" /> {/* Setting the document title */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centered container */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card style container */}
                        <div className="p-6 text-gray-900"> {/* Padding for inner content */}
                            <DataTable
                                columns={columns} // Passing columns to DataTable
                                data={shifts.data || []} // Passing shifts data to DataTable
                                searchKey="title" // Key for searching
                                pagination={{
                                    pageIndex: shifts.current_page - 1, // Current page index for pagination
                                    pageSize: shifts.per_page, // Number of items per page
                                    pageCount: shifts.last_page, // Total number of pages
                                    total: shifts.total // Total number of items
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 