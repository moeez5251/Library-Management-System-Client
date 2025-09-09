"use client"
import { Table } from "@tanstack/react-table"
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react"

interface PaginationControlsProps<TData> {
  table: Table<TData>
}

export function PaginationControls<TData>({ table }: PaginationControlsProps<TData>) {
  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex
  const visiblePages = Array.from({ length: pageCount }, (_, i) => i)
  
  return (
    <div className="flex items-center justify-center gap-2  pt-4 flex-wrap">
      <button
        className="text-black cursor-pointer disabled:opacity-50 disabled:cursor-auto dark:text-white"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft size={20} />
      </button>

      <button
        className="text-black cursor-pointer disabled:opacity-50 disabled:cursor-auto dark:text-white"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => table.setPageIndex(page)}
          className={`${
            currentPage === page
              ? "bg-[#1f4f54] text-white px-3 py-1 rounded-full"
              : "px-3 py-1"
          } font-semibold mx-1 cursor-pointer`}
        >
          {page + 1}
        </button>
      ))}

      {/* Next Page */}
      <button
        className="text-black cursor-pointer disabled:opacity-50 disabled:cursor-auto dark:text-white"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight size={20} />
      </button>

      {/* Last Page */}
      <button
        className="text-black cursor-pointer disabled:opacity-50 disabled:cursor-auto dark:text-white"
        onClick={() => table.setPageIndex(pageCount - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight size={20} />
      </button>
    </div>
  )
}
