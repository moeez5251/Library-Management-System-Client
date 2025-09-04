"use client"
import { ColumnDef } from "@tanstack/react-table"
export type Product = {
  id: (string | number)
  name: string
  price: number
  Author:string
  Language:string
  Available_Copies:number
  Status:string
  Category:string
  Pages:number
}

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <h2 className="text-lg font-semibold m-3">{row.original.name}</h2>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <p className="text-gray-600 m-3">${row.original.price.toFixed(2)}</p>
    ),
  },
  {
    accessorKey: "Author",
    header: "Author",
    cell: ({ row }) => (
      <p className="text-gray-600 m-3">{row.original.Author}</p>
    )
  },
  {
    accessorKey: "Language",
    header: "Language",
    cell: ({ row }) => (
      <p className="text-gray-600 m-3">{row.original.Language}</p>
    )
  }
  ,
  {
    accessorKey: "Available_Copies",
    header: "Available Copies",
    cell: ({ row }) => (
      <p className="text-gray-600 m-3">{row.original.Available_Copies}</p>
    )
  }
  ,
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => (
      <p className="text-gray-600 m-3">{row.original.Status}</p>
    )
  }
  ,{
    accessorKey: "Category",
    header: "Category",
    cell: ({ row }) => (
      <p className="text-gray-600 m-3">{row.original.Category}</p>
    )
  }
]
