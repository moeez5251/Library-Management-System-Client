"use client"
import React, { useState, useId, useRef, useEffect } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  PaginationState,
  FilterFn,
  type ColumnFiltersState
} from "@tanstack/react-table"
import { AnimatePresence, motion } from "motion/react"
import { PaginationControls } from "./pagination"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { ProductImageCell } from "@/app/dashboard/catalog/components/productimage"
import Badge from "./badge"
import Lender from "./Lend"
interface ProductsGridProps<TData> {
  data: TData[]
  pageSize?: number
  loading?: boolean
  externalFilter?: string
  columns: ColumnDef<TData>[]
  columnFilter?: { columnId: keyof TData; value: string }[]
}

export function ProductsGrid<TData extends { id: string | number; name: string; price: number, Author: string, Language: string, Available_Copies: number, Status: string, Category: string, Pages: number }>({
  data,
  columns,
  pageSize: initialPageSize = 6,
  loading = true,
  externalFilter = "",
  columnFilter
}: ProductsGridProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  const [active, setActive] = useState<TData | null>(null)
  const id = useId()
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => setActive(null))

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "auto"
  }, [active])

  const globalFilterFn: FilterFn<TData> = (row, _columnId, filterValue) => {
    const search = (filterValue as string).toLowerCase()
    return Object.values(row.original).some(val =>
      String(val).toLowerCase().includes(search)
    )
  }
  const [internalColumnFilters, setInternalColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
      pagination,
      globalFilter: externalFilter,
      columnFilters: internalColumnFilters
    },
    filterFns: {
      global: globalFilterFn,
    },
    globalFilterFn: globalFilterFn,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setInternalColumnFilters,
  })
  useEffect(() => {
    if (columnFilter && columnFilter.length > 0) {
      const mapped = columnFilter
        .filter(f => f.value !== "All")
        .map(f => ({
          id: String(f.columnId),
          value: f.value,
        }))
      setInternalColumnFilters(mapped)
    } else {
      setInternalColumnFilters([])
    }
  }, [columnFilter])

  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      pageSize: initialPageSize,
    }))
  }, [initialPageSize])


  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-50">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  bg-white rounded-2xl shadow-md "
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <ProductImageCell id={active.id} />
              </motion.div>
              <div className="p-5 space-y-2 flex flex-col gap-1.5">
                <motion.h3 layoutId={`title-${active.id}-${id}`} className="text-lg font-semibold flex items-baseline justify-between">
                  {active.name}
                  <span className="text-sm text-muted-foreground">
                    Book ID : {active.id.toString().length > 7 ? active.id.toString().slice(0, 7) + " ..." : active.id.toString()}

                  </span>
                </motion.h3>
                <motion.div className="flex items-center gap-1 text-[#526b79]">
                  <div className="font-semibold">Price :</div>
                  <div>PKR {active.price}</div>

                </motion.div>
                <motion.div className="flex items-center gap-1 ">
                  <div className="font-semibold">Author :</div>
                  <div>{active.Author}</div>

                </motion.div>
                <motion.div className="flex items-center gap-1 ">
                  <div className="font-semibold">Category :</div>
                  <div>{active.Category}</div>

                </motion.div>
                <motion.div className="flex items-center gap-1 ">
                  <div className="font-semibold">Language :</div>
                  <div>{active.Language}</div>

                </motion.div>
                <motion.div className="flex items-center gap-1 ">
                  <div className="font-semibold">Available Copies :</div>
                  <div>{active.Available_Copies}</div>

                </motion.div>
                <motion.div className="flex items-center gap-1 ">
                  <div className="font-semibold">Total Pages :</div>
                  <div>{active.Pages}</div>

                </motion.div>
                <motion.div >
                  <Badge status={active.Status} />
                </motion.div>
                <motion.div className="flex items-center gap-1 w-full">
                  <Lender status={active.Status !== "Available"} id={active.id} />
                </motion.div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            [...Array(initialPageSize)].map((_, idx) => (
              <motion.div
                key={idx}
                className="animate-pulse"
              >
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
                  <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="mt-2">
                  <motion.h2 className="text-lg font-semibold m-3 h-2.5 bg-gray-200 w-32 rounded-md">
                  </motion.h2>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600 mx-3 bg-gray-200 h-2.5 w-20 rounded-md"></p>
                    <span className="h-2.5 w-12 bg-gray-200 rounded-md"></span>
                  </div>

                </div>
              </motion.div>
            ))
          ) : (
            table.getRowModel().rows.map(row => {
              const product = row.original
              return (
                <motion.div
                  key={product.id}
                  layoutId={`card-${product.id}-${id}`}
                  onClick={() => setActive(product)}
                  className="cursor-pointer bg-white rounded-t-lg shadow-sm hover:shadow-md transition"
                >
                  <motion.div layoutId={`image-${product.id}-${id}`}>
                    <ProductImageCell id={product.id} />
                  </motion.div>
                  <div className="mt-2">
                    <motion.h2 layoutId={`title-${product.id}-${id}`} className="text-lg font-semibold m-3">
                      {product.name}
                    </motion.h2>
                    <div className="flex items-center justify-between">

                      <p className="text-gray-600 m-3">PKR {product.price}</p>
                      <Badge status={product.Status} />
                    </div>

                  </div>
                </motion.div>
              )
            })
          )}
        </div>
        <PaginationControls table={table} />
      </div>
    </>
  )
}
