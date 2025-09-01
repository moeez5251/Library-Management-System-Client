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
import { PaginationControls } from "./pagination"
interface ProductsGridProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[] // still needed so TanStack knows how to access fields
  externalFilter?: string
  pageSize?: number
  loading?: boolean
}

export function ProductsGrid<TData>({
  data,
  columns,
  externalFilter,
  pageSize: initialPageSize = 6,
  loading = true,
}: ProductsGridProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: externalFilter,
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  useEffect(() => {
    table.setPageSize(initialPageSize)
  }, [initialPageSize, table])

  return (
    <div className="p-4 space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          // Skeleton loaders
          [...Array(initialPageSize)].map((_, idx) => (
            <div
              key={idx}
              className="h-40 w-full rounded-lg bg-gray-200 animate-pulse"
            />
          ))
        ) : (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="border rounded-lg p-4 shadow-sm bg-white dark:bg-[#1b2536]"
            >
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <PaginationControls table={table} />
    </div>
  )
}
