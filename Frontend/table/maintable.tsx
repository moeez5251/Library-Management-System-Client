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
} from "@tanstack/react-table"
import { AnimatePresence, motion } from "motion/react"
import { PaginationControls } from "./pagination"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { ProductImageCell } from "@/app/dashboard/catalog/components/productimage"
import Badge from "./badge"
interface ProductsGridProps<TData> {
  data: TData[]
  pageSize?: number
  loading?: boolean
  externalFilter?: string
  columns: ColumnDef<TData>[]
}

export function ProductsGrid<TData extends { id: string | number; name: string; price: number, Author: string, Language: string, Available_Copies: number, Status: string }>({
  data,
  columns,
  pageSize: initialPageSize = 6,
  loading = true,
  externalFilter = "",
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

  const table = useReactTable({
    data,
    columns: columns,
    state: {
      sorting,
      pagination,
      globalFilter: externalFilter,
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
  })

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
              className="w-full max-w-[500px] bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <ProductImageCell id={active.id} />
              </motion.div>
              <div className="p-5 space-y-2 flex flex-col gap-2">
                <motion.h3 layoutId={`title-${active.id}-${id}`} className="text-lg font-semibold flex items-center justify-between">
                  {active.name}
                  <span className="text-sm text-muted-foreground">
                    Book ID:{active.id}

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
                  <div className="font-semibold">Language :</div>
                  <div>{active.Language}</div>

                </motion.div>
                <motion.div className="flex items-center gap-1 ">
                  <div className="font-semibold">Available Copies :</div>
                  <div>{active.Available_Copies}</div>

                </motion.div>
                <motion.div >
                  <Badge status={active.Status} />
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
              <div key={idx} className="h-40 w-full rounded-t-lg card__skeleton" />
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
