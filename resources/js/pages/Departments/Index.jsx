import React, { useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/Components/DataTable';
import { Button } from '@/Components/ui/button';
import { Link } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Index() {
    const { departments, flash } = usePage().props;

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this department?')) {
            router.delete(route('departments.destroy', id));
        }
    };

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'users_count',
            header: 'Employees',
        },
        {
            accessorKey: 'shifts_count',
            header: 'Shifts',
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
            <Head title="Departments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold">Departments</h2>
                                <Link href={route('departments.create')}>
                                    <Button>Create Department</Button>
                                </Link>
                            </div>

                            <DataTable
                                columns={columns}
                                data={departments.data}
                                searchKey="name"
                                pagination={{
                                    pageIndex: departments.current_page - 1,
                                    pageSize: departments.per_page,
                                    pageCount: Math.ceil(departments.total / departments.per_page),
                                    total: departments.total
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 