"use client"
import { useDataFetcher } from "@/lib/datafetcher"
import { returnbook } from "@/lib/returnmanager"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { toast } from "sonner"
interface Lendings {
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
export const LendingsColumns: ColumnDef<Lendings>[] = [

  {
    accessorKey: "BookTitle",
    header: "Book Title",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "IssuedDate",
    header: "Issued Date",
    cell: ({ getValue, row }) => {
      return <div className="text-sm text-gray-500">{row.original.IssuedDate}</div>;
    },

  },
  {
    accessorKey: "DueDate",
    header: "Due Date",
    cell: ({ getValue, row }) => {
      return <div className="text-sm text-gray-500">{row.original.DueDate}</div>;
    },

  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ getValue, row }) => {
      const { datafetcher, setDatafetcher } = useDataFetcher();
      const [isreturning, setisreturning] = useState(false);
      const { Status, Book_ID, user_id, Borrower_ID } = row.original;
      const handleReturn = async () => {
        setisreturning(true);
        try {
          await returnbook(
            Book_ID,
            user_id,
            Borrower_ID
          );
          toast.success("Book returned successfully");
          setisreturning(false);
          setDatafetcher(!datafetcher);
        } catch (e) {
          toast.error("Unable to return book");
          setisreturning(false);
        }
      };
      return (
        row.original.Status === "Returned" ? <div className="text-xs bg-green-500 text-white p-1 w-fit rounded-sm">Returned</div> : isreturning ? <div className="text-xs bg-gray-500 text-white p-1.5 w-fit rounded-sm">Returning...</div> :
          <div onClick={handleReturn} className="text-xs text-white p-1.5 w-fit rounded-sm bg-red-500 cursor-pointer">Return Now</div>

      );
    },

  },

]
