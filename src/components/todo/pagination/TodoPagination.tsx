import * as Pagination from '@/components/ui/pagination'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { TodoPaginationItem } from './TodoPaginationItem'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const TodoPagination = () => {
  return (
    <Pagination.Pagination className="mt-[20px] justify-between items-center">
      <span className="text-[16px] text-gray-400 font-light">
        0 of 100 row(s) selected.
      </span>

      <Pagination.PaginationContent className="gap-x-[32px]">
        <div className="flex gap-x-[8px]">
          <span className="text-[20px]">Rows per page</span>
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="10">10</SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <span className="text-[20px]">Page 1 of 10</span>

        <div className="flex gap-x-[12px]">
          <TodoPaginationItem>
            <ChevronsLeft className="stroke-gray-800" />
          </TodoPaginationItem>

          <TodoPaginationItem>
            <ChevronLeft className="stroke-gray-800" />
          </TodoPaginationItem>

          <TodoPaginationItem>
            <ChevronRight className="stroke-gray-800" />
          </TodoPaginationItem>

          <TodoPaginationItem>
            <ChevronsRight className="stroke-gray-800" />
          </TodoPaginationItem>
        </div>
      </Pagination.PaginationContent>
    </Pagination.Pagination>
  )
}
