import React from 'react'; // Importing React library for building user interfaces
import { Head, Link } from '@inertiajs/react'; // Importing Head for managing document head and Link for navigation
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importing layout component for authenticated users
import { Button } from '@/Components/ui/button'; // Importing Button component for user actions
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'; // Importing card components for structured display
import { ArrowLeft, Users, Calendar } from 'lucide-react'; // Importing icons for visual representation

// Main functional component to display department details
export default function Show({ auth, department }) {
    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user data to the layout
            header={
                <div className="flex items-center justify-between"> {/* Flex container for header layout */}
                    <div className="flex items-center gap-4"> {/* Flex container for back link and title */}
                        <Link
                            href={route('departments.index')} // Link to navigate back to the departments index
                            className="text-gray-500 hover:text-gray-700" // Styling for the link
                        >
                            <ArrowLeft className="h-5 w-5" /> {/* Back arrow icon */}
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800"> {/* Title for the department details */}
                            Department Details
                        </h2>
                    </div>
                    <Link href={route('departments.edit', department.id)}> {/* Link to edit the department */}
                        <Button>Edit Department</Button> {/* Button for editing department */}
                    </Link>
                </div>
            }
        >
            <Head title="Department Details" /> {/* Setting the page title for department details */}

            <div className="py-12"> {/* Main container with padding */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Centering the content with responsive padding */}
                    <div className="grid gap-6 md:grid-cols-2"> {/* Grid layout for cards */}
                        <Card> {/* Card for department information */}
                            <CardHeader>
                                <CardTitle>Department Information</CardTitle> {/* Title for the card */}
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4"> {/* Spacing between elements */}
                                    <div>
                                        <h3 className="text-lg font-medium"> {/* Department name display */}
                                            {department.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-2"> {/* Flex container for employees info */}
                                        <Users className="h-5 w-5 text-gray-400" /> {/* Icon for employees */}
                                        <div>
                                            <p className="text-sm font-medium text-gray-900"> {/* Label for employees */}
                                                Employees
                                            </p>
                                            <p className="text-sm text-gray-500"> {/* Count of employees */}
                                                {department.users?.length || 0} employees
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2"> {/* Flex container for shifts info */}
                                        <Calendar className="h-5 w-5 text-gray-400" /> {/* Icon for shifts */}
                                        <div>
                                            <p className="text-sm font-medium text-gray-900"> {/* Label for active shifts */}
                                                Active Shifts
                                            </p>
                                            <p className="text-sm text-gray-500"> {/* Count of active shifts */}
                                                {department.shifts?.length || 0} shifts
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {department.users?.length > 0 && ( // Conditional rendering for employees card
                            <Card>
                                <CardHeader>
                                    <CardTitle>Employees</CardTitle> {/* Title for the employees card */}
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4"> {/* Spacing between employee entries */}
                                        {department.users.map((user) => ( // Mapping through users to display each
                                            <div
                                                key={user.id} // Unique key for each user entry
                                                className="flex items-center justify-between" // Flex container for user details
                                            >
                                                <div>
                                                    <p className="font-medium"> {/* User name display */}
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500"> {/* User email display */}
                                                        {user.email}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={route(
                                                        'employees.show',
                                                        user.id // Link to view individual employee details
                                                    )}
                                                >
                                                    <Button
                                                        variant="ghost" // Ghost variant for button styling
                                                        size="sm" // Small size for the button
                                                    >
                                                        View {/* Button text for viewing employee */}
                                                    </Button>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 