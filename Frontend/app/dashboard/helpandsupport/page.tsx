"use client"
import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { AnimatedModalDemo } from '@/components/ticketmodal'
import SubmitDialog from '@/components/submitdialog';
import { usesubmitmodal } from '@/lib/Submitmodal';
const Help = () => {
  const { submitmodal, setsubmitmodal } = usesubmitmodal()
  return (
    <>
      <h1 className='mx-2 sm:mx-3 my-4 text-3xl font-extrabold'>Help and Support</h1>
      <p className="text-gray-600 mx-2 sm:mx-3 my-5 ">Find answers to our common questions or contact our support for assistance. </p>
      <h1 className='mx-2 sm:mx-3 my-5 text-3xl font-extrabold'>Frequently Asked Questions</h1>
      <Accordion collapsible type="single" className="mx-2 sm:mx-3 space-y-4">

        <AccordionItem className='border-gray-500 border px-3 rounded-sm shadow-xs' value="item-1">
          <AccordionTrigger className='hover:no-underline font-semibold'>How can I borrow a book?</AccordionTrigger>
          <AccordionContent>
            You can borrow a book by selecting it from the catalog and clicking the <strong>“Lend a Book ”</strong> button.
            The book will be immediately issued for you.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className='border-gray-500 border px-3 rounded-sm shadow-xs' value="item-2">
          <AccordionTrigger className='hover:no-underline font-semibold'>What happens if I return a book late?</AccordionTrigger>
          <AccordionContent>
            If a book is returned after the due date, a fine will be charged based on the number of overdue days.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className='border-gray-500 border px-3 rounded-sm shadow-xs' value="item-3">
          <AccordionTrigger className='hover:no-underline font-semibold'>How can I check book availability?</AccordionTrigger>
          <AccordionContent>
            You can search the catalog by title, author, or category. The system will show how many copies are currently available.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className='border-gray-500 border px-3 rounded-sm ' value="item-4">
          <AccordionTrigger className='hover:no-underline font-semibold'>Can I renew a borrowed book?</AccordionTrigger>
          <AccordionContent>
            Yes, you can request a renewal before the due date if the book is not reserved by another user.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className="border border-gray-500 px-3 rounded-md shadow-xs last:border "
          value="item-5"
        >
          <AccordionTrigger className="hover:no-underline font-semibold ">
            Who should I contact for technical or account issues?
          </AccordionTrigger>
          <AccordionContent>
            If you face any issues, contact the library support team via the{" "}
            <strong className='text-[#6941c5]'>Help & Support</strong> section or email{" "}
            <a className='hover:underline text-[#6941c5] pb-0.5' href='mailto:moeez66656@gmail.com'>moeez66656@gmail.com</a>.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className="border border-gray-500 px-3 rounded-md shadow-xs last:border "
          value="item-6"
        >
          <AccordionTrigger className="hover:no-underline font-semibold ">
            How many copies of a book I reserve at a time?
          </AccordionTrigger>
          <AccordionContent>
            You can reserve up to <strong className='text-[#6941c5] font-semibold'>1</strong> copies of a book at a time.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h1 className='mx-3 mt-8 text-3xl font-extrabold'>Contact Support</h1>
      <p className=" mx-3 my-3 text-gray-600">If you need further assistance , please contact us by submitting a ticket </p>
      <AnimatedModalDemo />
      <SubmitDialog open={submitmodal} onOpenChange={setsubmitmodal} />
    </>
  )
}

export default Help