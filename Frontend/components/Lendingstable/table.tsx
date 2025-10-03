"use client";
import React, { useState, useEffect } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    PaginationState,
} from "@tanstack/react-table";

import { ArrowUp, ArrowDown, ArrowUpDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DataTableProps<TData extends object> {
    data: TData[];
    columns: ColumnDef<TData, any>[];
    externalFilter?: string;
    pageSize?: number;
    loading: boolean;
}
interface Lending {
    Borrower_ID: number;
    user_id: string;
    Name: string;
    BookTitle: string;
    Category: string;
    Author: string;
    IssuedDate: string;
    DueDate: string;
    CopiesLent: number;
    FinePerDay: number;
    Price: number;
    Book_ID: string;
    Status: string;
}

const DataTable = <TData extends Lending>({
    data,
    columns,
    externalFilter,
    pageSize: initialPageSize,
    loading = true,
}: DataTableProps<TData>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: initialPageSize || 10,
    });

    const [grouping, setGrouping] = useState<string[]>(["BookTitle"]); 
    const [expanded, setExpanded] = useState({}); 
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter: externalFilter,
            sorting,
            pagination,
            grouping,
            expanded,
        },
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onGroupingChange: setGrouping,
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        enableRowSelection: true,
        getRowId: (row: any, index: number) =>
            row.Borrower_ID?.toString() ?? index.toString(),
    });

    useEffect(() => {
        table.setPageSize(initialPageSize || 10);
    }, [initialPageSize, table]);

    return (
        <div className="p-2 space-y-4 rounded-sm">
            <table className="w-full text-left border-collapse">
                {/* Table Header */}
                <thead className="bg-[#f6f8fa] dark:bg-[#394455]">
                    {loading ? (
                        <tr>
                            {[...Array(columns.length)].map((_, idx) => (
                                <th key={idx} className="p-2 border-b">
                                    <div className="h-5 w-full rounded-md card__skeleton" />
                                </th>
                            ))}
                        </tr>
                    ) : (
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isSortable = header.column.getCanSort();
                                    const sortDirection = header.column.getIsSorted();

                                    return (
                                        <th
                                            key={header.id}
                                            className="p-2 border-b cursor-pointer select-none text-nowrap"
                                            onClick={
                                                isSortable
                                                    ? header.column.getToggleSortingHandler()
                                                    : undefined
                                            }
                                        >
                                            <div className="flex items-center gap-1 font-semibold">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext()
                                                      )}

                                                {isSortable && (
                                                    <>
                                                        {sortDirection === "asc" && <ArrowUp size={16} />}
                                                        {sortDirection === "desc" && <ArrowDown size={16} />}
                                                        {!sortDirection && (
                                                            <ArrowUpDown size={16} className="opacity-40" />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))
                    )}
                </thead>

                {/* Table Body */}
                <tbody>
                    {loading ? (
                        [...Array(5)].map((_, rowIdx) => (
                            <tr key={`loading-row-${rowIdx}`}>
                                {[...Array(columns.length)].map((_, colIdx) => (
                                    <td key={colIdx} className="p-2 border-b">
                                        <div className="h-5 w-full rounded-md card__skeleton" />
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        table.getRowModel().rows.map((row) => {
                            if (row.getIsGrouped()) {
                                return (
                                    <React.Fragment key={row.id}>
                                        <tr
                                            className="bg-white hover:bg-gray-100 dark:bg-[#2b3548] cursor-pointer"
                                            onClick={row.getToggleExpandedHandler()}
                                        >
                                            <td colSpan={columns.length} className="p-2 border-b font-semibold">
                                                <div className="flex items-center gap-2">
                                                    <motion.div
                                                        animate={{ rotate: row.getIsExpanded() ? 90 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <ChevronRight size={16} />
                                                    </motion.div>
                                                    {row.getValue("BookTitle")} ({row.subRows.length})
                                                </div>
                                            </td>
                                        </tr>

                                        <AnimatePresence>
                                            {row.getIsExpanded() &&
                                                row.subRows.map((subRow) => (
                                                    <motion.tr
                                                        key={subRow.id}
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="hover:bg-gray-50 dark:hover:bg-[#1e293b]"
                                                    >
                                                        {subRow.getVisibleCells().map((cell) => (
                                                            <td key={cell.id} className="p-2 border-b">
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}
                                                            </td>
                                                        ))}
                                                    </motion.tr>
                                                ))}
                                        </AnimatePresence>
                                    </React.Fragment>
                                );
                            }
                            return null;
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
