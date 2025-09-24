"use client"
import { BookMinus, Handshake, CornerDownLeft } from 'lucide-react'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
const MyAccount = () => {
  return (
    <>
      <h2 className='font-semibold text-xl mx-2 my-1'>My Account</h2>
      <div className='bg-white mx-2 my-4 px-3 py-4 rounded-md min-h-screen'>
        <div className='font-semibold text-lg border-b-2 pb-1 border-[#899598] '>
          Lending Details
        </div>
        <h2 className='font-semibold text-lg my-4 text-gray-700'><Handshake size={20} className='inline mr-1 text-[#6941c5]' />My Lending</h2>
        <div className='my-4'>
          <Accordion type="single" collapsible >
            <AccordionItem className='border-none' value="item-1">
              <AccordionTrigger className='text-base'>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-2 '>
                    <div className='bg-[#6941c5] p-2 rounded-full w-fit'>
                      <BookMinus size={20} className='text-white' />
                    </div>
                    <div className='font-semibold'>Book Name</div>
                  </div>

                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start justify-items-center'>
                  <div>
                    <div className='font-semibold text-base mb-2'>Book Name</div>
                    <div className='text-gray-600 mb-4'>Book</div>
                  </div>
                  <div>
                    <div className='font-semibold text-base mb-2'>Author</div>
                    <div className='text-gray-600 mb-4'>Author Name</div>
                  </div>
                  <div>
                    <div className='font-semibold text-base mb-2'>Issue Date</div>
                    <div className='text-gray-600 mb-4'>10/10/2023</div>
                  </div>
                  <div>
                    <div className='font-semibold text-base mb-2'>Due Date</div>
                    <div className='text-gray-600 mb-4'>10/10/2023</div>
                  </div>
                  <div>
                    <div className='bg-red-700 text-white px-3 py-2 rounded-md font-semibold cursor-pointer hover:bg-red-600 transition-colors flex items-center gap-2'>
                      <CornerDownLeft size={20} className='' /> Return
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className='border-none' value="item-2">
              <AccordionTrigger className='text-base'>
                <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center gap-2 '>
                    <div className='bg-[#6941c5] p-2 rounded-full w-fit'>
                      <BookMinus size={20} className='text-white' />
                    </div>
                    <div className='font-semibold'>Book Name</div>
                  </div>

                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start justify-items-center'>
                  <div>
                    <div className='font-semibold text-base mb-2'>Book Name</div>
                    <div className='text-gray-600 mb-4'>Book</div>
                  </div>
                  <div>
                    <div className='font-semibold text-base mb-2'>Author</div>
                    <div className='text-gray-600 mb-4'>Author Name</div>
                  </div>
                  <div>
                    <div className='font-semibold text-base mb-2'>Issue Date</div>
                    <div className='text-gray-600 mb-4'>10/10/2023</div>
                  </div>
                  <div>
                    <div className='font-semibold text-base mb-2'>Due Date</div>
                    <div className='text-gray-600 mb-4'>10/10/2023</div>
                  </div>
                  <div>
                    <div className='bg-red-700 text-white px-3 py-2 rounded-md font-semibold cursor-pointer hover:bg-red-600 transition-colors flex items-center gap-2'>
                      <CornerDownLeft size={20} className='' /> Return
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  )
}

export default MyAccount