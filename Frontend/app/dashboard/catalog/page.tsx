"use client"
import SelectComponent from '@/components/select'
import { ProductsGrid } from '@/components/table/maintable'
import { X, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { productColumns } from './components/column'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDataFetcher } from '@/lib/datafetcher'
const Catalog = () => {
  const [search, setsearch] = useState<string>("")
  const [BookData, setBookData] = useState([])
  const [LangugesFilter, setLangugesFilter] = useState<string[]>([])
  const [Language, setLanguage] = useState<string>("All")
  const [Author, setAuthor] = useState<string>("All")
  const [AuthorFilter, setAuthorFilter] = useState<string[]>([])
  const [status, setstatus] = useState<string>("Available")
  const [statusFilter, setSetstatusFilter] = useState<string[]>([])
  const [pageSize, setPageSize] = useState<string>("2")
  const [Loading, setLoading] = useState(true)
  const { datafetcher, setDatafetcher } = useDataFetcher();
  const fetch_data = async () => {
    const data = await fetch("/req/books/getall")
    if (!data.ok) {
      const res = await data.json()
      toast.error("Unable to fetch data")
      return
    }
    const res = await data.json()
    setBookData(res)
    setLoading(false)
  }
  useEffect(() => {
    fetch_data()
    return () => {

    }
  }, [datafetcher])

  useEffect(() => {
    if (BookData.length > 0) {
      setLangugesFilter(["All", ...new Set(BookData.map((item: any) => item.Language))])
      setAuthorFilter(["All", ...new Set(BookData.map((item: any) => item.Author))])
      setSetstatusFilter(["All", ...new Set(BookData.map((item: any) => item.Status))])
    }
    return () => {

    }
  }, [BookData])



  return (
    <>
      <Toaster />

      <h1 className='text-2xl font-extrabold sm:mx-3 my-2  '>Browse Books</h1>
      <div className='flex items-center  sm:mx-3 my-3 gap-3 bg-white p-3 rounded-lg'>
        <div>
          <Search className='text-[#6841c4]' size={22} />
        </div>
        <input value={search} onChange={(e) => setsearch(e.target.value)} className='bg-none border-none outline-none w-full font-medium' type="text" name="search" id="search" placeholder='Search by title,author or genre' />
        <X onClick={() => setsearch("")} className={`text-[#6841c4] scale-100 hover:scale-105 transition-transform cursor-pointer ${search.length > 0 ? "block" : "hidden"}`} size={20} />
      </div>
      <div>
      </div>
      <div className='flex items-end lg:items-center justify-between gap-4  sm:mx-3 overflow-auto'>
        <div className='flex items-center gap-4'>
          <SelectComponent disabled={Loading} value={Language} onchange={setLanguage} name="Language" array={LangugesFilter} />
          <SelectComponent disabled={Loading} value={Author} onchange={setAuthor} name="Author" array={AuthorFilter} />
          <SelectComponent disabled={Loading} value={status} onchange={setstatus} name="Availability" array={statusFilter} />
        </div>
        <div className='flex items-center gap-3'>
          <div className='font-semibold text-[#637277] text-nowrap'>
            No of rows :
          </div>
          <Select disabled={Loading} value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="w-[70px] bg-white text-black  border-none    ">
              <SelectValue placeholder="Page Size" />
            </SelectTrigger>
            <SelectContent className='bg-white border-none'>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="8">8</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ProductsGrid data={BookData} columns={productColumns} pageSize={parseInt(pageSize) * 3} loading={Loading} externalFilter={search} columnFilter={[{ columnId: "Language", value: Language }, { columnId: "Author", value: Author }, { columnId: "Status", value: status }]} />

    </>
  )
}
export default Catalog
