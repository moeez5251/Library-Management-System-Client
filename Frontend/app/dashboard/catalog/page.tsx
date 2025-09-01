"use client"
import SelectComponent from '@/components/select'
import { ProductsGrid } from '@/table/maintable'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { productColumns } from './column'

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://via.placeholder.com/300x200?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149.99,
    image: "https://via.placeholder.com/300x200?text=Smart+Watch",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "https://via.placeholder.com/300x200?text=Speaker",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 49.99,
    image: "https://via.placeholder.com/300x200?text=Mouse",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 119.99,
    image: "https://via.placeholder.com/300x200?text=Keyboard",
  },
  {
    id: 6,
    name: "4K Monitor",
    price: 399.99,
    image: "https://via.placeholder.com/300x200?text=Monitor",
  },
  {
    id: 7,
    name: "External SSD",
    price: 89.99,
    image: "https://via.placeholder.com/300x200?text=SSD",
  },
  {
    id: 8,
    name: "Drone",
    price: 499.99,
    image: "https://via.placeholder.com/300x200?text=Drone",
  },
  {
    id: 9,
    name: "Action Camera",
    price: 199.99,
    image: "https://via.placeholder.com/300x200?text=Camera",
  },
  {
    id: 10,
    name: "VR Headset",
    price: 299.99,
    image: "https://via.placeholder.com/300x200?text=VR+Headset",
  },
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
      <div className='flex items-center gap-4 mx-3'>
        <SelectComponent name="Genre" array={["light", "dark", "system", 1, 2]} />
        <SelectComponent name="Author" array={["light"]} />
        <SelectComponent name="Availability" array={["light", "dark", "system", 1, 2]} />
      </div>
       <ProductsGrid data={products} columns={productColumns} pageSize={3} loading={false} />
    </>
  )
}
export default Catalog
