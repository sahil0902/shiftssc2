import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { ArrowLeft, Building2, Calendar, Mail } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import { format } from 'date-fns';

export default function Show({ auth, employee }) { // Main component to display employee details
    return (
        <AuthenticatedLayout
            user={auth.user} // Passing authenticated user data to the layout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('employees.index')} // Link to the employee index page
                            className="text-gray-500 hover:text-gray-700" // Styling for the link
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Employee Details
                        </h2>
                    </div>
                    <Link href={route('employees.edit', employee.id)}>
                        <Button>Edit Employee</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Employee Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {employee.name}
                                        </h3>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                            <p className="text-sm text-gray-500">
                                                {employee.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Department
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {employee.department?.name}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-900 mb-2">
                                            Roles
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {employee.roles?.map((role) => (
                                                <Badge
                                                    key={role.id} // Unique key for each badge
                                                    variant="secondary" // Badge variant
                                                >
                                                    {role.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {employee.shifts?.length > 0 && ( // Conditional rendering for shifts section
                            <Card> // Card for recent shifts
                                <CardHeader>
                                    <CardTitle>Recent Shifts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4"> // Spacing between shift items
                                        {employee.shifts.map((shift) => ( // Mapping through shifts to display each shift
                                            <div
                                                key={shift.id} // Unique key for each shift
                                                className="flex items-center justify-between" // Flex container for shift details
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {shift.title}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <Calendar className="h-4 w-4" />
                                                        {format(
                                                            new Date(shift.start_time),
                                                            'PPp'
                                                        )}
                                                    </div>
                                                </div>
                                                <Link
                                                    href={route( // Link to view shift details
                                                        'shifts.show',
                                                        shift.id
                                                    )}
                                                >
                                                    <Button
                                                        variant="ghost" // Ghost variant for button
                                                        size="sm" // Small size for button
                                                    >
                                                        View
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