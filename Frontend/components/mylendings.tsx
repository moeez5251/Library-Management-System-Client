"use client"
import React, { useEffect, useState } from 'react'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'
import DataTable from '@/components/Lendingstable/table'
import { LendingsColumns } from '@/components/Lendingstable/columns'
import { useDataFetcher } from '@/lib/datafetcher'
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
    const [isloading, setIsloading] = useState<boolean>(true);
    const [Lendings, setLendings] = useState<Lending[]>([])
    const { datafetcher, setDatafetcher } = useDataFetcher();

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
    }, [datafetcher])

    return (
        <>
            <Toaster />
            <div className='my-5'>
                {
                    Lendings.length > 0 || isloading ?
                    
                        <DataTable data={Lendings} columns={LendingsColumns} loading={isloading} /> :
                        <div className='text-center font-semibold text-lg text-gray-700 py-8'>No Lending History Found</div>

                }
            </div>
            <div>
            </div>
        </>
    )
}

export default MyLendings