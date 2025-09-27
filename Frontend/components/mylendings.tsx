"use client"
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BookMinus, CornerDownLeft, CircleCheckBig } from 'lucide-react'
import Loader from '@/components/lendingloader'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'

interface Lending {
    Borrower_ID: number,
    user_id: string,
    Name: string,
    BookTitle: string,
    Category: string,
    Author: string,
    IssuedDate: string,
    DueDate: string,
    CopiesLent: number,
    FinePerDay: number,
    Price: number,
    Book_ID: string,
    Status: string
}

const MyLendings = () => {
    const [isloading, setIsloading] = useState<Boolean>(true);
    const [Lendings, setLendings] = useState<Lending[]>([])
    async function fetchlendings() {
            const userid = JSON.parse(localStorage.getItem("user") || "");
            try {
                const data = await fetch("http://127.0.0.1:8000/lenders/getbyid", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        user_id: userid
                    })
                })
                if (!data.ok) {
                    toast.error("Unable to fetch lendings")
                    return;
                }
                const res = await data.json();
                setIsloading(false);
                setLendings(res);
            }
            catch {
                toast.error("Unable to fetch lendings")
                setIsloading(false);
            }
        }
    useEffect(() => {
        fetchlendings();
        return () => {

        }
    }, [])

    return (
        <>
            <Toaster />
            <div className='my-4 overflow-y-auto h-[48vh] overflow-x-hidden'>

                {
                    isloading ? <Loader /> :
                        <Accordion type="single" collapsible>
                            {
                                Lendings.map((lending, index) => (
                                    <AccordionItem key={index} className='border-none ' value={`item-${index}`}>
                                        <AccordionTrigger className='text-base'>
                                            <div className='flex items-center justify-between w-full'>
                                                <div className='flex items-center gap-2 '>
                                                    <div className='bg-[#6941c5] p-2 rounded-full w-fit'>
                                                        <BookMinus size={20} className='text-white' />
                                                    </div>
                                                    <div className='font-semibold '>{lending.BookTitle}</div>
                                                </div>

                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start justify-items-center'>
                                                <div>
                                                    <div className='font-semibold text-base mb-2'>Book Name</div>
                                                    <div className='text-gray-600 mb-4 '>{lending.BookTitle}</div>
                                                </div>
                                                <div>
                                                    <div className='font-semibold text-base mb-2'>Author</div>
                                                    <div className='text-gray-600 mb-4 '>{lending.Author}</div>
                                                </div>
                                                <div>
                                                    <div className='font-semibold text-base mb-2'>Issue Date</div>
                                                    <div className='text-gray-600 mb-4'>{lending.IssuedDate}</div>
                                                </div>
                                                <div>
                                                    <div className='font-semibold text-base mb-2'>Due Date</div>
                                                    <div className='text-gray-600 mb-4'>{lending.DueDate}</div>
                                                </div>
                                                <div>
                                                    {
                                                         lending.Status === "Returned" ? <div className='bg-green-700 text-white px-3 py-2 rounded-md font-semibold flex items-center gap-2'><CircleCheckBig size={20} className='' /> Returned</div> :
                                                        <div data-book-id={lending.Book_ID} data-borrowerid={lending.Borrower_ID} className='bg-red-700 text-white px-3 py-2 rounded-md font-semibold cursor-pointer hover:bg-red-600 transition-colors flex items-center gap-2'>
                                                            <CornerDownLeft size={20} className='' /> Return
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                }
            </div>
        </>
    )
}

export default MyLendings