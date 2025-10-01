"use client"
import React, { useEffect, useState } from 'react'
import Loader from '@/components/lendingloader'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'
import DataTable from '@/Lendingstable/table'
import { LendingsColumns } from '@/components/columns'
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
    const [isloading, setIsloading] = useState<Boolean>(true);
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
                    isloading ? <Loader /> :
                        <DataTable data={Lendings} columns={LendingsColumns} pageSize={10} loading={isloading} />
                }
            </div>
            <div>
                
            </div>
        </>
    )
}

export default MyLendings