import React, { useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { Badge } from '@/Components/ui/badge';
import { toast } from 'sonner';

export default function Index() {
    const { employees, flash } = usePage().props;

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            router.delete(route('employees.destroy', id));
        }
    };

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
            cell: ({ row }) => row.original.department?.name || 'Not Assigned',
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
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="text-red-600 hover:text-red-800"
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
                                columns={columns}
                                data={employees.data}
                                searchKey="name"
                                pagination={{
                                    pageIndex: employees.current_page - 1,
                                    pageSize: employees.per_page,
                                    pageCount: employees.last_page,
                                    total: employees.total
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 