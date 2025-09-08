"use client"
import React from 'react'
interface Props {
  id: (number | string)
  status: boolean
}
const Lender: React.FC<Props> = ({ id, status }) => {
  const handleclick = () => {
    console.log(id);
  }
  return (
    <div className='w-full'>
      <button onClick={handleclick} disabled={status} className='bg-[#154149] font-semibold text-white px-4 py-2 rounded-md w-full cursor-pointer scale-100 hover:scale-105 transition-transform disabled:bg-gray-400 disabled:cursor-auto disabled:pointer-events-none'>Lend Book</button>
    </div>
  )
}

export default Lender