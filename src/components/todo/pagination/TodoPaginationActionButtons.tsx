import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { TodoPaginationItem } from './TodoPaginationItem'
import { useTodoPaginationActionContext } from '@/context'
import { usePagination } from '@/hooks'

export const TodoPaginationActionButtons = () => {
  const { moveNextPage, movePrevPage, moveFirstPage, moveLastPage } =
    useTodoPaginationActionContext()
  const { isFirstPage, isLastPage, hasNextPage, hasPrevPage } = usePagination()

  return (
    <div className="flex gap-x-[12px]">
      <TodoPaginationItem onClick={moveFirstPage} disabled={isFirstPage}>
        <ChevronsLeft className="stroke-gray-800" />
      </TodoPaginationItem>

      <TodoPaginationItem onClick={movePrevPage} disabled={!hasPrevPage}>
        <ChevronLeft className="stroke-gray-800" />
      </TodoPaginationItem>

      <TodoPaginationItem onClick={moveNextPage} disabled={!hasNextPage}>
        <ChevronRight className="stroke-gray-800" />
      </TodoPaginationItem>

      <TodoPaginationItem onClick={moveLastPage} disabled={isLastPage}>
        <ChevronsRight className="stroke-gray-800" />
      </TodoPaginationItem>
    </div>
  )
}
