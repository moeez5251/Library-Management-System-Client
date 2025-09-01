"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Book,BookOpen,BookOpenText,BookText,BookMinus,BookCopy } from "lucide-react"
import { ProductImageCell } from "./productimage"
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
    cell:ProductImageCell
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
