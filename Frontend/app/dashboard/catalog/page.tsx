"use client"
import { Search } from 'lucide-react'
import React, { useState } from 'react'
type Book = {
  id: number
  title: string
  author: string
  year: number
}
const data: Book[] = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 2, title: "Design Patterns", author: "Erich Gamma", year: 1994 },
  { id: 3, title: "Refactoring", author: "Martin Fowler", year: 1999 },
]

const Catalog = () => {
  const [search, setsearch] = useState<string>("")
  return (
    <>
      <h1 className='text-2xl font-extrabold mx-3 my-2  '>Browse Books</h1>
      <div className='flex items-center mx-3 my-3 gap-3 bg-white p-3 rounded-lg'>
        <div>
          <Search className='text-[#6841c4]' size={22} />
        </div>
        <input value={search} onChange={(e) => setsearch(e.target.value)} className='bg-none border-none outline-none w-full font-medium' type="text" name="search" id="search" placeholder='Search by title,author or genre' />
      </div>
      <div>
        
      </div>
    </>
  )
}

export default Catalog
