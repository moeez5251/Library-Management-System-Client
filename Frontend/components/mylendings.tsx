"use client"
import React, { useEffect, useState } from 'react'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'
import DataTable from '@/components/Lendingstable/table'
import { LendingsColumns } from '@/components/Lendingstable/columns'
import { useDataFetcher } from '@/lib/datafetcher'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
            const data = await fetch("/req/lenders/getbyid", {
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
                        <Tabs defaultValue="All" >
                            <TabsList className='bg-white w-full sm:w-fit  dark:bg-[#1b2536] overflow-x-auto overflow-y-hidden'>
                                <TabsTrigger className="mx-2 px-2 py-4 bg-gray-100 dark:bg-gray-600 data-[state=active]:bg-[#6841c4] data-[state=active]:text-white data-[state=active]:shadow-md cursor-pointer" disabled={isloading} value="All">All</TabsTrigger>
                                <TabsTrigger className="mx-2 px-2 py-4 bg-gray-100 dark:bg-gray-600 data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=active]:shadow-md cursor-pointer" disabled={isloading} value="Not-Returned">Not Returned</TabsTrigger>
                                <TabsTrigger className="mx-2 px-2 py-4 bg-gray-100 dark:bg-gray-600 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-md cursor-pointer" disabled={isloading} value="Returned">Returned</TabsTrigger>
                            </TabsList>
                            <TabsContent className='w-full overflow-x-auto' value="All">

                                <DataTable data={Lendings} columns={LendingsColumns} loading={isloading} />
                            </TabsContent>
                            <TabsContent className='w-full overflow-x-auto' value="Not-Returned">
                                <DataTable data={Lendings.filter((item) => item.Status === "not returned")} columns={LendingsColumns} loading={isloading} />

                            </TabsContent>
                            <TabsContent className='w-full overflow-x-auto' value="Returned">
                                <DataTable data={Lendings.filter((item) => item.Status === "Returned")} columns={LendingsColumns} loading={isloading} />

                            </TabsContent>


                        </Tabs>
                        :
                        <div className='text-center font-semibold text-lg text-gray-700 py-8'>No Lending History Found</div>
                }
            </div>
            <div>
            </div>
        </>
    )
}

export default MyLendings