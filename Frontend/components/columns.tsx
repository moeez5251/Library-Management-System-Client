"use client"
import { useDataFetcher } from "@/lib/datafetcher"
import { returnbook } from "@/lib/returnmanager"
import { ColumnDef } from "@tanstack/react-table"

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
      const { Status, Book_ID, user_id, Borrower_ID } = row.original;
      const handleReturn = async () => {
        try {
          await returnbook(
            Book_ID,
            user_id,
            Borrower_ID
          );
          setDatafetcher(!datafetcher);
        } catch (e) {
        }
      };
      return (
        row.original.Status === "Returned" ? <div className="text-xs bg-green-500 text-white p-1 w-fit rounded-sm">Returned</div> : <div onClick={handleReturn} className="text-xs text-white p-1.5 w-fit rounded-sm bg-red-500 cursor-pointer">Return Now</div>
      );
    },

  },

]
