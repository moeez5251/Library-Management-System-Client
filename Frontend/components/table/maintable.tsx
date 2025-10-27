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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { X, Plus, Minus } from "lucide-react"
import { DatePicker } from "@/components/Datepickers"
import { Modal } from "@/components/custommodal"
import Loader from "@/components/loader"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useDataFetcher } from "@/lib/datafetcher"
interface ProductsGridProps<TData> {
  data: TData[]
  pageSize?: number
  loading?: boolean
  externalFilter?: string
  columns: ColumnDef<TData>[]
  columnFilter?: { columnId: keyof TData; value: string }[]
}
interface Lendedinfo {
  id: string | number
  name: string
  author: string
  price: number
  Language: string
  Available_Copies: number
  Date: Date
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
  const [trigger, setTrigger] = useState<boolean>(false)
  const [Copies, setCopies] = useState<
    {
      current: number
      max: number
    }>({ current: 0, max: 0 })
  const [disabledcartbuttons, setdisabledcartbuttons] = useState<
    {
      plus: boolean
      minus: boolean
    }>({ plus: false, minus: false })
  const [lendedbookinfo, setlendedbookinfo] = useState<Lendedinfo>({
    id: "",
    name: "",
    author: "",
    price: 0,
    Language: "",
    Available_Copies: 0,
    Date: new Date(new Date().setDate(new Date().getDate() + 1))
  })
  const [active, setActive] = useState<TData | null>(null)
  const [checkoutmodal, setCheckoutmodal] = useState<boolean>(false)
  const [Loaderanimation, setLoaderanimation] = useState<boolean>(false)


  const id = useId()
  const ref = useRef<HTMLDivElement>(null)
  const { datafetcher, setDatafetcher } = useDataFetcher();


  useOutsideClick(ref, () => setActive(null))
  function getDaysDifference(date1: Date, date2: Date): number {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const diffInMs = Math.abs(d2.getTime() - d1.getTime());
    return diffInMs / (1000 * 60 * 60 * 24);
  }

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
  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "auto"
  }, [active])
  const handleclick = (id: (number | string)) => {
    setdisabledcartbuttons({ plus: false, minus: false })
    setlendedbookinfo({
      ...lendedbookinfo,
      id: id,
      name: active?.name ?? "",
      author: active?.Author ?? "",
      price: active?.price ?? 0,
      Language: active?.Language ?? "",
      Available_Copies: active?.Available_Copies ?? 0
    })
    setCopies({
      current: 0,
      max: Number(active?.Available_Copies) ?? 0
    })
    setActive(null)
    setTrigger(true)

  }
  const handleadd = (): void => {
    if (Copies.current < Copies.max) {
      setCopies(prev => ({
        ...prev,
        current: prev.current + 1
      }))
    } else {
      setdisabledcartbuttons(prev => ({
        ...prev,
        plus: true
      }))
    }

    if (Copies.current >= 0) {
      setdisabledcartbuttons(prev => ({
        ...prev,
        minus: false
      }))
    }
  }

  const handleminus = (): void => {
    if (Copies.current > 0) {
      setCopies(prev => ({
        ...prev,
        current: prev.current - 1
      }))
    } else {
      setdisabledcartbuttons(prev => ({
        ...prev,
        minus: true
      }))
    }
    if (Copies.current <= Copies.max) {
      setdisabledcartbuttons(prev => ({
        ...prev,
        plus: false
      }))
    }
  }
  useEffect(() => {
    if (Copies.current === Copies.max) {
      setdisabledcartbuttons(prev => ({
        ...prev,
        plus: true
      }))
    }
    if (Copies.current === 0) {
      setdisabledcartbuttons(prev => ({
        ...prev,
        minus: true
      }))
    }
    return () => {

    }
  }, [Copies])

  const handlecheckout = async (): Promise<void> => {
    setLoaderanimation(true)
    const userid = JSON.parse(localStorage.getItem("user") || "")
    if (!userid) {
      toast.error("User not logged in")
      setLoaderanimation(false)
    }
    try {
      const data = await fetch("/req/books/lend", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          book_id: lendedbookinfo.id,
          user_id: userid,
          IssuedDate: new Date().toISOString().split('T')[0],
          DueDate: lendedbookinfo.Date.toLocaleString("en-CA").split(",")[0],
          CopiesLent: Copies.current,
          FinePerDay: 100
        })
      })
      if (!data.ok) {
        toast.error("Unable to lend book")
        setLoaderanimation(false)

        return
      }
      const res = await data.json()
      setDatafetcher(!datafetcher);
      setLoaderanimation(false)
      setCheckoutmodal(false)
      setCopies({ current: 0, max: 0 })
      setlendedbookinfo({
        id: "",
        name: "",
        author: "",
        price: 0,
        Language: "",
        Available_Copies: 0,
        Date: new Date(new Date().setDate(new Date().getDate() + 1))
      })
      setdisabledcartbuttons({ plus: false, minus: false })
      toast.success("Book issued successfully")
    }
    catch {
      setLoaderanimation(false)
      toast.error("Unable to lend book")
    }
  }
  const handlereservation = async (id: string | number): Promise<void> => {
    setActive(null)
    setLoaderanimation(true)
    try {
      const userid = JSON.parse(localStorage.getItem("user") || "")
      if (!userid) {
        toast.error("Unable to reserve book")
        setLoaderanimation(false)
        return
      }
      const data = await fetch("/req/reservation/reserve", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          book_id: id,
          user_id: userid,
          reservation_date: new Date().toISOString(),
        })
      })
      if (!data.ok) {
        toast.error("Unable to reserve book")
        setLoaderanimation(false)
        return
      }
      const res = await data.json()
      setDatafetcher(!datafetcher);
      setLoaderanimation(false)
      toast.success("Book reserved successfully")
    }
    catch {
      setLoaderanimation(false)
    }
  }


  return (
    <>
      <Toaster />
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
                  {
                    active.Status === "Borrowed" ?
                      <button onClick={() => handlereservation(active.id)} className='bg-[#154149] font-semibold text-white px-4 py-2 rounded-md w-full cursor-pointer scale-100 hover:scale-105 transition-transform disabled:bg-gray-400 disabled:cursor-auto disabled:pointer-events-none'>Reserve Book</button>
                      : <button onClick={() => handleclick(active.id)} disabled={active.Status !== "Available"} className='bg-[#154149] font-semibold text-white px-4 py-2 rounded-md w-full cursor-pointer scale-100 hover:scale-105 transition-transform disabled:bg-gray-400 disabled:cursor-auto disabled:pointer-events-none'>Lend Book</button>
                  }
                </motion.div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="px-2 py-4 sm:p-4 space-y-6">
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
      <Dialog open={trigger} onOpenChange={setTrigger} >
        <DialogContent className="border-none shadow-md" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Lend Book ?</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div>
            <div className="mb-4">
              <h1 className="font-semibold">
                Book Details are as follows
              </h1>
              <div className="my-2 flex flex-col justify-center gap-2 font-normal">
                <div className="flex items-center gap-2 font-semibold">Name :
                  <div>
                    {lendedbookinfo.name}
                  </div>
                </div>
                <div className="flex items-center gap-2 font-semibold">Author :
                  <div>
                    {lendedbookinfo.author}
                  </div>
                </div>
                <div className="flex items-center gap-2 font-semibold">Price Per Copy :
                  <div>
                    {lendedbookinfo.price}
                  </div>
                </div>
                <div className="flex items-center gap-2 font-semibold">Language :
                  <div>
                    {lendedbookinfo.Language}
                  </div>
                </div>
                <div className="flex items-center gap-2 font-semibold">Available Copies :
                  <div>
                    {lendedbookinfo.Available_Copies}
                  </div>
                </div>

              </div>
            </div>
            <h1 className="font-semibold  text-center text-lg">

              Choose number of copies to lend
            </h1>
            <div className="flex items-center justify-center my-4 gap-2.5">
              <button disabled={disabledcartbuttons.plus} onClick={handleadd} className="cursor-pointer bg-[#154149] rounded-full p-1 scale-100 hover:scale-110  transition-transform  disabled:bg-gray-400 disabled:pointer-events-none disabled:cursor-auto"><Plus size={20} className="text-white" /></button>
              <span className="bg-gray-200 px-4  py-0.5 rounded-sm ">{Copies.current}</span>
              <button disabled={disabledcartbuttons.minus} onClick={handleminus} className="cursor-pointer bg-[#154149] rounded-full p-1 scale-100 hover:scale-110  transition-transform  disabled:bg-gray-400 disabled:pointer-events-none disabled:cursor-auto"><Minus size={20} className="text-white" /></button>

            </div>
            <div className="font-semibold text-lg my-3 ">Final Price : {Copies.current * lendedbookinfo.price}</div>
            <button disabled={Copies.current === 0} onClick={() => { setCheckoutmodal(true); setTrigger(false); setdisabledcartbuttons({ plus: false, minus: false }); }} className="bg-[#154149] text-white p-2 cursor-pointer rounded-md w-full scale-95 hover:scale-100  transition-transform disabled:bg-gray-400 disabled:pointer-events-none disabled:cursor-auto"> Proceed to checkout </button>
          </div>
          <div onClick={() => { setTrigger(false); setlendedbookinfo({ ...lendedbookinfo, name: "", author: "", price: 0, Language: "", Available_Copies: 0, }); setdisabledcartbuttons({ plus: false, minus: false }); setCopies({ current: 0, max: 0 }) }} className="bg-gray-400 w-fit p-1 rounded-full cursor-pointer absolute right-2.5 top-2.5 z-10" >
            <X size={20} />
          </div>
        </DialogContent>
      </Dialog>
      <Modal open={checkoutmodal} onClose={() => { setCheckoutmodal(false); setCopies({ current: 0, max: 0 }); setlendedbookinfo({ ...lendedbookinfo, name: "", author: "", price: 0, Language: "", Available_Copies: 0, }); setdisabledcartbuttons({ plus: false, minus: false }); }} title="Checkout" >
        <Accordion className="border-none outline-none" type="single" collapsible>
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="font-semibold">Book Details</AccordionTrigger>
            <AccordionContent className="overflow-visible">
              <div className="my-2 flex flex-col justify-center gap-1.5 font-normal">
                <div className="flex items-center justify-between font-semibold">Name : <div>

                  {lendedbookinfo.name}
                </div>
                </div>
                <div className="flex items-center justify-between font-semibold">Author : <div>

                  {lendedbookinfo.author}
                </div>
                </div>
                <div className="flex items-center justify-between font-semibold">Price Per Copy : <div>

                  {lendedbookinfo.price}
                </div>
                </div>
                <div className="flex items-center justify-between font-semibold">Language : <div>

                  {lendedbookinfo.Language}
                </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-none" value="item-2">
            <AccordionTrigger className="font-semibold">Lending Details</AccordionTrigger>
            <AccordionContent>
              <div className="my-2 flex gap-2 sm:gap-0 sm:items-center justify-between font-normal flex-col sm:flex-row ">
                <DatePicker

                  date={new Date()}
                  onChange={() => { }}
                  label="Lending Date"
                  disabled={true}
                />
                <DatePicker
                  date={lendedbookinfo.Date}
                  onChange={(newDate) =>
                    setlendedbookinfo((prev) => ({
                      ...prev,
                      Date: newDate ?? new Date(),
                    }))
                  }
                  label="Return Date"
                  disabled={{ before: new Date() }}
                />

              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem className="border-none" value="item-3">
            <AccordionTrigger className="font-semibold">Price Details</AccordionTrigger>
            <AccordionContent>
              <div className=" flex items-center justify-between font-normal">
                <div className="font-semibold">Total Price of {Copies.current} Copies for {getDaysDifference(new Date(), lendedbookinfo.Date)} days</div>
                <div>
                  Rs {Copies.current * lendedbookinfo.price * getDaysDifference(new Date(), lendedbookinfo.Date)}
                </div>
              </div>
              <div className="my-5 flex items-center justify-between font-normal">
                <div className="font-semibold">Per Day Fine</div>
                <div>
                  Rs 100
                </div>
              </div>
              <div className="my-5 flex items-center justify-between font-normal">
                <div className="font-semibold">Total Price</div>
                <div>
                  Rs {(Copies.current * lendedbookinfo.price * getDaysDifference(new Date(), lendedbookinfo.Date))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <div>
            <div className="font-semibold text-base my-3">Final Price : {(Copies.current * lendedbookinfo.price * getDaysDifference(new Date(), lendedbookinfo.Date))}</div>
          </div>
        </Accordion>
        <div>
          <button onClick={handlecheckout} className="bg-[#154149] text-white p-2 cursor-pointer rounded-md w-full scale-95 hover:scale-100  transition-transform mt-6">Check Out </button>
        </div>
      </Modal>
      <Loader open={Loaderanimation} />
    </>
  )
}
