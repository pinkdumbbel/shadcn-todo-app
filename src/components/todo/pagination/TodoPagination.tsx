import * as Pagination from '@/components/ui/pagination'
import { TodoPaginationSizeSelect } from './TodoPaginationSizeSelect'
import { useTodoRowCheckContext } from '@/context'
import { TodoPaginationActionButtons } from './TodoPaginationActionButtons'
import { useFilteredTodoContext } from '@/server/context/PaginationContext'

export const TodoPagination = () => {
  const { pageIndex } = useFilteredTodoContext()
  const todoIds = useTodoRowCheckContext()
  const { todos } = useFilteredTodoContext()

  return (
    <Pagination.Pagination className="mt-[20px] justify-between items-center">
      <span className="text-[16px] text-gray-400 font-light">
        {todoIds.length} of {todos.length} row(s) selected.
      </span>

      <Pagination.PaginationContent className="gap-x-[32px]">
        <TodoPaginationSizeSelect />

        <span className="text-[20px]">Page {pageIndex + 1} of 10</span>

        <TodoPaginationActionButtons />
      </Pagination.PaginationContent>
    </Pagination.Pagination>
  )
}
