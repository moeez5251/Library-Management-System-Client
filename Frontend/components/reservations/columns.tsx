"use client"
import { ColumnDef } from "@tanstack/react-table"

interface Reserverd {
    Reservation_ID: number
    Book_ID: string
    Reserved_Date: string
    Book_Title: string
    Author: string
}

export const ReserverdColumns: ColumnDef<Reserverd>[] = [
    {
        accessorKey: "Book_Title",
        header: "Book Title",
        cell: ({ getValue }) => getValue(),
    }
    ,
    {
        accessorKey: "Author",
        header: "Author",
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: "Reserved_Date",
        header: "Reserved Date",
        cell: ({ getValue }) => getValue(),

    }
]

