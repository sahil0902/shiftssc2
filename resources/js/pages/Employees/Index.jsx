import React, { useEffect } from 'react'; // Importing React and useEffect hook for component lifecycle management
import { Head, usePage, router } from '@inertiajs/react'; // Importing Inertia.js components for page management and routing
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing the layout for authenticated users
import { DataTable } from '@/Components/DataTable'; // Importing the DataTable component for displaying employee data
import { Button } from '@/Components/ui/button'; // Importing Button component for UI actions
import { Link } from '@inertiajs/react'; // Importing Link component for navigation
import { Badge } from '@/Components/ui/badge'; // Importing Badge component for displaying roles
import { toast } from 'sonner'; // Importing toast for notifications

export default function Index() {
    const { employees, flash } = usePage().props; // Destructuring employees and flash messages from page props

    useEffect(() => {
        // Effect to show success or error messages based on flash data
        if (flash.success) toast.success(flash.success); // Show success toast if flash.success exists
        if (flash.error) toast.error(flash.error); // Show error toast if flash.error exists
    }, [flash]); // Dependency array to re-run effect when flash changes

    const handleDelete = (id) => {
        // Function to handle employee deletion
        if (confirm('Are you sure you want to delete this employee?')) { // Confirm deletion
            router.delete(route('employees.destroy', id)); // Send delete request to the server
        }
    };

    const columns = [ // Define columns for the DataTable
        {
            accessorKey: 'name', // Key for accessing employee name
            header: 'Name', // Header title for the column
        },
        {
            accessorKey: 'email', // Key for accessing employee email
            header: 'Email', // Header title for the column
        },
        {
            accessorKey: 'department.name', // Key for accessing department name
            header: 'Department', // Header title for the column
            cell: ({ row }) => row.original.department?.name || 'Not Assigned', // Display department name or 'Not Assigned'
        },
        // {
        //     accessorKey: 'roles', // Key for accessing employee roles
        //     header: 'Role', // Header title for the column
        //     cell: ({ row }) => {
        //         const roles = row.original.roles || []; // Get roles or default to an empty array
        //         return roles.map(role => ( // Map over roles to create Badge components
        //             <Badge key={role.id} variant="secondary" className="mr-1">
        //                 {role.name} 
        //             </Badge>
        //         ));
        //     },
        // },
        {
            id: 'actions', // Unique ID for actions column
            cell: ({ row }) => { // Render actions for each employee
                return (
                    <div className="flex items-center gap-2"> 
                        <Link
                            href={route('employees.show', row.original.id)} // Link to view employee details
                            className="text-blue-600 hover:text-blue-800" // Styling for the link
                        >
                            View
                        </Link>
                        <Link
                            href={route('employees.edit', row.original.id)} // Link to edit employee
                            className="text-yellow-600 hover:text-yellow-800" // Styling for the link
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(row.original.id)} // Call handleDelete on button click
                            className="text-red-600 hover:text-red-800" // Styling for the delete button
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
            <Head title="Employees" /> 

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> 
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg"> 
                        <div className="p-6 text-gray-900"> 
                            <div className="flex items-center justify-between mb-6"> 
                                <h2 className="text-xl font-semibold">Employees</h2> 
                                <Link href={route('employees.create')}> 
                                    <Button>Create Employee</Button> 
                                </Link>
                            </div>

                            <DataTable
                                columns={columns} // Pass defined columns to DataTable
                                data={employees.data} // Pass employee data to DataTable
                                searchKey="name" // Set search key for filtering
                                pagination={{ // Set pagination properties
                                    pageIndex: employees.current_page - 1, // Current page index (0-based)
                                    pageSize: employees.per_page, // Number of items per page
                                    pageCount: employees.last_page, // Total number of pages
                                    total: employees.total // Total number of employees
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 