import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { ArrowLeft, Users, Calendar } from 'lucide-react';

export default function Show({ auth, department }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('departments.index')}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Department Details
                        </h2>
                    </div>
                    <Link href={route('departments.edit', department.id)}>
                        <Button>Edit Department</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Department Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Department Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {department.name}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Employees
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {department.users?.length || 0} employees
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Active Shifts
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {department.shifts?.length || 0} shifts
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {department.users?.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Employees</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {department.users.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center justify-between"
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {user.email}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={route(
                                                        'employees.show',
                                                        user.id
                                                    )}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
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