"use client"
import React, { useState } from 'react'
import { Modal } from './custommodal'
import { useLendingFetcher } from '@/lib/LendingModal'
import { useReturn } from '@/lib/ReturnDetails'
import { HandCoins } from 'lucide-react'
import { useDataFetcher } from '@/lib/datafetcher'
import { returnbook } from "@/lib/returnmanager"
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'
import Loader from "@/components/loader"

const LendingModal = () => {
    const { Lendingmodel, setLendingmodel } = useLendingFetcher();
    const { ReturnBook, setReturnBook } = useReturn()
    const { datafetcher, setDatafetcher } = useDataFetcher();
    const [isreturning, setisreturning] = useState(false)
    function getOverdueDays(dueDate: Date): number {
        const today = new Date();
        const dToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const dDue = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

        if (dToday > dDue) {
            const diffInMs = dToday.getTime() - dDue.getTime();
            return diffInMs / (1000 * 60 * 60 * 24);
        }

        return 0;
    }
    const handleReturn = async () => {
        setisreturning(true);
        try {
            await returnbook(
                ReturnBook?.Book_ID,
                ReturnBook?.user_id,
                ReturnBook?.Borrower_ID
            );
            toast.success("Book returned successfully");
            setisreturning(false);
            setDatafetcher(!datafetcher);
            setLendingmodel(false); 
            setReturnBook([]);
        } catch (e) {
            toast.error("Unable to return book");
            setisreturning(false);
        }

    };
    return (
        <>
            <Toaster />
            <Modal title='Return Book' open={Lendingmodel} onClose={() => setLendingmodel(false)}>
                <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4'>

                    <div className='flex items-center gap-1 '>
                        <div className='font-semibold'>
                            Book Title :
                        </div>
                        <div>
                            {ReturnBook?.BookTitle}
                        </div>
                    </div>
                    <div className='flex items-center gap-1 '>
                        <div className='font-semibold'>
                            Book Author :
                        </div>
                        <div>
                            {ReturnBook?.Author}
                        </div>
                    </div>
                    <div className='flex items-center gap-1 '>
                        <div className='font-semibold'>
                            Book Category :
                        </div>
                        <div>
                            {ReturnBook?.Category}
                        </div>
                    </div>
                    <div className='flex items-center gap-1 '>
                        <div className='font-semibold'>
                            Issue Date :
                        </div>
                        <div>
                            {ReturnBook?.IssuedDate}
                        </div>
                    </div>
                    <div className='flex items-center gap-1 '>
                        <div className='font-semibold'>
                            Due Date :
                        </div>
                        <div>
                            {ReturnBook?.DueDate}
                        </div>
                    </div>
                    <div className='flex items-center gap-1 '>
                        <div className='font-semibold'>
                            Copies Lent :
                        </div>
                        <div>
                            {ReturnBook?.CopiesLent}
                        </div>
                    </div>
                    <div className='flex items-center gap-1 '>
                        <div className='font-semibold'>
                            Per Day Fine :
                        </div>
                        <div>
                            {ReturnBook?.FinePerDay}
                        </div>
                    </div>
                </div>
                <div className='my-4'>

                    <div className='font-semibold my-2 text-lg flex items-center gap-1'>
                        <HandCoins size={20} className='text-[#6941c5]' />
                        Fine Details

                    </div>
                    <div className='font-semibold'>Your Fine will be : <span className='font-normal'>
                        Rs. {getOverdueDays(new Date(ReturnBook?.DueDate)) * ReturnBook?.FinePerDay}
                    </span>
                    </div>
                </div>

                <button onClick={handleReturn} disabled={isreturning} className='bg-[#154149] font-semibold text-white px-4 py-2 rounded-md w-full cursor-pointer scale-100 hover:scale-105 transition-transform disabled:bg-gray-400 disabled:cursor-auto disabled:pointer-events-none'>Return Book</button>
            </Modal>
            <Loader open={isreturning} />
        </>

    )
}

export default LendingModal