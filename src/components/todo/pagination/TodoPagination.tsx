import * as Pagination from '@/components/ui/pagination'
import { TodoPaginationSizeSelect } from './TodoPaginationSizeSelect'
import { useFilteredTodosContext } from '@/context'
import { TodoPaginationActionButtons } from './TodoPaginationActionButtons'
import { useFilterTodo } from '@/hooks'

export const TodoPagination = () => {
  const { pageIndex } = useFilteredTodosContext()
  const { todos } = useFilterTodo()

  return (
    <Pagination.Pagination className="mt-[20px] justify-between items-center">
      <span className="text-[16px] text-gray-400 font-light">
        0 of {todos.length} row(s) selected.
      </span>

      <Pagination.PaginationContent className="gap-x-[32px]">
        <TodoPaginationSizeSelect />

        <span className="text-[20px]">Page {pageIndex + 1} of 10</span>

        <TodoPaginationActionButtons />
      </Pagination.PaginationContent>
    </Pagination.Pagination>
  )
}
