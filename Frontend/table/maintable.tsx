"use client"
import React, { useState, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  PaginationState,

} from "@tanstack/react-table"
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react"
import { PaginationControls } from "./pagination"
import { ColumnVisibilityDropdown } from "./dropdown"
interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
  externalFilter?: string
  pageSize?: number
  loading?: boolean
}

export function DataTable<TData>({
  data,
  columns,
  externalFilter,
  pageSize: initialPageSize = 10,
  loading = true,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })
  const [columnVisibility, setColumnVisibility] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: externalFilter,
      sorting,
      pagination,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection: true,
  })

  useEffect(() => {
    table.setPageSize(initialPageSize)
  }, [initialPageSize, table])

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <ColumnVisibilityDropdown table={table} />
      </div>
      <table className="w-full text-left">
        <thead className="bg-[#f6f8fa] dark:bg-[#394455]">
          {loading ? (
            <tr>
              {[...Array(columns.length)].map((_, idx) => (
                <th key={idx} className="p-2 border-b">
                  <div className="h-5 w-24 card__skeleton rounded-md" />
                </th>
              ))}
            </tr>
          ) : (
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSortable = header.column.getCanSort()
                  const sortDirection = header.column.getIsSorted()

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
                  )
                })}
              </tr>
            ))
          )}
        </thead>

        <tbody>
          {loading ? (
            [...Array(5)].map((_, rowIdx) => (
              <tr key={`loading-row-${rowIdx}`}>
                {[...Array(columns.length)].map((_, colIdx) => (
                  <td key={colIdx} className="p-2 border-b">
                    <div className="h-5 w-24 card__skeleton rounded-md" />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 text-[16px] font-medium dark:bg-[#1b2536]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <PaginationControls table={table} />
    </div>
  )
}
