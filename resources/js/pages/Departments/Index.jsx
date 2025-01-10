import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';

export default function Index({ auth, departments }) {
    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'users_count',
            header: 'Employees',
            cell: ({ row }) => row.original.users_count || 0,
        },
        {
            accessorKey: 'shifts_count',
            header: 'Shifts',
            cell: ({ row }) => row.original.shifts_count || 0,
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('departments.show', row.original.id)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            View
                        </Link>
                        <Link
                            href={route('departments.edit', row.original.id)}
                            className="text-yellow-600 hover:text-yellow-800"
                        >
                            Edit
                        </Link>
                    </div>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Departments
                    </h2>
                    <Link href={route('departments.create')}>
                        <Button>Create Department</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Departments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DataTable
                                columns={columns}
                                data={departments.data}
                                searchKey="departments"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 