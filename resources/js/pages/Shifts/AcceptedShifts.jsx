import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DataTable } from '@/Components/DataTable';
import { Badge } from '@/Components/ui/badge';
import { format } from 'date-fns';

export default function AcceptedShifts({ shifts }) {
    const { user } = usePage().props.auth;

    const columns = [
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'department.name',
            header: 'Department',
        },
        {
            accessorKey: 'start_time',
            header: 'Start Time',
            cell: ({ row }) => {
                return format(new Date(row.original.start_time), 'PPp');
            },
        },
        {
            accessorKey: 'end_time',
            header: 'End Time',
            cell: ({ row }) => {
                return format(new Date(row.original.end_time), 'PPp');
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.original.status;
                const colorMap = {
                    open: 'success',
                    filled: 'warning',
                    cancelled: 'destructive',
                    completed: 'default',
                };
                return (
                    <Badge variant={colorMap[status]}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My Accepted Shifts
                </h2>
            }
        >
            <Head title="My Accepted Shifts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <DataTable
                                columns={columns}
                                data={shifts.data || []}
                                searchKey="title"
                                pagination={{
                                    pageIndex: shifts.current_page - 1,
                                    pageSize: shifts.per_page,
                                    pageCount: shifts.last_page,
                                    total: shifts.total
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 