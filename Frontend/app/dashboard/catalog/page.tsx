"use client"
import SelectComponent from '@/components/select'
import { ProductsGrid } from '@/table/maintable'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { productColumns } from './components/column'
const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    Author: "John Doe",
    Language: "English",
    Available_Copies: 10,
    Status: "Available",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 149.99,
    Author: "Jane Smith",
    Language: "English",
    Available_Copies: 5,
    Status: "Available",
  },
  {
    id: "3",
    name: "Gaming Mouse",
    price: 59.99,
    Author: "Alex Johnson",
    Language: "English",
    Available_Copies: 0,
    Status: "Out of Stock",
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    price: 129.99,
    Author: "Emily Davis",
    Language: "English",
    Available_Copies: 7,
    Status: "Available",
  },
  {
    id: "5",
    name: "VR Headset",
    price: 299.99,
    Author: "Michael Brown",
    Language: "English",
    Available_Copies: 2,
    Status: "Available",
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    price: 79.99,
    Author: "Sarah Wilson",
    Language: "English",
    Available_Copies: 15,
    Status: "Reserved",
  },
  {
    id: "7",
    name: "E-book Reader",
    price: 129.99,
    Author: "David Lee",
    Language: "English",
    Available_Copies: 8,
    Status: "Available",
  },
  {
    id: "8",
    name: "Fitness Tracker",
    price: 89.99,
    Author: "Laura Martinez",
    Language: "English",
    Available_Copies: 0,
    Status: "Out of Stock",
  },
];

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
      <div className='flex items-center gap-4 mx-3'>
        <SelectComponent name="Language" array={["light", "dark", "system", 1, 2]} />
        <SelectComponent name="Author" array={["light"]} />
        <SelectComponent name="Availability" array={["light", "dark", "system", 1, 2]} />
      </div>
      <ProductsGrid data={products} columns={productColumns} pageSize={6} loading={false} externalFilter={search}  />
    </>
  )
}
export default Catalog
