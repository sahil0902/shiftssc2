import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';

export default function Index({ auth, employees }) {
    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'department.name',
            header: 'Department',
        },
        {
            accessorKey: 'roles',
            header: 'Role',
            cell: ({ row }) => {
                const roles = row.original.roles || [];
                return roles.map(role => (
                    <Badge key={role.id} variant="secondary" className="mr-1">
                        {role.name}
                    </Badge>
                ));
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('employees.show', row.original.id)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            View
                        </Link>
                        <Link
                            href={route('employees.edit', row.original.id)}
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
                        Employees
                    </h2>
                    <Link href={route('employees.create')}>
                        <Button>Create Employee</Button>
                    </Link>
                </div>
            }
        >
            <Head title="Employees" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DataTable
                                columns={columns}
                                data={employees.data}
                                searchKey="employees"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 