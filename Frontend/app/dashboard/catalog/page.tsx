"use client"
import { DataTable } from '@/table/maintable'
import React from 'react'
import columns from './column'

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
  return (
    <div>
       <DataTable data={data} columns={columns} pageSize={8} loading={false} externalFilter=''  />
    </div>
  )
}

export default Catalog
