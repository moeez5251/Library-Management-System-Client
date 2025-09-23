"use client"
import { BookMinus, Handshake } from 'lucide-react'
import React from 'react'
const MyAccount = () => {
  return (
    <>
      <h2 className='font-semibold text-xl mx-2 my-1'>My Account</h2>
      <div className='bg-white mx-2 my-4 px-3 py-4 rounded-md min-h-screen'>
        <div className='font-semibold text-lg border-b-2 pb-1 border-[#899598] '>
          Lending Details
        </div>
        <h2 className='font-semibold text-lg my-4 text-gray-700'><Handshake size={20} className='inline mr-1 text-gray-600' />My Lending</h2>
        <div className='my-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 '>

              <div className='bg-[#6941c5] p-2 rounded-full w-fit'>
                <BookMinus size={20} className='text-white' />
              </div>
              <div className='font-semibold'>Book Name</div>
            </div>
            <div className=''>Author</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyAccount