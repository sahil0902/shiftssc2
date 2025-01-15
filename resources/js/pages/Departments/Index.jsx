import React, { useEffect } from 'react'; // Importing React and useEffect for component lifecycle management
import { Head, usePage, router } from '@inertiajs/react'; // Importing Head for setting the document title, usePage for accessing page props, and router for navigation
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing the layout for authenticated users
import { DataTable } from '@/Components/DataTable'; // Importing the DataTable component for displaying tabular data
import { Button } from '@/Components/ui/button'; // Importing Button component for user actions
import { Link } from '@inertiajs/react'; // Importing Link for navigation between pages
import { toast } from 'sonner'; // Importing toast for displaying notifications

export default function Index() {
    const { departments, flash } = usePage().props; // Destructuring departments and flash messages from page props

    // Effect to show success or error messages based on flash data
    useEffect(() => {
        if (flash.success) toast.success(flash.success); // Show success toast if flash message exists
        if (flash.error) toast.error(flash.error); // Show error toast if flash message exists
    }, [flash]); // Dependency array to run effect when flash changes

    // Function to handle department deletion
    const handleDelete = (id) => {
        // Confirm deletion action
        if (confirm('Are you sure you want to delete this department?')) {
            router.delete(route('departments.destroy', id)); // Send delete request to the server
        }
    };

    // Defining columns for the data table
    const columns = [
        {
            accessorKey: 'name', // Key for accessing department name
            header: 'Name', // Header label for the column
        },
        {
            accessorKey: 'users_count', // Key for accessing the count of employees
            header: 'Employees', // Header label for the column
        },
        {
            accessorKey: 'shifts_count', // Key for accessing the count of shifts
            header: 'Shifts', // Header label for the column
        },
        {
            id: 'actions', // Unique identifier for the actions column
            cell: ({ row }) => { // Render function for the actions cell
                return (
                    <div className="flex items-center gap-2"> {/* Flex container for action buttons */}
                        <Link
                            href={route('departments.show', row.original.id)} // Link to view department details
                            className="text-blue-600 hover:text-blue-800" // Styling for the link
                        >
                            View
                        </Link>
                        <Link
                            href={route('departments.edit', row.original.id)} // Link to edit department
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
                    </div>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Departments" /> {/* Setting the page title */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering the content with responsive padding */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> {/* Card-like container for the content */}
                        <div className="p-6 text-gray-900"> {/* Inner container with padding and text color */}
                            <div className="flex items-center justify-between mb-6"> {/* Flex container for header and button */}
                                <h2 className="text-xl font-semibold">Departments</h2> {/* Header for the departments section */}
                                <Link href={route('departments.create')}> {/* Link to create a new department */}
                                    <Button>Create Department</Button> {/* Button for creating a new department */}
                                </Link>
                            </div>

                            <DataTable
                                columns={columns} // Passing columns definition to DataTable
                                data={departments.data} // Data to be displayed in the table
                                searchKey="name" // Key for searching within the table
                                pagination={{ // Pagination settings
                                    pageIndex: departments.current_page - 1, // Current page index (0-based)
                                    pageSize: departments.per_page, // Number of items per page
                                    pageCount: Math.ceil(departments.total / departments.per_page), // Total number of pages
                                    total: departments.total // Total number of items
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 