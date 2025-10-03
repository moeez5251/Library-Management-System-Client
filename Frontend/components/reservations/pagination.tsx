import { Table } from "@tanstack/react-table"

import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
interface PaginationControlsProps<TData> {
  table: Table<TData>
}

const PaginationControls: React.FC<PaginationControlsProps<any>> = ({ table }) => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const visiblePages = Array.from({ length: pageCount }, (_, i) => i);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 pt-4 flex-wrap">
      <button
        className="text-black cursor-pointer disabled:opacity-50 disabled:cursor-auto dark:text-white"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft size={20} />
      </button>
      <button
        className="text-black cursor-pointer disabled:opacity-50 disabled:cursor-auto dark:text-white"

        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft size={20} />
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`${currentPage === page ? "bg-[#6841c4] text-white px-3 py-1 rounded-full " : ""} font-semibold mx-1 cursor-pointer`}
          onClick={() => table.setPageIndex(page)}
        >
          {page + 1}
        </button>
      ))}

      <button
        className="text-black cursor-pointer disabled:opacity-50 disabled:cursor-auto dark:text-white"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight size={20} />
      </button>
      <button
        className="text-black cursor-pointer disabled:opacity-50 disabled:cursor-auto dark:text-white"
        onClick={() => table.setPageIndex(pageCount - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight size={20} />
      </button>
    </div>
  );
};

export default PaginationControls