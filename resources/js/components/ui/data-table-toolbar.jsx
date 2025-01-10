import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { DataTableViewOptions } from "@/Components/ui/data-table-view-options";
import { DataTableFacetedFilter } from "@/Components/ui/data-table-faceted-filter";

export function DataTableToolbar({
    table,
    filters,
    searchableColumns = [],
    deleteRowsAction,
}) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const hasSelectedRows = table.getSelectedRowModel().rows.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {searchableColumns.length > 0 &&
                    searchableColumns.map(
                        ({ id: columnId, title: columnTitle }) => {
                            return (
                                <Input
                                    key={columnId}
                                    placeholder={`Filter ${columnTitle}...`}
                                    value={
                                        table
                                            .getColumn(columnId)
                                            ?.getFilterValue() ?? ""
                                    }
                                    onChange={(event) =>
                                        table
                                            .getColumn(columnId)
                                            ?.setFilterValue(
                                                event.target.value
                                            )
                                    }
                                    className="h-8 w-[150px] lg:w-[250px]"
                                />
                            );
                        }
                    )}
                {filters.length > 0 &&
                    filters.map(({ title, options, id }) => {
                        const column = table.getColumn(id);
                        return (
                            column && (
                                <DataTableFacetedFilter
                                    key={id}
                                    column={column}
                                    title={title}
                                    options={options}
                                />
                            )
                        );
                    })}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className="flex items-center space-x-2">
                {deleteRowsAction && hasSelectedRows ? (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            const selectedRows =
                                table.getSelectedRowModel().rows;
                            deleteRowsAction(selectedRows);
                            table.toggleAllRowsSelected(false);
                        }}
                        className="h-8"
                    >
                        Delete {table.getSelectedRowModel().rows.length}{" "}
                        row(s)
                    </Button>
                ) : null}
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
} 