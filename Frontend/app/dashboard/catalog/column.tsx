"use client"
import { ColumnDef } from "@tanstack/react-table"
export type Product = {
  id: number
  name: string
  price: number
  image: string
}

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <h2 className="text-lg font-semibold">{row.original.name}</h2>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <p className="text-gray-600">${row.original.price.toFixed(2)}</p>
    ),
  },
]
