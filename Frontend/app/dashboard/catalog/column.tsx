import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/table/maintable"  
type Book = {
  id: number
  title: string
  author: string
  year: number
}

const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => <span className="font-semibold">{getValue<number>()}</span>,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
]
export default columns
