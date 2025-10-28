"use client"
import LendingModal from '@/components/LendingModal'
import MyLendings from '@/components/mylendings'
import MyReservation from '@/components/myreservation'
import UserDetails from '@/components/userdetails'
import { Handshake, HandCoins } from 'lucide-react'
import React from 'react'
const MyAccount = () => {
  return (
    <>
      <h2 className='font-semibold text-xl mx-1 sm:mx-2 my-1'>My Account</h2>
      <div className='bg-white mx-1 sm:mx-2 my-4 px-3 py-4 rounded-md'>
        <div className='font-semibold text-lg border-b-2 pb-1 border-[#899598] '>
          Lending Details
        </div>
        <h2 className='font-semibold text-lg mt-4 text-gray-700'><Handshake size={20} className='inline mr-1 text-[#6941c5]' />My Lendings</h2>
        <MyLendings />
        <h2 className='font-semibold text-lg mt-4 text-gray-700'><HandCoins size={20} className='inline mr-1 text-[#6941c5]' />My Reservations</h2>
        <MyReservation />
        <div className='font-semibold text-lg border-b-2 pb-1 border-[#899598] '>
          Account Information
        </div>
        <UserDetails />
      </div>

      <LendingModal />
    </>
  )
}
export default MyAccount