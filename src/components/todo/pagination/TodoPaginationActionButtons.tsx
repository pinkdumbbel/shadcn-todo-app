import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { TodoPaginationItem } from './TodoPaginationItem'
import {
  useFilteredTodoContext,
  usePaginationActionContext,
} from '@/server/context/PaginationContext'

export const TodoPaginationActionButtons = () => {
  const { hasPrevPage, hasNextPage, isFirstPage, isLastPage } =
    useFilteredTodoContext()
  const { moveNextPage, movePrevPage, moveFirstPage, moveLastPage } =
    usePaginationActionContext()

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
