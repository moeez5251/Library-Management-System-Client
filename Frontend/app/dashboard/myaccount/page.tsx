"use client"
import MyLendings from '@/components/mylendings'
import { BookMinus, Handshake, CornerDownLeft } from 'lucide-react'
import React from 'react'
const MyAccount = () => {
  return (
    <>
      <h2 className='font-semibold text-xl mx-2 my-1'>My Account</h2>
      <div className='bg-white mx-2 my-4 px-3 py-4 rounded-md min-h-screen'>
        <div className='font-semibold text-lg border-b-2 pb-1 border-[#899598] '>
          Lending Details
        </div>
        <h2 className='font-semibold text-lg my-4 text-gray-700'><Handshake size={20} className='inline mr-1 text-[#6941c5]' />My Lendings</h2>
        <MyLendings />
      </div>
    </>
  )
}

export default MyAccount