import React from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { router } from '@inertiajs/react';

export function DataTable({
    columns,
    data,
    searchKey,
    showNavigation = true,
    showSearch = true,
    pagination = null,
}) {
    const [sorting, setSorting] = React.useState([]);
    const [filtering, setFiltering] = React.useState('');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            ...(pagination && {
                pagination: {
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                }
            }),
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        manualPagination: !!pagination,
        pageCount: pagination?.pageCount || -1,
    });

    const handlePageChange = (page) => {
        if (pagination) {
            router.get(route(route().current()), { page: page + 1 }, {
                preserveState: true,
                preserveScroll: true,
                only: ['shifts'],
            });
        } else {
            table.setPageIndex(page);
        }
    };

    return (
        <div className="w-full">
            {showSearch && (
                <div className="flex items-center py-4">
                    <Input
                        placeholder={`Search ${searchKey}...`}
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
            )}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <div
                                                    {...{
                                                        className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none flex items-center'
                                                            : '',
                                                        onClick:
                                                            header.column.getToggleSortingHandler(),
                                                    }}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    {{
                                                        asc: (
                                                            <ChevronUp className="ml-2 h-4 w-4" />
                                                        ),
                                                        desc: (
                                                            <ChevronDown className="ml-2 h-4 w-4" />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted()
                                                    ] ?? null}
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {showNavigation && (
                <div className="flex items-center justify-between space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {pagination ? `Showing ${pagination.pageSize * pagination.pageIndex + 1} to ${Math.min(pagination.pageSize * (pagination.pageIndex + 1), pagination.total)} of ${pagination.total} results` : 
                        `${table.getFilteredSelectedRowModel().rows.length} of ${table.getFilteredRowModel().rows.length} row(s) selected.`}
                    </div>
                    <div className="flex items-center space-x-2">
                        {!pagination && (
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue
                                        placeholder={
                                            table.getState().pagination.pageSize
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                        <SelectItem
                                            key={pageSize}
                                            value={`${pageSize}`}
                                        >
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            Page {(pagination?.pageIndex || table.getState().pagination.pageIndex) + 1} of{' '}
                            {pagination?.pageCount || table.getPageCount()}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange((pagination?.pageIndex || table.getState().pagination.pageIndex) - 1)}
                            disabled={pagination ? pagination.pageIndex === 0 : !table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange((pagination?.pageIndex || table.getState().pagination.pageIndex) + 1)}
                            disabled={pagination ? pagination.pageIndex >= pagination.pageCount - 1 : !table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
} 