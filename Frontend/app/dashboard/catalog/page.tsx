"use client"
import SelectComponent from '@/components/select'
import { ProductsGrid } from '@/table/maintable'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { productColumns } from './components/column'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

const Catalog = () => {
  const [search, setsearch] = useState<string>("")
  const [BookData, setBookData] = useState([])
  const [LangugesFilter, setLangugesFilter] = useState<string[]>([])
  const [Language, setLanguage] = useState<string>("All")
  const [Author, setAuthor] = useState<string>("All")
  const [AuthorFilter, setAuthorFilter] = useState<string[]>([])
  const [status, setstatus] = useState<string>("Available")
  const [statusFilter, setSetstatusFilter] = useState<string[]>([])
  const [Loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const data = await fetch("http://127.0.0.1:8000/books/getall")
      if (!data.ok) {
        const res = await data.json()
        toast.error("Unable to fetch data")
        return
      }
      const res = await data.json()
      setBookData(res)
      setLoading(false)
    })()

    return () => {

    }
  }, [])
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
      <h1 className='text-2xl font-extrabold mx-3 my-2  '>Browse Books</h1>
      <div className='flex items-center mx-3 my-3 gap-3 bg-white p-3 rounded-lg'>
        <div>
          <Search className='text-[#6841c4]' size={22} />
        </div>
        <input value={search} onChange={(e) => setsearch(e.target.value)} className='bg-none border-none outline-none w-full font-medium' type="text" name="search" id="search" placeholder='Search by title,author or genre' />
      </div>
      <div>
      </div>
      <div className='flex items-center gap-4 mx-3'>
        <SelectComponent value={Language} onchange={setLanguage} name="Language" array={LangugesFilter} />
        <SelectComponent value={Author} onchange={setAuthor} name="Author" array={AuthorFilter} />
        <SelectComponent value={status} onchange={setstatus} name="Availability" array={statusFilter} />
      </div>
      <ProductsGrid data={BookData} columns={productColumns} pageSize={6} loading={Loading} externalFilter={search} columnFilter={[{ columnId: "Language", value: Language }, { columnId: "Author", value: Author }, { columnId: "Status", value: status }]} />


    </>
  )
}
export default Catalog
